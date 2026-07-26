import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { shouldRenderMobileSticky } from "../src/components/mobileStickyModel";
import {
  nextHeroSellerStep,
  previousHeroSellerStep,
  validateHeroSellerStepOne,
} from "../src/components/heroSellerFormModel";

const validStepOne = {
  propertyAddress: "15951 SW 41 St, Weston, FL",
  name: "Carlos Uzcategui",
  phone: "+1 954-865-6622",
};

assert.deepEqual(
  validateHeroSellerStepOne({ ...validStepOne, propertyAddress: "" }),
  { valid: false, firstInvalid: "propertyAddress" },
  "Step 1 must stop on a missing property address",
);
assert.deepEqual(
  validateHeroSellerStepOne({ ...validStepOne, name: " " }),
  { valid: false, firstInvalid: "name" },
  "Step 1 must stop on a missing full name",
);
assert.deepEqual(
  validateHeroSellerStepOne({ ...validStepOne, phone: "" }),
  { valid: false, firstInvalid: "phone" },
  "Step 1 must stop on a missing phone or WhatsApp number",
);
assert.deepEqual(validateHeroSellerStepOne(validStepOne), { valid: true });
assert.equal(nextHeroSellerStep(1, validStepOne), 2, "valid Step 1 advances without submitting");
assert.equal(
  nextHeroSellerStep(1, { ...validStepOne, phone: "" }),
  1,
  "invalid Step 1 remains visible",
);
assert.equal(previousHeroSellerStep(2), 1, "Back returns to Step 1 without clearing data");

assert.equal(
  shouldRenderMobileSticky({ formVisible: false, consentPending: false, guardVisible: false }),
  true,
  "the seller CTA should remain available when no other bottom action is active",
);
assert.equal(
  shouldRenderMobileSticky({ formVisible: true, consentPending: false, guardVisible: false }),
  false,
  "the seller CTA should hide while the in-page form is visible",
);
assert.equal(
  shouldRenderMobileSticky({ formVisible: false, consentPending: true, guardVisible: false }),
  false,
  "the seller CTA should hide while the cookie choice occupies the bottom action area",
);
assert.equal(
  shouldRenderMobileSticky({ formVisible: false, consentPending: false, guardVisible: true }),
  false,
  "the seller CTA should hide while a guarded element (e.g. the review card) crosses the bottom action area",
);

const [home, hero, form, authority, execution, distribution, proof, about, contactPage, cookie, mobileSticky] = await Promise.all([
  readFile("src/pages/HomePage.tsx", "utf8"),
  readFile("src/components/Hero.tsx", "utf8"),
  readFile("src/components/HeroSellerForm.tsx", "utf8"),
  readFile("src/components/SellerAuthorityStrip.tsx", "utf8"),
  readFile("src/components/SellerExecutionSystem.tsx", "utf8"),
  readFile("src/components/Distribution.tsx", "utf8"),
  readFile("src/components/Proof.tsx", "utf8"),
  readFile("src/components/AboutContact.tsx", "utf8"),
  readFile("src/pages/ContactPage.tsx", "utf8"),
  readFile("src/components/CookieBanner.tsx", "utf8"),
  readFile("src/components/MobileStickyCTA.tsx", "utf8"),
]);

assert.match(hero, /Know How Your Property Should Be Positioned Before You List\./);
assert.match(
  hero,
  /Receive a private MLS-based review of your property’s likely value range, competitive position, buyer profile and recommended launch strategy—prepared personally by Carlos Uzcategui, Florida Realtor® since 2001\./,
);
assert.match(hero, /Request My Property Strategy/);
assert.match(hero, /Speak With Carlos on WhatsApp/);
assert.match(hero, /Private review · No listing commitment · Personal response from Carlos/);
assert.equal((hero.match(/<motion\.h1|<h1/g) ?? []).length, 1, "the homepage hero must render one H1");
assert.doesNotMatch(hero, /Eyebrow|South Florida · Global Reach/);
assert.match(hero, /93,000", label: "Association members"/);
assert.doesNotMatch(hero, /93,000", label: "Member agents"/);
assert.match(hero, /United Realty Group · 3,500\+ agents · 20 Florida offices/);
assert.match(authority, /Florida Realtor® since 2001/);
assert.match(authority, /CLHMS Luxury Specialist/);
assert.match(authority, /Verified Realtor\.com® reviews/);
assert.match(execution, /What Carlos Does After the Listing Goes Live/);
for (const [label, copy] of [
  ["POSITION", "Price strategy, presentation, buyer profile, property narrative and launch timing."],
  ["ACTIVATE", "Identify and reach agents working with relevant buyers by location, property type and price range."],
  ["REPORT", "Provide structured updates on showing activity, online engagement, buyer-agent response and competing inventory."],
  ["ADJUST", "Recommend changes from market evidence, property response and competitive movement—not guesswork."],
]) {
  assert.match(execution, new RegExp(label));
  assert.match(execution, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
assert.doesNotMatch(distribution, /The Listing System|PILLARS\.map/);
assert.match(distribution, /label: "Association members"/);
assert.doesNotMatch(distribution, /label: "Member agents"/);
const sectionOrder = [
  "<Hero />",
  "<SellerAuthorityStrip />",
  "<SellerExecutionSystem />",
  "<Distribution />",
  "<Proof />",
  "<GlobalDeskTeaser />",
  "<MarketPulse />",
  "<AboutContact />",
  "<Footer />",
];
for (let index = 1; index < sectionOrder.length; index += 1) {
  assert.ok(
    home.indexOf(sectionOrder[index - 1]) < home.indexOf(sectionOrder[index]),
    `${sectionOrder[index - 1]} must render before ${sectionOrder[index]}`,
  );
}
assert.match(home, /<title>South Florida Listing Strategist \| Carlos Uzcategui<\/title>/);
assert.match(
  home,
  /Request a private MLS-based property strategy from Carlos Uzcategui, Florida Realtor® since 2001\. Pricing, positioning, buyer-agent activation and global distribution for South Florida sellers\./,
);
assert.match(form, /Confidential Seller Strategy Review/);
assert.match(form, /Continue My Property Review/);
assert.match(form, /Request My Property Strategy/);
assert.match(form, /Revisión Confidencial de Estrategia de Venta/);
assert.match(form, /Continuar Mi Revisión de Propiedad/);
assert.match(form, /Solicitar Mi Estrategia de Propiedad/);
assert.match(form, /type="button"/, "Step 1 Continue must never submit the form");
assert.match(
  form,
  /if \(step === 1\) \{\s*handleContinue\(\);\s*return;/,
  "pressing Enter during Step 1 must advance, not submit",
);
assert.match(form, /pushEvent\("step_progress"/);
assert.equal(
  (form.match(/trackLead\("seller"/g) ?? []).length,
  1,
  "the progressive form must retain exactly one final lead event",
);
for (const field of [
  "propertyAddress",
  "name",
  "phone",
  "email",
  "city",
  "timeline",
  "messagingConsent",
  "lat",
  "lng",
  "placeId",
]) {
  assert.match(form, new RegExp(`name="${field}"`), `seller-hero must retain the ${field} field`);
}
assert.match(form, /notifyLeadDirect\(/);
assert.match(form, /\/\.netlify\/functions\/lead-acknowledgment/);
assert.match(form, /status === "success"/);
assert.match(cookie, /bottom-4 left-4 right-4/);
assert.match(cookie, /md:left-6 md:right-auto/);
assert.doesNotMatch(cookie, /md:left-auto md:right-6/);
assert.match(proof, /id="client-reviews"/);
assert.doesNotMatch(about, /founded in 2002|in-house title|Est\. 2002/i);
assert.match(about, /3,500\+ agents and 20 Florida offices/);
assert.match(about, /showForm = true/);
assert.match(about, /\{showForm && \(/, "AboutContact must support a reusable no-form profile mode");
assert.equal(
  (contactPage.match(/<LeadForm/g) ?? []).length,
  1,
  "ContactPage must render exactly one desk-aware LeadForm",
);
assert.match(
  contactPage,
  /<AboutContact showForm=\{false\}/,
  "ContactPage must use the Carlos profile without adding another form",
);
assert.match(
  contactPage,
  /id="listing-request"/,
  "the contact page's only form must expose the sticky-CTA suppression target",
);
assert.match(
  mobileSticky,
  /getElementById\("list-here"\)\s*\?\?\s*document\.getElementById\("listing-request"\)\s*\?\?\s*document\.getElementById\("contact"\)/,
  "the visible lead form must take priority over a lower profile/contact section",
);
assert.doesNotMatch(home, /<meta name="keywords"/, "homepage metadata must not contain a keyword-stuffed tag");
assert.match(home, /twitter:title" content="South Florida Listing Strategist \| Carlos Uzcategui"/);
assert.match(home, /og:title" content="South Florida Listing Strategist \| Carlos Uzcategui"/);
assert.match(
  mobileSticky,
  /querySelectorAll\("\[data-sticky-cta-guard\]"\)/,
  "the seller CTA must observe guarded elements so it never covers them",
);
assert.match(
  mobileSticky,
  /rootMargin: `-\$\{topInset\}px/,
  "the guard band must be sized in pixels from the pill's footprint — a viewport-percentage band is shallower than the pill on short landscape screens",
);
assert.doesNotMatch(
  mobileSticky,
  /rootMargin: "-\d+%/,
  "the guard band must not be expressed as a viewport percentage",
);

console.log("homepage conversion contract verified");
