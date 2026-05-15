"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TemplateSelector } from "@/components/TemplateSelector";
import { MiraChat } from "@/components/MiraChat";
import { DemoModal } from "@/components/DemoModal";
import { Logo } from "@/components/Logo";

const offices = [
  { city: "İstanbul", flag: "🇹🇷", address: "Büyükdere Cad. No:128", district: "Levent, 34394" },
  { city: "London",   flag: "🇬🇧", address: "25 Cabot Square",        district: "Canary Wharf, E14 4QZ" },
  { city: "New York", flag: "🇺🇸", address: "350 Fifth Ave, Ste 5600", district: "New York, NY 10118" },
  { city: "Miami",    flag: "🇺🇸", address: "1 SE 3rd Ave, Ste 2100",  district: "Miami, FL 33131" },
];

export default function Home() {
  const [modalOpen, setModalOpen]     = useState(false);
  const [modalUrl, setModalUrl]       = useState("");

  const openModal = (ctx?: string) => {
    if (ctx?.startsWith("http")) {
      setModalUrl(ctx);
    } else {
      setModalUrl("");
    }
    setModalOpen(true);
  };

  return (
    <>
      <Navbar onCTA={() => openModal()} />

      <main>
        <Hero onCTA={openModal} />
        <HowItWorks onCTA={() => openModal()} />
        <TemplateSelector onCTA={openModal} />
      </main>

      {/* Footer */}
      <footer className="bg-[#0F0F1A] text-white">

        {/* Ofis adresleri */}
        <div className="border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Ofislerimiz</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {offices.map((o) => (
                <div key={o.city}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{o.flag}</span>
                    <p className="text-sm font-semibold text-white">{o.city}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{o.address}</p>
                  <p className="text-xs text-gray-500">{o.district}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link kolonları */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Logo size="md" variant="white" className="mb-4" />
              <p className="text-sm text-gray-400 leading-relaxed">
                KOBİ'ler için demo odaklı web sitesi oluşturma platformu. 15 dakikada size özel demo.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Ürün</h4>
              <ul className="space-y-2">
                <li><a href="#nasil-calisir" className="text-sm text-gray-400 hover:text-white transition-colors">Nasıl Çalışır?</a></li>
                <li><a href="#template"      className="text-sm text-gray-400 hover:text-white transition-colors">Sektörler</a></li>
                <li>
                  <button onClick={() => openModal()} className="text-sm text-gray-400 hover:text-white transition-colors">
                    Demo Talep Et
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Şirket</h4>
              <ul className="space-y-2">
                {[["Hakkımızda","#"],["Blog","#"],["İletişim","#"],["Kariyer","#"]].map(([l, href]) => (
                  <li key={l}><a href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Destek</h4>
              <ul className="space-y-2">
                {[["SSS","#"],["Gizlilik","#"],["Kullanım Şartları","#"],["KVKK","#"]].map(([l, href]) => (
                  <li key={l}><a href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 <span className="text-white">web</span>10<span className="text-white">micro</span>. Tüm hakları saklıdır.</p>
            <p className="text-xs text-gray-500">Mira ✦ ile güçlendirildi</p>
          </div>
        </div>
      </footer>

      <MiraChat onCTACallback={() => openModal()} />

      <DemoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultUrl={modalUrl}
      />
    </>
  );
}
