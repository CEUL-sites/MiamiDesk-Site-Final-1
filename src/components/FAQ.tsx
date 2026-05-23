import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I sell my South Florida home?",
    a: "It starts with positioning — the right price, the right timing, and professional MLS activation. Our team provides a no-cost strategy review to assess your property, advise on pricing, and launch through the Miami MLS to 93,000 professional agents and 200+ global portals simultaneously. No obligation. Just a strategy.",
  },
  {
    q: "What is the Miami MLS and why does it matter?",
    a: "The Miami and South Florida REALTORS® MLS is the world's largest local Realtor® association — over 93,000 member agents and $69B+ in 2025 transaction volume. When your property is listed, it reaches every agent's buyer pipeline and auto-syndicates to 200+ global portals. The MLS is where qualified buyers are found.",
  },
  {
    q: "Do you work with Latin American and Spanish buyers?",
    a: "Yes. South Florida's luxury market runs on Latin American capital. Our team built those relationships deal by deal over 20 years — not through advertising. Our Madrid advisory desk connects Spanish developers, agencies, and HNW owners to the U.S. market through a licensed Florida principal of record.",
  },
  {
    q: "How long does it take to sell in South Florida?",
    a: "In 2025, Miami-Dade properties priced $500K–$1.5M are moving in 30–60 days with correct positioning. Above $2M, typical cycles run 60–120 days. We provide a neighborhood-specific timeline assessment as part of every seller strategy review — free, no listing commitment required.",
  },
  {
    q: "Can a Spanish property be listed in the Miami MLS?",
    a: "Yes. As a licensed Florida principal of record, our team can activate Spanish properties within the Miami MLS ecosystem — reaching 93,000 agents who represent LATAM and North American buyers, the dominant purchasers of luxury Spanish real estate. This is a formal MLS listing, not a referral.",
  },
  {
    q: "Is the seller strategy review really free?",
    a: "Yes, and there is no listing commitment required. The review covers pricing analysis, market timing, positioning recommendation, and a professional profile of the most likely buyer for your property. Submit the form below or WhatsApp our team directly.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-gold/20 bg-navy py-12 md:py-20 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Common Questions</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
            Questions we get asked.
          </h2>
        </div>

        <div className="divide-y divide-white/8">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
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
                    <p className="pb-7 font-sans text-[0.9rem] leading-relaxed text-white/75">{faq.a}</p>
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
