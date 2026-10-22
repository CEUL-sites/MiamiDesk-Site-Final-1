import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [form, hero, animation, figures] = await Promise.all([
  readFile("src/components/HeroSellerForm.tsx", "utf8"),
  readFile("src/components/Hero.tsx", "utf8"),
  readFile("src/components/HeroPropertyAnimation.tsx", "utf8"),
  readFile("src/data/figures.json", "utf8"),
]);

assert.match(form, /onFocus=\{initPlaces\}/, "address suggestions are requested on user focus");
assert.match(form, /restoreManualAddressEntry/, "the address remains editable after API failure");

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
assert.match(hero, /Your next move starts/);
assert.match(hero, /with a clear selling plan\./);
assert.match(hero, /Licensed since 2001/);
assert.match(hero, /buyer-agent outreach/);
assert.match(hero, /What matters most to you/);
assert.doesNotMatch(hero, /HeroPropertyAnimation/);
assert.doesNotMatch(hero, /autoPlay/);
assert.equal((hero.match(/<motion\.h1|<h1/g) ?? []).length, 1, "the hero must render one H1");
assert.match(hero, /id="list-here"/, "the progressive address entry retains its destination");
assert.match(hero, /<HeroSellerForm compact progressiveDesktop consultation \/>/);
assert.match(hero, /United Realty Group/);
assert.doesNotMatch(hero, /urgOfficeNetwork|Florida Office Locations/);
const heroFigures = JSON.parse(figures);
assert.equal(heroFigures.yearsLicensed.value, "25");
assert.equal(heroFigures.members.value, "93,000");
assert.equal(heroFigures.urgAgents.value, "3,500+");
assert.match(form, /compact = false/);
assert.match(form, /Request Your Private Seller Strategy Review/);
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
