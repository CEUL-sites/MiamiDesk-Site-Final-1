import { motion } from "motion/react";
import { Building2, Globe, Network, Presentation, Search, Users } from "lucide-react";
import { CONTACT } from "../constants";

const STATS = [
  {
    value: "MLS",
    label: "Visibility",
    desc: "Professional MLS positioning once a listing is active and compliant",
    icon: Search
  },
  {
    value: "URG",
    label: "Brokerage",
    desc: "United Realty Group infrastructure and agent-to-agent cooperation",
    icon: Building2
  },
  {
    value: "Agents",
    label: "Distribution",
    desc: "Buyer-agent awareness, referral relationships, and professional follow-up",
    icon: Users
  },
  {
    value: "Digital",
    label: "Presentation",
    desc: "Property narrative, photography plan, listing copy, and launch sequence",
    icon: Presentation
  },
  {
    value: "Spain",
    label: "Bridge",
    desc: "Madrid and Spain-facing relationships where relevant to the property",
    icon: Globe
  },
  {
    value: "Follow-Up",
    label: "Discipline",
    desc: "Structured buyer inquiry tracking, showing feedback loops, and negotiation-stage follow-up to keep momentum toward closing",
    icon: Network
  }
];

export const ReachAdvantage = () => {
  return (
    <section id="reach" className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl lg:text-5xl mb-8 leading-tight font-serif">
            Seller Exposure Advantage <br />
            <span className="text-gold italic font-light">built around professional distribution.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-3xl">
            A strong South Florida listing strategy is not just a public webpage. It is pricing discipline, MLS accuracy, brokerage cooperation, buyer-agent visibility, syndication readiness, and active follow-up.
          </p>
          <p className="text-lg text-gold font-medium mb-12">
            Features describe a property. Distribution shapes price discovery.
          </p>
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl border-l-2 border-gold/30 pl-4">
            {CONTACT.licenseDisplay}. Associate in {CONTACT.brokerage}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-navy hover:bg-navy-light transition-colors duration-500 group"
            >
              <div className="flex items-start justify-between mb-8">
                <stat.icon size={28} className="text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl lg:text-5xl font-serif text-gold">{stat.value}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">{stat.label}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center">
          <a href="#contact" className="px-12 py-5 bg-gold text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300 shadow-2xl shadow-gold/20">
            Request Seller Strategy Review
          </a>
        </div>
      </div>
    </section>
  );
};
