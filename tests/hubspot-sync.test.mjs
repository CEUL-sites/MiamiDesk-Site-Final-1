import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyInquiry, buildContactProperties, makeJob, syncJob, HubSpotClient, PROPERTY_DEFINITIONS, inquiryNote, programTag } from '../netlify/functions/_shared/hubspotSync.mjs';

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
 const reminder=Number(state.tasks[0].properties.hs_task_reminders);
 assert.ok(reminder>Date.now(),'every website task carries a future reminder so HubSpot notifies the owner');
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
 const pending=()=>[...data.keys()].filter(k=>k.startsWith('pending/')).length;
 await enqueueSubmission(p,store);assert.equal(pending(),1);assert.equal(data.get(key).contactId,'done');
 await enqueueSubmission({form_name:'seller-valuation-step1',data:{propertyAddress:'123 Main'}},store);assert.equal(pending(),1);
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
 const result=await drainInquiries(store);assert.equal(result.status,'not_configured');assert.equal([...store.data.keys()].filter(k=>k.startsWith('pending/')).length,1);
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


test('WhatsApp alert runs only after the contact, note, and task were saved in HubSpot; failed delivery retries without duplicate CRM writes',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();
 const payload={id:'whatsapp-verification',form_name:'referral-intake',data:{licenseeName:'Test Partner',email:'test-partner@example.invalid',phone:'+19545550101',clientName:'Client Example'}};
 await enqueueSubmission(payload,store);
 const counts={contact:0,note:0,task:0,alert:0};
 const api={
  findContact:async()=>null,
  createContact:async()=>{counts.contact++;return{id:'12345'};},
  updateContact:async()=>{throw new Error('No duplicate contact update expected');},
  createNote:async()=>{counts.note++;return{id:'note-1'};},
  createTask:async()=>{counts.task++;return{id:'task-1'};},
 };
 let whatsappAvailable=false;
 const notify=async job=>{
  counts.alert++;
  assert.equal(job.status,'synced');
  assert.equal(job.contactId,'12345');
  assert.equal(job.noteId,'note-1');
  assert.equal(job.taskId,'task-1');
  return whatsappAvailable?{ok:true,detail:'ok'}:{ok:false,detail:'temporary outage'};
 };
 await drainInquiries(store,api,'owner',notify);
 const pendingKey=[...store.data.keys()].find(k=>k.startsWith('pending/'));
 assert.ok(pendingKey,'Unsents must stay in the delivery queue');
 assert.equal(store.data.get(pendingKey).status,'synced');
 assert.equal(store.data.get(pendingKey).whatsappSentAt,undefined);
 assert.deepEqual(counts,{contact:1,note:1,task:1,alert:1});
 const pending=store.data.get(pendingKey);
 pending.nextAttemptAt=Date.now()-1;
 await store.setJSON(pendingKey,pending);
 whatsappAvailable=true;
 await drainInquiries(store,api,'owner',notify);
 assert.equal(store.data.has(pendingKey),false);
 const done=[...store.data.entries()].find(([k])=>k.startsWith('done/'));
 assert.ok(done?.[1].whatsappSentAt,'Successful WhatsApp delivery must be checkpointed');
 assert.deepEqual(counts,{contact:1,note:1,task:1,alert:2});
 await drainInquiries(store,api,'owner',notify);
 assert.deepEqual(counts,{contact:1,note:1,task:1,alert:2},'Completed submission must never be resent');
});

test('an owner alert channel that is not set up completes the inquiry at once; a failing one is released after the retry limit',async()=>{
 const {drainInquiries,enqueueSubmission,MAX_ALERT_ATTEMPTS}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const api={findContact:async()=>null,createContact:async()=>({id:'777'}),updateContact:async()=>{},createNote:async()=>({id:'n'}),createTask:async()=>({id:'t'})};
 const off=memoryStore();
 await enqueueSubmission({id:'alert-off',form_name:'buyer-mandate',data:{name:'No Channel',email:'no-channel@example.invalid'}},off);
 let calls=0;
 await drainInquiries(off,api,'owner',async()=>{calls++;return{ok:false,configured:false,detail:'not configured'}});
 assert.equal([...off.data.keys()].some(k=>k.startsWith('pending/')),false,'An unconfigured channel must not hold the job');
 assert.equal([...off.data.entries()].find(([k])=>k.startsWith('done/'))[1].ownerAlert,'not_configured');
 assert.equal(calls,1);
 const down=memoryStore();
 await enqueueSubmission({id:'alert-down',form_name:'buyer-mandate',data:{name:'Channel Down',email:'channel-down@example.invalid'}},down);
 let attempts=0;const notify=async()=>{attempts++;return{ok:false,configured:true,detail:'outage'}};
 for(let i=0;i<MAX_ALERT_ATTEMPTS+2;i++){
  const key=[...down.data.keys()].find(k=>k.startsWith('pending/'));
  if(key){const j=down.data.get(key);j.nextAttemptAt=0;await down.setJSON(key,j);}
  await drainInquiries(down,api,'owner',notify);
 }
 assert.equal(attempts,MAX_ALERT_ATTEMPTS);
 assert.equal([...down.data.keys()].some(k=>k.startsWith('pending/')),false);
 assert.equal([...down.data.entries()].find(([k])=>k.startsWith('done/'))[1].ownerAlert,'failed');
});

test('WhatsApp Cloud sender: silent when not configured, sends the approved template when configured, never leaks the token',async()=>{
 const {sendWhatsAppAlert,templateText}=await import('../netlify/functions/_shared/whatsapp.ts');
 const alert={type:'Buyer',name:'Test\nName',contact:'+1 954 555 0100',location:'',link:'https://app.hubspot.com/contacts/1/contact/2'};
 const none=await sendWhatsAppAlert(alert,{},async()=>{throw new Error('must not call')});
 assert.deepEqual([none.ok,none.configured],[false,false]);
 let seen;
 const env={WHATSAPP_CLOUD_TOKEN:'secret-token',WHATSAPP_PHONE_NUMBER_ID:'1234567890'};
 const sent=await sendWhatsAppAlert(alert,env,async(url,init)=>{seen={url,init};return new Response(JSON.stringify({messages:[{id:'wamid.1'}]}),{status:200})});
 assert.deepEqual([sent.ok,sent.configured],[true,true]);
 assert.match(seen.url,/^https:\/\/graph\.facebook\.com\/v[\d.]+\/1234567890\/messages$/);
 const body=JSON.parse(seen.init.body);
 assert.equal(body.to,'19548656622');assert.equal(body.type,'template');assert.equal(body.template.name,'website_lead_alert');
 assert.deepEqual(body.template.components[0].parameters.map(p=>p.text),['Buyer','Test Name','+1 954 555 0100','—','https://app.hubspot.com/contacts/1/contact/2']);
 const bad=await sendWhatsAppAlert(alert,env,async()=>new Response(JSON.stringify({error:{code:132001,message:'Template name does not exist'}}),{status:404}));
 assert.deepEqual([bad.ok,bad.configured],[false,true]);assert.match(bad.detail,/132001/);assert.doesNotMatch(bad.detail,/secret-token/);
 assert.equal(templateText('a\n\n  b     c'),'a b c');
});

test('CallMeBot relays only private owner alert metadata and rejects invalid responses',async()=>{
 const {sendWhatsAppAlert,whatsappConfigured}=await import('../netlify/functions/_shared/whatsapp.ts');
 const env={CALLMEBOT_APIKEY:'mock-personal-key',WHATSAPP_ALERT_TO:'+19548656622'};
 const lead={type:'South Florida Seller · referred client Sample Person',name:'Jane Sensitive',
  contact:'private@example.invalid · +1 555 555 0100',location:'123 Confidential Road',
  link:'https://app.hubspot.com/contacts/149513532/contact/123456'};
 assert.equal(whatsappConfigured(env),true);
 let request;
 const ok=await sendWhatsAppAlert(lead,env,async(url,init)=>{
  request={url,init};
  return new Response('<p><b>Message queued.</b>',{status:200});
 });
 assert.equal(ok.ok,true);
 assert.equal(ok.configured,true);
 const u=new URL(request.url);
 assert.equal(u.hostname,'api.callmebot.com');
 assert.equal(u.pathname,'/whatsapp.php');
 assert.equal(u.searchParams.get('phone'),'+19548656622');
 assert.equal(u.searchParams.get('apikey'),'mock-personal-key');
 assert.match(u.searchParams.get('text'),/South Florida Seller/);
 assert.match(u.searchParams.get('text'),/app.hubspot.com\/contacts\/149513532\/contact\/123456/);
 for (const privateValue of ['Jane Sensitive','private@example.invalid','Confidential Road','Sample Person','555 555']) {
  assert.doesNotMatch(decodeURIComponent(u.search),new RegExp(privateValue));
 }
 assert.equal(request.init.method,'GET');
 assert.doesNotMatch(JSON.stringify(ok),/mock-personal-key/);
 const forbidden=await sendWhatsAppAlert(lead,env,async()=>new Response('Forbidden',{status:403}));
 assert.equal(forbidden.ok,false);
 assert.match(forbidden.detail,/403/);
 assert.doesNotMatch(forbidden.detail,/mock-personal-key/);
 const falseOk=await sendWhatsAppAlert(lead,env,async()=>new Response('Invalid APIKEY',{status:200}));
 assert.equal(falseOk.ok,false);
 const wrong=await sendWhatsAppAlert(lead,{...env,WHATSAPP_ALERT_TO:'+34646853078'},async()=>{throw Error('must not call')});
 assert.equal(wrong.ok,false);
});

test('address-only valuation step is not queued for a WhatsApp alert',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();
 await enqueueSubmission({id:'partial',form_name:'seller-valuation-step1',data:{propertyAddress:'Test Ave'}},store);
 let alerts=0;
 const api={findContact:async()=>{throw new Error('No CRM entry expected')}};
 await drainInquiries(store,api,'owner',async()=>{alerts++;return{ok:true}});
 assert.equal(alerts,0);
 assert.equal([...store.data.keys()].filter(k=>k.startsWith('done/')||k.startsWith('pending/')).length,0);
});


test('recent WhatsApp alerts can recover after credentials are added, without repeating CRM writes',async()=>{
 const {drainInquiries,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();
 const api={findContact:async()=>null,createContact:async()=>({id:'777'}),updateContact:async()=>{},
  createNote:async()=>({id:'n'}),createTask:async()=>({id:'t'})};
 await enqueueSubmission({id:'awaiting-whatsapp',form_name:'seller-hero',data:{name:'Example',email:'example@example.invalid'}},store);
 let attempts=0;
 await drainInquiries(store,api,'owner',async()=>{attempts++;return{ok:false,configured:false}});
 assert.equal(attempts,1);
 assert.equal([...store.data.keys()].filter(k=>k.startsWith('pending/')).length,0);
 assert.equal([...store.data.keys()].filter(k=>k.startsWith('owner-alert-awaiting/')).length,1);
 assert.equal([...store.data.entries()].find(([k])=>k.startsWith('done/'))[1].ownerAlert,'not_configured');
 await drainInquiries(store,api,'owner',async()=>{attempts++;return{ok:true,configured:true}});
 assert.equal(attempts,2);
 assert.equal([...store.data.keys()].filter(k=>k.startsWith('owner-alert-awaiting/')).length,0);
 assert.equal([...store.data.entries()].find(([k])=>k.startsWith('done/'))[1].ownerAlert,'sent');
 await drainInquiries(store,api,'owner',async()=>{attempts++;return{ok:true}});
 assert.equal(attempts,2,'replayed alert must be delivered only once');
});

test('recovery discards alerts older than one day, rather than flooding personal WhatsApp',async()=>{
 const {drainInquiries,OWNER_ALERT_RECOVERY_WINDOW_MS}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();
 const job={key:'expired',at:new Date(Date.now()-OWNER_ALERT_RECOVERY_WINDOW_MS-60_000).toISOString(),contactId:'777',fields:{}};
 await store.setJSON('owner-alert-awaiting/expired',job);
 let calls=0;
 const api={findContact:async()=>{throw new Error('CRM must not be touched')}};
 await drainInquiries(store,api,'owner',async()=>{calls++;return{ok:true}});
 assert.equal(calls,0);
 assert.equal(store.data.has('owner-alert-awaiting/expired'),false);
});

test('GILMAR Spain desk leads are labelled in the note and task while Miami leads are not',async()=>{
 const gilmar=makeJob('buyer-mandate',{name:'Ana Ruiz',email:'ana@example.invalid',phone:'+34600111222',country:'Spain',source:'gilmar-spain',sourcePage:'gilmar-spain-buyer'},'gilmar-buyer');
 assert.equal(gilmar.category,'buyer');assert.equal(programTag(gilmar.fields),'GILMAR Spain');
 assert.match(inquiryNote(gilmar),/GILMAR Spain/);
 const referral=makeJob('referral-intake',{licenseeName:'Luis Agent',email:'luis@example.invalid',sourcePage:'gilmar-spain-referral'},'gilmar-agent');
 assert.equal(programTag(referral.fields),'GILMAR Spain');
 const miami=makeJob('buyer-mandate',{name:'Bo Buyer',email:'bo@example.invalid',source:'buyer-mandate',sourcePage:'buyer-mandate'},'miami-buyer');
 assert.equal(programTag(miami.fields),'');assert.doesNotMatch(inquiryNote(miami),/GILMAR/);
 const created=[];
 const api={findContact:async()=>null,createContact:async()=>({id:'1'}),updateContact:async()=>({}),associateContacts:async()=>({}),
  createNote:async()=>({id:'n'}),createTask:async p=>{created.push(p);return {id:'t'};}};
 await syncJob(gilmar,api,async()=>{},'owner');
 assert.match(created[0].hs_task_subject,/· GILMAR Spain$/);
});

const okApi=()=>{let contacts=0,notes=0,tasks=0;return {counts:()=>({contacts,notes,tasks}),findContact:async()=>null,createContact:async()=>({id:String(++contacts)}),updateContact:async()=>{},createNote:async()=>({id:'n'+(++notes)}),createTask:async()=>({id:'t'+(++tasks)})};};
const backupLead={formName:'seller-hero',name:'Pat Owner',email:'Pat@Example.com',phone:'+19545550101',propertyAddress:'1 Main St',sourcePage:'hero-en',botField:'',formRenderedAt:'1800000000000'};

test('backup lead waits, then reaches HubSpot when the primary path never fires',async()=>{
 const {drainInquiries,enqueueBackupLead,BACKUP_DELAY_MS}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore(),api=okApi();
 assert.equal((await enqueueBackupLead(backupLead,store)).status,'queued');
 await drainInquiries(store,api,'owner');assert.deepEqual(api.counts(),{contacts:0,notes:0,tasks:0});
 const [key,job]=[...store.data.entries()].find(([k])=>k.startsWith('pending/'));
 assert.equal(job.nextAttemptAt-Date.parse(job.at),BACKUP_DELAY_MS);
 await store.setJSON(key,{...job,nextAttemptAt:0});
 await drainInquiries(store,api,'owner');assert.deepEqual(api.counts(),{contacts:1,notes:1,tasks:1});
 assert.equal((await enqueueBackupLead(backupLead,store)).status,'synced');
});

test('backup lead is discarded when the same submission also arrived by the primary path',async()=>{
 const {drainInquiries,enqueueBackupLead,enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 for(const order of ['primary-first','backup-first']){
  const store=memoryStore(),api=okApi();
  const primary=()=>enqueueSubmission({id:'p1',form_name:'seller-hero',data:{name:'Pat Owner',email:'pat@example.com',phone:'+19545550101'}},store);
  if(order==='primary-first')await primary();
  await enqueueBackupLead(backupLead,store);
  if(order==='backup-first')await primary();
  for(const [k,j] of [...store.data.entries()])if(k.startsWith('pending/')&&j.backup)await store.setJSON(k,{...j,nextAttemptAt:0});
  await drainInquiries(store,api,'owner');
  assert.deepEqual(api.counts(),{contacts:1,notes:1,tasks:1},order);
  assert.equal([...store.data.keys()].filter(k=>k.startsWith('pending/')).length,0,order);
 }
});

test('an older primary submission does not swallow a new backup lead',async()=>{
 const {drainInquiries,enqueueBackupLead,enqueueSubmission,BACKUP_MATCH_MS}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore(),api=okApi();
 await enqueueSubmission({id:'old',form_name:'seller-hero',data:{email:'pat@example.com'}},store);
 await drainInquiries(store,api,'owner');
 await enqueueBackupLead(backupLead,store,Date.now()+BACKUP_MATCH_MS+60_000);
 for(const [k,j] of [...store.data.entries()])if(j.backup)await store.setJSON(k,{...j,nextAttemptAt:0});
 await drainInquiries(store,api,'owner');assert.equal(api.counts().notes,2);
});

test('backup lead keeps country context and ignores unregistered or unreachable payloads',async()=>{
 const {enqueueBackupLead}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();
 await enqueueBackupLead({formName:'buyer-mandate',name:'Ana',phone:'5512345678',city:'Mexico',formRenderedAt:'1'},store);
 const job=[...store.data.values()][0];
 assert.equal(buildContactProperties(job).hp_phone_key,'525512345678');
 assert.equal(job.fields.formRenderedAt,undefined);assert.equal(job.fields.botField,undefined);
 assert.equal((await enqueueBackupLead({formName:'unknown',email:'a@example.com'},store)).status,'skipped');
 assert.equal((await enqueueBackupLead({formName:'seller-hero',name:'No contact'},store)).status,'skipped');
 assert.equal((await enqueueBackupLead(undefined,store)).status,'skipped');
});

test('primary marker holds no contact data and its failure never blocks the lead',async()=>{
 const {enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();await enqueueSubmission({id:'m',form_name:'seller-hero',data:{email:'pat@example.com'}},store);
 const [k,v]=[...store.data.entries()].find(([key])=>key.startsWith('primary-seen/'));
 assert.ok(!(k+JSON.stringify(v)).includes('pat'));
 const broken=memoryStore(),set=broken.setJSON;broken.setJSON=async(key,...a)=>{if(key.startsWith('primary-seen/'))throw new Error('down');return set(key,...a);};
 assert.equal((await enqueueSubmission({id:'m2',form_name:'seller-hero',data:{email:'b@example.com'}},broken)).status,'queued');
});

test('a lead that could not be queued leaves no marker, so its backup copy survives',async()=>{
 const {enqueueSubmission}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore(),set=store.setJSON;store.setJSON=async(key,...a)=>{if(key.startsWith('pending/'))throw new Error('down');return set(key,...a);};
 await assert.rejects(()=>enqueueSubmission({id:'x',form_name:'seller-hero',data:{email:'a@example.com'}},store));
 assert.equal([...store.data.keys()].length,0);
});

test('review inquiries are listed for the daily digest',async()=>{
 const {enqueueSubmission,drainInquiries,listReviewInquiries}=await import('../netlify/functions/_shared/hubspotQueue.mjs');
 const store=memoryStore();await enqueueSubmission({id:'r',form_name:'seller-hero',data:{phone:'+19545550101'}},store);
 assert.equal((await listReviewInquiries(store)).length,0);
 await drainInquiries(store,{findContact:async()=>{throw Object.assign(new Error('Ambiguous phone identity'),{review:true})}},'owner');
 const held=await listReviewInquiries(store);assert.equal(held.length,1);assert.equal(held[0].lastError,'Ambiguous phone identity');
});
