import { ArrowRight, Download } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackFunnelEvent } from "../lib/analytics";
import "./sellers-reach-hero.css";

/** Sellers-only opening. Keep shared homepage and lead-form behavior independent. */
export function SellersReachHero() {
  return (
    <>
      <section className="seller-reach-hero" aria-labelledby="seller-reach-title">
        <div className="seller-reach-layout">
          <div className="seller-reach-copy">
            <h1 id="seller-reach-title">
              A Better Sale Begins <span>Before Your Home Goes Live.</span>
            </h1>
            <p className="seller-reach-subtitle">
              We coordinate price positioning, buyer-agent outreach and negotiation around what you keep—and what comes next.
            </p>
            <div className="seller-reach-actions" data-sticky-cta-guard>
              <a
                href="#contact"
                className="seller-reach-primary"
                onClick={() => trackFunnelEvent("seller_strategy_cta", { source: "sellers_hero" })}
              >
                Request My Seller Strategy Review
                <ArrowRight size={21} aria-hidden="true" />
              </a>
              <a
                href="#selling-system"
                className="seller-reach-whatsapp"
                onClick={() => trackFunnelEvent("seller_strategy_cta", { source: "sellers_hero_system" })}
              >Explore the Selling System</a>
            </div>
            <p className="seller-reach-reassurance">Carlos reviews your property, then contacts you to arrange the call. Confidential · No listing commitment</p>
          </div>
          <figure className="seller-reach-image" data-sticky-cta-guard>
            <picture><source media="(max-width: 1023px)" srcSet="/images/sellers-architecture-mobile.webp" /><img
              src="/images/sellers-architecture.webp"
              alt="Conceptual South Florida waterfront architecture with a shaded residential terrace"
              width="1400"
              height="1050"
              fetchPriority="high"
              decoding="async"
            /></picture>
            <figcaption>Conceptual residential imagery · Not a property listing</figcaption>
          </figure>
        </div>
      </section>
      <section id="selling-system" className="seller-reach-authority" aria-label="Your advisor and professional network" data-sticky-cta-guard>
        <div className="seller-reach-authority-grid">
          <div><p>Position</p><span>Price, preparation and presentation</span></div>
          <div><p>Activate</p><span>Contact relevant buyer agents</span></div>
          <div><p>Negotiate</p><span>Price, terms and your next move</span></div>
        </div>
        <p className="seller-reach-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
      </section>
      <div className="seller-reach-review-details">
        <p>Your review covers <strong>pricing &amp; positioning</strong>, <strong>your likely buyer</strong>, and <strong>estimated net proceeds</strong>.</p>
        <a href={LEAD_MAGNETS.sellerNetSheet.url} download onClick={() => trackFunnelEvent("net_sheet_download", { source: "sellers_hero" })}>
          <Download size={16} aria-hidden="true" /> Download the Seller's Net Sheet 2026
        </a>
      </div>
    </>
  );
}
