import { SITE_CONFIG } from "@/data/siteData";
import { Check, X, ShieldAlert, Ear, Brain, Zap, ShoppingBag } from "lucide-react";

export default function Comparison() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        
        {/* Section 1: Types of Hearing Loss */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
          
          <div className="lg:col-span-7 space-y-8 z-10">
            <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-400 font-extrabold text-xs uppercase tracking-wider border border-pink-500/30">
              Hearing Health Science
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Conductive vs. <span className="gradient-text">Sensorineural</span> Hearing Loss
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed font-normal">
              Anyone who has suffered partial or full loss of hearing knows the severe effect on daily life—making conversations difficult with family, children, and enjoying everyday television.
            </p>

            <div className="space-y-5 text-base text-slate-200">
              <div className="p-6 rounded-2xl dark-glass-card space-y-2">
                <h4 className="font-extrabold text-pink-400 text-xl">1. Conductive Hearing Loss</h4>
                <p className="text-slate-300">
                  Usually caused by physical problems such as an ear infection, fluid buildup, or unusual bone growth in the middle ear.
                </p>
              </div>

              <div className="p-6 rounded-2xl dark-glass-card space-y-2">
                <h4 className="font-extrabold text-emerald-400 text-xl">2. Sensorineural Hearing Loss</h4>
                <p className="text-slate-300">
                  Occurs from damaged nerves and microscopic hair cells in your inner ear (cochlea), caused by age, loud noises, or viral infections.
                </p>
              </div>
            </div>

            <div className="pt-2 bg-pink-950/80 border border-pink-500/40 p-5 rounded-2xl text-pink-200 font-extrabold text-base shadow-lg">
              THE HEARING SUPPLEMENT WORKS FOR PEOPLE WITH SENSORINEURAL HEARING LOSS AND TINNITUS.
            </div>
          </div>

          {/* Right Action Banner */}
          <div className="lg:col-span-5 relative flex justify-center z-10">
            <div className="dark-glass-card p-10 rounded-3xl space-y-8 text-center max-w-md w-full shadow-2xl accent-glow">
              <div className="w-20 h-20 rounded-3xl bg-pink-600/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mx-auto shadow-inner">
                <Ear className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-white">Restore Sound Function</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Start your 6-week natural hearing restoration regimen today with authentic Hear O Care on Amazon.
                </p>
              </div>
              <a
                href={SITE_CONFIG.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all animate-pulse-glow"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Buy Now on Amazon</span>
              </a>
            </div>
          </div>

        </div>

        {/* Section 2: How Hear O Care Works (3 Pillars) */}
        <div className="space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
              How Hear O Care <span className="text-pink-600">Restores Sound Processing</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Unlike quick fixes that only amplify noise, Hear O Care targets the internal cellular mechanics of sound processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-3xl p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shadow-md">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">1. Stops Harmful Molecules</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                When hair cells malfunction, free radicals damage nearby nerves. The Hearing Supplement supplies antioxidants that prevent free radical damage, resulting in healthy ear cells and nerves.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold shadow-md">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">2. Assists Auditory Cortex</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Contains combination of natural ingredients which help to improve micro-blood flow to the brain, making sound signals easy to process for both hearing and speech understanding.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shadow-md">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">3. Essential Enzymes</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Contains L-Glutathione and Alpha Lipoic Acid to prevent damage to the cochlea and decrease chances of suffering severe hearing loss over time.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Comparison Table vs Traditional Hearing Aids */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 space-y-12 shadow-2xl">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black">
              Hear O Care vs. <span className="gradient-text">Traditional Hearing Aids</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Comparing natural cell restoration with sound volume amplification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Hearing Aids */}
            <div className="dark-glass-card p-8 sm:p-10 rounded-3xl space-y-6 border-red-500/30">
              <div className="flex items-center gap-4 text-red-400 font-extrabold text-2xl">
                <div className="w-10 h-10 rounded-full bg-red-950 border border-red-800 flex items-center justify-center shrink-0">
                  <X className="w-6 h-6" />
                </div>
                <span>Traditional Hearing Aid</span>
              </div>
              <ul className="space-y-4 text-base text-slate-300 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>Only amplifies sound volume without addressing cellular damage.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>Can cause acoustic distortion or background noise discomfort.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>Expensive hardware requiring battery changes and maintenance.</span>
                </li>
              </ul>
            </div>

            {/* Hear O Care */}
            <div className="bg-gradient-to-b from-slate-900 to-pink-950/50 p-8 sm:p-10 rounded-3xl border-2 border-pink-500/50 space-y-6 shadow-2xl accent-glow">
              <div className="flex items-center gap-4 text-pink-400 font-extrabold text-2xl">
                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <Check className="w-6 h-6" />
                </div>
                <span>Hear O Care Natural Supplement</span>
              </div>
              <ul className="space-y-4 text-base text-slate-100 font-semibold">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">✓</span>
                  <span>Restores natural functions that process sound in the inner ear.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">✓</span>
                  <span>Improves speech understanding and word discrimination naturally.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">✓</span>
                  <span>Convenient daily capsule with zero side effects reported.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
