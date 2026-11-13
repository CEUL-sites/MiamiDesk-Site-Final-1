import { drainInquiries } from './_shared/hubspotQueue.mjs';
import { CATEGORIES } from './_shared/hubspotSync.mjs';
import { sendWhatsAppAlert } from './_shared/whatsapp';

// Called only after HubSpot has confirmed the contact, complete inquiry note,
// and assigned follow-up task. Sends minimal details through the WhatsApp Cloud
// API when it is configured; the full inquiry stays inside the secured CRM record.
async function notifySyncedInquiry(job: {
  category: string;
  form: string;
  contactId?: string;
  fields: Record<string, string>;
}) {
  const f = job.fields;
  const safe = (v?: string) => (v || '').replace(/\s+/g, ' ').trim().slice(0, 160) || '—';
  const crmId = job.contactId || '';
  if (!/^\d+$/.test(crmId)) return { ok: false, configured: true, detail: 'HubSpot contact ID missing' };

  const category = CATEGORIES[job.category] || job.category;
  return sendWhatsAppAlert({
    type: safe(category) + (f.clientName ? ' · referred client ' + safe(f.clientName) : ''),
    name: safe(f.name || f.licenseeName || f.agentName),
    contact: [f.phone || f.whatsapp, f.email].filter(Boolean).map(safe).join(' · '),
    location: safe(f.propertyAddress || f.city || f.location || f.country),
    link: 'https://app.hubspot.com/contacts/149513532/contact/' + crmId,
  });
}

// Netlify's schedule configuration blocks direct URL invocation.
// The modern runtime supplies the complete Blobs context for strong reads.
export default async () => {
  const result = await drainInquiries(undefined, undefined, undefined, notifySyncedInquiry);
  console.log('HubSpot inquiry sync', result);
  return Response.json(result);
};
