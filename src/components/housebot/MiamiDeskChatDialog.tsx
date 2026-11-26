// Dialog shell for the existing Miami Desk chat. The conversation UI is the
// AiPanel from IntelligenceDesk.tsx (same ai-desk function, same handoff
// flow), lazy-loaded the first time the dialog opens.

import { X } from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { closeMiamiDeskChat, subscribeMiamiDeskChat } from "../../lib/miamiDeskChat";
import { COMPLIANCE_FOOTER, UI_COPY, langForPath } from "./houseBotModel";

const AiPanel = lazy(() => import("../IntelligenceDesk").then((m) => ({ default: m.AiPanel })));

export function MiamiDeskChatDialog() {
  const { pathname } = useLocation();
  const lang = langForPath(pathname);
  const ui = UI_COPY[lang];
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      subscribeMiamiDeskChat((next) => {
        if (next) returnFocus.current = document.activeElement as HTMLElement | null;
        setOpen(next);
      }),
    [],
  );

  useEffect(() => {
    if (!open) {
      returnFocus.current?.focus?.();
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMiamiDeskChat();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      const input = panelRef.current?.querySelector<HTMLElement>("input, button");
      (input ?? panelRef.current)?.focus();
    }, 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  // Close when the route changes.
  useEffect(() => closeMiamiDeskChat(), [pathname]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="miami-desk-dialog-title"
      tabIndex={-1}
      className="fixed inset-x-2 bottom-[calc(8px+env(safe-area-inset-bottom))] z-[60] flex max-h-[85vh] flex-col overflow-hidden border border-gold/25 bg-navy-deep text-white shadow-2xl shadow-black/60 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px]"
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-navy/60 px-5 py-3.5">
        <div>
          <p id="miami-desk-dialog-title" className="font-mono text-xs uppercase tracking-[0.12em] text-gold">
            {ui.chatTitle}
          </p>
          <p className="mt-1 font-mono text-xs uppercase leading-snug tracking-[0.08em] text-white/65">
            {ui.aiDisclosure} {COMPLIANCE_FOOTER}
          </p>
        </div>
        <button
          type="button"
          onClick={closeMiamiDeskChat}
          aria-label={ui.closeChatLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="overflow-y-auto p-5">
        <Suspense fallback={<div className="h-40" aria-busy="true" />}>
          <AiPanel lang={lang} pagePath={pathname} />
        </Suspense>
      </div>
    </div>
  );
}
