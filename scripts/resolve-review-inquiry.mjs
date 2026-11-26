// Administrative utility to list or resolve stuck HubSpot review inquiries in Netlify Blobs.
// Send the Netlify personal access token through stdin only (never CLI args, source, or .env).
// Usage:
//   echo <NETLIFY_TOKEN> | node scripts/resolve-review-inquiry.mjs --list
//   echo <NETLIFY_TOKEN> | node scripts/resolve-review-inquiry.mjs --resolve <key> --reason "internal test submission"
import { getStore } from '@netlify/blobs';
import { HUBSPOT_STORE, listReviewInquiries, resolveReviewInquiry } from '../netlify/functions/_shared/hubspotQueue.mjs';

const SITE_ID = 'b85e7947-5d72-4bc2-ab4c-82caad1477fb';
const args = process.argv.slice(2);
const flag = name => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : '';
};

let token = '';
for await (const chunk of process.stdin) token += chunk;
token = token.trim();
if (!token) throw new Error('A Netlify API token is required on stdin');

const store = getStore({ name: HUBSPOT_STORE, siteID: SITE_ID, token, consistency: 'strong' });

if (args.includes('--list')) {
  const items = await listReviewInquiries(store);
  console.log(JSON.stringify(items.map(j => ({
    key: j.key,
    form: j.form,
    at: j.at,
    lastError: j.lastError,
  })), null, 2));
} else if (args.includes('--resolve')) {
  const key = flag('--resolve');
  const reason = flag('--reason') || 'resolved_manually';
  const result = await resolveReviewInquiry(key, reason, store);
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== 'resolved') process.exitCode = 1;
} else {
  console.error('Specify --list or --resolve <key> [--reason "..."]');
  process.exitCode = 1;
}
