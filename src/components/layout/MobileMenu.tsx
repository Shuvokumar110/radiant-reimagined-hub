import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Search, 
  Home, 
  Info, 
  ShoppingBag, 
  Shirt, 
  GraduationCap, 
  Trophy, 
  Users, 
  Building2,
  Handshake,
  HelpCircle,
  Mail,
  Heart,
  User,
  Image,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import tidiLogo from "@/assets/tidi-logo.webp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// All pages organized by category
const menuSections = [
  {
    title: "Main",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "About Us", href: "/about", icon: Info },
      { name: "Shop", href: "/shop", icon: ShoppingBag },
      { name: "Gallery", href: "/gallery", icon: Image },
    ],
  },
  {
    title: "Custom Orders",
    items: [
      { name: "Custom Team Outfit", href: "/custom-team-outfit", icon: Shirt },
    ],
  },
  {
    title: "Programs",
    items: [
      { name: "High School Programs", href: "/programs/high-school", icon: GraduationCap },
      { name: "Collegiate Athletics", href: "/programs/collegiate", icon: Trophy },
      { name: "Club & Travel Teams", href: "/programs/club-travel", icon: Users },
      { name: "Leagues & Academies", href: "/programs/leagues-academies", icon: Building2 },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Affiliate Program", href: "/affiliate", icon: Handshake },
      { name: "FAQ", href: "/faq", icon: HelpCircle },
      { name: "Contact Us", href: "/contact", icon: Mail },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "My Account", href: "/account", icon: User },
      { name: "Wishlist", href: "/wishlist", icon: Heart },
      { name: "Cart", href: "/cart", icon: ShoppingBag },
    ],
  },
];

// Flatten all items for search
const allItems = menuSections.flatMap((section) => 
  section.items.map((item) => ({ ...item, section: section.title }))
);

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("Main");
  const location = useLocation();

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const sectionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.1 },
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-foreground"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--background)) 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Content Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative h-full flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-6 border-b border-background/10"
            >
              <Link to="/" onClick={onClose} className="flex items-center gap-3">
                <img
                  src={tidiLogo}
                  alt="TiDi Apparel"
                  className="h-10 w-auto invert"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-background hover:text-background/70 transition-colors rounded-full hover:bg-background/10"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="px-6 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-background/40" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background/10 border border-background/20 rounded-full text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-background/40 hover:text-background/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <AnimatePresence mode="wait">
                {filteredItems ? (
                  /* Search Results */
                  <motion.div
                    key="search-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-background/50 text-sm mb-4">
                      {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
                    </p>
                    {filteredItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                            isActive
                              ? "bg-background text-foreground"
                              : "bg-background/5 text-background hover:bg-background/10"
                          )}
                        >
                          <div className={cn(
                            "p-2 rounded-xl",
                            isActive ? "bg-foreground/10" : "bg-background/10 group-hover:bg-background/20"
                          )}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            <p className={cn(
                              "text-xs",
                              isActive ? "text-foreground/50" : "text-background/40"
                            )}>
                              {item.section}
                            </p>
                          </div>
                          <ArrowRight className={cn(
                            "h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                            isActive ? "text-foreground/50" : "text-background/50"
                          )} />
                        </Link>
                      );
                    })}
                  </motion.div>
                ) : (
                  /* Section Navigation */
                  <motion.div
                    key="sections"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {menuSections.map((section, sectionIndex) => (
                      <motion.div
                        key={section.title}
                        variants={itemVariants}
                        custom={sectionIndex}
                        className="overflow-hidden"
                      >
                        {/* Section Header */}
                        <button
                          onClick={() => setExpandedSection(
                            expandedSection === section.title ? null : section.title
                          )}
                          className="w-full flex items-center justify-between py-3 text-background/60 hover:text-background transition-colors group"
                        >
                          <span className="text-xs font-semibold uppercase tracking-widest">
                            {section.title}
                          </span>
                          <ChevronRight 
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              expandedSection === section.title && "rotate-90"
                            )} 
                          />
                        </button>

                        {/* Section Items */}
                        <AnimatePresence>
                          {expandedSection === section.title && (
                            <motion.div
                              variants={sectionVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 pb-2">
                                {section.items.map((item, itemIndex) => {
                                  const Icon = item.icon;
                                  const isActive = location.pathname === item.href;
                                  return (
                                    <motion.div
                                      key={item.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { delay: itemIndex * 0.05 }
                                      }}
                                    >
                                      <Link
                                        to={item.href}
                                        onClick={onClose}
                                        className={cn(
                                          "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                                          isActive
                                            ? "bg-background text-foreground"
                                            : "text-background hover:bg-background/10"
                                        )}
                                      >
                                        <div className={cn(
                                          "p-2 rounded-xl transition-colors",
                                          isActive 
                                            ? "bg-foreground/10" 
                                            : "bg-background/10 group-hover:bg-background/20"
                                        )}>
                                          <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium flex-1">{item.name}</span>
                                        {isActive && (
                                          <div className="w-2 h-2 rounded-full bg-foreground" />
                                        )}
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="p-6 border-t border-background/10"
            >
              <div className="flex items-center justify-between">
                <p className="text-background/40 text-sm">
                  © 2025 TiDi Apparel
                </p>
                <div className="flex items-center gap-4">
                  <Link 
                    to="/contact" 
                    onClick={onClose}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
