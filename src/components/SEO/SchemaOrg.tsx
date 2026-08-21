import { ASSOCIATION_STATS, CONTACT } from "../../constants";
import { AGGREGATE_RATING } from "../../data/reviews";
import { JsonLd } from "./JsonLd";

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
    // areaServed states where this agent serves, and search engines and AI
    // answer engines lift it verbatim. It must not exceed the licence this same
    // node advertises (Florida, SL705771) — naming Spanish or Latin American
    // territory here made that claim in machine-readable form, with no room for
    // the qualifying language the visible copy carries everywhere else.
    // International origins belong in a free-text description, which can carry
    // the qualifier; see the Global Desk service node below.
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
    // sameAs is how this site claims the profiles scattered across directories as
    // one identity. It matters more here than on a typical site: a Keller Williams
    // agent page still carries Carlos's name from his 2012–2024 affiliation there,
    // and directory profiles currently outrank homesprofessional.com for his own
    // name. Declaring them as the same entity is what points that authority back at
    // this domain instead of leaving it spread across pages he does not control.
    //
    // Every entry must be a profile that is verifiably Carlos's — a wrong URL here
    // tells Google the wrong thing about who he is, which is worse than a short
    // list. The four added below were each matched on brokerage, market and, for
    // Birdeye, a review count identical to REVIEW_COUNT in src/data/reviews.ts.
    sameAs: [
      CONTACT.linkedin,
      "https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51",
      "https://www.homes.com/real-estate-agents/carlos-uzcategui/tgh3j9b/",
      "https://www.loopnet.com/commercial-real-estate-brokers/profile/carlos-uzcategui/35mjrefb",
      "https://reviews.birdeye.com/carlos-uzcategui-pa-171703249888930",
      "https://www.facebook.com/sfloridahome/",
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
    name: "Miami Global Listing Desk — International Property Positioning for Miami and South Florida",
    provider: { "@id": `${SITE_URL}/#agent` },
    serviceType: "International Property Positioning and Professional Cooperation",
    areaServed: "South Florida",
    url: `${SITE_URL}/global-desk`,
    availableLanguage: ["English", "Spanish"],
    description:
      "Miami Global Listing Desk works with agents, agencies, developers, and qualified local real estate professionals to prepare selected international properties for differentiated positioning and cooperation in the Miami and South Florida market, with relevance to U.S., Latin American, and international buyer and investor demand, including high-net-worth segments. The service is operated by Carlos Uzcategui, Florida Realtor®, through United Realty Group. The originating professional retains the client relationship and local representation. Every property and activity remains subject to eligibility, brokerage approval, platform participation, MLS, association, legal, and compliance requirements.",
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

// Derives a stable, descriptive JsonLd id from each schema's @id URL fragment
// e.g. "https://homesprofessional.com/global-desk#service" -> "sitewide-global-desk-service"
function schemaIdSlug(schema: JsonLdSchema): string {
  const raw = (schema["@id"] as string | undefined) ?? schema.name;
  const afterOrigin = raw.replace(SITE_URL, "").replace(/^\//, "");
  const slug = afterOrigin
    .replace(/[#/]+/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `sitewide-${slug || "schema"}`;
}

export function SchemaOrg() {
  return (
    <>
      {sitewideSchema.map((schema) => (
        <JsonLd key={schema["@id"] ?? schema.name} id={schemaIdSlug(schema)} data={schema} />
      ))}
    </>
  );
}
