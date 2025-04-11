// src/components/QuickCheck.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import TruthCheckABI from '../abi/TruthCheck.json';

const contractAddress = "YOUR_CONTRACT_ADDRESS";

export default function QuickCheck() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, TruthCheckABI, signer);
    
    // Generate unique claim ID
    const claimId = Date.now().toString();
    
    try {
      const tx = await contract.submitClaim(claimId, "ipfs-hash-placeholder");
      await tx.wait();
      setResult({ status: 'success', message: 'Claim submitted successfully!' });
    } catch (error) {
      setResult({ status: 'error', message: 'Submission failed' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Empowering Nigerians with the Truth</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Fight misinformation with our Truth Quick Check Tool</h2>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border rounded-md"
              placeholder="Paste a message, link, or describe the claim"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
            />
            <button 
              onClick={handleVerify}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Verify claim
            </button>
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-md ${result.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.message}
          </div>
        )}

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold">Verified Claims</h3>
            <p className="text-2xl">15</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold">Reputation</h3>
            <p className="text-2xl">Level 2</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold">$TRUTH Balance</h3>
            <p className="text-2xl">780</p>
          </div>
        </div>
      </div>
    </div>
  );
}