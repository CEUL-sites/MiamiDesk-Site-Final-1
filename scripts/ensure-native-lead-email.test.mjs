import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureNativeLeadEmail } from './ensure-native-lead-email.mjs';

const siteId = 'b85e7947-5d72-4bc2-ab4c-82caad1477fb';

// Only the external Netlify HTTP boundary is simulated; hook persistence and
// subsequent reads use the same state, so rerunning must remain idempotent.
function netlifyFixture({ email = 'liquidationbrokers@gmail.com', domain = 'homesprofessional.com', status = 200 } = {}) {
  const forms = [
    { id: 'hero', name: 'seller-hero' },
    { id: 'intake', name: 'seller-intake' },
    { id: 'consultation', name: 'seller-consultation' },
    { id: 'step1', name: 'seller-valuation-step1' },
  ];
  const hooks = [{ id: 'existing', site_id: siteId, form_id: 'hero', type: 'email', event: 'submission_created', data: { email: 'contact@carlosre.com' }, disabled: false }];
  const fetchImpl = async (url, init = {}) => {
    if (status !== 200) return new Response('provider response containing secret-test-token', { status });
    if (init.headers.Authorization !== 'Bearer secret-test-token') return new Response('Unauthorized', { status: 401 });
    const path = new URL(url).pathname;
    if (path === '/api/v1/user') return Response.json({ email, connected_accounts: { github: 'CEUL-sites' } });
    if (path === `/api/v1/sites/${siteId}`) return Response.json({ id: siteId, name: 'miamidesk', custom_domain: domain });
    if (path === `/api/v1/sites/${siteId}/forms`) return Response.json(forms);
    if (path === '/api/v1/hooks' && (!init.method || init.method === 'GET')) return Response.json(hooks);
    if (path === '/api/v1/hooks' && init.method === 'POST') {
      const hook = JSON.parse(init.body);
      assert.equal(hook.site_id, siteId);
      assert.equal(hook.type, 'email');
      assert.equal(hook.event, 'submission_created');
      assert.equal(hook.data.email, 'contact@carlosre.com');
      assert.ok(forms.some(f => f.id === hook.form_id));
      hooks.push({ ...hook, id: `new-${hooks.length}`, disabled: false });
      return Response.json(hooks.at(-1), { status: 201 });
    }
    throw new Error(`Unexpected HTTP operation: ${path}`);
  };
  return { fetchImpl, hooks };
}

test('covers registered inquiry forms without duplicate alerts or address-only notifications', async () => {
  const fixture = netlifyFixture();
  const first = await ensureNativeLeadEmail({ token: 'secret-test-token', fetchImpl: fixture.fetchImpl });
  assert.deepEqual(first.created, ['seller-intake', 'seller-consultation']);
  assert.deepEqual(first.covered, ['seller-hero', 'seller-intake', 'seller-consultation']);
  assert.deepEqual(fixture.hooks.map(h => h.form_id), ['hero', 'intake', 'consultation']);
  const second = await ensureNativeLeadEmail({ token: 'secret-test-token', fetchImpl: fixture.fetchImpl });
  assert.deepEqual(second.created, []);
  assert.equal(fixture.hooks.length, 3);
});

test('refuses notification changes under a different Netlify account', async () => {
  const fixture = netlifyFixture({ email: 'different@example.com' });
  await assert.rejects(ensureNativeLeadEmail({ token: 'secret-test-token', fetchImpl: fixture.fetchImpl }), /account/i);
  assert.equal(fixture.hooks.length, 1);
});

test('refuses notification changes for an unexpected production domain', async () => {
  const fixture = netlifyFixture({ domain: 'other.example.com' });
  await assert.rejects(ensureNativeLeadEmail({ token: 'secret-test-token', fetchImpl: fixture.fetchImpl }), /project/i);
  assert.equal(fixture.hooks.length, 1);
});

test('reports HTTP failure without exposing provider response bodies or credentials', async () => {
  const fixture = netlifyFixture({ status: 403 });
  await assert.rejects(ensureNativeLeadEmail({ token: 'secret-test-token', fetchImpl: fixture.fetchImpl }), error => {
    assert.match(error.message, /403/);
    assert.doesNotMatch(error.message, /secret-test-token/);
    return true;
  });
  assert.equal(fixture.hooks.length, 1);
});

test('refuses to start without the existing deployment credential', async () => {
  await assert.rejects(ensureNativeLeadEmail({ token: '' }), /missing/i);
});
