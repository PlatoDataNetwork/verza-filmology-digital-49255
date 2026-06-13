import { LoginDialog } from "@/components/LoginDialog";
import { useLogin } from "@/contexts/LoginContext";

export const GlobalLoginDialog = () => {
  const { loginOpen, setLoginOpen } = useLogin();
  return <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />;
};
