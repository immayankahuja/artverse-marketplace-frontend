
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { createNFT } from '@/utils/nftFunctions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const NFTForm: React.FC = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    collection: '',
    quantity: 1,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!imagePreview) {
      toast.error("Please upload an image for your NFT");
      return;
    }
    
    if (!formData.title || !formData.description || !formData.price) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the NFT
      const newNFT = createNFT({
        title: formData.title,
        description: formData.description,
        price: priceValue,
        image: imagePreview,
        owner: walletAddress,
        creator: walletAddress,
        collection: formData.collection || undefined,
        quantity: formData.quantity,
        likes: 0,
        views: 0
      });
      
      toast.success("NFT created successfully!");
      
      // Redirect to the NFT detail page
      navigate(`/nft/${newNFT.id}`);
    } catch (error) {
      console.error("Error creating NFT:", error);
      toast.error("Failed to create NFT");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            NFT Image <span className="text-red-500">*</span>
          </label>
          
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 transition-all hover:border-nft-purple cursor-pointer">
            {imagePreview ? (
              <div className="relative w-full">
                <img 
                  src={imagePreview} 
                  alt="NFT Preview" 
                  className="mx-auto max-h-80 object-contain rounded-lg" 
                />
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setImagePreview(null)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-2">Upload your NFT</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 10MB</p>
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="hidden" 
                  id="nft-image-upload"
                />
                <Button 
                  type="button" 
                  className="btn-primary mt-4" 
                  onClick={() => document.getElementById('nft-image-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            )}
            
            <Input 
              type="file" 
              id="nft-image-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            name="title"
            className="input-field"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter NFT title"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            name="description"
            className="input-field min-h-32"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your NFT"
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price (ETH) <span className="text-red-500">*</span>
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.001"
            min="0.001"
            className="input-field"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.001"
            required
          />
        </div>
        
        <div>
          <label htmlFor="collection" className="block text-sm font-medium mb-2">
            Collection
          </label>
          <Input
            id="collection"
            name="collection"
            className="input-field"
            value={formData.collection}
            onChange={handleInputChange}
            placeholder="Collection name (optional)"
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-2">
            Quantity
          </label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="100"
            className="input-field"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="btn-primary px-8" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create NFT'}
        </Button>
      </div>
    </form>
  );
};

export default NFTForm;
