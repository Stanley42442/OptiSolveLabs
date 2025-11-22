import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { PromoBanner } from "@/components/PromoBanner";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import WhatsAppButtonService from "@/pages/WhatsAppButtonService";
import MenuFixService from "@/pages/MenuFixService";
import FormFixService from "@/pages/FormFixService";
import VisualOverhaulService from "@/pages/VisualOverhaulService";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <PromoBanner />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
