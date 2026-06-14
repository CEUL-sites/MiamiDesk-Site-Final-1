import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT } from "../constants";
import { trackContact } from "../lib/analytics";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UrgLogo } from "./UrgLogo";

type NavItem = { name: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { name: "Sellers",     href: "/sell-south-florida" },
  { name: "Home Value",  href: "/home-value" },
  { name: "Buyers",      href: "/buy" },
  { name: "Markets",     href: "/markets" },
  { name: "Agents",      href: "/agents" },
  { name: "Global Desk", href: "/global-desk" },
  { name: "Journal",     href: "/journal" },
  { name: "Contact",     href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const onLight  = scrolled;
  const navText  = onLight ? "text-navy/75 hover:text-gold" : "text-white/70 hover:text-white";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/97 backdrop-blur-xl border-b border-bone/60 shadow-sm py-3"
          : "bg-gradient-to-b from-navy-deep/70 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">

        {/* ── Logo ──────────────────────────────────────────── */}
        <a
          href="/"
          aria-label="HomesProfessional.com — Carlos Uzcategui, Florida REALTOR®"
          className={`flex shrink-0 items-center gap-3 transition-colors duration-300 ${scrolled ? "text-navy" : "text-white"}`}
        >
          <UrgLogo className="h-8 w-auto sm:h-9" />
          <span className="hidden flex-col leading-none border-l border-current/20 pl-3 xl:flex">
            <span className="font-serif text-[0.88rem] leading-none tracking-wide">Carlos Uzcategui</span>
            <span className="font-mono uppercase leading-none opacity-50 mt-1" style={{ fontSize: "0.5rem", letterSpacing: "0.2em" }}>
              Florida REALTOR® since 2001
            </span>
          </span>
        </a>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 whitespace-nowrap ${
                  active ? "text-gold" : navText
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* ── Desktop right actions ─────────────────────────── */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher onLight={scrolled} />

          <a
            href={CONTACT.phoneUSLink}
            onClick={() => trackContact("phone", "navbar")}
            className={`hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] transition-colors duration-200 2xl:flex ${
              scrolled ? "text-navy/70 hover:text-gold" : "text-white/65 hover:text-white"
            }`}
          >
            <Phone size={11} className="text-gold" />
            {CONTACT.phoneUSDisplay}
          </a>

          <a
            href="/#list-here"
            className={`inline-flex items-center whitespace-nowrap px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-all duration-300 ${
              scrolled
                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                : "border border-gold/60 text-white hover:bg-gold hover:text-navy"
            }`}
          >
            Sell My Home
          </a>
        </div>

        {/* ── Hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
          className={`xl:hidden transition-colors ${scrolled ? "text-navy" : "text-white"}`}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────── */}
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
                  <UrgLogo className="h-9 w-auto" />
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
                  <X size={26} />
                </button>
              </div>

              {/* Nav links */}
              <div className="mt-10 flex flex-col gap-0.5">
                {NAV_ITEMS.map((item, index) => {
                  const active = location.pathname === item.href;
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

              {/* Drawer footer */}
              <div className="mt-auto space-y-4 border-t border-gold/20 pt-8">
                <LanguageSwitcher />
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 leading-loose">
                  United Realty Group · FL SL705771 · Equal Housing Opportunity
                </p>
                <a
                  href={CONTACT.phoneUSLink}
                  onClick={() => trackContact("phone", "navbar_mobile")}
                  className="flex w-full items-center justify-center gap-2.5 border border-white/20 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone size={14} className="text-gold" />
                  {CONTACT.phoneUSDisplay}
                </a>
                <a
                  href="/#list-here"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center bg-gold px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-navy font-semibold"
                >
                  Sell My Home
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
