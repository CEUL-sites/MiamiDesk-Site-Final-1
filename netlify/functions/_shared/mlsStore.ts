import { getStore, getDeployStore } from '@netlify/blobs';

// Previews/local testing must never overwrite production inventory.
export function mlsStore(name: string, deployContext: string) {
  return deployContext === 'production'
    ? getStore({ name, consistency: 'strong' })
    : getDeployStore({ name, consistency: 'strong' });
}
