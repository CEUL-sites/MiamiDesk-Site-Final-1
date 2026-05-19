import { CONTACT, PARTNER_AGENCIES } from "../constants";

// COOPERATION DISCLOSURE: This component lists agencies for professional recognition of market participants in South Florida and Spain. It does not imply formal partnership agreements with all listed agencies unless separately confirmed. Edit the list to reflect only agencies with active cooperation before publishing. Review with broker before deployment.

function AgencyRow({ agencies, reverse = false }: { agencies: { name: string; market: string }[]; reverse?: boolean }) {
  const items = [...agencies, ...agencies, ...agencies];
  return (
    <div className="marquee-container py-7">
      <div className={`${reverse ? "marquee-track-reverse-fast" : "marquee-track"} gap-0`}>
        {items.map((agency, index) => (
          <div key={`${agency.name}-${index}`} className="group flex items-center gap-8 px-8">
            <div className="flex flex-col">
              <span className="whitespace-nowrap font-serif text-xl text-white/80 transition-colors duration-300 group-hover:text-gold">{agency.name}</span>
              <span className="font-mono mt-1 text-[9px] uppercase tracking-[0.25em] text-gold/40">{agency.market}</span>
            </div>
            <div className="h-8 w-px flex-shrink-0 bg-gold/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section id="partners" className="bg-navy-deep text-white">
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-20 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Professional Market · Cooperation Network</p>
        <h2 className="mt-5 font-serif text-4xl text-white lg:text-5xl">The agencies we work alongside.</h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/50">
          South Florida's luxury market operates through professional agent-to-agent cooperation. Carlos has cultivated relationships across the region's active brokerages and in Madrid through years of transactional work.
        </p>
      </div>

      <div className="border-y border-white/10">
        <div className="px-6 pt-8 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-gold">South Florida Market</div>
        <AgencyRow agencies={PARTNER_AGENCIES.southFlorida} />
        <div className="h-px bg-gold/20" />
        <div className="px-6 pt-8 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Spain · Madrid Market</div>
        <AgencyRow agencies={PARTNER_AGENCIES.spain} reverse />
      </div>

      <div className="px-6 py-14 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">Professional cooperation inquiries: {CONTACT.email}</p>
        <div className="mx-auto mt-5 inline-flex border border-gold/30 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
          Miami and South Florida REALTORS® member · 93,000 agent network
        </div>
      </div>
    </section>
  );
}
