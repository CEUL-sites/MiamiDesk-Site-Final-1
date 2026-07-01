import { Activity, FileEdit, Layers, Scale, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CONTACT } from "../constants";

const STEPS = [
  { icon: Layers, title: "Position", desc: "Pricing, timing, buyer profile, property narrative, and preparation strategy." },
  { icon: FileEdit, title: "Prepare", desc: "Presentation guidance, media planning, listing copy, MLS data accuracy, and launch sequencing." },
  { icon: Send, title: "Launch", desc: "Professional MLS positioning, accurate listing data, buyer-agent visibility, and eligible syndication across approved distribution channels." },
  { icon: Activity, title: "Activate", desc: "Targeted outreach, inquiry follow-up, referral pathways, showing coordination, and market feedback designed to support qualified demand." },
  { icon: Scale, title: "Negotiate", desc: "Offer review, terms strategy, inspection response, closing coordination, and move-forward planning." },
];

// ── Pop particles ──────────────────────────────────────────────────────────────
const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function PopParticles({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {PARTICLE_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 70;
        const ty = Math.sin(rad) * 70;
        return (
          <motion.div
            key={angle}
            className="absolute h-2.5 w-2.5 rounded-full bg-gold"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={active ? { scale: [0, 1, 0], x: tx, y: ty, opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ── Phone frame ────────────────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[2.6rem] bg-black shadow-2xl shadow-black/60 ring-[3px] ring-white/10"
      style={{ width: 210, height: 454 }}
    >
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      {/* Screen */}
      <div className="absolute inset-[5px] overflow-hidden rounded-[2.2rem] bg-black">
        {children}
      </div>
      {/* Side buttons (decorative) */}
      <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-full bg-white/20" />
      <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-full bg-white/20" />
      <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-full bg-white/20" />
      {/* Home bar */}
      <div className="absolute bottom-2.5 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/30" />
    </div>
  );
}

// ── Video slide labels ─────────────────────────────────────────────────────────
// The phone frame is portrait, so vertical Matterport-style walkthrough tours lead
// the reel — they fill the screen natively and show sellers exactly how their home
// is presented to buyers.
const SLIDES = [
  {
    src: "/videos/signature_marketing_reel.mp4",
    label: "Signature marketing reel",
    badge: "SIGNATURE",
  },
  {
    src: "/videos/matterport_tour.mp4",
    label: "3D walkthrough tour",
    badge: "3D TOUR",
  },
  {
    src: "/videos/matterport_tour_2.mp4",
    label: "3D walkthrough tour",
    badge: "3D TOUR",
  },
  {
    src: "/videos/matterport_tour_3.mp4",
    label: "3D walkthrough tour",
    badge: "3D TOUR",
  },
  {
    src: "/videos/virtual_tour_showcase.mp4",
    label: "Virtual property tour",
    badge: "VIRTUAL TOUR",
  },
  {
    src: "/videos/dollhouse_global_reach.mp4",
    label: "Global property marketing reach",
    badge: "GLOBAL REACH",
  },
  {
    src: "/videos/luxury_advisor_digital.mp4",
    label: "Marketing mastery reel",
    badge: "MARKETING",
  },
  {
    src: "/videos/luxury_listing_showcase.mp4",
    label: "Luxury listing showcase",
    badge: "LISTINGS",
  },
  {
    src: "/videos/south_florida_showcase.mp4",
    label: "South Florida lifestyle",
    badge: "SOUTH FLORIDA",
  },
];

// ── Phone bubble player ────────────────────────────────────────────────────────
function PhoneBubblePlayer() {
  const [slide, setSlide] = useState(0);
  const [popping, setPopping] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only load/play the rotating clips (one is ~14MB) while this section is on
  // screen. Off-screen it fetches nothing and the 10s rotation is paused.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle every 10 s — only while visible
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setPopping(true);
      setShowParticles(true);
      setTimeout(() => {
        setShowParticles(false);
        setSlide((s) => (s + 1) % SLIDES.length);
        setPopping(false);
      }, 550);
    }, 10000);
    return () => clearTimeout(t);
  }, [slide, inView]);

  const current = SLIDES[slide];

  return (
    <div ref={rootRef} className="relative flex items-center justify-center" style={{ width: 260, height: 500 }}>
      {/* Glow behind phone */}
      <div className="absolute inset-8 rounded-full bg-gold/20 blur-2xl" />

      <PopParticles active={showParticles} />

      <AnimatePresence mode="wait">
        {!popping && (
          <motion.div
            key={`slide-${slide}`}
            initial={{ scale: 0, opacity: 0, rotate: slide % 2 === 0 ? -8 : 8 }}
            animate={{ scale: 1, opacity: 1, rotate: slide % 2 === 0 ? -2 : 2 }}
            exit={{ scale: 1.12, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 240 }}
          >
            {/* Floating bob */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneFrame>
                <video
                  ref={videoRef}
                  src={inView ? current.src : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />

                {/* Overlay badge */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                    {current.badge}
                  </span>
                </div>
              </PhoneFrame>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute -bottom-5 flex gap-2">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-5 bg-gold" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export function SellerSection() {
  return (
    <section id="sellers" className="relative overflow-hidden border-t border-gold/20 bg-navy py-16 md:py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(20,45,90,0.8),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ── Header: headline left, phone right ── */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16 mb-20">
          <div className="flex-1 max-w-2xl">
            <p className="font-mono mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">Seller Strategy</p>
            <h2 className="font-serif leading-[1.05] text-white" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}>
              The MLS Reaches 93,000 Agents.<br />
              <em className="italic text-gold">Strategy Gets Your Home Shown.</em>
            </h2>
            <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-white/60">
              Every seller enters the same MLS. Not every seller enters it correctly. Positioning, professional media,
              buyer-agent activation, and negotiation strategy are what separate a listing from a sale.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="/contact" className="inline-flex items-center bg-gold px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Request a Seller Strategy Review
              </a>
              <a href={CONTACT.whatsappUS} className="inline-flex items-center border border-white/20 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold/60 hover:text-white">
                Discuss Your Property on WhatsApp
              </a>
            </div>
          </div>

          {/* Phone bubble — hidden on mobile (avoids black frame on small screens), visible lg+ */}
          <div className="hidden lg:block flex-shrink-0">
            <PhoneBubblePlayer />
          </div>
        </div>

        {/* ── 5-step process ── */}
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-1/2 hidden border-t border-dashed border-gold/35 lg:block" />
          {STEPS.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative z-10 overflow-hidden border border-bone/20 border-b-gold bg-white p-7 text-navy shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-2xl hover:shadow-gold/10"
            >
              <span className="absolute -right-2 top-2 font-serif text-8xl text-gold/12 transition-colors duration-500 group-hover:text-gold/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30 transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:ring-0">
                <step.icon size={23} />
              </div>
              <h3 className="relative font-serif text-2xl text-navy">{step.title}</h3>
              <p className="relative mt-4 font-sans text-sm leading-relaxed text-navy/62">{step.desc}</p>
            </motion.article>
          ))}
        </div>

        {/* ── CTA block ── */}
        <div className="mt-12 bg-navy-deep px-6 py-10 text-center ring-1 ring-white/10">
          <h3 className="font-serif text-3xl italic text-white">Ready to position your South Florida property correctly?</h3>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/contact" className="inline-flex items-center justify-center bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-soft">
              Request a Private Seller Strategy Review
            </a>
            <a href={CONTACT.whatsappUS} className="inline-flex items-center justify-center border border-white/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
              WhatsApp Carlos
            </a>
          </div>
          <p className="font-mono mx-auto mt-6 max-w-2xl text-[9px] uppercase tracking-[0.2em] text-white/35">
            {CONTACT.licenseDisplay} · {CONTACT.brokerage}
          </p>
        </div>
      </div>
    </section>
  );
}
