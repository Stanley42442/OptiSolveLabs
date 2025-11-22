import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left" data-testid="text-copyright">
            © {new Date().getFullYear()} OptiSolve Labs. All rights reserved.
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-whatsapp hover:text-whatsapp-dark transition-colors"
            data-testid="link-footer-whatsapp"
          >
            <MessageCircle className="w-4 h-4" data-testid="icon-footer-whatsapp" />
            <span className="font-medium" data-testid="text-footer-whatsapp">Contact us on WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
