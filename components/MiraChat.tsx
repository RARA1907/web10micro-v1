"use client";
import { useState } from "react";

interface Props {
  onCTACallback?: () => void;
}

export function MiraChat({ onCTACallback }: Props) {
  const [open, setOpen] = useState(false);

  const steps = [
    { icon: "📍", title: "İşletmenizi bulun", desc: "Google Maps linkini yapıştırın, doğru işletme mi kontrol edelim." },
    { icon: "🎨", title: "Demo hazırlıyoruz", desc: "Ekibimiz 15 dakikada sektörünüze özel demo site hazırlar." },
    { icon: "👀", title: "İnceleyin ve onaylayın", desc: "Demo linkinizi mailinize göndeririz. Beğenirseniz satın alın." },
    { icon: "🔄", title: "Revize ve yayın", desc: "Revizeleri iletirsiniz, düzeltiriz, yayına alırız." },
  ];

  return (
    <>
      {/* Floating buton */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {!open && (
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-lg px-4 py-2 text-sm font-medium text-[var(--text-primary)] animate-bounce">
            Nasıl Çalışır? ✦
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] shadow-xl shadow-blue-200 flex items-center justify-center transition-all"
        >
          {open
            ? <span className="text-white text-xl">✕</span>
            : <span className="text-white text-2xl">✦</span>
          }
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-h-[520px] bg-white rounded-3xl border border-[var(--border)] shadow-2xl shadow-blue-100 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary-light)] to-white">
            <div className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white text-lg font-bold">
              W
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-[var(--text-primary)]">web10micro</p>
              <p className="text-[10px] text-[var(--text-muted)]">15 dakikada demo web sitesi</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            <div className="text-center mb-2">
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Nasıl Çalışır?</p>
              <p className="text-xs text-[var(--text-muted)]">4 adımda web sitenize kavuşun</p>
            </div>

            {steps.map((s, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] flex items-center justify-center flex-shrink-0 text-base">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{s.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}

            <hr className="border-[var(--border)]" />

            <button
              onClick={() => { setOpen(false); onCTACallback?.(); }}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Demo Talep Et →
            </button>

            <p className="text-[10px] text-[var(--text-muted)] text-center">
              Demo siteniz hazır olunca size e-posta ile gönderiyoruz
            </p>
          </div>
        </div>
      )}
    </>
  );
}