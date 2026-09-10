export function SellerPillars() {
  return (
    <section aria-label="Three structural outcomes for South Florida sellers" className="bg-white py-12 md:py-20 border-y border-bone">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
            Strategic Advisory &amp; Transaction Structuring
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:mt-4 md:text-5xl">
            Beyond Standard MLS Listings: Three Structural Outcomes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-navy/70 md:text-lg">
            High-equity transactions require sophisticated contractual structuring, tax window coordination, and verified distribution reach.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Pillar 1 */}
          <div className="border border-bone bg-ivory p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink mb-3">
                Pillar 01
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-navy-deep">
                Institutional Distribution
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-navy/75">
                Simultaneous deployment across 93,000 member agents in the Miami and South Florida REALTORS® ecosystem, 260+ U.S. MLS markets through RPR bilateral feeds, and 200+ global consumer portals in 19 languages.
              </p>
            </div>
            <div className="mt-6 border-t border-bone pt-4 font-mono text-[11px] text-navy/60">
              Miami MLS · 93,000 Agents · 200+ Portals
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="border border-gold/40 bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm relative">
            <div className="absolute top-0 right-0 bg-gold px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-navy-deep">
              Verified Outcome
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink mb-3">
                Pillar 02
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-navy-deep">
                Post-Occupancy Structuring
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-navy/75">
                Proven leaseback and occupancy negotiation allowing equity-rich sellers to complete their closing, secure sale proceeds in escrow, and coordinate their subsequent acquisition without bridging disruption—evidenced by Carlos's verified 7-month post-closing leaseback outcome.
              </p>
            </div>
            <div className="mt-6 border-t border-bone pt-4 font-mono text-[11px] text-navy/60">
              Custom Post-Occupancy · Zero Bridging Stress
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="border border-bone bg-ivory p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink mb-3">
                Pillar 03
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-navy-deep">
                Homestead &amp; Equity Advisory
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-navy/75">
                Navigating Florida Save Our Homes assessment caps and portability transfer windows, aligned with Section 121 capital gains exclusion planning in close coordination with your CPA and wealth advisors.
              </p>
            </div>
            <div className="mt-6 border-t border-bone pt-4 font-mono text-[11px] text-navy/60">
              Save Our Homes Portability · Tax Alignment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
