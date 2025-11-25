import { Link } from "wouter";
import { MessageCircle, Menu, FileText, Palette, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWhatsAppLink, SERVICES, TESTIMONIALS } from "@/lib/constants";

const iconMap = {
  MessageCircle,
  Menu,
  FileText,
  Palette,
};

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-whatsapp via-whatsapp-dark to-primary py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-hero-title">
              Fix Your Website Issues Fast
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8" data-testid="text-hero-subtitle">
              Professional website optimization services. Get your WhatsApp buttons, menus, forms, and design working perfectly.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-cta"
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </a>
          </div>

          {/* Video Section */}
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden backdrop-blur-sm border-2 border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-sm text-white/80">Demo video coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Fix Section */}
      <section className="py-16 sm:py-24" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-services-title">What We Fix</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
              Expert solutions for the most common website problems. Fast turnaround, professional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Link key={service.id} href={`/${service.id}`}>
                  <Card
                    className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    data-testid={`card-service-${service.id}`}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="flex items-center text-primary font-medium">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-testimonials-title">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">
              Join hundreds of satisfied customers who've fixed their websites with OptiSolve Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4" data-testid={`rating-stars-${testimonial.id}`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        data-testid={`star-${testimonial.id}-${i}`}
                      />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground mb-4" data-testid={`text-quote-${testimonial.id}`}>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold" data-testid={`text-name-${testimonial.id}`}>{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-location-${testimonial.id}`}>{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta-title">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Let's fix your website today. Contact us for a quick consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-cta">Get in Touch</Button>
            </Link>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" data-testid="button-whatsapp-cta">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
