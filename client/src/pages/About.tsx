import { User, Zap, MapPin, Check, Headphones, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";

export default function About() {
  const stats = [
    { number: "100+", label: "Bugs Fixed" },
    { number: "50+", label: "Happy Clients" },
    { number: "24-48hrs", label: "Average Fix Time" },
    { number: "25+", label: "Countries Served" },
  ];

  const whyChoose = [
    {
      icon: TrendingUp,
      title: "Mobile-Only Focus",
      desc: "I exclusively fix mobile bugs. This specialization means I know every common mobile issue and how to solve it quickly."
    },
    {
      icon: MapPin,
      title: "Global Reach",
      desc: "Based in Nigeria, I serve clients worldwide with timezone flexibility and international experience."
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      desc: "Most bugs fixed within 24-48 hours. Same-day rush service available for urgent issues."
    },
    {
      icon: Check,
      title: "Affordable Pricing",
      desc: "Transparent pricing starting from just ₦15,000 for the first 3 clients monthly. No hidden fees."
    },
    {
      icon: TrendingUp,
      title: "Quality Guaranteed",
      desc: "Every fix is tested on multiple mobile devices to ensure it works perfectly for all your customers."
    },
    {
      icon: Headphones,
      title: "Direct Communication",
      desc: "Work directly with me via WhatsApp. No middlemen, no long email chains - just quick, direct fixes."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="text-about-title">
            About OptiSolve Labs
          </h1>
          <p className="text-lg text-white/90" data-testid="text-about-subtitle">
            Your global mobile frontend bug fixing specialist
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Profile Section */}
            <div className="flex justify-center">
              <Card className="w-full max-w-sm">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Frontend Developer</h3>
                  <p className="text-muted-foreground">Specialized in Mobile Bug Fixes</p>
                </CardContent>
              </Card>
            </div>

            {/* About Text */}
            <div data-testid="section-about-story">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">About OptiSolve Labs</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  OptiSolve Labs was founded to address a critical challenge facing businesses globally: functional website issues that directly impact revenue. A malfunctioning navigation menu, non-responsive WhatsApp integration, or failed form submissions represent significant lost conversion opportunities and customer frustration.
                </p>
                <p>
                  As a specialized frontend developer focused on mobile-first optimization based in Nigeria, I have diagnosed and resolved these issues across diverse client portfolios worldwide. This expertise led to establishing OptiSolve Labs—a dedicated service providing rapid, cost-effective, and professional solutions to businesses and enterprises globally.
                </p>
                <p>
                  Rather than offering comprehensive web development, OptiSolve Labs specializes exclusively in mobile frontend remediation. This focused approach enables faster resolution and superior cost efficiency compared to generalist developers, regardless of your location or industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <Card key={idx} data-testid={`card-stat-${idx}`}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-choose-title">Why Choose OptiSolve Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="hover-elevate" data-testid={`card-reason-${idx}`}>
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" data-testid="text-mission-title">My Mission</h2>
          <div className="space-y-6 text-muted-foreground text-lg" data-testid="section-mission-statement">
            <p>
              Our mission is to enable businesses worldwide to maximize digital effectiveness by ensuring optimal mobile functionality. Every technical failure represents a missed customer interaction and revenue opportunity. We eliminate preventable obstacles that impede online success.
            </p>
            <p>
              Whether operating as an e-commerce enterprise, technology startup, or service-based organization across any industry vertical, our commitment remains steadfast: delivering rapid, dependable, and cost-effective mobile frontend optimization services at enterprise quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Fix Your Mobile Website?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8" data-testid="text-cta-subtitle">
            Let's get your mobile bugs fixed today
          </p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-primary"
              data-testid="button-about-cta"
            >
              Contact Me on WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
