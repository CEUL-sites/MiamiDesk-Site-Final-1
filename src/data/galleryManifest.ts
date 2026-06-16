// Listing media manifest — populate with real assets to fill the gallery.
// Films: use existing cinematic videos (click-to-play, never autoplay).
// Photos: set `src` once the real files are in public/images/listing/.
//
// SHOT LIST — supply these to fill every placeholder:
//   1. Exterior hero shot — landscape (16:9 or 3:2), golden-hour or dusk
//   2. Exterior aerial — landscape (16:9), drone, showing neighborhood context
//   3. Primary living/great room — landscape (3:2), full-width staging
//   4. Kitchen — landscape (3:2), wide angle, countertops clear
//   5. Primary suite — landscape (3:2) or portrait (2:3)
//   6. Pool / outdoor living — landscape (3:2), dusk preferred

export interface GalleryItem {
  type: "photo" | "film";
  src?: string;        // undefined → placeholder (asset not yet supplied)
  poster?: string;     // films only — first-frame still; undefined → navy poster
  caption: string;
  aspect: "landscape" | "portrait";
  /** For placeholder photo slots: describes what asset is needed */
  needed?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Films (existing cinematic video assets) ──────────────────────────────
  {
    type: "film",
    src: "/videos/luxury_home_walkthrough.mp4",
    caption: "Cinematic home walkthrough",
    aspect: "landscape",
  },
  {
    type: "film",
    src: "/videos/luxury_listing_showcase.mp4",
    caption: "Listing showcase",
    aspect: "landscape",
  },

  // ── Photography (supply real listing stills to activate these slots) ──────
  {
    type: "photo",
    // src: "/images/listing/exterior-hero.jpg",
    caption: "Exterior · golden hour",
    aspect: "landscape",
    needed: "Exterior hero shot — landscape 16:9, golden-hour or dusk",
  },
  {
    type: "photo",
    // src: "/images/listing/aerial.jpg",
    caption: "Aerial · neighborhood context",
    aspect: "landscape",
    needed: "Drone aerial — landscape 16:9, showing surrounding neighborhood",
  },
  {
    type: "photo",
    // src: "/images/listing/living-room.jpg",
    caption: "Living room · staging",
    aspect: "landscape",
    needed: "Primary living/great room — wide angle 3:2, full staging",
  },
  {
    type: "photo",
    // src: "/images/listing/primary-suite.jpg",
    caption: "Primary suite",
    aspect: "portrait",
    needed: "Primary bedroom suite — portrait 2:3 or landscape 3:2",
  },
];

// Caption displayed beneath the gallery.
export const GALLERY_CAPTION =
  "The presentation standard behind every South Florida listing.";

// CTA beneath the gallery.
export const GALLERY_CTA = {
  label: "Request a listing consultation",
  href:  "/sell-south-florida#contact",
};
