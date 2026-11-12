import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackFunnelEvent } from "../lib/analytics";
import { HeroVideoBackdrop } from "./heroes/HeroVideoBackdrop";
import figures from "../data/figures.json";
import "./sellers-reach-hero.css";

const STAGES = [
  {
    id: "position",
    label: "Position",
    text: "Pricing set from closed comparables and current competition, with the property's media and presentation prepared before the listing goes live.",
  },
  {
    id: "distribute",
    label: "Distribute",
    text: `The listing enters the MLS ecosystem 90,000+ South Florida agents work from daily, with syndication to ${figures.usMls.value} U.S. MLSs and ${figures.globalWebsites.value} global portals in ${figures.languages.value} languages.`,
  },
  {
    id: "activate",
    label: "Activate",
    text: "Direct outreach to the cooperating buyer agents most likely to have a match, then disciplined negotiation and contract protection through closing.",
  },
];

/** Sellers-only opening. Keep shared homepage and lead-form behavior independent. */
export function SellersReachHero() {
  const [stage, setStage] = useState(0);

  return (
    <>
      <section className="seller-reach-hero" aria-labelledby="seller-reach-title">
        <HeroVideoBackdrop name="sellers" position="center 45%" mobileCut={false} />
        <div className="seller-reach-layout">
          <div className="seller-reach-copy">
            <h1 id="seller-reach-title">
              The final price depends <span>on who sees the listing.</span>
            </h1>
            <p className="seller-reach-subtitle">
              Pricing, marketing and buyer-agent negotiation, led by a team with 25 years in South Florida.
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
            <p className="seller-reach-reassurance">Our team reviews your property, then contacts you to arrange the call. Confidential · No listing commitment</p>
          </div>
          <div className="seller-reach-panel hero-panel" data-sticky-cta-guard>
            <p className="hero-panel-kicker">How your listing is run</p>
            <div className="hero-tabs" role="tablist" aria-label="Listing approach">
              {STAGES.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`seller-stage-tab-${item.id}`}
                  aria-selected={stage === i}
                  aria-controls="seller-stage-panel"
                  tabIndex={stage === i ? 0 : -1}
                  onClick={() => {
                    setStage(i);
                    trackFunnelEvent("seller_strategy_cta", { source: `sellers_hero_stage_${item.id}` });
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                    event.preventDefault();
                    const next = (i + (event.key === "ArrowRight" ? 1 : STAGES.length - 1)) % STAGES.length;
                    setStage(next);
                    document.getElementById(`seller-stage-tab-${STAGES[next].id}`)?.focus();
                  }}
                >
                  <span className="hero-tab-num">0{i + 1} · </span>{item.label}
                </button>
              ))}
            </div>
            <p id="seller-stage-panel" role="tabpanel" aria-labelledby={`seller-stage-tab-${STAGES[stage].id}`} className="hero-tabpanel">
              {STAGES[stage].text}
            </p>
            {STAGES[stage].id === "distribute" && (
              <p className="hero-video-sources">Sources: Miami and South Florida REALTORS®; RPR National MLS data exchange. Distribution is subject to property eligibility, MLS rules and partner participation.</p>
            )}
            <p className="hero-video-sources mt-3">Conceptual AI-generated imagery · Not a property listing</p>
          </div>
        </div>
      </section>
      <section id="selling-system" className="seller-reach-authority" aria-label="Your advisor and professional network" data-sticky-cta-guard>
        <div className="seller-reach-authority-grid">
          <div><p>Position</p><span>Pricing analysis, preparation and property narrative</span></div>
          <div><p>Activate</p><span>Cooperating buyer-agent relations &amp; MLS reverse prospecting</span></div>
          <div><p>Negotiate</p><span>Contract terms, escrow defense and post-occupancy transition</span></div>
        </div>
        <p className="seller-reach-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
      </section>
      <div className="seller-reach-review-details">
        <p>Your review covers <strong>pricing &amp; positioning</strong>, <strong>cooperating buyer-agent demand</strong>, and <strong>estimated net proceeds</strong>.</p>
        <a href={LEAD_MAGNETS.sellerNetSheet.url} download onClick={() => trackFunnelEvent("net_sheet_download", { source: "sellers_hero" })}>
          <Download size={16} aria-hidden="true" /> Download the Seller's Net Sheet 2026
        </a>
      </div>
    </>
  );
}
