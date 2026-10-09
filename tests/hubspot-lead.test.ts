import test from "node:test";
import assert from "node:assert/strict";
import { inquiryKey, inquiryNote, syncHubspotLead } from "../netlify/functions/_shared/hubspotLead";

const lead = { email: "owner@example.test", name: "Owner Name", phone: "+19545550123", formName: "seller-intake", formRenderedAt: "10000" };
function fixture(responses: { status: number; body: unknown }[]) {
  const records = new Map<string, unknown>();
  const calls: { url: string; options: RequestInit }[] = [];
  const recovery: unknown[] = [];
  return {
    records, calls, recovery,
    deps: {
      enabled: true, token: "test-secret", ownerId: "123",
      store: { setJSON: async (key: string, value: unknown, options?: { onlyIfNew?: boolean }) => {
        if (options?.onlyIfNew && records.has(key)) return { modified: false };
        records.set(key, value); return { modified: true };
      } } as any,
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
