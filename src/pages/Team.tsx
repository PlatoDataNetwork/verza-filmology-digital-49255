import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { usePersonSchema } from "@/hooks/usePersonSchema";
import alanMruvkaImg from "@/assets/alan-mruvka-headshot.png";
import larryNamerImg from "@/assets/larry-namer.png";

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
    jobTitle: "Senior Advisor",
    description: "Founder of E! Entertainment Television, Larry is a renowned media executive and strategic advisor.",
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

  const executiveTeam = [
    { name: "Debra Baum", title: "SVP Business Development", email: "debra@verzatv.com" },
    { name: "Allison Reichel", title: "Chief of Staff", email: "info@verzatv.co" },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight">
              Leadership Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
              Meet the visionaries who founded E! Entertainment Television and the innovators building the future of vertical entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Row */}
      <section className="py-6 sm:py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-10 justify-center max-w-2xl mx-auto">
            
            {/* Alan Mruvka */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden">
                <img 
                  src={alanMruvkaImg} 
                  alt="Alan Mruvka - Founder & CEO"
                  className="w-full h-full object-cover object-[center_0%]"
                />
              </div>
              <div className="px-1">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1">
                  Alan Mruvka
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-primary font-medium">
                  Founder & CEO
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
                  Co-Founder E! Entertainment Television
                </p>
                <a
                  href="mailto:info@verzatv.co"
                  className="inline-block mt-2 text-[10px] sm:text-xs md:text-sm text-primary font-medium hover:underline"
                >
                  Connect
                </a>
              </div>
            </div>

            {/* Larry Namer */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden">
                <img 
                  src={larryNamerImg} 
                  alt="Larry Namer - Senior Advisor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1">
                  Larry Namer
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-primary font-medium">
                  Senior Advisor
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
                  Co-Founder E! Entertainment Television
                </p>
                <a
                  href="mailto:info@verzatv.co"
                  className="inline-block mt-2 text-[10px] sm:text-xs md:text-sm text-primary font-medium hover:underline"
                >
                  Connect
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Executive Team */}
      <section className="py-6 sm:py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {executiveTeam.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="px-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  {member.title && (
                    <p className="text-[10px] sm:text-xs md:text-sm text-primary font-medium leading-tight">
                      {member.title}
                    </p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-block mt-2 text-[10px] sm:text-xs md:text-sm text-primary font-medium hover:underline"
                    >
                      Connect
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
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
