import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ReferralIntakeForm} from '../src/components/forms/ReferralIntakeForm';

test('agent registration requests the professional profile without requiring a client',()=>{
 const html=renderToStaticMarkup(<ReferralIntakeForm initialPurpose="agent_registration" />);
 for(const name of ['licenseeName','brokerageName','email','phone','country','registrationPurpose'])assert.ok(html.includes(`name="${name}"`),name);
 assert.ok(!html.includes('name="clientEmail"'));
 assert.ok(!html.includes('name="clientSharingConsent"'));
 assert.match(html,/Agent registration/);
});

test('client registration provides distinct contact fields and a required sharing authorization',()=>{
 const html=renderToStaticMarkup(<ReferralIntakeForm initialPurpose="client_referral" />);
 for(const name of ['clientName','clientEmail','clientPhone','clientCountry','clientNeed','clientBudget','clientTimeline','clientLocation','clientPropertyAddress','clientSharingConsent'])assert.ok(html.includes(`name="${name}"`),name);
 assert.match(html,/<input[^>]*required=""[^>]*name="clientSharingConsent"/);
 assert.match(html,/name="registrationVersion" value="2"/);
 assert.match(html,/id="referral-intake-clientName"/);
 assert.match(html,/for="referral-intake-clientName"/);
});

test('Spanish agent registration uses its existing Netlify form and localized client fields',()=>{
 const html=renderToStaticMarkup(<ReferralIntakeForm language="es" initialPurpose="client_referral" />);
 assert.match(html,/name="referral-intake-es"/);
 assert.match(html,/Nombre del cliente/);
 assert.match(html,/Autorización/);
 assert.match(html,/name="clientNeed"/);
});
