"use client";
import { useState } from "react";

interface Props {
  onCTA: () => void;
}

const features = [
  "AI ile işletmenize özel tasarım",
  "sizeozgubir.web10micro.com alt alan adı",
  "Sınırsız revizyon (ilk ay)",
  "7/24 WhatsApp destek",
  "KVKK uyumlu iletişim formu",
  "Mobil uyumlu, hızlı yüklenen site",
];

export function Pricing({ onCTA }: Props) {
  const [yearly, setYearly] = useState(false);

  const monthlyPrice = yearly ? 8 : 10;
  const renewalPrice = yearly ? 18 : 22;

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Başlık */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Fiyatlandırma
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Şeffaf ve basit fiyatlar
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            İlk yıl giriş fiyatıyla başlayın. Demoyu beğenmezseniz kuruş ödemezsiniz.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-[var(--bg)] rounded-xl p-1 gap-1 border border-[var(--border)]">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                !yearly
                  ? "bg-white text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly
                  ? "bg-white text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              Yıllık
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                2 ay bedava
              </span>
            </button>
          </div>
        </div>

        {/* Kart */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl border-2 border-[var(--primary)] p-8 relative shadow-lg">

            {/* Üst badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[var(--primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                En Popüler
              </span>
            </div>

            {/* Fiyat */}
            <div className="mb-8 pt-2">
              <p className="text-sm font-medium text-[var(--text-muted)] mb-1">İlk yıl fiyatı</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-[var(--text-primary)]">
                  ${monthlyPrice}
                </span>
                <span className="text-[var(--text-secondary)] mb-2">/ay</span>
              </div>
              {yearly && (
                <p className="text-xs font-semibold text-green-600 mt-1">
                  Yıllık ${monthlyPrice * 12} — 2 ay bedava 🎉
                </p>
              )}
              <p className="text-xs text-[var(--text-muted)] mt-2">
                İkinci yıldan itibaren ${renewalPrice}/ay · İstediğiniz zaman iptal
              </p>
            </div>

            {/* Özellikler */}
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={onCTA}
              className="w-full bg-[var(--primary)] text-white font-bold py-3.5 rounded-xl hover:bg-[var(--primary-dark)] transition-colors text-sm"
            >
              Ücretsiz Demo İste
            </button>

            <p className="text-center text-[10px] text-[var(--text-muted)] mt-3 leading-relaxed">
              Demoyu beğenirseniz ödeme yaparsınız · Fiyat değişikliği 30 gün önceden bildirilir
            </p>
          </div>

          {/* Alt not */}
          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            Birden fazla işletme? Toplu fiyat için{" "}
            <button onClick={onCTA} className="text-[var(--primary)] hover:underline font-medium">
              bizimle iletişime geçin
            </button>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
