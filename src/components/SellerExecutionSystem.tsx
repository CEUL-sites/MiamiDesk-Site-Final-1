import { motion } from "motion/react";

const EXECUTION_STEPS = [
  {
    number: "01",
    label: "POSITION",
    copy: "Price strategy, presentation, buyer profile, property narrative and launch timing.",
  },
  {
    number: "02",
    label: "ACTIVATE",
    copy: "Identify and reach agents working with relevant buyers by location, property type and price range.",
  },
  {
    number: "03",
    label: "REPORT",
    copy: "Provide structured updates on showing activity, online engagement, buyer-agent response and competing inventory.",
  },
  {
    number: "04",
    label: "ADJUST",
    copy: "Recommend changes from market evidence, property response and competitive movement—not guesswork.",
  },
] as const;

export function SellerExecutionSystem() {
  return (
    <section className="bg-white-soft py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">
            Listing execution
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-5xl">
            What Carlos Does After the Listing Goes Live
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/70">
            Distribution creates the opportunity. Execution determines how the market sees, tests and responds to the property.
          </p>
        </div>

        <ol className="mt-10 border-t border-navy/15 md:mt-14">
          {EXECUTION_STEPS.map((step, index) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="grid gap-3 border-b border-navy/15 py-7 md:grid-cols-[100px_210px_1fr] md:items-baseline md:gap-7 md:py-9"
            >
              <span className="font-serif text-3xl text-gold/75" aria-hidden="true">{step.number}</span>
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-navy-deep">
                {step.label}
              </h3>
              <p className="max-w-3xl font-serif text-xl leading-relaxed text-navy/82 md:text-2xl">
                {step.copy}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
