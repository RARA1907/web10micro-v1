export function Logo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const heights = { sm: 28, md: 36, lg: 48 };
  const h = heights[size];

  return (
    <svg height={h} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* web */}
      <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="26" fill="#0F0F1A">web</text>
      {/* 10 - vurgulu */}
      <rect x="56" y="4" width="34" height="26" rx="6" fill="#7C3AED" />
      <text x="62" y="23" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" fill="white">10</text>
      {/* micro */}
      <text x="93" y="30" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="26" fill="#0F0F1A">micro</text>
      {/* nokta detayı */}
      <circle cx="174" cy="28" r="3" fill="#FF6B35" />
    </svg>
  );
}
