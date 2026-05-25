import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MobileStickyCTA } from "../../components/MobileStickyCTA";
import { CITY_CONFIGS } from "../../config/cityMarkets";
import { useCityMarket, type FeaturedListing } from "../../hooks/useCityMarket";
import { formatPrice, formatPsf, formatNumber } from "../../lib/format";

// ── Skeleton shimmer ────────────────────────────────────────────────────────
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-white/10 ${className}`}
      aria-hidden="true"
    />
  );
}

// ── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  loading,
}: {
  label: string;
  value: string | null;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 border border-gold/25 bg-navy/60 p-6 backdrop-blur-sm">
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/70">{label}</p>
      {loading ? (
        <Shimmer className="h-9 w-24" />
      ) : (
        <p className="font-serif text-3xl font-semibold text-white md:text-4xl">
          {value ?? "—"}
        </p>
      )}
    </div>
  );
}

// ── Listing card ────────────────────────────────────────────────────────────
interface ListingCardProps {
  key?: string;
  listing: FeaturedListing;
  cityName: string;
}

function ListingCard({ listing, cityName }: ListingCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden border border-bone bg-white">
      {/* Photo */}
      <div className="relative h-52 overflow-hidden bg-navy/10">
        {listing.MediaURL ? (
          <img
            src={listing.MediaURL}
            alt={`${listing.UnparsedAddress}, ${listing.City}`}
            loading="lazy"
            width="400"
            height="208"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy/5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/25">
              Photo unavailable
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-navy">
          {listing.PropertyType || "Residential"}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-gold">
            {listing.City || cityName} · Miami MLS
          </p>
          <p className="font-serif mt-2 text-2xl font-semibold leading-tight text-navy">
            {formatPrice(listing.ListPrice)}
          </p>
        </div>

        <p className="font-sans text-sm leading-snug text-navy/70">
          {listing.UnparsedAddress}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-bone pt-4">
          {listing.BedroomsTotal != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/55">
              {listing.BedroomsTotal} bd
            </span>
          )}
          {listing.BathroomsTotalInteger != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/55">
              {listing.BathroomsTotalInteger} ba
            </span>
          )}
          {listing.LivingArea != null && listing.LivingArea > 0 && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/55">
              {formatNumber(listing.LivingArea)} sqft
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function OffMarketCard({ cityName }: { key?: string; cityName: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-gold/25 bg-navy p-10 text-center">
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/70">
        Off-Market Inventory
      </p>
      <p className="font-serif text-xl text-white">
        Contact us for off-market inventory in {cityName}
      </p>
      <a
        href="https://wa.me/19548656622"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-gold/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy"
      >
        WhatsApp +1 954-865-6622
      </a>
    </div>
  );
}

function ListingCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-bone bg-white">
      <Shimmer className="h-52 w-full rounded-none" />
      <div className="flex flex-col gap-4 p-6">
        <Shimmer className="h-4 w-24" />
        <Shimmer className="h-8 w-40" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-3/4" />
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function CityMarketPage() {
  const { city: citySlug = "" } = useParams<{ city: string }>();
  const config = CITY_CONFIGS[citySlug];
  const { data, loading } = useCityMarket(config);

  const cityName = config?.name ?? citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const canonicalUrl = `https://homesprofessional.com/market/${citySlug}`;

  const localListingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": `${cityName} Real Estate — Active Market Listings`,
    "url": canonicalUrl,
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "addressRegion": "FL",
      "addressCountry": "US",
    },
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Carlos Uzcategui",
      "telephone": "+19548656622",
      "url": "https://homesprofessional.com",
    },
  };

  const metaTitle = config?.metaTitle ?? `${cityName} Real Estate Market | Homes for Sale | Carlos Uzcategui Realtor®`;
  const metaDesc = config?.metaDescription ?? `Live ${cityName} real estate market data from the Miami and South Florida REALTORS® MLS. Updated daily. Carlos Uzcategui, Florida Realtor® SL705771, United Realty Group.`;

  // Pad featured listings to 3 for layout consistency
  const listings = data.featuredListings;
  const placeholderCount = Math.max(0, 3 - listings.length);

  const lastUpdatedDisplay = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : null;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localListingSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ── A. HERO BAND ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep pt-24 pb-16 text-white md:pb-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                South Florida Market Intelligence · {cityName}
              </p>
              <h1
                className="mt-5 font-serif leading-[1.08] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                {cityName} Real Estate Market
              </h1>
              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
                Live market data sourced from the Miami and South Florida REALTORS® MLS.
                Updated continuously.
              </p>
            </motion.div>

            {/* Stat cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Active Listings"
                value={data.activeListings != null ? formatNumber(data.activeListings) : null}
                loading={loading}
              />
              <StatCard
                label="Median List Price"
                value={data.medianListPrice != null ? formatPrice(data.medianListPrice) : null}
                loading={loading}
              />
              <StatCard
                label="Avg. Days on Market"
                value={data.avgDaysOnMarket != null ? String(data.avgDaysOnMarket) : null}
                loading={loading}
              />
              <StatCard
                label="Avg. Price / Sqft"
                value={data.avgPricePerSqft != null ? formatPsf(data.avgPricePerSqft) : null}
                loading={loading}
              />
            </div>

            {/* Timestamp */}
            {!loading && lastUpdatedDisplay && (
              <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                Data as of {lastUpdatedDisplay}
              </p>
            )}
          </div>
        </section>

        {/* ── B. FEATURED LISTINGS ──────────────────────────────────────── */}
        <section className="bg-bone-warm py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Currently Listed · {cityName} · Miami MLS
              </p>
              <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
                Active listings in {cityName}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {loading ? (
                <>
                  <ListingCardSkeleton />
                  <ListingCardSkeleton />
                  <ListingCardSkeleton />
                </>
              ) : (
                <>
                  {listings.map((listing) => (
                    <ListingCard key={listing.ListingKey} listing={listing} cityName={cityName} />
                  ))}
                  {Array.from({ length: placeholderCount }).map((_, i) => (
                    <OffMarketCard key={`placeholder-${i}`} cityName={cityName} />
                  ))}
                </>
              )}
            </div>

            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/35">
              Listings provided by the Miami and South Florida REALTORS® MLS. Not all listings may be displayed.{" "}
              <a href="/contact" className="underline hover:text-gold transition-colors">
                Contact us for full access.
              </a>
            </p>
          </div>
        </section>

        {/* ── C. MARKET CONTEXT ─────────────────────────────────────────── */}
        <section className="bg-bone-warm py-16 md:py-24" style={{ backgroundColor: "#F7F4EE" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 font-serif text-3xl text-navy md:text-4xl">
              Selling in {cityName}?{" "}
              <em className="not-italic text-gold">Here is what the market is telling you.</em>
            </h2>

            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                {config?.marketContent ? (
                  config.marketContent.map((para, i) => (
                    <p key={i} className="font-sans text-base leading-[1.9] text-navy/70 mb-5 last:mb-0">{para}</p>
                  ))
                ) : (
                  <p className="font-sans text-base leading-[1.9] text-navy/70">
                    {config?.marketParagraph ??
                      `${cityName} is an active South Florida real estate market with consistent buyer demand across residential and condominium inventory. Our team has represented sellers across ${cityName} and the broader South Florida corridor since 2001 — 25 years of direct transaction experience in this market.`}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div className="border border-gold/30 p-6">
                  <p className="font-serif text-2xl text-gold">25 Years</p>
                  <p className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-navy/55">
                    of South Florida Transactions
                  </p>
                </div>
                <div className="border border-gold/30 p-6">
                  <p className="font-serif text-2xl text-gold">93,000</p>
                  <p className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-navy/55">
                    REALTORS® Access at Listing
                  </p>
                </div>

                <a
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-between gap-3 bg-gold px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
                >
                  <span>Request a market analysis for your {cityName} property</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── D. DISTRIBUTION PROOF ─────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12 font-serif text-3xl md:text-4xl"
            >
              When you list in {cityName} with Carlos,{" "}
              <em className="not-italic italic text-gold">your property reaches:</em>
            </motion.h2>

            <div className="grid gap-0 border border-gold/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "200+", label: "Global Websites" },
                { value: "19", label: "Languages" },
                { value: "385", label: "U.S. MLSs via RPR" },
                { value: "$69B", label: "2025 Volume" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`flex flex-col gap-3 p-8 ${i < 3 ? "border-b border-gold/15 lg:border-b-0 lg:border-r" : ""}`}
                >
                  <p className="font-serif text-4xl text-gold">{item.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-3xl font-sans text-base leading-relaxed text-white/50">
              Every listing enters the Miami and South Florida REALTORS® distribution
              infrastructure — the largest local Realtor association in the world at
              93,000 members. This is the structural reason sellers in {cityName} achieve
              a higher final price.
            </p>
          </div>
        </section>

        {/* ── E. CTA BAND ───────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#B08D57" }}>
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-serif text-3xl text-navy md:text-4xl">
              Ready to list your {cityName} property?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-navy/75">
              Carlos Uzcategui has represented sellers in {cityName} and across South Florida
              for 25 years. A strategy conversation costs nothing. A mispriced listing
              costs everything.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
              >
                Schedule a consultation
              </a>
              <a
                href="https://wa.me/19548656622"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-navy/40 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-navy/10"
              >
                WhatsApp +1 954-865-6622
              </a>
            </div>
          </div>
        </section>

        {/* ── F. IDX FOOTER ─────────────────────────────────────────────── */}
        <section className="border-t border-bone bg-ivory px-6 py-8">
          <p className="mx-auto max-w-5xl font-mono text-[8px] leading-relaxed text-navy/35 uppercase tracking-[0.12em]">
            Listing information provided in part by the Internet Data Exchange Program of the
            Miami and South Florida REALTORS®. Information deemed reliable but not guaranteed.
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.
            {lastUpdatedDisplay ? ` Last updated: ${lastUpdatedDisplay}.` : ""}
          </p>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
