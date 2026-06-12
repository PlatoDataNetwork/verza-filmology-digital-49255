import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  "Upload Vertical or Horizontal Content",
  "Set Your Own Pricing",
  "Revenue Sharing Opportunities",
  "Audience Discovery Tools",
  "Creator Profiles",
  "Analytics & Insights",
  "Global Distribution",
];

export const ForCreators = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="creators"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-10 md:py-16 lg:py-20 bg-background scroll-mt-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold uppercase tracking-widest mb-3">
              For Creators
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Turn Your Audience Into A Business
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              VERZA TV empowers creators, filmmakers, podcasters, influencers, and storytellers to
              distribute content, grow audiences, and monetize their work. Upload directly from
              desktop or mobile.
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-5 md:mb-7 text-center">
              Creator Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
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

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center px-2 mb-8 md:mb-12">
            Whether you're producing microdramas, podcasts, documentaries, talk shows, or original
            series, VERZA TV provides the infrastructure to grow your business.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 px-8 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Become a Creator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
