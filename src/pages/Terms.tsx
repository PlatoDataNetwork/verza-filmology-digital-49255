import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 md:space-y-12 text-foreground/90">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Agreement to Terms</h2>
              <p className="text-base md:text-lg leading-relaxed">
                By accessing or using Verza TV, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">User Accounts</h2>
              <p className="text-base md:text-lg leading-relaxed">
                To access certain features, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Providing accurate and complete information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Subscription and Payments</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Access to premium content requires a paid subscription. Subscriptions automatically renew unless cancelled before the renewal date. All payments are non-refundable except as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Content Usage</h2>
              <p className="text-base md:text-lg leading-relaxed">
                All content on Verza TV is protected by copyright and other intellectual property rights. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                <li>Copy, distribute, or share content without permission</li>
                <li>Use automated tools to access the platform</li>
                <li>Modify or create derivative works from our content</li>
                <li>Remove copyright notices or watermarks</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Prohibited Conduct</h2>
              <p className="text-base md:text-lg leading-relaxed">
                You agree not to engage in any conduct that violates laws, infringes on rights of others, or interferes with the operation of our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Termination</h2>
              <p className="text-base md:text-lg leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Contact</h2>
              <p className="text-base md:text-lg leading-relaxed">
                For questions about these Terms of Service, contact us at{" "}
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

export default Terms;
