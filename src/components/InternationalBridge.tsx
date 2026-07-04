import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";
import { LazyVideo } from "./LazyVideo";
import { AuroraBackground } from "./AuroraBackground";

const CAPABILITIES = [
  {
    title: "MLS Placement",
    body: "Your property enters the Miami and South Florida REALTORS® MLS as a listed asset, reaching 93,000 member agents and their buyer pipelines. Not a referral. A formal listing."
  },
  {
    title: "Active Outreach",
    body: "Targeted, professional outreach campaigns to South Florida Realtors who are actively working with qualified LATAM buyers. Campaigns are documented and reported."
  },
  {
    title: "Campaign Reporting",
    body: "Full activity reporting delivered to your agency or ownership team: agent contacts made, showing requests received, market positioning data, and professional feedback."
  }
];

const SPAIN_COPY = "For Spain agencies, developers, and ownership teams, our licensed professionals create a formal U.S. channel into the Miami MLS ecosystem with bilingual presentation support, agent-facing exposure, and cross-border advisory coordination.";
const OWNER_COPY = "For South Florida owners, the same Miami and Madrid presence adds international buyer awareness, referral pathways, and a more sophisticated property narrative for listings with global appeal.";

export function InternationalBridge() {
  return (
    <section id="spain" className="relative overflow-hidden bg-navy-deep text-white">

      <AuroraBackground variant="warm" />
      {/* Cinematic video background */}
      <LazyVideo
        src="/videos/globe-bg.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.38 }}
      />

      {/* Layered overlay — dark at top and bottom, lighter in middle to let video breathe */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/40 to-navy-deep/85" />
      {/* Side vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,transparent_40%,rgba(6,17,31,0.6)_100%)]" />

      {/* Content — must be relative z-10 to sit above video */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20">

        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
          >
            International Activation Bridge
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-5 font-serif text-4xl leading-tight text-white lg:text-6xl"
          >
            Your inventory. The U.S. market.<br />
            <span className="italic text-gold">One licensed principal.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-3xl font-sans text-lg leading-[1.9] text-white/65"
          >
            The majority of luxury real estate buyers in Spain, particularly in Madrid, Marbella, and the Costa del Sol, come from Latin America and North America. Our team lists your property into the Miami MLS, putting it in front of 93,000 professional agents who represent those exact buyers. No workaround. No intermediary. A licensed Florida principal of record.
          </motion.p>

          {/* Location tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {["Miami · FL", "Madrid · España", "LATAM Network"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 border border-gold/30 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">{tag}</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              className="group border-t-4 border-gold bg-navy-deep/60 p-10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-navy-deep/80 hover:shadow-2xl hover:shadow-gold/10"
            >
              <h3 className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-gold">{item.title}</h3>
              <p className="mt-5 font-sans text-sm leading-relaxed text-white/60">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-y border-gold/20">
          <div className="bg-white/[0.04] p-8 backdrop-blur-sm lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">For Spain · Agencies · Developers</p>
            <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-white/80">{SPAIN_COPY}</p>
          </div>
          <div className="border-t border-gold/20 bg-white/[0.04] p-8 backdrop-blur-sm lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">For South Florida Owners</p>
            <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-white/80">{OWNER_COPY}</p>
          </div>
        </div>

        <div className="pt-16 text-center">
          <h3 className="font-serif text-3xl italic text-white">Ready to give your property the reach of the world's largest local Realtor® network?</h3>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/contact" className="group inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-all hover:bg-gold-soft active:scale-95">
              Request a Private Seller Strategy Review
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-white/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-gold hover:text-gold active:scale-95">
              WhatsApp Spain Desk
            </a>
          </div>
          <p className="font-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-gold/70">Spanish inquiries answered in Spanish.</p>
        </div>

      </div>
    </section>
  );
}
