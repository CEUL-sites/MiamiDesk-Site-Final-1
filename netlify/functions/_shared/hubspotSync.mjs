import { createHash } from 'node:crypto';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

export const CATEGORIES = {
  south_florida_seller: 'South Florida Seller', buyer: 'Buyer',
  international_owner: 'International Owner', referral_partner: 'Referral Partner',
  agency_developer: 'Agency / Developer', guide_request: 'Seller Guide Request',
};
const fields = {
 hp_property_address:'Seller Property Address',
 hp_property_city:'Property City / Location', hp_selling_timeline:'Selling / Buying Timeline',
 hp_value_band:'Property Value / Budget', hp_preferred_contact:'Preferred Contact Method',
 hp_language:'Inquiry Language', hp_first_source:'First Website Inquiry Source',
 hp_latest_source:'Latest Website Inquiry Source', hp_phone_key:'Website Phone Match Key',
 hp_professional_market:'Professional country / market', hp_referral_type:'Referral type',
 hp_inventory_type:'Inventory type', hp_inventory_count:'Number of listings', hp_listing_url:'Listing URL',
};
export const REGISTRATION_PURPOSES = {
 agent_registration:'Agent registration', client_referral:'Client referral',
 listing_review:'Listing review', professional_inquiry:'Other professional inquiry',
};
export const PROPERTY_DEFINITIONS = [
 {name:'hp_inquiry_categories',label:'Website Inquiry Categories',type:'enumeration',fieldType:'checkbox',
  options:Object.entries(CATEGORIES).map(([value,label],displayOrder)=>({value,label,displayOrder,hidden:false}))},
 {name:'hp_agent_registration_purpose',label:'Registration purpose',type:'enumeration',fieldType:'select',
  options:Object.entries(REGISTRATION_PURPOSES).map(([value,label],displayOrder)=>({value,label,displayOrder,hidden:false}))},
 ...Object.entries(fields).map(([name,label])=>({name,label,type:'string',fieldType:'text',...(name==='hp_phone_key'?{hasUniqueValue:true}:{})})),
].map(p=>({...p,groupName:'contactinformation',description:'HomesProfessional website intake. Submission history is retained in contact notes.'}));
const text = v => typeof v==='string'?v.trim():v==null?'':JSON.stringify(v);
const phoneRegion = f => {
 const country=text(f.country||f.jurisdiction).toUpperCase();
 const aliases={SPAIN:'ES','ESPAÑA':'ES',MEXICO:'MX','MÉXICO':'MX',COLOMBIA:'CO',VENEZUELA:'VE',ARGENTINA:'AR',BRAZIL:'BR',BRASIL:'BR','UNITED STATES':'US',USA:'US'};
 return /^[A-Z]{2}$/.test(country)?country:aliases[country]||f._phoneRegion||undefined;
};
const parsedPhone = (v,region='US') => {
 const raw=text(v).replace(/^00/, '+');
 if(region==='unknown'&&!raw.startsWith('+'))return null;
 const parsed=parsePhoneNumberFromString(raw, region==='unknown'?undefined:region);
 return parsed?.isPossible()?parsed:null;
};
export const phoneKey = (v,region='US') => parsedPhone(v,region)?.number.slice(1)||'';
const professionalInquiry = job => ['referral_partner','agency_developer'].includes(job.category);
const publicUrl = value => {
 try { const url=new URL(value);return ['https:','http:'].includes(url.protocol)&&!url.username&&!url.password?value:''; }
 catch{return '';}
};
export function classifyInquiry(form, f) {
 if(form==='seller-consultation' && f.desk==='buyer')return 'buyer';
 if(form==='seller-consultation' && f.desk==='referral')return 'referral_partner';
 if(['seller-hero','seller-intake','seller-consultation'].includes(form))return /agency|developer/.test(text(f.desk))?'agency_developer':f.desk==='global'?'international_owner':'south_florida_seller';
 if(form==='buyer-mandate')return 'buyer';
 if(['referral-intake','referral-intake-es'].includes(form))return 'referral_partner';
 if(form==='agency-partner-intake')return 'agency_developer';
 if(form==='global-desk-listing')return /agent|agency|broker|developer|professional/i.test(text(f.submitterType))?'agency_developer':'international_owner';
 if(form==='spain-seller')return /agent|agency|broker|developer|agencia|promotor/i.test(text(f.role))?'agency_developer':'international_owner';
 if(form==='lead-magnet-download')return 'guide_request';
 return null;
}
export function makeJob(form, original, submissionId) {
 const category=classifyInquiry(form,original);if(!category)return null;
 const fields=Object.fromEntries(Object.entries(original).map(([k,v])=>[k,text(v)]));
 fields.name ||= fields.licenseeName || fields.agentName || '';
 fields.phone ||= fields.whatsapp || '';
 fields._phoneRegion=phoneRegion(fields)||(category==='south_florida_seller'?'US':'unknown');
 fields.email=(fields.email||'').toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))fields.email='';
 if(!fields.email && fields.phone.replace(/\D/g,'').length<7)return null;
 const key=createHash('sha256').update(submissionId?String(submissionId):JSON.stringify([form,fields])).digest('hex');
 return {key,form,category,fields,at:new Date().toISOString(),status:'pending',attempts:0};
}
export function buildContactProperties(job, existing={}, owner='') {
 const f=job.fields;const p={};
 const fill=(k,v)=>{if(v&&!existing[k])p[k]=v;};
 const names=f.name.split(/\s+/).filter(Boolean);
 fill('firstname',names[0]);fill('lastname',names.slice(1).join(' '));fill('email',f.email);fill('phone',f.phone);
 fill('hubspot_owner_id',owner);
 if(professionalInquiry(job)) {
  fill('company',f.brokerageName||f.agency||f.company);
  fill('jobtitle',f.role||f.submitterType);
  fill('website',publicUrl(f.website));
  // The agency and Global Desk forms accept a business market, not a residence.
  if(['referral-intake','referral-intake-es'].includes(job.form))fill('country',f.country);
  const purpose=Object.hasOwn(REGISTRATION_PURPOSES,f.registrationPurpose)?f.registrationPurpose:
   ['referral-intake','referral-intake-es'].includes(job.form)?'client_referral':job.category==='agency_developer'?'listing_review':'professional_inquiry';
  const professional={hp_agent_registration_purpose:purpose,hp_professional_market:f.country||f.jurisdiction,
   hp_referral_type:f.referralType,hp_inventory_type:f.inventoryType||f.propertyType||f.type,
   hp_inventory_count:f.numberOfListings||f.propertyCount||f.units,hp_listing_url:publicUrl(f.listingUrl)};
  for(const [k,v]of Object.entries(professional))if(v)p[k]=v;
 }
 // Only new records get a lifecycle stage. Partners and downloads are not labelled seller leads.
 if(Object.keys(existing).length===0)p.lifecyclestage=['south_florida_seller','buyer','international_owner'].includes(job.category)?'lead':'other';
 const source=[f.utm_source||f.leadSource||f.source||'direct',f.utm_medium,f.utm_campaign].filter(Boolean).join(' / ');
 const page=f.pagePath||f.sourcePage||f.landing_page||'';
 fill('hp_first_source',source);
 fill('hp_phone_key',phoneKey(f.phone,phoneRegion(f)));
 p.hp_inquiry_categories=[...new Set((existing.hp_inquiry_categories||'').split(';').filter(Boolean).concat(job.category))].join(';');
 p.hp_latest_source=source;
 const submitted={hp_property_address:f.propertyAddress,hp_property_city:f.city||f.location,
 hp_selling_timeline:f.timeline,hp_value_band:f.valueBand||f.priceRange||f.askingPrice,
 hp_preferred_contact:f.preferredContact,hp_language:f.language||(/(?:^|\/)es(?:\/|$)|^es-|-es$/.test(page)?'es':'en')};
 for(const [k,v] of Object.entries(submitted))if(v)p[k]=v;
 // No marketing status, subscription status, exclusion, or generic address writes.
 return p;
}
const escapeHtml = s => text(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function inquiryNote(job) {
 const safe=Object.fromEntries(Object.entries(job.fields).filter(([k])=>!['bot-field','botField'].includes(k)));
 const f=job.fields;
 const professional=professionalInquiry(job)?`<p><strong>Agent / agency details</strong><br>Name: ${escapeHtml(f.name)}<br>Brokerage: ${escapeHtml(f.brokerageName||f.agency||f.company)}<br>Country / market: ${escapeHtml(f.country||f.jurisdiction)}<br>Referral type: ${escapeHtml(f.referralType)}</p>`:'';
 const relationship=job.referredContactId?`<p><strong>Referring agent</strong>: ${escapeHtml(f.name)} (CRM contact ${escapeHtml(job.contactId)})<br><strong>Referred client</strong>: ${escapeHtml(f.clientName)} (CRM contact ${escapeHtml(job.referredContactId)})<br>Client sharing authorization: recorded in submission.</p>`:'';
 return `<p><strong>${escapeHtml(CATEGORIES[job.category])}</strong> · ${escapeHtml(job.form)}</p>${professional}${relationship}<p>Submission: ${job.key}</p><pre>${escapeHtml(JSON.stringify(safe,null,2))}</pre>`;
}
export class HubSpotClient {
 constructor(token,fetcher=fetch,sleep=ms=>new Promise(r=>setTimeout(r,ms)),deadline=Infinity){this.token=token;this.fetcher=fetcher;this.sleep=sleep;this.deadline=deadline;}
 async request(path,method='GET',body) {
  const activityCreate=method==='POST'&&/\/objects\/(notes|tasks)$/.test(path);
  for(let attempt=0;attempt<2;attempt++){
   const left=this.deadline-Date.now();if(left<300)throw new Error('Processing budget reached');
   let res;
   try{res=await this.fetcher('https://api.hubapi.com'+path,{method,headers:{Authorization:`Bearer ${this.token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(Math.max(1,Math.min(3000,left)))});}
   catch{const e=new Error('HubSpot request interrupted');e.review=activityCreate;throw e;}
   if((res.status===429||res.status>=500)&&attempt===0&&!activityCreate){await this.sleep(500);continue;}
   if(!res.ok){const e=new Error(`HubSpot HTTP ${res.status}`);e.status=res.status;e.review=activityCreate&&res.status>=500;throw e;}
   if(res.status===204)return {};
   try{return await res.json();}catch{const e=new Error('HubSpot response unreadable');e.review=activityCreate;throw e;}
  }
 }
 async findContact(f) {
  const props=['firstname','lastname','email','phone','mobilephone','company','country','jobtitle','website','hubspot_owner_id','lifecyclestage',...PROPERTY_DEFINITIONS.map(p=>p.name)];
  let emailMatch=null;
  if(f.email){
   try{emailMatch=await this.request(`/crm/v3/objects/contacts/${encodeURIComponent(f.email)}?idProperty=email&properties=${props.join(',')}`);}
   catch(e){if(e.status!==404)throw e;}
  }
  if(!f.phone)return emailMatch;
  const region=phoneRegion(f);
  const parsed=parsedPhone(f.phone,region);
  const key=phoneKey(f.phone,region);
  if(!key){if(emailMatch)return emailMatch;const e=new Error('Phone country or format needs review');e.review=true;throw e;}
  const byKey=await this.request('/crm/v3/objects/contacts/search','POST',{filterGroups:[{filters:[{propertyName:'hp_phone_key',operator:'EQ',value:key}]}],properties:props,limit:10});
  if(byKey.total>1){const e=new Error('Ambiguous phone identity');e.review=true;throw e;}
  if(byKey.total===1){if(emailMatch&&byKey.results[0].id!==emailMatch.id){const e=new Error('Conflicting email and phone');e.review=true;throw e;}if(f.email&&byKey.results[0].properties.email&&byKey.results[0].properties.email.toLowerCase()!==f.email){const e=new Error('Conflicting email and phone');e.review=true;throw e;}return byKey.results[0];}
  const search=await this.request('/crm/v3/objects/contacts/search','POST',{query:parsed.nationalNumber,properties:props,limit:100});
  const matches=search.results.filter(c=>[c.properties.phone,c.properties.mobilephone].some(p=>p&&phoneKey(p,parsed.country)===key));
  if(matches.length>1||search.total>100){const e=new Error('Ambiguous phone identity');e.review=true;throw e;}
  if(matches.length===1&&f.email&&matches[0].properties.email&&matches[0].properties.email.toLowerCase()!==f.email){const e=new Error('Conflicting email and phone');e.review=true;throw e;}
  if(emailMatch&&matches.length===1&&matches[0].id!==emailMatch.id){const e=new Error('Conflicting email and phone');e.review=true;throw e;}
  return emailMatch||matches[0]||null;
 }
 createContact(properties){return this.request('/crm/v3/objects/contacts','POST',{properties});}
 updateContact(id,properties){return this.request(`/crm/v3/objects/contacts/${id}`,'PATCH',{properties});}
 associateContacts(agentId,clientId){return this.request(`/crm/v4/objects/contacts/${agentId}/associations/default/contacts/${clientId}`,'PUT');}
 createNote(properties,contactId,referredContactId){return this.request('/crm/v3/objects/notes','POST',{properties,associations:[...new Set([contactId,referredContactId].filter(Boolean))].map(id=>({to:{id},types:[{associationCategory:'HUBSPOT_DEFINED',associationTypeId:202}]}))});}
 createTask(properties,contactId,referredContactId){return this.request('/crm/v3/objects/tasks','POST',{properties,associations:[...new Set([contactId,referredContactId].filter(Boolean))].map(id=>({to:{id},types:[{associationCategory:'HUBSPOT_DEFINED',associationTypeId:204}]}))});}
}
const reviewError = message => Object.assign(new Error(message),{review:true});
function referredClientJob(job) {
 const f=job.fields;
 if(!['referral-intake','referral-intake-es'].includes(job.form))return null;
 if(f.registrationVersion&&(f.registrationVersion!=='2'||!Object.hasOwn(REGISTRATION_PURPOSES,f.registrationPurpose)))throw reviewError('Registration format needs review');
 if(f.registrationPurpose!=='client_referral'||f.registrationVersion!=='2')return null;
 if(f.clientSharingConsent!=='yes')throw reviewError('Client sharing authorization needs review');
 const email=text(f.clientEmail).toLowerCase(),phone=text(f.clientPhone);
 if(!text(f.clientName)||!['buyer','seller','international_owner'].includes(f.clientNeed)||(!email&&!phone)||email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw reviewError('Incomplete client registration');
 const clientPhoneKey=phoneKey(phone,phoneRegion({country:f.clientCountry})||'unknown');
 if(phone&&!clientPhoneKey)throw reviewError('Client phone format needs review');
 if(email&&email===f.email||clientPhoneKey&&clientPhoneKey===phoneKey(f.phone,phoneRegion(f)))throw reviewError('Client identity matches referring agent');
 const child=makeJob('buyer-mandate',{name:f.clientName,email,phone,country:f.clientCountry,
  city:f.clientLocation,propertyAddress:f.clientPropertyAddress,priceRange:f.clientBudget,timeline:f.clientTimeline,
  language:f.language,source:'agent-referral',sourcePage:f.sourcePage},job.key+'-client');
 if(!child)throw reviewError('Incomplete client registration');
 child.category={buyer:'buyer',seller:'south_florida_seller',international_owner:'international_owner'}[f.clientNeed];
 return child;
}
async function upsertContact(job,api,owner,excludedId) {
 const existing=await api.findContact(job.fields);
 if(existing&&String(existing.id)===String(excludedId))throw reviewError('Client identity matches referring agent');
 const p=buildContactProperties(job,existing?.properties||{},owner);
 if(existing){await api.updateContact(existing.id,p);return existing.id;}
 try{return (await api.createContact(p)).id;}
 catch(e){
  if(e.status!==409)throw e;
  const found=await api.findContact(job.fields);if(!found)throw e;
  if(String(found.id)===String(excludedId))throw reviewError('Client identity matches referring agent');
  await api.updateContact(found.id,buildContactProperties(job,found.properties,owner));return found.id;
 }
}
export async function syncJob(job,api,save,owner) {
 if(job.status==='synced')return;
 if(job.creatingActivity){const e=new Error('Prior activity outcome needs review');e.review=true;throw e;}
 const clientJob=referredClientJob(job);
 if(!job.contactId){
  job.contactId=await upsertContact(job,api,owner);
  if(!job.contactId)throw new Error('Missing contact ID');await save(job);
 }
 if(clientJob&&!job.referredContactId){
  job.referredContactId=await upsertContact(clientJob,api,owner,job.contactId);
  if(!job.referredContactId)throw new Error('Missing referred contact ID');await save(job);
 }
 if(clientJob&&!job.referralAssociated){
  await api.associateContacts(job.contactId,job.referredContactId);
  job.referralAssociated=true;await save(job);
 }
 const owned=owner?{hubspot_owner_id:owner}:{};
 if(!job.noteId){
  job.creatingActivity='note';await save(job);
  try{job.noteId=(await api.createNote({hs_timestamp:job.at,hs_note_body:inquiryNote(job),...owned},job.contactId,job.referredContactId)).id;}
  catch(e){if(!e.review){delete job.creatingActivity;await save(job);}throw e;}
  if(!job.noteId){const e=new Error('Missing note ID');e.review=true;throw e;}delete job.creatingActivity;await save(job);
 }
 // Downloads remain unqualified inquiries; a review task is not a marketing sequence.
 if(!job.taskId){
  job.creatingActivity='task';await save(job);
  try{job.taskId=(await api.createTask({hs_timestamp:new Date(Date.parse(job.at)+60*60*1000).toISOString(),
   hs_task_subject:(clientJob?`Website: Client referral — ${job.fields.clientName} / ${job.fields.name}`:
    `Website: ${REGISTRATION_PURPOSES[job.fields.registrationPurpose]||CATEGORIES[job.category]} — ${job.fields.name||job.fields.email||job.fields.phone}`).slice(0,240),
   hs_task_body:inquiryNote(job),hs_task_status:'NOT_STARTED',hs_task_type:'TODO',
   hs_task_priority:job.category==='south_florida_seller'||clientJob?.category==='south_florida_seller'?'HIGH':'MEDIUM',...owned},job.contactId,job.referredContactId)).id;}
  catch(e){if(!e.review){delete job.creatingActivity;await save(job);}throw e;}
  if(!job.taskId){const e=new Error('Missing task ID');e.review=true;throw e;}delete job.creatingActivity;await save(job);
 }
 job.status='synced';job.syncedAt=new Date().toISOString();await save(job);
}
