import { useQuery } from "@tanstack/react-query";
import { Check, Zap } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculatePromoPrice, formatPrice, getWhatsAppLink } from "@/lib/constants";
import type { PricingTier } from "@shared/schema";
import type { PromoStatusResponse } from "@shared/schema";

interface PricingCardProps {
  tier: PricingTier;
  serviceId: string;
  serviceTitle: string;
  featured?: boolean;
}

export function PricingCard({ tier, serviceId, serviceTitle, featured }: PricingCardProps) {
  const { data: promoStatus } = useQuery<PromoStatusResponse>({
    queryKey: ["/api/promo/status"],
    refetchInterval: 30000,
  });

  const promoActive = promoStatus?.promoActive || false;
  const promoPrice = calculatePromoPrice(tier.originalPrice, promoActive);
  const hasDiscount = promoActive && promoPrice < tier.originalPrice;

  return (
    <Card
      className={`relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "border-primary border-2" : ""
      }`}
      data-testid={`card-pricing-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}

      {hasDiscount && (
        <div className="absolute -top-3 right-4">
          <Badge className="bg-promo text-promo-foreground font-bold">
            <Zap className="w-3 h-3 mr-1" fill="currentColor" />
            50% OFF!
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span
                className="text-2xl font-bold line-through text-muted-foreground"
                data-testid={`text-original-price-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {formatPrice(tier.originalPrice)}
              </span>
            )}
            <span
              className={`text-3xl font-bold ${hasDiscount ? "text-whatsapp" : "text-foreground"}`}
              data-testid={`text-price-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {formatPrice(promoPrice)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Delivery: {tier.deliveryTime}</p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <ul className="space-y-3" data-testid={`list-features-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tier.features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2"
              data-testid={`feature-item-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
            >
              <Check className="w-5 h-5 text-whatsapp flex-shrink-0 mt-0.5" data-testid={`icon-check-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${index}`} />
              <span className="text-sm" data-testid={`text-feature-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <a
          href={getWhatsAppLink(serviceTitle, tier.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          data-testid={`button-order-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
            Order on WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
