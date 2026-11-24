import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyRouteContext } from "../src/lib/analytics";
import {
  buildGa4ClientId,
  buildGa4MeasurementPayload,
  sendServerLeadToGA4,
} from "../netlify/functions/_shared/ga4Measurement";

test("classifyRouteContext maps English, Spanish, Global Desk, and SEO Journal routes", () => {
  assert.deepEqual(classifyRouteContext("/"), {
    page_language: "en",
    business_division: "brand_core",
  });
  assert.deepEqual(classifyRouteContext("/sell-weston/"), {
    page_language: "en",
    business_division: "sfl_seller",
  });
  assert.deepEqual(classifyRouteContext("/es/vender-coral-gables?utm_source=meta"), {
    page_language: "es",
    business_division: "sfl_seller",
  });
  assert.deepEqual(classifyRouteContext("/global-desk"), {
    page_language: "en",
    business_division: "spain_global_desk",
  });
  assert.deepEqual(classifyRouteContext("/vender-marbella"), {
    page_language: "es",
    business_division: "spain_global_desk",
  });
  assert.deepEqual(classifyRouteContext("/es/spain-desk"), {
    page_language: "es",
    business_division: "spain_global_desk",
  });
  assert.deepEqual(classifyRouteContext("/journal/selling-weston-florida-2026"), {
    page_language: "en",
    business_division: "seo_journal",
  });
  assert.deepEqual(classifyRouteContext("/la-comision-secreta"), {
    page_language: "es",
    business_division: "agents_recruiting",
  });
  assert.deepEqual(classifyRouteContext("/market-data"), {
    page_language: "en",
    business_division: "listings_markets",
  });
});

test("buildGa4ClientId produces deterministic numeric GA4 client IDs", () => {
  const id1 = buildGa4ClientId("e:owner@example.com");
  const id2 = buildGa4ClientId("e:owner@example.com");
  const id3 = buildGa4ClientId("e:other@example.com");
  assert.match(id1, /^\d+\.\d+$/);
  assert.equal(id1, id2);
  assert.notEqual(id1, id3);
});

test("buildGa4MeasurementPayload strips PII, truncates strings, and emits qualified_lead_server", () => {
  const longCampaign = "c".repeat(150);
  const payload = buildGa4MeasurementPayload({
    alertKey: "e:seller@example.com",
    formName: "seller-intake",
    leadTier: "P1",
    leadScore: 88.4,
    inquiryDivision: "south_florida_seller",
    language: "en",
    sourcePage: "/sell-weston",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: longCampaign,
    landingPage: "/sell-weston",
  });

  assert.match(payload.client_id, /^\d+\.\d+$/);
  assert.equal(payload.non_personalized_ads, false);
  assert.equal(payload.events.length, 1);
  assert.equal(payload.events[0].name, "qualified_lead_server");

  const params = payload.events[0].params;
  assert.equal(params.form_name, "seller-intake");
  assert.equal(params.lead_tier, "P1");
  assert.equal(params.lead_score, 88);
  assert.equal(params.inquiry_division, "south_florida_seller");
  assert.equal(params.page_language, "en");
  assert.equal(String(params.utm_campaign).length, 100);

  const serialized = JSON.stringify(payload);
  assert.doesNotMatch(serialized, /seller@example\.com/);
});

test("sendServerLeadToGA4 skips cleanly when env vars are unset", async () => {
  const res = await sendServerLeadToGA4(
    {
      alertKey: "e:test@example.com",
      formName: "seller-hero",
      leadTier: "P2",
      leadScore: 60,
      inquiryDivision: "south_florida_seller",
      language: "en",
      sourcePage: "/",
      utmSource: "direct",
      utmMedium: "none",
      utmCampaign: "",
      landingPage: "/",
    },
    {},
  );
  assert.deepEqual(res, { sent: false, reason: "not_configured" });
});
