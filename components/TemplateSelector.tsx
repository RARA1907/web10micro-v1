"use client";

interface Props {
  onCTA: (sector?: string) => void;
}

const templates = [
  {
    id: "hukuk",
    label: "Hukuk / Avukat",
    icon: "⚖️",
    color: "#1A3A5C",
    active: true,
    url: "/templates/hukuk-avukat/index.html",
    img: "/template-hukuk.png",
    desc: "Şık ve güvenilir hukuk bürosu tasarımı.",
  },
  {
    id: "veteriner",
    label: "Veteriner",
    icon: "🐾",
    color: "#27AE60",
    active: true,
    url: "/templates/veteriner/index.html",
    img: "/template-veteriner.png",
    desc: "Sıcak ve profesyonel veteriner kliniği sitesi.",
  },
  {
    id: "restoran",
    label: "Restoran / Kafe",
    icon: "🍽️",
    color: "#C0392B",
    active: true,
    url: "/templates/restoran-kafe/index.html",
    img: "/template-restoran.png",
    desc: "Butik restoranlar için şık, sıcak ve davetkar web tasarımı.",
  },
  {
    id: "guzellik",
    label: "Güzellik / Kuaför",
    icon: "✂️",
    color: "#C9A96E",
    active: true,
    url: "/templates/guzellik-kuafor/index.html",
    img: "/template-guzellik.png",
    desc: "Modern butik kuaför ve güzellik salonu sitesi.",
  },
  {
    id: "saglik",
    label: "Sağlık / Klinik",
    icon: "🏥",
    color: "#0B6E8E",
    active: true,
    url: "/templates/saglik-klinik/index.html",
    img: "/template-saglik.png",
    desc: "Modern sağlık kliniği için güvenilir ve profesyonel web tasarımı.",
  },
  {
    id: "dis-klinigi",
    label: "Diş Kliniği",
    icon: "🦷",
    color: "#8AB4A0",
    active: true,
    url: "/templates/dis-klinigi/index.html",
    img: "/template-dis.png",
    desc: "Modern diş kliniği, beyaz ve mint temalı tasarım.",
  },
  {
    id: "insaat",
    label: "İnşaat / Tadilat",
    icon: "🏗️",
    color: "#E67E22",
    active: true,
    url: "/templates/insaat-tadilat/index.html",
    img: "/template-insaat.png",
    desc: "İnşaat ve tadilat firmaları için sağlam ve profesyonel web sitesi.",
  },
  {
    id: "oto",
    label: "Oto Servis",
    icon: "🔧",
    color: "#C0392B",
    active: true,
    url: "/templates/oto-servis/index.html",
    img: "/template-oto.png",
    desc: "Oto servis ve yıkama işletmeleri için güvenilir web tasarımı.",
  },
  {
    id: "muhasebe",
    label: "Muhasebe",
    icon: "📊",
    color: "#1B4F72",
    active: true,
    url: "/templates/muhasebe/index.html",
    img: "/template-muhasebe.png",
    desc: "Mali müşavir ve muhasebeciler için profesyonel web tasarımı.",
  },
  {
    id: "egitim",
    label: "Eğitim / Kurs",
    icon: "🎓",
    color: "#6C3483",
    active: true,
    url: "/templates/egitim-kurs/index.html",
    img: "/template-egitim.png",
    desc: "Kurs merkezleri ve eğitim kurumları için modern web tasarımı.",
  },
  {
    id: "spor",
    label: "Spor / Fitness",
    icon: "💪",
    color: "#F39C12",
    active: false,
  },
];

export function TemplateSelector({ onCTA }: Props) {
  return (
    <section id="template" className="py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Örnek Tasarımlar
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Şablonları keşfedin
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Her sektöre özel profesyonel tasarımlar. Canlı örnekleri inceleyin, sıradaki sizin işletmeniz olsun.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {templates.map((t) =>
            t.active ? (
              <a
                key={t.id}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-3xl border border-[var(--border)] overflow-hidden card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                  <img
                    src={t.img}
                    alt={t.label}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{t.icon}</span>
                      <h3 className="font-bold text-[var(--text-primary)]">{t.label}</h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">{t.desc}</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCTA(); }}
                    className="text-xs font-semibold bg-[var(--primary)] text-white px-3 py-1.5 rounded-lg hover:bg-[var(--primary-dark)] transition-colors whitespace-nowrap opacity-0 group-hover:opacity-100"
                  >
                    Demo Talep Et
                  </button>
                </div>
              </a>
            ) : (
              <div
                key={t.id}
                className="relative bg-white rounded-3xl border-2 border-dashed border-[var(--border)] p-8 flex flex-col items-center justify-center text-center opacity-60 min-h-[200px]"
              >
                <span className="text-3xl mb-3">{t.icon}</span>
                <p className="font-semibold text-[var(--text-primary)] mb-1">{t.label}</p>
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                  Yakında
                </span>
              </div>
            )
          )}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          Her hafta yeni şablon ekleniyor · Sektörünüz yoksa bize bildirin
        </p>
      </div>
    </section>
  );
}