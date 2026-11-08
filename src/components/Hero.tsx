import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { trackMicroConversion } from "../lib/analytics";
import { loadGooglePlaces } from "../lib/googlePlaces";
import { restoreManualAddressEntry } from "./heroSellerFormModel";
import "./hero-conversion.css";

const HERO_ADDRESS_PLACEHOLDER = "Enter your South Florida property address";

export function Hero({ onAddressSubmit }: { onAddressSubmit?: (address: string) => void } = {}) {
  const [quickAddress, setQuickAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const quickAddressRef = useRef<HTMLInputElement>(null);
  const placesInitialized = useRef(false);
  const placesListener = useRef<google.maps.MapsEventListener | null>(null);

  useEffect(() => () => {
    placesListener.current?.remove();
  }, []);

  function initQuickPlaces() {
    const field = quickAddressRef.current;
    if (!field || placesInitialized.current) return;
    placesInitialized.current = true;
    loadGooglePlaces(
      () => {
        if (quickAddressRef.current !== field || !window.google?.maps?.places) return;
        try {
          const autocomplete = new window.google.maps.places.Autocomplete(field, {
            types: ["address"],
            componentRestrictions: { country: ["us"] },
            fields: ["formatted_address"],
          });
          placesListener.current = autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const resolved = (place?.formatted_address || field.value).trim();
            setQuickAddress(resolved);
            setAddressError("");
          });
        } catch {
          restoreManualAddressEntry(field, HERO_ADDRESS_PLACEHOLDER);
        }
      },
      () => requestAnimationFrame(() => restoreManualAddressEntry(quickAddressRef.current, HERO_ADDRESS_PLACEHOLDER)),
    );
  }

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
    const trimmed = quickAddress.trim();
    if (!trimmed) {
      setAddressError("Please enter your South Florida property address.");
      quickAddressRef.current?.focus();
      return;
    }
    setAddressError("");
    setQuickAddress(trimmed);
    onAddressSubmit?.(trimmed);
    const target = document.getElementById("list-here");
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    const inputEl = target?.querySelector<HTMLInputElement>('input[name="propertyAddress"]');
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
              A stronger strategy for your South Florida sale.
            </h1>
            <p className="seller-hero-summary">
              We align pricing, presentation and buyer-agent outreach around your property. Carlos leads your strategy and negotiation, with Florida experience since 2001.
            </p>
            <div className="seller-hero-links">
              <a href="#list-here" className="seller-hero-primary-cta" onClick={startInquiry}>
                Request a Private Seller Strategy <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href="#listing-approach" className="seller-hero-whatsapp">
                Explore Our Listing Approach
              </a>
              <a href="#search" className="seller-hero-whatsapp seller-hero-tertiary-link">
                <Search size={14} aria-hidden="true" /> Search Live MLS
              </a>
            </div>
            <p className="seller-hero-credentials">
              Licensed since 2001 · CLHMS · United Realty Group · English / Español
            </p>
          </div>

          {/* Right Column: Architectural Showcase & Primary Address Intake (static card, no 3D tilt during typing) */}
          <div className="seller-hero-showcase" data-sticky-cta-guard>
            <div className="seller-hero-card overflow-hidden rounded-lg border border-gold/45 bg-[#071321]/95 shadow-2xl backdrop-blur-md">
              <div className="seller-hero-showcase-media relative aspect-[16/10] w-full overflow-hidden">
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
                <span className="seller-hero-showcase-badge absolute bottom-2.5 left-3 rounded bg-black/65 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                  South Florida Residential Advisory
                </span>
              </div>
              <div className="seller-hero-intake p-5 sm:p-6">
                <form onSubmit={handleQuickAddress} noValidate className="space-y-3">
                  <label htmlFor="hero-quick-address" className="seller-hero-address-label block font-mono text-[11px] uppercase tracking-[0.14em] text-gold font-semibold">
                    Start with your property address
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold z-10" aria-hidden="true" />
                    <input
                      ref={quickAddressRef}
                      id="hero-quick-address"
                      name="heroPropertyAddress"
                      type="text"
                      value={quickAddress}
                      onFocus={initQuickPlaces}
                      onChange={(e) => {
                        setQuickAddress(e.target.value);
                        if (addressError) setAddressError("");
                      }}
                      placeholder={HERO_ADDRESS_PLACEHOLDER}
                      autoComplete="street-address"
                      aria-invalid={Boolean(addressError)}
                      aria-describedby={addressError ? "hero-quick-address-error" : "hero-quick-address-next"}
                      className="seller-hero-address-input w-full rounded bg-white/[0.08] border border-white/25 pl-10 pr-4 py-3 font-sans text-base text-white placeholder:text-white/65 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  {addressError && (
                    <p id="hero-quick-address-error" role="alert" className="seller-hero-address-error font-sans text-xs text-red-300">
                      {addressError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="seller-hero-address-submit flex w-full items-center justify-center gap-2 rounded bg-gold px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-navy-deep transition-colors hover:bg-gold-soft"
                  >
                    Continue With My Property <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </form>
                <p id="hero-quick-address-next" className="seller-hero-address-next mt-3 font-sans text-xs leading-relaxed text-white/85">
                  Next: share your contact details. Carlos reviews your property and contacts you to arrange a private strategy call.
                </p>
                <p className="seller-hero-address-reassurance mt-1.5 font-sans text-[11px] text-white/65">
                  Confidential · No obligation
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
