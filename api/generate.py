#!/usr/bin/env python3
"""
web10micro — Ana Pipeline

Kullanım:
  python3 generate.py <google_maps_url_veya_isletme_adi> [sektor]
  python3 generate.py "..." --name "İşletme" --phone "0212..." --address "..."
  python3 generate.py "..." --no-deploy --output test.html --plan premium

Örnekler:
  python3 generate.py "https://maps.google.com/..."
  python3 generate.py "https://maps.google.com/..." avukat --plan premium
  python3 generate.py "Demir Oto Servis Bursa" oto --name "Demir Oto" --phone "0224 441 38 55"
"""
import os
import sys
import argparse
import time
from pathlib import Path

def _load_env(path: Path):
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        if not os.environ.get(key.strip()):
            os.environ[key.strip()] = val.strip()

_load_env(Path(__file__).parent / ".env")

from config import ANTHROPIC_API_KEY, FIRECRAWL_API_KEY, CF_API_TOKEN, CF_ACCOUNT_ID, PLANS, DEFAULT_PLAN
from scraper import scrape_google_maps, scrape_by_name, detect_sector
from generator import generate_site
from deployer import deploy


def check_config():
    missing = []
    if not ANTHROPIC_API_KEY:
        missing.append("ANTHROPIC_API_KEY")
    if not FIRECRAWL_API_KEY:
        missing.append("FIRECRAWL_API_KEY")
    if missing:
        print(f"HATA: .env dosyasında eksik: {', '.join(missing)}")
        sys.exit(1)


def run(
    query: str,
    sector_hint: str = "",
    no_deploy: bool = False,
    output: str = "",
    plan: str = DEFAULT_PLAN,
    # Manuel override alanları
    override_name: str = "",
    override_phone: str = "",
    override_address: str = "",
    override_rating: str = "",
):
    check_config()

    print(f"\n{'='*50}")
    print("web10micro — Site Üretim Pipeline")
    print(f"{'='*50}\n")

    # 1. Veri çekme
    is_maps_url = query.startswith("http")

    if is_maps_url:
        print(f"[1/3] Google Maps verisi çekiliyor...")
        print(f"      URL: {query[:60]}...")
    else:
        print(f"[1/3] İşletme aranıyor...")
        print(f"      Arama: {query}")

    t0 = time.time()

    if is_maps_url:
        business = scrape_google_maps(query)
    else:
        business = scrape_by_name(query)

    # Manuel override — kullanıcı girdisi scrape'i ezer
    if override_name:
        business["name"] = override_name
    if override_phone:
        business["phone"] = override_phone
    if override_address:
        business["address"] = override_address
    if override_rating:
        business["rating"] = override_rating

    print(f"      ✓ {business.get('name', '?')} ({time.time()-t0:.1f}s)")
    print(f"      Adres : {business.get('address') or '—'}")
    print(f"      Tel   : {business.get('phone') or '—'}")
    print(f"      Puan  : {business.get('rating') or '—'}")

    # 2. Sektör tespiti
    sector = detect_sector(business, sector_hint)
    print(f"\n[~]   Sektör : {sector}")

    # 3. HTML üretimi
    plan_info = PLANS.get(plan, PLANS[DEFAULT_PLAN])
    print(f"\n[2/3] Site üretiliyor... [{plan_info['label']} — {plan_info['model']}]")
    t1 = time.time()
    html = generate_site(business, sector, plan)
    print(f"      ✓ {len(html):,} karakter HTML ({time.time()-t1:.1f}s)")

    # Dosyaya kaydet
    if output:
        out_path = Path(output)
    else:
        safe_name = business.get("name", "site").replace(" ", "_").replace("/", "-")[:30]
        out_path = Path(__file__).parent / "output" / f"{safe_name}.html"

    out_path.parent.mkdir(exist_ok=True)
    out_path.write_text(html, encoding="utf-8")
    print(f"      Dosya : {out_path.name}")

    # 4. Deploy
    if no_deploy:
        print(f"\n[3/3] Deploy atlandı (--no-deploy)")
        _done(business, str(out_path))
        return str(out_path)

    if not CF_API_TOKEN or not CF_ACCOUNT_ID:
        print(f"\n[3/3] Deploy atlandı (CF bilgileri eksik)")
        _done(business, str(out_path))
        return str(out_path)

    print(f"\n[3/3] Cloudflare Pages'e deploy ediliyor...")
    t2 = time.time()
    live_url = deploy(business.get("name", "demo"), html)
    print(f"      ✓ Canlı! ({time.time()-t2:.1f}s)")

    print(f"\n{'='*50}")
    print(f"✅ TAMAMLANDI!")
    print(f"   İşletme  : {business.get('name')}")
    print(f"   Demo URL : {live_url}")
    print(f"   HTML     : {out_path.name}")
    print(f"   Plan     : {plan_info['label']} (${plan_info['price_monthly']}/ay)")
    print(f"{'='*50}\n")

    return live_url


def _done(business, path):
    print(f"\n{'='*50}")
    print(f"✅ TAMAMLANDI!")
    print(f"   İşletme : {business.get('name')}")
    print(f"   HTML    : {path}")
    print(f"{'='*50}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="web10micro site üretim pipeline")
    parser.add_argument("query", help="Google Maps URL veya işletme adı")
    parser.add_argument("sektor", nargs="?", default="", help="Sektör ipucu (opsiyonel)")
    parser.add_argument("--no-deploy", action="store_true", help="CF Pages'e deploy etme")
    parser.add_argument("--output", default="", help="HTML çıktı dosyası yolu")
    parser.add_argument("--plan", default=DEFAULT_PLAN, choices=list(PLANS.keys()), help="standart=$9.90 (Sonnet) | premium=$19.90 (Opus)")
    # Manuel override
    parser.add_argument("--name",    default="", help="İşletme adı (override)")
    parser.add_argument("--phone",   default="", help="Telefon (override)")
    parser.add_argument("--address", default="", help="Adres (override)")
    parser.add_argument("--rating",  default="", help="Google puanı (override)")
    args = parser.parse_args()

    run(
        query=args.query,
        sector_hint=args.sektor,
        no_deploy=args.no_deploy,
        output=args.output,
        plan=args.plan,
        override_name=args.name,
        override_phone=args.phone,
        override_address=args.address,
        override_rating=args.rating,
    )
