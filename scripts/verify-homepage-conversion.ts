import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { shouldRenderMobileSticky } from "../src/components/mobileStickyModel";

assert.equal(
  shouldRenderMobileSticky({ formVisible: false, consentPending: false }),
  true,
  "the seller CTA should remain available when no other bottom action is active",
);
assert.equal(
  shouldRenderMobileSticky({ formVisible: true, consentPending: false }),
  false,
  "the seller CTA should hide while the in-page form is visible",
);
assert.equal(
  shouldRenderMobileSticky({ formVisible: false, consentPending: true }),
  false,
  "the seller CTA should hide while the cookie choice occupies the bottom action area",
);

const [hero, proof, about, mobileSticky] = await Promise.all([
  readFile("src/components/Hero.tsx", "utf8"),
  readFile("src/components/Proof.tsx", "utf8"),
  readFile("src/components/AboutContact.tsx", "utf8"),
  readFile("src/components/MobileStickyCTA.tsx", "utf8"),
]);

assert.match(hero, /href="#client-reviews"/);
assert.match(proof, /id="client-reviews"/);
assert.doesNotMatch(about, /founded in 2002|in-house title|Est\. 2002/i);
assert.match(about, /3,500\+ agents and 20 Florida offices/);
assert.match(
  mobileSticky,
  /getElementById\("list-here"\)\s*\?\?\s*document\.getElementById\("contact"\)/,
  "the homepage hero form must take priority over the lower contact section",
);

console.log("homepage conversion contract verified");
