import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("verza-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email.trim() || !password) return false;

    const { data, error } = await supabase.functions.invoke("verify-investor-access", {
      body: { password },
    });

    if (error || !data?.authorized) {
      return false;
    }

    setIsAuthenticated(true);
    localStorage.setItem("verza-auth", "true");
    localStorage.setItem("verza-email", email);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("verza-auth");
    localStorage.removeItem("verza-email");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
