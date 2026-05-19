const PORTALS = [
  "SFPropertySearch.com", "Realtor.com", "Homes.com", "Apartments.com",
  "Apartamentos.com", "Juwai", "Realopedia", "VendeTuCasa", "Zumper",
  "RPR", "ProxioConnect", "ProxioDeveloperShowcase", "TerraFly PRO",
  "iMapp", "FloridaLivingNetwork", "GlobalPropertyXchange",
  "WorldProperties.com", "InternationalMLS", "CREXi", "Brevitas",
  "MiamiMLSonline", "WikiRealty", "Homes&Land", "RentalGuide.net",
  "LakeHomesUSA.com", "OceanHomesUSA.com", "RealtyStore", "LandNetwork",
  "BackAtYouMedia", "HomeSpotter", "NewHomeSource", "PropStream",
  "RentHop", "RadPad", "USHUD.com", "+ 165 more"
];

export const ExposureSyndication = () => {
  const items = [...PORTALS, ...PORTALS];

  return (
    <section className="overflow-hidden border-y border-bone bg-ivory py-20">
      <div className="mx-auto mb-14 max-w-7xl px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy/55">Miami MLS · Global Syndication</p>
        <h2 className="mt-5 font-serif text-4xl text-navy lg:text-5xl">Your listing. Every platform. Simultaneously.</h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-navy/60">
          The Miami MLS distribution ecosystem publishes listing data through a broad global portal network once a compliant listing is activated.
        </p>
      </div>

      <div className="marquee-container border-y border-gold/15 py-8">
        <div className="marquee-track-slow gap-0">
          {items.map((portal, index) => (
            <div key={`${portal}-${index}`} className="flex items-center gap-6 px-6">
              <span className="whitespace-nowrap font-sans text-[0.95rem] font-medium text-navy/70 transition-colors hover:text-gold">{portal}</span>
              <span className="text-gold">◆</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl px-6 text-center">
        <p className="font-serif text-xl italic leading-relaxed text-navy/55">
          Every platform above receives listing data through MLS activation — not a manual reposting process.
        </p>
        <p className="font-mono mt-5 text-[9px] uppercase tracking-[0.24em] text-navy/30">Source: Miami and South Florida REALTORS® · 200+ active distribution portals</p>
      </div>
    </section>
  );
};
