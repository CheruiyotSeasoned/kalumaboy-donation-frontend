"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

export const ProgressTracker = () => {
  const [raised, setRaised] = useState<number>(0);
  const goal = 500000;

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch("https://share.akisolve.com/kaluma/totals.php"); // <-- change URL
        const data = await res.json();
        if (data.total) {
          setRaised(data.total);
        }
      } catch (err) {
        console.error("Failed to load donation totals:", err);
      }
    };

    fetchTotals();
  }, []);

  const percentage = (raised / goal) * 100;

  return (
    <div className="bg-primary-lighter/30 border border-primary-lighter rounded-xl p-6 md:p-8 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Donation Progress</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              KES {raised.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">raised</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-foreground">
              KES {goal.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">goal</div>
          </div>
        </div>

        <Progress value={percentage} className="h-3" />

        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{percentage.toFixed(1)}%</span> of our goal reached. 
          Every donation brings us closer to providing the care Kaluma needs.
        </p>
      </div>
    </div>
  );
};
