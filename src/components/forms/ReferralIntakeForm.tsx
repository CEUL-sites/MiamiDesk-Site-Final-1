import React, { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackLead, pushEvent, navigateAfterTracking } from "../../lib/analytics";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";

type Purpose = "agent_registration" | "client_referral" | "listing_review" | "professional_inquiry";
const INITIAL: Record<string, string> = {
  licenseeName: "", brokerageName: "", role: "", website: "", email: "", phone: "", country: "",
  referralType: "", clientSummary: "", preferredContact: "Email", registrationPurpose: "agent_registration",
  clientName: "", clientEmail: "", clientPhone: "", clientCountry: "", clientNeed: "", clientBudget: "",
  clientTimeline: "", clientLocation: "", clientPropertyAddress: "", clientSharingConsent: "",
};

export function ReferralIntakeForm({language = "en", initialPurpose = "agent_registration"}: {
  language?: "en" | "es"; initialPurpose?: Purpose;
} = {}) {
  const es = language === "es";
  const t = (en: string, spanish: string) => es ? spanish : en;
  const formName = es ? "referral-intake-es" : "referral-intake";
  const [form, setForm] = useState({...INITIAL, registrationPurpose: initialPurpose});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [err, setErr] = useState("");
  const renderedAt = useRef(Date.now());
  const formStartFired = useRef(false);
  const clientReferral = form.registrationPurpose === "client_referral";
  const set = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(old => ({...old, [key]: event.target.value}));
  const id = (name: string) => `${formName}-${name}`;
  const input = (name: string, label: string, type = "text", required = false) => (
    <Field id={id(name)} label={label}>
      <input id={id(name)} name={name} type={type} required={required} className="form-input"
        value={form[name]} onChange={set(name)} />
    </Field>
  );
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (clientReferral && (!form.clientEmail.trim() && !form.clientPhone.trim())) {
      setErr(t("Enter the client's email or international phone number.", "Indique el email o teléfono internacional del cliente."));
      setStatus("error"); return;
    }
    if (clientReferral && form.clientPhone && !/^\+\d[\d\s().-]{6,24}$/.test(form.clientPhone.trim())) {
      setErr(t("Include the client's international dialing code, starting with +.", "Incluya el prefijo internacional del cliente, empezando por +."));
      setStatus("error"); return;
    }
    if (clientReferral && !form.clientSharingConsent) {
      setErr(t("Confirm the client's authorization to share these details.", "Confirme la autorización del cliente para compartir estos datos."));
      setStatus("error"); return;
    }
    setStatus("submitting"); setErr("");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12000);
    // Switching to agent-only registration must not send client identity left in hidden controls.
    const submitted = Object.fromEntries(Object.entries(form).filter(([key]) =>
      clientReferral || !key.startsWith("client") || key === "clientSummary"));
    try {
      const res = await fetch("/", {
        method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"}, signal: controller.signal,
        body: new URLSearchParams({"form-name": formName, "bot-field": "", ...submitted,
          source: es ? "es-agentes" : formName, sourcePage: formName, ...getAttribution(),
          language, registrationVersion: "2", formRenderedAt: String(renderedAt.current)}).toString(),
      });
      if (!res.ok) throw new Error("submission_failed");
      notifyLeadDirect({name: form.licenseeName, email: form.email, phone: form.phone,
        city: form.country, timeline: form.referralType,
        message: `${form.registrationPurpose} · ${form.brokerageName} · ${form.clientSummary}`,
        sourcePage: formName, formName: "referral-intake", leadSource: getLeadSource(),
        botField: "", formRenderedAt: String(renderedAt.current)});
      if (!es) fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({formName, name: form.licenseeName, email: form.email, phone: form.phone, brokerage: form.brokerageName}),
      }).catch(() => {});
      trackLead("agent", {form: formName});
      navigateAfterTracking(es ? "/es/gracias/agente" : "/thanks/agent");
    } catch (error: unknown) {
      setErr((error as {name?: string}).name === "AbortError"
        ? t("Request timed out. Please WhatsApp Carlos directly.", "La solicitud ha expirado. Contacte con Carlos por WhatsApp.")
        : t("Could not submit. Please try WhatsApp or email.", "No se ha podido enviar. Use WhatsApp o email."));
      setStatus("error");
    } finally { window.clearTimeout(timer); }
  };
  return (
    <div className="border border-bone bg-white text-navy">
      <div className="border-b border-bone bg-navy-deep px-8 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{t("Agent & Agency Partner Desk", "Mesa de agentes y agencias")}</p>
        <h3 className="mt-2 font-serif text-2xl text-white">{t("Register as an agent or refer a client", "Regístrese como agente o refiera un cliente")}</h3>
        <p className="mt-2 font-sans text-sm text-white/70">{t("Your professional profile and your client's details are kept separate. Cooperation terms are agreed in writing before client engagement.", "Su perfil profesional y los datos de su cliente se mantienen separados. Las condiciones de colaboración se acuerdan por escrito antes de atender al cliente.")}</p>
      </div>
      <form name={formName} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
        onFocus={() => { if (!formStartFired.current && !navigator.webdriver) { formStartFired.current = true; pushEvent("form_start", {form_name: formName, page_path: window.location.pathname, funnel_stage: "consideration"}); } }}
        className="space-y-6 p-6 sm:p-8">
        <input type="hidden" name="form-name" value={formName} />
        <input type="hidden" name="source" value={es ? "es-agentes" : formName} />
        <input type="hidden" name="registrationVersion" value="2" />
        <div style={{position: "absolute", left: "-9999px"}} aria-hidden="true"><input type="text" name="bot-field" tabIndex={-1} autoComplete="off" /></div>
        <Field id={id("registrationPurpose")} label={t("Registration purpose *", "Motivo del registro *")}>
          <select id={id("registrationPurpose")} required name="registrationPurpose" className="form-input w-full" value={form.registrationPurpose} onChange={set("registrationPurpose")}>
            <option value="agent_registration">{t("Agent registration — no client yet", "Registro de agente — todavía sin cliente")}</option>
            <option value="client_referral">{t("Register a client referral", "Registrar un cliente referido")}</option>
            <option value="listing_review">{t("Listing review", "Revisión de una propiedad")}</option>
            <option value="professional_inquiry">{t("Other professional inquiry", "Otra consulta profesional")}</option>
          </select>
        </Field>
        <fieldset className="space-y-5">
          <legend className="mb-4 font-serif text-xl">{t("Your agent details", "Sus datos como agente")}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {input("licenseeName", t("Your name (licensee) *", "Su nombre (profesional) *"), "text", true)}
            {input("brokerageName", t("Brokerage / agency *", "Agencia / bróker *"), "text", true)}
            {input("email", t("Your email *", "Su email *"), "email", true)}
            {input("phone", t("Your phone / WhatsApp *", "Su teléfono / WhatsApp *"), "tel", true)}
            {input("country", t("Your country *", "Su país *"), "text", true)}
            {input("role", t("Professional role", "Cargo profesional"))}
            {input("website", t("Agency website", "Web de la agencia"), "url")}
            <Field id={id("preferredContact")} label={t("Preferred contact *", "Contacto preferido *")}>
              <select id={id("preferredContact")} required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
                <option>Email</option><option>WhatsApp</option><option>{t("Phone call", "Llamada telefónica")}</option>
              </select>
            </Field>
          </div>
        </fieldset>
        <Field id={id("referralType")} label={t("Referral / cooperation type", "Tipo de referencia / colaboración")}>
          <select id={id("referralType")} name="referralType" className="form-input w-full" value={form.referralType} onChange={set("referralType")}>
            <option value="">{t("Select…", "Seleccionar…")}</option>
            <option value="Buyer mandate — client buying in South Florida">{t("Buyer in South Florida", "Comprador en South Florida")}</option>
            <option value="Seller mandate — client selling in South Florida">{t("Seller in South Florida", "Vendedor en South Florida")}</option>
            <option value="Co-listing — joint MLS representation">{t("Co-listing / professional cooperation", "Colaboración profesional / co-listing")}</option>
            <option value="Spain inventory activation — developer / owner into Miami MLS">{t("International listing exposure", "Exposición internacional de propiedades")}</option>
            <option value="URG affiliation inquiry">{t("URG affiliation inquiry", "Consulta sobre afiliación a URG")}</option>
            <option value="Other">{t("Other", "Otro")}</option>
          </select>
        </Field>
        {clientReferral && <fieldset className="space-y-5 border-t border-bone pt-6">
          <legend className="mb-4 font-serif text-xl">{t("Referred client — separate contact", "Cliente referido — contacto independiente")}</legend>
          <p className="font-sans text-sm text-navy/70">{t("Enter only details your client has authorized you to share. Include an email or an international phone number.", "Incluya únicamente datos que su cliente le haya autorizado a compartir. Indique un email o un teléfono internacional.")}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {input("clientName", t("Client name *", "Nombre del cliente *"), "text", true)}
            {input("clientEmail", t("Client email", "Email del cliente"), "email")}
            {input("clientPhone", t("Client phone (include + country code)", "Teléfono del cliente (incluya + y prefijo)"), "tel")}
            {input("clientCountry", t("Client country", "País del cliente"))}
            <Field id={id("clientNeed")} label={t("Client requirement *", "Necesidad del cliente *")}>
              <select id={id("clientNeed")} required name="clientNeed" className="form-input w-full" value={form.clientNeed} onChange={set("clientNeed")}>
                <option value="">{t("Select…", "Seleccionar…")}</option>
                <option value="buyer">{t("Buying in South Florida", "Comprar en South Florida")}</option>
                <option value="seller">{t("Selling in South Florida", "Vender en South Florida")}</option>
                <option value="international_owner">{t("International property owner", "Propietario de un inmueble internacional")}</option>
              </select>
            </Field>
            {input("clientBudget", t("Client budget / property value", "Presupuesto / valor de la propiedad"))}
            {input("clientTimeline", t("Client timeline", "Plazo del cliente"))}
            {input("clientLocation", t("Client target city / property location", "Ciudad de interés / ubicación de la propiedad"))}
          </div>
          {input("clientPropertyAddress", t("Client property address (if applicable)", "Dirección de la propiedad (si corresponde)"))}
          <div className="flex items-start gap-3">
            <input id={id("clientSharingConsent")} required name="clientSharingConsent" type="checkbox" value="yes" checked={form.clientSharingConsent === "yes"}
              onChange={event => setForm(old => ({...old, clientSharingConsent: event.target.checked ? "yes" : ""}))} className="mt-1" />
            <label htmlFor={id("clientSharingConsent")} className="font-sans text-sm text-navy/80">{t("Client sharing authorization: I confirm that my client authorized me to share these details with Carlos Uzcategui for this referral and its coordination.", "Autorización del cliente: confirmo que mi cliente me autorizó a compartir estos datos con Carlos Uzcategui para esta referencia y su coordinación.")}</label>
          </div>
        </fieldset>}
        <Field id={id("clientSummary")} label={clientReferral ? t("Client requirements / context *", "Necesidades / contexto del cliente *") : t("Cooperation interests / message", "Interés de colaboración / mensaje")}>
          <textarea id={id("clientSummary")} name="clientSummary" required={clientReferral} rows={4} className="form-input" value={form.clientSummary} onChange={set("clientSummary")} />
        </Field>
        {status === "error" && <p role="alert" className="font-sans text-sm text-red-600">{err}</p>}
        <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-gold disabled:opacity-60">
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? t("Sending…", "Enviando…") : clientReferral ? t("Register client referral", "Registrar cliente referido") : t("Submit professional registration", "Enviar registro profesional")}
        </button>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">{t("Confidential · Professional review · Written agreements", "Confidencial · Revisión profesional · Acuerdos escritos")} · {CONTACT.shortLicense}</p>
      </form>
    </div>
  );
}
function Field({id, label, children}: {id: string; label: string; children: React.ReactNode}) {
  return <div className="flex flex-col gap-1.5"><label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">{label}</label>{children}</div>;
}
