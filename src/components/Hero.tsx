import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImage from "@/assets/hero-image.png";

interface HeroProps {
  onDonateClick: () => void;
}

export const Hero = ({ onDonateClick }: HeroProps) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (videoPlaying || dialogOpen) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector(
          'script[src="https://www.tiktok.com/embed.js"]'
        );
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [videoPlaying, dialogOpen]);

  return (
    <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Hero image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="container relative z-10 py-16">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <div className="animate-fade-in">
            <div className="inline-block px-4 py-2 bg-green-400/20 backdrop-blur-sm rounded-full border border-green-400/30 mb-4">
              <p className="text-green-300 text-sm font-semibold">
                🤝 Every Contribution Counts
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                KalumaBoy
              </span>
              <br />
              <span className="text-white">Initiative</span>
            </h1>


            {/* Original Storytelling Text */}
            <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed font-light">
              Inspired by Vincent Kaluma’s fight for his father, we are standing
              with families in need of hope.
            </p>

            <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
              Vincent works the tea fields every day to keep his father alive.
              His story is the beginning — the KalumaBoy Initiative exists to
              help families like his, who are struggling with the weight of
              medical hardship. Together, we can bring healing, dignity, and
              strength to those who need it most.
            </p>
            {/* Disclaimer Badge */}
            <div className="inline-block px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-6">
              <p className="text-yellow-300 text-sm font-semibold">
                ⚠️ Disclaimer: We have not yet met Vincent Kaluma. This initiative
                was created in respect for his story, and we hope to connect with
                him soon.
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={onDonateClick}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold px-8 py-6 text-base rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-green-500/50 border-2 border-white/20"
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Make a Difference Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-6 text-base rounded-full border-2 border-white/30 transition-all hover:scale-105"
                onClick={() => setDialogOpen(true)}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Story
              </Button>
            </div>

            {/* Updated Impact stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                <div className="text-xs text-white/70">To Families</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400 mb-1">2%</div>
                <div className="text-xs text-white/70">Operations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  100%
                </div>
                <div className="text-xs text-white/70">Accountability</div>
              </div>
            </div>
          </div>

          {/* Right column - TikTok embed */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[325px] h-[580px]">
              <div className="absolute -inset-3 bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 rounded-2xl opacity-20 blur-xl"></div>

              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl h-full">
                {!videoPlaying ? (
                  <div
                    className="w-full h-full flex items-center justify-center cursor-pointer group"
                    onClick={() => setVideoPlaying(true)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${heroImage})` }}
                    >
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="h-8 w-8 text-white fill-current ml-1" />
                      </div>
                      <p className="text-white font-semibold text-base">
                        Watch Vincent's Story
                      </p>
                      <p className="text-white/70 text-sm mt-2">
                        See the impact firsthand
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <blockquote
                      className="tiktok-embed"
                      cite="https://www.tiktok.com/@wakahoro_comedian/video/7555275250775100683"
                      data-video-id="7555275250775100683"
                      style={{ maxWidth: "325px", minWidth: "325px" }}
                    >
                      <section>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          title="@wakahoro_comedian"
                          href="https://www.tiktok.com/@wakahoro_comedian/video/7555275250775100683"
                        >
                          @wakahoro_comedian
                        </a>
                      </section>
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Floating badge (only keep one) */}
              <div className="absolute -bottom-3 -left-3 bg-teal-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-xl">
                ✨ Real Impact
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TikTok Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900/95 backdrop-blur-xl border-2 border-green-500/30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              Vincent's Story
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="w-full aspect-[9/16] bg-black rounded-lg overflow-hidden">
              <blockquote
                className="tiktok-embed"
                cite="https://www.tiktok.com/@wakahoro_comedian/video/7555275250775100683"
                data-video-id="7555275250775100683"
                style={{ maxWidth: "100%", minWidth: "325px" }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="@wakahoro_comedian"
                    href="https://www.tiktok.com/@wakahoro_comedian/video/7555275250775100683"
                  >
                    @wakahoro_comedian
                  </a>
                </section>
              </blockquote>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
