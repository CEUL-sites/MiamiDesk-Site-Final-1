import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { classifyAiDeskIntent, type DeskMessage } from "./_shared/aiDeskIntentRouter";
import { getBridgeMlsContextForAi } from "./_shared/bridgeMlsForAi";
import { buildAiDeskSystemInstruction, HANDOFF_SIGNAL } from "./_shared/aiDeskSystemPrompt";
import { formatLeadCaptureSummary } from "./_shared/leadCaptureFormatter";
import { guardAiDeskResponse } from "./_shared/aiDeskResponseGuardrails";

const GOOGLE_SHEETS_WEBHOOK_URL = (process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "").trim();

async function postLeadToSheets(
  intent: ReturnType<typeof classifyAiDeskIntent>,
  messages: DeskMessage[],
): Promise<void> {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    const lastFour = messages.slice(-4).map((m) => `[${m.role}] ${m.content}`).join("\n");
    const body = new URLSearchParams({
      "form-name":   "ai-desk-lead",
      source:        "ai-desk-handoff",
      visitorType:   intent.visitorType,
      language:      intent.language,
      city:          intent.city ?? "",
      budgetMin:     intent.budgetMin ? String(intent.budgetMin) : "",
      budgetMax:     intent.budgetMax ? String(intent.budgetMax) : "",
      propertyType:  intent.propertyType ?? "",
      confidence:    intent.confidence,
      conversation:  lastFour,
      timestamp:     new Date().toISOString(),
    });
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    console.log("[ai-desk] Lead posted to Google Sheets");
  } catch (err) {
    console.error("[ai-desk] Failed to post lead to Sheets:", err);
  }
}

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY ?? process.env.Gemini_API_Key ?? "").trim();
const GEMINI_MODEL = "gemini-2.5-flash";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
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
  let turnCount = 0;
  try {
    const parsed = JSON.parse(event.body || "{}");
    messages = parsed.messages;
    turnCount = typeof parsed.turnCount === "number" ? parsed.turnCount : 0;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("empty");
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: "No messages provided." }) };
  }

  const intent = classifyAiDeskIntent(messages);
  console.log(`[ai-desk] Visitor type detected: ${intent.visitorType}`);
  console.log(`[ai-desk] MLS need detected: ${intent.mlsNeed}`);
  console.log(`[ai-desk] Turn count: ${turnCount}`);

  const mlsContext = await getBridgeMlsContextForAi(intent);
  if (mlsContext.used) {
    console.log(`[ai-desk] AI MLS lookup used: ${mlsContext.available ? "available" : "unavailable"}`);
  }

  const leadSummary = formatLeadCaptureSummary(intent, mlsContext);
  const systemInstruction = buildAiDeskSystemInstruction(intent, mlsContext, leadSummary, turnCount);

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
        systemInstruction,
        maxOutputTokens: 650,
        temperature: 0.3,
      },
    });
    console.log("[ai-desk] Gemini response received");

    const rawText =
      result.text ??
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I was unable to generate a response. Please contact Carlos directly at contact@carlosre.com or via WhatsApp at +1 954-865-6622.";

    const handoffReady = rawText.includes(HANDOFF_SIGNAL);
    const cleanedText  = rawText.replace(HANDOFF_SIGNAL, "").trim();
    const text         = guardAiDeskResponse(cleanedText);

    if (handoffReady) {
      console.log("[ai-desk] Handoff triggered — posting lead to Sheets");
      await postLeadToSheets(intent, messages);
    }

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        response: text,
        visitorType: intent.visitorType,
        mlsContextUsed: mlsContext.used,
        handoffReady,
      }),
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
