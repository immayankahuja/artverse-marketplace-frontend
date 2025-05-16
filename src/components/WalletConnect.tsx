
import React from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/utils/nftFunctions';

const WalletConnect: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet, isConnected } = useWallet();

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <div className="hidden md:block px-3 py-2 bg-secondary rounded-lg text-sm">
            {formatAddress(walletAddress || '')}
          </div>
          <Button 
            className="btn-outline" 
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          className="btn-primary"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
