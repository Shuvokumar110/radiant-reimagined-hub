import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import tidiLogo from "@/assets/tidi-logo.webp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Custom Outfit", href: "/custom-team-outfit" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
];

const programLinks = [
  { name: "High School", href: "/programs/high-school" },
  { name: "Collegiate", href: "/programs/collegiate" },
  { name: "Club & Travel", href: "/programs/club-travel" },
  { name: "Leagues", href: "/programs/leagues-academies" },
];

const supportLinks = [
  { name: "Affiliate", href: "/affiliate" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link to="/" onClick={onClose}>
              <img src={tidiLogo} alt="TiDi Apparel" className="h-10 w-auto" />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-180px)]"
          >
            {/* Main Links */}
            <div className="space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    "block py-3 text-lg font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Programs */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Programs
              </p>
              <div className="space-y-1">
                {programLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    className={cn(
                      "block py-2 text-base transition-colors",
                      location.pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Support
              </p>
              <div className="space-y-1">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    className={cn(
                      "block py-2 text-base transition-colors",
                      location.pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-background">
            <div className="flex gap-4">
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
