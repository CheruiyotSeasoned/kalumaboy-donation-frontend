import { Card } from "@/components/ui/card";
import storyImage from "@/assets/story-image.png";

export const StorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Vincent Kaluma's Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vincent Kaluma, known as Kaluma Boy, is a 17-year-old content creator from Othaya, Nyeri County. 
                He has been documenting his journey of single-handedly taking care of his ailing father on TikTok, 
                touching the hearts of thousands of Kenyans.
              </p>
              <p>
                His father suffered a stroke at the end of August 2024, requiring ongoing medical treatment and 
                physiotherapy. Despite his young age, Vincent has shown remarkable dedication, working on a local 
                tea plantation to help cover the mounting medical bills.
              </p>
              <p>
                On Sunday, September 28, 2025, Kenyans showed incredible solidarity as TikTokers visited his 
                home in Othaya with convoys of vehicles and motorcycles to support the family. The overwhelming 
                show of support demonstrated the power of community and compassion.
              </p>
              <p className="font-semibold text-primary">
                Vincent has expressed his deep appreciation for everyone standing with him. Your donation will 
                help continue his father's medical treatment and ease the financial burden on this devoted son.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden shadow-medium">
              <img 
                src={storyImage} 
                alt="Kaluma Boy with a hopeful expression" 
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};