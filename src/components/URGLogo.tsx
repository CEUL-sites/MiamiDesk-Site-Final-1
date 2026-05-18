/**
 * United Realty Group logo — SVG recreation.
 * variant="color"  → full color (cyan arc + navy text + gray subtext) for light backgrounds
 * variant="white"  → monochrome white, for dark/navy backgrounds
 */
export function URGLogo({
  variant = "color",
  className = "",
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  const unitedFill  = variant === "white" ? "#FFFFFF"              : "#1B2D8F";
  const subFill     = variant === "white" ? "rgba(255,255,255,0.6)" : "#9EA3B0";
  const arcStroke   = variant === "white" ? "rgba(255,255,255,0.7)" : "#00BCD4";

  return (
    <svg
      viewBox="0 0 224 74"
      className={className}
      role="img"
      aria-label="United Realty Group"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sweeping arc — the signature "C" shape of the URG mark */}
      <path
        d="M 7 68 C -2 44, 12 5, 198 13"
        stroke={arcStroke}
        strokeWidth="9.5"
        strokeLinecap="round"
      />

      {/* UNITED — heavy condensed weight */}
      <text
        x="30"
        y="53"
        fontFamily="Impact, 'Arial Black', 'Franklin Gothic Heavy', sans-serif"
        fontWeight="900"
        fontSize="40"
        fill={unitedFill}
        letterSpacing="1.5"
      >
        UNITED
      </text>

      {/* Realty  Group — spaced italic */}
      <text
        x="51"
        y="69"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="17"
        fill={subFill}
        letterSpacing="4"
      >
        Realty  Group
      </text>
    </svg>
  );
}
