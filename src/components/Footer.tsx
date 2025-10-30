import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8 md:py-12 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground tracking-tight">Verza TV</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                The next generation of vertical shorts.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">About</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Contact</a></li>
                <li><a href="#careers" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-xs md:text-sm text-foreground">Connect</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors inline-block min-h-[44px] flex items-center">LinkedIn</a></li>
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
