import { CONTACT, NAVIGATION } from "../constants";
import { AuroraBackground } from "./AuroraBackground";

const ticker = "SOUTH FLORIDA · MIAMI MLS EXPOSURE · UNITED REALTY GROUP · INTERNATIONAL PROPERTY DISTRIBUTION · 25 YEARS LICENSED IN FLORIDA · MIAMI MLS INTERNATIONAL DESK · DEVELOPERS & AGENCIES · SPAIN · LATIN AMERICA · ";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white border-t-2 border-gold/30">
      <AuroraBackground variant="subtle" />
      <div className="relative z-10 marquee-container border-b border-white/5 py-4">
        <div className="marquee-track-slow">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="font-mono pr-8 text-[10px] uppercase tracking-[0.3em] text-white/20">{ticker}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/images/urg-logo-original.png"
            alt="United Realty Group"
            width="160"
            height="48"
            loading="lazy"
            className="mb-5 h-10 w-auto opacity-85"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <h3 className="font-serif text-2xl text-white">Carlos Uzcategui</h3>
          <p className="font-mono mt-2 text-[9px] uppercase tracking-[0.22em] text-gold">Florida Licensed Realtor® SL705771</p>
          <p className="mt-5 max-w-xs font-sans text-sm font-light leading-relaxed text-white/55">
            Florida listings. Miami MLS exposure. International property distribution. Led by Carlos Uzcategui — 25 years licensed in Florida.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" width="32" height="35" aria-label="Equal Housing Opportunity" role="img" className="flex-shrink-0 opacity-60">
              <path d="M50 5 L5 45 L15 45 L15 95 L85 95 L85 45 L95 45 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
              <rect x="35" y="60" width="30" height="35" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="25" y="48" width="50" height="8" fill="currentColor" opacity="0.8" />
              <text x="50" y="108" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="1">EQUAL HOUSING</text>
            </svg>
            <span className="font-sans text-xs text-white/50">Equal Housing Opportunity</span>
          </div>

          {/* MIAMI REALTORS® membership affiliation */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/30">Proud Member</p>
            <img
              src="/images/miami-realtors-logo.png"
              alt="Member of the MIAMI Association of REALTORS®"
              width="150"
              height="51"
              loading="lazy"
              className="mt-3 h-8 w-auto opacity-80"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="mt-3 max-w-xs font-sans text-[11px] font-light leading-relaxed text-white/40">
              United Realty Group is a member of the MIAMI Association of REALTORS® — the largest local REALTOR® association in the U.S.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Navigation</h4>
          <div className="space-y-3">
            {NAVIGATION.map((item) => (
              <a key={item.name} href={item.href} className="block font-sans text-sm font-medium text-white/50 transition-colors hover:text-gold">{item.name}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Contact</h4>
          <div className="space-y-4 font-sans text-sm text-white/55">
            <p>Direct / WhatsApp:{" "}
              <a href={CONTACT.phoneUSLink} className="text-white/75 underline-offset-2 hover:text-gold hover:underline">{CONTACT.phoneUS}</a>
            </p>
            <p>Spain WhatsApp:{" "}
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="text-white/75 underline-offset-2 hover:text-gold hover:underline">{CONTACT.phoneSpain}</a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="text-white/75 underline-offset-2 hover:text-gold hover:underline">{CONTACT.email}</a>
            </p>
            <p className="text-xs leading-relaxed">{CONTACT.address}</p>
            <p className="text-xs leading-relaxed">Brokerage office:{" "}
              <a href={`tel:${CONTACT.officePhoneUS.replace(/[^0-9+]/g, "")}`} className="text-white/70 underline-offset-2 hover:text-gold hover:underline">{CONTACT.officePhoneUS}</a>
            </p>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35 hover:text-gold transition-colors"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Credentials</h4>
          <ul className="space-y-4 font-sans text-xs uppercase tracking-widest text-white/55">
            <li>{CONTACT.licenseDisplay}</li>
            <li>{CONTACT.brokerage}</li>
            <li>Licensed since 2001</li>
            <li>Certified Luxury Home Marketing Specialist</li>
            <li>Certified Seller Representative</li>
            <li>Miami and South Florida REALTORS®</li>
          </ul>
        </div>
      </div>

      {/* South Florida market reach */}
      <div className="relative z-10 border-t border-white/5 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h4 className="font-mono mb-4 text-[10px] uppercase tracking-[0.28em] text-gold">
            South Florida Market Reach
          </h4>
          <p className="max-w-3xl font-sans text-xs leading-relaxed text-white/45">
            Seller representation across the Miami and South Florida REALTORS® footprint — Miami-Dade, Broward, Palm
            Beach, St. Lucie and parts of Martin counties.{" "}
            <a href="/markets" className="text-gold transition-colors hover:text-gold-soft">View market intelligence →</a>
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 px-6 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-5xl space-y-4 font-sans text-[10px] font-light leading-loose text-white/40">
            <p>
              Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Member, Miami and South Florida REALTORS® · Equal Housing Opportunity.
            </p>
            <p>
              Carlos Uzcategui is a Florida Licensed Realtor® affiliated with United Realty Group. International and Spain-related services are provided through referral relationships, local professional partners, and applicable written agreements where available. Listing exposure, syndication, referral compensation, and platform distribution are subject to MLS rules, brokerage approval, property eligibility, and partner availability.
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
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">© {new Date().getFullYear()} HomesProfessional.com — All Rights Reserved</div>
            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-widest text-white/35">
              <a href="/sell-south-florida" className="transition-colors hover:text-gold">Sell in South Florida</a>
              <a href="/sell-weston" className="transition-colors hover:text-gold">Sell in Weston</a>
              <a href="/sell-coral-gables" className="transition-colors hover:text-gold">Sell in Coral Gables</a>
              <a href="/home-value" className="transition-colors hover:text-gold">Free Home Valuation</a>
              <a href="/miami-mls-international-desk" className="transition-colors hover:text-gold">International Desk</a>
              <a href="/developers-agencies" className="transition-colors hover:text-gold">Developers</a>
              <a href="/markets" className="transition-colors hover:text-gold">Markets</a>
              <a href="/reviews" className="transition-colors hover:text-gold">Reviews</a>
              <a href="/about" className="transition-colors hover:text-gold">About Carlos</a>
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
