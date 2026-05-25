import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, NAVIGATION, URG_CITIES } from "../constants";
import { LanguageSwitcher } from "./LanguageSwitcher";

const toSlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");

const MARKETS_BY_COUNTY = [
  { label: "Miami-Dade", cities: URG_CITIES.filter((c) => c.region === "Miami-Dade County") },
  { label: "Broward", cities: URG_CITIES.filter((c) => c.region === "Broward County") },
  { label: "Palm Beach", cities: URG_CITIES.filter((c) => c.region === "Palm Beach County") },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);
  const marketsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (marketsRef.current && !marketsRef.current.contains(e.target as Node)) {
        setMarketsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logoTone = scrolled ? "text-navy" : "text-white";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-bone shadow-sm py-3" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex flex-col leading-none" aria-label="United Realty Group · HomesProfessional.com">
          <span className="font-serif text-[1.35rem] font-bold tracking-widest leading-tight">
            <span className={logoTone}>UNITED </span><span className="font-serif text-[0.85rem] italic font-normal tracking-wide text-gold">Realty Group</span>
          </span>
          <span className={`font-mono mt-0.5 text-[8px] uppercase tracking-[0.18em] ${scrolled ? "text-navy/60" : "text-white/55"}`}>
            Carlos Uzcategui · FL SL705771
          </span>
        </a>

        <div className="hidden items-center gap-7 xl:flex">
          {NAVIGATION.map((item) => {
            const isActive = item.href === location.pathname;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive
                    ? "text-gold font-semibold"
                    : scrolled
                    ? "text-navy/75 hover:text-gold"
                    : "text-white/75 hover:text-gold"
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
              className={`inline-flex items-center gap-1 font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                marketsOpen
                  ? "text-gold"
                  : scrolled
                  ? "text-navy/75 hover:text-gold"
                  : "text-white/75 hover:text-gold"
              }`}
            >
              Markets
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${marketsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {marketsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
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
                                href={`/market/${toSlug(c.city)}`}
                                onClick={() => setMarketsOpen(false)}
                                className="font-sans text-[11px] text-white/65 transition-colors hover:text-gold"
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

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 border px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${scrolled ? "border-gold text-navy hover:bg-gold hover:text-white" : "border-gold/60 text-white hover:bg-gold hover:text-navy"}`}>
            <Phone size={14} />
            {CONTACT.phoneUS}
          </a>
          <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Madrid {CONTACT.phoneSpain}
          </a>
        </div>

        <button type="button" className={`xl:hidden ${scrolled ? "text-navy" : "text-white"}`} onClick={() => setIsOpen(true)} aria-label="Open navigation menu">
          <Menu size={30} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-navy-deep text-white xl:hidden">
            <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-2xl font-bold tracking-widest leading-tight text-white">
                    UNITED <span className="font-serif text-base italic font-normal tracking-wide text-gold">Realty Group</span>
                  </span>
                  <span className="font-mono mt-1 text-[8px] uppercase tracking-[0.18em] text-white/45">HomesProfessional.com</span>
                </div>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation menu" className="text-gold">
                  <X size={32} />
                </button>
              </div>

              <div className="mt-14 flex flex-col gap-5">
                {NAVIGATION.map((item, index) => {
                  const isActive = item.href === location.pathname;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-white/10 pb-4 font-serif text-3xl transition-colors hover:text-gold ${isActive ? "text-gold" : "text-white"}`}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}

                {/* Markets expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAVIGATION.length * 0.05 }}
                  className="border-b border-white/10 pb-4"
                >
                  <button
                    type="button"
                    onClick={() => setMobileMarketsOpen((v) => !v)}
                    className="flex w-full items-center justify-between font-serif text-3xl text-white transition-colors hover:text-gold"
                  >
                    Markets
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileMarketsOpen ? "rotate-180 text-gold" : "text-white/40"}`}
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
                        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 pl-1">
                          {URG_CITIES.map((c) => (
                            <a
                              key={c.city}
                              href={`/market/${toSlug(c.city)}`}
                              onClick={() => setIsOpen(false)}
                              className="py-1 font-sans text-sm text-white/55 transition-colors hover:text-gold"
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

              <div className="mt-auto border-t border-gold/20 pt-8">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 leading-loose">{CONTACT.licenseDisplay} · {CONTACT.brokerage}</p>
                <a href={CONTACT.whatsappUS} className="mt-6 flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy">
                  <Phone size={16} />
                  {CONTACT.phoneUS}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
