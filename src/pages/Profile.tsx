
import React, { useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/utils/nftFunctions';
import { toast } from 'sonner';
import ProfileTabs from '@/components/ProfileTabs';

const Profile: React.FC = () => {
  const { walletAddress, isConnected } = useWallet();
  const navigate = useNavigate();
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet to view your profile");
      navigate('/');
    }
  }, [isConnected, navigate]);
  
  if (!isConnected) {
    return null; // Don't render anything if not connected (will be redirected)
  }
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Profile</h1>
              <p className="text-nft-text-secondary">
                Wallet Address: {formatAddress(walletAddress || '')}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/create-nft')}
                className="btn-primary"
              >
                Create New NFT
              </Button>
            </div>
          </div>
          
          <div className="h-40 bg-gradient-to-r from-nft-purple/30 to-secondary/50 rounded-xl mb-8"></div>
          
          <div className="flex items-center">
            <div className="w-24 h-24 bg-nft-card-bg rounded-full border-4 border-nft-background-dark flex items-center justify-center text-3xl font-bold text-nft-purple -mt-12 mr-4">
              {walletAddress ? walletAddress[2].toUpperCase() : '?'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                Wallet {formatAddress(walletAddress || '')}
              </h2>
              <p className="text-nft-text-secondary">
                Joined {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
