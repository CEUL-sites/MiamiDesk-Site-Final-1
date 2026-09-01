import { BadgeCheck, Building2, Languages, Star } from "lucide-react";
import { URG_PUBLIC_OFFICE_NETWORK_LABEL } from "../data/urgOffices";

const AUTHORITY = [
  { icon: BadgeCheck, title: "REALTOR® · FL SL705771", detail: "Licensed since 2001 · 25 years of South Florida transaction experience" },
  { icon: Star, title: "CLHMS Luxury Specialist", detail: "Certified Seller Representative" },
  { icon: Building2, title: "United Realty Group", detail: `3,500+ agents · ${URG_PUBLIC_OFFICE_NETWORK_LABEL}` },
  { icon: Languages, title: "Bilingual advisory", detail: "English · Spanish · Cross-border coordination" },
] as const;

export function SellerAuthorityStrip() {
  return (
    <section aria-label="Carlos Uzcategui authority and brokerage proof" className="border-y border-hairline bg-ivory">
      <div className="mx-auto grid max-w-7xl divide-y divide-hairline px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {AUTHORITY.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-start gap-3 py-5 sm:px-5 lg:py-7">
            <Icon size={17} className="mt-0.5 shrink-0 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="font-serif text-base text-navy-deep">{title}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] leading-relaxed text-navy/70">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">5.0 average from Verified Realtor.com® reviews.</p>
    </section>
  );
}
