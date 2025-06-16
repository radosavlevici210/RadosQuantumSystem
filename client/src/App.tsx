import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import QuantumInterface from "@/pages/QuantumInterface";
import NetworkPage from "@/pages/NetworkPage";
import SettingsPage from "@/pages/SettingsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import SecurityPage from "@/pages/SecurityPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={QuantumInterface} />
      <Route path="/network" component={NetworkPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/security" component={SecurityPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
