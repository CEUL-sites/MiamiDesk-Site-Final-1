import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { CITY_MARKET_STATS, MARKET_STATS_PERIOD, segmentPeriod } from "../data/cityMarketStats";

// Homepage market-data section — turns the verified MIAMI REALTORS® city
// dataset into a by-city grid that funnels homeowners into the matching
// Sell[City] pages (internal links) and the valuation funnel. Spotlights
// only cities that have dedicated sell pages.

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

const SPOTLIGHT: { city: string; href: string }[] = [
  { city: "Miami",           href: "/sell-miami" },
  { city: "Coral Gables",    href: "/sell-coral-gables" },
  { city: "Doral",           href: "/sell-doral" },
  { city: "Aventura",        href: "/sell-aventura" },
  { city: "Fort Lauderdale", href: "/sell-fort-lauderdale" },
  { city: "Weston",          href: "/sell-weston" },
  { city: "Coral Springs",   href: "/sell-coral-springs" },
  { city: "Pembroke Pines",  href: "/sell-pembroke-pines" },
  { city: "Plantation",      href: "/sell-plantation" },
];

export function MarketPulse() {
  return (
    <section className="border-t border-hairline bg-ivory py-8 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-gold" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
            South Florida Market Pulse · {MARKET_STATS_PERIOD}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 md:mt-5 md:gap-6">
          <h2 className="max-w-2xl font-serif text-2xl leading-tight text-navy-deep md:text-4xl">
            Selling starts with knowing your market's real numbers.
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-ink-primary/70">
            Closed-sale medians, speed to contract, and supply — by city, from the official
            MIAMI REALTORS® reports. Your street tells a more precise story; that's what a
            valuation is for.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {SPOTLIGHT.map(({ city, href }) => {
            const stats = CITY_MARKET_STATS[city];
            if (!stats) return null;
            const sf = stats.singleFamily;
            const condo = stats.condoTownhome;
            const segmentKey = sf ? "singleFamily" : "condoTownhome";
            const period = segmentPeriod(stats.county, segmentKey);
            const lead = sf ? { seg: sf, name: "Single-family" } : { seg: condo!, name: "Condo/townhome" };
            return (
              <article
                key={city}
                className="group relative flex flex-col justify-between rounded-xl border border-bone/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_28px_rgba(6,17,31,0.08)] md:p-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl text-navy-deep font-normal">{city}</h3>
                    <span className="rounded-full bg-ivory px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/70 border border-hairline">{lead.name}</span>
                  </div>
                  <p className="mt-4 font-serif text-3xl text-navy-deep tracking-tight">{usd.format(lead.seg.medianSalePrice)}</p>
                  <p className="mt-2 text-xs text-navy/70">{period} · Closed sales</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-ink font-medium">Median sale price</p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-navy/70">
                    {lead.seg.medianDaysToContract}d to contract · {lead.seg.monthsSupply}m supply
                  </span>
                  <Link to={href} className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold-ink font-semibold transition-colors group-hover:text-gold">
                    Sell here <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <p className="mt-4 border-t border-hairline pt-4 font-sans text-xs leading-relaxed text-navy/80"><strong>Seller strategy:</strong> {lead.seg.monthsSupply >= 10 ? "Price against current competing inventory and prepare building costs and financing details for targeted buyer-agent outreach." : lead.seg.monthsSupply <= 4 ? "Use recent closed sales to set the price, then activate relevant buyer agents early while checking the current competition." : "Match the price to competing homes and use buyer-agent feedback to guide the next review."}</p>
                <p className="mt-3 font-sans text-[10px] text-navy/65">Source: <a href={`https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2026/07/City_${stats.county.replace(' ', '-')}-County_${segmentKey === 'singleFamily' ? 'Single-Family-Homes' : 'Townhouses-and-Condos'}_2026-Q2_Local-Residential-Market-Metrics.pdf`} target="_blank" rel="noopener noreferrer" className="underline" onClick={(event) => event.stopPropagation()}>MIAMI REALTORS® {period} · {stats.county} city report</a>.</p>
              </article>
            );
          })}
        </div>

        <div className="mt-4 md:mt-5">
          <Link
            to="/market-data"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-gold"
          >
            See full county and city market data
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-3 font-sans text-[11px] leading-relaxed text-ink-primary/70 md:mt-4">
          Source review: October 14, 2026. Q3 2026 city data is pending the official release scheduled for October 16, 2026.
          Displayed figures remain the verified {MARKET_STATS_PERIOD} release. Source: MIAMI REALTORS® {MARKET_STATS_PERIOD} city reports, based on MLS sales data
          compiled by Florida Realtors®. Closed residential sales; estimates and medians are
          not a guarantee of any individual sale outcome.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-8 md:gap-5">
          <a
            href="#list-here"
            className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 md:py-4"
          >
            What's My Home Worth?
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="font-sans text-sm text-ink-primary/70">
            Free, confidential MLS-based valuation — prepared personally, not by an algorithm.
          </p>
        </div>
      </div>
    </section>
  );
}
