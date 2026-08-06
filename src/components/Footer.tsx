"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/data/siteData";
import { useCMS } from "@/lib/cmsContext";
import { ShieldCheck, FileText, ShoppingBag, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { data } = useCMS();
  const siteConfig = data.siteConfig;
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-20 pb-14 relative">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                H
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Hear <span className="text-pink-500">O</span> Care
              </span>
            </div>
            <p className="text-base text-slate-400 leading-relaxed font-medium">
              India&apos;s trusted natural hearing supplement formulation designed to support inner ear hair cells, auditory nerve health, and speech clarity.
            </p>
            <div className="pt-1 flex items-center gap-3 text-sm font-extrabold text-pink-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100% Quality & Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black tracking-wider uppercase text-sm">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-base font-semibold">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="hover:text-pink-400 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-pink-500 font-bold">&rsaquo;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.cataloguePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 transition-colors flex items-center gap-2 text-pink-400 font-extrabold"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Catalogue (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Buy & Order Info */}
          <div className="space-y-6">
            <h4 className="text-white font-black tracking-wider uppercase text-sm">
              Order Online
            </h4>
            <p className="text-base text-slate-400 leading-relaxed font-medium">
              Buy authentic Hear O Care directly via our official store page on Amazon India with fast delivery across India.
            </p>
            <a
              href={siteConfig.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-base shadow-xl hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Buy Now on Amazon</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-white font-black tracking-wider uppercase text-sm">
              Customer Support
            </h4>
            <div className="text-base space-y-3 text-slate-400 font-medium">
              <p><strong className="text-slate-200">Email:</strong> {siteConfig.contact.email}</p>
              <p><strong className="text-slate-200">Location:</strong> {siteConfig.contact.address}</p>
              <p><strong className="text-slate-200">Hours:</strong> {siteConfig.contact.workingHours}</p>
            </div>
            <div className="pt-2 flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 hover:scale-110 transition-all text-xs font-bold"
              >
                FB
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 hover:scale-110 transition-all text-xs font-bold"
              >
                X
              </a>
            </div>
          </div>

        </div>


        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Hear O Care. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-pink-400 transition-colors">Terms and Conditions</Link>
            <Link href="/faq" className="hover:text-pink-400 transition-colors">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
