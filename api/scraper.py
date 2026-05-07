"""
Google Maps URL veya işletme adı → işletme verisi çeker.

Strateji:
1. Google Maps URL verilirse → Firecrawl ile scrape dene
2. Başarısız / yetersiz veri gelirse → işletmenin kendi sitesini bul ve scrape et
3. Her halükarda mevcut veriyle Claude'a gönder
"""
import re
import json
import urllib.request
from firecrawl import FirecrawlApp
from config import FIRECRAWL_API_KEY


def scrape_google_maps(url: str) -> dict:
    """
    Google Maps URL'den işletme bilgilerini çeker.
    Google bot engellerse Firecrawl search fallback kullanır.
    """
    app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)

    # Google Maps doğrudan scrape dene
    try:
        result = app.scrape(url, formats=["markdown"], wait_for=4000)
        if hasattr(result, "markdown"):
            markdown = result.markdown or ""
        elif isinstance(result, dict):
            markdown = result.get("markdown", "")
        else:
            markdown = str(result)

        data = _parse_maps_markdown(markdown, url)

        # Veri yeterliyse döndür
        if data.get("name") and len(data["name"]) > 3 and "drag" not in data["name"].lower():
            return data
    except Exception:
        pass

    # Fallback: URL'den işletme adını çıkar ve Firecrawl search yap
    business_hint = _extract_name_from_url(url)
    if business_hint:
        return scrape_by_name(business_hint, app)

    return {"name": "", "address": "", "phone": "", "rating": "", "category": "", "website": "", "raw": ""}


def scrape_by_name(business_name: str, app=None) -> dict:
    """İşletme adından bilgileri bulur — Maps URL olmadan da çalışır."""
    if app is None:
        app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)

    try:
        results = app.search(f"{business_name} telefon adres site:tr OR site:com.tr", num_results=3)
        if hasattr(results, "data"):
            items = results.data
        elif isinstance(results, dict):
            items = results.get("data", [])
        else:
            items = results or []

        combined_markdown = ""
        for item in items[:2]:
            if hasattr(item, "markdown"):
                combined_markdown += (item.markdown or "") + "\n"
            elif isinstance(item, dict):
                combined_markdown += item.get("markdown", "") + "\n"

        data = _parse_maps_markdown(combined_markdown, "")
        if not data.get("name"):
            data["name"] = business_name
        return data
    except Exception:
        return {"name": business_name, "address": "", "phone": "", "rating": "", "category": "", "website": "", "raw": ""}


def _extract_name_from_url(url: str) -> str:
    """Google Maps URL'den işletme adı çıkarmaya çalışır."""
    match = re.search(r"/place/([^/@]+)", url)
    if match:
        name = match.group(1).replace("+", " ").replace("%27", "'")
        return name
    return ""


def _parse_maps_markdown(text: str, url: str) -> dict:
    data = {
        "name": "",
        "address": "",
        "phone": "",
        "rating": "",
        "category": "",
        "website": "",
        "description": "",
        "raw": text[:3000],
    }

    lines = text.split("\n")

    for line in lines[:5]:
        line = line.strip().lstrip("#").strip()
        if len(line) > 3 and not line.startswith("http"):
            data["name"] = line
            break

    phone_match = re.search(r"(\+90|0)[\s\-]?(\d{3})[\s\-]?(\d{3})[\s\-]?(\d{2})[\s\-]?(\d{2})", text)
    if phone_match:
        data["phone"] = phone_match.group(0).replace(" ", "").replace("-", "")

    rating_match = re.search(r"(\d[.,]\d)\s*[\(\d]", text)
    if rating_match:
        data["rating"] = rating_match.group(1).replace(",", ".")

    addr_match = re.search(r"(?:Adres|Address)[:\s]+([^\n]+)", text, re.IGNORECASE)
    if addr_match:
        data["address"] = addr_match.group(1).strip()

    cat_match = re.search(r"(?:Kategori|Category|Type)[:\s]+([^\n]+)", text, re.IGNORECASE)
    if cat_match:
        data["category"] = cat_match.group(1).strip()

    web_match = re.search(r"https?://(?!maps\.google)[^\s\)\"]+", text)
    if web_match:
        data["website"] = web_match.group(0)

    return data


def detect_sector(business_data: dict, hint: str = "") -> str:
    """İşletme verisinden sektör kodu tahmin eder."""
    from config import SECTOR_MAP

    text = (
        business_data.get("name", "") + " " +
        business_data.get("category", "") + " " +
        hint
    ).lower()

    for keyword, sector in SECTOR_MAP.items():
        if keyword in text:
            return sector

    return "1-restoran"


if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://maps.google.com"
    data = scrape_google_maps(url)
    print(json.dumps(data, ensure_ascii=False, indent=2))
