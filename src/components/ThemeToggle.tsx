import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 md:w-11 md:h-11 min-h-[44px] min-w-[44px]"
    >
      <Sun className="h-6 w-6 md:h-7 md:w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" strokeWidth={2.5} />
      <Moon className="absolute h-6 w-6 md:h-7 md:w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" strokeWidth={2.5} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
