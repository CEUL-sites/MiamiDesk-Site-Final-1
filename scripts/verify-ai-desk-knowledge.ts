// verify:ai-desk-knowledge — the Miami Desk answers from the site's own
// published content, and nothing banned can enter or leave the model.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import pack from "../netlify/functions/_shared/aiDeskKnowledge.generated.json" with { type: "json" };
import { buildKnowledgeContext, citiesIn, rankDocs } from "../netlify/functions/_shared/aiDeskKnowledge.ts";
import { guardAiDeskResponse } from "../netlify/functions/_shared/aiDeskResponseGuardrails.ts";

const p = pack as { docs: { kind: string; lang: string; url: string; title: string; text: string }[]; market: unknown[]; journal: unknown[]; marketPeriod: string };

// The pack is generated from published pages and is not empty.
assert.ok(p.docs.filter((d) => d.kind === "faq").length >= 100, "FAQ coverage collapsed — was the pack regenerated from dist/?");
assert.ok(p.docs.some((d) => d.lang === "es"), "Spanish pages missing from the pack");
assert.ok(p.market.length >= 20 && p.journal.length >= 20);
assert.ok(p.marketPeriod, "market figures must carry their report period");
for (const d of p.docs) {
  assert.ok(d.url.startsWith("https://homesprofessional.com/"), `bad source url ${d.url}`);
  assert.ok(!/\$\s?69\s?(b|bn|billion)\b|69 billion|Realtor\(R\)/i.test(d.title + d.text), `banned figure/spelling in pack: ${d.url}`);
}

// Retrieval finds the right published answers.
assert.ok(rankDocs("What does the seller strategy review include?", "en").some((d) => /seller strategy review/i.test(d.title)));
assert.ok(rankDocs("¿Cómo funciona el Global Desk para mi propiedad en Madrid?", "es").some((d) => /global/i.test(d.title + d.text)));
assert.deepEqual(citiesIn("median price in Coral Gables").map((c: { city: string }) => c.city), ["Coral Gables"]);
const ctx = buildKnowledgeContext([{ role: "user", content: "Median single-family price in Coral Gables?" }], "english");
assert.match(ctx, /Coral Gables \(Miami-Dade County\): Single-family: median sale price \$[\d,]+/);
assert.match(ctx, /source: .*REALTORS/i, "market figures carry their source");
assert.ok(ctx.length < 7000, "per-question context must stay small (cost)");
assert.match(buildKnowledgeContext([{ role: "user", content: "zzqx" }], "english"), /no published page matched/);

// Output guardrails.
assert.equal(guardAiDeskResponse("Closed $69B last year!"), "Closed the association network's scale last year.");
assert.ok(!/!/.test(guardAiDeskResponse("¡Hola! Great!")));
assert.match(guardAiDeskResponse("a Realtor(R)"), /Realtor®/);
assert.equal(guardAiDeskResponse("Find your dream home with a stunning view."), "Find your home with a view.");
assert.equal(guardAiDeskResponse("I'm excited and passionate about the best way."), "I'm glad and committed about the most suitable way.");
assert.equal(guardAiDeskResponse("La casa de sus sueños es la mejor opción, increíble."), "La casa es la más adecuada opción.");
assert.equal(guardAiDeskResponse("Listed at $1,250,000."), "Listed at $1,250,000.");

assert.equal(guardAiDeskResponse("Your dreams, best practices."), "Your best practices.");

// Wiring: the function sends the knowledge with every request; postbuild regenerates it.
assert.match(readFileSync("netlify/functions/ai-desk.ts", "utf8"), /buildKnowledgeContext\(messages, intent\.language\)/);
assert.match(JSON.parse(readFileSync("package.json", "utf8")).scripts.postbuild, /build-ai-desk-knowledge\.ts/);
const prompt = readFileSync("netlify/functions/_shared/aiDeskSystemPrompt.ts", "utf8");
assert.ok(!/Realtor\(R\)|REALTORS\(R\)|0705771/.test(prompt), "system prompt spelling/licence must match CLAUDE.md");

console.log(`verify:ai-desk-knowledge ✓ ${p.docs.length} published docs, ${p.market.length} cities, ${p.journal.length} posts; retrieval + guardrails`);
