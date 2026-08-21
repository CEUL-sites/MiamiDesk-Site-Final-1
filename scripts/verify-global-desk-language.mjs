import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = async (path) => readFile(path, "utf8").catch(() => "");

const [page, content, form, router, packageJson, sitemap, netlify, constants, schema, indexHtml, languageSwitcher, pathfinder, footer, esBuyers] = await Promise.all([
  read("src/pages/GlobalDeskPage.tsx"),
  read("src/pages/globalDeskContent.ts"),
  read("src/components/forms/GlobalDeskListingForm.tsx"),
  read("src/main.tsx"),
  read("package.json"),
  read("public/sitemap.xml"),
  read("netlify.toml"),
  read("src/constants.ts"),
  read("src/components/SEO/SchemaOrg.tsx"),
  read("index.html"),
  read("src/components/LanguageSwitcher.tsx"),
  read("src/components/SellerPathfinder.tsx"),
  read("src/components/Footer.tsx"),
  read("src/pages/es/EsComprarPage.tsx"),
]);

const expectText = (source, value, message) => {
  assert.ok(source.includes(value), message ?? `Missing required text: ${value}`);
};

for (const value of [
  "International Property. Connected to South Florida’s Professional Agent Market.",
  "Inmuebles internacionales. Conectados con el mercado profesional de agentes del sur de Florida.",
  "Professional distribution converted into professional cooperation.",
  "Distribución profesional convertida en cooperación profesional.",
  "Not a cold lead. A prepared, documented handoff.",
  "No es un contacto frío. Es una presentación preparada y documentada.",
  "Global Desk qualifies, briefs and introduces—it does not merely forward leads.",
  "Global Desk cualifica, informa y presenta; no se limita a reenviar contactos.",
  "Remain Involved With My Client",
  "Continuar involucrado con mi cliente",
  "Refer and Transfer the Client",
  "Referir y transferir al cliente",
  "365",
]) {
  expectText(content, value);
}

for (const value of [
  'name="entryPath"',
  'name="formRenderedAt"',
  'name="financialReadiness"',
  'name="cooperation"',
  'name="utm_source"',
  'name="landing_page"',
]) {
  expectText(indexHtml, value, `Netlify detection form is missing ${value}`);
}

for (const key of [
  "audience",
  "difference",
  "mandate",
  "proof",
  "buyerIntroduction",
  "agentProtection",
  "activation",
  "relationships",
  "faq",
]) {
  assert.equal(
    (content.match(new RegExp(`\\b${key}:`, "g")) ?? []).length,
    2,
    `${key} must exist in both language dictionaries`,
  );
}

assert.doesNotMatch(content, /\$69B|\$69 billion/i, "$69B is prohibited by CLAUDE.md");
assert.doesNotMatch(content, /pre-approved buyer/i, "Do not imply lender preapproval without evidence");
assert.doesNotMatch(content, /comprador preaprobado/i, "Do not imply lender preapproval without evidence");

expectText(page, 'pathname.startsWith("/es/")');
assert.doesNotMatch(page, /localStorage\.getItem\("gd-lang"\)/, "Canonical language must not depend on local storage");
for (const id of [
  "audience",
  "difference",
  "mandate",
  "proof",
  "buyer-introduction",
  "agent-protection",
  "activation",
  "relationships",
  "listing-request",
  "faq",
]) {
  expectText(page, `id="${id}"`, `Missing section id ${id}`);
}
for (const value of [
  "t.heroPrimary",
  "t.heroSecondary",
  "GLOBAL_DESK_STATS",
  "GlobalDeskListingForm",
]) {
  expectText(page, value);
}

for (const value of [
  '"inventory"',
  '"mandate"',
  '"buyer_opportunity"',
  "Submit Qualified Inventory",
  "Developer / Agency Mandate",
  "South Florida Agent / Buyer Opportunity",
  "stage === 2",
  "reportValidity",
  "focus-within:ring-2",
  'name="form-name"',
  'name="bot-field"',
  'name="formRenderedAt"',
  "notifyLeadDirect",
  "lead-acknowledgment",
  "getAttribution",
  "trackLead",
  "pushEvent",
]) {
  expectText(form, value);
}

expectText(router, 'path="/es/global-desk"');
expectText(router, '<Navigate to="/es/global-desk" replace />');
expectText(router, '<Navigate to="/global-desk" replace />');
expectText(packageJson, '"/es/global-desk"');
assert.doesNotMatch(packageJson, /"\/es\/spain-desk"/, "Legacy Spanish route must not be prerendered");
assert.doesNotMatch(packageJson, /"\/spain-mls-listing"/, "Legacy English route must not be prerendered");
expectText(sitemap, "https://homesprofessional.com/es/global-desk");
assert.doesNotMatch(sitemap, /<loc>https:\/\/homesprofessional\.com\/(?:es\/spain-desk|spain-mls-listing)<\/loc>/);
expectText(netlify, 'from = "/es/spain-desk"');
expectText(netlify, 'to = "/es/global-desk"');
expectText(netlify, 'from = "/spain-mls-listing"');
expectText(netlify, 'to = "/global-desk"');
expectText(constants, 'p.startsWith("/es/")');
assert.doesNotMatch(
  constants,
  /\[\s\S]*?"\/global-desk"[\s\S]*?\]\.includes\(p\)/,
  "The English Global Desk must retain the Florida contact route",
);
for (const [source, label] of [
  [languageSwitcher, "language switcher"],
  [pathfinder, "seller pathfinder"],
  [footer, "footer"],
  [esBuyers, "Spanish buyer page"],
]) {
  expectText(source, '"/es/global-desk"', `${label} must link to the Spanish canonical route`);
  assert.doesNotMatch(source, /["']\/es\/spain-desk["']/, `${label} must not link to the retired Spanish route`);
  assert.doesNotMatch(source, /["']\/spain-mls-listing["']/, `${label} must not link to the retired English route`);
}

expectText(schema, "International Property Activation and Professional Cooperation");
assert.match(schema, /areaServed:\s*"South Florida"/);
assert.doesNotMatch(schema, /areaServed:\s*\[[^\]]*(?:Spain|Madrid|Europe|Latin America)/i);

console.log("global desk operating-model contract verified");
