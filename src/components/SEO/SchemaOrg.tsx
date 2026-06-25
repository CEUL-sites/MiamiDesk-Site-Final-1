import { Helmet } from "react-helmet-async";
import { ASSOCIATION_STATS, CONTACT } from "../../constants";
import { AGGREGATE_RATING } from "../../data/reviews";

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
    description:
      "United Realty Group brokerage infrastructure supporting South Florida residential, luxury, and referral transactions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 S Pine Island Rd, Suite 600",
      addressLocality: "Plantation",
      addressRegion: "FL",
      postalCode: "33324",
      addressCountry: "US",
    },
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
    sameAs: [
      CONTACT.linkedin,
      "https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51",
    ],
    aggregateRating: AGGREGATE_RATING,
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#weston-office`,
    name: "Carlos Uzcategui, Realtor® — Weston Office",
    telephone: CONTACT.phoneUS,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "15951 SW 41 St #700",
      addressLocality: "Weston",
      addressRegion: "FL",
      postalCode: "33331",
      addressCountry: "US",
    },
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/global-desk#service`,
    name: "Global Desk — Miami MLS International Activation",
    provider: { "@id": `${SITE_URL}/#agent` },
    serviceType: "International Real Estate MLS Activation",
    areaServed: ["South Florida", "Spain", "Latin America"],
    url: `${SITE_URL}/global-desk`,
    availableLanguage: ["English", "Spanish"],
    description:
      "Carlos Uzcategui places eligible international inventory directly into the Miami and South Florida REALTORS® MLS as the licensed principal of record — 93,000 member agents, 200+ global portals, 19 languages.",
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
];

export function SchemaOrg() {
  return (
    <Helmet>
      {sitewideSchema.map((schema) => (
        <script key={schema["@id"] ?? schema.name} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
