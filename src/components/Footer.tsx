import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import verzaLogo from "@/assets/verza-logo.png";

export const Footer = () => {
  const location = useLocation();

  const handleLegalClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname === "/legal") {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/legal${hash}`);
      }
    }
  };

  return (
    <footer className="bg-muted/30 py-8 md:py-12 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
            <div className="col-span-2 md:col-span-1">
              <img 
                src={verzaLogo} 
                alt="Verza TV" 
                className="h-10 md:h-12 w-auto mb-3 md:mb-4"
              />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-1">
                Verza TV
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-1">
                5515 Melrose Ave
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Los Angeles CA 90038
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Company</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors inline-block">About</Link></li>
                <li><Link to="/press" className="hover:text-foreground transition-colors inline-block">Press</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors inline-block">Careers</Link></li>
                <li><Link to="/#contact" className="hover:text-foreground transition-colors inline-block">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Legal</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link 
                    to="/legal#terms-of-use" 
                    onClick={(e) => handleLegalClick(e, "#terms-of-use")}
                    className="hover:text-foreground transition-colors inline-block"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/legal#privacy" 
                    onClick={(e) => handleLegalClick(e, "#privacy")}
                    className="hover:text-foreground transition-colors inline-block"
                  >
                    Privacy
                  </Link>
                </li>
                <li><Link to="/licensing" className="hover:text-foreground transition-colors inline-block">Licensing</Link></li>
                <li>
                  <Link 
                    to="/legal#disclaimer" 
                    onClick={(e) => handleLegalClick(e, "#disclaimer")}
                    className="hover:text-foreground transition-colors inline-block"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Connect</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors inline-block">TikTok</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              &copy; {new Date().getFullYear()} Filmology Labs. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> in Hollywood
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
