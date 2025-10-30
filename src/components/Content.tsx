export const Content = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              Content that connects.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Raw. Original. Built for the moment.
            </p>
          </div>

          {/* Content Roadmap - Apple product grid style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="p-8 bg-muted/50 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Premium drama</h3>
              <p className="text-sm text-muted-foreground">
                Trending serialized stories and mini-dramas
              </p>
            </div>

            <div className="p-8 bg-muted/50 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Multiple genres</h3>
              <p className="text-sm text-muted-foreground">
                Romance, horror, reality TV, and more
              </p>
            </div>

            <div className="p-8 bg-muted/50 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Licensed content</h3>
              <p className="text-sm text-muted-foreground">
                Feature movies and dramas from partners
              </p>
            </div>

            <div className="p-8 bg-muted/50 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Additional media</h3>
              <p className="text-sm text-muted-foreground">
                Podcasts, red carpet interviews, and more
              </p>
            </div>
          </div>

          {/* Monetization - Clean Apple-style section */}
          <div className="bg-muted/30 rounded-3xl p-10 md:p-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-foreground tracking-tight">
              Designed to grow together.
            </h3>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center space-y-3">
                <div className="text-4xl font-semibold text-foreground tracking-tight">$4.99</div>
                <div className="text-sm font-medium text-foreground">Flat fee model</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  First 5 episodes free, then $4.99 to finish the series
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl font-semibold text-foreground tracking-tight">Coins</div>
                <div className="text-sm font-medium text-foreground">Digital currency</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Earn for daily logins, shares, and referrals
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl font-semibold text-foreground tracking-tight">V2</div>
                <div className="text-sm font-medium text-foreground">Subscription</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Monthly unlimited access in future release
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
