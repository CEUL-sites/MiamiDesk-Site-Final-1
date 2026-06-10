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
    q: "¿Qué factores determinan el precio de una vivienda en Kendall?",
    a: "En Kendall, el precio de mercado está muy influenciado por tres variables: la zona de asistencia escolar, la comunidad HOA específica y el estado de conservación de la propiedad. Las propiedades asignadas a escuelas mejor calificadas generan grupos de compradores más profundos y precios más competitivos, incluso cuando la propiedad en sí es comparable en metros cuadrados a otras en zonas diferentes. Los datos del MLS de Miami y Sur de Florida muestran diferencias significativas por barrio y manzana dentro del mismo código postal de Kendall.",
  },
  {
    q: "¿Quiénes son los compradores más activos en Kendall?",
    a: "El comprador predominante en Kendall es la familia latinoamericana — venezolana, colombiana, cubana — que busca espacio, seguridad escolar y entorno bilingüe a precios más accesibles que Doral o Weston. También hay compradores domésticos que se mudan desde otras partes de Miami-Dade y compradores internacionales que quieren un perfil de inversión en alquiler a largo plazo. Carlos llega directamente a todos estos perfiles a través de la red de la Asociación de REALTORS® de Miami y Sur de Florida.",
  },
  {
    q: "¿Cuándo es el mejor momento para listar en Kendall?",
    a: "El mercado familiar de Kendall sigue el calendario escolar. La ventana de mayor actividad es primavera — de marzo a junio — cuando las familias alinean su proceso de compra con el cambio de curso. Dicho esto, la demanda de compradores latinoamericanos y de reubicación laboral genera actividad todo el año. Carlos proporciona una recomendación de momento de lanzamiento como parte de la revisión de estrategia.",
  },
  {
    q: "¿Qué debo preparar si mi propiedad está en una comunidad HOA?",
    a: "Los compradores en Kendall y sus prestamistas solicitan el presupuesto actual de la comunidad, el estudio de reservas, cualquier cuota especial pendiente, el estoppel y el reglamento. Tener esta documentación organizada antes del lanzamiento elimina puntos de fricción en el due diligence y señala al agente del comprador que el vendedor está preparado para una transacción limpia.",
  },
  {
    q: "¿Qué incluye la revisión de estrategia de venta?",
    a: "Una sesión confidencial y gratuita en la que Carlos analiza su propiedad, los comparables actuales en el MLS para su barrio y comunidad específicos, el perfil de comprador objetivo y la estrategia de distribución, sin compromiso de exclusiva. Puede solicitarla desde el formulario a continuación o por WhatsApp.",
  },
];

export default function EsVenderKendallPage() {
  return (
    <>
      <Helmet>
        <title>Vender en Kendall, FL | Posicionamiento para el Mercado Familiar de Miami-Dade | Carlos Uzcategui</title>
        <meta name="description" content="Agente de ventas en Kendall, FL — posicionamiento por zona escolar, mercado familiar latinoamericano, activación en el MLS de Miami. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-kendall" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-kendall" />
        <meta property="og:title" content="Vender en Kendall, FL | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        <meta property="og:description" content="Representación de vendedores en Kendall, FL — activación en el MLS, mercado familiar latinoamericano, posicionamiento por zona escolar. Revisión confidencial gratuita." />
        <meta property="og:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-kendall" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-kendall" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-kendall" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Español", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 3, "name": "Vender en Sur de Florida", "item": "https://homesprofessional.com/es/vender" },
            { "@type": "ListItem", "position": 4, "name": "Vender en Kendall", "item": "https://homesprofessional.com/es/vender-kendall" }
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Kendall, FL · Asesoría para Vendedores</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Venda su propiedad en Kendall con el alcance<br />
              <em className="not-italic italic text-gold">de la mayor red local de REALTORS® del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Kendall es el mercado familiar por excelencia del suroeste de Miami-Dade. Las zonas escolares,
              las comunidades HOA y el entorno bilingüe definen la demanda. Posicionamiento profesional en el
              MLS. Activación de compradores. Distribución internacional.
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Por qué Kendall</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              El mercado familiar latinoamericano de Miami-Dade — donde la zona escolar y la comunidad HOA definen el precio.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Kendall no es un solo mercado. Es una designación que abarca docenas de subdivisiones y comunidades
              HOA distintas, cada una con sus propias dinámicas de precio, demanda y zona de asistencia escolar.
              El comprador en Kendall en 2026 toma una decisión familiar y comunitaria — está comprando acceso a
              una escuela específica, una infraestructura comunitaria determinada y una calidad de vida suburbana.
              Ese es el marco en el que debe posicionarse su propiedad.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Factor Decisivo", value: "Zona Escolar", sub: "El acceso a escuelas calificadas es el principal impulsor de demanda en el mercado familiar de Kendall" },
                { label: "Perfil de Comprador", value: "Familias Latinas", sub: "Compradores venezolanos, colombianos y cubanos representan una proporción significativa de la demanda activa" },
                { label: "Momento Óptimo", value: "Primavera", sub: "La mayor concentración de actividad compradora se alinea con el cambio de curso escolar (marzo–junio)" },
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
                  Su propiedad en Kendall llega a cada comprador,<br />
                  <em className="not-italic italic text-gold">donde quiera que esté buscando.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Muchos compradores de Kendall están representados por agentes en otros mercados de Miami-Dade
                  o por agentes de referidos internacionales. La profundidad geográfica de Kendall y la
                  realidad de que gran parte de su demanda llega a través de la red profesional — no solo
                  de búsquedas en portales — hace que la activación en el MLS y el alcance a agentes de
                  compradores sea el mecanismo central de distribución.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "MLS de Miami y Sur de Florida — 93.000 agentes miembros",
                    "Distribución elegible en 200+ portales globales en 19 idiomas",
                    "United Realty Group — 3.500+ agentes en 20 oficinas en Florida",
                    "Canal directo de compradores latinoamericanos",
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
                  { label: "Estrategia", text: "Análisis comparativo por barrio y comunidad HOA específicos, con datos de cierres de los últimos 90 días" },
                  { label: "Posicionamiento", text: "Activación profesional en el MLS a través de United Realty Group" },
                  { label: "Distribución", text: "Activación de agentes de compradores + red de referidos latinoamericanos" },
                  { label: "Negociación", text: "Análisis de ofertas, gestión del período de inspección y coordinación del cierre" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Vendedores en Kendall Preguntan</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Revisión para Vendedores en Kendall</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Solicite una revisión privada de posicionamiento.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Sin compromiso de exclusiva. Carlos revisa personalmente cada solicitud de Kendall antes de responder — normalmente en un día hábil.
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
              <a href="/es/vender-doral" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Doral</a>
              {" · "}
              <a href="/es/vender-weston" className="text-navy-deep underline underline-offset-2 hover:text-gold">Vender en Weston</a>
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
              Kendall, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
