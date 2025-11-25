import { MessageCircle, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getWhatsAppLink } from "@/lib/constants";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    bugType: "",
    message: "",
    urgency: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", websiteUrl: "", bugType: "", message: "", urgency: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp (Recommended)",
      description: "Get instant response and quick quotes",
      action: "Chat Now",
      href: getWhatsAppLink(),
      testId: "button-contact-whatsapp-method"
    },
    {
      icon: Mail,
      title: "Email",
      description: "For detailed inquiries",
      action: "optisolvelabs@gmail.com",
      href: "mailto:optisolvelabs@gmail.com",
      testId: "button-contact-email-method"
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Call us during business hours",
      action: "+234 702 609 9884",
      href: "tel:+2347026099884",
      testId: "button-contact-phone-method"
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM WAT" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM WAT" },
    { day: "Sunday", time: "Closed" },
    { day: "WhatsApp Support", time: "24/7 (Response within hours)" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="text-contact-hero-title">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-contact-hero-subtitle">
            Get in touch - we're here to help fix your website issues
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-contact-methods-title">
              Fastest Way to Reach Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a key={method.title} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-contact-method-${method.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CardContent className="pt-6 text-center">
                      <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                      <p className="text-muted-foreground mb-4">{method.description}</p>
                      <Button variant="default" data-testid={method.testId}>
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-contact-form-title">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-contact-form-subtitle">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-contact-email"
                    />
                  </div>
                </div>

                {/* Phone and Website URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      data-testid="input-contact-phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                      Website URL
                    </label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      data-testid="input-contact-website"
                    />
                  </div>
                </div>

                {/* Bug Type and Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bugType" className="block text-sm font-medium mb-2">
                      What bug do you need fixed? *
                    </label>
                    <select
                      id="bugType"
                      value={formData.bugType}
                      onChange={(e) => setFormData({ ...formData, bugType: e.target.value })}
                      required
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      data-testid="select-contact-bugtype"
                    >
                      <option value="">Select a service</option>
                      <option value="menu">Mobile Menu Fix</option>
                      <option value="whatsapp">WhatsApp Button Fix</option>
                      <option value="form">Contact Form Fix</option>
                      <option value="visual">Visual Overhaul & CSS Redesign</option>
                      <option value="other">Other Mobile Issue</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                      How urgent is this fix? *
                    </label>
                    <select
                      id="urgency"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      required
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      data-testid="select-contact-urgency"
                    >
                      <option value="">Select urgency</option>
                      <option value="standard">Standard (24-48 hours) - 50% OFF available</option>
                      <option value="rush">Same-Day Rush</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Describe the Issue *
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Please describe the issue you're experiencing in detail..."
                    data-testid="input-contact-message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                  data-testid="button-contact-submit"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-2" data-testid="text-business-hours-title">
              <Clock className="w-8 h-8" />
              Business Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessHours.map((item, index) => (
              <Card key={index} data-testid={`card-hours-${index}`}>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold mb-2">{item.day}</h3>
                  <p className="text-muted-foreground">{item.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-location-title">Our Location</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-location-subtitle">
              Proudly serving businesses across Nigeria from Lagos
            </p>
          </div>

          <div className="w-full h-96 rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62283899424!2d3.3792057!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="iframe-map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
