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
  /aspect-video/,
  "the mobile property animation must retain the approved 16:9 aspect ratio",
);
assert.match(animation, /width="1280"/);
assert.match(animation, /height="720"/);
assert.match(animation, /Property → Miami agent network → coordinated buyer & investor introductions\./);
assert.match(animation, /src=\{shouldLoadVideo \? VIDEO_SRC : undefined\}/);
assert.match(animation, /muted/);
assert.match(animation, /playsInline/);
assert.match(animation, /loop/);
assert.match(animation, /size-11/);
assert.match(animation, /role="note"/);
assert.match(animation, /aria-describedby=\{captionId\}/);

console.log("Mobile hero regression checks passed.");
