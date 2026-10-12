// One-time administrative setup. Send the private-app token through stdin only.
// Never put a token in the shell command, source, a .env file, or browser bundle.
import { HubSpotClient, PROPERTY_DEFINITIONS } from '../netlify/functions/_shared/hubspotSync.mjs';
let input='';for await(const chunk of process.stdin)input+=chunk;
const token=input.trim();input='';
if(!token)throw new Error('A server credential is required on stdin');
const api=new HubSpotClient(token);
const owner=await api.request('/crm/v3/owners/100759119');
if(owner.email?.toLowerCase()!=='contact@carlosre.com')throw new Error('Credential does not match the intended Carlos owner');
for(const definition of PROPERTY_DEFINITIONS){
 let current;
 try{current=await api.request('/crm/v3/properties/contacts/'+definition.name)}catch(e){if(e.status!==404)throw e;}
 if(current){
  if(current.type!==definition.type||current.fieldType!==definition.fieldType||
   (definition.hasUniqueValue&&!current.hasUniqueValue)||
   (definition.options&&definition.options.some(o=>!current.options?.some(c=>c.value===o.value))))
    throw new Error('Property definition needs review: '+definition.name);
  console.log('Verified '+definition.name);
 }else{await api.request('/crm/v3/properties/contacts','POST',definition);console.log('Created '+definition.name);}
}
console.log('Schema ready. Set server environment variables and redeploy before enabling CRM sync.');
