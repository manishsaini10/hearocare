import Image from "next/image";
import { TESTIMONIALS, SITE_CONFIG } from "@/data/siteData";
import { Star, ShieldCheck, Quote, ShoppingBag, ThumbsUp } from "lucide-react";

export const metadata = {
  title: "Customer Reviews & Experiences",
  description: "Read real customer reviews and testimonials from users who experienced improved hearing clarity with Hear O Care.",
};

export default function CustomerReviewPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>Real User Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Customer <span className="gradient-text">Reviews & Testimonials</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium">
            Discover how Hear O Care has helped thousands across India support their hearing clarity and ear nerve health.
          </p>
        </div>

        {/* Rating Score Summary Box */}
        <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 border border-slate-800 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left dark-glass-card accent-glow">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-6xl font-black text-white">4.9</span>
              <span className="text-slate-400 font-bold text-2xl">/ 5.0</span>
            </div>
            <div className="flex text-amber-400 gap-1.5 justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-300 font-medium">Based on verified user feedback & Amazon purchase ratings</p>
          </div>

          <div className="h-16 w-px bg-slate-800 hidden md:block" />

          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-emerald-400 text-base font-extrabold">
              <ThumbsUp className="w-5 h-5" />
              <span>98% Positive Satisfaction Rate</span>
            </div>
            <a
              href={SITE_CONFIG.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-base shadow-xl transition-all hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Buy Authentic on Amazon</span>
            </a>
          </div>
        </div>

        {/* Detailed Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-10 space-y-8 flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 relative group"
            >
              <Quote className="w-12 h-12 text-pink-200 absolute top-8 right-8" />

              <div className="space-y-6">
                <div className="flex text-amber-400 gap-1.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-lg leading-relaxed italic font-medium">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-5 pt-6 border-t border-slate-200/80">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 shrink-0 bg-slate-100 shadow-md">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">{review.name}</h4>
                  <span className="text-sm text-pink-600 font-bold">{review.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
