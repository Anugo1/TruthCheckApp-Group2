import { Web3Storage } from 'web3.storage';

export const storeClaim = async (claimText) => {
  const client = new Web3Storage({ token: import.meta.env.VITE_WEB3_STORAGE_TOKEN });
  const blob = new Blob([claimText], { type: 'text/plain' });
  const cid = await client.put([new File([blob], 'claim.txt')]);
  return cid;
};