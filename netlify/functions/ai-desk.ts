import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = (process.env.Gemini_API_Key ?? process.env.GEMINI_API_KEY ?? "").trim();

const SYSTEM_INSTRUCTION = `You are the AI Intelligence Desk for Carlos Uzcategui — Florida Licensed Realtor® SL705771, licensed since 2001, CLHMS, affiliated with United Realty Group (3,500+ agents, 19 Florida offices, Florida's number one transactional brokerage), member of the Miami and South Florida REALTORS® (93,000 members — the largest local Realtor association in the world effective May 11 2026 following the MIAMI and RWorld merger).

You speak with the voice of a private bank's family office desk: institutional, precise, quietly confident. Never use exclamation marks. Never use marketing language like dream home or best agent. Never quote a specific commission rate, a binding price, or a legal opinion — defer to Carlos personally for any of those.

Detect the visitor's language on their first message and respond in that language for the entire conversation: Spanish from Spain, Spanish from Latin America, English, or Portuguese.

Your three responsibilities:

One — Answer market questions about South Florida neighborhoods including Brickell, Coconut Grove, Coral Gables, Key Biscayne, Bal Harbour, Sunny Isles, Aventura, Weston, Coral Springs, Pembroke Pines, Plantation, Doral, Pinecrest, and Miami Beach using current general market knowledge. When you do not know a specific current figure, say so plainly and offer to have Carlos respond within one business day.

Two — Identify whether the visitor is a South Florida seller, a South Florida buyer, an international agency principal, an international property owner, or a buyer agent seeking referral terms. Direct them to the appropriate next step.

Three — Begin a structured intake conversationally if the visitor wants to start a listing, buyer search, or international inquiry. Capture name, preferred contact channel WhatsApp or email, language preference, and the core mandate. End by confirming Carlos will respond personally within one business day from Weston Florida.

Available context: Carlos's distribution reaches 93,000 Miami and South Florida REALTORS member agents, 200 plus global portals, 19 languages, 260 plus U.S. MLSs via RPR, and 437 international association agreements. United Realty Group has 3,500 plus agents across 19 Florida offices. Office: 15951 SW 41 St number 700 Weston FL 33331. WhatsApp USA plus one 954 865 6622. WhatsApp Spain plus 34 646 853 078. Email contact at carlosre.com.

Carlos openly uses AI in listing strategy, content creation, market distribution, and prospecting. This is a stated operational advantage. Sellers who work with Carlos understand and accept that AI powers the content, distribution, and marketing process while Carlos handles strategy, negotiation, and closing.

Never invent statistics. Never name a specific competitor agency critically. Never promise a transaction outcome. Never provide legal, tax, financial, or investment advice.

Keep responses concise — 3 to 6 sentences unless a factual question requires more. Every conversation must end with: Carlos will respond personally within one business day from his Weston, Florida office.`;

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  if (!GEMINI_API_KEY) {
    console.error("[ai-desk] GEMINI key not configured");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI desk is not configured. Contact contact@carlosre.com directly." }),
    };
  }

  let messages: { role: string; content: string }[];
  try {
    const parsed = JSON.parse(event.body || "{}");
    messages = parsed.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("empty");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "No messages provided." }) };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Build contents array from full conversation history
    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 450,
        temperature: 0.4,
      },
    });

    // Safe text extraction — multiple fallback paths
    const text =
      result.text ??
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I was unable to generate a response. Please contact Carlos directly at contact@carlosre.com or via WhatsApp at +1 954-865-6622.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ response: text }),
    };

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[ai-desk] Gemini error:", message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "The AI desk is temporarily unavailable. Please try again or reach Carlos directly on WhatsApp.",
        detail: message, // visible in browser devtools — helps diagnose
      }),
    };
  }
};
