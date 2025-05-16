
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import WalletConnect from './WalletConnect';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isConnected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-nft-card-bg border-b border-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-nft-purple">NFT<span className="text-white">Market</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-nft-purple transition-colors">
              Home
            </Link>
            <Link to="/marketplace" className="text-gray-300 hover:text-nft-purple transition-colors">
              Marketplace
            </Link>
            {isConnected && (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-nft-purple transition-colors">
                  Profile
                </Link>
                <Link to="/create-nft">
                  <Button className="btn-primary">Create NFT</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-300"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-nft-purple transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/marketplace" 
                className="text-gray-300 hover:text-nft-purple transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              {isConnected && (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-300 hover:text-nft-purple transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/create-nft"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="btn-primary w-full">Create NFT</Button>
                  </Link>
                </>
              )}
              <div className="py-2">
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
