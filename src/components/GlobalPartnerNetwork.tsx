import { motion } from "motion/react";
import { GLOBAL_REACH } from "../data/partnerAssociations";
import { LazyVideo } from "./LazyVideo";
import { AuroraBackground } from "./AuroraBackground";

type Lang = "en" | "es";

const COPY = {
  en: {
    eyebrow: "Global Partner Network · MIAMI REALTORS®",
    headlineA: "Your buyer may not live in Florida.",
    headlineB: "Their agent is already in our network.",
    intro: "South Florida property sells to a global buyer. Listing through a Miami and South Florida REALTORS® member places your property inside a network backed by 437+ international agreements across 75+ countries — reaching the agents who represent Latin American, European, and Gulf buyers.",
    stats: [
      { value: GLOBAL_REACH.internationalAgreements, label: "International Agreements" },
      { value: GLOBAL_REACH.languages,               label: "Languages" },
      { value: GLOBAL_REACH.countries,               label: "Countries" },
      { value: GLOBAL_REACH.globalWebsites,          label: "Global Portals" },
    ],
    source: "Source: MIAMI REALTORS® Global Partner Associations · MiamiRealtors.com/GlobalPartners",
    imgAlt: "MIAMI REALTORS® + RWorld — the global REALTOR® platform",
    imgCaption: "MIAMI REALTORS® + RWorld",
  },
  es: {
    eyebrow: "Red Global de Asociaciones · MIAMI REALTORS®",
    headlineA: "Su comprador quizá no viva en Florida.",
    headlineB: "Su agente ya está en nuestra red.",
    intro: "La propiedad del Sur de Florida se vende a un comprador global. Listar a través de un miembro de MIAMI & South Florida REALTORS® sitúa su inmueble dentro de una red respaldada por 437+ acuerdos internacionales en 75+ países — los agentes que representan compradores latinoamericanos, europeos y del Golfo ya son socios.",
    stats: [
      { value: GLOBAL_REACH.internationalAgreements, label: "Acuerdos Internacionales" },
      { value: GLOBAL_REACH.languages,               label: "Idiomas" },
      { value: GLOBAL_REACH.countries,               label: "Países" },
      { value: GLOBAL_REACH.globalWebsites,          label: "Portales Globales" },
    ],
    source: "Fuente: MIAMI REALTORS® Global Partner Associations · MiamiRealtors.com/GlobalPartners",
    imgAlt: "MIAMI REALTORS® + RWorld — la plataforma global de REALTORS®",
    imgCaption: "MIAMI REALTORS® + RWorld",
  },
} as const;

export function GlobalPartnerNetwork({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];

  return (
    <section id="global-network" className="relative overflow-hidden bg-navy-deep text-white border-t border-gold/10">
      {/* Miami ↔ Spain split backdrop */}
      <AuroraBackground variant="subtle" />
      <LazyVideo
        src="/videos/split_foto_miami_spain_mls.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.11]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/75 to-navy-deep/90" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">

        {/* ── Two-column: copy left, credential right ── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">

          {/* Left: headline + intro */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-5 font-serif leading-[1.1] text-white"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)" }}
            >
              {t.headlineA}<br />
              <em className="not-italic italic text-gold">{t.headlineB}</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 font-sans text-sm leading-relaxed text-white/55 max-w-xl"
            >
              {t.intro}
            </motion.p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-10 grid grid-cols-2 gap-px border border-gold/15 bg-gold/10 sm:grid-cols-4"
            >
              {t.stats.map((s) => (
                <div key={s.label} className="bg-navy-deep px-5 py-5 text-center">
                  <div className="font-serif text-2xl text-gold md:text-3xl">{s.value}</div>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
              {t.source}
            </p>
          </div>

          {/* Right: subtle credential image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-shrink-0 lg:w-[260px]"
          >
            <div className="overflow-hidden rounded-lg border border-gold/15 bg-white/[0.03]">
              <img
                src="/images/miami-realtors-rworld.jpg"
                alt={t.imgAlt}
                width="520"
                height="292"
                loading="lazy"
                className="h-auto w-full opacity-80 mix-blend-luminosity transition-opacity duration-500 hover:opacity-95"
              />
              <div className="px-4 py-3 text-center">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">{t.imgCaption}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
