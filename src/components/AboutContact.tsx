import { motion } from "motion/react";
import { Phone, Mail, Linkedin, MapPin, BadgeCheck, Globe2, Award } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

export function AboutContact() {
  return (
    <section id="about" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col">
            <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 h-64 flex-shrink-0 transition-all duration-700 border-l-4 border-gold p-1 bg-white shadow-xl">
                <img 
                  src={CONTACT.headshot} 
                  alt="Carlos Uzcategui" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl lg:text-6xl text-navy mb-8">Meet Carlos Uzcategui</h2>
                <p className="text-lg text-navy/70 leading-relaxed max-w-xl">
                  Carlos Uzcategui is a bilingual real estate professional licensed in Florida since 2001, 
                  with over 25 years of experience advising sellers, buyers, and investors across 
                  the South Florida landscape.
                  <br /><br />
                  Affiliated with United Realty Group and active between South Florida and Madrid, 
                  Carlos helps clients position real estate opportunities with local market history, 
                  professional distribution strategy, and a cross-border perspective.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone border border-bone mt-auto">
              {[
                { icon: BadgeCheck, text: "Licensed Since 2001" },
                { icon: Award, text: "CLHMS Luxury Specialist" },
                { icon: Globe2, text: "South Florida + Madrid" },
                { icon: Award, text: "United Realty Group" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-6 bg-ivory">
                  <item.icon size={20} className="text-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-navy">{item.text}</span>
                </div>
              ))}
            </div>

            <div id="contact" className="mt-16 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-navy italic">Contact Strategy</h3>
              
              <div className="flex flex-col gap-4">
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1 leading-none">Email</div>
                    <div className="text-navy font-medium">{CONTACT.email}</div>
                  </div>
                </a>

                <a href={CONTACT.whatsappUS} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1 leading-none">U.S. WhatsApp</div>
                    <div className="text-navy font-medium">{CONTACT.phoneUS}</div>
                  </div>
                </a>

                <a href={CONTACT.whatsappSpain} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                        <Phone size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1 leading-none">Spain WhatsApp</div>
                        <div className="text-navy font-medium">{CONTACT.phoneSpain}</div>
                    </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white border border-bone flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1 leading-none">Office</div>
                    <div className="text-navy font-medium text-sm">{CONTACT.address}</div>
                  </div>
                </div>

                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1 leading-none">Professional Profile</div>
                    <div className="text-navy font-medium italic underline underline-offset-4 decoration-gold/30">Connect on LinkedIn</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
             <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
