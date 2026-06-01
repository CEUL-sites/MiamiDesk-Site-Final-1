import { pushEvent } from "../../lib/analytics";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "motion/react";
import { BadgeCheck, Send, Loader2, Download, ExternalLink } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { MiamiRealtorsBadge } from "../../components/MiamiRealtorsBadge";
import { CONTACT, LEAD_MAGNETS, ASSOCIATION_STATS } from "../../constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://homesprofessional.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Español",
      item: "https://homesprofessional.com/es",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Agentes",
      item: "https://homesprofessional.com/es/agentes",
    },
  ],
};

const INITIAL_FORM: Record<string, string> = {
  licenseeName: "",
  brokerageName: "",
  country: "",
  referralType: "",
  clientSummary: "",
  preferredContact: "",
  source: "es-agentes",
};

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

function EsReferralForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErr("");
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({
          "form-name": "referral-intake-es",
          "bot-field": "",
          ...form,
          sourcePage: "referral-intake-es",
        }),
      });
      if (!res.ok) throw new Error("submission_failed");
      pushEvent("form_submit_agent", { form: "referral-intake-es" }); window.location.href = "/es/gracias/agente";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "La solicitud ha expirado. Contacte por WhatsApp Madrid."
          : "No se ha podido enviar. Por favor, use WhatsApp o email."
      );
      setStatus("error");
    } finally {
      window.clearTimeout(t);
    }
  };

  return (
    <form
      name="referral-intake-es"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="referral-intake-es" />
      <input type="hidden" name="source" value="es-agentes" />
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
            {/* TODO: native Madrid editor review */}
            Nombre del agente / director de agencia *
          </label>
          <input
            required
            name="licenseeName"
            type="text"
            className="form-input"
            value={form.licenseeName}
            onChange={set("licenseeName")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
            {/* TODO: native Madrid editor review */}
            Nombre de la agencia o bróker *
          </label>
          <input
            required
            name="brokerageName"
            type="text"
            className="form-input"
            value={form.brokerageName}
            onChange={set("brokerageName")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
            {/* TODO: native Madrid editor review */}
            País *
          </label>
          <select
            required
            name="country"
            className="form-input w-full"
            value={form.country}
            onChange={set("country")}
          >
            <option value="">
              {/* TODO: native Madrid editor review */}
              Seleccionar…
            </option>
            {/* TODO: native Madrid editor review */}
            <option value="España">España</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
            <option value="México">México</option>
            <option value="Brasil">Brasil</option>
            <option value="Perú">Perú</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Panamá">Panamá</option>
            <option value="República Dominicana">República Dominicana</option>
            <option value="EE.UU.">EE.UU.</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
            {/* TODO: native Madrid editor review */}
            Tipo de referencia *
          </label>
          <select
            required
            name="referralType"
            className="form-input w-full"
            value={form.referralType}
            onChange={set("referralType")}
          >
            <option value="">
              {/* TODO: native Madrid editor review */}
              Seleccionar…
            </option>
            {/* TODO: native Madrid editor review */}
            <option value="Comprador para Miami">Comprador para Miami</option>
            <option value="Vendedor en Miami">Vendedor en Miami</option>
            <option value="Activación de inventario español">
              Activación de inventario español
            </option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
          {/* TODO: native Madrid editor review */}
          Resumen del cliente o mandato *
        </label>
        <textarea
          required
          name="clientSummary"
          rows={5}
          className="form-input"
          value={form.clientSummary}
          onChange={set("clientSummary")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">
          {/* TODO: native Madrid editor review */}
          Contacto preferido *
        </label>
        <select
          required
          name="preferredContact"
          className="form-input w-full"
          value={form.preferredContact}
          onChange={set("preferredContact")}
        >
          <option value="">
            {/* TODO: native Madrid editor review */}
            Seleccionar…
          </option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
        </select>
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-red-500">{err}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60"
      >
        {status === "submitting" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {/* TODO: native Madrid editor review */}
        {status === "submitting"
          ? "Enviando…"
          : "Enviar referencia de colaboración"}
      </button>

      <p className="text-center font-mono text-[8px] uppercase tracking-[0.18em] text-navy/30">
        {/* TODO: native Madrid editor review */}
        Confidencial · Solo profesionales licenciados · Acuerdos escritos ·{" "}
        {CONTACT.shortLicense}
      </p>
    </form>
  );
}

export default function EsAgentesPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>
          Red de Colaboradores · Carlos Uzcategui · Florida Licensed Realtor®
          SL705771
        </title>
        {/* TODO: native Madrid editor review */}
        <meta
          name="description"
          content="Colaboraciones bilaterales para agentes y agencias en España, Florida y Latinoamérica. Acceso a la red de 93.000 agentes de Miami and South Florida REALTORS®. Honorarios de referral confirmados por escrito."
        />
        <link
          rel="canonical"
          href="https://homesprofessional.com/es/agentes"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://homesprofessional.com/agents"
        />
        <link
          rel="alternate"
          hrefLang="es"
          href="https://homesprofessional.com/es/agentes"
        />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-16 md:py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />

          <div className="relative mx-auto max-w-4xl px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={itemVariants}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
              >
                {/* TODO: native Madrid editor review */}
                CARLOS UZCATEGUI · REALTOR® LICENCIADO EN FLORIDA · SL705771
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-6xl"
              >
                {/* TODO: native Madrid editor review */}
                Su cliente en Miami.
                <br />
                {/* TODO: native Madrid editor review */}
                Su honorario,{" "}
                <em className="not-italic italic text-gold">garantizado.</em>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55"
              >
                {/* TODO: native Madrid editor review */}
                Una colaboración bilateral con un profesional licenciado en
                Florida, activo en Miami y en Madrid. Sin intermediarios. Sin
                ambigüedades. El acuerdo de referral se firma antes de presentar
                el cliente.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="#referral-form"
                  className="group inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  {/* TODO: native Madrid editor review */}
                  Enviar una referencia de colaboración
                </a>
                <a
                  href={CONTACT.whatsappSpain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <ExternalLink size={13} />
                  {/* TODO: native Madrid editor review */}
                  WhatsApp Madrid +34 646 853 078
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Section 1 — La Propuesta Bilateral ───────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                EL MODELO DE COLABORACIÓN
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                {/* TODO: native Madrid editor review */}
                Dos mercados. Un principal licenciado.{" "}
                <em>Flujo bilateral.</em>
              </h2>
            </div>

            <div className="mx-auto max-w-3xl space-y-5 text-center">
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Carlos opera simultáneamente en Greater Miami — Realtor®
                licenciado desde 2001 — y en Madrid, con presencia profesional
                activa junto a agencias, promotores y propietarios.
              </p>
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Esta doble presencia permite acuerdos de colaboración
                genuinamente bilaterales en ambas direcciones.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* Track A */}
              <div className="rounded-none border border-gold/20 bg-navy-deep p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  TRACK A — REFERENCIAS DE VENDEDORES PARA MIAMI
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
                  {/* TODO: native Madrid editor review */}
                  Vendedores en España o Latinoamérica con activos en Miami, o
                  clientes que desean listar en Florida. El acuerdo de referral
                  se firma antes de presentar al cliente.
                </p>
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Track A está diseñado para
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Agencias españolas con clientes propietarios de activos en
                      Florida
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Agencias latinoamericanas con propietarios en Miami que
                      desean vender
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Promotores con unidades restantes en desarrollos de Miami
                    </span>
                  </li>
                </ul>
              </div>

              {/* Track B */}
              <div className="border border-gold/10 bg-navy/80 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  TRACK B — REFERENCIAS DE COMPRADORES E INVERSORES
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
                  {/* TODO: native Madrid editor review */}
                  Compradores latinoamericanos que desean adquirir en Miami —
                  familias venezolanas, compradores colombianos, argentinos en
                  reubicación, inversores. Representación completa de comprador
                  en Florida.
                </p>
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Track B está diseñado para
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Agencias en Venezuela, Colombia, Argentina, México, Brasil,
                      España
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Asesores de family offices con clientes con mandatos de
                      inversión en Florida
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-white/65">
                      {/* TODO: native Madrid editor review */}
                      Abogados de inmigración y relocalización con clientes en
                      proceso de establecimiento en EE.UU.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2 — Infraestructura de Distribución ─────── */}
        <section className="bg-bone/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                LA INFRAESTRUCTURA DE DISTRIBUCIÓN
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                {/* TODO: native Madrid editor review */}
                Cuando su cliente lista con Carlos, entra en la red más grande
                de agentes inmobiliarios locales{" "}
                <em>del mundo.</em>
              </h2>
            </div>

            <p className="mx-auto max-w-3xl text-center font-sans text-base leading-relaxed text-navy-deep/70">
              {/* TODO: native Madrid editor review */}
              Carlos es miembro de Miami and South Florida REALTORS® — la mayor
              asociación local de Realtor® del mundo tras la fusión de MIAMI
              REALTORS® y RWorld, efectiva el 11 de mayo de 2026 — con 93.000
              agentes miembro.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-px bg-bone sm:grid-cols-4">
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">
                  {ASSOCIATION_STATS.memberCount.toLocaleString("es-ES")}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Agentes miembro
                </div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">200+</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Sitios web globales · 19 idiomas
                </div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">
                  {ASSOCIATION_STATS.usMls}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  MLSs en EE.UU. vía RPR
                </div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">
                  $69.000M
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Volumen 2025
                </div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">437+</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Acuerdos internacionales
                </div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-serif text-3xl text-navy-deep">
                  {ASSOCIATION_STATS.mlsDataExchanges}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">
                  {/* TODO: native Madrid editor review */}
                  Intercambios de datos MLS
                </div>
              </div>
            </div>

            <blockquote className="mx-auto mt-12 max-w-2xl border-l-4 border-gold pl-6">
              <p className="font-serif text-xl italic text-navy-deep/80">
                {/* TODO: native Madrid editor review */}
                "Las características describen una propiedad. La distribución
                determina su precio."
              </p>
            </blockquote>
            <MiamiRealtorsBadge lang="es" variant="light" className="mt-12" />
          </div>
        </section>

        {/* ─── Section 3 — Para Agencias Españolas ─────────────── */}
        <section className="bg-navy-deep py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                TRACK ESPAÑA
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl text-white md:text-4xl">
                {/* TODO: native Madrid editor review */}
                Su inventario en España, activado{" "}
                <em className="italic text-gold">en el MLS de Miami.</em>
              </h2>
            </div>

            <div className="mx-auto max-w-3xl space-y-5">
              <p className="font-sans text-base leading-relaxed text-white/70">
                {/* TODO: native Madrid editor review */}
                Si representa a un promotor o propietario en España con activos
                que dependen de compradores latinoamericanos o norteamericanos
                para obtener el precio máximo, existe un mecanismo formal de
                acceso institucional al mercado estadounidense.
              </p>
              <p className="font-sans text-base leading-relaxed text-white/70">
                {/* TODO: native Madrid editor review */}
                Carlos actúa como principal licenciado en Florida — el
                profesional estadounidense legalmente requerido para listar en el
                MLS de Miami. La representación local española permanece con la
                agencia española.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              {[
                {
                  number: "01",
                  // TODO: native Madrid editor review
                  title: "MANDATO",
                  // TODO: native Madrid editor review
                  description:
                    "Revisión conjunta de documentación, precio y estructura de propiedad. Acuerdo de colaboración firmado antes de cualquier activación.",
                },
                {
                  number: "02",
                  // TODO: native Madrid editor review
                  title: "PREPARACIÓN DEL LISTADO",
                  // TODO: native Madrid editor review
                  description:
                    "Fotografía profesional si es necesaria, descripción de la propiedad en inglés, registro de datos en BeachesMLS/MIAMI MLS.",
                },
                {
                  number: "03",
                  // TODO: native Madrid editor review
                  title: "ACTIVACIÓN EN LA RED AMERICANA",
                  // TODO: native Madrid editor review
                  description:
                    "El listado aparece en 500+ portales globales en 19 idiomas en 24 a 48 horas. Contacto directo con agentes de South Florida con mandatos activos.",
                },
                {
                  number: "04",
                  // TODO: native Madrid editor review
                  title: "REPORTING Y COORDINACIÓN",
                  // TODO: native Madrid editor review
                  description:
                    "Informe periódico de campaña al principal español: impresiones, consultas, visitas de agentes, actividad de ofertas.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="border-l-2 border-gold/30 pl-6"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    {step.number} · {step.title}
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                <ExternalLink size={13} />
                {/* TODO: native Madrid editor review */}
                Solicitar conversación inicial · WhatsApp Madrid
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 4 — El Acuerdo de Referral ──────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                TÉRMINOS Y TRANSPARENCIA
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                {/* TODO: native Madrid editor review */}
                El honorario de referral se acuerda{" "}
                <em>por escrito, antes de presentar el cliente.</em>
              </h2>
            </div>

            <div className="mx-auto max-w-3xl space-y-6">
              {[
                {
                  number: "01",
                  // TODO: native Madrid editor review
                  text: "El agente colaborador identifica un cliente con mandato claro.",
                },
                {
                  number: "02",
                  // TODO: native Madrid editor review
                  text: "Se firma acuerdo bilateral antes de cualquier presentación — honorario, mecanismo de pago, plazo de exclusividad.",
                },
                {
                  number: "03",
                  // TODO: native Madrid editor review
                  text: "Carlos gestiona la representación en Florida. El agente mantiene su relación en el mercado de origen.",
                },
                {
                  number: "04",
                  // TODO: native Madrid editor review
                  text: "El honorario se liquida al cierre desde el settlement statement, a través de United Realty Group — en cumplimiento de la normativa de Florida.",
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-5">
                  <div className="flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    {item.number}
                  </div>
                  <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-3xl font-sans text-sm leading-relaxed text-navy-deep/50">
              {/* TODO: native Madrid editor review */}
              Honorarios a agentes no licenciados en EE.UU. están sujetos a
              Florida Statute §475 y normas de RESPA. El acuerdo especificará la
              estructura legal aplicable.
            </p>

            <div className="mx-auto mt-10 max-w-3xl border-l-4 border-gold bg-navy-deep p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
                {/* TODO: native Madrid editor review */}
                LO QUE ESTE DESPACHO NO HACE
              </h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gold/60" />
                  <span className="font-sans text-sm text-white/70">
                    {/* TODO: native Madrid editor review */}
                    No acepta referencias sin acuerdo escrito previo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gold/60" />
                  <span className="font-sans text-sm text-white/70">
                    {/* TODO: native Madrid editor review */}
                    No trabaja con clientes compartidos sin claridad absoluta
                    sobre quién representa a quién.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gold/60" />
                  <span className="font-sans text-sm text-white/70">
                    {/* TODO: native Madrid editor review */}
                    No opera fuera del cumplimiento estricto de la normativa de
                    Florida y del Código Ético de la NAR.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Section 5 — Quién es Carlos ─────────────────────── */}
        <section className="bg-bone/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                EL PRINCIPAL
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                {/* TODO: native Madrid editor review */}
                25 años de transacciones en South Florida. Activo en Miami{" "}
                <em>y en Madrid.</em>
              </h2>
            </div>

            <div className="mx-auto max-w-3xl space-y-5 text-center">
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Carlos Uzcategui, Realtor® licenciado en Florida desde 2001 —
                25 años de transacciones. CLHMS y Certified Seller
                Representative.
              </p>
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Afiliado a United Realty Group — empresa de mayor volumen
                transaccional en Florida, con más de 3.000 agentes y 19
                oficinas.
              </p>
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Miembro de Miami and South Florida REALTORS® — 93.000 miembros
                tras la fusión de mayo de 2026. Presencia activa en Madrid de
                forma simultánea.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "CLHMS · CERTIFIED LUXURY HOME MARKETING SPECIALIST",
                "25 AÑOS · FLORIDA LICENSED REALTOR® DESDE 2001",
                "UNITED REALTY GROUP · Nº1 TRANSACCIONAL EN FLORIDA",
                "MIAMI AND SOUTH FLORIDA REALTORS® · 93.000 MIEMBROS",
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-3 border border-gold/30 px-5 py-4"
                >
                  <BadgeCheck size={14} className="flex-shrink-0 text-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy-deep/70">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 6 — FAQ ──────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                PREGUNTAS FRECUENTES
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Respuestas directas a las preguntas habituales de agentes
                colaboradores.
              </h2>
            </div>

            <div className="divide-y divide-bone">
              {[
                {
                  // TODO: native Madrid editor review
                  q: "¿Necesita mi cliente estar físicamente en Florida para comprar?",
                  // TODO: native Madrid editor review
                  a: "No. Las transacciones se pueden cerrar a distancia mediante poder notarial debidamente apostillado. Habitual en compradores latinoamericanos y europeos.",
                },
                {
                  // TODO: native Madrid editor review
                  q: "¿Cuál es el porcentaje de referral habitual?",
                  // TODO: native Madrid editor review
                  a: "El porcentaje es un término negociado y pactado por escrito en cada acuerdo. No existe una tarifa general publicada.",
                },
                {
                  // TODO: native Madrid editor review
                  q: "¿Puede Carlos listar propiedades en España?",
                  // TODO: native Madrid editor review
                  a: "Carlos está licenciado en Florida, no en España. Actúa como principal licenciado en Florida para propiedades españolas que se activan en el MLS de Miami — figura distinta y legalmente correcta.",
                },
                {
                  // TODO: native Madrid editor review
                  q: "¿Qué sucede si el comprador que refiero no cierra?",
                  // TODO: native Madrid editor review
                  a: "El honorario de referral se paga al cierre. Si la transacción no se cierra, no hay honorario. Práctica estándar en acuerdos de referral en EE.UU.",
                },
                {
                  // TODO: native Madrid editor review
                  q: "¿Acepta referencias de propiedades fuera de South Florida?",
                  // TODO: native Madrid editor review
                  a: "El área principal es Greater Miami y South Florida. Para otras jurisdicciones, puede coordinar la referencia con un agente de confianza en esa área.",
                },
                {
                  // TODO: native Madrid editor review
                  q: "¿En qué idiomas opera?",
                  // TODO: native Madrid editor review
                  a: "Inglés y español. Bilingüe con presencia profesional en mercados angloparlantes e hispanoparlantes.",
                },
              ].map((item, i) => (
                <div key={i} className="py-6">
                  <p className="font-sans text-base font-semibold text-navy-deep">
                    {item.q}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy-deep/60">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 7 — Form + CTA ───────────────────────────── */}
        <section id="referral-form" className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                MESA DE AGENTES · COLABORACIÓN BILATERAL
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                {/* TODO: native Madrid editor review */}
                Envíe su primera referencia. La conversación empieza aquí.
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/55">
                {/* TODO: native Madrid editor review */}
                El proceso comienza con una conversación de 20 minutos para
                confirmar el encaje del cliente, establecer los términos del
                acuerdo de colaboración y acordar el plan de acción.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <EsReferralForm />
            </div>

            {/* Alternative CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold/40 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
              >
                <ExternalLink size={13} />
                {/* TODO: native Madrid editor review */}
                WhatsApp Madrid +34 646 853 078
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <ExternalLink size={13} />
                {/* TODO: native Madrid editor review */}
                WhatsApp EE.UU. +1 954-865-6622
              </a>
            </div>

            {/* Spain activation PDF download */}
            <div className="mt-8 border border-gold/25 bg-gold/5 p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
                {/* TODO: native Madrid editor review */}
                Documento de referencia
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
                {LEAD_MAGNETS.spainActivation.description}
              </p>
              <a
                href={LEAD_MAGNETS.spainActivation.url}
                download
                className="mt-4 inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
              >
                <Download size={13} />
                {/* TODO: native Madrid editor review */}
                Descargar metodología de activación MLS — PDF
              </a>
            </div>
          </div>
        </section>

        {/* ─── Footer Disclaimer ────────────────────────────────── */}
        <div className="bg-navy-deep border-t border-white/5 py-8">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              {/* TODO: native Madrid editor review */}
              Carlos Uzcategui · Florida Licensed Realtor® SL705771 · Afiliado a
              United Realty Group · Miembro de Miami and South Florida
              REALTORS® · Equal Housing Opportunity
            </p>
          </div>
        </div>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
