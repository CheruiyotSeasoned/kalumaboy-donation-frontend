import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { DonationForm } from "@/components/DonationForm";
import { ProgressTracker } from "@/components/ProgressTracker";
import { StorySection } from "@/components/StorySection";
import { TransparencySection } from "@/components/TransparencySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const donationRef = useRef<HTMLDivElement>(null);

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onDonateClick={scrollToDonation} />
      
      <section ref={donationRef} className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Make a Difference Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your donation amount and payment method. Every contribution counts.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <DonationForm />
            <div className="space-y-6">
              <ProgressTracker />
              <div className="bg-accent border border-primary-lighter rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Why Your Donation Matters</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Direct medical treatment and specialist consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Essential medications and rehabilitation support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Nutritional support during recovery period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Educational materials to continue learning during treatment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StorySection />
      <TransparencySection />
      <Footer />
    </div>
  );
};

export default Index;