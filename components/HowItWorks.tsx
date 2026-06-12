import { MiraAvatar } from "./MiraAvatar";

interface Props {
  onCTA: () => void;
}

const steps = [
  {
    step: "01",
    mood: "helping" as const,
    title: "Linki yapıştırın",
    desc: "Google Maps veya Google İşletmem linkini forma yapıştırın. AI işletmenizi 15 saniyede bulur, bilgileri otomatik çeker.",
    detail: "Sadece linki bırakın → gerisini biz hallederiz",
    color: "var(--primary-light)",
    accent: "var(--primary)",
  },
  {
    step: "02",
    mood: "thinking" as const,
    title: "Demonuzu hazırlıyoruz",
    desc: "Sektörünüze özel tasarım, gerçek içerik, mobil uyumlu yapı. 15 dakikada canlı demo linki oluşturuyoruz.",
    detail: "Özel tasarım · Gerçek içerik · Mobil uyumlu · subdomain.web10micro.com",
    color: "#F3F0FF",
    accent: "var(--token-color)",
  },
  {
    step: "03",
    mood: "celebrating" as const,
    title: "Mailinize geliyor",
    desc: "Demo linki doğrudan mailinize düşer. İnceleyin, revizyon isteyin, onayladığınızda ödeme yapın — başka bir şey yok.",
    detail: "Beğenmezseniz ödemezsiniz · SSL dahil · Alan adı bağlantısı",
    color: "#ECFDF5",
    accent: "var(--success)",
  },
];

export function HowItWorks({ onCTA }: Props) {
  return (
    <section id="nasil-calisir" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Başlık */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Nasıl Çalışır?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            3 adımda web sitenize kavuşun
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Restoran mı, avukat mı, kuaför mü? Hangi sektör olursa olsun — linki yapıştır, demoyu bekle.
          </p>
        </div>

        {/* Adımlar */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-[var(--primary)] to-[var(--token-color)] opacity-20" />

          {steps.map((s, i) => (
            <div key={i} className="relative bg-white rounded-3xl border border-[var(--border)] p-6 card-hover">
              <div className="flex items-start justify-between mb-5">
                <span className="text-5xl font-black text-[var(--border)]">{s.step}</span>
                <div className="p-2 rounded-2xl" style={{ backgroundColor: s.color }}>
                  <MiraAvatar mood={s.mood} size={48} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{s.desc}</p>

              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-[var(--text-muted)]">{s.detail}</p>
              </div>

              {i < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-[var(--border)] rounded-full items-center justify-center shadow-sm">
                  <span style={{ color: "var(--primary)" }} className="text-sm font-bold">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Alt not */}
        <div className="text-center mt-12">
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Beğenmezseniz ödemezsiniz — demoyu inceleyin, onaylarsanız devam edelim.
          </p>
          <button
            onClick={onCTA}
            className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Demo Talep Et
          </button>
        </div>
      </div>
    </section>
  );
}
