
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Content } from "./ContentCard";

type PurchaseConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  content?: Content;
  onConfirm: () => void;
  onReject: () => void;
  purchaseInitiator: string;
}

const PurchaseConfirmation = ({
  isOpen,
  onClose,
  content,
  onConfirm,
  onReject,
  purchaseInitiator
}: PurchaseConfirmationProps) => {
  const [countdown, setCountdown] = useState(60);
  
  useEffect(() => {
    let timer: number;
    
    if (isOpen) {
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onReject();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
      setCountdown(60);
    };
  }, [isOpen, onReject]);
  
  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Підтвердіть покупку
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-kids">{purchaseInitiator}</span> хоче придбати <span className="font-medium">{content.title}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 overflow-hidden rounded-md">
              <img 
                src={content.imageUrl || "/placeholder.svg"} 
                alt={content.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h4 className="font-semibold">{content.title}</h4>
              <p className="text-sm text-muted-foreground">Premium контент</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Запит автоматично відхилиться через {countdown} секунд
          </div>
        </div>
        
        <DialogFooter className="flex flex-row justify-between">
          <Button 
            variant="outline" 
            onClick={onReject}
            className="parent-cancel-btn"
          >
            Відхилити
          </Button>
          <Button 
            onClick={onConfirm}
            className="parent-confirm-btn"
          >
            Підтвердити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseConfirmation;
