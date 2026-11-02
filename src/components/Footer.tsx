import { CONTACT, NAVIGATION, PUBLIC_COMPLIANCE, isSpainMarketRoute } from "../constants";
import { useLocation } from "react-router-dom";
import { AuroraBackground } from "./AuroraBackground";

export function Footer() {
  const { pathname } = useLocation();
  const showSpainContact = pathname.replace(/\/+$/, "") === "/global-desk" || isSpainMarketRoute(pathname);

  return (
    // pb clears the fixed bottom CTAs: mobile sticky pill below lg, and desktop sticky bar at lg+
    <footer className="relative overflow-hidden bg-navy-deep text-white border-t border-gold/30 pb-24 lg:pb-16">
      <AuroraBackground variant="subtle" />

      {/* Tier 1: Static Institutional Trust Strip (Replaces animated ticker) */}
      <div className="relative z-10 border-b border-white/10 bg-black/30 px-6 py-3.5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
              25 Years Florida Licensed Real Estate Advisory
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
            MIAMI &amp; SOUTH FLORIDA REALTORS® · 93,000 ASSOCIATION MEMBERS
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            United Realty Group · 3,500+ Agents · 19 Florida Office Locations
          </div>
        </div>
      </div>

      {/* Tier 2: 4-Column Main Advisory & Directory Grid */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 md:py-16">
        
        {/* Column 1: Principal & Brokerage Governance */}
        <div>
          <img
            src="/images/urg-logo-original.webp"
            alt="United Realty Group"
            width="150"
            height="45"
            loading="lazy"
            className="mb-4 h-9 w-auto opacity-85"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <h3 className="font-serif text-2xl text-white tracking-tight">Carlos Uzcategui</h3>
          <p className="font-mono mt-1 text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
            REALTOR® · Florida License SL705771
          </p>
          <ul className="mt-3 space-y-1.5 font-sans text-xs font-light text-white/75">
            <li>Licensed in Florida Since 2001 (25 Years Experience)</li>
            <li>Certified Luxury Home Marketing Specialist (CLHMS)</li>
            <li>Certified Seller Representative</li>
            <li>United Realty Group Associate</li>
          </ul>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 110"
                width="28"
                height="30"
                aria-label="Equal Housing Opportunity"
                role="img"
                className="flex-shrink-0 opacity-70 text-white"
              >
                <path d="M50 5 L5 45 L15 45 L15 95 L85 95 L85 45 L95 45 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
                <rect x="35" y="60" width="30" height="35" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="25" y="48" width="50" height="8" fill="currentColor" opacity="0.8" />
                <text x="50" y="108" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="1">EQUAL HOUSING</text>
              </svg>
              <span className="font-sans text-xs text-white/75 font-light">Equal Housing Opportunity</span>
            </div>
            <p className="mt-2.5 font-sans text-[11px] font-light leading-relaxed text-white/60">
              United Realty Group is a proud member of Miami and South Florida REALTORS® — the largest local Realtor® association in the U.S.
            </p>
          </div>
        </div>

        {/* Column 2: Client Advisory Services */}
        <div>
          <h4 className="font-mono mb-4 text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">
            Advisory Services
          </h4>
          <div className="space-y-2.5 font-sans text-sm">
            {NAVIGATION.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white/75 transition-colors hover:text-gold"
              >
                {item.name}
              </a>
            ))}
            <a href="/market-data" className="block text-white/75 transition-colors hover:text-gold">
              Market Data &amp; MLS Freshness
            </a>
            <a href="/reviews" className="block text-white/75 transition-colors hover:text-gold">
              Client Reviews &amp; Track Record
            </a>
            <a href="/about" className="block text-white/75 transition-colors hover:text-gold">
              About Carlos Uzcategui
            </a>
          </div>
        </div>

        {/* Column 3: Direct Advisory Channels */}
        <div>
          <h4 className="font-mono mb-1 text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">
            Direct Advisory
          </h4>
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
            United Realty Group
          </p>
          <div className="space-y-3 font-sans text-sm text-white/75">
            <p>
              Direct / WhatsApp:{" "}
              <a href={CONTACT.phoneUSLink} className="text-white underline underline-offset-2 hover:text-gold">
                {CONTACT.phoneUS}
              </a>
            </p>
            {showSpainContact && (
              <p>
                Spain WhatsApp:{" "}
                <a
                  href={CONTACT.whatsappSpain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-2 hover:text-gold"
                >
                  {CONTACT.phoneSpain}
                </a>
              </p>
            )}
            <p>
              Inquiries:{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-white underline underline-offset-2 hover:text-gold">
                {CONTACT.email}
              </a>
            </p>
            <p className="text-xs leading-relaxed text-white/65">{CONTACT.address}</p>
            <p className="text-xs leading-relaxed text-white/65">
              Brokerage office:{" "}
              <a
                href={`tel:${CONTACT.officePhoneUS.replace(/[^0-9+]/g, "")}`}
                className="text-white/75 underline underline-offset-2 hover:text-gold"
              >
                {CONTACT.officePhoneUS}
              </a>
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:text-gold-soft transition-colors"
              >
                LinkedIn Professional Profile →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-gold transition-colors"
              >
                Private Consultation Request →
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Bilateral Reach & Prime Markets */}
        <div>
          <h4 className="font-mono mb-4 text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">
            Bilateral Desk &amp; Prime Markets
          </h4>
          <p className="font-sans text-xs text-white/70 leading-relaxed mb-3">
            Direct Miami MLS representation for eligible international properties, coordinated with licensed on-the-ground advisory teams in Spain.
          </p>
          <div className="space-y-2 font-sans text-sm">
            <a href="/vender-madrid" className="block text-white/75 transition-colors hover:text-gold">Vender en Madrid</a>
            <a href="/vender-marbella" className="block text-white/75 transition-colors hover:text-gold">Vender en Marbella</a>
            <a href="/vender-costa-blanca" className="block text-white/75 transition-colors hover:text-gold">Vender en Costa Blanca</a>
            <a href="/vender-ibiza" className="block text-white/75 transition-colors hover:text-gold">Vender en Ibiza</a>
            <a href="/vender-barcelona" className="block text-white/75 transition-colors hover:text-gold">Vender en Barcelona</a>
            <a href="/vender-valencia" className="block text-white/75 transition-colors hover:text-gold">Vender en Valencia</a>
            <a href="/spain-mls-listing" className="block text-gold underline underline-offset-2 transition-colors hover:text-gold-soft text-xs pt-1">
              Spain → Miami MLS Listing Framework →
            </a>
          </div>
        </div>
      </div>

      {/* Tier 3: Structured South Florida Submarket Directory (Preserves 100% SEO link equity) */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-white/5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                South Florida Seller Market Directory
              </p>
              <p className="mt-1 font-sans text-xs text-white/70">
                Seller representation across the Miami and South Florida REALTORS® footprint — Miami-Dade, Broward, Palm Beach, St. Lucie, and Martin counties.
              </p>
            </div>
            <a
              href="/markets"
              className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:text-gold-soft transition-colors whitespace-nowrap"
            >
              All Regional Market Intelligence →
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 mb-2.5 font-medium">
                Miami-Dade Coastal &amp; Urban
              </p>
              <div className="space-y-1.5 font-sans text-xs text-white/70">
                <a href="/sell-brickell" className="block hover:text-gold transition-colors">Sell in Brickell</a>
                <a href="/sell-coral-gables" className="block hover:text-gold transition-colors">Sell in Coral Gables</a>
                <a href="/sell-downtown-miami" className="block hover:text-gold transition-colors">Sell in Downtown Miami</a>
                <a href="/sell-aventura" className="block hover:text-gold transition-colors">Sell in Aventura</a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 mb-2.5 font-medium">
                Miami-Dade Communities
              </p>
              <div className="space-y-1.5 font-sans text-xs text-white/70">
                <a href="/sell-miami" className="block hover:text-gold transition-colors">Sell in Miami</a>
                <a href="/sell-doral" className="block hover:text-gold transition-colors">Sell in Doral</a>
                <a href="/sell-kendall" className="block hover:text-gold transition-colors">Sell in Kendall</a>
                <a href="/sell-north-miami" className="block hover:text-gold transition-colors">Sell in North Miami</a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 mb-2.5 font-medium">
                Broward Prime Residential
              </p>
              <div className="space-y-1.5 font-sans text-xs text-white/70">
                <a href="/sell-weston" className="block hover:text-gold transition-colors">Sell in Weston</a>
                <a href="/sell-fort-lauderdale" className="block hover:text-gold transition-colors">Sell in Fort Lauderdale</a>
                <a href="/sell-plantation" className="block hover:text-gold transition-colors">Sell in Plantation</a>
                <a href="/sell-sunrise" className="block hover:text-gold transition-colors">Sell in Sunrise</a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 mb-2.5 font-medium">
                Broward Coastal &amp; Suburban
              </p>
              <div className="space-y-1.5 font-sans text-xs text-white/70">
                <a href="/sell-pembroke-pines" className="block hover:text-gold transition-colors">Sell in Pembroke Pines</a>
                <a href="/sell-coral-springs" className="block hover:text-gold transition-colors">Sell in Coral Springs</a>
                <a href="/sell-pompano-beach" className="block hover:text-gold transition-colors">Sell in Pompano Beach</a>
                <a href="/sell-hallandale-beach" className="block hover:text-gold transition-colors">Sell in Hallandale Beach</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 4: Regulatory Disclosures, Copyright & Legal Protection */}
      <div className="relative z-10 border-t border-white/10 px-6 py-6 md:py-8">
        <div className="mx-auto max-w-7xl space-y-4 md:space-y-6">
          <div className="max-w-5xl space-y-2.5 font-sans text-[10px] font-light leading-relaxed text-white/70 md:space-y-3 md:leading-loose" data-nosnippet>
            <p className="font-semibold text-white/90">{PUBLIC_COMPLIANCE}</p>
            <p>
              Carlos Uzcategui is a REALTOR® and a Florida real estate licensee (SL705771) affiliated with United Realty Group. International and Spain-related services are provided through referral relationships, local professional partners, and applicable written agreements where available. Listing exposure, syndication, referral compensation, and platform distribution are subject to MLS rules, brokerage approval, property eligibility, and partner availability.
            </p>
            <p>
              REALTOR® is a registered collective membership mark identifying a real estate professional who is a member of the National Association of REALTORS® and subscribes to its Code of Ethics. Live MLS data is deemed reliable but not guaranteed and is subject to change without notice.
            </p>
            <p>
              Florida real estate brokerage services are provided through United Realty Group. International property opportunities may be handled through referral, marketing, cooperating broker, or advisory relationships depending on jurisdiction, property type, and applicable regulations. HomesProfessional.com does not imply licensure in any jurisdiction other than the State of Florida.
            </p>
            <p>
              Office: {CONTACT.address} · Brokerage office: {CONTACT.officePhoneUS}. Association statistics referenced on this website reflect data published by Miami and South Florida REALTORS®, with sources cited where displayed. Information on this website is for general informational purposes only and does not constitute legal, tax, financial, or investment advice.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-4 md:flex-row md:gap-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              © {new Date().getFullYear()} HomesProfessional.com — All Rights Reserved
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-white/70">
              <a href="/sell" className="transition-colors hover:text-gold">Sell in South Florida</a>
              <a href="/home-value" className="transition-colors hover:text-gold">Free Home Valuation</a>
              <a href="/buy" className="transition-colors hover:text-gold">Buy in South Florida</a>
              <a href="/global-desk" className="transition-colors hover:text-gold">Global Desk</a>
              <a href="/agents" className="transition-colors hover:text-gold">Agents &amp; Referrals</a>
              <a href="/journal" className="transition-colors hover:text-gold">Journal</a>
              <a href="/contact" className="transition-colors hover:text-gold">Contact</a>
              <a href="/privacy" className="transition-colors hover:text-gold">Privacy</a>
              <a href="/terms" className="transition-colors hover:text-gold">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
