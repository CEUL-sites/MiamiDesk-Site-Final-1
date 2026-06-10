import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { NURTURE_STORE, nurtureToken, type NurtureLead } from "./_shared/nurture";

// One-click unsubscribe target for seller nurture emails.
// GET /.netlify/functions/nurture-unsubscribe?email=...&token=...

function page(title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${title} — HomesProfessional.com</title></head>
<body style="margin:0;background:#F9F7F2;font-family:Georgia,serif;color:#0B1E3F;">
  <div style="max-width:520px;margin:80px auto;padding:48px 40px;background:#fff;border:1px solid #e8e3da;text-align:center;">
    <p style="font-family:monospace;font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:#B08D57;margin:0 0 20px;">HomesProfessional.com</p>
    <h1 style="font-size:24px;font-weight:400;margin:0 0 16px;">${title}</h1>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(11,30,63,.7);">${body}</p>
    <p style="font-family:monospace;font-size:8px;letter-spacing:.15em;text-transform:uppercase;color:rgba(11,30,63,.3);margin-top:28px;">
      Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
    </p>
  </div>
</body></html>`;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const headers = { "Content-Type": "text/html; charset=utf-8" };
  const email = (event.queryStringParameters?.email ?? "").trim().toLowerCase();
  const token = event.queryStringParameters?.token ?? "";

  if (!email || !token || token !== nurtureToken(email)) {
    return {
      statusCode: 400,
      headers,
      body: page("Link not valid", `This unsubscribe link is incomplete or expired. Email <a href="mailto:contact@carlosre.com" style="color:#B08D57;">contact@carlosre.com</a> and we'll remove you right away.`),
    };
  }

  try {
    const store = getStore(NURTURE_STORE);
    const lead = (await store.get(email, { type: "json" })) as NurtureLead | null;
    if (lead) {
      await store.setJSON(email, { ...lead, unsubscribed: true });
    }
  } catch (err) {
    console.error("nurture-unsubscribe error:", err);
    // Fall through — confirm anyway; the daily job also re-checks tokens.
  }

  return {
    statusCode: 200,
    headers,
    body: page("You're unsubscribed", `${email} will receive no further emails from this series. If you change your mind, just request a new strategy review at <a href="https://homesprofessional.com/home-value" style="color:#B08D57;">homesprofessional.com/home-value</a>.`),
  };
};
