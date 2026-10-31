import { drainInquiries } from './_shared/hubspotQueue.mjs';
import { CATEGORIES } from './_shared/hubspotSync.mjs';
import { sendWhatsAppAlert } from './_shared/whatsapp';

// Called only after HubSpot has confirmed the contact, complete inquiry note,
// and assigned follow-up task. Send minimal details via the existing WhatsApp
// bridge; the full inquiry remains available inside the secured CRM record.
async function notifySyncedInquiry(job: {
  category: string;
  form: string;
  contactId?: string;
  fields: Record<string, string>;
}) {
  const f = job.fields;
  const safe = (v?: string) => (v || '').replace(/\s+/g, ' ').trim().slice(0, 160) || '—';
  const crmId = job.contactId || '';
  if (!/^\d+$/.test(crmId)) return { ok: false, detail: 'HubSpot contact ID missing' };

  const category = CATEGORIES[job.category] || job.category;
  const lines = [
    '🔔 New website inquiry saved to HubSpot',
    'Type: ' + safe(category),
    'Name: ' + safe(f.name || f.licenseeName || f.agentName),
    'Email: ' + safe(f.email),
    'Phone: ' + safe(f.phone || f.whatsapp),
    'Location: ' + safe(f.propertyAddress || f.city || f.location || f.country),
    'Form: ' + safe(job.form),
    'Source: ' + safe(f.utm_source || f.sourcePage || f.pagePath || 'homesprofessional.com'),
  ];
  if (f.clientName) lines.push('Referred client: ' + safe(f.clientName));
  lines.push('Open in HubSpot: https://app.hubspot.com/contacts/149513532/contact/' + crmId + '?utm_source=homesprofessional&utm_medium=whatsapp_notification');
  return sendWhatsAppAlert(lines.join('\n'), process.env.CALLMEBOT_APIKEY || '');
}

// Netlify's schedule configuration blocks direct URL invocation.
// The modern runtime supplies the complete Blobs context for strong reads.
export default async () => {
  const result = await drainInquiries(undefined, undefined, undefined, notifySyncedInquiry);
  console.log('HubSpot inquiry sync', result);
  return Response.json(result);
};
