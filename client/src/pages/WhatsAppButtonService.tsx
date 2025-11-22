import { MessageCircle } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { SERVICES } from "@/lib/constants";

export default function WhatsAppButtonService() {
  const service = SERVICES.find((s) => s.id === "whatsapp-button")!;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6" data-testid="icon-service">
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-service-title">{service.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-service-description">
            {service.description}
          </p>
        </div>

        {/* What's Included */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Common Issues We Fix:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• WhatsApp button not appearing</li>
                <li>• Wrong number linked</li>
                <li>• Button not clickable on mobile</li>
                <li>• Pre-filled message not working</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What You'll Get:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fully functional WhatsApp button</li>
                <li>• Cross-browser compatibility</li>
                <li>• Mobile-optimized design</li>
                <li>• Click tracking setup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-pricing-title">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      </div>
    </div>
  );
}
