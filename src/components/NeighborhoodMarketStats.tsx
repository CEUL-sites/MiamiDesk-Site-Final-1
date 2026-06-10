import { useEffect, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

// Live city-level market snapshot for the Sell[City] pages — active
// residential listings from Bridge IDX via /.netlify/functions/city-stats
// (cached 24h server-side). Renders nothing if the data is unavailable so
// pages degrade cleanly when the feed is down.

interface CityStats {
  available: boolean;
  city: string;
  activeCount: number;
  medianListPrice: number | null;
  avgDaysOnMarket: number | null;
  medianPricePerSqft: number | null;
  lastUpdated?: string;
  disclaimer?: string;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function NeighborhoodMarketStats({ city, areaLabel }: { city: string; areaLabel?: string }) {
  const label = areaLabel ?? city;
  const [stats, setStats] = useState<CityStats | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "hidden">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`/.netlify/functions/city-stats?city=${encodeURIComponent(city)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: CityStats | null) => {
        if (cancelled) return;
        if (d?.available) { setStats(d); setState("ready"); }
        else setState("hidden");
      })
      .catch(() => { if (!cancelled) setState("hidden"); });
    return () => { cancelled = true; };
  }, [city]);

  if (state === "hidden") return null;

  const tiles = stats
    ? [
        stats.medianListPrice != null && { label: "Median Asking Price", value: usd.format(stats.medianListPrice), sub: "Active residential listings" },
        stats.avgDaysOnMarket != null && { label: "Avg. Days on Market", value: `${stats.avgDaysOnMarket} days`, sub: "Current actives" },
        { label: "Active Listings", value: stats.activeCount.toLocaleString("en-US"), sub: `Homes for sale in ${stats.city}` },
        stats.medianPricePerSqft != null && { label: "Median $ / Sq Ft", value: usd.format(stats.medianPricePerSqft), sub: "Asking price per sq ft" },
      ].filter((t): t is { label: string; value: string; sub: string } => Boolean(t))
    : [];

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

        {state === "loading" ? (
          <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-7">
                <div className="h-2.5 w-24 animate-pulse bg-bone" />
                <div className="mt-4 h-7 w-28 animate-pulse bg-bone" />
                <div className="mt-3 h-2.5 w-32 animate-pulse bg-bone" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={`mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 ${tiles.length >= 4 ? "lg:grid-cols-4" : tiles.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
              {tiles.map((t) => (
                <div key={t.label} className="bg-white p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">{t.label}</p>
                  <p className="mt-3 font-serif text-2xl text-navy-deep">{t.value}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{t.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-sans text-[11px] leading-relaxed text-ink-primary/40">
              Source: Miami and South Florida REALTORS® MLS via IDX · Active residential listings in {stats?.city}
              {stats?.lastUpdated ? ` · Updated ${new Date(stats.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : ""}.
              Information is deemed reliable but not guaranteed and is subject to change without notice.
            </p>
          </>
        )}

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
