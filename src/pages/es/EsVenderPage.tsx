import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "motion/react";
import { ChevronRight, MessageSquare, BadgeCheck } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { CONTACT, ASSOCIATION_STATS } from "../../constants";

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
      name: "Vender",
      item: "https://homesprofessional.com/es/vender",
    },
  ],
};

const STEPS = [
  {
    number: "01",
    // TODO: native Madrid editor review
    label: "Posicionar",
    // TODO: native Madrid editor review
    description:
      "Análisis comparativo de precios, identificación del perfil de comprador y definición del argumento de venta antes de activar ningún canal de distribución.",
  },
  {
    number: "02",
    // TODO: native Madrid editor review
    label: "Preparar",
    // TODO: native Madrid editor review
    description:
      "Orientación sobre presentación, coordinación de fotografía profesional y verificación de la exactitud de los datos en el MLS antes del lanzamiento.",
  },
  {
    number: "03",
    // TODO: native Madrid editor review
    label: "Lanzar",
    // TODO: native Madrid editor review
    description:
      "Activación en el MLS de Miami y Sur de Florida a través de United Realty Group, con distribución simultánea a más de 200 portales globales en 19 idiomas el mismo día del lanzamiento.",
  },
  {
    number: "04",
    // TODO: native Madrid editor review
    label: "Activar",
    // TODO: native Madrid editor review
    description:
      "Contacto dirigido con agentes de compradores, activación de canales de referencia internacionales y alcance específico al mercado de España y Latinoamérica.",
  },
  {
    number: "05",
    // TODO: native Madrid editor review
    label: "Negociar",
    // TODO: native Madrid editor review
    description:
      "Análisis de ofertas, estrategia de condiciones, gestión del período de inspección y coordinación del cierre hasta la firma ante notario.",
  },
];

const DISTRIBUTION_STATS = [
  { value: `${ASSOCIATION_STATS.globalPortals}+`, label: "Portales Globales" },
  { value: String(ASSOCIATION_STATS.languages),   label: "Idiomas" },
  { value: `${ASSOCIATION_STATS.usMls}+`,         label: "MLSs en EE. UU." },
  { value: "$69B",                                 label: "Volumen 2025" },
];

export default function EsVenderPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>
          Vender en Sur de Florida | Estrategia de Venta | Carlos Uzcategui
        </title>
        {/* TODO: native Madrid editor review */}
        <meta
          name="description"
          content="Representación de vendedores en Sur de Florida. Activación en el MLS de Miami, 93.000 agentes miembros, más de 200 portales globales. Carlos Uzcategui, REALTOR® FL SL705771, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/es/vender" />
        <meta property="og:title" content="Vender en Sur de Florida | Estrategia de Venta | Carlos Uzcategui" />
        <meta property="og:description" content="Representación de vendedores en Sur de Florida. Activación en el MLS de Miami, 93,000 agentes miembros, más de 200 portales globales. Carlos Uzcategui · FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/es/vender" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="HomesProfessional.com" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vender en Sur de Florida | Estrategia de Venta" />
        <meta name="twitter:description" content="Activación en el MLS de Miami, 93,000 agentes miembros, más de 200 portales globales. Carlos Uzcategui · FL SL705771." />
        <meta name="twitter:image" content="https://homesprofessional.com/og-image.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender" />
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
                Estrategia de Venta · Sur de Florida · United Realty Group
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl"
              >
                {/* TODO: native Madrid editor review */}
                Su propiedad merece más que visibilidad local.
                <br />
                {/* TODO: native Madrid editor review */}
                <em className="not-italic italic text-gold">
                  Merece alcance global.
                </em>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55"
              >
                {/* TODO: native Madrid editor review */}
                25 años de transacciones en Sur de Florida. Cada exclusiva
                activa la red de la mayor asociación local de REALTORS® del
                mundo — 93.000 agentes miembros, más de 200 portales globales
                en 19 idiomas, 260+ MLSs en EE. UU. a través de RPR — el mismo
                día del lanzamiento.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  {/* TODO: native Madrid editor review */}
                  Solicitar una Revisión Privada de Estrategia de Venta
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
                className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30"
              >
                United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Selling Process ──────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                Proceso de Venta
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Cinco etapas. Una sola referencia de contacto.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-5">
              {STEPS.map((step) => (
                <div key={step.number} className="flex flex-col gap-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    {step.number}
                  </div>
                  <div className="font-serif text-xl text-navy-deep">
                    {step.label}
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-navy-deep/60">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Distribution Proof Strip ─────────────────────────── */}
        <section className="bg-navy-deep py-16">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {/* TODO: native Madrid editor review */}
              Alcance de Distribución Verificado
            </p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {DISTRIBUTION_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-4xl text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              {/* TODO: native Madrid editor review */}
              Cifras correspondientes a la Asociación de REALTORS® de Miami y Sur de Florida · United Realty Group · 2026
            </p>
          </div>
        </section>

        {/* ─── Market Context ───────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  Red de Distribución
                </p>
                <h3 className="mt-3 font-serif text-2xl text-navy-deep">
                  {/* TODO: native Madrid editor review */}
                  Su exclusiva, en todos los mercados relevantes.
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/60">
                  {/* TODO: native Madrid editor review */}
                  A través de United Realty Group y la red de la Asociación de
                  REALTORS® de Miami y Sur de Florida, cada exclusiva llega a
                  93.000 agentes miembros el día del lanzamiento. Los 437 acuerdos
                  internacionales y los 11 intercambios de MLS amplifican ese
                  alcance a compradores de Europa, Latinoamérica y Asia.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  Presencia Institucional
                </p>
                <h3 className="mt-3 font-serif text-2xl text-navy-deep">
                  {/* TODO: native Madrid editor review */}
                  25 años de operaciones en el mismo mercado.
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/60">
                  {/* TODO: native Madrid editor review */}
                  Licencia FL SL705771 activa desde hace 25 años. United Realty
                  Group opera 20 oficinas en Florida con más de 3.500 agentes.
                  Esa profundidad de red se traduce directamente en mayor acceso
                  a compradores calificados para su propiedad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA Band ─────────────────────────────────────────── */}
        <section className="bg-gold py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl text-navy-deep">
              {/* TODO: native Madrid editor review */}
              ¿Listo para posicionar su propiedad en Sur de Florida?
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/70">
              {/* TODO: native Madrid editor review */}
              La revisión privada de estrategia de venta es gratuita y sin
              compromiso de exclusiva. Cubre análisis de precio, calendario de
              lanzamiento y perfil de comprador objetivo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
              >
                {/* TODO: native Madrid editor review */}
                Solicitar Revisión de Estrategia
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
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-navy-deep/50">
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
