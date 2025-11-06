import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import verzaLogo from "@/assets/verza-logo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const parallaxOffset1 = useParallax({ speed: 0.3 });
  const parallaxOffset2 = useParallax({ speed: 0.5 });
  const parallaxOffset3 = useParallax({ speed: 0.2 });
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative min-h-[50vh] md:min-h-[calc(100vh-4rem)] flex items-start md:items-center justify-center overflow-hidden bg-background transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-2 sm:py-12 md:py-24 text-center">
        <div className="max-w-5xl mx-auto space-y-2 sm:space-y-3 md:space-y-6 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal md:font-bold text-muted-foreground tracking-tight px-4">
            From the founders of E! Entertainment Television
          </p>

          {/* Main Headline - Logo */}
          <div className="flex justify-center py-2">
            <img 
              src={verzaLogo} 
              alt="VERZA TV - Premium Vertical Entertainment Platform"
              className="h-12 sm:h-16 md:h-24 lg:h-32 w-auto"
              width="512"
              height="128"
              loading="eager"
            />
          </div>
          
          <p className="text-3xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/90 font-bold tracking-normal max-w-4xl mx-auto px-4">
            Microdramas, Reality<br className="md:hidden" /> and More
          </p>

          {/* Subheadline - Apple style descriptive text */}
          <p className="text-lg sm:text-xl md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-1 sm:pt-2 md:pt-4 px-4">
            Designed to elevate short-form storytelling. Built for the way you watch.
          </p>

          {/* Stats - Minimalist Apple style */}
          <div className="hidden md:grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-6 sm:pt-8 md:pt-16 lg:pt-20 max-w-4xl mx-auto px-4">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">$6.5B</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Market size</div>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">150M+</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">18–65+</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Demographics</div>
            </div>
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
