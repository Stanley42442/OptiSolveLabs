import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import type { PromoStatusResponse } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newSlots, setNewSlots] = useState("");
  const [updating, setUpdating] = useState(false);

  const { data: promoStatus, isLoading } = useQuery<PromoStatusResponse>({
    queryKey: ["/api/promo/status"],
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the admin secret for API calls
    if (password) {
      setAdminSecret(password);
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "You can now manage promo slots",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Please enter admin secret",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSlots = async () => {
    const slots = parseInt(newSlots);
    if (isNaN(slots) || slots < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number of slots (0 or greater)",
        variant: "destructive",
      });
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch("/api/promo/update-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({ slots }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update slots");
      }

      toast({
        title: "Slots updated!",
        description: `Promo slots set to ${slots}`,
      });
      setNewSlots("");
      
      // Immediately invalidate all promo status queries for real-time updates
      await queryClient.invalidateQueries({ queryKey: ["/api/promo/status"] });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Could not update promo slots",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Enter admin secret to manage promotional slots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Admin Secret
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin secret"
                  required
                  data-testid="input-admin-password"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Set ADMIN_SECRET environment variable on the server
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                data-testid="button-admin-login"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage promotional slots and track customer claims
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Promo Status</CardTitle>
            <CardDescription>
              Month: {promoStatus?.month !== undefined ? new Date(2024, promoStatus.month).toLocaleString('default', { month: 'long' }) : '—'} {promoStatus?.year || '—'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Slots Remaining:</span>
                  <span
                    className="text-2xl font-bold text-primary"
                    data-testid="text-admin-slots"
                  >
                    {promoStatus?.slotsRemaining ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Promo Status:</span>
                  <span
                    className={`font-semibold ${
                      promoStatus?.promoActive ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {promoStatus?.promoActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/promo/status"] })}
                  className="w-full"
                  data-testid="button-refresh-status"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Update Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Update Promo Slots</CardTitle>
            <CardDescription>
              Set the number of remaining promotional slots. Set to 0 to end the promotion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="slots" className="block text-sm font-medium mb-2">
                  Number of Slots
                </label>
                <Input
                  id="slots"
                  type="number"
                  min="0"
                  value={newSlots}
                  onChange={(e) => setNewSlots(e.target.value)}
                  placeholder="Enter number of slots (e.g., 3)"
                  data-testid="input-admin-slots"
                />
              </div>
              <Button
                onClick={handleUpdateSlots}
                disabled={updating || !newSlots}
                className="w-full"
                data-testid="button-update-slots"
              >
                {updating ? "Updating..." : "Update Slots"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. When a customer contacts you on WhatsApp and commits to a service, confirm the details</p>
            <p>2. After confirming payment/commitment, come to this page</p>
            <p>3. Reduce the slot count by 1 (e.g., if 3 slots remain, set it to 2)</p>
            <p>4. The website will automatically update for all visitors</p>
            <p>5. When slots reach 0, the promo banner will automatically hide and prices will revert</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
