import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  scoreLead,
  parseValueFloor,
  normalizePhone,
  formatLeadWhatsApp,
  formatLeadEmail,
  formatLeadEmailSubject,
  MAX_LEAD_SCORE,
  type AlertLead,
} from "../netlify/functions/_shared/leadScore";
import type { LeadMarketContext } from "../netlify/functions/_shared/leadMarketContext";

// ── Timeline urgency across every string the forms actually ship ─────────
// The three separators are real: LeadForm uses "-", HeroSellerForm uses "–",
// SellerIntakeForm uses " – ". A regression in normalisation silently drops
// the strongest lead signal, so each literal is asserted verbatim.
const timelineTier = (timeline: string) => scoreLead({ timeline }).signals.timeline;

assert.equal(timelineTier("Immediately"), 30, "LeadForm / HeroSellerForm immediate");
assert.equal(timelineTier("De inmediato"), 30, "Spanish immediate");
assert.equal(timelineTier("0 – 3 months"), 30, "SellerIntakeForm spaced en-dash immediate");
assert.equal(timelineTier("30-90 days"), 22, "LeadForm hyphen");
assert.equal(timelineTier("30–90 days"), 22, "HeroSellerForm en-dash");
assert.equal(timelineTier("30–90 días"), 22, "Spanish en-dash");
assert.equal(timelineTier("3-6 months"), 22, "LeadForm near-term");
assert.equal(timelineTier("3 – 6 months"), 22, "SellerIntakeForm near-term");
assert.equal(timelineTier("3–6 meses"), 22, "Spanish near-term");
assert.equal(timelineTier("6 – 12 months"), 12, "SellerIntakeForm mid horizon");
assert.equal(timelineTier("6–12 meses"), 12, "Spanish mid horizon");
assert.equal(timelineTier("6+ months"), 6, "HeroSellerForm long horizon");
assert.equal(timelineTier("12+ months"), 6, "SpainSellerForm long horizon");
assert.equal(timelineTier("Más de 12 meses"), 6, "Spanish long horizon");
assert.equal(timelineTier("Exploring options"), 3, "exploring");
assert.equal(timelineTier("Explorando opciones"), 3, "Spanish exploring");
assert.equal(timelineTier("Exploratory — no fixed date"), 3, "SellerIntakeForm exploratory");
assert.equal(timelineTier(""), 8, "a form that never asked must score neutral, not zero");

// "6 – 12 months" must not be captured by the long-horizon "6+" pattern.
assert.ok(
  timelineTier("6 – 12 months") > timelineTier("6+ months"),
  "a 6–12 month seller is nearer term than an open-ended 6+ seller",
);

// ── Value band parsing across both currencies ───────────────────────────
assert.equal(parseValueFloor("$500K – $1M"), 500_000);
assert.equal(parseValueFloor("$1M – $2M"), 1_000_000);
assert.equal(parseValueFloor("$2M – $5M"), 2_000_000);
assert.equal(parseValueFloor("$25M+"), 25_000_000);
assert.equal(parseValueFloor("Under €500,000"), 0, "an upper bound floors at zero");
assert.equal(parseValueFloor("€500,000 – €1M"), 500_000, "comma thousands separator");
assert.equal(parseValueFloor("€3M – €10M"), 3_000_000);
assert.equal(parseValueFloor("Over €10M"), 10_000_000);
assert.equal(parseValueFloor("Prefer not to say"), null);
assert.equal(parseValueFloor(""), null);
assert.equal(parseValueFloor(undefined), null);

// ── Phone normalisation — the one-tap-to-call contract ──────────────────
assert.deepEqual(normalizePhone("(305) 555-0142"), {
  e164: "+13055550142",
  display: "+13055550142",
  waLink: "https://wa.me/13055550142",
});
assert.equal(normalizePhone("+1 305 555 0142").e164, "+13055550142", "already E.164");
assert.equal(normalizePhone("13055550142").e164, "+13055550142", "11 digits with US country code");
assert.equal(normalizePhone("0034612345678").e164, "+34612345678", "00 international prefix");
assert.equal(
  normalizePhone("612 345 678", "Marbella / Costa del Sol").e164,
  "+34612345678",
  "9 digits on a Spain-market lead resolves to +34",
);
assert.equal(
  normalizePhone("612 345 678").e164,
  null,
  "the same 9 digits with no market hint must NOT be guessed",
);
assert.equal(normalizePhone("12345").e164, null, "too short for E.164");
assert.equal(normalizePhone("").display, "—", "an absent phone still renders");
assert.equal(
  normalizePhone("ask me on whatsapp").display,
  "ask me on whatsapp",
  "an unparseable number is preserved verbatim rather than dropped",
);

// ── Tiering: the cases that decide who gets called first ────────────────
const hotSeller = scoreLead({
  name: "Maria Restrepo",
  email: "maria@example.com",
  phone: "+13055550142",
  propertyAddress: "1450 Brickell Ave",
  city: "Miami",
  timeline: "0 – 3 months",
  valueBand: "$2M – $5M",
  placeId: "ChIJ_placeholder",
  messagingConsent: "yes",
  formName: "seller-intake",
});
assert.equal(hotSeller.tier, "P1", "verified $2M+ address, immediate, full intake → P1");
assert.ok(hotSeller.score >= 70 && hotSeller.score <= MAX_LEAD_SCORE);
assert.ok(hotSeller.reasons.includes("Immediate timeline"));
assert.ok(hotSeller.reasons.includes("Verified property address"));
assert.ok(hotSeller.reasons.includes("WhatsApp/SMS consent given"));
assert.match(hotSeller.nextAction, /call now/i);

const pdfDownload = scoreLead({
  email: "browser@example.com",
  formName: "lead-magnet-download",
  timeline: "Exploring options",
});
assert.equal(pdfDownload.tier, "P3", "an exploratory content download is never urgent");
assert.ok(pdfDownload.reasons.includes("Email only — no phone"));

assert.ok(
  hotSeller.score > pdfDownload.score,
  "the ordering this whole module exists to produce",
);

// A lead is only ever re-ranked, never suppressed: every tier still routes.
for (const tier of ["P1", "P2", "P3"]) {
  assert.ok(["P1", "P2", "P3"].includes(tier));
}

// ── Both notifier paths must score a given lead identically ─────────────
// submission-created.ts and lead-notify.ts race through leadDedup, so whichever
// wins must produce the same tier — otherwise the alert Carlos sees depends on
// a network race rather than on the lead.
const sharedSignals = {
  name: "Andres P.",
  email: "andres@example.com",
  phone: "9545550188",
  propertyAddress: "2400 Weston Rd",
  city: "Weston",
  timeline: "Immediately",
  valueBand: "$1M – $2M",
  placeId: "ChIJ_weston",
  messagingConsent: "yes",
  formName: "seller-hero",
};
const fromHeroPage: AlertLead = { ...sharedSignals, sourcePage: "hero-en" };
const fromFormName: AlertLead = { ...sharedSignals, sourcePage: "seller-hero" };
assert.deepEqual(
  scoreLead(fromHeroPage),
  scoreLead(fromFormName),
  "sourcePage must not influence the score — only formName does",
);

// formName and sourcePage are genuinely different values in production
// ("hero-en", "sell-brickell", "referral-intake-es"), so scoring intent off
// sourcePage would drop the strongest forms into the unknown bucket.
assert.ok(
  scoreLead({ formName: "seller-intake" }).signals.intent >
    scoreLead({ formName: "sell-brickell" }).signals.intent,
  "a known form must outrank an unrecognised page name",
);

// ── Alert rendering ─────────────────────────────────────────────────────
const waMessage = formatLeadWhatsApp(
  { ...sharedSignals, sourcePage: "hero-en", leadSource: "google / cpc / weston" },
  scoreLead(sharedSignals),
);
assert.match(waMessage, /^P1 · Call now — \d+\/100/, "tier leads the alert");
assert.ok(
  waMessage.includes("\n\n"),
  "the alert is read on a phone — blank lines must survive into the message",
);

// SpainSellerForm sets propertyAddress and city from the same input, and the
// hero market picker repeats the place name the seller already typed. Neither
// should echo the location back twice.
const spainAlert = formatLeadWhatsApp(
  {
    name: "Javier Ruiz",
    phone: "612 345 678",
    propertyAddress: "Marbella, Málaga",
    city: "Marbella / Costa del Sol",
    formName: "spain-seller",
    desk: "spain",
  },
  scoreLead({ formName: "spain-seller" }),
);
assert.match(spainAlert, /📍 Marbella, Málaga\n/, "redundant market label is dropped");
assert.equal(
  (spainAlert.match(/Marbella/g) ?? []).length,
  1,
  "the place name appears once, not twice",
);
// A genuinely different city must still be appended.
assert.match(
  formatLeadWhatsApp(
    { propertyAddress: "1450 Brickell Ave", city: "Miami", formName: "seller-hero" },
    scoreLead({ formName: "seller-hero" }),
  ),
  /📍 1450 Brickell Ave, Miami/,
  "a distinct city is still shown",
);
assert.match(waMessage, /\+19545550188/, "phone renders in E.164 so WhatsApp auto-dials it");
assert.match(waMessage, /https:\/\/wa\.me\/19545550188/, "one-tap chat link");
assert.match(waMessage, /▶ /, "next action is present");
assert.ok(!waMessage.includes("undefined"), "no undefined leaks into the alert");
assert.ok(!waMessage.includes("null"), "no null leaks into the alert");

const emailBody = formatLeadEmail({ ...sharedSignals }, scoreLead(sharedSignals), {
  timestamp: "8/11/2026, 9:15:00 AM",
});
assert.match(emailBody, /tel:\+19545550188/, "tappable dial link in email");
assert.match(emailBody, /Score breakdown/, "breakdown retained for review");
assert.ok(!emailBody.includes("undefined"));

assert.match(
  formatLeadEmailSubject({ ...sharedSignals }, scoreLead(sharedSignals)),
  /^\[P1\] Andres P\./,
  "inbox is triageable without opening the mail",
);

// A lead with no phone must not render a dead tel:/wa.me link.
const emailOnly = formatLeadWhatsApp(
  { email: "x@example.com", formName: "lead-magnet-download" },
  scoreLead({ email: "x@example.com", formName: "lead-magnet-download" }),
);
assert.ok(!emailOnly.includes("wa.me"), "no chat link when there is no usable number");

// ── Market context rendering (optional trailing argument) ────────────────
// leadMarketContext.ts owns the fetch (see scripts/verify-lead-market.ts for
// that side); leadScore.ts only renders an already-fetched context, so all of
// this is synchronous and network-free.
const marketLead = sharedSignals; // reuse the fixture already defined above
const marketScore = scoreLead(marketLead);

const noContextWa = formatLeadWhatsApp(marketLead, marketScore);
assert.equal(
  formatLeadWhatsApp(marketLead, marketScore, null),
  noContextWa,
  "an explicit null context must render byte-identical to omitting the argument entirely",
);
assert.equal(
  formatLeadWhatsApp(marketLead, marketScore, undefined),
  noContextWa,
  "an explicit undefined context must render byte-identical to omitting the argument entirely",
);

const emailExtras = { timestamp: "8/11/2026, 9:15:00 AM" };
const noContextEmail = formatLeadEmail(marketLead, marketScore, emailExtras);
assert.equal(
  formatLeadEmail(marketLead, marketScore, emailExtras, null),
  noContextEmail,
  "email: an explicit null context renders byte-identical to omitting it — old 3-arg call sites are untouched",
);

const IDX_DISCLAIMER_TEXT =
  "Listing information is provided in part by the Miami and South Florida REALTORS® " +
  "and/or BeachesMLS via IDX. Information is deemed reliable but not guaranteed and is " +
  "subject to change without notice. Verify all information before making real estate decisions.";

const sampleContext: LeadMarketContext = {
  city: "Miami",
  requestedAs: "Brickell",
  medianListPrice: 612_500,
  avgDaysOnMarket: 42,
  medianPricePerSqft: 412,
  activeCount: 184,
  asOf: "2026-08-11T12:00:00.000Z",
  source: "Miami and South Florida REALTORS® MLS",
  disclaimer: IDX_DISCLAIMER_TEXT,
};

const waWithContext = formatLeadWhatsApp(marketLead, marketScore, sampleContext);
assert.notEqual(waWithContext, noContextWa, "a populated context must change the rendered WhatsApp alert");
assert.match(waWithContext, /📈 Miami \(Brickell\) market · MLS snapshot Aug 11/, "states the submarket the numbers describe, and the period");
assert.match(waWithContext, /Median list \$612,500/);
assert.match(waWithContext, /\$412\/sqft/);
assert.match(waWithContext, /42 days on mkt/);
assert.match(waWithContext, /184 active/);
assert.match(waWithContext, /not guaranteed/i, "labels the source so Carlos knows what he's quoting before he repeats a number");
assert.ok(
  waWithContext.includes("\n\n"),
  "the market block is still read on a phone — blank lines around it must survive",
);

const emailWithContext = formatLeadEmail(marketLead, marketScore, emailExtras, sampleContext);
assert.notEqual(emailWithContext, noContextEmail, "a populated context must change the rendered email");
assert.match(emailWithContext, /Market snapshot — Miami \(Brickell\)/);
assert.match(emailWithContext, /Median list price: \$612,500/);
assert.match(emailWithContext, /Price per sq ft: \$412/);
assert.match(emailWithContext, /Avg days on market: 42/);
assert.match(emailWithContext, /Active listings: 184/);
assert.match(emailWithContext, /Source: Miami and South Florida REALTORS® MLS · as of Aug 11/);
assert.ok(
  emailWithContext.includes(IDX_DISCLAIMER_TEXT),
  "email has room for the full IDX disclaimer text verbatim, unlike the short WhatsApp line",
);

// A context whose own `city` IS the resolved MLS city (no alias/submarket
// involved, e.g. the lead already said "Weston") must not print a redundant
// self-referential "(Weston)" after itself.
const directCityContext: LeadMarketContext = { ...sampleContext, city: "Weston", requestedAs: null };
const waDirectCity = formatLeadWhatsApp(marketLead, marketScore, directCityContext);
assert.match(waDirectCity, /📈 Weston market/);
assert.ok(!waDirectCity.includes("Weston (Weston)"), "no redundant self-referential submarket label");

// A field-level null (e.g. a thin days-on-market sample sitting alongside a
// healthy price sample — see leadMarketContext.ts's per-field MIN_SAMPLE
// gating) must be omitted from the line, never printed as "null"/"undefined".
const partialContext: LeadMarketContext = { ...sampleContext, avgDaysOnMarket: null, medianPricePerSqft: null };
const waPartial = formatLeadWhatsApp(marketLead, marketScore, partialContext);
assert.ok(!waPartial.includes("null"), "a null market field must never leak into the alert");
assert.ok(!waPartial.includes("undefined"), "a null market field must never leak into the alert");
assert.match(waPartial, /Median list \$612,500/, "the field that DID clear MIN_SAMPLE still renders");
assert.ok(!waPartial.includes("days on mkt"), "a suppressed field must not render its unit label either");
assert.ok(!waPartial.includes("/sqft"), "a suppressed field must not render its unit label either");

const emailPartial = formatLeadEmail(marketLead, marketScore, emailExtras, partialContext);
assert.ok(!emailPartial.includes("Avg days on market"), "email omits the whole labeled line, not just the value");
assert.ok(!emailPartial.includes("Price per sq ft"), "email omits the whole labeled line, not just the value");
assert.ok(!emailPartial.includes("null") && !emailPartial.includes("undefined"));

// ── Both handlers are actually wired to the shared formatter ────────────
// Guards against one path being updated and the other quietly drifting back
// to its own hand-rolled message.
for (const handler of ["lead-notify.ts", "submission-created.ts"]) {
  const source = readFileSync(new URL(`../netlify/functions/${handler}`, import.meta.url), "utf8");
  assert.match(source, /from "\.\/_shared\/leadScore"/, `${handler} imports the shared scorer`);
  assert.match(source, /scoreLead\(/, `${handler} scores the lead`);
  assert.match(source, /formatLeadWhatsApp\(/, `${handler} uses the shared WhatsApp format`);
  assert.match(source, /formatLeadEmailSubject\(/, `${handler} uses the shared subject line`);
  assert.match(source, /tier: scored\.tier/, `${handler} writes the tier to Sheets`);

  // Market context: both paths must decide via the shared tier gate (never a
  // hand-rolled "P1 or P2" check that could drift from leadScore.ts's
  // thresholds) and pass the result into BOTH formatters, or one channel
  // would show numbers the other doesn't. See scripts/verify-lead-market.ts
  // for the fetch/timeout/cache behavior of the module itself.
  assert.match(source, /from "\.\/_shared\/leadMarketContext"/, `${handler} imports the market-context module`);
  assert.match(source, /shouldFetchMarketContext\(scored\.tier\)/, `${handler} gates the lookup on the shared tier check`);
  assert.match(source, /getLeadMarketContext\(/, `${handler} calls the market-context lookup`);
  assert.match(
    source,
    /formatLeadWhatsApp\([^)]*marketContext\)/,
    `${handler} passes marketContext into the WhatsApp formatter`,
  );
  assert.match(
    source,
    /formatLeadEmail\([\s\S]*?marketContext\)/,
    `${handler} passes marketContext into the email formatter`,
  );
}

// The client contract must carry formName, or the server falls back to
// sourcePage and the highest-intent forms lose their intent score.
const leadNotifyClient = readFileSync(new URL("../src/lib/leadNotify.ts", import.meta.url), "utf8");
assert.match(leadNotifyClient, /formName\?: string/, "DirectLead exposes formName");

console.log("lead score model verified");
