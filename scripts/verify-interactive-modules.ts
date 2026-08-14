import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { globSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FaqAccordion } from "../src/components/FaqAccordion";
import { SellerExecutionSystem } from "../src/components/SellerExecutionSystem";
import {
  deckLayer,
  deckPosition,
  nextStage,
  previousStage,
  shouldAutoAdvance,
} from "../src/components/listingStageDeckModel";
import { countEase, formatFigure, parseFigure } from "../src/components/countUpModel";

/* ── Stage deck geometry ─────────────────────────────────────────────────── */

assert.equal(deckPosition(0, 0, 4), 0, "the active card is the front card");
assert.equal(deckPosition(3, 0, 4), 3, "the last card sits at the back of a fresh deck");
assert.equal(
  deckPosition(0, 3, 4),
  1,
  "positions wrap — advancing past the last stage sends the front card to the back rather than emptying the deck",
);
assert.equal(deckPosition(2, 3, 4), 3, "a card already passed wraps to the back");
assert.equal(deckPosition(0, 0, 0), 0, "an empty deck must not divide by zero");

assert.equal(deckLayer(0).opacity, 1, "the front card is fully opaque");
assert.equal(deckLayer(0).lift, 0, "the front card is not offset");
assert.ok(deckLayer(1).scale < deckLayer(0).scale, "cards behind recede");
assert.ok(deckLayer(1).z < deckLayer(0).z, "the front card stacks above the rest");
assert.ok(
  deckLayer(9).opacity >= 0.24,
  "depth is clamped so a far card never fades to an invisible smear",
);

assert.equal(nextStage(3, 4), 0, "next wraps at the end");
assert.equal(previousStage(0, 4), 3, "previous wraps at the start");
assert.equal(nextStage(0, 0), 0, "next is safe on an empty deck");
assert.equal(previousStage(0, 0), 0, "previous is safe on an empty deck");

assert.equal(
  shouldAutoAdvance({ inView: true, engaged: false, reducedMotion: false }),
  true,
  "an untouched deck in view advances on its own",
);
assert.equal(
  shouldAutoAdvance({ inView: true, engaged: true, reducedMotion: false }),
  false,
  "auto-advance must stop for good once a visitor picks a stage — a card moving out from under a reader is worse than no motion at all",
);
assert.equal(
  shouldAutoAdvance({ inView: true, engaged: false, reducedMotion: true }),
  false,
  "reduced-motion visitors never get an auto-advancing deck",
);
assert.equal(
  shouldAutoAdvance({ inView: false, engaged: false, reducedMotion: false }),
  false,
  "an off-screen deck must not run a timer",
);

/* ── Verified-figure counters ────────────────────────────────────────────── */

for (const figure of ["93,000", "200+", "260+", "437+", "3,500+", "19", "75+"]) {
  const parsed = parseFigure(figure);
  assert.ok(parsed.animatable, `${figure} must be recognised by the counter`);
  assert.equal(
    formatFigure(parsed, parsed.value),
    figure,
    `the counter must land on ${figure} exactly as it is cited — grouping and suffix included`,
  );
}

const grouped = parseFigure("93,000");
assert.equal(grouped.value, 93000);
assert.equal(grouped.grouped, true);
assert.equal(formatFigure(grouped, 1234), "1,234", "a mid-count value keeps its thousands separators");

const plain = parseFigure("19");
assert.equal(plain.grouped, false);
assert.equal(formatFigure(plain, 7), "7", "an ungrouped figure must not gain separators mid-count");

const suffixed = parseFigure("437+");
assert.equal(suffixed.suffix, "+", "the qualifier stays attached while counting");
assert.equal(formatFigure(suffixed, 100), "100+");

const notANumber = parseFigure("Largest");
assert.equal(notANumber.animatable, false, "a non-numeric figure is never approximated");
assert.equal(formatFigure(notANumber, 0), "Largest", "a non-numeric figure renders verbatim");

assert.equal(countEase(0), 0);
assert.equal(countEase(1), 1);
assert.equal(countEase(2), 1, "easing is clamped past the end of the animation");
assert.equal(countEase(-1), 0, "easing is clamped before the start");

/* ── Static render: collapsed copy must survive prerendering ─────────────── */

// This is the whole bet of the redesign — progressive disclosure is only safe if
// react-snap still captures every word. Render the components the way the
// prerenderer will and check the text is actually in the markup.

const SAMPLE_FAQS = [
  { q: "First question rendered?", a: "First answer body that must survive collapse." },
  { q: "Second question rendered?", a: "Second answer body that must survive collapse." },
  { q: "Third question rendered?", a: "Third answer body that must survive collapse." },
];

const faqMarkup = renderToStaticMarkup(createElement(FaqAccordion, { faqs: SAMPLE_FAQS }));
for (const item of SAMPLE_FAQS) {
  assert.ok(
    faqMarkup.includes(item.q),
    `prerendered FAQ markup is missing the question "${item.q}"`,
  );
  assert.ok(
    faqMarkup.includes(item.a),
    `prerendered FAQ markup is missing the collapsed answer "${item.a}" — collapsing must never drop copy from the HTML`,
  );
}
assert.doesNotMatch(
  faqMarkup,
  /display:\s*none/,
  "collapsed answers must not be display:none in the prerendered markup",
);

// Same bet on the stage deck: only one card is legible at a time, but all four
// stages must be in the HTML.
const deckMarkup = renderToStaticMarkup(createElement(SellerExecutionSystem));
for (const copy of [
  "Price strategy, presentation, buyer profile, property narrative and launch timing.",
  "Identify and reach agents working with relevant buyers by location, property type and price range.",
  "Provide structured updates on showing activity, online engagement, buyer-agent response and competing inventory.",
  "Recommend changes from market evidence, property response and competitive movement",
]) {
  assert.ok(
    deckMarkup.includes(copy),
    `prerendered deck markup is missing a stage: "${copy.slice(0, 48)}…"`,
  );
}
assert.equal(
  (deckMarkup.match(/role="tabpanel"/g) ?? []).length,
  4,
  "all four stage cards must be present in the markup, not just the front one",
);
assert.equal(
  (deckMarkup.match(/inert=""/g) ?? []).length,
  3,
  "the three cards behind the front card must render as inert so their content cannot take focus",
);

/* ── Source contracts ────────────────────────────────────────────────────── */

const [faq, deck, pathfinder, reel, distribution, countUp, home] = await Promise.all([
  readFile("src/components/FaqAccordion.tsx", "utf8"),
  readFile("src/components/SellerExecutionSystem.tsx", "utf8"),
  readFile("src/components/SellerPathfinder.tsx", "utf8"),
  readFile("src/components/MarketingReel3D.tsx", "utf8"),
  readFile("src/components/Distribution.tsx", "utf8"),
  readFile("src/components/CountUp.tsx", "utf8"),
  readFile("src/pages/HomePage.tsx", "utf8"),
]);

// The whole point of the accordion is that collapsing an answer must not remove
// it from the page. Collapse by animating grid rows, never by unmounting.
assert.match(
  faq,
  /grid-template-rows: 0fr/,
  "collapsed answers must stay in the DOM — collapse via grid-template-rows, not by unmounting",
);
assert.doesNotMatch(
  faq,
  /AnimatePresence/,
  "AnimatePresence unmounts the closed answer, which would hide it from crawlers and the prerendered HTML",
);
assert.match(faq, /aria-expanded=\{isOpen\}/, "each question must expose its state");
assert.match(faq, /aria-controls=/, "each question must point at the panel it controls");

// Every landing page must render the accordion, and none may keep the old
// always-expanded wall of text.
const landingPages = [
  ...globSync("src/pages/Sell*Page.tsx"),
  ...globSync("src/pages/es/EsVender*Page.tsx"),
];
let accordionPages = 0;
for (const file of landingPages) {
  const src = await readFile(file, "utf8");
  assert.doesNotMatch(
    src,
    /divide-y divide-white\/8/,
    `${file} still renders the flat FAQ block — replace it with <FaqAccordion />`,
  );
  if (src.includes("<FaqAccordion")) {
    accordionPages += 1;
    assert.match(
      src,
      /import \{ FaqAccordion \}/,
      `${file} uses FaqAccordion without importing it`,
    );
  }
}
assert.ok(
  accordionPages >= 20,
  `expected the accordion on at least 20 landing pages, found ${accordionPages}`,
);

// The deck is a presentation change only. The four stages and their copy are
// the message and must survive any future restyling of this section.
for (const label of ["POSITION", "ACTIVATE", "REPORT", "ADJUST"]) {
  assert.match(deck, new RegExp(label), `the deck must retain the ${label} stage`);
}
assert.match(deck, /role="tablist"/, "the stage rail must be reachable as a tab list");
assert.match(deck, /inert: true/, "cards behind the front card must not be focusable");
assert.match(
  deck,
  /aria-hidden=\{!front\}/,
  "only the front card should be announced",
);

// Funnel events must stay behind consent and must never fire into the
// prerenderer, which would report a phantom visitor for every build.
assert.match(
  pathfinder,
  /navigator\.webdriver/,
  "pathfinder events must be suppressed during react-snap prerendering",
);
assert.match(
  pathfinder,
  /trackFunnelEvent/,
  "pathfinder events must go through the consent-gated funnel helper, not a raw dataLayer push",
);
assert.doesNotMatch(
  pathfinder,
  /window\.dataLayer/,
  "pathfinder must not push to dataLayer directly — that bypasses the cookie banner",
);
// Rule 2: no time-based promise anywhere in public copy.
assert.doesNotMatch(
  pathfinder,
  /\b(24 hours|same day|same-day|Day 1|within \d+ (hours|days))\b/i,
  "pathfinder copy must not contain a timeline promise",
);
assert.doesNotMatch(
  reel,
  /\b(24 hours|same day|same-day|Day 1|guarantee[ds]?)\b/i,
  "reel copy must not promise a timeline or an outcome",
);

// Every clip the reel offers must actually ship, with the still that stands in
// for it before playback.
const clips = [...reel.matchAll(/clip: "(\/videos\/[^"]+\.mp4)"/g)].map((m) => m[1]);
assert.ok(clips.length >= 4, `expected at least 4 reel clips, found ${clips.length}`);
for (const clip of clips) {
  assert.ok(existsSync(`public${clip}`), `reel clip ${clip} is missing from public/videos`);
  const poster = `public${clip.replace("/videos/", "/images/posters/").replace(".mp4", ".jpg")}`;
  assert.ok(existsSync(poster), `reel clip ${clip} has no poster at ${poster}`);
}

// A figure captured mid-count would bake a wrong number into the static HTML.
assert.match(
  countUp,
  /navigator\.webdriver/,
  "the counter must not animate during prerendering — a snapshot mid-count would ship a wrong figure",
);
assert.match(
  countUp,
  /useState\(value\)/,
  "the counter must render its final, exact figure on first paint",
);
// `display` is seeded from `value` only at mount, so a figure that changes
// afterwards would keep rendering the old one unless the effect resyncs it.
assert.match(
  countUp,
  /done\.current = false;\s*\n\s*setDisplay\(value\);/,
  "the counter must reset and resync when its figure changes, or it will render a stale number",
);

// The reach figure and the fine print.
assert.match(distribution, /<ReachFlow3D/, "Distribution must render the reach figure");

// Compliance rule 3, enforced against the motion design rather than the copy.
// A dot travelling from "Your listing" into a card labelled 93,000 reads as a
// notification being delivered — the framing the rule prohibits — and a signal
// arriving at every stage on a loop also implies the universal reach the
// eligibility terms disclaim. The figure may connect its stages; nothing may
// travel between them.
const reachFlow = await readFile("src/components/ReachFlow3D.tsx", "utf8");
assert.doesNotMatch(
  reachFlow,
  /rf-travel|rf-dot/,
  "the reach figure must not animate anything travelling between its stages (compliance rule 3)",
);
assert.doesNotMatch(
  reachFlow,
  /@keyframes[^}]*\b(left|top):\s*100%/,
  "no keyframe may move an element across the reach figure's connectors",
);
// Rule 9: the figure prints statistics ("75+ countries" among them) that the
// surrounding section does not necessarily cite, so it must carry its own
// sources and must not delegate them to whatever renders it.
assert.match(
  reachFlow,
  /Sources:/,
  "the reach figure must display sources for the statistics it renders (compliance rule 9)",
);
for (const source of ["Miami and South Florida REALTORS", "Global Council"]) {
  assert.ok(
    reachFlow.includes(source),
    `the reach figure's source line must credit ${source}`,
  );
}
assert.match(
  distribution,
  /<details/,
  "the eligibility paragraph belongs in a disclosure, not as body copy",
);
assert.match(
  distribution,
  /Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability\./,
  "the eligibility terms must remain on the page verbatim",
);

// Homepage placement, and the bundle discipline that protects the LCP budget.
for (const section of ["<MarketingReel3D />", "<SellerPathfinder />"]) {
  assert.ok(home.includes(section), `the homepage must render ${section}`);
}
for (const mod of ["MarketingReel3D", "SellerPathfinder"]) {
  assert.match(
    home,
    new RegExp(`const ${mod} = lazy\\(`),
    `${mod} must be lazily imported — only the hero belongs in the homepage's initial bundle`,
  );
}
assert.ok(
  home.indexOf("<Proof />") < home.indexOf("<MarketingReel3D />"),
  "the reel follows the review section",
);
assert.ok(
  home.indexOf("<MarketPulse />") < home.indexOf("<SellerPathfinder />"),
  "the pathfinder catches visitors who reached the end of the page",
);

/* ── EN/ES parity ────────────────────────────────────────────────────────── */

// Adding these two modules to the English homepage and not the Spanish one
// leaves /es materially worse than /, which is the gap this asserts shut.
const esHome = await readFile("src/pages/es/EsHomePage.tsx", "utf8");
for (const mod of ["MarketingReel3D", "SellerPathfinder"]) {
  assert.match(
    esHome,
    new RegExp(`<${mod} lang="es"`),
    `the Spanish homepage must render ${mod} in Spanish — the English homepage has it`,
  );
  assert.match(
    esHome,
    new RegExp(`const ${mod} = lazy\\(`),
    `${mod} must be lazily imported on the Spanish homepage too`,
  );
}

// /es is a Spain-market route. A Spanish prospect must never be handed the US
// number, and the component defaults to it, so the call site has to say so.
assert.match(
  esHome,
  /<SellerPathfinder lang="es" whatsappHref=\{CONTACT\.whatsappSpain\}/,
  "the Spanish homepage pathfinder must answer on the Spain line, not the US default",
);
assert.match(
  esHome,
  /id="list-here"/,
  'the Spanish homepage needs the #list-here anchor: the sticky CTA resolves it first, and the pathfinder\'s seller route targets it',
);

// Every bilingual string must exist in both languages, or one language renders
// `undefined` where copy should be.
for (const [file, label] of [
  ["src/components/MarketingReel3D.tsx", "reel"],
  ["src/components/SellerPathfinder.tsx", "pathfinder"],
] as const) {
  const src = await readFile(file, "utf8");
  const en = (src.match(/^\s*en: \{/gm) ?? []).length;
  const es = (src.match(/^\s*es: \{/gm) ?? []).length;
  assert.ok(en > 0, `${label} must define English copy blocks`);
  assert.equal(en, es, `${label} has ${en} en blocks and ${es} es blocks — every entry needs both`);
}

console.log("interactive modules verified");
