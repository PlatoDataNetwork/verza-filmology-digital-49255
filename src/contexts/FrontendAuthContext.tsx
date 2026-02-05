import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FrontendAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const FrontendAuthContext = createContext<FrontendAuthContextType | undefined>(undefined);

export const FrontendAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check sessionStorage on initial load (clears when browser/tab closes)
    return sessionStorage.getItem("verza-frontend-auth") === "true";
  });

  const login = (password: string): boolean => {
    if (password === "VERZATV1") {
      setIsAuthenticated(true);
      sessionStorage.setItem("verza-frontend-auth", "true");
      return true;
    }
    return false;
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
