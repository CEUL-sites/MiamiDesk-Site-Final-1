import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT, NAVIGATION } from "../constants";
import { URGLogo } from "./URGLogo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-bone shadow-sm py-3" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo — URG mark, color-adaptive */}
        <a href="/" aria-label="United Realty Group — HomesProfessional.com">
          <URGLogo
            variant={scrolled ? "color" : "white"}
            className="h-8 w-auto max-w-[130px] transition-opacity duration-300"
          />
        </a>

        <div className="hidden items-center gap-7 xl:flex">
          {NAVIGATION.map((item) => (
            <a key={item.name} href={item.href} className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${scrolled ? "text-navy/75 hover:text-gold" : "text-white/75 hover:text-gold"}`}>
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Madrid {CONTACT.phoneSpain}
          </a>
          <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 border px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${scrolled ? "border-gold text-navy hover:bg-gold hover:text-white" : "border-gold/60 text-white hover:bg-gold hover:text-navy"}`}>
            <Phone size={14} />
            WhatsApp
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
                <URGLogo variant="white" className="h-9 w-auto max-w-[140px]" />
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation menu" className="text-gold">
                  <X size={32} />
                </button>
              </div>

              <div className="mt-14 flex flex-col gap-5">
                {NAVIGATION.map((item, index) => (
                  <motion.a key={item.name} href={item.href} onClick={() => setIsOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="border-b border-white/10 pb-4 font-serif text-3xl text-white transition-colors hover:text-gold">
                    {item.name}
                  </motion.a>
                ))}
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
