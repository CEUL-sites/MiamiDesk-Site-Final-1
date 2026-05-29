import { motion } from "motion/react";
import { GLOBAL_REACH, PARTNER_REGIONS } from "../data/partnerAssociations";

const HEADLINE_STATS = [
  { value: GLOBAL_REACH.partnerAssociations, label: "Partner Associations", sub: "Most of any REALTOR® assoc. worldwide" },
  { value: GLOBAL_REACH.professionals, label: "Professionals", sub: "Real estate agents reached worldwide" },
  { value: GLOBAL_REACH.countries, label: "Countries", sub: "With a signed partner association" },
  { value: GLOBAL_REACH.websites, label: "Web Sites", sub: "Featuring your listing via syndication" },
];

export function GlobalPartnerNetwork() {
  return (
    <section id="global-network" className="relative overflow-hidden bg-navy-deep text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
          >
            Global Partner Network · MIAMI REALTORS®
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mt-6 font-serif leading-[1.1] text-white"
            style={{ fontSize: "clamp(2.1rem, 4.5vw, 4rem)" }}
          >
            Your buyer may not live in Florida.<br />
            <em className="not-italic italic text-gold">Their agent is already in our network.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-3xl font-sans text-base leading-[1.85] text-white/60"
          >
            South Florida and Spanish luxury property sells to a global buyer. Listing through a
            MIAMI &amp; South Florida REALTORS® member places your home inside the MLS of the
            association with <span className="text-white/90">the most international partner
            agreements in the world</span> — formally linked to 300+ associations and{" "}
            <span className="text-white/90">2&nbsp;million+ real estate professionals</span> across
            70+ countries. The agents representing Latin American, European and Gulf buyers are not
            cold contacts. They are partners.
          </motion.p>
        </div>

        {/* ── Headline stats ──────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-px border border-gold/15 bg-gold/10 lg:grid-cols-4">
          {HEADLINE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-navy-deep p-6 text-center md:p-8"
            >
              <div className="font-serif text-gold" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1 }}>
                {stat.value}
              </div>
              <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white">{stat.label}</p>
              <p className="font-mono mt-1.5 text-[8px] uppercase tracking-[0.18em] text-gold/55">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Regions ─────────────────────────────────────────── */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {PARTNER_REGIONS.map((region, index) => (
            <motion.article
              key={region.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              className="group border-t-2 border-gold/40 bg-white/[0.03] p-7 transition-colors duration-500 hover:bg-white/[0.05] md:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-gold lg:text-[1.7rem]">
                  {region.region}
                </h3>
                <span className="font-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-gold/60">
                  {region.countries.length} markets
                </span>
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-white/55">{region.note}</p>

              {/* Country chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {region.countries.map((country) => (
                  <span
                    key={country}
                    className="font-mono border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/55 transition-colors group-hover:border-gold/25"
                  >
                    {country}
                  </span>
                ))}
              </div>

              {/* Flagship associations */}
              <div className="mt-6 border-t border-white/8 pt-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/50">Flagship partners</p>
                <ul className="mt-3 space-y-1.5">
                  {region.flagship.map((assoc) => (
                    <li key={assoc} className="flex items-start gap-2.5 font-sans text-[0.8rem] leading-snug text-white/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                      {assoc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Source attribution ──────────────────────────────── */}
        <p className="font-mono mt-10 text-center text-[9px] uppercase tracking-[0.2em] text-gold/45">
          Source: MIAMI REALTORS® Global Partner Associations · MiamiRealtors.com/GlobalPartners
        </p>
      </div>
    </section>
  );
}
