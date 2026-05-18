/**
 * CLHMS — Certified Luxury Home Marketing Specialist seal.
 * Circular gold seal with serrated outer ring, arc text, star, and badge lettering.
 */
export function CLHMSSeal({
  size = 88,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const gold  = "#C9A84C";
  const cx = 50, cy = 50;

  // Outer serrated ring: alternating between outerR and innerR around the full circle
  const teeth   = 62;
  const outerR  = 48.5;
  const innerR  = 43;
  const gearPts = Array.from({ length: teeth * 2 }, (_, i) => {
    const angle = (i / (teeth * 2)) * 2 * Math.PI - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  // Arc paths for curved text — both share same radius so text sits in the ring
  const tr = 35; // text radius (baseline)
  const topArc = `M ${cx - tr} ${cy} A ${tr} ${tr} 0 0 0 ${cx + tr} ${cy}`;
  const botArc = `M ${cx - tr} ${cy} A ${tr} ${tr} 0 0 1 ${cx + tr} ${cy}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="CLHMS Certified Luxury Home Marketing Specialist"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="clhms-top-arc" d={topArc} />
        <path id="clhms-bot-arc" d={botArc} />
      </defs>

      {/* ── Outer serrated ring ── */}
      <polygon points={gearPts} fill={gold} />

      {/* ── Solid gold disc ── */}
      <circle cx={cx} cy={cy} r={42.5} fill={gold} />

      {/* ── Ring borders (white) ── */}
      <circle cx={cx} cy={cy} r={39.5} fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="0.65" />
      <circle cx={cx} cy={cy} r={28}   fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="0.65" />

      {/* ── Top arc: CERTIFIED LUXURY HOME ── */}
      <text fontSize="4.3" fill="white" fontFamily="Georgia, serif" letterSpacing="1.1">
        <textPath href="#clhms-top-arc" startOffset="50%" textAnchor="middle">
          CERTIFIED LUXURY HOME
        </textPath>
      </text>

      {/* ── Bottom arc: MARKETING SPECIALIST® ── */}
      <text fontSize="3.85" fill="white" fontFamily="Georgia, serif" letterSpacing="0.95">
        <textPath href="#clhms-bot-arc" startOffset="50%" textAnchor="middle">
          MARKETING SPECIALIST®
        </textPath>
      </text>

      {/* ── Inner horizontal bars ── */}
      <line x1={cx - 22} y1={cy - 9.5} x2={cx + 22} y2={cy - 9.5} stroke="rgba(255,255,255,0.82)" strokeWidth="0.75" />
      <line x1={cx - 22} y1={cy + 10}  x2={cx + 22} y2={cy + 10}  stroke="rgba(255,255,255,0.82)" strokeWidth="0.75" />

      {/* ── Star ── */}
      <text
        x={cx} y={cy - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="9.5"
        fontFamily="serif"
      >
        ★
      </text>

      {/* ── CLHMS ── */}
      <text
        x={cx} y={cy + 8}
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        letterSpacing="1.8"
      >
        CLHMS
      </text>
    </svg>
  );
}
