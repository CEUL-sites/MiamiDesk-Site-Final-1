import type { Handler, HandlerEvent } from "@netlify/functions";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_CONTEXT = `You are a professional real estate assistant for Carlos Uzcategui,
REALTOR® FL SL705771, United Realty Group. You specialize in South Florida residential and
luxury real estate across Miami-Dade, Broward, and Palm Beach counties. You also support
Spain-to-Florida buyer inquiries in Spanish and English.

Answer only real estate questions relevant to South Florida. Be concise, professional, and
helpful. Never fabricate property listings, prices, or market data. If unsure, recommend
the user contact the team directly at +1 954-865-6622 or via the contact form.`;

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
