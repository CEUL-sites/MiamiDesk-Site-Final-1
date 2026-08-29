import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [form, hero] = await Promise.all([
  readFile("src/components/HeroSellerForm.tsx", "utf8"),
  readFile("src/components/Hero.tsx", "utf8"),
]);

assert.doesNotMatch(
  form,
  /loadGooglePlaces|MAPS_KEY|maps\.googleapis\.com|onFocus=\{initPlaces\}|placeId|mapUrl/,
  "the homepage hero address must remain direct-entry and independent of Google Places",
);

assert.match(
  hero,
  /poster:\s*"\/images\/posters\/dollhouse_rotating_in_hands\.jpg"/,
  "the first mobile hero clip must define a visible poster fallback",
);
assert.match(
  hero,
  /v\.poster = HERO_FEATURE_VIDEOS\[idx\]\.poster/,
  "clip changes must keep the fallback poster synchronized with the source",
);
assert.match(
  hero,
  /poster=\{HERO_FEATURE_VIDEOS\[layer\]\.poster\}/,
  "each hero video layer must render the poster for its loaded clip",
);

console.log("Mobile hero regression checks passed.");
