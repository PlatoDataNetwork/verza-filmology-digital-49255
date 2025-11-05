import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LoginDialog } from "@/components/LoginDialog";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";

const Careers = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" }
  ];
  
  useOrganizationSchema();
  
  useMeta({
    title: "Careers at VERZA TV - Join Our Team",
    description: "Build the future of entertainment at VERZA TV. Explore open positions in engineering, design, content, marketing, and data science. Join our team of innovators.",
    keywords: "VERZA TV careers, jobs, employment, engineering jobs, content jobs, marketing jobs, Los Angeles jobs",
    canonical: "https://verzatv.io/careers",
    ogTitle: "Careers at VERZA TV - Join Our Team",
    ogDescription: "Build the future of entertainment at VERZA TV. Explore open positions and join our team of innovators and creators.",
    ogUrl: "https://verzatv.io/careers",
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Build scalable infrastructure for the next generation of vertical content streaming."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Design intuitive, beautiful experiences that delight millions of users."
    },
    {
      title: "Content Strategy Lead",
      department: "Content",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Shape our content strategy and work with creators to bring compelling stories to life."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Drive growth and brand awareness for VERZA TV across digital channels."
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Leverage data to optimize content recommendations and user engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors min-h-[44px]">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLoginOpen(true)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Login
              </button>
              <Link 
                to="/news" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                News
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Build the Future of Entertainment
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              Join our team of innovators, creators, and storytellers who are revolutionizing vertical content for millions of viewers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="pt-2 md:pt-4 pb-12 md:pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 md:mb-12 text-center tracking-tight">
            Why Join VERZA TV?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-3 p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-semibold text-foreground">Innovation at Scale</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Work on cutting-edge technology that reaches millions of users. Your code, designs, and ideas will shape the future of entertainment.
              </p>
            </div>
            <div className="space-y-3 p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-semibold text-foreground">Industry Veterans</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Learn from the founder of E! Entertainment and a team with decades of combined experience in media and technology.
              </p>
            </div>
            <div className="space-y-3 p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-semibold text-foreground">Growth & Impact</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Join us at an exciting stage where your contributions directly impact product direction and company success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 md:mb-12 text-center tracking-tight">
            Benefits & Perks
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Competitive Compensation</h4>
                <p className="text-sm text-muted-foreground">Salary, equity, and performance bonuses</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Health & Wellness</h4>
                <p className="text-sm text-muted-foreground">Comprehensive medical, dental, and vision coverage</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Flexible Work</h4>
                <p className="text-sm text-muted-foreground">Remote-friendly with flexible hours</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Professional Development</h4>
                <p className="text-sm text-muted-foreground">Learning budget and conference attendance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Unlimited PTO</h4>
                <p className="text-sm text-muted-foreground">Take time off when you need it</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary font-semibold text-xl">✓</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Team Events</h4>
                <p className="text-sm text-muted-foreground">Regular offsites and team building activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 md:mb-12 text-center tracking-tight">
            Open Positions
          </h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div 
                key={index}
                className="bg-muted/30 rounded-2xl p-6 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{position.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-3 py-1 bg-background rounded-full text-muted-foreground">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-background rounded-full text-muted-foreground">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-background rounded-full text-muted-foreground">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    className="rounded-full group-hover:border-foreground/30 transition-colors"
                    asChild
                  >
                    <Link to="/#contact">
                      Apply
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let us know how you can contribute to VERZA TV.
          </p>
          <Button 
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <Link to="/#contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
