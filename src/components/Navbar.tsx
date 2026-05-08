import { motion } from "motion/react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { CONTACT, NAVIGATION } from "../constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-bone shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/30 hidden sm:block">
            <img 
              src={CONTACT.headshot} 
              alt="Carlos Uzcategui" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold tracking-tight ${scrolled ? "text-navy" : "text-navy lg:text-white"}`}>
              CARLOS UZCATEGUI
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${scrolled ? "text-gold" : "text-gold"}`}>
              HomesProfessional.com
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                scrolled ? "text-navy hover:text-gold" : "text-white hover:text-gold"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a 
            href={CONTACT.whatsappUS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-semibold uppercase tracking-widest hover:bg-navy transition-all duration-300 shadow-lg shadow-gold/20"
          >
            <Phone size={14} />
            Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden ${scrolled ? "text-navy" : "text-navy lg:text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-bone p-6 lg:hidden flex flex-col gap-6 shadow-xl"
        >
          {NAVIGATION.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-navy text-lg font-medium tracking-tight border-b border-bone pb-2"
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <a 
              href={CONTACT.whatsappUS}
              className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white font-bold uppercase tracking-widest"
            >
              WhatsApp Carlos
            </a>
            <a 
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-white font-bold uppercase tracking-widest"
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
