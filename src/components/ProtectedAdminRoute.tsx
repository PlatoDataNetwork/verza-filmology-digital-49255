import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

/**
 * Guards all /admin routes:
 * - Not signed in            -> redirect to /admin/login
 * - Signed in, not an admin  -> redirect to the main app ("/")
 * - Signed in admin          -> render children
 */
export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { loading, session, isAdmin } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
