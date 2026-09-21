import { HeroSellerForm } from "./HeroSellerForm";
import { fig } from "../data/figures";
import "./hero-conversion.css";

// Approved sources: MIAMI/RWorld merger announcement (April 2026) and
// Carlos's supplied branding materials. Membership is not guaranteed reach.
const PROOF = [
  { value: fig("yearsLicensed"), label: "Years licensed in Florida" },
  { value: fig("members"), label: "Association members" },
  { value: fig("urgAgents"), label: "United Realty Group agents" },
];

export function Hero() {
  return (
    <section className="hero-root seller-hero" aria-labelledby="seller-hero-heading">
      <div className="seller-hero-layout">
        <div className="seller-hero-primary">
          <p className="seller-hero-identity">Carlos Uzcategui <span>· United Realty Group</span></p>
          <p className="seller-hero-eyebrow">South Florida Listing Strategy <span>Florida licensed since 2001</span></p>
          <h1 id="seller-hero-heading" className="seller-hero-heading text-balance">
            Sell With 25 Years of Strategy—
            <span>Backed by the World’s Largest Local REALTOR® Association.</span>
          </h1>
          <p className="seller-hero-summary">
            Carlos personally leads your pricing, positioning, buyer-agent activation, negotiation and transaction execution. Affiliated with United Realty Group and a member of Miami and South Florida REALTORS®.
          </p>
          <div id="list-here" className="seller-hero-action">
            <HeroSellerForm compact progressiveDesktop />
          </div>
          <p className="seller-hero-credentials">CLHMS Luxury Specialist <span>· English &amp; Spanish</span></p>
        </div>
        <aside className="seller-hero-support" aria-label="Experience and professional infrastructure">
          <div className="seller-hero-image">
            <img src="/images/homepage-hero-waterfront-v2.webp" alt="" width="1672" height="941" fetchPriority="high" decoding="async" />
            <p>Personal representation.<br /><span>Professional infrastructure.</span></p>
          </div>
          <dl className="seller-hero-proof">
            {PROOF.map((proof) => (
              <div key={proof.label}>
                <dt>{proof.label}</dt>
                <dd>{proof.value}</dd>
              </div>
            ))}
          </dl>
          <p className="seller-hero-membership">Brokerage: United Realty Group.<br />Member: Miami and South Florida REALTORS®.</p>
        </aside>
      </div>
      <div className="seller-hero-foot">
        <p>International property owner or agency? <a href="/global-desk">Explore Miami Global Desk <span aria-hidden="true">→</span></a></p>
        <p className="seller-hero-compliance">Florida Licensed REALTOR® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution is subject to property eligibility, MLS rules and partner participation.</p>
      </div>
    </section>
  );
}
