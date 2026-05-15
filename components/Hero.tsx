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

          {/* Sağ — Mira + demo card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Ana kart */}
            <div className="relative bg-white rounded-3xl border border-[var(--border)] shadow-2xl shadow-blue-100 p-4 sm:p-6 w-full max-w-sm overflow-hidden">
              {/* Kart başlık */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 pb-4 border-b border-[var(--border)] flex-wrap">
                <MiraAvatar mood="celebrating" size={40} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">Mira hazırladı! 🎉</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)] truncate">arslan-hukuk.web10micro.com</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className="text-xs font-semibold text-[var(--success)] bg-green-50 px-2 py-1 rounded-full">Canlı ✓</span>
                </div>
              </div>

              {/* Site önizleme mockup */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-[var(--border)]">
                <div className="bg-[#1A3A5C] px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full px-2 py-0.5 text-white text-[10px] truncate">arslan-hukuk.web10micro.com</div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="bg-[#1A3A5C] rounded-xl p-3 sm:p-4 text-white mb-3">
                    <div className="text-[10px] sm:text-xs font-bold mb-1">ARSLAN HUKUK BÜROSU</div>
                    <div className="text-[9px] sm:text-[10px] opacity-70">Hukuki Danışmanlık · İstanbul</div>
                    <div className="mt-3 bg-[var(--accent)] text-white text-[9px] sm:text-[10px] font-semibold px-3 py-1.5 rounded-lg inline-block">
                      Ücretsiz Danışma →
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Boşanma Hukuku","Ceza Hukuku","İş Hukuku","Gayrimenkul"].map(s => (
                      <div key={s} className="bg-gray-100 rounded-lg p-2 text-[9px] sm:text-[10px] font-medium text-gray-600 truncate">{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                {[["4.2sn","Üretim"],["37","Bölüm"],["100","Puan"]].map(([val, label]) => (
                  <div key={label} className="bg-[var(--primary-light)] rounded-xl p-2">
                    <div className="text-[var(--primary)] font-bold text-xs sm:text-sm">{val}</div>
                    <div className="text-[var(--text-muted)] text-[10px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-2 -left-2 sm:-left-4 bg-white rounded-2xl border border-[var(--border)] shadow-lg px-2 py-2 flex items-center gap-2">
              <MiraAvatar mood="thinking" size={28} />
              <div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-[var(--text-primary)]">Mira analiz ediyor...</p>
                <div className="flex gap-1 mt-0.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
