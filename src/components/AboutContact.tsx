import { Phone, Mail, Linkedin, MapPin, BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

export function AboutContact() {
  return (
    <section id="about" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col">
            <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
              <div className="carlos-headshot-card flex-shrink-0">
                <img 
                  src={CONTACT.headshot} 
                  alt="Carlos Uzcategui, Florida Licensed Realtor" 
                  className="carlos-headshot"
                  loading="lazy"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl lg:text-5xl text-navy mb-8 font-serif leading-tight">
                  Senior Real Estate Advisory, <br />
                  <span className="text-gold italic font-light">Built on South Florida market experience</span>
                </h2>
                <p className="text-lg text-navy/70 leading-relaxed max-w-xl mb-12">
                  Carlos Uzcategui has been licensed in Florida real estate since 2001, advising clients through changing markets, pricing cycles, relocation decisions, and complex negotiations.
                  <br /><br />
                  As a United Realty Group associate, his work focuses on seller positioning, professional exposure, and cross-border real estate opportunities between South Florida, Madrid, and international markets.
                </p>

                <div className="space-y-4 mb-16">
                  {[
                    CONTACT.licenseDisplay,
                    "Licensed since 2001",
                    "Certified Luxury Home Marketing Specialist",
                    "Certified Seller Representative",
                    CONTACT.brokerage,
                    "South Florida plus Madrid advisory bridge",
                    "Bilingual English / Spanish"
                  ].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gold/10 flex items-center justify-center rounded-full border border-gold/20">
                        <BadgeCheck size={12} className="text-gold" />
                      </div>
                      <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-navy/80">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <a href="#contact" className="inline-block px-8 py-5 bg-navy text-white font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300 shadow-xl shadow-navy/10">
                    Request a Private Property Strategy Call
                  </a>
                </div>
              </div>
            </div>

            <div id="contact" className="mt-20 pt-12 border-t border-bone">
              <div className="grid sm:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-navy mb-8">Verified Identity</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center text-gold">
                        <BadgeCheck size={20} />
                      </div>
                      <div>
                        <div className="text-navy font-bold text-lg leading-tight">Carlos Uzcategui</div>
                        <div className="text-navy/50 text-[10px] uppercase tracking-widest font-bold mt-1">{CONTACT.licenseDisplay}</div>
                        <div className="text-navy/50 text-[10px] uppercase tracking-widest font-bold mt-1">{CONTACT.brokerage}</div>
                      </div>
                    </div>

                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1">Email</div>
                        <div className="text-navy font-medium">{CONTACT.email}</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1">Office</div>
                        <div className="text-navy font-medium text-sm">{CONTACT.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-navy mb-8">Direct Contact</h3>
                  <div className="space-y-6">
                    <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1">Main WhatsApp / Direct</div>
                        <div className="text-navy font-medium">{CONTACT.phoneUS}</div>
                      </div>
                    </a>

                    <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1">Spain WhatsApp</div>
                        <div className="text-navy font-medium">{CONTACT.phoneSpain}</div>
                      </div>
                    </a>

                    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white border border-bone flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                        <Linkedin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-navy/40 tracking-widest mb-1">Connect</div>
                        <div className="text-navy font-medium italic underline underline-offset-4 decoration-gold/30">LinkedIn Profile</div>
                      </div>
                    </a>
                  </div>
                </div>
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
