import type { Service, Testimonial } from "@shared/schema";

export const WHATSAPP_NUMBER = "2348012345678"; // Replace with actual WhatsApp number
export const WHATSAPP_MESSAGE = "Hi! I'm interested in your website optimization services.";

export const SERVICES: Service[] = [
  {
    id: "whatsapp-button",
    title: "WhatsApp Button Fix",
    description: "Get your WhatsApp chat button working perfectly across all devices and browsers. No more missed customer messages.",
    icon: "MessageCircle",
    pricing: [
      {
        name: "Standard",
        originalPrice: 10000,
        deliveryTime: "2-3 days",
        features: [
          "Full button functionality fix",
          "Mobile & desktop compatibility",
          "Cross-browser testing",
          "Click tracking setup",
          "30-day support"
        ]
      },
      {
        name: "Rush",
        originalPrice: 15000,
        deliveryTime: "24 hours",
        features: [
          "Full button functionality fix",
          "Mobile & desktop compatibility",
          "Cross-browser testing",
          "Click tracking setup",
          "Priority support",
          "Express delivery"
        ]
      }
    ]
  },
  {
    id: "menu-fix",
    title: "Menu Fix",
    description: "Broken navigation? Unresponsive mobile menu? We'll fix all menu issues and make navigation smooth and intuitive.",
    icon: "Menu",
    pricing: [
      {
        name: "Standard",
        originalPrice: 12000,
        deliveryTime: "2-3 days",
        features: [
          "Mobile menu hamburger fix",
          "Dropdown functionality",
          "Smooth animations",
          "Cross-device testing",
          "30-day support"
        ]
      },
      {
        name: "Rush",
        originalPrice: 18000,
        deliveryTime: "24 hours",
        features: [
          "Mobile menu hamburger fix",
          "Dropdown functionality",
          "Smooth animations",
          "Cross-device testing",
          "Priority support",
          "Express delivery"
        ]
      }
    ]
  },
  {
    id: "form-fix",
    title: "Form Fix",
    description: "Forms not submitting? Validation errors? We'll repair contact forms, signup forms, and any custom forms on your site.",
    icon: "FileText",
    pricing: [
      {
        name: "Standard",
        originalPrice: 15000,
        deliveryTime: "3-4 days",
        features: [
          "Form submission repair",
          "Validation logic fix",
          "Error message setup",
          "Email integration",
          "Spam protection",
          "30-day support"
        ]
      },
      {
        name: "Rush",
        originalPrice: 22000,
        deliveryTime: "24-48 hours",
        features: [
          "Form submission repair",
          "Validation logic fix",
          "Error message setup",
          "Email integration",
          "Spam protection",
          "Priority support",
          "Express delivery"
        ]
      }
    ]
  },
  {
    id: "visual-overhaul",
    title: "Visual Overhaul & CSS Redesign",
    description: "Complete website makeover with modern design, professional styling, and responsive layouts that work beautifully on all devices.",
    icon: "Palette",
    pricing: [
      {
        name: "Basic Redesign",
        originalPrice: 25000,
        deliveryTime: "5-7 days",
        features: [
          "Color scheme update",
          "Typography refresh",
          "Button & link styling",
          "Spacing improvements",
          "Mobile responsive fixes",
          "30-day support"
        ]
      },
      {
        name: "Standard Redesign",
        originalPrice: 40000,
        deliveryTime: "7-10 days",
        features: [
          "Complete visual overhaul",
          "Modern UI components",
          "Custom animations",
          "Full responsive design",
          "Performance optimization",
          "60-day support"
        ]
      },
      {
        name: "Premium Redesign",
        originalPrice: 60000,
        deliveryTime: "10-14 days",
        features: [
          "Professional design system",
          "Advanced animations",
          "Micro-interactions",
          "Accessibility compliance",
          "Performance optimization",
          "SEO improvements",
          "90-day support"
        ]
      },
      {
        name: "Rush Redesign",
        originalPrice: 50000,
        deliveryTime: "3-5 days",
        features: [
          "Complete visual overhaul",
          "Modern UI components",
          "Custom animations",
          "Full responsive design",
          "Priority support",
          "Express delivery"
        ]
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Chidinma Okonkwo",
    location: "Lagos, Nigeria",
    rating: 5,
    quote: "My WhatsApp button wasn't working and I was losing customers daily. OptiSolve fixed it in 24 hours and now my conversions are up 40%!"
  },
  {
    id: "2",
    name: "Emeka Nwosu",
    location: "Abuja, Nigeria",
    rating: 5,
    quote: "The mobile menu on my site was completely broken. These guys fixed it perfectly and even improved the design. Very professional service!"
  },
  {
    id: "3",
    name: "Amina Ibrahim",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    quote: "Contact form wasn't working for weeks. OptiSolve Labs repaired it and added spam protection. Great value for money!"
  }
];

export function getWhatsAppLink(service?: string, tier?: string): string {
  let message = WHATSAPP_MESSAGE;
  if (service && tier) {
    message = `Hi! I'm interested in the ${tier} tier for ${service}. Can you help me?`;
  } else if (service) {
    message = `Hi! I'm interested in ${service}. Can you tell me more?`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function calculatePromoPrice(originalPrice: number, promoActive: boolean): number {
  return promoActive ? Math.round(originalPrice * 0.5) : originalPrice;
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}
