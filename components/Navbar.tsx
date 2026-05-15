"use client";
import { useState } from "react";
import { Logo } from "./Logo";

interface Props {
  onCTA: () => void;
}

export function Navbar({ onCTA }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-8">
          <a href="#nasil-calisir" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Nasıl Çalışır?</a>
          <a href="#template" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Sektörler</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onCTA}
            className="text-sm font-semibold bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--primary-dark)] transition-colors"
          >
            Demo Talep Et
          </button>
        </div>

        {/* Mobil hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-4 h-0.5 bg-gray-700" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[var(--border)] px-4 py-4 flex flex-col gap-4">
          <a href="#nasil-calisir" className="text-sm text-[var(--text-secondary)]" onClick={() => setOpen(false)}>Nasıl Çalışır?</a>
          <a href="#template" className="text-sm text-[var(--text-secondary)]" onClick={() => setOpen(false)}>Sektörler</a>
          <button
            onClick={() => { setOpen(false); onCTA(); }}
            className="text-sm font-semibold bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl"
          >
            Demo Talep Et
          </button>
        </div>
      )}
    </nav>
  );
}
