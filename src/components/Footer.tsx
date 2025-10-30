export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground tracking-tight">Verza TV</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The next generation of vertical shorts.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-sm text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#careers" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-sm text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-sm text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Filmology Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
