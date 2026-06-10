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
    q: "¿Qué tipo de compradores buscan propiedades en Weston?",
    a: "Weston atrae a compradores latinoamericanos de alto poder adquisitivo — principalmente familias venezolanas y colombianas con perfil de reubicación definitiva o de segunda vivienda. Las escuelas altamente calificadas de Broward County, las comunidades cerradas de lujo y la seguridad del entorno son los factores de decisión prioritarios. Carlos llega directamente a estos perfiles a través de su red de referidos internacionales y los 437 acuerdos de la Asociación de REALTORS® de Miami y Sur de Florida.",
  },
  {
    q: "¿Cómo se valora una propiedad en Weston respecto a otros mercados de lujo?",
    a: "Weston ofrece propiedades de lujo en comunidades cerradas con gestión activa a precios que, por metro cuadrado, resultan competitivos frente a Coral Gables o Brickell. El diferencial principal es el entorno suburbano, la densidad de comunidades planificadas con amenidades y las calificaciones educativas. Los datos del MLS de Miami y Sur de Florida muestran diferencias de precio relevantes entre comunidades, incluso dentro del mismo código postal. Carlos realiza un análisis comparativo específico para su comunidad.",
  },
  {
    q: "¿Cuál es el impacto de la calidad educativa en el precio de las viviendas en Weston?",
    a: "El acceso a escuelas con alta calificación es uno de los principales impulsores de demanda en Weston. Las propiedades dentro de zonas de asistencia de escuelas mejor valoradas generan grupos de compradores más profundos y tiempos de absorción más cortos, incluso cuando la propiedad en sí es comparable a otras. Carlos incorpora el factor de zona escolar en el análisis de posicionamiento de cada propiedad.",
  },
  {
    q: "¿Qué documentación HOA debo preparar antes de listar?",
    a: "Los compradores en Weston — especialmente los financiados — y sus prestamistas solicitan el presupuesto actual de la comunidad, el estudio de reservas, cualquier cuota especial pendiente, el reglamento y la declaración de convivencia. Tener esta documentación organizada antes del lanzamiento acorta el período de due diligence y elimina puntos de fricción que pueden llevar a renegociaciones. Carlos orienta sobre qué preparar en la revisión de estrategia.",
  },
  {
    q: "¿Qué incluye la revisión de estrategia de venta?",
    a: "Una sesión confidencial y gratuita en la que Carlos analiza su propiedad, los comparables actuales en el MLS, el perfil de comprador objetivo y la estrategia de distribución, sin compromiso de exclusiva. Puede solicitarla desde el formulario a continuación o por WhatsApp.",
  },
];

export default function EsVenderWestonPage() {
  return (
    <>
      <Helmet>
        <title>Vender en Weston, FL | Posicionamiento en el MLS y Compradores de Lujo | Carlos Uzcategui</title>
        <meta name="description" content="Agente de ventas en Weston, FL — análisis de mercado de lujo, activación de compradores latinoamericanos, posicionamiento en el MLS de Miami. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-weston" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-weston" />
        <meta property="og:title" content="Vender en Weston, FL | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        <meta property="og:description" content="Representación de vendedores en Weston, FL — activación en el MLS, red de compradores de lujo latinoamericanos, distribución internacional. Revisión confidencial gratuita." />
        <meta property="og:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-weston" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-weston" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-weston" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Español", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 3, "name": "Vender en Sur de Florida", "item": "https://homesprofessional.com/es/vender" },
            { "@type": "ListItem", "position": 4, "name": "Vender en Weston", "item": "https://homesprofessional.com/es/vender-weston" }
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston, FL · Asesoría para Vendedores</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Venda su propiedad en Weston con el alcance<br />
              <em className="not-italic italic text-gold">de la mayor red local de REALTORS® del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Weston combina comunidades cerradas de lujo, escuelas entre las mejor calificadas de Broward County
              y una demanda sostenida de familias latinoamericanas de alto poder adquisitivo. Posicionamiento
              profesional en el MLS. Activación de compradores. Distribución internacional.
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Por qué Weston</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Las mejores escuelas de Broward, comunidades cerradas de lujo y la demanda más sólida de Broward County.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Weston es el destino de reubicación de lujo preferido por familias latinoamericanas en el sur de Florida.
              Sus comunidades planificadas con acceso controlado, la calidad educativa sostenida y el entorno seguro
              generan una demanda consistente que se refleja en precios por encima de la media de Broward County.
              Los compradores venezolanos y colombianos con capacidad de adquisición en el rango de $800K–$2M+
              encuentran en Weston una combinación de infraestructura y comunidad que ningún otro mercado del
              condado replica en su conjunto.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Perfil de Comprador", value: "Lujo Latinoamericano", sub: "Familias venezolanas y colombianas de alto nivel en reubicación definitiva o segunda residencia" },
                { label: "Factor Educativo", value: "Escuelas A+", sub: "Zonas de asistencia a escuelas entre las mejor calificadas de Broward County" },
                { label: "Comunidades", value: "Cerradas y Planificadas", sub: "Gestión HOA activa, seguridad controlada y amenidades de alto nivel" },
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
                  Su propiedad en Weston llega a cada comprador,<br />
                  <em className="not-italic italic text-gold">donde quiera que esté buscando.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  La activación profesional en el MLS a través de United Realty Group significa que su propiedad
                  entra en la red de la mayor correduría de Florida — 3.500+ agentes en 20 oficinas en el sur
                  de Florida. El comprador de Weston puede estar representado por un agente en Bogotá, Caracas
                  o Madrid. Los 437 acuerdos internacionales de la asociación garantizan que ese comprador
                  encuentre su propiedad a través de canales profesionales, no solo portales de búsqueda.
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
                  { label: "Estrategia", text: "Análisis comparativo de precios específico para su comunidad en Weston y perfil de comprador objetivo" },
                  { label: "Posicionamiento", text: "Activación profesional en el MLS a través de United Realty Group" },
                  { label: "Distribución", text: "Activación de agentes de compradores + canal de referidos latinoamericanos de alto nivel" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Vendedores en Weston Preguntan</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Revisión para Vendedores en Weston</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Solicite una revisión privada de posicionamiento.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Sin compromiso de exclusiva. Carlos revisa personalmente cada solicitud de Weston antes de responder — normalmente en un día hábil.
              </p>
            </div>
            <SellerIntakeForm />
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidencial · Profesional con Licencia · Igualdad de Acceso a la Vivienda
            </div>
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
              Weston, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
