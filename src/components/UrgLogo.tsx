/**
 * United Realty Group wordmark — rebuilt as a theme-aware SVG in the site palette.
 *
 * The original brand logo is cyan / royal-blue / grey; here it is recolored to the
 * site's gold (#B08D57) accent with a wordmark that inherits `currentColor`, so it
 * reads white over the dark hero and navy once the header turns solid on scroll.
 *
 * Pass the wordmark color via the parent's text color (currentColor); the swoosh
 * and "Realty Group" line stay gold to match the rest of the site.
 */
export function UrgLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 224 72"
      className={className}
      role="img"
      aria-label="United Realty Group"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Swoosh — white, matches wordmark */}
      <path
        d="M8 38 C 9 16, 52 7, 112 7 C 172 7, 214 13, 218 33"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* UNITED */}
      <text
        x="112"
        y="48"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="31"
        fontWeight="700"
        letterSpacing="2.5"
        fill="currentColor"
      >
        UNITED
      </text>
      {/* Realty Group */}
      <text
        x="113"
        y="67"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="15"
        fontWeight="500"
        letterSpacing="4"
        fill="currentColor"
        opacity="0.7"
      >
        Realty Group
      </text>
    </svg>
  );
}
