import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "urgOffices.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

assert.equal(data.verifiedAt, "2026-08-31");
assert.equal(data.sourceUrl, "https://www.urgfl.com/office-locations/");
assert.equal(data.publicNetworkLabel, "Florida office network");
assert.equal(data.officialBranches.length, 21, "official source should retain all listed branches");

const floridaBranches = data.officialBranches.filter((branch) => branch.state === "FL");
const nonFloridaBranches = data.officialBranches.filter((branch) => branch.state !== "FL");
assert.equal(floridaBranches.length, 19, "official source currently lists 19 Florida locations");
assert.deepEqual(nonFloridaBranches.map((branch) => branch.state).sort(), ["NC", "TX"]);

const byId = new Map(data.officialBranches.map((branch) => [branch.id, branch]));
assert.equal(byId.get("hialeah")?.name, "Hialeah");
assert.equal(byId.get("fort-lauderdale")?.name, "Fort Lauderdale");
assert.equal(byId.get("pembroke-pines")?.status, "opening-soon");
assert.ok(byId.has("weston"), "Weston must remain an official branch");
assert.ok(data.carlosSouthFloridaServiceAreas.includes("Broward County"));
assert.ok(data.crossBorderReferralMarkets.includes("Spain"));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "dist", "node_modules", "_drafts"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(?:md|mjs|ts|tsx|json|txt)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const publicRoots = ["src", "public", "netlify"].map((folder) => path.join(root, folder));
const publicFiles = publicRoots.flatMap((folder) => walk(folder));
const numericOfficeClaim = /\b(?:19|20|21)\s+(?:Florida\s+|FL\s+)?(?:branch(?:es)?|office(?:s)?)\b/i;
for (const file of publicFiles) {
  if (file === dataPath) continue;
  const source = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(source, numericOfficeClaim, `numeric URG office claim remains in ${path.relative(root, file)}`);
}

const logo = fs.readFileSync(path.join(root, "src", "components", "UrgLogo.tsx"), "utf8");
assert.match(logo, /urg-logo-original\.webp/);
assert.doesNotMatch(logo, /<svg|<path|<text/, "URG logo must use the approved asset, not a redrawn SVG");

const constants = fs.readFileSync(path.join(root, "src", "constants.ts"), "utf8");
assert.match(constants, /Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity\./);
for (const rel of [
  "src/components/Footer.tsx",
  "src/components/LeadForm.tsx",
  "src/components/forms/SellerIntakeForm.tsx",
  "src/components/forms/BuyerMandateForm.tsx",
  "src/components/forms/AgencyPartnerForm.tsx",
]) {
  assert.match(fs.readFileSync(path.join(root, rel), "utf8"), /PUBLIC_COMPLIANCE/, `${rel} must use canonical professional identification`);
}

console.log("URG office positioning verification passed: canonical source, neutral public wording, official logo, and professional identification are intact.");
