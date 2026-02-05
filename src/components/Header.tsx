import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginDialog } from "@/components/LoginDialog";
import { useLogin } from "@/contexts/LoginContext";
import verzaLogo from "@/assets/verza-logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const { loginOpen, setLoginOpen } = useLogin();
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

  const navItems = [
    { to: "/about", label: "About" },
    { to: "/team", label: "Team" },
    { to: "/careers", label: "Careers" },
    { to: "/faq", label: "FAQ" },
    { to: "/login", label: "Investor" },
    { to: "/news", label: "Press" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center">
            <div className="flex flex-col leading-none">
              <img src={verzaLogo} alt="VERZA TV" className="h-7 sm:h-8 w-auto" />
              <span className="mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground tracking-wide">
                A Filmology Labs Company
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.to}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/#contact"
                      onClick={handleContactClick}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Investor Presentation & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="text-sm font-medium hidden sm:flex"
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
