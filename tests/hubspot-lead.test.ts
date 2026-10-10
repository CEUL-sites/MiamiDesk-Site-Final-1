import test from "node:test";
import assert from "node:assert/strict";
import { inquiryKey, inquiryNote, syncHubspotLead } from "../netlify/functions/_shared/hubspotLead";
import { connectLeadStorage, leadStoreName } from "../netlify/functions/_shared/leadStorage";
import { getStore, setEnvironmentContext } from "@netlify/blobs";
import { readFileSync } from "node:fs";

test("SDK claim transport sends the atomic header and refuses a repeated claim", async () => {
  const before = process.env.NETLIFY_BLOBS_CONTEXT;
  const requests: RequestInit[] = [];
  try {
    setEnvironmentContext({ siteID: "site-test", token: "test-only", edgeURL: "https://blobs.example.test" });
    const store = getStore({ name: "test-claims", fetch: (async (_url: unknown, options: RequestInit) => {
      requests.push(options);
      return new Response("", { status: requests.length === 1 ? 200 : 412, headers: { etag: '"stored"' } });
    }) as typeof fetch });
    assert.equal((await store.set("inquiry", JSON.stringify({ status: "pending" }), { onlyIfNew: true })).modified, true);
    assert.equal((await store.set("inquiry", JSON.stringify({ status: "pending" }), { onlyIfNew: true })).modified, false);
    assert.equal(requests.length, 2);
    for (const request of requests) assert.equal(new Headers(request.headers).get("if-none-match"), "*");
  } finally {
    if (before === undefined) delete process.env.NETLIFY_BLOBS_CONTEXT;
    else process.env.NETLIFY_BLOBS_CONTEXT = before;
  }
});

test("every registered lead schema preserves form identity and current page context", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const forms = [...html.matchAll(/<form\b[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/form>/g)];
  assert.ok(forms.length >= 10);
  for (const [, name, fields] of forms) {
    for (const key of ["formRenderedAt", "pagePath", "language"]) assert.ok(fields.includes(`name="${key}"`), `${name} drops ${key}`);
  }
});

test("Lambda lead handlers initialize Blobs and preview storage is isolated", () => {
  const before = process.env.NETLIFY_BLOBS_CONTEXT;
  const namespace = process.env.LEAD_STORE_NAMESPACE;
  try {
    connectLeadStorage({ blobs: Buffer.from(JSON.stringify({ url: "https://blobs.example.test", token: "test-only" })).toString("base64"), headers: { "x-nf-site-id": "site-test", "x-nf-deploy-id": "deploy-test" } } as any);
    assert.equal(JSON.parse(Buffer.from(process.env.NETLIFY_BLOBS_CONTEXT!, "base64").toString()).siteID, "site-test");
    delete process.env.LEAD_STORE_NAMESPACE;
    assert.equal(leadStoreName("hubspot-inquiries"), "hubspot-inquiries");
    process.env.LEAD_STORE_NAMESPACE = "preview-169";
    assert.equal(leadStoreName("hubspot-inquiries"), "hubspot-inquiries-preview-169");
    assert.equal(leadStoreName("lead-dead-letter"), "lead-dead-letter-preview-169");
    process.env.LEAD_STORE_NAMESPACE = "../production";
    assert.throws(() => leadStoreName("hubspot-inquiries"));
  } finally {
    if (before === undefined) delete process.env.NETLIFY_BLOBS_CONTEXT;
    else process.env.NETLIFY_BLOBS_CONTEXT = before;
    if (namespace === undefined) delete process.env.LEAD_STORE_NAMESPACE;
    else process.env.LEAD_STORE_NAMESPACE = namespace;
  }
});

const lead = { email: "owner@example.test", name: "Owner Name", phone: "+19545550123", formName: "seller-intake", formRenderedAt: "10000" };
function fixture(responses: { status: number; body: unknown }[]) {
  const records = new Map<string, unknown>();
  const calls: { url: string; options: RequestInit }[] = [];
  const recovery: unknown[] = [];
  return {
    records, calls, recovery,
    deps: {
      enabled: true, token: "test-secret", ownerId: "123",
      store: { set: async (key: string, value: string, options?: { onlyIfNew?: boolean }) => {
        if (options?.onlyIfNew && records.has(key)) return { modified: false };
        records.set(key, JSON.parse(value)); return { modified: true, etag: '"test-etag"' };
      }, setJSON: async (key: string, value: unknown) => { records.set(key, value); return { modified: true, etag: '"test-etag"' }; } } as any,
      fetch: (async (url: string, options: RequestInit) => {
        calls.push({ url, options });
        const r = responses.shift(); if (!r) throw new Error("unexpected API request");
        return new Response(JSON.stringify(r.body), { status: r.status });
      }) as typeof fetch,
      deadLetter: async (_: string, payload: unknown) => { recovery.push(payload); },
    },
  };
}
test("existing contact stays unchanged and full inquiry is safely appended once", async () => {
  const f = fixture([{ status: 200, body: { id: "42" } }, { status: 201, body: { id: "88" } }]);
  const fields = { preferredContact: "Email", messagingConsent: "no", priorListing: "<script>bad</script>", utm_source: "referral", language: "es" };
  assert.equal(await syncHubspotLead(lead, fields, f.deps), "ok");
  assert.equal(await syncHubspotLead(lead, fields, f.deps), "already captured");
  assert.equal(f.calls.length, 2);
  assert.ok(!f.calls.some(c => c.options.method === "PATCH"));
  const note = JSON.parse(String(f.calls[1].options.body));
  assert.match(note.properties.hs_note_body, /messagingConsent: no/);
  assert.match(note.properties.hs_note_body, /preferredContact: Email/);
  assert.match(note.properties.hs_note_body, /&lt;script&gt;/);
  assert.equal(note.associations[0].to.id, "42");
});
test("new email contact uses CRM API without marketing properties", async () => {
  const f = fixture([{ status: 404, body: {} }, { status: 201, body: { id: "42" } }, { status: 201, body: { id: "88" } }]);
  assert.equal(await syncHubspotLead(lead, {}, f.deps), "ok");
  assert.deepEqual(JSON.parse(String(f.calls[1].options.body)).properties, { email: lead.email, firstname: lead.name, phone: lead.phone, hubspot_owner_id: "123" });
});
test("phone-only local inquiry creates contact without a fabricated email or country", async () => {
  const f = fixture([{ status: 201, body: { id: "42" } }, { status: 201, body: { id: "88" } }]);
  assert.equal(await syncHubspotLead({ ...lead, email: "", phone: "954 555 0123" }, {}, f.deps), "ok");
  const p = JSON.parse(String(f.calls[0].options.body)).properties;
  assert.equal(p.email, undefined); assert.equal(p.phone, "954 555 0123");
});
test("international phone matches require a single result", async () => {
  const f = fixture([{ status: 200, body: { total: 2, results: [{ id: "1" }, { id: "2" }] } }]);
  assert.equal(await syncHubspotLead({ ...lead, email: "" }, {}, f.deps), "needs review");
  assert.equal(f.calls.length, 1); assert.equal(f.recovery.length, 1);
});
test("CRM failure is recoverable and does not throw or blindly repeat a note", async () => {
  const f = fixture([{ status: 200, body: { id: "42" } }, { status: 429, body: {} }]);
  assert.equal(await syncHubspotLead(lead, {}, f.deps), "needs review");
  assert.equal(f.recovery.length, 1);
  assert.equal(await syncHubspotLead(lead, {}, f.deps), "already captured");
});
test("an unconfirmed storage write never permits a CRM write", async () => {
  const f = fixture([]);
  f.deps.store.set = async () => ({ modified: true, etag: "" });
  assert.equal(await syncHubspotLead(lead, {}, f.deps), "needs review");
  assert.equal(f.calls.length, 0);
  assert.equal(f.recovery.length, 1);
});
test("simultaneous primary and backup claims create one contact and note", async () => {
  const f = fixture([{ status: 404, body: {} }, { status: 201, body: { id: "42" } }, { status: 201, body: { id: "88" } }]);
  const outcomes = await Promise.all([syncHubspotLead(lead, {}, f.deps), syncHubspotLead(lead, {}, f.deps)]);
  assert.deepEqual(outcomes.sort(), ["already captured", "ok"]);
  assert.equal(f.calls.length, 3);
});
test("disabled integration makes no API writes; missing credential preserves inquiry", async () => {
  const f = fixture([]);
  assert.equal(await syncHubspotLead(lead, {}, { ...f.deps, enabled: false }), "disabled");
  assert.equal(f.calls.length, 0);
  assert.equal(await syncHubspotLead(lead, {}, { ...f.deps, token: "" }), "not configured");
  assert.equal(f.recovery.length, 1);
});
test("separate form instances keep separate inquiry histories, both delivery paths share a key", () => {
  assert.equal(inquiryKey(lead, {}), inquiryKey({ ...lead, formRenderedAt: undefined }, { formRenderedAt: "10000", "form-name": "seller-intake" }));
  assert.notEqual(inquiryKey(lead, {}), inquiryKey({ ...lead, formRenderedAt: "10001" }, {}));
  assert.notEqual(inquiryKey(lead, {}), inquiryKey({ ...lead, formName: "buyer-mandate" }, {}));
  assert.notEqual(inquiryKey(lead, { propertyAddress: "One" }), inquiryKey(lead, { propertyAddress: "Two" }));
  assert.ok(!inquiryNote(lead, { "bot-field": "secret" }, "key").includes("secret"));
});
test("calculator primary and backup context share a CRM inquiry key", () => {
  const contact = { ...lead, formName: "seller-consultation" };
  const fields = { name: lead.name, email: lead.email, phone: lead.phone, message: "Net sheet request", timeline: "Exploring options", source: "net-proceeds-calculator", formRenderedAt: "10000" };
  assert.equal(inquiryKey(contact, { ...fields, "form-name": "seller-consultation", propertyAddress: "", city: "", utm_source: "direct" }), inquiryKey(contact, { ...fields, language: "es", pagePath: "/sell" }));
});
