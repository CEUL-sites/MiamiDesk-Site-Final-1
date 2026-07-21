import { Helmet } from "react-helmet-async";
import { JsonLd } from "../../components/SEO/JsonLd";
import { BadgeCheck, ChevronRight, Download, MessageSquare } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../../components/DesktopStickyCTA";
import { ExitIntentModal } from "../../components/ExitIntentModal";
import { LazyVideo } from "../../components/LazyVideo";
import { SellerNetCalculator } from "../../components/SellerNetCalculator";
import { NeighborhoodMarketStats } from "../../components/NeighborhoodMarketStats";
import { CONTACT, LEAD_MAGNETS } from "../../constants";
import { AGGREGATE_RATING } from "../../data/reviews";

// Spanish equivalent of src/pages/SellDoralPage.tsx — same claims, market
// figures (src/data/cityMarketStats.ts), and compliance ceiling, localized.
// Conversion components mounted the way src/pages/es/EsVenderPage.tsx does:
// SellerNetCalculator + sticky CTAs/modal with lang="es". SellerIntakeForm,
// HeroReachBar, CityListingsSample, and NearbyMarkets are English-only UI
// components (no `lang` prop) and are intentionally not mounted here — see
// the task report for details.

const DORAL_FAQS_ES = [
  {
    // TODO: native Madrid editor review
    q: "¿Cómo está el mercado de vivienda en Doral, FL actualmente?",
    // TODO: native Madrid editor review
    a: "El mercado residencial de Doral incluye comunidades planificadas con construcciones más nuevas de casas unifamiliares y townhomes en una variedad de rangos de precio. Según datos del MLS de Miami y el Sur de Florida REALTORS®, los precios varían según la comunidad, el tamaño del lote, el año de construcción y la cercanía a las vías principales. Carlos ofrece un análisis de precios específico por comunidad como parte de cada revisión de estrategia para vendedores.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Cuánto tiempo toma vender una casa en Doral?",
    // TODO: native Madrid editor review
    a: "Las casas en Doral ubicadas en comunidades con una administración de HOA sólida, buenas escuelas y un precio competitivo se han movido de forma eficiente en ciclos recientes — particularmente las propiedades dirigidas al grupo de compradores latinoamericanos que impulsa gran parte de la demanda local. El plazo varía según el rango de precio y la comunidad. Esto no constituye una garantía de resultado; Carlos ofrece una estimación específica de la propiedad durante la revisión de estrategia.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Es Doral un mercado fuerte para compradores latinoamericanos?",
    // TODO: native Madrid editor review
    a: "Sí — Doral tiene una de las concentraciones más altas de demanda de compradores venezolanos y colombianos en el condado de Miami-Dade. La sólida infraestructura comunitaria latinoamericana de la ciudad, su entorno bilingüe, la cercanía a escuelas internacionales y el acceso al aeropuerto la convierten en un destino constante de reubicación para compradores de Venezuela, Colombia y el resto de Latinoamérica. La red de Carlos llega directamente a estos perfiles de comprador.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Qué tipo de comunidades tienen más demanda en Doral?",
    // TODO: native Madrid editor review
    a: "Las comunidades cerradas con construcciones más nuevas, acceso controlado y una administración de HOA sólida atraen constantemente los grupos de compradores más profundos en Doral. Las comunidades cercanas a escuelas de alto rendimiento y al corredor de Doral suelen generar una actividad de ofertas más competitiva. Carlos ofrece una evaluación de demanda a nivel de comunidad como parte de la revisión de estrategia para vendedores.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Qué es la revisión de estrategia para vendedores?",
    // TODO: native Madrid editor review
    a: "Una sesión gratuita y confidencial en la que Carlos revisa su propiedad, su potencial de posicionamiento en el MLS, los comparables actuales del mercado y la estrategia de distribución — sin compromiso de listado. Envíe el formulario a continuación o contacte a Carlos directamente por WhatsApp.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://homesprofessional.com/" },
    { "@type": "ListItem", position: 2, name: "Español", item: "https://homesprofessional.com/es" },
    { "@type": "ListItem", position: 3, name: "Vender", item: "https://homesprofessional.com/es/vender" },
    { "@type": "ListItem", position: 4, name: "Vender en Doral", item: "https://homesprofessional.com/es/vender-doral" },
  ],
};

export default function EsVenderDoralPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>Vender su Casa en Doral, FL | Posicionamiento MLS y Activación de Compradores | Carlos Uzcategui</title>
        {/* TODO: native Madrid editor review */}
        <meta name="description" content="Agente listador en Doral, FL — MLS, compradores LATAM y red de agentes. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-doral" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-doral" />
        {/* TODO: native Madrid editor review */}
        <meta property="og:title" content="Vender su Casa en Doral, FL | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        {/* TODO: native Madrid editor review */}
        <meta property="og:description" content="Representación profesional de vendedores en Doral, FL — activación en el MLS, alcance a compradores latinoamericanos y distribución internacional. Revisión de estrategia gratuita y confidencial." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* TODO: native Madrid editor review */}
        <meta name="twitter:title" content="Vender su Casa en Doral, FL | Carlos Uzcategui, FL SL705771" />
        {/* TODO: native Madrid editor review */}
        <meta name="twitter:description" content="Posicionamiento profesional en el MLS y activación de agentes compradores para vendedores en Doral, FL. Revisión de estrategia gratuita — sin compromiso de listado." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-doral" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-doral" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-doral" />
      </Helmet>
      <JsonLd id="es-vender-doral-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="es-vender-doral-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": DORAL_FAQS_ES.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="es-vender-doral-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Doral FL Listing Agent",
          "url": "https://homesprofessional.com/es/vender-doral",
          "areaServed": { "@type": "City", "name": "Doral", "addressRegion": "FL", "postalCode": "33178", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="es-vender-doral-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Representación de vendedores y listado MLS — Doral, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Doral", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/es/vender-doral"
          },
          "url": "https://homesprofessional.com/es/vender-doral"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo idle src="/videos/dollhouse_global_reach.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            {/* TODO: native Madrid editor review */}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Doral, FL · Asesoría para Vendedores</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              {/* TODO: native Madrid editor review */}
              Venda su casa en Doral con el alcance<br />
              <em className="italic text-gold">de la asociación local de REALTORS® más grande del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              {/* TODO: native Madrid editor review */}
              Las comunidades planificadas de Doral y una de las mayores concentraciones de compradores latinoamericanos
              en Miami-Dade exigen un agente listador que entienda tanto el mercado local como la demanda internacional
              que lo impulsa. Posicionamiento profesional en el MLS. Activación de agentes compradores. Distribución internacional.
            </p>
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {[
                // TODO: native Madrid editor review
                "Precio y posicionamiento basados en el MLS",
                // TODO: native Madrid editor review
                "Su comprador más probable — local y global",
                // TODO: native Madrid editor review
                "Una estimación clara de ganancias netas",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2 font-sans text-[13px] text-white/75">
                  <BadgeCheck size={15} className="flex-shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                {/* TODO: native Madrid editor review */}
                Ver el Valor de Mi Casa en Doral
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white">
                <MessageSquare size={14} />
                {/* TODO: native Madrid editor review */}
                WhatsApp a Carlos
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
              <span className="flex gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#B08D57">
                    <path d="M6 0l1.35 4.15H12L8.32 6.72 9.67 10.87 6 8.3 2.33 10.87 3.68 6.72 0 4.15h4.65z" />
                  </svg>
                ))}
              </span>
              {/* TODO: native Madrid editor review */}
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                5.0 · Gratis y confidencial · Sin compromiso de listado · Respuesta personal de Carlos
              </span>
            </div>

            <blockquote className="mx-auto mt-5 max-w-md border-l-2 border-gold/30 pl-4 text-left">
              {/* TODO: native Madrid editor review */}
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"Como familia venezolana vendiendo en Doral, necesitábamos a alguien que realmente entendiera nuestra comunidad de compradores. Carlos construyó su práctica en este mercado — se nota."</p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/50">— Luis C., Doral, FL</footer>
            </blockquote>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                {/* TODO: native Madrid editor review */}
                O descargue la Hoja de Ganancias del Vendedor 2026
              </a>
            </div>
            {/* TODO: native Madrid editor review */}
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              United Realty Group · CLHMS · FL SL705771 · 25 Años Licenciado en Florida · Oficina: Weston, FL 33331
            </p>

            {/* Distribution reach strip — verified figures (src/data/figures.json) */}
            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-start justify-center gap-x-6 gap-y-3 border-y border-white/10 py-4 sm:max-w-3xl sm:gap-x-10" role="list" aria-label="Alcance de la red de distribución">
              {[
                // TODO: native Madrid editor review
                { value: "93.000", label: "Agentes miembros" },
                { value: "200+", label: "Portales globales" },
                { value: "19", label: "Idiomas" },
                { value: "437+", label: "Acuerdos internacionales" },
                { value: "260+", label: "MLSs en EE. UU." },
              ].map((f) => (
                <div key={f.label} role="listitem" className="min-w-[5rem] text-center">
                  <div className="font-serif text-xl leading-none text-gold md:text-2xl">{f.value}</div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 md:text-[10px]">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            {/* TODO: native Madrid editor review */}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Por Qué Doral</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              {/* TODO: native Madrid editor review */}
              Una comunidad planificada con uno de los grupos de compradores latinoamericanos más profundos del Sur de Florida.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              {/* TODO: native Madrid editor review */}
              Doral combina construcciones más nuevas, comunidades cerradas, una sólida infraestructura bilingüe y una
              cercanía excepcional al aeropuerto, formando uno de los mercados de demanda más constantes de Miami-Dade.
              Compradores venezolanos, colombianos y de toda Latinoamérica han convertido a Doral en un destino
              principal de reubicación e inversión — atraídos por las escuelas, la seguridad y la familiaridad cultural
              de la comunidad.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                // TODO: native Madrid editor review
                { label: "Perfil de Comprador", value: "LATAM + Internacional", sub: "Entre las mayores concentraciones de compradores venezolanos y colombianos en Miami-Dade" },
                { label: "Tipo de Comunidad", value: "Planificada y Cerrada", sub: "Construcciones más nuevas con administración de HOA sólida" },
                { label: "Acceso", value: "Aeropuerto + Corredores", sub: "La cercanía a MIA y a las vías rápidas principales impulsa la demanda de reubicación" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{stat.label}</p>
                  <p className="mt-3 font-serif text-2xl text-navy-deep">{stat.value}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Distribution advantage */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                {/* TODO: native Madrid editor review */}
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">La Ventaja de la Red</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  {/* TODO: native Madrid editor review */}
                  Su exclusiva en Doral llega a cada comprador,<br />
                  <em className="italic text-gold">dondequiera que esté buscando.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  {/* TODO: native Madrid editor review */}
                  La activación profesional en el MLS a través de United Realty Group significa que su propiedad entra
                  en la red de una correduría de servicio completo fundada en 2002 — más de 3.500 agentes en 20 oficinas
                  en Florida — no un portal, sino una infraestructura profesional.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    // TODO: native Madrid editor review
                    "MLS de Miami y el Sur de Florida REALTORS® — 93.000 agentes miembros",
                    "Distribución elegible a 200+ portales globales en 19 idiomas",
                    "United Realty Group — 3.500+ agentes en 20 oficinas de Florida",
                    "Canal directo de compradores LATAM y europeos",
                    "437+ acuerdos internacionales en 75+ países",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  // TODO: native Madrid editor review
                  { label: "Estrategia", text: "Análisis de precios + CMA específico para su comunidad y año de construcción en Doral" },
                  { label: "Posicionamiento", text: "Activación profesional en el MLS a través de United Realty Group" },
                  { label: "Distribución", text: "Alcance a agentes compradores + red de referidos LATAM" },
                  { label: "Negociación", text: "Revisión de ofertas, estrategia de condiciones y coordinación del cierre" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 w-24 flex-shrink-0 pt-0.5">{step.label}</span>
                    <p className="font-sans text-sm text-white/65">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gold/20 bg-navy py-12 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              {/* TODO: native Madrid editor review */}
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Preguntas de Vendedores en Doral</p>
              {/* TODO: native Madrid editor review */}
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Preguntas frecuentes.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {DORAL_FAQS_ES.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-serif text-lg text-white leading-snug mb-3">{faq.q}</p>
                  <p className="font-sans text-[0.9rem] leading-relaxed text-white/65">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® Q2 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Doral" />

        <SellerNetCalculator sourcePage="es-vender-doral" lang="es" />

        {/* CTA Band — anchor target for MobileStickyCTA's Spanish "Vender mi casa" pill */}
        <section id="contact" className="scroll-mt-24 bg-gold py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            {/* TODO: native Madrid editor review */}
            <h2 className="font-serif text-3xl text-navy-deep">¿Listo para posicionar su propiedad en Doral?</h2>
            {/* TODO: native Madrid editor review */}
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/70">
              No se requiere compromiso de listado. Carlos revisa personalmente cada solicitud de Doral antes de responder.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="/contact" className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85">
                {/* TODO: native Madrid editor review */}
                Solicitar Revisión de Estrategia
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-navy-deep/30 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy-deep hover:bg-navy-deep/5">
                <MessageSquare size={14} />
                {/* TODO: native Madrid editor review */}
                WhatsApp EE.UU.
              </a>
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-navy-deep/30 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy-deep hover:bg-navy-deep/5">
                <MessageSquare size={14} />
                {/* TODO: native Madrid editor review */}
                WhatsApp España
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep/50">
              <div className="flex items-center gap-2">
                <BadgeCheck size={14} className="text-navy-deep/50" />
                {/* TODO: native Madrid editor review */}
                <span>Confidencial · Profesionales con Licencia · Igualdad de Acceso a la Vivienda</span>
              </div>
              <a href={`mailto:${CONTACT.email}`} className="text-navy-deep/60 underline hover:text-navy-deep">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/70">
              <a href="/es" className="hover:text-gold">Inicio</a>
              {" · "}
              <a href="/es/vender" className="hover:text-gold">Vender en el Sur de Florida</a>
              {" · "}
              Doral, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
        <DesktopStickyCTA lang="es" />
        <ExitIntentModal lang="es" />
      </main>
    </>
  );
}
