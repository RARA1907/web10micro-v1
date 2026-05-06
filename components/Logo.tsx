export function Logo({ size = "md", className = "", variant = "normal" }: { size?: "sm" | "md" | "lg"; className?: string; variant?: "normal" | "white" }) {
  const heights = { sm: 28, md: 36, lg: 48 };

  return (
    <img
      src={variant === "white" ? "/logo_white.png" : "/logo_normal.png"}
      alt="web10micro"
      height={heights[size]}
      className={className}
      style={{ height: heights[size], width: "auto" }}
    />
  );
}
