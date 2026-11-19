import React, { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT, PUBLIC_COMPLIANCE } from "../../constants";
import { trackLead, pushEvent, navigateAfterTracking } from "../../lib/analytics";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";

const COUNTRIES = [
  "United States", "Spain", "Venezuela", "Colombia", "Argentina", "Mexico",
  "Brazil", "Peru", "Chile", "Ecuador", "Panama", "Dominican Republic",
  "Cuba", "Bolivia", "Uruguay", "Paraguay", "Costa Rica", "Guatemala",
  "United Kingdom", "Canada", "France", "Germany", "Italy", "Other",
];

const NEIGHBORHOODS = [
  "Brickell", "Coral Gables", "Coconut Grove", "Key Biscayne", "Miami Beach",
  "Bal Harbour", "Sunny Isles Beach", "Aventura", "Weston", "Pinecrest",
  "Doral", "Fort Lauderdale", "Boca Raton", "Edgewater / Wynwood", "Other",
];

const PRICE_RANGES = [
  "$500K – $1M", "$1M – $2M", "$2M – $5M", "$5M – $10M", "$10M+",
];

const INITIAL: Record<string, string> = {
  name: "", email: "", phone: "", country: "", targetNeighborhoods: "", priceRange: "",
  financing: "", timeline: "", visaStatus: "", preferredContact: "WhatsApp", source: "buyer-mandate",
};

type Variant = "miami" | "gilmar-spain";
type Lang = "en" | "es";

/**
 * Copy per desk. "miami" is the original form, unchanged. "gilmar-spain" serves
 * the /gilmar-spain registration desk: Spain markets from that page's IDX feed,
 * EUR budgets, the +34 line, and a source tag HubSpot uses to label the lead.
 * Field *names* never change per variant — they are registered in index.html.
 */
function copyFor(variant: Variant, lang: Lang) {
  const es = lang === "es";
  if (variant === "gilmar-spain") {
    return {
      source: "gilmar-spain",
      sourcePage: "gilmar-spain-buyer",
      eyebrow: es ? "Mesa GILMAR España · Acceso comprador" : "GILMAR Spain Desk · Buyer access",
      title: es ? "Solicitar acceso guiado al catálogo de 2.000+ propiedades" : "Request guided access to the 2,000+ Spain property feed",
      intro: es
        ? "Indique zona, tipo de activo y presupuesto. Nuestro equipo confirma su perfil y coordina el acceso guiado con los equipos locales de GILMAR en España."
        : "Share your target region, asset type and budget. Our team confirms fit and coordinates guided access with GILMAR’s local Spanish teams.",
      name: es ? "Nombre completo *" : "Full Name *",
      namePh: es ? "Su nombre" : "Your name",
      email: es ? "Correo electrónico *" : "Email Address *",
      country: es ? "País de residencia *" : "Country of Residence *",
      countryPh: es ? "Seleccione país…" : "Select country…",
      phone: es ? "Teléfono / WhatsApp *" : "Phone / WhatsApp *",
      phonePh: es ? "Con prefijo internacional, ej. +34…" : "With country code, e.g. +34…",
      contact: es ? "Contacto preferido *" : "Preferred Contact *",
      contactOpts: es ? ["WhatsApp", "Email", "Llamada"] : ["WhatsApp", "Email", "Phone call"],
      areas: es ? "Zonas de interés * (seleccione todas las que apliquen)" : "Target Regions * (select all that apply)",
      areaOpts: es
        ? ["Madrid", "Costa del Sol", "Málaga", "Islas Canarias", "Sevilla y Cádiz", "Abierto a recomendación"]
        : ["Madrid", "Costa del Sol", "Málaga", "Canary Islands", "Seville & Cádiz", "Open to recommendation"],
      areaErr: es ? "Seleccione al menos una zona." : "Please select at least one region.",
      budget: es ? "Presupuesto *" : "Budget Range *",
      budgetOpts: ["< €300K", "€300K – €600K", "€600K – €1M", "€1M – €2M", "€2M – €5M", "€5M+"],
      financing: es ? "Financiación *" : "Financing *",
      financingOpts: es
        ? ["Compra al contado", "Hipoteca española (no residente)", "Sin decidir / necesito orientación"]
        : ["All cash", "Spanish mortgage (non-resident)", "Undecided / need guidance"],
      timeline: es ? "Plazo de compra *" : "Purchase Timeline *",
      timelineOpts: es
        ? ["0 – 3 meses", "3 – 6 meses", "6 – 12 meses", "Exploratorio — sin fecha fija"]
        : ["0 – 3 months", "3 – 6 months", "6 – 12 months", "Exploratory — no fixed date"],
      // Re-uses the registered visaStatus field for the asset-type answer.
      extra: es ? "Tipo de activo (opcional)" : "Asset Type (optional)",
      extraPh: es ? "ej. obra nueva, segunda mano, inversión, comercial…" : "e.g., new development, resale, investment, commercial…",
      select: es ? "Seleccione…" : "Select…",
      submit: es ? "Solicitar acceso guiado" : "Request Guided Spain Access",
      sending: es ? "Enviando…" : "Sending…",
      timeoutErr: es ? "Tiempo de espera agotado. Escriba a Carlos por WhatsApp (+34)." : "Request timed out. Please WhatsApp Carlos on the Spain line.",
      sendErr: es ? "No se pudo enviar. Use WhatsApp (+34)." : "Could not submit. Please use WhatsApp (+34).",
      whatsapp: CONTACT.whatsappSpain,
      thanks: `/thanks/buyer?desk=gilmar-spain&lang=${lang}`,
      successEyebrow: es ? "Solicitud recibida" : "Request Received",
      successTitle: es ? "Nuestro equipo coordinará su acceso guiado." : "Our team will coordinate your guided access.",
      successBody: es ? "Recibirá una confirmación por correo." : "A confirmation is on its way to your email.",
      successLink: es ? "WhatsApp España para preguntas inmediatas" : "WhatsApp the Spain line for immediate questions",
    };
  }
  return {
    source: "buyer-mandate",
    sourcePage: "buyer-mandate",
    eyebrow: "Confidential Buyer Desk",
    title: "Request a Miami buyer brief",
    intro: "Share your search parameters — Carlos builds a brief tailored to your budget and timeline.",
    name: "Full Name *", namePh: "Your name", email: "Email Address *",
    country: "Country of Origin *", countryPh: "Select country…",
    phone: "Phone / WhatsApp *", phonePh: "+1 or international number",
    contact: "Preferred Contact *", contactOpts: ["WhatsApp", "Email", "Phone call"],
    areas: "Target Neighborhoods * (select all that apply)", areaOpts: NEIGHBORHOODS,
    areaErr: "Please select at least one neighborhood.",
    budget: "Budget Range *", budgetOpts: PRICE_RANGES,
    financing: "Financing *",
    financingOpts: ["All cash", "U.S. conventional mortgage", "Foreign-national loan", "Undecided / need guidance"],
    timeline: "Purchase Timeline *",
    timelineOpts: ["0 – 3 months", "3 – 6 months", "6 – 12 months", "Exploratory — no fixed date"],
    extra: "Visa / Residency Status (optional)", extraPh: "e.g., B-2, permanent resident, citizen, pending…",
    select: "Select…", submit: "Request Miami Buyer Brief", sending: "Sending…",
    timeoutErr: "Request timed out. Please WhatsApp Carlos directly.",
    sendErr: "Could not submit. Please try WhatsApp below.",
    whatsapp: CONTACT.whatsappUS,
    thanks: "/thanks/buyer",
    successEyebrow: "Buyer Mandate Received",
    successTitle: "Our team will prepare your Miami buyer brief.",
    successBody: "Confirmation sent to your email. Our team responds from the Weston, Florida office.",
    successLink: "WhatsApp for immediate questions",
  };
}

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function BuyerMandateForm({ variant = "miami", language = "en" }: { variant?: Variant; language?: Lang } = {}) {
  const c = copyFor(variant, language);
  const [form, setForm] = useState<Record<string, string>>({ ...INITIAL, source: c.source });
  const [neighborhoodSel, setNeighborhoodSel] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const formStartFired = useRef(false);
  const renderedAt = useRef(Date.now());

  const handleFormFocus = () => {
    if (formStartFired.current || navigator.webdriver) return;
    formStartFired.current = true;
    pushEvent("form_start", {
      form_name: "buyer-mandate",
      page_path: window.location.pathname,
      funnel_stage: "consideration",
    });
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleNeighborhood = (n: string) => {
    setNeighborhoodSel((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (neighborhoodSel.length === 0) { setErr(c.areaErr); return; }
    setStatus("submitting");
    setErr("");
    const submission = { ...form, targetNeighborhoods: neighborhoodSel.join(", ") };
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({ "form-name": "buyer-mandate", "bot-field": "", formRenderedAt: String(renderedAt.current), ...submission, sourcePage: c.sourcePage, language, ...getAttribution() }),
      });
      if (!res.ok) throw new Error("submission_failed");
      notifyLeadDirect({
        name: form.name, email: form.email, phone: form.phone,
        propertyAddress: submission.targetNeighborhoods, city: form.country, timeline: form.timeline,
        message: `Budget ${form.priceRange || "—"} · Financing ${form.financing || "—"}${form.visaStatus ? ` · Visa ${form.visaStatus}` : ""}`,
        sourcePage: c.sourcePage, formName: "buyer-mandate", leadSource: getLeadSource(),
        botField: "", formRenderedAt: String(renderedAt.current),
      });
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "buyer-mandate", desk: variant, language, name: form.name, email: form.email, phone: form.phone, country: form.country, botField: "", formRenderedAt: String(renderedAt.current) }),
      }).catch(() => {});
      trackLead("buyer", { form: "buyer-mandate" });
      navigateAfterTracking(c.thanks);
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? c.timeoutErr
          : c.sendErr
      );
      setStatus("error");
    } finally {
      window.clearTimeout(t);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-bone bg-white p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-gold/10 text-gold">
          <CheckCircle2 size={30} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{c.successEyebrow}</p>
        <h3 className="mt-3 font-serif text-2xl text-navy">{c.successTitle}</h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/70 max-w-md mx-auto">
          {c.successBody}
        </p>
        <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-sans text-sm text-gold-ink underline">
          {c.successLink}
        </a>
      </div>
    );
  }

  return (
    <div className="border border-bone bg-white">
      <div className="border-b border-bone bg-navy-deep px-8 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{c.eyebrow}</p>
        <h3 className="mt-2 font-serif text-2xl text-white">{c.title}</h3>
        <p className="mt-2 font-sans text-sm text-white/70">{c.intro}</p>
      </div>

      <form
        name="buyer-mandate"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onFocus={handleFormFocus}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="buyer-mandate" />
        <input type="hidden" name="source" value={c.source} />
        <input type="hidden" name="targetNeighborhoods" value={neighborhoodSel.join(", ")} />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={c.name}>
            <input required name="name" type="text" placeholder={c.namePh} className="form-input" value={form.name} onChange={set("name")} />
          </Field>
          <Field label={c.email}>
            <input required name="email" type="email" placeholder="your@email.com" className="form-input" value={form.email} onChange={set("email")} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Field label={c.country}>
            <select required name="country" className="form-input w-full" value={form.country} onChange={set("country")}>
              <option value="">{c.countryPh}</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label={c.phone}>
            <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={c.phonePh} className="form-input" value={form.phone} onChange={set("phone")} />
          </Field>
          <Field label={c.contact}>
            <select required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
              {c.contactOpts.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <Field label={c.areas}>
          <div className="flex flex-wrap gap-2 pt-1">
            {c.areaOpts.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => toggleNeighborhood(n)}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                  neighborhoodSel.includes(n)
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-bone text-navy/70 hover:border-gold/40"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={c.budget}>
            <select required name="priceRange" className="form-input w-full" value={form.priceRange} onChange={set("priceRange")}>
              <option value="">{c.select}</option>
              {c.budgetOpts.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label={c.financing}>
            <select required name="financing" className="form-input w-full" value={form.financing} onChange={set("financing")}>
              <option value="">{c.select}</option>
              {c.financingOpts.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={c.timeline}>
            <select required name="timeline" className="form-input w-full" value={form.timeline} onChange={set("timeline")}>
              <option value="">{c.select}</option>
              {c.timelineOpts.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label={c.extra}>
            <input name="visaStatus" type="text" placeholder={c.extraPh} className="form-input" value={form.visaStatus} onChange={set("visaStatus")} />
          </Field>
        </div>

        {status === "error" && (
          <p className="font-sans text-sm text-red-600">{err}</p>
        )}

        <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60">
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? c.sending : c.submit}
        </button>

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-navy/70">
          {PUBLIC_COMPLIANCE}
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  // The control is nested inside the <label>, giving every input/select a
  // programmatic label (implicit association) without needing per-field ids.
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">{label}</span>
      {children}
    </label>
  );
}
