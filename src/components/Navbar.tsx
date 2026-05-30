import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, NAVIGATION, URG_CITIES } from "../constants";
import { CITY_CONFIGS } from "../config/cityMarkets";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UrgLogo } from "./UrgLogo";

// Resolve a city display name to its real market-page slug. Derive links from
// CITY_CONFIGS (the single source of truth) so the dropdown never points to a
// slug without a configured page.
const SLUG_BY_CITY = new Map(Object.values(CITY_CONFIGS).map((c) => [c.name, c.slug]));
const slugFor = (city: string) => SLUG_BY_CITY.get(city);

const MARKETS_BY_COUNTY = [
  { label: "Miami-Dade", cities: URG_CITIES.filter((c) => c.region === "Miami-Dade County" && slugFor(c.city)) },
  { label: "Broward",    cities: URG_CITIES.filter((c) => c.region === "Broward County"    && slugFor(c.city)) },
  { label: "Palm Beach", cities: URG_CITIES.filter((c) => c.region === "Palm Beach County" && slugFor(c.city)) },
];

export function Navbar() {
  const [isOpen, setIsOpen]               = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [marketsOpen, setMarketsOpen]     = useState(false);
  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);
  const marketsRef = useRef<HTMLDivElement>(null);
  const location   = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (marketsRef.current && !marketsRef.current.contains(e.target as Node))
        setMarketsOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const onLight = scrolled;
  const navText = onLight ? "text-navy/80 hover:text-gold" : "text-white/75 hover:text-white";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/97 backdrop-blur-xl border-b border-bone/60 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ── Logo ──────────────────────────────────────────────── */}
        <a
          href="/"
          aria-label="United Realty Group — Carlos Uzcategui, Florida REALTOR®"
          className={`flex shrink-0 items-center gap-3 transition-colors duration-300 ${
            scrolled ? "text-navy" : "text-white"
          }`}
        >
          <UrgLogo className="h-9 w-auto sm:h-10" />
          {/* Agent credential — desktop only, divider keeps it tidy */}
          <span className="hidden flex-col leading-none border-l border-current/20 pl-3 lg:flex">
            <span className="font-serif text-[0.95rem] leading-none tracking-wide">Carlos Uzcategui</span>
            <span
              className="font-mono uppercase leading-none opacity-50 mt-1"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
            >
              Florida REALTOR® since 2001
            </span>
          </span>
        </a>

        {/* ── Desktop nav ───────────────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-center gap-5 xl:flex">
          {NAVIGATION.map((item) => {
            const active = item.href === location.pathname;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap ${
                  active
                    ? "text-gold"
                    : navText
                }`}
              >
                {item.name}
              </a>
            );
          })}

          {/* Markets dropdown */}
          <div ref={marketsRef} className="relative">
            <button
              type="button"
              onClick={() => setMarketsOpen((v) => !v)}
              className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap ${
                marketsOpen ? "text-gold" : navText
              }`}
            >
              Markets
              <ChevronDown
                size={11}
                className={`transition-transform duration-200 ${marketsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {marketsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-full mt-3 w-[520px] border border-gold/20 bg-navy-deep shadow-2xl"
                >
                  <div className="border-b border-white/10 px-5 py-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-gold">
                      South Florida Market Reports
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-0 p-5">
                    {MARKETS_BY_COUNTY.map((county) => (
                      <div key={county.label}>
                        <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                          {county.label}
                        </p>
                        <ul className="space-y-2">
                          {county.cities.map((c) => (
                            <li key={c.city}>
                              <a
                                href={`/market/${slugFor(c.city)}`}
                                onClick={() => setMarketsOpen(false)}
                                className="font-sans text-[11px] text-white/60 transition-colors hover:text-gold"
                              >
                                {c.city}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Desktop right actions ─────────────────────────────── */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <LanguageSwitcher onLight={scrolled} />

          {/* Phone — clean tel link */}
          <a
            href={CONTACT.phoneUSLink}
            className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] transition-colors duration-200 ${
              scrolled ? "text-navy/75 hover:text-gold" : "text-white/70 hover:text-white"
            }`}
          >
            <Phone size={12} className="text-gold" />
            {CONTACT.phoneUSDisplay}
          </a>

          {/* Primary CTA */}
          <a
            href="/contact"
            className={`inline-flex items-center px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
              scrolled
                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                : "border border-gold/60 text-white hover:bg-gold hover:text-navy"
            }`}
          >
            Seller Strategy Review
          </a>
        </div>

        {/* ── Hamburger ─────────────────────────────────────────── */}
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
          className={`xl:hidden transition-colors ${scrolled ? "text-navy" : "text-white"}`}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-navy-deep text-white xl:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 py-6">

              {/* Drawer header */}
              <div className="flex items-start justify-between">
                <a href="/" onClick={() => setIsOpen(false)} className="flex flex-col gap-2 text-white">
                  <UrgLogo className="h-10 w-auto" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/40">
                    Carlos Uzcategui · Florida REALTOR® since 2001
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="text-white/60 hover:text-gold transition-colors mt-1"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Nav links */}
              <div className="mt-12 flex flex-col gap-1">
                {NAVIGATION.map((item, index) => {
                  const active = item.href === location.pathname;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`border-b border-white/8 py-4 font-serif text-2xl transition-colors hover:text-gold ${
                        active ? "text-gold" : "text-white"
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}

                {/* Markets expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAVIGATION.length * 0.04 }}
                  className="border-b border-white/8"
                >
                  <button
                    type="button"
                    onClick={() => setMobileMarketsOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-4 font-serif text-2xl text-white transition-colors hover:text-gold"
                  >
                    Markets
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        mobileMarketsOpen ? "rotate-180 text-gold" : "text-white/35"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileMarketsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 pb-4 pl-1 pt-1">
                          {URG_CITIES.map((c) => (
                            <a
                              key={c.city}
                              href={`/market/${slugFor(c.city)}`}
                              onClick={() => setIsOpen(false)}
                              className="py-1 font-sans text-sm text-white/50 transition-colors hover:text-gold"
                            >
                              {c.city}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Drawer footer */}
              <div className="mt-auto space-y-4 border-t border-gold/20 pt-8">
                <LanguageSwitcher />
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 leading-loose">
                  {CONTACT.brokerage} · FL SL705771 · Equal Housing Opportunity
                </p>
                <a
                  href={CONTACT.phoneUSLink}
                  className="flex w-full items-center justify-center gap-2.5 border border-white/20 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone size={14} className="text-gold" />
                  {CONTACT.phoneUSDisplay}
                </a>
                <a
                  href="/contact"
                  className="flex w-full items-center justify-center bg-gold px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-navy font-semibold"
                >
                  Seller Strategy Review
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
