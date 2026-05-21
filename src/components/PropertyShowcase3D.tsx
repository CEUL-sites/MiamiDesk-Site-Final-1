import { Camera, ChevronRight, Globe, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PACKAGE_ITEMS = [
  {
    icon: Camera,
    stat: "48hr",
    title: "Professional Media Package",
    desc: "HDR photography, walkthrough video, and aerial drone coverage — delivered within 48 hours of listing activation.",
    color: "from-navy to-navy-deep",
  },
  {
    icon: Globe,
    stat: "200+",
    title: "Global Portal Syndication",
    desc: "Auto-published to Zillow, Realtor.com, Homes.com and 200+ global portals in 19 languages the moment the MLS listing activates.",
    color: "from-[#0B2040] to-navy-deep",
  },
  {
    icon: Users,
    stat: "93K",
    title: "LATAM Buyer Network Outreach",
    desc: "Direct professional outreach to 93,000 association agents. Carlos's personal LATAM buyer referral network activated on your listing.",
    color: "from-navy to-[#0A1830]",
  },
  {
    icon: Star,
    stat: "CLHMS",
    title: "Luxury Certification Advantage",
    desc: "CLHMS-certified luxury positioning — property narrative, pricing intelligence, staging advisory, and buyer-profile targeting.",
    color: "from-[#0D2248] to-navy-deep",
  },
];

export function PropertyShowcase3D() {
  return (
    <section className="overflow-hidden bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What Your Listing Gets</p>
          <h2 className="mt-5 font-serif text-4xl text-navy lg:text-5xl">
            Professional presentation.<br />
            <span className="italic text-gold">Maximum market reach.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-navy/65">
            Every property listed with Carlos enters a full-service professional infrastructure — photography, global distribution, buyer-agent outreach, and luxury positioning, simultaneously.
          </p>
        </div>

        {/* 3D perspective card grid */}
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1200px" }}
        >
          {PACKAGE_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ y: -10, rotateX: -4, rotateY: 3, scale: 1.02 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.07, duration: 0.65, ease: EASE }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative flex flex-col overflow-hidden border border-bone bg-white shadow-lg shadow-navy/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-navy/15"
            >
              {/* Gold top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

              {/* Dark header with stat */}
              <div className={`bg-gradient-to-br ${item.color} px-6 py-8`}>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                    <item.icon size={22} />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gold/70 group-hover:text-gold transition-colors duration-300">
                    {item.stat}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-sans text-sm font-semibold leading-snug text-navy">{item.title}</h3>
                <p className="flex-1 font-sans text-xs leading-relaxed text-navy/60">{item.desc}</p>
              </div>

              {/* Hover border effect */}
              <div className="pointer-events-none absolute inset-0 border-2 border-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-5 border-t border-bone pt-10 sm:flex-row sm:justify-between"
        >
          <p className="font-sans text-base text-navy/70 text-center sm:text-left">
            Ready to see your property positioned this way?
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-all hover:bg-gold-soft active:scale-95"
          >
            Request Your Free Strategy Review
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
