import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/pages/GlobalDeskPage.tsx", "utf8");
const form = await readFile("src/components/forms/GlobalDeskListingForm.tsx", "utf8");
const schema = await readFile("src/components/SEO/SchemaOrg.tsx", "utf8");

// Language, naming, canonical, and public compliance contract.
assert.match(source, /useState<Lang>\("en"\)/);
assert.match(source, /localStorage\.getItem\("gd-lang"\)/);
assert.match(source, /hrefLang="en"/);
assert.match(source, /hrefLang="es"/);
assert.match(source, /rel="canonical" href="https:\/\/homesprofessional\.com\/global-desk"/);
assert.match(source, /Miami Global Desk · International Listing Activation/);
assert.doesNotMatch(source, /Miami Global Listing Desk|Global Desk Miami|Miami Desk|International Desk/, "use the approved Miami Global Desk service name");
assert.match(source, /Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity/);

// The redesigned proof strip intentionally keeps only the three verified signals
// that can be understood at a glance.
for (const figure of ["93,000", "World’s largest", "437+", "May 11, 2026"]) {
  assert.ok(source.includes(figure), `missing verified proof signal: ${figure}`);
}

// One commercial hierarchy: activation first, private WhatsApp introduction second.
assert.match(source, /cta_type: "explore_activation"/);
assert.match(source, /cta_type: "private_discussion"/);
assert.match(source, /cta_type: "whatsapp_private_discussion"/);
assert.match(source, /href="#listing-request"/);
assert.match(source, /global_desk_cta_click/);
const heroCtas = source.slice(source.indexOf('href="#how-it-works"'), source.indexOf('aria-label="Network proof"'));
assert.doesNotMatch(
  heroCtas,
  /mailto:/,
  "the hero secondary path must be the contextual WhatsApp introduction, not a competing email CTA",
);

// Brokerage-mediated, property-by-property language and outcome qualifications.
for (const phrase of [
  "property by property",
  "subject to brokerage approval, platform rules, property eligibility, cooperation terms, and applicable compliance requirements",
  "Is exposure or a buyer guaranteed?",
  "keeps the mandate, client relationship, local negotiation, and closing",
]) {
  assert.match(source, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
}
assert.doesNotMatch(source, /guaranteed (?:placement|buyer|commission|sale)/i);

// Intake remains the existing Netlify form with its attribution and safeguards.
assert.match(form, /const FORM_NAME = "global-desk-listing"/);
assert.match(form, /data-netlify="true"/);
assert.match(form, /netlify-honeypot="bot-field"/);
assert.match(form, /fd\.append\("sourcePage", window\.location\.pathname\)/);
assert.match(form, /submitterType/);
assert.match(form, /listPath/);
assert.match(form, /authorization/);
assert.match(form, /consent/);

// Structured data cannot imply that the Florida license covers foreign territory.
for (const block of [...schema.matchAll(/areaServed:\s*(\[[^\]]*\]|"[^"]*")/g)].map((m) => m[1])) {
  assert.doesNotMatch(
    block,
    /"(?:Madrid|Spain|España|Latin America|Europe|Middle East|Canada|Barcelona|Marbella|Ibiza)"/i,
    `areaServed must stay within the Florida license: ${block.replace(/\s+/g, " ").slice(0, 100)}`,
  );
}

console.log("global desk language and conversion contract verified");
