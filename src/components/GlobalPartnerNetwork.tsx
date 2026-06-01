import { motion } from "motion/react";
import { GLOBAL_REACH, PARTNER_REGIONS } from "../data/partnerAssociations";

type Lang = "en" | "es";

const COPY = {
  en: {
    eyebrow: "Global Partner Network · MIAMI REALTORS®",
    headlineA: "Your buyer may not live in Florida.",
    headlineB: "Their agent is already in our network.",
    intro: (
      <>
        South Florida and Spanish luxury property sells to a global buyer. Listing through a
        MIAMI &amp; South Florida REALTORS® member places your home inside an international referral
        network of <span className="text-white/90">2 million+ professionals</span> across{" "}
        <span className="text-white/90">300+ partner associations in 70+ countries</span>,
        with eligible listings distributed across 500+ global websites in 19 languages where available. The agents representing Latin American,
        European and Gulf buyers are not cold contacts. They are partners.
      </>
    ),
    stats: [
      { value: GLOBAL_REACH.partnerAssociations, label: "Partner Associations", sub: "MIAMI Global Council" },
      { value: GLOBAL_REACH.professionals, label: "Professionals", sub: "International referral network" },
      { value: GLOBAL_REACH.countries, label: "Countries", sub: "With a partner association" },
      { value: GLOBAL_REACH.globalWebsites, label: "Global Websites", sub: "Listing syndication reach" },
    ],
    markets: "markets",
    flagshipLabel: "Flagship partners",
    platformCaption: "MIAMI REALTORS® + RWorld — the global REALTOR® platform",
    source: "Source: MIAMI REALTORS® Global Partner Associations · MiamiRealtors.com/GlobalPartners",
  },
  es: {
    eyebrow: "Red Global de Asociaciones · MIAMI REALTORS®",
    headlineA: "Su comprador quizá no viva en Florida.",
    headlineB: "Su agente ya está en nuestra red.",
    intro: (
      <>
        La propiedad de lujo del Sur de Florida y de España se vende a un comprador global. Listar
        a través de un miembro de MIAMI &amp; South Florida REALTORS® sitúa su inmueble dentro de una
        red internacional de referidos de <span className="text-white/90">1 millón+ de profesionales</span>{" "}
        en <span className="text-white/90">300+ asociaciones socias de 70+ países</span>, con
        sindicación en 200+ sitios web globales en 19 idiomas. Los agentes que representan a
        compradores de Latinoamérica, Europa y el Golfo no son contactos fríos. Son socios.
      </>
    ),
    stats: [
      { value: GLOBAL_REACH.partnerAssociations, label: "Asociaciones Socias", sub: "MIAMI Global Council" },
      { value: GLOBAL_REACH.professionals, label: "Profesionales", sub: "Red internacional de referidos" },
      { value: GLOBAL_REACH.countries, label: "Países", sub: "Con una asociación socia" },
      { value: GLOBAL_REACH.globalWebsites, label: "Sitios Web Globales", sub: "Alcance de sindicación" },
    ],
    markets: "mercados",
    flagshipLabel: "Socios destacados",
    platformCaption: "MIAMI REALTORS® + RWorld — la plataforma global de REALTORS®",
    source: "Fuente: MIAMI REALTORS® Global Partner Associations · MiamiRealtors.com/GlobalPartners",
  },
} as const;

export function GlobalPartnerNetwork({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const HEADLINE_STATS = t.stats;

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
            {t.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mt-6 font-serif leading-[1.1] text-white"
            style={{ fontSize: "clamp(2.1rem, 4.5vw, 4rem)" }}
          >
            {t.headlineA}<br />
            <em className="not-italic italic text-gold">{t.headlineB}</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-3xl font-sans text-base leading-[1.85] text-white/60"
          >
            {t.intro}
          </motion.p>
        </div>

        {/* ── MIAMI REALTORS® + RWorld global platform ──────────── */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-gold/20 shadow-2xl shadow-black/40"
        >
          <img
            src="/images/miami-realtors-rworld.jpg"
            alt="MIAMI REALTORS® + RWorld — the global REALTOR® platform"
            width="960"
            height="540"
            loading="lazy"
            className="h-auto w-full"
          />
          <figcaption className="bg-[#0A1525] px-5 py-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
            {t.platformCaption}
          </figcaption>
        </motion.figure>

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
                  {lang === "es" ? region.regionEs : region.region}
                </h3>
                <span className="font-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-gold/60">
                  {region.countries.length} {t.markets}
                </span>
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-white/55">
                {lang === "es" ? region.noteEs : region.note}
              </p>

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
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/50">{t.flagshipLabel}</p>
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
          {t.source}
        </p>
      </div>
    </section>
  );
}
