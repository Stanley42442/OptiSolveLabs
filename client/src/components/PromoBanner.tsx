import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import type { PromoStatusResponse } from "@shared/schema";

export function PromoBanner() {
  const { data: promoStatus } = useQuery<PromoStatusResponse>({
    queryKey: ["/api/promo/status"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Don't show banner if promo is inactive or no slots remaining
  if (!promoStatus || !promoStatus.promoActive || promoStatus.slotsRemaining === 0) {
    return null;
  }

  return (
    <div
      className="bg-promo text-promo-foreground py-3 px-4 text-center transition-all duration-300"
      data-testid="banner-promo"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <Zap className="w-5 h-5 flex-shrink-0" fill="currentColor" data-testid="icon-promo-lightning" />
        <p className="font-bold text-sm sm:text-base" data-testid="text-promo-message">
          SPECIAL OFFER: First {promoStatus.slotsRemaining === 1 ? "Customer" : `${promoStatus.slotsRemaining} Customers`} Get 50% OFF!
        </p>
        <span
          className="font-bold text-sm sm:text-base"
          data-testid="text-slots-remaining"
        >
          {promoStatus.slotsRemaining} {promoStatus.slotsRemaining === 1 ? "Slot" : "Slots"} Remaining
        </span>
      </div>
    </div>
  );
}
