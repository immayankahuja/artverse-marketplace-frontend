
import { NFT } from './dummyData';

// Local storage keys
const NFT_STORAGE_KEY = 'nftMarketplace';
const CREATED_NFTS_KEY = 'createdNfts';
const OWNED_NFTS_KEY = 'ownedNfts';

// Get all NFTs from local storage
export const getAllNFTs = (): NFT[] => {
  const storedNFTs = localStorage.getItem(NFT_STORAGE_KEY);
  return storedNFTs ? JSON.parse(storedNFTs) : [];
};

// Save NFTs to local storage
export const saveNFTs = (nfts: NFT[]) => {
  localStorage.setItem(NFT_STORAGE_KEY, JSON.stringify(nfts));
};

// Save a single NFT (create or update)
export const saveNFT = (nft: NFT) => {
  const nfts = getAllNFTs();
  const existingIndex = nfts.findIndex(item => item.id === nft.id);
  
  if (existingIndex >= 0) {
    // Update existing NFT
    nfts[existingIndex] = nft;
  } else {
    // Add new NFT
    nfts.push(nft);
  }
  
  saveNFTs(nfts);
  return nft;
};

// Create a new NFT
export const createNFT = (nft: Omit<NFT, 'id' | 'createdAt'>): NFT => {
  const newNFT: NFT = {
    ...nft,
    id: `nft-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: 0,
    views: 0
  };
  
  saveNFT(newNFT);
  
  // Add to created NFTs for this user
  addToCreatedNFTs(newNFT.creator, newNFT.id);
  // Since creator is initial owner
  addToOwnedNFTs(newNFT.owner, newNFT.id);
  
  return newNFT;
};

// Get NFT by ID
export const getNFTById = (id: string): NFT | null => {
  const nfts = getAllNFTs();
  const nft = nfts.find(item => item.id === id);
  return nft || null;
};

// Buy NFT (transfer ownership)
export const buyNFT = (nftId: string, newOwner: string): NFT | null => {
  const nfts = getAllNFTs();
  const nftIndex = nfts.findIndex(item => item.id === nftId);
  
  if (nftIndex === -1) return null;
  
  const nft = nfts[nftIndex];
  const previousOwner = nft.owner;
  
  // Update ownership
  nft.owner = newOwner;
  nfts[nftIndex] = nft;
  saveNFTs(nfts);
  
  // Update ownership records
  removeFromOwnedNFTs(previousOwner, nftId);
  addToOwnedNFTs(newOwner, nftId);
  
  return nft;
};

// Get owned NFTs for a user
export const getOwnedNFTs = (address: string): string[] => {
  const key = `${OWNED_NFTS_KEY}_${address}`;
  const ownedIds = localStorage.getItem(key);
  return ownedIds ? JSON.parse(ownedIds) : [];
};

// Get created NFTs for a user
export const getCreatedNFTs = (address: string): string[] => {
  const key = `${CREATED_NFTS_KEY}_${address}`;
  const createdIds = localStorage.getItem(key);
  return createdIds ? JSON.parse(createdIds) : [];
};

// Add to owned NFTs
export const addToOwnedNFTs = (address: string, nftId: string) => {
  const key = `${OWNED_NFTS_KEY}_${address}`;
  const ownedIds = getOwnedNFTs(address);
  
  if (!ownedIds.includes(nftId)) {
    ownedIds.push(nftId);
    localStorage.setItem(key, JSON.stringify(ownedIds));
  }
};

// Remove from owned NFTs
export const removeFromOwnedNFTs = (address: string, nftId: string) => {
  const key = `${OWNED_NFTS_KEY}_${address}`;
  let ownedIds = getOwnedNFTs(address);
  
  ownedIds = ownedIds.filter(id => id !== nftId);
  localStorage.setItem(key, JSON.stringify(ownedIds));
};

// Add to created NFTs
export const addToCreatedNFTs = (address: string, nftId: string) => {
  const key = `${CREATED_NFTS_KEY}_${address}`;
  const createdIds = getCreatedNFTs(address);
  
  if (!createdIds.includes(nftId)) {
    createdIds.push(nftId);
    localStorage.setItem(key, JSON.stringify(createdIds));
  }
};

// Format ETH price with 3 decimal places
export const formatEthPrice = (price: number): string => {
  return `${price.toFixed(3)} ETH`;
};

// Format wallet address to short form
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Initialize local storage with dummy data if needed
export const initializeLocalStorage = (nfts: NFT[]) => {
  if (!localStorage.getItem(NFT_STORAGE_KEY)) {
    saveNFTs(nfts);
    
    // Add to created and owned collections
    nfts.forEach(nft => {
      addToCreatedNFTs(nft.creator, nft.id);
      addToOwnedNFTs(nft.owner, nft.id);
    });
  }
};
