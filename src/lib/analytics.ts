type EventPayload = Record<string, unknown>;

export function pushEvent(eventName: string, payload?: EventPayload): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}
