import { Menu, CheckCircle2, XCircle, Zap } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";

export default function MenuFixService() {
  const service = SERVICES.find((s) => s.id === "menu-fix")!;

  const commonProblems = [
    { icon: "✗", title: "Menu Won't Open", desc: "Hamburger icon not responding on mobile" },
    { icon: "✗", title: "Menu Overlapping", desc: "Navigation menu covering content" },
    { icon: "✗", title: "Broken Animations", desc: "Slide-in effects not working" },
    { icon: "✗", title: "Won't Close", desc: "Menu stays open or close button doesn't work" },
  ];

  const benefits = [
    { icon: "🚀", title: "Better Navigation", desc: "Users can easily find what they need" },
    { icon: "📱", title: "Mobile Friendly", desc: "Perfect experience on all devices" },
    { icon: "⭐", title: "Professional Look", desc: "Modern, smooth menu experience" },
  ];

  const processSteps = [
    { num: 1, title: "Send Us Your Site", desc: "Share URL and describe the menu issue" },
    { num: 2, title: "We Test & Diagnose", desc: "Test on multiple devices to identify problem" },
    { num: 3, title: "Quick Fix", desc: "Fix and test thoroughly on all devices" },
    { num: 4, title: "You Approve", desc: "Video showing your menu working perfectly" },
  ];

  const improvements = [
    "Hamburger menu fully responsive",
    "Smooth slide-in animations",
    "All dropdowns working perfectly",
    "Cross-device compatibility",
    "No overlapping content",
    "Instant close button",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Menu className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="text-service-title">
            {service.title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto" data-testid="text-service-description">
            {service.description}
          </p>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Common Mobile Menu Problems We Fix</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonProblems.map((problem, idx) => (
              <Card key={idx} data-testid={`card-problem-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why a Working Menu Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-benefit-${idx}`}>
                <CardContent className="pt-6 text-center">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Before & After</h2>
          <p className="text-center text-muted-foreground mb-12">See how we transform broken mobile menus into smooth, professional navigation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-red-200" data-testid="card-before">
              <CardContent className="pt-6">
                <div className="aspect-video bg-red-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <XCircle className="w-16 h-16 text-red-500 mb-2" />
                  <p className="font-semibold">BEFORE: Broken Menu</p>
                </div>
                <p className="text-muted-foreground">Menu doesn't open, animations broken, overlapping content</p>
              </CardContent>
            </Card>
            <Card className="border-green-200" data-testid="card-after">
              <CardContent className="pt-6">
                <div className="aspect-video bg-green-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                  <p className="font-semibold">AFTER: Fixed Menu</p>
                </div>
                <p className="text-muted-foreground">Smooth animations, instant response, perfect UX</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <Card key={step.num} data-testid={`card-step-${step.num}`}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Key Improvements We Deliver</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {improvements.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Menu Fix Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {service.pricing.map((tier, index) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                serviceId={service.id}
                serviceTitle={service.title}
                featured={index === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
