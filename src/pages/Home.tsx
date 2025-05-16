
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NFTCard from '@/components/NFTCard';
import { getFeaturedNFTs, dummyNFTs } from '@/utils/dummyData';
import { initializeLocalStorage } from '@/utils/nftFunctions';

const Home: React.FC = () => {
  // Initialize local storage with dummy data on first load
  useEffect(() => {
    initializeLocalStorage(dummyNFTs);
  }, []);

  const featuredNFTs = getFeaturedNFTs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nft-purple/20 to-transparent z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover, Collect, and Sell Extraordinary NFTs
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The world's largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs)
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace">
                <Button className="btn-primary text-lg px-8 py-6">
                  Explore
                </Button>
              </Link>
              <Link to="/create-nft">
                <Button className="btn-outline text-lg px-8 py-6">
                  Create
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-nft-card-bg to-nft-background-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-nft-purple mb-2">10K+</h3>
              <p className="text-gray-400">Artworks</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-nft-purple mb-2">8K+</h3>
              <p className="text-gray-400">Artists</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-nft-purple mb-2">5K+</h3>
              <p className="text-gray-400">Collectors</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-nft-purple mb-2">32 ETH</h3>
              <p className="text-gray-400">Trading Volume</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Artworks</h2>
            <Link to="/marketplace" className="text-nft-purple hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-nft-card-bg">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">How It Works</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Your guide to using the NFT marketplace - from creating to collecting
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-nft-purple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nft-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Create & Upload</h3>
              <p className="text-gray-400">
                Create your artwork and upload it to the marketplace to start selling
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-nft-purple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nft-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">List & Sell</h3>
              <p className="text-gray-400">
                List your NFT at your desired price and start selling it to collectors
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-nft-purple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nft-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Collect & Trade</h3>
              <p className="text-gray-400">
                Collect NFTs to display in your profile and trade them with others
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-nft-purple/30 to-secondary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your NFT journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of artists and collectors already using our marketplace
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/marketplace">
                <Button className="btn-primary text-lg px-8 py-6">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
