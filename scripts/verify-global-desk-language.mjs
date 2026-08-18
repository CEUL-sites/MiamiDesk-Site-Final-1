import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/pages/GlobalDeskPage.tsx", "utf8");

assert.match(source, /useState<Lang>\("en"\)/);
assert.match(source, /localStorage\.getItem\("gd-lang"\)/);
assert.match(source, /hrefLang="es"/);
assert.match(source, /Miami Global Listing Desk/);

/* ── Listing-content readiness ────────────────────────────────────────── */

// The media photograph demonstrates field experience, not a promise that
// Carlos will personally produce every asset. A listing can be considered only
// once its own owner, developer, or representative has made professional
// presentation materials available (or qualified providers are coordinated).
for (const [title, body] of [
  [
    "Professional content required for market activation.",
    "To be introduced effectively to South Florida buyer agents and their clients, each property must be supported by clear, professional presentation materials.",
  ],
  [
    "Contenido profesional requerido para la activación de mercado.",
    "Para presentarse eficazmente a agentes compradores del sur de Florida y sus clientes, cada propiedad debe contar con materiales de presentación claros y profesionales.",
  ],
]) {
  assert.match(source, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(source, new RegExp(body.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
assert.doesNotMatch(
  source,
  /Carlos (?:coordinates photography|coordina fotografía)/,
  "the Global Desk must not imply that Carlos supplies or guarantees the listing media",
);

/* ── Positioning: a global desk, not a Spain desk ───────────────────────── */

// The page sells Miami exposure to owners in any market. Spain is the worked
// example that proves the desk runs, not the page's identity — so the origin
// picker has to exist and has to offer more than Spain.
assert.match(
  source,
  /<GlobalOriginsFlow/,
  "the global desk must render the origin-agnostic route module",
);
for (const key of ["originsStages", "originsNote", "originsPickerLabel"]) {
  assert.equal(
    (source.match(new RegExp(`\\b${key}:`, "g")) ?? []).length,
    2,
    `${key} must be defined in BOTH the es and en dictionaries — C[lang] unions them, so a key present in only one breaks the other language`,
  );
}
assert.match(
  source,
  /"Another market"/,
  "the origin picker must offer a market outside the named list, or the desk is not origin-agnostic",
);

// Rule 10: never imply licensure outside Florida. The route module makes a
// claim about property in other countries, so the qualifier travels with it.
assert.match(
  source,
  /Carlos Uzcategui is licensed in Florida/,
  "the origins note must state that Carlos is licensed in Florida and local representation is unaffected",
);

// Rule 10, the failure mode this page invites: siting Carlos in a foreign
// city. "Works the Spanish market from Madrid" — and the Spanish "trabaja
// desde Madrid", where "desde [ciudad]" is the idiom for where someone is
// based — read as running a practice there. He holds a Florida licence only.
assert.doesNotMatch(
  source,
  /\b(?:from|desde)\s+(?:Madrid|Barcelona|Marbella|Valencia|Ibiza|Lisbon|Lisboa|Dubai|S[ãa]o Paulo|Bogot[áa]|Mexico City|Ciudad de M[ée]xico)\b/i,
  "copy must not place Carlos in a city outside Florida — that reads as a base of operations, and his licence is Florida-only",
);

// Rule 4: the Spain section is an origin story, not a track record. A
// comparative about how the desk has performed needs a source, and there
// isn't one.
assert.doesNotMatch(
  source,
  /(?:most directly|m[áa]s directa)/i,
  "unattributed comparative track-record claims are not allowed in the Spain section",
);

// Rule 4 again, on the control rather than the prose: a picker labelled with
// "markets" reads as markets Carlos operates in. It asks where the property
// is — a fact about the property, not a claim about his reach.
for (const key of ["originsLabel", "originsPickerLabel"]) {
  for (const value of [...source.matchAll(new RegExp(`${key}: "([^"]+)"`, "g"))].map((m) => m[1])) {
    assert.doesNotMatch(
      value,
      /market|mercado/i,
      `${key} must ask where the property is, not present a menu of served markets — found: "${value}"`,
    );
  }
}

// Spain photography belongs to the Spain example only. A Madrid streetscape
// illustrating a section addressed to owners in São Paulo is the exact
// mis-framing this rework removed.
const spainAssets = [...source.matchAll(/src="(\/(?:images|videos)\/[^"]*(?:madrid|segovia|spain)[^"]*)"/gi)].map((m) => m[1]);
const spainSection = source.slice(source.indexOf("bridgeEyebrow"));
for (const asset of spainAssets) {
  assert.ok(
    spainSection.includes(asset),
    `${asset} is Spain-specific and must appear only in the Spain worked-example section`,
  );
}

// The hero must not lead on Spain in either language.
for (const heroTitle of [...source.matchAll(/heroTitle: "([^"]+)"/g)].map((m) => m[1])) {
  assert.doesNotMatch(
    heroTitle,
    /spain|españa|madrid|española?/i,
    `the hero must not lead on Spain — found: "${heroTitle}"`,
  );
}

/* ── Contact routing ────────────────────────────────────────────────────── */

const constants = await readFile("src/constants.ts", "utf8");
const spainRouteBlock = constants.slice(
  constants.indexOf("export const isSpainMarketRoute"),
  constants.indexOf("export const isSpanishLangRoute"),
);
assert.doesNotMatch(
  spainRouteBlock.replace(/\/\/[^\n]*/g, ""), // strip the comment explaining the absence
  /"\/global-desk"/,
  "/global-desk must not be a Spain-market route — its chrome answers on the US line, because the desk sells Miami exposure to owners in any market",
);
// The Spain line is demoted, not deleted: it must still be reachable in-page.
assert.match(
  source,
  /WA_ES/,
  "the Spain WhatsApp line must remain available in-page for Spanish-speaking owners",
);

// A link that prints one number and dials another is worse than either number
// alone — the visitor sees a Spanish line, taps, and reaches a US phone. Any
// anchor that displays a number must point at that number's constant.
for (const anchor of source.match(/<a[\s\S]{0,700}?<\/a>/g) ?? []) {
  const shows34 = anchor.includes("+34 646 85 30 78");
  const shows1 = anchor.includes("+1 954-865-6622");
  if (shows34) {
    assert.ok(
      anchor.includes("WA_ES"),
      "a link displaying the +34 number must use WA_ES — it currently dials a different line",
    );
  }
  if (shows1) {
    assert.ok(
      anchor.includes("WA_US"),
      "a link displaying the +1 number must use WA_US — it currently dials a different line",
    );
  }
}

// The digit check above only fires on anchors that print a phone number, so it
// would NOT have caught the bug that actually happened: a button labelled
// "WhatsApp USA", carrying no digits, pointed at the Spain constant. These two
// are semantic invariants instead of text matches, so they survive copy edits.
const heroLabels = [...source.matchAll(/heroWhatsApp: "([^"]+)"/g)].map((m) => m[1]);
const usLabels = [...source.matchAll(/waUS: "([^"]+)"/g)].map((m) => m[1]);
assert.equal(heroLabels.length, 2, "heroWhatsApp must be defined in both dictionaries");
assert.deepEqual(
  heroLabels,
  usLabels,
  "the hero WhatsApp button is the US-line CTA, so its label must match that language's waUS label — a divergence means the hero is advertising a line it does not dial",
);
const heroAnchor = source.match(/<a\b[^>]*[\s\S]{0,600}?\{t\.heroWhatsApp\}[\s\S]{0,80}?<\/a>/);
assert.ok(heroAnchor, "could not locate the hero WhatsApp anchor");
assert.match(
  heroAnchor[0],
  /href=\{WA_US\}/,
  "the hero WhatsApp anchor must dial the US line — the page speaks to owners in any market",
);

/* ── One name for the desk, in both languages ───────────────────────────── */

// The desk is a product name, so it is not translated — the Spanish side of
// GlobalDeskPage already says "Miami Global Listing Desk" untranslated, and the
// nav, footer and Spain-MLS breadcrumb all say "Global Desk". EsSpainDeskPage
// was the outlier and called the same product two different things within one
// page: "Mesa Global" in its <title>, "Mesa España" in its breadcrumb and its
// schema `name`.
//
// "Mesa España" is the worse of the two: it names the product after Spain,
// which is exactly the framing the origin-agnostic repositioning removed.
//
// "Mesa de Promotor" (the Developer Desk plan tier) and "Mesa de Alianzas" (a
// section label) are deliberately not covered — they are descriptive, have
// consistent English counterparts, and are not the product's name.
const brandFiles = [
  "src/pages/es/EsSpainDeskPage.tsx",
  "src/pages/SpainMlsListingPage.tsx",
  "src/pages/GlobalDeskPage.tsx",
  "src/components/Footer.tsx",
  "src/constants.ts",
];
for (const file of brandFiles) {
  const src = await readFile(file, "utf8");
  for (const variant of ["Mesa Global", "Mesa España", "Mesa de España", "Escritorio Global"]) {
    assert.ok(
      !src.includes(variant),
      `${file} calls the desk "${variant}" — the product name is not translated. Use "Global Desk", or "Miami Global Listing Desk" for the formal name.`,
    );
  }
}

/* ── Rule 10 in structured data ─────────────────────────────────────────── */

// areaServed is lifted verbatim by search and answer engines as a statement of
// where this agent serves, and unlike prose it carries no room for a qualifier.
// It must never exceed the Florida licence the same node advertises. The
// international origins signal lives in free-text `description` instead.
const schema = await readFile("src/components/SEO/SchemaOrg.tsx", "utf8");
// Strip line comments before testing: this asserts on the DATA, and a
// comment explaining why a territory was removed will naturally quote the
// territory it removed.
for (const block of [...schema.matchAll(/areaServed:\s*(\[[^\]]*\]|"[^"]*")/g)]
  .map((m) => m[1].replace(/\/\/[^\n]*/g, ""))) {
  assert.doesNotMatch(
    block,
    /"(?:Madrid|Spain|España|Latin America|Europe|Middle East|Canada|Barcelona|Marbella|Ibiza)"/i,
    `areaServed must not claim territory outside Florida — found: ${block.replace(/\s+/g, " ").slice(0, 90)}`,
  );
}

const spainMarketPage = await readFile("src/pages/SellSpainMarketPage.tsx", "utf8");
assert.doesNotMatch(
  spainMarketPage,
  /areaServed:\s*\{[^}]*addressCountry:\s*"ES"/,
  'the per-market service node must not declare a Spanish City as its area served — the service is delivered from South Florida',
);

console.log("global desk language contract verified");
