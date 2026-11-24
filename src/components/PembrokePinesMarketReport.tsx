import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackContact, trackFunnelEvent } from "../lib/analytics";
import figures from "../data/figures.json";
import { pembrokePinesReport as R } from "../data/pembrokePinesReport";

// Pembroke Pines 4-bedroom market report (Miami MLS, Nov 2026) for
// /sell-pembroke-pines. Mirrors WestonMarketReport.tsx. Every figure is read
// from src/data/pembrokePinesReport.ts (market data) or src/data/figures.json
// (network figures); nothing numeric is typed into this file. The year table
// and subdivision table are real HTML so crawlers and no-JS visitors get every
// number, not just the SVG.
//
// The section carries its own EN / Español toggle (copy, video and poster),
// because the page itself is English-only.
//
// "Pembroke Pines right now" (active listings) is intentionally not built:
// R.active is null until Carlos supplies the Active exports.

type Lang = "en" | "es";
type Year = (typeof R.years)[number];
type Tab = "price" | "psf" | "sales" | "dom" | "index";

// minimumFractionDigits set explicitly — older ICU defaults it to 2 for
// currency and throws RangeError during prerendering.
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const YEARS: readonly Year[] = R.years;
const first = YEARS[0];
const last = YEARS[YEARS.length - 1];
const byYear = (y: number) => YEARS.find((r) => r.year === y)!;
const peakYr = byYear(R.velocity.peakYear);
const y2025 = byYear(2025);
const V = R.velocity;
const LP = R.listPrice;

const signed = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`;
const pct = (a: number, b: number) => (a / b - 1) * 100;

const VIDEO: Record<Lang, { src: string; poster: string }> = {
  en: { src: "/videos/pembroke-pines-market-report-2026-11-en.mp4", poster: "/images/reports/pembroke-pines-2026-11-poster-en.jpg" },
  es: { src: "/videos/pembroke-pines-market-report-2026-11-es.mp4", poster: "/images/reports/pembroke-pines-2026-11-poster-es.jpg" },
};

const NETWORK = [
  { v: figures.members.value, en: "Miami and South Florida REALTORS® members", es: "miembros de Miami and South Florida REALTORS®" },
  { v: figures.globalWebsites.value, en: "global portals", es: "portales globales" },
  { v: figures.languages.value, en: "languages", es: "idiomas" },
  { v: figures.usMls.value, en: "U.S. MLSs (via RPR)", es: "MLS en EE.UU. (vía RPR)" },
];

const T = {
  en: {
    kicker: "Pembroke Pines Market Report · 4-Bedroom Homes · Miami MLS · Nov 2026",
    title: "What has happened to 4-bedroom home prices and sales in Pembroke Pines since 2020.",
    langGroup: "Report language",
    briefing: "The 43-second briefing",
    heroLine: `Median sale price, ${usd.format(R.headline.from)} in ${R.headline.fromYear} → ${usd.format(R.headline.to)} in 2026 year to date.`,
    ytd: "YTD",
    kpis: [
      [usd.format(last.medianSalePrice), "Median sale price, 2026 YTD"],
      [usd2.format(last.medianPricePerSqFt), "Median price per sq ft, 2026 YTD"],
      [String(last.closedSales), "Closed sales, 2026 YTD"],
      [String(last.medianDaysOnMarket), "Median days on market, 2026 YTD"],
      [`${last.medianSaleToListPct}%`, "Median sale-to-list, 2026 YTD"],
    ],
    ctaTop: "Book a 20-minute pricing and distribution review",
    tabs: { price: "Median price", psf: "Price / sq ft", sales: "Closed sales", dom: "Days on market", index: "Indexed 2020 = 100" },
    titles: { price: "Median sale price", psf: "Median price per sq ft", sales: "Closed sales per year", dom: "Median days on market", index: "Median price vs. price per sq ft, indexed" },
    chartGroup: "Chart view",
    readout: ["Median price", "Year over year", "Price / sq ft", "Closed sales", "Median days on market", "Sale / list"],
    tableToggle: "Year-by-year data table",
    tableCaption: "Pembroke Pines 4-bedroom closed sales by year, Miami MLS",
    tableHead: ["Year", "Closed", "Median price", "Avg price", "Median $/sq ft", "Median DOM", "Sale / list"],
    velK: "Sales velocity",
    velT: "Fewer homes are trading.",
    velStats: [
      [String(V.peakSales), `closed in ${V.peakYear}, the peak`],
      [String(V.sales2025), `closed in 2025, ${signed(V.salesChange2021to2025Pct)} from ${V.peakYear}`],
      [`${V.domFrom2021} → ${V.domTo2025}`, `median days on market, ${V.peakYear} to 2025`],
    ],
    velNote: `Prices kept rising while volume fell. The median sale price moved from ${usd.format(peakYr.medianSalePrice)} in ${V.peakYear} to ${usd.format(y2025.medianSalePrice)} in 2025 and stands at ${usd.format(last.medianSalePrice)} in 2026 to date, while closings fell by a third and the median home took nearly four times as long to sell.`,
    velAlt: `Pembroke Pines 4-bedroom closed sales by year: ${YEARS.map((y) => `${y.year}${y.ytd ? " YTD" : ""} ${y.closedSales}`).join(", ")}`,
    velCaption: "Closed sales per year · 3D chart rendered in Blender · *2026 is year to date.",
    lpK: "Sale price vs. final list price",
    lpT: "List price became a ceiling.",
    lpLegend: ["Above list", "At list", "Below list"],
    lpStats: [
      [`${LP.aboveList2021Pct}%`, `sold above list in 2021 · ${LP.aboveList2021}`],
      [`${LP.aboveList2025Pct}%`, `sold above list in 2025 · ${LP.aboveList2025}`],
      [`${LP.belowList2026Pct}%`, `of 2026 sales closed below list · ${LP.belowList2026}`],
    ],
    lpNote: "In 2021, half of all 4-bedroom sales closed above their list price. By 2025 that was one in nine, and most sales now close below the final list price. How a home is priced at launch, and how widely it is exposed, are two of the factors that affect where it settles.",
    lpSource: "Source: Miami MLS (SEFMLS) · closed-sale records, Jan 1, 2020 – Nov 23, 2026 · sale price compared with the final list price on each record · sales without a list price excluded (1 in 2022, 1 in 2025).",
    lpAria: "Share of sales above, at and below final list price, by year",
    subK: "By subdivision",
    subT: "Where the gains landed.",
    subHead: ["Subdivision", "Sales 2020–26", "Median 2020", "Median latest", "Change"],
    subCaption: "Pembroke Pines 4-bedroom median sale price by subdivision, Miami MLS",
    subNote: "Median sale price in subdivisions with at least 5 sales in both years compared. Latest is 2026 year to date, or 2025 where 2026 has fewer than 5 sales. Small samples move quickly; treat single subdivisions as a guide, not a valuation.",
    subSource: "Source: Miami MLS (SEFMLS) · closed-sale records · subdivision names follow the MLS legal subdivision, grouped where spellings differ.",
    read: [`In 2026, Pembroke Pines buyers paid a median `, usd.format(last.medianSalePrice), `, and two of three sales closed below list. `, "Pricing and distribution", " are two of the factors that affect which side of list a home lands on."],
    netK: "Listed through United Realty Group",
    netT: "Distribution shapes price.",
    netP: "Listing on the Miami MLS places your home inside the daily working ecosystem of Miami and South Florida REALTORS® members, who can find it and present it to their own buyers.",
    netSource: `Sources: ${figures.members.source} · ${figures.globalWebsites.source} · ${figures.languages.source} · ${figures.usMls.source}.`,
    ctaH: "Request the property-level read for your Pembroke Pines home.",
    ctaP: "A 20-minute pricing and distribution review: where your home sits against these numbers, and how it would be placed in the market.",
    ctaBtn: "Book a 20-minute pricing and distribution review",
    wa: "Hello Carlos, I saw the Pembroke Pines market report and would like the pricing and distribution review for my Pembroke Pines home.",
    fine: "Free and confidential · No listing commitment · A city median is not a valuation of your home.",
  },
  es: {
    kicker: "Informe de mercado de Pembroke Pines · Viviendas de 4 habitaciones · Miami MLS · nov 2026",
    title: "Qué ha pasado con los precios y las ventas de viviendas de 4 habitaciones en Pembroke Pines desde 2020.",
    langGroup: "Idioma del informe",
    briefing: "El resumen de 43 segundos",
    heroLine: `Precio mediano de venta: ${usd.format(R.headline.from)} en ${R.headline.fromYear} → ${usd.format(R.headline.to)} en 2026 (año en curso).`,
    ytd: "parcial",
    kpis: [
      [usd.format(last.medianSalePrice), "Precio mediano de venta, 2026 (año en curso)"],
      [usd2.format(last.medianPricePerSqFt), "Mediana del precio por pie², 2026 (año en curso)"],
      [String(last.closedSales), "Ventas cerradas, 2026 (año en curso)"],
      [String(last.medianDaysOnMarket), "Días medianos en el mercado, 2026 (año en curso)"],
      [`${last.medianSaleToListPct}%`, "Venta / precio de lista (mediana), 2026 (año en curso)"],
    ],
    ctaTop: "Agende una revisión de precio y distribución de 20 minutos",
    tabs: { price: "Precio mediano", psf: "Precio / pie²", sales: "Ventas cerradas", dom: "Días en el mercado", index: "Índice 2020 = 100" },
    titles: { price: "Precio mediano de venta", psf: "Mediana del precio por pie²", sales: "Ventas cerradas por año", dom: "Mediana de días en el mercado", index: "Precio mediano vs. precio por pie², en índice" },
    chartGroup: "Vista del gráfico",
    readout: ["Precio mediano", "Var. anual", "Precio / pie²", "Ventas cerradas", "Días en el mercado (mediana)", "Venta / lista"],
    tableToggle: "Tabla de datos por año",
    tableCaption: "Ventas cerradas de viviendas de 4 habitaciones en Pembroke Pines por año, Miami MLS",
    tableHead: ["Año", "Ventas", "Precio mediano", "Precio promedio", "Mediana $/pie²", "Días (mediana)", "Venta / lista"],
    velK: "Velocidad de ventas",
    velT: "Se venden menos casas.",
    velStats: [
      [String(V.peakSales), `vendidas en ${V.peakYear}, el máximo`],
      [String(V.sales2025), `vendidas en 2025, ${signed(V.salesChange2021to2025Pct)} vs. ${V.peakYear}`],
      [`${V.domFrom2021} → ${V.domTo2025}`, `días medianos en el mercado, ${V.peakYear} a 2025`],
    ],
    velNote: `Los precios siguieron subiendo mientras el volumen cayó. El precio mediano pasó de ${usd.format(peakYr.medianSalePrice)} en ${V.peakYear} a ${usd.format(y2025.medianSalePrice)} en 2025 y está en ${usd.format(last.medianSalePrice)} en lo que va de 2026, mientras los cierres bajaron un tercio y la casa mediana tardó casi cuatro veces más en venderse.`,
    velAlt: `Ventas cerradas de viviendas de 4 habitaciones en Pembroke Pines por año: ${YEARS.map((y) => `${y.year}${y.ytd ? " parcial" : ""} ${y.closedSales}`).join(", ")}`,
    velCaption: "Ventas cerradas por año · gráfico 3D renderizado en Blender · *2026 es año en curso.",
    lpK: "Precio de venta vs. último precio de lista",
    lpT: "El precio de lista se volvió un techo.",
    lpLegend: ["Sobre lista", "En lista", "Bajo lista"],
    lpStats: [
      [`${LP.aboveList2021Pct}%`, `vendidas sobre lista en 2021 · ${LP.aboveList2021.replace(" of ", " de ")}`],
      [`${LP.aboveList2025Pct}%`, `vendidas sobre lista en 2025 · ${LP.aboveList2025.replace(" of ", " de ")}`],
      [`${LP.belowList2026Pct}%`, `de las ventas de 2026 cerraron bajo lista · ${LP.belowList2026.replace(" of ", " de ")}`],
    ],
    lpNote: "En 2021, la mitad de las ventas de 4 habitaciones cerró por encima de su precio de lista. En 2025 fue una de cada nueve, y hoy la mayoría cierra por debajo del último precio de lista. Cómo se fija el precio al salir y qué tan amplia es la exposición son dos de los factores que influyen en dónde termina cada casa.",
    lpSource: "Fuente: Miami MLS (SEFMLS) · registros de ventas cerradas, 1 ene 2020 – 23 nov 2026 · precio de venta comparado con el último precio de lista de cada registro · se excluyen ventas sin precio de lista (1 en 2022, 1 en 2025).",
    lpAria: "Proporción de ventas sobre, en y bajo el último precio de lista, por año",
    subK: "Por urbanización",
    subT: "Dónde se dieron las ganancias.",
    subHead: ["Urbanización", "Ventas 2020–26", "Mediana 2020", "Mediana reciente", "Cambio"],
    subCaption: "Precio mediano de venta de viviendas de 4 habitaciones en Pembroke Pines por urbanización, Miami MLS",
    subNote: "Precio mediano de venta en urbanizaciones con al menos 5 ventas en ambos años comparados. Reciente es 2026 (año en curso), o 2025 cuando 2026 tiene menos de 5 ventas. Las muestras pequeñas varían rápido; úselas como guía, no como tasación.",
    subSource: "Fuente: Miami MLS (SEFMLS) · registros de ventas cerradas · nombres según la subdivisión legal del MLS, agrupados cuando la escritura varía.",
    read: ["En 2026 los compradores en Pembroke Pines pagaron una mediana de ", usd.format(last.medianSalePrice), ", y dos de cada tres ventas cerraron bajo lista. ", "El precio y la distribución", " son dos de los factores que influyen en de qué lado del precio de lista queda cada casa."],
    netK: "Listado con United Realty Group",
    netT: "La distribución influye en el precio.",
    netP: "Listar en el Miami MLS coloca su casa dentro del ecosistema de trabajo diario de los miembros de Miami and South Florida REALTORS®, que pueden encontrarla y presentarla a sus propios compradores.",
    netSource: `Fuentes: ${figures.members.source} · ${figures.globalWebsites.source} · ${figures.languages.source} · ${figures.usMls.source}.`,
    ctaH: "Solicite el análisis a nivel de propiedad para su casa en Pembroke Pines.",
    ctaP: "Una revisión de 20 minutos de precio y distribución: dónde se ubica su casa frente a estas cifras y cómo se colocaría en el mercado.",
    ctaBtn: "Agende una revisión de precio y distribución de 20 minutos",
    wa: "Hola Carlos, vi el informe de mercado de Pembroke Pines y me gustaría la revisión de precio y distribución para mi casa en Pembroke Pines.",
    fine: "Gratis y confidencial · Sin compromiso de listado · Una mediana de la ciudad no es una tasación de su casa.",
  },
} as const;

const TAB_IDS: Tab[] = ["price", "psf", "sales", "dom", "index"];
const GOLD = "#B08D57";
const BONE = "#F9F7F2";
const NEG = "#D96C5F";

/** Tracks an element's width so SVG charts re-lay out at 390 px instead of shrinking their text. */
function useWidth<T extends HTMLElement>(fallback: number) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

const yearLabel = (y: Year, lang: Lang, narrow = false) => (y.ytd ? (narrow ? `${y.year}*` : `${y.year} ${T[lang].ytd}`) : String(y.year));

function TrendChart({ tab, sel, onSel, lang, width }: { tab: Tab; sel: number; onSel: (i: number) => void; lang: Lang; width: number }) {
  const VW = Math.max(340, Math.min(860, width)), VH = 360, X0 = VW < 520 ? 52 : 70, X1 = VW - 20, Y0 = 34, Y1 = 300;
  const narrow = VW < 600;
  const n = YEARS.length;
  const px = (i: number) => X0 + 22 + ((X1 - X0 - 44) * i) / (n - 1);
  const series: { values: number[]; color: string; label?: string }[] =
    tab === "index"
      ? [
          { values: YEARS.map((y) => (y.medianSalePrice / first.medianSalePrice) * 100), color: GOLD, label: T[lang].tabs.price },
          { values: YEARS.map((y) => (y.medianPricePerSqFt / first.medianPricePerSqFt) * 100), color: BONE, label: T[lang].tabs.psf },
        ]
      : [{
          values: YEARS.map((y) =>
            tab === "price" ? y.medianSalePrice : tab === "psf" ? y.medianPricePerSqFt : tab === "sales" ? y.closedSales : y.medianDaysOnMarket
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
  const tickLabel = (v: number) => (tab === "price" ? (v >= 1e6 ? `$${(v / 1e6).toFixed(v % 1e6 ? 1 : 0)}M` : `$${Math.round(v / 1000)}K`) : tab === "psf" ? `$${Math.round(v)}` : `${Math.round(v)}`);
  const valueLabel = (v: number) => (tab === "price" ? usd.format(v) : tab === "psf" ? usd2.format(v) : tab === "index" ? v.toFixed(1) : String(v));
  const bw = Math.min(54, ((X1 - X0) / n) * 0.62);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full" role="img" aria-label={T[lang].titles[tab]}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={py(v)} y2={py(v)} stroke="rgba(249,247,242,0.1)" />
          <text x={X0 - 8} y={py(v) + 4} fill="rgba(249,247,242,0.55)" fontSize="12" textAnchor="end" fontFamily="ui-monospace, monospace">{tickLabel(v)}</text>
        </g>
      ))}
      {tab === "index" && series.map((s, si) => (
        <g key={s.label}>
          <rect x={X0 + si * 170} y={6} width={18} height={si ? 3 : 4} fill={s.color} />
          <text x={X0 + si * 170 + 24} y={11} fill={s.color} fontSize="12" fontFamily="ui-sans-serif, system-ui">{s.label} {s.values[n - 1].toFixed(1)}</text>
        </g>
      ))}
      <line x1={px(sel)} x2={px(sel)} y1={Y0} y2={Y1} stroke="rgba(176,141,87,0.5)" strokeDasharray="4 4" />
      {bars
        ? series[0].values.map((v, i) => (
            <g key={i}>
              <rect
                x={px(i) - bw / 2} y={py(v)} width={bw} height={Y1 - py(v)} rx={2}
                fill={YEARS[i].ytd ? "rgba(176,141,87,0.45)" : GOLD}
                stroke={YEARS[i].ytd ? GOLD : "none"} strokeDasharray={YEARS[i].ytd ? "6 4" : undefined}
                opacity={i === sel ? 1 : 0.7}
              />
              <text x={px(i)} y={py(v) - 8} fill={BONE} fontSize={narrow ? 14 : 17} textAnchor="middle" fontFamily="Georgia, serif">{v}</text>
            </g>
          ))
        : series.map((s, si) => (
            <g key={si}>
              <polyline fill="none" stroke={s.color} strokeWidth={si ? 2.5 : 3.5} strokeLinejoin="round"
                points={s.values.map((v, i) => `${px(i)},${py(v)}`).join(" ")} />
              {s.values.map((v, i) => (
                <circle key={i} cx={px(i)} cy={py(v)} r={i === sel ? 6.5 : 4.5} fill="#06111F" stroke={s.color} strokeWidth={2.5} />
              ))}
            </g>
          ))}
      {!bars && (() => {
        const v = series[0].values[sel];
        const lab = tab === "index" ? series.map((s) => s.values[sel].toFixed(1)).join(" / ") : valueLabel(v);
        const lw = Math.max(80, lab.length * 9.5 + 24);
        const lx = Math.min(Math.max(px(sel) - lw / 2, X0), X1 - lw);
        const ly = Math.max(py(Math.max(...series.map((s) => s.values[sel]))) - 50, Y0 - 8);
        return (
          <g>
            <rect x={lx} y={ly} width={lw} height={32} rx={4} fill="#06111F" stroke={GOLD} />
            <text x={lx + lw / 2} y={ly + 22} fill={GOLD} fontSize="18" textAnchor="middle" fontFamily="Georgia, serif">{lab}</text>
          </g>
        );
      })()}
      {YEARS.map((y, i) => (
        <g key={y.year}>
          <text x={px(i)} y={Y1 + 26} fill={i === sel ? BONE : "rgba(249,247,242,0.55)"} fontSize={narrow ? 12 : 13} textAnchor="middle"
            fontWeight={i === sel ? 600 : 400} fontFamily="ui-sans-serif, system-ui">{yearLabel(y, lang, narrow)}</text>
          <rect x={px(i) - (X1 - X0) / (2 * (n - 1))} y={0} width={(X1 - X0) / (n - 1)} height={Y1 + 40}
            fill="transparent" style={{ cursor: "pointer" }} onMouseEnter={() => onSel(i)} onClick={() => onSel(i)} />
        </g>
      ))}
    </svg>
  );
}

function ListPriceChart({ lang, width }: { lang: Lang; width: number }) {
  const VW = Math.max(340, Math.min(860, width)), VH = 290, X0 = 46, X1 = VW - 6, Y0 = 10, Y1 = 250;
  const narrow = VW < 600;
  const n = YEARS.length;
  const slot = (X1 - X0) / n;
  const bw = Math.min(60, slot * 0.66);
  const px = (i: number) => X0 + (i + 0.5) * slot;
  const cols = [GOLD, "rgba(249,247,242,0.5)", NEG];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full" role="img" aria-label={T[lang].lpAria}>
      {[0, 25, 50, 75, 100].map((v) => {
        const y = Y1 - ((Y1 - Y0) * v) / 100;
        return (
          <g key={v}>
            <line x1={X0} x2={X1} y1={y} y2={y} stroke="rgba(249,247,242,0.08)" />
            <text x={X0 - 8} y={y + 4} fill="rgba(249,247,242,0.55)" fontSize="12" textAnchor="end" fontFamily="ui-monospace, monospace">{v}%</text>
          </g>
        );
      })}
      {YEARS.map((y, i) => {
        const parts = [y.salesAboveList, y.salesAtList, y.salesBelowList];
        const tot = parts.reduce((a, b) => a + b, 0);
        let acc = 0;
        return (
          <g key={y.year}>
            {parts.map((v, j) => {
              const h = ((Y1 - Y0) * v) / tot;
              const top = Y1 - acc - h;
              acc += h;
              return (
                <g key={j}>
                  <rect x={px(i) - bw / 2} y={top} width={bw} height={h} fill={cols[j]} />
                  {j !== 1 && h > 18 && (
                    <text x={px(i)} y={top + h / 2 + 5} fill={j === 0 ? "#06111F" : BONE} fontSize={narrow ? 11 : 13} fontWeight={600}
                      textAnchor="middle" fontFamily="ui-sans-serif, system-ui">{Math.round((100 * v) / tot)}%</text>
                  )}
                </g>
              );
            })}
            <text x={px(i)} y={Y1 + 22} fill="rgba(249,247,242,0.7)" fontSize={narrow ? 12 : 13} textAnchor="middle" fontFamily="ui-sans-serif, system-ui">{yearLabel(y, lang, narrow)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function StatTiles({ items, tone = "deep" }: { items: readonly (readonly [string, string])[]; tone?: "deep" | "navy" }) {
  return (
    <div className="mt-5 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
      {items.map(([v, l]) => (
        <div key={l} className={`${tone === "deep" ? "bg-navy-deep" : "bg-navy"} p-5`}>
          <p className="font-serif text-2xl text-gold">{v}</p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-white/55">{l}</p>
        </div>
      ))}
    </div>
  );
}

function SourceLine({ children }: { children: string }) {
  return <p className="mt-4 font-sans text-[11px] leading-relaxed text-white/45">{children}</p>;
}

export function PembrokePinesMarketReport() {
  const [lang, setLang] = useState<Lang>("en");
  const [tab, setTab] = useState<Tab>("price");
  const [sel, setSel] = useState(YEARS.length - 1);
  const [chartRef, chartW] = useWidth<HTMLDivElement>(860);
  const [lpRef, lpW] = useWidth<HTMLDivElement>(860);
  const t = T[lang];
  const src = R.source[lang];
  const y = YEARS[sel];
  const prev = sel > 0 ? YEARS[sel - 1] : null;
  const yoy = prev ? pct(y.medianSalePrice, prev.medianSalePrice) : null;
  const waHref = "https://wa.me/19548656622?text=" + encodeURIComponent(t.wa);
  const report = "pembroke-pines-4bed-2026-11";

  const pickLang = (l: Lang) => {
    setLang(l);
    trackFunnelEvent("market_report_interaction", { report, view: `lang-${l}` });
  };
  const pickTab = (id: Tab) => {
    setTab(id);
    trackFunnelEvent("market_report_interaction", { report, view: id });
  };

  return (
    <section id="pembroke-pines-market-report" lang={lang} className="bg-navy-deep py-14 text-white md:py-20" aria-labelledby="pembroke-pines-report-title">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold">{t.kicker}</p>
          <div className="flex gap-1.5" role="group" aria-label={t.langGroup}>
            {(["en", "es"] as const).map((l) => (
              <button key={l} type="button" onClick={() => pickLang(l)} aria-pressed={lang === l}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${lang === l ? "border-gold bg-gold text-navy-deep" : "border-white/20 text-white/70 hover:border-gold/60"}`}>
                {l === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>
        </div>
        <h2 id="pembroke-pines-report-title" className="mt-5 max-w-3xl font-serif text-3xl leading-tight md:text-4xl">{t.title}</h2>

        {/* a + b. Video, headline, KPIs */}
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
          <div className="mx-auto w-full max-w-[300px]">
            <video
              key={lang}
              className="aspect-[9/16] w-full rounded-sm border border-gold/40 bg-black"
              controls
              muted
              playsInline
              preload="none"
              poster={VIDEO[lang].poster}
              onPlay={() => trackFunnelEvent("market_report_video_play", { report, lang })}
            >
              <source src={VIDEO[lang].src} type="video/mp4" />
            </video>
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{t.briefing}</p>
          </div>

          <div>
            <p className="font-serif text-6xl leading-none text-gold md:text-7xl">▲ {signed(R.headline.medianChangePct)}</p>
            <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-white/75">{t.heroLine}</p>
            <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-6">
              {t.kpis.map(([v, l], i) => (
                <div key={l} className={`bg-navy p-5 ${i === 0 ? "col-span-2 lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                  <p className="font-serif text-2xl text-gold">{v}</p>
                  <p className="mt-1 font-sans text-xs text-white/55">{l}</p>
                </div>
              ))}
            </div>
            <SourceLine>{src}</SourceLine>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 bg-gold px-5 py-3 font-sans text-sm font-semibold text-navy-deep hover:bg-gold-soft">
              {t.ctaTop} <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* c. Interactive chart + crawlable year table */}
        <div className="mt-14 border border-white/10 bg-navy p-5 md:p-7">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.chartGroup}>
            {TAB_IDS.map((id) => (
              <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => pickTab(id)}
                className={`rounded-full border px-3.5 py-1.5 font-sans text-xs ${tab === id ? "border-gold bg-gold text-navy-deep" : "border-white/15 text-white/65 hover:border-gold/50"}`}>
                {t.tabs[id]}
              </button>
            ))}
          </div>
          <h3 className="mt-4 font-serif text-2xl">{t.titles[tab]}</h3>
          <div ref={chartRef} className="mt-3"><TrendChart tab={tab} sel={sel} onSel={setSel} lang={lang} width={chartW} /></div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {YEARS.map((yr, i) => (
              <button key={yr.year} type="button" onClick={() => setSel(i)} aria-pressed={i === sel}
                className={`min-w-[64px] flex-1 border px-2 py-1.5 font-sans text-xs ${i === sel ? "border-gold text-gold" : "border-white/15 text-white/60"}`}>
                {yearLabel(yr, lang)}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-live="polite">
            {([
              [t.readout[0], usd.format(y.medianSalePrice)],
              [t.readout[1], yoy === null ? "—" : `${yoy >= 0 ? "▲" : "▼"} ${signed(yoy)}`],
              [t.readout[2], usd2.format(y.medianPricePerSqFt)],
              [t.readout[3], String(y.closedSales)],
              [t.readout[4], String(y.medianDaysOnMarket)],
              [t.readout[5], `${y.medianSaleToListPct}%`],
            ] as const).map(([k, v], i) => (
              <div key={k}>
                <dt className="font-sans text-[11px] text-white/50">{k}</dt>
                <dd className={`mt-0.5 font-serif text-xl ${i === 1 && yoy !== null && yoy < 0 ? "text-[#D96C5F]" : "text-white"}`}>{v}</dd>
              </div>
            ))}
          </dl>

          <details className="mt-5 border-t border-white/10 pt-4">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{t.tableToggle}</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[620px] font-sans text-sm">
                <caption className="sr-only">{t.tableCaption}</caption>
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
                    {t.tableHead.map((h, i) => <th key={h} className={`py-2 ${i ? "text-right" : ""}`}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {YEARS.map((yr) => (
                    <tr key={yr.year} className="border-t border-white/10 text-white/80">
                      <td className="py-2">{yearLabel(yr, lang)}</td>
                      <td className="py-2 text-right">{yr.closedSales}</td>
                      <td className="py-2 text-right">{usd.format(yr.medianSalePrice)}</td>
                      <td className="py-2 text-right">{usd.format(yr.averageSalePrice)}</td>
                      <td className="py-2 text-right">{usd2.format(yr.medianPricePerSqFt)}</td>
                      <td className="py-2 text-right">{yr.medianDaysOnMarket}</td>
                      <td className="py-2 text-right">{yr.medianSaleToListPct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <SourceLine>{src}</SourceLine>
        </div>

        {/* d. 3D bars */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.velK}</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">{t.velT}</h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65">{t.velNote}</p>
          </div>
          <figure>
            <img src="/images/reports/pembroke-pines-2026-11-bars3d.webp" alt={t.velAlt}
              width={1400} height={860} loading="lazy" decoding="async" className="h-auto w-full rounded-sm" />
            <figcaption className="mt-2 font-sans text-[11px] leading-relaxed text-white/45">{t.velCaption}</figcaption>
          </figure>
        </div>
        <StatTiles items={t.velStats} tone="navy" />
        <SourceLine>{src}</SourceLine>

        {/* e. List price became a ceiling */}
        <div className="mt-14 border border-white/10 bg-navy p-5 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.lpK}</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl">{t.lpT}</h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-sans text-xs text-white/60">
            {t.lpLegend.map((l, i) => (
              <span key={l}><i className="mr-1.5 inline-block h-2.5 w-2.5 align-middle" style={{ background: [GOLD, "rgba(249,247,242,0.5)", NEG][i] }} />{l}</span>
            ))}
          </div>
          <div ref={lpRef} className="mt-3"><ListPriceChart lang={lang} width={lpW} /></div>
          <StatTiles items={t.lpStats} />
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-white/65">{t.lpNote}</p>
          <SourceLine>{src}</SourceLine>
          <p className="mt-1 font-sans text-[11px] leading-relaxed text-white/45">{t.lpSource}</p>
        </div>

        {/* f. Subdivisions */}
        <div className="mt-14 border border-white/10 bg-navy p-5 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.subK}</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl">{t.subT}</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] font-sans text-sm">
              <caption className="sr-only">{t.subCaption}</caption>
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
                  {t.subHead.map((h, i) => <th key={h} className={`py-2 ${i ? "text-right" : ""}`}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {R.subdivisions.map((s) => (
                  <tr key={s.name} className="border-t border-white/10 text-white/80">
                    <td className="py-2 pr-3">{s.name}</td>
                    <td className="py-2 text-right">{s.sales2020to2026}</td>
                    <td className="whitespace-nowrap py-2 text-right">{usd.format(s.median2020)} <span className="text-[11px] text-white/40">n {s.n2020}</span></td>
                    <td className="whitespace-nowrap py-2 text-right">{usd.format(s.medianLatest)} <span className="text-[11px] text-white/40">{s.latestYear === 2026 ? `2026 ${t.ytd}` : s.latestYear} · n {s.nLatest}</span></td>
                    <td className={`whitespace-nowrap py-2 text-right ${s.changePct >= 0 ? "text-gold" : "text-[#D96C5F]"}`}>{s.changePct >= 0 ? "▲" : "▼"} {signed(s.changePct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-white/65">{t.subNote}</p>
          <SourceLine>{src}</SourceLine>
          <p className="mt-1 font-sans text-[11px] leading-relaxed text-white/45">{t.subSource}</p>
        </div>

        {/* g. Closing read + network */}
        <div className="mt-14 border-y border-gold/30 py-10 text-center">
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug md:text-3xl">
            {t.read[0]}<span className="text-gold">{t.read[1]}</span>{t.read[2]}<span className="text-gold">{t.read[3]}</span>{t.read[4]}
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-[11px] leading-relaxed text-white/45">{src}</p>
        </div>

        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.netK}</p>
          <h3 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">{t.netT}</h3>
          <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/65">{t.netP}</p>
          <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
            {NETWORK.map((f) => (
              <div key={f.en} className="bg-navy p-5">
                <p className="font-serif text-3xl text-gold">{f.v}</p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-white/55">{f[lang]}</p>
              </div>
            ))}
          </div>
          <SourceLine>{t.netSource}</SourceLine>
        </div>

        {/* h. CTA to the existing SellerIntakeForm */}
        <div className="mt-14 border border-gold/40 bg-navy p-6 text-center md:p-10">
          <h3 className="mx-auto max-w-2xl font-serif text-2xl leading-snug md:text-3xl">{t.ctaH}</h3>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/65">{t.ctaP}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" onClick={() => trackFunnelEvent("market_report_cta", { report, lang })}
              className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-sans text-sm font-semibold text-navy-deep hover:bg-gold-soft">
              {t.ctaBtn} <ArrowRight size={16} />
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp", "pembroke-pines-market-report")}
              className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3.5 font-sans text-sm text-white hover:border-gold">
              <MessageCircle size={16} className="text-gold" /> WhatsApp +1 954-865-6622
            </a>
          </div>
          <p className="mt-4 font-sans text-xs text-white/50">{t.fine}</p>
        </div>
      </div>
    </section>
  );
}
