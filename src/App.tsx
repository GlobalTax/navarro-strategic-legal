import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import Fiscal from "./pages/servicios/Fiscal";
import Mercantil from "./pages/servicios/Mercantil";
import Laboral from "./pages/servicios/Laboral";
import MA from "./pages/servicios/MA";
import EmpresaFamiliar from "./pages/EmpresaFamiliar";
import Equipo from "./pages/Equipo";
import Insights from "./pages/Insights";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/legal/AvisoLegal";
import Privacidad from "./pages/legal/Privacidad";
import Cookies from "./pages/legal/Cookies";
import NotFound from "./pages/NotFound";
import Login from "./pages/intranet/Login";
import Dashboard from "./pages/intranet/Dashboard";
import PersonasList from "./pages/intranet/personas/PersonasList";
import PersonasForm from "./pages/intranet/personas/PersonasForm";
import PersonasDetail from "./pages/intranet/personas/PersonasDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/fiscal" element={<Fiscal />} />
              <Route path="/servicios/mercantil" element={<Mercantil />} />
              <Route path="/servicios/laboral" element={<Laboral />} />
              <Route path="/servicios/ma" element={<MA />} />
              <Route path="/empresa-familiar" element={<EmpresaFamiliar />} />
              <Route path="/equipo" element={<Equipo />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
              <Route path="/legal/privacidad" element={<Privacidad />} />
              <Route path="/legal/cookies" element={<Cookies />} />
              
              {/* Intranet Routes */}
              <Route path="/intranet/login" element={<Login />} />
              <Route path="/intranet/dashboard" element={<Dashboard />} />
            <Route path="/intranet/personas" element={<PersonasList />} />
            <Route path="/intranet/personas/new" element={<PersonasForm />} />
            <Route path="/intranet/personas/:id" element={<PersonasDetail />} />
            <Route path="/intranet/personas/:id/edit" element={<PersonasForm />} />
            <Route path="/intranet/blog" element={<BlogList />} />
            <Route path="/intranet/blog/new" element={<BlogForm />} />
            <Route path="/intranet/blog/:id/edit" element={<BlogForm />} />
            <Route path="/intranet/blog/:id/history" element={<BlogHistory />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
