import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  reviewWindow,
  shouldAutoAdvance,
  wrapReviewIndex,
} from "../src/components/reviews/reviewSpotlightModel";
import { REVIEWS } from "../src/data/reviews";
import { ReviewSpotlight } from "../src/components/reviews/ReviewSpotlight";

assert.equal(wrapReviewIndex(-1, 5), 4);
assert.equal(wrapReviewIndex(5, 5), 0);
assert.deepEqual(reviewWindow(0, 5), { previous: 4, active: 0, next: 1 });
assert.deepEqual(reviewWindow(0, 1), { previous: 0, active: 0, next: 0 });
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: false }), true);
assert.equal(shouldAutoAdvance({ inView: false, paused: false, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: true, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: false, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: true }), false);
assert.ok(REVIEWS.length >= 3, "spotlight requires at least three source reviews");
assert.ok(REVIEWS.every((review) => review.text.trim().length > 0));

const spotlightMarkup = renderToStaticMarkup(
  createElement(ReviewSpotlight, { reviews: REVIEWS }),
);
assert.match(spotlightMarkup, /<article[^>]*aria-live="polite"/);
assert.match(spotlightMarkup, /aria-label="Show previous review"/);
assert.match(spotlightMarkup, /aria-label="Show next review"/);

console.log("review spotlight model verified");
