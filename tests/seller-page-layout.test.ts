import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const pagePaths = [
  "src/pages/HomePage.tsx",
  "src/pages/SellSouthFloridaPage.tsx",
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
