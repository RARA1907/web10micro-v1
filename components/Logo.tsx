export function Logo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const heights = { sm: 28, md: 36, lg: 48 };

  return (
    <img
      src="/logo_white.png"
      alt="web10micro"
      height={heights[size]}
      className={className}
      style={{ height: heights[size], width: "auto" }}
    />
  );
}
