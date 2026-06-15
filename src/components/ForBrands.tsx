import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const opportunities = [
  "Creator Partnerships",
  "Sponsorships",
  "Product Placement",
  "Branded Entertainment",
  "In-App Experiences",
  "Original Programming Integrations",
  "Custom Content Campaigns",
  "Branded Merch Opportunities",
];

export const ForBrands = () => {
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold uppercase tracking-widest mb-3">
              For Brands & Partners
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Entertainment Meets Commerce
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              VERZA TV creates new opportunities for brands to reach highly engaged audiences through:
            </p>
          </div>

          <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 mb-8 md:mb-12">
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {opportunities.map((o) => (
                <li key={o} className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-5">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground text-center tracking-tight">
              Partner with the next generation of entertainment.
            </p>
            <Button
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 px-8 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
