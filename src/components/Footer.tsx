import { CONTACT, NAVIGATION, URG_CITIES } from "../constants";

const toSlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");

const MARKETS_BY_COUNTY = [
  { label: "Miami-Dade County", cities: URG_CITIES.filter((c) => c.region === "Miami-Dade County") },
  { label: "Broward County", cities: URG_CITIES.filter((c) => c.region === "Broward County") },
  { label: "Palm Beach County", cities: URG_CITIES.filter((c) => c.region === "Palm Beach County") },
];

const ticker = "SOUTH FLORIDA · MIAMI MLS · UNITED REALTY GROUP · MADRID · INTERNATIONAL · 25 YEARS · ";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white border-t-2 border-gold/30">
      <div className="marquee-container border-b border-white/5 py-4">
        <div className="marquee-track-slow">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="font-mono pr-8 text-[10px] uppercase tracking-[0.3em] text-white/20">{ticker}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl text-white">Carlos Uzcategui</h3>
          <p className="font-mono mt-2 text-[9px] uppercase tracking-[0.22em] text-gold">Florida Licensed Realtor® SL705771</p>
          <p className="mt-5 max-w-xs font-sans text-sm font-light leading-relaxed text-white/55">
            South Florida seller strategy. Madrid advisory bridge. United Realty Group brokerage infrastructure.
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
            <p>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                Direct / WhatsApp: {CONTACT.phoneUS}
              </a>
            </p>
            <p>
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                Spain WhatsApp: {CONTACT.phoneSpain}
              </a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold transition-colors">
                {CONTACT.email}
              </a>
            </p>
            <p className="text-xs leading-relaxed">{CONTACT.address}</p>
            <p className="text-xs leading-relaxed">Brokerage office: {CONTACT.officePhoneUS}</p>
          </div>
        </div>

        <div>
          <h4 className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Credentials</h4>
          <ul className="space-y-4 font-sans text-xs uppercase tracking-widest text-white/55">
            <li>{CONTACT.licenseDisplay}</li>
            <li>{CONTACT.brokerage}</li>
            <li>Licensed since 2001</li>
            <li>Certified Seller Representative</li>
            <li>Miami and South Florida REALTORS®</li>
          </ul>
        </div>
      </div>

      {/* City market pages grid */}
      <div className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h4 className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
            South Florida Market Reports
          </h4>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {MARKETS_BY_COUNTY.map((county) => (
              <div key={county.label}>
                <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
                  {county.label}
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {county.cities.map((c) => (
                    <li key={c.city}>
                      <a
                        href={`/market/${toSlug(c.city)}`}
                        className="font-sans text-xs text-white/45 transition-colors hover:text-gold"
                      >
                        {c.city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <p className="max-w-5xl font-sans text-[10px] font-light leading-loose text-white/40">
            {CONTACT.licenseDisplay}. Associate in {CONTACT.brokerage}. Equal Housing Opportunity. REALTOR® is a registered collective membership mark that identifies a real estate professional who is a member of the National Association of REALTORS® and subscribes to its Code of Ethics. Live MLS data is deemed reliable but not guaranteed and is subject to change without notice. Association statistics referenced on this website reflect data published by Miami and South Florida REALTORS®. Information on this website is for general informational purposes only and does not constitute legal, tax, financial, or investment advice.
          </p>
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">© {new Date().getFullYear()} HomesProfessional.com — All Rights Reserved</div>
            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-widest text-white/35">
              <a href="/sell" className="transition-colors hover:text-gold">Sellers</a>
              <a href="/sell#reach" className="transition-colors hover:text-gold">Reach</a>
              <a href="/spain-desk" className="transition-colors hover:text-gold">Spain Desk</a>
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
