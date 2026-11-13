import { getStore } from '@netlify/blobs';
import { makeJob, HubSpotClient, syncJob } from './hubspotSync.mjs';
export const HUBSPOT_STORE = 'hubspot-inquiries';
const env = key => typeof Netlify!=='undefined'?Netlify.env.get(key):process.env[key];
export const syncConfigured = () => env('HUBSPOT_SYNC_ENABLED')==='true' && !!env('HUBSPOT_PRIVATE_APP_TOKEN') && !!env('HUBSPOT_OWNER_ID');
export const MAX_ALERT_ATTEMPTS = 5;
export const inquiryStore = () => getStore({name:HUBSPOT_STORE,consistency:'strong'});
export async function enqueueSubmission(payload,store=inquiryStore()) {
 const f=payload.data||{};
 const form=payload.form_name||payload.formName||f['form-name'];
 const job=makeJob(form,f,payload.id||payload.submission_id);
 if(!job)return {status:'skipped'};
 if(await store.get('done/'+job.key,{type:'json'}))return {status:'synced'};
 await store.setJSON('pending/'+job.key,job,{onlyIfNew:true});
 return {status:'queued',key:job.key};
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
  const listing=await store.list({prefix:'pending/'});
  for(const blob of listing.blobs){
   if(processed>=10||Date.now()>deadline-3000)break;
   const job=await store.get(blob.key,{type:'json'});
   if(!job||job.nextAttemptAt>Date.now())continue;
   if(job.status==='review'){review++;continue;}
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
      else if(delivery?.configured===false){job.ownerAlert='not_configured';}
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
