"""
web10micro — FastAPI Backend
Railway'de çalışır. Pipeline'ı HTTP API olarak sunar.
"""
import os
import time
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("web10micro")


def _load_env():
    env_path = Path(__file__).parent / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        if not os.environ.get(key.strip()):
            os.environ[key.strip()] = val.strip()

_load_env()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("web10micro API başlatıldı")
    yield
    logger.info("web10micro API kapandı")


app = FastAPI(
    title="web10micro API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://web10micro.com",
        "https://www.web10micro.com",
        "http://localhost:3000",
        "http://localhost:3010",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── Request / Response modelleri ──────────────────────────────────────────────

class GenerateRequest(BaseModel):
    query: str = Field(..., description="Google Maps URL veya işletme adı")
    plan: str = Field("standart", description="standart | premium")
    email: str = Field("", description="Kullanıcı emaili (bildirim için)")
    # Manuel override alanları
    name: str = Field("", description="İşletme adı override")
    phone: str = Field("", description="Telefon override")
    address: str = Field("", description="Adres override")
    rating: str = Field("", description="Rating override")


class GenerateResponse(BaseModel):
    status: str
    url: str
    business_name: str
    elapsed: float
    plan: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "web10micro-api"}


@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    """
    İşletme bilgisinden demo site üretir ve CF Pages'e deploy eder.
    """
    from config import ANTHROPIC_API_KEY, FIRECRAWL_API_KEY
    from scraper import scrape_google_maps, scrape_by_name, detect_sector
    from generator import generate_site
    from deployer import deploy

    if not ANTHROPIC_API_KEY:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY eksik")
    if not FIRECRAWL_API_KEY:
        raise HTTPException(status_code=500, detail="FIRECRAWL_API_KEY eksik")

    if not req.query.strip():
        raise HTTPException(status_code=400, detail="query boş olamaz")

    if req.plan not in ("standart", "premium"):
        raise HTTPException(status_code=400, detail="plan: standart | premium")

    t0 = time.time()
    logger.info(f"[generate] query={req.query[:60]} plan={req.plan} email={req.email}")

    try:
        # 1. Scrape
        is_url = req.query.startswith("http")
        business = scrape_google_maps(req.query) if is_url else scrape_by_name(req.query)

        # Override
        if req.name:    business["name"]    = req.name
        if req.phone:   business["phone"]   = req.phone
        if req.address: business["address"] = req.address
        if req.rating:  business["rating"]  = req.rating

        logger.info(f"[generate] işletme={business.get('name')}")

        # 2. Sektör tespit
        sector = detect_sector(business, "")

        # 3. HTML üret
        html = generate_site(business, sector, req.plan)
        logger.info(f"[generate] html={len(html)} karakter")

        # 4. Deploy
        live_url = deploy(business.get("name", "demo"), html)
        elapsed = round(time.time() - t0, 1)

        logger.info(f"[generate] ✅ url={live_url} ({elapsed}s)")

        return GenerateResponse(
            status="success",
            url=live_url,
            business_name=business.get("name", ""),
            elapsed=elapsed,
            plan=req.plan,
        )

    except Exception as exc:
        elapsed = round(time.time() - t0, 1)
        logger.error(f"[generate] ❌ {exc} ({elapsed}s)")
        raise HTTPException(status_code=500, detail=str(exc))
