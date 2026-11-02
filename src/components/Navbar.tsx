import React from 'react';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCC]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2C2723] font-display whitespace-nowrap shrink-0 hover:text-[#A2672E] transition-colors flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-full bg-[#E8D8C3] text-[#A2672E] flex items-center justify-center text-sm shadow-2xs">
            🐾
          </span>
          Pupcake Adelaide
        </a>

        {/* Zone 2: 4–5 Concise Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
          <button
            onClick={() => onScrollTo('customizer')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cake Studio
          </button>
          <button
            onClick={() => onScrollTo('signature')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Signatures
          </button>
          <button
            onClick={() => onScrollTo('story')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => onScrollTo('delivery-checker')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Adelaide Delivery
          </button>
          <button
            onClick={() => onScrollTo('reviews')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Hall of Paws
          </button>
          <button
            onClick={() => onScrollTo('faq')}
            className="hover:text-[#2C2723] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onScrollTo('customizer')}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#A2672E] hover:bg-[#8D5724] rounded-full transition-all shadow-xs hover:shadow whitespace-nowrap shrink-0"
          >
            Design a Cake
          </button>
        </div>
      </div>
    </header>
  );
};
