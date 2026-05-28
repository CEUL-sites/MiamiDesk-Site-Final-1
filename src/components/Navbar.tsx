import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, NAVIGATION } from "../constants";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navText = scrolled ? "text-navy/80 hover:text-gold" : "text-white/75 hover:text-white";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/97 backdrop-blur-xl border-b border-bone/60 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="/"
          aria-label="HomesProfessional.com — Carlos Uzcategui, United Realty Group"
          className="flex flex-col leading-none gap-0.5"
        >
          <span
            className={`font-serif font-normal leading-none tracking-wide transition-colors duration-300 ${
              scrolled ? "text-navy" : "text-white"
            }`}
            style={{ fontSize: "1.15rem", letterSpacing: "0.06em" }}
          >
            United Realty Group
          </span>
          <span
            className={`font-mono uppercase leading-none transition-colors duration-300 ${
              scrolled ? "text-navy/45" : "text-white/42"
            }`}
            style={{ fontSize: "0.58rem", letterSpacing: "0.22em" }}
          >
            Carlos Uzcategui · Licensed in Florida since 2001
          </span>
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {NAVIGATION.map((item) => {
            const active = item.href === location.pathname;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                  active ? "text-gold" : navText
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href={CONTACT.phoneUSLink}
            className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] transition-colors duration-200 ${
              scrolled ? "text-navy/75 hover:text-gold" : "text-white/70 hover:text-white"
            }`}
          >
            <Phone size={12} className="text-gold" />
            {CONTACT.phoneUSDisplay}
          </a>
          <a
            href="/contact"
            className={`inline-flex items-center px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
              scrolled
                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                : "border border-gold/60 text-white hover:bg-gold hover:text-navy"
            }`}
          >
            Free Review
          </a>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
          className={`xl:hidden transition-colors ${scrolled ? "text-navy" : "text-white"}`}
        >
          <Menu size={28} />
        </button>
      </div>

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
              <div className="flex items-start justify-between">
                <div className="flex flex-col leading-none gap-1">
                  <span className="font-serif text-xl font-normal tracking-wide text-white">
                    United Realty Group
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/40">
                    Carlos Uzcategui · Licensed in Florida since 2001
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="text-white/60 hover:text-gold transition-colors mt-1"
                >
                  <X size={28} />
                </button>
              </div>

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
              </div>

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
                  Free Strategy Review
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
