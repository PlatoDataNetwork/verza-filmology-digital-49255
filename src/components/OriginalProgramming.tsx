import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const originals = [
  {
    title: "The Vertical Tea",
    description:
      "A sarcastic take on the world of microdramas.",
  },
  {
    title: "Who's Where",
    description:
      "Celebrity news, pop culture, and entertainment gossip from the minds behind some of television's most recognizable entertainment programming.",
  },
  {
    title: "Storage Pirates",
    description:
      "A reality series exploring hidden treasures, unexpected discoveries, and storage unit adventures.",
  },
];

export const OriginalProgramming = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-10 md:py-16 lg:py-20 bg-muted/30 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold uppercase tracking-widest mb-3">
              Original Programming
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Built For The Future Of Entertainment
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              VERZA TV produces and distributes original programming focused on the creator economy,
              entertainment culture, and emerging media trends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {originals.map((o) => (
              <div key={o.title} className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
                  {o.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {o.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-base md:text-lg text-muted-foreground italic">
            And more coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};
