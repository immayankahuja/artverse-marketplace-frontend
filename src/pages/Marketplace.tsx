
import React, { useState, useEffect } from 'react';
import NFTCard from '@/components/NFTCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NFT } from '@/utils/dummyData';
import { getAllNFTs } from '@/utils/nftFunctions';
import { 
  Search,
  ArrowUp,
  ArrowDown,
  Filter,
} from 'lucide-react';

type SortOption = 'price-low' | 'price-high' | 'recent' | 'popular';

const Marketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number | null }>({ min: 0, max: null });
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Collection filtering
  const uniqueCollections = Array.from(new Set(nfts.map(nft => nft.collection).filter(Boolean)));
  
  // Effect to load NFTs
  useEffect(() => {
    loadNFTs();
  }, []);
  
  // Effect to filter and sort NFTs whenever dependencies change
  useEffect(() => {
    filterAndSortNFTs();
  }, [nfts, searchQuery, sortOption, priceRange, selectedCollections]);

  const loadNFTs = async () => {
    setIsLoading(true);
    try {
      // Get NFTs from local storage or dummy data
      const loadedNFTs = getAllNFTs();
      setNfts(loadedNFTs);
    } catch (error) {
      console.error("Error loading NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortNFTs = () => {
    let result = [...nfts];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        nft => 
          nft.title.toLowerCase().includes(query) || 
          nft.description.toLowerCase().includes(query) ||
          nft.collection?.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    if (priceRange.min > 0 || priceRange.max !== null) {
      result = result.filter(nft => {
        const meetsMinPrice = nft.price >= priceRange.min;
        const meetsMaxPrice = priceRange.max === null || nft.price <= priceRange.max;
        return meetsMinPrice && meetsMaxPrice;
      });
    }
    
    // Apply collection filter
    if (selectedCollections.length > 0) {
      result = result.filter(nft => 
        nft.collection && selectedCollections.includes(nft.collection)
      );
    }
    
    // Apply sorting
    result = sortNFTs(result, sortOption);
    
    setFilteredNfts(result);
  };

  const sortNFTs = (nftsToSort: NFT[], option: SortOption): NFT[] => {
    const sorted = [...nftsToSort];
    
    switch (option) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'recent':
        return sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'popular':
        return sorted.sort((a, b) => b.likes - a.likes);
      default:
        return sorted;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleCollectionToggle = (collection: string) => {
    setSelectedCollections(prev => {
      if (prev.includes(collection)) {
        return prev.filter(c => c !== collection);
      } else {
        return [...prev, collection];
      }
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? (type === 'min' ? 0 : null) : parseFloat(value);
    
    setPriceRange(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const toggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortOption('recent');
    setPriceRange({ min: 0, max: null });
    setSelectedCollections([]);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="section-title mb-8">NFT Marketplace</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="input-field pl-10"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              className={`btn-outline flex items-center gap-2 ${filterOpen ? 'bg-nft-purple text-white' : ''}`}
              onClick={toggleFilters}
            >
              <Filter size={16} />
              Filters
            </Button>
            
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant={sortOption === 'price-low' ? 'default' : 'outline'}
                size="sm"
                className={sortOption === 'price-low' ? 'bg-nft-purple' : ''}
                onClick={() => handleSortChange('price-low')}
              >
                <ArrowUp size={16} className="mr-1" /> Price
              </Button>
              
              <Button
                variant={sortOption === 'price-high' ? 'default' : 'outline'}
                size="sm"
                className={sortOption === 'price-high' ? 'bg-nft-purple' : ''}
                onClick={() => handleSortChange('price-high')}
              >
                <ArrowDown size={16} className="mr-1" /> Price
              </Button>
              
              <Button
                variant={sortOption === 'recent' ? 'default' : 'outline'}
                size="sm"
                className={sortOption === 'recent' ? 'bg-nft-purple' : ''}
                onClick={() => handleSortChange('recent')}
              >
                Recent
              </Button>
              
              <Button
                variant={sortOption === 'popular' ? 'default' : 'outline'}
                size="sm"
                className={sortOption === 'popular' ? 'bg-nft-purple' : ''}
                onClick={() => handleSortChange('popular')}
              >
                Popular
              </Button>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-nft-card-bg border border-gray-800 rounded-lg p-6 mb-8 animate-accordion-down">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range (ETH)</h4>
                <div className="flex items-center gap-3">
                  <div>
                    <Input
                      type="number"
                      placeholder="Min"
                      min="0"
                      step="0.01"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div>
                    <Input
                      type="number"
                      placeholder="Max"
                      min="0"
                      step="0.01"
                      value={priceRange.max === null ? '' : priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
              
              {/* Collections */}
              <div>
                <h4 className="font-medium mb-3">Collections</h4>
                <div className="flex flex-wrap gap-2">
                  {uniqueCollections.map((collection, index) => (
                    collection && (
                      <Button
                        key={index}
                        variant={selectedCollections.includes(collection) ? "default" : "outline"}
                        size="sm"
                        className={selectedCollections.includes(collection) ? 'bg-nft-purple' : ''}
                        onClick={() => handleCollectionToggle(collection)}
                      >
                        {collection}
                      </Button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sort Options (Mobile) */}
        <div className="sm:hidden flex justify-start items-center gap-2 overflow-x-auto pb-4 mb-4">
          <Button
            variant={sortOption === 'price-low' ? 'default' : 'outline'}
            size="sm"
            className={sortOption === 'price-low' ? 'bg-nft-purple' : ''}
            onClick={() => handleSortChange('price-low')}
          >
            <ArrowUp size={16} className="mr-1" /> Price
          </Button>
          
          <Button
            variant={sortOption === 'price-high' ? 'default' : 'outline'}
            size="sm"
            className={sortOption === 'price-high' ? 'bg-nft-purple' : ''}
            onClick={() => handleSortChange('price-high')}
          >
            <ArrowDown size={16} className="mr-1" /> Price
          </Button>
          
          <Button
            variant={sortOption === 'recent' ? 'default' : 'outline'}
            size="sm"
            className={sortOption === 'recent' ? 'bg-nft-purple' : ''}
            onClick={() => handleSortChange('recent')}
          >
            Recent
          </Button>
          
          <Button
            variant={sortOption === 'popular' ? 'default' : 'outline'}
            size="sm"
            className={sortOption === 'popular' ? 'bg-nft-purple' : ''}
            onClick={() => handleSortChange('popular')}
          >
            Popular
          </Button>
        </div>
        
        {/* NFT Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-secondary/30 rounded-lg h-80"></div>
            ))}
          </div>
        ) : filteredNfts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNfts.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
            <p className="text-nft-text-secondary mb-6">
              We couldn't find any NFTs matching your criteria. Try adjusting your filters.
            </p>
            <Button className="btn-primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
