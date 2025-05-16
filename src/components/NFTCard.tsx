
import React from 'react';
import { Link } from 'react-router-dom';
import { NFT } from '@/utils/dummyData';
import { formatEthPrice, formatAddress } from '@/utils/nftFunctions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface NFTCardProps {
  nft: NFT;
  hideOwner?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, hideOwner = false }) => {
  return (
    <Link to={`/nft/${nft.id}`} className="block">
      <Card className="nft-card h-full hover:translate-y-[-5px] transition-all duration-300">
        <div className="relative">
          <img 
            src={nft.image} 
            alt={nft.title}
            className="w-full aspect-square object-cover"
          />
          {nft.collection && (
            <div className="absolute top-3 right-3">
              <span className="badge bg-nft-purple/80 text-white backdrop-blur-sm">
                {nft.collection}
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{nft.title}</h3>
          <p className="text-nft-text-secondary text-sm line-clamp-2 mb-3 h-10">
            {nft.description}
          </p>
          
          {!hideOwner && (
            <div className="flex items-center text-xs text-gray-400 mb-3">
              <span>Owner: {formatAddress(nft.owner)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-nft-purple font-bold">{formatEthPrice(nft.price)}</span>
            </div>
            {nft.quantity && nft.quantity > 1 && (
              <span className="text-xs text-gray-400">
                {nft.quantity} available
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 py-2 bg-secondary/20 flex justify-between border-t border-gray-800 text-xs text-gray-400">
          <span>{nft.likes} likes</span>
          <span>{nft.views} views</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NFTCard;
