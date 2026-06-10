/**
 * MIAMI REALTORS® membership/affiliation mark.
 *
 * United Realty Group is a member of the MIAMI Association of REALTORS®; this is
 * a membership badge, not an endorsement. The official logo is navy on transparent,
 * so `variant="dark"` renders it white (for dark sections) and `variant="light"`
 * keeps the original navy (for light sections).
 */
export function MiamiRealtorsBadge({
  lang = "en",
  variant = "dark",
  className = "",
}: {
  lang?: "en" | "es";
  variant?: "dark" | "light";
  className?: string;
}) {
  const text =
    lang === "es"
      ? "Miembro de la Asociación de REALTORS® de Miami"
      : "Member of the MIAMI Association of REALTORS®";
  const dark = variant === "dark";
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <picture>
        <source srcSet="/images/miami-realtors-logo.webp" type="image/webp" />
        <img
          src="/images/miami-realtors-logo.png"
          alt={text}
          width="160"
          height="55"
          loading="lazy"
          className="h-8 w-auto opacity-85"
          style={dark ? { filter: "brightness(0) invert(1)" } : undefined}
        />
      </picture>
      <p className={`font-mono text-[9px] uppercase tracking-[0.22em] ${dark ? "text-white/35" : "text-navy/45"}`}>
        {text}
      </p>
    </div>
  );
}
