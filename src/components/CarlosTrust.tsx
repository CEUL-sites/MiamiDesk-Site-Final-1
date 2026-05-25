import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

export function CarlosTrust() {
  return (
    <section className="border-t border-gold/20 bg-navy py-10 md:py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14"
        >
          {/* Headshot */}
          <div className="flex-shrink-0">
            <div className="carlos-headshot-card" style={{ maxWidth: 160 }}>
              <img
                src={CONTACT.headshot}
                alt="Carlos Uzcategui, Florida Licensed Realtor® with United Realty Group, serving South Florida and Madrid since 2001"
                className="carlos-headshot"
                loading="lazy"
                width="160"
                height="160"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Principal</p>
            <h2 className="mt-3 font-serif text-3xl text-white lg:text-4xl">Carlos Uzcategui</h2>
            <p className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40">
              Florida Licensed Realtor® Since 2001 · CLHMS · Certified Seller Representative · United Realty Group
            </p>
            <p className="mt-5 max-w-2xl font-sans text-[0.95rem] leading-relaxed text-white/60">
              Twenty-five years of active South Florida transactions — residential, luxury, and commercial. Carlos
              advises sellers on pricing strategy, professional positioning, and MLS activation from his Weston, Florida
              office, with a Madrid advisory presence for cross-border and international clients.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {["Certified Seller Rep", "25 Years Licensed", "Weston · Madrid"].map((badge) => (
                <span key={badge} className="border border-gold/25 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-gold/60">
                  {badge}
                </span>
              ))}
              {/* CLHMS certification seal — hidden until image loads */}
              <img
                src="/images/clhms-seal.png"
                alt="Certified Luxury Home Marketing Specialist"
                className="h-12 w-12 opacity-0 transition-opacity duration-500"
                loading="lazy"
                width="48"
                height="48"
                onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.9"; }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 border border-gold px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold hover:text-navy"
            >
              Schedule a 30-minute listing strategy call
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
