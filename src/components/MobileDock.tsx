import { Link, useLocation } from "react-router-dom";
import { Home, Info, Briefcase, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileDock = () => {
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

  const dockItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/careers", label: "Careers", icon: Briefcase },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/#contact", label: "Contact", icon: Mail, onClick: handleContactClick },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-sm mx-auto">
        {dockItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all touch-manipulation min-w-[64px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground active:bg-muted/50"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
