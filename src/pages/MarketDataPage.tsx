import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown, ChevronUp, ExternalLink, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import stats from "../data/marketStats.json";

// ── Types ──────────────────────────────────────────────────────────────────
interface MarketRecord {
  area: string;
  county: string;
  reportType: string;
  period: string;
  medianPrice: number | null;
  avgPrice: number | null;
  closedSales: number | null;
  pendingSales: number | null;
  newListings: number | null;
  activeInventory: number | null;
  monthsSupply: number | null;
  medianDaysOnMarket: number | null;
  listToSaleRatio: number | null;
  yoyMedianPriceChange: number | null;
  yoyClosedSalesChange: number | null;
  flagged: boolean;
  flagNote: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const WHATSAPP_URL =
  "https://wa.me/19548656622?text=I%20would%20like%20to%20schedule%20a%20property%20valuation%20based%20on%20my%20city%27s%20current%20market.";

function formatPrice(val: number | null): string {
  if (val === null) return "—";
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(val % 1_000_000 === 0 ? 0 : 2)}M`;
  return `$${(val / 1000).toFixed(0)}K`;
}

function formatPct(val: number | null): string {
  if (val === null) return "—";
  const sign = val >= 0 ? "+" : "";
  return `${sign}${(val * 100).toFixed(1)}%`;
}

function marketCondition(supply: number | null): {
  label: string;
  color: string;
  bg: string;
} {
  if (supply === null) return { label: "—", color: "text-gray-500", bg: "bg-gray-100" };
  if (supply < 3) return { label: "Seller's Market", color: "text-emerald-700", bg: "bg-emerald-50" };
  if (supply <= 6) return { label: "Balanced", color: "text-amber-700", bg: "bg-amber-50" };
  return { label: "Buyer's Market", color: "text-blue-700", bg: "bg-blue-50" };
}

function yoyBadge(val: number | null) {
  if (val === null) return null;
  const positive = val >= 0;
  return {
    text: formatPct(val),
    cls: positive
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-red-50 text-red-700 border border-red-200",
  };
}

function countyNarrative(county: string, sfh: MarketRecord | undefined, condo: MarketRecord | undefined): string {
  const parts: string[] = [];

  if (sfh && sfh.monthsSupply !== null) {
    const cond = sfh.monthsSupply < 3 ? "a strong seller's market" : sfh.monthsSupply <= 6 ? "a balanced market" : "a buyer's market";
    const price = sfh.medianPrice !== null ? ` at a median of ${formatPrice(sfh.medianPrice)}` : "";
    parts.push(
      `Single-family homes in ${county} County are in ${cond}${price}, with ${sfh.monthsSupply} months of supply and a median ${sfh.medianDaysOnMarket}-day time to sale.`
    );
  }

  if (condo && condo.monthsSupply !== null) {
    const cond = condo.monthsSupply < 3 ? "a strong seller's market" : condo.monthsSupply <= 6 ? "a balanced market" : "a buyer's market";
    const price = condo.medianPrice !== null ? ` at a median of ${formatPrice(condo.medianPrice)}` : "";
    parts.push(
      `The condo and townhouse segment shows ${condo.monthsSupply} months of supply — ${cond} conditions${price}.`
    );
  }

  return parts.join(" ");
}

// ── County Summary Card ────────────────────────────────────────────────────
function CountyCard({ county }: { county: string }) {
  const countyRecords = (stats.countyRecords as MarketRecord[]).filter((r) => r.county === county);
  const sfh = countyRecords.find((r) => r.reportType === "Single Family Homes");
  const condo = countyRecords.find((r) => r.reportType === "Condos & Townhouses");
  const narrative = countyNarrative(county, sfh, condo);
  const sfhCond = marketCondition(sfh?.monthsSupply ?? null);
  const condoCond = marketCondition(condo?.monthsSupply ?? null);
  const sfhBadge = yoyBadge(sfh?.yoyMedianPriceChange ?? null);
  const condoBadge = yoyBadge(condo?.yoyMedianPriceChange ?? null);

  return (
    <div className="bg-white border border-hairline rounded-xl p-6 flex flex-col gap-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-1">{county} County</p>
        <h3 className="font-serif text-xl text-ink-primary">{county} County — May 2026</h3>
      </div>

      {/* SFH row */}
      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Single Family</p>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-2xl font-semibold text-ink-primary">{formatPrice(sfh?.medianPrice ?? null)}</span>
          {sfhBadge && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${sfhBadge.cls}`}>{sfhBadge.text} YoY</span>
          )}
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${sfhCond.bg} ${sfhCond.color}`}>
            {sfhCond.label}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {sfh?.monthsSupply ?? "—"} mo. supply · {sfh?.closedSales?.toLocaleString() ?? "—"} closed sales ·{" "}
          {sfh?.medianDaysOnMarket ?? "—"} days to sale
        </p>
      </div>

      {/* Condo row */}
      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Condo &amp; Townhouse</p>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-2xl font-semibold text-ink-primary">{formatPrice(condo?.medianPrice ?? null)}</span>
          {condoBadge && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${condoBadge.cls}`}>{condoBadge.text} YoY</span>
          )}
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${condoCond.bg} ${condoCond.color}`}>
            {condoCond.label}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {condo?.monthsSupply ?? "—"} mo. supply · {condo?.closedSales?.toLocaleString() ?? "—"} closed sales ·{" "}
          {condo?.medianDaysOnMarket ?? "—"} days to sale
        </p>
      </div>

      {/* Narrative */}
      {narrative && <p className="text-sm text-gray-600 leading-relaxed border-t border-hairline pt-4">{narrative}</p>}
    </div>
  );
}

// ── City Table ─────────────────────────────────────────────────────────────
type SortKey = "area" | "medianPrice" | "monthsSupply" | "medianDaysOnMarket" | "yoyMedianPriceChange";

function CityTable() {
  const [countyFilter, setCountyFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("medianPrice");
  const [sortAsc, setSortAsc] = useState(false);
  const [showFlagged, setShowFlagged] = useState(false);

  const rows = useMemo(() => {
    let data = (stats.cityRecords as MarketRecord[]).filter((r) => !r.flagged || showFlagged);
    if (countyFilter !== "All") data = data.filter((r) => r.county === countyFilter);
    if (typeFilter !== "All") data = data.filter((r) => r.reportType === typeFilter);
    data = [...data].sort((a, b) => {
      const av = a[sortKey] ?? (sortAsc ? Infinity : -Infinity);
      const bv = b[sortKey] ?? (sortAsc ? Infinity : -Infinity);
      if (typeof av === "string" && typeof bv === "string") {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return data;
  }, [countyFilter, typeFilter, sortKey, sortAsc, showFlagged]);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === "area"); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span className="text-gray-300">↕</span>;
    return sortAsc ? <ChevronUp className="inline w-3 h-3" /> : <ChevronDown className="inline w-3 h-3" />;
  }

  const thCls = "text-left text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 py-2 pr-4 cursor-pointer select-none whitespace-nowrap hover:text-gold transition-colors";

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={countyFilter}
          onChange={(e) => setCountyFilter(e.target.value)}
          className="text-sm border border-hairline rounded-lg px-3 py-2 bg-white text-ink-primary focus:outline-none focus:border-gold"
        >
          <option value="All">All Counties</option>
          <option value="Miami-Dade">Miami-Dade</option>
          <option value="Broward">Broward</option>
          <option value="Palm Beach">Palm Beach</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm border border-hairline rounded-lg px-3 py-2 bg-white text-ink-primary focus:outline-none focus:border-gold"
        >
          <option value="All">All Property Types</option>
          <option value="Single Family Homes">Single Family Homes</option>
          <option value="Condos & Townhouses">Condos &amp; Townhouses</option>
        </select>

        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={showFlagged}
            onChange={(e) => setShowFlagged(e.target.checked)}
            className="rounded border-gray-300 text-gold focus:ring-gold"
          />
          Include thin-market areas
        </label>

        <span className="ml-auto text-xs font-mono text-gray-400">{rows.length} areas</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-hairline">
        <table className="min-w-full text-sm">
          <thead className="bg-ivory border-b border-hairline">
            <tr>
              <th className={thCls} onClick={() => handleSort("area")}>
                Area <SortIcon k="area" />
              </th>
              <th className={`${thCls} text-right`} onClick={() => handleSort("medianPrice")}>
                Median Price <SortIcon k="medianPrice" />
              </th>
              <th className={`${thCls} text-right`} onClick={() => handleSort("monthsSupply")}>
                Mo. Supply <SortIcon k="monthsSupply" />
              </th>
              <th className={`${thCls} text-right`} onClick={() => handleSort("medianDaysOnMarket")}>
                Days to Contract <SortIcon k="medianDaysOnMarket" />
              </th>
              <th className={`${thCls} text-right`} onClick={() => handleSort("yoyMedianPriceChange")}>
                YoY Price <SortIcon k="yoyMedianPriceChange" />
              </th>
              <th className={thCls}>Conditions</th>
              <th className={`${thCls} hidden md:table-cell`}>Type</th>
              <th className={`${thCls} hidden lg:table-cell`}>County</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline bg-white">
            {rows.map((r, i) => {
              const cond = marketCondition(r.monthsSupply);
              const badge = yoyBadge(r.yoyMedianPriceChange);
              return (
                <tr key={i} className="hover:bg-ivory/60 transition-colors">
                  <td className="py-3 pr-4 font-medium text-ink-primary whitespace-nowrap">
                    {r.area}
                    {r.flagged && (
                      <span className="ml-1 text-[9px] font-mono text-amber-500 align-super">*</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums text-ink-primary">
                    {formatPrice(r.medianPrice)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums text-ink-primary">
                    {r.monthsSupply ?? "—"}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums text-ink-primary">
                    {r.medianDaysOnMarket !== null ? `${r.medianDaysOnMarket}d` : "—"}
                  </td>
                  <td className="py-3 pr-4 text-right">
                    {badge ? (
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${badge.cls}`}>{badge.text}</span>
                    ) : (
                      <span className="text-gray-300 font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${cond.bg} ${cond.color}`}>
                      {cond.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-400 hidden md:table-cell whitespace-nowrap">
                    {r.reportType === "Single Family Homes" ? "SFH" : "Condo/TH"}
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-400 hidden lg:table-cell">{r.county}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-400 text-sm">
                  No records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showFlagged && (
        <p className="text-xs text-amber-600 leading-relaxed">
          * Areas marked with an asterisk have thin transaction volume. Medians in these markets can shift
          significantly from period to period based on a small number of sales and should be interpreted as
          directional only.
        </p>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function MarketDataPage() {
  const sfhMedianMD = (stats.countyRecords as MarketRecord[]).find(
    (r) => r.county === "Miami-Dade" && r.reportType === "Single Family Homes"
  )?.medianPrice;
  const sfhMedianBroward = (stats.countyRecords as MarketRecord[]).find(
    (r) => r.county === "Broward" && r.reportType === "Single Family Homes"
  )?.medianPrice;
  const sfhMedianPB = (stats.countyRecords as MarketRecord[]).find(
    (r) => r.county === "Palm Beach" && r.reportType === "Single Family Homes"
  )?.medianPrice;

  const metaDesc = `South Florida real estate market data for May 2026. Miami-Dade single-family median ${formatPrice(sfhMedianMD)}, Broward ${formatPrice(sfhMedianBroward)}, Palm Beach ${formatPrice(sfhMedianPB)}. Current figures from Miami Realtors Association.`;

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "South Florida Real Estate Market Statistics — May 2026",
    description: metaDesc,
    url: "https://homesprofessional.com/market-data",
    creator: {
      "@type": "Organization",
      name: "Miami and South Florida REALTORS®",
      url: "https://www.miamirealtors.com",
    },
    temporalCoverage: "2026-05",
    spatialCoverage: {
      "@type": "Place",
      name: "South Florida (Miami-Dade, Broward, Palm Beach Counties)",
    },
    license: "https://www.miamirealtors.com",
    variableMeasured: [
      "Median Sale Price",
      "Months Supply of Inventory",
      "Median Days on Market",
      "Year-Over-Year Price Change",
      "Closed Sales",
    ],
  });

  return (
    <>
      <Helmet>
        <title>South Florida Real Estate Market Data | May 2026 | Carlos Uzcategui</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href="https://homesprofessional.com/market-data" />
        <script type="application/ld+json">{schemaJson}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-navy-deep pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Miami Realtors Association · May 2026
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight">
            What the South Florida Market<br className="hidden md:block" /> Is Doing Right Now
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Current figures from Miami Realtors Association — 93,000 member agents tracking 260+ U.S. MLSs.
            Data covers Miami-Dade, Broward, and Palm Beach counties as of May 2026.
          </p>
          <div className="pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-gold/90 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Schedule a property valuation based on your city's current market
            </a>
          </div>
        </div>
      </section>

      {/* County Summary Cards */}
      <section className="bg-ivory py-14 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">County Overview</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-primary">Three-County Snapshot — May 2026</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Monthly figures from Miami Realtors Association. Months supply below 3 = seller's market, 3–6 = balanced, above 6 = buyer's market.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CountyCard county="Miami-Dade" />
            <CountyCard county="Broward" />
            <CountyCard county="Palm Beach" />
          </div>
        </div>
      </section>

      {/* City / Area Table */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">City-Level Data</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-primary">Market Conditions by City</h2>
            <p className="text-sm text-gray-500 max-w-2xl">
              YTD figures (January – May 2026) from Miami Realtors Association city-level breakdowns. Days on market
              reflects median days to contract. Thin-volume markets are hidden by default.
            </p>
          </div>
          <CityTable />
        </div>
      </section>

      {/* CTA block */}
      <section className="bg-navy-deep py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Talk to Carlos</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            What do these numbers mean for your property?
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Market data shows the range — a pricing analysis calibrated to your specific address, condition, and
            competition is what moves homes. Carlos Uzcategui, Florida Licensed Realtor® SL705771, has been
            serving South Florida sellers since 2001.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-gold/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Schedule a property valuation based on your city's current market
          </a>
        </div>
      </section>

      {/* Source Attribution */}
      <section className="bg-ivory py-8 px-4 border-t border-hairline">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold">Data source:</span> Miami and South Florida REALTORS® Monthly Market
            Statistics Reports, May 2026. County-level figures are monthly; city-level figures are year-to-date
            (January – May 2026). Days on market at the county level reflects median time to sale; at the city
            level it reflects median days to contract — these are distinct metrics. Months supply and median price
            data are provided directly as published; no estimates or interpolations have been made.{" "}
            <a
              href="https://www.miamirealtors.com/market-statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline inline-flex items-center gap-0.5"
            >
              View source reports
              <ExternalLink className="w-3 h-3 inline ml-0.5" />
            </a>
          </p>
          <p className="text-xs text-gray-400">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </>
  );
}
