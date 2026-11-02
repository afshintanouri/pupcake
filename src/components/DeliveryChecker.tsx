import React, { useState } from 'react';
import { ADELAIDE_SUBURBS } from '../data/bakeryData';
import { MapPin, Search, CheckCircle, Clock, Snowflake, ShieldCheck } from 'lucide-react';

interface DeliveryCheckerProps {
  onSelectSuburb?: (suburb: string) => void;
}

export const DeliveryChecker: React.FC<DeliveryCheckerProps> = ({ onSelectSuburb }) => {
  const [query, setQuery] = useState('');

  const filtered = ADELAIDE_SUBURBS.filter((sub) =>
    sub.name.toLowerCase().includes(query.toLowerCase()) ||
    sub.postcode.includes(query)
  );

  return (
    <section id="delivery-checker" className="py-16 md:py-24 bg-white border-t border-[#EADBCC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D5A43] mb-2">
            <MapPin className="w-4 h-4 text-[#2D5A43]" />
            <span>Adelaide Metro Delivery Radius</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2723] tracking-tight">
            Check Your Adelaide Suburb or Postcode
          </h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base">
            We deliver chilled, celebratory dog birthday cakes right to your door across Adelaide metropolitan councils.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-stone-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter suburb or postcode (e.g. Norwood, 5000, Unley, Glenelg)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium shadow-2xs"
            />
          </div>
        </div>

        {/* Suburb Match Results */}
        <div className="max-w-4xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filtered.slice(0, 9).map((sub) => (
                <div
                  key={sub.name}
                  className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] hover:border-[#A2672E] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#2C2723]">{sub.name}</span>
                      <span className="text-xs font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-bold">
                        {sub.postcode}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 block mb-2">{sub.zone}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-800">
                      {sub.deliveryFee === 0 ? 'FREE Delivery' : `$${sub.deliveryFee} Flat Fee`}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {sub.availableDays.length === 7 ? 'Daily Delivery' : 'Select Days'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-[#FAF7F2] rounded-2xl border border-dashed border-stone-300">
              <p className="text-stone-700 font-semibold text-sm">
                Can’t spot your postcode? Don't worry!
              </p>
              <p className="text-stone-500 text-xs mt-1">
                We deliver to all areas within 25km of Adelaide CBD. You can also select free studio pickup from North Adelaide.
              </p>
            </div>
          )}
        </div>

        {/* 3 Value Pillars for Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-start gap-3">
            <Snowflake className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-stone-900">Refrigerated Transit</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Thermal insulated containers keep frostings smooth and photo wafer pristine even on warm Adelaide days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-stone-900">2 Delivery Windows</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Choose Morning (8am–12pm) or Afternoon (1pm–5pm). Live SMS courier tracking sent on delivery morning.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-stone-900">Free Over $80</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Orders $80 or over qualify for complimentary doorstep courier delivery across Adelaide Metro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
