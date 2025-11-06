import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Opportunity = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`pt-0 pb-12 md:pb-16 lg:pb-20 bg-background transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Apple style */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 -mt-8 md:mt-8 lg:mt-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-3 md:mb-6 tracking-tight px-3">
              A defining moment.
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              The short-form vertical market has exploded. Leading platforms generate over $3M daily.
            </p>
          </div>

          {/* Key Points - Clean cards with better mobile touch targets */}
          <div className="grid md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-20">
            <Card className="p-5 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-xl md:rounded-3xl touch-manipulation">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-2 md:mb-4 text-foreground tracking-tight">150M+</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                Downloads for leading platforms. Global demand for snackable, serialized microdrama content.
              </p>
            </Card>

            <Card className="p-5 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-xl md:rounded-3xl touch-manipulation">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-2 md:mb-4 text-foreground tracking-tight">Ready</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                TikTok and Instagram Reels trained users for fast-paced, episodic mobile narratives.
              </p>
            </Card>

            <Card className="p-5 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-xl md:rounded-3xl touch-manipulation">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-2 md:mb-4 text-foreground tracking-tight">First</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                The first U.S. platform for microdramas tailored for Gen Z and Millennials. On the fly mobile entertainment.
              </p>
            </Card>
          </div>

          {/* Market Stats - Mobile-optimized grid */}
          <div className="bg-muted/30 rounded-xl md:rounded-3xl p-5 md:p-10 lg:p-16">
            <h3 className="text-lg sm:text-xl md:text-3xl font-semibold text-center mb-6 md:mb-12 text-foreground tracking-tight px-2">
              The numbers tell the story.
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 text-center">
              <div className="space-y-1 md:space-y-2">
                <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground tracking-tight">$59.57B</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">Box office + streaming</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground tracking-tight">$34.8B</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">Short form platforms</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground tracking-tight">$6.5B</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">Microdrama Apps</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-primary tracking-tight">$300M</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">Year 1 target</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
