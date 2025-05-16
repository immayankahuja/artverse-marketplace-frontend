
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Collection, NFT, dummyCollections } from '@/utils/dummyData';
import { getAllNFTs, formatAddress } from '@/utils/nftFunctions';
import NFTCard from '@/components/NFTCard';
import { Button } from '@/components/ui/button';

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [collectionNFTs, setCollectionNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCollection(id);
    }
  }, [id]);

  const loadCollection = (collectionId: string) => {
    setIsLoading(true);
    
    try {
      // Find collection by ID
      const foundCollection = dummyCollections.find(c => c.id === collectionId);
      
      if (foundCollection) {
        setCollection(foundCollection);
        
        // Get all NFTs that belong to this collection
        const allNFTs = getAllNFTs();
        const nftsInCollection = allNFTs.filter(nft => nft.collection === foundCollection.name);
        
        setCollectionNFTs(nftsInCollection);
      } else {
        // Collection not found
        setCollection(null);
      }
    } catch (error) {
      console.error("Error loading collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="h-40 bg-secondary/30 rounded-xl mb-8"></div>
          <div className="bg-secondary/30 h-8 w-1/3 rounded mb-4"></div>
          <div className="bg-secondary/30 h-4 w-1/2 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-secondary/30 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Collection Not Found</h2>
          <p className="mb-6">The collection you're looking for doesn't exist or has been removed.</p>
          <Link to="/marketplace">
            <Button className="btn-primary">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Collection Banner */}
        <div className="h-40 bg-gradient-to-r from-nft-purple/30 to-secondary/50 rounded-xl mb-8">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-30 rounded-xl"></div>
        </div>
        
        {/* Collection Info */}
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <div className="w-24 h-24 bg-nft-card-bg rounded-xl overflow-hidden border-4 border-nft-background-dark -mt-12 mr-4 mb-4 md:mb-0">
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{collection.name}</h1>
            <div className="flex items-center text-nft-text-secondary">
              <span>Created by </span>
              <span className="text-nft-purple ml-1">{formatAddress(collection.owner)}</span>
              <span className="mx-2">•</span>
              <span>{collectionNFTs.length} items</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-nft-text-secondary">{collection.description}</p>
        </div>
        
        {/* Collection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-nft-card-bg border border-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400">Floor Price</div>
            <div className="text-xl font-bold">
              {collectionNFTs.length > 0
                ? `${Math.min(...collectionNFTs.map(nft => nft.price)).toFixed(3)} ETH`
                : "0.000 ETH"}
            </div>
          </div>
          <div className="bg-nft-card-bg border border-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400">Volume</div>
            <div className="text-xl font-bold">
              {(collectionNFTs.reduce((sum, nft) => sum + nft.price, 0) * 2.5).toFixed(3)} ETH
            </div>
          </div>
          <div className="bg-nft-card-bg border border-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400">Items</div>
            <div className="text-xl font-bold">{collectionNFTs.length}</div>
          </div>
          <div className="bg-nft-card-bg border border-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400">Owners</div>
            <div className="text-xl font-bold">
              {new Set(collectionNFTs.map(nft => nft.owner)).size}
            </div>
          </div>
        </div>
        
        {/* NFT Grid */}
        <h2 className="section-title mb-6">Collection Items</h2>
        
        {collectionNFTs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-nft-card-bg border border-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-nft-text-secondary">
              This collection doesn't have any NFTs yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
