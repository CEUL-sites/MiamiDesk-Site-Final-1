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
 test(`${development} / ${type} / ${language}: server-only rate lookup when Commission line is omitted`,()=>{
  const lead={name:'QA Professional',email:'qa@example.com',phone:'+19545550101',formName:'referral-intake',registrationPurpose:'professional_inquiry',language,sourcePage:'https://gilmar-urg-global-desk.ucarlos.chatgpt.site/',message:`Global Desk reference: GD-87654321\nDevelopment: ${development}\nCooperation mode: ${mode==='buyer_agency'?(language==='es'?'Agencia de comprador hasta el cierre':'Buyer agency through closing'):(language==='es'?'Solo referencia':'Referral only')} (${mode})\nNO REAL CLIENT`};
  const score=scoreLead(lead),subject=formatLeadEmailSubject(lead,score),body=formatLeadEmail(lead,score,{timestamp:'11/16/2026, 2:00 PM'});
  const expectedRate=rate.replace('.',language==='es'?',':'.');
  const expectedSubjectFee=mode==='referral'?`${expectedRate} referral fee`:`${expectedRate} buyer agency`;
  assert.equal(subject,`Agent client registration | ${development} | ${type} | ${expectedSubjectFee}`);
  assert.ok(body.startsWith('Agent client registration'));
  assert.ok(body.includes(`Development: ${development}`));
  assert.ok(body.includes(`Cooperation type: ${type}`));
  assert.ok(body.includes(`Commission: ${commission}`));
  assert.ok(body.includes('GD-87654321'));
  assert.doesNotMatch(subject+'\n'+body,/P3|Nurture|No property address|Score breakdown/);
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
test('other-property registration without Commission line resolves case-by-case text without inventing a rate',()=>{
 const lead={formName:'referral-intake',registrationPurpose:'professional_inquiry',language:'en',message:'Development: GILMAR other property\nCooperation mode: Referral only (referral)'};
 const score=scoreLead(lead),subject=formatLeadEmailSubject(lead,score),body=formatLeadEmail(lead,score);
 assert.equal(subject,'Agent client registration | GILMAR other property | Referral | commission agreed in writing');
 assert.match(body,/Commission: Compensation on other GILMAR property is confirmed in writing case by case\./);
 assert.doesNotMatch(subject+'\n'+body,/\d\s*%/);
});
test('commission payment request submission carries GD- reference, unit, closing date, price, and paying brokerage contact',()=>{
 const lead={
  name:'QA Broker',
  email:'broker@example.com',
  phone:'+19545550101',
  formName:'referral-intake',
  registrationPurpose:'payment_request',
  sourcePage:'gilmar-urg-global-desk',
  message:[
   'Commission payment request',
   'Global Desk reference: GD-99887766',
   'Development: Be Grand El Limonar',
   'Unit: Fifth Floor Unit C',
   'Closing date: 2026-12-15',
   'Final sale price: €1,950,000',
   'Paying brokerage contact: Maria Gomez <accounting@example.es>',
   'Closing statement: deed-closing-c.pdf',
  ].join('\n'),
 };
 const score=scoreLead(lead),subject=formatLeadEmailSubject(lead,score),body=formatLeadEmail(lead,score,{timestamp:'11/16/2026, 2:15 PM'});
 assert.ok(subject.startsWith('Commission payment request'));
 assert.ok(subject.includes('GD-99887766'));
 assert.ok(subject.includes('Be Grand El Limonar — Fifth Floor Unit C'));
 assert.ok(body.startsWith('Commission payment request'));
 assert.ok(body.includes('Global Desk reference: GD-99887766'));
 assert.ok(body.includes('Development / unit: Be Grand El Limonar — Fifth Floor Unit C'));
 assert.ok(body.includes('Closing date: 2026-12-15'));
 assert.ok(body.includes('Final sale price: €1,950,000'));
 assert.ok(body.includes('Paying brokerage contact: Maria Gomez <accounting@example.es>'));
 assert.ok(body.includes('Closing statement: deed-closing-c.pdf'));
 assert.doesNotMatch(subject+'\n'+body,/P3|Nurture|Score breakdown/);
});
