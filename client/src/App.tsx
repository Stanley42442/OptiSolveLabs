import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { PromoBanner } from "@/components/PromoBanner";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import WhatsAppButtonService from "@/pages/WhatsAppButtonService";
import MenuFixService from "@/pages/MenuFixService";
import FormFixService from "@/pages/FormFixService";
import VisualOverhaulService from "@/pages/VisualOverhaulService";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/whatsapp-button" component={WhatsAppButtonService} />
      <Route path="/menu-fix" component={MenuFixService} />
      <Route path="/form-fix" component={FormFixService} />
      <Route path="/visual-overhaul" component={VisualOverhaulService} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navigation />
            <PromoBanner />
            <ScrollToTop />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
