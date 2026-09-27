import { HeroSellerForm } from "./HeroSellerForm";
import { fig } from "../data/figures";
import "./hero-conversion.css";

export function Hero() {
  return (
    <section className="hero-root seller-hero" aria-labelledby="seller-hero-heading">
      <div className="seller-hero-layout">
        <div className="seller-hero-primary">
          <p className="seller-hero-eyebrow">Carlos Uzcategui <span aria-hidden="true">/</span> South Florida</p>
          <h1 id="seller-hero-heading" className="seller-hero-heading">
            Your Home.
            <span>Strategically<br />Positioned.</span>
          </h1>
          <p className="seller-hero-value">Experienced representation.<br />Professional reach.</p>
          <p className="seller-hero-summary">
            We connect your property with buyer-agent networks and lead every stage—from pricing and positioning to negotiation and closing.
          </p>
          <p className="seller-hero-credentials">Florida licensed since 2001 · CLHMS<br />United Realty Group · English &amp; Spanish</p>
        </div>
        <div id="list-here" className="seller-hero-action" aria-label="Request a private property strategy">
          <div className="seller-hero-card-intro">
            <p className="seller-hero-card-eyebrow">Your next move starts here</p>
            <h2>Let’s talk about<br />your property.</h2>
            <p>A private conversation about pricing, positioning and your timeline.</p>
          </div>
          <HeroSellerForm compact progressiveDesktop />
        </div>
      </div>
      <aside className="seller-hero-support" aria-label="Experience and professional infrastructure">
        <div className="seller-hero-proof">
          <p><strong>{fig("yearsLicensed")} years</strong><span>Florida experience</span></p>
          <p><strong>United Realty Group</strong><span>Brokerage infrastructure</span></p>
          <p className="seller-hero-distribution">Professional distribution through MLS exposure, buyer-agent outreach and referral relationships.</p>
        </div>
      </aside>
      <div className="seller-hero-foot">
        <p>International property owner or agency? <a href="/global-desk">Explore Miami Global Desk <span aria-hidden="true">→</span></a></p>
        <p className="seller-hero-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution is subject to property eligibility, MLS rules and partner participation.</p>
      </div>
    </section>
  );
}
