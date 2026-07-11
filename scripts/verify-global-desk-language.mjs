import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/pages/GlobalDeskPage.tsx", "utf8");

assert.match(source, /useState<Lang>\("en"\)/);
assert.match(source, /localStorage\.getItem\("gd-lang"\)/);
assert.match(source, /hrefLang="es"/);
assert.match(source, /Miami Global Listing Desk/);

console.log("global desk language contract verified");
