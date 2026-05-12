import { motion } from "motion/react";
import { Globe, Users, TrendingUp, Cpu, PieChart, Network } from "lucide-react";

const STATS = [
  {
    value: "93,000",
    label: "Members",
    desc: "World’s largest local Realtor association",
    icon: Users
  },
  {
    value: "$69B",
    label: "Volume",
    desc: "Combined 2025 real estate volume",
    icon: TrendingUp
  },
  {
    value: "3rd-Largest",
    label: "MLS Scale",
    desc: "Expected future MLS scale in the United States",
    icon: PieChart
  },
  {
    value: "437+",
    label: "Agreements",
    desc: "Global real estate association relationships",
    icon: Globe
  },
  {
    value: "11",
    label: "Data Exchanges",
    desc: "MLS data exchange relationships with major U.S. and Canadian MLSs",
    icon: Network
  },
  {
    value: "Global",
    label: "Data Exchange",
    desc: "Cross-border listing visibility infrastructure",
    icon: Cpu
  }
];

export const ReachAdvantage = () => {
  return (
    <section id="reach" className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>
      
      {/* Network line graphic effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl lg:text-5xl mb-8 leading-tight font-serif">
            A Larger South Florida Network <br />
            <span className="text-gold italic font-light">Changes the Listing Conversation</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-3xl">
            The merger of MIAMI REALTORS® and RWorld creates a unified South Florida real estate 
            organization with 93,000 members, expanded regional connectivity, and a broader 
            professional marketplace. 
          </p>
          <p className="text-lg text-gold font-medium mb-12">
            “Features describe a property. Distribution influences its price discovery.”
          </p>
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl border-l-2 border-gold/30 pl-4">
            For sellers, the advantage is not simply more names in a database. It is stronger 
            visibility across the MLS, buyer-agent community, referral channels, and international 
            real estate relationships that influence demand through professional distribution infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/10 border border-white/10">
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
            <a 
              href="#contact"
              className="px-12 py-5 bg-gold text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300 shadow-2xl shadow-gold/20"
            >
                List With Strategic Exposure
            </a>
        </div>
      </div>
    </section>
  );
};
