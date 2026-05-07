"use client";
import { useState } from "react";

interface Props {
  onCTA: (sector?: string) => void;
}

const sectors = [
  { id: "hukuk",     label: "Hukuk / Avukat",    icon: "⚖️", color: "#1A3A5C", active: true,  preview: "arslan-hukuk.web10micro.com" },
  { id: "veteriner", label: "Veteriner",          icon: "🐾", color: "#27AE60", active: true,  preview: "nuhungemisi-vet.com.tr" },
  { id: "restoran",  label: "Restoran / Kafe",    icon: "🍽️", color: "#C0392B", active: false },
  { id: "guzellik",  label: "Güzellik / Kuaför",  icon: "✂️", color: "#C9A96E", active: false },
  { id: "saglik",    label: "Sağlık / Klinik",    icon: "🏥", color: "#0B6E8E", active: false },
  { id: "insaat",    label: "İnşaat / Tadilat",   icon: "🏗️", color: "#E67E22", active: false },
  { id: "oto",       label: "Oto Servis",         icon: "🔧", color: "#C0392B", active: false },
  { id: "muhasebe",  label: "Muhasebe",           icon: "📊", color: "#1B4F72", active: false },
  { id: "egitim",    label: "Eğitim / Kurs",      icon: "🎓", color: "#6C3483", active: false },
  { id: "spor",      label: "Spor / Fitness",     icon: "💪", color: "#F39C12", active: false },
];

export function TemplateSelector({ onCTA }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="template" className="py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Başlık */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Sektöre Özel Tasarımlar
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Sektörünüzü seçin
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Her sektör için renk paleti, içerik yapısı ve görseller otomatik uyarlanır.
            2 sektör aktif, diğerleri yakında ekleniyor.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => s.active && setSelected(s.id === selected ? null : s.id)}
              className={`
                relative rounded-2xl border-2 p-4 text-left transition-all duration-200
                ${s.active
                  ? selected === s.id
                    ? "border-[var(--primary)] bg-[var(--primary-light)] shadow-lg shadow-blue-100"
                    : "border-[var(--border)] bg-white hover:border-[var(--primary)] hover:shadow-md cursor-pointer card-hover"
                  : "border-[var(--border)] bg-white opacity-60 cursor-not-allowed"
                }
              `}
            >
              {!s.active && (
                <span className="absolute top-2 right-2 text-[9px] font-semibold bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                  Yakında
                </span>
              )}
              {s.active && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--success)]" />
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                style={{ backgroundColor: s.color + "18" }}
              >
                {s.icon}
              </div>

              <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{s.label}</p>

              {s.active && s.preview && (
                <p className="text-[10px] text-[var(--text-muted)] mt-1 truncate">{s.preview}</p>
              )}
            </button>
          ))}
        </div>

        {/* Seçili sektör önizleme */}
        {selected && (
          <div className="mt-8 bg-white rounded-3xl border border-[var(--border)] p-6 shadow-sm">
            {(() => {
              const s = sectors.find(x => x.id === selected)!;
              return (
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <h3 className="font-bold text-[var(--text-primary)]">{s.label} Template</h3>
                        <p className="text-xs text-[var(--text-muted)]">Canlı örnek: {s.preview}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                      Bu sektöre özel renk paleti, tipografi ve içerik yapısıyla hazırlanmış template. Google Maps linkinizi yapıştırın, Mira geri kalanını halleder.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={`https://${s.preview}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--primary)] border border-[var(--primary)] px-4 py-2 rounded-xl hover:bg-[var(--primary-light)] transition-colors"
                      >
                        Canlı Örneği Gör →
                      </a>
                      <button
                        onClick={() => onCTA(s.label)}
                        className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-2 rounded-xl hover:bg-[var(--primary-dark)] transition-colors"
                      >
                        Bu Template ile Başla
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[s.color, s.color + "99", s.color + "33"].map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          Tüm sektörler yakında eklenecek · Her hafta yeni template
        </p>
      </div>
    </section>
  );
}
