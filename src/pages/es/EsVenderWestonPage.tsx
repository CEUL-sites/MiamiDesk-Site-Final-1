import { Helmet } from "react-helmet-async";
import { JsonLd } from "../../components/SEO/JsonLd";
import { BadgeCheck, ChevronRight, Download, MessageSquare } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { HeroSellerForm } from "../../components/HeroSellerForm";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../../components/DesktopStickyCTA";
import { ExitIntentModal } from "../../components/ExitIntentModal";
import { LazyVideo } from "../../components/LazyVideo";
import { SellerNetCalculator } from "../../components/SellerNetCalculator";
import { NeighborhoodMarketStats } from "../../components/NeighborhoodMarketStats";
import { FaqAccordion } from "../../components/FaqAccordion";
import { CONTACT, LEAD_MAGNETS } from "../../constants";
import { HeroTitle } from "../../components/HeroTitle";
import { getCityMarketStats, segmentPeriod } from "../../data/cityMarketStats";

const weston = getCityMarketStats("Weston")!;
const westonSingleFamily = weston.stats.singleFamily!;
const westonPeriod = segmentPeriod(weston.stats.county, "singleFamily");
const westonMedian = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(westonSingleFamily.medianSalePrice);

const WESTON_FAQS_ES = [
  {
    q: "¿Cómo elegir un agente listador en Weston, FL?",
    a: "Solicite un análisis comparativo específico para su comunidad en Weston, un plan de preparación y presentación profesional, estrategia de activación ante agentes compradores y defensa contractual hasta el cierre. Carlos Uzcategui dirige la representación de vendedores en Weston a través de United Realty Group desde nuestra oficina local en SW 41 St. Puede comenzar con una revisión privada sin compromiso de listado.",
  },
  {
    q: "¿Cuál es el precio medio actual de venta en Weston, FL?",
    a: `El precio medio de cierre para viviendas unifamiliares en Weston fue de ${westonMedian} en ${westonPeriod}, según el reporte de MIAMI REALTORS® basado en datos del MLS compilados por Florida Realtors®. Un promedio municipal no reemplaza una valoración individual: evaluamos ventas comparables recientes, inventario competidor, lote y mejoras de su propiedad específica.`,
  },
  {
    q: "¿Cómo puedo vender en Weston y quedarme temporalmente tras el cierre?",
    a: "Muchos propietarios en Weston necesitan coordinar la venta actual con la compra o entrega de su próxima vivienda. Estructuramos acuerdos formales de ocupación posterior al cierre (post-occupancy leaseback) y coordinamos con su asesor fiscal la portabilidad del beneficio Save Our Homes cuando corresponde.",
  },
  {
    q: "¿Puedo vender mi casa en Weston si resido fuera de Florida?",
    a: "Sí. Carlos coordina la preparación, el acceso autorizado a la propiedad, la comunicación en inglés o español y el seguimiento documental hasta el cierre mediante United Realty Group. Su abogado y asesor tributario atienden los requisitos legales y fiscales aplicables a su situación.",
  },
  {
    q: "¿Qué incluye la revisión privada de estrategia en Weston?",
    a: "Recibe un análisis comparativo de su comunidad, una evaluación de inventario competidor, un estimado claro de gastos y ganancias netas, y un plan de distribución ante 93.000 agentes miembros de Miami and South Florida REALTORS®. La consulta es confidencial, gratuita y sin obligación de exclusiva.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://homesprofessional.com/" },
    { "@type": "ListItem", position: 2, name: "Español", item: "https://homesprofessional.com/es" },
    { "@type": "ListItem", position: 3, name: "Vender", item: "https://homesprofessional.com/es/vender" },
    { "@type": "ListItem", position: 4, name: "Vender en Weston", item: "https://homesprofessional.com/es/vender-weston" },
  ],
};

export default function EsVenderWestonPage() {
  return (
    <>
      <Helmet>
        <title>Vender su Casa en Weston, FL | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Representación de vendedores en Weston, FL con Carlos Uzcategui en United Realty Group. Estrategia MLS, precios por comunidad y revisión gratuita."
        />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-weston" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-weston" />
        <meta property="og:title" content="Vender su Casa en Weston, FL | Carlos Uzcategui" />
        <meta
          property="og:description"
          content="Representación de vendedores en Weston, FL con Carlos Uzcategui en United Realty Group. Estrategia MLS, ocupación posterior al cierre y revisión gratuita."
        />
        <meta property="og:image" content="https://homesprofessional.com/images/reports/weston-2026-11-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vender su Casa en Weston, FL | Carlos Uzcategui" />
        <meta
          name="twitter:description"
          content="Estrategia profesional en el MLS, valoración por comunidad en Weston y transición estructurada para vendedores con Carlos Uzcategui, FL SL705771."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/reports/weston-2026-11-og.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-weston" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-weston" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-weston" />
      </Helmet>
      <JsonLd id="es-vender-weston-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd
        id="es-vender-weston-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: WESTON_FAQS_ES.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <JsonLd
        id="es-vender-weston-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Representación de vendedores y listado MLS — Weston, FL",
          serviceType: "Real estate listing and seller representation",
          areaServed: { "@type": "City", name: "Weston", addressRegion: "FL", addressCountry: "US" },
          provider: { "@id": "https://homesprofessional.com/#agent" },
          url: "https://homesprofessional.com/es/vender-weston",
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo
            idle
            src="/videos/advisor-brand.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Weston, FL · Agente Listador y Representación de Vendedores
            </p>
            <HeroTitle
              lead="Venda su casa en Weston"
              payoff="con estrategia, datos y alcance real."
              keep={["Weston"]}
            />
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/65">
              Desde Weston Hills y The Ridges hasta Windmill Ranch Estates y Savanna, cada comunidad cerrada
              tiene su propia banda de precios y tiempo de absorción. Carlos Uzcategui dirige la estrategia desde
              nuestra oficina en Weston (15951 SW 41 St #700) con precisión contractual en inglés y español.
            </p>
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {[
                "Precios comparables por subdivisión en el MLS",
                "Estructuración de ocupación posterior al cierre",
                "Estimación clara de gastos y ganancias netas",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2 font-sans text-[13px] text-white/75">
                  <BadgeCheck size={15} className="flex-shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Solicitar Revisión en Weston
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
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
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                5.0 · Gratis y confidencial · Sin compromiso de listado · Respuesta personal de Carlos
              </span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a
                href={LEAD_MAGNETS.sellerNetSheet.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/75 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                O descargue la Hoja de Ganancias del Vendedor 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              United Realty Group · CLHMS · FL SL705771 · 25 Años Licenciado en Florida
            </p>

            {/* Distribution reach strip — verified figures (src/data/figures.json) */}
            <div
              className="mx-auto mt-8 flex max-w-md flex-wrap items-start justify-center gap-x-6 gap-y-3 border-y border-white/10 py-4 sm:max-w-3xl sm:gap-x-10"
              role="list"
              aria-label="Alcance de la red de distribución"
            >
              {[
                { value: "93.000", label: "Agentes miembros" },
                { value: "200+", label: "Portales globales" },
                { value: "19", label: "Idiomas" },
                { value: "437+", label: "Acuerdos internacionales" },
                { value: "260+", label: "MLSs en EE. UU." },
              ].map((f) => (
                <div key={f.label} role="listitem" className="min-w-[5rem] text-center">
                  <div className="font-serif text-xl leading-none text-gold md:text-2xl">{f.value}</div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market context */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">El Mercado de Weston</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Comunidades planificadas en el oeste de Broward con alta disciplina de precios.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/70">
              Weston combina urbanizaciones con garita de seguridad, lotes amplios, escuelas públicas calificadas en
              Broward County y acceso inmediato a la I-75 y la I-595 hacia Miami y Fort Lauderdale. Dentro de un mismo
              código postal (33326, 33327, 33331 o 33332), el valor por pie cuadrado cambia según la asociación de
              propietarios (HOA), el año de techo, ventanas de impacto, orientación al agua y mejoras interiores.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                {
                  label: "Subdivisiones Clave",
                  value: "Gated & Golf",
                  sub: "Weston Hills, The Ridges, Savanna, Windmill Ranch Estates y Bonaventure",
                },
                {
                  label: "Transición del Vendedor",
                  value: "Post-Occupancy",
                  sub: "Acuerdos estructurados tras el cierre para mudarse o comprar sin apuro",
                },
                {
                  label: "Escritorio Local",
                  value: "SW 41 St #700",
                  sub: "United Realty Group opera 19 ubicaciones de oficinas en Florida con más de 3.500 agentes",
                },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{stat.label}</p>
                  <p className="mt-3 font-serif text-2xl text-navy-deep">{stat.value}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/60">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seller strategy */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Estrategia de Venta en Weston
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  Control antes del lanzamiento,<br />
                  <em className="italic text-gold">respaldo contractual hasta el cierre.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Un lanzamiento sólido en Weston comienza antes de publicar en el MLS: verificación de documentos de HOA,
                  certificaciones de techo e inspecciones de seguros, precio basado en ventas reales de su misma
                  urbanización y coordinación directa con los agentes compradores activos en Broward y Miami-Dade.
                </p>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  {
                    label: "Valoración",
                    text: "CMA detallado por comunidad en el MLS de Miami — comparables cerrados, competencia activa y días en el mercado por banda de precio",
                  },
                  {
                    label: "Equidad y Plazos",
                    text: "Coordinación de ocupación posterior al cierre (leaseback) y preparación de portabilidad Save Our Homes junto a su asesor fiscal",
                  },
                  {
                    label: "Distribución",
                    text: "Activación en el MLS de Miami y ecosistema diario de 93.000 agentes miembros de Miami and South Florida REALTORS®, más 200+ portales globales en 19 idiomas",
                  },
                  {
                    label: "Negociación",
                    text: "Revisión de solvencia de compradores, contingencias de financiamiento, tasación e inspecciones en inglés y español",
                  },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/75 w-28 flex-shrink-0 pt-0.5">
                      {step.label}
                    </span>
                    <p className="font-sans text-sm text-white/70">{step.text}</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Preguntas de Vendedores en Weston
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
                Preguntas frecuentes.
              </h2>
            </div>
            <FaqAccordion faqs={WESTON_FAQS_ES} />
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Weston" />

        <SellerNetCalculator sourcePage="es-vender-weston" lang="es" />

        {/* CTA Band */}
        <section id="contact" className="scroll-mt-24 bg-gold py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl text-navy-deep">
              ¿Listo para evaluar la venta de su casa en Weston?
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-deep/75">
              Sin compromiso de listado. Carlos revisa personalmente cada solicitud desde nuestra oficina en Weston.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <HeroSellerForm lang="es" progressiveDesktop defaultMarket={0} sourcePage="es-vender-weston" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-navy-deep/30 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy-deep hover:bg-navy-deep/5"
              >
                <MessageSquare size={14} />
                WhatsApp EE.UU. (+1 954-865-6622)
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep/60">
              <div className="flex items-center gap-2">
                <BadgeCheck size={14} className="text-navy-deep/60" />
                <span>Confidencial · Profesionales con Licencia · Igualdad de Acceso a la Vivienda</span>
              </div>
              <a href={`mailto:${CONTACT.email}`} className="text-navy-deep/75 underline hover:text-navy-deep">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/70">
              <a href="/es" className="hover:text-gold">
                Inicio
              </a>
              {" · "}
              <a href="/es/vender" className="hover:text-gold">
                Vender en el Sur de Florida
              </a>
              {" · "}
              Weston, FL
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
