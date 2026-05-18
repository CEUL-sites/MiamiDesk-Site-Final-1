import { Activity, FileEdit, Layers, Scale, Send } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

const STEPS = [
  { icon: Layers, title: "Position", desc: "Pricing, timing, buyer profile, property narrative, and preparation strategy." },
  { icon: FileEdit, title: "Prepare", desc: "Presentation guidance, media planning, listing copy, MLS data accuracy, and launch sequencing." },
  { icon: Send, title: "Launch", desc: "Professional MLS positioning, United Realty Group visibility, buyer-agent exposure, and simultaneous syndication across 200+ global portals in 19 languages." },
  { icon: Activity, title: "Activate", desc: "Targeted outreach, referral channels, international visibility, buyer inquiry follow-up, and Spain plus LATAM referral pipeline through Carlos's Madrid office." },
  { icon: Scale, title: "Negotiate", desc: "Offer review, terms strategy, inspection response, closing coordination, and move-forward planning." }
];

export function SellerSection() {
  return (
    <section id="sellers" className="relative overflow-hidden border-t border-gold/20 bg-navy py-24 text-white">
      <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="font-mono mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">Seller Strategy</p>
          <h2 className="font-serif text-4xl leading-tight text-white lg:text-6xl">
            Your Listing Needs More Than Exposure.<br />
            <span className="italic text-gold">It Needs Direction.</span>
          </h2>
          <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/65">
            Selling well is not just putting a property online. It is positioning the asset correctly, launching it through the right professional channels, and creating visibility where serious buyer activity begins.
          </p>
        </div>

        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-1/2 hidden border-t border-dashed border-gold/35 lg:block" />
          {STEPS.map((step, index) => (
            <motion.article key={step.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: index * 0.08 }} className="group relative z-10 overflow-hidden border border-bone/20 border-b-gold bg-white p-7 text-navy shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-2xl hover:shadow-gold/10">
              <span className="absolute -right-2 top-2 font-serif text-8xl text-gold/12 transition-colors duration-500 group-hover:text-gold/30">{String(index + 1).padStart(2, "0")}</span>
              <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30 transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:ring-0">
                <step.icon size={23} />
              </div>
              <h3 className="relative font-serif text-2xl text-navy">{step.title}</h3>
              <p className="relative mt-4 font-sans text-sm leading-relaxed text-navy/62">{step.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 bg-navy-deep px-6 py-12 text-center ring-1 ring-white/10">
          <h3 className="font-serif text-3xl italic text-white">Ready to position your South Florida property correctly?</h3>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-soft">Request Seller Strategy Review</a>
            <a href={CONTACT.whatsappUS} className="inline-flex items-center justify-center border border-white/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">WhatsApp Carlos</a>
          </div>
          <p className="font-mono mx-auto mt-6 max-w-2xl text-[9px] uppercase tracking-[0.2em] text-white/35">{CONTACT.licenseDisplay} · {CONTACT.brokerage}</p>
        </div>
      </div>
    </section>
  );
}
