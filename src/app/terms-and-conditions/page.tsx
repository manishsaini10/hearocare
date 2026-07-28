import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Hear O Care",
  description: "Read the official Terms and Conditions governing the use of Hear O Care website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4 text-pink-600" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Last Updated: July 28, 2026
          </p>
        </div>

        {/* Content Box */}
        <article className="glass-card rounded-3xl p-8 sm:p-16 max-w-5xl mx-auto space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you and <strong>Hear O Care</strong> concerning your access to and use of our website and products. By accessing the site, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the website is our proprietary property and all source code, databases, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the &quot;Content&quot;) and trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">3. Health & Medical Disclaimer</h2>
            <p>
              Information on this website is provided for educational and awareness purposes regarding hearing health. The products and claims made on this site have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease. Results may vary from person to person. Always consult a qualified healthcare professional regarding medical conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">4. Purchases & Payment</h2>
            <p>
              Products offered for purchase on third-party channels (such as Amazon India) are governed by the merchant&apos;s checkout terms, pricing, and return policies. We reserve the right to modify product specifications or discontinue items without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">5. Limitation of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the site or products.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of India. Hear O Care and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">7. Contact Information</h2>
            <p>
              In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:
            </p>
            <p className="font-bold text-slate-900">Email: support@hearocare.com</p>
          </section>
        </article>

      </div>
    </div>
  );
}
