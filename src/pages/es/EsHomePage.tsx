import { Helmet } from "react-helmet-async";
import { JsonLd } from "../../components/SEO/JsonLd";
import { motion, type Variants } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { HeroSellerForm } from "../../components/HeroSellerForm";
import { MiamiRealtorsBadge } from "../../components/MiamiRealtorsBadge";
import { EsProof } from "../../components/es/EsProof";
import { EsDistribution } from "../../components/es/EsDistribution";

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
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://homesprofessional.com/es",
    },
  ],
};

export default function EsHomePage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setHasScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>Bienes Raíces en Sur de Florida | United Realty Group | HomesProfessional.com</title>
        {/* TODO: native Madrid editor review */}
        <meta
          name="description"
          content="Carlos Uzcategui, REALTOR® FL SL705771 — 25 años en Sur de Florida. Representación de vendedores y compradores en Miami, Coral Gables y Weston."
        />
        <link rel="canonical" href="https://homesprofessional.com/es" />
        <meta property="og:title" content="Bienes Raíces en Sur de Florida | United Realty Group | HomesProfessional.com" />
        <meta property="og:description" content="Carlos Uzcategui, REALTOR® FL SL705771 — 25 años en Sur de Florida. Representación de vendedores y compradores en Miami, Coral Gables, Weston y todo el Sur de Florida." />
        <meta property="og:url" content="https://homesprofessional.com/es" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bienes Raíces en Sur de Florida | Carlos Uzcategui · United Realty Group" />
        <meta name="twitter:description" content="25 años en Sur de Florida. Representación de vendedores y compradores en Miami, Coral Gables, Weston y todo el Sur de Florida." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
      </Helmet>
      <JsonLd id="es-home-breadcrumb" data={breadcrumbJsonLd} />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen overflow-hidden bg-navy-deep text-white">
          {/* Layered gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(176,141,87,0.10),transparent_42%)]" />

          {/* Photo layer */}
          <div className="absolute inset-0">
            <img
              src="/images/miami-realtors-rworld.jpg"
              alt=""
              aria-hidden="true"
              width="1920"
              height="1080"
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover object-center opacity-0 transition-opacity duration-700"
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.28";
              }}
            />
            <div className="absolute inset-0 bg-navy-deep/55" />
          </div>

          <div className="relative flex min-h-screen items-start pt-24 pb-14 px-6 sm:pt-28 sm:pb-24 sm:px-10 lg:px-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto w-full max-w-4xl text-center"
            >
              {/* Credential badge */}
              <motion.p
                variants={itemVariants}
                className="font-mono mb-4 text-gold uppercase tracking-[0.22em]"
                style={{ fontSize: "0.6875rem" }}
              >
                UNITED REALTY GROUP · CARLOS UZCATEGUI · FL REALTOR® SL705771
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-serif text-white leading-[1.05]"
                style={{ fontSize: "clamp(2.1rem, 6vw, 6.5rem)", fontWeight: 400 }}
              >
                {/* TODO: native Madrid editor review */}
                Los bienes raíces son locales.
                <br />
                {/* TODO: native Madrid editor review */}
                <em className="text-gold font-serif italic">
                  El precio máximo es global.
                </em>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 font-sans font-light text-white/68 leading-[1.85] max-w-[520px]"
                style={{ fontSize: "1.05rem" }}
              >
                {/* TODO: native Madrid editor review */}
                Representación de vendedores en el Sur de Florida y España. Cada
                propiedad en exclusiva activa la red de la asociación local de
                REALTORS® más grande del mundo — 93,000 agentes miembros, 200+
                portales globales en 19 idiomas y 437+ acuerdos internacionales.
              </motion.p>

              {/* Primary seller lead capture */}
              <motion.div
                variants={itemVariants}
                className="mx-auto mt-9 w-full max-w-md"
              >
                <HeroSellerForm lang="es" />
              </motion.div>

              {/* Trust bar — luxury glass cards */}
              <motion.div
                variants={itemVariants}
                className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
              >
                {[
                  { value: "93,000", label: "Agentes Miembros" },
                  { value: "200+",   label: "Portales Globales" },
                  { value: "437+",   label: "Acuerdos Internacionales" },
                  { value: "260+",   label: "MLSs en EE. UU." },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="group relative flex flex-col justify-between rounded-xl border border-gold/25 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:border-gold/55 hover:bg-white/[0.07]"
                  >
                    <div className="h-0.5 w-6 bg-gold/50 transition-all duration-300 group-hover:w-full group-hover:bg-gold" />
                    <div className="mt-3 font-serif text-2xl text-white tracking-tight sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Credibility badges */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {[
                  { text: "FL Licenciado REALTOR® Desde 2001 (25 Años)" },
                  { text: "CLHMS™ · Especialista Certificado en Lujo" },
                  { text: "United Realty Group · 3,500+ Agentes · 20 Oficinas FL" },
                ].map(({ text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm transition-colors hover:border-gold/40"
                  >
                    <BadgeCheck size={13} className="text-gold flex-shrink-0" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Audience navigator */}
              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-wrap items-center justify-center gap-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {/* TODO: native Madrid editor review */}
                  Soy:
                </span>
                {[
                  {
                    // TODO: native Madrid editor review
                    label: "Vendedor",
                    href: "/es/vender",
                  },
                  {
                    // TODO: native Madrid editor review
                    label: "Comprador",
                    href: "/es/comprar",
                  },
                  {
                    // TODO: native Madrid editor review
                    label: "Agente",
                    href: "/es/agentes",
                  },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="border border-white/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-all duration-200 hover:border-gold hover:text-gold"
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 0 : 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              {/* TODO: native Madrid editor review */}
              Desplazar
            </span>
            <span className="h-10 w-px overflow-hidden bg-white/10">
              <motion.span
                className="block h-6 w-px bg-gold"
                animate={{ y: [-24, 40] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.7,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.div>
        </section>

        <EsProof />
        <EsDistribution />

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
