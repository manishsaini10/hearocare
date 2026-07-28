import FAQAccordion from "@/components/FAQAccordion";
import { SITE_CONFIG } from "@/data/siteData";
import { HelpCircle, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Find answers to questions about Hear O Care ingredients, usage duration, safety, sensorineural hearing loss, and buying options.",
};

export default function FAQPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-pink-600" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium">
            Everything you need to know about Hear O Care supplement, usage instructions, and orders.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="max-w-5xl mx-auto">
          <FAQAccordion />
        </div>

        {/* Bottom Order CTA */}
        <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 text-center space-y-8 max-w-4xl mx-auto shadow-2xl border border-slate-800 dark-glass-card accent-glow">
          <h3 className="text-3xl sm:text-4xl font-black">Still Have Questions or Ready to Order?</h3>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Order authentic Hear O Care directly via our official Amazon India listing.
          </p>
          <a
            href={SITE_CONFIG.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-lg shadow-xl hover:scale-105 transition-all animate-pulse-glow"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>Shop Now on Amazon</span>
          </a>
        </div>

      </div>
    </div>
  );
}
