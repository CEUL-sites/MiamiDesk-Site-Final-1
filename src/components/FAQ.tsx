import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { JsonLd } from "./SEO/JsonLd";

const FAQS = [
  {
    q: "How do I sell my South Florida home?",
    a: "It starts with positioning — the right price, the right timing, and professional MLS activation. Carlos provides a no-cost strategy review to assess your property, advise on pricing, and launch through the Miami MLS with professional buyer-agent visibility and eligible syndication across approved distribution channels. No obligation. Just a strategy.",
  },
  {
    q: "What is the Miami MLS and why does it matter?",
    a: "The Miami and South Florida REALTORS® MLS is the world's largest local Realtor® association — over 93,000 member agents. When your property is listed, it reaches every agent's buyer pipeline and eligible listings may be distributed across 200+ global portals in 19 languages. The MLS is where qualified buyers are found.",
  },
  {
    q: "Do you work with Latin American and Spanish buyers?",
    a: "Yes. South Florida's luxury market runs on Latin American capital. Carlos built those relationships deal by deal over 25 years — not through advertising. Miami Global Listing Desk connects selected Spanish developers, agencies, and HNW owners to South Florida buyer-agent activation through Carlos Uzcategui, Florida Realtor®, and United Realty Group.",
  },
  {
    q: "How long does it take to sell in South Florida?",
    a: "It varies by price band, condition, and positioning. Per Miami and South Florida REALTORS® MLS data, well-positioned homes in the lower price bands have typically transacted faster than luxury product above $2M, which often runs longer. Carlos provides a neighborhood-specific timeline assessment as part of every seller strategy review — this is not a guarantee of any specific outcome, and no listing commitment is required.",
  },
  {
    q: "Can a Spanish property be listed in the Miami MLS?",
    a: "Miami Global Listing Desk can help selected Spanish and international prime properties enter the South Florida professional real estate ecosystem through Carlos Uzcategui, Florida Realtor®, operating through United Realty Group. Any MLS, portal, brokerage, or cooperation activity is subject to brokerage, platform, and compliance requirements and does not guarantee placement, leads, buyers, commissions, or sales.",
  },
  {
    q: "Is the seller strategy review really free?",
    a: "Yes, and there is no listing commitment required. The review covers pricing analysis, market timing, positioning recommendation, and a professional profile of the most likely buyer for your property. Submit the form below or WhatsApp Carlos directly.",
  },
];

// FAQPage structured data — exposes every answer to search engines and AI
// answer engines. Without this, only the open accordion item (index 0) is in
// the prerendered HTML, so the other five answers are invisible to crawlers.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-gold/20 bg-navy py-8 md:py-20 text-white">
      <JsonLd id="site-faq" data={faqSchema} />
      <AuroraBackground variant="subtle" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-6 text-center md:mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Common Questions</p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-white md:mt-4 md:text-4xl lg:text-5xl">
            Questions we get asked.
          </h2>
        </div>

        <div className="divide-y divide-white/8">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-4 text-left md:py-6"
                aria-expanded={open === i}
              >
                <span className="font-serif text-lg text-white leading-snug">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`mt-0.5 flex-shrink-0 text-gold transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 font-sans text-[0.9rem] leading-relaxed text-white/75 md:pb-7">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
