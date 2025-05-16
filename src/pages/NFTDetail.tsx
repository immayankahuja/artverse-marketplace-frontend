
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { NFT } from '@/utils/dummyData';
import { getNFTById, buyNFT, formatEthPrice, formatAddress } from '@/utils/nftFunctions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BuyModal } from '@/components/Modal';

const NFTDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { walletAddress, isConnected } = useWallet();
  const navigate = useNavigate();
  
  const [nft, setNft] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  
  // Determine if the current user is the owner
  const isOwner = walletAddress === nft?.owner;
  
  // Load NFT data
  useEffect(() => {
    if (id) {
      loadNFTData(id);
    }
  }, [id]);
  
  const loadNFTData = (nftId: string) => {
    setIsLoading(true);
    try {
      const nftData = getNFTById(nftId);
      if (nftData) {
        setNft(nftData);
      } else {
        toast.error("NFT not found");
        navigate('/marketplace');
      }
    } catch (error) {
      console.error("Error loading NFT:", error);
      toast.error("Failed to load NFT data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBuyClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to buy this NFT");
      return;
    }
    
    if (isOwner) {
      toast.error("You already own this NFT");
      return;
    }
    
    setIsBuyModalOpen(true);
  };
  
  const handleConfirmPurchase = async () => {
    if (!nft || !walletAddress) return;
    
    setIsProcessingPurchase(true);
    
    try {
      // Simulate a blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Process the purchase
      const updatedNFT = buyNFT(nft.id, walletAddress);
      
      if (updatedNFT) {
        setNft(updatedNFT);
        toast.success("NFT purchased successfully!");
        setIsBuyModalOpen(false);
      } else {
        toast.error("Failed to purchase NFT");
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      toast.error("Transaction failed");
    } finally {
      setIsProcessingPurchase(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-5xl animate-pulse">
          <div className="bg-secondary/30 h-8 w-1/3 rounded mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-secondary/30 aspect-square rounded-xl"></div>
            <div>
              <div className="bg-secondary/30 h-8 w-2/3 rounded mb-4"></div>
              <div className="bg-secondary/30 h-4 rounded mb-2"></div>
              <div className="bg-secondary/30 h-4 w-3/4 rounded mb-6"></div>
              <div className="bg-secondary/30 h-16 rounded mb-6"></div>
              <div className="bg-secondary/30 h-10 w-1/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!nft) {
    return (
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
          <p className="mb-6">The NFT you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div>
            <div className="bg-nft-card-bg rounded-xl p-4 border border-gray-800">
              <img 
                src={nft.image} 
                alt={nft.title}
                className="w-full rounded-lg aspect-square object-cover"
              />
            </div>
          </div>
          
          {/* NFT Details */}
          <div>
            <div className="mb-6">
              {nft.collection && (
                <div className="mb-2">
                  <span className="badge bg-nft-purple/80 text-white">
                    {nft.collection}
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl font-bold mb-2">{nft.title}</h1>
              
              <div className="flex items-center text-nft-text-secondary mb-4">
                <div>
                  <span>Created by</span>{' '}
                  <span className="text-nft-purple">{formatAddress(nft.creator)}</span>
                </div>
                <span className="mx-2">•</span>
                <div>
                  <span>Owned by</span>{' '}
                  <span className="text-nft-purple">{formatAddress(nft.owner)}</span>
                </div>
              </div>
              
              <div className="bg-secondary/20 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">Current price</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-white">
                        {formatEthPrice(nft.price)}
                      </span>
                    </div>
                  </div>
                  
                  {nft.quantity && nft.quantity > 1 && (
                    <div className="text-right">
                      <span className="text-sm text-gray-400">Quantity</span>
                      <div className="text-lg font-medium">{nft.quantity} available</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-nft-text-secondary">{nft.description}</p>
              </div>
              
              <div className="flex space-x-4">
                {!isOwner ? (
                  <Button 
                    className="btn-primary flex-1" 
                    onClick={handleBuyClick}
                  >
                    Buy Now
                  </Button>
                ) : (
                  <Button 
                    className="btn-outline flex-1" 
                    disabled
                  >
                    You Own This NFT
                  </Button>
                )}
              </div>
            </div>
            
            {/* NFT Properties */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Contract Address</div>
                  <div className="font-medium truncate">{formatAddress("0xd4e96ef8eee8678dbff4d535bd4b9c73cfb12a27")}</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Token ID</div>
                  <div className="font-medium">#{nft.id.split('-')[1]}</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Token Standard</div>
                  <div className="font-medium">ERC-721</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Creator Royalty</div>
                  <div className="font-medium">5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Buy Modal */}
        <BuyModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          onConfirm={handleConfirmPurchase}
          nftTitle={nft.title}
          nftPrice={nft.price}
          isProcessing={isProcessingPurchase}
        />
      </div>
    </div>
  );
};

export default NFTDetail;
