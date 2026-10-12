import { connectLambda } from '@netlify/blobs';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { drainInquiries } from './_shared/hubspotQueue.mjs';
// Schedule-only processor: direct requests cannot invoke CRM writes.
export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod) return { statusCode: 405, body: 'Schedule only' };
  connectLambda(event as HandlerEvent & Parameters<typeof connectLambda>[0]);
  const result = await drainInquiries();
  console.log('HubSpot inquiry sync', result);
  return { statusCode: 200, body: JSON.stringify(result) };
};
