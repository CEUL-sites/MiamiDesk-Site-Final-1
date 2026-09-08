import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { JournalSellerCTA } from "../src/components/JournalSellerCTA";
import type { PostMeta } from "../src/lib/markdown";

const targetSlug = "international-luxury-properties-miami-buyer-agents-global-desk";

const post = {
  title: "International Luxury Properties",
  seoTitle: "International Luxury Properties",
  date: "2026-09-07",
  updated: "",
  slug: targetSlug,
  excerpt: "Approved Global Desk article",
  category: "Global Desk",
  image: "",
  readTime: 1,
  body: "",
  content_goal: "international_listing",
  funnel_stage: "bottom_funnel",
} satisfies PostMeta;

function render(variant: "top" | "mid" | "bottom", targetPost = post): string {
  return renderToStaticMarkup(
    <MemoryRouter>
      <JournalSellerCTA post={targetPost} variant={variant} />
    </MemoryRouter>,
  ).replaceAll("&amp;", "&");
}

test("Global Desk article uses its approved CTA copy and not seller copy", () => {
  const html = render("bottom");

  assert.match(html, /Miami Global Desk · International Property/);
  assert.match(html, /Request a private Global Desk property review/);
  assert.match(
    html,
    /Carlos will review the property, mandate structure, South Florida buyer-agent fit, and professional cooperation terms before recommending activation\./,
  );
  assert.match(html, /Request a Global Desk Review/);
  assert.doesNotMatch(html, /Private Seller Desk|No listing commitment is required/);
});

test("all Global Desk article CTA variants preserve attribution and route to listing-request", () => {
  for (const variant of ["top", "mid", "bottom"] as const) {
    const html = render(variant);
    const href = html.match(/href="([^"]*\/global-desk[^"]*)"/)?.[1];

    assert.ok(href, `${variant} CTA must link to /global-desk`);
    assert.match(href, /^\/global-desk\?/);
    assert.match(href, /utm_source=journal/);
    assert.match(href, /utm_medium=internal/);
    assert.match(href, new RegExp(`utm_campaign=${targetSlug}`));
    assert.match(href, new RegExp(`utm_content=${variant}`));
    assert.match(href, new RegExp(`journal_origin=${targetSlug}`));
    assert.match(href, /journal_offer=global-desk/);
    assert.match(href, new RegExp(`journal_cta=${variant}`));
    assert.match(href, /#listing-request$/);
  }
});

test("other journal articles retain the existing seller CTA route and copy", () => {
  const otherPost = { ...post, slug: "unrelated-seller-article", market: "Weston" };
  const html = render("bottom", otherPost);

  assert.match(html, /Private Seller Desk · South Florida/);
  assert.match(html, /Request a Seller Strategy Review/);
  assert.match(html, /href="\/sell-weston\?[^\"]*#contact"/);
  assert.match(html, /No listing commitment is required/);
});

test("sitemap contains the approved Global Desk article URL and lastmod", () => {
  const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
  const escapedUrl = targetSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  assert.match(
    sitemap,
    new RegExp(
      `<url>\\s*<loc>https://homesprofessional\\.com/journal/${escapedUrl}</loc>\\s*<lastmod>2026-09-07</lastmod>`,
    ),
  );
});
