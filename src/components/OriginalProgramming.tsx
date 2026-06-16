import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import theVerticalTea from "@/assets/posters/the-vertical-tea.png.asset.json";
import theCarpet from "@/assets/posters/the-carpet.png.asset.json";
import storagePirates from "@/assets/posters/storage-pirates.jpeg.asset.json";
import sugarBabiesMiami from "@/assets/posters/sugar-babies-miami.jpeg.asset.json";
import buySellMiami from "@/assets/posters/buy-sell-miami.png.asset.json";

const originals = [
  {
    title: "The Vertical Tea",
    image: theVerticalTea.url,
    description:
      "Industry news, reviews, interviews, and commentary covering the explosive growth of microdramas.",
  },
  {
    title: "The Carpet",
    image: theCarpet.url,
    description:
      "Real drama. Real people. Unreal stories. An exclusive red carpet series following the stars about to rise.",
  },
  {
    title: "Storage Pirates",
    image: storagePirates.url,
    description:
      "A reality series exploring hidden treasures, unexpected discoveries, and high-stakes storage unit adventures.",
  },
  {
    title: "Sugar Babies Miami",
    image: sugarBabiesMiami.url,
    description:
      "Luxury, ambition, and unfiltered drama collide in the glamorous world of Miami's most talked-about scene.",
  },
  {
    title: "Buy / Sell Miami",
    image: buySellMiami.url,
    description:
      "Million dollar deals. Billion dollar lifestyles. Luxury real estate that's hotter than Miami itself.",
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {originals.map((o) => (
              <div
                key={o.title}
                className="group bg-background rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={o.image}
                    alt={`${o.title} poster`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-2 md:mb-3 tracking-tight">
                    {o.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {o.description}
                  </p>
                </div>
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
