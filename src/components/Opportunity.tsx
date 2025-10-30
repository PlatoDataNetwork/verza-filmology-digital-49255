import { Card } from "@/components/ui/card";

export const Opportunity = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Apple style */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              A defining moment.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The short-form vertical market has exploded. Leading platforms generate over $3M daily.
            </p>
          </div>

          {/* Key Points - Clean cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <Card className="p-8 bg-muted/50 hover:bg-muted/70 transition-all border-0 rounded-3xl">
              <h3 className="text-5xl md:text-6xl font-semibold mb-4 text-foreground tracking-tight">150M+</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Downloads for leading platforms. Global demand for snackable, serialized vertical content.
              </p>
            </Card>

            <Card className="p-8 bg-muted/50 hover:bg-muted/70 transition-all border-0 rounded-3xl">
              <h3 className="text-5xl md:text-6xl font-semibold mb-4 text-foreground tracking-tight">Ready</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                TikTok and Instagram Reels trained users for fast-paced, episodic mobile narratives.
              </p>
            </Card>

            <Card className="p-8 bg-muted/50 hover:bg-muted/70 transition-all border-0 rounded-3xl">
              <h3 className="text-5xl md:text-6xl font-semibold mb-4 text-foreground tracking-tight">First</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                The first platform to emerge in the U.S., tailored for Gen Z and Millennials.
              </p>
            </Card>
          </div>

          {/* Market Stats - Apple-style minimal presentation */}
          <div className="bg-muted/30 rounded-3xl p-10 md:p-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-foreground tracking-tight">
              The numbers tell the story.
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">$59.57B</div>
                <div className="text-sm text-muted-foreground">Box office + streaming</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">$34.8B</div>
                <div className="text-sm text-muted-foreground">Short form platforms</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">$6.5B</div>
                <div className="text-sm text-muted-foreground">Short drama apps</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">$300M</div>
                <div className="text-sm text-muted-foreground">Year 1 target</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
