import { Button } from "@/components/ui/button";
import verzaLogo from "@/assets/verza-logo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const parallaxOffset1 = useParallax({ speed: 0.3 });
  const parallaxOffset2 = useParallax({ speed: 0.5 });
  const parallaxOffset3 = useParallax({ speed: 0.2 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative min-h-[60vh] md:min-h-[calc(100vh-4rem)] flex items-start md:items-center justify-center overflow-hidden bg-background transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-6 sm:py-12 md:py-24 text-center">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-7 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-base sm:text-lg md:text-2xl font-normal text-muted-foreground tracking-tight px-4">
            From the Founders of E! Entertainment Television
          </p>

          {/* Main Headline - Logo */}
          <div className="flex flex-col items-center py-1 sm:py-2">
            <img 
              src={verzaLogo} 
              alt="VERZA TV - Premium Vertical Entertainment Platform"
              className="h-12 sm:h-16 md:h-24 lg:h-32 w-auto"
              width="512"
              height="128"
              loading="eager"
              fetchPriority="high"
            />
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2 tracking-wide">
              A Filmology Labs Company
            </p>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-bold tracking-tight max-w-4xl mx-auto px-4">
            The Future of Entertainment Has Arrived
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-primary font-semibold tracking-tight px-4">
            Watch. Create. Monetize.
          </p>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            VERZA TV is the next-generation streaming platform and creator ecosystem built for the mobile-first era. Discover premium microdramas, exclusive original series, and creator-driven entertainment—all in one destination.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 px-4">
            <Button
              onClick={() => scrollTo("download")}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 px-8 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Download the App
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollTo("creators")}
              className="w-full sm:w-auto rounded-full h-12 md:h-14 px-8 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Become a Creator
            </Button>
          </div>
        </div>
      </div>

      {/* Parallax Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layer 3 - Slowest (Back) */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          style={{ transform: `translateY(${parallaxOffset3}px)` }}
        />
        
        {/* Layer 2 - Medium Speed */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-transparent"
          style={{ transform: `translateY(${parallaxOffset2}px)` }}
        />
        
        {/* Layer 1 - Fastest (Front) */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
          style={{ transform: `translateY(${parallaxOffset1}px)` }}
        />
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background))_70%)]" />
      </div>
    </section>
  );
};
