import { MessageCircle, CheckCircle2, XCircle, Zap } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";

export default function WhatsAppButtonService() {
  const service = SERVICES.find((s) => s.id === "whatsapp-button")!;

  const commonProblems = [
    { icon: "✗", title: "Not Clickable", desc: "Button visible but clicking does nothing on mobile" },
    { icon: "✗", title: "Wrong Number", desc: "Takes users to wrong number or error page" },
    { icon: "✗", title: "Hidden/Missing", desc: "Button disappears on smaller screens" },
    { icon: "✗", title: "Formatting Error", desc: "Pre-filled messages broken or incorrectly formatted" },
  ];

  const benefits = [
    { icon: "💬", title: "Instant Communication", desc: "Customers reach you immediately on WhatsApp" },
    { icon: "📈", title: "More Sales", desc: "Quick responses lead to more conversions" },
    { icon: "💼", title: "Professional", desc: "Show you're accessible and customer-focused" },
  ];

  const processSteps = [
    { num: 1, title: "Send Us Your Site", desc: "Share URL and describe the button issue" },
    { num: 2, title: "We Test & Diagnose", desc: "Test on multiple devices to find problem" },
    { num: 3, title: "Quick Fix", desc: "Fix and test thoroughly on all devices" },
    { num: 4, title: "You Approve", desc: "Video showing your button working perfectly" },
  ];

  const improvements = [
    "Button clickable on all phones",
    "Correct number linked",
    "Pre-filled messages working",
    "Cross-browser compatibility",
    "Optimized positioning",
    "Click tracking enabled",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-whatsapp to-whatsapp-dark py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Common WhatsApp Button Problems We Fix</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Your WhatsApp Button Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-benefit-${idx}`}>
                <CardContent className="pt-6 text-center">
                  <Zap className="w-12 h-12 text-whatsapp mx-auto mb-4" />
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
          <p className="text-center text-muted-foreground mb-12">See how we transform a broken WhatsApp button into a reliable sales channel</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-red-200" data-testid="card-before">
              <CardContent className="pt-6">
                <div className="aspect-video bg-red-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <XCircle className="w-16 h-16 text-red-500 mb-2" />
                  <p className="font-semibold">BEFORE: Button Unresponsive</p>
                </div>
                <p className="text-muted-foreground">Missing, broken, or not clickable on mobile</p>
              </CardContent>
            </Card>
            <Card className="border-green-200" data-testid="card-after">
              <CardContent className="pt-6">
                <div className="aspect-video bg-green-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                  <p className="font-semibold">AFTER: Button Working</p>
                </div>
                <p className="text-muted-foreground">Perfectly functional on all devices</p>
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
                  <div className="w-12 h-12 rounded-full bg-whatsapp text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
                    <CheckCircle2 className="w-5 h-5 text-whatsapp flex-shrink-0" />
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">WhatsApp Fix Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {service.pricing.map((tier, index) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                serviceId={service.id}
                serviceTitle={service.title}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
