import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MPesaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  onSuccess: () => void;
}

export const MPesaDialog = ({ open, onOpenChange, amount, onSuccess }: MPesaDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid M-Pesa phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate STK push processing
    setTimeout(() => {
      setIsProcessing(false);
      setPhoneNumber("");
      onOpenChange(false);
      
      // Show toast after dialog closes
      setTimeout(() => {
        toast({
          title: "STK Push Sent!",
          description: "Please check your phone and enter your M-Pesa PIN to complete the donation.",
        });
        onSuccess();
      }, 100);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>M-Pesa Payment</DialogTitle>
              <DialogDescription>
                Amount: KES {amount}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={10}
              className="text-lg"
              disabled={isProcessing}
            />
            <p className="text-sm text-muted-foreground">
              You will receive an STK push on this number
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send STK Push"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};