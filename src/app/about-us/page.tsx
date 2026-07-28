import { SITE_CONFIG } from "@/data/siteData";
import { ShieldCheck, Award, HeartHandshake, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about Hear O Care's mission to support hearing health and combat sensorineural hearing loss with high-potency antioxidants.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Our Mission & Vision</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            About <span className="gradient-text">Hear O Care</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            Dedicated to bringing science-backed, natural nutritional solutions to individuals experiencing sensorineural hearing loss and tinnitus across India.
          </p>
        </div>

        {/* Core Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-950 text-white p-10 sm:p-16 rounded-3xl shadow-2xl border border-slate-800">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Why We Formulated Hear O Care</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Partial or progressive hearing loss affects millions of adults, impacting their ability to participate in conversations with loved ones, hear the television clearly, and enjoy natural sounds.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              While traditional hearing aids amplify sound, they do not replenish the diminishing enzymes and nerve nutrients required by your inner ear hair cells. We formulated Hear O Care to fill this critical gap using a blend of 7 powerful antioxidants and essential vitamins.
            </p>
            <div className="pt-2 flex items-center gap-4 text-base font-extrabold text-pink-400">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>Pharmaceutical Grade Ingredients • Quality Tested Formula</span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div className="dark-glass-card p-8 rounded-3xl space-y-3 text-center">
              <span className="text-4xl sm:text-5xl font-black text-pink-500 block">100%</span>
              <p className="text-xs text-slate-300 font-extrabold uppercase tracking-wider">Natural Ingredients</p>
            </div>
            <div className="dark-glass-card p-8 rounded-3xl space-y-3 text-center">
              <span className="text-4xl sm:text-5xl font-black text-sky-400 block">6+ Wks</span>
              <p className="text-xs text-slate-300 font-extrabold uppercase tracking-wider">Recommended Regimen</p>
            </div>
            <div className="dark-glass-card p-8 rounded-3xl space-y-3 text-center">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 block">4.9/5</span>
              <p className="text-xs text-slate-300 font-extrabold uppercase tracking-wider">Customer Rating</p>
            </div>
            <div className="dark-glass-card p-8 rounded-3xl space-y-3 text-center">
              <span className="text-4xl sm:text-5xl font-black text-emerald-400 block">0</span>
              <p className="text-xs text-slate-300 font-extrabold uppercase tracking-wider">Side Effects Reported</p>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Quality */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl font-black text-slate-900">Our Core Principles</h2>
            <p className="text-slate-600 text-base">Built on research, safety, and customer trust.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-3xl space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Research Backed</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Every ingredient in Hear O Care (Vitamin D3, Methylcobalamin, L-Glutathione, Alpha Lipoic Acid) is chosen based on clinical understanding of cochlear oxidative stress and neural signaling.
              </p>
            </div>

            <div className="glass-card p-10 rounded-3xl space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Uncompromising Safety</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                We maintain strict quality control standards. Free from artificial fillers or harmful synthetic additives, ensuring safe long-term daily use.
              </p>
            </div>

            <div className="glass-card p-10 rounded-3xl space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-md">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Customer Dedication</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                We are committed to helping you hear life&apos;s moments clearly. Our support team is always available to guide your wellness journey.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 rounded-3xl p-10 sm:p-16 text-center text-white space-y-8 shadow-2xl accent-glow">
          <h2 className="text-3xl sm:text-5xl font-black">Ready to Support Your Hearing Health?</h2>
          <p className="text-pink-100 max-w-2xl mx-auto text-lg sm:text-xl font-medium">
            Order authentic Hear O Care directly on Amazon with secure payment options and nationwide delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <a
              href={SITE_CONFIG.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl bg-white text-pink-600 font-black text-lg hover:bg-pink-50 transition-all shadow-xl flex items-center gap-3 hover:scale-105"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Shop Now on Amazon</span>
            </a>
            <Link
              href="/contact-us"
              className="px-8 py-5 rounded-2xl bg-pink-900/80 hover:bg-pink-900 text-white font-extrabold text-lg transition-all border border-pink-400/40 flex items-center gap-3 hover:scale-105"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
