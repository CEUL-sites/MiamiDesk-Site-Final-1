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
      className={`mx-auto mt-8 flex max-w-3xl flex-wrap items-stretch justify-center divide-x divide-white/10 border-y border-white/10 ${className}`}
      role="list"
      aria-label="Distribution network reach"
    >
      {REACH_FIGURES.map((f) => (
        <div key={f.label} role="listitem" className="flex-1 min-w-[6.5rem] px-3 py-3 text-center">
          <div className="font-serif text-xl text-gold leading-none md:text-2xl">{f.value}</div>
          <div className="mt-1.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/45 md:text-[8px]">
            {f.label}
          </div>
        </div>
      ))}
    </div>
  );
}
