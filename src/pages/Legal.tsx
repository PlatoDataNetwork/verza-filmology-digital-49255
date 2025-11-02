import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

const Legal = () => {
  useEffect(() => {
    // Scroll to the section if there's a hash in the URL
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

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
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
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

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            Legal
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-12 md:mb-16">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Terms of Use Section */}
          <section id="terms-of-use" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Terms of Use
            </h2>
            <div className="space-y-8 md:space-y-12 text-foreground/90">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Agreement to Terms</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  By accessing or using Verza TV, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">User Accounts</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  To access certain features, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Subscription and Payments</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Access to premium content requires a paid subscription. Subscriptions automatically renew unless cancelled before the renewal date. All payments are non-refundable except as required by law.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Content Usage</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  All content on Verza TV is protected by copyright and other intellectual property rights. You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                  <li>Copy, distribute, or share content without permission</li>
                  <li>Use automated tools to access the platform</li>
                  <li>Modify or create derivative works from our content</li>
                  <li>Remove copyright notices or watermarks</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Prohibited Conduct</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  You agree not to engage in any conduct that violates laws, infringes on rights of others, or interferes with the operation of our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Termination</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Contact</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  For questions about these Terms of Use, contact us at{" "}
                  <a href="mailto:legal@verzatv.com" className="text-primary hover:underline">
                    legal@verzatv.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section id="privacy" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Privacy Policy
            </h2>
            <div className="space-y-8 md:space-y-12 text-foreground/90">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Introduction</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  At Verza TV, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Information We Collect</h3>
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
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">How We Use Your Information</h3>
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
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Data Security</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Your Rights</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications and request data portability.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Contact Us</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@verzatv.com" className="text-primary hover:underline">
                    privacy@verzatv.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Licensing Section */}
          <section id="licensing" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Licensing
            </h2>
            <div className="space-y-8 md:space-y-12 text-foreground/90">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Content Licensing</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  All content available on Verza TV, including but not limited to microdramas, reality shows, videos, images, text, graphics, logos, and audio clips, is protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">User License</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Subject to your compliance with these terms, Verza TV grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and view content on the platform for your personal, non-commercial use only.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Restrictions</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
                  <li>Copy, reproduce, distribute, or create derivative works from our content</li>
                  <li>Use content for commercial purposes without explicit written permission</li>
                  <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices</li>
                  <li>Circumvent any technological measures designed to protect the content</li>
                  <li>Use automated systems or software to extract data from the platform</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Third-Party Content</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Some content on Verza TV may be owned by third parties. Such content is licensed to Verza TV and is subject to the copyright and licensing terms of the respective owners.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Commercial Licensing Inquiries</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  For commercial licensing, partnership opportunities, or permission to use our content, please contact us at{" "}
                  <a href="mailto:licensing@verzatv.com" className="text-primary hover:underline">
                    licensing@verzatv.com
                  </a>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Trademark</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Verza TV, the Verza TV logo, and other marks are trademarks of Filmology Labs. You may not use these trademarks without our prior written consent.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section id="disclaimer" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
              Disclaimer
            </h2>
            <div className="space-y-8 md:space-y-12 text-foreground/90">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">General Information</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  The information provided by Verza TV is for general entertainment purposes only. All information on the platform is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">No Professional Advice</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  The content on Verza TV does not constitute professional advice. Before making any decisions based on information found on our platform, we strongly advise you to consult with appropriate professionals.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Content Accuracy</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  While we strive to provide accurate and up-to-date content, Verza TV makes no warranties or representations as to the accuracy or completeness of the content available through our platform. Content is provided "as is" without warranty of any kind.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Limitation of Liability</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Under no circumstance shall Verza TV have any liability to you for any loss or damage of any kind incurred as a result of the use of the platform or reliance on any information provided on the platform. Your use of the platform and your reliance on any information is solely at your own risk.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">External Links</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Our platform may contain links to external websites or content that are not provided or maintained by Verza TV. We do not guarantee the accuracy, relevance, or completeness of any external information or content.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Contact Us</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  If you have questions about this Disclaimer, please contact us at{" "}
                  <a href="mailto:legal@verzatv.com" className="text-primary hover:underline">
                    legal@verzatv.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
