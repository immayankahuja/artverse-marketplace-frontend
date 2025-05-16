
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/context/WalletContext";

// Layout Component
import Navbar from "@/components/Navbar";

// Page Components
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import Profile from "@/pages/Profile";
import CreateNFT from "@/pages/CreateNFT";
import NFTDetail from "@/pages/NFTDetail";
import Collection from "@/pages/Collection";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-nft" element={<CreateNFT />} />
                <Route path="/nft/:id" element={<NFTDetail />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="bg-nft-card-bg border-t border-gray-800 py-6 mt-auto">
              <div className="container mx-auto px-4 text-center">
                <p className="text-nft-text-secondary text-sm">
                  © {new Date().getFullYear()} NFTMarket - A simulated NFT marketplace built with React
                </p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
