
import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-nft-card-bg border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nftTitle: string;
  nftPrice: number;
  isProcessing: boolean;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  nftTitle,
  nftPrice,
  isProcessing
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Purchase"
      footer={
        <div className="flex space-x-4 w-full justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            className="btn-primary" 
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Buy for ${nftPrice.toFixed(3)} ETH`}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          Are you sure you want to purchase <span className="font-semibold">{nftTitle}</span> for {nftPrice.toFixed(3)} ETH?
        </p>
        <div className="bg-secondary/30 rounded-lg p-4 text-sm">
          <p className="mb-2 font-medium">Transaction details:</p>
          <div className="flex justify-between">
            <span>Item price:</span>
            <span>{nftPrice.toFixed(3)} ETH</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee:</span>
            <span>{(nftPrice * 0.025).toFixed(3)} ETH</span>
          </div>
          <div className="border-t border-gray-700 my-2 pt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span>{(nftPrice * 1.025).toFixed(3)} ETH</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
