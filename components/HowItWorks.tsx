import { MiraAvatar } from "./MiraAvatar";

interface Props {
  onCTA: () => void;
}

const steps = [
  {
    step: "01",
    mood: "helping" as const,
    title: "İşletmenizi bulalım",
    desc: "Google Maps linkini yapıştırın, işletmenizi bulalım ve bilgilerini kontrol edelim.",
    detail: "Doğru işletme mi? Onaylayın, gerisini bize bırakın.",
    color: "var(--primary-light)",
    accent: "var(--primary)",
  },
  {
    step: "02",
    mood: "thinking" as const,
    title: "Size özel demo hazırlıyoruz",
    desc: "Ekibimiz 15 dakikada sektörünüze uygun, profesyonel bir demo sitesi hazırlar.",
    detail: "Sektör template\'i · Özel içerik · Mobil uyumlu · Canlı link",
    color: "#F3F0FF",
    accent: "var(--token-color)",
  },
  {
    step: "03",
    mood: "celebrating" as const,
    title: "Beğen, revize et, yayına al",
    desc: "Demo linkinizi inceler, beğenirseniz satın alır ve revizelerinizi iletirsiniz. Onay sonrası yayına alırız.",
    detail: "Domain bağlantısı · SSL dahil · Süresiz revize",
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
            Siz işletmenizi bulun, gerisini biz hallederiz.
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
            Demo yayına alınmadan önce tüm revizeler tamamlanır, onayınız alınır.
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
