import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import verzaLogo from "@/assets/verza-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-32 text-center">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            From the founders of E! Entertainment Television
          </p>

          {/* Main Headline - Logo */}
          <div className="flex justify-center">
            <img 
              src={verzaLogo} 
              alt="VERZA TV - Premium Vertical Entertainment Platform"
              className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto"
              width="512"
              height="128"
              loading="eager"
            />
          </div>
          
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-foreground/90 font-medium tracking-tight max-w-4xl mx-auto px-2">
            Microdramas, Reality & More.
          </p>

          {/* Subheadline - Apple style descriptive text */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-2 md:pt-4 px-2">
            Designed to elevate short-form storytelling. Built for the way you watch.
          </p>

          {/* Stats - Minimalist Apple style */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-12 md:pt-20 max-w-4xl mx-auto px-2">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">$6.5B</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Market size</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">150M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">18–65+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Demographics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background -z-10"></div>
    </section>
  );
};
