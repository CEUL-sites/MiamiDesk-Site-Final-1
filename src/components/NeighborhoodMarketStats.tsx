import { ArrowRight, TrendingUp } from "lucide-react";
import { getCityMarketStats, MARKET_STATS_PERIOD } from "../data/cityMarketStats";

// City-level market snapshot for the Sell[City] pages — official closed-sales
// figures from the MIAMI REALTORS® May 2026 city reports (see
// src/data/cityMarketStats.ts). Rendered statically so the verified numbers
// are baked into the prerendered HTML and can never be replaced by a bad
// live-feed response. Renders nothing if the city has no published data.

// minimumFractionDigits set explicitly — older ICU defaults it to 2 for
// currency and throws RangeError when min > max, killing prerendering.
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

export function NeighborhoodMarketStats({ city, areaLabel }: { city: string; areaLabel?: string }) {
  const label = areaLabel ?? city;
  const lookup = getCityMarketStats(city);
  if (!lookup) return null;

  const { dataCity, isParentCityData, stats } = lookup;
  const sf = stats.singleFamily;
  const condo = stats.condoTownhome;

  const lead = sf ? { seg: sf, name: "Single-family" } : { seg: condo!, name: "Condo/townhome" };

  const tiles = [
    sf && {
      label: "Median Sale Price · Single-Family",
      value: usd.format(sf.medianSalePrice),
      sub: `${MARKET_STATS_PERIOD} closed sales`,
    },
    condo && {
      label: "Median Sale Price · Condo/Townhome",
      value: usd.format(condo.medianSalePrice),
      sub: `${MARKET_STATS_PERIOD} closed sales`,
    },
    {
      label: "Median Days to Contract",
      value: `${lead.seg.medianDaysToContract} days`,
      sub: `${lead.name} · ${MARKET_STATS_PERIOD}`,
    },
    {
      label: "Months of Supply",
      value: `${lead.seg.monthsSupply} months`,
      sub: `${lead.name} · ${MARKET_STATS_PERIOD}`,
    },
  ].filter((t): t is { label: string; value: string; sub: string } => Boolean(t));

  return (
    <section className="border-t border-hairline bg-white py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-gold" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{label} · Market Snapshot</p>
        </div>
        <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
          What the market looks like right now.
        </h2>

        <div className={`mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 ${tiles.length >= 4 ? "lg:grid-cols-4" : tiles.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {tiles.map((t) => (
            <div key={t.label} className="bg-white p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t.label}</p>
              <p className="mt-3 font-serif text-2xl text-navy-deep">{t.value}</p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{t.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-sans text-[11px] leading-relaxed text-ink-primary/70">
          Source: MIAMI REALTORS® {MARKET_STATS_PERIOD} city report, based on MLS sales
          data compiled by Florida Realtors®. Figures reflect closed residential sales reported for{" "}
          {isParentCityData ? `the City of ${dataCity}, which includes ${label}` : dataCity}.
          Information is deemed reliable but not guaranteed and is subject to change without notice.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="/home-value"
            className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Get the Number for Your Home
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="font-sans text-sm text-ink-primary/50">
            Free MLS-based analysis from a licensed Realtor® — not an algorithm.
          </p>
        </div>
      </div>
    </section>
  );
}
