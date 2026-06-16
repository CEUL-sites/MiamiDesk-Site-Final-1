// ──────────────────────────────────────────────────────────────────────────
// Recently Represented — curated, Carlos-supplied transactions.
//
// COMPLIANCE: Populate this ONLY with properties Carlos can legally display.
// Sold-MLS display rules vary; when in doubt, show area-level detail (city,
// type, year) rather than a full street address, and never imply a guaranteed
// outcome. Do NOT fabricate entries — an empty array hides the section
// entirely (the component renders nothing until real records are added).
//
// To publish: add objects below, drop any photos in public/images/represented/,
// commit, push. Netlify redeploys automatically.
// ──────────────────────────────────────────────────────────────────────────

export interface RepresentedProperty {
  /** Area or street the seller is comfortable displaying, e.g. "Weston, FL". */
  location: string;
  /** "Single-Family", "Condominium", "Townhome", etc. */
  propertyType: string;
  /** Which side Carlos represented. */
  side: "Listing" | "Buyer";
  /** Year of the transaction, e.g. "2025". Optional. */
  year?: string;
  /** Optional cover photo: "/images/represented/<file>.jpg". */
  image?: string;
  /**
   * Optional short, compliant note. Avoid guaranteed-outcome language
   * ("sold over asking in X days" is fine as a fact; "I guarantee…" is not).
   */
  note?: string;
}

export const REPRESENTED_PROPERTIES: RepresentedProperty[] = [];
