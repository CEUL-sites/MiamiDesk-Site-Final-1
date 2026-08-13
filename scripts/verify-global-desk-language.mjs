import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/pages/GlobalDeskPage.tsx", "utf8");

assert.match(source, /useState<Lang>\("en"\)/);
assert.match(source, /localStorage\.getItem\("gd-lang"\)/);
assert.match(source, /hrefLang="es"/);
assert.match(source, /Miami Global Listing Desk/);

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

console.log("global desk language contract verified");
