import React from 'react';
import { bakeryImages } from '../assets/images';
import { CustomCakeConfig } from '../types/cake';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface SignatureCakesProps {
  onLoadPreset: (config: Partial<CustomCakeConfig>) => void;
}

export const SignatureCakes: React.FC<SignatureCakesProps> = ({ onLoadPreset }) => {
  const presets = [
    {
      id: 'doodle_photo_deluxe',
      name: 'The Adelaide Doodle Deluxe',
      subtitle: 'Double-tier with your pup’s custom edible wafer photo',
      image: bakeryImages.photoCake,
      alt: 'Adelaide round tiered dog birthday cake with edible photo print',
      shape: 'round' as const,
      size: 'medium' as const,
      protein: 'kangaroo' as const,
      carb: 'oats_rice' as const,
      frosting: 'greek_yogurt' as const,
      toppings: ['fresh_blueberries', 'liver_biscuit_rim'],
      hasPhoto: true,
      price: '$72 AUD',
      description: 'South Australian wild kangaroo base frosted in lactose-free whipped cream cheese with organic spirulina swirls, fresh Adelaide blackberries, and your dog’s photo print.',
      doodleBreed: 'Cavoodles & Groodles',
    },
    {
      id: 'big_bone_bonanza',
      name: 'The Big Bone Bonanza',
      subtitle: 'Generous bone-shaped cake lined with crunchy liver biscuits',
      image: bakeryImages.boneCake,
      alt: 'Bone shaped dog birthday cake topped with goat cream cheese and berries',
      shape: 'bone' as const,
      size: 'medium' as const,
      protein: 'beef' as const,
      carb: 'oats_rice' as const,
      frosting: 'turmeric_gold' as const,
      toppings: ['fresh_strawberries', 'fresh_blueberries', 'liver_biscuit_rim'],
      hasPhoto: false,
      price: '$66 AUD',
      description: 'Grass-fed Angus beef & spinach loaf carved into an iconic doggy bone, iced in golden turmeric goat curd and garnished with Hahndorf strawberries.',
      doodleBreed: 'Labradoodles & Goldendoodles',
    },
    {
      id: 'berry_bliss_paw',
      name: 'The Berry Bliss Paw',
      subtitle: 'Sculpted paw print with individual berry toe portions',
      image: bakeryImages.bakingStory,
      alt: 'Baker preparing fresh organic ingredients for paw print dog cake in Adelaide',
      shape: 'paw' as const,
      size: 'medium' as const,
      protein: 'chicken' as const,
      carb: 'grain_free' as const,
      frosting: 'beet_blush' as const,
      toppings: ['fresh_blueberries', 'edible_flowers'],
      hasPhoto: false,
      price: '$64 AUD',
      description: 'Mount Lofty free-range chicken and butternut pumpkin, 100% grain-free coconut flour base, blushing Adelaide beetroot frosting and culinary flower petals.',
      doodleBreed: 'Spoodles & Toy Doodles',
    },
  ];

  return (
    <section id="signature" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E] mb-2">
              <Sparkles className="w-4 h-4 text-[#C97B34]" />
              <span>Adelaide Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2723] tracking-tight">
              Signature Adelaide Birthday Creations
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-xl">
              Our most celebrated recipes loved by Adelaide fur-families. Click any style to instantly load and personalize it in the studio.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-stone-500">
            Freshly baked · Zero chemicals · Delivered across Adelaide
          </div>
        </div>

        {/* 3-Column Responsive Product Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {presets.map((cake) => (
            <div
              key={cake.id}
              className="group bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#EDE5D8] flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Product Image (takes ~65% of top space) */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                  <img
                    src={cake.image}
                    alt={cake.alt}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-800 shadow-2xs">
                    {cake.doodleBreed}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#2C2723] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                    {cake.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2C2723] group-hover:text-[#A2672E] transition-colors">
                    {cake.name}
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-0.5 mb-3">{cake.subtitle}</p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{cake.description}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() =>
                    onLoadPreset({
                      shape: cake.shape,
                      size: cake.size,
                      protein: cake.protein,
                      carb: cake.carb,
                      frosting: cake.frosting,
                      toppings: cake.toppings,
                      hasPhotoPrint: cake.hasPhoto,
                    })
                  }
                  className="w-full py-3 bg-white hover:bg-[#A2672E] hover:text-white border border-[#DACBB8] hover:border-[#A2672E] text-[#2C2723] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2"
                >
                  <span>Customize This Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
