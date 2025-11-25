import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services", hasSubmenu: true },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  const serviceLinks = [
    { href: "/whatsapp-button", label: "WhatsApp Fix" },
    { href: "/menu-fix", label: "Menu Fix" },
    { href: "/form-fix", label: "Form Fix" },
    { href: "/visual-overhaul", label: "Visual Overhaul" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home-logo">
            <div className="text-2xl font-bold text-primary" data-testid="text-logo">OptiSolve</div>
            <div className="hidden sm:block text-sm text-muted-foreground" data-testid="text-logo-suffix">Labs</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link href={link.href}>
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    size="sm"
                    data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                    {link.hasSubmenu && <ChevronRight className="w-3 h-3 ml-1" />}
                  </Button>
                </Link>
                
                {/* Desktop Submenu */}
                {link.hasSubmenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10">
                    {serviceLinks.map((service) => (
                      <Link key={service.href} href={service.href}>
                        <Button
                          variant={isActive(service.href) ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start pl-6"
                          data-testid={`link-${service.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {service.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Theme Toggle and WhatsApp CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-whatsapp-cta"
            >
              <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </a>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover-elevate active-elevate-2"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle-mobile"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover-elevate active-elevate-2"
              aria-label="Toggle mobile menu"
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            {mainNavLinks.map((link) => (
              <div key={link.href}>
                {link.hasSubmenu ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      data-testid={`button-services-submenu`}
                    >
                      {link.label}
                      <ChevronRight className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-90' : ''}`} />
                    </Button>
                    {servicesOpen && (
                      <div className="pl-4 space-y-2 mt-2 border-l">
                        {serviceLinks.map((service) => (
                          <Link key={service.href} href={service.href}>
                            <Button
                              variant={isActive(service.href) ? "secondary" : "ghost"}
                              className="w-full justify-start"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setServicesOpen(false);
                              }}
                              data-testid={`link-mobile-${service.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {service.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={link.href}>
                    <Button
                      variant={isActive(link.href) ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4"
              data-testid="button-mobile-whatsapp-cta"
            >
              <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get Started on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
