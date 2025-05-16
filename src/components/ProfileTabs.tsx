
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/context/WalletContext';
import { getAllNFTs, getOwnedNFTs, getCreatedNFTs } from '@/utils/nftFunctions';
import { NFT } from '@/utils/dummyData';
import NFTCard from './NFTCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfileTabs: React.FC = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('owned');
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [createdNFTs, setCreatedNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      loadNFTs();
    }
  }, [walletAddress, activeTab]);

  const loadNFTs = async () => {
    setIsLoading(true);
    
    if (!walletAddress) return;
    
    try {
      const allNFTs = getAllNFTs();
      
      // Get owned NFT IDs and filter the NFTs
      const ownedIds = getOwnedNFTs(walletAddress);
      const owned = allNFTs.filter(nft => ownedIds.includes(nft.id));
      setOwnedNFTs(owned);
      
      // Get created NFT IDs and filter the NFTs
      const createdIds = getCreatedNFTs(walletAddress);
      const created = allNFTs.filter(nft => createdIds.includes(nft.id));
      setCreatedNFTs(created);
    } catch (error) {
      console.error("Error loading NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNFT = () => {
    navigate('/create-nft');
  };

  // Display empty state if no NFTs are found
  const renderEmptyState = (message: string) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">No NFTs Found</h3>
      <p className="text-nft-text-secondary mb-6">{message}</p>
      <Button className="btn-primary" onClick={handleCreateNFT}>
        Create Your First NFT
      </Button>
    </div>
  );

  return (
    <Tabs defaultValue="owned" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="owned">Owned NFTs</TabsTrigger>
        <TabsTrigger value="created">Created NFTs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="owned">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-secondary/30 rounded-lg h-80"></div>
            ))}
          </div>
        ) : ownedNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} hideOwner={true} />
            ))}
          </div>
        ) : (
          renderEmptyState("You don't own any NFTs yet.")
        )}
      </TabsContent>
      
      <TabsContent value="created">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-secondary/30 rounded-lg h-80"></div>
            ))}
          </div>
        ) : createdNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} hideOwner={true} />
            ))}
          </div>
        ) : (
          renderEmptyState("You haven't created any NFTs yet.")
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
