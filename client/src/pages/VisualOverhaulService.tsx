import { Palette, CheckCircle2, XCircle, Zap } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";

export default function VisualOverhaulService() {
  const service = SERVICES.find((s) => s.id === "visual-overhaul")!;

  const problemsFixes = [
    { icon: "✗", title: "Non-Mobile Friendly Look", desc: "Looks good on desktop but terrible on mobile" },
    { icon: "✗", title: "Outdated/Ugly Design", desc: "Removes 90's/2000's aesthetics, modernizes look" },
    { icon: "✗", title: "Poor User Experience", desc: "Confusing layouts replaced with intuitive navigation" },
    { icon: "✗", title: "Lack of Credibility", desc: "Professional design boosts trust with customers" },
  ];

  const improvements = [
    { icon: "✓", title: "Modern Aesthetics", desc: "Sleek, contemporary look that engages users" },
    { icon: "✓", title: "Optimized Layout", desc: "Better flow and readability for professionals" },
    { icon: "✓", title: "Clean Codebase", desc: "Well-structured CSS for easy future updates" },
    { icon: "✓", title: "Improved Credibility", desc: "Professional design boosts user trust" },
  ];

  const processSteps = [
    { num: 1, title: "Consultation & Quote", desc: "Discuss goals and get custom quote" },
    { num: 2, title: "Design Mockup", desc: "Fresh CSS design with live preview" },
    { num: 3, title: "Implementation", desc: "Apply new CSS directly to codebase" },
    { num: 4, title: "Final Review", desc: "Approve result, covered by 7-day warranty" },
  ];

  const whatsIncluded = [
    "Modern, professional design",
    "Mobile-first responsive layout",
    "Cohesive brand identity",
    "Improved user experience",
    "Clean CSS code",
    "Cross-device testing",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="text-service-title">
            {service.title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto" data-testid="text-service-description">
            {service.description}
          </p>
        </div>
      </section>

      {/* Problems & Fixes Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What a Visual Overhaul Fixes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemsFixes.map((problem, idx) => (
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

      {/* Improvements Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Key Improvements We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {improvements.map((item, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-improvement-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">See the Transformation</h2>
          <p className="text-center text-muted-foreground mb-12">Watch how we transform outdated websites into modern, professional platforms</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-red-200" data-testid="card-before">
              <CardContent className="pt-6">
                <div className="aspect-video bg-red-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <XCircle className="w-16 h-16 text-red-500 mb-2" />
                  <p className="font-semibold">BEFORE: Outdated Look</p>
                </div>
                <p className="text-muted-foreground">Dated design, poor mobile experience, low credibility</p>
              </CardContent>
            </Card>
            <Card className="border-green-200" data-testid="card-after">
              <CardContent className="pt-6">
                <div className="aspect-video bg-green-50 rounded-lg flex flex-col items-center justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                  <p className="font-semibold">AFTER: Modern & Professional</p>
                </div>
                <p className="text-muted-foreground">Modern design, mobile-first, professional presence</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How We Redesign Your Site</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What's Included</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {whatsIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Visual Overhaul Pricing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
