
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explorer from "./pages/Explorer";
import MediaGallery from "./pages/MediaGallery";
import Transmitir from "./pages/Transmitir";
import Apresentacao from "./pages/Apresentacao";
import Configuracoes from "./pages/Configuracoes";
import ModoTecnico from "./pages/ModoTecnico";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/explorer/:path" element={<Explorer />} />
          <Route path="/gallery" element={<MediaGallery />} />
          <Route path="/transmitir" element={<Transmitir />} />
          <Route path="/apresentacao" element={<Apresentacao />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/modo-tecnico" element={<ModoTecnico />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
