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
