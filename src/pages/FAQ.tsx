import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Category = "all" | "general" | "registration" | "design" | "ordering" | "production" | "after-sales";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: Category;
}

const faqData: FAQItem[] = [
  // General
  {
    id: "1",
    question: "Do you accept individual or single-piece orders?",
    answer: "We focus exclusively on bulk and team orders to ensure professional quality, consistent branding, and competitive pricing. Individual replacement pieces can be arranged through your team's account or designated representative.",
    category: "general",
  },
  {
    id: "2",
    question: "What sports do you cover?",
    answer: "We currently provide uniforms and gear for soccer, basketball, track & field, baseball/softball, volleyball, cross-fit, and training programs, with additional sports available upon request.",
    category: "general",
  },
  {
    id: "3",
    question: "What makes TiDi Apparel different from other suppliers?",
    answer: "100% custom sublimated designs, end-to-end service, dedicated account managers, fast turnaround times, and a global manufacturing network focused on quality and cost efficiency.",
    category: "general",
  },
  // Registration
  {
    id: "4",
    question: "Do I need to register to place an order?",
    answer: "Yes. Because TiDi Apparel operates as a B2B supplier, all clients must register and be approved before accessing pricing, quoting, and ordering tools.",
    category: "registration",
  },
  {
    id: "5",
    question: "Who can register for an account?",
    answer: "Only authorized representatives of clubs, schools, academies, leagues, or sports organizations can register. You'll need to provide your organization's details, contact information, and basic documentation during registration.",
    category: "registration",
  },
  {
    id: "6",
    question: "What documents do I need to register?",
    answer: "Business or school name, website, tax ID or exemption certificate (if applicable), organization letterhead or verification, and logo files (AI, EPS, or PNG).",
    category: "registration",
  },
  {
    id: "7",
    question: "How long does approval take?",
    answer: "Most accounts are reviewed and approved within 1–2 business days after verification. You'll receive an email once your account is active.",
    category: "registration",
  },
  // Design
  {
    id: "8",
    question: "Can I use my own jersey style from your catalog?",
    answer: "Yes. You can select your preferred style directly from our catalog in addition to jersey and shorts style, then customize them with your team's specific colors, trims, and design patterns.",
    category: "design",
  },
  {
    id: "9",
    question: "Can I upload my own logos and colors?",
    answer: "Absolutely. You can upload your logos, Pantone/HEX colors, and design notes during the quote or proofing stage. Our designers will create mockups for your review and approval.",
    category: "design",
  },
  {
    id: "10",
    question: "What is a design proof?",
    answer: "A proof is your final digital mockup showing every design detail—colors, placements, logos, names, and numbers. Production begins only after you approve the proof to ensure accuracy.",
    category: "design",
  },
  {
    id: "11",
    question: "Are design services included?",
    answer: "Initial design concepts and revisions are free once your organization is registered and approved. Additional redesigns may incur small fees.",
    category: "design",
  },
  {
    id: "12",
    question: "Can I save designs for future orders?",
    answer: "Yes. Your organization's artwork and proof files are securely stored, allowing for quick reorders or seasonal updates with minimal setup time.",
    category: "design",
  },
  // Ordering
  {
    id: "13",
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Minimums vary by item type, but most team orders start at 15–18 uniforms per design.",
    category: "ordering",
  },
  {
    id: "14",
    question: "What payment methods do you accept?",
    answer: "We accept ACH transfers, wire payments, and major credit/debit cards. Approved organizations may be eligible for Net 15 or Net 30 terms.",
    category: "ordering",
  },
  {
    id: "15",
    question: "Can I request a quote online?",
    answer: "Yes. Registered users can build and submit quotes directly through the TiDi Apparel portal. A formal quote will be emailed for approval before production begins.",
    category: "ordering",
  },
  {
    id: "16",
    question: "Do you offer sample kits before I place an order?",
    answer: "We currently don't offer physical sample kits. However, every order includes detailed digital proofs, fabric descriptions, and color references to ensure your uniforms match your expectations. You can also review examples of our past work in the TiDi Apparel Gallery before finalizing your design.",
    category: "ordering",
  },
  // Production
  {
    id: "17",
    question: "How long does production take?",
    answer: "Most custom orders are completed within 3–4 weeks after final proof approval and payment. Rush options may be available.",
    category: "production",
  },
  {
    id: "18",
    question: "How do you ship orders?",
    answer: "Orders are shipped via trusted international logistics partners using air or sea freight depending on volume and delivery timelines. Tracking is provided through your portal.",
    category: "production",
  },
  {
    id: "19",
    question: "Can I split shipments to multiple addresses?",
    answer: "Yes. You can specify multiple delivery addresses during checkout or quote approval.",
    category: "production",
  },
  {
    id: "20",
    question: "How do I track my order?",
    answer: "You can view production, shipping, and delivery updates anytime in your organization dashboard under \"Orders & Shipments.\"",
    category: "production",
  },
  // After-Sales
  {
    id: "21",
    question: "What if there's a problem with my order?",
    answer: "Contact your account manager or support team within 48 hours of delivery. We'll review and resolve any discrepancies in design, sizing, or quantity.",
    category: "after-sales",
  },
  {
    id: "22",
    question: "Can I reorder the same design later?",
    answer: "Yes. Your approved design files remain on record, making reorders seamless—simply select the design from your account history.",
    category: "after-sales",
  },
  {
    id: "23",
    question: "Do you offer sponsorships or partnerships?",
    answer: "Yes! TiDi Apparel partners with clubs, schools, and influencers through our Groundbreakers Program and Sponsorship Placement Program. Email: partners@tidiapparel.com for details.",
    category: "after-sales",
  },
  {
    id: "24",
    question: "How do I contact support?",
    answer: "Email: support@tidiapparel.com | Use floating Chatbot | Or contact your assigned Account Manager directly through the portal.",
    category: "after-sales",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "registration", label: "Registration" },
  { id: "design", label: "Design" },
  { id: "ordering", label: "Ordering" },
  { id: "production", label: "Production" },
  { id: "after-sales", label: "After-Sales" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resultsCount = filteredFAQs.length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-foreground overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-white/60 text-sm tracking-wider">
              Home
              <span className="w-1 h-1 rounded-full bg-white/40" />
              Frequently Asked Questions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sans"
          >
            Frequently Asked
            <span className="block text-white/60">Questions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, ordering process, and more.
          </motion.p>
        </div>
      </section>

      {/* Help Center Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6">
              <span className="w-2 h-2 rounded-full bg-foreground" />
              <span className="text-sm font-medium tracking-widest uppercase text-foreground">
                Help Center
              </span>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search (e.g., MOQ, shipping)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-base rounded-xl border-2 border-border focus:border-foreground transition-colors bg-background"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-foreground/10"
                )}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground text-sm">
              {resultsCount} {resultsCount === 1 ? "result" : "results"} found
              {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div key={faq.id} variants={itemVariants}>
                    <AccordionItem
                      value={faq.id}
                      className="border border-border rounded-xl overflow-hidden bg-background hover:border-foreground/30 transition-colors"
                    >
                      <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                        <div className="flex items-start gap-4 w-full">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                            {index + 1}
                          </span>
                          <span className="text-base font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="pl-12 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                        <div className="pl-12 mt-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground capitalize">
                            {faq.category === "after-sales" ? "After-Sales" : faq.category}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  variant="outline"
                  className="rounded-full"
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
              Can't find what you need?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="mailto:info@tidiapparel.com"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors w-full sm:w-auto justify-center"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto justify-center"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
