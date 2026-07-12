import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [indexHtml, privacyPage] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("src/pages/PrivacyPage.tsx", "utf8"),
]);

assert.doesNotMatch(
  indexHtml,
  /r2\.leadsy\.ai|api\.instantly\.ai/,
  "the vendor wrapper and its failing Instantly test request must not ship",
);
assert.match(
  indexHtml,
  /navigator\.webdriver/,
  "third-party pixels must stay disabled during react-snap prerendering",
);
assert.match(indexHtml, /window\.rb2bConfig/);
assert.match(indexHtml, /customer_id:\s*['"]avGlx7YMReNKhjgi['"]/);
assert.match(
  indexHtml,
  /https:\/\/ddwl4m2hdecbv\.cloudfront\.net\/b\/LNKLDHE49QOJ\/LNKLDHE49QOJ\.js\.gz/,
);
assert.equal(
  (indexHtml.match(/ddwl4m2hdecbv\.cloudfront\.net/g) ?? []).length,
  1,
  "the visitor-identification loader must be declared once",
);
assert.match(privacyPage, /visitor-identification/i);

console.log("visitor tracking contract verified");
