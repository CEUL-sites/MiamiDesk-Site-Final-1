import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Download, FileText, Loader2, X } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackFunnelEvent } from "../lib/analytics";

// Abandonment capture — once per session, deliberately quiet.
// Desktop: when the cursor leaves through the top of the viewport (closing or
// switching tabs), offer the Seller's Net Sheet for an email. Arms after a 12s
// dwell so quick bounces never see it.
// Mobile (no exit-intent signal exists): arms after a longer dwell AND requires
// engagement (the visitor scrolled into the page), then fires on a genuine
// "leaving" gesture — a quick scroll back to the top, or tabbing away.

const SHOWN_KEY = "hp_exit_intent_shown";
const ARM_DELAY_MS = 12_000;
const MOBILE_ARM_DELAY_MS = 20_000;

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

type Lang = "en" | "es";

const COPY = {
  en: {
    dialogAriaLabel: "Free Seller's Net Sheet",
    closeLabel: "Close",
    eyebrow: "Before you go",
    headline: "Know what you'd actually keep.",
    bodyPrefix: "The free",
    bodySuffix: "— commissions, taxes, and closing costs, line by line.",
    emailPlaceholder: "Your email address",
    emailAriaLabel: "Email address to receive the guide",
    errorMessage: "Could not send — please try again.",
    submitLabel: "Send Me the Free Guide",
    submittingLabel: "Sending…",
    footnote: "One email. No subscription. No listing commitment.",
    altLinkText: "Or get a free home valuation instead →",
    altLinkHref: "/home-value",
    successReadyLabel: "Ready to download",
    downloadLabel: "Download Net Sheet",
    successBodyPrefix: "A copy is on its way to your inbox. When you'd like numbers for your specific property,",
    successLinkText: "request a free, no-obligation valuation →",
    successLinkHref: "/home-value",
  },
  es: {
    // TODO: native Madrid editor review
    dialogAriaLabel: "Hoja de Ganancias Gratuita del Vendedor",
    // TODO: native Madrid editor review
    closeLabel: "Cerrar",
    // TODO: native Madrid editor review
    eyebrow: "Antes de irse",
    // TODO: native Madrid editor review
    headline: "Sepa lo que realmente se quedaría.",
    // TODO: native Madrid editor review
    bodyPrefix: "La",
    // TODO: native Madrid editor review
    bodySuffix: "gratuita — comisiones, impuestos y costos de cierre, línea por línea.",
    // TODO: native Madrid editor review
    emailPlaceholder: "Su correo electrónico",
    // TODO: native Madrid editor review
    emailAriaLabel: "Correo electrónico para recibir la guía",
    // TODO: native Madrid editor review
    errorMessage: "No se pudo enviar — inténtelo de nuevo.",
    // TODO: native Madrid editor review
    submitLabel: "Enviarme la Guía Gratuita",
    // TODO: native Madrid editor review
    submittingLabel: "Enviando…",
    // TODO: native Madrid editor review
    footnote: "Un solo correo. Sin suscripción. Sin compromiso de listado.",
    // TODO: native Madrid editor review
    altLinkText: "O solicite una valoración gratuita de su casa →",
    altLinkHref: "/home-value",
    // TODO: native Madrid editor review
    successReadyLabel: "Listo para descargar",
    // TODO: native Madrid editor review
    downloadLabel: "Descargar Hoja de Ganancias",
    // TODO: native Madrid editor review
    successBodyPrefix: "Una copia va en camino a su correo. Cuando desee cifras para su propiedad específica,",
    // TODO: native Madrid editor review
    successLinkText: "solicite una valoración gratuita y sin compromiso →",
    successLinkHref: "/home-value",
  },
} as const;

export function ExitIntentModal({ lang = "en" }: { lang?: Lang } = {}) {
  const t = COPY[lang];
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
    } catch { return; }

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let armed = false;

    const trigger = (reason: string) => {
      try { sessionStorage.setItem(SHOWN_KEY, "1"); } catch { /* private mode */ }
      setOpen(true);
      trackFunnelEvent("exit_intent_shown", {
        offer: "seller-net-sheet",
        device: isTouch ? "mobile" : "desktop",
        trigger: reason,
        lang,
      });
      cleanup();
    };

    // Desktop — cursor leaves through the top of the viewport.
    const onMouseOut = (e: MouseEvent) => {
      if (!armed || e.relatedTarget || e.clientY > 0) return;
      trigger("mouseout");
    };

    // Mobile — engaged (scrolled in) + a leaving gesture.
    let engaged = false;
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0 && y / docH > 0.4) engaged = true;
      // Fast scroll back up to the top after engaging = "I'm leaving."
      if (armed && engaged && y < 80 && lastY - y > 12) trigger("scroll-up");
      lastY = y;
    };
    const onVisibility = () => {
      if (armed && engaged && document.visibilityState === "hidden") trigger("hidden");
    };

    const armTimer = window.setTimeout(() => { armed = true; }, isTouch ? MOBILE_ARM_DELAY_MS : ARM_DELAY_MS);

    function cleanup() {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    }

    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "lead-magnet-download",
          "bot-field": "",
          email,
          guide: "seller-net-sheet-2026-exit-intent",
          language: lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Deliver the guide by email so the lead keeps it even if they never click
      // the on-page download, and gets a branded, down-funnel touch.
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "lead-magnet-download", email, guide: "seller-net-sheet-2026-exit-intent", language: lang }),
      }).catch(() => {});
      trackFunnelEvent("exit_intent_capture", { offer: "seller-net-sheet", lang });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.dialogAriaLabel}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md border border-gold/30 bg-white shadow-2xl shadow-black/50"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.closeLabel}
          className="absolute right-3 top-3 p-1.5 text-navy/35 transition-colors hover:text-navy"
        >
          <X size={16} />
        </button>

        <div className="border-b border-bone bg-navy-deep px-8 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{t.eyebrow}</p>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-white">
            {t.headline}
          </h3>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-ink">
                <CheckCircle2 size={13} /> {t.successReadyLabel}
              </span>
              <a
                href={LEAD_MAGNETS.sellerNetSheet.url}
                download
                className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
              >
                <Download size={13} />
                {t.downloadLabel}
              </a>
              <p className="font-sans text-sm leading-relaxed text-navy/70">
                {t.successBodyPrefix}{" "}
                <a href={t.successLinkHref} className="text-gold-ink underline underline-offset-2 hover:text-navy">
                  {t.successLinkText}
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-gold/30 bg-gold/8">
                  <FileText size={18} className="text-gold" />
                </div>
                <p className="font-sans text-sm leading-relaxed text-navy/65">
                  {t.bodyPrefix} <strong className="text-navy">{LEAD_MAGNETS.sellerNetSheet.title}</strong>{" "}
                  {t.bodySuffix}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  inputMode="email"
                  className="w-full border border-hairline bg-ivory px-4 py-3 font-sans text-base text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-gold/50"
                  aria-label={t.emailAriaLabel}
                />
                {status === "error" && (
                  <p className="font-sans text-xs text-red-600/80">{t.errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex items-center justify-center gap-2 bg-navy-deep px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "submitting"
                    ? <><Loader2 size={13} className="animate-spin" /> {t.submittingLabel}</>
                    : <><Download size={13} /> {t.submitLabel}</>}
                </button>
              </form>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-navy/70">
                {t.footnote}
              </p>
              <a href={t.altLinkHref} className="mt-4 inline-block font-sans text-xs text-gold-ink underline underline-offset-2 hover:text-navy">
                {t.altLinkText}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
