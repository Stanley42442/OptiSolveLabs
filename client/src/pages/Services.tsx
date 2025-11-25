import { Link } from "wouter";
import { MessageCircle, Menu, FileText, Palette, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";

const iconMap = {
  MessageCircle,
  Menu,
  FileText,
  Palette,
};

export default function Services() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">Specialized Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-page-subtitle">
            Expert mobile frontend optimization and repair services. We resolve critical website issues with precision and efficiency, enabling you to maintain business continuity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Link key={service.id} href={`/${service.id}`}>
                <Card
                  className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  data-testid={`card-service-${service.id}`}
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="flex items-center text-primary font-medium">
                      View Pricing & Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-muted/30 rounded-lg p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" data-testid="text-why-choose-title">Why Choose OptiSolve Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-fast">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-feature-fast-title">Efficient</div>
              <p className="text-muted-foreground" data-testid="text-feature-fast-description">
                Most issues resolved within 24-72 hours. Expedited service available for time-sensitive requirements.
              </p>
            </div>
            <div className="text-center" data-testid="feature-reliable">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-feature-reliable-title">Professional</div>
              <p className="text-muted-foreground" data-testid="text-feature-reliable-description">
                Comprehensive support with 30-90 day follow-up included. Complete satisfaction commitment.
              </p>
            </div>
            <div className="text-center" data-testid="feature-affordable">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-feature-affordable-title">Transparent</div>
              <p className="text-muted-foreground" data-testid="text-feature-affordable-description">
                Competitive pricing with full cost visibility. No additional charges. Early adopters receive 50% discount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
