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
    q: "¿Miami es un solo mercado inmobiliario?",
    a: "No. Miami es un conjunto de submercados que operan con dinámicas de precio, perfiles de comprador y estrategias de posicionamiento distintas. Coconut Grove, Edgewater, Wynwood, el Upper East Side, Little Havana y los corredores del noroeste tienen patrones de absorción, tipos de inventario y perfiles de demanda diferentes. El análisis comparativo correcto para un vendedor de Miami es a nivel de submercado, barrio y tipo de propiedad — no a nivel de ciudad. Carlos proporciona ese análisis específico en la revisión de estrategia.",
  },
  {
    q: "¿Qué compradores son más activos en Miami en 2026?",
    a: "Miami atrae compradores de toda América Latina y Europa — el mercado de compradores internacionales más diverso del sur de Florida. Los compradores venezolanos, colombianos, brasileños y argentinos son activos en rangos de precio amplios, tanto en condominios como en viviendas unifamiliares. Los compradores europeos — principalmente españoles, franceses y del Reino Unido — buscan activos de inversión y segunda residencia. El alcance de Carlos a través de los 437 acuerdos internacionales de la Asociación de REALTORS® de Miami y Sur de Florida conecta directamente con todos estos perfiles.",
  },
  {
    q: "¿Qué diferencia vender un condominio de vender una vivienda unifamiliar en Miami?",
    a: "En condominios, la situación financiera del edificio — inspección estructural, reservas, cuotas especiales pendientes y estado de aprobación Fannie Mae/Freddie Mac — es hoy una variable determinante para compradores y prestamistas. Una unidad bien acondicionada en un edificio con reservas insuficientes o sin inspección completada es un activo menos competitivo que una unidad comparable en un edificio con documentación limpia. Para viviendas unifamiliares, los factores dominantes son condición, ubicación dentro de Miami y precisión de precio frente a comparables recientes del mismo submercado.",
  },
  {
    q: "¿Cómo afecta la legislación SB 4-D de Florida a los vendedores de condominios en Miami?",
    a: "La legislación SB 4-D estableció requisitos de inspección de hitos estructurales y financiación de reservas para edificios de tres o más pisos. Los compradores sofisticados — y sus agentes — ahora preguntan por el estado de la inspección del edificio, el nivel de financiación de las reservas y las cuotas especiales antes de hablar de precio o vista. El vendedor que llega a la exclusiva con esta documentación organizada está en una posición diferente al que la descubre durante el período de due diligence.",
  },
  {
    q: "¿Qué incluye la revisión de estrategia de venta?",
    a: "Una sesión confidencial y gratuita en la que Carlos analiza su propiedad o unidad, los comparables actuales en el MLS para su submercado específico, el estado de documentación del edificio (si aplica), el perfil de comprador objetivo y la estrategia de distribución, sin compromiso de exclusiva. Puede solicitarla desde el formulario a continuación o por WhatsApp.",
  },
];

export default function EsVenderMiamiPage() {
  return (
    <>
      <Helmet>
        <title>Vender en Miami | Posicionamiento por Submercado y Comprador Internacional | Carlos Uzcategui</title>
        <meta name="description" content="Agente de ventas en Miami, FL — posicionamiento por submercado, compradores internacionales latinoamericanos y europeos, activación en el MLS de Miami. Revisión de estrategia gratuita. Carlos Uzcategui, FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/es/vender-miami" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/es/vender-miami" />
        <meta property="og:title" content="Vender en Miami | Posicionamiento Profesional en el MLS | Carlos Uzcategui" />
        <meta property="og:description" content="Representación de vendedores en Miami, FL — activación en el MLS, compradores internacionales, posicionamiento por submercado. Revisión confidencial gratuita." />
        <meta property="og:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/social/og-default.jpg" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-miami" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender-miami" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-miami" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Español", "item": "https://homesprofessional.com/es" },
            { "@type": "ListItem", "position": 3, "name": "Vender en Sur de Florida", "item": "https://homesprofessional.com/es/vender" },
            { "@type": "ListItem", "position": 4, "name": "Vender en Miami", "item": "https://homesprofessional.com/es/vender-miami" }
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Miami, FL · Asesoría para Vendedores</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Venda su propiedad en Miami con el alcance<br />
              <em className="not-italic italic text-gold">de la mayor red local de REALTORS® del mundo.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Miami es el mercado internacional de mayor profundidad en el sur de Florida. Compradores
              latinoamericanos, europeos y norteamericanos compiten en un mercado que requiere posicionamiento
              preciso por submercado, tipo de propiedad y perfil de comprador. Posicionamiento profesional
              en el MLS. Activación de compradores. Distribución internacional.
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Por qué Miami</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              El mercado internacional más profundo del sur de Florida — con submercados que exigen posicionamiento individual.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Miami no es un mercado uniforme. Coconut Grove opera con dinámicas de vivienda unifamiliar y familias de
              alto poder adquisitivo. Edgewater y Wynwood atraen a compradores jóvenes y de inversión con apetito por
              la urbanidad. El Upper East Side posiciona con casas de carácter en rangos más accesibles. Downtown y
              Brickell concentran el mercado de condominios para inversores e internacionales. El vendedor que
              entiende en qué submercado está — y qué perfil de comprador lo demanda — tiene una ventaja de
              posicionamiento real sobre el que aplica un análisis de precio a nivel ciudad.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Alcance Internacional", value: "75+ Países", sub: "La red de referidos de la Asociación de REALTORS® de Miami y Sur de Florida conecta con compradores en 75+ países" },
                { label: "Perfil de Comprador", value: "LATAM + Europa", sub: "Compradores venezolanos, colombianos, brasileños, argentinos, españoles y franceses activos en rangos amplios" },
                { label: "Tipos de Propiedad", value: "Condominio + Unifamiliar", sub: "Cada tipo requiere una estrategia de posicionamiento distinta en el MLS" },
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
                  Su propiedad en Miami llega a cada comprador,<br />
                  <em className="not-italic italic text-gold">donde quiera que esté buscando.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  El comprador de una propiedad en Miami puede estar representado por un agente en São Paulo,
                  Madrid, Bogotá o Nueva York. La activación en el MLS a través de United Realty Group, los
                  437 acuerdos internacionales de la Asociación de REALTORS® de Miami y la distribución en
                  200+ portales globales en 19 idiomas aseguran que ese comprador encuentre su propiedad a
                  través de canales profesionales, no solo de búsquedas en portales locales.
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
                  { label: "Estrategia", text: "Análisis comparativo por submercado y tipo de propiedad — no un promedio de ciudad" },
                  { label: "Posicionamiento", text: "Activación profesional en el MLS a través de United Realty Group con narrativa adaptada al perfil de comprador" },
                  { label: "Distribución", text: "Alcance a agentes de compradores + red de referidos internacionales latinoamericanos y europeos" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Vendedores en Miami Preguntan</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Revisión para Vendedores en Miami</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Solicite una revisión privada de posicionamiento.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Sin compromiso de exclusiva. Carlos revisa personalmente cada solicitud de Miami antes de responder — normalmente en un día hábil.
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
              Miami, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
