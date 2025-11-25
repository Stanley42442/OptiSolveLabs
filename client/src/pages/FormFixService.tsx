import { FileText, CheckCircle2, XCircle, Zap } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/lib/constants";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function FormFixService() {
  const { toast } = useToast();
  const service = SERVICES.find((s) => s.id === "form-fix")!;
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    toast({
      title: "Success!",
      description: "This is how your working form will behave.",
    });
    setTimeout(() => setDemoSubmitted(false), 3000);
  };

  const commonProblems = [
    { icon: "✗", title: "Emails Not Sending", desc: "Form submits but emails never arrive" },
    { icon: "✗", title: "Validation Errors", desc: "Form validation broken on mobile" },
    { icon: "✗", title: "Submit Button Broken", desc: "Button doesn't work when clicked" },
    { icon: "✗", title: "Layout Issues", desc: "Fields overlapping on mobile screens" },
  ];

  const benefits = [
    { icon: "!", title: "Lost Customers", desc: "Broken forms mean lost opportunities daily" },
    { icon: "📧", title: "Get Every Message", desc: "Receive all customer inquiries reliably" },
    { icon: "🤝", title: "Build Trust", desc: "Working forms show professionalism" },
  ];

  const processSteps = [
    { num: 1, title: "Form Analysis", desc: "Send us your URL and describe the issue" },
    { num: 2, title: "Testing", desc: "We test on multiple devices and email setups" },
    { num: 3, title: "Fix & Verify", desc: "Fix and verify emails reach your inbox" },
    { num: 4, title: "Support", desc: "Receive reliable customer messages" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Common Issues We Fix</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Your Contact Form Must Work</h2>
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

      {/* Live Demo Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Live Demo: Working Contact Form</h2>
          <p className="text-center text-muted-foreground mb-12">Try our perfectly functioning contact form - works flawlessly on all mobile devices</p>
          
          <Card>
            <CardContent className="pt-6">
              {!demoSubmitted ? (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input placeholder="Enter your name" required data-testid="input-demo-name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input type="email" placeholder="Enter your email" required data-testid="input-demo-email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message</label>
                    <Textarea rows={4} placeholder="Enter your message" required data-testid="input-demo-message" />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-demo-submit">Send Message</Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground">This is exactly how your form will work after we fix it.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How We Fix Your Contact Form</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Common Issues We Fix:</h3>
                <ul className="space-y-3">
                  {["Form not submitting", "Validation errors not showing", "Emails not being sent", "Spam submissions"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  {["Working form submission", "Proper error handling", "Email integration setup", "Spam protection"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
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
