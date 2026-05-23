import { CONTACT, NAVIGATION } from "../constants";

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
          <p className="mt-8 font-sans text-xs text-white/50">⊕ Equal Housing Opportunity</p>
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
            <p>Direct / WhatsApp: {CONTACT.phoneUS}</p>
            <p>Spain WhatsApp: {CONTACT.phoneSpain}</p>
            <p>{CONTACT.email}</p>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
