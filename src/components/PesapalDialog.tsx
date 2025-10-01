import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PesapalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  onSuccess: () => void;
}

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const PesapalDialog = ({ open, onOpenChange, amount, onSuccess }: PesapalDialogProps) => {
  const [step, setStep] = useState<'form' | 'processing' | 'iframe' | 'verifying' | 'success' | 'failed'>('form');
  const [iframeUrl, setIframeUrl] = useState('');
  const [orderTrackingId, setOrderTrackingId] = useState('');
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setStep('form');
      setIframeUrl('');
      setOrderTrackingId('');
    }
  }, [open]);

  // Listen for payment completion from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if message is from Pesapal
      if (event.data.type === 'pesapal-payment-complete') {
        setStep('verifying');
        verifyPayment(event.data.orderTrackingId);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const validateForm = () => {
    if (!donorInfo.firstName.trim()) {
      toast({
        title: "First name required",
        description: "Please enter your first name",
        variant: "destructive",
      });
      return false;
    }
    if (!donorInfo.lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name",
        variant: "destructive",
      });
      return false;
    }
    if (!donorInfo.email.trim() || !donorInfo.email.includes('@')) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    if (!donorInfo.phone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setStep('processing');

    try {
      // Call your backend API to create Pesapal order
      const response = await fetch('https://kalumaboy-donation-backend.vercel.app//api/pesapal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          firstName: donorInfo.firstName,
          lastName: donorInfo.lastName,
          email: donorInfo.email,
          phone: donorInfo.phone,
          description: 'Donation for KalumaBoy Initiative',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const data = await response.json();

      if (data.redirect_url && data.order_tracking_id) {
        setIframeUrl(data.redirect_url);
        setOrderTrackingId(data.order_tracking_id);
        setStep('iframe');
      } else {
        throw new Error(data.message || 'Failed to get payment URL');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setStep('form');
    }
  };

  const verifyPayment = async (trackingId: string) => {
    try {
      const response = await fetch(`/api/pesapal/verify-payment?orderTrackingId=${trackingId}`);
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const data = await response.json();

      if (data.payment_status_description === 'Completed') {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onOpenChange(false);
        }, 2000);
      } else if (data.payment_status_description === 'Failed') {
        setStep('failed');
      } else {
        // Still processing
        setTimeout(() => verifyPayment(trackingId), 3000);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setStep('failed');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'form':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-200">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-lg text-teal-700">KES {amount}</span>
                <span className="text-gray-500 ml-2">donation amount</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                <Input
                  id="firstName"
                  value={donorInfo.firstName}
                  onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                  placeholder="John"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                <Input
                  id="lastName"
                  value={donorInfo.lastName}
                  onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                  placeholder="Doe"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={donorInfo.email}
                onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={donorInfo.phone}
                onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                placeholder="254712345678"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Include country code (e.g., 254 for Kenya)</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700">
                💳 You'll be redirected to Pesapal's secure payment page to complete your donation using cards or mobile money.
              </p>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold py-6"
            >
              Continue to Payment
            </Button>
          </div>
        );

      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-16 w-16 text-teal-600 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Setting up payment...</h3>
            <p className="text-gray-600 text-center">Please wait while we prepare your secure payment</p>
          </div>
        );

      case 'iframe':
        return (
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-semibold">Complete your payment below</p>
                <p className="text-xs text-yellow-700 mt-1">
                  This is a secure payment page from Pesapal. Choose your preferred payment method.
                </p>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={iframeUrl}
                width="100%"
                height="600px"
                frameBorder="0"
                title="Pesapal Payment"
                className="w-full"
                sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups"
              />
            </div>

            <p className="text-xs text-center text-gray-500">
              Having trouble? <button className="text-teal-600 underline" onClick={() => setStep('form')}>Go back</button>
            </p>
          </div>
        );

      case 'verifying':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-16 w-16 text-teal-600 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying payment...</h3>
            <p className="text-gray-600 text-center">Please wait while we confirm your transaction</p>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h3>
            <p className="text-gray-600 text-center mb-4">
              Thank you for your generous donation of <span className="font-bold text-green-600">KES {amount}</span>
            </p>
            <p className="text-sm text-gray-500 text-center">
              You will receive a confirmation email shortly.
            </p>
          </div>
        );

      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
            <p className="text-gray-600 text-center mb-6">
              Unfortunately, your payment could not be completed.
            </p>
            <Button 
              onClick={() => setStep('form')}
              variant="outline"
              className="border-2 border-red-300 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {step === 'form' && 'Complete Your Donation'}
            {step === 'processing' && 'Processing...'}
            {step === 'iframe' && 'Secure Payment'}
            {step === 'verifying' && 'Verifying...'}
            {step === 'success' && 'Success!'}
            {step === 'failed' && 'Payment Failed'}
          </DialogTitle>
          {step === 'form' && (
            <DialogDescription className="text-gray-600">
              Please provide your details to complete the donation via Pesapal
            </DialogDescription>
          )}
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};