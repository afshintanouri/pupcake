import React from 'react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-[#241F1C] text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-xl font-black text-white font-display tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#A2672E] text-white flex items-center justify-center text-xs">
                🐾
              </span>
              Pupcake Adelaide
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Adelaide’s boutique dog birthday cake patisserie. 100% human-grade, South Australian ethical proteins, and custom edible photo prints.
            </p>
            <div className="text-[11px] text-stone-500">
              Kitchen: 88 O’Connell St, North Adelaide SA 5006
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('customizer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('signature')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Signature Bestsellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Adelaide Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('delivery-checker')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Adelaide Metro Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Adelaide Delivery Suburbs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Delivery Coverage</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Delivering daily across Adelaide CBD, Norwood, Unley, Prospect, Glenelg, Henley Beach, Burnside, Hyde Park, Parkside, Mawson Lakes, and surrounding suburbs.
            </p>
            <p className="text-[11px] text-[#C97B34] font-medium">
              Refrigerated food courier guaranteed.
            </p>
          </div>

          {/* Allergen & Vet Guidance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Health & Safety</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Formulated in consultation with Adelaide veterinary nutritionists. Strictly 0% xylitol, 0% chocolate, 0% added salts, sugars, or artificial colors.
            </p>
            <p className="text-[11px] text-stone-500">
              Consult your vet for severe medical conditions or chronic kidney diets.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Pupcake Adelaide. Made with love for Adelaide’s happiest dogs.</p>
          <div className="flex items-center gap-6">
            <span>South Australian Owned & Operated</span>
            <span>·</span>
            <span>HACCP Kitchen Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
