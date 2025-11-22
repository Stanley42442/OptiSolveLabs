# OptiSolve Labs Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from professional service platforms like Stripe, Shopify, and modern SaaS landing pages, combined with WhatsApp's brand identity for trust and familiarity in the Nigerian market.

## Core Design Principles
1. **Trust & Professionalism**: Clean, modern interface that establishes credibility for a technical service
2. **Mobile-First**: All components optimized for mobile viewing (primary audience)
3. **Action-Oriented**: Clear CTAs driving WhatsApp engagement
4. **Urgency Without Pressure**: Promotional elements create excitement, not anxiety

## Color System
- **Primary**: WhatsApp Green (#25D366) - trust, familiarity, action
- **Secondary**: Deep Teal (#128C7E) - supporting brand color
- **Accent**: Bright Blue (#34B7F1) - secondary actions
- **Dark Background**: #0d0d0d with #1a1a1a cards
- **Text**: #e0e0e0 (primary), #a0a0a0 (secondary)
- **Warning/Promo**: Vibrant Yellow (#ffc107) for promotional banners
- **Success**: #28a745, Danger: #dc3545

## Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Hierarchy**:
  - H1: 2.5rem (mobile: 1.8rem) - page headers
  - H2: 2.5rem - section titles
  - H3: 1.5rem - card titles
  - Body: 1rem, line-height 1.6
  - CTA buttons: 1.1rem bold

## Layout System
**Spacing**: Tailwind units of 4, 8, 16, 24, 32 (1rem = 16px base)
- Section padding: py-16 vertical (mobile: py-12)
- Card padding: p-8
- Component gaps: gap-8 for grids
- Container max-width: max-w-7xl

## Site Structure
- **Home Page**: Hero with video, "What We Fix" section (4 services listed, no pricing), testimonials, contact form
- **Services Overview Page**: General service descriptions (no pricing)
- **Individual Service Pages** (4 pages):
  - WhatsApp Button Fix
  - Menu Fix  
  - Form Fix
  - Visual Overhaul & CSS Redesign
  - Each shows pricing tiers with dynamic promo discounts

## Component Library

### Navigation
- Sticky header with shadow on scroll
- Logo left, hamburger menu right (mobile)
- WhatsApp CTA button with green pill shape
- Smooth slide-down mobile menu overlay
- Links to all 4 individual service pages

### Promotional Banner
- Full-width yellow banner (#ffc107) with dark text
- Lightning bolt icon for urgency
- Real-time slot counter display (e.g., "First 3 Customers - 2 Slots Remaining")
- Compact on mobile, horizontal layout on desktop
- Positioned directly below navigation, visible on all pages
- Auto-hides smoothly when slots reach zero

### Hero Section (Home Page)
- Gradient background (WhatsApp green to deep teal)
- White text with high contrast
- Embedded YouTube video player (responsive iframe, max-w-3xl)
- Large WhatsApp CTA button below video
- Tagline emphasizing quick, professional fixes

### What We Fix Section (Home Page)
- Grid layout: 2x2 on desktop, single column mobile
- 4 service cards: WhatsApp Button, Menu, Form, Visual Overhaul
- Each card: Icon (3rem), title (H3), brief description
- Hover effect: subtle lift with shadow
- Link to individual service page (no pricing displayed here)

### Individual Service Pages
- Service-specific hero section with description
- Pricing tiers section with cards for Standard and Rush (Visual Overhaul may have additional tiers)
- WhatsApp CTA button for each pricing tier

### Pricing Cards (On Individual Service Pages Only)
- Two or more tiers per service (Standard, Rush, plus additional for Visual Overhaul)
- **Promo Active**: Show discounted price prominently with strikethrough original price beside it
- **Promo Ended**: Show original price only, no strikethrough
- Large price number display
- Feature checklist with green checkmarks
- WhatsApp CTA button matching tier level
- Card hover: subtle lift effect

### Testimonial Cards
- Dark cards with subtle border
- 5-star rating display (yellow stars ⭐)
- Italic quote text
- Customer name and location
- Equal height cards in grid (3 columns desktop, 1 mobile)

### Contact Form
- Two-column input layout (desktop), single column (mobile)
- Clean input fields with floating labels
- Netlify form integration (data-netlify="true")
- Success message with green checkmark

### Footer
- Dark background (#0d0d0d)
- Copyright left, WhatsApp contact link right
- Simple, minimal design

## Dynamic Promo System

### Pricing Display Logic
- **When Promo Active (slots > 0)**:
  - All prices on all service pages show 50% discount
  - Original price displayed with strikethrough in muted color
  - Discounted price shown prominently in green
  
- **When Promo Ended (slots = 0)**:
  - All prices revert to original full price
  - No strikethrough, single price display
  - Yellow promo banner auto-hides

### Price Update Animation
- Smooth fade transition (300ms) when prices change
- Real-time updates across all service pages simultaneously

## Responsive Behavior
- **Mobile (<768px)**: Single column, stacked cards, hamburger menu
- **Tablet (768-1024px)**: 2-column grids
- **Desktop (>1024px)**: Full 3-column grids, maximum spacing

## Animations
- Minimal and purposeful
- Card hover: -translate-y-1 with shadow
- Menu transitions: 0.3s ease
- Price updates: 300ms fade
- No scroll-triggered animations

## Images
**Video-First Approach**: Hero section features embedded YouTube demonstration video instead of static images. Service cards use icon-based design. No hero images required - professional typography, layout, and WhatsApp brand recognition establish credibility.

## Accessibility
- WCAG AA contrast compliance
- Clear focus states on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Aria labels on mobile menu toggle