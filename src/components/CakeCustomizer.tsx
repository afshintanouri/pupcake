import React, { useState, useRef } from 'react';
import {
  CustomCakeConfig,
  CakeOrder,
} from '../types/cake';
import {
  SHAPE_OPTIONS,
  SIZE_OPTIONS,
  PROTEIN_OPTIONS,
  CARB_OPTIONS,
  FROSTING_OPTIONS,
  TOPPING_OPTIONS,
  ADELAIDE_SUBURBS,
  POPULAR_DOODLE_BREEDS,
} from '../data/bakeryData';
import { CakeVisualizer } from './CakeVisualizer';
import {
  Sparkles,
  Camera,
  Calendar,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  Upload,
  Info,
  Check,
  Plus,
  Trash2,
  Phone,
  Mail,
  User,
  RotateCcw
} from 'lucide-react';

interface CakeCustomizerProps {
  initialConfig: CustomCakeConfig;
  defaultDoodleSampleUrl: string;
  onOpenOrderModal: (order: CakeOrder) => void;
}

export const CakeCustomizer: React.FC<CakeCustomizerProps> = ({
  initialConfig,
  defaultDoodleSampleUrl,
  onOpenOrderModal,
}) => {
  const [config, setConfig] = useState<CustomCakeConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<'details' | 'shape_size' | 'ingredients' | 'frosting_toppings' | 'delivery'>('details');

  // Adelaide delivery details state
  const tomorrowPlusTwo = new Date();
  tomorrowPlusTwo.setDate(tomorrowPlusTwo.getDate() + 3);
  const minDeliveryDate = tomorrowPlusTwo.toISOString().split('T')[0];

  const [deliveryDate, setDeliveryDate] = useState<string>(minDeliveryDate);
  const [deliverySlot, setDeliverySlot] = useState<'morning' | 'afternoon'>('morning');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedSuburb, setSelectedSuburb] = useState<string>('Norwood');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState<string>('');
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');
  const [customPhotoName, setCustomPhotoName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Price calculations
  const selectedSize = SIZE_OPTIONS.find((s) => s.id === config.size) || SIZE_OPTIONS[1];
  const selectedProtein = PROTEIN_OPTIONS.find((p) => p.id === config.protein) || PROTEIN_OPTIONS[0];
  const toppingsTotal = config.toppings.reduce((sum, toppingId) => {
    const item = TOPPING_OPTIONS.find((t) => t.id === toppingId);
    return sum + (item ? item.price : 0);
  }, 0);
  const photoPrintPrice = config.hasPhotoPrint ? 10 : 0;
  const candlePrice = config.includeCandle ? 4 : 0;

  const currentSuburbObj = ADELAIDE_SUBURBS.find((s) => s.name === selectedSuburb) || ADELAIDE_SUBURBS[2];
  const rawCakeSubtotal = selectedSize.basePrice + selectedProtein.priceModifier + toppingsTotal + photoPrintPrice + candlePrice;
  const deliveryFee = deliveryType === 'pickup' ? 0 : rawCakeSubtotal >= 80 ? 0 : currentSuburbObj.deliveryFee;
  const grandTotal = rawCakeSubtotal + deliveryFee;

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setConfig((prev) => ({
            ...prev,
            photoUrl: reader.result as string,
            hasPhotoPrint: true,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setConfig((prev) => ({
      ...prev,
      photoUrl: null,
    }));
    setCustomPhotoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleToppingToggle = (id: string) => {
    setConfig((prev) => {
      const exists = prev.toppings.includes(id);
      return {
        ...prev,
        toppings: exists ? prev.toppings.filter((t) => t !== id) : [...prev.toppings, id],
      };
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: CakeOrder = {
      id: `PUP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      cakeConfig: config,
      totalPrice: grandTotal,
      deliveryDate,
      deliveryTimeSlot: deliverySlot,
      deliveryType,
      suburb: deliveryType === 'pickup' ? 'North Adelaide Studio Pickup' : selectedSuburb,
      postcode: deliveryType === 'pickup' ? '5006' : currentSuburbObj.postcode,
      streetAddress: deliveryType === 'pickup' ? '88 O’Connell St, North Adelaide' : streetAddress || '12 King William Rd',
      ownerName: ownerName || 'Proud Pet Parent',
      ownerEmail: ownerEmail || 'parent@adelaidedoodles.com',
      ownerPhone: ownerPhone || '0412 345 678',
      deliveryNotes,
      status: 'confirmed',
    };
    onOpenOrderModal(newOrder);
  };

  return (
    <section id="customizer" className="py-16 md:py-24 bg-[#F8F5EE] border-y border-[#EADBCC]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A2672E] mb-2">
            <Sparkles className="w-4 h-4 text-[#C97B34]" />
            <span>Interactive Dog Cake Patisserie Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2C2723] tracking-tight text-balance">
            Design Your Pup’s Bespoke Birthday Cake
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#61574F]">
            Select wholesome human-grade SA meats, natural organic frostings, custom shapes, and print your pup's joyful face right onto dog-safe edible wafer.
          </p>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Sticky Live Visual Cake Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EADBCC] flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-[#F0EBE1] text-xs font-medium text-stone-500">
                <span className="flex items-center gap-1.5 font-bold text-[#2C2723]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Live Cake Preview
                </span>
                <span className="text-stone-400">Updates Instantly</span>
              </div>

              {/* Render the Visualizer */}
              <div className="w-full py-4">
                <CakeVisualizer
                  config={config}
                  defaultDoodleSampleUrl={defaultDoodleSampleUrl}
                />
              </div>

              {/* Live Nutritional & Quality Guarantee Callouts */}
              <div className="w-full mt-4 pt-4 border-t border-[#F0EBE1] grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE5D8]">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Protein Content</span>
                  <span className="text-sm font-bold text-[#2C2723]">{selectedProtein.proteinPct}% Pure</span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE5D8]">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Est. Calories</span>
                  <span className="text-sm font-bold text-[#2C2723]">~{selectedProtein.caloriesPer100g} kcal/100g</span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE5D8]">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Salt & Sugar</span>
                  <span className="text-sm font-bold text-emerald-700">0% Added</span>
                </div>
              </div>

              {/* Quick Summary Strip */}
              <div className="w-full mt-4 bg-[#F2EDE4] rounded-2xl p-4 text-xs text-stone-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-900">{config.pupName || 'Pup'}'s Cake ({selectedSize.name.split('(')[0]})</span>
                  <span className="font-bold text-stone-900">${rawCakeSubtotal} AUD</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Delivery ({deliveryType === 'pickup' ? 'North Adelaide Pickup' : selectedSuburb})</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee} AUD`}</span>
                </div>
                <div className="border-t border-stone-300/80 pt-1.5 flex justify-between text-sm font-extrabold text-[#2C2723]">
                  <span>Total (inc. GST)</span>
                  <span className="text-[#A2672E]">${grandTotal} AUD</span>
                </div>
              </div>
            </div>

            {/* Adelaide Metro Delivery Assurance Card */}
            <div className="bg-[#E9F3EC] border border-[#CDE3D4] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#204E35]">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-[#1B3F2B]">Adelaide Fresh Refrigerated Delivery</p>
                <p className="mt-0.5 text-[#2B5E41]">
                  Dispatched in temperature-controlled cool packaging to all Adelaide metro suburbs. Never melted, never crushed.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Step-by-Step Customizer Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EADBCC]">
            {/* Step Tabs Navigation */}
            <div className="flex items-center gap-1 p-1 bg-[#F5EFE6] rounded-2xl mb-8 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'details'
                    ? 'bg-white text-[#2C2723] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1. Pup & Photo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shape_size')}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'shape_size'
                    ? 'bg-white text-[#2C2723] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                2. Shape & Size
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'ingredients'
                    ? 'bg-white text-[#2C2723] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                3. Meat & Base
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('frosting_toppings')}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'frosting_toppings'
                    ? 'bg-white text-[#2C2723] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                4. Frosting & Berries
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'delivery'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                5. Adelaide Delivery
              </button>
            </div>

            {/* TAB 1: PUP DETAILS & EDIBLE PHOTO PRINT */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">Pup’s Milestone & Edible Photo</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tell us who the birthday boy or girl is, and upload their photo for the edible wafer topper!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Pup’s Name
                    </label>
                    <input
                      type="text"
                      value={config.pupName}
                      onChange={(e) => {
                        const name = e.target.value;
                        setConfig((prev) => ({
                          ...prev,
                          pupName: name,
                          biscuitMessage: `Happy ${prev.pupAge}${prev.pupAge === 1 ? 'st' : prev.pupAge === 2 ? 'nd' : prev.pupAge === 3 ? 'rd' : 'th'} Birthday ${name}!`,
                        }));
                      }}
                      placeholder="e.g. Barnaby, Archie, Luna"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Turning Age
                    </label>
                    <select
                      value={config.pupAge}
                      onChange={(e) => {
                        const age = Number(e.target.value);
                        setConfig((prev) => ({
                          ...prev,
                          pupAge: age,
                          biscuitMessage: `Happy ${age}${age === 1 ? 'st' : age === 2 ? 'nd' : age === 3 ? 'rd' : 'th'} Birthday ${prev.pupName}!`,
                        }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium bg-white"
                    >
                      {[...Array(18)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} year{i > 0 ? 's' : ''} old {i === 0 ? '🐾 (1st Gotcha / Birthday)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Dog Breed
                  </label>
                  <select
                    value={config.pupBreed}
                    onChange={(e) => setConfig((prev) => ({ ...prev, pupBreed: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium bg-white"
                  >
                    {POPULAR_DOODLE_BREEDS.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Edible Photo Printing Feature Box */}
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE5D8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#A2672E]" />
                      <span className="font-bold text-sm text-[#2C2723]">
                        Custom Edible Photo Wafer (+ $10)
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.hasPhotoPrint}
                        onChange={(e) => setConfig((prev) => ({ ...prev, hasPhotoPrint: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A2672E]"></div>
                    </label>
                  </div>

                  <p className="text-xs text-stone-600">
                    We print your dog's actual photograph using 100% natural vegetable food colors on certified dog-safe potato starch wafer. It tastes slightly nutty and melts into the frosting!
                  </p>

                  {config.hasPhotoPrint && (
                    <div className="space-y-3 pt-2 border-t border-[#EDE5D8]">
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="pup-photo-input"
                        />
                        <label
                          htmlFor="pup-photo-input"
                          className="px-4 py-2 bg-white border border-stone-300 hover:border-[#A2672E] text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
                        >
                          <Upload className="w-4 h-4 text-[#A2672E]" />
                          {customPhotoName ? 'Change Uploaded Photo' : 'Upload Pup’s Photo'}
                        </label>

                        {config.photoUrl && (
                          <button
                            type="button"
                            onClick={handleResetPhoto}
                            className="px-3 py-2 text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Use Sample Doodle
                          </button>
                        )}

                        <span className="text-[11px] text-stone-500">
                          {customPhotoName ? `Selected: ${customPhotoName}` : 'Sample Apricot Cavoodle displayed by default'}
                        </span>
                      </div>

                      {/* Photo Zoom / Scale slider */}
                      <div className="pt-2">
                        <div className="flex justify-between text-[11px] text-stone-500 font-medium mb-1">
                          <span>Wafer Photo Zoom / Crop</span>
                          <span>{Math.round(config.photoScale * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="1.8"
                          step="0.05"
                          value={config.photoScale}
                          onChange={(e) => setConfig((prev) => ({ ...prev, photoScale: parseFloat(e.target.value) }))}
                          className="w-full accent-[#A2672E]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Hand-Piped Biscuit Plaque Inscription */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Edible Biscuit Banner Message
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={config.biscuitMessage}
                    onChange={(e) => setConfig((prev) => ({ ...prev, biscuitMessage: e.target.value }))}
                    placeholder="e.g. Happy 2nd Birthday Barnaby!"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Piped with carob & peanut butter onto a golden oat bone biscuit (Max 32 characters)
                  </span>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('shape_size')}
                    className="px-6 py-2.5 bg-[#A2672E] hover:bg-[#8D5724] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Next: Choose Shape & Size →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SHAPE & SIZE */}
            {activeTab === 'shape_size' && (
              <div className="space-y-8">
                {/* Shapes */}
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">Select Cake Shape</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Every shape is carved fresh from our nutrient-dense baked meat loaves.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SHAPE_OPTIONS.map((shape) => {
                      const isSelected = config.shape === shape.id;
                      return (
                        <button
                          key={shape.id}
                          type="button"
                          onClick={() => setConfig((prev) => ({ ...prev, shape: shape.id }))}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-2 ring-[#A2672E]/30'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-[#2C2723]">{shape.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#A2672E]" />}
                          </div>
                          <p className="text-xs text-stone-500 leading-relaxed mb-2">{shape.description}</p>
                          <span className="text-[10px] font-semibold text-[#8C6239] block">
                            {shape.recommendedFor}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="text-xl font-bold text-[#2C2723]">Choose Celebration Size</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Portion guidelines for single pups or doggy birthday playdates.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SIZE_OPTIONS.map((size) => {
                      const isSelected = config.size === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setConfig((prev) => ({ ...prev, size: size.id }))}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-2 ring-[#A2672E]/30'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-sm font-bold text-[#2C2723] block">{size.name}</span>
                              <span className="text-xs font-semibold text-[#A2672E]">{size.diameter}</span>
                            </div>
                            <span className="text-base font-extrabold text-[#2C2723]">${size.basePrice}</span>
                          </div>
                          <p className="text-xs text-stone-600 mb-2">{size.servings}</p>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md inline-block">
                            {size.dogWeightGuide}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl transition-colors hover:bg-stone-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className="px-6 py-2.5 bg-[#A2672E] hover:bg-[#8D5724] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Next: Meats & Grains →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: FRESH PROTEIN & WHOLESOME BASE */}
            {activeTab === 'ingredients' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">100% Human-Grade Protein Foundation</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Sourced fresh from ethical South Australian farmers & fisheries. Zero mystery meal.
                  </p>

                  <div className="space-y-3">
                    {PROTEIN_OPTIONS.map((prot) => {
                      const isSelected = config.protein === prot.id;
                      return (
                        <div
                          key={prot.id}
                          onClick={() => setConfig((prev) => ({ ...prev, protein: prot.id }))}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-2 ring-[#A2672E]/30'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[#2C2723]">{prot.name}</span>
                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                  {prot.badge}
                                </span>
                              </div>
                              <p className="text-xs text-stone-600 leading-relaxed">{prot.description}</p>
                              <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-1">
                                <span>{prot.highlight}</span>
                                <span>·</span>
                                <span>{prot.proteinPct}% Protein</span>
                                <span>·</span>
                                <span>~{prot.caloriesPer100g} kcal/100g</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-[#A2672E]">
                                {prot.priceModifier > 0 ? `+$${prot.priceModifier}` : 'Included'}
                              </span>
                              <div className="mt-2">
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    isSelected ? 'bg-[#A2672E] border-[#A2672E] text-white' : 'border-stone-300'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Carbohydrate / Flour Structure */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="text-xl font-bold text-[#2C2723]">Wholesome Texture & Fiber</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Binds the cake sponge naturally while supporting gastrointestinal balance.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CARB_OPTIONS.map((carb) => {
                      const isSelected = config.carb === carb.id;
                      return (
                        <button
                          key={carb.id}
                          type="button"
                          onClick={() => setConfig((prev) => ({ ...prev, carb: carb.id }))}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-2 ring-[#A2672E]/30'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#2C2723]">{carb.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#A2672E]" />}
                          </div>
                          <p className="text-[11px] text-stone-500 leading-normal mb-2">{carb.description}</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {carb.grainFree && (
                              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                                Grain-Free
                              </span>
                            )}
                            {carb.glutenFree && (
                              <span className="text-[9px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded">
                                Gluten-Free
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('shape_size')}
                    className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl transition-colors hover:bg-stone-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('frosting_toppings')}
                    className="px-6 py-2.5 bg-[#A2672E] hover:bg-[#8D5724] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Next: Frosting & Toppings →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: FROSTING & SUPERFOOD TOPPINGS */}
            {activeTab === 'frosting_toppings' && (
              <div className="space-y-8">
                {/* Frosting Options */}
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">Dog-Safe Natural Frosting</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Crafted with lactose-free whipped cream cheese & Greek yoghurt. 100% plant & mineral food colors.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FROSTING_OPTIONS.map((f) => {
                      const isSelected = config.frosting === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setConfig((prev) => ({ ...prev, frosting: f.id }))}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-2 ring-[#A2672E]/30'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full border-2 shadow-xs shrink-0 mt-0.5"
                            style={{ backgroundColor: f.hex, borderColor: f.accentHex }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#2C2723] truncate">{f.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#A2672E] shrink-0" />}
                            </div>
                            <p className="text-[11px] text-stone-500 leading-relaxed mb-1">{f.description}</p>
                            <span className="text-[10px] text-stone-400 block font-medium">
                              Color: {f.naturalColorSource}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toppings Multi-Select */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="text-xl font-bold text-[#2C2723]">Gourmet Superfood Toppings & Finish</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Select hand-picked Adelaide berries, home-baked liver treats, and birthday candles.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {TOPPING_OPTIONS.map((topping) => {
                      const isChecked = config.toppings.includes(topping.id);
                      return (
                        <div
                          key={topping.id}
                          onClick={() => handleToppingToggle(topping.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'border-[#A2672E] bg-[#FDF9F3] ring-1 ring-[#A2672E]'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-lg">{topping.icon}</span>
                            <span className="text-xs font-bold text-[#A2672E]">+${topping.price}</span>
                          </div>
                          <span className="text-xs font-bold text-[#2C2723] block mb-1">{topping.name}</span>
                          <p className="text-[11px] text-stone-500 leading-normal">{topping.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Number Candle toggle */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5D8] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#2C2723] block">
                      Include Golden Birthday Candle (Age {config.pupAge})
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Mounted with a food-safe biscuit base for pet safety (+$4)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.includeCandle}
                    onChange={(e) => setConfig((prev) => ({ ...prev, includeCandle: e.target.checked }))}
                    className="w-5 h-5 accent-[#A2672E] rounded cursor-pointer"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl transition-colors hover:bg-stone-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('delivery')}
                    className="px-6 py-2.5 bg-[#A2672E] hover:bg-[#8D5724] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Next: Delivery & Schedule →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: ADELAIDE METRO DELIVERY & CHECKOUT */}
            {activeTab === 'delivery' && (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">Adelaide Metro Delivery & Contact</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Delivered in temperature-controlled refrigerated couriers across Adelaide, or pick up from our North Adelaide patisserie.
                  </p>
                </div>

                {/* Delivery or Pickup Segmented Control */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5EFE6] rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-white text-[#2C2723] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🚚 Refrigerated Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-white text-[#2C2723] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🏪 North Adelaide Studio Pickup (FREE)
                  </button>
                </div>

                {/* Delivery Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Celebration Date (Min. 48h Fresh Bake Notice)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={minDeliveryDate}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Preferred Adelaide Delivery Window
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value as 'morning' | 'afternoon')}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium bg-white"
                    >
                      <option value="morning">Morning Delivery (8:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon Delivery (1:00 PM – 5:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Adelaide Suburb & Address */}
                {deliveryType === 'delivery' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Adelaide Suburb
                        </label>
                        <select
                          value={selectedSuburb}
                          onChange={(e) => setSelectedSuburb(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium bg-white"
                        >
                          {ADELAIDE_SUBURBS.map((sub) => (
                            <option key={sub.name} value={sub.name}>
                              {sub.name} ({sub.postcode}) - {sub.deliveryFee === 0 ? 'FREE' : `$${sub.deliveryFee}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Postcode
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={currentSuburbObj.postcode}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-700 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. 42 The Parade"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#F2EDE4] rounded-2xl border border-stone-300 text-xs text-stone-800 space-y-1">
                    <p className="font-bold text-stone-900">Studio Pickup Address:</p>
                    <p>Pupcake Adelaide Kitchen · 88 O’Connell Street, North Adelaide SA 5006</p>
                    <p className="text-stone-500">Ready from 9:00 AM on your chosen celebration day.</p>
                  </div>
                )}

                {/* Pet Parent Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="e.g. 0412 345 678"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Special Doggy Dietary Instructions or Gate Codes
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Please ring doorbell and leave in shade. Barnaby has a mild sensitivity to beef."
                    className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm font-medium"
                  />
                </div>

                {/* Checkout Button & Trust */}
                <div className="pt-4 border-t border-stone-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-500 block">Total for Adelaide Metro Order</span>
                      <span className="text-2xl font-black text-[#2C2723]">${grandTotal} AUD</span>
                      {rawCakeSubtotal >= 80 && (
                        <span className="text-[11px] text-emerald-700 font-bold block">
                          🎉 Qualified for Free Adelaide Metro Delivery!
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#2D5A43] hover:bg-[#234734] text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>Complete & Book Adelaide Delivery</span>
                      <span>→</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-center sm:text-left text-stone-400 mt-3">
                    🔒 Fresh bake guaranteed · HACCP-certified Adelaide commercial kitchen · Cash or Card upon delivery/pickup
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
