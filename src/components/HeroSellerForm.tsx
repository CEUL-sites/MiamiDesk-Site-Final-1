import { motion } from "motion/react";
import { ArrowRight, MapPin, Loader2, CheckCircle2, Download } from "lucide-react";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { trackLead, trackFunnelEvent, pushEvent } from "../lib/analytics";
import { getAttribution, getLeadSource } from "../lib/attribution";
import { notifyLeadDirect } from "../lib/leadNotify";

type Lang = "en" | "es";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  en: {
    eyebrow: "Private Property Strategy",
    badge: "Confidential · No Obligation",
    address: "Property address — South Florida or Spain",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "Email (optional)",
    markets: [
      "Greater Miami / S. Florida",
      "Marbella / Costa del Sol",
      "Madrid",
      "Other — Spain",
      "Other",
    ],
    timelines: ["Exploring options", "Immediately", "30–90 days", "3–6 months", "6+ months"],
    submit: "Request My Property Review",
    sending: "Sending…",
    consent: "I agree to receive updates by WhatsApp/SMS at this number. Msg & data rates may apply. Reply STOP to opt out.",
    prefer: "Prefer WhatsApp?",
    preferLink: "Message Carlos directly",
    proofQuote: "Sharp pricing, professional marketing, and constant communication — Carlos made selling feel handled.",
    proofName: "Andres P. · Weston · Verified Review",
    successTag: "Valuation Request Received",
    successTitle: "Carlos will personally review your property.",
    successBody: "Expect an MLS-based valuation, a property-position review, and a confidential personal response. For urgent timing, reach us on WhatsApp.",
    netSheetIntro: "While Carlos prepares your valuation, here's your free Seller's Net Sheet — what you actually keep at closing:",
    netSheetCta: "Download the Seller's Net Sheet",
    successCta: "Continue on WhatsApp →",
    timeout: "Request timed out — please use WhatsApp or try again.",
    failed: "Couldn't send — please use WhatsApp or try again.",
  },
  es: {
    eyebrow: "Estrategia Privada de la Propiedad",
    badge: "Confidencial · Sin Compromiso",
    address: "Dirección de la propiedad — Miami o España",
    name: "Nombre completo",
    phone: "Teléfono / WhatsApp",
    email: "Email (opcional)",
    markets: [
      "Gran Miami / Sur de Florida",
      "Marbella / Costa del Sol",
      "Madrid",
      "Otra — España",
      "Otra",
    ],
    timelines: ["Explorando opciones", "De inmediato", "30–90 días", "3–6 meses", "6+ meses"],
    submit: "Solicitar Revisión de Mi Propiedad",
    sending: "Enviando…",
    consent: "Acepto recibir actualizaciones por WhatsApp/SMS a este número. Pueden aplicar tarifas. Responda STOP para darse de baja.",
    prefer: "¿Prefiere WhatsApp?",
    preferLink: "Escriba a Carlos directamente",
    proofQuote: "Precios acertados, marketing profesional y comunicación constante — Carlos hizo que vender se sintiera bajo control.",
    proofName: "Andres P. · Weston · Reseña Verificada",
    successTag: "Solicitud Recibida",
    successTitle: "Carlos revisará su propiedad personalmente.",
    successBody: "Recibirá una valoración basada en MLS, una revisión de posicionamiento y una respuesta personal y confidencial. Para asuntos urgentes, contáctenos por WhatsApp.",
    netSheetIntro: "Mientras Carlos prepara su valoración, aquí tiene su Hoja de Ganancias del Vendedor — lo que realmente recibe al cierre:",
    netSheetCta: "Descargar la Hoja de Ganancias",
    successCta: "Continuar por WhatsApp →",
    timeout: "La solicitud expiró — use WhatsApp o inténtelo de nuevo.",
    failed: "No se pudo enviar — use WhatsApp o inténtelo de nuevo.",
  },
} as const;

export function HeroSellerForm({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const initial = {
    name: "", phone: "", email: "",
    propertyAddress: "",
    city: t.markets[0],
    timeline: t.timelines[0],
    messagingConsent: "no",
  };
  const [form, setForm]       = useState(initial);
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError]     = useState("");
  const addressRef            = useRef<HTMLInputElement>(null);
  const formStartFired        = useRef(false);

  const handleFormFocus = () => {
    if (formStartFired.current || navigator.webdriver) return;
    formStartFired.current = true;
    pushEvent("form_start", {
      form_name: "seller-hero",
      page_path: window.location.pathname,
      funnel_stage: "bottom_funnel",
    });
  };

  const update = (k: keyof typeof initial) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body: encodeForm({
          "form-name": "seller-hero",
          "bot-field": "",
          ...form,
          sourcePage: `hero-${lang}`,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      notifyLeadDirect({
        name: form.name, email: form.email, phone: form.phone,
        propertyAddress: form.propertyAddress, city: form.city, timeline: form.timeline,
        sourcePage: `hero-${lang}`, leadSource: getLeadSource(),
      });
      trackLead("seller", { form: "seller-hero", page: `hero-${lang}` });
      // Auto-acknowledgment (email/WhatsApp confirmation) — best-effort
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "seller-hero", name: form.name, email: form.email, phone: form.phone }),
      }).catch(() => {});
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setError(err instanceof DOMException && err.name === "AbortError" ? t.timeout : t.failed);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  // ── Success state ──────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[#0A1525]/90 border border-gold/30 backdrop-blur-xl px-6 py-8 text-center shadow-2xl shadow-black/50"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 size={26} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{t.successTag}</p>
        <h3 className="font-serif text-2xl text-white">{t.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/55">{t.successBody}</p>

        {/* Instant value at peak intent — deliver the Net Sheet now, not just "we'll get back to you" */}
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="mx-auto mb-3 max-w-sm font-sans text-[13px] leading-relaxed text-white/65">{t.netSheetIntro}</p>
          <a
            href={LEAD_MAGNETS.sellerNetSheet.url}
            download
            onClick={() => trackFunnelEvent("net_sheet_download", { source: "hero-success", lang })}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
          >
            <Download size={14} />
            {t.netSheetCta}
          </a>
        </div>

        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80 hover:text-gold transition-colors"
        >
          {t.successCta}
        </a>
      </motion.div>
    );
  }

  // text-base (16px) prevents iOS Safari from auto-zooming on input focus
  const inputCls =
    "w-full rounded-md bg-white/[0.045] border border-white/20 px-3.5 py-2.5 font-sans text-base text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-gold focus:bg-white/[0.08] focus:ring-2 focus:ring-gold/25";
  const selectCls =
    inputCls + " cursor-pointer appearance-none pr-9";

  return (
    <form
      name="seller-hero"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      onFocus={handleFormFocus}
      className="rounded-lg border border-gold/45 bg-[#071321]/95 p-4 text-left shadow-[0_24px_60px_rgba(0,0,0,0.42)] sm:p-5"
    >
      <input type="hidden" name="form-name" value="seller-hero" />
      <p aria-hidden="true" className="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      {/* Clear promise and privacy cue; no decorative step chrome. */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-xl text-gold sm:text-[1.35rem]">{t.eyebrow}</span>
          <span className="font-sans text-[11px] text-white/65">{t.badge}</span>
        </div>
      </div>

      {/* Address — direct entry keeps the highest-intent homepage form dependable. */}
      <div className="relative">
        <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold z-10" />
        <input
          required
          ref={addressRef}
          name="propertyAddress"
          type="text"
          value={form.propertyAddress}
          onChange={update("propertyAddress")}
          placeholder={t.address}
          autoComplete="street-address"
          style={{ paddingLeft: "2.75rem" }}
          className="w-full rounded-md border border-gold/45 bg-white/[0.055] px-4 py-3 font-sans text-base text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-gold focus:bg-white/[0.09] focus:ring-2 focus:ring-gold/25"
          aria-label={t.address}
        />
      </div>

      {/* Name + Phone */}
      <div className="mt-2 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
        <input
          required name="name" type="text"
          value={form.name} onChange={update("name")}
          placeholder={t.name} autoComplete="name"
          className={inputCls} aria-label={t.name}
        />
        <input
          required name="phone" type="tel"
          value={form.phone} onChange={update("phone")}
          placeholder={t.phone} autoComplete="tel" inputMode="tel"
          className={inputCls} aria-label={t.phone}
        />
      </div>

      {/* Optional email and market stay compact; timeline remains full width. */}
      <div className="mt-2 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
        <input
          name="email" type="email"
          value={form.email} onChange={update("email")}
          placeholder={t.email} autoComplete="email" inputMode="email"
          className={inputCls} aria-label={t.email}
        />
        <div className="relative">
          <select
            name="city" value={form.city} onChange={update("city")}
            className={selectCls} aria-label="Market"
          >
            {t.markets.map((m) => <option key={m}>{m}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
        </div>
      </div>
      <div className="relative mt-2">
        <select
          name="timeline" value={form.timeline} onChange={update("timeline")}
          className={selectCls} aria-label="Timeline"
        >
          {t.timelines.map((tl) => <option key={tl}>{tl}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
      </div>

      {/* WhatsApp/SMS consent — optional opt-in */}
      <label className="mt-2 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          name="messagingConsent"
          checked={form.messagingConsent === "yes"}
          onChange={(e) => setForm((f) => ({ ...f, messagingConsent: e.target.checked ? "yes" : "no" }))}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#B08D57]"
        />
        <span className="font-sans text-[10px] leading-[1.45] text-white/68">{t.consent}</span>
      </label>

      {status === "error" && (
        <p className="mt-3 font-sans text-[13px] text-red-400/90">{error}</p>
      )}

      {/* CTA button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="hero-cta-main mt-2.5 flex w-full items-center justify-center gap-2.5 rounded-md px-5 py-3 font-sans text-sm font-semibold text-navy-deep disabled:opacity-60"
      >
        {status === "submitting"
          ? <><Loader2 size={15} className="animate-spin" />{t.sending}</>
          : <>{t.submit}<ArrowRight size={15} /></>}
      </button>

      <p className="mt-2 text-center font-sans text-[11px] leading-5 text-white/65">
        Personal reply from Carlos · No listing commitment
      </p>
      <a
        href={CONTACT.whatsappUS}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
      >
        {t.prefer} {t.preferLink}
      </a>
    </form>
  );
}
