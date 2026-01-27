import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";

export default function ShippingReturns() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Policies
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Shipping &.</span>
              <br />
              <span className="text-background/50">Returns.</span>
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <FadeInUp>
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <div className="bg-muted rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-3">Production Time</h3>
                <p className="text-muted-foreground mb-4">
                  Custom orders typically require 3-6 weeks for production, depending on the complexity and quantity. Rush orders may be available for an additional fee.
                </p>
                <h3 className="font-semibold mb-3">Shipping Methods</h3>
                <p className="text-muted-foreground">
                  We offer worldwide shipping through trusted carriers. Shipping times and costs will be provided with your quote based on destination and order size.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-2xl font-bold mb-4">International Orders</h2>
              <p className="text-muted-foreground mb-8">
                We ship to most countries worldwide. International customers are responsible for any customs duties, taxes, or import fees. Delivery times for international orders vary by destination, typically 7-21 business days after shipping.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-muted-foreground mb-8">
                Once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's progress through the carrier's website.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <h2 className="text-2xl font-bold mb-4">Returns Policy</h2>
              <div className="bg-muted rounded-xl p-6 mb-8">
                <p className="text-muted-foreground mb-4">
                  Due to the custom nature of our products, we cannot accept returns for change of mind. However, we stand behind our quality:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Manufacturing defects are covered for 30 days from delivery</li>
                  <li>Report any issues within 7 days of receiving your order</li>
                  <li>Photos of the defect are required for all claims</li>
                  <li>Approved claims will receive a replacement or refund</li>
                </ul>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <h2 className="text-2xl font-bold mb-4">Size Exchanges</h2>
              <p className="text-muted-foreground mb-8">
                Size exchanges may be possible depending on product availability. Please contact us within 14 days of delivery if you need a different size. Exchange shipping costs are the customer's responsibility.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <h2 className="text-2xl font-bold mb-4">Damaged in Transit</h2>
              <p className="text-muted-foreground mb-8">
                If your order arrives damaged, please photograph the damage (including packaging) and contact us within 48 hours of delivery. We'll work with the shipping carrier to resolve the issue promptly.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>
    </Layout>
  );
}
