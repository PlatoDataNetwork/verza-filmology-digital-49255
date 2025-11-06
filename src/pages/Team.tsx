import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { usePersonSchema } from "@/hooks/usePersonSchema";

const Team = () => {
  useMeta({
    title: "Leadership Team - VERZA TV",
    description: "Meet the leadership team behind VERZA TV, led by founder Alan Mruvka, creator of E! Entertainment Television.",
    keywords: "VERZA TV team, Alan Mruvka, E! Entertainment founder, leadership, executive team",
    canonical: "https://verzatv.io/team",
    ogTitle: "Leadership Team - VERZA TV",
    ogDescription: "Meet the visionaries building the future of vertical entertainment.",
    ogUrl: "https://verzatv.io/team",
  });

  usePersonSchema({
    name: "Alan Mruvka",
    jobTitle: "Founder & CEO",
    description: "Creator and founder of E! Entertainment Television, pioneering the future of vertical content streaming.",
    url: "https://verzatv.io/team",
    worksFor: {
      name: "VERZA TV",
      url: "https://verzatv.io"
    },
    alumniOf: ["E! Entertainment Television"],
    knowsAbout: ["Entertainment", "Media", "Broadcasting", "Streaming", "Content Creation"]
  });

  usePersonSchema({
    name: "Larry Namer",
    jobTitle: "Chief Strategy Officer",
    description: "Co-founder of E! Entertainment Television and strategic visionary in global entertainment media.",
    url: "https://verzatv.io/team",
    worksFor: {
      name: "VERZA TV",
      url: "https://verzatv.io"
    },
    alumniOf: ["E! Entertainment Television"],
    knowsAbout: ["Entertainment", "Media Strategy", "Broadcasting", "International Media", "Content Distribution"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Leadership Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
              Meet the visionaries and innovators building the future of vertical entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            
            {/* Alan Mruvka */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-5xl sm:text-6xl font-bold text-primary">AM</div>
              </div>
              <div className="px-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  Alan Mruvka
                </h3>
                <p className="text-sm sm:text-base text-primary font-medium mb-2 sm:mb-3">
                  Founder & CEO
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Creator and founder of E! Entertainment Television, Alan brings decades of pioneering experience in entertainment media. His vision for vertical content streaming is revolutionizing how millions consume entertainment.
                </p>
              </div>
            </div>

            {/* Larry Namer */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-5xl sm:text-6xl font-bold text-primary">LN</div>
              </div>
              <div className="px-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  Larry Namer
                </h3>
                <p className="text-sm sm:text-base text-primary font-medium mb-2 sm:mb-3">
                  Chief Strategy Officer
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Co-founder of E! Entertainment Television, Larry is a renowned media executive and strategic advisor. His expertise in global entertainment and media strategy drives VERZA TV's growth and market positioning.
                </p>
              </div>
            </div>

            {/* Placeholder for future team members */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 opacity-50 hidden lg:flex">
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-muted/30 flex items-center justify-center">
                <div className="text-3xl sm:text-4xl text-muted-foreground">+</div>
              </div>
              <div className="px-4">
                <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
                  More to Come
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Our team is growing
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight">
            Join Our Team
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            We're building something extraordinary and looking for talented individuals to join us on this journey.
          </p>
        </div>
      </section>

      <Footer />
      <MobileDock />
    </div>
  );
};

export default Team;
