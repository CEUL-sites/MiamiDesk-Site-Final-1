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
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                Luxury Listing Strategy & Cross-Border Real Estate Advisory. 
                Florida licensed since 2001.
            </p>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-white/70">
              <p>{CONTACT.phoneUS}</p>
              <p>{CONTACT.email}</p>
              <p className="text-xs leading-relaxed">{CONTACT.address}</p>
            </div>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Markets</h4>
            <ul className="space-y-4 text-xs text-white/70 uppercase tracking-widest">
              <li>Weston / Broward</li>
              <li>Miami-Dade / Greater Miami</li>
              <li>Madrid / Spain</li>
              <li>International Referrals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold uppercase text-[10px] font-bold tracking-[0.3em] mb-6">Position</h4>
            <ul className="space-y-4 text-xs text-white/70 uppercase tracking-widest">
               <li>Certified Luxury Specialist</li>
               <li>Certified Seller Rep</li>
               <li>United Realty Group</li>
               <li>25+ Years Experience</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="text-[10px] text-white/30 leading-loose max-w-4xl italic">
                Carlos Uzcategui is affiliated with United Realty Group. Real estate services are provided subject to applicable brokerage, MLS, Fair Housing, advertising, and local real estate regulations. Information on this website is for general informational purposes only and is not legal, tax, financial, immigration, or investment advice. Equal Housing Opportunity. Verify all MLS, association, brokerage, syndication, and network statistics before final publication. 
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
                    © {new Date().getFullYear()} HomesProfessional.com — All Rights Reserved
                </div>
                <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-white/40">
                    <a href="#sellers" className="hover:text-gold transition-colors">Sellers</a>
                    <a href="#buyers" className="hover:text-gold transition-colors">Buyers</a>
                    <a href="#spain" className="hover:text-gold transition-colors">Spain Desk</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
