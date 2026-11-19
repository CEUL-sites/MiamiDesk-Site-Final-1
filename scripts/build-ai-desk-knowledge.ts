// Builds the Miami Desk knowledge pack from the site's OWN published,
// compliance-reviewed content, so the AI desk answers from what the website
// actually says — and stays in sync on every build.
//
// Sources (nothing here is written by hand):
//   - dist/**/index.html (prerendered): page title + meta description, and the
//     JSON-LD FAQPage Q&As and Service descriptions each page publishes.
//   - src/data/cityMarketStats.ts: city medians / months of supply / days to
//     contract, carried with their report period and source.
//   - src/data/journalIndex.json: journal titles, excerpts and URLs.
//
// Output: netlify/functions/_shared/aiDeskKnowledge.generated.json
// Runs in postbuild after react-snap (Netlify bundles functions after the
// build command, so the deployed function always gets the fresh pack). The
// committed copy is the fallback if a build cannot regenerate it.
//
//   node --import tsx scripts/build-ai-desk-knowledge.ts

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { CITY_MARKET_STATS, MARKET_STATS_PERIOD, segmentPeriod } from "../src/data/cityMarketStats.ts";

const DIST = "dist";
const OUT = "netlify/functions/_shared/aiDeskKnowledge.generated.json";
const SITE = "https://homesprofessional.com";
const MARKET_SOURCE = "MIAMI REALTORS® / Florida REALTORS® Local Residential Market Metrics city reports";

// Pages that are not useful answers (legal boilerplate, conversion pages).
const SKIP = /^\/(thanks|es\/gracias|privacy|terms|404|200|leave-a-review)(\/|$)/;

type Lang = "en" | "es";
interface Doc {
  kind: "faq" | "service" | "page";
  lang: Lang;
  url: string;
  title: string;
  text: string;
}

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name === "index.html") out.push(p);
  }
  return out;
}

function routeOf(file: string): string {
  const r = "/" + relative(DIST, file).replace(/\\/g, "/").replace(/\/?index\.html$/, "");
  return r === "/" ? "/" : r.replace(/\/$/, "");
}

const asArray = <T,>(v: T | T[] | undefined): T[] => (Array.isArray(v) ? v : v ? [v] : []);

function collectPages(): Doc[] {
  if (!existsSync(DIST)) {
    console.warn("[ai-desk-knowledge] dist/ not found — keeping page docs from the committed pack");
    return [];
  }
  const docs: Doc[] = [];
  for (const file of walk(DIST)) {
    const route = routeOf(file);
    if (SKIP.test(route)) continue;
    const html = readFileSync(file, "utf8");
    const lang: Lang = /<html[^>]*\blang="es/i.test(html) || route === "/es" || route.startsWith("/es/") ? "es" : "en";
    const url = SITE + (route === "/" ? "/" : route);
    const title = decode(html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "");
    const descTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((t) => t[0]).find((t) => /\bname="description"/i.test(t)) ?? "";
    const desc = decode(descTag.match(/\bcontent="([^"]*)"/i)?.[1] ?? "");
    const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const headings = [...mainHtml.matchAll(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/gi)]
      .map((m) => decode(m[1]))
      .filter((h) => h.length >= 6 && h.length <= 120 && !/\$\s?69\s?(b|bn|billion)\b|69 billion|Realtor\(R\)/i.test(h))
      .filter((h, i, arr) => arr.findIndex((x) => x.toLowerCase() === h.toLowerCase()) === i)
      .filter((h) => !title.toLowerCase().includes(h.toLowerCase()) && !desc.toLowerCase().includes(h.toLowerCase()))
      .slice(0, 5);
    let pageText = desc;
    if (pageText && headings.length) {
      const kept: string[] = [];
      for (const h of headings) {
        const candidate = `${desc} Key sections: ${[...kept, h].join(" · ")}`;
        if (candidate.length > 600) break;
        kept.push(h);
      }
      if (kept.length) pageText = `${desc} Key sections: ${kept.join(" · ")}`;
    }
    if (title && pageText) docs.push({ kind: "page", lang, url, title, text: pageText });

    for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      let data: unknown;
      try {
        data = JSON.parse(m[1]);
      } catch {
        continue;
      }
      const nodes = asArray(data as object).flatMap((d) => {
        const g = (d as { "@graph"?: object[] })["@graph"];
        return g ? g : [d];
      }) as Record<string, unknown>[];
      for (const n of nodes) {
        if (n["@type"] === "FAQPage") {
          for (const q of asArray(n.mainEntity as Record<string, unknown>[])) {
            const question = decode(String(q.name ?? ""));
            const answer = decode(String((q.acceptedAnswer as Record<string, unknown> | undefined)?.text ?? ""));
            if (question && answer) docs.push({ kind: "faq", lang, url, title: question, text: answer });
          }
        } else if (n["@type"] === "Service" && typeof n.description === "string" && typeof n.name === "string") {
          docs.push({ kind: "service", lang, url, title: decode(n.name), text: decode(n.description) });
        }
      }
    }
  }
  return docs;
}

function dedupe(docs: Doc[]): Doc[] {
  // The same FAQ / service text is often published on several pages; keep the
  // first (shortest-URL) occurrence so the pack stays small.
  const seen = new Map<string, Doc>();
  for (const d of docs.sort((a, b) => a.url.length - b.url.length)) {
    const key = `${d.kind}|${d.lang}|${d.title.toLowerCase()}|${d.text.toLowerCase().slice(0, 160)}`;
    if (!seen.has(key)) seen.set(key, d);
  }
  return [...seen.values()];
}

function market() {
  return Object.entries(CITY_MARKET_STATS).map(([city, s]) => ({
    city,
    county: s.county,
    singleFamily: s.singleFamily
      ? {
          medianSalePrice: s.singleFamily.medianSalePrice,
          monthsSupply: s.singleFamily.monthsSupply,
          medianDaysToContract: s.singleFamily.medianDaysToContract,
          period: segmentPeriod(s.county, "singleFamily"),
        }
      : undefined,
    condoTownhome: s.condoTownhome
      ? {
          medianSalePrice: s.condoTownhome.medianSalePrice,
          monthsSupply: s.condoTownhome.monthsSupply,
          medianDaysToContract: s.condoTownhome.medianDaysToContract,
          period: segmentPeriod(s.county, "condoTownhome"),
        }
      : undefined,
  }));
}

function journal() {
  const idx = JSON.parse(readFileSync("src/data/journalIndex.json", "utf8")) as {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
  }[];
  return idx.map((p) => ({ title: p.title, url: `${SITE}/journal/${p.slug}`, excerpt: p.excerpt, date: p.date }));
}

let docs = dedupe(collectPages());
if (!docs.length && existsSync(OUT)) {
  docs = (JSON.parse(readFileSync(OUT, "utf8")) as { docs: Doc[] }).docs;
}

const pack = {
  note: "GENERATED by scripts/build-ai-desk-knowledge.ts from published site content. Do not edit by hand.",
  marketSource: MARKET_SOURCE,
  marketPeriod: MARKET_STATS_PERIOD,
  docs,
  market: market(),
  journal: journal(),
};

writeFileSync(OUT, JSON.stringify(pack) + "\n");
const counts = docs.reduce<Record<string, number>>((a, d) => ((a[`${d.kind}-${d.lang}`] = (a[`${d.kind}-${d.lang}`] ?? 0) + 1), a), {});
console.log(
  `[ai-desk-knowledge] ${docs.length} docs ${JSON.stringify(counts)}, ${pack.market.length} cities, ${pack.journal.length} journal posts → ${OUT}`,
);
