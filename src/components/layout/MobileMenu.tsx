import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowUpRight } from "lucide-react";
import tidiLogo from "@/assets/tidi-logo.webp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Custom Outfit", href: "/custom-team-outfit" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
];

const programItems = [
  { name: "High School", href: "/programs/high-school" },
  { name: "Collegiate", href: "/programs/collegiate" },
  { name: "Club & Travel", href: "/programs/club-travel" },
  { name: "Leagues & Academies", href: "/programs/leagues-academies" },
];

const quickLinks = [
  { name: "Affiliate Program", href: "/affiliate" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const [showPrograms, setShowPrograms] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  const menuVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-foreground/20 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Link to="/" onClick={onClose}>
                <img src={tidiLogo} alt="TiDi" className="h-9" />
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-5">
                {/* Primary Links */}
                <div className="space-y-1">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between py-4 px-4 rounded-xl text-lg font-medium transition-all ${
                          isActive(item.href)
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.name}
                        {isActive(item.href) && (
                          <span className="w-2 h-2 rounded-full bg-background" />
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Programs Accordion */}
                  <motion.div
                    custom={menuItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <button
                      onClick={() => setShowPrograms(!showPrograms)}
                      className="flex items-center justify-between w-full py-4 px-4 rounded-xl text-lg font-medium text-foreground hover:bg-muted transition-all"
                    >
                      Programs
                      <ChevronRight
                        className={`h-5 w-5 transition-transform ${
                          showPrograms ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {showPrograms && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {programItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={`flex items-center py-3 px-4 rounded-lg text-base transition-all ${
                                  isActive(item.href)
                                    ? "bg-muted text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Quick Links */}
                <motion.div
                  custom={menuItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="space-y-1"
                >
                  <p className="px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Quick Links
                  </p>
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 px-4 rounded-lg text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      {item.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
                </motion.div>
              </nav>
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-border bg-muted/30">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3.5 bg-background border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3.5 bg-foreground rounded-xl text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                >
                  Cart
                </Link>
              </div>
              <Link
                to="/contact"
                onClick={onClose}
                className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 border border-foreground rounded-xl text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
