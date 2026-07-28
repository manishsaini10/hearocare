import Hero from "@/components/Hero";
import Ingredients from "@/components/Ingredients";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Active Ingredients */}
      <Ingredients />

      {/* 3. Hearing Loss Science & Comparison */}
      <Comparison />

      {/* 4. Verified Client Reviews & Guarantee */}
      <Testimonials />

      {/* 5. Frequently Asked Questions Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-pink-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Learn more about how Hear O Care supports your hearing health and daily routine.
            </p>
          </div>

          <FAQAccordion />

          <div className="text-center pt-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-base hover:bg-slate-800 hover:scale-105 transition-all shadow-xl"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="w-5 h-5 text-pink-400" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
