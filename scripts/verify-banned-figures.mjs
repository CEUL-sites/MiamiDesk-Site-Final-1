// Fails when a banned or retired figure appears in site source.
// Journal posts are covered by verify-journal-content.mjs; this guard covers
// components, pages, data and i18n, where the 90%/9-of-10 drift happened.
// Approved wording for the buyer-agent share is figures.buyerAgentShare
// ("nearly 9 of 10", NAR 2025 Profile of Home Buyers and Sellers).
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOTS = ["src/components", "src/pages", "src/data", "src/i18n", "src/constants.ts"];
const EXT = /\.(tsx?|json)$/;

const BANNED = [
  { re: /\$\s*69\s*B\b|69\s*billion|69\s*mil\s*millones/i, why: "association volume figure (compliance rule 1)" },
  { re: /(more than|over)\s+90\s*%|>\s*90\s*%|&gt;\s*90\s*%|más del 90\s*%/i, why: 'overstated buyer-agent share; use figures.buyerAgentShare ("nearly 9 of 10")' },
  { re: /60,000\s+(members|agents|miembros)/i, why: "retired member count; use figures.members" },
  { re: /\b(20|21)\s+(FL\s+|Florida\s+)?offices?\b/i, why: 'retired office count; use "19 Florida office locations"' },
  { re: /\b385\s+(U\.S\.\s+)?MLS/i, why: "retired MLS count; use figures.usMls (260+)" },
  { re: /\b500\+\s+(global\s+)?(websites|portals)/i, why: "retired portal count; use figures.globalWebsites (200+)" },
];

async function walk(path) {
  if (EXT.test(path)) return [path];
  let entries;
  try {
    entries = await readdir(path, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    const p = join(path, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
}

const files = (await Promise.all(ROOTS.map(walk))).flat();
const failures = [];
for (const file of files) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    for (const { re, why } of BANNED) {
      if (re.test(line)) failures.push(`${file}:${i + 1} — ${why}\n    ${line.trim().slice(0, 140)}`);
    }
  });
}

if (failures.length) {
  console.error(`verify:banned-figures — ${failures.length} problem(s):\n` + failures.join("\n"));
  process.exit(1);
}
console.log(`verify:banned-figures — ${files.length} files clean`);
