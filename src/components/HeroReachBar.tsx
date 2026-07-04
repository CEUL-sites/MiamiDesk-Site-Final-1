// Compact, above-the-fold distribution-reach strip for seller/city hero sections.
// Surfaces the verified structural advantage immediately, before the fold,
// reinforcing the core seller argument. Figures must match the verified set
// (see src/constants.ts ASSOCIATION_STATS) — do not edit numbers here in
// isolation.

const REACH_FIGURES: { value: string; label: string }[] = [
  { value: "93,000", label: "Member agents" },
  { value: "200+",   label: "Global portals" },
  { value: "19",     label: "Languages" },
  { value: "437+",   label: "Int'l agreements" },
  { value: "260+",   label: "U.S. MLSs" },
];

export function HeroReachBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto mt-8 flex max-w-md flex-wrap items-start justify-center gap-x-6 gap-y-3 border-y border-white/10 py-4 sm:max-w-3xl sm:gap-x-10 ${className}`}
      role="list"
      aria-label="Distribution network reach"
    >
      {REACH_FIGURES.map((f) => (
        <div key={f.label} role="listitem" className="min-w-[5rem] text-center">
          <div className="font-serif text-xl leading-none text-gold md:text-2xl">{f.value}</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 md:text-[10px]">
            {f.label}
          </div>
        </div>
      ))}
    </div>
  );
}
