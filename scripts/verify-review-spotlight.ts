import assert from "node:assert/strict";
import {
  reviewWindow,
  shouldAutoAdvance,
  wrapReviewIndex,
} from "../src/components/reviews/reviewSpotlightModel";

assert.equal(wrapReviewIndex(-1, 5), 4);
assert.equal(wrapReviewIndex(5, 5), 0);
assert.deepEqual(reviewWindow(0, 5), { previous: 4, active: 0, next: 1 });
assert.deepEqual(reviewWindow(0, 1), { previous: 0, active: 0, next: 0 });
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: false }), true);
assert.equal(shouldAutoAdvance({ inView: false, paused: false, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: true, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: false, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: true }), false);

console.log("review spotlight model verified");
