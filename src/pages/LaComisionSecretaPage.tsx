import { Helmet } from "react-helmet-async";
import { BookOpen, BadgeCheck, ChevronRight, Lock, Star, Award } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CONTACT } from "../constants";

const CHAPTERS = [
  {
    number: "01",
    title: "La Licencia",
    subtitle: "Florida Real Estate Licensing — Step by Step",
    preview:
      "El examen de estado de Florida, los requisitos del DBPR y el FREC, los proveedores de cursos aprobados — y lo que la mayoría de las escuelas de bienes raíces no te explica sobre el primer año.",
  },
  {
    number: "02",
    title: "El Corredor Correcto",
    subtitle: "Choosing the Right Brokerage for Your Career",
    preview:
      "Tu primera decisión después de la licencia define los primeros dos años. Qué preguntar, qué señales buscar, y por qué la estructura de la compañía importa más que el porcentaje de comisión.",
  },
  {
    number: "03",
    title: "El Mercado Que Nadie te Explica",
    subtitle: "South Florida's Micro-Markets and What the MLS Actually Tells You",
    preview:
      "Miami-Dade, Broward y Palm Beach no son un mercado — son docenas. Cómo leer los datos de absorción, los días en el mercado y los precios por pie cuadrado para entender dónde estás posicionado.",
  },
  {
    number: "04",
    title: "La Comisión Secreta",
    subtitle: "What Experienced Agents Know About How Money Moves",
    preview:
      "No se trata del porcentaje. Se trata de quién controla la transacción, cómo se activan los agentes de compradores, y la mecánica del dinero que la mayoría de los agentes nuevos aprende demasiado tarde.",
  },
  {
    number: "05",
    title: "El Pipeline desde Cero",
    subtitle: "Building a Client Database in a Competitive Market",
    preview:
      "Desde tu primera semana sin contactos hasta un pipeline activo — sistemas de seguimiento, estrategia de base de datos, y los errores que destruyen el momentum antes de que empiece.",
  },
  {
    number: "06",
    title: "El Comprador Latinoamericano",
    subtitle: "South Florida's Most Significant Buyer Profile",
    preview:
      "Por qué el perfil de comprador latinoamericano domina el segmento alto de South Florida, cómo construir credibilidad en ese canal, y la diferencia entre el comprador venezolano, colombiano y brasileño en términos de proceso.",
  },
  {
    number: "07",
    title: "Listar es Poder",
    subtitle: "Why the Listing Side Generates Leverage",
    preview:
      "Un listado trabaja para ti mientras duermes. Cómo ganar listados cuando eres nuevo, qué buscan los vendedores en un agente, y la diferencia entre un agente que vende propiedades y uno que construye un negocio.",
  },
  {
    number: "08",
    title: "25 Años de Mercado",
    subtitle: "What Long Experience in One Market Teaches You",
    preview:
      "Las lecciones que solo da el tiempo — y cómo comprimir ese aprendizaje. Qué patrones se repiten en cada ciclo, qué señales ignorar, y qué hábitos separan a los agentes que duran de los que desaparecen.",
  },
];

const WHATS_INSIDE = [
  "Florida DBPR licensing — proceso completo desde cero",
  "Cómo evaluar y elegir tu primera correduría",
  "MLS strategy and micro-market analysis for South Florida",
  "The Latin American buyer channel — working effectively",
  "Pipeline building and database management from week one",
  "The mechanics of commissions that most agents learn too late",
  "Listing-side strategy and how to win listings as a new agent",
  "Career positioning in one of the most competitive markets in the U.S.",
];

export default function LaComisionSecretaPage() {
  const whatsappBooklet = `https://wa.me/19548656622?text=Hola%20Carlos%2C%20estoy%20interesado%20en%20La%20Comisi%C3%B3n%20Secreta%20y%20quisiera%20recibir%20informaci%C3%B3n%20cuando%20est%C3%A9%20disponible.`;

  return (
    <>
      <Helmet>
        <title>La Comisión Secreta — The South Florida Real Estate Career Guide | HomesProfessional.com</title>
        <meta
          name="description"
          content="La Comisión Secreta: 248-page Spanish-language guide to building a real estate career in South Florida. Licensing, brokerage selection, the Latin American buyer market, and what 25 years in this market actually teaches. By Carlos Uzcategui, FL SL705771."
        />
        <meta
          name="keywords"
          content="la comision secreta, como ser agente de bienes raices florida, licencia bienes raices florida, carrera bienes raices south florida, agente bienes raices miami, Carlos Uzcategui guia agente"
        />
        <link rel="canonical" href="https://homesprofessional.com/la-comision-secreta" />
        <meta property="og:title" content="La Comisión Secreta — South Florida Real Estate Career Guide" />
        <meta property="og:description" content="248-page Spanish-language guide to building a real estate career in South Florida. Licensing, pipeline, the Latin American buyer market — by Carlos Uzcategui, FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/la-comision-secreta" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="La Comisión Secreta — South Florida Real Estate Career Guide" />
        <meta name="twitter:description" content="248-page Spanish guide to a real estate career in South Florida — licensing, MLS, the Latin American buyer market. By Carlos Uzcategui, FL SL705771." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": "La Comisión Secreta",
          "description": "A 248-page Spanish-language guide to building a real estate career in South Florida — licensing, brokerage selection, the Latin American buyer market, and what 25 years in the industry teaches.",
          "author": {
            "@type": "Person",
            "name": "Carlos Uzcategui",
            "jobTitle": "Licensed REALTOR®",
            "url": "https://homesprofessional.com/"
          },
          "inLanguage": "es",
          "numberOfPages": "248",
          "genre": "Professional Development",
          "about": "Real Estate Career, South Florida, Florida Licensing",
          "url": "https://homesprofessional.com/la-comision-secreta"
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, #B08D57 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #B08D57 0%, transparent 50%)" }}
          />
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">

              {/* Left — copy */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 border border-gold/25 px-3 py-1.5">
                  <Lock size={10} className="text-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">
                    Spanish · 248 Pages · Career Guide
                  </span>
                </div>
                <h1
                  className="font-serif leading-none text-white"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}
                >
                  La Comisión<br />
                  <em className="not-italic italic text-gold">Secreta</em>
                </h1>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                  How to Build a Real Estate Career in South Florida
                </p>
                <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-white/65">
                  248 páginas sobre cómo construir una carrera de bienes raíces en South Florida —
                  desde la licencia hasta el pipeline, desde la selección de correduría hasta
                  la mecánica de las comisiones que la mayoría de los agentes aprende demasiado tarde.
                </p>
                <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/45">
                  Written in Spanish for the South Florida market.
                  Covers Florida licensing (DBPR/FREC), the Latin American buyer profile,
                  MLS positioning, and career strategy from a REALTOR® with 25 years in this market.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappBooklet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                  >
                    <BookOpen size={14} />
                    Get Notified at Launch
                  </a>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                    No commitment · First access
                  </span>
                </div>
                <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                  By {CONTACT.licenseDisplay} · United Realty Group
                </p>
              </div>

              {/* Right — book visual */}
              <div className="lg:sticky lg:top-24">
                <div className="relative mx-auto max-w-xs lg:max-w-none">
                  {/* Book cover */}
                  <div className="relative overflow-hidden border border-gold/20 bg-[radial-gradient(ellipse_at_30%_30%,rgba(176,141,87,0.22),rgba(6,17,31,0.98))] p-10 shadow-2xl shadow-black/40">
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60">
                        Career Guide · South Florida
                      </p>
                    </div>
                    <BookOpen size={48} className="mb-8 text-gold" strokeWidth={1} />
                    <h2 className="font-serif text-3xl leading-tight text-white">
                      La Comisión<br />
                      <span className="text-gold italic">Secreta</span>
                    </h2>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                      How to Build a Real Estate Career<br />in South Florida
                    </p>
                    <div className="mt-10 border-t border-white/10 pt-6">
                      <div className="flex items-center gap-3">
                        <img
                          src="/images/carlos-headshot.png"
                          alt="Carlos Uzcategui"
                          width="36"
                          height="36"
                          className="h-9 w-9 rounded-full object-cover object-top"
                        />
                        <div>
                          <p className="font-serif text-sm text-white">Carlos Uzcategui</p>
                          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                            FL SL705771 · 25 Years
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">248 páginas</span>
                      <span className="bg-gold/15 border border-gold/25 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                  {/* Spine shadow */}
                  <div className="absolute -left-1 top-1 -z-10 h-full w-full bg-gold/5 blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-ivory border-t border-bone py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Para quién es este libro
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-center font-serif text-2xl leading-tight text-navy-deep">
              Para el agente que quiere entender cómo funciona este mercado — antes de entrar.
            </h2>
            <div className="mt-12 grid gap-px border border-bone bg-bone sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Aspiring agents",
                  body: "You are considering a real estate license in Florida and want to understand what the career actually looks like before you invest in the course and exam.",
                },
                {
                  title: "New licensees",
                  body: "You passed the Florida state exam and now need to understand how the business works — brokerage structure, the MLS, the commission model, and how to build from zero.",
                },
                {
                  title: "International professionals",
                  body: "You have a background in real estate outside the United States and want to understand the American model, Florida licensing, and how South Florida's international buyer profile creates opportunity.",
                },
                {
                  title: "Career changers",
                  body: "You are leaving a different career and evaluating whether real estate in South Florida is a viable transition. This book gives you the framework to make that decision with accurate information.",
                },
                {
                  title: "Spanish-speaking professionals",
                  body: "The guide is written in Spanish for a market where English and Spanish operate in parallel. The Latin American buyer channel, the bilingual agent advantage, and the international referral network are covered in depth.",
                },
                {
                  title: "Agents considering URG",
                  body: "You are already licensed and considering your next brokerage move — what infrastructure looks like at scale, and what a professional referral network inside the Miami MLS provides.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white p-7">
                  <ChevronRight size={14} className="mb-3 text-gold" />
                  <h3 className="font-serif text-base text-navy-deep">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-navy/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter previews */}
        <section className="bg-navy-deep py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Contenido del libro
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-center font-serif text-3xl leading-tight text-white">
              Ocho capítulos. Un sistema completo.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-center font-sans text-sm leading-relaxed text-white/45">
              248 páginas organizadas en una secuencia lógica — desde la licencia hasta la construcción de un negocio de largo plazo en uno de los mercados más competitivos de los Estados Unidos.
            </p>
            <div className="mt-14 space-y-px border border-white/8 bg-white/8">
              {CHAPTERS.map((chapter, i) => (
                <div
                  key={chapter.number}
                  className="group relative bg-navy-deep/80 px-8 py-7 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-6">
                    <span className="flex-shrink-0 font-mono text-[11px] tracking-[0.1em] text-gold/40 mt-0.5">
                      {chapter.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-serif text-xl text-white">{chapter.title}</h3>
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                          {chapter.subtitle}
                        </span>
                      </div>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-white/50">
                        {chapter.preview}
                      </p>
                    </div>
                    {i === 3 && (
                      <span className="flex-shrink-0 border border-gold/30 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
                        Title Chapter
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's inside checklist */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Lo que cubre el libro
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep">
                  A complete professional framework — not a motivational guide.
                </h2>
                <p className="mt-6 font-sans text-sm leading-relaxed text-navy/60">
                  Most real estate career books offer generic advice. This one is specific to Florida
                  licensing, the South Florida MLS, the Latin American buyer profile, and 25 years
                  of actual experience in this market. No inspirational anecdotes. No filler. A
                  professional reference you will use in your first year and return to in year five.
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy/60">
                  Written in Spanish for an audience that has often found English-language real estate
                  education to be missing the cultural and market context that actually matters for
                  building a career in South Florida.
                </p>
              </div>

              <div className="border border-bone bg-ivory p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
                  Incluye
                </p>
                <ul className="space-y-3.5">
                  {WHATS_INSIDE.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="font-sans text-sm leading-relaxed text-navy/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-bone pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-navy/35">
                  248 páginas · Español · South Florida market
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Author section */}
        <section className="bg-ivory border-t border-bone py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="relative">
                <img
                  src="/images/carlos-headshot.png"
                  alt="Carlos Uzcategui — FL SL705771"
                  width="112"
                  height="112"
                  className="h-28 w-28 rounded-full object-cover object-top ring-2 ring-gold/30"
                />
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center bg-gold">
                  <Award size={13} className="text-navy-deep" />
                </div>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">El Autor</p>
                <h2 className="mt-2 font-serif text-2xl text-navy-deep">Carlos Uzcategui</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/40 mt-1">
                  Florida Licensed Realtor® SL705771 · United Realty Group · 25 Years
                </p>
                <p className="mt-5 font-sans text-sm leading-relaxed text-navy/65">
                  Carlos Uzcategui has been licensed in Florida since 2001 — before Miami Brickell's
                  current skyline existed, before the Latin American buyer profile dominated the
                  luxury segment, and before the Miami MLS became one of the most internationally
                  connected in the country.
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy/65">
                  He works seller representation across Miami-Dade, Broward, and Palm Beach through
                  United Realty Group — one of Florida's largest independently owned brokerages with
                  {" "}{CONTACT.stats.urgAgents} agents across {CONTACT.stats.urgOffices} offices.
                  La Comisión Secreta is what he wishes existed when he started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-navy-deep py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Próximo lanzamiento
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-white">
              Recibe acceso anticipado
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-white/50">
              La Comisión Secreta launches soon. Send a WhatsApp message to Carlos directly to be
              notified when it becomes available — and to receive early-access pricing before the
              public launch.
            </p>
            <a
              href={whatsappBooklet}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-gold px-10 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              <BookOpen size={14} />
              Notify Me at Launch
            </a>
            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
              {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
