import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthContextType {
  /** True while the session/role is still being resolved. */
  loading: boolean;
  session: Session | null;
  user: User | null;
  /** True only when the signed-in user has the `admin` role. */
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const resolveRole = async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!error && !!data);
  };

  useEffect(() => {
    // Register the listener first, then hydrate the existing session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      // Defer the role lookup to avoid deadlocking inside the auth callback.
      setTimeout(() => {
        resolveRole(newSession?.user?.id).finally(() => setLoading(false));
      }, 0);
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      resolveRole(existing?.user?.id).finally(() => setLoading(false));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{ loading, session, user: session?.user ?? null, isAdmin, signIn, signOut }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
