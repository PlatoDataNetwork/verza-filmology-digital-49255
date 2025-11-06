import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextType {
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LoginContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
