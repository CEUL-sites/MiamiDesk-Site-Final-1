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
  /src="\/images\/homepage-hero-waterfront-v2\.jpg"/,
  "the responsive homepage hero must render the approved property image",
);
assert.match(
  hero,
  /fetchPriority="high"/,
  "the above-the-fold property image must be prioritized",
);
assert.match(
  hero,
  /aspect-\[16\/10\]/,
  "the mobile property image must retain a stable aspect ratio",
);

console.log("Mobile hero regression checks passed.");
