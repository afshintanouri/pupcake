import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/bakeryData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-t border-[#EADBCC]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E] mb-2">
            <HelpCircle className="w-4 h-4 text-[#A2672E]" />
            <span>Pet Parent Questions Answered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2723] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base">
            Everything you need to know about our ingredients, edible photo technology, and Adelaide delivery.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-stone-200 bg-[#FAF7F2] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm md:text-base text-[#2C2723]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-[#A2672E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-stone-500">
          Have a specific dietary allergy or custom party theme?{' '}
          <a href="#contact" className="text-[#A2672E] font-bold hover:underline">
            Reach out to our Adelaide bakery team directly
          </a>
          .
        </div>
      </div>
    </section>
  );
};
