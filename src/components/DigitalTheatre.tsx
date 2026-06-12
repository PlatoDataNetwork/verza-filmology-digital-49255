import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const DigitalTheatre = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-10 md:py-16 lg:py-20 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
            A Digital Theatre for the Next Generation
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed px-2 mb-8 md:mb-12">
            Entertainment is changing. Audiences are moving from traditional television to
            mobile-first experiences. Creators are becoming studios. Short-form storytelling is
            becoming a global phenomenon.
          </p>
          <p className="text-lg sm:text-xl md:text-3xl font-semibold text-foreground tracking-tight px-2 mb-8 md:mb-12">
            VERZA TV sits at the center of this shift.
          </p>
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed px-2">
            Our platform combines premium microdramas, creator content, original programming, and
            audience engagement tools into a single entertainment ecosystem designed for the future.
          </p>
        </div>
      </div>
    </section>
  );
};
