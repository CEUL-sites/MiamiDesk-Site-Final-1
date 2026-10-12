import type { Handler } from '@netlify/functions';
import { syncConfigured } from './_shared/hubspotQueue.mjs';
export const handler: Handler = async (event) => ({
  statusCode: event.httpMethod === 'GET' ? 200 : 405,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify({ configured: syncConfigured(), processing: 'scheduled', marketingEnrollment: false }),
});
