import { motion } from "motion/react";
import { ArrowRight, MapPin, Loader2, CheckCircle2, Download } from "lucide-react";
import { useState, useRef, useId, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { trackLead, trackFunnelEvent, pushEvent, trackMicroConversion } from "../lib/analytics";
import { getAttribution, getLeadSource } from "../lib/attribution";
import { notifyLeadDirect } from "../lib/leadNotify";

type Lang = "en" | "es";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  en: {
    eyebrow: "Private Property Strategy",
    badge: "Confidential · No Obligation",
    address: "Property address — Weston, Coral Gables, Fort Lauderdale, Miami",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "Email (optional)",
    markets: [
      "Broward County",
      "Miami-Dade County",
      "Palm Beach County",
      "Other — Florida",
    ],
    timelines: ["Exploring options", "Immediately", "30–90 days", "3–6 months", "6+ months"],
    step1Submit: "Request Your Private Seller Strategy Review",
    step1Progress: "Step 1 of 2 · Your property",
    step2Progress: "Step 2 of 2 · How to reach you",
    compactAddress: "South Florida property address",
    compactAddressPlaceholder: "Enter your property address",
    compactContinue: "Continue to Contact Details",
    compactSubmit: "Request Your Private Seller Strategy Review",
    compactPromise: "Carlos reviews your property, price position and next-move priorities, then contacts you to arrange the call. No listing commitment.",
    editAddress: "Change address",
    submit: "Request Your Private Seller Strategy Review",
    sending: "Sending…",
    consent: "I agree to receive updates by WhatsApp/SMS at this number. Msg & data rates may apply. Reply STOP to opt out.",
    prefer: "Prefer WhatsApp?",
    preferLink: "Message Carlos directly",
    proofQuote: "Sharp pricing, professional marketing, and constant communication — Carlos made selling feel handled.",
    proofName: "Andres P. · Weston · Verified Review",
    successTag: "Seller Strategy Review Requested",
    successTitle: "Carlos will personally review your property.",
    successBody: "Carlos reviews your property and selling priorities, then contacts you to arrange the strategy conversation. For urgent timing, reach us on WhatsApp.",
    netSheetIntro: "Prepare for your strategy conversation with the Seller's Net Sheet — a guide to estimating what you keep at closing:",
    netSheetCta: "Download the Seller's Net Sheet",
    successCta: "Continue on WhatsApp →",
    bridgeText: "Looking to activate international inventory from Spain or LATAM?",
    bridgeLink: "Visit the Miami Global Desk →",
    bridgeHref: "/global-desk",
    timeout: "Request timed out — please use WhatsApp or try again.",
    failed: "Couldn't send — please use WhatsApp or try again.",
  },
  es: {
    eyebrow: "Estrategia Privada de la Propiedad",
    badge: "Confidencial · Sin Compromiso",
    address: "Dirección de la propiedad — Weston, Coral Gables, Fort Lauderdale, Miami",
    name: "Nombre completo",
    phone: "Teléfono / WhatsApp",
    email: "Email (opcional)",
    markets: [
      "Condado de Broward",
      "Condado de Miami-Dade",
      "Condado de Palm Beach",
      "Otro — Florida",
    ],
    timelines: ["Explorando opciones", "De inmediato", "30–90 días", "3–6 meses", "6+ meses"],
    step1Submit: "Solicitar revisión privada de mi estrategia de venta",
    step1Progress: "Paso 1 de 2 · Su propiedad",
    step2Progress: "Paso 2 de 2 · Cómo contactarle",
    compactAddress: "Dirección de la propiedad en el sur de Florida",
    compactAddressPlaceholder: "Ingrese la dirección de su propiedad",
    compactContinue: "Continuar a datos de contacto",
    compactSubmit: "Solicitar revisión privada de mi estrategia de venta",
    compactPromise: "Carlos revisa su propiedad, el posicionamiento de precio y sus próximos pasos, y le contacta para coordinar la conversación. Sin compromiso de venta.",
    editAddress: "Cambiar dirección",
    submit: "Solicitar revisión privada de mi estrategia de venta",
    sending: "Enviando…",
    consent: "Acepto recibir actualizaciones por WhatsApp/SMS a este número. Pueden aplicar tarifas. Responda STOP para darse de baja.",
    prefer: "¿Prefiere WhatsApp?",
    preferLink: "Escriba a Carlos directamente",
    proofQuote: "Precios acertados, marketing profesional y comunicación constante — Carlos hizo que vender se sintiera bajo control.",
    proofName: "Andres P. · Weston · Reseña Verificada",
    successTag: "Solicitud Recibida",
    successTitle: "Carlos revisará su propiedad personalmente.",
    successBody: "Carlos revisa su propiedad y sus prioridades de venta, y le contacta para coordinar la conversación. Para asuntos urgentes, contáctenos por WhatsApp.",
    netSheetIntro: "Prepare su conversación de estrategia con la Hoja de Ganancias del Vendedor — una guía para estimar lo que conserva al cierre:",
    netSheetCta: "Descargar la Hoja de Ganancias",
    successCta: "Continuar por WhatsApp →",
    bridgeText: "¿Desea activar inventario internacional desde España o LATAM?",
    bridgeLink: "Visite el Miami Global Desk →",
    bridgeHref: "/global-desk",
    timeout: "La solicitud expiró — use WhatsApp o inténtelo de nuevo.",
    failed: "No se pudo enviar — use WhatsApp o inténtelo de nuevo.",
  },
} as const;

export function HeroSellerForm({ lang = "en", progressiveDesktop = false, compact = false }: { lang?: Lang; progressiveDesktop?: boolean; compact?: boolean }) {
  const t = COPY[lang];
  const addressId = useId();
  const initial = {
    name: "", phone: "", email: "",
    propertyAddress: "",
    city: t.markets[0],
    timeline: t.timelines[0],
    messagingConsent: "no",
  };
  const [form, setForm]       = useState(initial);
  const [step, setStep]       = useState<1 | 2>(1);
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError]     = useState("");
  const addressRef            = useRef<HTMLInputElement>(null);
  const nameRef               = useRef<HTMLInputElement>(null);
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

  const handleStep1Continue = (e?: MouseEvent | FormEvent) => {
    if (e) e.preventDefault();
    if (!form.propertyAddress.trim()) {
      addressRef.current?.focus();
      setError(lang === "es" ? "Por favor ingrese la dirección de la propiedad" : "Please enter your property address");
      return;
    }
    setError("");
    setStep(2);
    setTimeout(() => {
      nameRef.current?.focus();
    }, 50);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === 1 && typeof window !== "undefined" && (progressiveDesktop || window.innerWidth < 1024)) {
      handleStep1Continue(e);
      return;
    }
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
      setStep(1);
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
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/70">{t.successBody}</p>

        {/* Instant value at peak intent — deliver the Net Sheet now, not just "we'll get back to you" */}
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="mx-auto mb-3 max-w-sm font-sans text-[13px] leading-relaxed text-white/70">{t.netSheetIntro}</p>
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
          onClick={() => {
            trackMicroConversion("hp_cta_click", {
              type: "whatsapp_us",
              location: "hero_form_success",
            });
          }}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80 hover:text-gold transition-colors"
        >
          {t.successCta}
        </a>
      </motion.div>
    );
  }

  // text-base (16px) prevents iOS Safari from auto-zooming on input focus
  const inputCls =
    "w-full rounded-md bg-white/[0.045] border border-white/20 px-3.5 py-2.5 font-sans text-base text-white placeholder:text-white/70 outline-none transition-all duration-200 focus:border-gold focus:bg-white/[0.08] focus:ring-2 focus:ring-gold/25";
  const selectCls =
    inputCls + " cursor-pointer appearance-none pr-9";

  return (
    <div>
      <form
        name="seller-hero"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onFocus={handleFormFocus}
        className={compact ? "seller-hero-form text-left" : "rounded-lg border border-gold/45 bg-[#071321]/95 p-4 text-left shadow-[0_24px_60px_rgba(0,0,0,0.42)] sm:p-5"}
      >
        <input type="hidden" name="form-name" value="seller-hero" />
        <p aria-hidden="true" className="hidden">
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        {/* Clear promise and privacy cue; no decorative step chrome. */}
        {!compact && <div className="mb-3.5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="font-serif text-xl text-gold sm:text-[1.35rem]">{t.eyebrow}</span>
            <span className="font-sans text-[11px] text-white/70">{t.badge}</span>
          </div>
        </div>}

        {compact && <p className="seller-form-progress" aria-live="polite">{step === 1 ? t.step1Progress : t.step2Progress}</p>}
        {/* Address — Step 1 on mobile, always visible on desktop */}
        {compact && <label htmlFor={addressId} className="seller-form-address-label">{t.compactAddress}</label>}
        <div className="relative">
          <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold z-10" />
          <input
            required
            id={addressId}
            ref={addressRef}
            name="propertyAddress"
            type="text"
            value={form.propertyAddress}
            onChange={update("propertyAddress")}
            placeholder={compact ? t.compactAddressPlaceholder : progressiveDesktop ? "Property address" : t.address}
            autoComplete="street-address"
            style={{ paddingLeft: "2.75rem" }}
            className={`w-full rounded-md border border-gold/45 px-4 py-3 font-sans text-base outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/25 ${progressiveDesktop ? "bg-white text-navy-deep placeholder:text-slate-600" : "bg-white/[0.055] text-white placeholder:text-white/70 focus:bg-white/[0.09]"}`}
            aria-label={t.address}
          />
        </div>

        {/* Mobile Step 1 button */}
        {step === 1 && (
          <button
            type="button"
            onClick={handleStep1Continue}
            className={`hero-cta-main mt-3 flex w-full items-center justify-center gap-2.5 rounded-md px-5 py-3 font-sans text-sm font-semibold text-navy-deep ${progressiveDesktop ? "" : "lg:hidden"}`}
          >
            {compact ? <>{t.compactContinue} <ArrowRight size={16} aria-hidden="true" /></> : t.step1Submit}
          </button>
        )}

        {/* Mobile Step 2 active address indicator */}
        {step === 2 && (
          <div className={`${compact ? "seller-form-address-summary " : ""}mt-2.5 flex items-center justify-between rounded bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 border border-white/10 lg:hidden`}>
            <span className="truncate max-w-[220px] text-white/90 font-medium">📍 {form.propertyAddress}</span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gold underline hover:text-gold-soft ml-2 flex-shrink-0 font-mono text-[11px]"
            >
              {t.editAddress}
            </button>
          </div>
        )}

        {/* Step 2 fields — hidden on mobile if step 1; always visible on desktop (lg:block) */}
        <div className={step === 1 ? (progressiveDesktop ? "hidden" : "hidden lg:block") : "block mt-2 lg:mt-0"}>
          {/* Name + Phone */}
          <div className="mt-2 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
            <label className="seller-form-field">
              {compact && <span>{t.name}</span>}
              <input
              required={step === 2}
              ref={nameRef}
              name="name"
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder={t.name}
              autoComplete="name"
              className={inputCls}
              aria-label={t.name}
              />
            </label>
            <label className="seller-form-field">
              {compact && <span>{t.phone}</span>}
              <input
              required={step === 2}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder={t.phone}
              autoComplete="tel"
              inputMode="tel"
              className={inputCls}
              aria-label={t.phone}
              />
            </label>
          </div>

          {/* Optional email and market stay compact; timeline remains full width. */}
          <div className="mt-2 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
            <label className="seller-form-field">
              {compact && <span>{t.email}</span>}
              <input
              name="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder={t.email}
              autoComplete="email"
              inputMode="email"
              className={inputCls}
              aria-label={t.email}
              />
            </label>
            <div className="relative">
              <select
                name="city"
                value={form.city}
                onChange={update("city")}
                className={selectCls}
                aria-label="Market"
              >
                {t.markets.map((m) => <option key={m}>{m}</option>)}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
            </div>
          </div>
          <div className="relative mt-2">
            <select
              name="timeline"
              value={form.timeline}
              onChange={update("timeline")}
              className={selectCls}
              aria-label="Timeline"
            >
              {t.timelines.map((tl) => <option key={tl}>{tl}</option>)}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
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
            <span className="font-sans text-[10px] leading-[1.45] text-white/70">{t.consent}</span>
          </label>

          {/* Final submit button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="hero-cta-main mt-2.5 flex w-full items-center justify-center gap-2.5 rounded-md px-5 py-3 font-sans text-sm font-semibold text-navy-deep disabled:opacity-60"
          >
            {status === "submitting"
              ? <><Loader2 size={15} className="animate-spin" />{t.sending}</>
              : <>{compact ? t.compactSubmit : t.submit}<ArrowRight size={15} /></>}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-3 font-sans text-[13px] text-red-400/90">{error}</p>
        )}

        <p className={`mt-2 text-center font-sans text-[11px] leading-5 text-white/70 ${compact ? "seller-form-microcopy" : ""}`}>
          {compact ? t.compactPromise : "Personal reply from Carlos · No listing commitment"}
        </p>
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMicroConversion("hp_cta_click", { type: "whatsapp_us", location: "hero_form" })}
          className={progressiveDesktop ? `mt-1 block text-center text-xs leading-5 text-gold-soft underline underline-offset-4 ${compact ? "seller-form-whatsapp" : ""}` : "sr-only"}
        >
          {compact ? "WhatsApp Carlos ↗" : <>{t.prefer} {t.preferLink}</>}
        </a>
        {compact && <p className="seller-form-privacy">Confidential · No obligation</p>}
      </form>

      {/* Move 1 & 3: Dedicated international bridge caption beneath hero form */}
      {!compact && <div className="mt-3 text-center px-2">
        <p className="font-sans text-[12px] leading-relaxed text-white/70">
          {progressiveDesktop ? "Spain or LATAM property?" : t.bridgeText}{" "}
          <a
            href={t.bridgeHref}
            className="inline-flex items-center gap-1 font-medium text-gold hover:underline"
          >
            {t.bridgeLink}
          </a>
        </p>
      </div>}
    </div>
  );
}
