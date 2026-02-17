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
          {/* App Store Links */}
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12 -mt-4 md:mt-0">
            <a 
              href="https://apps.apple.com/us/app/verzatv/id6752884623" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm font-medium">App Store</span>
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.verzatv.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#01875f] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="text-sm font-medium">Google Play</span>
            </a>
          </div>

          {/* Section Header - Apple style */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 -mt-8 md:mt-8 lg:mt-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-3 md:mb-6 tracking-tight px-3">
              A defining moment.
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              The short-form vertical market has exploded. Leading platforms generate over $3M daily.
            </p>
          </div>

          {/* Key Points - Uniform cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
            <Card className="p-6 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-2xl touch-manipulation">
              <h3 className="text-4xl md:text-5xl font-semibold mb-3 md:mb-4 text-foreground tracking-tight text-center">150M+</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Downloads for leading platforms. Global demand for snackable, serialized micro-drama content.
              </p>
            </Card>

            <Card className="p-6 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-2xl touch-manipulation">
              <h3 className="text-4xl md:text-5xl font-semibold mb-3 md:mb-4 text-foreground tracking-tight text-center">Ready</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                TikTok and Instagram Reels trained users for fast-paced, episodic mobile narratives.
              </p>
            </Card>

            <Card className="p-6 md:p-8 bg-muted/50 active:bg-muted/70 md:hover:bg-muted/70 transition-all border-0 rounded-2xl touch-manipulation">
              <h3 className="text-4xl md:text-5xl font-semibold mb-3 md:mb-4 text-foreground tracking-tight text-center">First</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                The first U.S. platform for micro-dramas tailored for Gen Z and Millennials. On the fly mobile entertainment.
              </p>
            </Card>
          </div>

          {/* Market Stats - Uniform cards */}
          <Card className="bg-muted/30 border-0 rounded-2xl p-6 md:p-10">
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-center mb-6 md:mb-10 text-foreground tracking-tight">
              Industry Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-5xl font-semibold text-foreground tracking-tight">$59.5B+</div>
                <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">Worldwide Box Office & Streaming</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-5xl font-semibold text-foreground tracking-tight">$34.8B</div>
                <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">Short form platforms</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-5xl font-semibold text-foreground tracking-tight">$11B</div>
                <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">Current Micro-Drama Apps</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-5xl font-semibold text-foreground tracking-tight">$23B</div>
                <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">2030 Projection for Micro-Drama Apps</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
