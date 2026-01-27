import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <FadeInUp>
            <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-4 block">
              Get In Touch
            </span>
          </FadeInUp>
          <AnimatedText
            text="Request a Quote"
            className="text-display mb-6"
            delay={0.1}
          />
          <FadeInUp delay={0.3}>
            <p className="text-background/70 max-w-2xl mx-auto">
              Ready to outfit your team? Fill out the form below and our team
              will get back to you with custom pricing within 24 hours.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Team *</Label>
                    <Input
                      id="organization"
                      placeholder="Your team or organization name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="collegiate">Collegiate</SelectItem>
                        <SelectItem value="club-travel">Club & Travel</SelectItem>
                        <SelectItem value="leagues">Leagues & Academies</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Estimated Quantity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-25">10-25 units</SelectItem>
                        <SelectItem value="25-50">25-50 units</SelectItem>
                        <SelectItem value="50-100">50-100 units</SelectItem>
                        <SelectItem value="100+">100+ units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need it?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-months">1-2 months</SelectItem>
                        <SelectItem value="3-months">2-3 months</SelectItem>
                        <SelectItem value="planning">Just planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project requirements, customization needs, and any specific questions..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-8 bg-muted rounded-lg">
                <h3 className="font-serif text-xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:info@tidiapparel.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        info@tidiapparel.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Shipping</p>
                      <p className="text-muted-foreground">
                        USA & International Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-foreground text-background rounded-lg">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Quick Response
                </h3>
                <p className="text-background/70 mb-4">
                  We typically respond to all inquiries within 24 business hours.
                </p>
                <p className="text-sm text-background/60">
                  For urgent orders, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
