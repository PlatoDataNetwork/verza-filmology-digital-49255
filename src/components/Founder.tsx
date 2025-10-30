export const Founder = () => {
  return (
    <section className="py-12 md:py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 md:mb-4 tracking-tight">
              Founded by
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Alan Mruvka
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium px-4">
              Founder of E! Entertainment Television
            </p>
          </div>

          {/* Bio - Apple style quote/feature section */}
          <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-16 mb-12 md:mb-16 shadow-sm">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-foreground/90">
              Alan Mruvka holds over 35 years of experience in entertainment and real estate development. His most distinguished success revolutionized celebrity-based television as Founder of <span className="font-semibold text-foreground">E! Entertainment Television</span>, now valued at over <span className="font-semibold text-foreground">$15 billion</span>.
            </p>
          </div>

          {/* Achievements - Clean minimal grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">35+</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                Years of entertainment experience
              </p>
            </div>

            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">$15B</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                Built E! into a global powerhouse
              </p>
            </div>

            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">First</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                Pioneered celebrity television
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
