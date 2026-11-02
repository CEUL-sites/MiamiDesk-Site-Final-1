import { ArrowRight, Building, Compass, Globe2, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function HomepageObjectives() {
  return (
    <section
      id="property-objectives"
      aria-labelledby="property-objectives-heading"
      className="border-t border-hairline bg-ivory py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
              Choose Your Property Objective
            </p>
            <h2
              id="property-objectives-heading"
              className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl md:text-5xl tracking-tight"
            >
              Focused Advisory for Your Next Decision.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75 md:text-base">
            Dedicated representation for South Florida homeowners, relocating buyers, and cross-border property mandates.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Card 1: Sell in South Florida (Primary Focus: spans 6 cols on lg) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-lg border-2 border-gold/60 bg-navy-deep text-white shadow-lg lg:col-span-6">
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src="/images/sellers-waterfront-20260904.webp"
                  alt="South Florida waterfront property"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  width="1200"
                  height="675"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded bg-gold px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-navy-deep font-bold">
                  Primary Advisory Focus
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2 text-gold">
                  <Home size={18} aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
                    Seller Representation
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl font-normal leading-snug">
                  Sell in South Florida
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                  Request a private review of your property's price position, competing inventory, estimated net proceeds, and buyer-agent activation plan across Broward, Miami-Dade, and Palm Beach.
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 p-7 pt-4">
              <a
                href="#list-here"
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft sm:w-auto"
              >
                Request Private Strategy Review <ArrowRight size={15} aria-hidden="true" />
              </a>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
                <Link to="/sell" className="hover:text-gold transition-colors">Our Approach →</Link>
                <Link to="/home-value" className="hover:text-gold transition-colors">Home Valuation →</Link>
                <Link to="/market-data" className="hover:text-gold transition-colors">Market Data →</Link>
              </div>
            </div>
          </article>

          {/* Card 2: Buy or Relocate (spans 3 cols on lg) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-bone bg-white shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md lg:col-span-3">
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bone">
                <img
                  src="/images/carlos-media-team-editorial-20261012.jpg"
                  alt="Carlos Uzcategui with clients"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  width="800"
                  height="450"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gold-ink">
                  <Compass size={16} aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] font-semibold">
                    Buyer Advisory
                  </span>
                </div>
                <h3 className="mt-2.5 font-serif text-xl text-navy-deep sm:text-2xl font-normal leading-snug">
                  Buy or Relocate
                </h3>
                <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/75">
                  Curated MLS search, neighborhood and school analysis, and disciplined contract negotiation for local and relocating buyers.
                </p>
              </div>
            </div>
            <div className="border-t border-hairline p-6 pt-4">
              <Link
                to="/buy"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep font-semibold hover:text-gold-ink transition-colors"
              >
                Explore Buyer Representation <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Card 3: International Property / Global Desk (spans 3 cols on lg) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-bone bg-white shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md lg:col-span-3">
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bone">
                <img
                  src="/images/madrid-gran-via-editorial.webp"
                  alt="Madrid Gran Via architecture"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  width="800"
                  height="450"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gold-ink">
                  <Globe2 size={16} aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] font-semibold">
                    Global Desk
                  </span>
                </div>
                <h3 className="mt-2.5 font-serif text-xl text-navy-deep sm:text-2xl font-normal leading-snug">
                  International Property
                </h3>
                <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/75">
                  For international owners and agencies: prepare eligible Spanish and European prime inventory for South Florida buyer-agent discovery.
                </p>
              </div>
            </div>
            <div className="border-t border-hairline p-6 pt-4">
              <Link
                to="/global-desk"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep font-semibold hover:text-gold-ink transition-colors"
              >
                Explore Miami Global Desk <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
