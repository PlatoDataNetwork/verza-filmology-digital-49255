import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors min-h-[44px]">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            Disclaimer
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 md:space-y-12 text-foreground/90">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">General Information</h2>
              <p className="text-base md:text-lg leading-relaxed">
                The information provided by Verza TV is for general informational purposes only. All information on the platform is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">No Professional Advice</h2>
              <p className="text-base md:text-lg leading-relaxed">
                The content on Verza TV does not constitute professional advice. Before making any decisions based on information found on our platform, we strongly advise you to consult with appropriate professionals.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Content Accuracy</h2>
              <p className="text-base md:text-lg leading-relaxed">
                While we strive to provide accurate and up-to-date content, Verza TV makes no warranties or representations as to the accuracy or completeness of the content available through our platform. Content is provided "as is" without warranty of any kind.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Limitation of Liability</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Under no circumstance shall Verza TV have any liability to you for any loss or damage of any kind incurred as a result of the use of the platform or reliance on any information provided on the platform. Your use of the platform and your reliance on any information is solely at your own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">External Links</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Our platform may contain links to external websites or content that are not provided or maintained by Verza TV. We do not guarantee the accuracy, relevance, or completeness of any external information or content.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-base md:text-lg leading-relaxed">
                If you have questions about this Disclaimer, please contact us at{" "}
                <a href="mailto:legal@verzatv.com" className="text-primary hover:underline">
                  legal@verzatv.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
