import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import sugarBabiesMiami from "@/assets/posters/sugar-babies-miami.jpeg.asset.json";
import verzaLogo from "@/assets/verza-logo.png";

const APP_STORE_URL = "https://apps.apple.com/us/app/verzatv/id6752884623";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.verzatv.app";

const features = [
  {
    title: "Old Money Glamour",
    description:
      "Private jets, waterfront mansions, and Rolls-Royce nights — Miami's most exclusive circle, unfiltered.",
  },
  {
    title: "Real Drama. Real Stakes.",
    description:
      "Ambition, loyalty, and betrayal collide as six women chase the lifestyle everyone's talking about.",
  },
  {
    title: "Built For Vertical",
    description:
      "Cinematic, binge-worthy episodes designed for your phone — the next obsession in premium micro drama.",
  },
];

const SugarBabiesMiami = () => {
  useMeta({
    title: "Sugar Babies Miami — A VERZA TV Original Series",
    description:
      "Luxury, ambition, and unfiltered drama collide in the glamorous world of Miami's most talked-about scene. Watch Sugar Babies Miami, a VERZA TV original micro drama.",
    keywords:
      "Sugar Babies Miami, VERZA TV, micro drama, Miami, reality series, vertical entertainment, original series",
    canonical: "https://verzatv.io/sugar-babies-miami",
    ogTitle: "Sugar Babies Miami — A VERZA TV Original Series",
    ogDescription:
      "Luxury, ambition, and unfiltered drama collide in the glamorous world of Miami's most talked-about scene.",
    ogUrl: "https://verzatv.io/sugar-babies-miami",
    ogImage: sugarBabiesMiami.url,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end justify-center overflow-hidden">
        {/* Background poster */}
        <img
          src={sugarBabiesMiami.url}
          alt="Sugar Babies Miami — VERZA TV original series poster"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={verzaLogo} alt="VERZA TV" className="h-7 sm:h-8 w-auto" />
            </Link>
            <Link
              to="/"
              className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
            >
              ← Back to VERZA TV
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-12 md:pb-20 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#ff3ea5] font-semibold mb-4">
            A VERZA TV Original Series
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            Sugar Babies Miami
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Luxury, ambition, and unfiltered drama collide in the glamorous world of Miami's
            most talked-about scene.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-64 px-6 py-3.5 bg-gradient-to-r from-[#2196F3] to-[#64B5F6] text-white rounded-xl hover:opacity-90 transition-opacity text-base font-semibold shadow-lg"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>App Store</span>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-64 px-6 py-3.5 bg-white text-[#1a1a1a] rounded-xl hover:opacity-90 transition-opacity text-base font-semibold shadow-lg"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z" fill="#4285F4" />
                <path d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z" fill="#EA4335" />
                <path d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z" fill="#FBBC04" />
                <path d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#34A853" />
              </svg>
              <span>Google Play</span>
            </a>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">The Story</h2>
          <p className="text-lg md:text-2xl text-white/70 leading-relaxed">
            In a city where everything glitters, six women navigate a world of private jets,
            penthouse parties, and high-stakes relationships. Behind the designer labels and
            champagne toasts lies a story of ambition, rivalry, and the price of living the
            dream. <span className="text-white">Sugar Babies Miami</span> pulls back the
            velvet rope on the most glamorous — and most ruthless — scene in the city.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-[#150512]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#ff3ea5] mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-base text-white/70 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-28 bg-[#150512] text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/50 mb-4">
            Only On
          </p>
          <img src={verzaLogo} alt="VERZA TV" className="h-10 md:h-14 w-auto mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Your Next Obsession Starts Here
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-64 px-6 py-3.5 bg-gradient-to-r from-[#2196F3] to-[#64B5F6] text-white rounded-xl hover:opacity-90 transition-opacity text-base font-semibold shadow-lg"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>App Store</span>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-64 px-6 py-3.5 bg-white text-[#1a1a1a] rounded-xl hover:opacity-90 transition-opacity text-base font-semibold shadow-lg"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z" fill="#4285F4" />
                <path d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z" fill="#EA4335" />
                <path d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z" fill="#FBBC04" />
                <path d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#34A853" />
              </svg>
              <span>Google Play</span>
            </a>
          </div>
          <div className="mt-12">
            <Link
              to="/"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              ← Back to VERZA TV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SugarBabiesMiami;
