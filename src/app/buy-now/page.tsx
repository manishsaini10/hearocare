import Image from "next/image";
import { SITE_CONFIG, INGREDIENTS } from "@/data/siteData";
import { ShoppingBag, FileText, CheckCircle2, ShieldCheck, Star, Truck, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Buy Hear O Care Hearing Supplement | Official Store",
  description: "Order authentic Hear O Care hearing loss supplement on Amazon India. 100% original formula for sensorineural hearing loss & tinnitus.",
};

export default function BuyNowPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-card rounded-3xl p-10 sm:p-16 shadow-2xl">
          
          {/* Left Product Image Gallery */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative w-full h-96 sm:h-[450px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 p-8 flex items-center justify-center shadow-2xl">
              <Image
                src={SITE_CONFIG.ogImage}
                alt="Hear O Care Supplement Bottle"
                fill
                className="object-contain p-6 animate-float"
                priority
              />
              <div className="absolute top-6 left-6 bg-pink-600 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Official Listing
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-800">
              <div className="p-4 bg-white/80 border border-slate-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span>Original Formula</span>
              </div>
              <div className="p-4 bg-white/80 border border-slate-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-sm">
                <Truck className="w-6 h-6 text-sky-600" />
                <span>Fast India Shipping</span>
              </div>
              <div className="p-4 bg-white/80 border border-slate-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-sm">
                <RefreshCw className="w-6 h-6 text-amber-600" />
                <span>6+ Weeks Regimen</span>
              </div>
            </div>
          </div>

          {/* Right Buying Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-pink-600 font-extrabold text-xs uppercase tracking-wider">
                Sensorineural Hearing & Tinnitus Formula
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Hear O Care Capsules
              </h1>
              <div className="flex items-center gap-3 text-amber-400 text-base font-extrabold pt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-900 font-extrabold">4.9 / 5.0</span>
                <span className="text-slate-500 text-sm font-semibold">(Verified Amazon Customer Reviews)</span>
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              Formulated with 7 high-potency active antioxidants (Vitamin D3, Methylcobalamin, Magnesium, L-Glutathione, Alpha Lipoic Acid, Acetyl-L-Carnitine, Quercetin) designed to protect cochlear hair cells and improve auditory nerve clarity.
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-200/80 text-base font-extrabold text-slate-800">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>100% Guaranteed Quality Formulation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Secure payment processing via Amazon India</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Zero reported side effects</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-4">
              <a
                href={SITE_CONFIG.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3.5 px-9 py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-xl shadow-xl shadow-pink-600/30 hover:scale-105 transition-all animate-pulse-glow"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Order Now on Amazon India</span>
              </a>

              <a
                href={SITE_CONFIG.cataloguePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-base transition-colors"
              >
                <FileText className="w-5 h-5 text-pink-600" />
                <span>Download PDF Product Catalogue</span>
              </a>
            </div>

          </div>

        </div>

        {/* Ingredients Quick List */}
        <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 space-y-10 shadow-2xl border border-slate-800 dark-glass-card">
          <h3 className="text-3xl font-black text-center">Contains 7 Active Natural Nutrients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm font-semibold">
            {INGREDIENTS.map((ing, idx) => (
              <div key={idx} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-extrabold text-pink-400 block text-lg">{ing.name}</span>
                <p className="text-slate-400 text-xs leading-relaxed">{ing.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
