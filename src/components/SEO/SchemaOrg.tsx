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
      latitude: 25.7617,
      longitude: -80.1918,
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
