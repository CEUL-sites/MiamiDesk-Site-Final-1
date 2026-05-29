import { Helmet } from "react-helmet-async";
import { Download, MapPin, TrendingUp, Users } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { GlobalPartnerNetwork } from "../../components/GlobalPartnerNetwork";
import { CONTACT, LEAD_MAGNETS } from "../../constants";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://homesprofessional.com/es",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Spain Desk",
      item: "https://homesprofessional.com/es/spain-desk",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mesa España — Asesoría Inmobiliaria Internacional",
  "provider": { "@id": "https://homesprofessional.com/#agent" },
  "serviceType": "Asesoría Inmobiliaria Internacional",
  "description": "Asesoría inmobiliaria bilingüe para compradores e inversores de España y Latinoamérica que se relocalizan o invierten en Sur de Florida. Consultas privadas en inglés y español.",
  "areaServed": ["Sur de Florida", "España"],
  "url": "https://homesprofessional.com/es/spain-desk",
  "availableLanguage": ["English", "Spanish"],
};

const AUDIENCE_CARDS = [
  {
    icon: MapPin,
    // TODO: native Madrid editor review
    title: "Comprador Internacional",
    // TODO: native Madrid editor review
    description:
      "Compradores de España, Venezuela, Colombia, Argentina o México que quieren adquirir en Miami — primera residencia, segunda residencia o inversión.",
  },
  {
    icon: TrendingUp,
    // TODO: native Madrid editor review
    title: "Inversor con Mandato",
    // TODO: native Madrid editor review
    description:
      "Inversores con capital disponible que necesitan un agente con acceso MLS completo, red local en Miami y gestión de la transacción a distancia.",
  },
  {
    icon: Users,
    // TODO: native Madrid editor review
    title: "En Proceso de Relocalización",
    // TODO: native Madrid editor review
    description:
      "Familias o profesionales que planean establecerse en South Florida — con decisiones sobre zona, tipo de propiedad, hipoteca y calendario.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    // TODO: native Madrid editor review
    title: "Consulta inicial",
    // TODO: native Madrid editor review
    description:
      "30 minutos para establecer el mandato, el presupuesto y el calendario. Sin presentación de propiedades antes de esta conversación.",
  },
  {
    number: "02",
    // TODO: native Madrid editor review
    title: "Informe de comprador",
    // TODO: native Madrid editor review
    description:
      "Carlos prepara un informe escrito con perfiles de barrio, rango de precios, opciones de financiación para no residentes y calendario de cierre realista.",
  },
  {
    number: "03",
    // TODO: native Madrid editor review
    title: "Búsqueda activa en el MLS",
    // TODO: native Madrid editor review
    description:
      "Acceso completo al MLS de Miami y South Florida. Cada propiedad activa en la zona y rango especificados, desde el primer día.",
  },
  {
    number: "04",
    // TODO: native Madrid editor review
    title: "Gestión del cierre",
    // TODO: native Madrid editor review
    description:
      "Coordinación de la oferta, negociación, inspección, financiación (si aplica) y cierre. Gestión posible a distancia mediante poder notarial apostillado.",
  },
];

export default function EsSpainDeskPage() {
  return (
    <>
      <Helmet>
        {/* TODO: native Madrid editor review */}
        <title>Mesa España · Sur de Florida desde Madrid | Carlos Uzcategui SL705771</title>
        {/* TODO: native Madrid editor review */}
        <meta
          name="description"
          content="Asesoría inmobiliaria bilingüe para compradores e inversores de España y Latinoamérica que se relocalizan o invierten en Sur de Florida. Consultas privadas en inglés y español."
        />
        <link rel="canonical" href="https://homesprofessional.com/es/spain-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {/* TODO: native Madrid editor review */}
              MESA ESPAÑA · UNITED REALTY GROUP · SL705771
            </p>

            <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
              {/* TODO: native Madrid editor review */}
              De Madrid a Miami.
              <br />
              {/* TODO: native Madrid editor review */}
              <em className="not-italic italic text-gold">Bilingüe. Privado. Con experiencia.</em>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
              {/* TODO: native Madrid editor review */}
              Asesoría confidencial para compradores de España y Latinoamérica. Consultas privadas en inglés y español. Red de referral en Madrid para transacciones previas a la mudanza.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                {/* TODO: native Madrid editor review */}
                WhatsApp España
              </a>
              <a
                href="/es/comprar"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                {/* TODO: native Madrid editor review */}
                Buscar propiedades en Miami
              </a>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a
                href={LEAD_MAGNETS.spainActivation.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                {/* TODO: native Madrid editor review */}
                Descargar metodología de activación MLS — PDF
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 1: La Conexión entre dos mercados ───────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                LA CONEXIÓN ENTRE DOS MERCADOS
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl leading-tight text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Miami y Madrid. Un principal licenciado.{" "}
                <em className="not-italic italic">Flujo directo.</em>
              </h2>
            </div>

            <div className="grid grid-cols-3 divide-x divide-bone rounded-none bg-bone/40">
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">93.000</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  Agentes miembro
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">200+</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  Portales globales · 19 idiomas
                </div>
              </div>
              <div className="px-8 py-10 text-center">
                <div className="font-serif text-4xl text-navy-deep">385</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/65">
                  {/* TODO: native Madrid editor review */}
                  MLSs en EE.UU. vía RPR
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Para quién es esta asesoría ──────────────── */}
        <section className="bg-bone/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                PARA QUIÉN ES ESTA ASESORÍA
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Tres perfiles de cliente.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {AUDIENCE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="border border-bone bg-white p-8"
                  >
                    <Icon size={24} className="text-gold" />
                    <h3 className="mt-4 font-serif text-xl text-navy-deep">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-navy-deep/60">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 3: El Proceso ───────────────────────────────── */}
        <section className="bg-navy-deep py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                EL PROCESO
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                {/* TODO: native Madrid editor review */}
                Cuatro pasos desde la consulta inicial hasta el cierre.
              </h2>
            </div>

            <div className="space-y-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="flex gap-8">
                  <div className="flex-shrink-0 font-mono text-[13px] font-semibold text-gold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Para agencias españolas ──────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                PARA AGENCIAS ESPAÑOLAS
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Su inventario en España activado en el MLS de Miami.
              </h2>
            </div>

            <div className="space-y-5">
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Carlos Uzcategui actúa como principal licenciado de registro en Florida, lo que permite a agencias españolas colocar su inventario directamente en el MLS de Miami y Sur de Florida. La agencia española mantiene la representación local del propietario — sin ceder el mandato.
              </p>
              <p className="font-sans text-base leading-relaxed text-navy-deep/70">
                {/* TODO: native Madrid editor review */}
                Desde el primer día de activación, la propiedad llega a 93.000 agentes miembros de la mayor asociación local de REALTORS® del mundo, con distribución simultánea a más de 200 portales globales en 19 idiomas. Una vía institucional hacia el mercado americano, operada por un profesional con 25 años de licencia activa en Florida.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                {/* TODO: native Madrid editor review */}
                WhatsApp Madrid para hablar de activación
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Mesa España · Consulta privada ───────────── */}
        <section className="bg-bone/40 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {/* TODO: native Madrid editor review */}
                MESA ESPAÑA · CONSULTA PRIVADA
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                {/* TODO: native Madrid editor review */}
                Comience su búsqueda en Sur de Florida.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 border border-bone bg-white p-6 text-center transition-colors hover:border-gold/40"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  WhatsApp España
                </span>
                <span className="font-sans text-sm text-navy-deep">
                  +34 646 853 078
                </span>
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 border border-bone bg-white p-6 text-center transition-colors hover:border-gold/40"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  WhatsApp Miami
                </span>
                <span className="font-sans text-sm text-navy-deep">
                  +1 954-865-6622
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex flex-col items-center gap-2 border border-bone bg-white p-6 text-center transition-colors hover:border-gold/40"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                  {/* TODO: native Madrid editor review */}
                  Email
                </span>
                <span className="font-sans text-sm text-navy-deep">
                  contact@carlosre.com
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-center">
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep/60 underline-offset-2 hover:text-navy-deep hover:underline"
              >
                {/* TODO: native Madrid editor review */}
                Agendar una consulta de 30 minutos → calendly.com/carlosre
              </a>
              <a
                href={LEAD_MAGNETS.buyerBrief.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                {/* TODO: native Madrid editor review */}
                Descargar Miami Buyer Brief Q3 2026 — PDF
              </a>
            </div>
          </div>
        </section>

        <GlobalPartnerNetwork lang="es" />

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
