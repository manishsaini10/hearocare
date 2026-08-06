"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Mail, ChevronRight, Sparkles } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";
import { useCMS } from "@/lib/cmsContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data } = useCMS();
  const siteConfig = data.siteConfig;

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-100 text-xs sm:text-sm py-2.5 px-6 border-b border-slate-800">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 font-semibold text-slate-200">
            <span className="text-base">🇮🇳</span>
            <span>India&apos;s #1 Trusted Hearing Supplement</span>
            <span className="hidden md:inline text-pink-400 font-bold">| 100% Guaranteed Formula</span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-pink-500" />
              <span className="hidden sm:inline">{siteConfig.contact.email}</span>
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition-colors hidden md:inline"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition-colors hidden md:inline"
            >
              X / Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Main Big Glass Navbar */}
      <div className="glass-navbar transition-all duration-300">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-12 h-24 sm:h-28 flex items-center justify-between">
          
          {/* Prominent Big Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-xl shadow-pink-600/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                Hear <span className="text-pink-600">O</span> Care
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-widest font-extrabold text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-500" />
                Hearing Loss Supplement
              </span>
            </div>
          </Link>

          {/* Desktop Big Nav Items */}
          <nav className="hidden xl:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-5 py-3 rounded-2xl text-base xl:text-lg font-extrabold transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-md shadow-pink-500/20 scale-105"
                      : "text-slate-800 hover:text-pink-600 hover:bg-pink-50/80 hover:scale-105"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-base shadow-xl shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-105 active:scale-95 transition-all group animate-pulse-glow"
            >
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Shop on Amazon</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-3 rounded-2xl text-slate-800 hover:text-pink-600 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-xl text-lg font-extrabold transition-colors ${
                  isActive
                    ? "text-white bg-pink-600 shadow-md"
                    : "text-slate-800 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-5 h-5 opacity-70" />
              </Link>
            );
          })}
          <div className="pt-3">
            <a
              href={siteConfig.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-lg shadow-xl hover:from-pink-700 hover:to-rose-700 transition-all text-center"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Buy Now on Amazon</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
