import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { useArticleSchema } from "@/hooks/useArticleSchema";

const Press = () => {
  
  useOrganizationSchema();
  
  useArticleSchema({
    headline: "VERZA TV Announces Launch of Revolutionary Vertical Content Platform",
    description: "VERZA TV, founded by the creator of E! Entertainment Television, is launching the first U.S. platform for premium short-form vertical entertainment. The platform will deliver microdramas, reality shows, and premium vertical originals to mobile-first audiences.",
    image: "https://verzatv.io/og-image.png",
    datePublished: "2025-10-15T00:00:00Z",
    author: {
      name: "VERZA TV",
      url: "https://verzatv.io"
    },
    url: "https://verzatv.io/press"
  });
  
  useMeta({
    title: "Press & Media - VERZA TV",
    description: "Press contact, media inquiries, company overview, and press kit for VERZA TV. Contact us at press@verzatv.com for media requests and interviews.",
    keywords: "VERZA TV press, media inquiries, press kit, company overview, media relations, press contact",
    canonical: "https://verzatv.io/press",
    ogTitle: "Press & Media - VERZA TV",
    ogDescription: "Press contact, media inquiries, and company overview for VERZA TV - the first U.S. platform for premium vertical entertainment.",
    ogUrl: "https://verzatv.io/press",
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 md:mb-5 tracking-tight">
            Press & Media
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
            News, updates, and press resources.
          </p>

          <div className="space-y-8 md:space-y-10 text-foreground/90">
            {/* Press Contact */}
            <section className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Press</h2>
              <p className="text-base md:text-lg leading-relaxed">
                For press inquiries, media requests, or interview opportunities, please contact our media relations team:
              </p>
              <div className="bg-muted/30 p-6 rounded-2xl space-y-2">
                <p className="text-base md:text-lg">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:press@verzatv.com" className="text-primary hover:underline">
                    press@verzatv.com
                  </a>
                </p>
                <p className="text-base md:text-lg">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+13105606055" className="text-primary hover:underline">
                    +1 (310) 560-6055
                  </a>
                </p>
              </div>
            </section>

            {/* Company Overview */}
            <section className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Company Overview</h2>
              <p className="text-base md:text-lg leading-relaxed">
                VERZA TV is revolutionizing vertical content entertainment, founded by the visionary behind E! Entertainment Television. We deliver premium microdramas, reality content, and more, designed specifically for mobile-first audiences aged 18–65+.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                As the first U.S. platform bridging pop culture with on-demand mobile entertainment, VERZA TV is positioned at the forefront of the $6.5 billion short-form vertical content market.
              </p>
            </section>

            {/* Key Facts */}
            <section className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Key Facts</h2>
              <ul className="space-y-2 text-base md:text-lg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Market Size:</strong> $6.5B vertical content market with 150M+ downloads globally</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Target Audience:</strong> Gen Z and Millennials (18–65+)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Content:</strong> Microdramas, reality shows, and premium vertical originals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Founded By:</strong> Creator of E! Entertainment Television</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Headquarters:</strong> Los Angeles, CA</span>
                </li>
              </ul>
            </section>

            {/* Press Kit */}
            <section className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Press Kit</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Download our press kit for logos, brand guidelines, executive photos, and company fact sheets.
              </p>
              <div className="pt-2">
                <Link 
                  to="/#contact"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Request press kit →
                </Link>
              </div>
            </section>

            {/* Latest News */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Latest News</h2>
              
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-6 py-2">
                  <p className="text-sm text-muted-foreground mb-2">October 15th, 2025</p>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    <a 
                      href="https://www.hollywoodreporter.com/tv/tv-news/microdramas-come-to-america-verza-tv-vertical-soap-operas-1236401254/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      VERZA TV Announces Launch of Revolutionary Vertical Content Platform
                    </a>
                  </h3>
                  <p className="text-base text-muted-foreground">
                    Stay tuned for official announcements and updates about our platform launch.
                  </p>
                </div>
              </div>
            </section>

            {/* Media Inquiries CTA */}
            <section className="bg-muted/30 p-6 md:p-8 rounded-2xl space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Media Inquiries</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Looking to cover VERZA TV or request an interview with our leadership team? We'd love to hear from you.
              </p>
              <div className="pt-2">
                <Link 
                  to="/#contact"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Contact us →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
