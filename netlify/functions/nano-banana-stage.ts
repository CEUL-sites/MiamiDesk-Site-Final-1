import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { corsHeaders, isForbiddenOrigin, rateLimit } from "./_shared/requestGuard";

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY ?? process.env.Gemini_API_Key ?? "").trim();

// Nano Banana 🍌 = Gemini 2.5 Flash Image model
// Confirmed: google-gemini/generative-ai GitHub notebook "Gemini 2.5 Flash Image (Nano Banana 🍌) Generation"
// Falls back to 2.0 flash preview if 2.5 preview is unavailable on the account tier
const NANO_BANANA_MODEL = "gemini-2.5-flash-image-preview";
const NANO_BANANA_FALLBACK = "gemini-2.0-flash-preview-image-generation";

const SCENE_PROMPTS: Record<string, string> = {
  "miami-waterfront": [
    "Luxury Miami waterfront living room, floor-to-ceiling windows overlooking Biscayne Bay,",
    "modern white and warm-toned furniture, professionally staged, soft natural light,",
    "high-end real estate photography, Brickell or Coconut Grove style, ultra-realistic.",
  ].join(" "),
  "coral-gables": [
    "Elegant Coral Gables Mediterranean Revival home interior, arched doorways,",
    "terracotta tile floors, warm cream and gold tones, tasteful antique and modern mix,",
    "professional real estate staging, abundant natural light, photorealistic.",
  ].join(" "),
  "brickell-condo": [
    "Modern Brickell Miami high-rise condo, floor-to-ceiling glass, Miami skyline and bay view,",
    "contemporary minimalist white staging, polished concrete or marble floors,",
    "luxury real estate photography quality, twilight golden-hour light, photorealistic.",
  ].join(" "),
  "weston-family": [
    "Spacious Weston Florida family home, open-plan kitchen and living area,",
    "A-rated school suburb aesthetic, warm neutral staging, large backyard glimpse,",
    "bright cheerful natural light, professional real estate photography, photorealistic.",
  ].join(" "),
  "madrid-luxury": [
    "Luxury Madrid apartment interior, Salamanca or Recoletos district, classic Spanish architecture,",
    "high ceilings with ornate moldings, warm cream and gold tones, modern art on walls,",
    "professional luxury real estate photography, Mediterranean afternoon light, photorealistic.",
  ].join(" "),
};

export const handler: Handler = async (event: HandlerEvent) => {
  const jsonHeaders = corsHeaders(event);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: jsonHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: jsonHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (isForbiddenOrigin(event)) {
    return { statusCode: 403, headers: jsonHeaders, body: JSON.stringify({ error: "Forbidden origin." }) };
  }

  // Image generation is the most expensive call on the site — throttle hard.
  const retryAfter = rateLimit(event, "nb", 3, 60_000) ?? rateLimit(event, "nb-h", 15, 3_600_000);
  if (retryAfter !== null) {
    return {
      statusCode: 429,
      headers: { ...jsonHeaders, "Retry-After": String(retryAfter) },
      body: JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
    };
  }

  if (!GEMINI_API_KEY) {
    return {
      statusCode: 503,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "Nano Banana image generation is not yet activated. Add GEMINI_API_KEY to your Netlify environment to enable AI property visualization.",
      }),
    };
  }

  let scene: string;
  try {
    const parsed = JSON.parse(event.body || "{}");
    scene = typeof parsed.scene === "string" && SCENE_PROMPTS[parsed.scene] ? parsed.scene : "miami-waterfront";
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: "Invalid request." }) };
  }

  const prompt = SCENE_PROMPTS[scene];

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Try Nano Banana 🍌 (gemini-2.5-flash-image-preview) first, fall back to 2.0 preview
    let result;
    let modelUsed = NANO_BANANA_MODEL;
    try {
      result = await ai.models.generateContent({
        model: NANO_BANANA_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseModalities: ["IMAGE"] },
      });
    } catch {
      console.log("[nano-banana-stage] 2.5 preview unavailable, falling back to 2.0");
      modelUsed = NANO_BANANA_FALLBACK;
      result = await ai.models.generateContent({
        model: NANO_BANANA_FALLBACK,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseModalities: ["IMAGE"] },
      });
    }
    console.log(`[nano-banana-stage] Model used: ${modelUsed}`);

    const parts = result.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(
      (p: unknown) => typeof p === "object" && p !== null && "inlineData" in p,
    ) as { inlineData: { data: string; mimeType: string } } | undefined;

    if (!imagePart?.inlineData?.data) {
      throw new Error("No image returned from Nano Banana model");
    }

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        imageData: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType || "image/png",
        scene,
      }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[nano-banana-stage] Error:", message);
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "Image generation temporarily unavailable.",
        detail: message,
      }),
    };
  }
};
