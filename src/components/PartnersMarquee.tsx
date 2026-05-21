export function PartnersMarquee() {
  const channels = [
    "Miami MLS Network",
    "South Florida REALTORS®",
    "United Realty Group",
    "93,000 Member Agents",
    "National MLS Exchanges",
    "Madrid Referral Channels",
    "LATAM Advisory Network",
    "International Referral Agreements",
    "Buyer-Agent Cooperation",
    "Cross-Border Professional Network",
  ];

  const items = [...channels, ...channels, ...channels];

  return (
    <section id="partners" className="border-y border-gold/15 bg-navy-deep py-10 md:py-14 text-white">
      <div className="mx-auto mb-8 max-w-3xl px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Professional Market Access</p>
        <h2 className="mt-5 font-serif text-3xl text-white lg:text-4xl">
          The Professional Ecosystem Your Listing Enters
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-[0.95rem] leading-relaxed text-white/50">
          When our team activates a listing, it enters a professional infrastructure — not a single platform. MLS
          positioning, 93,000-member association reach, buyer-agent cooperation channels, and international
          referral pathways work simultaneously from the moment the listing goes live.
        </p>
      </div>

      <div className="marquee-container border-y border-white/8 py-5">
        <div className="marquee-track-slow gap-0">
          {items.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-6 px-7">
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">{item}</span>
              <span className="text-gold/35 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/60">
          Miami and South Florida REALTORS® · 93,000 member agents · United Realty Group
        </p>
      </div>
    </section>
  );
}
