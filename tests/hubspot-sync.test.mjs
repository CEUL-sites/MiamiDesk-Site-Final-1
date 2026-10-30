import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyInquiry, buildContactProperties, makeJob, syncJob, HubSpotClient, PROPERTY_DEFINITIONS, inquiryNote } from '../netlify/functions/_shared/hubspotSync.mjs';

test('every contactable form has a category; address-only stage is excluded', () => {
  for (const f of ['seller-hero','seller-intake','seller-consultation']) assert.equal(classifyInquiry(f,{}),'south_florida_seller');
  assert.equal(classifyInquiry('buyer-mandate',{}),'buyer');
  assert.equal(classifyInquiry('referral-intake-es',{}),'referral_partner');
  assert.equal(classifyInquiry('agency-partner-intake',{}),'agency_developer');
  assert.equal(classifyInquiry('global-desk-listing',{submitterType:'agency'}),'agency_developer');
  assert.equal(classifyInquiry('spain-seller',{}),'international_owner');
  assert.equal(classifyInquiry('lead-magnet-download',{}),'guide_request');
  assert.equal(makeJob('seller-valuation-step1',{propertyAddress:'123 Main'},'stage'),null);
  assert.equal(makeJob('unknown',{email:'a@example.com'},'unknown'),null);
});
test('contact intent preserves desk and classifies each inquiry without seller fallback', () => {
 for (const [desk, category] of [['buyer','buyer'], ['referral','referral_partner'], ['global','international_owner'], ['spain-agency','agency_developer'], ['spain-developer','agency_developer']]) {
  const job = makeJob('seller-consultation', {email:'intent@example.com', desk}, `contact-${desk}`);
  assert.equal(job.category, category);
  assert.equal(job.fields.desk, desk);
 }
 assert.equal(classifyInquiry('seller-consultation', {}), 'south_florida_seller');
});
test('partner aliases, complete attribution, and repeated inquiry identity are retained',()=>{
 const j=makeJob('agency-partner-intake',{agentName:'Ana',whatsapp:'+34 600 111 222',utm_source:'linkedin',consent:'yes'},'one');
 assert.equal(j.fields.name,'Ana'); assert.equal(j.fields.phone,'+34 600 111 222');
 assert.equal(j.fields.utm_source,'linkedin'); assert.equal(j.fields.consent,'yes');
 assert.notEqual(j.key,makeJob('agency-partner-intake',j.fields,'two').key);
 assert.equal(j.key,makeJob('agency-partner-intake',j.fields,'one').key);
});
test('existing identity, owner, lifecycle, first source and opted-out state are preserved',()=>{
 const j=makeJob('seller-hero',{name:'Changed Name',email:'a@example.com',phone:'+19545550101',city:'Weston',messagingConsent:'yes',utm_source:'google'},'x');
 const p=buildContactProperties(j,{firstname:'Original',phone:'old',hubspot_owner_id:'someone',lifecyclestage:'customer',hp_first_source:'referral',hp_inquiry_categories:'referral_partner'},'owner');
 assert.equal(p.firstname,undefined); assert.equal(p.phone,undefined); assert.equal(p.hubspot_owner_id,undefined); assert.equal(p.lifecyclestage,undefined);
 assert.equal(p.hp_first_source,undefined); assert.equal(p.hs_email_optout,undefined); assert.equal(p.hs_marketable_status,undefined);
 assert.equal(p.hp_inquiry_categories,'referral_partner;south_florida_seller');
 assert.equal(p.hp_latest_source,'google');
});
test('only declared inquiry fields map to properties; raw HTML never becomes note markup',async()=>{
 const j=makeJob('seller-hero',{name:'<script>x</script>',email:'a@example.com',extra:'all retained'},'html');
 const calls=[]; const api={findContact:async()=>null,createContact:async(p)=>{calls.push(p);return{id:'1'}},updateContact:async()=>{},createNote:async(p)=>{calls.push(p);return{id:'2'}},createTask:async()=>({id:'3'})};
 await syncJob(j,api,async()=>{},'owner');
 assert.ok(calls[1].hs_note_body.includes('&lt;script&gt;')); assert.ok(calls[1].hs_note_body.includes('extra'));
 assert.equal(j.status,'synced');
 const names=new Set(PROPERTY_DEFINITIONS.map(p=>p.name));
 for(const k of Object.keys(calls[0]).filter(k=>k.startsWith('hp_')))assert.ok(names.has(k));
});
test('partial failure resumes without creating another contact or note',async()=>{
 const j=makeJob('buyer-mandate',{email:'a@example.com'},'resume');let contacts=0,notes=0,tasks=0;
 const api={findContact:async()=>null,createContact:async()=>({id:String(++contacts)}),updateContact:async()=>{},createNote:async()=>({id:String(++notes)}),createTask:async()=>{tasks++;if(tasks===1)throw new Error('429');return{id:'3'}}};
 await assert.rejects(()=>syncJob(j,api,async()=>{},'owner'));
 await syncJob(j,api,async()=>{},'owner');assert.equal(contacts,1);assert.equal(notes,1);assert.equal(tasks,2);assert.equal(j.status,'synced');
 await syncJob(j,api,async()=>{},'owner');assert.equal(tasks,2);
});
test('ambiguous identity is held for review instead of merged or created',async()=>{
 const j=makeJob('seller-hero',{phone:'+19545550101'},'phone');let created=false;
 const api={findContact:async()=>{const e=new Error('Ambiguous phone');e.review=true;throw e},createContact:async()=>{created=true}};
 await assert.rejects(()=>syncJob(j,api,async()=>{},'owner'));assert.equal(created,false);
});
test('HTTP client rejects authorization, retries read throttles, and flags uncertain activity creation',async()=>{
 let n=0;const client=new HubSpotClient('secret',async()=>{n++;return new Response('{}',{status:n===1?429:200})},async()=>{});
 await client.request('/x');assert.equal(n,2);
 const bad=new HubSpotClient('secret',async()=>new Response('{}',{status:401}),async()=>{});
 await assert.rejects(()=>bad.request('/x'),/401/);
 const uncertain=new HubSpotClient('secret',async()=>{throw new Error('network')},async()=>{});
 await assert.rejects(()=>uncertain.request('/crm/v3/objects/notes','POST',{}),e=>e.review===true);
});

test('queue retains submissions while disabled; duplicate delivery does not reset completed work',async()=>{
 const {enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const data=new Map();const store={get:async k=>data.get(k)||null,setJSON:async(k,v,o)=>{if(o?.onlyIfNew&&data.has(k))return{modified:false};data.set(k,structuredClone(v));return{modified:true}}};
 const p={id:'submission',form_name:'seller-hero',data:{email:'a@example.com',propertyAddress:'123 Main'}};
 await enqueueSubmission(p,store);const key=[...data.keys()][0];const j=data.get(key);j.contactId='done';data.set(key,j);
 await enqueueSubmission(p,store);assert.equal(data.size,1);assert.equal(data.get(key).contactId,'done');
 await enqueueSubmission({form_name:'seller-valuation-step1',data:{propertyAddress:'123 Main'}},store);assert.equal(data.size,1);
});

test('email match with a different submitted-phone owner requires review',async()=>{
 const api=new HubSpotClient('secret',async(url)=>{
  if(!url.includes('/search'))return Response.json({id:'email-owner',properties:{email:'a@example.com',firstname:'A'}});
  return Response.json({total:1,results:[{id:'phone-owner',properties:{email:'b@example.com',hp_phone_key:'19545550101',phone:'+1 954-555-0101'}}]});
 });
 await assert.rejects(()=>api.findContact({email:'a@example.com',phone:'+19545550101'}),e=>e.review===true);
});

test('international phone searches omit country codes but compare full identities',async()=>{
 let query;
 const api=new HubSpotClient('secret',async(url,init)=>{
  const body=JSON.parse(init.body||'{}');
  if(body.filterGroups)return Response.json({total:0,results:[]});
  query=body.query;return Response.json({total:1,results:[{id:'es',properties:{phone:'+34 600 111 222'}}]});
 });
 const contact=await api.findContact({phone:'+34 600 111 222'});
 assert.equal(query,'600111222');assert.equal(contact.id,'es');
});

test('Spanish source-page metadata remains Spanish',()=>{
 const j=makeJob('seller-intake',{email:'a@example.com',sourcePage:'es-vender-doral'},'es-meta');
 assert.equal(buildContactProperties(j).hp_language,'es');
});

function memoryStore(){
 const data=new Map(),versions=new Map();
 return {data,
  get:async k=>structuredClone(data.get(k)||null),
  getWithMetadata:async k=>data.has(k)?{data:structuredClone(data.get(k)),etag:String(versions.get(k))}:null,
  setJSON:async(k,v,o)=>{if(o?.onlyIfNew&&data.has(k)||o?.onlyIfMatch&&String(versions.get(k))!==o.onlyIfMatch)return{modified:false};data.set(k,structuredClone(v));versions.set(k,(versions.get(k)||0)+1);return{modified:true}},
  list:async({prefix})=>({blobs:[...data.keys()].filter(k=>k.startsWith(prefix)).map(key=>({key}))}),
  delete:async k=>data.delete(k),
 };
}

test('disabled processor performs no CRM writes and keeps the queue',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();await enqueueSubmission({id:'disabled',form_name:'seller-hero',data:{email:'a@example.com'}},store);
 const result=await drainInquiries(store);assert.equal(result.status,'not_configured');assert.equal(store.data.size,1);
});

test('processor acquires one lease, moves completed jobs to done, and retains review jobs',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();await enqueueSubmission({id:'process',form_name:'seller-hero',data:{email:'a@example.com'}},store);
 let contacts=0;const api={findContact:async()=>null,createContact:async()=>({id:String(++contacts)}),updateContact:async()=>{},createNote:async()=>({id:'note'}),createTask:async()=>({id:'task'})};
 const results=await Promise.all([drainInquiries(store,api,'owner'),drainInquiries(store,api,'owner')]);
 assert.equal(contacts,1);assert.ok(results.some(r=>r.status==='busy'));
 assert.equal([...store.data.keys()].filter(k=>k.startsWith('done/')).length,1);assert.equal([...store.data.keys()].filter(k=>k.startsWith('pending/')).length,0);
 await enqueueSubmission({id:'review',form_name:'seller-hero',data:{phone:'+19545550101'}},store);
 api.findContact=async()=>{const e=new Error('Identity conflict');e.review=true;throw e;};
 await drainInquiries(store,api,'owner');const held=[...store.data.values()].find(j=>j.status==='review');assert.ok(held);
 const attempts=held.attempts;await drainInquiries(store,api,'owner');assert.equal([...store.data.values()].find(j=>j.status==='review').attempts,attempts);
});

test('pending deletion failure cannot repeat CRM writes',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();await enqueueSubmission({id:'delete-failed',form_name:'seller-hero',data:{email:'a@example.com'}},store);
 let writes=0;const api={findContact:async()=>null,createContact:async()=>({id:String(++writes)}),updateContact:async()=>{},createNote:async()=>({id:String(++writes)}),createTask:async()=>({id:String(++writes)})};
 const del=store.delete;let once=true;store.delete=async k=>{if(once){once=false;throw new Error('temporary deletion failure')}return del(k)};
 await drainInquiries(store,api,'owner');const pending=[...store.data.values()].find(j=>j.attempts);pending.nextAttemptAt=0;await store.setJSON('pending/'+pending.key,pending);
 await drainInquiries(store,api,'owner');assert.equal(writes,3);assert.equal([...store.data.keys()].filter(k=>k.startsWith('pending/')).length,0);
});

test('international phone-only numbers require country context rather than US inference',async()=>{
 const j=makeJob('agency-partner-intake',{whatsapp:'5512345678',country:'Mexico'},'mx');
 assert.equal(buildContactProperties(j).hp_phone_key,'525512345678');
 const unknown=makeJob('agency-partner-intake',{whatsapp:'5512345678'},'ambiguous');
 const api=new HubSpotClient('secret',async()=>{throw new Error('Should not call API')});
 await assert.rejects(()=>api.findContact(unknown.fields),e=>e.review===true);
});

test('every registered contact form retains every submitted business field in its inquiry note',async()=>{
 const {readFile}=await import('node:fs/promises');
 const {forms}=JSON.parse(await readFile(new URL('./fixtures/netlify-form-fields.json',import.meta.url),'utf8'));
 for(const form of forms){
  const fields=Object.fromEntries(form.fields.map(key=>[key,'Submitted '+key]));
  Object.assign(fields,{email:'test@example.invalid',phone:'+1 954 555 0147',whatsapp:'+1 954 555 0147',country:'United States',role:'owner',submitterType:'owner','bot-field':''});
  const job=makeJob(form.name,fields,'coverage-'+form.name);
  if(form.name==='seller-valuation-step1'){assert.equal(job,null);continue;}
  assert.ok(job,form.name);
  const escaped=inquiryNote(job).split('<pre>')[1].split('</pre>')[0];
  const plain=escaped.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  const retained=JSON.parse(plain);
  for(const [key,value]of Object.entries(fields))if(key!=='bot-field')assert.equal(retained[key],value,form.name+': '+key);
 }
});
