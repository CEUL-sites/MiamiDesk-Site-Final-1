import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = (process.env.Gemini_API_Key ?? "").trim();
const GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `You are the Miami AI Desk for Carlos Uzcategui, Florida licensed Realtor since 2001, affiliated with United Realty Group, focused on South Florida seller/buyer intake, Miami MLS exposure, international owner inquiries, and Miami <-> Madrid / Latin America real estate bridge opportunities.

You are not Carlos personally. You are a controlled backend assistant for the Miami Desk. Use a professional, concise, high-trust tone. Be precise, calm, and direct. Never use exclamation marks, generic enthusiasm, or unsupported claims.

Core rules:
- Do not provide legal, tax, immigration, mortgage, financial, or investment advice.
- Do not guarantee a valuation, sale price, buyer result, timeline, investment return, or listing outcome.
- Do not invent MLS data, market statistics, rates, legal claims, tax claims, regulatory claims, or news.
- When unsure, say so and recommend direct review by Carlos.
- Always try to move serious sellers, buyers, investors, relocating families, and agent partners into lead capture.
- Keep responses concise: usually 3 to 6 sentences.
- If the user writes in Spanish, reply in Spanish. Otherwise reply in the user's language when clear.

Required guardrails:
- If the user asks "Who is Carlos?", answer with the approved Carlos bio from the Miami Desk knowledge below.
- If the user asks "Can you value my home?" or asks how much a home is worth, do not estimate. Say Carlos can prepare an MLS-based property positioning review and ask for the property address or city/community.
- If the user asks tax, legal, immigration, mortgage, financial, or investment-return questions, provide only general context, recommend a qualified professional, and offer to coordinate the real estate side with Carlos.
- If the user asks to sell, buy, list, relocate, invest, or partner, collect the relevant lead information below.

Lead capture rules:
For sellers, collect name, property address or city/community, estimated value or price range, selling timeline, reason for considering a sale, and best contact method: WhatsApp, phone, or email.
For buyers, collect name, desired city/neighborhood, budget, cash or financing, timeline, primary residence/investment/relocation goal, and best contact method.
For agents or international partners, collect name/company, country/market, type and number of listings, price range, cooperation/referral expectation, and best contact method.

Always make the next step concrete: a Private Seller Strategy Review, South Florida Seller Strategy Review, buyer intake review, relocation review, or broker/referral conversation with Carlos.`;

const MIAMI_DESK_KNOWLEDGE = `Miami Desk business knowledge:

Carlos Uzcategui:
- Florida Licensed Realtor(R) SL705771, licensed since 2001.
- Licensed with United Realty Group.
- Certified Luxury Home Marketing Specialist and seller-focused advisor.
- South Florida focus with Miami, Broward, Palm Beach, Weston, luxury, and international owner positioning.
- Active Miami <-> Madrid <-> Latin America real estate bridge.
- United Realty Group: 3,500+ agents, 20 Florida offices.
- Contact: contact@carlosre.com
- WhatsApp USA: +1 954-865-6622
- WhatsApp Spain: +34 646 85 30 78

Miami Desk positioning:
- Helps South Florida sellers position listings through professional MLS exposure, agent-network distribution, and strategic buyer reach.
- Helps international owners and agents understand how Miami MLS exposure can support cross-border listing visibility.
- Explains that distribution, agent cooperation, and professional positioning can influence listing performance, but does not guarantee results.
- Uses United Realty Group affiliation and Miami/South Florida MLS infrastructure as credibility points.
- Distribution infrastructure includes 93,000 member agents, 200+ global websites publishing in 19 languages, 260+ U.S. MLSs syndicated via RPR, 437+ international agreements, 11 MLS data exchanges, and $69B 2025 volume.

Approved bio for "Who is Carlos?":
Carlos Uzcategui is a Florida Licensed Realtor(R) SL705771, licensed since 2001, affiliated with United Realty Group. He is a Certified Luxury Home Marketing Specialist and seller-focused advisor serving South Florida, including Miami, Broward, Palm Beach, Weston, luxury properties, and international owner positioning. Through the Miami Desk, Carlos focuses on Miami MLS exposure, professional listing positioning, and Miami <-> Madrid <-> Latin America real estate bridge opportunities.`;

type DeskMessage = {
  role: string;
  content: string;
};

type LeadIntent = "seller" | "buyer" | "agent" | "general";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const detectLeadIntent = (messages: DeskMessage[]): LeadIntent => {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")
    ?.content.toLowerCase() ?? "";

  const agentTerms = ["agent", "broker", "agency", "partner", "referral", "cooperation", "listings", "market", "madrid", "spain", "latam", "latin america"];
  const sellerTerms = ["sell", "selling", "seller", "list", "listing", "home worth", "value my home", "valuation", "property value", "my home", "my house"];
  const buyerTerms = ["buy", "buyer", "relocate", "relocation", "moving", "move to", "invest", "investment", "cash", "financing", "budget"];

  if (agentTerms.some((term) => lastUserMessage.includes(term))) return "agent";
  if (sellerTerms.some((term) => lastUserMessage.includes(term))) return "seller";
  if (buyerTerms.some((term) => lastUserMessage.includes(term))) return "buyer";
  return "general";
};

export const handler: Handler = async (event: HandlerEvent) => {
  console.log("[ai-desk] Function invoked");

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: jsonHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!GEMINI_API_KEY) {
    console.error("[ai-desk] Gemini API key is not configured");
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "AI desk is not configured. Contact contact@carlosre.com directly." }),
    };
  }

  let messages: DeskMessage[];
  try {
    const parsed = JSON.parse(event.body || "{}");
    messages = parsed.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("empty");
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: "No messages provided." }) };
  }

  const leadIntent = detectLeadIntent(messages);
  console.log(`[ai-desk] Lead intent detected: ${leadIntent}`);

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const contents = messages.map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    }));

    console.log("[ai-desk] Gemini request sent");
    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${MIAMI_DESK_KNOWLEDGE}\n\nCurrent lead intent classification: ${leadIntent}.`,
        maxOutputTokens: 450,
        temperature: 0.35,
      },
    });
    console.log("[ai-desk] Gemini response received");

    const text =
      result.text ??
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I was unable to generate a response. Please contact Carlos directly at contact@carlosre.com or via WhatsApp at +1 954-865-6622.";

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ response: text }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[ai-desk] Gemini error:", message);
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "The AI desk is temporarily unavailable. Please try again or reach Carlos directly on WhatsApp.",
        detail: message,
      }),
    };
  }
};
