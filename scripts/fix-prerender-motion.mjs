// react-snap snapshots the DOM in whatever state it happens to be in when
// puppeteer captures it — which, for framer-motion entry animations, is the
// *pre*-animation state: inline `style="opacity:0;transform:translateY(22px)"`.
// Until client JS hydrates and framer-motion runs, that's exactly what
// visitors without JS (and some crawlers) see: invisible headlines and CTAs.
//
// This script walks the built dist/ output and, for every inline style that
// combines an `opacity:0` declaration with a `transform` containing a
// translate*() function, removes the opacity:0 declaration and strips just
// the translate*() function(s) from the transform (keeping any other
// transform functions, e.g. scale()/rotate()). Everything else in the style
// attribute is left untouched.
//
// Styles with `opacity:0` but NO translate transform (e.g. crossfading
// <video> layers, decorative scale-only reveals) are intentionally left
// alone — those are legitimate runtime-only visual states, not react-snap
// snapshot artifacts.
//
// Wired into the build: package.json postbuild runs this after react-snap.
//
// Usage: node scripts/fix-prerender-motion.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, 'dist');

function findHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const TRANSLATE_FN = /^translate(x|y|z|3d)?$/i;
const OPACITY_ZERO = /^0(\.0+)?$/;

// Inline styles here never contain a literal ';' inside a function's args
// (clamp/rgba/radial-gradient all use commas), so splitting on ';' is safe.
function splitDeclarations(style) {
  return style
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean);
}

function splitDecl(decl) {
  const idx = decl.indexOf(':');
  if (idx === -1) return null;
  return { prop: decl.slice(0, idx).trim(), value: decl.slice(idx + 1).trim() };
}

// Returns the fixed style string, or null if this style attribute doesn't
// qualify (no opacity:0, or no translate transform) and should be left as-is.
function fixStyleValue(style) {
  const decls = splitDeclarations(style);

  const hasOpacityZero = decls.some((d) => {
    const parsed = splitDecl(d);
    return parsed && parsed.prop.toLowerCase() === 'opacity' && OPACITY_ZERO.test(parsed.value);
  });
  if (!hasOpacityZero) return null;

  const declHasTranslate = (value) => {
    const fns = [...value.matchAll(/([a-zA-Z0-9_-]+)\s*\(/g)].map((m) => m[1]);
    return fns.some((fn) => TRANSLATE_FN.test(fn));
  };

  const hasTranslateTransform = decls.some((d) => {
    const parsed = splitDecl(d);
    return parsed && parsed.prop.toLowerCase() === 'transform' && declHasTranslate(parsed.value);
  });
  if (!hasTranslateTransform) return null;

  const nextDecls = [];
  for (const d of decls) {
    const parsed = splitDecl(d);
    if (!parsed) {
      nextDecls.push(d);
      continue;
    }
    const { prop, value } = parsed;
    const lowerProp = prop.toLowerCase();

    if (lowerProp === 'opacity' && OPACITY_ZERO.test(value)) {
      continue; // drop the opacity:0 declaration
    }

    if (lowerProp === 'transform' && declHasTranslate(value)) {
      // Keep only non-translate functions (e.g. scale(), rotate(), skew()).
      const fnRegex = /([a-zA-Z0-9_-]+)\s*\(([^)]*)\)/g;
      const kept = [];
      let m;
      while ((m = fnRegex.exec(value))) {
        const [, fn, args] = m;
        if (TRANSLATE_FN.test(fn)) continue;
        kept.push(`${fn}(${args})`);
      }
      if (kept.length > 0) {
        nextDecls.push(`transform:${kept.join(' ')}`);
      }
      // else: transform is now empty — drop the declaration entirely.
      continue;
    }

    nextDecls.push(d);
  }

  return nextDecls.join(';');
}

function fixHtml(html) {
  let fixedCount = 0;
  const result = html.replace(/style="([^"]*)"/g, (full, styleValue) => {
    const decoded = styleValue.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    const fixed = fixStyleValue(decoded);
    if (fixed === null) return full;
    fixedCount++;
    const encoded = fixed.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `style="${encoded}"`;
  });
  return { result, fixedCount };
}

if (!fs.existsSync(distDir)) {
  console.error(`fix-prerender-motion: dist/ not found at ${distDir} — run the build first.`);
  process.exit(1);
}

const files = findHtmlFiles(distDir);
let filesModified = 0;
let totalFixed = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const { result, fixedCount } = fixHtml(html);
  if (fixedCount > 0) {
    fs.writeFileSync(file, result);
    filesModified++;
    totalFixed += fixedCount;
  }
}

console.log(`fix-prerender-motion: modified ${filesModified} file(s), fixed ${totalFixed} element(s).`);
