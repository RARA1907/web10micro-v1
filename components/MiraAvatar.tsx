"use client";

type MiraMood = "greeting" | "thinking" | "celebrating" | "helping";

export function MiraAvatar({ mood = "greeting", size = 64, className = "" }: {
  mood?: MiraMood;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arka plan daire */}
      <circle cx="40" cy="40" r="40" fill="url(#mira-bg)" />

      {/* Yüz */}
      <circle cx="40" cy="36" r="20" fill="#FFFFFF" fillOpacity="0.95" />

      {/* Gözler */}
      {mood === "thinking" ? (
        <>
          <path d="M31 33 Q33 31 35 33" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M45 33 Q47 31 49 33" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : mood === "celebrating" ? (
        <>
          <path d="M30 34 Q33 30 36 34" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 34 Q47 30 50 34" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="33" cy="33" r="3.5" fill="#1B2FFF" />
          <circle cx="47" cy="33" r="3.5" fill="#1B2FFF" />
          <circle cx="34.2" cy="31.8" r="1.2" fill="white" />
          <circle cx="48.2" cy="31.8" r="1.2" fill="white" />
        </>
      )}

      {/* Ağız */}
      {mood === "celebrating" ? (
        <path d="M33 41 Q40 48 47 41" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : mood === "thinking" ? (
        <path d="M34 42 Q40 44 46 42" stroke="#1B2FFF" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M34 41 Q40 46 46 41" stroke="#1B2FFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Saç / başlık detayı */}
      <path d="M22 30 Q24 16 40 15 Q56 16 58 30" fill="#1B2FFF" fillOpacity="0.15" />
      <path d="M40 15 Q44 10 48 14" stroke="#1B2FFF" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Kulaklar */}
      <circle cx="20" cy="36" r="4" fill="white" fillOpacity="0.9" />
      <circle cx="60" cy="36" r="4" fill="white" fillOpacity="0.9" />

      {/* Vücut */}
      <path d="M26 56 Q26 48 40 48 Q54 48 54 56 L56 66 Q56 68 40 68 Q24 68 24 66 Z" fill="#1B2FFF" fillOpacity="0.2" />
      <path d="M30 48 Q30 44 40 44 Q50 44 50 48" fill="white" fillOpacity="0.9" />

      {/* Kutlama için yıldızlar */}
      {mood === "celebrating" && (
        <>
          <text x="8" y="20" fontSize="10" fill="#FFB020">★</text>
          <text x="60" y="18" fontSize="8" fill="#FF6B35">✦</text>
          <text x="62" y="32" fontSize="7" fill="#FFB020">✦</text>
        </>
      )}

      {/* Düşünme için noktalar */}
      {mood === "thinking" && (
        <>
          <circle cx="60" cy="20" r="3" fill="#1B2FFF" fillOpacity="0.4" />
          <circle cx="67" cy="15" r="2" fill="#1B2FFF" fillOpacity="0.25" />
          <circle cx="72" cy="10" r="1.5" fill="#1B2FFF" fillOpacity="0.15" />
        </>
      )}

      {/* Gradient tanımı */}
      <defs>
        <radialGradient id="mira-bg" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#EEF0FF" />
          <stop offset="100%" stopColor="#DDE0FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
