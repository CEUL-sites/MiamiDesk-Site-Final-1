// Restrained credential strip — immediately below the hero.
// All marks are real and owned; no fabricated endorsements.
// REALTOR® and EHO marks rendered to standard — desaturated,
// full-opacity on hover. Scrollable on mobile with no crowding.

// Equal Housing Opportunity icon — standard house+equal symbol.
function EHOIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M10 2 L1 9 H3 V17 H8 V12 H12 V17 H17 V9 H19 Z" />
      <rect x="6" y="13.5" width="8" height="1.2" />
      <rect x="6" y="15.5" width="8" height="1.2" />
    </svg>
  );
}

const MARKS = [
  {
    key: "stars",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-0.5" aria-label="5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
              <path d="M5 0 L6.18 3.64 H10 L6.9 5.9 L8.09 9.51 L5 7.28 L1.91 9.51 L3.1 5.9 L0 3.64 H3.82 Z" />
            </svg>
          ))}
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[0.2em]">5.0 · Realtor.com Verified</span>
      </div>
    ),
  },
  {
    key: "miami-realtors",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <img
          src="/images/miami-realtors-logo.png"
          alt="Miami and South Florida REALTORS®"
          className="h-6 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
          loading="lazy"
          width="100"
          height="24"
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.16em]">Miami &amp; South Florida REALTORS®</span>
      </div>
    ),
  },
  {
    key: "urg",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <img
          src="/images/urg-logo-original.webp"
          alt="United Realty Group"
          className="h-6 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
          loading="lazy"
          width="100"
          height="24"
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.16em]">#1 Florida · Most Closed Homes</span>
      </div>
    ),
  },
  {
    key: "clhms",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[13px] font-bold uppercase tracking-[0.06em]">CLHMS</span>
        <span className="font-mono text-[7px] uppercase tracking-[0.16em]">Certified Luxury Specialist</span>
      </div>
    ),
  },
  {
    key: "seller-rep",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">Cert. Seller Rep</span>
        <span className="font-mono text-[7px] uppercase tracking-[0.16em]">Licensed Since 2001 · FL SL705771</span>
      </div>
    ),
  },
  {
    key: "eho",
    node: (
      <div className="flex flex-col items-center gap-1.5">
        <EHOIcon className="h-5 w-5" />
        <span className="font-mono text-[7px] uppercase tracking-[0.16em]">Equal Housing Opportunity</span>
      </div>
    ),
  },
];

export function CredentialBar() {
  return (
    <div className="border-b border-white/[0.07] bg-[#06101E]">
      <div className="mx-auto max-w-6xl px-6 py-5">
        {/* Horizontal scroll on mobile; justify-between on desktop */}
        <div className="flex items-center gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MARKS.map((mark, i) => (
            <div key={mark.key} className="flex flex-shrink-0 items-center">
              <div className="px-5 text-white/40 transition-colors duration-300 hover:text-white/75 first:pl-0">
                {mark.node}
              </div>
              {i < MARKS.length - 1 && (
                <span
                  className="h-8 w-px flex-shrink-0 bg-white/[0.09]"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
