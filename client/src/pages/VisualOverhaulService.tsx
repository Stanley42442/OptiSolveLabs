import { Palette } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { SERVICES } from "@/lib/constants";

export default function VisualOverhaulService() {
  const service = SERVICES.find((s) => s.id === "visual-overhaul")!;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6" data-testid="icon-service">
            <Palette className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-service-title">{service.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-service-description">
            {service.description}
          </p>
        </div>

        {/* What's Included */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Transform Your Website</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Design Issues We Fix:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Outdated, unprofessional look</li>
                <li>• Poor mobile responsiveness</li>
                <li>• Inconsistent styling</li>
                <li>• Low conversion rates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What You'll Get:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Modern, professional design</li>
                <li>• Mobile-first responsive layout</li>
                <li>• Cohesive brand identity</li>
                <li>• Improved user experience</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-pricing-title">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Process Section */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-muted-foreground">
                We discuss your goals and vision
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Design</h3>
              <p className="text-sm text-muted-foreground">
                Create modern, stunning layouts
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-sm text-muted-foreground">
                Implement responsive code
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Launch</h3>
              <p className="text-sm text-muted-foreground">
                Deploy and provide support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
