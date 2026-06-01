const STEPS = [
  {
    number: "01",
    name: "Position",
    headline: "Pricing strategy before the listing goes live.",
    body: "Absorption rate analysis, active competition review, buyer profile identification, and realistic price range determination based on current MLS data for your submarket.",
  },
  {
    number: "02",
    name: "Prepare",
    headline: "Presentation that earns the price.",
    body: "Professional photography coordination, MLS data accuracy review, documentation checklist (permits, HOA, inspection pre-work), and launch sequencing to maximize first-impression impact.",
  },
  {
    number: "03",
    name: "Launch",
    headline: "Day-one MLS activation and syndication.",
    body: "Active listing entry through the Miami and South Florida REALTORS® MLS. Eligible syndication to 500+ websites in 19 languages where available, subject to MLS rules and platform participation.",
  },
  {
    number: "04",
    name: "Activate",
    headline: "Professional outreach beyond the listing.",
    body: "Targeted outreach to buyer agents within the 93,000-member network. International referral channel activation for LATAM and European buyer pipelines. Spain and Madrid desk coordination where applicable.",
  },
  {
    number: "05",
    name: "Negotiate",
    headline: "Offer strategy and closing coordination.",
    body: "Offer review, terms analysis, inspection period management, and closing coordination from contract to keys. Every step handled directly — no junior associates, no delegation.",
  },
];

export function SellerProcess() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          How a Listing Works
        </p>
        <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
          Five stages. One point of contact throughout.
        </h2>
        <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-navy/55">
          Every South Florida listing Carlos handles follows a consistent five-stage process — from
          the first pricing conversation to the closing table.
        </p>

        <div className="mt-12 space-y-0">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="group relative grid border-t border-bone py-8 md:grid-cols-[120px_1fr] md:gap-10 last:border-b"
            >
              {/* Step number + name */}
              <div className="mb-4 flex items-center gap-4 md:mb-0 md:flex-col md:items-start md:gap-2">
                <span className="font-mono text-[2.2rem] font-bold leading-none text-gold/20 transition-colors group-hover:text-gold/40">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                  {step.name}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-xl text-navy-deep">{step.headline}</h3>
                <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-navy/60">
                  {step.body}
                </p>
              </div>

              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute bottom-0 left-[52px] hidden h-8 w-px translate-y-full bg-gold/15 md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Request a Confidential Property Review
          </a>
          <a
            href="/home-value"
            className="inline-flex items-center gap-2 border border-navy/30 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold"
          >
            Free Home Valuation
          </a>
        </div>

        <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-navy/30">
          United Realty Group · FL SL705771 · Equal Housing Opportunity · Eligible distribution subject to MLS rules and syndication partner availability
        </p>
      </div>
    </section>
  );
}
