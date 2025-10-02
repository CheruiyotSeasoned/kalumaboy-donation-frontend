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
    <>
      <Card className="p-8 shadow-2xl border-2 border-gray-200 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl mb-4">
              <Heart className="h-10 w-10 text-green-600 fill-current" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Make Your Donation</h2>
            <p className="text-gray-600">Every contribution brings hope and healing</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-lg font-bold mb-3 block text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                Choose Your Impact
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">KES</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl py-7 pl-20 pr-4 font-bold border-2 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  min="1"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  { amount: 500, label: "Basic" },
                  { amount: 1000, label: "Helper" },
                  { amount: 2000, label: "Hero" },
                  { amount: 5000, label: "Champion" },
                ].map((preset) => (
                  <Button
                    key={preset.amount}
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setAmount(preset.amount.toString())}
                    className={`w-full h-auto flex flex-col justify-center items-center px-4 py-6 border-2 transition-all hover:scale-105 rounded-xl
        ${amount === preset.amount.toString()
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                      }`}
                  >
                    <span className="text-xl font-bold">{preset.amount}</span>
                    <span className="text-xs text-gray-500 mt-1">{preset.label}</span>
                  </Button>
                ))}
              </div>

            </div>

            <div>
              <Label className="text-lg font-bold mb-4 block text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Secure Payment Method
              </Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div
                  className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === "pesapal"
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-teal-50 shadow-md"
                    : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                    }`}
                >
                  <RadioGroupItem value="pesapal" id="pesapal" className="h-5 w-5" />
                  <Label htmlFor="pesapal" className="flex items-center gap-4 cursor-pointer flex-1">
                    <div className="p-3 bg-white rounded-lg">
                      <img
                        src={pesapalImage}
                        alt="Pesapal"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg">Pesapal</div>
                      <div className="text-sm text-gray-600">Cards & International payments</div>
                    </div>
                    {paymentMethod === "pesapal" && (
                      <CheckCircle className="h-6 w-6 text-green-600 fill-current" />
                    )}
                  </Label>
                </div>

              </RadioGroup>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Join 100+ supporters</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Your donation goes directly to Vincent's father's medical care
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-7 text-xl rounded-xl transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <Heart className="mr-2 h-6 w-6 fill-current" />
              Complete Donation
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-gray-400" />
              <p>
                Secure & encrypted payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Pesapal"}
              </p>
            </div>
          </div>
        </div>
      </Card>

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
    </>
  );
};