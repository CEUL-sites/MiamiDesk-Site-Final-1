import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { makeJob, HubSpotClient, syncJob } from './hubspotSync.mjs';
export const HUBSPOT_STORE = 'hubspot-inquiries';
const env = key => typeof Netlify!=='undefined'?Netlify.env.get(key):process.env[key];
export const syncConfigured = () => env('HUBSPOT_SYNC_ENABLED')==='true' && !!env('HUBSPOT_PRIVATE_APP_TOKEN') && !!env('HUBSPOT_OWNER_ID');
export const MAX_ALERT_ATTEMPTS = 5;

// lead-notify queues a copy of every screened lead, because Netlify fires
// submission-created only for submissions it does not spam-file. The copy waits
// BACKUP_DELAY_MS so the fuller submission can arrive, then is discarded when that
// same submission reached the primary path. formRenderedAt is sent on both paths
// and identifies the submission: a second inquiry from the same contact is kept.
export const BACKUP_DELAY_MS = 10 * 60 * 1000;
export const BACKUP_MATCH_MS = 30 * 60 * 1000;
const PRIMARY_PREFIX = 'primary-seen/';
/** Hash of form + contact + submission; holds no readable contact data. Empty when the submission cannot be identified. */
export const leadIdentity = (job,formRenderedAt) => formRenderedAt?createHash('sha256').update([job.form,job.fields.email||job.fields.phone.replace(/\D/g,''),String(formRenderedAt)].join('|')).digest('hex'):'';
// These forms send the visitor's country in lead-notify's `city` field.
const COUNTRY_IN_CITY = new Set(['buyer-mandate','referral-intake','referral-intake-es','agency-partner-intake']);

/**
 * Keep a short-lived recovery record when WhatsApp was not configured at the
 * time of an otherwise-successful HubSpot sync. The CRM job still completes;
 * once a sender is connected, later scheduled runs replay recent alerts.
 *
 * This is intentionally capped: old inquiries must not suddenly flood Carlos's
 * private WhatsApp after a delayed setup, and bad tokens must not retry forever.
 */
export const OWNER_ALERT_RECOVERY_WINDOW_MS = 24 * 60 * 60 * 1000;
const ALERT_AWAITING_PREFIX = 'owner-alert-awaiting/';
const ALERT_DELIVERED_PREFIX = 'owner-alert-delivered/';
async function recoverAwaitingOwnerAlerts(store, notifySynced, deadline) {
 if (!notifySynced) return;
 const waiting = await store.list({prefix:ALERT_AWAITING_PREFIX});
 let checked = 0;
 for (const entry of waiting.blobs) {
  if (checked >= 2 || Date.now() > deadline - 15_000) break;
  const job = await store.get(entry.key,{type:'json'});
  if (!job) continue;
  const age = Date.now() - Date.parse(job.at);
  if (!Number.isFinite(age) || age > OWNER_ALERT_RECOVERY_WINDOW_MS) {
   await store.delete(entry.key);
   continue;
  }
  if (job.alertRetryAt && job.alertRetryAt > Date.now()) continue;
  if (await store.get(ALERT_DELIVERED_PREFIX+job.key,{type:'json'})) {
   await store.delete(entry.key);
   continue;
  }
  checked++;
  let response;
  try { response = await notifySynced(job); }
  catch (e) { response = {ok:false,configured:true,detail:e instanceof Error?e.name:'unknown'}; }
  if (response?.ok) {
   const sentAt = new Date().toISOString();
   await store.setJSON(ALERT_DELIVERED_PREFIX+job.key,{sentAt},{onlyIfNew:true});
   const done = await store.get('done/'+job.key,{type:'json'});
   if (done) {
    done.ownerAlert = 'sent';
    done.whatsappSentAt = sentAt;
    await store.setJSON('done/'+job.key,done);
   }
   await store.delete(entry.key);
   console.log('Recovered an owner WhatsApp alert',{key:job.key});
  } else if (response?.configured === false) {
   // No sender: keep recent alerts queued, not a retry storm.
   break;
  } else {
   job.alertRecoveryAttempts = (job.alertRecoveryAttempts||0)+1;
   if (job.alertRecoveryAttempts >= MAX_ALERT_ATTEMPTS) {
    const done = await store.get('done/'+job.key,{type:'json'});
    if (done) { done.ownerAlert = 'failed'; await store.setJSON('done/'+job.key,done); }
    await store.delete(entry.key);
    console.error('Owner WhatsApp alert recovery exhausted',{key:job.key});
   } else {
    job.alertRetryAt = Date.now()+Math.min(60*60*1000,60_000*2**job.alertRecoveryAttempts);
    await store.setJSON(entry.key,job);
    console.error('Owner WhatsApp alert recovery will retry',{key:job.key});
   }
  }
 }
}
export const inquiryStore = () => getStore({name:HUBSPOT_STORE,consistency:'strong'});
export async function enqueueSubmission(payload,store=inquiryStore()) {
 const f=payload.data||{};
 const form=payload.form_name||payload.formName||f['form-name'];
 const job=makeJob(form,f,payload.id||payload.submission_id);
 if(!job)return {status:'skipped'};
 if(await store.get('done/'+job.key,{type:'json'}))return {status:'synced'};
 await store.setJSON('pending/'+job.key,job,{onlyIfNew:true});
 // Only after the lead is safely queued: this marker discards its backup copy.
 const identity=leadIdentity(job,f.formRenderedAt);
 try { if(identity)await store.setJSON(PRIMARY_PREFIX+identity,{at:new Date().toISOString()}); }
 catch (e) { console.error('Primary lead marker not saved',{error:e instanceof Error?e.name:'unknown'}); }
 return {status:'queued',key:job.key};
}
// Public endpoint: keep strings only, bounded in count and size.
function structuredFields(input) {
 if(!input||typeof input!=='object'||Array.isArray(input))return {};
 return Object.fromEntries(Object.entries(input).filter(([k,v])=>typeof v==='string'&&v&&/^[A-Za-z]{1,40}$/.test(k)&&!['botField','formName','formRenderedAt'].includes(k)).slice(0,40).map(([k,v])=>[k,v.slice(0,4000)]));
}
/** Delayed HubSpot copy of a lead received by lead-notify. Lambda-style callers use eventual reads. */
export async function enqueueBackupLead(raw,store=getStore(HUBSPOT_STORE),now=Date.now()) {
 const {botField,formRenderedAt,crmFields,...base}=raw||{};
 const form=base.formName||'';
 // crmFields adds the structured answers the sync needs. The screened contact
 // identity always comes from the top level and cannot be replaced by it.
 const {name='',email='',phone=''}=base;
 const fields={...base,...structuredFields(crmFields),name,email,phone};
 if(COUNTRY_IN_CITY.has(form)){fields.country=structuredFields(crmFields).country||fields.city||'';fields.city='';}
 if(form==='agency-partner-intake')fields.propertyAddress='';
 fields.received_via='backup notifier (lead-notify)';
 const probe=makeJob(form,fields,'probe');
 if(!probe)return {status:'skipped'};
 const identity=leadIdentity(probe,formRenderedAt);
 const job=makeJob(form,fields,'backup|'+(identity||probe.key+'|'+now));
 Object.assign(job,{backup:true,identity,at:new Date(now).toISOString(),nextAttemptAt:now+BACKUP_DELAY_MS});
 if(await store.get('done/'+job.key,{type:'json'}))return {status:'synced'};
 await store.setJSON('pending/'+job.key,job,{onlyIfNew:true});
 return {status:'queued',key:job.key};
}
/** Inquiries the sync will not retry on its own, for the daily digest. */
export async function listReviewInquiries(store=getStore(HUBSPOT_STORE)) {
 const {blobs}=await store.list({prefix:'pending/'});
 const jobs=await Promise.all(blobs.map(b=>store.get(b.key,{type:'json'})));
 return jobs.filter(j=>j?.status==='review');
}
/** Archive a manually handled or test review inquiry so it stops alerting in the daily digest. */
export async function resolveReviewInquiry(key,reason='resolved_manually',store=inquiryStore()) {
 const cleanKey=String(key||'').replace(/^pending\//,'').trim();
 if(!cleanKey)return {status:'invalid_key'};
 const pendingKey='pending/'+cleanKey;
 const job=await store.get(pendingKey,{type:'json'});
 if(!job)return {status:'not_found',key:cleanKey};
 if(job.status!=='review')return {status:'not_in_review',key:cleanKey,currentStatus:job.status};
 const resolved={...job,status:'resolved',resolvedAt:new Date().toISOString(),resolutionReason:String(reason||'resolved_manually').slice(0,200)};
 await store.setJSON('resolved/'+cleanKey,resolved);
 await store.delete(pendingKey);
 return {status:'resolved',key:cleanKey,resolvedAt:resolved.resolvedAt};
}
export async function drainInquiries(store=inquiryStore(),api,owner=env('HUBSPOT_OWNER_ID'),notifySynced) {
 if(!api&&!syncConfigured())return {status:'not_configured',processed:0};
 const deadline=Date.now()+20_000;
 api ||= new HubSpotClient(env('HUBSPOT_PRIVATE_APP_TOKEN'),fetch,undefined,deadline);
 const lockKey='processor-lock';const prior=await store.getWithMetadata(lockKey,{type:'json'});
 if(prior&&prior.data.until>Date.now())return {status:'busy',processed:0};
 const lock=await store.setJSON(lockKey,{until:Date.now()+120_000},prior?{onlyIfMatch:prior.etag}:{onlyIfNew:true});
 if(!lock.modified)return {status:'busy',processed:0};
 let processed=0,review=0,failed=0;
 try{
  // Notification recovery is ancillary. A transient alert-store error must
  // never block a newly submitted lead from reaching HubSpot.
  try { await recoverAwaitingOwnerAlerts(store,notifySynced,deadline); }
  catch (e) { console.error('Owner alert recovery unavailable; CRM sync continues',{error:e instanceof Error?e.name:'unknown'}); }
  const listing=await store.list({prefix:'pending/'});
  for(const blob of listing.blobs){
   if(processed>=10||Date.now()>deadline-3000)break;
   const job=await store.get(blob.key,{type:'json'});
   if(!job||job.nextAttemptAt>Date.now())continue;
   if(job.status==='review'){review++;continue;}
   if(job.backup&&job.identity&&!job.contactId){
    const primary=await store.get(PRIMARY_PREFIX+job.identity,{type:'json'});
    if(primary&&Math.abs(Date.parse(primary.at)-Date.parse(job.at))<=BACKUP_MATCH_MS){await store.delete(blob.key);continue;}
   }
   const save=j=>store.setJSON(blob.key,j);
   try{
    await syncJob(job,api,save,owner);
    // The WhatsApp alert is gated on a completed HubSpot contact, note, and task, and
    // its checkpoint is saved before the CRM job is marked done so a retry cannot
    // re-create CRM activities or re-send it. It is an optional extra channel: the
    // HubSpot task reminder and the email are the standing owner alerts. So a
    // channel that is not set up completes at once, and a failing one is retried
    // MAX_ALERT_ATTEMPTS times and then released instead of looping forever.
    if(notifySynced && !job.whatsappSentAt && !job.ownerAlert){
      let delivery;
      try{delivery=await notifySynced(job);}
      catch(e){delivery={ok:false,detail:e instanceof Error?e.message:'unknown error'};}
      if(delivery?.ok){job.whatsappSentAt=new Date().toISOString();job.ownerAlert='sent';}
      else if(delivery?.configured===false){
        job.ownerAlert='not_configured';
        await store.setJSON(ALERT_AWAITING_PREFIX+job.key,job,{onlyIfNew:true});
        console.warn('Owner WhatsApp sender not configured; recent alert held for recovery',{key:job.key});
      }
      else{
        job.alertAttempts=(job.alertAttempts||0)+1;
        if(job.alertAttempts<MAX_ALERT_ATTEMPTS){
          const e=new Error('WhatsApp delivery not confirmed: '+String(delivery?.detail||'unknown').slice(0,160));
          e.notificationFailure=true;throw e;
        }
        job.ownerAlert='failed';
        console.error('WhatsApp notification abandoned after retries',{key:job.key,error:String(delivery?.detail||'unknown').slice(0,160)});
      }
      await save(job);
    }
    await store.setJSON('done/'+job.key,job);await store.delete(blob.key);
   }catch(e){
    job.attempts++;job.lastError=e.message;job.status=e.review||e.status===400?'review':job.status==='synced'?'synced':'pending';
    job.nextAttemptAt=Date.now()+Math.min(3600_000,60_000*2**Math.min(job.attempts,6));
    await save(job);failed++;
    // No raw lead values or credential in logs. Review jobs are retained for reconciliation.
    console.error(e.notificationFailure?'WhatsApp notification will retry':'HubSpot inquiry needs attention',{key:job.key,status:job.status,error:e.message});
   }
   processed++;
  }
 }finally{await store.setJSON(lockKey,{until:0});}
 return {status:'processed',processed,review,failed};
}
