import { Helmet } from "react-helmet-async";
import { JsonLd } from "../../components/SEO/JsonLd";
import { motion, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, Download, MessageSquare, Check, Shield, FileText, Globe } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { LazyVideo } from "../../components/LazyVideo";
import { GlobalPartnerNetwork } from "../../components/GlobalPartnerNetwork";
import { AgencyPartnerForm } from "../../components/forms/AgencyPartnerForm";
import { MiamiRealtorsBadge } from "../../components/MiamiRealtorsBadge";
import { CONTACT, LEAD_MAGNETS } from "../../constants";

// Hero stagger — mirrors the homepage / English Global Desk hero so all three
// heros animate in identically.
const heroContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SERVICE_TIERS = [
  {
    tier: "01",
    name: "Hasta 5 Listings",
    description: "Para agencias que dan a una selección curada de inmuebles premium el alcance de los agentes compradores de la red de Sur de Florida.",
    includes: [
      "Alta a través de URG como broker de registro en Florida",
      "Colocación en el MIAMI International MLS (RWorld) — sindicación internacional",
      "Sindicación a la red global de agentes y brokers partner",
      "Presentación bilingüe del inmueble (EN / ES)",
      "Acuerdo de referral escrito — relación con el cliente protegida",
    ],
  },
  {
    tier: "02",
    name: "Hasta 10 Listings",
    popular: true,
    description: "Para agencias con cartera activa que necesitan outreach continuo a agentes compradores y reporting mensual.",
    includes: [
      "Todo lo incluido en Hasta 5 Listings",
      "Outreach dirigido a agentes compradores con mandatos LATAM",
      "Informe mensual de rendimiento por inmueble",
      "Dossier comprador en inglés personalizado por propiedad",
      "Gestión de consultas con respuesta prioritaria",
    ],
  },
  {
    tier: "03",
    name: "11+ Listings",
    description: "Para agencias con inventario amplio, mandatos de promotor o flujo recurrente de listings.",
    includes: [
      "Todo lo incluido en Hasta 10 Listings",
      "Sesiones de estrategia mensuales con Carlos",
      "Apoyo en negociaciones con compradores americanos",
      "Estructuras de precio por volumen para carteras y promotores",
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
    title: "La Exposición se Activa",
    body: "Cuando el inmueble es elegible, United Realty Group coordina la colocación en el MIAMI International MLS (RWorld) y la sindicación a la red global de agentes y brokers, sujeto a las normas del MLS y la disponibilidad de cada plataforma. Su agencia mantiene la relación con el cliente en todo momento.",
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
    a: "United Realty Group (broker licenciado en Florida) abona la comisión de referral a la agencia española en el momento del cierre, según el acuerdo de referral firmado. Los términos se negocian y documentan por escrito antes de la activación; no se publican públicamente.",
  },
  {
    q: "¿Qué ocurre si el inmueble no se vende?",
    a: "La tarifa mensual de marketing cubre los servicios (mantenimiento del MLS, sindicación, outreach, reporting) independientemente del resultado. La comisión de referral solo se activa en caso de cierre exitoso.",
  },
  {
    q: "¿En qué MLS entra realmente un inmueble español?",
    a: "Un inmueble situado fuera de EE.UU. no entra en el sistema de búsqueda diaria del Southeast Florida MLS (SEFMLS), cuyas reglas presuponen contratos de listing firmados por el propietario dentro del área de servicio de Sur de Florida. El inventario internacional se coloca en el MIAMI International MLS (RWorld) — la plataforma de sindicación internacional de la asociación, que distribuye a miles de webs de agentes y brokers partner en todo el mundo — con Carlos como principal de registro licenciado en Florida a través de United Realty Group. La colocación está sujeta a las normas del MLS y a la elegibilidad de cada inmueble.",
  },
  {
    q: "¿Cuál es la diferencia entre la tarifa mensual y la comisión de referral?",
    a: "La tarifa mensual de servicios de marketing la paga la agencia española o el propietario por los servicios de distribución en curso — alta en el MLS, sindicación, outreach y reporting. Es una tarifa profesional, no condicionada a la venta. La comisión de referral es un pago separado y contingente, que solo se abona en caso de cierre exitoso, a través de URG y según el acuerdo escrito.",
  },
];

const AUDIENCE_CARDS = [
  {
    icon: FileText,
    title: "Propietarios de inmuebles en España",
    description: "Vendedores con propiedades en España que buscan exposición activa en el mercado americano más allá de los portales locales.",
  },
  {
    icon: Shield,
    title: "Agencias inmobiliarias españolas",
    description: "Agencias que quieren ofrecer a sus clientes propietarios una capa de exposición hacia Sur de Florida — y ganar más mandatos en el proceso.",
  },
  {
    icon: BadgeCheck,
    title: "Promotores y carteras de activos",
    description: "Promotores con inventario amplio o activos institucionales que necesitan un canal americano estructurado y un profesional licenciado en Florida.",
  },
];

export default function EsSpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Mesa Global — Gane Más Mandatos de Venta con Exposición hacia Sur de Florida | HomesProfessional.com</title>
        <meta name="description" content="Servicio B2B de exposición y referral para agencias y promotores en Sur de Florida. Usted mantiene el mandato local. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="ganar mandatos de venta España Sur de Florida, exposición Sur de Florida agencias españolas, listing España Sur de Florida, partnership agencia España Sur de Florida, cooperating broker España Florida, United Realty Group España, exposición internacional de listings" />
        <link rel="canonical" href="https://homesprofessional.com/es/spain-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:title" content="Mesa Global — Gane Más Mandatos de Venta con Exposición hacia Sur de Florida | Carlos Uzcategui" />
        <meta property="og:description" content="Dé a su agencia una ventaja en la presentación de captación: exposición documentada hacia Sur de Florida para sus vendedores, cuando es elegible. Representación local en España; exposición hacia Sur de Florida a través de un Realtor® licenciado en Florida." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="es-spain-desk-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 2, "name": "Mesa España", "item": "https://homesprofessional.com/es/spain-desk" },
          ],
        }} />
      <JsonLd id="es-spain-desk-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mesa España — Servicio de Partnership para Agencias Españolas",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Marketing Inmobiliario Internacional y Referral",
          "description": "Servicio B2B para agencias y promotores españoles. Tarifa mensual de marketing por listing más comisión de referral al cierre, gestionado a través de United Realty Group como broker licenciado en Florida.",
          "areaServed": ["Sur de Florida", "España", "Madrid"],
          "url": "https://homesprofessional.com/es/spain-desk",
          "availableLanguage": ["English", "Spanish"],
        }} />
      <JsonLd id="es-spain-desk-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        }} />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ── Mirrors the homepage / English Global Desk hero: centered
            column, layered grain/grid/vignette texture, pill eyebrow, gold-italic
            serif headline, italic subtitle, scrolling network ticker, and an icon
            trust row. Copy, CTAs, PDF download and compliance line preserved. */}
        <section className="hero-root relative overflow-hidden bg-[#060D18] px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center sm:px-10 text-white">
          <style>{`
            .gd-hero-grain {
              position:absolute; inset:0; pointer-events:none; opacity:0.025;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
              background-size: 180px;
            }
            .gd-hero-grid {
              position:absolute; inset:0; pointer-events:none;
              background-image:
                linear-gradient(rgba(176,141,87,0.03) 1px, transparent 1px),
                linear-gradient(90deg,rgba(176,141,87,0.03) 1px, transparent 1px);
              background-size:64px 64px;
              mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
            }
            .gd-hero-vignette {
              position:absolute; bottom:0; left:0; right:0; height:220px; pointer-events:none;
              background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
            }
            @keyframes gd-exposure-scroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .gd-exposure-track {
              animation: gd-exposure-scroll 12s linear infinite;
              display: flex;
              will-change: transform;
            }
            .gd-exposure-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) {
              .gd-exposure-track { animation: none; }
            }
          `}</style>

          <LazyVideo
            eager
            src="/videos/dollhouse_global_reach.mp4"
            poster="/images/og-default.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22] pointer-events-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060D18]/75 via-[#060D18]/60 to-[#060D18]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,68,158,0.30),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_70%,rgba(176,141,87,0.10),transparent_70%)]" />
          <div className="gd-hero-grain"    aria-hidden="true" />
          <div className="gd-hero-grid"     aria-hidden="true" />
          <div className="gd-hero-vignette" aria-hidden="true" />

          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
          >
            {/* Eyebrow pill */}
            <motion.div variants={heroItem}>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 sm:px-3.5">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                <span className="font-mono text-[11px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-gold/85">
                  <span className="sm:hidden">Mesa Global · United Realty Group</span>
                  <span className="hidden sm:inline">Mesa Global · Partnership de Agencias · United Realty Group</span>
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItem}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.5rem)", fontWeight: 400 }}
            >
              Dé a la Propiedad Premium el Alcance de
              <br className="hidden md:block" aria-hidden="true" />{" "}
              <em className="italic text-gold">93.000 Agentes Compradores de Miami.</em>
            </motion.h1>
            {/* Titulares alternativos para que Carlos elija — en la voz "...el Alcance de...":
                 A) "Propiedad Premium, con el Alcance de la Asociación Local de REALTORS® Más Grande del Mundo."
                 B) "Propiedad Premium, ante Cada Agente Comprador de la Red de Miami." */}

            {/* Italic serif subtitle */}
            <motion.p
              variants={heroItem}
              className="mt-6 font-serif italic text-white/70"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
            >
              Su mercado es local — los compradores son globales.
            </motion.p>

            {/* Supporting copy */}
            <motion.p
              variants={heroItem}
              className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/65"
            >
              Ayude a su agencia a ganar más mandatos de venta. Ofrezca a los propietarios exposición
              documentada hacia el mercado de Sur de Florida a través de Carlos Uzcategui — Realtor® licenciado en Florida
              desde 2001, afiliado a United Realty Group — junto a su marketing local. Representación local en España.
              Exposición hacia Sur de Florida a través de un Realtor® licenciado en Florida. Usted mantiene la relación con el cliente.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              <a
                href="#enviar-listing"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep shadow-lg shadow-gold/25 transition-opacity hover:opacity-90"
              >
                Solicitar Términos de Partnership
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
            </motion.div>

            <motion.div variants={heroItem} className="mt-6">
              <a
                href={LEAD_MAGNETS.spainActivation.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                Descargar: Metodología de Activación MLS — PDF
              </a>
            </motion.div>

            {/* Network ticker — same scrolling marquee as the homepage hero */}
            <motion.div
              variants={heroItem}
              className="relative mt-9 w-full max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]"
            >
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#060D18] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#060D18] to-transparent" />
              <div className="gd-exposure-track">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 items-center gap-2 pl-6 pr-12 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] whitespace-nowrap text-white/70">
                    <span className="text-gold/75">Red</span>{" "}·{" "}
                    <span className="text-white/85">93.000</span> Agentes Miembro{" "}·{" "}
                    <span className="text-white/85">200+</span> Portales Globales{" "}·{" "}
                    <span className="text-white/85">19</span> Idiomas{" "}·{" "}
                    <span className="text-white/85">260+</span> MLSs en EE.UU.{" "}·{" "}
                    <span className="text-white/85">3.500+</span> Agentes URG{" "}·{" "}
                    <span className="text-white/85">75+</span> Países
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Trust row — reflects this page's referral/partnership model */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              {[
                { icon: Shield,     text: "Broker Licenciado en Florida" },
                { icon: FileText,   text: "Acuerdos por Escrito" },
                { icon: BadgeCheck, text: "Usted Mantiene el Mandato" },
                { icon: Globe,      text: "Alcance a 93.000 Agentes" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
                  <Icon size={12} className="text-gold flex-shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* Tira de credibilidad institucional — solo afiliaciones verificadas (§9). */}
            <motion.div
              variants={heroItem}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70"
            >
              <span className="text-gold">CLHMS</span>
              <span className="text-gold/40">·</span>
              <span>MIAMI REALTORS® Global Council / RWorld</span>
              <span className="text-gold/40">·</span>
              <span>25 Años de Licencia (SL705771)</span>
              <span className="text-gold/40">·</span>
              <span>URG Broker de Registro · §475</span>
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70"
            >
              United Realty Group · FL SL705771 · Miami and South Florida REALTORS® · Equal Housing Opportunity
            </motion.p>
          </motion.div>
        </section>

        {/* ── Dos Flujos de Ingresos ─────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Cómo Funciona el Partnership</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Un modelo B2B claro.<br />
                <em className="italic text-gold">Documentado antes de empezar.</em>
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
                El partnership se basa en paquetes mensuales de exposición de listings y en la promoción de carteras seleccionadas — el engagement principal —
                con los referrals de compradores como ventaja secundaria. Cada acuerdo se formaliza por escrito antes de iniciar cualquier trabajo.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              {/* Flujo A — Mensual */}
              <div className="bg-navy-deep p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[11px] font-bold text-gold">A</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/70">Principal · Por Listing · Mensual</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Servicios Mensuales de Marketing</h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">Abonado por la agencia española o el propietario</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  Un acuerdo mensual por listing que incluye alta y mantenimiento en el MLS, sindicación a 200+ portales globales,
                  outreach a agentes compradores y materiales de marketing bilingüe. Se abona como tarifa de servicios profesionales
                  por la infraestructura de distribución — no es contingente a la venta.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Alta y mantenimiento del listing en el MLS",
                    "Sindicación a 200+ portales globales en 19 idiomas",
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">Precio</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Tarifa mensual por listing según nivel de servicio. Ver niveles de servicio abajo o solicitar detalle.</p>
                </div>
              </div>

              {/* Flujo B — Al Cierre */}
              <div className="bg-navy p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[11px] font-bold text-gold">B</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/70">Ventaja Secundaria · Solo en el Cierre</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Comisión de Referral al Cierre</h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">Abonada a través de United Realty Group · Broker licenciado en Florida</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  Cuando una operación cierra a través de la red de Miami, United Realty Group (el broker licenciado en Florida)
                  abona la comisión de referral a la agencia española según el acuerdo escrito firmado.
                  Los términos se negocian y documentan por escrito antes de la activación; no se publican públicamente.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Acuerdo de referral escrito previo a cualquier presentación de comprador",
                    "Abonado por URG (broker licenciado en FL) al cierre exitoso",
                    "Términos negociados y documentados por escrito antes de la activación",
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">Mecanismo</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Documentado mediante acuerdo de referral formal con United Realty Group antes de cualquier presentación de comprador o activación en el MLS.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">
              Ambos flujos de ingresos se formalizan por escrito antes de iniciar cualquier acción de marketing. Sin acuerdos informales.
            </p>
          </div>
        </section>

        {/* ── Arquitectura de Compliance ────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Arquitectura de Compliance</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                El mecanismo legal,<br />
                <em className="italic text-gold">explicado con claridad.</em>
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
                  label: "URG Activa el Listing",
                  body: "United Realty Group — broker licenciado en Florida — coloca el inmueble en el MIAMI International MLS (RWorld), la plataforma de sindicación internacional de la asociación. Un listing formal, no una subida a un portal.",
                },
                {
                  step: "03",
                  label: "Distribución en Red",
                  body: "El inmueble se distribuye a la red global de agentes y brokers del MIAMI International MLS (RWorld) cuando es elegible. El alcance varía según el inmueble y la plataforma.",
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
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/60 mb-4">Infraestructura de Red</p>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    { value: "93.000", label: "Agentes miembro MLS" },
                    { value: "200+", label: "Portales · 19 idiomas" },
                    { value: "3.500+", label: "Agentes URG · 20 oficinas" },
                    { value: "75+", label: "Países · red de partners" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div className="font-serif text-2xl text-white">{value}</div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/60 mb-4">Notas de Compliance</p>
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
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Estructura de Servicio</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Tres niveles de alcance.<br />
                <em className="italic text-gold">Precio por listing, por mes.</em>
              </h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Cada nivel da a la propiedad premium el alcance de la red internacional del MIAMI International MLS (RWorld) — los agentes y brokers que representan a los compradores — activado a través de URG como broker de registro en Florida.
                La diferencia es la profundidad del marketing activo, el outreach a agentes compradores y el soporte estratégico.
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
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold px-3 py-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-navy-deep whitespace-nowrap">
                        Más Seleccionado
                      </span>
                    </>
                  )}

                  <span className="font-mono text-[11px] font-semibold text-gold/55 tracking-[0.22em]">{tier.tier}</span>

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
                    className="mt-2 flex items-center justify-center gap-2 border border-gold/35 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold/75 transition-colors hover:border-gold hover:text-gold"
                  >
                    Solicitar Precio
                    <ChevronRight size={12} />
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">
              Todos los niveles incluyen acuerdo de referral escrito y activación en el MLS con URG como broker de registro.
              La tarifa mensual no incluye la comisión de referral — ese es un pago contingente y separado, abonado al cierre.
            </p>
          </div>
        </section>

        {/* ── Proceso ───────────────────────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Cómo Trabajar Juntos</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Cuatro pasos desde la consulta<br />
                <em className="italic text-gold">hasta la activación de la exposición.</em>
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
                className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                WhatsApp España
              </a>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              ¿Agencia o promotora? Proceso completo de alta:{" "}
              <a href="/spain-mls-listing" className="text-gold underline underline-offset-2 hover:text-white">Inmueble en España → listado en el Miami MLS</a>
            </p>
          </div>
        </section>

        {/* ── Para Quién Es ──────────────────────────────────────────── */}
        <section className="bg-navy-deep py-14 md:py-18 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-6">Perfil Ideal</p>
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
                <span key={tag} className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 divide-x divide-bone rounded-none bg-bone/40">
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">93.000</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold/65">
                  Agentes miembro
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">200+</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold/65">
                  Portales globales · 19 idiomas
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">260+</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold/65">
                  MLS de EE.UU. vía RPR
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
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                PARA QUIÉN ES ESTA ASESORÍA
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
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
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                EL PROCESO
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Cuatro pasos desde la consulta inicial hasta el cierre.
              </h2>
            </div>

            <div className="space-y-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="flex gap-8">
                  <div className="flex-shrink-0 font-mono text-[13px] font-semibold text-gold">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                      {step.body}
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
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Marco Profesional</p>
              <h2 className="mt-4 font-serif text-3xl text-white leading-tight md:text-4xl">
                Qué queda documentado.<br />
                <em className="italic text-gold">Qué queda protegido.</em>
              </h2>
            </div>

            <div className="space-y-5">
              <p className="font-sans text-base leading-relaxed text-white/70">
                Carlos Uzcategui actúa como principal licenciado de registro en Florida, lo que permite a las agencias españolas colocar su inventario premium en el MIAMI International MLS (RWorld) — la plataforma de sindicación internacional de la asociación. La agencia española mantiene la representación local del propietario en todo momento — sin ceder el mandato.
              </p>
              <p className="font-sans text-base leading-relaxed text-white/70">
                Una parte significativa de la demanda prime española es internacional — incluidos compradores americanos y capital latinoamericano, especialmente en Madrid. Los agentes compradores estadounidenses y latinoamericanos que representan esa demanda ya trabajan a través de la red del MIAMI International MLS (RWorld), con distribución a la red global de agentes y brokers partner. Una vía institucional operada por un profesional con 25 años de licencia activa en Florida.
              </p>
            </div>

              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 mb-5">Lo Que Conserva su Agencia</p>
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
        </section>

        {/* ── Formulario ────────────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-24" id="enviar-listing">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Mesa España · Consulta de Agencia</p>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-8">Preguntas Frecuentes</p>
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
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 underline-offset-2 hover:text-white hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={14} className="text-gold flex-shrink-0" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Licenciado · Compliant · Confidencial</p>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-white/70">
                Los servicios de corretaje inmobiliario en Florida son proporcionados a través de United Realty Group (URG).
                Carlos Uzcategui (FL SL705771) es Realtor® licenciado en Florida y afiliado a URG. No está licenciado como broker inmobiliario en España.
                Las oportunidades en España e internacionales se gestionan mediante acuerdos de referral, marketing, cooperating broker o asesoría, según jurisdicción, tipo de inmueble y normativa aplicable.
                La exposición en el MLS de Miami, la sindicación, la compensación por referral, la cooperación y la distribución de listings están sujetas a las normas del MLS, la aprobación del broker, acuerdos escritos, la elegibilidad del inmueble, la ley local y la disponibilidad de cada plataforma.
                No garantizamos compradores, ofertas, cierres, resultados de sindicación ni la colocación en plataformas concretas.
                Todos los compromisos transfronterizos se documentan mediante acuerdos escritos formales antes de cualquier engagement. Equal Housing Opportunity.
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
