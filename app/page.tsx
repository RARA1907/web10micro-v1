import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Pricing } from "@/components/Pricing";
import { MiraChat } from "@/components/MiraChat";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <TemplateSelector />
        <Pricing />
      </main>

      {/* Footer */}
      <footer className="bg-[#0F0F1A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Logo size="md" className="brightness-0 invert mb-4" />
              <p className="text-sm text-gray-400 leading-relaxed">
                KOBİ&apos;ler için yapay zeka destekli web sitesi oluşturucu. 60 saniyede profesyonel, uygun fiyatlı.
              </p>
            </div>
            {[
              { title: "Ürün", links: ["Nasıl Çalışır?", "Sektörler", "Fiyatlar", "Demo Oluştur"] },
              { title: "Şirket", links: ["Hakkımızda", "Blog", "İletişim", "Kariyer"] },
              { title: "Destek", links: ["SSS", "Gizlilik", "Kullanım Şartları", "KVKK"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 web10micro. Tüm hakları saklıdır.</p>
            <p className="text-xs text-gray-500">Mira ✦ ile güçlendirildi</p>
          </div>
        </div>
      </footer>

      {/* Mira Chat — tüm sayfalarda floating */}
      <MiraChat />
    </>
  );
}
