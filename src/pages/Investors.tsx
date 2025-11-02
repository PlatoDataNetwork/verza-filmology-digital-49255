import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, LogOut, TrendingUp, Users, DollarSign, Target, Rocket, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import verzaLogo from "@/assets/verza-logo.png";

export default function Investors() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <p className="text-xl md:text-2xl font-medium text-muted-foreground tracking-tight">
                From the founder of E! Entertainment Television
              </p>
              <div className="flex justify-center">
                <img 
                  src={verzaLogo} 
                  alt="Verza TV" 
                  className="h-20 md:h-24 lg:h-28 w-auto"
                />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                The Next Generation of Vertical Shorts
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Short Form Mobile Entertainment Network
              </p>
            </div>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">The Opportunity</h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground mb-12">
                <p>The short-form vertical, mobile drama app market has exploded since late 2023, with top platforms generating over $3M/day combined.</p>
                <p>150M+ downloads for leading platforms like ShortMax; global audiences show insatiable demand for snackable, serialized vertical content.</p>
                <p>Platforms like TikTok and Instagram Reels have trained users to consume fast-paced, episodic narratives—paving the way for narrative-based video apps and vertical viewing on mobile devices.</p>
                <p>Our platform captures this momentum with an engaging new format tailored for Gen Z and Millennials, the first to emerge in the U.S. Market.</p>
                <p>Vertical viewing on mobile devices allows viewers to watch anywhere discretely.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Market */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <DollarSign className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">The Market</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">$59.57B</CardTitle>
                    <CardDescription>US Box Office, Netflix, Hulu</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">$34.8B</CardTitle>
                    <CardDescription>Overall Short Form Video Platforms</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">$6.5B</CardTitle>
                    <CardDescription>Short Form Drama App Market</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">$300M</CardTitle>
                    <CardDescription>Verza TV Target Year 1</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Missed Opportunities */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Missed Opportunities in the Market</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Much of the short-form drama space remains untapped beyond serialized dramas. While the current model resonates with older audiences (35+), younger viewers — particularly Gen Z — want more: recognizable creators, influencers, and innovative formats that speak to their culture and interests.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lacks Influencers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Limited influencer-driven content and celebrity involvement in platforms.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ability to Promote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Studios lack mobile-native platforms as late-night TV declines rapidly.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lack Other Medias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No integration of podcasts, red carpet events, or reality programming.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Our Solution and Why We Win</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-12">
                We're building the first U.S.-based platform to elevate short-form storytelling by bridging pop culture with on-demand mobile entertainment. Our platform delivers pick-and-choose programming for viewers aged 18–65, with tailored content that speaks to every segment.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">High Impact Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">High-impact influencer partnerships across entertainment verticals. Studio-friendly formats ideal for film and talent promotion. Creating authentic connections with audiences through trusted voices.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Built for Mass Adoption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Built for mass adoption with bingeable, vertical content under 1 minute. Perfect distribution vehicle in a world where late-night is fading, replaced by creators on demand.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Target Audience</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-12">
                Global audiences, especially Gen Z and Millennials, have shifted dramatically toward short-form content consumption. Platforms like TikTok have conditioned users to engage with vertical, rapid-fire entertainment that's easily digestible and endlessly scrollable.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Ages 18–65+. Global audiences shifted to short-form, vertical content. Easily digestible and endlessly enjoyable and scrollable entertainment.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Gen Z</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">85% prefer mobile apps/sites. Women 35+ are 86% more likely than men to buy via mobile apps. Significant purchasing power making them ideal consumers.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Millennials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">85% prefer mobile apps/sites. Women 35+ are 86% more likely than men to buy via mobile apps. Significant purchasing power making them ideal consumers.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Go to Market Strategy */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Rocket className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Go to Market Strategy</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Phase 1</CardTitle>
                    <CardDescription>Announcement</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Phase 2</CardTitle>
                    <CardDescription>Alpha</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Controlled content rollout + CPI testing in U.S. + Asia; initial creator panels</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Phase 3</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Content expansion, localization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Phase 4</CardTitle>
                    <CardDescription>V2</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Full-funnel marketing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Strategy */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Marketing Strategy</h2>
              <p className="text-lg text-muted-foreground mb-12">
                Our marketing approach is designed to drive maximum impact at launch and scale through a mix of paid acquisition, organic content, influencer amplification, and strategic partnerships — all backed by data and powered by world-class talent.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Paid Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">TikTok, Instagram Reels, YouTube Shorts, Google, SEO, ASO, and SEM</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Influencer Led</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Leveraging the massive built-in fanbases of top-tier creators</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Strategic Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Worldwide partnerships with leading talent agencies and management firms, film studios and streamers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Creator Flywheel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Building a curated team of top creators to form a founding cohort of platform advocates</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Content Roadmap */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Content Roadmap</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Launch Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Launch with TikTok-trending programming</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">More Genres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Blend of genres: romance, horror, and reality TV</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Licensing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Feature movies and dramas from other platforms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Medias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Podcasts, red carpet interviews, and more</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Monetization Strategy */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Our Monetization Strategy</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-12">
                We leverage a dual-track monetization approach that combines direct episode purchases with an in-app coin system to increase engagement and retention.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Flat Fee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">First 5 episodes are free, then $4.99 to finish the series</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Model</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Monthly subscription model for unlimited access as part of V2 release</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Coins & Gamification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Digital coins to enhance retention, reward behaviors, and drive social sharing. Users earn coins for daily logins, shares, referrals, and more.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Founded by Alan Mruvka</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Alan Mruvka holds over 35 years of experience in the entertainment and real estate development businesses. His most distinguished and monumental success is in revolutionizing a genre of entertainment and celebrity-based television as the Founder of the pop culture icon, E! Entertainment Television, now a NBC/Comcast company valued at over $15 Billion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">Ready to Innovate With Us?</h2>
              <p className="text-xl text-muted-foreground">Let's Build the Future Together!</p>
              <Button size="lg" asChild className="mt-8">
                <a href="/#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
