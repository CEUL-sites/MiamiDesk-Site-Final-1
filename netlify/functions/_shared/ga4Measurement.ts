import { createHash } from "node:crypto";

export interface ServerLeadTelemetryInput {
  alertKey: string | null;
  formName: string;
  leadTier: string;
  leadScore: number;
  inquiryDivision: string;
  language: string;
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string;
}

export interface Ga4MeasurementPayload {
  client_id: string;
  non_personalized_ads: false;
  events: Array<{
    name: "qualified_lead_server";
    params: Record<string, string | number>;
  }>;
}

const MAX_PARAM_LENGTH = 100;
const REQUEST_TIMEOUT_MS = 2500;

/**
 * Derive a deterministic, PII-free GA4 client_id (`<uint32>.<uint32>`)
 * from an internal dedup seed so server-side conversions never emit raw
 * emails or phone numbers.
 */
export function buildGa4ClientId(seed: string): string {
  const digest = createHash("sha256").update(seed || "homesprofessional-lead").digest();
  const partA = digest.readUInt32BE(0);
  const partB = digest.readUInt32BE(4);
  return `${partA}.${partB}`;
}

function setBoundedParam(
  params: Record<string, string | number>,
  key: string,
  value: string | undefined,
): void {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return;
  params[key] = trimmed.slice(0, MAX_PARAM_LENGTH);
}

/**
 * Construct a GA4 Measurement Protocol payload for spam-screened leads.
 * Strictly excludes PII (name, email, phone, street address).
 */
export function buildGa4MeasurementPayload(input: ServerLeadTelemetryInput): Ga4MeasurementPayload {
  const seed = input.alertKey || `${input.formName}|${input.sourcePage}|${input.landingPage}`;
  const params: Record<string, string | number> = {
    lead_score: Number.isFinite(input.leadScore) ? Math.round(input.leadScore) : 0,
    engagement_time_msec: 100,
  };

  setBoundedParam(params, "form_name", input.formName);
  setBoundedParam(params, "lead_tier", input.leadTier);
  setBoundedParam(params, "inquiry_division", input.inquiryDivision);
  setBoundedParam(params, "page_language", input.language);
  setBoundedParam(params, "source_page", input.sourcePage);
  setBoundedParam(params, "utm_source", input.utmSource);
  setBoundedParam(params, "utm_medium", input.utmMedium);
  setBoundedParam(params, "utm_campaign", input.utmCampaign);
  setBoundedParam(params, "landing_page", input.landingPage);

  return {
    client_id: buildGa4ClientId(seed),
    non_personalized_ads: false,
    events: [
      {
        name: "qualified_lead_server",
        params,
      },
    ],
  };
}

/**
 * Send a verified, spam-screened lead event to GA4 Measurement Protocol.
 * Fails open and returns `{ sent: false }` on missing env vars or network errors
 * so lead delivery is never blocked.
 */
export async function sendServerLeadToGA4(
  input: ServerLeadTelemetryInput,
  env: Record<string, string | undefined> = process.env,
): Promise<{ sent: boolean; reason?: string; status?: number }> {
  const measurementId = (env.GA4_MEASUREMENT_ID ?? "").trim();
  const apiSecret = (env.GA4_API_SECRET ?? "").trim();

  if (!measurementId || !apiSecret) {
    return { sent: false, reason: "not_configured" };
  }

  const endpoint =
    `https://www.google-analytics.com/mp/collect` +
    `?measurement_id=${encodeURIComponent(measurementId)}` +
    `&api_secret=${encodeURIComponent(apiSecret)}`;

  const payload = buildGa4MeasurementPayload(input);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("ga4Measurement: GA4 MP returned", res.status);
      return { sent: false, reason: "http_error", status: res.status };
    }
    return { sent: true, status: res.status };
  } catch (err) {
    console.error("ga4Measurement: request failed", err);
    return { sent: false, reason: "error" };
  } finally {
    clearTimeout(timer);
  }
}
