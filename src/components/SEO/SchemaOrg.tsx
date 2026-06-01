import { Helmet } from "react-helmet-async";
import { ASSOCIATION_STATS, CONTACT } from "../../constants";

type JsonLdSchema = Record<string, unknown> & {
  "@id"?: string;
  name: string;
};

const SITE_URL = "https://homesprofessional.com";

const sitewideSchema: JsonLdSchema[] = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "HomesProfessional.com",
    url: SITE_URL,
    inLanguage: ["en-US", "es"],
    description:
      "South Florida real estate strategy, Miami MLS listing exposure, and bilingual advisory by Carlos Uzcategui with United Realty Group.",
    publisher: { "@id": `${SITE_URL}/#agent` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/markets?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: CONTACT.brokerage,
    url: "https://unitedrealty.com",
    logo: `${SITE_URL}/images/urg-logo-original.png`,
    description:
      "United Realty Group is the #1 transaction volume real estate company in Florida by number of closed transactions, supporting South Florida residential, luxury, and referral transactions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 S Pine Island Rd, Suite 600",
      addressLocality: "Plantation",
      addressRegion: "FL",
      postalCode: "33324",
      addressCountry: "US",
    },
    sameAs: ["https://unitedrealty.com"],
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#agent`,
    name: CONTACT.name,
    alternateName: "HomesProfessional.com",
    description:
      "Carlos Uzcategui is a Florida Licensed Realtor® SL705771 with United Realty Group, serving South Florida sellers, buyers, agent referrals, and Spain/LATAM advisory clients.",
    url: SITE_URL,
    telephone: CONTACT.phoneUS,
    email: CONTACT.email,
    image: CONTACT.headshot,
    priceRange: "Consultation available by request",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Florida Real Estate License SL705771",
        recognizedBy: {
          "@type": "Organization",
          name: "Florida Department of Business and Professional Regulation",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Certified Luxury Home Marketing Specialist (CLHMS)",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "15951 SW 41 St #700",
      addressLocality: "Weston",
      addressRegion: "FL",
      postalCode: "33331",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1009,
      longitude: -80.4031,
    },
    areaServed: [
      "Miami-Dade County",
      "Broward County",
      "Palm Beach County",
      "Miami",
      "Coral Gables",
      "Brickell",
      "Miami Beach",
      "Aventura",
      "Weston",
      "Doral",
      "Fort Lauderdale",
      "Boca Raton",
      "West Palm Beach",
      "Coconut Grove",
      "Wynwood",
      "Edgewater",
      "Key Biscayne",
      "Pinecrest",
      "Kendall",
      "Homestead",
      "North Miami",
      "Hallandale Beach",
      "Pembroke Pines",
      "Madrid",
      "Spain",
      "Latin America",
    ],
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phoneUS,
        availableLanguage: ["English", "Spanish"],
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phoneSpain,
        availableLanguage: ["Spanish", "English"],
        areaServed: "ES",
      },
    ],
    knowsLanguage: ["en", "es"],
    sameAs: [CONTACT.linkedin],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: CONTACT.name,
    jobTitle: "Florida Licensed Realtor®",
    description:
      "Carlos Uzcategui is a Florida Licensed Realtor® (SL705771) and Certified Luxury Home Marketing Specialist with United Realty Group, advising South Florida sellers and buyers and bridging Spain and Latin America clients into the Miami MLS.",
    url: `${SITE_URL}/about`,
    image: CONTACT.headshot,
    telephone: CONTACT.phoneUS,
    email: CONTACT.email,
    knowsLanguage: ["en", "es"],
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@id": `${SITE_URL}/#agent` },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Florida Real Estate License SL705771",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Certified Luxury Home Marketing Specialist (CLHMS)",
      },
    ],
    knowsAbout: [
      "South Florida real estate",
      "Miami MLS listing strategy",
      "Luxury home marketing",
      "International real estate referral",
      "Spain to United States property advisory",
    ],
    sameAs: [CONTACT.linkedin],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: `${CONTACT.name} — ${CONTACT.brokerage}`,
    image: CONTACT.headshot,
    url: SITE_URL,
    telephone: CONTACT.phoneUS,
    email: CONTACT.email,
    priceRange: "$$",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: "15951 SW 41 St #700",
      addressLocality: "Weston",
      addressRegion: "FL",
      postalCode: "33331",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1009,
      longitude: -80.4031,
    },
    areaServed: ["Miami-Dade County", "Broward County", "Palm Beach County"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [CONTACT.linkedin],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/sell#service`,
    name: "South Florida Seller Representation",
    provider: { "@id": `${SITE_URL}/#agent` },
    serviceType: "Real Estate Listing and Seller Representation",
    areaServed: "South Florida",
    url: `${SITE_URL}/sell`,
    description: `Listing preparation, MLS activation, buyer-agent exposure through ${ASSOCIATION_STATS.associationName}, global portal syndication, and offer negotiation for South Florida sellers.`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      description: "Free seller strategy review — no commitment required.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/spain-desk#service`,
    name: "Spain to South Florida Real Estate Advisory",
    provider: { "@id": `${SITE_URL}/#agent` },
    serviceType: "International Real Estate Advisory",
    areaServed: ["South Florida", "Spain", "Latin America"],
    url: `${SITE_URL}/spain-desk`,
    availableLanguage: ["English", "Spanish"],
    description:
      "Bilingual advisory for Spain-based developers, agencies, owners, buyers, and LATAM clients seeking a formal South Florida real estate channel.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/agents#service`,
    name: "Agent-to-Agent Referral Network",
    provider: { "@id": `${SITE_URL}/#agent` },
    serviceType: "Real Estate Agent Referral",
    url: `${SITE_URL}/agents`,
    description:
      "Confidential buyer and seller referral coordination for licensed agents with South Florida, Spain, and LATAM client needs.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    name: "Frequently Asked Questions",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is United Realty Group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "United Realty Group is the #1 real estate company in Florida by transaction volume, with 93,000+ member agents through the Miami and South Florida REALTORS® MLS association.",
        },
      },
      {
        "@type": "Question",
        name: "What areas does Carlos Uzcategui serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carlos Uzcategui serves all of Miami-Dade, Broward, and Palm Beach counties including Miami, Coral Gables, Brickell, Miami Beach, Aventura, Weston, Doral, Fort Lauderdale, Boca Raton, and West Palm Beach.",
        },
      },
      {
        "@type": "Question",
        name: "Does Carlos Uzcategui work with international buyers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Bilingual (English/Spanish) representation is available with a dedicated Spain Desk for buyers from Spain and Latin America relocating to or investing in South Florida.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a free seller strategy review?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact our team via the form on homesprofessional.com/sell, call +1 954-865-6622, or message via WhatsApp. The review is free with no listing commitment required.",
        },
      },
      {
        "@type": "Question",
        name: "What is the MLS exposure for my South Florida listing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every listing entered through United Realty Group reaches 93,000 member agents via the Miami and South Florida REALTORS® MLS with eligible syndication across approved distribution channels including 200+ global portals in 19 languages.",
        },
      },
      {
        "@type": "Question",
        name: "Can out-of-state agents refer clients to you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We have a formal agent-to-agent referral program with signed agreements. Licensed agents from any state or country can refer buyers and sellers to our team through the agents page on homesprofessional.com.",
        },
      },
    ],
  },
];

export function SchemaOrg() {
  return (
    <Helmet>
      {/* Sitewide Open Graph / Twitter CONSTANTS only — rendered once at the app root.
          react-snap concatenates (does not dedupe) tags from this eager Helmet and the
          lazy per-route Helmet, so this block must contain only properties that NO page
          overrides. Page-varying tags (og:title, og:description, og:url) live on the
          pages and fall back to <title> / <meta name="description"> elsewhere. */}
      <meta property="og:site_name" content="HomesProfessional.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${SITE_URL}/images/urg-hq.jpg`} />
      <meta
        property="og:image:alt"
        content="HomesProfessional.com — South Florida Real Estate by United Realty Group"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@unitedrealty" />
      <meta name="twitter:image" content={`${SITE_URL}/images/urg-hq.jpg`} />
      {sitewideSchema.map((schema) => (
        <script key={schema["@id"] ?? schema.name} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
