import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import alanMruvka from "@/assets/alan-mruvka.png";

export const Founder = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-8 md:py-10 lg:py-12 bg-muted/30 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-12 lg:mb-16">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold uppercase tracking-widest mb-3">
              Built By Television Pioneers
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Alan Mruvka
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium px-4 mb-6 md:mb-8">
              Co-Founder & former CEO of E! Entertainment Television
            </p>
            <div className="flex justify-center">
              <img 
                src={alanMruvka} 
                alt="Alan Mruvka - Co-Founder of E! Entertainment Television"
                className="w-72 h-auto md:w-96 lg:w-[30rem] rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Bio - Apple style quote/feature section */}
          <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-16 mb-8 md:mb-16 shadow-sm space-y-5 md:space-y-6">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-foreground/90">
              VERZA TV was founded by <span className="font-semibold text-foreground">Alan Mruvka</span>, Co-Founder and former CEO of <span className="font-semibold text-foreground">E! Entertainment Television</span>.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-foreground/90">
              After helping pioneer modern entertainment television, Mruvka is once again helping shape the future of media through mobile-first entertainment, creator-driven programming, and next-generation storytelling.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-foreground/90">
              Working alongside E! Entertainment Television Co-Founder <span className="font-semibold text-foreground">Larry Namer</span>, VERZA TV continues a legacy of building platforms that connect audiences with the content they love.
            </p>
          </div>

          {/* Achievements - Clean minimal grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">35+</div>
              <p className="text-xs md:text-base text-muted-foreground px-2">
                Years of entertainment experience
              </p>
            </div>

            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">$15B</div>
              <p className="text-xs md:text-base text-muted-foreground px-2">
                Built E! into a global powerhouse
              </p>
            </div>

            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">First</div>
              <p className="text-xs md:text-base text-muted-foreground px-2">
                Pioneered celebrity television
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
