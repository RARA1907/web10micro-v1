"use client";
import { useState } from "react";

interface Props {
  onCTA: (plan?: string) => void;
}

const plans = [
  {
    id: "standart",
    name: "Standart",
    price: "290",
    period: "/ay",
    desc: "Başlamak için ideal",
    ai: "Mira (Standart)",
    tokens: 100,
    features: [
      "1 web sitesi",
      "web10micro.com subdomain",
      "AI içerik üretimi",
      "Aylık 100 Mira tokeni",
      "SSL + CDN dahil",
      "Mobil uyumlu tasarım",
      "E-posta desteği",
    ],
    cta: "Standart Başla",
    highlight: false,
    badge: null,
  },
  {
    id: "premium",
    name: "Premium",
    price: "490",
    period: "/ay",
    desc: "Büyüyen işletmeler için",
    ai: "Mira Pro (Opus AI)",
    tokens: 500,
    features: [
      "3 web sitesi",
      "Kendi domain bağlantısı",
      "Opus AI ile daha akıllı üretim",
      "Aylık 500 Mira tokeni",
      "SSL + CDN dahil",
      "Öncelikli destek",
      "Google Ads entegrasyonu",
      "İletişim formu & analitik",
    ],
    cta: "Premium Başla",
    highlight: true,
    badge: "En Popüler",
  },
];

const tokenPacks = [
  { tokens: 50,  price: "49",  label: "Başlangıç" },
  { tokens: 200, price: "149", label: "En Popüler", popular: true },
  { tokens: 500, price: "299", label: "Avantajlı" },
];

export function Pricing({ onCTA }: Props) {
  const [showTokenModal, setShowTokenModal] = useState(false);

  return (
    <section id="fiyat" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Başlık */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Şeffaf Fiyatlandırma
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            İşletmenize uygun plan
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Her plan ücretsiz Mira tokeni içerir. İstersen daha fazla satın al — Mira ile saatlerce konuş, sitenizi mükemmelleştir.
          </p>
        </div>

        {/* Plan kartları */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative rounded-3xl border-2 p-8
                ${plan.highlight
                  ? "border-[var(--primary)] bg-gradient-to-br from-[var(--primary)] to-[#5B21B6] text-white shadow-2xl shadow-blue-200"
                  : "border-[var(--border)] bg-white"
                }
              `}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-blue-100" : "text-[var(--text-muted)]"}`}>
                  {plan.desc}
                </p>

                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>
                    ₺{plan.price}
                  </span>
                  <span className={`text-sm pb-1 ${plan.highlight ? "text-blue-200" : "text-[var(--text-muted)]"}`}>
                    {plan.period}
                  </span>
                </div>

                <div className={`flex items-center gap-2 text-xs font-semibold rounded-xl px-3 py-2 ${plan.highlight ? "bg-white/15" : "bg-[var(--primary-light)]"}`}>
                  <span className={plan.highlight ? "text-blue-200" : "text-[var(--primary)]"}>✦</span>
                  <span className={plan.highlight ? "text-white" : "text-[var(--primary)]"}>{plan.ai}</span>
                  <span className="ml-auto">
                    <span className={`${plan.highlight ? "text-purple-200" : "text-[var(--token-color)]"}`}>💎</span>
                    {" "}{plan.tokens} token/ay
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? "text-blue-50" : "text-[var(--text-secondary)]"}`}>
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${plan.highlight ? "bg-white/20 text-white" : "bg-[var(--primary-light)] text-[var(--primary)]"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onCTA(plan.name)}
                className={`
                  w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
                  ${plan.highlight
                    ? "bg-white text-[var(--primary)] hover:bg-blue-50"
                    : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                  }
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Token sistemi */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#F3F0FF] to-[var(--primary-light)] rounded-3xl p-8 border border-purple-100">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💎</span>
                <h3 className="font-bold text-[var(--text-primary)]">Mira Token Sistemi</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Her Mira mesajı 1 token harcar. Token bitince revize durur — ama her zaman doldurabilirsin.
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Standart: 100 token/ay · Premium: 500 token/ay · İstediğin zaman ek paket alabilirsin
              </p>
            </div>
            <button
              onClick={() => setShowTokenModal(true)}
              className="flex-shrink-0 bg-[var(--token-color)] hover:bg-purple-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Token Paketleri →
            </button>
          </div>
        </div>

        {/* Token modal */}
        {showTokenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowTokenModal(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Token Satın Al</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Mira ile daha fazla konuş, daha fazla revize yap</p>
                </div>
                <button onClick={() => setShowTokenModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl">✕</button>
              </div>

              <div className="space-y-3 mb-6">
                {tokenPacks.map((pack) => (
                  <div
                    key={pack.tokens}
                    className={`
                      relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all
                      ${pack.popular
                        ? "border-[var(--token-color)] bg-[#F3F0FF]"
                        : "border-[var(--border)] hover:border-[var(--token-color)]"
                      }
                    `}
                  >
                    {pack.popular && (
                      <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-[var(--token-color)] text-white px-2 py-0.5 rounded-full">
                        En Popüler
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💎</span>
                      <div>
                        <p className="font-bold text-[var(--text-primary)]">{pack.tokens} Token</p>
                        <p className="text-xs text-[var(--text-muted)]">{pack.label}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg text-[var(--text-primary)]">₺{pack.price}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">₺{(parseInt(pack.price)/pack.tokens).toFixed(2)}/token</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setShowTokenModal(false); onCTA("Token"); }}
                className="w-full bg-[var(--token-color)] hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Satın Al — Stripe ile Güvenli Ödeme
              </button>
              <p className="text-center text-xs text-[var(--text-muted)] mt-3">Tokenler hemen hesabına eklenir</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
