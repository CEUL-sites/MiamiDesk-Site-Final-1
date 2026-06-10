import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { LazyVideo } from "../../components/LazyVideo";
import { SellerIntakeForm } from "../../components/forms/SellerIntakeForm";
import { CONTACT } from "../../constants";

const FAQS_ES = [
  {
    q: "¿Cuál es el perfil de comprador más activo en Doral?",
    a: "Doral concentra una de las mayores demandas de compradores venezolanos y colombianos en todo Miami-Dade. El entorno bilingüe, la proximidad al aeropuerto internacional y la oferta de comunidades cerradas con infraestructura educativa de calidad convierten a Doral en uno de los mercados de reubicación latinoamericana más activos del sur de Florida. Carlos llega directamente a estos perfiles a través de su red internacional de agentes y los 437 acuerdos internacionales de la Asociación de REALTORS® de Miami y Sur de Florida.",
  },
  {
    q: "¿Cuánto vale mi propiedad en Doral en 2026?",
    a: "El valor varía significativamente según la comunidad, el año de construcción, la superficie y las características del lote. Los datos del MLS de Miami y Sur de Florida muestran diferencias de precio relevantes entre comunidades dentro del mismo código postal. Carlos realiza un análisis comparativo de mercado específico para su comunidad y tipo de propiedad, sin compromiso de exclusiva.",
  },
  {
    q: "¿Cuál es la ventaja de listar con Carlos en Doral?",
    a: "La activación profesional en el MLS de Miami y Sur de Florida a través de United Realty Group hace que su propiedad llegue a 93.000 agentes miembros el día del lanzamiento, con distribución simultánea en 200+ portales globales en 19 idiomas. La red directa de compradores latinoamericanos y la presencia de 3.500+ agentes en 20 oficinas en Florida se traducen en un alcance que supera al de cualquier portal de búsqueda individual.",
  },
  {
    q: "¿Qué documentación debo preparar antes de listar?",
    a: "En las comunidades HOA de Doral, los compradores y sus prestamistas solicitan el presupuesto actual de la comunidad, el estudio de reservas, cualquier cuota especial pendiente y el estoppel. Tener esta documentación organizada antes del lanzamiento reduce fricciones en el proceso de due diligence y transmite profesionalismo al agente del comprador. Carlos orienta sobre qué preparar en la revisión privada de estrategia.",
  },
  {
    q: "¿Qué incluye la revisión de estrategia de venta?",
    a: "Una sesión confidencial y gratuita en la que Carlos analiza su propiedad, los comparables actuales en el MLS, el perfil de comprador objetivo y la estrategia de distribución, sin compromiso de exclusiva. Puede solicitarla directamente desde el formulario a continuación o por WhatsApp.",
  },
];

export default function EsVenderDoralPage() {
  return (
    <>
      <Helmet>
        <title>Vender en Doral, FL | Posicionamiento en el MLS y Compradores Latinoamericanos | Carlos Uzcategui</title>
        <meta name="description" content="Agente de ventas en Doral, FL — análisis de mercado, activación de compradores latinoamericanos, posicionamiento en el MLS de Miami. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-doral" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-doral" />
        <meta property="og:title" content="Vender en Doral, FL | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        <meta property="og:description" content="Representación de vendedores en Doral, FL — activación en el MLS, red de compradores latinoamericanos, distribución internacional. Revisión confidencial gratuita." />
        <meta property="og:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-doral" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-doral" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-doral" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Español", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 3, "name": "Vender en Sur de Florida", "item": "https://homesprofessional.com/es/vender" },
            { "@type": "ListItem", "position": 4, "name": "Vender en Doral", "item": "https://homesprofessional.com/es/vender-doral" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS_ES.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo eager src="/videos/advisor-brand.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Doral, FL · Asesoría para Vendedores</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Venda su propiedad en Doral con el alcance<br />
              <em className="not-italic italic text-gold">de la mayor red local de REALTORS® del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Doral reúne comunidades maestras planificadas, el mayor entorno bilingüe de Miami-Dade y
              una concentración excepcional de compradores venezolanos y colombianos. Posicionamiento profesional
              en el MLS. Activación de agentes de compradores. Distribución internacional.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contacto" className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Solicitar Revisión de Estrategia Gratuita
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white">
                WhatsApp Carlos
              </a>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · CLHMS · FL SL705771 · 25 años con licencia en Florida
            </p>
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Por qué Doral</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              La comunidad latinoamericana más consolidada de Miami-Dade — y el mercado que la acompaña.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Doral combina construcción moderna, comunidades cerradas con gestión HOA activa, infraestructura
              educativa bilingüe de alta calificación y una proximidad al aeropuerto internacional que sostiene
              la demanda de reubicación. Los compradores venezolanos y colombianos han convertido Doral en uno
              de sus destinos de inversión y residencia primarios en el sur de Florida — por razones culturales,
              logísticas y de seguridad que se reflejan directamente en los precios y los tiempos de absorción.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Perfil de Comprador", value: "Latinoamericano", sub: "Una de las mayores concentraciones de compradores venezolanos y colombianos en Miami-Dade" },
                { label: "Tipo de Comunidad", value: "Planificada y Cerrada", sub: "Construcción moderna con gestión HOA activa y control de acceso" },
                { label: "Acceso Estratégico", value: "Aeropuerto + Corredores", sub: "Proximidad al MIA y a las principales vías de acceso de Miami-Dade" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">{stat.label}</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">La Ventaja de la Red</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  Su propiedad en Doral llega a cada comprador,<br />
                  <em className="not-italic italic text-gold">donde quiera que esté buscando.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  La activación profesional en el MLS a través de United Realty Group significa que su propiedad
                  entra en la red de la mayor correduría de Florida por viviendas cerradas — 3.500+ agentes en
                  20 oficinas en el sur de Florida — no en un portal, sino en una infraestructura profesional.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "MLS de Miami y Sur de Florida — 93.000 agentes miembros",
                    "Distribución elegible en 200+ portales globales en 19 idiomas",
                    "United Realty Group — 3.500+ agentes en 20 oficinas en Florida",
                    "Canal directo de compradores latinoamericanos y europeos",
                    "437 acuerdos internacionales en 75+ países",
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
                  { label: "Estrategia", text: "Análisis comparativo de precios específico para su comunidad y año de construcción en Doral" },
                  { label: "Posicionamiento", text: "Activación profesional en el MLS a través de United Realty Group" },
                  { label: "Distribución", text: "Activación de agentes de compradores + red de referidos latinoamericanos" },
                  { label: "Negociación", text: "Análisis de ofertas, estrategia de condiciones y coordinación del cierre" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 w-28 flex-shrink-0 pt-0.5">{step.label}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Vendedores en Doral Preguntan</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Preguntas frecuentes.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {FAQS_ES.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-serif text-lg text-white leading-snug mb-3">{faq.q}</p>
                  <p className="font-sans text-[0.9rem] leading-relaxed text-white/65">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-navy-deep py-16 md:py-24" id="contacto">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Revisión para Vendedores en Doral</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Solicite una revisión privada de posicionamiento.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Sin compromiso de exclusiva. Carlos revisa personalmente cada solicitud de Doral antes de responder — normalmente en un día hábil.
              </p>
            </div>
            <SellerIntakeForm />
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidencial · Profesional con Licencia · Igualdad de Acceso a la Vivienda
            </div>
          </div>
        </section>

        {/* Otras ciudades */}
        <section className="bg-ivory py-10 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Otras Ciudades</p>
            <p className="font-sans text-sm text-ink-primary/60">
              <a href="/es/vender-weston" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Weston</a>
              {" · "}
              <a href="/es/vender-kendall" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Kendall</a>
              {" · "}
              <a href="/es/vender-miami" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Miami</a>
              {" · "}
              <a href="/es/vender" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Sur de Florida</a>
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/40">
              <a href="/" className="hover:text-gold">Inicio</a>
              {" · "}
              <a href="/es" className="hover:text-gold">Español</a>
              {" · "}
              <a href="/es/vender" className="hover:text-gold">Vender en Sur de Florida</a>
              {" · "}
              Doral, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
