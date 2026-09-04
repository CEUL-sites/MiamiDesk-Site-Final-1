import { ArrowRight, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { trackContact, trackFunnelEvent } from "../lib/analytics";
import "./sellers-reach-hero.css";

/** Sellers-only opening. Keep shared homepage and lead-form behavior independent. */
export function SellersReachHero() {
  return (
    <>
      <section className="seller-reach-hero" aria-labelledby="seller-reach-title">
        <div className="seller-reach-layout">
          <div className="seller-reach-copy">
            <h1 id="seller-reach-title">
              Sell With the Reach of the World’s{" "}
              <span>Largest Local REALTOR® Association.</span>
            </h1>
            <p className="seller-reach-subtitle">
              Put your home where trusted buyer agents search for their clients. I combine professional MLS exposure with targeted agent outreach and 25 years of South Florida experience to position your property for local and international buyers.
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
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="seller-reach-whatsapp"
                onClick={() => trackContact("whatsapp", "sellers_hero")}
              >WhatsApp Carlos</a>
            </div>
            <p className="seller-reach-reassurance">Personal response · Confidential · No listing commitment</p>
          </div>
          <figure className="seller-reach-image" data-sticky-cta-guard>
            <img
              src="/images/sellers-waterfront-20260904.webp"
              alt="Illustrative property showing: an agent holding a folder guides a couple along a South Florida waterfront home's poolside terrace"
              width="1402"
              height="1122"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>South Florida · Residential seller representation</figcaption>
          </figure>
        </div>
      </section>
      <section className="seller-reach-authority" aria-label="Your advisor and professional network" data-sticky-cta-guard>
        <div className="seller-reach-authority-grid">
          <div><p>25 years</p><span>South Florida experience</span></div>
          <div><p>Buyer-agent reach</p><span>MLS visibility + targeted outreach</span></div>
          <div><p>United Realty Group</p><span>Florida brokerage network</span></div>
        </div>
        <p className="seller-reach-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
      </section>
      <div className="seller-reach-review-details">
        <p>Your review covers <strong>pricing &amp; positioning</strong>, <strong>your likely buyer</strong>, and <strong>estimated net proceeds</strong>.</p>
        <a href={LEAD_MAGNETS.sellerNetSheet.url} download onClick={() => trackFunnelEvent("net_sheet_download", { source: "sellers_hero" })}>
          <Download size={16} aria-hidden="true" /> Download the Seller’s Net Sheet 2026
        </a>
      </div>
    </>
  );
}
