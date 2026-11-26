import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, isSpanishLangRoute } from "../constants";
import { trackContact, trackMicroConversion } from "../lib/analytics";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UrgLogo } from "./UrgLogo";

type NavItem = { name: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { name: "Sellers",     href: "/sell" },
  { name: "Home Value",  href: "/home-value" },
  { name: "Buyers",      href: "/buy" },
  { name: "Markets",     href: "/markets" },
  { name: "Agents",      href: "/agents" },
  { name: "Global Desk", href: "/global-desk" },
  { name: "Journal",     href: "/journal" },
  { name: "Contact",     href: "/contact" },
];

// Spanish chrome for /es routes. Links go to the Spanish page where one exists.
const NAV_ITEMS_ES: NavItem[] = [
  { name: "Vender",      href: "/es/vender" },
  { name: "Valoración",  href: "/home-value" },
  { name: "Comprar",     href: "/es/comprar" },
  { name: "Mercados",    href: "/markets" },
  { name: "Agentes",     href: "/es/agentes" },
  { name: "Global Desk", href: "/global-desk" },
  { name: "Journal",     href: "/journal" },
  { name: "Contacto",    href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const isGilmarSpain = currentPath === "/gilmar-spain";
  const hasInlineLanguageSelector = currentPath === "/global-desk" || isGilmarSpain;
  const hideNavbarLogo = isGilmarSpain && !pastHero;
  const es = isSpanishLangRoute(currentPath);
  const navItems = es ? NAV_ITEMS_ES : NAV_ITEMS;
  const sellLabel = es ? "Vender mi casa" : "Sell My Home";
  const sellHref = es ? "/es#list-here" : "/#list-here";

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 80);
      setPastHero(window.scrollY > 420);
    };
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const onLight  = scrolled;
  const navText  = onLight ? "text-navy/75 hover:text-gold" : "text-white/70 hover:text-white";

  return (
    <>
      {/* Skip link — first Tab stop on every page (WCAG 2.4.1 Bypass Blocks).
          Href targets #main-content; the onClick also falls back to the first
          <main> on the page for pages that haven't added the id yet. */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          const main = document.querySelector("main");
          if (main) {
            main.setAttribute("tabindex", "-1");
            (main as HTMLElement).focus();
            main.scrollIntoView();
          }
        }}
        className="skip-link"
      >
        {es ? "Saltar al contenido" : "Skip to content"}
      </a>
      <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        onLight
          ? "bg-white/97 backdrop-blur-xl border-b border-bone/60 shadow-sm py-3"
          : "bg-gradient-to-b from-navy-deep/70 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-8">

        {/* ── Logo ──────────────────────────────────────────── */}
        {/* No aria-label: the accessible name composes from the visible
            content (UrgLogo's own label + the visible spans), so it always
            matches what's on screen at every breakpoint. */}
        <a
          href="/"
          aria-hidden={hideNavbarLogo ? true : undefined}
          tabIndex={hideNavbarLogo ? -1 : undefined}
          className={`flex shrink-0 items-center gap-3 transition-all duration-300 ${
            onLight ? "text-navy" : "text-white"
          } ${hideNavbarLogo ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <UrgLogo className="h-8 w-auto sm:h-9" inverted={!onLight} />
          <span className="hidden flex-col leading-none border-l border-current/20 pl-3 xl:flex">
            <span className="font-serif text-[0.88rem] leading-none tracking-wide">Carlos Uzcategui</span>
            <span className="font-mono uppercase leading-none opacity-80 mt-1" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              <span className="min-[1680px]:hidden">FL SL705771</span>
              <span className="hidden min-[1680px]:inline">REALTOR® · FL SL705771 · Since 2001</span>
            </span>
          </span>
        </a>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = currentPath === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-1.5 py-2.5 font-mono text-xs uppercase tracking-[0.06em] 2xl:px-2 2xl:tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${
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
          {hasInlineLanguageSelector ? null : <LanguageSwitcher onLight={onLight} />}

          <a
            href={CONTACT.phoneUSLink}
            onClick={() => {
              trackContact("phone", "navbar");
              trackMicroConversion("hp_cta_click", { type: "phone_call", location: "navbar" });
            }}
            className={`hidden items-center gap-1.5 font-mono text-xs tracking-[0.12em] transition-colors duration-200 min-[1680px]:flex ${
              onLight ? "text-navy/70 hover:text-gold" : "text-white/65 hover:text-white"
            }`}
          >
            <Phone size={11} className="text-gold" />
            {CONTACT.phoneUSDisplay}
          </a>

          <a
            href={sellHref}
            className={`inline-flex min-h-[44px] items-center whitespace-nowrap px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
              onLight
                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                : "border border-gold/60 text-white hover:bg-gold hover:text-navy"
            }`}
          >
            {sellLabel}
          </a>
        </div>

        {/* ── Hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          aria-label={es ? "Abrir menú de navegación" : "Open navigation menu"}
          onClick={() => setIsOpen(true)}
          className={`-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors xl:hidden ${onLight ? "text-navy" : "text-white"}`}
        >
          <Menu size={24} />
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
                  <UrgLogo className="h-9 w-auto" inverted />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/70">
                    Carlos Uzcategui, REALTOR® · FL SL705771 · Since 2001
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={es ? "Cerrar menú de navegación" : "Close navigation menu"}
                  className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-white/60 transition-colors hover:text-gold"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Primary actions first, so they are visible without scrolling the menu */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={CONTACT.phoneUSLink}
                  onClick={() => {
                    trackContact("phone", "navbar_mobile");
                    trackMicroConversion("hp_cta_click", { type: "phone_call", location: "navbar_mobile" });
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-white/20 px-3 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone size={14} className="text-gold" />
                  {CONTACT.phoneUSDisplay}
                </a>
                <a
                  href={sellHref}
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center bg-gold px-3 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-navy font-semibold"
                >
                  {sellLabel}
                </a>
              </div>

              {/* Nav links */}
              <div className="mt-6 flex flex-col gap-0.5">
                {navItems.map((item, index) => {
                  const active = currentPath === item.href;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`border-b border-white/8 py-3 font-serif text-2xl transition-colors hover:text-gold ${
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
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/70 leading-loose">
                  United Realty Group · FL SL705771 · Equal Housing Opportunity
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
}
