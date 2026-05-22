import { Helmet } from "react-helmet-async";
import { CONTACT } from "../../constants";

const REAL_ESTATE_AGENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://homesprofessional.com/#agent",
  "name": "Carlos Uzcategui",
  "alternateName": "HomesProfessional.com",
  "description": "Carlos Uzcategui is a REALTOR® and Certified Luxury Home Marketing Specialist (CLHMS) licensed in Florida since 2001, specializing in South Florida residential and luxury real estate as an associate with United Realty Group.",
  "url": "https://homesprofessional.com",
  "telephone": CONTACT.phoneUS,
  "email": CONTACT.email,
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "Florida Real Estate License SL705771",
      "recognizedBy": { "@type": "Organization", "name": "Florida Department of Business and Professional Regulation" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "Certified Luxury Home Marketing Specialist (CLHMS)",
    },
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://homesprofessional.com/#organization",
    "name": "United Realty Group",
    "description": "United Realty Group is the #1 transaction volume real estate company in Florida by number of closed transactions.",
    "url": "https://unitedrealty.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15951 SW 41 St #700",
      "addressLocality": "Weston",
      "addressRegion": "FL",
      "postalCode": "33331",
      "addressCountry": "US",
    },
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "15951 SW 41 St #700",
    "addressLocality": "Weston",
    "addressRegion": "FL",
    "postalCode": "33331",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.7617",
    "longitude": "-80.1918",
  },
  "areaServed": [
    "Miami", "Coral Gables", "Brickell", "Miami Beach", "Aventura",
    "Weston", "Doral", "Fort Lauderdale", "Boca Raton", "West Palm Beach",
    "Coconut Grove", "Wynwood", "Edgewater", "Key Biscayne", "Pinecrest",
    "Downtown Miami", "Kendall", "Homestead", "North Miami", "Hallandale Beach",
    "Pembroke Pines",
  ],
  "openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": CONTACT.phoneUS,
      "availableLanguage": ["English", "Spanish"],
      "areaServed": "US",
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": CONTACT.phoneSpain,
      "availableLanguage": ["Spanish", "English"],
      "areaServed": "ES",
    },
  ],
  "knowsLanguage": ["en", "es"],
  "image": CONTACT.headshot,
  "sameAs": [CONTACT.linkedin],
};

export function SchemaOrg() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(REAL_ESTATE_AGENT_SCHEMA)}
      </script>
    </Helmet>
  );
}
