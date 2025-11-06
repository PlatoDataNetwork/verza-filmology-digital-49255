import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";

export const Solution = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-8 md:py-10 lg:py-12 bg-muted/30 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-3 md:mb-6 tracking-tight px-3">
              Why we win.
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed px-4">
              The first U.S. platform bridging pop culture with on-demand mobile entertainment.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="bg-background border-0 rounded-2xl p-6 md:p-10 mb-6 md:mb-12 shadow-sm">
            <p className="text-lg md:text-2xl text-center font-medium leading-relaxed text-foreground/90 tracking-tight">
              Pick-and-choose programming for viewers aged 18–65.<br /> Tailored content that speaks to every segment.
            </p>
          </Card>

          {/* Key Differentiators - Uniform cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <Card className="p-6 md:p-8 bg-background border-0 rounded-2xl space-y-3 md:space-y-4 active:bg-muted/30 md:hover:bg-muted/30 transition-all touch-manipulation">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">High-impact partnerships</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Studio-friendly formats. Ideal for film and talent promotion across entertainment verticals.
              </p>
            </Card>

            <Card className="p-6 md:p-8 bg-background border-0 rounded-2xl space-y-3 md:space-y-4 active:bg-muted/30 md:hover:bg-muted/30 transition-all touch-manipulation">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">Built for mass adoption</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Bingeable vertical content under 1 minute. Perfect for a world where late-night TV is fading.
              </p>
            </Card>

            <Card className="p-6 md:p-8 bg-background border-0 rounded-2xl space-y-3 md:space-y-4 active:bg-muted/30 md:hover:bg-muted/30 transition-all touch-manipulation">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">What others miss</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Influencers, podcasts, red carpet content, and reality programming integrated seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
