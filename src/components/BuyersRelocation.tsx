import { motion } from "motion/react";
import { Compass, BarChart3, PlaneLanding, Building2, Users, Globe } from "lucide-react";
import { CONTACT, ASSOCIATION_STATS } from "../constants";

const SOUTH_FLORIDA_CARDS = [
  {
    number: "01",
    icon: Compass,
    title: "Strategic Acquisitions",
    desc: "Neighborhood intelligence, offer structure, and local market insight refined by 25 years of institutional-grade Florida real estate experience. The right property, at the right price, in the right timing window.",
    tag: "MIAMI-DADE · BROWARD · PALM BEACH"
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Portfolio Positioning",
    desc: "Analytical support for investors comparing asset types, location fundamentals, and long-term capital positioning across South Florida. Investment-grade thinking applied to residential and commercial assets.",
    tag: "RESIDENTIAL · COMMERCIAL · MIXED-USE"
  },
  {
    number: "03",
    icon: PlaneLanding,
    title: "LATAM & International Buyers",
    desc: "A bilingual advisory bridge for buyers relocating from Latin America or Europe into South Florida. Twenty-five years of authentic LATAM client relationships — built deal by deal, not through marketing campaigns.",
    tag: "BILINGUAL · ENGLISH & SPANISH"
  }
];

const SPAIN_CARDS = [
  {
    number: "01",
    icon: Building2,
    title: "Spain & Madrid Inventory",
    desc: "Carlos holds active listings in Spain entered into the Miami MLS — giving them institutional U.S. market exposure. Qualified buyers and their representatives can access this inventory through direct referral.",
    tag: "MADRID · SPAIN · MLS ACTIVATED"
  },
  {
    number: "02",
    icon: Users,
    title: "Agent Referral Lane",
    desc: "Most Spain buyers arrive through a referring agent — a Miami Realtor, a LATAM broker, or a European agency with a qualified client. Carlos coordinates directly with referring agents and honors professional referral agreements.",
    tag: "AGENT-TO-AGENT · REFERRAL FEES HONORED"
  },
  {
    number: "03",
    icon: Globe,
    title: "Cross-Border Advisory",
    desc: "For buyers navigating both markets — acquiring in Miami while evaluating Spain, or relocating between markets — Carlos provides bilateral advisory backed by active presence in both cities.",
    tag: "MIAMI ↔ MADRID · DUAL MARKET"
  }
];

export function BuyersRelocation() {
  return (
    <section id="buyers" className="bg-bone-warm">

      {/* LANE 1 — SOUTH FLORIDA BUYERS */}
      <div className="py-14 md:py-20 border-b border-bone">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold mb-4">
                BUYER ADVISORY · SOUTH FLORIDA
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-6">
                The right property.{" "}
                <span className="text-gold italic font-light">
                  The right representation.
                </span>
              </h2>
              <p className="text-navy/65 text-lg leading-relaxed max-w-xl">
                South Florida's active inventory spans Miami-Dade, Broward, and
                Palm Beach — three counties, thousands of listings, and a market
                that moves fast. Carlos provides buyer representation backed by
                25 years of local relationships and United Realty Group's
                {CONTACT.stats.urgAgents} agents across {CONTACT.stats.offices} offices — professionals on the ground
                who know the inventory, the sellers, and the neighborhoods.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-navy text-white font-bold uppercase tracking-widest text-sm hover:bg-gold transition-all duration-300"
              >
                Brief Your Search →
              </a>
              <p className="font-mono text-[9px] uppercase tracking-widest text-navy/30 mt-4">
                United Realty Group · CLHMS · FL SL705771
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {SOUTH_FLORIDA_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-bone hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 font-serif text-6xl font-bold text-navy/5 leading-none select-none">
                  {card.number}
                </div>
                <div className="w-10 h-10 bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                  <card.icon size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">{card.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">{card.desc}</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/60">
                  {card.tag}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LANE 2 — SPAIN / MADRID BUYERS */}
      <div className="py-14 md:py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold mb-4">
                BUYER ADVISORY · SPAIN · MADRID
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6">
                Spain inventory.{" "}
                <span className="text-gold italic font-light">
                  U.S. MLS exposure.
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                Carlos holds active listings in Spain and Madrid entered
                directly into the Miami MLS — giving international buyers
                and their agents institutional access to verified Spanish
                inventory. If you represent a buyer searching for property
                in Spain, Carlos coordinates the full advisory process
                from both sides of the Atlantic.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gold text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-navy transition-all duration-300"
              >
                WhatsApp Spain Desk →
              </a>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mt-4">
                Madrid · Spain · Referral agreements honored
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {SPAIN_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-8 hover:border-gold/40 hover:bg-white/8 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 font-serif text-6xl font-bold text-white/5 leading-none select-none">
                  {card.number}
                </div>
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <card.icon size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{card.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{card.desc}</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/50">
                  {card.tag}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Agent referral callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 border border-gold/20 bg-gold/5 grid lg:grid-cols-3 gap-6 items-center"
          >
            <div className="lg:col-span-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-2">
                FOR REFERRING AGENTS
              </p>
              <p className="font-serif text-xl text-white leading-snug">
                Representing a buyer interested in Spain or Miami?
                Carlos works directly with licensed agents and honors
                professional referral agreements on both sides of the transaction.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href="/agents"
                className="inline-block px-6 py-3 border border-gold text-gold font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all duration-300"
              >
                Start a Referral Conversation →
              </a>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
