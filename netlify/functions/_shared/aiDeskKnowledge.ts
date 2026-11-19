// Retrieval over the Miami Desk knowledge pack (aiDeskKnowledge.generated.json).
//
// The pack is the site's own published, compliance-reviewed content (page
// FAQs, service descriptions, page summaries, market figures with period and
// source, journal posts). Sending all of it with every question would cost
// ~45k tokens per call, so each question gets only the few entries that match
// it: a small keyword/IDF ranker, no external service, no embeddings bill.

import pack from "./aiDeskKnowledge.generated.json";

type Lang = "en" | "es";
interface Doc {
  kind: "faq" | "service" | "page";
  lang: Lang;
  url: string;
  title: string;
  text: string;
}
interface Segment {
  medianSalePrice: number;
  monthsSupply: number;
  medianDaysToContract: number;
  period: string;
}
interface CityRow {
  city: string;
  county: string;
  singleFamily?: Segment;
  condoTownhome?: Segment;
}
interface Post {
  title: string;
  url: string;
  excerpt: string;
  date: string;
}

const P = pack as unknown as {
  marketSource: string;
  marketPeriod: string;
  docs: Doc[];
  market: CityRow[];
  journal: Post[];
};

export const MAX_DOCS = 6;
const MAX_TEXT = 700;

const STOP = new Set(
  (
    "a an and are as at be by can do does for from how i if in is it its me my of on or our the this to what when where which who why will with you your " +
    "would could should about any have has get need want tell know more please there their them they we us than then into also just like " +
    "el la los las un una unos unas y o de del en para por con que qué como cómo es son se su sus mi mis me lo le al a cual cuál cuando dónde donde " +
    "quiero tengo puedo hay más mas muy este esta estos estas ese esa usted ustedes nos"
  ).split(/\s+/),
);

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const stem = (t: string) => (t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t);

export const terms = (s: string): string[] =>
  normalize(s)
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);

// ── Index (built once per function instance) ─────────────────────────────
const docTerms = P.docs.map((d) => ({ title: new Set(terms(d.title)), body: new Set(terms(d.text)) }));
const df = new Map<string, number>();
for (const { title, body } of docTerms) {
  for (const t of new Set([...title, ...body])) df.set(t, (df.get(t) ?? 0) + 1);
}
const idf = (t: string) => Math.log(1 + P.docs.length / (1 + (df.get(t) ?? 0)));

export function rankDocs(query: string, lang: Lang, limit = MAX_DOCS): Doc[] {
  const q = [...new Set(terms(query))];
  if (!q.length) return [];
  const scored = P.docs.map((d, i) => {
    let score = 0;
    for (const t of q) {
      if (docTerms[i].title.has(t)) score += 2 * idf(t);
      else if (docTerms[i].body.has(t)) score += idf(t);
    }
    if (d.lang === lang) score *= 1.25;
    if (d.kind === "page") score *= 0.8;
    return { d, score };
  });
  return scored
    .filter((s) => s.score > 2.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.d);
}

export function citiesIn(text: string): CityRow[] {
  const n = ` ${normalize(text)} `;
  return P.market.filter((c) => n.includes(` ${normalize(c.city)} `));
}

function rankPosts(query: string, limit = 2): Post[] {
  const q = new Set(terms(query));
  if (!q.size) return [];
  return P.journal
    .map((p) => {
      const t = new Set(terms(`${p.title} ${p.excerpt}`));
      let score = 0;
      for (const x of q) if (t.has(x)) score += 1;
      return { p, score };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const clip = (s: string) => (s.length > MAX_TEXT ? `${s.slice(0, MAX_TEXT)}…` : s);

function formatSegment(label: string, s: Segment | undefined): string {
  if (!s) return "";
  return `${label}: median sale price ${usd(s.medianSalePrice)}, ${s.monthsSupply} months of supply, ${s.medianDaysToContract} median days to contract (${s.period})`;
}

/**
 * The knowledge section appended to the system instruction for one request.
 * Uses the latest visitor message, plus the two before it for context.
 */
export function buildKnowledgeContext(messages: { role: string; content: string }[], language: string): string {
  const users = messages.filter((m) => m.role === "user").map((m) => m.content);
  const latest = users[users.length - 1] ?? "";
  const recent = users.slice(-3).join(" ");
  const lang: Lang = language === "spanish" ? "es" : "en";

  const docs = rankDocs(`${latest} ${latest} ${recent}`, lang);
  const cities = citiesIn(recent).slice(0, 3);
  const posts = rankPosts(`${latest} ${recent}`);
  if (!docs.length && !cities.length && !posts.length) {
    return "Website knowledge: no published page matched this question. Do not improvise facts about Carlos's services or the market; ask a clarifying question or offer Carlos's direct review.";
  }

  const lines: string[] = [
    "Website knowledge — published, compliance-reviewed content from HomesProfessional.com selected for this question.",
    "Use it in preference to general knowledge and keep its meaning. Do not add numbers that are not in it or in the verified figures.",
    "When it helps, give the visitor the page URL to read more. Market figures must always carry the city, property segment, report period and source exactly as given below.",
  ];
  for (const d of docs) {
    const head = d.kind === "faq" ? `Q: ${d.title}` : d.kind === "service" ? `Service: ${d.title}` : `Page: ${d.title}`;
    lines.push(`- ${head}\n  ${d.kind === "faq" ? "A: " : ""}${clip(d.text)}\n  Source page: ${d.url}`);
  }
  if (cities.length) {
    lines.push(`Market figures (source: ${P.marketSource}):`);
    for (const c of cities) {
      const segs = [formatSegment("Single-family", c.singleFamily), formatSegment("Condo/townhome", c.condoTownhome)].filter(Boolean);
      lines.push(`- ${c.city} (${c.county} County): ${segs.join("; ")}`);
    }
  }
  if (posts.length) {
    lines.push("Related journal articles:");
    for (const p of posts) lines.push(`- ${p.title} — ${p.url}`);
  }
  return lines.join("\n");
}
