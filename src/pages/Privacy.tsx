import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 md:space-y-12 text-foreground/90">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Introduction</h2>
              <p className="text-base md:text-lg leading-relaxed">
                At Verza TV, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Information We Collect</h2>
              <p className="text-base md:text-lg leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                <li>Account information (name, email, password)</li>
                <li>Profile information and preferences</li>
                <li>Payment and billing information</li>
                <li>Usage data and viewing history</li>
                <li>Device information and analytics</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">How We Use Your Information</h2>
              <p className="text-base md:text-lg leading-relaxed">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                <li>Provide and improve our services</li>
                <li>Personalize your content experience</li>
                <li>Process payments and subscriptions</li>
                <li>Send service updates and promotional content</li>
                <li>Analyze usage patterns and trends</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Data Security</h2>
              <p className="text-base md:text-lg leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Your Rights</h2>
              <p className="text-base md:text-lg leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications and request data portability.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-base md:text-lg leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@verzatv.com" className="text-primary hover:underline">
                  privacy@verzatv.com
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

export default Privacy;
