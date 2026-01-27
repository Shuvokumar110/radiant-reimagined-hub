import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import tidiLogo from "@/assets/tidi-logo.webp";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Custom Outfit", href: "/custom-team-outfit" },
  {
    name: "Programs",
    href: "#",
    children: [
      { name: "High School Programs", href: "/programs/high-school" },
      { name: "Collegiate Athletics", href: "/programs/collegiate" },
      { name: "Club & Travel Teams", href: "/programs/club-travel" },
      { name: "Leagues & Academies", href: "/programs/leagues-academies" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-elegant py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.img
              src={tidiLogo}
              alt="TiDi Apparel"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors duration-300",
                      isScrolled
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-white hover:text-white/70"
                    )}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group",
                      isScrolled
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-white hover:text-white/70",
                      location.pathname === link.href && "font-semibold"
                    )}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-luxury overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/wishlist"
              className={cn(
                "relative p-2 transition-colors duration-300",
                isScrolled
                  ? "text-foreground hover:text-muted-foreground"
                  : "text-white hover:text-white/70"
              )}
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className={cn(
                "relative p-2 transition-colors duration-300",
                isScrolled
                  ? "text-foreground hover:text-muted-foreground"
                  : "text-white hover:text-white/70"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors duration-300",
                isScrolled
                  ? "text-foreground"
                  : "text-white"
              )}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-center"
                >
                  {link.children ? (
                    <div className="space-y-4">
                      <span className="text-2xl font-serif font-semibold text-foreground">
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-3xl font-serif font-semibold text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-8"
              >
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cart</span>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
