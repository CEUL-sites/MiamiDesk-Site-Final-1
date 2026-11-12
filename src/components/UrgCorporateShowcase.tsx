import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Film,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CONTACT } from "../constants";
import {
  URG_FLORIDA_OFFICE_COUNT,
  URG_FLORIDA_OFFICE_NAMES,
} from "../data/urgOffices";

export type UrgShowcaseVariant = "sellers" | "buyers" | "markets" | "about";

type BranchRegion = "Broward" | "Palm Beach" | "Miami-Dade" | "Central FL" | "National";

interface OfficialBranchCard {
  id: string;
  name: string;
  region: BranchRegion;
  state: "FL" | "TX" | "NC";
  address: string;
  phone: string;
  image: string;
  url: string;
  badge?: string;
}

const ALL_OFFICIAL_BRANCHES: readonly OfficialBranchCard[] = [
  {
    id: "corporate-plantation",
    name: "Corporate Office (Plantation)",
    region: "Broward",
    state: "FL",
    address: "1200 S. Pine Island Road, Suite 600, Plantation, FL 33324",
    phone: "(954) 450-2000",
    image: "/images/urg-corporate-hq-aerial.jpg",
    url: "https://www.urgfl.com/office/plantation/",
    badge: "Corporate HQ",
  },
  {
    id: "weston",
    name: "Weston",
    region: "Broward",
    state: "FL",
    address: "15951 SW 41st Street, Suite 700, Weston, FL 33331",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/WESTON-1.png",
    url: "https://www.urgfl.com/office/weston/",
    badge: "Carlos Primary Desk",
  },
  {
    id: "aventura",
    name: "Aventura",
    region: "Miami-Dade",
    state: "FL",
    address: "20803 Biscayne Blvd, Suite 410, Aventura, FL 33180",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/DSC06006-scaled.jpg",
    url: "https://www.urgfl.com/office/aventura/",
  },
  {
    id: "boca-raton",
    name: "Boca Raton",
    region: "Palm Beach",
    state: "FL",
    address: "5550 Glades Road, Suite 101, Boca Raton, FL 33431",
    phone: "(561) 826-9333",
    image: "/images/urg-branches/Boca-Raton-1.jpg",
    url: "https://www.urgfl.com/office/boca-raton/",
  },
  {
    id: "boynton-beach",
    name: "Boynton Beach",
    region: "Palm Beach",
    state: "FL",
    address: "8188 S. Jog Road, Suite 100, Boynton Beach, FL 33472",
    phone: "(561) 826-9333",
    image: "/images/urg-branches/IMG_3511-scaled.jpg",
    url: "https://www.urgfl.com/office/boynton-beach/",
  },
  {
    id: "cooper-city",
    name: "Cooper City",
    region: "Broward",
    state: "FL",
    address: "12399 SW 53rd Street, Suite 101, Cooper City, FL 33330",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/Cooper-City-2.png",
    url: "https://www.urgfl.com/office/cooper-city/",
  },
  {
    id: "coral-springs",
    name: "Coral Springs",
    region: "Broward",
    state: "FL",
    address: "3351 N. University Drive, Coral Springs, FL 33065",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/Coral-Springs.jpg",
    url: "https://www.urgfl.com/office/coral-springs/",
  },
  {
    id: "delray-beach",
    name: "Delray Beach",
    region: "Palm Beach",
    state: "FL",
    address: "3100 S. Federal Hwy, Suite 100, Delray Beach, FL 33483",
    phone: "(954) 600-0844",
    image: "/images/urg-branches/delray-beach.jpg",
    url: "https://www.urgfl.com/office/delray-beach/",
  },
  {
    id: "fort-lauderdale",
    name: "Fort Lauderdale",
    region: "Broward",
    state: "FL",
    address: "2691 E. Oakland Park Blvd, Suite 102, Fort Lauderdale, FL 33306",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/East-Fort-Lauderdale.jpg",
    url: "https://www.urgfl.com/office/east-fort-lauderdale/",
  },
  {
    id: "hialeah",
    name: "Hialeah",
    region: "Miami-Dade",
    state: "FL",
    address: "18600 NW 87th Ave, Suite 108, Hialeah, FL 33015",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/18600-NW-87th-Ave-Miami-FL-Primary-Photo-1-LargeHighDefinition.jpeg",
    url: "https://www.urgfl.com/office/hialeah-gardens/",
  },
  {
    id: "kendall",
    name: "Kendall",
    region: "Miami-Dade",
    state: "FL",
    address: "12060 SW 129th Court, Suite 203, Kendall, FL 33186",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/Kendall.jpg",
    url: "https://www.urgfl.com/office/kendall/",
  },
  {
    id: "lighthouse-point",
    name: "Lighthouse Point",
    region: "Broward",
    state: "FL",
    address: "2020 E. Sample Road, Lighthouse Point, FL 33064",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/LHP3.jpg",
    url: "https://www.urgfl.com/office/lighthouse-point/",
  },
  {
    id: "orlando",
    name: "Orlando",
    region: "Central FL",
    state: "FL",
    address: "12231 E. Colonial Drive, Suite 140, Orlando, FL 32826",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/Orlando-Office-4.jpg",
    url: "https://www.urgfl.com/office/orlando/",
  },
  {
    id: "palm-beach-gardens",
    name: "Palm Beach Gardens",
    region: "Palm Beach",
    state: "FL",
    address: "4880 Donald Ross Road, Suite 125, Palm Beach Gardens, FL 33418",
    phone: "(954) 812-0223",
    image: "/images/urg-branches/Palm-BEach.jpg",
    url: "https://www.urgfl.com/office/palm-beach-gardens/",
  },
  {
    id: "pembroke-pines",
    name: "Pembroke Pines",
    region: "Broward",
    state: "FL",
    address: "16618 Sheridan Street, Pembroke Pines, FL 33028",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/ppines.jpg",
    url: "https://www.urgfl.com/office/pembroke-pines/",
    badge: "Opening Soon",
  },
  {
    id: "plantation-nob-hill",
    name: "Plantation (Nob Hill)",
    region: "Broward",
    state: "FL",
    address: "975 N. Nob Hill Road, Plantation, FL 33324",
    phone: "(954) 562-3330",
    image: "/images/urg-branches/nob-hill.jpg",
    url: "https://www.urgfl.com/office/nob-hill/",
  },
  {
    id: "royal-palm-beach",
    name: "Royal Palm Beach",
    region: "Palm Beach",
    state: "FL",
    address: "9200 Belvedere Road, Suite 207, Royal Palm Beach, FL 33411",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/royal-palm-beach.jpg",
    url: "https://www.urgfl.com/office/royal-palm-beach/",
  },
  {
    id: "tamarac",
    name: "Tamarac",
    region: "Broward",
    state: "FL",
    address: "7300 W. McNab Road, Suite 119, Tamarac, FL 33321",
    phone: "(954) 450-2000",
    image: "/images/urg-branches/Tamarac.jpg",
    url: "https://www.urgfl.com/office/tamarac/",
  },
  {
    id: "wellington",
    name: "Wellington",
    region: "Palm Beach",
    state: "FL",
    address: "1035 S. State Road 7, Suite 121, Wellington, FL 33414",
    phone: "(954) 812-0223",
    image: "/images/urg-branches/Wellington.jpg",
    url: "https://www.urgfl.com/office/wellington/",
  },
  {
    id: "san-antonio",
    name: "San Antonio, Texas",
    region: "National",
    state: "TX",
    address: "1150 North Loop 1604 West, Suite 122, San Antonio, TX 78248",
    phone: "(210) 273-1986",
    image: "/images/urg-branches/IMG_1579-scaled.jpg",
    url: "https://www.urgfl.com/office/san-antonio-texas/",
    badge: "Out-of-State Branch",
  },
  {
    id: "greensboro",
    name: "Greensboro, North Carolina",
    region: "National",
    state: "NC",
    address: "620 Green Valley Road, Suite 304, Greensboro, NC 27408",
    phone: "(336) 255-0517",
    image: "/images/urg-branches/edit-5.webp",
    url: "https://www.urgfl.com/office/guilford-county/",
    badge: "Out-of-State Branch",
  },
] as const;

const VARIANT_COPY: Record<
  UrgShowcaseVariant,
  {
    eyebrow: string;
    heading: string;
    subheading: string;
    chlRole: string;
    sftaRole: string;
  }
> = {
  sellers: {
    eyebrow: "United Realty Group · Institutional Brokerage & Closing Ecosystem",
    heading: "Personal Representation Backed by Plantation HQ, 19 Florida Office Locations & Affiliated Closing Partners",
    subheading:
      "Every listing is led by Carlos Uzcategui and our team from the Weston branch, drawing on United Realty Group's Plantation Corporate Headquarters, 3,500+ Florida agents, and affiliated mortgage and title settlement providers.",
    chlRole:
      "Pre-qualifies prospective buyers across Conventional, Jumbo, FHA, and VA loan programs so seller mandates evaluate verified purchasing power before signing a contract.",
    sftaRole:
      "Prepares itemized seller net sheets, verifies municipal liens and HOA estoppels early, and coordinates statewide Florida title insurance and cybersecurity-protected escrow settlement.",
  },
  buyers: {
    eyebrow: "United Realty Group · Acquisition, Lending & Title Infrastructure",
    heading: "From Pre-Qualification to Title Settlement Under One Coordinated Roof",
    subheading:
      "Carlos Uzcategui pairs 25 years of South Florida buyer negotiation with United Realty Group's 19 Florida office locations and affiliated mortgage origination and statewide title settlement teams.",
    chlRole:
      "Licensed Mortgage Loan Originators structure Conventional, Jumbo, FHA, and VA pre-approvals across Miami-Dade, Broward, and Palm Beach so your offer competes with institutional certainty.",
    sftaRole:
      "Conducts comprehensive Florida title searches, municipal lien and survey reviews, and wire-protected escrow closings from Plantation, Davie, and Pembroke Pines across the entire state.",
  },
  markets: {
    eyebrow: "United Realty Group · Corporate Headquarters & Regional Footprint",
    heading: "Statewide Brokerage Scale Anchored in Plantation HQ & Weston",
    subheading:
      "Inspect United Realty Group's Corporate Headquarters at 1200 S. Pine Island Road in Plantation, the Weston advisory branch, our 19 Florida office locations, and our affiliated lending and title settlement partners.",
    chlRole:
      "Provides submarket-specific financing structures across Miami-Dade, Broward, and Palm Beach—from coastal high-rise condos with reserve scrutiny to single-family jumbo acquisitions.",
    sftaRole:
      "Statewide Florida real estate settlement and escrow provider serving REALTORS®, buyers, sellers, builders, and lenders with detailed title examination and closing governance.",
  },
  about: {
    eyebrow: "United Realty Group · Corporate Headquarters & Affiliated Services",
    heading: "The Institutional Platform Behind Carlos Uzcategui's Advisory Practice",
    subheading:
      "Headquartered at 1200 S. Pine Island Road, Suite 600 in Plantation with 3,500+ agents across 19 Florida office locations, United Realty Group integrates brokerage scale with affiliated mortgage and title execution.",
    chlRole:
      "Affiliated mortgage origination partner delivering customized pre-qualification and loan structuring from initial consultation through final underwriting approval.",
    sftaRole:
      "Affiliated statewide Florida title and escrow settlement partner providing title insurance, net sheet modeling, and closing coordination.",
  },
};

export function UrgCorporateShowcase({
  variant = "markets",
}: {
  variant?: UrgShowcaseVariant;
}) {
  const [activeTab, setActiveTab] = useState<"video" | "hq" | "weston" | "branches">("video");
  const [branchFilter, setBranchFilter] = useState<"all-fl" | "Broward" | "Palm Beach" | "Miami-Dade" | "other">("all-fl");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const copy = VARIANT_COPY[variant];

/** Filter-pill counts come from the directory itself so they can never drift from it. */
function countBranches(predicate: (branch: OfficialBranchCard) => boolean): number {
  return ALL_OFFICIAL_BRANCHES.filter(predicate).length;
}

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  return (
    <section
      aria-label="United Realty Group Corporate Infrastructure and Affiliated Partners"
      className="border-t border-white/10 bg-[#071324] py-16 text-white md:py-22"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/12 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 border border-gold/35 bg-white/[0.04] px-3.5 py-1.5">
              <Building2 size={14} className="text-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                {copy.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
              {copy.heading}
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:text-base">
              {copy.subheading}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <img
              src="/images/urg-logo-original.webp"
              alt="United Realty Group"
              width={2176}
              height={723}
              loading="lazy"
              className="h-auto w-44 object-contain brightness-0 invert md:w-52"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
              HQ: 1200 S. Pine Island Rd, Suite 600 · Plantation, FL 33324
            </p>
          </div>
        </div>

        {/* Interactive 4-Tab Media Selector */}
        <div
          role="tablist"
          aria-label="United Realty Group facilities and branch explorer"
          className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4"
        >
          {[
            {
              id: "video" as const,
              code: "01",
              label: "Plantation HQ Film",
              sub: "Aerial & Suite 600 Tour",
              icon: Film,
            },
            {
              id: "hq" as const,
              code: "02",
              label: "Corporate HQ Campus",
              sub: "1200 S. Pine Island Rd",
              icon: Building2,
            },
            {
              id: "weston" as const,
              code: "03",
              label: "Weston Advisory Desk",
              sub: "15951 SW 41st St #700",
              icon: MapPin,
            },
            {
              id: "branches" as const,
              code: "04",
              label: `${URG_FLORIDA_OFFICE_COUNT} FL Office Locations`,
              sub: "All Official URG Branches",
              icon: ShieldCheck,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  selected
                    ? "border-gold bg-gold text-navy-deep shadow-lg"
                    : "border-white/15 bg-white/[0.04] text-white hover:border-gold/55"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                      selected ? "text-navy-deep" : "text-gold"
                    }`}
                  >
                    {tab.code} · {tab.label}
                  </span>
                  <Icon size={15} className={selected ? "text-navy-deep" : "text-gold"} />
                </div>
                <span
                  className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] ${
                    selected ? "text-navy-deep/80" : "text-white/65"
                  }`}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Media Stage */}
        <div className="mt-5 overflow-hidden rounded-xl border border-gold/30 bg-[#040B16] shadow-2xl">
          {/* TAB 1: Corporate HQ Video Walkthrough */}
          <div hidden={activeTab !== "video"} className="grid lg:grid-cols-12">
            <div className="relative aspect-video w-full bg-black lg:col-span-8 lg:aspect-auto lg:min-h-[400px]">
              <video
                ref={videoRef}
                src="/videos/urg_corporate_hq.mp4"
                poster="/images/urg-corporate-hq-aerial.jpg"
                controls
                playsInline
                autoPlay
                muted={isMuted}
                loop
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute corporate office video" : "Mute corporate office video"}
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded border border-gold/50 bg-navy-deep/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-navy-deep"
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                {isMuted ? "Unmute Audio" : "Audio On"}
              </button>
            </div>

            <div className="flex flex-col justify-between p-6 lg:col-span-4 lg:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  Corporate Headquarters · Plantation, FL
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug text-white">
                  Inside United Realty Group Headquarters at 1200 S. Pine Island Road
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                  From the waterfront corporate campus in Plantation (Suite 600) to the Weston advisory desk, United Realty Group supports every mandate with full-time broker governance, compliance review, and 3,500+ Florida agents.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/12 pt-4">
                  {[
                    "Corporate HQ: 1200 S. Pine Island Rd, Suite 600, Plantation, FL 33324",
                    "Weston Desk: 15951 SW 41st St, Suite 700, Weston, FL 33331",
                    `3,500+ licensed agents across ${URG_FLORIDA_OFFICE_COUNT} Florida office locations`,
                    "Direct broker support, escrow compliance, and affiliated title & lending",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-white/85">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-4">
                <a
                  href="https://www.urgfl.com/office-locations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:text-white"
                >
                  Official URG Office Directory <ArrowUpRight size={13} />
                </a>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                  (954) 450-2000 · HQ
                </span>
              </div>
            </div>
          </div>

          {/* TAB 2: Corporate HQ Campus Aerial & Architectural Elevation */}
          <div hidden={activeTab !== "hq"} className="grid gap-6 p-6 lg:grid-cols-12 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              <figure className="overflow-hidden rounded-lg border border-white/15 bg-navy-deep">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/urg-corporate-hq-aerial.jpg"
                    alt="Aerial view of United Realty Group Corporate Headquarters at 1200 S. Pine Island Road, Plantation, Florida"
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    Waterfront Corporate Campus · Plantation
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-white/75">
                    1200 S. Pine Island Road, Suite 600, Plantation, FL 33324
                  </p>
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-lg border border-white/15 bg-navy-deep">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/urg-hq.jpg"
                    alt="Front architectural entrance of 1200 S. Pine Island Road Corporate Headquarters in Plantation, Florida"
                    width={1920}
                    height={1080}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    1200 Building Main Entrance · Suite 600
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-white/75">
                    Central Broward executive headquarters &amp; closing conference center
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-col justify-center lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Central Broward Hub
              </p>
              <h3 className="mt-2 font-serif text-2xl text-white">
                Institutional Governance From Plantation HQ
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                Situated on Pine Island Road in the heart of Broward County, United Realty Group&apos;s Corporate Headquarters houses executive leadership, transaction compliance, and direct coordination across all {URG_FLORIDA_OFFICE_COUNT} Florida office locations.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/12 pt-4">
                <div>
                  <p className="font-serif text-2xl text-gold">{CONTACT.stats.urgAgents}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                    Licensed FL Agents
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-gold">{URG_FLORIDA_OFFICE_COUNT}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                    FL Office Locations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 3: Weston Advisory Branch */}
          <div hidden={activeTab !== "weston"} className="grid gap-6 p-6 lg:grid-cols-12 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              <figure className="overflow-hidden rounded-lg border border-white/15 bg-navy-deep">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/urg-weston-office.webp"
                    alt="United Realty Group Weston office reception and client consultation lounge"
                    width={1920}
                    height={2560}
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_42%]"
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    Weston Office Reception &amp; Lounge
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-white/75">
                    Private seller &amp; buyer strategy consultations with Carlos Uzcategui
                  </p>
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-lg border border-white/15 bg-navy-deep">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/urg-branches/WESTON-1.png"
                    alt="United Realty Group Weston branch building exterior at 15951 SW 41st Street, Weston, Florida"
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    Weston Branch Exterior · Suite 700
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-white/75">
                    15951 SW 41st Street, Suite 700, Weston, FL 33331
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-col justify-center lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Primary Advisory Desk · Weston, FL
              </p>
              <h3 className="mt-2 font-serif text-2xl text-white">
                Direct Principal Access in West Broward
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                Carlos Uzcategui conducts private seller valuation reviews, buyer underwriting briefings, and international co-listing consultations from the Weston branch at 15951 SW 41st Street, Suite 700.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                Direct &amp; WhatsApp: {CONTACT.phoneUS}
              </p>
            </div>
          </div>

          {/* TAB 4: All 19 Florida Office Locations + 2 Out-of-State Branches */}
          <div hidden={activeTab !== "branches"} className="p-6 lg:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  Official Branch Directory · {URG_FLORIDA_OFFICE_COUNT} Florida Office Locations
                </p>
                <h3 className="mt-1 font-serif text-2xl text-white">
                  Explore Every Official United Realty Group Office Location
                </h3>
              </div>

              {/* Region Filter Pills */}
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter URG office locations by county">
                {[
                  { id: "all-fl" as const, label: `All ${URG_FLORIDA_OFFICE_COUNT} FL Locations` },
                  { id: "Broward" as const, label: `Broward (${countBranches((b) => b.region === "Broward")})` },
                  { id: "Palm Beach" as const, label: `Palm Beach (${countBranches((b) => b.region === "Palm Beach")})` },
                  { id: "Miami-Dade" as const, label: `Miami-Dade (${countBranches((b) => b.region === "Miami-Dade")})` },
                  { id: "other" as const, label: `Orlando & Out-of-State (${countBranches((b) => b.region === "Central FL" || b.region === "National")})` },
                ].map((f) => {
                  const active = branchFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setBranchFilter(f.id)}
                      className={`rounded-md px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-all ${
                        active
                          ? "bg-gold text-navy-deep font-bold"
                          : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-gold/50 hover:text-white"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_OFFICIAL_BRANCHES.map((branch) => {
                const visible =
                  branchFilter === "all-fl"
                    ? branch.state === "FL"
                    : branchFilter === "other"
                    ? branch.region === "Central FL" || branch.region === "National"
                    : branch.region === branchFilter;

                return (
                  <a
                    key={branch.id}
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    hidden={!visible}
                    className="group flex flex-col justify-between overflow-hidden rounded-lg border border-white/12 bg-white/[0.03] transition-all hover:border-gold/60 hover:bg-white/[0.06]"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-navy-deep">
                        <img
                          src={branch.image}
                          alt={`United Realty Group ${branch.name} office building`}
                          width={454}
                          height={342}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {branch.badge && (
                          <span className="absolute left-2.5 top-2.5 rounded border border-gold/50 bg-navy-deep/90 px-2.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
                            {branch.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-serif text-base text-white group-hover:text-gold transition-colors">
                            {branch.name}
                          </span>
                          <span className="rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                            {branch.region}
                          </span>
                        </div>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/75">
                          {branch.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                      <span className="inline-flex items-center gap-1">
                        <Phone size={10} className="text-gold" /> {branch.phone}
                      </span>
                      <span className="inline-flex items-center gap-1 text-gold group-hover:text-white">
                        Branch Page <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-sans text-xs leading-relaxed text-white/75">
                <strong className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {URG_FLORIDA_OFFICE_COUNT} Florida Office Locations:{" "}
                </strong>
                {URG_FLORIDA_OFFICE_NAMES.join(" · ")}.
              </p>
              <a
                href="https://www.urgfl.com/office-locations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:text-white"
              >
                URGFL.com/office-locations <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Affiliated Transaction & Settlement Service Providers: Certified Home Loans & South Florida Title Associates */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Partner 1: South Florida Title Associates (sftafl.com) */}
          <div className="flex flex-col justify-between rounded-xl border border-gold/30 bg-white/[0.04] p-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 items-center rounded-lg bg-white px-3.5 py-1.5 shadow-sm">
                    <img
                      src="/images/urg-partners/sfta-logo.png"
                      alt="South Florida Title Associates"
                      width={180}
                      height={60}
                      loading="lazy"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                      Affiliated Title &amp; Escrow Partner
                    </span>
                    <h3 className="font-serif text-xl text-white">
                      South Florida Title Associates
                    </h3>
                  </div>
                </div>
                <FileCheck2 size={20} className="text-gold shrink-0" />
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-white/80">
                {copy.sftaRole}
              </p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Statewide Florida title search & insurance",
                  "Itemized seller & buyer net sheet tools",
                  "Municipal lien, survey & HOA estoppel review",
                  "Cybersecurity wire-verification protocols",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-white/85">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Plantation · Davie · Pembroke Pines · Statewide FL
              </span>
              <a
                href="https://sftafl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-gold/45 bg-gold/10 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Visit SFTAFL.com <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Partner 2: Certified Home Loans (certifiedhomeloans.com) */}
          <div className="flex flex-col justify-between rounded-xl border border-gold/30 bg-white/[0.04] p-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 items-center rounded-lg bg-white px-3.5 py-2 shadow-sm">
                    <img
                      src="/images/urg-partners/certified-home-loans-logo.png"
                      alt="Certified Home Loans"
                      width={200}
                      height={50}
                      loading="lazy"
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                      Affiliated Mortgage &amp; Lending Partner
                    </span>
                    <h3 className="font-serif text-xl text-white">
                      Certified Home Loans
                    </h3>
                  </div>
                </div>
                <Landmark size={20} className="text-gold shrink-0" />
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-white/80">
                {copy.chlRole}
              </p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Conventional, Jumbo, FHA & VA loan programs",
                  "Upfront buyer purchasing-power underwriting",
                  "Condo milestone & reserve lending navigation",
                  "Miami-Dade, Broward & Palm Beach originators",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-white/85">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Pre-Qualification · Underwriting · Closing Execution
              </span>
              <a
                href="https://certifiedhomeloans.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-gold/45 bg-gold/10 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Visit CertifiedHomeLoans.com <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
