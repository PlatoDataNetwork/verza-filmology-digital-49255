import { Link } from "react-router-dom";
import verzaLogo from "@/assets/verza-logo.png";

export const Footer = () => {
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
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-2">
                Verza TV / Filmology Labs
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-2">
                5515 Melrose Ave
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Los Angeles CA 90038
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Company</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">About</Link></li>
                <li><Link to="/press" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Press</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Careers</Link></li>
                <li><Link to="/#contact" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Legal</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li><Link to="/legal#terms-of-use" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Terms</Link></li>
                <li><Link to="/legal#privacy" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Privacy</Link></li>
                <li><Link to="/legal#licensing" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Licensing</Link></li>
                <li><Link to="/legal#disclaimer" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Disclaimer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Connect</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">TikTok</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Filmology Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
