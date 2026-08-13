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
