import React, { useState } from 'react';
import { bakeryImages } from '../assets/images';
import { TESTIMONIALS } from '../data/bakeryData';
import { Star, Heart, Camera, CheckCircle2 } from 'lucide-react';

export const HallOfPaws: React.FC = () => {
  const [selectedBreedFilter, setSelectedBreedFilter] = useState<'all' | 'cavoodle' | 'groodle' | 'labradoodle'>('all');

  const filteredTestimonials = TESTIMONIALS.filter((t) => {
    if (selectedBreedFilter === 'all') return true;
    if (selectedBreedFilter === 'cavoodle') return t.breed.toLowerCase().includes('cavoodle');
    if (selectedBreedFilter === 'groodle') return t.breed.toLowerCase().includes('groodle');
    if (selectedBreedFilter === 'labradoodle') return t.breed.toLowerCase().includes('labradoodle');
    return true;
  });

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#EADBCC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E] mb-2">
            <Heart className="w-4 h-4 text-[#A2672E]" />
            <span>Adelaide Pet Parent Love</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2723] tracking-tight">
            The Hall of Paws
          </h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base">
            See how Adelaide’s most pampered fur-babies celebrated their big day with our bespoke cakes.
          </p>

          {/* Interactive Filter Tabs (Buttons with click handlers per design constitution) */}
          <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-[#EDE5D8] rounded-2xl w-fit mx-auto">
            <button
              type="button"
              onClick={() => setSelectedBreedFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedBreedFilter === 'all'
                  ? 'bg-white text-[#2C2723] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Adelaide Pups
            </button>
            <button
              type="button"
              onClick={() => setSelectedBreedFilter('cavoodle')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedBreedFilter === 'cavoodle'
                  ? 'bg-white text-[#2C2723] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cavoodles
            </button>
            <button
              type="button"
              onClick={() => setSelectedBreedFilter('groodle')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedBreedFilter === 'groodle'
                  ? 'bg-white text-[#2C2723] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Groodles
            </button>
            <button
              type="button"
              onClick={() => setSelectedBreedFilter('labradoodle')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedBreedFilter === 'labradoodle'
                  ? 'bg-white text-[#2C2723] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Labradoodles
            </button>
          </div>
        </div>

        {/* Hero Customer Lifestyle Showcase */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE5D8] shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 aspect-4/3 overflow-hidden bg-stone-100">
            <img
              src={bakeryImages.happyCustomers}
              alt="Happy Adelaide pet parents celebrating Groodle 2nd birthday with custom dog cake"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 p-8 lg:p-12 space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-stone-800 text-lg md:text-xl font-medium italic leading-relaxed">
              “Buddy’s 2nd birthday was pure magic! We invited our doodle friends to the park in Unley, and when we brought out his personalized cake, everyone lost their minds taking photos. Buddy licked the plate clean and had zero tummy trouble!”
            </p>
            <div className="pt-2">
              <span className="font-bold text-[#2C2723] block text-base">Clare & Dan W.</span>
              <span className="text-xs text-stone-500 block">
                Pet Parents to Buddy the Groodle · Unley, South Australia
              </span>
              <span className="text-xs font-semibold text-[#A2672E] block mt-1">
                Ordered: Kangaroo & Sweet Potato Celebration Round
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-[#EDE5D8] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-stone-400">{t.suburb}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic">“{t.quote}”</p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100">
                <span className="font-bold text-xs text-[#2C2723] block">
                  {t.dogName} ({t.breed}, {t.dogAge} yrs)
                </span>
                <span className="text-[11px] text-stone-500 block">{t.ownerNames}</span>
                <span className="text-[10px] text-[#A2672E] font-medium block mt-1 truncate">
                  {t.cakeOrdered}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
