"use client";
import { useState, useRef, useEffect } from "react";
import { MiraAvatar } from "./MiraAvatar";

type Message = {
  id: number;
  from: "user" | "mira";
  text: string;
  status?: "sending" | "done" | "applied";
};

const DEMO_TOKENS = 24;

export function MiraChat() {
  const [open, setOpen] = useState(false);
  const [tokens, setTokens] = useState(DEMO_TOKENS);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "mira",
      text: "Merhaba! 👋 Ben Mira. Sitenizde değişiklik yapmak ister misiniz? \"Rengi değiştir\", \"Telefon numarasını güncelle\", \"Hizmet ekle\" gibi şeyler söyleyebilirsiniz.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = () => {
    if (!input.trim() || thinking || tokens <= 0) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTokens(t => t - 1);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const reply: Message = {
        id: Date.now() + 1,
        from: "mira",
        text: "Anlıyorum! Bu değişikliği sitenize uyguluyorum... ✅ Değişiklikler uygulandı. Başka bir düzenleme ister misiniz?",
        status: "applied",
      };
      setMessages(prev => [...prev, reply]);
    }, 1800);
  };

  const tokenColor = tokens > 20 ? "var(--token-color)" : tokens > 5 ? "var(--warning)" : "#EF4444";
  const tokenBg   = tokens > 20 ? "#F3F0FF" : tokens > 5 ? "#FFF8E6" : "#FEF2F2";

  return (
    <>
      {/* Floating buton */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {!open && (
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-lg px-4 py-2 text-sm font-medium text-[var(--text-primary)] animate-bounce">
            Mira ile Düzenle ✦
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] shadow-xl shadow-blue-200 flex items-center justify-center transition-all"
        >
          {open
            ? <span className="text-white text-xl">✕</span>
            : <MiraAvatar mood="greeting" size={40} />
          }
        </button>
      </div>

      {/* Chat paneli */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-h-[520px] bg-white rounded-3xl border border-[var(--border)] shadow-2xl shadow-blue-100 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary-light)] to-white">
            <MiraAvatar mood={thinking ? "thinking" : "greeting"} size={36} />
            <div className="flex-1">
              <p className="font-bold text-sm text-[var(--text-primary)]">Mira</p>
              <p className="text-[10px] text-[var(--text-muted)]">Site Asistanı · {thinking ? "düşünüyor..." : "hazır"}</p>
            </div>
            {/* Token göstergesi */}
            <button
              onClick={() => setShowTokenModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors hover:opacity-80"
              style={{ backgroundColor: tokenBg, color: tokenColor }}
            >
              <span>💎</span>
              <span>{tokens}</span>
            </button>
          </div>

          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                {msg.from === "mira" && <MiraAvatar mood="helping" size={24} className="flex-shrink-0 mt-1" />}
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-[var(--primary)] text-white rounded-br-sm"
                      : msg.status === "applied"
                        ? "bg-green-50 text-[var(--text-primary)] border border-green-100 rounded-bl-sm"
                        : "bg-gray-50 text-[var(--text-primary)] rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Thinking state */}
            {thinking && (
              <div className="flex gap-2 items-center">
                <MiraAvatar mood="thinking" size={24} />
                <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Token bitti uyarısı */}
            {tokens === 0 && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-3 text-center">
                <p className="text-xs font-semibold text-red-600 mb-2">Tokenleriniz bitti</p>
                <button
                  onClick={() => setShowTokenModal(true)}
                  className="text-xs font-bold bg-[var(--token-color)] text-white px-4 py-1.5 rounded-lg"
                >
                  Token Satın Al →
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-[var(--border)]">
            {tokens > 0 && tokens <= 5 && (
              <p className="text-[10px] text-[var(--warning)] font-semibold mb-2 text-center">
                ⚠️ {tokens} token kaldı
              </p>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder={tokens > 0 ? "Mira'ya yazın..." : "Token gerekli"}
                disabled={tokens === 0 || thinking}
                className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-sm outline-none border border-[var(--border)] focus:border-[var(--primary)] disabled:opacity-50 placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={send}
                disabled={!input.trim() || thinking || tokens === 0}
                className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center text-sm font-bold disabled:opacity-40 hover:bg-[var(--primary-dark)] transition-colors flex-shrink-0"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Token satın al modal */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowTokenModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Token Satın Al</h3>
                <p className="text-xs text-[var(--text-muted)]">Mevcut: <strong className="text-[var(--token-color)]">💎 {tokens}</strong></p>
              </div>
              <button onClick={() => setShowTokenModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">✕</button>
            </div>
            {[
              { tokens: 50,  price: "49",  label: "Başlangıç" },
              { tokens: 200, price: "149", label: "En Popüler", popular: true },
              { tokens: 500, price: "299", label: "Avantajlı" },
            ].map(pack => (
              <div
                key={pack.tokens}
                onClick={() => { setTokens(t => t + pack.tokens); setShowTokenModal(false); }}
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer mb-3 transition-all hover:border-[var(--token-color)] ${pack.popular ? "border-[var(--token-color)] bg-[#F3F0FF]" : "border-[var(--border)]"}`}
              >
                {pack.popular && <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-[var(--token-color)] text-white px-2 py-0.5 rounded-full">En Popüler</span>}
                <div className="flex items-center gap-2">
                  <span>💎</span>
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)]">{pack.tokens} Token</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{pack.label}</p>
                  </div>
                </div>
                <p className="font-black text-[var(--text-primary)]">₺{pack.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
