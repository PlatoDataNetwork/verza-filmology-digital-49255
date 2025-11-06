import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { FrontendAuthProvider } from "@/contexts/FrontendAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <FrontendAuthProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/press" element={<ProtectedRoute><Press /></ProtectedRoute>} />
                <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
                <Route path="/careers" element={<ProtectedRoute><Careers /></ProtectedRoute>} />
                <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
                <Route path="/legal" element={<ProtectedRoute><Legal /></ProtectedRoute>} />
                <Route path="/licensing" element={<ProtectedRoute><Licensing /></ProtectedRoute>} />
                <Route path="/investors" element={<ProtectedRoute><Investors /></ProtectedRoute>} />
                <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </FrontendAuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
