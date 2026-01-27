import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import tidiLogo from "@/assets/tidi-logo.webp";
import { MobileMenu } from "./MobileMenu";

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
  {
    name: "More",
    href: "#",
    children: [
      { name: "Affiliate Program", href: "/affiliate" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Pages with light backgrounds that need dark navigation
  const lightBackgroundPages = [
    '/shop/',
    '/cart',
    '/checkout',
    '/wishlist',
    '/account',
  ];
  
  const needsDarkNav = lightBackgroundPages.some(page => 
    location.pathname.startsWith(page) || location.pathname === page
  );

  // Use dark text when scrolled OR on light background pages
  const useDarkText = isScrolled || needsDarkNav;

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
          isScrolled || needsDarkNav
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
                      useDarkText
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
                      useDarkText
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
                useDarkText
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
                useDarkText
                  ? "text-foreground hover:text-muted-foreground"
                  : "text-white hover:text-white/70"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 transition-colors duration-300",
                useDarkText
                  ? "text-foreground"
                  : "text-white"
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Advanced Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
