import os
from pathlib import Path

def _load_env():
    env_path = Path(__file__).parent / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key, val = key.strip(), val.strip()
        if not os.environ.get(key):
            os.environ[key] = val

_load_env()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")
CF_API_TOKEN = os.getenv("CF_API_TOKEN", "")
CF_ACCOUNT_ID = os.getenv("CF_ACCOUNT_ID", "")
CF_DNS_TOKEN = os.getenv("CF_DNS_TOKEN", "")

# Paket seçeneğine göre model
PLANS = {
    "standart": {
        "model": "claude-sonnet-4-6",
        "label": "Standart",
        "price_monthly": 9.90,
    },
    "premium": {
        "model": "claude-opus-4-7",
        "label": "Premium",
        "price_monthly": 19.90,
    },
}

DEFAULT_PLAN = "standart"

SECTOR_MAP = {
    "restoran": "1-restoran",
    "kafe": "1-restoran",
    "cafe": "1-restoran",
    "yemek": "1-restoran",
    "guzellik": "2-guzellik",
    "kuafor": "2-guzellik",
    "salon": "2-guzellik",
    "avukat": "3-hukuk",
    "hukuk": "3-hukuk",
    "dis": "4-saglik",
    "klinik": "4-saglik",
    "doktor": "4-saglik",
    "insaat": "5-insaat",
    "tadilat": "5-insaat",
    "yapi": "5-insaat",
    "oto": "6-oto",
    "servis": "6-oto",
    "muhasebe": "7-muhasebe",
    "mali": "7-muhasebe",
    "egitim": "8-egitim",
    "kurs": "8-egitim",
    "dershane": "8-egitim",
    "spor": "9-spor",
    "fitness": "9-spor",
    "gym": "9-spor",
    "veteriner": "10-veteriner",
    "pet": "10-veteriner",
}

SECTOR_COLORS = {
    "1-restoran":  {"primary": "#C0392B", "name": "Restoran/Kafe"},
    "2-guzellik":  {"primary": "#C9A96E", "name": "Güzellik/Kuaför"},
    "3-hukuk":     {"primary": "#1A3A5C", "name": "Hukuk/Avukat"},
    "4-saglik":    {"primary": "#0B6E8E", "name": "Sağlık/Klinik"},
    "5-insaat":    {"primary": "#E67E22", "name": "İnşaat/Tadilat"},
    "6-oto":       {"primary": "#C0392B", "name": "Oto Servis"},
    "7-muhasebe":  {"primary": "#1B4F72", "name": "Muhasebe"},
    "8-egitim":    {"primary": "#6C3483", "name": "Eğitim/Kurs"},
    "9-spor":      {"primary": "#F39C12", "name": "Spor/Fitness"},
    "10-veteriner":{"primary": "#27AE60", "name": "Veteriner"},
}
