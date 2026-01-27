import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";

export default function PrivacyPolicy() {
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
              <span className="text-background">Privacy.</span>
              <br />
              <span className="text-background/50">Policy.</span>
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
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-8">
                We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, shipping address, and organization details.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-8">
                We use the information we collect to process your orders, communicate with you about products and services, send you promotional materials (with your consent), and improve our website and customer experience.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-8">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to fulfill your order (e.g., shipping carriers) or as required by law.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-8">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="text-muted-foreground mb-8">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can choose to disable cookies through your browser settings.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-8">
                You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications at any time. Contact us to exercise these rights.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-8">
                If you have any questions about this Privacy Policy, please contact us through our website's contact form or email us directly.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>
    </Layout>
  );
}
