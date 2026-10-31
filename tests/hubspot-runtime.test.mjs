import test from 'node:test';
import assert from 'node:assert/strict';
import { setEnvironmentContext } from '@netlify/blobs';

const context = {
 siteID: 'test-site', deployID: 'test-deploy', token: 'test-only',
 edgeURL: 'https://edge.example.invalid',
 uncachedEdgeURL: 'https://origin.example.invalid',
};
function hostedRuntime(t, enabled = false) {
 const keys = ['NETLIFY_BLOBS_CONTEXT','HUBSPOT_SYNC_ENABLED','HUBSPOT_PRIVATE_APP_TOKEN','HUBSPOT_OWNER_ID','RESEND_API_KEY','GOOGLE_SHEETS_WEBHOOK_URL','CALLMEBOT_APIKEY','SELLER_NURTURE_ENABLED'];
 const previous = Object.fromEntries(keys.map(k => [k, process.env[k]]));
 Object.assign(process.env, {HUBSPOT_SYNC_ENABLED:String(enabled), HUBSPOT_PRIVATE_APP_TOKEN:'test-only', HUBSPOT_OWNER_ID:'100759119', RESEND_API_KEY:'', GOOGLE_SHEETS_WEBHOOK_URL:'', CALLMEBOT_APIKEY:'', SELLER_NURTURE_ENABLED:'false'});
 setEnvironmentContext(context);
 const requests = [];
 const mocked = t.mock.method(globalThis, 'fetch', async (input, init = {}) => {
  const url = new URL(String(input)); const method = (init.method || 'GET').toUpperCase();
  assert.ok(['edge.example.invalid','origin.example.invalid'].includes(url.hostname), 'No external API or notification may be contacted in this test');
  requests.push({url,method,body:init.body});
  if (method === 'GET' && url.searchParams.has('prefix')) return Response.json({blobs:[],directories:[]});
  if (method === 'GET' || method === 'HEAD') return new Response(null,{status:404});
  if (method === 'PUT') return new Response(null,{status:200,headers:{etag:'"version-1"'}});
  throw new Error('Unexpected store operation: '+method);
 });
 t.after(() => { mocked.mock.restore(); for(const [k,v] of Object.entries(previous)) { if(v===undefined)delete process.env[k];else process.env[k]=v; } });
 return requests;
}
async function invoke(module, request, schedule = false) {
 if (typeof module.default === 'function') return module.default(request);
 // Reproduce the hosted legacy adapter: it receives only cached edge URL + token.
 const result = await module.handler({
  httpMethod:schedule?undefined:request.method,
  headers:{'x-nf-site-id':'test-site','x-nf-deploy-id':'test-deploy','x-nf-client-connection-ip':'127.0.0.1'},
  blobs:Buffer.from(JSON.stringify({url:context.edgeURL,token:context.token})).toString('base64'),
  queryStringParameters:Object.fromEntries(new URL(request.url).searchParams),
  body:request.method==='GET'?null:await request.text(),
 },{});
 return new Response(result.body,{status:result.statusCode,headers:result.headers});
}
test('hosted form event retains automatic strong-read context and persists all supplied fields', async t => {
 const requests = hostedRuntime(t);
 const module = await import('../netlify/functions/submission-created.ts');
 const response = await invoke(module,new Request('https://site.example.invalid/submission-created',{method:'POST',body:JSON.stringify({payload:{id:'runtime-inquiry',form_name:'seller-consultation',data:{name:'Runtime Test',email:'test@example.invalid',message:'Keep the complete message',extraField:'Retain this field too'}}})}));
 assert.equal(response.status,200,'A valid hosted form event must be durably queued');
 const write = requests.find(r=>r.method==='PUT'&&decodeURIComponent(r.url.pathname).includes('hubspot-inquiries')&&decodeURIComponent(r.url.pathname).includes('/pending/'));
 assert.ok(write,'Missing durable inquiry');
 const job=JSON.parse(write.body);
 assert.equal(job.fields.message,'Keep the complete message');
 assert.equal(job.fields.extraField,'Retain this field too');
 assert.ok(requests.filter(r=>decodeURIComponent(r.url.pathname).includes('hubspot-inquiries')).every(r=>r.url.hostname==='origin.example.invalid'));
});
test('scheduled processor can read its lease using the automatic uncached storage context', async t => {
 const requests=hostedRuntime(t,true);
 const module=await import('../netlify/functions/hubspot-inquiry-sync.ts');
 let response;
 await assert.doesNotReject(async()=>{response=await invoke(module,new Request('https://site.example.invalid/scheduled',{method:'POST',body:'{"next_run":"2026-10-31T00:01:00Z"}'}),true);},'Scheduled processing must not lose its uncached storage endpoint');
 assert.equal(response.status,200);
 assert.deepEqual(await response.json(),{status:'processed',processed:0,review:0,failed:0});
 assert.ok(requests.length>0);
 assert.ok(requests.every(r=>r.url.hostname==='origin.example.invalid'));
});
test('delivery status can read the same strongly consistent queue without revealing lead data', async t => {
 hostedRuntime(t);
 const module=await import('../netlify/functions/hubspot-status.ts');
 const response=await invoke(module,new Request('https://site.example.invalid/hubspot-status?check=delivery'));
 assert.equal(response.status,200);
 const body=await response.json();
 assert.equal(body.delivery.storage,undefined,'The queue must remain readable in hosted functions');
 assert.equal(body.delivery.pending,false);
 assert.equal(body.delivery.synced,false);
 assert.equal(body.marketingEnrollment,false);
 assert.ok(!JSON.stringify(body).includes('test-only'));
});
