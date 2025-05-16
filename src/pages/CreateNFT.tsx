
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';
import NFTForm from '@/components/NFTForm';

const CreateNFT: React.FC = () => {
  const { isConnected } = useWallet();
  const navigate = useNavigate();
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet to create NFTs");
      navigate('/');
    }
  }, [isConnected, navigate]);
  
  if (!isConnected) {
    return null; // Don't render anything if not connected (will be redirected)
  }
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Create New NFT</h1>
        <p className="text-nft-text-secondary mb-8">
          Upload your artwork and create your NFT on the marketplace
        </p>
        
        <NFTForm />
      </div>
    </div>
  );
};

export default CreateNFT;
