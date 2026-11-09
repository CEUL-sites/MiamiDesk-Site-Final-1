import { useState } from "react";
import { BadgeCheck, Building2, Languages, MessageCircle } from "lucide-react";
import { CONTACT } from "../constants";
import { HeroSellerForm, type HeroAddressTransfer } from "./HeroSellerForm";
import { UrgLogo } from "./UrgLogo";

const PROCESS_STEPS = [
  {
    step: "01",
    label: "Comp & Market Read",
    summary: "Carlos personally reviews your property address, closed comparable sales, and active competition.",
  },
  {
    step: "02",
    label: "Private Strategy Call",
    summary: "He contacts you by phone or WhatsApp to align pricing, net proceeds, and your next-move timeline.",
  },
  {
    step: "03",
    label: "Zero Obligation",
    summary: "No automated sales sequence and no listing commitment—just a direct, data-grounded read.",
  },
] as const;

const CREDENTIAL_STATS = [
  { value: "25 Yrs", label: "Licensed in FL (2001)" },
  { value: "CLHMS", label: "Luxury Home Specialist" },
  { value: "3,500+", label: "URG Florida Agents" },
  { value: "19", label: "FL Office Locations" },
] as const;

export function HomepageConsultation({
  initialAddress = "",
  addressTransfer = null,
}: {
  initialAddress?: string;
  addressTransfer?: HeroAddressTransfer | null;
} = {}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="contact"
      data-sticky-cta-guard
      aria-labelledby="consultation-heading"
      className="border-t border-hairline bg-navy-deep py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Executive Profile & Interactive Process Strip (7 cols) */}
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

            {/* Executive Portrait & Core Credentials Card */}
            <div className="mt-7 rounded-xl border border-white/12 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={CONTACT.headshot}
                  alt="Carlos Uzcategui, Florida Licensed Realtor® SL705771"
                  className="h-24 w-24 rounded-lg object-cover border-2 border-gold/40 shadow-md shrink-0"
                  width="96"
                  height="96"
                />
                <div>
                  <h3 className="font-serif text-2xl text-white font-normal">Carlos Uzcategui</h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mt-1">
                    Florida Licensed Realtor® SL705771 · Since 2001
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-white/85">
                    <span className="inline-flex items-center gap-1 rounded bg-white/[0.06] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                      <BadgeCheck size={12} className="text-gold" /> Certified Seller Rep
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-white/[0.06] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                      <Building2 size={12} className="text-gold" /> United Realty Group
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-white/[0.06] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                      <Languages size={12} className="text-gold" /> English &amp; Español
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Visual Stat Chips instead of multi-paragraph biography */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-4">
                {CREDENTIAL_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/10 bg-[#071321]/70 px-3 py-2.5"
                  >
                    <p className="font-serif text-xl text-gold">{stat.value}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/75">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive 3-Step Next Actions Selector */}
            <div className="mt-5 rounded-xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                  What Happens After You Submit
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                  Tap step to inspect
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2" role="tablist" aria-label="Consultation steps">
                {PROCESS_STEPS.map((item, idx) => {
                  const selected = activeStep === idx;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveStep(idx)}
                      className={`rounded-lg border p-3 text-left transition-all ${
                        selected
                          ? "border-gold bg-gold text-navy-deep shadow-md"
                          : "border-white/12 bg-white/[0.03] text-white hover:border-gold/50"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
                          selected ? "text-navy-deep" : "text-gold"
                        }`}
                      >
                        Step {item.step}
                      </span>
                      <p
                        className={`mt-1 font-serif text-sm leading-snug ${
                          selected ? "text-navy-deep font-semibold" : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-lg border border-white/10 bg-[#071321] px-4 py-3">
                <p className="font-sans text-sm leading-relaxed text-white/90">
                  {PROCESS_STEPS[activeStep].summary}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <UrgLogo className="h-6 w-auto opacity-75 brightness-0 invert" />
              <p className="font-sans text-xs text-white/60">
                Weston Branch: 15951 SW 41st St, Suite 700 · Corporate HQ: 1200 S. Pine Island Rd, Suite 600, Plantation · 19 Florida Office Locations · Affiliated Closing Partners: South Florida Title Associates (sftafl.com) &amp; Certified Home Loans (certifiedhomeloans.com)
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
                addressTransfer={addressTransfer}
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
