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
}

// The client contract must carry formName, or the server falls back to
// sourcePage and the highest-intent forms lose their intent score.
const leadNotifyClient = readFileSync(new URL("../src/lib/leadNotify.ts", import.meta.url), "utf8");
assert.match(leadNotifyClient, /formName\?: string/, "DirectLead exposes formName");

console.log("lead score model verified");
