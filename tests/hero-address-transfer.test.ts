import assert from "node:assert/strict";
import test, { after } from "node:test";
import { buildSync } from "esbuild";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const temporary = mkdtempSync(join(tmpdir(), "hero-address-transfer-"));
after(() => rmSync(temporary, { recursive: true, force: true }));

const harnessSource = `
import React, { useState } from "react";
import { Hero } from "./src/components/Hero";
import { HomepageConsultation } from "./src/components/HomepageConsultation";
import { HeroSellerForm, type HeroAddressTransfer } from "./src/components/HeroSellerForm";
import { captureAttribution } from "./src/lib/attribution";

export { React, Hero, HomepageConsultation, HeroSellerForm, captureAttribution };

export function ConnectedHeroAndConsultation() {
  const [addressTransfer, setAddressTransfer] = useState<HeroAddressTransfer | null>(null);
  function handleHeroAddressSubmit(address: string) {
    const trimmed = address.trim();
    if (!trimmed) return;
    setAddressTransfer((prev) => ({
      address: trimmed,
      seq: (prev?.seq ?? 0) + 1,
    }));
  }
  return (
    <div>
      <Hero onAddressSubmit={handleHeroAddressSubmit} />
      <HomepageConsultation
        initialAddress={addressTransfer?.address ?? ""}
        addressTransfer={addressTransfer}
      />
    </div>
  );
}
`;

const output = buildSync({
  stdin: {
    contents: harnessSource,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  write: false,
  define: { "import.meta.env": "{}" },
  loader: { ".css": "empty" },
});

const compiledPath = join(temporary, "hero-harness.cjs");
writeFileSync(compiledPath, output.outputFiles[0].contents);
const req = createRequire(import.meta.url);
const { React, ConnectedHeroAndConsultation, captureAttribution } = req(compiledPath);

interface MockElementNode {
  id?: string;
  name?: string;
  value: string;
  disabled: boolean;
  placeholder: string;
  style: Record<string, string>;
  focused: boolean;
  scrolledIntoView: boolean;
  focus: (opts?: { preventScroll?: boolean }) => void;
  scrollIntoView: (opts?: Record<string, unknown>) => void;
  querySelector: (selector: string) => MockElementNode | null;
}

interface VNode {
  type: unknown;
  props: Record<string, any>;
  path: string;
  children: VNode[];
}

function createInteractiveHarness() {
  const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  const instances = new Map<
    string,
    {
      hooks: any[];
      effects: Array<{ create: () => void | (() => void); deps?: unknown[]; cleanup?: (() => void) | void; queued: boolean }>;
    }
  >();

  const domElements = new Map<string, MockElementNode>();
  let activeFocusedNode: MockElementNode | null = null;
  let dirty = false;
  let rootTree: VNode | null = null;

  function getOrCreateDomNode(key: string, props: Record<string, any>): MockElementNode {
    let node = domElements.get(key);
    if (!node) {
      node = {
        id: props.id,
        name: props.name,
        value: typeof props.value === "string" ? props.value : "",
        disabled: Boolean(props.disabled),
        placeholder: props.placeholder ?? "",
        style: { ...(props.style ?? {}) },
        focused: false,
        scrolledIntoView: false,
        focus() {
          for (const el of domElements.values()) el.focused = false;
          node!.focused = true;
          activeFocusedNode = node!;
        },
        scrollIntoView() {
          node!.scrolledIntoView = true;
        },
        querySelector(selector: string) {
          if (selector === 'input[name="propertyAddress"]') {
            return domElements.get("input:name:propertyAddress") ?? null;
          }
          return null;
        },
      };
      domElements.set(key, node);
    }
    node.id = props.id;
    node.name = props.name;
    if (typeof props.value === "string") {
      node.value = props.value;
    }
    if (props.placeholder !== undefined && !node.disabled) {
      node.placeholder = props.placeholder;
    }
    return node;
  }

  function depsChanged(prev?: unknown[], next?: unknown[]) {
    if (!prev || !next) return true;
    if (prev.length !== next.length) return true;
    return prev.some((val, idx) => !Object.is(val, next[idx]));
  }

  function renderElement(element: any, path: string): VNode[] {
    if (element == null || typeof element === "boolean") return [];
    if (typeof element === "string" || typeof element === "number") {
      return [{ type: "#text", props: { text: String(element) }, path, children: [] }];
    }
    if (Array.isArray(element)) {
      return element.flatMap((child, idx) => renderElement(child, `${path}[${idx}]`));
    }
    if (typeof element.type === "function") {
      const compName = element.type.name || "Anon";
      const instanceKey = `${path}/${compName}`;
      let inst = instances.get(instanceKey);
      if (!inst) {
        inst = { hooks: [], effects: [] };
        instances.set(instanceKey, inst);
      }
      let hookIdx = 0;
      let effectIdx = 0;
      const prevDispatcher = internals.H;
      internals.H = {
        useState(initialState: any) {
          const idx = hookIdx++;
          if (idx >= inst!.hooks.length) {
            inst!.hooks.push(typeof initialState === "function" ? initialState() : initialState);
          }
          const setState = (updater: any) => {
            const current = inst!.hooks[idx];
            const next = typeof updater === "function" ? updater(current) : updater;
            if (!Object.is(current, next)) {
              inst!.hooks[idx] = next;
              dirty = true;
            }
          };
          return [inst!.hooks[idx], setState];
        },
        useRef(initialValue: any) {
          const idx = hookIdx++;
          if (idx >= inst!.hooks.length) {
            inst!.hooks.push({ current: initialValue });
          }
          return inst!.hooks[idx];
        },
        useId() {
          const idx = hookIdx++;
          if (idx >= inst!.hooks.length) {
            inst!.hooks.push(`id-${instanceKey.replace(/[^a-zA-Z0-9]/g, "_")}-${idx}`);
          }
          return inst!.hooks[idx];
        },
        useEffect(create: () => void | (() => void), deps?: unknown[]) {
          const idx = hookIdx++;
          const eIdx = effectIdx++;
          if (idx >= inst!.hooks.length) {
            const record = { create, deps, cleanup: undefined, queued: true };
            inst!.hooks.push(record);
            inst!.effects[eIdx] = record;
          } else {
            const record = inst!.hooks[idx];
            if (depsChanged(record.deps, deps)) {
              record.create = create;
              record.deps = deps;
              record.queued = true;
            }
            inst!.effects[eIdx] = record;
          }
        },
        useMemo(create: () => any, deps?: unknown[]) {
          const idx = hookIdx++;
          if (idx >= inst!.hooks.length || depsChanged(inst!.hooks[idx].deps, deps)) {
            inst!.hooks[idx] = { value: create(), deps };
          }
          return inst!.hooks[idx].value;
        },
        useCallback(cb: any, deps?: unknown[]) {
          const idx = hookIdx++;
          if (idx >= inst!.hooks.length || depsChanged(inst!.hooks[idx].deps, deps)) {
            inst!.hooks[idx] = { value: cb, deps };
          }
          return inst!.hooks[idx].value;
        },
      };
      let rendered: any;
      try {
        rendered = element.type(element.props ?? {});
      } finally {
        internals.H = prevDispatcher;
      }
      return renderElement(rendered, instanceKey);
    }

    const props = element.props ?? {};
    if (element.type === "div" && props.id === "list-here") {
      getOrCreateDomNode("id:list-here", props);
    }
    if (element.type === "input") {
      if (props.id) {
        const domNode = getOrCreateDomNode(`id:${props.id}`, props);
        if (props.ref && typeof props.ref === "object") props.ref.current = domNode;
      }
      if (props.name) {
        const domNode = getOrCreateDomNode(`input:name:${props.name}`, props);
        if (props.ref && typeof props.ref === "object") props.ref.current = domNode;
      }
    }
    const childNodes = renderElement(props.children, `${path}/${String(element.type)}`);
    return [{ type: element.type, props, path, children: childNodes }];
  }

  function flushEffects() {
    let ranEffect = false;
    for (const inst of instances.values()) {
      for (const eff of inst.effects) {
        if (eff && eff.queued) {
          eff.queued = false;
          if (typeof eff.cleanup === "function") eff.cleanup();
          eff.cleanup = eff.create();
          ranEffect = true;
        }
      }
    }
    return ranEffect;
  }

  function renderCycle() {
    let guard = 0;
    do {
      dirty = false;
      const nodes = renderElement(React.createElement(ConnectedHeroAndConsultation), "root");
      rootTree = { type: "root", props: {}, path: "root", children: nodes };
      flushEffects();
      guard += 1;
    } while (dirty && guard < 20);
  }

  function act(fn?: () => void | Promise<void>) {
    if (!fn) {
      renderCycle();
      return;
    }
    const res = fn();
    if (res && typeof (res as Promise<void>).then === "function") {
      return (res as Promise<void>).then(() => {
        renderCycle();
      });
    }
    renderCycle();
  }

  function findAll(predicate: (node: VNode) => boolean, start: VNode | null = rootTree): VNode[] {
    if (!start) return [];
    const out: VNode[] = [];
    if (predicate(start)) out.push(start);
    for (const child of start.children) {
      out.push(...findAll(predicate, child));
    }
    return out;
  }

  function textOf(node: VNode | null): string {
    if (!node) return "";
    if (node.type === "#text") return node.props.text ?? "";
    return node.children.map(textOf).join("");
  }

  renderCycle();

  return {
    act,
    findAll,
    textOf,
    domElements,
    getActiveFocusedNode: () => activeFocusedNode,
  };
}

function setupBrowserGlobals() {
  const dataLayer: Array<Record<string, unknown>> = [];
  const fetchCalls: Array<{ url: string; init?: RequestInit }> = [];
  let nextFetchStatus = 200;

  const storage = new Map<string, string>();
  storage.set("hp_cookie_consent", "accepted");

  const mockSessionStorage = {
    getItem: (k: string) => storage.get(`session:${k}`) ?? null,
    setItem: (k: string, v: string) => storage.set(`session:${k}`, v),
    removeItem: (k: string) => storage.delete(`session:${k}`),
  };
  const mockLocalStorage = {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => storage.set(k, v),
    removeItem: (k: string) => storage.delete(k),
  };

  const mockWindow: any = {
    location: {
      pathname: "/",
      search: "?utm_source=google&utm_medium=cpc&utm_campaign=soflo_sellers",
      href: "https://homesprofessional.com/?utm_source=google&utm_medium=cpc&utm_campaign=soflo_sellers",
      hostname: "homesprofessional.com",
    },
    innerWidth: 1440,
    dataLayer,
    sessionStorage: mockSessionStorage,
    localStorage: mockLocalStorage,
    matchMedia: (query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce") ? false : false,
      addEventListener() {},
      removeEventListener() {},
    }),
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    requestAnimationFrame: (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    },
  };

  Object.defineProperty(globalThis, "window", { value: mockWindow, configurable: true, writable: true });
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    value: mockWindow.requestAnimationFrame,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: (k: string) => storage.get(k) ?? null,
      setItem: (k: string, v: string) => storage.set(k, v),
      removeItem: (k: string) => storage.delete(k),
    },
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: {
      getItem: (k: string) => storage.get(`session:${k}`) ?? null,
      setItem: (k: string, v: string) => storage.set(`session:${k}`, v),
    },
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "navigator", {
    value: { webdriver: false, sendBeacon: null },
    configurable: true,
    writable: true,
  });

  return {
    dataLayer,
    fetchCalls,
    setNextFetchStatus(status: number) {
      nextFetchStatus = status;
    },
    bindDocument(domElements: Map<string, MockElementNode>) {
      Object.defineProperty(globalThis, "document", {
        value: {
          referrer: "https://www.google.com/",
          getElementById(id: string) {
            return domElements.get(`id:${id}`) ?? null;
          },
        },
        configurable: true,
        writable: true,
      });
      Object.defineProperty(globalThis, "fetch", {
        value: async (input: string | URL, init?: RequestInit) => {
          const url = String(input);
          fetchCalls.push({ url, init });
          return {
            ok: nextFetchStatus >= 200 && nextFetchStatus < 300,
            status: nextFetchStatus,
            text: async () => "ok",
            json: async () => ({ success: true }),
          } as Response;
        },
        configurable: true,
        writable: true,
      });
    },
  };
}

test("Hero -> HomepageConsultation -> HeroSellerForm interactive address transfer and submission cases 1-8", async () => {
  const env = setupBrowserGlobals();
  const h = createInteractiveHarness();
  env.bindDocument(h.domElements);
  captureAttribution();

  const getHeroInput = () => h.findAll((n) => n.type === "input" && n.props.id === "hero-quick-address")[0];
  const getHeroForm = () => h.findAll((n) => n.type === "form" && n.props.name !== "seller-hero")[0];
  const getConsultationForm = () => h.findAll((n) => n.type === "form" && n.props.name === "seller-hero")[0];
  const getConsultationInput = (name: string) =>
    h.findAll((n) => (n.type === "input" || n.type === "select") && n.props.name === name, getConsultationForm())[0];
  const getAlerts = (scope?: VNode) => h.findAll((n) => n.props?.role === "alert", scope);

  // ── Case 5: Blank hero submission produces useful validation; separate seller CTA opens empty consultation normally
  h.act(() => {
    getHeroInput().props.onChange({ target: { value: "   " } });
  });
  h.act(() => {
    getHeroForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(getHeroInput().props["aria-invalid"], true, "blank hero submit must mark input aria-invalid");
  assert.equal(
    h.textOf(getAlerts(getHeroForm())[0]),
    "Please enter your South Florida property address.",
    "blank hero submit must display accessible validation error",
  );
  assert.equal(getConsultationInput("propertyAddress").props.value, "", "blank hero submit must not alter consultation address");
  assert.equal(env.dataLayer.length, 0, "blank hero submit must not emit microconversion events");

  // Separate seller CTA ("Request a Private Seller Strategy") opens empty consultation normally
  const requestStrategyCta = h.findAll(
    (n) => n.type === "a" && h.textOf(n).includes("Request a Private Seller Strategy"),
  )[0];
  assert.ok(requestStrategyCta, "Request a Private Seller Strategy link must exist");
  h.act(() => {
    requestStrategyCta.props.onClick({ preventDefault() {} });
  });
  assert.equal(getConsultationInput("propertyAddress").props.value, "", "separate CTA keeps consultation empty");
  assert.equal(getAlerts(getConsultationForm()).length, 0, "separate CTA does not trigger consultation error");
  assert.equal(h.domElements.get("id:list-here")?.scrolledIntoView, true, "separate CTA scrolls to #list-here");
  assert.equal(h.getActiveFocusedNode()?.name, "propertyAddress", "separate CTA focuses consultation propertyAddress");

  // ── Case 1: Enter sample address in hero; activate Continue With My Property -> consultation shows exact trimmed address
  h.act(() => {
    getHeroInput().props.onChange({ target: { value: "  15951 SW 41 St, Weston, FL  " } });
  });
  assert.equal(getHeroInput().props["aria-invalid"], false, "typing clears hero validation error");
  h.act(() => {
    getHeroForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "15951 SW 41 St, Weston, FL",
    "consultation propertyAddress state must receive exact trimmed hero address",
  );
  assert.equal(h.getActiveFocusedNode()?.name, "propertyAddress", "hero submit focuses consultation propertyAddress");

  // ── Case 2: Continue to contact details; address survives rerenders and validation errors
  const step1ContinueBtn = h.findAll(
    (n) => n.type === "button" && n.props.type === "button" && h.textOf(n).includes("Continue"),
    getConsultationForm(),
  )[0];
  assert.ok(step1ContinueBtn, "Step 1 Continue button must be present");
  h.act(() => {
    step1ContinueBtn.props.onClick({ preventDefault() {} });
  });
  const progressText = h.textOf(
    h.findAll((n) => n.props?.className === "seller-form-progress", getConsultationForm())[0],
  );
  assert.equal(progressText, "Step 2 of 2 · How to reach you", "form advances to Step 2");

  // Trigger validation error on Step 2 (submit without name)
  await h.act(async () => {
    await getConsultationForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(
    h.textOf(getAlerts(getConsultationForm())[0]),
    "Please enter your full name",
    "missing name on Step 2 triggers validation alert",
  );
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "15951 SW 41 St, Weston, FL",
    "transferred address survives Step 2 validation error",
  );

  // ── Case 6: Back/edit-address behavior works + Google Places selection & manual fallback
  const changeAddressBtn = h.findAll(
    (n) => n.type === "button" && h.textOf(n) === "Change address",
    getConsultationForm(),
  )[0];
  assert.ok(changeAddressBtn, "Change address button must be available on Step 2");
  h.act(() => {
    changeAddressBtn.props.onClick();
  });
  assert.equal(
    h.textOf(h.findAll((n) => n.props?.className === "seller-form-progress", getConsultationForm())[0]),
    "Step 1 of 2 · Your property",
    "Change address returns form to Step 1",
  );
  assert.equal(h.getActiveFocusedNode()?.name, "propertyAddress", "Change address focuses propertyAddress input");

  // Test Google Places selection on consultation input when window.google.maps.places is available
  let placeChangedCb: (() => void) | null = null;
  (globalThis.window as any).google = {
    maps: {
      places: {
        Autocomplete: class {
          addListener(event: string, cb: () => void) {
            if (event === "place_changed") placeChangedCb = cb;
            return { remove() {} };
          }
          getPlace() {
            return { formatted_address: "3300 NE 188th St, Aventura, FL 33180, USA" };
          }
        },
      },
    },
  };
  h.act(() => {
    getConsultationInput("propertyAddress").props.onFocus();
  });
  assert.equal(typeof placeChangedCb, "function", "focusing consultation address initializes Google Places listener");
  h.act(() => {
    placeChangedCb!();
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "3300 NE 188th St, Aventura, FL 33180, USA",
    "Google Places selection updates consultation propertyAddress state",
  );

  // Advance back to Step 2
  h.act(() => {
    const btn = h.findAll(
      (n) => n.type === "button" && n.props.type === "button" && h.textOf(n).includes("Continue"),
      getConsultationForm(),
    )[0];
    btn.props.onClick({ preventDefault() {} });
  });

  // ── Case 3: Edit the address in the consultation form, then type contact details; neither is overwritten by stale hero value
  h.act(() => {
    getConsultationInput("propertyAddress").props.onChange({
      target: { value: "2800 Ponce de Leon Blvd, Coral Gables, FL" },
    });
    getConsultationInput("name").props.onChange({ target: { value: "Elena Navarro" } });
    getConsultationInput("phone").props.onChange({ target: { value: "+1 305-555-0192" } });
    getConsultationInput("email").props.onChange({ target: { value: "elena@example.com" } });
    getConsultationInput("city").props.onChange({ target: { value: "Miami-Dade County" } });
    getConsultationInput("timeline").props.onChange({ target: { value: "30–90 days" } });
    getConsultationInput("messagingConsent").props.onChange({ target: { checked: true } });
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "2800 Ponce de Leon Blvd, Coral Gables, FL",
    "consultation address edit must not be overwritten when typing contact details",
  );
  assert.equal(getConsultationInput("name").props.value, "Elena Navarro");
  assert.equal(getConsultationInput("phone").props.value, "+1 305-555-0192");
  assert.equal(getConsultationInput("email").props.value, "elena@example.com");
  assert.equal(getConsultationInput("messagingConsent").props.checked, true);

  // ── Case 4: Submit a different hero address, then re-submit the same hero address after a consultation edit; preserve unrelated fields
  h.act(() => {
    getHeroInput().props.onChange({ target: { value: "500 Brickell Key Dr, Miami, FL" } });
  });
  h.act(() => {
    getHeroForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "500 Brickell Key Dr, Miami, FL",
    "new hero address updates consultation form",
  );
  assert.equal(getConsultationInput("name").props.value, "Elena Navarro", "name preserved across hero transfer");
  assert.equal(getConsultationInput("phone").props.value, "+1 305-555-0192", "phone preserved across hero transfer");
  assert.equal(getConsultationInput("email").props.value, "elena@example.com", "email preserved across hero transfer");
  assert.equal(getConsultationInput("messagingConsent").props.checked, true, "consent preserved across hero transfer");

  // Edit consultation address again, then re-submit the SAME hero address ("500 Brickell Key Dr, Miami, FL")
  h.act(() => {
    getConsultationInput("propertyAddress").props.onChange({
      target: { value: "700 Las Olas Blvd, Fort Lauderdale, FL" },
    });
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "700 Las Olas Blvd, Fort Lauderdale, FL",
  );
  h.act(() => {
    getHeroForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "500 Brickell Key Dr, Miami, FL",
    "re-submitting the same hero address after a consultation edit must apply cleanly",
  );
  assert.equal(getConsultationInput("name").props.value, "Elena Navarro", "name still preserved");

  // ── Case 7: Failure/retry and final intercepted submission payload
  env.setNextFetchStatus(500);
  await h.act(async () => {
    await getConsultationForm().props.onSubmit({ preventDefault() {} });
  });
  assert.equal(
    h.textOf(getAlerts(getConsultationForm())[0]),
    "Couldn't send — please use WhatsApp or try again.",
    "failed submission displays retry message",
  );
  assert.equal(
    getConsultationInput("propertyAddress").props.value,
    "500 Brickell Key Dr, Miami, FL",
    "address survives network failure",
  );

  // Retry with 200 OK
  env.fetchCalls.length = 0;
  env.setNextFetchStatus(200);
  await h.act(async () => {
    await getConsultationForm().props.onSubmit({ preventDefault() {} });
  });

  // Verify intercepted submission payloads
  const netlifyPost = env.fetchCalls.find((c) => c.url === "/");
  assert.ok(netlifyPost, "must POST URL-encoded form data to /");
  const params = new URLSearchParams(String(netlifyPost.init?.body ?? ""));
  assert.equal(params.get("form-name"), "seller-hero");
  assert.equal(params.get("propertyAddress"), "500 Brickell Key Dr, Miami, FL");
  assert.equal(params.get("name"), "Elena Navarro");
  assert.equal(params.get("phone"), "+1 305-555-0192");
  assert.equal(params.get("email"), "elena@example.com");
  assert.equal(params.get("city"), "Miami-Dade County");
  assert.equal(params.get("timeline"), "30–90 days");
  assert.equal(params.get("messagingConsent"), "yes");
  assert.equal(params.get("sourcePage"), "homepage-consultation-en");
  assert.equal(params.get("utm_source"), "google");

  const directNotify = env.fetchCalls.find((c) => c.url === "/.netlify/functions/lead-notify");
  assert.ok(directNotify, "must POST backup notification to /.netlify/functions/lead-notify");
  const notifyPayload = JSON.parse(String(directNotify.init?.body ?? "{}"));
  assert.equal(notifyPayload.propertyAddress, "500 Brickell Key Dr, Miami, FL");
  assert.equal(notifyPayload.formName, "seller-hero");
  assert.equal(notifyPayload.sourcePage, "homepage-consultation-en");

  const ackCall = env.fetchCalls.find((c) => c.url === "/.netlify/functions/lead-acknowledgment");
  assert.ok(ackCall, "must POST to /.netlify/functions/lead-acknowledgment");

  // Verify success state rendered with Net Sheet download
  const fullText = h.textOf(
    h.findAll((n) => n.props?.id === "list-here")[0],
  );
  assert.match(fullText, /Our team will review your property\./);
  assert.match(fullText, /Download the Seller's Net Sheet/);

  // ── Case 8: Click/microconversion events remain distinct from actual lead events and contain NO personal data
  const microEvents = env.dataLayer.filter((e) => e.event === "hp_cta_click");
  const leadEvents = env.dataLayer.filter((e) => e.event === "generate_lead" || e.event === "form_submit_seller");
  assert.ok(microEvents.length >= 3, "hero CTA and address clicks must emit microconversion events");
  assert.equal(
    env.dataLayer.filter((e) => e.event === "generate_lead").length,
    1,
    "exactly one generate_lead conversion must fire on actual form submission",
  );
  const serializedEvents = JSON.stringify(env.dataLayer);
  for (const pii of [
    "15951 SW 41 St",
    "2800 Ponce de Leon",
    "500 Brickell Key Dr",
    "700 Las Olas Blvd",
    "Elena Navarro",
    "305-555-0192",
    "elena@example.com",
  ]) {
    assert.ok(!serializedEvents.includes(pii), `analytics events must never contain PII (${pii})`);
  }
});
