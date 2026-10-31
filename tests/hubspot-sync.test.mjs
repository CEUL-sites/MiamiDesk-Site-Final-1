import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyInquiry, buildContactProperties, makeJob, syncJob, HubSpotClient, PROPERTY_DEFINITIONS, inquiryNote } from '../netlify/functions/_shared/hubspotSync.mjs';

test('professional submissions expose brokerage, market and referral fields without replacing identity',()=>{
 const job=makeJob('referral-intake',{licenseeName:'Ana Agent',email:'agent@example.invalid',phone:'+19545550101',brokerageName:'Example Brokerage',country:'Spain',registrationPurpose:'agent_registration',referralType:'Buyer mandate',clientName:'Separate Client'},'agent-profile');
 const p=buildContactProperties(job,{},'owner');
 assert.equal(p.firstname,'Ana');assert.equal(p.lastname,'Agent');assert.equal(p.company,'Example Brokerage');
 assert.equal(p.country,'Spain');assert.equal(p.hp_professional_market,'Spain');
 assert.equal(p.hp_agent_registration_purpose,'agent_registration');assert.equal(p.hp_referral_type,'Buyer mandate');
 const existing=buildContactProperties(job,{company:'Existing Brokerage',country:'Existing Country',hubspot_owner_id:'existing-owner'},'owner');
 assert.equal(existing.company,undefined);assert.equal(existing.country,undefined);assert.equal(existing.hubspot_owner_id,undefined);
});

test('agency listing details populate professional fields while homeowner submissions do not',()=>{
 const data={email:'agency@example.invalid',agency:'Example Agency',role:'Agency director',country:'Madrid',website:'https://agency.example.invalid',inventoryType:'New development',numberOfListings:'3–5',listingUrl:'https://agency.example.invalid/listing/1'};
 const p=buildContactProperties(makeJob('agency-partner-intake',data,'agency'));
 assert.equal(p.company,'Example Agency');assert.equal(p.jobtitle,'Agency director');assert.equal(p.website,'https://agency.example.invalid');
 assert.equal(p.hp_inventory_type,'New development');assert.equal(p.hp_inventory_count,'3–5');assert.equal(p.hp_listing_url,'https://agency.example.invalid/listing/1');
 assert.equal(p.hp_agent_registration_purpose,'listing_review');assert.equal(p.hp_professional_market,'Madrid');
 assert.equal(p.country,undefined,'A business market must not become a residential country');
 const seller=buildContactProperties(makeJob('seller-hero',data,'seller'));
 assert.equal(seller.company,undefined);assert.equal(seller.hp_inventory_type,undefined);
});

function referralFixture(overrides={}) {
 return makeJob('referral-intake',{registrationVersion:'2',registrationPurpose:'client_referral',licenseeName:'Ana Agent',email:'agent@example.invalid',brokerageName:'Example Brokerage',country:'Spain',clientName:'Casey Client',clientEmail:'client@example.invalid',clientPhone:'+19545550102',clientCountry:'United States',clientNeed:'buyer',clientBudget:'$500K–$1M',clientTimeline:'3–6 months',clientLocation:'Weston',clientSummary:'Referred buyer brief',clientSharingConsent:'yes',...overrides},'structured-referral');
}

// Exercise the real client and synchronizer; only the external HTTP boundary is replaced.
function referralApi({failTaskOnce=false,existing=[]}={}) {
 const contacts=new Map(existing.map(c=>[String(c.id),structuredClone(c)])),notes=[],tasks=[],associations=[];
 let next=100,fail=failTaskOnce;
 const api=new HubSpotClient('test-only',async(url,init={})=>{
  const u=new URL(url),path=u.pathname,method=init.method||'GET',body=init.body?JSON.parse(init.body):{};
  if(path.endsWith('/contacts/search')){
   const key=body.filterGroups?.[0]?.filters?.[0]?.value;
   const results=key?[...contacts.values()].filter(c=>c.properties.hp_phone_key===key):[];
   return Response.json({total:results.length,results});
  }
  if(method==='GET'&&path.includes('/contacts/')){
   const email=decodeURIComponent(path.split('/').pop()),c=[...contacts.values()].find(c=>c.properties.email===email);
   if(!c)return Response.json({}, {status:404});
   const names=(u.searchParams.get('properties')||'').split(',');
   return Response.json({id:c.id,properties:Object.fromEntries(names.filter(k=>k in c.properties).map(k=>[k,c.properties[k]]))});
  }
  if(method==='POST'&&path.endsWith('/contacts')){const c={id:String(next++),properties:body.properties};contacts.set(c.id,c);return Response.json(c);}
  if(method==='PATCH'){const c=contacts.get(path.split('/').pop());Object.assign(c.properties,body.properties);return Response.json(c);}
  if(method==='PUT'&&path.includes('/associations/default/')){associations.push(path);return new Response(null,{status:204});}
  if(path.endsWith('/notes')){notes.push(body);return Response.json({id:'note-'+notes.length});}
  if(path.endsWith('/tasks')){if(fail){fail=false;return Response.json({}, {status:429});}tasks.push(body);return Response.json({id:'task-'+tasks.length});}
  throw new Error('Unexpected external request '+method+' '+path);
 },async()=>{});
 return {api,contacts,notes,tasks,associations};
}

test('client referral creates two distinct contacts and links its note and task to both',async()=>{
 const state=referralApi(),job=referralFixture();
 await syncJob(job,state.api,async()=>{},'owner');
 assert.equal(state.contacts.size,2);
 const agent=state.contacts.get('100'),client=state.contacts.get('101');
 assert.equal(agent.properties.email,'agent@example.invalid');assert.equal(agent.properties.company,'Example Brokerage');
 assert.equal(client.properties.email,'client@example.invalid');assert.equal(client.properties.firstname,'Casey');
 assert.equal(client.properties.company,undefined);assert.equal(client.properties.hp_inquiry_categories,'buyer');
 assert.equal(client.properties.hp_value_band,'$500K–$1M');assert.equal(client.properties.hp_property_city,'Weston');
 assert.deepEqual(state.associations,['/crm/v4/objects/contacts/100/associations/default/contacts/101']);
 assert.deepEqual(state.notes[0].associations.map(a=>a.to.id),['100','101']);
 assert.deepEqual(state.tasks[0].associations.map(a=>a.to.id),['100','101']);
 assert.match(state.notes[0].properties.hs_note_body,/Referring agent/);
 assert.match(state.tasks[0].properties.hs_task_subject,/Casey Client/);
 assert.equal(job.status,'synced');
});

test('structured client creation requires sharing authorization before any CRM writes',async()=>{
 const state=referralApi();
 await assert.rejects(()=>syncJob(referralFixture({clientSharingConsent:''}),state.api,async()=>{},'owner'),e=>e.review===true);
 assert.equal(state.contacts.size,0);assert.equal(state.notes.length,0);
});

test('client referral rejects agent identity reuse and invalid client addresses',async()=>{
 for(const patch of [{clientEmail:'agent@example.invalid'},{clientEmail:'invalid'},{clientName:''},{clientNeed:'unknown'},{clientPhone:'+12'},{registrationPurpose:'unknown'},{registrationVersion:'unknown'}]){
  const state=referralApi();
  await assert.rejects(()=>syncJob(referralFixture(patch),state.api,async()=>{},'owner'),e=>e.review===true);
  assert.equal(state.contacts.size,0);
 }
});

test('agent-only registration cannot create a client from stale fields',async()=>{
 const state=referralApi(),job=referralFixture({registrationPurpose:'agent_registration',clientSharingConsent:''});
 await syncJob(job,state.api,async()=>{},'owner');
 assert.equal(state.contacts.size,1);assert.equal(state.associations.length,0);
});

test('referral retries reuse both contacts, their association and the saved inquiry note',async()=>{
 const state=referralApi({failTaskOnce:true}),job=referralFixture();
 await assert.rejects(()=>syncJob(job,state.api,async()=>{},'owner'),/429/);
 await syncJob(job,state.api,async()=>{},'owner');
 assert.equal(state.contacts.size,2);assert.equal(state.associations.length,1);assert.equal(state.notes.length,1);assert.equal(state.tasks.length,1);
});

test('existing professional company, website and role are fetched before blank-only updates',async()=>{
 const state=referralApi({existing:[{id:'existing',properties:{email:'agent@example.invalid',firstname:'Ana',company:'Original Firm',website:'https://original.example.invalid',jobtitle:'Original Role',country:'Spain',hubspot_owner_id:'original-owner'}}]});
 const job=makeJob('agency-partner-intake',{email:'agent@example.invalid',agency:'New Firm',website:'https://new.example.invalid',role:'New Role',country:'France'},'existing-professional');
 await syncJob(job,state.api,async()=>{},'owner');
 const p=state.contacts.get('existing').properties;
 assert.equal(p.company,'Original Firm');assert.equal(p.website,'https://original.example.invalid');assert.equal(p.jobtitle,'Original Role');assert.equal(p.country,'Spain');assert.equal(p.hubspot_owner_id,'original-owner');
});

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
