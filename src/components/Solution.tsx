export const Solution = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              Why we win.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The first U.S. platform bridging pop culture with on-demand mobile entertainment.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-background rounded-3xl p-10 md:p-16 mb-16 shadow-sm">
            <p className="text-2xl md:text-3xl text-center font-medium leading-relaxed text-foreground/90 tracking-tight">
              Pick-and-choose programming for viewers aged 18–65. Tailored content that speaks to every segment.
            </p>
          </div>

          {/* Key Differentiators - Apple grid style */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">High-impact partnerships</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Studio-friendly formats. Ideal for film and talent promotion across entertainment verticals.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">Built for mass adoption</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Bingeable vertical content under 1 minute. Perfect for a world where late-night TV is fading.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">What others miss</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Influencers, podcasts, red carpet content, and reality programming integrated seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
