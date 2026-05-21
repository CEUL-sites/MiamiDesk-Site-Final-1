import { ChevronRight } from "lucide-react";

const NEIGHBORHOODS = [
  { name: "Coral Gables", county: "Miami-Dade", context: "One of South Florida's most consistently competitive submarkets, with strong demand from LATAM buyers and domestic professionals." },
  { name: "Brickell", county: "Miami-Dade", context: "Miami's financial district draws international buyers and corporate relocations. Condo inventory moves with global capital flows." },
  { name: "Weston", county: "Broward", context: "Master-planned community preferred by LATAM families. United Realty Group's Weston office provides deep local agent relationships." },
  { name: "Coconut Grove", county: "Miami-Dade", context: "Established neighborhood with waterfront estates and a buyer pool that values privacy and proximity to downtown." },
  { name: "Key Biscayne", county: "Miami-Dade", context: "Island inventory is finite by geography. Buyers are predominantly international HNW individuals. Days on market is among the lowest in the region." },
  { name: "Aventura", county: "Miami-Dade", context: "High-rise luxury corridor with strong Venezuelan and Colombian buyer presence. Condo pricing benchmarks closely to Bal Harbour." },
  { name: "Bal Harbour", county: "Miami-Dade", context: "Ultra-luxury waterfront. Properties at this tier require the full 93,000-agent distribution infrastructure to reach qualified buyers." },
  { name: "Doral", county: "Miami-Dade", context: "South Florida's fastest-growing LATAM community hub. Strong demand from Venezuelan and Colombian buyers seeking residential and investment property." },
  { name: "Fort Lauderdale", county: "Broward", context: "Waterfront inventory and boating community draw both domestic and European buyers. Strong rental investment market." },
];

export function NeighborhoodGrid() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Markets We Serve</p>
        <h2 className="mt-4 font-serif text-4xl text-navy lg:text-5xl">Your neighborhood. Our 25-year presence.</h2>
        <p className="mt-4 max-w-2xl font-sans text-[0.95rem] font-light leading-relaxed text-navy/60">
          Every South Florida market has its own pricing dynamics, buyer profile, and timing window. Carlos has active transaction history across all of them.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} className="border border-bone border-l-2 border-l-gold/30 bg-white p-6 transition-all duration-300 hover:border-gold hover:border-l-gold hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl text-navy">{n.name}</h3>
                <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.15em] text-gold bg-navy/5 border border-gold/40 px-2 py-1">{n.county}</span>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-navy/60">{n.context}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="/contact" className="group inline-flex items-center gap-2 bg-navy px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-gold">
            Schedule a strategy review for your specific neighborhood
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
