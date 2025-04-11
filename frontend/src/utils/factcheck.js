import axios from 'axios';

export const checkGoogleFactCheck = async (claimText) => {
  const response = await axios.get(
    `https://factchecktools.googleapis.com/v1alpha1/claims:search`,
    {
      params: {
        query: claimText,
        key: import.meta.env.VITE_GOOGLE_API_KEY
      }
    }
  );
  return response.data.claims || [];
};