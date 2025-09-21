import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import MarketDetail from "./pages/MarketDetail";
import Portfolio from "./pages/Portfolio";
import Leaderboard from "./pages/Leaderboard";
import Liquidity from "./pages/Liquidity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          {/* UPDATE: Added padding-bottom for mobile footer spacing */}
          <main className="flex-1 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/markets" element={<Marketplace />} />
              <Route path="/market/:id" element={<MarketDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/liquidity" element={<Liquidity />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;