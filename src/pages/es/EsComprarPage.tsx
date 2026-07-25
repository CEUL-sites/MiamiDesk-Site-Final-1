import { Helmet } from "react-helmet-async";
import { JsonLd } from "../../components/SEO/JsonLd";
import { motion, type Variants } from "motion/react";
import {
  ChevronRight,
  MessageSquare,
  BadgeCheck,
  MapPin,
  Banknote,
  Sun,
  Globe2,
  HeartPulse,
  Landmark,
  Plane,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { CONTACT } from "../../constants";

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
      name: "Inicio",
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
      name: "Comprar",
      item: "https://homesprofessional.com/es/comprar",
    },
  ],
};

const BUYER_PROFILES = [
  {
    // TODO: native Madrid editor review
    title: "Comprador Internacional",
    // TODO: native Madrid editor review
    description:
      "Compradores procedentes de España y Latinoamérica que adquieren activos denominados en dólares. Operaciones independientes de visado. Representación bilingüe en todas las etapas del proceso.",
  },
  {
    // TODO: native Madrid editor review
    title: "Comprador de Reubicación",
    // TODO: native Madrid editor review
    description:
      "Familias y profesionales que trasladan su residencia principal desde España o Latinoamérica a Sur de Florida. Asesoramiento sobre zonas escolares, acceso a servicios y conectividad con la comunidad hispanohablante.",
  },
  {
    // TODO: native Madrid editor review
    title: "Inversor",
    // TODO: native Madrid editor review
    description:
      "Perfiles orientados a la rentabilidad por arrendamiento y la revalorización de activos en dólares. Análisis de rentabilidad bruta, ocupación histórica y mercado de alquiler por zona antes de cada oferta.",
  },
  {
    // TODO: native Madrid editor review
    title: "Comprador por Referencia de Agente",
    // TODO: native Madrid editor review
    description:
      "Clientes derivados por agentes inmobiliarios de Europa o Latinoamérica. Gestión completa del proceso en Sur de Florida con comunicación directa al agente de origen durante toda la operación.",
  },
];

const NEIGHBORHOODS = [
  {
    name: "Brickell",
    // TODO: native Madrid editor review
    description:
      "Distrito financiero de Miami con alta concentración de rascacielos residenciales y proximidad a centros corporativos.",
  },
  {
    name: "Coral Gables",
    // TODO: native Madrid editor review
    description:
      "Zona residencial de prestigio con arquitectura mediterránea, grandes parcelas y colegios de primer nivel.",
  },
  {
    name: "Miami Beach",
    // TODO: native Madrid editor review
    description:
      "Mercado costero con alta demanda internacional, desde apartamentos en primera línea hasta propiedades históricas en South Beach.",
  },
  {
    name: "Aventura",
    // TODO: native Madrid editor review
    description:
      "Comunidad planificada con concentración significativa de compradores latinoamericanos y europeos, acceso al metro y alta oferta de servicios.",
  },
  {
    name: "Weston",
    // TODO: native Madrid editor review
    description:
      "Municipio del condado de Broward conocido por sus comunidades cerradas, colegios valorados y perfil familiar estable.",
  },
  {
    name: "Doral",
    // TODO: native Madrid editor review
    description:
      "Zona de crecimiento acelerado con fuerte comunidad hispanohablante, buen acceso al aeropuerto de Miami y amplia oferta de nueva construcción.",
  },
  {
    name: "Coconut Grove",
    // TODO: native Madrid editor review
    description:
      "El barrio más antiguo de Miami, con carácter bohemio, arbolado denso, marina y propiedades singulares de alta cotización.",
  },
  {
    name: "Bal Harbour",
    // TODO: native Madrid editor review
    description:
      "Enclave residencial exclusivo al norte de Miami Beach con acceso directo a playa y una de las zonas comerciales de mayor volumen por metro cuadrado del país.",
  },
];

export default function EsComprarPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>
          Comprar en Sur de Florida | Representación de Compradores | Carlos Uzcategui
        </title>
        {/* TODO: native Madrid editor review */}
        <meta
          name="description"
          content="Representación bilingüe para compradores internacionales en Sur de Florida — 25 años de experiencia respaldados por United Realty Group: 3,500+ agentes y 20 oficinas en Florida. Carlos Uzcategui, FL SL705771."
        />
        <link
          rel="canonical"
          href="https://homesprofessional.com/es/comprar"
        />
        <meta property="og:title" content="Comprar en Sur de Florida | Representación de Compradores | Carlos Uzcategui" />
        <meta property="og:description" content="Representación bilingüe para compradores internacionales en Sur de Florida. Compradores de España y Latinoamérica bienvenidos. Carlos Uzcategui, REALTOR® FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/es/comprar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comprar en Sur de Florida | Representación de Compradores | Carlos Uzcategui" />
        <meta name="twitter:description" content="Representación bilingüe para compradores de España y Latinoamérica en Sur de Florida. Acceso completo al MLS. United Realty Group." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/comprar" />
      </Helmet>
      <JsonLd id="es-comprar-breadcrumb" data={breadcrumbJsonLd} />

      <main id="main-content" className="min-h-screen bg-white-soft pb-20 lg:pb-0">
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
                Compradores · Sur de Florida · Consultoría Bilingüe
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl"
              >
                {/* TODO: native Madrid editor review */}
                Comprar en Sur de Florida desde España o Latinoamérica.
                <br />
                {/* TODO: native Madrid editor review */}
                <em className="italic text-gold">
                  Privado. Bilingüe. Con 25 años de experiencia.
                </em>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55"
              >
                {/* TODO: native Madrid editor review */}
                Acceso completo al MLS en Miami-Dade, Broward y Palm Beach, con
                representación bilingüe en inglés y español en todas las etapas.
                25 años de experiencia respaldados por United Realty Group — una
                de las mayores agencias independientes de Florida, con{" "}
                {CONTACT.stats.urgAgents} agentes y {CONTACT.stats.urgOffices}{" "}
                oficinas que cubren prácticamente cada zona de Broward y
                Miami-Dade.
              </motion.p>

              {/* Escala — la fortaleza en cuatro cifras */}
              <motion.div
                variants={itemVariants}
                className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4"
              >
                {[
                  // TODO: native Madrid editor review
                  { value: `${CONTACT.stats.experience} años`, label: "Con licencia desde 2001" },
                  { value: CONTACT.stats.urgAgents, label: "Agentes de URG" },
                  { value: CONTACT.stats.urgOffices, label: "Oficinas en Florida" },
                  { value: CONTACT.stats.urgFounded, label: "Fundación de URG" },
                ].map((s) => (
                  <div key={s.label} className="bg-navy-deep/80 px-4 py-4">
                    <p className="font-serif text-2xl text-gold">{s.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  {/* TODO: native Madrid editor review */}
                  Solicitar una consulta de comprador privada
                  <ChevronRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href={CONTACT.whatsappUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <MessageSquare size={14} />
                  {/* TODO: native Madrid editor review */}
                  WhatsApp Carlos
                </a>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70"
              >
                United Realty Group · FL SL705771 · Miami-Dade · Broward · Palm Beach
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Buyer Profiles ───────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                Perfiles de Comprador
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Representación adaptada a cada tipo de operación.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-navy-deep/60">
                {/* TODO: native Madrid editor review */}
                La consulta inicial de comprador es gratuita y sin compromiso.
                Los honorarios de representación son negociables y, en muchas
                operaciones, los asume el vendedor — se acuerdan con claridad
                por escrito antes de empezar.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {BUYER_PROFILES.map((profile) => (
                <div
                  key={profile.title}
                  className="border border-navy-deep/10 p-8 transition-shadow hover:shadow-md"
                >
                  <h3 className="font-serif text-xl text-navy-deep">
                    {profile.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy-deep/60">
                    {profile.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── La red detrás de cada compra — URG ───────────────── */}
        <section className="bg-navy-deep/4 py-20 border-t border-navy-deep/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  La Red Detrás de Cada Compra
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  {/* TODO: native Madrid editor review */}
                  Un agente negocia por usted.{" "}
                  <span className="italic font-light text-gold-ink">
                    {CONTACT.stats.urgAgents} lo respaldan.
                  </span>
                </h2>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-navy-deep/65">
                  {/* TODO: native Madrid editor review */}
                  Carlos es asociado de United Realty Group — una de las mayores
                  agencias inmobiliarias independientes de Florida. Fundada
                  en {CONTACT.stats.urgFounded}, URG cuenta
                  con {CONTACT.stats.urgAgents} agentes con licencia
                  y {CONTACT.stats.urgOffices} oficinas en Florida, desde su sede
                  central en Plantation hasta Broward, Miami-Dade y Palm Beach.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    // TODO: native Madrid editor review
                    `${CONTACT.stats.urgAgents} agentes con licencia en ${CONTACT.stats.urgOffices} oficinas de Florida`,
                    "Cobertura local de Broward y Miami-Dade — Weston, Pembroke Pines, Kendall, Hialeah, Aventura, Fort Lauderdale y más",
                    "Acceso completo al MLS de Miami and South Florida REALTORS®",
                    "Representación bilingüe en inglés y español",
                    "Agencia independiente de servicio completo — establecida en 2002",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-[14px] leading-snug text-navy-deep/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Video del equipo URG */}
              <div className="overflow-hidden border border-navy-deep/10 bg-navy-deep shadow-xl shadow-navy/10">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/M8Hx5D5ghag?si=XAE-_zpkAJCVf_Yp&rel=0&modestbranding=1"
                    title="United Realty Group — el equipo detrás de cada compra en Sur de Florida"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="bg-navy-deep px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">United Realty Group · El Equipo</p>
                  <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                    {CONTACT.stats.urgAgents} agentes · {CONTACT.stats.urgOffices} oficinas · Sede en Plantation · Est. {CONTACT.stats.urgFounded}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Process Overview ─────────────────────────────────── */}
        <section className="bg-navy-deep/4 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                Proceso de Compra
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Del primer contacto al cierre.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                {
                  number: "01",
                  // TODO: native Madrid editor review
                  label: "Consulta Inicial",
                  // TODO: native Madrid editor review
                  desc: "Definición de criterios de búsqueda, presupuesto, zonas preferentes y calendario de operación.",
                },
                {
                  number: "02",
                  // TODO: native Madrid editor review
                  label: "Búsqueda en MLS",
                  // TODO: native Madrid editor review
                  desc: "Acceso completo al MLS con selección filtrada de propiedades que se ajustan al mandato del comprador.",
                },
                {
                  number: "03",
                  // TODO: native Madrid editor review
                  label: "Oferta y Negociación",
                  // TODO: native Madrid editor review
                  desc: "Redacción y presentación de oferta, estrategia de condiciones, gestión de la inspección y contingencias.",
                },
                {
                  number: "04",
                  // TODO: native Madrid editor review
                  label: "Cierre",
                  // TODO: native Madrid editor review
                  desc: "Coordinación con el title company, financiación o pago al contado, y entrega de llaves.",
                },
              ].map((step) => (
                <div key={step.number} className="flex flex-col gap-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    {step.number}
                  </div>
                  <div className="font-serif text-lg text-navy-deep">
                    {step.label}
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-navy-deep/60">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Por qué Florida ──────────────────────────────────── */}
        <section className="bg-navy-deep py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                Mudarse a Florida
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                {/* TODO: native Madrid editor review */}
                Por qué los compradores siguen eligiendo Sur de Florida.
              </h2>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Banknote,
                  // TODO: native Madrid editor review
                  title: "Sin impuesto estatal sobre la renta",
                  desc: "Florida no aplica impuesto estatal sobre la renta personal — una ventaja estructural para profesionales, jubilados y empresarios que se trasladan.",
                },
                {
                  icon: Sun,
                  // TODO: native Madrid editor review
                  title: "Clima subtropical todo el año",
                  desc: "Miami es la única gran ciudad subtropical de los EE. UU. continentales, con una temperatura media de 24 °C.",
                },
                {
                  icon: Globe2,
                  // TODO: native Madrid editor review
                  title: "Mercado nº 1 para compradores globales",
                  desc: "Uno de cada cinco compradores internacionales en EE. UU. compra en Florida — y el 52% de ellos lo hace en el área de Miami.",
                },
                {
                  icon: HeartPulse,
                  // TODO: native Madrid editor review
                  title: "Ciudad más feliz y saludable de EE. UU.",
                  desc: "Miami encabeza el Mindbody Wellness Index, con sistemas hospitalarios de primer nivel como Baptist Health y Bascom Palmer.",
                },
                {
                  icon: Landmark,
                  // TODO: native Madrid editor review
                  title: "«La capital del capital»",
                  desc: "Segundo centro financiero de la costa este: más de 60 bancos internacionales, 1.400+ multinacionales y el 2º hub tecnológico emergente de EE. UU. (Forbes).",
                },
                {
                  icon: Plane,
                  // TODO: native Madrid editor review
                  title: "Puerta de las Américas",
                  desc: "MIA es el 2º aeropuerto de EE. UU. en pasajeros internacionales, con el mayor número de vuelos a Latinoamérica y el Caribe, y conexión directa con España.",
                },
              ].map((r) => (
                <div key={r.title} className="bg-navy-deep/90 p-6">
                  <r.icon size={20} className="text-gold" />
                  <h3 className="mt-4 font-serif text-lg leading-snug text-white">{r.title}</h3>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/55">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Fuente: Miami and South Florida REALTORS® — «Top 20 Reasons to Buy &amp; Live in Miami» (MiamiRealtors.com)
            </p>
          </div>
        </section>

        {/* ─── Neighborhoods ────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                Zonas Principales
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Sur de Florida, barrio a barrio.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {NEIGHBORHOODS.map((n) => (
                <div
                  key={n.name}
                  className="flex gap-4 border-b border-navy-deep/8 pb-4"
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-gold"
                  />
                  <div>
                    <p className="font-serif text-base text-navy-deep">
                      {n.name}
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-navy-deep/55">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ¿Compra en España? — servicio aparte ─────────────── */}
        <section className="bg-navy-deep/4 py-14 border-t border-navy-deep/10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {/* TODO: native Madrid editor review */}
              Servicio Aparte · Comprar en España
            </p>
            <h2 className="mt-4 font-serif text-2xl text-navy-deep md:text-3xl">
              {/* TODO: native Madrid editor review */}
              ¿Busca propiedad en España? Es un servicio distinto.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-navy-deep/60">
              {/* TODO: native Madrid editor review */}
              Carlos tiene licencia en Florida — no en España. Para compras en
              España actúa como punto de introducción: le conecta con
              profesionales locales de confianza mediante relaciones formales de
              referido, con transparencia en cada paso.
            </p>
            <a
              href="/es/spain-desk"
              className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep transition-colors hover:text-gold"
            >
              {/* TODO: native Madrid editor review */}
              Conocer el Spain Desk →
            </a>
          </div>
        </section>

        {/* ─── CTA Band ─────────────────────────────────────────── */}
        <section className="bg-gold py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl text-navy-deep">
              {/* TODO: native Madrid editor review */}
              ¿Buscando propiedad en Sur de Florida?
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/70">
              {/* TODO: native Madrid editor review */}
              La consulta de comprador es gratuita y sin compromiso. Cubrimos
              acceso al MLS, análisis de zonas y estrategia de oferta desde el
              primer contacto.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
              >
                {/* TODO: native Madrid editor review */}
                Solicitar una consulta de comprador privada
                <ChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-navy-deep/30 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy-deep hover:bg-navy-deep/5"
              >
                <MessageSquare size={14} />
                {/* TODO: native Madrid editor review */}
                WhatsApp Carlos
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <BadgeCheck size={14} className="text-navy-deep/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep/50">
                {/* TODO: native Madrid editor review */}
                Confidencial · Profesionales con Licencia · Igualdad de Acceso a la Vivienda
              </span>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
