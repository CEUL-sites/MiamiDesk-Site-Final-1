import { useState } from "react";
import { ArrowRight, CalendarClock, Calculator, KeyRound } from "lucide-react";
import { REVIEWS, REALTOR_PROFILE_URL } from "../data/reviews";
import { ReviewSpotlight } from "./reviews/ReviewSpotlight";
import { ReviewMarquee } from "./reviews/ReviewMarquee";
import { Tilt3D } from "./Tilt3D";

// Keep the original review records as the authority; the carousel labels these
// contiguous first-sentence selections as excerpts and links to the full source.
const SELLER_REVIEWS = ["Diego Tolotto", "Maria Isabel Onate", "A. Martinez"]
  .flatMap((name) => {
    const review = REVIEWS.find((item) => item.name === name && item.verified);
    return review ? [{ ...review, text: review.text.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? review.text }] : [];
  });

const TRANSITION_MODES = {
  en: [
    {
      id: "occupancy",
      icon: CalendarClock,
      label: "Post-Closing Occupancy",
      headline: "Close first, move on your schedule.",
      summary: "Structure a written post-occupancy agreement so you do not have to move twice.",
    },
    {
      id: "proceeds",
      icon: Calculator,
      label: "Net Proceeds Clarity",
      headline: "Know what you keep before going live.",
      summary: "Review documentary stamps, title costs, HOA prorations, and payoff math upfront.",
    },
    {
      id: "relocation",
      icon: KeyRound,
      label: "Synchronized Next Move",
      headline: "Align sale closing with your next purchase.",
      summary: "Coordinate contract contingencies and Homestead portability across South Florida or abroad.",
    },
  ],
  es: [
    {
      id: "occupancy",
      icon: CalendarClock,
      label: "Ocupación Post-Cierre",
      headline: "Cierre primero y múdese según su calendario.",
      summary: "Estructuramos acuerdos escritos de ocupación posterior para evitar una doble mudanza.",
    },
    {
      id: "proceeds",
      icon: Calculator,
      label: "Claridad de Ingresos Netos",
      headline: "Conozca su neto estimado antes de publicar.",
      summary: "Revisamos impuestos de timbre, costos de título, prorrateos de HOA y saldo hipotecario.",
    },
    {
      id: "relocation",
      icon: KeyRound,
      label: "Próxima Compra Sincronizada",
      headline: "Coordine el cierre con su siguiente etapa.",
      summary: "Alineamos plazos contractuales y portabilidad de Homestead en Florida o el exterior.",
    },
  ],
} as const;

export function Proof({ lang = "en" }: { lang?: "en" | "es" } = {}) {
  const es = lang === "es";
  const modes = TRANSITION_MODES[lang];
  const [activeMode, setActiveMode] = useState(0);
  const current = modes[activeMode];

  return (
    <section
      id="client-reviews"
      data-seller-transition
      aria-labelledby={`seller-transition-title-${lang}`}
      className="scroll-mt-24 overflow-hidden border-b border-hairline bg-white-soft pt-12 text-navy-deep md:pt-16"
    >
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-6 pb-12 lg:grid-cols-12 md:pb-14 items-center">
        {/* Left Column: Interactive Transition Planner (6 cols) */}
        <div className="lg:col-span-6" data-sticky-cta-guard>
          <p className="story-eyebrow text-gold-ink">
            {es ? "Su venta · Su próxima etapa" : "Your sale · Your next move"}
          </p>
          <h2
            id={`seller-transition-title-${lang}`}
            className="mt-3 font-serif text-3xl leading-[1.1] sm:text-4xl md:text-5xl"
          >
            {es ? "Venda su casa." : "Sell your home."}
            <br />
            {es ? "Planifique su próxima etapa." : "Plan what comes next."}
          </h2>

          {/* Interactive 3-Pill Selector instead of long explanatory paragraph */}
          <div
            className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3"
            role="tablist"
            aria-label={es ? "Opciones de transición" : "Seller transition options"}
          >
            {modes.map((mode, idx) => {
              const Icon = mode.icon;
              const selected = activeMode === idx;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveMode(idx)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-3 text-left transition-all ${
                    selected
                      ? "border-gold bg-navy-deep text-white shadow-md"
                      : "border-bone bg-white text-navy-deep hover:border-gold/60"
                  }`}
                >
                  <Icon
                    size={16}
                    className={selected ? "text-gold shrink-0" : "text-gold-ink shrink-0"}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] leading-tight">
                    {mode.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active 2-Line Callout Card */}
          <div className="mt-3 rounded-lg border border-bone bg-white p-5 shadow-sm">
            <p className="font-serif text-xl text-navy-deep">{current.headline}</p>
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-navy/75">
              {current.summary}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <a href="#list-here" className="story-cta w-full sm:w-auto">
              {es ? "Planificar mi venta y mi próxima etapa" : "Plan My Sale and Next Move"}
              <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
            </a>

            <details className="text-xs text-navy/65">
              <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70 hover:text-gold-ink">
                {es ? "Condiciones y notas ↓" : "Transition & Proceeds Note ↓"}
              </summary>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-navy/75">
                {es
                  ? "La ocupación posterior al cierre requiere acuerdo con el comprador y condiciones por escrito. Los ingresos netos dependen de cada operación. Las experiencias individuales no garantizan un resultado, plazo ni acuerdo de ocupación."
                  : "Post-closing occupancy requires buyer agreement and written terms. Net proceeds depend on the transaction. Individual experiences do not guarantee an outcome, timeline or occupancy arrangement."}
              </p>
            </details>
          </div>
        </div>

        {/* Right Column: Verified Client Spotlight (6 cols) */}
        <Tilt3D maxTilt={3} className="min-w-0 lg:col-span-6">
          <div
            className="min-w-0 rounded-xl bg-[#0b1a30] p-5 text-white shadow-xl sm:p-7"
            data-sticky-cta-guard
          >
            <div className="flex items-center justify-between gap-2">
              <p className="story-eyebrow text-gold-soft">
                {es ? "Experiencias de clientes" : "Client experiences"}
              </p>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                {es ? "Verificado en Realtor.com®" : "Verified Realtor.com®"}
              </span>
            </div>
            <ReviewSpotlight reviews={SELLER_REVIEWS} compact sellerLayout lang={lang} />
            <a
              href={REALTOR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm text-gold-soft underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-soft"
            >
              {es
                ? "Leer las reseñas completas en Realtor.com® →"
                : "Read the full reviews on Realtor.com® →"}
            </a>
          </div>
        </Tilt3D>
      </div>
      <ReviewMarquee lang={lang} tone="light" />
    </section>
  );
}
