import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const IDX_DISCLAIMER =
  "Listing information is provided in part by the Miami and South Florida REALTORS® " +
  "and/or BeachesMLS via IDX. Information is deemed reliable but not guaranteed and is " +
  "subject to change without notice. Verify all information before making real estate decisions.";

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const store = getStore("market-feed");
    const data = await store.get("weston-sfr-850k-1200k", { type: "json" });

    if (data === null) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
        body: JSON.stringify({
          value: [],
          lastUpdated: null,
          stale: true,
          message:
            "Market feed temporarily unavailable. Request a private property review.",
          disclaimer: IDX_DISCLAIMER,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
      body: JSON.stringify({
        value: (data as { value: unknown[] }).value ?? [],
        lastUpdated: (data as { lastUpdated: string }).lastUpdated ?? null,
        listingCount: (data as { listingCount: number }).listingCount ?? 0,
        stale: false,
        disclaimer: IDX_DISCLAIMER,
      }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: message }),
    };
  }
};
