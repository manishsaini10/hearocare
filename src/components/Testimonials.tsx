import Image from "next/image";
import { TESTIMONIALS, SITE_CONFIG } from "@/data/siteData";
import { Star, Quote, ShieldCheck, ShoppingBag } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-pink-950/30 via-slate-950 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-500/20 text-pink-400 font-extrabold text-xs tracking-wider uppercase border border-pink-500/30">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>Verified Client Reviews</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Loved by <span className="gradient-text">Thousands Across India</span>
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl">
            Real feedback from users who experienced noticeable hearing clarity and tinnitus relief.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="dark-glass-card p-10 rounded-3xl space-y-8 flex flex-col justify-between hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-600/20 transition-all duration-300 relative group"
            >
              <Quote className="w-12 h-12 text-pink-500/30 absolute top-8 right-8" />

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex text-amber-400 gap-1.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-200 text-lg italic leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* User Meta */}
              <div className="flex items-center gap-5 pt-6 border-t border-slate-800/80">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 shrink-0 bg-slate-800 shadow-md">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-lg">{t.name}</h4>
                  <span className="text-sm text-pink-400 font-bold">{t.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guaranteed Results Banner */}
        <div className="bg-gradient-to-r from-pink-950/80 via-slate-900 to-rose-950/80 border border-pink-500/40 rounded-3xl p-10 sm:p-14 text-center space-y-8 shadow-2xl accent-glow">
          <h3 className="text-3xl sm:text-4xl font-black text-white">
            Guaranteed Quality & Customer Satisfaction
          </h3>
          <p className="text-pink-200 font-bold text-xl max-w-2xl mx-auto">
            For best results, use Hear O Care continuously for at least 6 weeks (around 60 days).
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-4 text-sm sm:text-base font-extrabold text-slate-200">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <span className="text-emerald-400 font-black text-lg">✔</span>
              <span>100% Guaranteed Results</span>
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <span className="text-emerald-400 font-black text-lg">✔</span>
              <span>Secure Payment Gateway</span>
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <span className="text-emerald-400 font-black text-lg">✔</span>
              <span>Thousands of Happy Users</span>
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <span className="text-emerald-400 font-black text-lg">✔</span>
              <span>Accepts All Cards</span>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={SITE_CONFIG.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-lg shadow-xl hover:scale-105 transition-all animate-pulse-glow"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Shop Now – Order on Amazon</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
