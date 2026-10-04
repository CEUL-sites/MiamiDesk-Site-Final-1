import { pathToFileURL } from 'node:url';

const API = 'https://api.netlify.com/api/v1';
const SITE_ID = 'b85e7947-5d72-4bc2-ab4c-82caad1477fb';
const RECIPIENT = 'contact@carlosre.com';
const INQUIRY_FORMS = new Set([
  'seller-hero', 'seller-intake', 'seller-consultation', 'buyer-mandate',
  'global-desk-listing', 'spain-seller', 'agency-partner-intake',
  'referral-intake', 'referral-intake-es',
]);

// Uses the existing deployment credential only inside GitHub Actions. Never
// lists environment variables, prints credentials, or changes existing hooks.
export async function ensureNativeLeadEmail({ token, fetchImpl = fetch } = {}) {
  if (!token) throw new Error('Missing existing NETLIFY_AUTH_TOKEN deployment credential.');

  async function request(path, body) {
    let response;
    try {
      response = await fetchImpl(`${API}${path}`, {
        method: body ? 'POST' : 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      throw new Error('Netlify notification request failed or timed out.');
    }
    if (!response.ok) throw new Error(`Netlify notification request returned HTTP ${response.status}.`);
    try {
      return await response.json();
    } catch {
      throw new Error('Netlify notification API returned an invalid response.');
    }
  }

  const user = await request('/user');
  if (user.email?.toLowerCase() !== 'liquidationbrokers@gmail.com' || user.connected_accounts?.github !== 'CEUL-sites') {
    throw new Error('Unexpected Netlify account; no notification settings changed.');
  }
  const site = await request(`/sites/${SITE_ID}`);
  if (site.id !== SITE_ID || site.name !== 'miamidesk' || site.custom_domain !== 'homesprofessional.com') {
    throw new Error('Unexpected Netlify project; no notification settings changed.');
  }
  const forms = await request(`/sites/${SITE_ID}/forms`);
  if (!Array.isArray(forms) || ['seller-hero', 'seller-intake', 'seller-consultation'].some(name => !forms.some(f => f.name === name))) {
    throw new Error('Required seller forms are missing; no notification settings changed.');
  }
  const inquiries = forms.filter(form => INQUIRY_FORMS.has(form.name));
  let hooks = await request(`/hooks?site_id=${SITE_ID}`);
  if (!Array.isArray(hooks)) throw new Error('Invalid Netlify notification list.');

  const covers = (hook, form) =>
    hook.site_id === SITE_ID && hook.type === 'email' && hook.event === 'submission_created' &&
    hook.disabled !== true && hook.data?.email?.trim().toLowerCase() === RECIPIENT &&
    ((!hook.form_id && !hook.form_name) || hook.form_id === form.id || hook.form_name === form.name);

  const created = [];
  for (const form of inquiries) {
    if (hooks.some(hook => covers(hook, form))) continue;
    const hook = await request(`/hooks?site_id=${SITE_ID}`, {
      site_id: SITE_ID, form_id: form.id, type: 'email', event: 'submission_created',
      data: { email: RECIPIENT },
    });
    hooks.push(hook);
    created.push(form.name);
  }

  // Confirm persisted configuration, rather than trusting POST acceptance.
  hooks = await request(`/hooks?site_id=${SITE_ID}`);
  if (!Array.isArray(hooks) || inquiries.some(form => !hooks.some(hook => covers(hook, form)))) {
    throw new Error('Native email notification coverage could not be verified.');
  }
  return { recipient: RECIPIENT, created, covered: inquiries.map(form => form.name) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  ensureNativeLeadEmail({ token: process.env.NETLIFY_AUTH_TOKEN })
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
