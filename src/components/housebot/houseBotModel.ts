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
  /** Idle loop rendered from the GLB (144px, ~80 KB) — phones / no-WebGL. */
  idle2D: "/3d/housebot-idle.webp",
  /** Greet wave rendered from the GLB (~40 KB, plays once). */
  greet2D: "/3d/housebot-greet.webp",
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

/** Animated image (no WebGL) whenever 3D is off but motion is allowed. */
export function shouldAnimate2D(env: RenderEnv): boolean {
  return !shouldRender3D(env) && !env.reducedMotion && !env.automated;
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

// ── Section guide ─────────────────────────────────────────────────────────
// As the visitor scrolls, the docked bot travels up the screen edge beside a
// key section, gestures toward it and shows one short tip. Targets reuse
// existing section ids, so no page layout changes. Copy is compliance-reviewed.

export type TipKey =
  | "approach"
  | "objectives"
  | "reviews"
  | "consult"
  | "buyerBrief"
  | "globalHow"
  | "spainCoop"
  | "agentsPath";

export const TIP_COPY: Record<HouseBotLang, Record<TipKey, string>> = {
  en: {
    approach: "Ask me how your listing would be marketed across South Florida and internationally.",
    objectives: "Selling, buying or investing? Tell me your goal and I'll prepare the details for Carlos.",
    reviews: "Ask me what working with Carlos looks like, step by step.",
    consult: "Prefer to ask a question first? Tap me before you send the form.",
    buyerBrief: "Tell me what you're looking for and I'll prepare a brief for Carlos.",
    globalHow: "Ask me how the bilateral desk works for your property.",
    spainCoop: "Referring a buyer to Spain? Ask me how the cooperation works.",
    agentsPath: "Ask me which path fits your practice: referral, cooperation, or joining United Realty Group.",
  },
  es: {
    approach: "Pregúnteme cómo se comercializaría su propiedad en el sur de Florida y a nivel internacional.",
    objectives: "¿Vender, comprar o invertir? Cuénteme su objetivo y prepararé los datos para Carlos.",
    reviews: "Pregúnteme cómo es trabajar con Carlos, paso a paso.",
    consult: "¿Prefiere preguntar primero? Tóqueme antes de enviar el formulario.",
    buyerBrief: "Cuénteme qué busca y prepararé un resumen para Carlos.",
    globalHow: "Pregúnteme cómo funciona el desk bilateral para su propiedad.",
    spainCoop: "¿Va a derivar un comprador a España? Pregúnteme cómo funciona la cooperación.",
    agentsPath: "Pregúnteme qué opción encaja con su actividad profesional: derivación, cooperación o unirse a United Realty Group.",
  },
};

export const TIP_LABEL: Record<HouseBotLang, string> = {
  en: "Miami Desk · AI assistant",
  es: "Miami Desk · Asistente de IA",
};

export interface TipTarget {
  key: TipKey;
  selector: string;
}

/** At most this many tips per page view, and each tip once per session. */
export const MAX_TIPS_PER_PAGE = 3;
/** How long a tip stays up before the bot returns to its corner. */
export const TIP_DURATION_MS = 6500;
/** The visitor must pause scrolling this long before a tip appears. */
export const TIP_SCROLL_IDLE_MS = 700;
export const TIP_SEEN_KEY = "housebot-tips-seen";

export function tipTargetsFor(path: string): TipTarget[] {
  const p = normalizePath(path);
  if (p === "/") {
    return [
      { key: "approach", selector: "#listing-approach" },
      { key: "objectives", selector: "#property-objectives" },
      { key: "reviews", selector: "#client-reviews" },
      { key: "consult", selector: "#list-here" },
    ];
  }
  if (p === "/sell-south-florida" || p.startsWith("/sell-")) {
    return [
      { key: "approach", selector: "#selling-system" },
      { key: "consult", selector: "#contact" },
    ];
  }
  if (p === "/buy") return [{ key: "buyerBrief", selector: "#buyer-mandate" }];
  if (p === "/global-desk") {
    return [
      { key: "globalHow", selector: "#how-it-works" },
      { key: "consult", selector: "#listing-request" },
    ];
  }
  if (p === "/gilmar-spain") {
    return [
      { key: "spainCoop", selector: "#spain-idx" },
      { key: "consult", selector: "#register-desk" },
    ];
  }
  if (p === "/agents") return [{ key: "agentsPath", selector: "#choose-path" }];
  if (p === "/es") return [{ key: "consult", selector: "#list-here" }];
  if (p === "/es/vender" || p.startsWith("/es/vender-")) return [{ key: "consult", selector: "#contact" }];
  return [];
}

/**
 * Vertical lift (px) that moves the docked bot from its resting top to sit
 * beside a section whose top is at `sectionTop`, kept clear of the header and
 * of the bottom sticky bar.
 */
export function travelLift(restTop: number, sectionTop: number, viewportH: number, size: number, desktop = true): number {
  const minTop = 88;
  const maxTop = Math.max(minTop, viewportH - size - 200);
  // Desktop: level with the section heading (the bubble sits in the right-hand
  // whitespace). Phones: lower, beside body copy, so the bubble never covers
  // the section headline.
  const offset = desktop ? 24 : Math.round(viewportH * 0.4);
  const target = Math.min(maxTop, Math.max(minTop, sectionTop + offset));
  return Math.max(0, Math.round(restTop - target));
}
