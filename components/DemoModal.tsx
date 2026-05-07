"use client";
import { useState } from "react";
import { MiraAvatar } from "./MiraAvatar";

type Step = "form" | "loading" | "done";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultSector?: string;
  defaultUrl?: string;
}

export function DemoModal({ open, onClose, defaultSector, defaultUrl }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [email, setEmail] = useState("");
  const [demoSlug, setDemoSlug] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !email.trim()) return;

    const slug = url
      .replace(/https?:\/\//g, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
      .slice(0, 30)
      .replace(/-+$/, "");

    setDemoSlug(slug || "isletmeniz");
    setStep("loading");

    setTimeout(() => setStep("done"), 3500);
  };

  const handleClose = () => {
    setStep("form");
    setUrl("");
    setEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl shadow-blue-100 w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--primary-light)] to-[#F3F0FF] px-6 py-5 flex items-center gap-3 border-b border-[var(--border)]">
          <MiraAvatar mood={step === "loading" ? "thinking" : step === "done" ? "celebrating" : "greeting"} size={40} />
          <div className="flex-1">
            <p className="font-bold text-[var(--text-primary)]">
              {step === "form" && "Demo Sitenizi Oluşturun"}
              {step === "loading" && "Mira çalışıyor..."}
              {step === "done" && "Hazır! 🎉"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {step === "form" && "Ücretsiz · Kredi kartı gerekmez"}
              {step === "loading" && "İşletmenizi analiz ediyorum..."}
              {step === "done" && "Demo siteniz hazırlandı"}
            </p>
          </div>
          <button onClick={handleClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-6">
          {/* FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {defaultSector && (
                <div className="bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-2 rounded-xl">
                  Seçili sektör: {defaultSector}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Google Maps linki veya işletme adı
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="maps.google.com/... veya 'Arslan Hukuk Bürosu'"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  E-posta adresiniz
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ornek@isletme.com"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                Mira Başlatsın →
              </button>

              <p className="text-center text-xs text-[var(--text-muted)]">
                Demo linkinizi e-posta ile de göndereceğiz
              </p>
            </form>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <div className="py-8 text-center">
              <div className="flex justify-center mb-6">
                <MiraAvatar mood="thinking" size={64} />
              </div>

              <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
                {[
                  "İşletme bilgileri analiz ediliyor...",
                  "Sektöre özel tasarım seçiliyor...",
                  "İçerik ve görseller hazırlanıyor...",
                  "Site yapılandırılıyor...",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin flex-shrink-0"
                      style={{ animationDelay: `${i * 0.4}s`, animationDuration: "1s" }}
                    />
                    <p className="text-sm text-[var(--text-secondary)]">{text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--primary-light)] rounded-2xl p-4">
                <div className="flex gap-1 justify-center mb-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <p className="text-xs text-[var(--primary)] font-semibold">Tahmini süre: ~60 saniye</p>
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>

              <h3 className="font-bold text-[var(--text-primary)] mb-2">Demo talebiniz alındı!</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Demo siteniz hazırlanıyor. Birkaç dakika içinde erişime açılacak.
              </p>

              <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-4 mb-6">
                <p className="text-xs text-[var(--text-muted)] mb-1">Demo adresiniz:</p>
                <p className="font-bold text-[var(--primary)] text-sm break-all">
                  {demoSlug}.web10micro.com
                </p>
              </div>

              <p className="text-xs text-[var(--text-muted)] mb-6">
                Bağlantı <strong>{email}</strong> adresine de gönderildi.
              </p>

              <button
                onClick={handleClose}
                className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-xl text-sm"
              >
                Tamam, Anladım
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
