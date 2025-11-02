import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { LoginDialog } from "@/components/LoginDialog";

const Licensing = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
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

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Licensing</h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Content Licensing Overview</h2>
              <p className="text-muted-foreground mb-4">
                All content available on Verza TV, including but not limited to microdramas, reality shows, videos, 
                images, audio, and text, is protected by copyright and other intellectual property laws. The content 
                is owned by or licensed to Filmology Labs and its content partners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Licensing Disclaimer</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">Limited License Grant</h3>
                <p>
                  Subject to your compliance with these terms, Verza TV grants you a limited, non-exclusive, 
                  non-transferable, non-sublicensable license to access and view content available on the service 
                  solely for your personal, non-commercial use.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Restrictions</h3>
                <p>You may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copy, reproduce, distribute, or create derivative works from any content</li>
                  <li>Sell, rent, lease, sublicense, or transfer any content to any third party</li>
                  <li>Reverse engineer, decompile, or disassemble any technology used to provide the service</li>
                  <li>Remove, alter, or obscure any copyright, trademark, or other proprietary rights notices</li>
                  <li>Use any automated system to access, scrape, or download content</li>
                  <li>Circumvent any content protection or digital rights management systems</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Content Ownership</h3>
                <p>
                  All rights, title, and interest in and to the content, including all intellectual property rights, 
                  remain with Filmology Labs and our content partners. No ownership rights are transferred to you 
                  through your use of the service.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Third-Party Content</h3>
                <p>
                  Some content available on Verza TV may be provided by third-party licensors. Use of such content 
                  is subject to additional terms and conditions as specified by the respective content owners.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Digital Rights Management (DRM)</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">DRM Protection</h3>
                <p>
                  Verza TV employs industry-standard Digital Rights Management (DRM) technology to protect content 
                  from unauthorized access, copying, and distribution. This technology ensures that content creators 
                  and rights holders are fairly compensated for their work.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Technical Requirements</h3>
                <p>
                  To access DRM-protected content, your device must meet certain technical requirements and support 
                  the necessary DRM protocols. Supported devices and browsers are regularly updated to maintain 
                  security and compatibility.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Playback Restrictions</h3>
                <p>DRM protection may impose the following restrictions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Limited number of devices that can stream content simultaneously</li>
                  <li>Restrictions on downloading content for offline viewing</li>
                  <li>Time-limited access to downloaded content</li>
                  <li>Geographic restrictions based on licensing agreements</li>
                  <li>Quality limitations based on device capabilities and network conditions</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Anti-Circumvention</h3>
                <p>
                  Any attempt to circumvent, disable, or interfere with the DRM protection systems is strictly 
                  prohibited and may result in immediate termination of your account and legal action. This includes 
                  but is not limited to using screen recording software, capture devices, or any other technology 
                  designed to bypass content protection measures.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Updates and Modifications</h3>
                <p>
                  We reserve the right to update, modify, or enhance our DRM systems at any time to improve security 
                  and prevent unauthorized access. You agree to install any required updates to continue accessing 
                  protected content.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Copyright Infringement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you believe that your copyrighted work has been used or displayed on Verza TV in a way that 
                  constitutes copyright infringement, please contact us immediately with the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A description of the copyrighted work that you claim has been infringed</li>
                  <li>A description of where the material is located on our service</li>
                  <li>Your contact information (address, telephone number, and email address)</li>
                  <li>A statement that you have a good faith belief that the use is not authorized</li>
                  <li>A statement under penalty of perjury that the information is accurate</li>
                  <li>Your physical or electronic signature</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contact</h2>
              <p className="text-muted-foreground mb-4">
                For licensing inquiries, DRM technical support, or copyright concerns, please contact us:
              </p>
              <div className="text-muted-foreground space-y-2">
                <p>Verza TV</p>
                <p>5515 Melrose Ave</p>
                <p>Los Angeles CA 90038</p>
                <p>Email: <a href="mailto:licensing@verzatv.com" className="text-primary hover:underline">licensing@verzatv.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Licensing;
