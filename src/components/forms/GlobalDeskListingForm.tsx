import React, { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send, Upload } from "lucide-react";
import { pushEvent } from "../../lib/analytics";
import { notifyLeadDirect } from "../../lib/leadNotify";

type Lang = "es" | "en";

const FORM_NAME = "global-desk-listing";

// Bilingual labels. Spanish is primary; English mirrors via toggle.
const L = {
  es: {
    kicker: "Solicitud de listado · Sección internacional del Miami MLS",
    title: "Envíe una solicitud de listado",
    intro:
      "Una sola propiedad es válida. No se requiere una cartera. Carlos revisa cada solicitud antes de responder con una propuesta a medida.",
    // Q1
    q1: "Tipo de solicitante",
    q1opts: [
      ["agency", "Agencia inmobiliaria con licencia"],
      ["developer", "Promotor"],
      ["owner", "Propietario"],
      ["agent", "Agente individual"],
    ],
    // Q2
    q2: "¿Cómo desea listar?",
    q2opts: [
      ["exclusive", "En exclusiva — una o varias propiedades concretas (sin cuota mensual)"],
      ["placement_plan", "Plan de colocación — cartera de propiedades"],
      ["advise_me", "No estoy seguro, asesórenme"],
    ],
    // Submitter block
    submitterBlock: "Datos del solicitante",
    name: "Nombre",
    company: "Empresa / agencia",
    email: "Correo electrónico",
    phone: "WhatsApp / teléfono (con código de país)",
    jurisdiction: "Jurisdicción (país + región)",
    // Agency / agent
    license: "Número de licencia / colegiación",
    licenseHint: "Mantiene la cooperación de referidos broker a broker.",
    existingMandate: "¿Mandato existente?",
    exclusiveAvailable: "¿Exclusiva disponible?",
    yes: "Sí",
    no: "No",
    // Developer
    projectName: "Nombre del proyecto / promoción",
    units: "Número de unidades",
    // Count
    propertyCount: "Número de propiedades a listar",
    propertyCountHint: "Un número o un rango (1, 3–5, 10+).",
    // Plan interest
    planInterest: "Plan de interés (opcional)",
    planOpts: [
      ["", "Seleccione…"],
      ["placement", "Colocación"],
      ["placement_outreach", "Colocación + Difusión"],
      ["developer_desk", "Mesa de Promotor"],
    ],
    // Property block
    propertyBlock: "Datos de la propiedad",
    location: "Ubicación (ciudad, zona, país)",
    type: "Tipo",
    typeOpts: [
      ["", "Seleccione…"],
      ["apartment", "Apartamento"],
      ["villa", "Villa"],
      ["penthouse", "Ático"],
      ["new_build", "Obra nueva"],
      ["plot", "Parcela / solar"],
      ["other", "Otro"],
    ],
    condition: "Obra nueva o segunda mano",
    conditionOpts: [
      ["", "Seleccione…"],
      ["new_build", "Obra nueva"],
      ["resale", "Segunda mano"],
    ],
    askingPrice: "Precio / valor de salida (con divisa)",
    askingPriceHint: "Precio de la propiedad — permitido.",
    bedrooms: "Dormitorios",
    bathrooms: "Baños",
    builtArea: "Superficie construida (m²)",
    plotArea: "Superficie de parcela (m²) (si aplica)",
    features: "Características destacadas (texto libre)",
    description: "Descripción / observaciones",
    images: "Imágenes",
    imagesHint: "Selección múltiple.",
    documents: "Planos / documentos (opcional)",
    documentsHint: "Selección múltiple.",
    timeline: "Plazo de listado deseado",
    chooseFiles: "Seleccionar archivos",
    filesSelected: (n: number) => `${n} archivo(s) seleccionado(s)`,
    // Checkboxes
    authorization:
      "Confirmo que tengo autoridad o mandato para listar esta propiedad y autorizo su colocación para revisión.",
    consent: "Entiendo que todos los términos comerciales se tratan de forma privada.",
    submit: "Enviar solicitud de listado",
    submitting: "Enviando…",
    success:
      "Recibido. Recibirá una propuesta de cooperación y colocación a medida tras la revisión.",
    errAuth: "Debe confirmar la autorización y el consentimiento para continuar.",
    errImages: "Añada al menos una imagen de la propiedad.",
    errGeneric: "No se pudo enviar. Escriba por WhatsApp o correo.",
    errTimeout: "La solicitud expiró. Escriba a Carlos por WhatsApp.",
    optional: "(opcional)",
    select: "Seleccione…",
  },
  en: {
    kicker: "Listing request · Miami MLS international section",
    title: "Submit a listing request",
    intro:
      "A single property is valid. A portfolio is not required. Carlos reviews every request before responding with a tailored proposal.",
    q1: "Submitter type",
    q1opts: [
      ["agency", "Licensed real estate agency"],
      ["developer", "Property developer"],
      ["owner", "Property owner"],
      ["agent", "Individual agent"],
    ],
    q2: "How would you like to list?",
    q2opts: [
      ["exclusive", "Exclusive — one or specific properties (no monthly fee)"],
      ["placement_plan", "Placement plan — portfolio"],
      ["advise_me", "Not sure — advise me"],
    ],
    submitterBlock: "Submitter details",
    name: "Name",
    company: "Company / agency",
    email: "Email",
    phone: "WhatsApp / phone (country code)",
    jurisdiction: "Jurisdiction (country + region)",
    license: "License / registration number",
    licenseHint: "Keeps referral cooperation broker-to-broker.",
    existingMandate: "Existing mandate?",
    exclusiveAvailable: "Exclusive available?",
    yes: "Yes",
    no: "No",
    projectName: "Project / development name",
    units: "Number of units",
    propertyCount: "Number of properties you intend to list",
    propertyCountHint: "A single number or a range (1, 3–5, 10+).",
    planInterest: "Plan interest (optional)",
    planOpts: [
      ["", "Select…"],
      ["placement", "Placement"],
      ["placement_outreach", "Placement + Outreach"],
      ["developer_desk", "Developer Desk"],
    ],
    propertyBlock: "Property details",
    location: "Location (city, area, country)",
    type: "Type",
    typeOpts: [
      ["", "Select…"],
      ["apartment", "Apartment"],
      ["villa", "Villa"],
      ["penthouse", "Penthouse"],
      ["new_build", "New-build"],
      ["plot", "Plot"],
      ["other", "Other"],
    ],
    condition: "New-build or resale",
    conditionOpts: [
      ["", "Select…"],
      ["new_build", "New-build"],
      ["resale", "Resale"],
    ],
    askingPrice: "Asking price / value (with currency)",
    askingPriceHint: "Property price — allowed.",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    builtArea: "Built area (m²)",
    plotArea: "Plot area (m²) (if applicable)",
    features: "Key features (free text)",
    description: "Description / remarks",
    images: "Images",
    imagesHint: "Multiple files.",
    documents: "Floor plans / documents (optional)",
    documentsHint: "Multiple files.",
    timeline: "Desired listing timeline",
    chooseFiles: "Choose files",
    filesSelected: (n: number) => `${n} file(s) selected`,
    authorization:
      "I confirm I have authority or mandate to list this property and authorize its placement for review.",
    consent: "I understand all commercial terms are handled privately.",
    submit: "Submit listing request",
    submitting: "Submitting…",
    success:
      "Received. You will receive a tailored cooperation and placement proposal after review.",
    errAuth: "Please confirm the authorization and consent to proceed.",
    errImages: "Please add at least one property image.",
    errGeneric: "Could not submit. Please try WhatsApp or email.",
    errTimeout: "Request timed out. Please WhatsApp Carlos directly.",
    optional: "(optional)",
    select: "Select…",
  },
} as const;

type SubmitterType = "" | "agency" | "developer" | "owner" | "agent";
type ListPath = "" | "exclusive" | "placement_plan" | "advise_me";

export function GlobalDeskListingForm({ lang }: { lang: Lang }) {
  const t = L[lang];
  const [submitterType, setSubmitterType] = useState<SubmitterType>("");
  const [listPath, setListPath] = useState<ListPath>("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const startFired = useRef(false);

  const isAgencyOrAgent = submitterType === "agency" || submitterType === "agent";
  const isDeveloper = submitterType === "developer";
  const showPlanInterest = listPath === "placement_plan" || listPath === "advise_me";

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFocus = () => {
    if (startFired.current || navigator.webdriver) return;
    startFired.current = true;
    pushEvent("form_start", {
      form_name: FORM_NAME,
      page_path: window.location.pathname,
      funnel_stage: "consideration",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setErr(t.errImages);
      setStatus("error");
      return;
    }
    if (!authorized || !consented) {
      setErr(t.errAuth);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErr("");

    const fd = new FormData();
    fd.append("form-name", FORM_NAME);
    fd.append("bot-field", "");
    fd.append("submitterType", submitterType);
    fd.append("listPath", listPath);
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    fd.append("authorization", authorized ? "yes" : "");
    fd.append("consent", consented ? "yes" : "");
    fd.append("language", lang);
    fd.append("sourcePage", window.location.pathname);
    images.forEach((file) => fd.append("images", file, file.name));
    documents.forEach((file) => fd.append("documents", file, file.name));

    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch("/", { method: "POST", body: fd, signal: ctrl.signal });
      if (!res.ok) throw new Error("submission_failed");

      notifyLeadDirect({
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        city: form.jurisdiction || form.location || "",
        propertyAddress: form.location || "",
        message:
          `Global Desk listing · ${submitterType || "—"} · ${listPath || "—"} · ` +
          `Properties: ${form.propertyCount || "—"} · ${form.type || ""} · ${form.askingPrice || ""} · ` +
          `${images.length} image(s), ${documents.length} doc(s)`,
        sourcePage: FORM_NAME,
      });

      // Auto-acknowledgment email in the submitter's chosen language.
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: FORM_NAME,
          name: form.name || "",
          email: form.email || "",
          language: lang,
        }),
      }).catch(() => {});

      pushEvent("form_submit_global_desk_listing", { language: lang, submitter_type: submitterType });
      setStatus("success");
    } catch (e: unknown) {
      setErr((e as { name?: string }).name === "AbortError" ? t.errTimeout : t.errGeneric);
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-white/[0.04] p-10 text-center">
        <CheckCircle2 size={40} className="mx-auto text-gold" />
        <p className="mx-auto mt-5 max-w-xl font-serif text-xl leading-relaxed text-white">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-white/[0.02]">
      <div className="border-b border-white/10 bg-white/[0.03] px-6 py-6 md:px-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">{t.kicker}</p>
        <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">{t.title}</h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-white/55">{t.intro}</p>
      </div>

      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        onFocus={handleFocus}
        className="space-y-8 p-6 md:p-8"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Q1 — Submitter type (routes the rest) */}
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {t.q1} *
          </legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.q1opts.map(([val, label]) => (
              <label
                key={val}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 font-sans text-sm transition-colors ${
                  submitterType === val
                    ? "border-gold bg-gold/10 text-white"
                    : "border-white/12 text-white/65 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="submitterType"
                  value={val}
                  required
                  checked={submitterType === val}
                  onChange={() => setSubmitterType(val as SubmitterType)}
                  className="h-4 w-4 flex-shrink-0 accent-gold"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Q2 — Engagement path */}
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {t.q2} *
          </legend>
          <div className="mt-4 space-y-2">
            {t.q2opts.map(([val, label]) => (
              <label
                key={val}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 font-sans text-sm transition-colors ${
                  listPath === val
                    ? "border-gold bg-gold/10 text-white"
                    : "border-white/12 text-white/65 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="listPath"
                  value={val}
                  required
                  checked={listPath === val}
                  onChange={() => setListPath(val as ListPath)}
                  className="h-4 w-4 flex-shrink-0 accent-gold"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Submitter block */}
        <div className="border-t border-white/10 pt-7">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            {t.submitterBlock}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={`${t.name} *`}>
              <input required name="name" type="text" className="form-input-dark" value={form.name || ""} onChange={set("name")} />
            </Field>
            <Field label={t.company}>
              <input name="company" type="text" className="form-input-dark" value={form.company || ""} onChange={set("company")} />
            </Field>
            <Field label={`${t.email} *`}>
              <input required name="email" type="email" className="form-input-dark" value={form.email || ""} onChange={set("email")} />
            </Field>
            <Field label={`${t.phone} *`}>
              <input required name="phone" type="tel" placeholder="+34 600 000 000" className="form-input-dark" value={form.phone || ""} onChange={set("phone")} />
            </Field>
            <Field label={`${t.jurisdiction} *`} full>
              <input required name="jurisdiction" type="text" placeholder="España · Madrid" className="form-input-dark" value={form.jurisdiction || ""} onChange={set("jurisdiction")} />
            </Field>
          </div>
        </div>

        {/* Conditional: licensed agency or individual agent */}
        {isAgencyOrAgent && (
          <div className="border-t border-white/10 pt-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* License number keeps referral cooperation broker-to-broker. */}
              <Field label={`${t.license} *`} hint={t.licenseHint} full>
                <input required name="license" type="text" className="form-input-dark" value={form.license || ""} onChange={set("license")} />
              </Field>
              <YesNo label={t.existingMandate} name="existingMandate" t={t} value={form.existingMandate || ""} onChange={set("existingMandate")} />
              <YesNo label={t.exclusiveAvailable} name="exclusiveAvailable" t={t} value={form.exclusiveAvailable || ""} onChange={set("exclusiveAvailable")} />
            </div>
          </div>
        )}

        {/* Conditional: developer */}
        {isDeveloper && (
          <div className="border-t border-white/10 pt-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.projectName}>
                <input name="projectName" type="text" className="form-input-dark" value={form.projectName || ""} onChange={set("projectName")} />
              </Field>
              <Field label={`${t.units} *`}>
                <input required name="units" type="text" className="form-input-dark" value={form.units || ""} onChange={set("units")} />
              </Field>
            </div>
          </div>
        )}

        {/* Property count (all) + plan interest (conditional) */}
        <div className="border-t border-white/10 pt-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t.propertyCount} hint={t.propertyCountHint}>
              <input name="propertyCount" type="text" placeholder="1, 3–5, 10+" className="form-input-dark" value={form.propertyCount || ""} onChange={set("propertyCount")} />
            </Field>
            {showPlanInterest && (
              <Field label={t.planInterest}>
                <select name="planInterest" className="form-input-dark w-full" value={form.planInterest || ""} onChange={set("planInterest")}>
                  {t.planOpts.map(([val, label]) => (
                    <option key={label} value={val}>{label}</option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        </div>

        {/* Property block */}
        <div className="border-t border-white/10 pt-7">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            {t.propertyBlock}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={`${t.location} *`} full>
              <input required name="location" type="text" className="form-input-dark" value={form.location || ""} onChange={set("location")} />
            </Field>
            <Field label={`${t.type} *`}>
              <select required name="type" className="form-input-dark w-full" value={form.type || ""} onChange={set("type")}>
                {t.typeOpts.map(([val, label]) => (
                  <option key={label} value={val}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label={t.condition}>
              <select name="condition" className="form-input-dark w-full" value={form.condition || ""} onChange={set("condition")}>
                {t.conditionOpts.map(([val, label]) => (
                  <option key={label} value={val}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label={`${t.askingPrice} *`} hint={t.askingPriceHint} full>
              <input required name="askingPrice" type="text" placeholder="€ / $ / £" className="form-input-dark" value={form.askingPrice || ""} onChange={set("askingPrice")} />
            </Field>
            <Field label={t.bedrooms}>
              <input name="bedrooms" type="text" inputMode="numeric" className="form-input-dark" value={form.bedrooms || ""} onChange={set("bedrooms")} />
            </Field>
            <Field label={t.bathrooms}>
              <input name="bathrooms" type="text" inputMode="numeric" className="form-input-dark" value={form.bathrooms || ""} onChange={set("bathrooms")} />
            </Field>
            <Field label={`${t.builtArea} *`}>
              <input required name="builtArea" type="text" inputMode="numeric" className="form-input-dark" value={form.builtArea || ""} onChange={set("builtArea")} />
            </Field>
            <Field label={t.plotArea}>
              <input name="plotArea" type="text" inputMode="numeric" className="form-input-dark" value={form.plotArea || ""} onChange={set("plotArea")} />
            </Field>
            <Field label={t.features} full>
              <input name="features" type="text" className="form-input-dark" value={form.features || ""} onChange={set("features")} />
            </Field>
            <Field label={`${t.description} *`} full>
              <textarea required name="description" rows={5} className="form-input-dark" value={form.description || ""} onChange={set("description")} />
            </Field>
            <FileField
              label={`${t.images} *`}
              hint={t.imagesHint}
              chooseLabel={t.chooseFiles}
              countLabel={t.filesSelected}
              accept="image/*"
              fieldName="images"
              files={images}
              onFiles={setImages}
              full
            />
            <FileField
              label={`${t.documents}`}
              hint={t.documentsHint}
              chooseLabel={t.chooseFiles}
              countLabel={t.filesSelected}
              accept="image/*,application/pdf,.pdf,.doc,.docx"
              fieldName="documents"
              files={documents}
              onFiles={setDocuments}
              full
            />
            <Field label={t.timeline} full>
              <input name="timeline" type="text" className="form-input-dark" value={form.timeline || ""} onChange={set("timeline")} />
            </Field>
          </div>
        </div>

        {/* Authorization + consent */}
        <div className="space-y-4 border-t border-white/10 pt-7">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="authorization"
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold"
              checked={authorized}
              onChange={(e) => setAuthorized(e.target.checked)}
            />
            <span className="font-sans text-xs leading-relaxed text-white/55">{t.authorization} *</span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
            />
            <span className="font-sans text-xs leading-relaxed text-white/55">{t.consent} *</span>
          </label>
        </div>

        {status === "error" && err && <p className="font-sans text-sm text-red-400">{err}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-3 bg-gold py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-navy-deep transition-all hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  );
}

function Field({
  label, hint, full, children,
}: { label: string; hint?: string; full?: boolean; children: React.ReactNode }) {
  // The control is nested inside the <label>, giving every input/select a
  // programmatic label (implicit association) without needing per-field ids.
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">{label}</span>
      {children}
      {hint && <p className="font-sans text-[11px] leading-snug text-white/55">{hint}</p>}
    </label>
  );
}

function YesNo({
  label, name, value, onChange, t,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  t: (typeof L)[Lang];
}) {
  return (
    <Field label={label}>
      <select name={name} className="form-input-dark w-full" value={value} onChange={onChange}>
        <option value="">{t.select}</option>
        <option value="yes">{t.yes}</option>
        <option value="no">{t.no}</option>
      </select>
    </Field>
  );
}

function FileField({
  label, hint, chooseLabel, countLabel, accept, fieldName, files, onFiles, full,
}: {
  label: string; hint?: string; chooseLabel: string;
  countLabel: (n: number) => string; accept: string; fieldName: string;
  files: File[]; onFiles: (f: File[]) => void; full?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Field label={label} hint={hint} full={full}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-gold/60 hover:text-white"
        >
          <Upload size={13} />
          {chooseLabel}
        </button>
        {files.length > 0 && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
            {countLabel(files.length)}
          </span>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        // Explicit field name — must match the AJAX FormData keys and the
        // Netlify detection form (a label-derived name breaks under i18n).
        name={fieldName}
        accept={accept}
        multiple
        onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
        className="hidden"
      />
    </Field>
  );
}
