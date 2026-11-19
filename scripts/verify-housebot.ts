// verify:housebot — House Bot copy, compliance and behaviour model.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BUBBLE_COPY,
  COMPLIANCE_FOOTER,
  UI_COPY,
  bubbleLine,
  canLookAgain,
  clipForLook,
  isDockSuppressedRoute,
  langForPath,
  lookDirectionFor,
  shouldRender3D,
} from "../src/components/housebot/houseBotModel.ts";

// Compliance footer is verbatim (CLAUDE.md rule 7).
assert.equal(COMPLIANCE_FOOTER, "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.");

const allCopy = [
  ...Object.values(BUBBLE_COPY.en),
  ...Object.values(BUBBLE_COPY.es),
  ...Object.values(UI_COPY.en),
  ...Object.values(UI_COPY.es),
] as string[];
const banned = /\b(dream|passionate|best|stunning|amazing|world-class|excited)\b|rare gem|!|\$69|69 billion|#1|largest|within 24|same day|guarantee|broker\b|Realtor\(R\)/i;
for (const line of allCopy) assert.ok(!banned.test(line), `banned wording in: ${line}`);
// No statistics in bubbles (rule 9 would require a displayed source).
for (const line of [...Object.values(BUBBLE_COPY.en), ...Object.values(BUBBLE_COPY.es)] as string[]) {
  assert.ok(!/\d/.test(line), `bubble line carries a figure without a displayed source: ${line}`);
}
// Every EN hero has a line; ES exists for every ES hero we mount.
for (const v of ["home", "sellers", "buyers", "globalDesk", "agents", "markets", "contact"] as const) assert.ok(bubbleLine(v, "en"));
for (const v of ["home", "sellers", "buyers", "globalDesk", "agents"] as const) assert.ok(bubbleLine(v, "es"));
assert.equal(UI_COPY.en.openLabel, "Open the Miami Desk AI assistant");

// Routing.
assert.equal(langForPath("/es/vender/"), "es");
assert.equal(langForPath("/sell-weston"), "en");
assert.ok(isDockSuppressedRoute("/thanks/seller"));
assert.ok(!isDockSuppressedRoute("/"));

// Rendering gate: poster unless desktop + motion + real browser + WebGL.
const ok = { desktop: true, reducedMotion: false, automated: false, webgl: true };
assert.ok(shouldRender3D(ok));
assert.ok(!shouldRender3D({ ...ok, desktop: false }));
assert.ok(!shouldRender3D({ ...ok, reducedMotion: true }));
assert.ok(!shouldRender3D({ ...ok, automated: true }));
assert.ok(!shouldRender3D({ ...ok, webgl: false }));

// Look gesture: far-left/right only, throttled to once per 4s.
assert.equal(lookDirectionFor(100, 800, 900), "left");
assert.equal(lookDirectionFor(1400, 800, 900), "right");
assert.equal(lookDirectionFor(850, 800, 900), null);
assert.ok(canLookAgain(1000, null));
assert.ok(!canLookAgain(4999, 1000));
assert.ok(canLookAgain(5000, 1000));
assert.equal(clipForLook("left"), "Look_Left");

// Source guards: one chat system, lazy three.js, capped DPR, no CDN HDR.
const stage = readFileSync("src/components/housebot/HouseBotStage.tsx", "utf8");
assert.match(stage, /lazy\(\(\) => import\("\.\/HouseBotCanvas"\)\)/);
const canvas = readFileSync("src/components/housebot/HouseBotCanvas.tsx", "utf8");
assert.match(canvas, /dpr=\{\[1, DPR_CAP\]\}/);
assert.ok(!/preset=/.test(canvas), "Environment presets fetch HDRs from a third-party CDN");
const dialog = readFileSync("src/components/housebot/MiamiDeskChatDialog.tsx", "utf8");
assert.match(dialog, /import\("\.\.\/IntelligenceDesk"\)/);
assert.ok(!/fetch\(/.test(dialog), "dialog must reuse AiPanel, not call ai-desk itself");
for (const f of ["src/pages/HomePage.tsx", "src/main.tsx"]) {
  assert.ok(!/from ["'](three|@react-three)/.test(readFileSync(f, "utf8")), `${f} must not import three.js eagerly`);
}

console.log("verify:housebot ✓ copy, compliance footer, render gate, look throttle, lazy-load guards");
