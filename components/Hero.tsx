"use client";
import { useState } from "react";
import { MiraAvatar } from "./MiraAvatar";

interface Props {
  onCTA: (url?: string) => void;
}

export function Hero({ onCTA }: Props) {
  const [url, setUrl] = useState("");

  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-hero-pattern overflow-hidden">
      {/* Arka plan dekor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[var(--primary)] opacity-[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--token-color)] opacity-[0.04] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Sol — metin */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              İşletmenizi bulalım, 15 dakikada demo hazır
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
              <span className="text-[var(--text-primary)]">İşletmeniz İçin</span>
              <br />
              <span className="text-gradient">Profesyonel</span>
              <br />
              <span className="text-[var(--text-primary)]">Web Sitesi</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg">
              Google Maps linkini yapıştırın, işletmenizi bulalım. Size özel demo sitenizi <strong className="text-[var(--text-primary)]">15 dakikada</strong> hazırlayıp gönderelim.
            </p>

            {/* Input */}
            <div className="bg-white rounded-2xl border border-[var(--border)] shadow-lg shadow-blue-50 p-2 flex flex-col sm:flex-row gap-2 mb-4 max-w-full">
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onCTA(url)}
                placeholder="Google Maps linkini yapıştırın..."
                className="flex-1 min-w-0 px-4 py-3 text-sm outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-transparent"
              />
              <button
                onClick={() => onCTA(url)}
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                Demo Talep Et →
              </button>
            </div>

            <p className="text-xs text-[var(--text-muted)] mb-8">
              İşletmenizi bulalım, size özel demo hazırlayalım
            </p>

            {/* Sosyal kanıt */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#1B2FFF","#7C3AED","#FF6B35","#00C48C"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array(5).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-xs text-[var(--text-muted)]">200+ işletme siteye kavuştu</p>
              </div>
            </div>
          </div>

          {/* Sağ — Demo önizleme */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Laptop mockup */}
              <div className="bg-gray-800 rounded-t-2xl p-3 pb-0 shadow-2xl shadow-blue-100 w-full max-w-sm">
                {/* Üst çubuk */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white/15 rounded-full px-3 py-1 text-white/60 text-[10px] text-center truncate text-xs">
                    maisoluna.web10micro.com
                  </div>
                  <div className="w-5" />
                </div>
                {/* Ekran görüntüsü */}
                <div className="rounded-xl overflow-hidden bg-white">
                  <img
                    src="/template-guzellik.png"
                    alt="Maison Luna demo"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Alt badge */}
                <div className="flex items-center justify-between -mx-3 px-1 py-2">
                  <div className="flex items-center gap-2">
                    <MiraAvatar mood="celebrating" size={24} />
                    <span className="text-[11px] text-white/80 font-medium">Mira hazırladı! 🎉</span>
                  </div>
                  <span className="text-[10px] font-semibold text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full">Canlı ✓</span>
                </div>
              </div>
              {/* Laptop alt kısmı */}
              <div className="bg-gray-900 rounded-b-lg h-4 mx-8 mb-1 shadow-lg" />
              <div className="bg-gray-700 rounded-full h-1 w-20 mx-auto" />

              {/* Floating badge — sol üst */}
              <div className="absolute -top-3 -left-3 sm:-left-5 bg-white rounded-2xl border border-[var(--border)] shadow-lg px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white text-[10px] font-bold">W</div>
                <p className="text-[10px] font-semibold text-[var(--text-primary)]">web10micro demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
