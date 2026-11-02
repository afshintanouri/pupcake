import React, { useEffect } from 'react';
import { CakeOrder } from '../types/cake';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, X, Calendar, MapPin, Sparkles, Phone, Award } from 'lucide-react';

interface OrderModalProps {
  order: CakeOrder | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    if (order) {
      // Fire confetti bursts!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A2672E', '#2D5A43', '#E6A15C', '#F2B8C6', '#89C696'],
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  }, [order]);

  if (!order) return null;

  const { cakeConfig } = order;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#2D5A43] text-white p-6 sm:p-8 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-300" />
          </div>

          <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold block mb-1">
            Order #{order.id} Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
            {cakeConfig.pupName}’s Birthday Feast is Scheduled!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-md mx-auto">
            Our Adelaide patisserie team has queued this fresh bake. Delivered chilled right to your door.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Delivery Milestone Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5D8] text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#A2672E] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">Celebration & Delivery Date</span>
                <span className="text-stone-600 font-medium">{order.deliveryDate}</span>
                <span className="text-[11px] text-stone-400 block capitalize">
                  Window: {order.deliveryTimeSlot === 'morning' ? '8:00 AM – 12:00 PM' : '1:00 PM – 5:00 PM'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">Adelaide Destination</span>
                <span className="text-stone-600 font-medium truncate block">
                  {order.streetAddress}, {order.suburb} ({order.postcode})
                </span>
                <span className="text-[11px] text-stone-400 block">Refrigerated courier transport</span>
              </div>
            </div>
          </div>

          {/* Cake Recipe Summary Card */}
          <div className="border border-stone-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">
                  {cakeConfig.pupName}’s Custom Celebration Cake
                </h4>
                <p className="text-xs text-stone-500 capitalize">
                  {cakeConfig.shape} Shape · {cakeConfig.size} Size · {cakeConfig.pupBreed}
                </p>
              </div>
              <span className="text-base font-extrabold text-[#A2672E]">
                ${order.totalPrice} AUD
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone-600">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Protein Base</span>
                <span className="font-semibold text-stone-800 capitalize">{cakeConfig.protein.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Gastro Flour</span>
                <span className="font-semibold text-stone-800 capitalize">{cakeConfig.carb.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Natural Frosting</span>
                <span className="font-semibold text-stone-800 capitalize">{cakeConfig.frosting.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Edible Photo Print</span>
                <span className="font-semibold text-emerald-800">
                  {cakeConfig.hasPhotoPrint ? 'Yes, Printed on Dog-Safe Wafer' : 'None'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 text-xs">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Biscuit Banner Inscription</span>
              <span className="font-bold text-[#A2672E] text-sm">“{cakeConfig.biscuitMessage}”</span>
            </div>
          </div>

          {/* Pet Parent Details */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5D8] text-xs flex justify-between items-center text-stone-600">
            <div>
              <span className="font-bold text-stone-900 block">{order.ownerName}</span>
              <span>{order.ownerEmail} · {order.ownerPhone}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Ready for Fresh Bake
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Print / Save Party Pass</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-[#A2672E] hover:bg-[#8D5724] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Back to Bakery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
