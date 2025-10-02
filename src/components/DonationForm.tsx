import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Smartphone, CreditCard, CheckCircle, Heart, Sparkles, Shield, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { MPesaDialog } from "./MpesaDialog";
import { PesapalDialog } from "./PesapalDialog";
import pesapalImage from "@/assets/pesapal.png";

export const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMpesaDialog, setShowMpesaDialog] = useState(false);
  const [showPesapalDialog, setShowPesapalDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "mpesa") {
      setShowMpesaDialog(true);
    } else {
      setShowPesapalDialog(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setAmount("");
    }, 3000);
  };

  if (showConfirmation) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-400 animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            Thank You! 🎉
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Your generous donation of{" "}
            <span className="font-bold text-green-600 text-2xl">KES {amount}</span>
          </p>
          <p className="text-gray-600">
            is being processed. You will receive a confirmation shortly.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>Making a real difference in Vincent's life</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
  <section className="w-full bg-gradient-to-br from-green-50 to-teal-50 py-16 px-4">
    <Card className="w-full p-12 shadow-2xl border-2 border-gray-200 bg-white relative overflow-hidden rounded-none">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl mb-4">
            <Heart className="h-10 w-10 text-green-600 fill-current" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Make Your Donation
          </h2>
          <p className="text-lg text-gray-600">
            Every contribution brings hope and healing
          </p>
        </div>

        {/* FORM CONTENT (unchanged, just wrapped) */}
        <div className="space-y-6">
          {/* amount, preset buttons, payment method, supporters block, submit button... */}
          {/* keep your existing JSX here unchanged */}
        </div>
      </div>
    </Card>

    {/* dialogs */}
    <MPesaDialog
      open={showMpesaDialog}
      onOpenChange={setShowMpesaDialog}
      amount={amount}
      onSuccess={handlePaymentSuccess}
    />

    <PesapalDialog
      open={showPesapalDialog}
      onOpenChange={setShowPesapalDialog}
      amount={amount}
      onSuccess={handlePaymentSuccess}
    />
  </section>
);
};
