import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
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
