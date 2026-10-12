import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static form declarations retain every field registered before the visual release", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const contract = JSON.parse(await readFile(new URL("./fixtures/netlify-form-fields.json", import.meta.url), "utf8"));
  const declarations = new Map<string, string>();
  for (const match of html.matchAll(/<form\b[^>]*name="([^"]+)"[^>]*>[\s\S]*?<\/form>/g)) {
    assert.ok(!declarations.has(match[1]), `duplicate static declaration: ${match[1]}`);
    declarations.set(match[1], match[0]);
  }
  for (const form of contract.forms as { name: string; fields: string[] }[]) {
    const block = declarations.get(form.name);
    assert.ok(block, `missing static form: ${form.name}`);
    assert.match(block, /data-netlify="true"/);
    assert.match(block, /\bhidden\b/);
    const names = new Set(Array.from(block.matchAll(/\bname="([^"]+)"/g), match => match[1]));
    for (const field of form.fields) {
      assert.ok(names.has(field), `${form.name} would drop the registered ${field} field on deployment`);
    }
  }
});
