import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { CITY_MARKET_STATS, MARKET_STATS_PERIOD } from "../data/cityMarketStats";

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
    <section className="border-t border-hairline bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-gold" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
            South Florida Market Pulse · {MARKET_STATS_PERIOD}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
            Selling starts with knowing your market's real numbers.
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-ink-primary/70">
            Closed-sale medians, speed to contract, and supply — by city, from the official
            MIAMI REALTORS® reports. Your street tells a more precise story; that's what a
            valuation is for.
          </p>
        </div>

        <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {SPOTLIGHT.map(({ city, href }) => {
            const stats = CITY_MARKET_STATS[city];
            if (!stats) return null;
            const sf = stats.singleFamily;
            const condo = stats.condoTownhome;
            const lead = sf ? { seg: sf, name: "Single-family" } : { seg: condo!, name: "Condo/townhome" };
            return (
              <Link
                key={city}
                to={href}
                className="group bg-white p-6 transition-colors hover:bg-ivory"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg text-navy-deep">{city}</h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-navy/70">{lead.name}</span>
                </div>
                <p className="mt-3 font-serif text-2xl text-navy-deep">{usd.format(lead.seg.medianSalePrice)}</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-navy/70">Median sale price</p>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-navy/70">
                    {lead.seg.medianDaysToContract} days to contract · {lead.seg.monthsSupply} mo supply
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold-ink transition-colors group-hover:text-gold">
                    Sell here <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5">
          <Link
            to="/market-data"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-gold"
          >
            See full county and city market data
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-4 font-sans text-[11px] leading-relaxed text-ink-primary/70">
          Source: MIAMI REALTORS® {MARKET_STATS_PERIOD} city reports, based on MLS sales data
          compiled by Florida Realtors®. Closed residential sales; estimates and medians are
          not a guarantee of any individual sale outcome.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="/home-value"
            className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
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
