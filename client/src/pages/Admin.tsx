import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, RefreshCw, LogOut, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PromoStatusResponse } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newSlots, setNewSlots] = useState("");
  const [updating, setUpdating] = useState(false);

  // Contact Info State
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [updatingContact, setUpdatingContact] = useState(false);

  // About Info State
  const [aboutPicture, setAboutPicture] = useState("");
  const [aboutDesc, setAboutDesc] = useState("");
  const [missionDesc, setMissionDesc] = useState("");
  const [updatingAbout, setUpdatingAbout] = useState(false);

  // Home Info State
  const [demoVideoUrl, setDemoVideoUrl] = useState("");
  const [updatingHome, setUpdatingHome] = useState(false);

  // Service Images State
  const [selectedService, setSelectedService] = useState("whatsapp-button");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  const [updatingImages, setUpdatingImages] = useState(false);

  // Testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [deletingTestimonial, setDeletingTestimonial] = useState(false);

  const { data: promoStatus, isLoading } = useQuery<PromoStatusResponse>({
    queryKey: ["/api/promo/status"],
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setAdminSecret(password);
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the admin dashboard",
      });
      // Load all data
      loadAllData();
    } else {
      toast({
        title: "Access denied",
        description: "Please enter admin secret",
        variant: "destructive",
      });
    }
  };

  const loadAllData = async () => {
    try {
      const [contactRes, aboutRes, homeRes, testimonialsRes] = await Promise.all([
        fetch("/api/admin/contact-info"),
        fetch("/api/admin/about-info"),
        fetch("/api/admin/home-info"),
        fetch("/api/testimonials"),
      ]);

      const contactData = await contactRes.json();
      const aboutData = await aboutRes.json();
      const homeData = await homeRes.json();
      const testimonialsData = await testimonialsRes.json();

      if (contactData.whatsapp) {
        setContactWhatsapp(contactData.whatsapp);
        setContactPhone(contactData.phone);
        setContactEmail(contactData.email);
        setContactLocation(contactData.location);
        setContactHours(contactData.businessHours);
      }

      if (aboutData.developerPictureUrl) {
        setAboutPicture(aboutData.developerPictureUrl);
        setAboutDesc(aboutData.aboutDescription);
        setMissionDesc(aboutData.missionDescription);
      }

      if (homeData.demoVideoUrl) {
        setDemoVideoUrl(homeData.demoVideoUrl);
      }

      setTestimonials(testimonialsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleUpdateContact = async () => {
    setUpdatingContact(true);
    try {
      const response = await fetch("/api/admin/contact-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({
          whatsapp: contactWhatsapp,
          phone: contactPhone,
          email: contactEmail,
          location: contactLocation,
          businessHours: contactHours,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "Updated!",
        description: "Contact information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      });
    } finally {
      setUpdatingContact(false);
    }
  };

  const handleUpdateAbout = async () => {
    setUpdatingAbout(true);
    try {
      const response = await fetch("/api/admin/about-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({
          developerPictureUrl: aboutPicture,
          aboutDescription: aboutDesc,
          missionDescription: missionDesc,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "Updated!",
        description: "About information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about information",
        variant: "destructive",
      });
    } finally {
      setUpdatingAbout(false);
    }
  };

  const handleUpdateHome = async () => {
    setUpdatingHome(true);
    try {
      const response = await fetch("/api/admin/home-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({
          demoVideoUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "Updated!",
        description: "Home page information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update home information",
        variant: "destructive",
      });
    } finally {
      setUpdatingHome(false);
    }
  };

  const handleUpdateServiceImages = async () => {
    setUpdatingImages(true);
    try {
      const response = await fetch(`/api/admin/service-images/${selectedService}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({
          beforeImageUrl: beforeImage,
          afterImageUrl: afterImage,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "Updated!",
        description: "Service images updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service images",
        variant: "destructive",
      });
    } finally {
      setUpdatingImages(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setDeletingTestimonial(true);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Secret": adminSecret,
        },
      });

      if (!response.ok) throw new Error("Failed to delete");

      setTestimonials(testimonials.filter(t => t.id !== id));
      toast({
        title: "Deleted!",
        description: "Testimonial deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } finally {
      setDeletingTestimonial(false);
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
              Enter admin secret to access the dashboard
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
              </div>
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage all website content and settings</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
              setAdminSecret("");
            }}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="promo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-6">
            <TabsTrigger value="promo">Promo</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Promo Tab */}
          <TabsContent value="promo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Promotional Status</CardTitle>
                <CardDescription>Manage promotional slots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Slots Remaining</p>
                        <p className="text-3xl font-bold">{promoStatus?.slotsRemaining ?? 0}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <p className={`text-xl font-bold ${promoStatus?.promoActive ? "text-green-600" : "text-red-600"}`}>
                          {promoStatus?.promoActive ? "ACTIVE" : "INACTIVE"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Update Slots</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="0"
                          value={newSlots}
                          onChange={(e) => setNewSlots(e.target.value)}
                          placeholder="Enter number of slots"
                          data-testid="input-admin-slots"
                        />
                        <Button
                          onClick={async () => {
                            setUpdating(true);
                            try {
                              const response = await fetch("/api/promo/update-slots", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  "X-Admin-Secret": adminSecret,
                                },
                                body: JSON.stringify({ slots: parseInt(newSlots) }),
                              });
                              if (!response.ok) throw new Error();
                              toast({ title: "Updated!", description: "Slots updated successfully" });
                              setNewSlots("");
                              await queryClient.invalidateQueries({ queryKey: ["/api/promo/status"] });
                            } catch {
                              toast({ title: "Error", description: "Failed to update", variant: "destructive" });
                            } finally {
                              setUpdating(false);
                            }
                          }}
                          disabled={updating || !newSlots}
                          data-testid="button-update-slots"
                        >
                          {updating ? "Updating..." : "Update"}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update contact details for the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">WhatsApp Number</label>
                  <Input
                    placeholder="+234XXXXXXXXXX"
                    value={contactWhatsapp}
                    onChange={(e) => setContactWhatsapp(e.target.value)}
                    data-testid="input-contact-whatsapp"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input
                    placeholder="+234XXXXXXXXXX"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    data-testid="input-contact-phone"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="City, Country"
                    value={contactLocation}
                    onChange={(e) => setContactLocation(e.target.value)}
                    data-testid="input-contact-location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Business Hours</label>
                  <Textarea
                    placeholder="Business hours (e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM)"
                    value={contactHours}
                    onChange={(e) => setContactHours(e.target.value)}
                    data-testid="textarea-contact-hours"
                  />
                </div>
                <Button
                  onClick={handleUpdateContact}
                  disabled={updatingContact}
                  className="w-full"
                  data-testid="button-update-contact"
                >
                  {updatingContact ? "Saving..." : "Save Contact Info"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
                <CardDescription>Update about page information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Developer Picture URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={aboutPicture}
                    onChange={(e) => setAboutPicture(e.target.value)}
                    data-testid="input-about-picture"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">About Description</label>
                  <Textarea
                    placeholder="About OptiSolve Labs description..."
                    value={aboutDesc}
                    onChange={(e) => setAboutDesc(e.target.value)}
                    className="min-h-32"
                    data-testid="textarea-about-description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mission Description</label>
                  <Textarea
                    placeholder="Mission description..."
                    value={missionDesc}
                    onChange={(e) => setMissionDesc(e.target.value)}
                    className="min-h-32"
                    data-testid="textarea-mission-description"
                  />
                </div>
                <Button
                  onClick={handleUpdateAbout}
                  disabled={updatingAbout}
                  className="w-full"
                  data-testid="button-update-about"
                >
                  {updatingAbout ? "Saving..." : "Save About Info"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Content</CardTitle>
                <CardDescription>Update home page information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Demo Video URL</label>
                  <Input
                    placeholder="https://youtube.com/... or https://vimeo.com/..."
                    value={demoVideoUrl}
                    onChange={(e) => setDemoVideoUrl(e.target.value)}
                    data-testid="input-demo-video"
                  />
                </div>
                <Button
                  onClick={handleUpdateHome}
                  disabled={updatingHome}
                  className="w-full"
                  data-testid="button-update-home"
                >
                  {updatingHome ? "Saving..." : "Save Home Info"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Images</CardTitle>
                <CardDescription>Update before and after images for services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border rounded-md p-2"
                    data-testid="select-service"
                  >
                    <option value="whatsapp-button">WhatsApp Button Fix</option>
                    <option value="menu-fix">Menu Fix</option>
                    <option value="form-fix">Form Fix</option>
                    <option value="visual-overhaul">Visual Overhaul</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Before Image URL</label>
                  <Input
                    placeholder="https://example.com/before.jpg"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    data-testid="input-before-image"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">After Image URL</label>
                  <Input
                    placeholder="https://example.com/after.jpg"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    data-testid="input-after-image"
                  />
                </div>
                <Button
                  onClick={handleUpdateServiceImages}
                  disabled={updatingImages}
                  className="w-full"
                  data-testid="button-update-images"
                >
                  {updatingImages ? "Saving..." : "Save Service Images"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Testimonials</CardTitle>
                <CardDescription>View and delete customer testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                {testimonials.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No testimonials yet</p>
                ) : (
                  <div className="space-y-3">
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="p-4 border rounded-lg space-y-2"
                        data-testid={`testimonial-item-${testimonial.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            <p className="text-sm mt-2">⭐ {testimonial.rating}/5</p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            disabled={deletingTestimonial}
                            data-testid={`button-delete-testimonial-${testimonial.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm italic">"{testimonial.quote}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
