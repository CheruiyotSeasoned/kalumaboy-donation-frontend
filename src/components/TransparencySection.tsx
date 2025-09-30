import { Card } from "@/components/ui/card";
import { Shield, FileText, Calendar } from "lucide-react";

export const TransparencySection = () => {
  const updates = [
    {
      date: "March 15, 2024",
      title: "Medical Consultation Completed",
      description: "Kaluma attended his first specialist consultation. Treatment plan established.",
    },
    {
      date: "March 10, 2024",
      title: "Initial Tests Conducted",
      description: "All necessary medical tests completed. Results shared with medical team.",
    },
    {
      date: "March 1, 2024",
      title: "Campaign Launch",
      description: "KalumaBoy Initiative officially launched to support Kaluma's medical journey.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Transparency & Accountability
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in complete transparency. Here's how your donations are making a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
            <FileText className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Financial Reports</h3>
            <p className="text-sm text-muted-foreground">
              Monthly breakdowns of all donations received and expenses incurred for Kaluma's care.
            </p>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Verified NGO</h3>
            <p className="text-sm text-muted-foreground">
              Registered non-profit organization with PBO certification number: NGO/2024/001
            </p>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
            <Calendar className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Regular Updates</h3>
            <p className="text-sm text-muted-foreground">
              Weekly progress reports on Kaluma's treatment and recovery journey shared with donors.
            </p>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Recent Updates</h3>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <Card key={index} className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-lighter rounded-lg p-3 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{update.date}</div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">{update.title}</h4>
                    <p className="text-muted-foreground">{update.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};