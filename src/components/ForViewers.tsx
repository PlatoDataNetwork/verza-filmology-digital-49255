import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  "Premium Microdramas",
  "Exclusive Original Series",
  "Vertical & Horizontal Viewing",
  "Mobile-First Experience",
  "Personalized Discovery",
  "New Episodes Added Regularly",
  "Watch Anywhere, Anytime",
  "Horizontal Feature Films",
];

const popular = ["The Vertical Tea", "Who's Where", "Storage Pirates", "Creator Exclusives"];

export const ForViewers = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-10 md:py-16 lg:py-20 bg-muted/30 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold uppercase tracking-widest mb-3">
              For Viewers
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Your Next Obsession Starts Here
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Discover hundreds of episodes of premium microdramas, thrillers, mysteries, red carpet,
              reality, music, podcasts, exclusive originals and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-10">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">Features</h3>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-10">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">Popular Originals</h3>
              <ul className="space-y-3">
                {popular.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => scrollTo("download")}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 px-8 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Start Watching
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
