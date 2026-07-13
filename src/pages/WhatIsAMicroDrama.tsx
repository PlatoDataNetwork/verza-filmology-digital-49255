import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { useArticleSchema } from "@/hooks/useArticleSchema";
import { useFAQSchema } from "@/hooks/useFAQSchema";

const WhatIsAMicroDrama = () => {
  useArticleSchema({
    headline: "What Is a Micro Drama? A Complete Guide to Premium Vertical Entertainment",
    description:
      "A comprehensive guide to micro dramas — serialized, cinematic vertical stories built for mobile. Learn how they differ from social clips and why premium vertical entertainment is booming in the US.",
    image: "https://verzatv.io/og-image.png",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    author: { name: "Verza TV editorial team", url: "https://verzatv.io/team" },
    url: "https://verzatv.io/guides/what-is-a-micro-drama",
  });

  useFAQSchema([
    {
      question: "What are micro dramas?",
      answer:
        "Micro dramas are serialized, story-driven series shot in full-screen vertical (portrait) format and released as short episodes, typically one to three minutes each. Every series delivers a complete narrative arc with a clear beginning, middle, and end, produced with cinematic quality for mobile-first viewing.",
    },
    {
      question: "How are micro dramas different from TikTok or Reels clips?",
      answer:
        "Unlike generic social clips, micro dramas are professionally produced, scripted, and serialized. Each episode advances a continuous storyline rather than standing alone, and the format is engineered for premium storytelling in true 1080x1920 resolution instead of casual, one-off social content.",
    },
    {
      question: "How long is a micro drama episode?",
      answer:
        "Most micro drama episodes run between one and three minutes, with a full series spanning dozens of episodes. The short episode length is designed for the way people watch on their phones — in quick, addictive sessions.",
    },
    {
      question: "Why are micro dramas growing in the US?",
      answer:
        "Smartphone-first viewing habits, the dominance of vertical video, and demand for premium serialized storytelling have created a fast-growing US market. Verza TV, founded by Alan Mruvka, creator of E! Entertainment Television, is building the first US platform dedicated to this category.",
    },
  ]);

  useMeta({
    title: "What Is a Micro Drama? Guide to Vertical Entertainment | Verza TV",
    description:
      "What are micro dramas? A complete guide to serialized vertical entertainment — how micro dramas work, how they differ from social clips, and why they're booming in the US.",
    keywords:
      "micro dramas, what are micro dramas, vertical entertainment, short-form video, serialized micro drama, mobile streaming, Verza TV",
    canonical: "https://verzatv.io/guides/what-is-a-micro-drama",
    ogTitle: "What Is a Micro Drama? A Complete Guide",
    ogDescription:
      "A complete guide to micro dramas — serialized, cinematic vertical stories built for mobile.",
    ogUrl: "https://verzatv.io/guides/what-is-a-micro-drama",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <main className="py-12 md:py-20 lg:py-24">
        <article className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides/what-is-a-micro-drama" },
              { label: "What Is a Micro Drama?", href: "/guides/what-is-a-micro-drama" },
            ]}
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            What Is a Micro Drama?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            A complete guide to the fastest-growing format in premium vertical entertainment.
          </p>
          <p className="text-sm text-muted-foreground mb-12 md:mb-16">
            By the Verza TV editorial team · Updated July 13, 2026
          </p>

          <div className="space-y-12 md:space-y-16 text-foreground/90">
            <section className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                A <strong>micro drama</strong> is a serialized, story-driven series shot in
                full-screen vertical (portrait) format and released as short episodes, typically
                one to three minutes each. Unlike a viral clip that stands on its own, every micro
                drama episode advances a continuous storyline — a complete narrative arc with a
                clear beginning, middle, and end, produced with cinematic quality for the way
                people actually watch today: on their phones.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                How a micro drama works
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Micro dramas take the serialized structure of prestige television and compress it
                for mobile. A single series can span dozens of bite-sized episodes, each ending on
                a hook that pulls you into the next one. Because the format is designed for phones
                first, each episode is produced in true 1080×1920 resolution rather than being
                cropped from horizontal footage.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Serialized storytelling
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Episodes connect into a season-long arc across genres like romance, thriller,
                    and drama — closer to a binge-worthy series than a standalone video.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Built vertical, not cropped
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Every shot is composed for portrait viewing, so the framing, pacing, and text
                    are all designed for a full-screen phone experience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Short episodes, long engagement
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    One-to-three-minute episodes fit the moments people already spend on their
                    phones, while the cliffhanger structure keeps viewers watching across a whole
                    season.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Micro dramas vs. TikTok and Reels clips
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                It's easy to confuse micro dramas with the short clips that fill social feeds, but
                they are fundamentally different products:
              </p>
              <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    <strong>Produced, not user-generated:</strong> micro dramas are professionally
                    scripted, cast, and shot, whereas most social clips are casual and one-off.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    <strong>Serialized, not standalone:</strong> a micro drama episode continues a
                    story, while a TikTok or Reel is designed to work in isolation.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    <strong>Premium, not disposable:</strong> production value, narrative craft, and
                    true 1080×1920 quality set micro dramas apart from repackaged horizontal or
                    social-media content.
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Why premium vertical entertainment is booming in the US
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Smartphones are now the primary screen for a huge share of entertainment, and
                vertical video has become the default way people consume it. As audiences grow
                accustomed to full-screen portrait storytelling, demand has shifted from casual
                clips toward premium, serialized content that rewards repeat viewing. Short-form
                portrait video already accounts for the majority of mobile viewing time, which is
                why studios and platforms are racing to define the category.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                The influence of established entertainment founders is accelerating that shift.
                Verza TV was founded by{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Alan_Mruvka"
                  rel="noopener"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Alan Mruvka
                </a>
                , creator of E! Entertainment Television — a network that reached tens of millions
                of US households. That kind of broadcast pedigree is bringing television-grade
                storytelling, structure, and production discipline to a format that started out
                casual, helping turn micro dramas into a genuine premium entertainment category.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Who micro dramas are for
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Viewers</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Addictive, cinematic series across romance, thriller, and drama, optimized for
                    smartphones and available on demand.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Creators</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    A premium studio and distribution home for serialized vertical storytelling,
                    with production support and a built-in mobile audience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Brands</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Native integration inside premium micro drama content, reaching highly engaged
                    mobile viewers.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    What are micro dramas?
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Serialized, story-driven series shot in full-screen vertical format and released
                    as short episodes, usually one to three minutes each, with a complete narrative
                    arc.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    How are they different from TikTok or Reels clips?
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Micro dramas are professionally produced and serialized, so each episode
                    advances a continuous story instead of standing alone as casual social content.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    How long is a micro drama episode?
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Most episodes run one to three minutes, with a full series spanning dozens of
                    episodes designed for quick, addictive viewing sessions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Why are micro dramas growing in the US?
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Smartphone-first viewing, the dominance of vertical video, and demand for
                    premium serialized storytelling have created a fast-growing market that Verza TV
                    is built to serve.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4 bg-muted/30 p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Explore premium micro dramas on Verza TV
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Verza TV is the first US platform dedicated to premium micro dramas. Learn more
                about the company and how to get started.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  About Verza TV →
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Frequently asked questions →
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
      <MobileDock />
    </div>
  );
};

export default WhatIsAMicroDrama;
