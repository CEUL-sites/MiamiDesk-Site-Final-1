import { connectLambda } from "@netlify/blobs";
import type { HandlerEvent } from "@netlify/functions";

/** Legacy Lambda handlers must initialize the platform-supplied Blobs context. */
export function connectLeadStorage(event: HandlerEvent): void {
  const blobs = (event as HandlerEvent & { blobs?: string }).blobs;
  if (blobs) connectLambda({ blobs, headers: event.headers as Record<string, string> });
}

/** Preview tests use an explicit namespace instead of production lead stores. */
export function leadStoreName(name: string): string {
  const suffix = process.env.LEAD_STORE_NAMESPACE || "";
  if (!suffix) return name;
  if (!/^[a-z0-9-]{1,24}$/.test(suffix)) throw new Error("Invalid lead storage namespace");
  return `${name}-${suffix}`;
}
