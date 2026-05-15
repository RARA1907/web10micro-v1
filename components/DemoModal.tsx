"use client";
import { useState } from "react";

type Step = "form" | "loading" | "done" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export function DemoModal({ open, onClose, defaultUrl }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [mapsUrl, setMapsUrl] = useState(defaultUrl ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bizName, setBizName] = useState("");
  const [note, setNote] = useState("");
  const [errMsg, setErrMsg] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsUrl.trim() || !email.trim() || !name.trim()) return;

    setStep("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maps_url: mapsUrl.trim(),
          business_name: bizName.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `Hata: ${res.status}`);
      }

      setStep("done");

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      setErrMsg(msg);
      setStep("error");
    }
  };

  const handleClose = () => {
    setStep("form");
    setMapsUrl("");
    setName("");
    setEmail("");
    setPhone("");
    setBizName("");
    setNote("");
    setErrMsg("");
    onClose();
  };

  const handleRetry = () => {
    setStep("form");
    setErrMsg("");
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
          <div className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white text-lg font-bold">
            W
          </div>
          <div className="flex-1">
            <p className="font-bold text-[var(--text-primary)]">
              {step === "form"    && "Demo Talep Et"}
              {step === "loading" && "Gönderiliyor..."}
              {step === "done"    && "Talep Alındı! 🎉"}
              {step === "error"   && "Bir sorun oluştu"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {step === "form"    && "Size özel demo hazırlayalım"}
              {step === "loading" && "Ekibimize iletiyoruz..."}
              {step === "done"    && "En kısa sürede dönüş yapacağız"}
              {step === "error"   && "Tekrar deneyin"}
            </p>
          </div>
          <button onClick={handleClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-6">

          {/* FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Google Maps Linki <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={mapsUrl}
                  onChange={e => setMapsUrl(e.target.value)}
                  placeholder="maps.google.com/... veya işletme adı"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  İşletme Adı
                </label>
                <input
                  type="text"
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  placeholder="Örn: Arslan Hukuk Bürosu"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Adınız <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0555 555 55 55"
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  E-posta <span className="text-red-400">*</span>
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

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Eklemek istedikleriniz
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Varsa özel istekleriniz..."
                  rows={2}
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                Demo Talep Et →
              </button>

              <p className="text-center text-xs text-[var(--text-muted)]">
                Talebiniz alınır, 15 dakika içinde demo linkiniz hazır olur
              </p>
            </form>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <div className="py-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
                </div>
              </div>

              <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
                {[
                  "Bilgileriniz kaydediliyor...",
                  "Ekibimize iletilmek üzere hazırlanıyor...",
                  "Size en kısa sürede dönüş yapılacak...",
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
                <p className="text-xs text-[var(--primary)] font-semibold">Tahmini demo hazırlık: 15 dakika</p>
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>

              <h3 className="font-bold text-[var(--text-primary)] mb-1">
                Talebiniz alındı!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                <strong>{email}</strong> adresine en kısa sürede demo linkinizi göndereceğiz.
              </p>

              <div className="bg-[var(--primary-light)] rounded-2xl p-4 mb-6 text-left">
                <p className="text-xs font-semibold text-[var(--primary)] mb-1">Sıradaki adım:</p>
                <p className="text-xs text-[var(--text-secondary)]">Demo linkinizi e-posta ile alacaksınız. Beğenirseniz satın alabilir, revize taleplerinizi iletebilirsiniz.</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-xl text-sm"
              >
                Tamam, Anladım
              </button>
            </div>
          )}

          {/* ERROR */}
          {step === "error" && (
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>

              <h3 className="font-bold text-[var(--text-primary)] mb-2">Bir sorun oluştu</h3>
              <p className="text-sm text-red-500 mb-6 break-words">{errMsg}</p>

              <button
                onClick={handleRetry}
                className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-xl text-sm mb-3"
              >
                Tekrar Dene
              </button>
              <button
                onClick={handleClose}
                className="w-full border border-[var(--border)] text-[var(--text-secondary)] font-medium py-3 rounded-xl text-sm"
              >
                Kapat
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}