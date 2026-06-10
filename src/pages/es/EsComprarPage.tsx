import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "motion/react";
import { ChevronRight, MessageSquare, BadgeCheck, MapPin } from "lucide-react";
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
          content="Representación bilingüe para compradores internacionales en Sur de Florida. España y Latinoamérica bienvenidos. Carlos Uzcategui, FL SL705771."
        />
        <link
          rel="canonical"
          href="https://homesprofessional.com/es/comprar"
        />
        <meta property="og:title" content="Comprar en Sur de Florida | Representación de Compradores | Carlos Uzcategui" />
        <meta property="og:description" content="Representación bilingüe para compradores internacionales en Sur de Florida. Compradores de España y Latinoamérica bienvenidos. Carlos Uzcategui, REALTOR® FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/es/comprar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comprar en Sur de Florida | Representación de Compradores | Carlos Uzcategui" />
        <meta name="twitter:description" content="Representación bilingüe para compradores de España y Latinoamérica en Sur de Florida. Acceso completo al MLS. United Realty Group." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/comprar" />
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
                <em className="not-italic italic text-gold">
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
                25 años de relaciones locales en Sur de Florida al servicio de
                compradores internacionales que operan desde Europa y
                Latinoamérica.
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
                className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30"
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
                La consultoría de comprador es gratuita — los honorarios de
                representación corren a cargo del vendedor en todas las
                operaciones de compraventa en Florida.
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
