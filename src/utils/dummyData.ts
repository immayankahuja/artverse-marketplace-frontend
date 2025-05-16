
export type NFT = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  owner: string;
  creator: string;
  createdAt: string;
  likes: number;
  views: number;
  isFeatured?: boolean;
  collection?: string;
  quantity?: number;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  nfts: string[];
  createdAt: string;
};

// Generate placeholder images
const getPlaceholderImage = (id: number): string => {
  const images = [
    'https://images.unsplash.com/photo-1569437061241-a848be43cc82?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1604782206219-3b9d4b7b1b56?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1633320220550-0f9a0c3a4d6d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1644697104371-086351fa8aa3?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3'
  ];
  return images[id % images.length];
};

// Generate dummy NFTs
export const generateDummyNFTs = (count: number = 20): NFT[] => {
  const nfts: NFT[] = [];

  // Some sample creator and owner addresses
  const addresses = [
    '0x1234567890123456789012345678901234567890',
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    '0x9876543210987654321098765432109876543210',
    '0xfedcbafedcbafedcbafedcbafedcbafedcbafedc',
  ];

  // Collection names
  const collections = ['Abstract Wonders', 'Digital Dreams', 'Crypto Art', 'Future Visions'];

  for (let i = 0; i < count; i++) {
    const creatorIndex = i % addresses.length;
    const ownerIndex = (i + 1) % addresses.length;
    const collectionIndex = i % collections.length;
    
    const nft: NFT = {
      id: `nft-${i + 1}`,
      title: `NFT Artwork #${i + 1}`,
      description: `This is an amazing digital artwork #${i + 1}. It represents the future of digital ownership and creativity.`,
      image: getPlaceholderImage(i),
      price: Math.floor(Math.random() * 10) * 0.1 + 0.1, // Random price between 0.1 and 1.0 ETH
      owner: addresses[ownerIndex],
      creator: addresses[creatorIndex],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      isFeatured: i < 6, // First 6 NFTs are featured
      collection: collections[collectionIndex],
      quantity: Math.floor(Math.random() * 5) + 1,
    };
    nfts.push(nft);
  }
  
  return nfts;
};

// Generate dummy collections
export const generateDummyCollections = (): Collection[] => {
  const collections: Collection[] = [];
  const collectionNames = ['Abstract Wonders', 'Digital Dreams', 'Crypto Art', 'Future Visions'];
  
  collectionNames.forEach((name, index) => {
    const nftIds = Array.from({ length: 5 }, (_, i) => `nft-${index * 5 + i + 1}`);
    
    collections.push({
      id: `collection-${index + 1}`,
      name,
      description: `A collection of ${name.toLowerCase()} representing the future of digital art.`,
      image: getPlaceholderImage(index),
      owner: '0x1234567890123456789012345678901234567890',
      nfts: nftIds,
      createdAt: new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });
  
  return collections;
};

// Export dummy data
export const dummyNFTs = generateDummyNFTs();
export const dummyCollections = generateDummyCollections();

// Get featured NFTs
export const getFeaturedNFTs = (): NFT[] => {
  return dummyNFTs.filter(nft => nft.isFeatured);
};

// Search NFTs
export const searchNFTs = (query: string): NFT[] => {
  const lowerCaseQuery = query.toLowerCase();
  return dummyNFTs.filter(
    nft => 
      nft.title.toLowerCase().includes(lowerCaseQuery) ||
      nft.description.toLowerCase().includes(lowerCaseQuery) ||
      nft.collection?.toLowerCase().includes(lowerCaseQuery)
  );
};
