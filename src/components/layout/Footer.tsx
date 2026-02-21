import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import tidiLogo from "@/assets/tidi-logo.webp";

const footerLinks = {
  programs: [
    { name: "High School Programs", href: "/programs/high-school" },
    { name: "Collegiate Athletics", href: "/programs/collegiate" },
    { name: "Club & Travel Teams", href: "/programs/club-travel" },
    { name: "Leagues & Academies", href: "/programs/leagues-academies" },
  ],
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Soccer Boots", href: "/shop?category=Soccer+Boots" },
    { name: "Jerseys", href: "/shop?category=Jerseys" },
    { name: "Team Uniforms", href: "/shop?category=Team+Uniforms" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Gallery", href: "/gallery" },
    { name: "Affiliate Program", href: "/affiliate" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping-returns" },
    { name: "My Account", href: "/account" },
    { name: "Wishlist", href: "/wishlist" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
];

import React from "react";

export const Footer = React.forwardRef<HTMLElement, {}>((_, ref) => {
  return (
    <footer ref={ref} className="bg-foreground text-background relative overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-5" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img
                src={tidiLogo}
                alt="TiDi Apparel"
                className="h-16 w-auto mb-6 invert"
              />
            </Link>
            <p className="text-background/70 max-w-sm mb-6 leading-relaxed">
              Built for Champions. Premium athletic apparel and footwear for teams who demand excellence on and off the field.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="max-w-xl">
            <h4 className="font-serif font-semibold text-2xl mb-2">Stay Updated</h4>
            <p className="text-background/70 mb-6">
              Subscribe to receive exclusive offers and the latest updates from TiDi Apparel.
            </p>
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-background/40"
              />
              <Button
                type="submit"
                className="bg-background text-foreground hover:bg-background/90 px-8"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="flex flex-wrap gap-8 text-sm text-background/70">
            <a href="mailto:info@tidiapparel.com" className="flex items-center gap-2 hover:text-background transition-colors">
              <Mail className="h-4 w-4" />
              info@tidiapparel.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-background transition-colors">
              <Phone className="h-4 w-4" />
              (123) 456-7890
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              USA & International Shipping
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} TiDi Apparel. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Floating Text Widget */}
      <motion.a
        href="sms:+1234567890"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-background text-foreground rounded-full flex items-center justify-center shadow-luxury"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </footer>
  );
});
Footer.displayName = "Footer";
