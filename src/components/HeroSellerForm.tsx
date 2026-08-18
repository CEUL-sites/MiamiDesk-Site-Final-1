import { motion } from "motion/react";
import { ArrowRight, MapPin, Loader2, CheckCircle2, Download } from "lucide-react";
import { useState, useRef, type ChangeEvent, type FormEvent, type RefObject } from "react";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { trackLead, trackFunnelEvent, pushEvent } from "../lib/analytics";
import { getAttribution, getLeadSource } from "../lib/attribution";
import { notifyLeadDirect } from "../lib/leadNotify";
import {
  nextHeroSellerStep,
  previousHeroSellerStep,
  validateHeroSellerStepOne,
  type HeroSellerStep,
  type HeroSellerStepOneField,
} from "./heroSellerFormModel";

type Lang = "en" | "es";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  en: {
    eyebrow: "Confidential Seller Strategy Review",
    badge: "Private · No listing commitment",
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
    continue: "Continue My Property Review",
    back: "Back",
    submit: "Request My Property Strategy",
    sending: "Sending…",
    step: "Step",
    stepOneTitle: "Property and contact",
    stepTwoTitle: "Review preferences",
    required: "Please complete the required fields to continue.",
    consent: "I agree to receive updates by WhatsApp/SMS at this number. Msg & data rates may apply. Reply STOP to opt out.",
    prefer: "Prefer WhatsApp?",
    preferLink: "Message Carlos directly",
    proofQuote: "Sharp pricing, professional marketing, and constant communication — Carlos made selling feel handled.",
    proofName: "Andres P. · Weston · Verified Review",
    successTag: "Strategy Review Requested",
    successTitle: "Carlos will personally review your property.",
    successBody: "Carlos will review your property, market position, and distribution path. Where appropriate, you will receive an MLS-based valuation and a clear next decision.",
    netSheetIntro: "While Carlos prepares your valuation, here's your free Seller's Net Sheet — what you actually keep at closing:",
    netSheetCta: "Download the Seller's Net Sheet",
    successCta: "Continue on WhatsApp →",
    timeout: "Request timed out — please use WhatsApp or try again.",
    failed: "Couldn't send — please use WhatsApp or try again.",
  },
  es: {
    eyebrow: "Revisión Confidencial de Estrategia de Venta",
    badge: "Privada · Sin compromiso de listado",
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
    continue: "Continuar Mi Revisión de Propiedad",
    back: "Atrás",
    submit: "Solicitar Mi Estrategia de Propiedad",
    sending: "Enviando…",
    step: "Paso",
    stepOneTitle: "Propiedad y contacto",
    stepTwoTitle: "Preferencias de revisión",
    required: "Complete los campos obligatorios para continuar.",
    consent: "Acepto recibir actualizaciones por WhatsApp/SMS a este número. Pueden aplicar tarifas. Responda STOP para darse de baja.",
    prefer: "¿Prefiere WhatsApp?",
    preferLink: "Escriba a Carlos directamente",
    proofQuote: "Precios acertados, marketing profesional y comunicación constante — Carlos hizo que vender se sintiera bajo control.",
    proofName: "Andres P. · Weston · Reseña Verificada",
    successTag: "Revisión de Estrategia Solicitada",
    successTitle: "Carlos revisará su propiedad personalmente.",
    successBody: "Carlos revisará su propiedad, posición de mercado y ruta de distribución. Cuando corresponda, recibirá una valoración basada en MLS y una próxima decisión clara.",
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
  const [step, setStep]       = useState<HeroSellerStep>(1);
  const addressRef            = useRef<HTMLInputElement>(null);
  const nameRef               = useRef<HTMLInputElement>(null);
  const phoneRef              = useRef<HTMLInputElement>(null);
  const formStartFired        = useRef(false);
  const renderedAt            = useRef(Date.now());

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

  const stepOneRefs: Record<HeroSellerStepOneField, RefObject<HTMLInputElement | null>> = {
    propertyAddress: addressRef,
    name: nameRef,
    phone: phoneRef,
  };

  const handleContinue = () => {
    const validation = validateHeroSellerStepOne(form);
    if ("firstInvalid" in validation) {
      setError(t.required);
      stepOneRefs[validation.firstInvalid].current?.focus();
      return;
    }
    const nextStep = nextHeroSellerStep(step, form);
    setError("");
    setStep(nextStep);
    pushEvent("step_progress", {
      form_name: "seller-hero",
      step_number: nextStep,
      step_name: "review_preferences",
      direction: "forward",
      language: lang,
    });
  };

  const handleBack = () => {
    const previousStep = previousHeroSellerStep(step);
    setError("");
    setStep(previousStep);
    pushEvent("step_progress", {
      form_name: "seller-hero",
      step_number: previousStep,
      step_name: "property_and_contact",
      direction: "back",
      language: lang,
    });
    window.requestAnimationFrame(() => addressRef.current?.focus());
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === 1) {
      handleContinue();
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
          formRenderedAt: String(renderedAt.current),
          ...form,
          sourcePage: `hero-${lang}`,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      notifyLeadDirect({
        name: form.name, email: form.email, phone: form.phone,
        propertyAddress: form.propertyAddress, city: form.city, timeline: form.timeline,
        sourcePage: `hero-${lang}`, formName: "seller-hero", leadSource: getLeadSource(),
        messagingConsent: form.messagingConsent,
        botField: "", formRenderedAt: String(renderedAt.current),
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
    "w-full rounded-lg bg-white/[0.05] border border-white/12 px-4 py-3 font-sans text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold/50 focus:bg-white/[0.08]";
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
      className="rounded-2xl bg-[#0A1525]/90 border border-white/12 backdrop-blur-xl p-5 sm:p-7 text-left shadow-2xl shadow-black/60"
    >
      <input type="hidden" name="form-name" value="seller-hero" />
      <p aria-hidden="true" className="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      {/* Header and accessible progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">{t.eyebrow}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">{t.badge}</span>
        </div>
        <div className="mt-4 flex items-center gap-3" role="status" aria-live="polite">
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {[1, 2].map((progressStep) => (
              <span
                key={progressStep}
                className={`h-0.5 flex-1 rounded-full ${progressStep <= step ? "bg-gold" : "bg-white/15"}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
            {t.step} {step}/2 · {step === 1 ? t.stepOneTitle : t.stepTwoTitle}
          </span>
        </div>
      </div>

      <div aria-live="polite">
        {step === 1 ? (
          <>
            {/* Address — direct entry keeps the highest-intent homepage form dependable. */}
            <div className="relative">
              <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 z-10" />
              <label htmlFor="seller-hero-property-address" className="sr-only">{t.address}</label>
              <input
                required
                id="seller-hero-property-address"
                ref={addressRef}
                name="propertyAddress"
                type="text"
                value={form.propertyAddress}
                onChange={update("propertyAddress")}
                placeholder={t.address}
                autoComplete="street-address"
                style={{ paddingLeft: "2.75rem" }}
                className="w-full rounded-lg bg-white/[0.08] border border-gold/25 px-4 py-4 font-sans text-base text-white placeholder:text-white/30 outline-none transition-all focus:border-gold/60 focus:bg-white/[0.11] focus:ring-2 focus:ring-gold/15"
              />
            </div>

            {/* Name + Phone */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="seller-hero-name" className="sr-only">{t.name}</label>
                <input
                  required id="seller-hero-name" ref={nameRef} name="name" type="text"
                  value={form.name} onChange={update("name")}
                  placeholder={t.name} autoComplete="name"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="seller-hero-phone" className="sr-only">{t.phone}</label>
                <input
                  required id="seller-hero-phone" ref={phoneRef} name="phone" type="tel"
                  value={form.phone} onChange={update("phone")}
                  placeholder={t.phone} autoComplete="tel" inputMode="tel"
                  className={inputCls}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-gold/70 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
            >
              {t.continue}<ArrowRight size={15} />
            </button>
          </>
        ) : (
          <>
            {/* Email — optional; enables the written valuation + auto-acknowledgment */}
            <label htmlFor="seller-hero-email" className="sr-only">{t.email}</label>
            <input
              id="seller-hero-email" name="email" type="email"
              value={form.email} onChange={update("email")}
              placeholder={t.email} autoComplete="email" inputMode="email"
              className={inputCls}
            />

            {/* Market + Timeline — each full-width row so labels never truncate */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative">
                <label htmlFor="seller-hero-market" className="sr-only">Market</label>
                <select
                  id="seller-hero-market" name="city" value={form.city} onChange={update("city")}
                  className={selectCls}
                >
                  {t.markets.map((m) => <option key={m}>{m}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
              </div>
              <div className="relative">
                <label htmlFor="seller-hero-timeline" className="sr-only">Timeline</label>
                <select
                  id="seller-hero-timeline" name="timeline" value={form.timeline} onChange={update("timeline")}
                  className={selectCls}
                >
                  {t.timelines.map((tl) => <option key={tl}>{tl}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
              </div>
            </div>

            {/* WhatsApp/SMS consent — optional opt-in */}
            <label className="mt-3 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                name="messagingConsent"
                checked={form.messagingConsent === "yes"}
                onChange={(e) => setForm((f) => ({ ...f, messagingConsent: e.target.checked ? "yes" : "no" }))}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#B08D57]"
              />
              <span className="font-sans text-[11px] leading-relaxed text-white/70">{t.consent}</span>
            </label>

            <div className="mt-5 grid grid-cols-[auto_1fr] gap-2.5">
              <button
                type="button"
                onClick={handleBack}
                className="min-h-12 rounded-lg border border-white/20 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-gold/50 hover:text-gold"
              >
                {t.back}
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="hero-cta-main flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy-deep disabled:opacity-60 sm:text-[11px] sm:tracking-[0.2em]"
              >
                {status === "submitting"
                  ? <><Loader2 size={15} className="animate-spin" />{t.sending}</>
                  : <>{t.submit}<ArrowRight size={15} /></>}
              </button>
            </div>
          </>
        )}
      </div>

      <p role="alert" aria-live="assertive" className="mt-3 min-h-5 font-sans text-[13px] text-red-300">
        {error}
      </p>

      {/* Concrete outcome at the point of conversion */}
      <p className="mt-4 text-center font-serif text-[13px] italic leading-snug text-white/60">
        "{t.proofQuote}"{" "}
        <span className="not-italic font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 whitespace-nowrap">
          — {t.proofName}
        </span>
      </p>

      {/* Single trust row — stars + proof */}
      <div className="mt-2.5 flex items-center justify-center gap-2">
        <span className="flex gap-0.5 shrink-0" aria-hidden="true">
          {[0,1,2,3,4].map(i => (
            <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#B08D57">
              <path d="M6 0l1.35 4.15H12L8.32 6.72 9.67 10.87 6 8.3 2.33 10.87 3.68 6.72 0 4.15h4.65z"/>
            </svg>
          ))}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 leading-snug">
          5.0 · Personal reply from Carlos · No listing commitment
        </span>
      </div>

      {/* WhatsApp fallback */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
        {t.prefer}{" "}
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/60 hover:text-gold underline underline-offset-2 transition-colors"
        >
          {t.preferLink}
        </a>
      </p>
    </form>
  );
}
