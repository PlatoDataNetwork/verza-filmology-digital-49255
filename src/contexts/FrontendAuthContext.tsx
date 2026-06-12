import { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FrontendAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const FrontendAuthContext = createContext<FrontendAuthContextType | undefined>(undefined);

export const FrontendAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check sessionStorage on initial load (clears when browser/tab closes)
    return sessionStorage.getItem("verza-frontend-auth") === "true";
  });

  const login = async (password: string): Promise<boolean> => {
    if (!password) return false;

    const { data, error } = await supabase.functions.invoke("verify-investor-access", {
      body: { password },
    });

    if (error || !data?.authorized) {
      return false;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem("verza-frontend-auth", "true");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("verza-frontend-auth");
  };

  return (
    <FrontendAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </FrontendAuthContext.Provider>
  );
};

export const useFrontendAuth = () => {
  const context = useContext(FrontendAuthContext);
  if (context === undefined) {
    throw new Error("useFrontendAuth must be used within a FrontendAuthProvider");
  }
  return context;
};
