// Asserts the lead spam model: real bot submissions seen in production are
// quarantined, while real names, real addresses and real South Florida
// places pass untouched. Run: npm run verify:lead-spam
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assessLeadSpam,
  isGibberishNameToken,
  isGibberishPlaceToken,
} from "../netlify/functions/_shared/leadSpam";

const NOW = 1_800_000_000_000;
const human = { formRenderedAt: NOW - 45_000, now: NOW, timestampExpected: true };

// ── Production bot submissions (2026-11-13, homepage-consultation-en) ──────
const bots = [
  { name: "Alwevam Uvrve", phone: "+16169109320", email: "srix@powerdesigninc.us", propertyAddress: "Vrjak" },
  { name: "Cmqxi Drqvwbww", phone: "+18437291906", email: "", propertyAddress: "" }, // only name + phone were visible in the alert
  { name: "Dokmi Avrtvwgj", phone: "+13933438467", email: "z.afo.l.owo.932@gmail.com", propertyAddress: "Upshg" },
];
for (const b of bots) {
  const r = assessLeadSpam({ ...b, ...human });
  assert.equal(r.verdict, "quarantine", `bot not caught: ${b.name} → ${JSON.stringify(r)}`);
}

// ── Real people and places must pass ──────────────────────────────────────
const realNames = [
  "Carlos Uzcategui", "María José González", "John Schmidt", "Christopher Hughes",
  "Thanh Nguyen", "Kathleen Fitzgerald", "Agnieszka Kowalczyk", "Xiomara Llanos",
  "Ángel Muñoz", "Mohammed Al-Rashid", "Siobhan O'Brien", "Yvonne Wright",
  "Dmitri Ivanov", "Andrzej Brzezinski", "Bertrand Albrecht", "Ng Wei",
  // Long consonant runs that are ordinary surnames (Codex review, PR #210)
  "Neil Armstrong", "Ruth Goldstein", "Oliver Goldsmith", "Erik Bergstrom",
  "Lars Lindqvist", "Anna Strzelecka", "Piotr Szczepanski", "Karl Engelbrecht",
  "Thabo Tshabalala", "Sipho Ndlovu", "Thabo Mbeki", "Zanele Mbhele", "Lindiwe Nkwanyana", "Zbigniew Hrvoje",
  "Ian McDonald", "Ewan McGregor", "Kirk Kirkpatrick", "Hans Hirschsprung",
  "Mark Rothschild", "Greta Schwarzkopf", "Lauren Knightley", "Mike Holtzclaw",
];
for (const n of realNames) {
  for (const t of n.split(/\s+/)) assert.equal(isGibberishNameToken(t), false, `real name flagged: ${n} (${t})`);
}

const realPlaces = [
  "Weston", "Fort Lauderdale", "Pembroke Pines", "Coral Springs", "Plantation", "Sunrise",
  "Davie", "Hollywood", "Miramar", "Hallandale Beach", "Pompano Beach", "Deerfield Beach",
  "Coconut Creek", "Tamarac", "Lauderhill", "Margate", "Parkland", "Southwest Ranches",
  "Cooper City", "Dania Beach", "Lighthouse Point", "Wilton Manors", "Oakland Park",
  "Brickell", "Coral Gables", "Doral", "Aventura", "Kendall", "Hialeah", "Homestead",
  "Key Biscayne", "Pinecrest", "Palmetto Bay", "Sunny Isles Beach", "Bal Harbour",
  "Miami Beach", "North Miami", "Surfside", "Boca Raton", "Delray Beach", "Jupiter",
  "Wellington", "West Palm Beach", "Madrid", "Marbella", "Barcelona", "Brickell Key",
];
for (const p of realPlaces) {
  for (const t of p.split(/\s+/)) assert.equal(isGibberishPlaceToken(t), false, `real place flagged: ${p} (${t})`);
}

const realLeads = [
  { name: "María González", phone: "+19548656622", email: "maria.gonzalez@gmail.com", propertyAddress: "1234 SW 41st St, Weston, FL" },
  { name: "John Schmidt", phone: "9545550123", email: "john@company.com", propertyAddress: "Weston" },
  { name: "Ana Pérez", phone: "+34646853078", email: "ana@correo.es", propertyAddress: "Calle de Serrano 45, Madrid" },
  { name: "Xiomara Llanos", phone: "", email: "x.m.llanos@gmail.com", propertyAddress: "" }, // one weak signal only
];
for (const l of realLeads) {
  const r = assessLeadSpam({ ...l, ...human });
  assert.equal(r.verdict, "ok", `real lead blocked: ${l.name} → ${JSON.stringify(r)}`);
}

// ── Acknowledgment payloads carry the screening fields ────────────────────
for (const f of ["SpainSellerForm", "GlobalDeskListingForm", "AgencyPartnerForm", "BuyerMandateForm", "ReferralIntakeForm"]) {
  const src = readFileSync(new URL(`../src/components/forms/${f}.tsx`, import.meta.url), "utf8");
  const ack = src.slice(src.indexOf("lead-acknowledgment"), src.indexOf("lead-acknowledgment") + 600);
  assert.match(ack, /formRenderedAt/, `${f} must send formRenderedAt to lead-acknowledgment`);
  assert.match(ack, /phone/, `${f} must send phone to lead-acknowledgment`);
}
// SellerIntakeForm uses personal follow-up (no auto lead-acknowledgment), while still screening via notifyLeadDirect.
{
  const sellerIntake = readFileSync(new URL("../src/components/forms/SellerIntakeForm.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(sellerIntake, /lead-acknowledgment/, "SellerIntakeForm uses personal follow-up, not automated lead-acknowledgment");
  const direct = sellerIntake.slice(sellerIntake.indexOf("notifyLeadDirect("), sellerIntake.indexOf("notifyLeadDirect(") + 600);
  assert.match(direct, /formRenderedAt/, "SellerIntakeForm must send formRenderedAt to notifyLeadDirect");
  assert.match(direct, /phone/, "SellerIntakeForm must send phone to notifyLeadDirect");
}
for (const f of ["SpainSellerForm", "GlobalDeskListingForm"]) {
  const src = readFileSync(new URL(`../src/components/forms/${f}.tsx`, import.meta.url), "utf8");
  const ack = src.slice(src.indexOf("lead-acknowledgment"), src.indexOf("lead-acknowledgment") + 600);
  assert.match(ack, /propertyAddress: form\.location/, `${f} must send its location to lead-acknowledgment`);
}

// ── Hard fails ────────────────────────────────────────────────────────────
assert.equal(assessLeadSpam({ ...realLeads[0], ...human, botField: "x" }).verdict, "drop");
assert.equal(assessLeadSpam({ ...realLeads[0], formRenderedAt: NOW - 500, now: NOW }).verdict, "drop");
// Missing timestamp is a weak signal, never a block on its own.
assert.equal(assessLeadSpam({ ...realLeads[0], now: NOW, timestampExpected: true }).verdict, "ok");

// ── Malformed browser signature (production bot, 2026-11) ─────────────────
// The bot's typed details are plausible, so only the quoted User-Agent gives it away.
const botUa = '"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"';
const realUas = [
  botUa.replace(/"/g, ""), // the same string without quotes is an ordinary browser
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/158.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Instagram 350.0.0 (iPhone15,2; \"en_US\")",
  "",
];
assert.equal(assessLeadSpam({ ...realLeads[0], ...human, userAgent: botUa }).verdict, "quarantine");
for (const userAgent of realUas) {
  assert.equal(assessLeadSpam({ ...realLeads[0], ...human, userAgent }).verdict, "ok", `real browser blocked: ${userAgent}`);
}

// ── Every lead-handling entry point runs the assessment ───────────────────
for (const f of ["submission-created.ts", "lead-notify.ts", "lead-acknowledgment.ts"]) {
  const src = readFileSync(new URL(`../netlify/functions/${f}`, import.meta.url), "utf8");
  assert.match(src, /assessLeadSpam\(/, `${f} must run assessLeadSpam`);
  assert.match(src, /userAgent:/, `${f} must screen the browser signature`);
}

console.log("verify:lead-spam — all assertions passed");
