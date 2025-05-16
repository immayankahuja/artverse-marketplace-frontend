
import React, { createContext, useContext, useState, useEffect } from 'react';

type WalletContextType = {
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isConnected: boolean;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check if wallet is stored in localStorage on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('nftWalletAddress');
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  // Generate a random address for simulating wallet connection
  const generateRandomAddress = () => {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 40; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const connectWallet = () => {
    const newAddress = generateRandomAddress();
    setWalletAddress(newAddress);
    localStorage.setItem('nftWalletAddress', newAddress);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('nftWalletAddress');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        connectWallet,
        disconnectWallet,
        isConnected: !!walletAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
