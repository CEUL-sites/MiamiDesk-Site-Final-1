import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { HeroSellerForm } from "./HeroSellerForm";
import { pushEvent } from "../lib/analytics";
import "./hero-conversion.css";

const PRIORITIES = [
  {
    id: "proceeds", label: "Price & proceeds",
    title: "Start with what you keep.",
    detail: "We review competing homes, your positioning, and the terms that affect your proceeds.",
  },
  {
    id: "timing", label: "My next move",
    title: "Make the sale fit your life.",
    detail: "We plan around your next purchase, relocation, and preferred closing timeline—and negotiate the terms to support that plan.",
  },
  {
    id: "reach", label: "Buyer reach",
    title: "Activate the network around your home.",
    detail: "We combine MLS positioning, relevant buyer-agent outreach, and referral relationships to connect your property with potential buyers.",
  },
] as const;

export function Hero() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectPriority(index: number) {
    setSelected(index);
    pushEvent("seller_priority_selected", { priority: PRIORITIES[index].id, location: "homepage_hero" });
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % PRIORITIES.length; break;
      case "ArrowLeft": next = (index + PRIORITIES.length - 1) % PRIORITIES.length; break;
      case "Home": next = 0; break;
      case "End": next = PRIORITIES.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectPriority(next);
    tabs.current[next]?.focus();
  }


  return (
    <section className="hero-root seller-hero" aria-labelledby="seller-hero-heading">
      <div className="seller-hero-scene">
        <picture><source media="(max-width: 767px)" srcSet="/images/home-hero-mobile.webp" /><img className="seller-hero-background" src="/images/home-hero-desktop.webp" width="1400" height="788" fetchPriority="high" alt="" /></picture>
        <div className="seller-hero-layout">
          <div className="seller-hero-primary">
            <p className="seller-hero-eyebrow">Carlos Uzcategui <span aria-hidden="true">/</span> South Florida</p>
            <h1 id="seller-hero-heading" className="seller-hero-heading">
              Your next move starts <span>with a clear selling plan.</span>
            </h1>
            <p className="seller-hero-summary">
              Get Carlos’s personal guidance on pricing, preparing your home, and reaching potential buyers.
            </p>
            <p className="seller-hero-credentials">Licensed since 2001 · United Realty Group · English / Español</p>
          </div>
          <div id="list-here" className="seller-hero-action" aria-label="Request a seller consultation">
            <h2>Let’s start with your property.</h2>
            <HeroSellerForm compact progressiveDesktop consultation />
            <details className="seller-priority-disclosure"><summary id="seller-priority-heading">What matters most to you?</summary>
            <div className="seller-priority-tabs" role="tablist" aria-labelledby="seller-priority-heading">
              {PRIORITIES.map((priority, index) => (
                <button key={priority.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`seller-priority-${priority.id}`} aria-controls={`seller-panel-${priority.id}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => selectPriority(index)} onKeyDown={(event) => handleTabKey(event, index)}>
                  {priority.label}
                </button>
              ))}
            </div>
            <div className="seller-priority-content">
              {PRIORITIES.map((priority, index) => (
                <div key={priority.id} role="tabpanel" id={`seller-panel-${priority.id}`} aria-labelledby={`seller-priority-${priority.id}`} aria-hidden={selected !== index} inert={selected !== index} tabIndex={selected === index ? 0 : -1}>
                  <h3>{priority.title}</h3>
                  <p>{priority.detail}</p>
                </div>
              ))}
            </div>
            </details>
          </div>
        </div>
        <p className="seller-hero-image-caption">Conceptual residential imagery · Not a property listing</p>
      </div>
      <div className="seller-hero-foot">
        <p>International property owner or agency? <a href="/global-desk">Explore Miami Global Desk <ArrowRight size={12} aria-hidden="true" /></a></p>
        <p className="seller-hero-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution is subject to property eligibility, MLS rules and partner participation.</p>
      </div>
    </section>
  );
}
