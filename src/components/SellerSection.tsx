import { motion } from "motion/react";
import { Layers, FileEdit, Send, Activity, Scale } from "lucide-react";

const STEPS = [
  {
    icon: Layers,
    title: "1. Position",
    desc: "Pricing, timing, buyer profile, property narrative, and preparation strategy."
  },
  {
    icon: FileEdit,
    title: "2. Prepare",
    desc: "Presentation guidance, media planning, listing copy, MLS data accuracy, and launch sequencing."
  },
  {
    icon: Send,
    title: "3. Launch",
    desc: "Professional MLS positioning, United Realty Group visibility, buyer-agent exposure, and digital distribution."
  },
  {
    icon: Activity,
    title: "4. Activate",
    desc: "Targeted outreach, referral channels, international visibility, and buyer inquiry follow-up."
  },
  {
    icon: Scale,
    title: "5. Negotiate",
    desc: "Offer review, terms strategy, inspection response, closing coordination, and move-forward planning."
  }
];

export function SellerSection() {
  return (
    <section id="sellers" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl lg:text-5xl text-navy mb-6 leading-tight font-serif">
            Your Listing Needs More Than Exposure. <br />
            <span className="italic text-gold font-light">It Needs Direction.</span>
          </h2>
          <p className="text-lg text-navy/70 leading-relaxed max-w-2xl">
            Selling well is no longer just about putting a property online. It is about 
            positioning the asset correctly, launching it through the right professional 
            channels, and creating visibility where serious buyer activity begins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-bone shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-ivory/50 rounded-bl-full translate-x-12 -translate-y-12 group-hover:bg-gold/10 transition-colors duration-500" />
              
              <div className="w-12 h-12 bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300 relative z-10">
                <step.icon size={24} className="text-gold group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-navy mb-4 relative z-10">{step.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
            <a 
              href="#contact"
              className="inline-block px-10 py-5 bg-navy text-white font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300 shadow-lg shadow-navy/10"
            >
                Find Out How to Position Your Home
            </a>
            <p className="mt-6 text-xs text-navy/40 uppercase tracking-widest text-center max-w-lg">
                A private property strategy call is a professional review of timing, positioning, exposure, and next-step options.
            </p>
        </div>
      </div>
    </section>
  );
}
