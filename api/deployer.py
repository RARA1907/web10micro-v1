"""
HTML dosyasını Cloudflare Pages'e deploy eder.
Wrangler CLI kullanır — Direct Upload API yerine daha güvenilir.
"""
import os
import re
import json
import subprocess
import tempfile
import urllib.request
from pathlib import Path
from config import CF_API_TOKEN, CF_ACCOUNT_ID

CF_DNS_TOKEN = os.getenv("CF_DNS_TOKEN", "")
WEB10MICRO_ZONE_ID = "b67813a2d84b67a952efd4c00f2e8f31"

# Wrangler komutunu liste olarak döner (subprocess.run için)
def _find_wrangler() -> list:
    import shutil
    if w := shutil.which("wrangler"):
        return [w]
    for candidate in [
        os.path.expanduser("~/.npm-global/bin/wrangler"),
        "/root/.npm-global/bin/wrangler",
        "/usr/local/bin/wrangler",
    ]:
        if os.path.exists(candidate):
            return [candidate]
    return ["npx", "wrangler"]

WRANGLER = _find_wrangler()


def _slug(name: str) -> str:
    """İşletme adından URL-safe slug üretir."""
    name = name.lower()
    replacements = {"ı": "i", "ğ": "g", "ü": "u", "ş": "s", "ö": "o", "ç": "c", "â": "a", "î": "i"}
    for src, dst in replacements.items():
        name = name.replace(src, dst)
    name = re.sub(r"[^a-z0-9\s-]", "", name)
    name = re.sub(r"[\s]+", "-", name.strip())
    return name[:40].strip("-")


def _ensure_project(project_name: str):
    """CF Pages projesi yoksa Wrangler ile oluşturur."""
    env = {**os.environ, "CLOUDFLARE_API_TOKEN": CF_API_TOKEN, "CLOUDFLARE_ACCOUNT_ID": CF_ACCOUNT_ID}
    result = subprocess.run(
        WRANGLER + ["pages", "project", "create", project_name, "--production-branch", "main"],
        capture_output=True, text=True, env=env
    )
    # "already exists" de başarı sayılır
    if result.returncode != 0 and "already exists" not in (result.stderr + result.stdout):
        # Sessizce geç — deploy aşamasında da proje oluşabilir
        pass


def _add_dns_cname(subdomain: str, pages_project: str) -> bool:
    """
    web10micro.com altına CNAME kaydı ekler.
    subdomain: "arslan-hukuk" → arslan-hukuk.web10micro.com
    pages_project: "w10m-arslan-hukuk" → w10m-arslan-hukuk.pages.dev
    """
    if not CF_DNS_TOKEN:
        return False

    cname_target = f"{pages_project}.pages.dev"
    payload = json.dumps({
        "type": "CNAME",
        "name": subdomain,
        "content": cname_target,
        "ttl": 1,       # Auto TTL
        "proxied": True,
    }).encode()

    url = f"https://api.cloudflare.com/client/v4/zones/{WEB10MICRO_ZONE_ID}/dns_records"
    req = urllib.request.Request(
        url, data=payload, method="POST",
        headers={
            "Authorization": f"Bearer {CF_DNS_TOKEN}",
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            return result.get("success", False)
    except urllib.error.HTTPError as e:
        body = json.loads(e.read())
        errors = body.get("errors", [])
        # "already exists" hata kodları — başarı sayılır
        if any(err.get("code") in (81053, 81057) for err in errors):
            return True
        print(f"DNS ekleme hatası: {errors}")
        return False


def _add_pages_domain(pages_project: str, custom_domain: str) -> bool:
    """CF Pages projesine özel domain ekler (routing için gerekli)."""
    if not CF_DNS_TOKEN:
        return False
    payload = json.dumps({"name": custom_domain}).encode()
    url = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT_ID}/pages/projects/{pages_project}/domains"
    req = urllib.request.Request(
        url, data=payload, method="POST",
        headers={
            "Authorization": f"Bearer {CF_DNS_TOKEN}",
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            return result.get("success", False)
    except urllib.error.HTTPError as e:
        body = json.loads(e.read())
        errors = body.get("errors", [])
        # "already exists" başarı sayılır
        if any(err.get("code") in (8000007, 8000035) for err in errors):
            return True
        print(f"Pages domain ekleme hatası: {errors}")
        return False


def deploy(business_name: str, html: str) -> str:
    """
    Ana deploy fonksiyonu.
    HTML içeriğini geçici klasöre yazar, wrangler pages deploy ile CF'ye gönderir.
    Döner: canlı URL
    """
    project_name = f"w10m-{_slug(business_name)}"

    with tempfile.TemporaryDirectory() as tmp_dir:
        # index.html yaz
        index_path = Path(tmp_dir) / "index.html"
        index_path.write_text(html, encoding="utf-8")

        env = {
            **os.environ,
            "CLOUDFLARE_API_TOKEN": CF_API_TOKEN,
            "CLOUDFLARE_ACCOUNT_ID": CF_ACCOUNT_ID,
        }

        # Proje oluştur (varsa hata sessizce geçilir)
        _ensure_project(project_name)

        # Deploy
        result = subprocess.run(
            WRANGLER + [
                "pages", "deploy", tmp_dir,
                "--project-name", project_name,
                "--branch", "main",
                "--commit-dirty=true",
            ],
            capture_output=True, text=True, env=env
        )

        output = result.stdout + result.stderr

        if result.returncode != 0:
            raise RuntimeError(f"Wrangler deploy hatası:\n{output[-800:]}")

        # pages.dev URL'sini çıkar (deploy doğrulaması için)
        url_match = re.search(r"https://[a-z0-9\-]+\." + re.escape(project_name) + r"\.pages\.dev", output)
        if not url_match:
            url_match = re.search(r"https://[^\s]+\.pages\.dev", output)

    # Deploy başarılı — özel subdomain için DNS + Pages domain ekle
    subdomain = _slug(business_name)
    custom_domain = f"{subdomain}.web10micro.com"
    dns_ok = _add_dns_cname(subdomain, project_name)
    if dns_ok:
        _add_pages_domain(project_name, custom_domain)
        return f"https://{custom_domain}"
    # DNS token yoksa veya hata olduysa pages.dev URL'sine fall back
    return url_match.group(0) if url_match else f"https://{project_name}.pages.dev"


if __name__ == "__main__":
    import sys
    name = sys.argv[1] if len(sys.argv) > 1 else "Test Isletme"
    html = "<html><body><h1>Test</h1></body></html>"
    print(deploy(name, html))
