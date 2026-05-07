"""
İşletme verisi + sektör → Claude API → tam HTML site üretir.
"""
import anthropic
from config import ANTHROPIC_API_KEY, PLANS, DEFAULT_PLAN, SECTOR_COLORS


SYSTEM_PROMPT = """Sen web10micro platformunun site üretim motorusun.
Görevin: Verilen işletme bilgilerinden tek dosya, tam fonksiyonlu, mobil uyumlu HTML sitesi üretmek.

KURALLAR:
- Sadece HTML döndür. Başka hiçbir şey yazma.
- Lorem ipsum YASAK. Her kelime gerçek içerik olacak.
- Tailwind CDN kullan (play.tailwindcss.com/cdn).
- Google Fonts CDN ile font yükle.
- Tüm animasyonlar inline CSS ile.
- Tek dosya — harici CSS/JS dosyası yok.
- 10 bölüm zorunlu: Navbar, Hero, Feature Band, Hizmetler, Hakkımızda, Yorumlar, SSS, İletişim, Footer, Floating CTA.
- Floating CTA: WhatsApp butonu, sağ alt köşe, sabit konum.
- SSS: accordion (JS ile açılıp kapanır).
- Google Maps embed: İletişim bölümünde iframe placeholder.
- Mobile hamburger menü çalışır olmalı."""


def build_user_prompt(business: dict, sector: str) -> str:
    color_info = SECTOR_COLORS.get(sector, {"primary": "#2C3E50", "name": "İşletme"})
    primary = color_info["primary"]
    sector_name = color_info["name"]

    name = business.get("name") or "İşletmemiz"
    address = business.get("address") or "İstanbul, Türkiye"
    phone = business.get("phone") or "0212 000 00 00"
    rating = business.get("rating") or "4.8"
    category = business.get("category") or sector_name
    website = business.get("website") or ""
    raw = business.get("raw") or ""

    return f"""Aşağıdaki işletme için tam bir web sitesi üret.

## İşletme Bilgileri
- Ad: {name}
- Sektör: {sector_name} ({sector})
- Adres: {address}
- Telefon: {phone}
- Google Puanı: {rating}
- Kategori: {category}
- Mevcut site: {website}

## Tasarım
- Primary renk: {primary}
- WhatsApp CTA telefonu: {phone}

## Google Maps'ten Alınan Ham Veri (içerik üretmek için kullan)
{raw[:2000]}

## Talimatlar
1. Bu işletmeye özel, gerçekçi içerik üret. İşletme adı, sektörü ve konumunu yansıt.
2. Hizmetler bölümünde bu sektöre uygun 6 gerçek hizmet yaz.
3. Yorumlar bölümünde 3 gerçekçi Türkçe yorum uydur (isim, yıldız, metin).
4. SSS'de bu sektöre uygun 5 gerçek soru-cevap yaz.
5. Hakkımızda'da işletme hikayesi uydur (kuruluş yılı, deneyim).
6. Feature band'de 4 güçlü özellik yaz.
7. Primary renk {primary} olarak kullan — butonlar, başlıklar, vurgular.
8. Sadece HTML döndür. Markdown, açıklama, yorum YOK."""


def generate_site(business: dict, sector: str, plan: str = DEFAULT_PLAN) -> str:
    """Claude API ile HTML site üretir. Ham HTML string döner."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    model = PLANS.get(plan, PLANS[DEFAULT_PLAN])["model"]

    message = client.messages.create(
        model=model,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": build_user_prompt(business, sector)}
        ]
    )

    html = message.content[0].text.strip()

    if html.startswith("```"):
        html = html.split("\n", 1)[1]
        if html.endswith("```"):
            html = html.rsplit("```", 1)[0]

    return html


if __name__ == "__main__":
    import json, sys
    data = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {"name": "Test İşletme", "phone": "0212 000 00 00"}
    sector = sys.argv[2] if len(sys.argv) > 2 else "1-restoran"
    html = generate_site(data, sector)
    print(html[:500], "...")
