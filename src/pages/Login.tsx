import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { useFrontendAuth } from "@/contexts/FrontendAuthContext";
import { useToast } from "@/hooks/use-toast";
import verzaLogo from "@/assets/verza-logo.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useFrontendAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/investors");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to VERZA TV",
      });
      navigate("/investors");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid password. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-6">
            <img 
              src={verzaLogo} 
              alt="VERZA TV"
              className="h-20 md:h-24 w-auto mx-auto"
            />
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome to VERZA TV</h1>
              <p className="text-sm text-muted-foreground">Enter password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
};

export default Login;
