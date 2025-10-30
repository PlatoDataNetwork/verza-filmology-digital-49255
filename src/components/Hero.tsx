import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-sm md:text-base font-medium text-muted-foreground tracking-tight">
            From the founder of E! Entertainment Television
          </p>

          {/* Main Headline - Apple style large text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight leading-none">
            Verza TV
          </h1>
          
          <p className="text-xl md:text-3xl lg:text-4xl text-foreground/90 font-medium tracking-tight max-w-4xl mx-auto">
            The next generation of vertical shorts.
          </p>

          {/* Subheadline - Apple style descriptive text */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-4">
            Designed to elevate short-form storytelling. Built for the way you watch.
          </p>

          {/* CTA Buttons - Apple style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-6 text-base font-medium transition-all hover:scale-[1.02]"
            >
              Learn more
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full px-6 py-6 text-base font-medium border-2 transition-all hover:scale-[1.02] hover:border-foreground/30"
            >
              Contact us
            </Button>
          </div>

          {/* Stats - Minimalist Apple style */}
          <div className="grid grid-cols-3 gap-8 pt-20 max-w-4xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">$6.5B</div>
              <div className="text-sm text-muted-foreground">Market size</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">150M+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">18–65+</div>
              <div className="text-sm text-muted-foreground">Demographics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background -z-10"></div>
    </section>
  );
};
