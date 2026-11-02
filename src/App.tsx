import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CakeCustomizer } from './components/CakeCustomizer';
import { SignatureCakes } from './components/SignatureCakes';
import { OurStory } from './components/OurStory';
import { HallOfPaws } from './components/HallOfPaws';
import { DeliveryChecker } from './components/DeliveryChecker';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { CustomCakeConfig, CakeOrder } from './types/cake';
import { DEFAULT_CAKE_CONFIG } from './data/bakeryData';
import { bakeryImages } from './assets/images';

export default function App() {
  const [activeOrder, setActiveOrder] = useState<CakeOrder | null>(null);
  const [customizerConfig, setCustomizerConfig] = useState<CustomCakeConfig>(DEFAULT_CAKE_CONFIG);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadPreset = (presetConfig: Partial<CustomCakeConfig>) => {
    setCustomizerConfig((prev) => ({
      ...prev,
      ...presetConfig,
    }));
    handleScrollTo('customizer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2723]">
      {/* Top Banner Notice */}
      <div className="bg-[#2D5A43] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <span>🐾 Adelaide Metro Refrigerated Delivery</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">Free Delivery on Orders Over $80</span>
        <span className="hidden md:inline">·</span>
        <span className="hidden md:inline">Handcrafted Daily in North Adelaide</span>
      </div>

      {/* 3-Zone Top Navigation */}
      <Navbar onScrollTo={handleScrollTo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* 2. Interactive Cake Customizer Studio */}
        <CakeCustomizer
          key={JSON.stringify(customizerConfig)}
          initialConfig={customizerConfig}
          defaultDoodleSampleUrl={bakeryImages.photoCake}
          onOpenOrderModal={(order) => setActiveOrder(order)}
        />

        {/* 3. Signature Ready-to-Order Collection */}
        <SignatureCakes onLoadPreset={handleLoadPreset} />

        {/* 4. Our Story (Adelaide DINK doodle owners & SA Sourcing) */}
        <OurStory />

        {/* 5. Hall of Paws (Testimonials & Gallery) */}
        <HallOfPaws />

        {/* 6. Adelaide Metro Delivery Checker */}
        <DeliveryChecker />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />

        {/* 8. Contact Us Section */}
        <ContactSection />
      </main>

      {/* Order Confirmation Modal with Confetti & Party Pass */}
      <OrderModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
      />

      {/* Footer */}
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
}
