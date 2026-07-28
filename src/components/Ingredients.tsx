import { INGREDIENTS } from "@/data/siteData";
import { Sparkles, Activity } from "lucide-react";

export default function Ingredients() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs tracking-wider uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-600 animate-spin-slow" />
            <span>Synergistic Formulation</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            7 High-Potency <span className="gradient-text">Active Ingredients</span>
          </h2>

          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal">
            Each capsule of Hear O Care is packed with scientifically proven antioxidants, vitamins, and minerals essential for preserving ear nerve longevity.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {INGREDIENTS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.03] transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <span
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg text-base group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-sm"
                    style={{ color: item.color, backgroundColor: `${item.color}18` }}
                  >
                    Key Nutrient
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Activity className="w-4 h-4" style={{ color: item.color }} />
                <span>Auditory Cellular Support</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
