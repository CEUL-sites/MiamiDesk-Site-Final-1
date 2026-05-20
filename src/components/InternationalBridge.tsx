import { ChevronRight, Plane } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

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

const SPAIN_COPY = "For Spain agencies, developers, and ownership teams, Carlos creates a licensed U.S. channel into the Miami MLS ecosystem with bilingual presentation support, agent-facing exposure, and cross-border advisory coordination.";
const OWNER_COPY = "For South Florida owners, the same Miami and Madrid presence adds international buyer awareness, referral pathways, and a more sophisticated property narrative for listings with global appeal.";

export function InternationalBridge() {
  return (
    <section id="spain" className="overflow-hidden bg-navy-deep py-14 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto mb-16 h-32 max-w-4xl">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 120" fill="none" aria-hidden="true">
            <defs>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Outer pulse halos */}
            <circle cx="110" cy="82" r="20" fill="rgba(176,141,87,0.07)" />
            <circle cx="790" cy="82" r="20" fill="rgba(176,141,87,0.07)" />
            <circle cx="110" cy="82" r="12" fill="rgba(176,141,87,0.12)" />
            <circle cx="790" cy="82" r="12" fill="rgba(176,141,87,0.12)" />
            {/* Flight arc */}
            <path d="M110 82 C300 6 590 6 790 82" stroke="rgba(176,141,87,0.38)" strokeWidth="1.5" strokeDasharray="8 11" />
            {/* Glowing endpoint dots */}
            <circle cx="110" cy="82" r="7" fill="#B08D57" filter="url(#glow-gold)" />
            <circle cx="790" cy="82" r="7" fill="#B08D57" filter="url(#glow-gold)" />
            {/* Bright inner dots */}
            <circle cx="110" cy="82" r="3" fill="#D4AE78" />
            <circle cx="790" cy="82" r="3" fill="#D4AE78" />
          </svg>
          <motion.div className="absolute left-[12%] top-[48px] text-gold" animate={{ left: ["12%", "85%"], top: [48, 18, 48] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <Plane size={22} />
          </motion.div>
          <div className="absolute left-2 bottom-0 flex items-center gap-2 border border-gold/30 bg-navy-deep/70 backdrop-blur-sm px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-glow" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Miami, FL</span>
          </div>
          <div className="absolute right-2 bottom-0 flex items-center gap-2 border border-gold/30 bg-navy-deep/70 backdrop-blur-sm px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Madrid, España</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-glow" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">International Activation Bridge</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-white lg:text-6xl">
            Your inventory. The U.S. market.<br />
            <span className="italic text-gold">One licensed principal.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-sans text-lg leading-[1.9] text-white/60">
            The majority of luxury real estate buyers in Spain, particularly in Madrid, Marbella, and the Costa del Sol, come from Latin America and North America. Carlos lists your property into the Miami MLS, putting it in front of 93,000 professional agents who represent those exact buyers. No workaround. No intermediary. A licensed Florida principal of record.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.7 }} className="group border-t-4 border-gold bg-navy-light p-10 transition-all duration-500 hover:-translate-y-1.5 hover:bg-navy hover:shadow-2xl hover:shadow-gold/10">
              <h3 className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-gold">{item.title}</h3>
              <p className="mt-5 font-sans text-sm leading-relaxed text-white/60">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-y border-gold/20">
          <div className="bg-white/[0.03] p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">For Spain · Agencies · Developers</p>
            <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-white/80">{SPAIN_COPY}</p>
          </div>
          <div className="border-t border-gold/20 bg-white/[0.03] p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">For South Florida Owners</p>
            <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-white/80">{OWNER_COPY}</p>
          </div>
        </div>

        <div className="pt-16 text-center">
          <h3 className="font-serif text-3xl italic text-white">Ready to put your property in front of the world's largest Realtor network?</h3>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#contact" className="group inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-all hover:bg-gold-soft active:scale-95">
              Request a Private Seller Strategy Review
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-white/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-gold hover:text-gold active:scale-95">WhatsApp Spain Desk</a>
          </div>
          <p className="font-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-gold/70">Spanish inquiries answered in Spanish within one business day.</p>
        </div>
      </div>
    </section>
  );
}
