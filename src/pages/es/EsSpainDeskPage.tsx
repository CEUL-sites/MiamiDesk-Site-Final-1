import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download, MessageSquare, Check, Shield, FileText } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { LazyVideo } from "../../components/LazyVideo";
import { GlobalPartnerNetwork } from "../../components/GlobalPartnerNetwork";
import { AgencyPartnerForm } from "../../components/forms/AgencyPartnerForm";
import { CONTACT, LEAD_MAGNETS } from "../../constants";

const SERVICE_TIERS = [
  {
    tier: "01",
    name: "Activación de Listing",
    description: "Acceso al canal de Miami para agencias que activan uno a tres inmuebles en el mercado americano.",
    includes: [
      "Alta en el MLS a través de URG como broker de registro en Florida",
      "Sindicación a 500+ portales en 19 idiomas",
      "Presentación bilingüe del inmueble (EN / ES)",
      "Acuerdo de referral escrito — relación con el cliente protegida",
      "Distribución a 93.000 agentes miembro de Miami REALTORS®",
    ],
  },
  {
    tier: "02",
    name: "Marketing Activo",
    popular: true,
    description: "Ejecución completa de marketing con outreach a agentes compradores y reporting mensual.",
    includes: [
      "Todo lo incluido en Activación de Listing",
      "Outreach dirigido a agentes compradores con mandatos LATAM",
      "Informe mensual de rendimiento de marketing",
      "Dossier comprador en inglés personalizado",
      "Gestión de consultas con respuesta prioritaria",
    ],
  },
  {
    tier: "03",
    name: "Canal Completo",
    description: "Estructura enterprise para agencias con inventario amplio o mandatos de promotor.",
    includes: [
      "Todo lo incluido en Marketing Activo",
      "Sesiones de estrategia mensuales con Carlos",
      "Apoyo en negociaciones con compradores americanos",
      "Estructuras de precio para carteras y promotores",
      "Acceso directo a la red de inversores LATAM y Sur de Florida",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consulta de Agencia",
    body: "Envíe su inmueble o perfil de agencia a través del formulario. Carlos revisa cada solicitud personalmente en un plazo de 48 horas hábiles. Sin respuestas automáticas.",
  },
  {
    num: "02",
    title: "Llamada de Revisión",
    body: "Una llamada directa para evaluar el encaje con el mercado, identificar los perfiles de comprador más relevantes en Sur de Florida, y determinar si la activación en el MLS tiene sentido comercial. Sin compromiso previo.",
  },
  {
    num: "03",
    title: "Firma de Acuerdos",
    body: "Dos documentos antes de iniciar el marketing: un acuerdo de servicios de marketing (alcance, tarifa mensual, duración) y un acuerdo de referral escrito (titularidad del cliente, compensación al cierre). Ambas partes completamente documentadas.",
  },
  {
    num: "04",
    title: "Activación — Día Uno",
    body: "United Realty Group da de alta el inmueble en el MLS de Miami y Sur de Florida REALTORS®. La sindicación se activa de inmediato. 93.000 agentes miembro tienen acceso desde el primer día hábil.",
  },
];

const FAQ_ITEMS = [
  {
    q: "¿Tiene Carlos Uzcategui licencia para ejercer en España?",
    a: "No. Carlos tiene licencia exclusivamente en Florida (FL SL705771, United Realty Group). El alta en el MLS, la sindicación a portales y la distribución a agentes compradores son servicios en el lado americano. Las agencias españolas conservan su representación local del propietario en todo momento.",
  },
  {
    q: "¿Mi agencia mantiene la relación con el cliente?",
    a: "Sí, siempre. El acuerdo de referral está diseñado para proteger la representación de su agencia frente al propietario. Usted sigue siendo el agente del vendedor. Carlos gestiona el canal de marketing en EE.UU. y la coordinación con agentes compradores.",
  },
  {
    q: "¿Cómo se paga la comisión de referral al cierre?",
    a: "United Realty Group (broker licenciado en Florida) abona la comisión de referral a la agencia española en el momento del cierre, según el acuerdo de referral firmado. Aproximadamente el 1% del precio de venta — negociado y documentado antes de la activación.",
  },
  {
    q: "¿Qué ocurre si el inmueble no se vende?",
    a: "La tarifa mensual de marketing cubre los servicios (mantenimiento del MLS, sindicación, outreach, reporting) independientemente del resultado. La comisión de referral solo se activa en caso de cierre exitoso.",
  },
  {
    q: "¿Cómo aparece un inmueble español en el MLS de Miami?",
    a: "United Realty Group crea el alta en el MLS como broker licenciado en Florida. El inmueble se activa como una oportunidad de referral internacional dentro de la infraestructura de Miami y Sur de Florida REALTORS®, llegando a 93.000 agentes miembro.",
  },
  {
    q: "¿Cuál es la diferencia entre la tarifa mensual y la comisión de referral?",
    a: "La tarifa mensual de servicios de marketing la paga la agencia española o el propietario por los servicios de distribución en curso — alta en el MLS, sindicación, outreach y reporting. Es una tarifa profesional, no condicionada a la venta. La comisión de referral es un pago separado y contingente, que solo se abona en caso de cierre exitoso, a través de URG y según el acuerdo escrito.",
  },
];

export default function EsSpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Mesa España — Activación de Listings Españoles en el MLS de Miami | HomesProfessional.com</title>
        <meta name="description" content="Servicio B2B para agencias y promotores españoles. Dos flujos de ingresos documentados: tarifa mensual de marketing por listing + comisión de referral al cierre a través de United Realty Group, broker licenciado en Florida. Carlos Uzcategui FL SL705771." />
        <meta name="keywords" content="activar inmueble MLS Miami, agencia española referral Miami, promotor España Sur de Florida, cooperating broker España Florida, United Realty Group España, activación MLS España, listing España Miami" />
        <link rel="canonical" href="https://homesprofessional.com/es/spain-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:title" content="Mesa España — Listings Españoles en el MLS de Miami | Carlos Uzcategui" />
        <meta property="og:description" content="Dos flujos de ingresos documentados para agencias españolas: tarifa mensual de marketing + comisión de referral al cierre a través de URG, broker licenciado en Florida." />
        <meta property="og:image" content="https://homesprofessional.com/images/urg-hq.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 2, "name": "Mesa España", "item": "https://homesprofessional.com/es/spain-desk" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mesa España — Servicio de Partnership para Agencias Españolas",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Marketing Inmobiliario Internacional y Referral",
          "description": "Servicio B2B para agencias y promotores españoles. Tarifa mensual de marketing por listing más comisión de referral al cierre, gestionado a través de United Realty Group como broker licenciado en Florida.",
          "areaServed": ["Sur de Florida", "España", "Madrid"],
          "url": "https://homesprofessional.com/es/spain-desk",
          "availableLanguage": ["English", "Spanish"],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-14 md:pt-28 md:pb-18 text-center sm:px-10">
          <LazyVideo
            eager
            src="/videos/miami_madrid_transition.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/90 pointer-events-none" />

          <div className="relative mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-1.5 mb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">España · Mesa Miami · Partnership de Agencias</span>
            </div>

            <h1 className="font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}>
              Venda con el Alcance de la Red Local de<br />
              <em className="not-italic italic text-gold">Realtor® Más Grande del Mundo.</em>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Un servicio B2B para agencias españolas, promotores y profesionales del listing.
              Dos flujos de ingresos documentados. Un broker licenciado en Florida como principal de registro.
              93.000 agentes miembro desde el Día Uno.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#enviar-listing"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Enviar un Listing para Revisión
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                WhatsApp: Agencia a Agencia
              </a>
            </div>

            <div className="mt-6">
              <a
                href={LEAD_MAGNETS.spainActivation.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                Descargar: Metodología de Activación MLS — PDF
              </a>
            </div>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · FL SL705771 · Miami and South Florida REALTORS® · Equal Housing Opportunity
            </p>
          </div>
        </section>

        {/* ── Dos Flujos de Ingresos ─────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">El Modelo de Negocio</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Dos flujos de ingresos documentados.<br />
                <em className="not-italic italic text-gold">Separados. Transparentes. Contractuales.</em>
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
                La mayoría de los acuerdos internacionales de referral son informales y están mal documentados.
                Este servicio opera con dos canales de ingresos diferenciados y contractuales — cada uno formalizado por escrito antes de iniciar cualquier acción de marketing.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              {/* Flujo A — Mensual */}
              <div className="bg-navy-deep p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] font-bold text-gold">A</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70">Recurrente · Por Listing · Mensual</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Servicios Mensuales de Marketing</h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Abonado por la agencia española o el propietario</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  Un acuerdo mensual por listing que incluye alta y mantenimiento en el MLS, sindicación a 500+ portales,
                  outreach a agentes compradores y materiales de marketing bilingüe. Se abona como tarifa de servicios profesionales
                  por la infraestructura de distribución — no es contingente a la venta.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Alta y mantenimiento del listing en el MLS",
                    "Sindicación a 500+ portales en 19 idiomas",
                    "Outreach dirigido a agentes compradores",
                    "Materiales de presentación bilingüe (EN/ES)",
                    "Reporting mensual de rendimiento",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.08] pt-5 mt-auto">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Precio</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Tarifa mensual por listing según nivel de servicio. Ver niveles de servicio abajo o solicitar detalle.</p>
                </div>
              </div>

              {/* Flujo B — Al Cierre */}
              <div className="bg-navy p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] font-bold text-gold">B</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70">Contingente · Solo en el Cierre</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Comisión de Referral al Cierre</h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Abonada a través de United Realty Group · Broker licenciado en Florida</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  Cuando una operación cierra a través de la red de Miami, United Realty Group (el broker licenciado en Florida)
                  abona la comisión de referral a la agencia española según el acuerdo escrito firmado.
                  Aproximadamente el 1% del precio de venta — negociado y documentado antes de la activación.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Acuerdo de referral escrito previo a cualquier presentación de comprador",
                    "Abonado por URG (broker licenciado en FL) al cierre exitoso",
                    "Aproximadamente el 1% del precio de venta — negociado por inmueble",
                    "La titularidad del cliente permanece en la agencia española",
                    "Estructura de compensación documentada antes de la activación en el MLS",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.08] pt-5 mt-auto">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Mecanismo</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Documentado mediante acuerdo de referral formal con United Realty Group antes de cualquier presentación de comprador o activación en el MLS.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
              Ambos flujos de ingresos se formalizan por escrito antes de iniciar cualquier acción de marketing. Sin acuerdos informales.
            </p>
          </div>
        </section>

        {/* ── Arquitectura de Compliance ────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Arquitectura de Compliance</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                El mecanismo legal,<br />
                <em className="not-italic italic text-gold">explicado con claridad.</em>
              </h2>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  label: "Firma de Acuerdos",
                  body: "Acuerdo de servicios de marketing + acuerdo de referral escrito. Ambos firmados antes de cualquier alta en el MLS o presentación de comprador. Titularidad del cliente y compensación documentadas.",
                },
                {
                  step: "02",
                  label: "URG Activa el Listing en el MLS",
                  body: "United Realty Group — broker licenciado en Florida — crea el alta en el MLS de Miami y Sur de Florida REALTORS®. Un listing formal, no una subida a un portal.",
                },
                {
                  step: "03",
                  label: "Distribución en Red",
                  body: "93.000 agentes miembro y 500+ portales en 19 idiomas reciben el inmueble. Desde el Día Uno. La misma infraestructura que respalda el volumen anual de ventas de Sur de Florida.",
                },
                {
                  step: "04",
                  label: "Cierre y Pago",
                  body: "Al cierre: URG paga al agente comprador cooperante según el reparto acordado. URG abona a continuación la comisión de referral a la agencia española según el acuerdo firmado.",
                },
              ].map(({ step, label, body }) => (
                <div key={step} className="bg-navy-deep p-7 flex flex-col gap-4">
                  <span className="font-mono text-[11px] font-semibold text-gold/60 tracking-[0.22em]">{step}</span>
                  <h3 className="font-serif text-lg text-white leading-snug">{label}</h3>
                  <div className="h-px w-8 bg-gold/25" />
                  <p className="font-sans text-xs leading-relaxed text-white/55 flex-1">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60 mb-4">Infraestructura de Red</p>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    { value: "93.000", label: "Agentes miembro MLS" },
                    { value: "500+", label: "Portales · 19 idiomas" },
                    { value: "3.500+", label: "Agentes URG · 20 oficinas" },
                    { value: "75+", label: "Países · red de partners" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div className="font-serif text-2xl text-white">{value}</div>
                      <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/40 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60 mb-4">Notas de Compliance</p>
                <ul className="space-y-3">
                  {[
                    "Carlos Uzcategui tiene licencia solo en Florida (FL SL705771)",
                    "Inmuebles españoles gestionados mediante referral y cooperating broker",
                    "United Realty Group es el broker de registro en Florida para todas las altas en el MLS",
                    "Comisión de referral abonada a través de URG al cierre según acuerdo firmado",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/55">
                      <Shield size={11} className="mt-0.5 flex-shrink-0 text-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Niveles de Servicio ────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Estructura de Servicio</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Tres niveles. Precio por listing,<br />
                <em className="not-italic italic text-gold">por mes.</em>
              </h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Cada nivel activa la infraestructura completa del MLS de Miami REALTORS® a través de URG como broker de registro.
                La diferencia es la profundidad del marketing activo, el outreach y el soporte estratégico.
                La tarifa mensual es independiente de la comisión de referral al cierre.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {SERVICE_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={`relative flex flex-col bg-navy-deep p-8 gap-5 ${tier.popular ? "ring-1 ring-inset ring-gold/35" : ""}`}
                >
                  {tier.popular && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-px bg-gold/50" />
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold px-3 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-navy-deep whitespace-nowrap">
                        Más Seleccionado
                      </span>
                    </>
                  )}

                  <span className="font-mono text-[10px] font-semibold text-gold/55 tracking-[0.22em]">{tier.tier}</span>

                  <div>
                    <h3 className="font-serif text-xl text-white">{tier.name}</h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-white/50">{tier.description}</p>
                  </div>

                  <div className="h-px w-8 bg-gold/25" />

                  <ul className="space-y-2.5 flex-1">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                        <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#enviar-listing"
                    className="mt-2 flex items-center justify-center gap-2 border border-gold/35 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/75 transition-colors hover:border-gold hover:text-gold"
                  >
                    Solicitar Precio
                    <ChevronRight size={12} />
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
              Todos los niveles incluyen acuerdo de referral escrito y activación en el MLS con URG como broker de registro.
              La tarifa mensual no incluye la comisión de referral — ese es un pago contingente y separado, abonado al cierre.
            </p>
          </div>
        </section>

        {/* ── Proceso ───────────────────────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cómo Trabajar Juntos</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Cuatro pasos desde la consulta<br />
                <em className="not-italic italic text-gold">hasta la activación en el Día Uno.</em>
              </h2>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="bg-navy-deep p-8 flex gap-6">
                  <span className="flex-shrink-0 font-mono text-[13px] font-semibold text-gold/50 tracking-[0.22em] pt-0.5">{step.num}</span>
                  <div>
                    <h3 className="font-serif text-xl text-white">{step.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Agendar Llamada de Agencia
                <ChevronRight size={13} />
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                WhatsApp España
              </a>
            </div>
          </div>
        </section>

        {/* ── Para Quién Es ──────────────────────────────────────────── */}
        <section className="bg-navy-deep py-14 md:py-18 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Perfil Ideal</p>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                "Agencias de Lujo en Madrid",
                "Marbella y Costa del Sol",
                "Carteras de Apartamentos en Barcelona",
                "Villas en Ibiza y Baleares",
                "Inmuebles de Inversión en Canarias",
                "Promotores de Obra Nueva",
                "Residencias con Marca",
                "Mandatos de Family Office",
                "Carteras Multi-Inmueble",
                "Proyectos de Nueva Promoción",
              ].map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 divide-x divide-bone rounded-none bg-bone/40">
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">93.000</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  Agentes miembro
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">500+</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  Sitios web · 19 idiomas
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">260+</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  MLSs en EE.UU. vía RPR
                </div>
              </div>
            </div>
            <MiamiRealtorsBadge lang="es" variant="light" className="mt-10" />
          </div>
        </section>

        {/* ─── Section 2: Para quién es esta asesoría ──────────────── */}
        <section className="bg-bone/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                PARA QUIÉN ES ESTA ASESORÍA
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Tres perfiles de cliente.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {AUDIENCE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="border border-bone bg-white p-8"
                  >
                    <Icon size={24} className="text-gold" />
                    <h3 className="mt-4 font-serif text-xl text-navy-deep">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-navy-deep/60">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 3: El Proceso ───────────────────────────────── */}
        <section className="bg-navy-deep py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                EL PROCESO
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                {/* TODO: native Madrid editor review */}
                Cuatro pasos desde la consulta inicial hasta el cierre.
              </h2>
            </div>

            <div className="space-y-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="flex gap-8">
                  <div className="flex-shrink-0 font-mono text-[13px] font-semibold text-gold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Marco Profesional ─────────────────────────────────────── */}
        <section className="bg-navy py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Marco Profesional</p>
              <h2 className="mt-4 font-serif text-3xl text-white leading-tight md:text-4xl">
                Qué queda documentado.<br />
                <em className="not-italic italic text-gold">Qué queda protegido.</em>
              </h2>
            </div>

            <div className="space-y-5">
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Carlos Uzcategui actúa como principal licenciado de registro en Florida, lo que permite a agencias españolas colocar su inventario directamente en el MLS de Miami y Sur de Florida. La agencia española mantiene la representación local del propietario — sin ceder el mandato.
              </p>
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Desde el primer día de activación, la propiedad llega a 93.000 agentes miembros de la mayor asociación local de REALTORS® del mundo, con distribución simultánea a 500+ portales globales en 19 idiomas. Una vía institucional hacia el mercado americano, operada por un profesional con 25 años de licencia activa en Florida.
              </p>
            </div>

              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 mb-5">Lo Que Conserva su Agencia</p>
                <ul className="space-y-5">
                  {[
                    {
                      label: "La relación con el cliente",
                      detail: "La agencia española mantiene la representación del propietario en todo momento. Sin negociación posible.",
                    },
                    {
                      label: "Su comisión de referral",
                      detail: "Documentada antes de cualquier presentación de comprador. URG la abona al cierre según el acuerdo firmado.",
                    },
                    {
                      label: "Sus datos de listing",
                      detail: "Todas las solicitudes son confidenciales. Sin compartir datos del inmueble sin consentimiento escrito.",
                    },
                    {
                      label: "Su independencia como agencia",
                      detail: "Los acuerdos mensuales son por inmueble. Sin exclusividad de cartera, salvo acuerdo expreso.",
                    },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Shield size={14} className="mt-0.5 flex-shrink-0 text-gold/55" />
                      <div>
                        <p className="font-sans text-sm font-medium text-white">{label}</p>
                        <p className="mt-0.5 font-sans text-xs text-white/45 leading-relaxed">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Formulario ────────────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-24" id="enviar-listing">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Mesa España · Consulta de Agencia</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Envíe un listing o consulta de agencia.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Para agencias españolas, promotores y profesionales del listing. Todas las solicitudes son confidenciales.
                Carlos revisa cada consulta personalmente antes de responder.
              </p>
            </div>
            <AgencyPartnerForm />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="bg-navy py-16 md:py-20 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Preguntas Frecuentes</p>
            <div className="divide-y divide-white/[0.08]">
              {FAQ_ITEMS.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <h3 className="font-serif text-lg text-white leading-snug mb-3">{q}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/55">{a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 pt-8 border-t border-white/[0.08]">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                <MessageSquare size={14} />
                WhatsApp España
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 underline-offset-2 hover:text-white hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={14} className="text-gold flex-shrink-0" />
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">Licenciado · Compliant · Confidencial</p>
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Los servicios de corretaje inmobiliario en Florida son proporcionados a través de United Realty Group (URG).
                Carlos Uzcategui (FL SL705771) es asociado licenciado de URG.
                Las oportunidades en España e internacionales se gestionan mediante acuerdos de referral, marketing, cooperating broker
                o asesoría, según jurisdicción, tipo de inmueble y normativa aplicable.
                Carlos Uzcategui tiene licencia de agente inmobiliario exclusivamente en Florida.
                Todos los compromisos transfronterizos se documentan mediante acuerdos escritos formales antes de cualquier presentación de comprador o activación de marketing.
                Equal Housing Opportunity.
              </p>
            </div>
          </div>
        </section>

        <GlobalPartnerNetwork lang="es" />

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
