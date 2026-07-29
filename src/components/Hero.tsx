"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { SITE_CONFIG } from "@/data/siteData";
import { ShoppingBag, FileText, CheckCircle2, Star, ShieldCheck, Sparkles } from "lucide-react";

const Product3D = dynamic(() => import("@/components/Product3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-14 pb-24 lg:pt-24 lg:pb-32">
      {/* Background Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-pink-600/25 via-rose-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-pink-300 text-sm font-bold shadow-xl">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>🇮🇳 India&apos;s #1 Trusted Hearing Loss Supplement</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Restore Natural <span className="gradient-text">Hearing Clarity</span> & Nerve Health
            </h1>

            {/* Sub-description */}
            <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto lg:mx-0 font-normal">
              Hear O Care supplies your body with 7 essential antioxidants and neuro-nutrients to protect inner ear hair cells, combat sensorineural hearing loss, and improve daily speech comprehension.
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl mx-auto lg:mx-0 text-base font-semibold text-slate-200">
              <div className="flex items-center gap-3 dark-glass-card p-4 rounded-2xl hover:border-pink-500/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                <span>Works for Sensorineural Loss & Tinnitus</span>
              </div>
              <div className="flex items-center gap-3 dark-glass-card p-4 rounded-2xl hover:border-emerald-500/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>100% Guaranteed Results in 6+ Weeks</span>
              </div>
              <div className="flex items-center gap-3 dark-glass-card p-4 rounded-2xl hover:border-sky-500/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" />
                <span>7 High-Potency Active Antioxidants</span>
              </div>
              <div className="flex items-center gap-3 dark-glass-card p-4 rounded-2xl hover:border-amber-500/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                <span>Zero Reported Side Effects</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <a
                href={SITE_CONFIG.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-9 py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-lg shadow-2xl shadow-pink-600/40 hover:shadow-pink-600/60 hover:scale-105 active:scale-95 transition-all group animate-pulse-glow"
              >
                <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Shop Now on Amazon</span>
              </a>

              <a
                href={SITE_CONFIG.cataloguePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-lg transition-all hover:scale-105"
              >
                <FileText className="w-6 h-6 text-pink-400" />
                <span>Download PDF Catalogue</span>
              </a>
            </div>

            {/* Rating Stat Footer */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-slate-400 font-medium">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-white text-base">4.9 / 5.0</span>
              <span>• Thousands of Satisfied Customers Across India</span>
            </div>

          </div>

          {/* Right Product Showcase Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glassmorphic Card Container */}
            <div className="relative w-full max-w-lg dark-glass-card p-8 sm:p-10 rounded-3xl space-y-6 accent-glow">
              
              {/* Product Badge */}
              <div className="flex justify-between items-center">
                <span className="px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-black uppercase tracking-wider">
                  Original Formula
                </span>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Verified</span>
                </div>
              </div>

              {/* 3D Product Viewer */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800/90 shadow-inner">
                <Product3D />
              </div>

              {/* Bottom Card Footer */}
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h4 className="text-white font-extrabold text-base">Hear O Care Capsules</h4>
                  <p className="text-xs text-slate-400 font-medium">Sensorineural & Tinnitus Care</p>
                </div>
                <a
                  href={SITE_CONFIG.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                >
                  Buy Now
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
