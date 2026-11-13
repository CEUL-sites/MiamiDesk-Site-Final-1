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

// ── Hard fails ────────────────────────────────────────────────────────────
assert.equal(assessLeadSpam({ ...realLeads[0], ...human, botField: "x" }).verdict, "drop");
assert.equal(assessLeadSpam({ ...realLeads[0], formRenderedAt: NOW - 500, now: NOW }).verdict, "drop");
// Missing timestamp is a weak signal, never a block on its own.
assert.equal(assessLeadSpam({ ...realLeads[0], now: NOW, timestampExpected: true }).verdict, "ok");

// ── Every lead-handling entry point runs the assessment ───────────────────
for (const f of ["submission-created.ts", "lead-notify.ts", "lead-acknowledgment.ts"]) {
  const src = readFileSync(new URL(`../netlify/functions/${f}`, import.meta.url), "utf8");
  assert.match(src, /assessLeadSpam\(/, `${f} must run assessLeadSpam`);
}

console.log("verify:lead-spam — all assertions passed");
