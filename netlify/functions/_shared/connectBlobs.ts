import { connectLambda } from "@netlify/blobs";

/**
 * Lambda-style handlers (`export const handler`) do not get the Netlify Blobs
 * context automatically; without this call every `getStore()` throws
 * "The environment has not been configured to use Netlify Blobs". That took
 * /market-feed down with a 500 and silently disabled lead de-duplication and
 * the dead-letter store in lead-notify.
 *
 * Never throws: a missing context (local dev, unit tests) must not stop a
 * handler — least of all the lead alert path.
 */
export function connectBlobs(event: unknown): void {
  try {
    connectLambda(event as Parameters<typeof connectLambda>[0]);
  } catch {
    // No Blobs context on this invocation; callers already degrade without it.
  }
}
