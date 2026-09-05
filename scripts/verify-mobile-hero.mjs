import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [form, hero, animation] = await Promise.all([
  readFile("src/components/HeroSellerForm.tsx", "utf8"),
  readFile("src/components/Hero.tsx", "utf8"),
  readFile("src/components/HeroPropertyAnimation.tsx", "utf8"),
]);

assert.doesNotMatch(
  form,
  /loadGooglePlaces|MAPS_KEY|maps\.googleapis\.com|onFocus=\{initPlaces\}|placeId|mapUrl/,
  "the homepage hero address must remain direct-entry and independent of Google Places",
);

assert.match(
  animation,
  /src=\{POSTER_SRC\}/,
  "the responsive homepage hero must render the approved animation poster",
);
assert.match(
  animation,
  /fetchPriority="high"/,
  "the above-the-fold property image must be prioritized",
);
assert.match(
  hero,
  /aspect-\[16\/10\]/,
  "the mobile property image must retain a stable aspect ratio",
);
assert.match(animation, /src=\{shouldLoadVideo \? VIDEO_SRC : undefined\}/);
assert.match(animation, /muted/);
assert.match(animation, /playsInline/);
assert.match(animation, /loop/);
assert.match(animation, /size-11/);
assert.match(animation, /role="note"/);
assert.match(animation, /Illustrative service connections/);
assert.match(animation, /aria-describedby=\{captionId\}/);

console.log("Mobile hero regression checks passed.");
