import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, MapPin, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../../constants";
import { pushEvent, trackFunnelEvent, trackLead } from "../../lib/analytics";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";

// ──────────────────────────────────────────────────────────────────────────
// Short-form Spain / international seller intake.
//
// This is the FIRST rung of the Global Desk ladder. GlobalDeskListingForm is
// the second: it asks ~14 questions and hard-requires a property image upload,
// which is the right ask from an agency ready to submit a mandate but the
// wrong ask from an owner who has just landed from search. Three required
// fields (location, name, phone) mirrors the South Florida hero form — the one
// that actually produces daily leads — so the Spain side finally has a
// comparable low-commitment entry point instead of only the wall.
//
// Everything past those three is optional and only sharpens Carlos's first
// reply; nothing here blocks submission.
// ──────────────────────────────────────────────────────────────────────────

type Lang = "es" | "en";

const FORM_NAME = "spain-seller";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  es: {
    eyebrow: "Consulta confidencial · Miami Global Listing Desk",
    badge: "Privada · Sin compromiso",
    title: "¿Su propiedad puede interesar a un comprador de Miami?",
    intro:
      "Tres datos para empezar. Carlos revisa cada consulta personalmente y responde con una valoración de encaje — si su propiedad tiene o no recorrido con agentes compradores del área de Miami, dicho con franqueza.",
    location: "Ubicación de la propiedad (ciudad y zona)",
    name: "Nombre completo",
    phone: "WhatsApp / teléfono (con código de país)",
    email: "Email (opcional)",
    roleLabel: "Usted es",
    roles: [
      ["owner", "Propietario"],
      ["agency", "Agencia inmobiliaria"],
      ["developer", "Promotor"],
      ["agent", "Agente individual"],
    ],
    typeLabel: "Tipo de propiedad",
    types: ["Villa", "Apartamento", "Ático", "Obra nueva", "Parcela / solar", "Cartera de varias", "Otro"],
    bandLabel: "Valor aproximado",
    bands: ["Menos de 500.000 €", "500.000 € – 1M €", "1M € – 3M €", "3M € – 10M €", "Más de 10M €", "Prefiero no decirlo"],
    timelineLabel: "Plazo",
    timelines: ["Explorando opciones", "De inmediato", "3–6 meses", "6–12 meses", "Más de 12 meses"],
    consent: "Acepto recibir respuesta por WhatsApp o email. Puede solicitar la baja en cualquier momento.",
    submit: "Solicitar valoración de encaje",
    sending: "Enviando…",
    prefer: "¿Prefiere WhatsApp?",
    preferLink: "Escriba a Carlos directamente",
    successTag: "Consulta recibida",
    successTitle: "Carlos revisará su propiedad personalmente.",
    successBody:
      "Recibirá una valoración de encaje: si su propiedad tiene recorrido con agentes compradores del área de Miami, cómo se prepararía y qué vía de cooperación correspondería. Sin compromiso.",
    briefIntro: "Mientras tanto, el informe metodológico de activación explica el marco completo:",
    briefCta: "Descargar el informe",
    successCta: "Continuar por WhatsApp →",
    timeout: "La solicitud expiró — use WhatsApp o inténtelo de nuevo.",
    failed: "No se pudo enviar — use WhatsApp o inténtelo de nuevo.",
    trust: "Carlos Uzcategui, REALTOR® · Licencia de Florida SL705771 · United Realty Group · Su representación local en España se preserva",
  },
  en: {
    eyebrow: "Confidential enquiry · Miami Global Listing Desk",
    badge: "Private · No commitment",
    title: "Could your property interest a Miami buyer?",
    intro:
      "Three details to start. Carlos reviews every enquiry personally and replies with a fit assessment — whether your property has real traction with Miami-area buyer agents, said plainly.",
    location: "Property location (city and area)",
    name: "Full name",
    phone: "WhatsApp / phone (with country code)",
    email: "Email (optional)",
    roleLabel: "You are",
    roles: [
      ["owner", "Property owner"],
      ["agency", "Real estate agency"],
      ["developer", "Developer"],
      ["agent", "Individual agent"],
    ],
    typeLabel: "Property type",
    types: ["Villa", "Apartment", "Penthouse", "New-build", "Plot", "Portfolio of several", "Other"],
    bandLabel: "Approximate value",
    bands: ["Under €500,000", "€500,000 – €1M", "€1M – €3M", "€3M – €10M", "Over €10M", "Prefer not to say"],
    timelineLabel: "Timeline",
    timelines: ["Exploring options", "Immediately", "3–6 months", "6–12 months", "12+ months"],
    consent: "I agree to be contacted by WhatsApp or email. You may opt out at any time.",
    submit: "Request a fit assessment",
    sending: "Sending…",
    prefer: "Prefer WhatsApp?",
    preferLink: "Message Carlos directly",
    successTag: "Enquiry received",
    successTitle: "Carlos will personally review your property.",
    successBody:
      "You will receive a fit assessment: whether your property has traction with Miami-area buyer agents, how it would be prepared, and which cooperation path would apply. No commitment.",
    briefIntro: "In the meantime, the activation methodology brief explains the full framework:",
    briefCta: "Download the brief",
    successCta: "Continue on WhatsApp →",
    timeout: "Request timed out — please use WhatsApp or try again.",
    failed: "Couldn't send — please use WhatsApp or try again.",
    trust: "Carlos Uzcategui, REALTOR® · Florida License SL705771 · United Realty Group · Your local Spanish representation is preserved",
  },
} as const;

export function SpainSellerForm({
  lang = "es",
  sourcePage,
  presetLocation = "",
}: {
  lang?: Lang;
  sourcePage: string;
  /** Pre-fills the location field on market landing pages (e.g. "Marbella"). */
  presetLocation?: string;
}) {
  const t = COPY[lang];
  const initial = {
    location: presetLocation,
    name: "",
    phone: "",
    email: "",
    role: "owner",
    propertyType: "",
    valueBand: "",
    timeline: t.timelines[0],
    messagingConsent: "no",
  };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const startFired = useRef(false);
  const renderedAt = useRef(Date.now());

  const handleFocus = () => {
    if (startFired.current || navigator.webdriver) return;
    startFired.current = true;
    pushEvent("form_start", {
      form_name: FORM_NAME,
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
          "form-name": FORM_NAME,
          "bot-field": "",
          formRenderedAt: String(renderedAt.current),
          ...form,
          language: lang,
          sourcePage,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));

      notifyLeadDirect({
        name: form.name,
        email: form.email,
        phone: form.phone,
        propertyAddress: form.location,
        city: form.location,
        timeline: form.timeline,
        message: `Spain Desk · ${form.role} · ${form.propertyType || "—"} · ${form.valueBand || "—"}`,
        sourcePage,
        formName: FORM_NAME,
        valueBand: form.valueBand,
        // Scoring signal — the Netlify Forms path receives this through the
        // `...form` spread, so the direct path has to send it too or the two
        // paths tier the same lead differently depending on which wins dedup.
        messagingConsent: form.messagingConsent,
        leadSource: getLeadSource(),
        desk: "spain",
        botField: "",
        formRenderedAt: String(renderedAt.current),
      });

      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: FORM_NAME,
          name: form.name,
          email: form.email,
          phone: form.phone,
          language: lang,
        }),
      }).catch(() => {});

      trackLead("seller", { form: FORM_NAME, page: sourcePage, language: lang });
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setError(err instanceof DOMException && err.name === "AbortError" ? t.timeout : t.failed);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/30 bg-[#0A1525]/90 px-6 py-8 text-center shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 size={26} />
        </div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{t.successTag}</p>
        <h3 className="font-serif text-2xl text-white">{t.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/60">{t.successBody}</p>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="mx-auto mb-3 max-w-sm font-sans text-[13px] leading-relaxed text-white/65">{t.briefIntro}</p>
          <a
            href={LEAD_MAGNETS.spainActivation.url}
            download
            onClick={() => trackFunnelEvent("activation_brief_download", { source: sourcePage, lang })}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
          >
            <Download size={14} />
            {t.briefCta}
          </a>
        </div>

        <a
          href={CONTACT.whatsappSpain}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80 transition-colors hover:text-gold"
        >
          {t.successCta}
        </a>
      </motion.div>
    );
  }

  // text-base (16px) prevents iOS Safari from auto-zooming on input focus
  const inputCls =
    "w-full rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 font-sans text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/50 focus:bg-white/[0.08]";
  const selectCls = inputCls + " cursor-pointer appearance-none pr-9";

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      className="rounded-2xl border border-white/12 bg-[#0A1525]/90 p-5 text-left shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-7"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p aria-hidden="true" className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{t.eyebrow}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">{t.badge}</span>
      </div>

      <h3 className="font-serif text-2xl leading-snug text-white">{t.title}</h3>
      <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/60">{t.intro}</p>

      {/* ── The three that matter ─────────────────────────────────────── */}
      <div className="relative mt-6">
        <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gold/70" />
        <input
          required
          name="location"
          type="text"
          value={form.location}
          onChange={update("location")}
          placeholder={t.location}
          style={{ paddingLeft: "2.75rem" }}
          className="w-full rounded-lg border border-gold/25 bg-white/[0.08] px-4 py-4 font-sans text-base text-white outline-none transition-all placeholder:text-white/30 focus:border-gold/60 focus:bg-white/[0.11] focus:ring-2 focus:ring-gold/15"
          aria-label={t.location}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required
          name="name"
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder={t.name}
          autoComplete="name"
          className={inputCls}
          aria-label={t.name}
        />
        <input
          required
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
      </div>

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={update("email")}
        placeholder={t.email}
        autoComplete="email"
        inputMode="email"
        className={inputCls + " mt-3"}
        aria-label={t.email}
      />

      {/* ── Everything below is optional — it sharpens the first reply ── */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select label={t.roleLabel} name="role" value={form.role} onChange={update("role")} className={selectCls}>
          {t.roles.map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </Select>
        <Select
          label={t.typeLabel}
          name="propertyType"
          value={form.propertyType}
          onChange={update("propertyType")}
          className={selectCls}
          placeholder={t.typeLabel}
        >
          {t.types.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Select
          label={t.bandLabel}
          name="valueBand"
          value={form.valueBand}
          onChange={update("valueBand")}
          className={selectCls}
          placeholder={t.bandLabel}
        >
          {t.bands.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Select
          label={t.timelineLabel}
          name="timeline"
          value={form.timeline}
          onChange={update("timeline")}
          className={selectCls}
        >
          {t.timelines.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
      </div>

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

      {status === "error" && <p className="mt-3 font-sans text-[13px] text-red-400/90">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg bg-gold px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            {t.submit}
            <ArrowRight size={15} />
          </>
        )}
      </button>

      <p className="mt-4 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/60">
        {t.trust}
      </p>

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
        {t.prefer}{" "}
        <a
          href={CONTACT.whatsappSpain}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/70 underline underline-offset-2 transition-colors hover:text-gold"
        >
          {t.preferLink}
        </a>
      </p>
    </form>
  );
}

/** Select with a visually-hidden label — the placeholder option carries the
 *  visible affordance, but assistive tech still gets a real name. */
function Select({
  label,
  name,
  value,
  onChange,
  className,
  placeholder,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  placeholder?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className={className} aria-label={label}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gold/60">▾</span>
    </div>
  );
}
