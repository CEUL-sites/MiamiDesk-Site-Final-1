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

// Spanish equivalent of src/pages/SellCoralGablesPage.tsx — same claims,
// market figures (src/data/cityMarketStats.ts), and compliance ceiling,
// localized. Conversion components mounted the way
// src/pages/es/EsVenderPage.tsx does: SellerNetCalculator + sticky
// CTAs/modal with lang="es". SellerIntakeForm, HeroReachBar,
// CityListingsSample, and NearbyMarkets are English-only UI components
// (no `lang` prop) and are intentionally not mounted here — see the task
// report for details.

const CORAL_GABLES_FAQS_ES = [
  {
    // TODO: native Madrid editor review
    q: "¿En qué rango de precios se venden normalmente las casas en Coral Gables?",
    // TODO: native Madrid editor review
    a: "Coral Gables es uno de los mercados de lujo más consolidados del condado de Miami-Dade. Las casas unifamiliares van desde aproximadamente $1.5M para viviendas tradicionales bien mantenidas hasta más de $10M para propiedades frente al agua y renovaciones completas de estilo mediterráneo. Los condominios y townhomes ocupan una amplia franja por debajo de ese rango. Carlos ofrece un CMA preciso — análisis comparativo de mercado — para su calle y condición específicas, sin costo y sin obligación de listar.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Cuánto tiempo toma vender en Coral Gables?",
    // TODO: native Madrid editor review
    a: "Las casas bien posicionadas en Coral Gables, en el rango de $1.5M–$4M, se han vendido a velocidades variables según el ciclo de mercado, la condición y la estrategia de listado. Las propiedades con un precio excesivo en este mercado acumulan días en el mercado rápidamente y suelen venderse por debajo de lo que deberían. Según datos del MLS de Miami y el Sur de Florida REALTORS®, la disciplina de precios y la activación de agentes compradores son los principales predictores del resultado — no el volumen de listados ni la exposición en portales.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Quién compra en Coral Gables?",
    // TODO: native Madrid editor review
    a: "Coral Gables atrae un perfil de comprador sofisticado: ejecutivos nacionales que se reubican en Miami, familias latinoamericanas de alto patrimonio que se establecen de forma permanente o buscan una segunda residencia, compradores europeos que diversifican hacia bienes raíces en Estados Unidos, y compradores atraídos por la arquitectura mediterránea, la posibilidad de caminar y la cercanía a Brickell y Downtown. La red de referidos internacionales de Carlos llega directamente a estos segmentos.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿El vecindario es totalmente transitable a pie y cercano a Brickell?",
    // TODO: native Madrid editor review
    a: "Coral Gables limita con Brickell y con Downtown Coconut Grove, con Miracle Mile como su centro comercial. La Universidad de Miami se encuentra dentro de la ciudad. La combinación de arquitectura histórica, arbolado, posibilidad de caminar y cercanía al centro financiero de Miami la convierte en uno de los mercados más consistentemente solicitados del condado de Miami-Dade.",
  },
  {
    // TODO: native Madrid editor review
    q: "¿Qué incluye la revisión gratuita de estrategia para vendedores?",
    // TODO: native Madrid editor review
    a: "Una revisión confidencial que cubre el potencial actual de posicionamiento de su propiedad en el MLS, un análisis de precios basado en datos actuales del MLS de Miami y el Sur de Florida REALTORS®, una evaluación del perfil de comprador y un plan de distribución. Sin compromiso de listado. Envíe el formulario a continuación o contacte a Carlos directamente por WhatsApp.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://homesprofessional.com/" },
    { "@type": "ListItem", position: 2, name: "Español", item: "https://homesprofessional.com/es" },
    { "@type": "ListItem", position: 3, name: "Vender", item: "https://homesprofessional.com/es/vender" },
    { "@type": "ListItem", position: 4, name: "Vender en Coral Gables", item: "https://homesprofessional.com/es/vender-coral-gables" },
  ],
};

export default function EsVenderCoralGablesPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>Vender su Casa en Coral Gables, FL | Posicionamiento MLS de Lujo | Carlos Uzcategui</title>
        {/* TODO: native Madrid editor review */}
        <meta name="description" content="Agente listador en Coral Gables, FL — MLS de lujo, compradores internacionales. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-coral-gables" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-coral-gables" />
        {/* TODO: native Madrid editor review */}
        <meta property="og:title" content="Vender su Casa en Coral Gables | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        {/* TODO: native Madrid editor review */}
        <meta property="og:description" content="Representación profesional de vendedores de lujo en Coral Gables, FL — activación en el MLS, red de compradores internacionales y distribución a través del MLS de Miami. Revisión de estrategia gratuita y confidencial." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* TODO: native Madrid editor review */}
        <meta name="twitter:title" content="Vender su Casa en Coral Gables | Carlos Uzcategui, FL SL705771" />
        {/* TODO: native Madrid editor review */}
        <meta name="twitter:description" content="Posicionamiento profesional en el MLS y activación de compradores internacionales para vendedores en Coral Gables, FL. Revisión de estrategia gratuita — sin compromiso de listado." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-coral-gables" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-coral-gables" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-coral-gables" />
      </Helmet>
      <JsonLd id="es-vender-coral-gables-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="es-vender-coral-gables-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": CORAL_GABLES_FAQS_ES.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="es-vender-coral-gables-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Coral Gables FL Listing Agent",
          "url": "https://homesprofessional.com/es/vender-coral-gables",
          "areaServed": {
            "@type": "City",
            "name": "Coral Gables",
            "addressRegion": "FL",
            "postalCode": "33134",
            "addressCountry": "US"
          },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "15951 SW 41 St #700",
            "addressLocality": "Weston",
            "addressRegion": "FL",
            "postalCode": "33331",
            "addressCountry": "US"
          },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="es-vender-coral-gables-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Representación de vendedores y listado MLS — Coral Gables, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Coral Gables", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/es/vender-coral-gables"
          },
          "url": "https://homesprofessional.com/es/vender-coral-gables"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo
            idle
            src="/videos/advisor-brand.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            {/* TODO: native Madrid editor review */}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Gables, FL · Asesoría de Lujo para Vendedores</p>
            <h1
              className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
            >
              {/* TODO: native Madrid editor review */}
              Venda su propiedad en Coral Gables con el alcance<br />
              <em className="italic text-gold">de la red local de REALTORS® más grande del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              {/* TODO: native Madrid editor review */}
              El grupo de compradores de lujo de Coral Gables es internacional por naturaleza. La arquitectura
              mediterránea, Miracle Mile y la cercanía con Brickell generan una demanda constante — desde ejecutivos
              nacionales hasta familias latinoamericanas de alto patrimonio e inversionistas europeos. Venda con el
              alcance que corresponde a ese público.
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
                Ver el Valor de Mi Casa en Coral Gables
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
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"La estrategia de precios que Carlos recomendó fue exactamente la correcta para nuestra casa en Coral Gables. Conocía el perfil de comprador de nuestra calle mejor que nosotros mismos."</p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/50">— Alejandro G., Coral Gables, FL</footer>
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
              United Realty Group · CLHMS · Especialista Certificado en Mercadeo de Vivienda de Lujo · FL SL705771 · 25 Años Licenciado en Florida
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

        {/* Market context */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            {/* TODO: native Madrid editor review */}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">El Mercado de Coral Gables</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              {/* TODO: native Madrid editor review */}
              El mercado de lujo con la arquitectura más distinguida de Miami-Dade.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              {/* TODO: native Madrid editor review */}
              Coral Gables es la ciudad de lujo planificada del condado de Miami-Dade — establecida en la década de
              1920 y en demanda constante desde entonces. Su arquitectura de estilo mediterráneo, sus bulevares
              arbolados y sus escuelas internacionales crean un perfil de comprador distinto a cualquier otro
              mercado del Sur de Florida: predominantemente ejecutivo, bilingüe y con conexiones internacionales.
              Listar aquí requiere un agente que entienda tanto la propiedad como al comprador.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                // TODO: native Madrid editor review
                { label: "Arquitectura", value: "Estilo Mediterráneo", sub: "Preservación del carácter histórico + renovaciones modernas" },
                { label: "Perfil de Comprador", value: "Ejecutivo e Internacional", sub: "Grupo de compradores nacionales + LATAM + europeos" },
                { label: "Ubicación", value: "Cercano a Brickell", sub: "Minutos del centro financiero de Miami + campus de la UM" },
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

        {/* Luxury positioning */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                {/* TODO: native Madrid editor review */}
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Estrategia de Listado de Lujo</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  {/* TODO: native Madrid editor review */}
                  Los listados en Coral Gables requieren<br />
                  <em className="italic text-gold">una estrategia completa, no solo un cartel.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  {/* TODO: native Madrid editor review */}
                  Las transacciones más sólidas en Coral Gables se ganan antes de que el listado salga al mercado —
                  mediante disciplina de precios, presentación profesional y activación de relaciones con agentes
                  compradores. Carlos construye la estrategia antes de ingresar al MLS.
                </p>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  // TODO: native Madrid editor review
                  { label: "Precio", text: "CMA elaborado con datos actuales del MLS de Miami — comparables vendidos, competencia activa, listados vencidos, días en el mercado por rango de precio" },
                  { label: "Presentación", text: "Orientación de fotografía profesional, narrativa del MLS y paquete de documentación para agentes compradores" },
                  { label: "Distribución", text: "Activación en el MLS de Miami → 93.000 agentes → distribución elegible → 200+ portales globales en 19 idiomas" },
                  { label: "Canal de compradores", text: "Canales directos de compradores LATAM y europeos mediante la red de referidos internacionales y asociaciones socias en 75+ países" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 w-28 flex-shrink-0 pt-0.5">{step.label}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Preguntas de Vendedores en Coral Gables</p>
              {/* TODO: native Madrid editor review */}
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
                Preguntas frecuentes.
              </h2>
            </div>
            <div className="divide-y divide-white/8">
              {CORAL_GABLES_FAQS_ES.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-serif text-lg text-white leading-snug mb-3">{faq.q}</p>
                  <p className="font-sans text-[0.9rem] leading-relaxed text-white/65">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® Q2 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Coral Gables" />

        <SellerNetCalculator sourcePage="es-vender-coral-gables" lang="es" />

        {/* CTA Band — anchor target for MobileStickyCTA's Spanish "Vender mi casa" pill */}
        <section id="contact" className="scroll-mt-24 bg-gold py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            {/* TODO: native Madrid editor review */}
            <h2 className="font-serif text-3xl text-navy-deep">¿Listo para posicionar su propiedad en Coral Gables?</h2>
            {/* TODO: native Madrid editor review */}
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/70">
              No se requiere compromiso de listado. Carlos revisa personalmente cada solicitud.
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
              Coral Gables, FL
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
