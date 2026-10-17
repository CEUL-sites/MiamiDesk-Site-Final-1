import { ArrowRight } from "lucide-react";
import { REVIEWS, REALTOR_PROFILE_URL } from "../data/reviews";
import { ReviewSpotlight } from "./reviews/ReviewSpotlight";

// Keep the original review records as the authority; the carousel labels these
// contiguous first-sentence selections as excerpts and links to the full source.
const SELLER_REVIEWS = ["Diego Tolotto", "Maria Isabel Onate", "A. Martinez"]
  .flatMap((name) => {
    const review = REVIEWS.find((item) => item.name === name && item.verified);
    return review ? [{ ...review, text: review.text.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? review.text }] : [];
  });

export function Proof({ lang = "en" }: { lang?: "en" | "es" } = {}) {
  const es = lang === "es";
  return (
    <section id="client-reviews" data-seller-transition aria-labelledby={`seller-transition-title-${lang}`} className="scroll-mt-24 border-b border-hairline bg-white-soft py-12 text-navy-deep md:py-16">
      <div className="mx-auto grid max-w-7xl gap-x-14 gap-y-7 px-6 lg:grid-cols-2">
        <header className="lg:col-start-1 lg:row-start-1">
          <p className="story-eyebrow text-gold-ink">{es ? "Su venta · Su próxima etapa" : "Your sale · Your next move"}</p>
          <h2 id={`seller-transition-title-${lang}`} className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">{es ? "Venda su casa." : "Sell your home."}<br />{es ? "Planifique su próxima etapa." : "Plan what comes next."}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-navy">{es ? "Coordinamos la estrategia de venta con su próxima etapa: revisamos los ingresos netos estimados, la fecha de cierre y si una ocupación posterior negociada podría facilitar su mudanza." : "We coordinate your sale strategy around your next move—reviewing estimated proceeds, closing timing and whether negotiated post-closing occupancy could support your transition."}</p>
        </header>
        <div className="min-w-0 rounded-lg bg-[#0b1a30] p-4 text-white sm:p-6 lg:col-start-2 lg:row-start-1 lg:row-span-2" data-sticky-cta-guard>
          <p className="story-eyebrow text-gold-soft">{es ? "Experiencias de clientes" : "Client experiences"}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/75">{es ? "Extractos de reseñas verificadas en Realtor.com®. Se conserva el idioma original del cliente." : "Excerpts from verified Realtor.com® reviews, in each client's own words."}</p>
          <ReviewSpotlight reviews={SELLER_REVIEWS} compact sellerLayout lang={lang} />
          <a href={REALTOR_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm text-gold-soft underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-soft">{es ? "Leer las reseñas completas en Realtor.com® →" : "Read the full reviews on Realtor.com® →"}</a>
        </div>
        <div className="lg:col-start-1 lg:row-start-2" data-sticky-cta-guard>
          <a href="#list-here" className="story-cta w-full sm:w-auto">{es ? "Planificar mi venta y mi próxima etapa" : "Plan My Sale and Next Move"}<ArrowRight size={18} aria-hidden="true" className="shrink-0" /></a>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy">{es ? "Cuéntenos sobre su propiedad y sus plazos. Nuestro equipo se pondrá en contacto para coordinar una conversación privada." : "Tell us about your property and timing. Our team will contact you to arrange a private strategy conversation."}</p>
          <p className="mt-5 max-w-lg text-xs leading-relaxed text-navy/80">{es ? "La ocupación posterior al cierre requiere acuerdo con el comprador y condiciones por escrito. Los ingresos netos dependen de cada operación. Las experiencias individuales no garantizan un resultado, plazo ni acuerdo de ocupación." : "Post-closing occupancy requires buyer agreement and written terms. Net proceeds depend on the transaction. Individual experiences do not guarantee an outcome, timeline or occupancy arrangement."}</p>
        </div>
      </div>
    </section>
  );
}
