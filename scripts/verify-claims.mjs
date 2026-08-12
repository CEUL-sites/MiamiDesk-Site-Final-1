// Regression guard for the MLS/association superlative conflation.
//
// src/data/figures.json is explicit: the merged association is the
// "third-largest MLS in the United States" (mlsRank) and, at most, "the
// largest MLS owned by a single U.S. Realtor association" (mlsAssociationOwned
// — whose own `source` field warns: do NOT phrase as "largest local MLS in
// the world"; Bright MLS and CRMLS have more subscribers).
//
// Separately, "the world's largest local Realtor® association" is a fully
// sourced claim — but only when the grammatical subject is the ASSOCIATION
// (Miami and South Florida REALTORS®), never the MLS. "The Miami MLS is the
// world's largest local Realtor® association" quietly swaps the subject and
// asserts exactly the claim figures.json forbids.
//
// This script sweeps the same public-copy surfaces the compliance-reviewer
// agent cares about and fails when the word "MLS" sits close enough in front
// of a "largest ... local ... association" phrase to be its likely subject —
// via a copula ("MLS is the world's largest...") or an appositive ("MLS —
// the world's largest...").
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

// ── 1. Collect the file set ────────────────────────────────────────────────
// Mirrors the sweep scope: src/**/*.tsx, src/**/*.ts, src/i18n/locales/*.json,
// src/content/journal/*.md (top-level only — _drafts/ and any other
// underscore-prefixed entry is never public copy, same rule the journal
// content verifier and the daily publisher use).
function walk(dir, extensions, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, extensions, out);
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

const targetFiles = [];

targetFiles.push(...walk(path.join(root, "src"), [".ts", ".tsx"]));

const localesDir = path.join(root, "src", "i18n", "locales");
if (fs.existsSync(localesDir)) {
  for (const name of fs.readdirSync(localesDir)) {
    if (name.endsWith(".json")) targetFiles.push(path.join(localesDir, name));
  }
}

const journalDir = path.join(root, "src", "content", "journal");
if (fs.existsSync(journalDir)) {
  for (const entry of fs.readdirSync(journalDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
      targetFiles.push(path.join(journalDir, entry.name));
    }
  }
}

assert.ok(targetFiles.length > 0, "no target files found — sweep scope is broken");

// ── 2. Reconstruct logical text units (paragraphs) per file ────────────────
//
// A naive whole-file or single-line character-window check both misfire on
// this codebase's actual shapes:
//   - JSX text is often hand-wrapped across several source lines (a single
//     rendered sentence spans lines), so pure per-line matching misses it.
//   - Adjacent object-literal string fields (`headline: "...MLS.",` directly
//     above `sub: "...world's largest...",`) sit only a couple dozen raw
//     characters apart despite being two unrelated strings, so a flat
//     whole-file character window over-joins them into a false positive.
//
// The fix: join consecutive lines into one logical unit UNLESS a line looks
// like the end of a code token (trailing `,` `;` `{` `}` `(` `>`) or the next
// line looks like the start of one (a JSX tag/expression, an `identifier: "`
// object field, a keyword, or a comment). Plain prose — the only place a real
// sentence spans multiple source lines here — has neither, so it merges into
// one unit; adjacent-but-distinct string fields always end in a boundary
// character and stay separate.
function isBlank(s) {
  return s.trim() === "";
}

function isHardBoundaryEnd(trimmedLine) {
  if (isBlank(trimmedLine)) return true;
  return /[,;{}()>]\s*$/.test(trimmedLine);
}

function isHardBoundaryStart(trimmedLine) {
  if (isBlank(trimmedLine)) return true;
  return (
    /^[<{}]/.test(trimmedLine) ||
    /^[a-zA-Z_$][\w$]*\s*:\s*["'`]/.test(trimmedLine) || // object-literal field
    /^(const|let|var|export|import|return)\b/.test(trimmedLine) ||
    /^(\/\/|\/\*|\*)/.test(trimmedLine)
  );
}

function buildLogicalUnits(rawText) {
  const rawLines = rawText.split(/\r?\n/);
  const units = [];
  let parts = [];

  const flush = () => {
    if (parts.length === 0) return;
    units.push({ text: parts.map((p) => p.text).join(" "), parts });
    parts = [];
  };

  for (let i = 0; i < rawLines.length; i++) {
    const trimmed = rawLines[i].trim();
    if (isBlank(trimmed)) {
      flush();
      continue;
    }
    parts.push({ line: i + 1, text: trimmed });
    const nextTrimmed = (rawLines[i + 1] ?? "").trim();
    if (isHardBoundaryEnd(trimmed) || isHardBoundaryStart(nextTrimmed)) {
      flush();
    }
  }
  flush();
  return units;
}

// Map a character offset inside a unit's joined `text` back to the original
// source line it came from.
function lineForOffset(unit, offset) {
  let cursor = 0;
  for (const part of unit.parts) {
    const end = cursor + part.text.length;
    if (offset <= end) return part.line;
    cursor = end + 1; // +1 for the single-space join separator
  }
  return unit.parts[unit.parts.length - 1].line;
}

// ── 3. Detection ────────────────────────────────────────────────────────────
//
// Trigger: a "largest ... local ... association" superlative, in English or
// Spanish, in either attested word order. Deliberately narrower than a bare
// "largest ... association" match so it does NOT catch the sourced,
// MLS-as-subject phrasings this script must leave alone:
//   - "third-largest MLS in the United States"        (no "local", no "association")
//   - "the largest MLS owned by a single U.S. Realtor association" (the word
//     between "largest" and "association" is "MLS owned by...", not "local")
const MLS_WORD = /\bMLS\b/g;

const TRIGGERS = [
  // "world's largest local Realtor(s)? association" / "largest local REALTOR® association" (no "world's")
  /\b(?:world[''’]s\s+)?largest\s+local\s+realtors?\s*®?\s*association/gi,
  // "la mayor asociación local de REALTORS® (del mundo)"
  /\bmayor\s+asociaci[oó]n\s+local\s+de\s+realtors?\s*®?(?:\s+del\s+mundo)?/gi,
  // "la asociación local de REALTORS® más grande (del mundo)"
  /\basociaci[oó]n\s+local\s+de\s+realtors?\s*®?\s+m[aá]s\s+grande(?:\s+del\s+mundo)?/gi,
];

const WINDOW = 60; // characters "MLS" must precede the trigger phrase within

// Being within WINDOW characters isn't enough by itself — "MLS operated by
// the Miami and South Florida REALTORS® — the world's largest ..." also has
// "MLS" ~55 characters before the trigger, but MLS is no longer what the
// trigger describes; "the Miami and South Florida REALTORS®" is. So beyond
// proximity, require that nothing between "MLS" and the trigger names a
// different, competing entity: no sentence break, and no new capitalized
// head noun (a brand/org word — "REALTORS®", "Asociación", "Association",
// "Operated", ...) introduced in the gap. Plain geography words are exempt
// ("Miami", "South", "Florida", "Sur") because they're part of the MLS's own
// compound name too ("the Miami ... MLS") and merely say which MLS, not a
// competing subject — e.g. "MLS de Miami y Sur de Florida — la mayor
// asociación ..." is still a real offender despite naming Miami and Florida.
// A bare copula/dash/comma/"the"/geography gap (the shape of every real
// offender found in this codebase) has no disqualifying word, so it still
// flags correctly.
const SAFE_NAME_WORDS = new Set(["Miami", "South", "Florida", "Sur", "And"]);

function isDirectMlsAntecedent(gapText) {
  if (/[.!?]/.test(gapText)) return false; // never treat MLS from a prior sentence as the antecedent
  const words = gapText
    .replace(/[—–\-,·:]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.every((w) => {
    if (!/^[A-Z]/.test(w)) return true; // lowercase connector word — fine
    return SAFE_NAME_WORDS.has(w.replace(/[^A-Za-z]/g, ""));
  });
}

const violations = [];

for (const file of targetFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file).split(path.sep).join("/");
  const units = buildLogicalUnits(raw);

  for (const unit of units) {
    for (const trigger of TRIGGERS) {
      trigger.lastIndex = 0;
      let match;
      while ((match = trigger.exec(unit.text)) !== null) {
        const triggerStart = match.index;
        const windowStart = Math.max(0, triggerStart - WINDOW);
        const before = unit.text.slice(windowStart, triggerStart);

        MLS_WORD.lastIndex = 0;
        let mlsMatch;
        while ((mlsMatch = MLS_WORD.exec(before)) !== null) {
          const gap = before.slice(mlsMatch.index + mlsMatch[0].length);
          if (isDirectMlsAntecedent(gap)) {
            const mlsOffset = windowStart + mlsMatch.index;
            const line = lineForOffset(unit, mlsOffset);
            const snippetStart = Math.max(0, mlsOffset - 8);
            const snippetEnd = Math.min(unit.text.length, triggerStart + match[0].length + 8);
            const snippet = unit.text.slice(snippetStart, snippetEnd).trim();
            violations.push({ file: rel, line, snippet });
            break; // one report per trigger match is enough
          }
        }

        if (match[0].length === 0) trigger.lastIndex += 1; // defensive: never loop forever
      }
    }
  }
}

// ── 4. Report ────────────────────────────────────────────────────────────
const message =
  `Found ${violations.length} place(s) where "MLS" is the likely subject of a ` +
  `"world's largest local ... association" superlative — that claim belongs to ` +
  `the ASSOCIATION (Miami and South Florida REALTORS®), never to the MLS. See ` +
  `src/data/figures.json → mlsAssociationOwned.source. Re-attach the superlative ` +
  `to the association; if the MLS itself needs a descriptor, use the sourced ` +
  `"third-largest MLS in the United States" or "the largest MLS owned by a ` +
  `single U.S. Realtor association" instead.\n` +
  violations.map((v) => `  - ${v.file}:${v.line} — "...${v.snippet}..."`).join("\n");

assert.equal(violations.length, 0, message);

console.log(`Claims verification passed — swept ${targetFiles.length} files, no MLS/association superlative conflation found.`);
