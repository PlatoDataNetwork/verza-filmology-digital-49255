import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Home, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useMeta({
    title: "Install VERZA TV App - Get it on Your Phone",
    description: "Install VERZA TV directly to your phone's home screen for a native app experience. No app store needed.",
    keywords: "install VERZA TV, PWA, progressive web app, mobile app, install to home screen",
    canonical: "https://verzatv.io/install",
    ogTitle: "Install VERZA TV App",
    ogDescription: "Get VERZA TV on your phone - Install directly to your home screen",
    ogUrl: "https://verzatv.io/install",
  });

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 mb-6">
              <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 sm:mb-6 tracking-tight">
              Install VERZA TV
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
              Get the full VERZA TV experience right on your phone. No app store, no hassle—just tap and install.
            </p>

            {isInstalled && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400 mb-6">
                <Home className="w-5 h-5" />
                <span className="font-medium">Already installed!</span>
              </div>
            )}

            {!isInstalled && isInstallable && (
              <Button 
                onClick={handleInstallClick}
                size="lg"
                className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              >
                <Download className="w-5 h-5" />
                Install Now
              </Button>
            )}

            {!isInstalled && !isInstallable && (
              <div className="text-sm text-muted-foreground max-w-md mx-auto">
                <p className="mb-4">To install VERZA TV on your device:</p>
                <div className="text-left bg-muted/30 rounded-lg p-4 space-y-2">
                  <p><strong>iPhone/iPad:</strong> Tap the Share button <span className="inline-block">📤</span> then "Add to Home Screen"</p>
                  <p><strong>Android:</strong> Tap the menu <span className="inline-block">⋮</span> then "Install app" or "Add to Home screen"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-foreground mb-10 sm:mb-12 tracking-tight">
            Why Install?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant loading with offline support for uninterrupted entertainment
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-muted/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Home Screen Access</h3>
              <p className="text-sm text-muted-foreground">
                Quick access from your home screen just like a native app
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-muted/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Full Screen Experience</h3>
              <p className="text-sm text-muted-foreground">
                Immersive viewing without browser bars or distractions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Install Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-foreground mb-10 sm:mb-12 tracking-tight">
            Installation Guide
          </h2>

          <div className="space-y-8">
            {/* iOS Instructions */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>📱</span> iPhone & iPad
              </h3>
              <ol className="space-y-3 text-sm sm:text-base text-muted-foreground list-decimal list-inside">
                <li>Open verzatv.io in Safari browser</li>
                <li>Tap the Share button <span className="inline-block">📤</span> at the bottom</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm</li>
                <li>Find VERZA TV on your home screen!</li>
              </ol>
            </div>

            {/* Android Instructions */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🤖</span> Android
              </h3>
              <ol className="space-y-3 text-sm sm:text-base text-muted-foreground list-decimal list-inside">
                <li>Open verzatv.io in Chrome or your browser</li>
                <li>Tap the menu button <span className="inline-block">⋮</span> in the corner</li>
                <li>Select "Install app" or "Add to Home screen"</li>
                <li>Tap "Install" to confirm</li>
                <li>Launch VERZA TV from your home screen!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Install;
