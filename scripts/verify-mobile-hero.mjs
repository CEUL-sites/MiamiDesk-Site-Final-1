import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [form, hero, animation, figures] = await Promise.all([
  readFile("src/components/HeroSellerForm.tsx", "utf8"),
  readFile("src/components/Hero.tsx", "utf8"),
  readFile("src/components/HeroPropertyAnimation.tsx", "utf8"),
  readFile("src/data/figures.json", "utf8"),
]);

assert.doesNotMatch(
  form,
  /loadGooglePlaces|MAPS_KEY|maps\.googleapis\.com|onFocus=\{initPlaces\}|placeId|mapUrl/,
  "the homepage hero address must remain direct-entry and independent of Google Places",
);

assert.match(
  animation,
  /src=\{POSTER_SRC\}/,
  "the preserved property-animation component must retain its approved poster",
);
assert.match(
  animation,
  /fetchPriority="high"/,
  "the preserved property-animation poster must remain prioritized",
);
assert.match(hero, /Your Home\./);
assert.match(hero, /Strategically<br \/>Positioned\./);
assert.match(hero, /Experienced representation\./);
assert.match(hero, /buyer-agent networks/);
assert.match(hero, /Let’s talk about/);
assert.doesNotMatch(hero, /HeroPropertyAnimation/);
assert.doesNotMatch(hero, /autoPlay/);
assert.equal((hero.match(/<motion\.h1|<h1/g) ?? []).length, 1, "the hero must render one H1");
const heroAsideIndex = hero.search(/<(?:motion\.)?aside\b/);
assert.ok(heroAsideIndex >= 0 && hero.indexOf('id="list-here"') < heroAsideIndex, "the form must precede the hero aside");
assert.match(hero, /<HeroSellerForm compact progressiveDesktop \/>/);
assert.match(hero, /from "\.\.\/data\/figures"/);
assert.match(hero, /fig\("yearsLicensed"\)/);
assert.doesNotMatch(hero, /urgOfficeNetwork|Florida Office Locations/);
const heroFigures = JSON.parse(figures);
assert.equal(heroFigures.yearsLicensed.value, "25");
assert.equal(heroFigures.members.value, "93,000");
assert.equal(heroFigures.urgAgents.value, "3,500+");
assert.match(form, /compact = false/);
assert.match(form, /Request My Property Strategy/);
assert.match(form, /WhatsApp Carlos/);
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
