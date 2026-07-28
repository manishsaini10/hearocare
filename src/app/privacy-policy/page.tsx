import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Hear O Care",
  description: "Read the official Privacy Policy for Hear O Care. Learn how we collect, protect, and handle your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>Legal Document</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Last Updated: July 28, 2026
          </p>
        </div>

        {/* Content Box */}
        <article className="glass-card rounded-3xl p-8 sm:p-16 max-w-5xl mx-auto space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">1. Introduction</h2>
            <p>
              Welcome to <strong>Hear O Care</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting personal data that you share with us when visiting our website or purchasing our products. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identification Data:</strong> Name, email address, phone number, shipping/billing address when you contact us or place an order.</li>
              <li><strong>Derivative & Device Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and pages viewed.</li>
              <li><strong>Third-Party Retailer Data:</strong> Orders processed via Amazon India are subject to Amazon&apos;s privacy policies regarding payment transaction security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">3. How We Use Your Information</h2>
            <p>Having accurate information about you allows us to provide a smooth, efficient, and customized experience. Specifically, we use information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to customer service inquiries and support requests.</li>
              <li>Improve site performance, user experience, and product offerings.</li>
              <li>Send periodic updates regarding product availability or health insights.</li>
              <li>Prevent fraudulent transactions and protect site security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">4. Cookies & Tracking Technologies</h2>
            <p>
              We may use cookies, web beacons, and tracking technologies to help customize the site and improve your experience. Most browsers are set to accept cookies by default, but you can choose to disable or remove cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">5. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we take reasonable steps to secure your data, please be aware that no security measures are infallible or impenetrable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="font-bold text-slate-900">Email: support@hearocare.com</p>
          </section>
        </article>

      </div>
    </div>
  );
}
