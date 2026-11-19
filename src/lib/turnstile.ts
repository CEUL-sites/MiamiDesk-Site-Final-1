// Optional Cloudflare Turnstile (invisible human check) for the Miami Desk.
//
// Inert unless VITE_TURNSTILE_SITE_KEY is set at build time (and the matching
// TURNSTILE_SECRET_KEY on the server). The script loads only when the chat is
// opened, never on page load, so it costs nothing for visitors who don't chat.

import { useEffect, useRef, useState } from "react";

const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() || "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile load failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export const turnstileConfigured = (): boolean => SITE_KEY !== "";

/**
 * Renders an invisible Turnstile widget into the returned ref while `enabled`.
 * `token` is the latest pass token (single-use); call `reset()` after a
 * request consumed it or the server rejected it.
 */
export function useTurnstile(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !SITE_KEY || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
      })
      .catch(() => {
        /* Cloudflare unreachable — the server fails open in that case too. */
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [enabled]);

  const reset = () => {
    setToken(null);
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  };

  return { ref, token, reset };
}
