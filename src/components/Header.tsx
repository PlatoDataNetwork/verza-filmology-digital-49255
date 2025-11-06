import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginDialog } from "@/components/LoginDialog";
import verzaLogo from "@/assets/verza-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center justify-start">
            <img 
              src={verzaLogo} 
              alt="VERZA TV"
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation - Center */}
          <div className="flex items-center justify-center">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/press">
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Press
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/careers">
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Careers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/#contact" onClick={handleContactClick}>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>FAQ</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Frequently Asked Questions</h4>
                        <ul className="space-y-2">
                          <li>
                            <Link 
                              to="/legal#terms-of-use" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              What are VERZA TV's Terms of Use?
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/legal#privacy" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              How does VERZA TV protect my personal data?
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/legal#licensing" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Can I share VERZA TV content with others?
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/legal#terms-of-use" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              What is VERZA TV's refund policy?
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/legal#licensing" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              How can I use VERZA TV content commercially?
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/legal#disclaimer" 
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Does VERZA TV provide professional advice?
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Login & Theme Toggle - Right */}
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="text-sm font-medium"
            >
              Login
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
