import { motion } from "motion/react";
import { CONTACT } from "../constants";
import { LazyVideo } from "./LazyVideo";

export function AdvisorBrand() {
  return (
    <section className="relative overflow-hidden bg-navy-deep" aria-label="Carlos Uzcategui — advisor profile">

      {/* Full-bleed video */}
      <div className="relative w-full" style={{ minHeight: "520px", maxHeight: "90vh" }}>
        <LazyVideo
          src="/videos/advisor-brand.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ minHeight: "520px", maxHeight: "90vh" }}
        />

        {/* Dark gradient — heavier on right so left text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/60 to-navy-deep/25" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

        {/* Content — left-anchored, vertically centred */}
        <div className="relative z-10 flex h-full items-center" style={{ minHeight: "520px" }}>
          <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-14 lg:px-20">
            <div className="max-w-xl">

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold"
              >
                Carlos Uzcategui · FL SL705771 · Since 2001
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-5 font-serif leading-[1.05] text-white"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.8rem)" }}
              >
                Not a listing agent.<br />
                <em className="italic text-gold">A strategy partner.</em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 font-sans text-base leading-relaxed text-white/65 max-w-md"
              >
                Twenty-five years of South Florida transactions — residential, luxury, and commercial. The relationships, the market intelligence, and the professional network that determine whether a listing becomes a result.
              </motion.p>

              {/* Credential strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {["CLHMS", "Certified Seller Rep", "United Realty Group", "Licensed Since 2001"].map((badge) => (
                  <span
                    key={badge}
                    className="border border-gold/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-gold/80"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
                >
                  Private Strategy Review →
                </a>
                <a
                  href={CONTACT.whatsappUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-gold hover:text-gold"
                >
                  WhatsApp Carlos
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
