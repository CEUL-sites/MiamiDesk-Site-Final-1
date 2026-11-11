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
assert.match(hero, /Your property, placed inside/);
assert.match(hero, /the world's largest local REALTOR® association\./);
assert.match(hero, /Start with your property address/);
assert.match(hero, /Continue With My Property/);
assert.match(hero, /Licensed since 2001 · CLHMS · United Realty Group · English \/ Español/);
assert.doesNotMatch(hero, /Tilt3D/);
assert.match(hero, /Licensed Since 2001/i);
assert.match(hero, /MLS ecosystem 90,000\+ South Florida agents work from daily/);
assert.match(hero, /seller-hero-stats/, "hero figures render as a scannable stat strip, not a paragraph");
assert.match(hero, /Twenty-five years of Florida practice\. Carlos leads your pricing strategy and negotiation\./);
assert.match(hero, /HeroVideoBackdrop name="home"/, "the homepage hero uses the deferred video backdrop");
assert.match(hero, /Sources: Miami and South Florida REALTORS®/, "hero figures carry a displayed source line");
assert.match(hero, /Request a Private Seller Strategy/);
assert.doesNotMatch(hero, /HeroPropertyAnimation/);
assert.doesNotMatch(hero, /autoPlay/);
assert.equal((hero.match(/<motion\.h1|<h1/g) ?? []).length, 1, "the hero must render one H1");
assert.match(hero, /href="#list-here"/, "the primary hero cta navigates to the private consultation intake");
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
