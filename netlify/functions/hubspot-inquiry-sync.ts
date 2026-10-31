import { drainInquiries } from './_shared/hubspotQueue.mjs';
// Netlify's schedule configuration blocks direct URL invocation.
// The modern runtime supplies the complete Blobs context for strong reads.
export default async () => {
  const result = await drainInquiries();
  console.log('HubSpot inquiry sync', result);
  return Response.json(result);
};
