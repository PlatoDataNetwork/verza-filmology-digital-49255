import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalyticsTag } from "@/components/GoogleAnalyticsTag";
import { GlobalLoginDialog } from "@/components/GlobalLoginDialog";
import { AuthProvider } from "@/contexts/AuthContext";
import { FrontendAuthProvider } from "@/contexts/FrontendAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { LoginProvider } from "@/contexts/LoginContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import Press from "./pages/Press";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
import Legal from "./pages/Legal";
import Licensing from "./pages/Licensing";
import Investors from "./pages/Investors";
import FAQ from "./pages/FAQ";
import GADebug from "./pages/GADebug";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GoogleAnalytics from "./pages/admin/GoogleAnalytics";
import GoogleGSC from "./pages/admin/GoogleGSC";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <FrontendAuthProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <LoginProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <GoogleAnalyticsTag />
                  <GlobalLoginDialog />
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/press" element={<Press />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/licensing" element={<Licensing />} />
                    <Route path="/investors" element={<ProtectedRoute><Investors /></ProtectedRoute>} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/ga-debug" element={<GADebug />} />
                    {/* Admin panel */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedAdminRoute>
                          <AdminLayout />
                        </ProtectedAdminRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="google-analytics" element={<GoogleAnalytics />} />
                      <Route path="google-gsc" element={<GoogleGSC />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </LoginProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </FrontendAuthProvider>

    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
