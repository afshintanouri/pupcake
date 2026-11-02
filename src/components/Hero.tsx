import React from 'react';
import { bakeryImages } from '../assets/images';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Subtle organic background warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3E7D7]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8F0EA]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E]">
              <Sparkles className="w-4 h-4 text-[#C97B34]" />
              <span>Adelaide’s Premier Dog Birthday Patisserie</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500 font-medium">100% Human-Grade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C2723] tracking-tight leading-[1.1] font-display text-balance">
              Because Your Fur-Baby Deserves a Real Birthday Feast.
            </h1>

            <p className="text-lg text-[#5A5148] leading-relaxed max-w-2xl">
              Handcrafted in Adelaide for obsessed pet parents who treat their doodles like royalty. Baked fresh with ethical South Australian kangaroo, free-range chicken, low-lactose creams, organic berries, and your pup’s photo printed on edible dog-safe wafer.
            </p>

            {/* Quality Markers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Xylitol, Salt or Refined Sugars</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Edible Pup Photo Wafer Printing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Adelaide Metro Refrigerated Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sensitive Doodle Stomach Formulations</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onScrollTo('customizer')}
                className="px-8 py-4 bg-[#2D5A43] hover:bg-[#224634] text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-3 cursor-pointer group"
              >
                <span>Customize Your Pup’s Cake</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollTo('delivery-checker')}
                className="px-6 py-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-semibold rounded-2xl transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-[#A2672E]" />
                <span>Check Adelaide Metro Postcodes</span>
              </button>
            </div>

            {/* Community Proof */}
            <div className="pt-6 border-t border-[#EADBCC] flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-[#EAD8C3] border-2 border-white flex items-center justify-center text-xs font-bold text-amber-900">
                  🐕
                </div>
                <div className="w-9 h-9 rounded-full bg-[#D6E7DC] border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-900">
                  🐩
                </div>
                <div className="w-9 h-9 rounded-full bg-[#F3D7DC] border-2 border-white flex items-center justify-center text-xs font-bold text-rose-900">
                  🐾
                </div>
              </div>
              <p className="text-xs text-stone-600">
                <span className="font-bold text-[#2C2723]">1,400+ Adelaide birthday pups celebrated</span> across Norwood, Unley, Prospect, Glenelg, and beyond.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/3 lg:aspect-square">
              <img
                src={bakeryImages.heroDoodle}
                alt="Fluffy Doodle wearing birthday party hat next to custom dog birthday cake in Adelaide"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A2672E] block">
                      Birthday Hero
                    </span>
                    <p className="text-sm font-bold text-[#2C2723]">
                      Archie the Doodle · 1st Birthday
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-[#2D5A43] bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Adelaide Hills Berry Tier
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3.5 shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                🎂
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Made Fresh to Order</p>
                <p className="text-[10px] text-stone-500">Baked in Adelaide Daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
