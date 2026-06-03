import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { classifyAiDeskIntent, type DeskMessage } from "./_shared/aiDeskIntentRouter";
import { getBridgeMlsContextForAi } from "./_shared/bridgeMlsForAi";
import { buildAiDeskSystemInstruction } from "./_shared/aiDeskSystemPrompt";
import { formatLeadCaptureSummary } from "./_shared/leadCaptureFormatter";
import { guardAiDeskResponse } from "./_shared/aiDeskResponseGuardrails";

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
  try {
    const parsed = JSON.parse(event.body || "{}");
    messages = parsed.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("empty");
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: "No messages provided." }) };
  }

  const intent = classifyAiDeskIntent(messages);
  console.log(`[ai-desk] Visitor type detected: ${intent.visitorType}`);
  console.log(`[ai-desk] MLS need detected: ${intent.mlsNeed}`);

  const mlsContext = await getBridgeMlsContextForAi(intent);
  if (mlsContext.used) {
    console.log(`[ai-desk] AI MLS lookup used: ${mlsContext.available ? "available" : "unavailable"}`);
  }

  const leadSummary = formatLeadCaptureSummary(intent, mlsContext);
  const systemInstruction = buildAiDeskSystemInstruction(intent, mlsContext, leadSummary);

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

    const text = guardAiDeskResponse(rawText);

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        response: text,
        visitorType: intent.visitorType,
        mlsContextUsed: mlsContext.used,
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
