import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const pagePaths = [
  "src/pages/HomePage.tsx",
  "src/pages/SellSouthFloridaPage.tsx",
  "src/pages/HomeValuePage.tsx",
  "src/pages/BuyersPage.tsx",
  "src/pages/MarketsPage.tsx",
] as const;

test("seller entry pages omit the retired three-pillar module", async () => {
  for (const path of pagePaths) {
    const source = await readFile(path, "utf8");
    assert.doesNotMatch(source, /SellerPillars/);
  }
});

test("seller entry pages reserve enough mobile space for the sticky CTA", async () => {
  for (const path of pagePaths) {
    const source = await readFile(path, "utf8");
    assert.match(source, /pb-28 lg:pb-0/);
  }
});

test("seller FAQ schema uses the same questions and answers as visible copy", async () => {
  const { SELLER_FAQS, sellerFaqSchema } = await import("../src/components/FAQ");
  assert.deepEqual(
    sellerFaqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
    SELLER_FAQS,
  );
  const page = await readFile("src/pages/SellSouthFloridaPage.tsx", "utf8");
  assert.doesNotMatch(page, /sell-south-florida-faq/);
  assert.doesNotMatch(page, /"totalTime"/);
  assert.match(page, /<FAQ \/>/);
  assert.doesNotMatch(JSON.stringify(sellerFaqSchema), /every agent's buyer pipeline/);
});

test("home value page places intake in top fold, uses FaqAccordion, and avoids outreach campaign phrasing", async () => {
  const page = await readFile("src/pages/HomeValuePage.tsx", "utf8");
  assert.match(page, /<SellerIntakeForm sourcePage="home-value" \/>/);
  assert.match(page, /<FaqAccordion faqs=\{HOME_VALUE_FAQS\}/);
  assert.doesNotMatch(page, /buyer-agent outreach/i);
  assert.doesNotMatch(page, /NEIGHBORHOODS/);
});

test("buyers page renders visible FaqAccordion matching FAQPage schema and omits inline NeoEmbed and raw YouTube iframe", async () => {
  const page = await readFile("src/pages/BuyersPage.tsx", "utf8");
  assert.match(page, /<FaqAccordion faqs=\{BUYER_FAQS\}/);
  assert.doesNotMatch(page, /<NeoEmbed/);
  assert.doesNotMatch(page, /youtube\.com\/embed/);
  assert.doesNotMatch(page, /WhatsApp · Spain Line/);
  const schemaOrg = await readFile("src/components/SEO/SchemaOrg.tsx", "utf8");
  assert.doesNotMatch(schemaOrg, /buyer-agent outreach/i);
});

test("markets page renders CountyExplorer, visible FaqAccordion matching FAQPage schema, and omits raw YouTube iframe", async () => {
  const page = await readFile("src/pages/MarketsPage.tsx", "utf8");
  assert.match(page, /<CountyExplorer/);
  assert.match(page, /<FaqAccordion faqs=\{MARKETS_FAQS\}/);
  assert.doesNotMatch(page, /youtube\.com\/embed/);
  assert.doesNotMatch(page, /const PILLARS =/);
});


test("agents page renders visible FaqAccordion matching FAQPage schema, 2-tab intake desk, and omits RevealText truncation", async () => {
  const page = await readFile("src/pages/AgentsPage.tsx", "utf8");
  assert.match(page, /pb-28 lg:pb-0/);
  assert.match(page, /<FaqAccordion faqs=\{AGENTS_FAQS\}/);
  assert.match(page, /<ReferralIntakeForm \/>/);
  assert.match(page, /<AgencyPartnerForm \/>/);
  assert.doesNotMatch(page, /<RevealText/);
  assert.doesNotMatch(page, /<SectionTabs/);
  assert.doesNotMatch(page, /<GlobalResearchLinks/);
});
