import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
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
          content="Carlos Uzcategui, REALTOR® FL SL705771, United Realty Group — 25 años de transacciones inmobiliarias en Sur de Florida. Representación de vendedores y compradores en Miami, Coral Gables, Weston y todo el Sur de Florida."
        />
        <link rel="canonical" href="https://homesprofessional.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay">
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
              src="/images/hero-bg.jpg"
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

          <div className="relative flex min-h-screen items-start pt-6 pb-14 px-6 sm:pt-10 sm:pb-24 sm:px-10 lg:px-20">
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
                style={{ fontSize: "0.62rem" }}
              >
                UNITED REALTY GROUP · CARLOS UZCATEGUI · FL REALTOR® SL705771
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-serif text-white leading-[1.05]"
                style={{ fontSize: "clamp(3.2rem, 6vw, 6.5rem)", fontWeight: 400 }}
              >
                {/* TODO: native Madrid editor review */}
                Los bienes raíces son locales.
                <br />
                {/* TODO: native Madrid editor review */}
                <em className="text-gold not-italic font-serif italic">
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
                25 años de transacciones inmobiliarias en Sur de Florida.
                Cada propiedad en exclusiva activa la red de la mayor asociación
                local de REALTORS® del mundo — 93,000 agentes miembros, más de
                200 portales globales en 19 idiomas, 385 MLSs en EE. UU. a
                través de RPR — de forma simultánea, desde el primer día.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="mt-9 flex flex-wrap justify-center gap-3"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft active:scale-95"
                >
                  {/* TODO: native Madrid editor review */}
                  Solicitar una Revisión Privada de Estrategia de Venta
                  <ChevronRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href={CONTACT.whatsappUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold active:scale-95"
                >
                  <MessageSquare size={14} />
                  {/* TODO: native Madrid editor review */}
                  WhatsApp con Carlos
                </a>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/30"
              >
                {/* TODO: native Madrid editor review */}
                Gratis · Sin compromiso de exclusiva
              </motion.p>

              {/* Trust bar */}
              <motion.div
                variants={itemVariants}
                className="mx-auto mt-12 grid grid-cols-4 gap-6 border-t border-white/10 pt-9 sm:max-w-xl"
              >
                {[
                  {
                    value: "25",
                    // TODO: native Madrid editor review
                    label: "Años con Licencia",
                  },
                  {
                    value: "93K",
                    // TODO: native Madrid editor review
                    label: "Agentes Miembros",
                  },
                  {
                    value: "19",
                    // TODO: native Madrid editor review
                    label: "Oficinas en Florida",
                  },
                  {
                    value: "200+",
                    // TODO: native Madrid editor review
                    label: "Portales Globales",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl text-white lg:text-3xl">
                      {s.value}
                    </div>
                    <div className="font-mono mt-1 text-[7px] uppercase tracking-[0.18em] text-gold/65">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Credentials pill */}
              <motion.div
                variants={itemVariants}
                className="mt-7 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm"
              >
                <BadgeCheck size={14} className="text-gold flex-shrink-0" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                  United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
                </span>
              </motion.div>

              {/* Audience navigator */}
              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-wrap items-center justify-center gap-2"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
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
                    className="border border-white/15 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 transition-all duration-200 hover:border-gold hover:text-gold"
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
            <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/25">
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

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
