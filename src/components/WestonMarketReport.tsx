import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackContact, trackFunnelEvent } from "../lib/analytics";
import {
  WESTON_YEARS,
  WESTON_ACTIVE,
  WESTON_BANDS,
  WESTON_2026_BELOW_LIST,
  WESTON_REPORT_SOURCE,
  WESTON_NOW_SOURCE,
  WESTON_REPORT_AS_OF,
  monthsOfInventory,
  pct,
} from "../data/westonReport";

// Weston 4-bedroom market report (Miami MLS, Nov 2026) for /sell-weston.
// Every figure comes from src/data/westonReport.ts. The year table below the
// chart is real HTML so crawlers and no-JS visitors get every number, not
// just the SVG.

// minimumFractionDigits set explicitly — older ICU defaults it to 2 for
// currency and throws RangeError during prerendering.
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const first = WESTON_YEARS[0];
const last = WESTON_YEARS[WESTON_YEARS.length - 1];
const y2021 = WESTON_YEARS.find((y) => y.year === 2021)!;
const y2025 = WESTON_YEARS.find((y) => y.year === 2025)!;
const peak = WESTON_YEARS.reduce((a, b) => (b.medianSale > a.medianSale ? b : a));

const priceChange = pct(last.medianSale, first.medianSale); // +67.0
const salesChange = pct(y2025.closed, y2021.closed); // -44.6
const askGap = pct(WESTON_ACTIVE.medianList, last.medianSale); // +7.9
const belowListShare = (WESTON_2026_BELOW_LIST / last.closed) * 100; // 86
const totalInventory = monthsOfInventory(WESTON_ACTIVE.count, last.closed); // 3.7

const signed = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`;
const yearLabel = (y: (typeof WESTON_YEARS)[number]) => `${y.year}${y.ytd ? " YTD" : ""}`;

type Tab = "price" | "psf" | "sales" | "dom" | "index";
const TABS: { id: Tab; label: string; title: string }[] = [
  { id: "price", label: "Median price", title: "Median sale price" },
  { id: "psf", label: "Price / sq ft", title: "Median price per sq ft" },
  { id: "sales", label: "Closed sales", title: "Closed sales per year" },
  { id: "dom", label: "Days on market", title: "Median days on market" },
  { id: "index", label: "Indexed 2020 = 100", title: "Median price vs. price per sq ft, indexed" },
];

const GOLD = "#B08D57";
const BONE = "#F9F7F2";

function Chart({ tab, sel, onSel }: { tab: Tab; sel: number; onSel: (i: number) => void }) {
  const VW = 860, VH = 360, X0 = 70, X1 = VW - 30, Y0 = 24, Y1 = 300;
  const n = WESTON_YEARS.length;
  const px = (i: number) => X0 + 30 + ((X1 - X0 - 60) * i) / (n - 1);
  const series: { values: number[]; color: string; label?: string }[] =
    tab === "index"
      ? [
          { values: WESTON_YEARS.map((y) => (y.medianSale / first.medianSale) * 100), color: GOLD, label: "Median price" },
          { values: WESTON_YEARS.map((y) => (y.medianPsf / first.medianPsf) * 100), color: BONE, label: "Price / sq ft" },
        ]
      : [{
          values: WESTON_YEARS.map((y) =>
            tab === "price" ? y.medianSale : tab === "psf" ? y.medianPsf : tab === "sales" ? y.closed : y.medianDom
          ),
          color: GOLD,
        }];
  const bars = tab === "sales" || tab === "dom";
  const all = series.flatMap((s) => s.values);
  const lo0 = bars ? 0 : Math.min(...all) * 0.85;
  const hi0 = Math.max(...all) * 1.12;
  const raw = (hi0 - lo0) / 4;
  const p10 = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * p10).find((k) => k >= raw)!;
  const lo = Math.floor(lo0 / step) * step;
  const hi = Math.ceil(hi0 / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + 1e-6; v += step) ticks.push(v);
  const py = (v: number) => Y1 - ((v - lo) / (hi - lo)) * (Y1 - Y0);
  const tickLabel = (v: number) => (tab === "price" ? `$${Math.round(v / 1000)}K` : tab === "psf" ? `$${Math.round(v)}` : `${Math.round(v)}`);
  const valueLabel = (v: number) => (tab === "price" ? usd.format(v) : tab === "psf" ? usd2.format(v) : tab === "index" ? v.toFixed(1) : String(v));
  const bw = Math.min(54, (X1 - X0) / 10);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full" role="img" aria-label={TABS.find((t) => t.id === tab)!.title}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={py(v)} y2={py(v)} stroke="rgba(249,247,242,0.1)" />
          <text x={X0 - 10} y={py(v) + 4} fill="rgba(249,247,242,0.55)" fontSize="12" textAnchor="end" fontFamily="ui-monospace, monospace">{tickLabel(v)}</text>
        </g>
      ))}
      <line x1={px(sel)} x2={px(sel)} y1={Y0} y2={Y1} stroke="rgba(176,141,87,0.5)" strokeDasharray="4 4" />
      {bars
        ? series[0].values.map((v, i) => (
            <g key={i}>
              <rect
                x={px(i) - bw / 2} y={py(v)} width={bw} height={Y1 - py(v)} rx={2}
                fill={WESTON_YEARS[i].ytd ? "rgba(176,141,87,0.45)" : GOLD}
                stroke={WESTON_YEARS[i].ytd ? GOLD : "none"} strokeDasharray={WESTON_YEARS[i].ytd ? "6 4" : undefined}
                opacity={i === sel ? 1 : 0.7}
              />
              <text x={px(i)} y={py(v) - 8} fill={BONE} fontSize="17" textAnchor="middle" fontFamily="Georgia, serif">{v}</text>
            </g>
          ))
        : series.map((s, si) => (
            <g key={si}>
              <polyline fill="none" stroke={s.color} strokeWidth={si ? 2.5 : 3.5} strokeLinejoin="round"
                points={s.values.map((v, i) => `${px(i)},${py(v)}`).join(" ")} />
              {s.values.map((v, i) => (
                <circle key={i} cx={px(i)} cy={py(v)} r={i === sel ? 6.5 : 4.5} fill="#06111F" stroke={s.color} strokeWidth={2.5} />
              ))}
              {s.label && (
                <text x={X1} y={py(s.values[n - 1]) + (si ? 24 : -14)} fill={s.color} fontSize="12" textAnchor="end" fontFamily="ui-sans-serif, system-ui">
                  {s.label} {s.values[n - 1].toFixed(1)}
                </text>
              )}
            </g>
          ))}
      {!bars && (() => {
        const v = series[0].values[sel];
        const lab = tab === "index" ? series.map((s) => s.values[sel].toFixed(1)).join(" / ") : valueLabel(v);
        const lw = Math.max(80, lab.length * 9.5 + 24);
        const lx = Math.min(Math.max(px(sel) - lw / 2, X0), X1 - lw);
        const ly = Math.max(py(v) - 52, 2);
        return (
          <g>
            <rect x={lx} y={ly} width={lw} height={32} rx={4} fill="#06111F" stroke={GOLD} />
            <text x={lx + lw / 2} y={ly + 22} fill={GOLD} fontSize="18" textAnchor="middle" fontFamily="Georgia, serif">{lab}</text>
          </g>
        );
      })()}
      {WESTON_YEARS.map((y, i) => (
        <g key={y.year}>
          <text x={px(i)} y={Y1 + 26} fill={i === sel ? BONE : "rgba(249,247,242,0.55)"} fontSize="13" textAnchor="middle"
            fontWeight={i === sel ? 600 : 400} fontFamily="ui-sans-serif, system-ui">{yearLabel(y)}</text>
          <rect x={px(i) - (X1 - X0) / (2 * (n - 1))} y={0} width={(X1 - X0) / (n - 1)} height={Y1 + 40}
            fill="transparent" style={{ cursor: "pointer" }} onMouseEnter={() => onSel(i)} onClick={() => onSel(i)} />
        </g>
      ))}
    </svg>
  );
}

export function WestonMarketReport() {
  const [tab, setTab] = useState<Tab>("price");
  const [sel, setSel] = useState(WESTON_YEARS.length - 1);
  const [videoLang, setVideoLang] = useState<"en" | "es">("en");
  const y = WESTON_YEARS[sel];
  const prev = sel > 0 ? WESTON_YEARS[sel - 1] : null;
  const yoy = prev ? pct(y.medianSale, prev.medianSale) : null;
  const maxBand = Math.max(...WESTON_BANDS.flatMap((b) => [b.sold2026, b.active]));
  const deepest = WESTON_BANDS.reduce((a, b) => (monthsOfInventory(b.active, b.sold2026) > monthsOfInventory(a.active, a.sold2026) ? b : a));

  const waHref = "https://wa.me/19548656622?text=" + encodeURIComponent("Hello Carlos, I saw the Weston market report and would like a confidential home value and net proceeds review for my Weston home.");

  const pickTab = (t: Tab) => {
    setTab(t);
    trackFunnelEvent("market_report_interaction", { report: "weston-4bed-2026-11", view: t });
  };

  return (
    <section id="weston-market-report" className="bg-navy-deep py-14 text-white md:py-20" aria-labelledby="weston-report-title">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston Market Report · 4-Bedroom Homes · Miami MLS · {WESTON_REPORT_AS_OF}</p>
        <h2 id="weston-report-title" className="mt-5 max-w-3xl font-serif text-3xl leading-tight md:text-4xl">
          Weston 4-bedroom median sale price is up {priceChange.toFixed(1)}% from 2020 to 2026 year to date.{" "}
          <em className="italic text-gold">Fewer homes trade than in 2021, and most 2026 sales closed below list.</em>
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
          <div>
            <video
              key={videoLang}
              className="aspect-[9/16] w-full rounded-sm border border-gold/40 bg-black"
              controls
              playsInline
              preload="none"
              poster="/images/reports/weston-2026-11-poster.jpg"
              onPlay={() => trackFunnelEvent("market_report_video_play", { report: "weston-4bed-2026-11", lang: videoLang })}
            >
              <source src={`/videos/weston-market-report-2026-11-${videoLang}.mp4`} type="video/mp4" />
            </video>
            <div className="mt-3 flex gap-2" role="group" aria-label="Video language">
              {(["en", "es"] as const).map((l) => (
                <button key={l} type="button" onClick={() => setVideoLang(l)}
                  className={`flex-1 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] ${videoLang === l ? "border-gold bg-gold text-navy-deep" : "border-white/20 text-white/70 hover:border-gold/60"}`}>
                  {l === "en" ? "English" : "Español"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">The 44-second briefing</p>
            <p className="mt-3 font-sans text-base leading-relaxed text-white/70">
              The median sale price for Weston 4-bedroom homes went from {usd.format(first.medianSale)} in 2020 to {usd.format(last.medianSale)} in 2026 to date,
              after a peak of {usd.format(peak.medianSale)} in {peak.year}. From 2021 to 2025, closed sales fell from {y2021.closed} to {y2025.closed},
              and the median time on market went from {y2021.medianDom} days to {y2025.medianDom}.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              {[
                { v: usd.format(last.medianSale), l: "Median sale price, 2026 YTD" },
                { v: usd2.format(last.medianPsf), l: "Median price per sq ft, 2026 YTD" },
                { v: String(last.closed), l: "Closed sales, 2026 YTD" },
                { v: `${last.saleToList}%`, l: "Median sale-to-list, 2026 YTD" },
              ].map((k) => (
                <div key={k.l} className="bg-navy p-5">
                  <p className="font-serif text-2xl text-gold">{k.v}</p>
                  <p className="mt-1 font-sans text-xs text-white/55">{k.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-sans text-[11px] leading-relaxed text-white/45">{WESTON_REPORT_SOURCE}</p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 bg-gold px-5 py-3 font-sans text-sm font-semibold text-navy-deep hover:bg-gold-soft">
              Request a confidential home value and net proceeds review <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Interactive chart */}
        <div className="mt-14 border border-white/10 bg-navy p-5 md:p-7">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Chart view">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => pickTab(t.id)}
                className={`rounded-full border px-3.5 py-1.5 font-sans text-xs ${tab === t.id ? "border-gold bg-gold text-navy-deep" : "border-white/15 text-white/65 hover:border-gold/50"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <h3 className="mt-4 font-serif text-2xl">{TABS.find((t) => t.id === tab)!.title}</h3>
          <div className="mt-3 overflow-x-auto"><div className="min-w-[580px]"><Chart tab={tab} sel={sel} onSel={setSel} /></div></div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {WESTON_YEARS.map((yr, i) => (
              <button key={yr.year} type="button" onClick={() => setSel(i)}
                className={`min-w-[64px] flex-1 border px-2 py-1.5 font-sans text-xs ${i === sel ? "border-gold text-gold" : "border-white/15 text-white/60"}`}>
                {yearLabel(yr)}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Median price", usd.format(y.medianSale)],
              ["Year over year", yoy === null ? "—" : `${yoy >= 0 ? "▲" : "▼"} ${signed(yoy)}`],
              ["Price / sq ft", usd2.format(y.medianPsf)],
              ["Closed sales", String(y.closed)],
              ["Median days on market", String(y.medianDom)],
              ["Sale / list", `${y.saleToList}%`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-sans text-[11px] text-white/50">{k}</dt>
                <dd className={`mt-0.5 font-serif text-xl ${k === "Year over year" && yoy !== null && yoy < 0 ? "text-[#D96C5F]" : "text-white"}`}>{v}</dd>
              </div>
            ))}
          </dl>

          <details className="mt-5 border-t border-white/10 pt-4">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Year-by-year data table</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[620px] font-sans text-sm">
                <caption className="sr-only">Weston 4-bedroom closed sales by year, Miami MLS</caption>
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
                    <th className="py-2">Year</th><th className="py-2 text-right">Closed</th><th className="py-2 text-right">Median price</th>
                    <th className="py-2 text-right">Avg price</th><th className="py-2 text-right">Median $/sq ft</th><th className="py-2 text-right">Median DOM</th><th className="py-2 text-right">Sale / list</th>
                  </tr>
                </thead>
                <tbody>
                  {WESTON_YEARS.map((yr) => (
                    <tr key={yr.year} className="border-t border-white/10 text-white/80">
                      <td className="py-2">{yearLabel(yr)}</td>
                      <td className="py-2 text-right">{yr.closed}</td>
                      <td className="py-2 text-right">{usd.format(yr.medianSale)}</td>
                      <td className="py-2 text-right">{usd.format(yr.avgSale)}</td>
                      <td className="py-2 text-right">{usd2.format(yr.medianPsf)}</td>
                      <td className="py-2 text-right">{yr.medianDom}</td>
                      <td className="py-2 text-right">{yr.saleToList}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p className="mt-4 font-sans text-[11px] leading-relaxed text-white/45">{WESTON_REPORT_SOURCE}</p>
        </div>

        {/* 3D sales chart */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Sales velocity</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">Fewer Weston homes are trading than in 2021.</h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
              Closed 4-bedroom sales went from {y2021.closed} in 2021 to {y2025.closed} in 2025, a change of {signed(salesChange)}.
              Median sale price over the same years went from {usd.format(y2021.medianSale)} to {usd.format(y2025.medianSale)}.
            </p>
          </div>
          <figure>
            <img src="/images/reports/weston-2026-11-sales-3d.webp" alt={`Weston 4-bedroom closed sales by year: ${WESTON_YEARS.map((yr) => `${yearLabel(yr)} ${yr.closed}`).join(", ")}`}
              width={1400} height={750} loading="lazy" className="h-auto w-full" />
            <figcaption className="mt-2 font-sans text-[11px] text-white/45">Closed sales per year · Miami MLS (SEFMLS) · 2026 year to date through {WESTON_REPORT_AS_OF}</figcaption>
          </figure>
        </div>

        {/* Right now */}
        <div className="mt-14 border border-white/10 bg-navy p-5 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston active listings · {WESTON_REPORT_AS_OF}</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl">Active listings ask more than 2026 buyers paid.</h3>
          <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-white/65">
            As of {WESTON_REPORT_AS_OF}, {WESTON_ACTIVE.count} 4-bedroom homes were listed at a median ask of {usd.format(WESTON_ACTIVE.medianList)}, {signed(askGap)} versus the 2026 closed median of {usd.format(last.medianSale)}.
            In 2026, {WESTON_2026_BELOW_LIST} of {last.closed} sales ({Math.round(belowListShare)}%) closed below their final list price.
            At this year's sales pace, current listings represent about {totalInventory.toFixed(1)} months of inventory.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] font-sans text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
                  <th className="py-2">Status</th><th className="py-2 text-right">Count</th><th className="py-2 text-right">Median price</th>
                  <th className="py-2 text-right">Avg price</th><th className="py-2 text-right">Median $/sq ft</th><th className="py-2 text-right">Median DOM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10 text-gold">
                  <td className="py-2">Active as of {WESTON_REPORT_AS_OF} (list price)</td><td className="py-2 text-right">{WESTON_ACTIVE.count}</td>
                  <td className="py-2 text-right">{usd.format(WESTON_ACTIVE.medianList)}</td><td className="py-2 text-right">{usd.format(WESTON_ACTIVE.avgList)}</td>
                  <td className="py-2 text-right">{usd2.format(WESTON_ACTIVE.medianListPsf)}</td><td className="py-2 text-right">{WESTON_ACTIVE.medianDom}</td>
                </tr>
                <tr className="border-t border-white/10 text-white/80">
                  <td className="py-2">Closed 2026 YTD (sale price)</td><td className="py-2 text-right">{last.closed}</td>
                  <td className="py-2 text-right">{usd.format(last.medianSale)}</td><td className="py-2 text-right">{usd.format(last.avgSale)}</td>
                  <td className="py-2 text-right">{usd2.format(last.medianPsf)}</td><td className="py-2 text-right">{last.medianDom}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">By price band · months of inventory</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-xs text-white/60">
            <span><i className="mr-1.5 inline-block h-2.5 w-2.5 align-middle" style={{ background: GOLD }} />Sold 2026 YTD</span>
            <span><i className="mr-1.5 inline-block h-2.5 w-2.5 align-middle" style={{ background: BONE }} />Active, as of {WESTON_REPORT_AS_OF}</span>
          </div>
          <ul className="mt-4 space-y-4">
            {WESTON_BANDS.map((b) => {
              const moi = monthsOfInventory(b.active, b.sold2026);
              const hl = b === deepest;
              return (
                <li key={b.label} className="grid grid-cols-[100px_1fr_64px] items-center gap-3 sm:grid-cols-[130px_1fr_80px]">
                  <span className={`font-sans text-xs ${hl ? "font-semibold text-gold" : "text-white/75"}`}>{b.label}</span>
                  <span className="space-y-1">
                    <span className="flex items-center gap-2"><span className="block h-2.5" style={{ width: `${(b.sold2026 / maxBand) * 100}%`, background: GOLD }} /><span className="font-sans text-[11px] text-white/70">{b.sold2026}</span></span>
                    <span className="flex items-center gap-2"><span className="block h-2.5" style={{ width: `${(b.active / maxBand) * 100}%`, background: BONE }} /><span className="font-sans text-[11px] text-white/70">{b.active}</span></span>
                  </span>
                  <span className={`text-right font-serif text-xl ${hl ? "text-gold" : "text-white/80"}`}>{moi.toFixed(1)}<span className="ml-1 font-sans text-[10px] text-white/45">mo</span></span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 font-sans text-sm leading-relaxed text-white/60">
            In the {deepest.label} band, {deepest.active} homes are listed against {deepest.sold2026} sales in 2026, about {monthsOfInventory(deepest.active, deepest.sold2026).toFixed(1)} months of inventory,
            the deepest of any band. Closed homes are banded by sale price; active homes by list price.
          </p>
          <p className="mt-3 font-sans text-[11px] leading-relaxed text-white/45">{WESTON_NOW_SOURCE}</p>
        </div>

        {/* Read + CTA */}
        <div className="mt-14 border-y border-gold/30 py-10 text-center">
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug md:text-3xl">
            In 2026 year to date, Weston 4-bedroom homes closed at a median <span className="text-gold">{usd.format(last.medianSale)}</span>, and {Math.round(belowListShare)}% closed below final list price.
            Active listings ask a median {usd.format(WESTON_ACTIVE.medianList)} as of {WESTON_REPORT_AS_OF}. <span className="text-gold">Pricing and distribution</span> are two of the factors that affect where an individual home lands relative to that gap.
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-[11px] text-white/45">{WESTON_NOW_SOURCE}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-sans text-sm font-semibold text-navy-deep hover:bg-gold-soft">
              Request your confidential review <ArrowRight size={16} />
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp", "weston-market-report")}
              className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3.5 font-sans text-sm text-white hover:border-gold">
              <MessageCircle size={16} className="text-gold" /> WhatsApp +1 954-865-6622
            </a>
          </div>
          <p className="mt-4 font-sans text-xs text-white/50">Free and confidential · No listing commitment · A city median is not a valuation of your home.</p>
        </div>
      </div>
    </section>
  );
}
