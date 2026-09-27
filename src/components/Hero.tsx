import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HeroSellerForm } from "./HeroSellerForm";
import { fig } from "../data/figures";
import { CONTACT } from "../constants";
import { pushEvent, trackMicroConversion } from "../lib/analytics";
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
  const inquiry = useRef<HTMLDivElement>(null);

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

  function startInquiry(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    inquiry.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    inquiry.current?.querySelector<HTMLInputElement>('input[name="propertyAddress"]')?.focus({ preventScroll: true });
    trackMicroConversion("hp_cta_click", { type: "seller_strategy", location: "hero_intro" });
  }

  return (
    <section className="hero-root seller-hero" aria-labelledby="seller-hero-heading">
      <div className="seller-hero-scene">
        <img className="seller-hero-background" src="/images/homepage-hero-waterfront-v2.webp" width="1672" height="941" fetchPriority="high" alt="" />
        <div className="seller-hero-layout">
          <div className="seller-hero-primary">
            <p className="seller-hero-eyebrow">Carlos Uzcategui <span aria-hidden="true">/</span> South Florida</p>
            <h1 id="seller-hero-heading" className="seller-hero-heading">
              Your Home.<br />Our Network.
              <span>A Stronger<br />Selling Strategy.</span>
            </h1>
            <p className="seller-hero-summary">
              {fig("yearsLicensed")} years of South Florida experience. United Realty Group infrastructure. A coordinated plan for your price, buyer reach, and next move.
            </p>
            <div className="seller-hero-links">
              <a href="#list-here" className="seller-hero-primary-cta" onClick={startInquiry}>See How We’d Sell Your Home <ArrowRight size={18} aria-hidden="true" /></a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="seller-hero-whatsapp" onClick={() => trackMicroConversion("hp_cta_click", { type: "whatsapp_us", location: "hero_intro" })}>
                <MessageCircle size={19} aria-hidden="true" /> WhatsApp Carlos
              </a>
            </div>
            <p className="seller-hero-credentials">Florida licensed since 2001 · CLHMS · English &amp; Spanish</p>
          </div>
          <div id="list-here" ref={inquiry} className="seller-hero-action" aria-label="Request a private property strategy">
            <h2 id="seller-priority-heading">What matters most to you?</h2>
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
            <HeroSellerForm compact progressiveDesktop />
          </div>
        </div>
        <p className="seller-hero-image-caption">Illustrative property</p>
      </div>
      <aside className="seller-hero-support" aria-label="Experience and professional infrastructure">
        <div className="seller-hero-proof">
          <p><strong>{fig("yearsLicensed")} years</strong><span>Florida experience · Licensed since 2001</span></p>
          <p><strong>United Realty Group</strong><span>Brokerage infrastructure</span></p>
          <p><strong>Buyer-agent activation</strong><span>Professional reach, personal representation</span></p>
        </div>
      </aside>
      <div className="seller-hero-foot">
        <p>International property owner or agency? <a href="/global-desk">Explore Miami Global Desk <ArrowRight size={12} aria-hidden="true" /></a></p>
        <p className="seller-hero-compliance">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution is subject to property eligibility, MLS rules and partner participation.</p>
      </div>
    </section>
  );
}
