import { createHmac } from "node:crypto";

// Shared between seller-nurture (sender) and nurture-unsubscribe (opt-out).
// The token in every unsubscribe link is an HMAC of the email so opt-out
// links can't be forged for other addresses.

export const NURTURE_STORE = "seller-nurture";

const SECRET =
  process.env.NURTURE_SECRET || process.env.RESEND_API_KEY || "homesprofessional-nurture";

export function nurtureToken(email: string): string {
  return createHmac("sha256", SECRET).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export interface NurtureLead {
  email: string;
  name: string;
  city: string;
  timeline: string;
  formName: string;
  enrolledAt: string;
  stage: number;
  lastSentAt: string | null;
  unsubscribed: boolean;
}
