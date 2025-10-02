import { Card } from "@/components/ui/card";
import { Shield, FileText, Calendar, HeartHandshake, Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const TransparencySection = () => {
  // Donation progress (mocked numbers for now)
  const goal = 1000000; // Ksh 1,000,000
  const raised = 250000; // Ksh 250,000 raised so far
  const progress = (raised / goal) * 100;

  // Pie chart data for 98/2 split
  const allocationData = [
    { name: "Families", value: 98 },
    { name: "Operations", value: 2 },
  ];

  const COLORS = ["#2563eb", "#94a3b8"];

  // Placeholder updates
  const updates: { date: string; title: string; description: string }[] = [];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Transparency & Accountability
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The <span className="font-semibold">KalumaBoy Initiative</span> was born from Kaluma’s
            story — and now extends to helping other struggling families.  
            We ensure <span className="font-semibold">98% of donations go directly to families</span>, 
            while only <span className="font-semibold">2% supports essential operations</span> 
            like compliance, reporting, and platform upkeep.
          </p>
        </div>

        {/* Donation Progress + Allocation */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Donation Progress
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Ksh {raised.toLocaleString()} raised of Ksh {goal.toLocaleString()} goal
            </p>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Every contribution brings us closer to transforming more lives.
            </p>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" /> Allocation of Funds
            </h3>
            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              98% to families • 2% to operations
            </p>
          </Card>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 text-center">
          <Card className="p-6 shadow-soft">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">15+</h3>
            <p className="text-sm text-muted-foreground">Families Supported</p>
          </Card>

          <Card className="p-6 shadow-soft">
            <HeartHandshake className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Ksh 250,000</h3>
            <p className="text-sm text-muted-foreground">Raised so far</p>
          </Card>

          <Card className="p-6 shadow-soft">
            <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-sm text-muted-foreground">Audited & Verified</p>
          </Card>
        </div>

        {/* Testimonial */}
        <Card className="p-8 shadow-soft mb-16 bg-primary-lighter">
          <p className="text-lg text-foreground italic max-w-3xl mx-auto text-center">
            "When I shared my struggle caring for my father, Kenyans stood with me.  
            This initiative is my way of ensuring no family has to walk that journey alone."
          </p>
          <p className="text-sm font-semibold text-center mt-4">— KalumaBoy</p>
        </Card>

        {/* Family Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6">Stories of Impact</h3>
          <Card className="p-6 shadow-soft text-center">
            <p className="text-muted-foreground">
              Family stories and beneficiary profiles will be shared here soon — so you can see the lives
              your kindness is transforming.
            </p>
          </Card>
        </div>

        {/* Recent Updates */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Recent Updates</h3>
          {updates.length === 0 ? (
            <Card className="p-6 shadow-soft text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">
                Updates are coming soon. Stay tuned!
              </p>
            </Card>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
};
