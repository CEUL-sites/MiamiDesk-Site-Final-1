import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, NAVIGATION } from "../constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoTone = scrolled ? "text-navy" : "text-white";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-bone shadow-sm py-3" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex flex-col leading-none" aria-label="HomesProfessional.com home">
          <span className="font-serif text-2xl font-bold tracking-tight">
            <span className={logoTone}>CARLOS</span>
            <span className="text-gold">RE</span>
          </span>
          <span className={`font-mono mt-1 text-[9px] uppercase tracking-[0.2em] ${scrolled ? "text-navy/75" : "text-white/75"}`}>
            Carlos Uzcategui · FL SL705771
          </span>
          <span className={`font-mono mt-0.5 text-[8px] uppercase tracking-[0.16em] ${scrolled ? "text-navy/40" : "text-white/40"}`}>
            United Realty Group · HomesProfessional.com
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
        </div>

        <div className="hidden items-center gap-4 lg:flex">
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
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-3xl font-bold tracking-tight">CARLOS<span className="text-gold">RE</span></span>
                  <span className="font-mono mt-1 text-[9px] uppercase tracking-[0.22em] text-white/45">HomesProfessional.com</span>
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
              </div>

              <div className="mt-auto border-t border-gold/20 pt-8">
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
