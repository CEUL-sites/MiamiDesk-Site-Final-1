import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Send,
  Upload,
  UserRoundSearch,
  Warehouse,
} from "lucide-react";
import { pushEvent, trackLead } from "../../lib/analytics";
import { getAttribution } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";
import type { GlobalDeskLang } from "../../pages/globalDeskContent";

const FORM_NAME = "global-desk-listing";

const L = {
  en: {
    step: "Step",
    of: "of",
    choose: "Choose the opportunity",
    basics: "Tell us a few basics",
    detail: "Add the information needed for review",
    intro: "Choose one path. The first step requests only your contact details; no upload is required.",
    paths: [
      ["inventory", "Submit Qualified Inventory", "One selected residence, second home or other qualified property."],
      ["mandate", "Developer / Agency Mandate", "A development, portfolio or recurring inventory relationship."],
      ["buyer_opportunity", "South Florida Agent / Buyer Opportunity", "A represented buyer with interest in international property."],
    ],
    name: "Name",
    company: "Company / brokerage",
    email: "Email",
    phone: "WhatsApp / phone",
    continue: "Continue",
    back: "Back",
    requiredStart: "Choose a path and provide your name, email and phone to continue.",
    jurisdiction: "Country / jurisdiction",
    credential: "License, registration or professional credential",
    website: "Company or project website",
    inventoryCount: "Approximate inventory count",
    inventoryMarkets: "Property locations / markets",
    inventorySummary: "Inventory or mandate summary",
    authority: "Authority / mandate status",
    authorityOptions: [
      ["", "Select"],
      ["exclusive", "Exclusive mandate in place"],
      ["authorized", "Documented authority to present"],
      ["developer_inventory", "Developer-owned / authorized inventory"],
      ["review", "Authority available for review"],
    ],
    propertyLocation: "Property location",
    propertyType: "Property type",
    price: "Asking price / value with currency",
    description: "Property summary",
    buyerProperty: "Property or project of interest",
    budget: "Buyer budget with currency",
    timing: "Purchase timing",
    representation: "Buyer representation status",
    representationOptions: [
      ["", "Select"],
      ["represented_by_me", "Represented by me / my brokerage"],
      ["referral_ready", "Formal referral handoff requested"],
      ["introducer", "Professional introducer; structure to be reviewed"],
    ],
    cooperation: "Preferred cooperation path",
    cooperationOptions: [
      ["", "Select"],
      ["remain_involved", "Remain Involved With My Client"],
      ["refer_transfer", "Refer and Transfer the Client"],
    ],
    financial: "Financial readiness",
    financialOptions: [
      ["", "Select"],
      ["inquiry", "Inquiry — qualification still required"],
      ["qualified", "Buyer context and budget established"],
      ["proof_of_funds", "Proof of funds available"],
      ["lender_preapproval", "Actual lender preapproval available"],
    ],
    notes: "Additional context",
    images: "Property images",
    documents: "Supporting documents",
    optional: "Optional; uploads are never required on the first step.",
    authorization:
      "I confirm that I own, represent or have valid authority to present this opportunity for review.",
    buyerAuthorization:
      "I confirm that I have authority to discuss this buyer opportunity and provide the information submitted.",
    consent:
      "I understand that activation, registration protection, referrals and compensation require applicable written agreements and brokerage approval.",
    submit: "Submit for review",
    submitting: "Submitting",
    success:
      "Received. Carlos will review the opportunity and respond with the appropriate qualification and cooperation path.",
    error: "The request could not be submitted. Please try again or contact Carlos by WhatsApp.",
    timeout: "The request timed out. Please contact Carlos by WhatsApp.",
    confirm: "Confirm the authorization and cooperation terms to continue.",
  },
  es: {
    step: "Paso",
    of: "de",
    choose: "Elija la oportunidad",
    basics: "Indique unos datos básicos",
    detail: "Añada la información necesaria para la revisión",
    intro: "Elija una ruta. El primer paso solicita solo sus datos de contacto; no requiere archivos.",
    paths: [
      ["inventory", "Presentar inventario cualificado", "Una residencia, segunda vivienda u otro inmueble cualificado."],
      ["mandate", "Mandato de promotora / agencia", "Una promoción, cartera o relación con inventario recurrente."],
      ["buyer_opportunity", "Agente del sur de Florida / oportunidad de comprador", "Un comprador representado con interés en un inmueble internacional."],
    ],
    name: "Nombre",
    company: "Empresa / brokerage",
    email: "Correo electrónico",
    phone: "WhatsApp / teléfono",
    continue: "Continuar",
    back: "Volver",
    requiredStart: "Elija una ruta e indique nombre, correo y teléfono para continuar.",
    jurisdiction: "País / jurisdicción",
    credential: "Licencia, registro o credencial profesional",
    website: "Web de la empresa o promoción",
    inventoryCount: "Volumen aproximado de inventario",
    inventoryMarkets: "Ubicaciones / mercados del inventario",
    inventorySummary: "Resumen del inventario o mandato",
    authority: "Situación de autorización / mandato",
    authorityOptions: [
      ["", "Seleccione"],
      ["exclusive", "Mandato exclusivo vigente"],
      ["authorized", "Autorización documentada para presentar"],
      ["developer_inventory", "Inventario propio o autorizado por la promotora"],
      ["review", "Autorización disponible para revisión"],
    ],
    propertyLocation: "Ubicación del inmueble",
    propertyType: "Tipo de inmueble",
    price: "Precio / valor con divisa",
    description: "Resumen del inmueble",
    buyerProperty: "Inmueble o promoción de interés",
    budget: "Presupuesto del comprador con divisa",
    timing: "Plazo de compra",
    representation: "Situación de representación del comprador",
    representationOptions: [
      ["", "Seleccione"],
      ["represented_by_me", "Representado por mí / mi brokerage"],
      ["referral_ready", "Se solicita un referral formal"],
      ["introducer", "Introductor profesional; estructura por revisar"],
    ],
    cooperation: "Ruta de cooperación preferida",
    cooperationOptions: [
      ["", "Seleccione"],
      ["remain_involved", "Continuar involucrado con mi cliente"],
      ["refer_transfer", "Referir y transferir al cliente"],
    ],
    financial: "Preparación financiera",
    financialOptions: [
      ["", "Seleccione"],
      ["inquiry", "Consulta — aún requiere cualificación"],
      ["qualified", "Contexto y presupuesto establecidos"],
      ["proof_of_funds", "Prueba de fondos disponible"],
      ["lender_preapproval", "Preaprobación real de prestamista disponible"],
    ],
    notes: "Contexto adicional",
    images: "Imágenes del inmueble",
    documents: "Documentación de apoyo",
    optional: "Opcional; nunca se solicitan archivos en el primer paso.",
    authorization:
      "Confirmo que soy propietario, representante o que tengo autorización válida para presentar esta oportunidad.",
    buyerAuthorization:
      "Confirmo que tengo autorización para tratar esta oportunidad de comprador y aportar la información indicada.",
    consent:
      "Entiendo que la activación, protección del registro, referrals y compensación requieren los acuerdos escritos aplicables y aprobación del brokerage.",
    submit: "Enviar para revisión",
    submitting: "Enviando",
    success:
      "Recibido. Carlos revisará la oportunidad y responderá con la ruta de cualificación y cooperación adecuada.",
    error: "No se pudo enviar la solicitud. Inténtelo de nuevo o contacte con Carlos por WhatsApp.",
    timeout: "La solicitud ha caducado. Contacte con Carlos por WhatsApp.",
    confirm: "Confirme la autorización y las condiciones de cooperación para continuar.",
  },
} as const;

type EntryPath = "" | "inventory" | "mandate" | "buyer_opportunity";
type FormStatus = "idle" | "submitting" | "success" | "error";

export function GlobalDeskListingForm({ lang }: { lang: GlobalDeskLang }) {
  const t = L[lang];
  const [stage, setStage] = useState<1 | 2>(1);
  const [entryPath, setEntryPath] = useState<EntryPath>("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const startFired = useRef(false);
  const renderedAt = useRef(Date.now());
  const formElementRef = useRef<HTMLFormElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const attribution = getAttribution();

  useEffect(() => {
    if (stage === 2) detailHeadingRef.current?.focus();
  }, [stage]);

  const set = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleFocus = () => {
    if (startFired.current || navigator.webdriver) return;
    startFired.current = true;
    pushEvent("form_start", {
      form_name: FORM_NAME,
      page_path: window.location.pathname,
      funnel_stage: "consideration",
    });
  };

  const advance = () => {
    if (!formElementRef.current?.reportValidity() || !entryPath) {
      setError(t.requiredStart);
      setStatus("error");
      return;
    }
    setError("");
    setStatus("idle");
    setStage(2);
    pushEvent("global_desk_intake_step1", { entry_path: entryPath, language: lang });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authorized || !consented) {
      setError(t.confirm);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    const payload = new FormData();
    payload.append("form-name", FORM_NAME);
    payload.append("bot-field", "");
    payload.append("formRenderedAt", String(renderedAt.current));
    payload.append("entryPath", entryPath);
    payload.append("listPath", entryPath);
    payload.append("submitterType", entryPath === "buyer_opportunity" ? "agent" : entryPath);
    payload.append("language", lang);
    payload.append("sourcePage", window.location.pathname);
    payload.append("authorization", authorized ? "yes" : "");
    payload.append("consent", consented ? "yes" : "");
    Object.entries(form).forEach(([key, value]) => payload.append(key, String(value)));
    Object.entries(attribution).forEach(([key, value]) => payload.append(key, String(value)));
    images.forEach((file) => payload.append("images", file, file.name));
    documents.forEach((file) => payload.append("documents", file, file.name));

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: payload,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("submission_failed");

      notifyLeadDirect({
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        city: form.jurisdiction || form.propertyLocation || "",
        propertyAddress: form.propertyLocation || form.buyerProperty || "",
        timeline: form.timing || "",
        message: [
          `Global Desk · ${entryPath}`,
          form.inventorySummary,
          form.description,
          form.notes,
          form.budget ? `Budget: ${form.budget}` : "",
          form.cooperation ? `Cooperation: ${form.cooperation}` : "",
        ].filter(Boolean).join(" · "),
        sourcePage: window.location.pathname,
        leadSource: [attribution.utm_source, attribution.utm_medium, attribution.utm_campaign]
          .filter(Boolean)
          .join(" / "),
        formName: FORM_NAME,
        botField: "",
        formRenderedAt: String(renderedAt.current),
      });

      void fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: FORM_NAME,
          name: form.name || "",
          email: form.email || "",
          language: lang,
        }),
      }).catch(() => {});

      trackLead(entryPath === "buyer_opportunity" ? "buyer" : "agent", {
        form: FORM_NAME,
        language: lang,
        entry_path: entryPath,
      });
      pushEvent("form_submit_global_desk_listing", {
        language: lang,
        entry_path: entryPath,
      });
      setStatus("success");
    } catch (caught: unknown) {
      setError((caught as { name?: string }).name === "AbortError" ? t.timeout : t.error);
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gold/35 bg-white px-6 py-14 text-center shadow-sm">
        <CheckCircle2 size={42} strokeWidth={1.5} className="mx-auto text-gold-ink" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-2xl font-serif text-2xl leading-relaxed text-navy">{t.success}</p>
      </div>
    );
  }

  return (
    <form
      ref={formElementRef}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onFocus={handleFocus}
      onSubmit={handleSubmit}
      className="bg-white shadow-[0_20px_65px_rgba(11,30,63,0.08)]"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="formRenderedAt" value={String(renderedAt.current)} />
      <input type="hidden" name="sourcePage" value={typeof window === "undefined" ? "" : window.location.pathname} />
      {Object.entries(attribution).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-b border-navy/12 px-6 py-7 md:px-10">
        <div className="flex items-center justify-between gap-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink">
            {t.step} {stage} {t.of} 2
          </p>
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-1 w-12 bg-gold" />
            <span className={`h-1 w-12 ${stage === 2 ? "bg-gold" : "bg-navy/12"}`} />
          </div>
        </div>
        <h3
          ref={detailHeadingRef}
          tabIndex={stage === 2 ? -1 : undefined}
          className="mt-4 font-serif text-2xl text-navy md:text-3xl"
        >
          {stage === 1 ? t.choose : t.detail}
        </h3>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-navy/62">{t.intro}</p>
      </div>

      <div className="space-y-9 px-6 py-8 md:px-10 md:py-10">
        {stage === 1 ? (
          <>
            <fieldset>
              <legend className="sr-only">{t.choose}</legend>
              <div className="grid gap-3 md:grid-cols-3">
                {t.paths.map(([value, label, description], index) => {
                  const Icon = [Warehouse, Building2, UserRoundSearch][index];
                  return (
                    <label
                      key={value}
                      className={`cursor-pointer border p-5 transition-colors focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 ${
                        entryPath === value
                          ? "border-gold bg-gold/[0.08]"
                          : "border-navy/14 hover:border-gold/55"
                      }`}
                    >
                      <input
                        type="radio"
                        name="entryPath"
                        required
                        value={value}
                        checked={entryPath === value}
                        onChange={() => setEntryPath(value as EntryPath)}
                        className="sr-only"
                      />
                      <Icon size={23} strokeWidth={1.4} className="text-gold-ink" aria-hidden="true" />
                      <span className="mt-5 block font-serif text-xl leading-tight text-navy">{label}</span>
                      <span className="mt-3 block font-sans text-sm leading-relaxed text-navy/62">{description}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy/55">
                {t.basics}
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t.name} required>
                  <input required name="name" type="text" value={form.name || ""} onChange={set("name")} className="gd-input" autoComplete="name" />
                </Field>
                <Field label={t.company}>
                  <input name="company" type="text" value={form.company || ""} onChange={set("company")} className="gd-input" autoComplete="organization" />
                </Field>
                <Field label={t.email} required>
                  <input required name="email" type="email" value={form.email || ""} onChange={set("email")} className="gd-input" autoComplete="email" />
                </Field>
                <Field label={t.phone} required>
                  <input required name="phone" type="tel" value={form.phone || ""} onChange={set("phone")} className="gd-input" autoComplete="tel" />
                </Field>
              </div>
            </div>

            {status === "error" && error ? <ErrorMessage>{error}</ErrorMessage> : null}
            <button
              type="button"
              onClick={advance}
              className="flex min-h-12 w-full items-center justify-center gap-2 bg-navy-deep px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
            >
              {t.continue}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </>
        ) : null}

        {stage === 2 ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={t.jurisdiction} required>
                <input required name="jurisdiction" type="text" value={form.jurisdiction || ""} onChange={set("jurisdiction")} className="gd-input" />
              </Field>
              <Field label={t.credential}>
                <input name="credential" type="text" value={form.credential || ""} onChange={set("credential")} className="gd-input" />
              </Field>
            </div>

            {entryPath === "inventory" ? (
              <div className="grid gap-5 border-t border-navy/12 pt-8 md:grid-cols-2">
                <Field label={t.authority} required>
                  <Select required name="authority" value={form.authority || ""} onChange={set("authority")} options={t.authorityOptions} />
                </Field>
                <Field label={t.propertyLocation} required>
                  <input required name="propertyLocation" type="text" value={form.propertyLocation || ""} onChange={set("propertyLocation")} className="gd-input" />
                </Field>
                <Field label={t.propertyType} required>
                  <input required name="propertyType" type="text" value={form.propertyType || ""} onChange={set("propertyType")} className="gd-input" />
                </Field>
                <Field label={t.price} required>
                  <input required name="price" type="text" value={form.price || ""} onChange={set("price")} className="gd-input" />
                </Field>
                <Field label={t.description} required full>
                  <textarea required name="description" rows={4} value={form.description || ""} onChange={set("description")} className="gd-input" />
                </Field>
                <FileField label={t.images} hint={t.optional} fieldName="images" files={images} onFiles={setImages} />
                <FileField label={t.documents} hint={t.optional} fieldName="documents" files={documents} onFiles={setDocuments} />
              </div>
            ) : null}

            {entryPath === "mandate" ? (
              <div className="grid gap-5 border-t border-navy/12 pt-8 md:grid-cols-2">
                <Field label={t.website}>
                  <input name="website" type="url" value={form.website || ""} onChange={set("website")} className="gd-input" />
                </Field>
                <Field label={t.inventoryCount} required>
                  <input required name="inventoryCount" type="text" value={form.inventoryCount || ""} onChange={set("inventoryCount")} className="gd-input" />
                </Field>
                <Field label={t.inventoryMarkets} required full>
                  <input required name="inventoryMarkets" type="text" value={form.inventoryMarkets || ""} onChange={set("inventoryMarkets")} className="gd-input" />
                </Field>
                <Field label={t.inventorySummary} required full>
                  <textarea required name="inventorySummary" rows={5} value={form.inventorySummary || ""} onChange={set("inventorySummary")} className="gd-input" />
                </Field>
              </div>
            ) : null}

            {entryPath === "buyer_opportunity" ? (
              <div className="grid gap-5 border-t border-navy/12 pt-8 md:grid-cols-2">
                <Field label={t.buyerProperty} required full>
                  <input required name="buyerProperty" type="text" value={form.buyerProperty || ""} onChange={set("buyerProperty")} className="gd-input" />
                </Field>
                <Field label={t.budget} required>
                  <input required name="budget" type="text" value={form.budget || ""} onChange={set("budget")} className="gd-input" />
                </Field>
                <Field label={t.timing} required>
                  <input required name="timing" type="text" value={form.timing || ""} onChange={set("timing")} className="gd-input" />
                </Field>
                <Field label={t.representation} required>
                  <Select required name="representation" value={form.representation || ""} onChange={set("representation")} options={t.representationOptions} />
                </Field>
                <Field label={t.cooperation} required>
                  <Select required name="cooperation" value={form.cooperation || ""} onChange={set("cooperation")} options={t.cooperationOptions} />
                </Field>
                <Field label={t.financial} required full>
                  <Select required name="financialReadiness" value={form.financialReadiness || ""} onChange={set("financialReadiness")} options={t.financialOptions} />
                </Field>
                <Field label={t.notes} full>
                  <textarea name="notes" rows={4} value={form.notes || ""} onChange={set("notes")} className="gd-input" />
                </Field>
              </div>
            ) : null}

            <div className="space-y-4 border-t border-navy/12 pt-8">
              <CheckField
                name="authorization"
                checked={authorized}
                onChange={setAuthorized}
                label={entryPath === "buyer_opportunity" ? t.buyerAuthorization : t.authorization}
              />
              <CheckField name="consent" checked={consented} onChange={setConsented} label={t.consent} />
            </div>

            {status === "error" && error ? <ErrorMessage>{error}</ErrorMessage> : null}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  setStage(1);
                  setError("");
                  setStatus("idle");
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-navy/20 px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-gold"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                {t.back}
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:text-navy-deep disabled:opacity-60"
              >
                {status === "submitting" ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  full = false,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${full ? "md:col-span-2" : ""}`}>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-navy/58">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function Select({
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly (readonly [string, string])[];
  required?: boolean;
}) {
  return (
    <select required={required} name={name} value={value} onChange={onChange} className="gd-input">
      {options.map(([optionValue, label]) => (
        <option key={`${name}-${optionValue}`} value={optionValue}>{label}</option>
      ))}
    </select>
  );
}

function CheckField({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3">
      <input
        required
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#B08D57]"
      />
      <span className="font-sans text-xs leading-[1.7] text-navy/62">{label}</span>
    </label>
  );
}

function FileField({
  label,
  hint,
  fieldName,
  files,
  onFiles,
}: {
  label: string;
  hint: string;
  fieldName: string;
  files: File[];
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="md:col-span-1">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-navy/58">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-2 inline-flex min-h-11 items-center gap-2 border border-navy/20 px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold"
      >
        <Upload size={14} aria-hidden="true" />
        {files.length ? `${files.length} file(s)` : label}
      </button>
      <p className="mt-2 font-sans text-[11px] leading-relaxed text-navy/48">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        name={fieldName}
        multiple
        accept={fieldName === "images" ? "image/*" : "image/*,application/pdf,.pdf,.doc,.docx"}
        onChange={(event) => onFiles(Array.from(event.target.files ?? []))}
        className="hidden"
      />
    </div>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="border-l-2 border-red-600 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
      {children}
    </p>
  );
}
