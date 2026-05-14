import { CONTACT } from "../constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-full lg:col-span-1">
            <span className="text-xl font-serif font-bold tracking-tight block">
              CARLOS UZCATEGUI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold mb-6 block">
              HomesProfessional.com
            </span>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              South Florida seller strategy, United Realty Group brokerage infrastructure, and a Miami plus Madrid exposure platform.
            </p>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-white/70">
              <p>Direct / WhatsApp: {CONTACT.phoneUS}</p>
              <p>Spain WhatsApp: {CONTACT.phoneSpain}</p>
              <p>{CONTACT.email}</p>
              <p className="text-xs leading-relaxed">{CONTACT.address}</p>
              <p className="text-xs leading-relaxed">Brokerage office: {CONTACT.officePhoneUS}</p>
            </div>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Focus</h4>
            <ul className="space-y-4 text-xs text-white/70 uppercase tracking-widest">
              <li>South Florida Sellers</li>
              <li>Miami MLS Ecosystem</li>
              <li>Madrid / Spain Bridge</li>
              <li>International Referrals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Credentials</h4>
            <ul className="space-y-4 text-xs text-white/70 uppercase tracking-widest">
               <li>{CONTACT.licenseDisplay}</li>
               <li>{CONTACT.brokerage}</li>
               <li>Licensed since 2001</li>
               <li>Certified Seller Representative</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="text-[10px] text-white/35 leading-loose max-w-5xl">
              {CONTACT.licenseDisplay}. Associate in {CONTACT.brokerage}. Equal Housing Opportunity. REALTOR® is a registered collective membership mark that identifies a real estate professional who is a member of the National Association of REALTORS® and subscribes to its Code of Ethics. This website currently provides seller advisory and exposure information only. Live IDX search and Bridge MLS data are not connected yet. Any future listing data, MLS display, syndication, association, brokerage, ranking, or portal statements must be verified against current compliance materials before publication. Information on this website is for general informational purposes only and is not legal, tax, financial, immigration, or investment advice.
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-white/25 uppercase tracking-[0.4em] font-medium">
                    © {new Date().getFullYear()} HomesProfessional.com — All Rights Reserved
                </div>
                <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-white/40">
                    <a href="#sellers" className="hover:text-gold transition-colors">Sellers</a>
                    <a href="#intelligence" className="hover:text-gold transition-colors">AI Desk</a>
                    <a href="#spain" className="hover:text-gold transition-colors">Spain Desk</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
