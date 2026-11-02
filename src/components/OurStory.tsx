import React from 'react';
import { bakeryImages } from '../assets/images';
import { Heart, Sparkles, Utensils, ShieldAlert, Award, Compass } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#EADBCC]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Artisan Details */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-4/3">
              <img
                src={bakeryImages.bakingStory}
                alt="Head baker carefully preparing fresh human-grade ingredients for dog birthday cake in Adelaide"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl shadow-sm text-xs">
                <span className="font-bold text-[#2C2723] block">Fresh Handcrafting in North Adelaide</span>
                <span className="text-stone-500 text-[11px]">Wild SA Kangaroo · Adelaide Hills Berries · Lactose-Free Icing</span>
              </div>
            </div>

            {/* Floating Accreditations */}
            <div className="mt-4 bg-white rounded-2xl p-4 border border-[#EDE5D8] shadow-xs flex items-center justify-around text-center">
              <div>
                <span className="text-xl font-black text-[#A2672E] font-display">100%</span>
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Human-Grade</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div>
                <span className="text-xl font-black text-[#2D5A43] font-display">SA</span>
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Local Produce</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div>
                <span className="text-xl font-black text-[#2C2723] font-display">0%</span>
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Artificial Dyes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E]">
              <Heart className="w-4 h-4 text-[#A2672E]" />
              <span>The Pupcake Adelaide Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C2723] tracking-tight leading-tight">
              Started by Obsessed Pet Parents, for Adelaide’s Most Loved Fur-Children.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                We’re a proud Adelaide DINK couple (Double Income, No Kids) wholly devoted to our apricot Cavoodle, Barnaby. When Barnaby turned one, we spent weeks searching high and low across South Australia for a birthday cake worthy of him.
              </p>
              <p>
                Everything on the market was either rock-hard commercial biscuits packed with mystery filler meats, or heavily sugary fondant concoctions full of toxic xylitol risks and artificial colorings that would instantly upset a doodle’s notoriously sensitive tummy.
              </p>
              <p>
                We asked ourselves: <em className="text-stone-900 font-semibold">“Why can’t our fur-baby have a genuinely gourmet, human-grade birthday feast that looks gorgeous on the party table and is extraordinarily healthy to digest?”</em>
              </p>
              <p>
                So, in consultation with local Adelaide veterinary nutritionists, we began baking. We tested slow-steamed South Australian wild kangaroo, free-range Adelaide Hills chicken, lactose-free Greek yoghurt icings colored only with cold-pressed beetroot and organic spirulina, and custom edible photo wafer prints.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-[#EDE5D8]">
                <h4 className="text-xs font-bold text-[#2C2723] flex items-center gap-2 mb-1">
                  <Utensils className="w-4 h-4 text-[#A2672E]" />
                  Human Taste-Tested
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  If we wouldn’t happily eat a spoonful ourselves, it never goes into your dog's cake. Pure, unadulterated food.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#EDE5D8]">
                <h4 className="text-xs font-bold text-[#2C2723] flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#2D5A43]" />
                  Doodle Digestive Safe
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Zero wheat gluten, zero lactose bloat, zero mystery fats. Tailored for Cavoodles, Groodles, and sensitive bellies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
