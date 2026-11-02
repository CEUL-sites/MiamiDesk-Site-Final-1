import { BadgeCheck, Building2, CalendarCheck, CheckCircle2, Languages, MessageCircle, ShieldCheck } from "lucide-react";
import { CONTACT } from "../constants";
import { HeroSellerForm } from "./HeroSellerForm";
import { UrgLogo } from "./UrgLogo";

export function HomepageConsultation({ initialAddress = "" }: { initialAddress?: string } = {}) {
  return (
    <section
      id="contact"
      data-sticky-cta-guard
      aria-labelledby="consultation-heading"
      className="border-t border-hairline bg-navy-deep py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Advisor Profile & Biography (7 cols) */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
              Meet Carlos · Private Consultation
            </p>
            <h2
              id="consultation-heading"
              className="mt-3 font-serif text-3xl text-white sm:text-4xl md:text-5xl tracking-tight leading-tight"
            >
              Personal Representation.<br />Institutional Infrastructure.
            </h2>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={CONTACT.headshot}
                alt="Carlos Uzcategui, Florida Licensed Realtor® SL705771"
                className="h-28 w-28 rounded-md object-cover border-2 border-gold/40 shadow-md shrink-0"
                width="112"
                height="112"
              />
              <div>
                <h3 className="font-serif text-2xl text-white font-normal">Carlos Uzcategui</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mt-1">
                  Florida Licensed Realtor® SL705771 · Since 2001
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-white/80">
                  <span className="inline-flex items-center gap-1 rounded bg-white/[0.05] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                    <BadgeCheck size={12} className="text-gold" /> CLHMS Specialist
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-white/[0.05] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                    <Building2 size={12} className="text-gold" /> United Realty Group
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-white/[0.05] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                    <Languages size={12} className="text-gold" /> English &amp; Español
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 font-sans text-sm leading-relaxed text-white/80 md:text-base">
              <p>
                With 25 years of active South Florida real estate experience across residential, luxury, and investment properties, Carlos Uzcategui leads every listing strategy personally—from pricing analysis and media preparation through buyer-agent outreach and closing negotiation.
              </p>
              <p>
                Affiliated with United Realty Group in Weston (3,500+ agents across 19 Florida office locations), Carlos pairs one-on-one advisory with statewide brokerage infrastructure and documented cross-border referral relationships in Spain and Latin America.
              </p>
            </div>

            {/* 3 Step Next Actions Box */}
            <div className="mt-8 rounded-lg border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                What Happens After You Submit
              </p>
              <ol className="mt-4 space-y-3 font-sans text-xs leading-relaxed text-white/80 sm:text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 font-mono text-[10px] font-bold text-gold">1</span>
                  <span>Carlos personally reviews your property address, recent comparable sales, and active competing listings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 font-mono text-[10px] font-bold text-gold">2</span>
                  <span>He contacts you by phone or WhatsApp to coordinate a confidential strategy conversation around your timing and proceeds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 font-mono text-[10px] font-bold text-gold">3</span>
                  <span>There is no automated sales sequence and no listing obligation.</span>
                </li>
              </ol>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <UrgLogo className="h-6 w-auto opacity-75 brightness-0 invert" />
              <p className="font-sans text-xs text-white/60">
                Weston Office: 1615 S Congress Ave · United Realty Group Florida Office Network
              </p>
            </div>
          </div>

          {/* Right Column: Stable Intake Form Anchor #list-here (5 cols) */}
          <div id="list-here" className="scroll-mt-24 lg:col-span-5">
            <div className="rounded-xl border border-gold/40 bg-[#071321] p-6 shadow-2xl shadow-black/60 sm:p-8">
              <div className="mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                  Confidential Property Intake
                </span>
                <h3 className="mt-1 font-serif text-2xl text-white font-normal">
                  Let’s Start With Your Property.
                </h3>
                <p className="mt-1.5 font-sans text-xs text-white/70 leading-relaxed">
                  Provide your address and preferred timing for a private, data-grounded strategy review.
                </p>
              </div>

              {/* Mount the hardened HeroSellerForm with Google Places, dual alerts & Net Sheet */}
              <HeroSellerForm
                compact
                progressiveDesktop
                consultation
                initialAddress={initialAddress}
                sourcePage="homepage-consultation-en"
              />

              <div className="mt-6 border-t border-white/10 pt-4 text-center">
                <p className="font-sans text-xs text-white/70">
                  Prefer direct communication?
                </p>
                <a
                  href={CONTACT.whatsappUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold hover:text-gold-soft transition-colors"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp Carlos (+1 954-865-6622) ↗
                </a>
              </div>

              <p className="mt-5 text-center font-sans text-[10px] leading-relaxed text-white/50">
                Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
