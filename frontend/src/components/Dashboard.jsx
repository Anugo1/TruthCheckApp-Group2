// src/components/Dashboard.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import TruthCheckABI from '../abi/TruthCheck.json';

const contractAddress = "YOUR_CONTRACT_ADDRESS";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(780);

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setWallet(await signer.getAddress());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Decentralize the truth with TruthCheck</p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Welcome back, Truth Ninja!</h2>
            <p className="text-gray-600">Wallet: {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Not connected'}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{balance} $TRUTH</p>
            <p className="text-sm text-gray-600">Reputation Level 2</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Try quick check
          </button>
          {!wallet ? (
            <button
              onClick={connectWallet}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
            >
              Connect wallet
            </button>
          ) : (
            <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md">
              Connected
            </button>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">How it works</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Store verified claims on-chain</li>
            <li>Community votes on disputed info</li>
            <li>Earn tokens for accurate fact-checking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}