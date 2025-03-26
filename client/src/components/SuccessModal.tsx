import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle, X, Twitter, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Success",
      description: "Link copied to clipboard!",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShareTwitter = () => {
    const text = "I just joined the waitlist for LaunchPad - the revolutionary new productivity tool. Check it out!";
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center">You're on the list!</DialogTitle>
          <DialogDescription className="text-center mb-6">
            Thank you for joining our waitlist. We'll notify you as soon as LaunchPad is ready.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            className="bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] border-0"
            onClick={handleShareTwitter}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Share on Twitter
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-100 text-slate-800 hover:bg-gray-200 border-0"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
