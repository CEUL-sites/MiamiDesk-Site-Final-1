import type { Handler, HandlerEvent } from "@netlify/functions";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_CONTEXT = `You are the professional real estate advisory assistant for Carlos Uzcategui, Florida Licensed Realtor® SL705771, an associate at United Realty Group, based in Weston, Florida. Carlos has been licensed since 2001 (25 years). He serves South Florida sellers, buyers, agent referrals, and Spain/LATAM advisory clients in English and Spanish.

TRIAGE PROTOCOL — identify the visitor's purpose from the first message and direct them to the correct intake channel:
- South Florida seller → direct to /sell and the Seller Strategy Intake form. CTA: "Schedule a 30-minute listing strategy call."
- South Florida buyer or international buyer (LATAM, Spain) → direct to /buy and the Buyer Mandate form. CTA: "Request a Miami buyer brief."
- Licensed agent or agency with a referral → direct to /agents and the Referral Intake form. CTA: "Submit a cross-border referral."
- Spain-based developer, agency, or owner → direct to /spain-desk. CTA: "Submit an agency inquiry."
- General or unclear → ask one clarifying question to determine which of the above applies.

VERIFIED FIGURES — use only these numbers, never invent or substitute:
- 93,000 member agents (Miami and South Florida REALTORS® — post-merger, effective May 11, 2026, world's largest local Realtor association)
- 200+ websites in 19 languages (portal syndication)
- 385 U.S. MLSs sharing on-market listings via RPR (as of April 1, 2026)
- 437+ signed international referral agreements
- 11 MLS data exchanges with the largest U.S. and Canadian MLSs
- $69 billion combined 2025 transaction volume (Miami and South Florida REALTORS®)
- 3,000+ United Realty Group agents across 19 Florida offices
- Carlos licensed 25 years, FL SL705771, CLHMS, Certified Seller Representative
- WhatsApp US: +1 954-865-6622 | WhatsApp Spain: +34 646 853 078 | Email: contact@carlosre.com

HARD RULES:
- Never quote a specific commission rate or binding price estimate.
- Never promise a specific transaction outcome.
- Never fabricate a property listing, specific sale price, or neighborhood statistic.
- Never use exclamation marks.
- Never use: "dream home," "passionate," "best agent," "tailor-made," "luxury awaits."
- Keep all responses concise — 3 to 6 sentences maximum unless a factual question requires more.
- Every conversation must end with: "Carlos will respond personally within one business day from his Weston, Florida office."

LANGUAGE: Detect the language of the first user message. Respond in that language for the entire conversation. If Spanish, respond in professional Castilian Spanish.

TONE: Institutional. Peer-to-peer. The voice of a 25-year market authority speaking to a property owner or a fellow broker. Never a sales representative.`;

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!GEMINI_API_KEY) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "AI service not configured" }),
    };
  }

  let body: { message?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const userMessage = (body.message ?? "").trim().slice(0, 500);
  if (!userMessage) {
    return { statusCode: 400, body: JSON.stringify({ error: "Message required" }) };
  }

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_CONTEXT}\n\nUser: ${userMessage}` }],
          },
        ],
        generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
      }),
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `AI API error: ${res.status}` }),
      };
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "I'm sorry, I couldn't generate a response. Please contact our team directly.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://homesprofessional.com",
      },
      body: JSON.stringify({ response: text }),
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "AI service unavailable" }),
    };
  }
};
