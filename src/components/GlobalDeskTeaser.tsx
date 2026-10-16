import { ArrowUpRight } from "lucide-react";
import { StoryVideo } from "./StoryVideo";
export function GlobalDeskTeaser() {
  return <section data-global-story data-sticky-cta-guard className="visual-story bg-[#f2eee6] px-6 py-16 text-navy-deep md:py-24">
    <div className="mx-auto max-w-7xl bridge-story">
      <div className="min-w-0">
        <p className="story-eyebrow text-gold-ink">Global Desk</p>
        <h2 className="visual-section-title mt-5 font-serif">Miami Global Listing Desk — buyer-agent activation for prime property</h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed">For developers and agencies: prepare selected Spanish and international prime inventory for South Florida buyer-agent discovery through a professional brokerage framework.</p>
        <div className="bridge-route" aria-hidden="true"><span>SPAIN</span><span>SOUTH FLORIDA</span></div>
        <a href="/global-desk" className="story-cta mt-6">Enter the Global Desk <ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
      <div className="bridge-window"><StoryVideo src="/videos/miami_madrid_transition.mp4" poster="/images/posters/miami_madrid_transition.jpg" label="Miami and Madrid visual introduction" shape="portrait" note="Miami ↔ Madrid · Illustrative visual introduction"/></div>
    </div>
    <p className="mx-auto mt-10 max-w-7xl text-xs leading-relaxed">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
  </section>;
}
