import assert from "node:assert/strict";
import { test } from "node:test";
import { trackMicroConversion } from "../src/lib/analytics";

test("micro-conversions respect declined consent and initialize an allowed dataLayer", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  let consent = "declined";
  const browser: { dataLayer?: Record<string, unknown>[] } = { dataLayer: [] };
  Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true, value: { getItem: () => consent },
  });
  try {
    trackMicroConversion("hp_cta_click", { location: "journal" });
    assert.deepEqual(browser.dataLayer, []);
    consent = "accepted";
    delete browser.dataLayer;
    trackMicroConversion("hp_cta_click", { location: "journal" });
    assert.deepEqual(browser.dataLayer, [{ event: "hp_cta_click", location: "journal" }]);
    delete (globalThis as { window?: unknown }).window;
    assert.doesNotThrow(() => trackMicroConversion("hp_cta_click", {}));
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else delete (globalThis as { window?: unknown }).window;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else delete (globalThis as { localStorage?: unknown }).localStorage;
  }
});
