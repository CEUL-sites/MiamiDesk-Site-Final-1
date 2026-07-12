import React, { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { pushEvent } from "../../lib/analytics";
import { notifyLeadDirect } from "../../lib/leadNotify";

type Lang = "en" | "es";

const INITIAL: Record<string, string> = {
  agentName: "",
  agency: "",
  role: "",
  country: "",
  email: "",
  whatsapp: "",
  website: "",
  inventoryType: "",
  priceRange: "",
  numberOfListings: "",
  listingUrl: "",
  message: "",
  consent: "",
  source: "agency-partner-intake",
};

// Bilingual labels. Option values stay in English so the lead pipeline
// (Netlify form, Google Sheet, notifications) reads one vocabulary.
const L = {
  en: {
    name: "Your Name *",
    namePh: "First and last name",
    agency: "Agency / Company *",
    agencyPh: "Firm or developer name",
    role: "Your Role *",
    roles: [
      ["Listing Agent", "Listing Agent"],
      ["Team Lead / Sales Director", "Team Lead / Sales Director"],
      ["Agency Director / Owner", "Agency Director / Owner"],
      ["Developer / Project Sales", "Developer / Project Sales"],
      ["Family Office / Authorized Representative", "Family Office / Authorized Representative"],
      ["Property Owner", "Property Owner"],
      ["Other", "Other"],
    ],
    market: "Market *",
    country: "Country / Market *",
    countryPh: "Spain, Colombia, Mexico…",
    email: "Email *",
    emailPh: "your@agency.com",
    whatsapp: "WhatsApp / Phone",
    website: "Agency / Company Website",
    inventoryHeading: "Inventory Details",
    inventoryType: "Type of Inventory *",
    inventoryTypes: [
      ["Luxury Apartments / Penthouses", "Luxury Apartments / Penthouses"],
      ["Villas / Single-Family Estates", "Villas / Single-Family Estates"],
      ["New Development / Pre-Construction", "New Development / Pre-Construction"],
      ["Branded Residences", "Branded Residences"],
      ["Mixed Portfolio", "Mixed Portfolio"],
      ["Commercial / Investment", "Commercial / Investment"],
      ["Other", "Other"],
    ],
    priceRange: "Price Range *",
    priceRanges: [
      ["€500K – €1M", "€500K – €1M"],
      ["€1M – €2.5M", "€1M – €2.5M"],
      ["€2.5M – €5M", "€2.5M – €5M"],
      ["€5M – €10M", "€5M – €10M"],
      ["€10M+", "€10M+"],
      ["Varies across portfolio", "Varies across portfolio"],
    ],
    listings: "Number of Properties",
    listingUrl: "Listing URL (optional)",
    listingUrlPh: "Link to property or portfolio page",
    message: "Brief Description / Objective *",
    messagePh:
      "Briefly describe the property or portfolio, what kind of exposure or cooperation you are looking for, and any context that will help Carlos respond accurately.",
    consent:
      "I authorize Carlos Uzcategui (HomesProfessional.com) to contact me regarding the submitted inquiry. I understand this submission does not create a binding agreement and that any cooperation is subject to review, brokerage approval, and written agreement.",
    consentErr: "Please confirm your consent to proceed.",
    timeoutErr: "Request timed out. Please WhatsApp Carlos directly.",
    genericErr: "Could not submit. Please try WhatsApp or email.",
    sending: "Sending…",
    submit: "Request a Confidential Inventory Review",
    footer: "Confidential · No obligation",
    select: "Select…",
  },
  es: {
    name: "Su nombre *",
    namePh: "Nombre y apellidos",
    agency: "Agencia / empresa *",
    agencyPh: "Nombre de la agencia o promotora",
    role: "Su función *",
    roles: [
      ["Listing Agent", "Agente de captación"],
      ["Team Lead / Sales Director", "Director/a comercial o de equipo"],
      ["Agency Director / Owner", "Director/a o propietario/a de agencia"],
      ["Developer / Project Sales", "Promotor / ventas de proyecto"],
      ["Family Office / Authorized Representative", "Family office / representante autorizado"],
      ["Property Owner", "Propietario/a"],
      ["Other", "Otro"],
    ],
    market: "Mercado *",
    country: "País / mercado *",
    countryPh: "España, Colombia, México…",
    email: "Correo electrónico *",
    emailPh: "su@agencia.com",
    whatsapp: "WhatsApp / teléfono",
    website: "Web de la agencia / empresa",
    inventoryHeading: "Datos del inventario",
    inventoryType: "Tipo de inventario *",
    inventoryTypes: [
      ["Luxury Apartments / Penthouses", "Apartamentos de lujo / áticos"],
      ["Villas / Single-Family Estates", "Villas / residencias unifamiliares"],
      ["New Development / Pre-Construction", "Obra nueva / preconstrucción"],
      ["Branded Residences", "Residencias con marca"],
      ["Mixed Portfolio", "Cartera mixta"],
      ["Commercial / Investment", "Comercial / inversión"],
      ["Other", "Otro"],
    ],
    priceRange: "Rango de precio *",
    priceRanges: [
      ["€500K – €1M", "500 mil – 1 M €"],
      ["€1M – €2.5M", "1 – 2,5 M €"],
      ["€2.5M – €5M", "2,5 – 5 M €"],
      ["€5M – €10M", "5 – 10 M €"],
      ["€10M+", "Más de 10 M €"],
      ["Varies across portfolio", "Varía según la cartera"],
    ],
    listings: "Número de propiedades",
    listingUrl: "Enlace al inmueble (opcional)",
    listingUrlPh: "Enlace a la propiedad o a la cartera",
    message: "Breve descripción / objetivo *",
    messagePh:
      "Describa brevemente la propiedad o cartera, qué tipo de exposición o colaboración busca, y cualquier contexto que ayude a Carlos a responder con precisión.",
    consent:
      "Autorizo a Carlos Uzcategui (HomesProfessional.com) a contactarme en relación con esta consulta. Entiendo que este envío no crea un acuerdo vinculante y que toda colaboración está sujeta a revisión, aprobación del broker y acuerdo por escrito.",
    consentErr: "Debe confirmar su consentimiento para continuar.",
    timeoutErr: "La solicitud expiró. Escriba a Carlos por WhatsApp.",
    genericErr: "No se pudo enviar. Pruebe por WhatsApp o correo.",
    sending: "Enviando…",
    submit: "Solicitar una revisión confidencial de inventario",
    footer: "Confidencial · Sin compromiso",
    select: "Seleccione…",
  },
} as const;

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

/**
 * Shared agency / developer / owner intake form (bilingual).
 *
 * Optional props let a host page tailor the framing without forking the form:
 *  - `lang` → renders Spanish labels; posted option values stay in English.
 *  - `markets`  → renders a market <select> in place of the free-text
 *    "Country / Market" field (still posts under `country`).
 *  - `eyebrow` / `heading` / `intro` → override the header copy.
 *  - `source` → overrides the analytics/source tag so submissions can be
 *    attributed to the embedding desk (e.g. "global-desk-inquiry").
 */
export function AgencyPartnerForm({
  lang = "en",
  markets,
  eyebrow = "Miami Desk · International Listing Review",
  heading = "Submit a listing or agency inquiry",
  intro = "For agents, agencies, and developers outside South Florida. All submissions are treated as confidential. Carlos reviews every inquiry personally before responding.",
  source = "agency-partner-intake",
}: {
  lang?: Lang;
  markets?: string[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  source?: string;
} = {}) {
  const t = L[lang];
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [err, setErr] = useState("");
  const formStartFired = useRef(false);

  const handleFormFocus = () => {
    if (formStartFired.current || navigator.webdriver) return;
    formStartFired.current = true;
    pushEvent("form_start", {
      form_name: source,
      page_path: window.location.pathname,
      funnel_stage: "consideration",
    });
  };

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setErr(t.consentErr);
      return;
    }
    setStatus("submitting");
    setErr("");
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({
          "form-name": "agency-partner-intake",
          "bot-field": "",
          ...form,
          source,
          sourcePage: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error("submission_failed");
      notifyLeadDirect({
        name: form.agentName, email: form.email, phone: form.whatsapp,
        city: form.country, propertyAddress: form.agency,
        message: `${form.role ? form.role + " · " : ""}${form.inventoryType ? form.inventoryType + " · " : ""}${form.message}`,
        sourcePage: source,
      });
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "agency-partner-intake",
          name: form.agentName,
          email: form.email,
          brokerage: form.agency,
          language: lang,
        }),
      }).catch(() => {});
      pushEvent("form_submit_agency_partner", { source, language: lang });
      window.location.href = lang === "es" ? "/es/gracias/agente" : "/thanks/agent";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError" ? t.timeoutErr : t.genericErr
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <div className="border border-white/10">
      <div className="border-b border-white/10 bg-white/[0.03] px-8 py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-2xl text-white">{heading}</h3>
        <p className="mt-2 font-sans text-sm text-white/55">{intro}</p>
      </div>

      <form
        name="agency-partner-intake"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onFocus={handleFormFocus}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="agency-partner-intake" />
        <input type="hidden" name="source" value={source} />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Identity */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.name}>
            <input required name="agentName" type="text" placeholder={t.namePh} className="form-input-dark" value={form.agentName} onChange={set("agentName")} />
          </Field>
          <Field label={t.agency}>
            <input required name="agency" type="text" placeholder={t.agencyPh} className="form-input-dark" value={form.agency} onChange={set("agency")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.role}>
            <select required name="role" className="form-input-dark w-full" value={form.role} onChange={set("role")}>
              <option value="">{t.select}</option>
              {t.roles.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </Field>
          <Field label={markets ? t.market : t.country}>
            {markets ? (
              <select required name="country" className="form-input-dark w-full" value={form.country} onChange={set("country")}>
                <option value="">{t.select}</option>
                {markets.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            ) : (
              <input required name="country" type="text" placeholder={t.countryPh} className="form-input-dark" value={form.country} onChange={set("country")} />
            )}
          </Field>
        </div>

        {/* Contact */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.email}>
            <input required name="email" type="email" placeholder={t.emailPh} className="form-input-dark" value={form.email} onChange={set("email")} />
          </Field>
          <Field label={t.whatsapp}>
            <input name="whatsapp" type="tel" placeholder="+34 600 000 000" className="form-input-dark" value={form.whatsapp} onChange={set("whatsapp")} />
          </Field>
        </div>

        <Field label={t.website}>
          <input name="website" type="url" placeholder="https://youragency.com" className="form-input-dark" value={form.website} onChange={set("website")} />
        </Field>

        {/* Inventory */}
        <div className="border-t border-white/10 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 mb-5">{t.inventoryHeading}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t.inventoryType}>
              <select required name="inventoryType" className="form-input-dark w-full" value={form.inventoryType} onChange={set("inventoryType")}>
                <option value="">{t.select}</option>
                {t.inventoryTypes.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label={t.priceRange}>
              <select required name="priceRange" className="form-input-dark w-full" value={form.priceRange} onChange={set("priceRange")}>
                <option value="">{t.select}</option>
                {t.priceRanges.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.listings}>
            <input name="numberOfListings" type="text" placeholder="1, 3–5, 10+…" className="form-input-dark" value={form.numberOfListings} onChange={set("numberOfListings")} />
          </Field>
          <Field label={t.listingUrl}>
            <input name="listingUrl" type="url" placeholder={t.listingUrlPh} className="form-input-dark" value={form.listingUrl} onChange={set("listingUrl")} />
          </Field>
        </div>

        <Field label={t.message}>
          <textarea
            required
            name="message"
            rows={5}
            placeholder={t.messagePh}
            className="form-input-dark"
            value={form.message}
            onChange={set("message")}
          />
        </Field>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold"
            checked={!!form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked ? "yes" : "" }))}
          />
          <label htmlFor="consent" className="font-sans text-xs leading-relaxed text-white/45">
            {t.consent}
          </label>
        </div>

        {status === "error" && (
          <p className="font-sans text-sm text-red-400" role="alert">{err}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-3 bg-gold py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-navy-deep transition-all hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {status === "submitting" ? t.sending : t.submit}
        </button>

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
          {t.footer} · {CONTACT.shortLicense} · Equal Housing Opportunity
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{label}</label>
      {children}
    </div>
  );
}
