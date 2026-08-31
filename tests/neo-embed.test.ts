import assert from "node:assert/strict";
import test from "node:test";
import { shouldLoadNeoEmbed } from "../src/lib/neoEmbed";

test("NEO loader is suppressed during react-snap prerendering", () => {
  assert.equal(shouldLoadNeoEmbed("Mozilla/5.0 ReactSnap"), false);
  assert.equal(shouldLoadNeoEmbed("reactsnap"), false);
});

test("NEO loader runs in normal browsers", () => {
  assert.equal(shouldLoadNeoEmbed("Mozilla/5.0 Chrome/140.0 Safari/537.36"), true);
});
