import { AuroraBackground } from "./AuroraBackground";
import { JsonLd } from "./SEO/JsonLd";
import { FaqAccordion } from "./FaqAccordion";

export const SELLER_FAQS = [
  {
    "q": "How do I choose a listing agent in South Florida?",
    "a": "Compare how each agent will price your property, prepare it for market, reach relevant buyer agents, report feedback and negotiate the contract. Carlos Uzcategui provides seller representation through United Realty Group. Request a private seller strategy review to discuss your property, timing and priorities before making a listing commitment."
  },
  {
    "q": "How will you market my South Florida home?",
    "a": "We review competing listings and recent sales, agree the preparation and media scope, and position eligible listings in the MLS. We then coordinate relevant buyer-agent outreach, inquiry follow-up and showing feedback. Syndication and referral reach depend on property eligibility, MLS rules, brokerage approval and participating channels; placement, inquiries and sales are not guaranteed."
  },
  {
    "q": "Can you help me sell a home in South Florida while I live abroad?",
    "a": "Yes. Carlos coordinates the South Florida listing, communication and transaction steps in English or Spanish through United Realty Group. We discuss property access, local contacts, document requirements and your time zone before launch. Your attorney and tax advisor handle legal and tax questions, including any requirements applicable to non-resident owners."
  },
  {
    "q": "How long does it take to sell a home in South Florida?",
    "a": "Timing depends on your neighborhood, property type, condition, asking price, competing inventory and the buyer's financing and contract terms. We review recent comparable sales and current competition to discuss a property-specific plan. A market estimate is not a guarantee of a sale or closing date."
  },
  {
    "q": "Can you coordinate selling my home with my next purchase or relocation?",
    "a": "We review your preferred closing date, next-home plans and estimated proceeds alongside the asking price. Where appropriate, we discuss occupancy terms or other transition arrangements for negotiation with the buyer and review by the relevant professionals. Any arrangement requires agreement and documentation; availability is not guaranteed."
  },
  {
    "q": "What happens after I request a private seller strategy review?",
    "a": "Share your property address, contact details, timing and priorities through the seller form or WhatsApp. Carlos reviews the information and contacts you to arrange the conversation. The review covers comparable properties, pricing, preparation, relevant buyer reach and estimated proceeds. There is no fee for the review and no listing commitment."
  }
];

// Visible answers and structured data share one source of truth.
export const sellerFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SELLER_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden border-t border-gold/20 bg-navy py-8 md:py-20 text-white">
      <JsonLd id="site-faq" data={sellerFaqSchema} />
      <AuroraBackground variant="subtle" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-6 text-center md:mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Common Questions</p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-white md:mt-4 md:text-4xl lg:text-5xl">
            Selling a home in South Florida: your questions.
          </h2>
        </div>
        <FaqAccordion faqs={SELLER_FAQS} tone="dark" />
      </div>
    </section>
  );
}
