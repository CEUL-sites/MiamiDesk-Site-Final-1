// House Bot — the 3D face of the Miami Desk AI assistant.
//
// Pure model: copy, route → variant mapping, rendering decisions and the
// look-direction throttle. No DOM, no three.js, so scripts/verify-housebot.ts
// can import it directly.
//
// COPY RULES: every string below is public-facing and was reviewed by the
// compliance-reviewer agent. Any change goes back through that review.
// No statistics in bubble lines (rule 9 would require a displayed source);
// the disclosure footer must keep the compliance line verbatim.

export type HouseBotVariant =
  | "home"
  | "sellers"
  | "buyers"
  | "globalDesk"
  | "agents"
  | "markets"
  | "contact";

export type HouseBotLang = "en" | "es";

export const HOUSEBOT_ASSETS = {
  glb: "/3d/housebot.glb",
  poster: "/3d/housebot-poster.webp",
  /** Self-hosted Draco decoder (copied from three/examples/jsm/libs/draco/gltf). */
  draco: "/draco/gltf/",
} as const;

/** Exact animation clip names baked into housebot.glb. */
export const CLIPS = {
  idle: "Idle",
  greet: "Greet",
  lookRight: "Look_Right",
  lookLeft: "Look_Left",
  present: "Present",
  nod: "Nod",
} as const;

export const CROSSFADE_SECONDS = 0.4;
/** Delay between the end of Greet and the Present gesture toward the CTA. */
export const PRESENT_DELAY_MS = 3000;
/** Minimum gap between Look_Left / Look_Right gestures. */
export const LOOK_THROTTLE_MS = 4000;
/** Cursor must be this far (px) beyond the bot's edge to count as "far". */
export const LOOK_DISTANCE_PX = 240;
export const DPR_CAP = 1.5;
export const DESKTOP_MIN_WIDTH = 768;
export const DISMISS_STORAGE_KEY = "housebot-dock-dismissed";

export const BUBBLE_COPY: Record<HouseBotLang, Partial<Record<HouseBotVariant, string>>> = {
  en: {
    home: "I'm the Miami Desk, Carlos's AI assistant. Ask me about selling, buying, or investing in South Florida.",
    sellers: "Ask me how your listing is marketed across South Florida and internationally. Start with a valuation.",
    buyers: "Tell me what you're looking for. Carlos reviews every serious inquiry personally.",
    globalDesk: "Madrid to Miami, in both directions. Ask how the bilateral desk works.",
    agents: "Considering your next brokerage move? Ask me about United Realty Group.",
    markets: "Ask me about South Florida neighborhoods. Market figures are shown with their source and report period.",
    contact: "Leave your details and Carlos will respond directly.",
  },
  es: {
    home: "Soy el Miami Desk, el asistente de IA de Carlos. Pregúnteme sobre vender, comprar o invertir en el sur de Florida.",
    sellers: "Pregúnteme cómo se comercializa su propiedad en el sur de Florida y a nivel internacional. Empiece con una valoración.",
    buyers: "Cuénteme qué busca. Carlos revisa personalmente cada consulta seria.",
    globalDesk: "De Madrid a Miami, en ambas direcciones. Pregunte cómo funciona el desk bilateral.",
    agents: "¿Está valorando cambiar de inmobiliaria? Pregúnteme por United Realty Group.",
  },
};

/** Must match CLAUDE.md compliance rule 7 exactly. */
export const COMPLIANCE_FOOTER =
  "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.";

export const UI_COPY = {
  en: {
    aiDisclosure: "AI assistant, not a licensed agent.",
    openLabel: "Open the Miami Desk AI assistant",
    hideLabel: "Hide the Miami Desk assistant for this session",
    closeChatLabel: "Close the Miami Desk assistant",
    chatTitle: "Miami Desk · AI assistant",
  },
  es: {
    aiDisclosure: "Asistente de IA, no es un agente inmobiliario con licencia.",
    openLabel: "Abrir el asistente de IA Miami Desk",
    hideLabel: "Ocultar el asistente Miami Desk durante esta sesión",
    closeChatLabel: "Cerrar el asistente Miami Desk",
    chatTitle: "Miami Desk · Asistente de IA",
  },
} as const;

export function bubbleLine(variant: HouseBotVariant, lang: HouseBotLang): string | null {
  return BUBBLE_COPY[lang][variant] ?? null;
}

const normalizePath = (path: string): string => path.replace(/\/+$/, "") || "/";

export function langForPath(path: string): HouseBotLang {
  const p = normalizePath(path);
  return p === "/es" || p.startsWith("/es/") || p === "/la-comision-secreta" ? "es" : "en";
}

/** Routes where the docked bot never appears (post-conversion pages). */
export function isDockSuppressedRoute(path: string): boolean {
  const p = normalizePath(path);
  return p.startsWith("/thanks/") || p.startsWith("/es/gracias/");
}

export interface RenderEnv {
  /** viewport width >= DESKTOP_MIN_WIDTH */
  desktop: boolean;
  reducedMotion: boolean;
  /** navigator.webdriver — react-snap prerender or automation */
  automated: boolean;
  webgl: boolean;
}

/** WebGL only on desktop, with motion allowed, outside prerender. Otherwise the poster. */
export function shouldRender3D(env: RenderEnv): boolean {
  return env.desktop && !env.reducedMotion && !env.automated && env.webgl;
}

export type LookDirection = "left" | "right";

/**
 * Which way the bot should look given the cursor x and the bot's horizontal
 * bounds, or null when the cursor is not far enough to either side.
 */
export function lookDirectionFor(
  cursorX: number,
  botLeft: number,
  botRight: number,
  distance = LOOK_DISTANCE_PX,
): LookDirection | null {
  if (cursorX < botLeft - distance) return "left";
  if (cursorX > botRight + distance) return "right";
  return null;
}

export function canLookAgain(now: number, lastLookAt: number | null, throttle = LOOK_THROTTLE_MS): boolean {
  return lastLookAt === null || now - lastLookAt >= throttle;
}

/** Look_Left means the bot turns toward the viewer's left. */
export function clipForLook(dir: LookDirection): string {
  return dir === "left" ? CLIPS.lookLeft : CLIPS.lookRight;
}
