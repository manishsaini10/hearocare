"use client";

import React, { use } from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cmsContext";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

export async function generateStaticParams() {
  return [
    { slug: "sample-page" },
    { slug: "hearing-health-guide" },
    { slug: "privacy-policy" },
    { slug: "terms-and-conditions" },
  ];
}

export default function CustomDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data } = useCMS();

  // Find matching page by slug or id
  const pageData =
    data.pages[slug] ||
    Object.values(data.pages).find(
      (p) => p.slug === `/pages/${slug}` || p.slug === `/${slug}` || p.id === slug
    );

  if (!pageData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 text-slate-900 px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-2xl">
          404
        </div>
        <h1 className="text-4xl font-black">Page Not Found</h1>
        <p className="text-slate-600 max-w-md">
          The requested page <code className="text-pink-600 font-mono bg-pink-50 px-2 py-1 rounded">/pages/{slug}</code> could not be found or has not been published yet.
        </p>
        <Link
          href="/"
          className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-base hover:bg-slate-800 transition-all shadow-lg"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          {pageData.badgeText && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>{pageData.badgeText}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            {pageData.headline || pageData.title}
          </h1>

          {pageData.subheadline && (
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-medium">
              {pageData.subheadline}
            </p>
          )}
        </div>

        {/* Article Body */}
        <article className="glass-card rounded-3xl p-8 sm:p-16 max-w-5xl mx-auto space-y-8 text-slate-800 leading-relaxed text-base sm:text-lg">
          {pageData.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-2xl font-black text-slate-900 pt-4">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-3xl font-black text-slate-900 pt-6">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={idx} className="text-slate-700 font-normal leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 rounded-3xl p-10 sm:p-14 text-center text-white space-y-6 shadow-2xl accent-glow max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black">Support Your Hearing Health Naturally</h2>
          <p className="text-pink-100 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Discover how Hear O Care works to protect ear hair cells and nerve health.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={data.siteConfig.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white text-pink-600 font-black text-base hover:bg-pink-50 transition-all shadow-xl flex items-center gap-3 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop on Amazon</span>
            </a>
            <Link
              href="/contact-us"
              className="px-8 py-4 rounded-2xl bg-pink-900/80 hover:bg-pink-900 text-white font-extrabold text-base transition-all border border-pink-400/40 flex items-center gap-3 hover:scale-105"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
