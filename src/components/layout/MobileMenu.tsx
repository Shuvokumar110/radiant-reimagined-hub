import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowUpRight, Search, Heart, ShoppingBag, User } from "lucide-react";
import tidiLogo from "@/assets/tidi-logo.webp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Custom Outfit", href: "/custom-team-outfit" },
  { name: "Gallery", href: "/gallery" },
  { name: "Videos", href: "/videos" },
  { name: "About", href: "/about" },
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
  const navigate = useNavigate();
  const [showPrograms, setShowPrograms] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isActive = (href: string) => location.pathname === href;

  // Reset search when menu closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const menuVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 + i * 0.03 },
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
            className="fixed inset-0 z-[100] bg-foreground/30 backdrop-blur-md"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-[320px] bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
              <Link to="/" onClick={onClose}>
                <img src={tidiLogo} alt="TiDi" className="h-8" />
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3 border-b border-border/50">
              <form onSubmit={handleSearch}>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all ${
                    isSearchFocused
                      ? "bg-background ring-2 ring-foreground"
                      : "bg-muted"
                  }`}
                >
                  <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Quick Access Icons */}
            <div className="px-4 py-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                {[
                  { icon: Heart, label: "Wishlist", href: "/wishlist" },
                  { icon: ShoppingBag, label: "Cart", href: "/cart" },
                  { icon: User, label: "Account", href: "/account" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={onClose}
                    className={`flex flex-col items-center gap-1.5 py-2 px-6 rounded-xl transition-all ${
                      isActive(item.href)
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="py-3">
                {/* Primary Links */}
                <div className="px-3">
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
                        className={`flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-medium transition-all ${
                          isActive(item.href)
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.name}
                        {isActive(item.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-background" />
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
                      className={`flex items-center justify-between w-full py-3 px-4 rounded-xl text-[15px] font-medium transition-all ${
                        showPrograms
                          ? "bg-muted text-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Programs
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="py-1 space-y-0.5">
                            {programItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={`flex items-center py-2.5 px-8 text-sm transition-all ${
                                  isActive(item.href)
                                    ? "text-foreground font-medium bg-muted/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                }`}
                              >
                                <span className="w-1 h-1 rounded-full bg-current mr-3 opacity-50" />
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
                <div className="my-3 mx-4 h-px bg-border/50" />

                {/* Quick Links */}
                <motion.div
                  custom={menuItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="px-3"
                >
                  <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Quick Links
                  </p>
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      {item.name}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </motion.div>
              </nav>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-foreground rounded-xl text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
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
