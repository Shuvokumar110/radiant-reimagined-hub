import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";

export default function TermsOfService() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Legal
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Terms of.</span>
              <br />
              <span className="text-background/50">Service.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 mt-6">
              Last updated: January 2025
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <FadeInUp>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-8">
                By accessing and using TiDi Apparel's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-2xl font-bold mb-4">2. Products and Services</h2>
              <p className="text-muted-foreground mb-8">
                TiDi Apparel provides custom athletic apparel and footwear for teams and organizations. All products are made to order and pricing is provided through our quote request system. Final prices may vary based on customization requirements, quantities, and shipping destinations.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">3. Ordering Process</h2>
              <p className="text-muted-foreground mb-8">
                Orders are placed through our quote request system. After receiving your request, our team will provide detailed pricing and specifications. Orders are confirmed only after written acceptance of the quote and any required deposits.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-8">
                Payment terms will be specified in your quote. Generally, a deposit is required to begin production, with the balance due before shipping. We accept various payment methods as specified during the ordering process.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground mb-8">
                Shipping times vary based on product type, customization requirements, and destination. Estimated delivery times will be provided with your quote. TiDi Apparel is not responsible for delays caused by shipping carriers or customs processing.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <h2 className="text-2xl font-bold mb-4">6. Returns and Exchanges</h2>
              <p className="text-muted-foreground mb-8">
                Due to the custom nature of our products, returns are only accepted for manufacturing defects. Please inspect your order upon receipt and report any issues within 7 days. Size exchanges may be available depending on product availability.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                For questions regarding these terms, please contact us through our website's contact form or email us directly. We aim to respond to all inquiries within 24-48 business hours.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>
    </Layout>
  );
}
