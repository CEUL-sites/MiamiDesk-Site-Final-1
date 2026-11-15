import test from 'node:test';
import assert from 'node:assert/strict';
import {formatLeadEmail,formatLeadEmailSubject,scoreLead} from '../netlify/functions/_shared/leadScore.ts';
const examples=[['Be Grand El Limonar','3%'],['Balcón del Mediterráneo','3%'],['The Elysian Collection','1.5%']];
for(const [development,agencyRate] of examples)for(const mode of ['buyer_agency','referral'])for(const language of ['en','es']){
 const type=mode==='buyer_agency'?'Buyer agency':'Referral';
 const rate=mode==='referral'?'1%':agencyRate;
 const commission=language==='es'?`${rate.replace('.',',')} ${mode==='referral'?'de honorarios de referencia sin acuerdo de representación de comprador firmado.':'del precio de venta con acuerdo de representación de comprador firmado y acompañamiento hasta el cierre.'}`:`${rate} ${mode==='referral'?'referral fee without a signed buyer agency agreement.':'of sale price with a signed buyer agency agreement and participation through closing.'}`;
 test(`${development} / ${type} / ${language}: agent-specific subject and commission`,()=>{
  const lead={name:'QA Professional',email:'qa@example.com',phone:'+19545550101',formName:'referral-intake',registrationPurpose:'professional_inquiry',language,sourcePage:'https://gilmar-urg-global-desk.ucarlos.chatgpt.site/',message:`Global Desk reference: GD-12345678\nDevelopment: ${development}\nCooperation mode: ${type} (${mode})\nCommission: ${commission}\nNO REAL CLIENT`};
  const score=scoreLead(lead),subject=formatLeadEmailSubject(lead,score),body=formatLeadEmail(lead,score,{timestamp:'11/14/2026, 7:30 PM'});
  assert.ok(subject.startsWith('Agent client registration'));
  assert.ok(subject.includes(development));assert.ok(subject.includes(type));assert.ok(subject.includes(rate.replace('.',language==='es'?',':'.')));
  assert.ok(body.startsWith('Agent client registration'));assert.ok(body.includes(`Development: ${development}`));assert.ok(body.includes(`Cooperation type: ${type}`));assert.ok(body.includes(`Commission: ${commission}`));
  assert.doesNotMatch(subject+'\n'+body,/P3|Nurture|No property address|Score breakdown/);
  assert.ok(body.includes('GD-12345678'));assert.ok(body.includes('qa@example.com'));
 });
}
test('seller and direct buyer alerts retain existing scoring presentation',()=>{
 for(const formName of ['seller-intake','buyer-mandate']){const lead={name:'QA Seller',email:'qa@example.com',formName};const score=scoreLead(lead);assert.match(formatLeadEmailSubject(lead,score),/^\[P3\] QA Seller/);assert.match(formatLeadEmail(lead,score),/^P3 · Nurture/);}
});
test('kit access and generic partner registration are not labelled client introductions',()=>{
 for(const registrationPurpose of ['agent_registration','']){const lead={formName:'referral-intake',registrationPurpose};assert.doesNotMatch(formatLeadEmailSubject(lead,scoreLead(lead)),/^Agent client registration/);}
});
test('other-property registration does not invent a commission',()=>{
 const lead={formName:'referral-intake',registrationPurpose:'professional_inquiry',message:'Development: GILMAR other property\nCooperation mode: Referral (referral)\nCommission: Compensation on other GILMAR property is confirmed in writing case by case.'};
 const body=formatLeadEmail(lead,scoreLead(lead));assert.ok(body.startsWith('Agent client registration'));assert.match(body,/confirmed in writing case by case/);assert.doesNotMatch(body,/\d\s*%/);
});
