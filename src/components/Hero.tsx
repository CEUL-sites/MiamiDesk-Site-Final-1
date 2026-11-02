import { useState, type FormEvent, type MouseEvent } from "react";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "../constants";
import { trackMicroConversion } from "../lib/analytics";
import "./hero-conversion.css";

export function Hero() {
  const [quickAddress, setQuickAddress] = useState("");

  function startInquiry(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById("list-here");
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    target?.querySelector<HTMLInputElement>('input[name="propertyAddress"]')?.focus({ preventScroll: true });
    trackMicroConversion("hp_cta_click", { type: "seller_strategy", location: "hero_intro" });
  }

  function handleQuickAddress(event: FormEvent) {
    event.preventDefault();
    const target = document.getElementById("list-here");
    const inputEl = target?.querySelector<HTMLInputElement>('input[name="propertyAddress"]');
    if (inputEl && quickAddress.trim()) {
      inputEl.value = quickAddress.trim();
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      inputEl.dispatchEvent(new Event("change", { bubbles: true }));
    }
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    inputEl?.focus({ preventScroll: true });
    trackMicroConversion("hp_cta_click", { type: "quick_address_hero", location: "hero_quick_intake" });
  }

  return (
    <section className="hero-root seller-hero" aria-labelledby="seller-hero-heading">
      <div className="seller-hero-scene">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/home-hero-mobile.webp" />
          <img
            className="seller-hero-background"
            src="/images/home-hero-desktop.webp"
            width="1400"
            height="788"
            fetchPriority="high"
            alt=""
          />
        </picture>
        <div className="seller-hero-layout">
          {/* Left Column: Core Value Proposition */}
          <div className="seller-hero-primary">
            <p className="seller-hero-eyebrow">Carlos Uzcategui <span aria-hidden="true">/</span> South Florida</p>
            <h1 id="seller-hero-heading" className="seller-hero-heading">
              Your Property Deserves a<br />
              <span>Stronger Market Strategy.</span>
            </h1>
            <p className="seller-hero-summary">
              25 years of South Florida experience. Strategic MLS positioning, trusted buyer-agent relationships, and disciplined contract negotiation.
            </p>
            <div className="seller-hero-links">
              <a href="#list-here" className="seller-hero-primary-cta" onClick={startInquiry}>
                Request a Private Seller Strategy <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#listing-approach" className="seller-hero-whatsapp">
                Explore Our Listing Approach
              </a>
            </div>
            <p className="seller-hero-credentials">
              Florida Licensed Realtor® SL705771 · Licensed Since 2001 · CLHMS · Certified Seller Representative · United Realty Group · English / Español
            </p>
          </div>

          {/* Right Column: Architectural Showcase & Quick Address Intake */}
          <div className="seller-hero-showcase">
            <div className="overflow-hidden rounded-lg border border-gold/40 bg-[#071321]/95 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/homepage-hero-waterfront-v2.webp"
                  alt="South Florida waterfront architectural home"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="1200"
                  height="750"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-black/20" />
                <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                  South Florida Residential Advisory
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <form onSubmit={handleQuickAddress} className="space-y-3">
                  <label htmlFor="hero-quick-address" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gold font-semibold">
                    Start With Your Address
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold z-10" />
                    <input
                      id="hero-quick-address"
                      type="text"
                      value={quickAddress}
                      onChange={(e) => setQuickAddress(e.target.value)}
                      placeholder="Enter South Florida property address"
                      autoComplete="street-address"
                      className="w-full rounded bg-white/[0.08] border border-white/20 pl-10 pr-4 py-3 font-sans text-sm text-white placeholder:text-white/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded bg-gold px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
                  >
                    Start Strategy Review <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </form>
                <p className="mt-3 text-center font-sans text-[11px] text-white/60">
                  Personal review by Carlos Uzcategui · Confidential · No obligation
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="seller-hero-image-caption">Conceptual residential imagery · South Florida</p>
      </div>

      <div className="seller-hero-foot">
        <p>
          International property owner or agency?{" "}
          <a href="/global-desk">
            Explore Miami Global Desk <ArrowRight size={12} aria-hidden="true" />
          </a>
        </p>
        <p className="seller-hero-compliance">
          Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution is subject to property eligibility, MLS rules and partner participation.
        </p>
      </div>
    </section>
  );
}
