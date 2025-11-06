import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Leadership Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              Meet the visionaries and innovators building the future of vertical entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* Alan Mruvka */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary">AM</div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Alan Mruvka
                </h3>
                <p className="text-base text-primary font-medium mb-3">
                  Founder & CEO
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Creator and founder of E! Entertainment Television, Alan brings decades of pioneering experience in entertainment media. His vision for vertical content streaming is revolutionizing how millions consume entertainment.
                </p>
              </div>
            </div>

            {/* Larry Namer */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary">LN</div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Larry Namer
                </h3>
                <p className="text-base text-primary font-medium mb-3">
                  Chief Strategy Officer
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Co-founder of E! Entertainment Television, Larry is a renowned media executive and strategic advisor. His expertise in global entertainment and media strategy drives VERZA TV's growth and market positioning.
                </p>
              </div>
            </div>

            {/* Placeholder for future team members */}
            <div className="flex flex-col items-center text-center space-y-4 opacity-50">
              <div className="w-48 h-48 rounded-full bg-muted/30 flex items-center justify-center">
                <div className="text-4xl text-muted-foreground">+</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  More to Come
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our team is growing
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 opacity-50">
              <div className="w-48 h-48 rounded-full bg-muted/30 flex items-center justify-center">
                <div className="text-4xl text-muted-foreground">+</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  More to Come
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our team is growing
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
            Join Our Team
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're building something extraordinary and looking for talented individuals to join us on this journey.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
