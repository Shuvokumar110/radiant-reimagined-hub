import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contactRegions = [
  {
    region: "US East Coast",
    phones: ["+1 336-655-1312", "+1 336-682-8661", "+1 917-362-4200"],
  },
  {
    region: "Caribbean",
    phones: ["+1 868-373-2800"],
  },
  {
    region: "Africa",
    phones: ["+1 407-607-1890"],
  },
];

const locations = [
  "Fort Lauderdale, Florida, US",
  "Winston-Salem, North Carolina, US",
  "Las Vegas, Nevada, US",
  "Toronto, Ontario, CA",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Get In Touch
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Contact.</span>
              <br />
              <span className="text-background/50">Let's Connect.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-background/70 max-w-xl mt-6"
          >
            Whether you're looking for answers, would like to solve a problem, or just want to let us know how we did, you'll find many ways to contact us right here.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Section Header */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="text-sm font-medium tracking-widest uppercase text-foreground">
                    Get In Touch
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-sans">
                  <span className="text-foreground">Send us a</span>
                  <span className="text-muted-foreground"> message</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required className="h-12 rounded-xl border-2" />
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
                      className="h-12 rounded-xl border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" className="h-12 rounded-xl border-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Team *</Label>
                    <Input
                      id="organization"
                      placeholder="Your team or organization name"
                      required
                      className="h-12 rounded-xl border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program Type *</Label>
                    <Select required>
                      <SelectTrigger className="h-12 rounded-xl border-2">
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
                      <SelectTrigger className="h-12 rounded-xl border-2">
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
                      <SelectTrigger className="h-12 rounded-xl border-2">
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
                    className="rounded-xl border-2"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-10 h-14"
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

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Our Address Card */}
              <div className="p-8 bg-muted rounded-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  <span className="text-xs font-medium tracking-widest uppercase text-foreground">
                    Our Address
                  </span>
                </div>
                
                <div className="space-y-6">
                  {contactRegions.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-foreground">{region.region}</h4>
                      {region.phones.map((phone, phoneIndex) => (
                        <a
                          key={phoneIndex}
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {phone}
                        </a>
                      ))}
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-border space-y-3">
                    <a
                      href="mailto:info@TidiApparel.com"
                      className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="font-medium">info@TidiApparel.com</span>
                    </a>
                    <a
                      href="tel:+13366551312"
                      className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-medium">(336) 655-1312</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Locations Card */}
              <div className="p-8 bg-foreground text-background rounded-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-xs font-medium tracking-widest uppercase text-white">
                    Locations
                  </span>
                </div>
                
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-white/60 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{location}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Card */}
              <div className="p-8 border-2 border-border rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Globe className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Quick Response</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  We typically respond to all inquiries within 24 business hours.
                </p>
                <p className="text-xs text-muted-foreground">
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
