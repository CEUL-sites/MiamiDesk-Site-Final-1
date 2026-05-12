import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, LineChart, Globe, ChevronRight, Send, MessageCircle } from "lucide-react";
import { CONTACT } from "../constants";

const LEAD_CATEGORIES = [
  "I own a property in South Florida",
  "I am considering selling in the next 3–12 months",
  "I want a valuation and positioning review",
  "I am buying or relocating",
  "I am interested in Madrid or Spain",
  "I represent a developer, agency, or property owner in Spain",
  "I am a real estate agent or referral partner"
];

const TIMING_OPTIONS = ["Immediate", "3-6 Months", "6-12 Months", "Just Exploring"];

const BUDGET_OPTIONS = ["Under $1M", "$1M - $3M", "$3M - $10M", "$10M+"];

export const IntelligenceDesk = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    market: "",
    timing: "",
    budget: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(s => s + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // LOGIC PLACEHOLDER: 
    // Data recorded:
    console.log("Strategic Lead Captured:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="intelligence" className="py-24 bg-ivory border-y border-bone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 mb-8">
              <Bot size={14} className="text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">
                Private Seller Intelligence
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl text-navy mb-8 font-serif leading-tight">
              Private Seller <br />
              <span className="text-gold italic font-light">Intelligence Desk</span>
            </h2>
            
            <p className="text-lg text-navy/70 leading-relaxed mb-8 max-w-xl">
              Start with a private inquiry. The system helps identify your objective, timing, 
              property type, market, and next best step — then routes the conversation for 
              a more focused advisory response.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
              <div className="carlos-headshot-card !m-0 !max-w-[180px]">
                <img 
                  src={CONTACT.headshot} 
                  alt="Carlos Uzcategui, Florida Realtor since 2001" 
                  className="carlos-headshot"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy flex-shrink-0 flex items-center justify-center text-gold">
                    <LineChart size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm uppercase tracking-widest mb-1">Pricing Discipline</h3>
                    <p className="text-navy/50 text-xs text-balance">Real-time MLS data analysis for optimal positioning.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy flex-shrink-0 flex items-center justify-center text-gold">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm uppercase tracking-widest mb-1">Distribution Reach</h3>
                    <p className="text-navy/50 text-xs text-balance">Mapping syndication channels across South Florida and Spain.</p>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-gold hover:text-navy transition-colors font-bold uppercase tracking-widest text-sm"
            >
              <MessageCircle size={20} />
              Connect on WhatsApp
            </a>
          </div>

          <div className="relative">
            <div className="bg-navy p-8 lg:p-12 shadow-3xl border-b-4 border-gold min-h-[500px] flex flex-col relative z-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Query Phase {step} / 5</span>
                      {step > 1 && (
                        <button onClick={() => setStep(s => s - 1)} className="text-white/50 text-xs hover:text-gold transition-colors">
                          Back
                        </button>
                      )}
                    </div>

                    {step === 1 && (
                      <div className="flex-grow">
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-6">What best describes your interest?</h3>
                        <div className="grid gap-2">
                          {LEAD_CATEGORIES.map((cat, i) => (
                            <button
                              key={i}
                              onClick={() => { setFormData({...formData, category: cat}); nextStep(); }}
                              className="w-full text-left p-3 lg:p-4 bg-white/5 border border-white/10 hover:bg-gold hover:border-gold text-white text-[11px] lg:text-xs transition-all group uppercase tracking-widest"
                            >
                              <div className="flex items-center justify-between">
                                <span>{cat}</span>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex-grow">
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-6">Where is the property or target market?</h3>
                        <input
                          autoFocus
                          type="text"
                          placeholder="City, Neighborhood, or Region..."
                          className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none mb-8 font-light"
                          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.value && nextStep()}
                          onChange={(e) => setFormData({...formData, market: e.target.value})}
                        />
                        <button 
                          disabled={!formData.market}
                          onClick={nextStep}
                          className="w-full py-4 bg-gold text-white font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-white hover:text-navy transition-all"
                        >
                          Continue
                        </button>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="flex-grow">
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-6">What is your timing?</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {TIMING_OPTIONS.map((time, i) => (
                            <button
                              key={i}
                              onClick={() => { setFormData({...formData, timing: time}); nextStep(); }}
                              className="p-6 bg-white/5 border border-white/10 hover:bg-gold hover:border-gold text-white font-bold text-[10px] uppercase tracking-widest transition-all"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex-grow">
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-6">Price range or property type?</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {BUDGET_OPTIONS.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => setFormData({...formData, budget: opt})}
                              className={`p-4 border font-bold text-[10px] uppercase tracking-widest transition-all ${formData.budget === opt ? 'bg-gold border-gold text-white' : 'bg-white/5 border-white/10 text-white hover:border-gold'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Specific property type (e.g. Waterfront, Estate, Condo)"
                          className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none mb-8 text-sm font-light"
                          onChange={(e) => setFormData({...formData, budget: `${formData.budget} | ${e.target.value}`})}
                        />
                         <button 
                          disabled={!formData.budget}
                          onClick={nextStep}
                          className="w-full py-4 bg-gold text-white font-bold uppercase tracking-widest disabled:opacity-50"
                        >
                          Final Step
                        </button>
                      </div>
                    )}

                    {step === 5 && (
                      <form onSubmit={handleSubmit} className="flex-grow">
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-6">Routing: How should we reach you?</h3>
                        <div className="space-y-4 mb-8">
                          <input
                            required
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm font-light"
                          />
                          <input
                            required
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm font-light"
                            onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          />
                          <input
                            required
                            type="tel"
                            placeholder="Phone Number (WhatsApp Preferred)"
                            className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm font-light"
                          />
                        </div>
                        <button 
                          disabled={isSubmitting}
                          className="w-full py-4 bg-gold text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition-all"
                        >
                          {isSubmitting ? "Routing..." : "Start Private Inquiry"}
                          <Send size={16} />
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-grow flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-gold/20">
                      <Send size={32} />
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-4 italic">Inquiry Routed</h3>
                    <p className="text-white/50 mb-8 max-w-sm leading-relaxed text-sm">
                      Carlos has received your intelligence request. A private advisor response 
                      is being prepared based on your specific positioning objectives.
                    </p>
                    <button 
                      onClick={() => { setStep(1); setIsSuccess(false); }}
                      className="text-gold border-b border-gold font-bold uppercase tracking-widest text-[10px] pb-1 hover:text-white hover:border-white transition-all"
                    >
                      Return to Desk
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Secure Routing Engine Active</span>
              </div>
            </div>

            {/* Decorative background elements behind the card */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

