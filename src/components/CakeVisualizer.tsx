import React from 'react';
import { CustomCakeConfig } from '../types/cake';
import { FROSTING_OPTIONS, SIZE_OPTIONS, PROTEIN_OPTIONS } from '../data/bakeryData';

interface CakeVisualizerProps {
  config: CustomCakeConfig;
  defaultDoodleSampleUrl: string;
}

export const CakeVisualizer: React.FC<CakeVisualizerProps> = ({
  config,
  defaultDoodleSampleUrl,
}) => {
  const frosting = FROSTING_OPTIONS.find((f) => f.id === config.frosting) || FROSTING_OPTIONS[0];
  const size = SIZE_OPTIONS.find((s) => s.id === config.size) || SIZE_OPTIONS[1];
  const protein = PROTEIN_OPTIONS.find((p) => p.id === config.protein) || PROTEIN_OPTIONS[0];

  const hasBlueberries = config.toppings.includes('fresh_blueberries');
  const hasStrawberries = config.toppings.includes('fresh_strawberries');
  const hasBiscuitRim = config.toppings.includes('liver_biscuit_rim');
  const hasCarobBones = config.toppings.includes('carob_bones');
  const hasFlowers = config.toppings.includes('edible_flowers');
  const hasCandle = config.includeCandle;

  const photoToDisplay = config.photoUrl || defaultDoodleSampleUrl;

  // Scale factor based on cake size
  const scale = config.size === 'mini' ? 0.82 : config.size === 'medium' ? 1 : 1.15;

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center p-4 select-none">
      {/* Background Plate / Ceramic Pedestal Base */}
      <div className="absolute inset-x-8 bottom-6 h-12 bg-black/5 rounded-[50%] blur-xl transform translate-y-3 pointer-events-none" />
      
      {/* Wooden / Ceramic Stand */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Cake Stand Surface */}
        <div className="absolute bottom-10 w-[88%] h-[38%] rounded-[50%] bg-[#F0EBE1] border-4 border-[#E2D9CC] shadow-inner flex items-center justify-center">
          <div className="w-[94%] h-[88%] rounded-[50%] border border-[#DACFBF] opacity-50" />
        </div>

        {/* Scaled Cake Container */}
        <div
          className="relative flex items-center justify-center transition-all duration-300"
          style={{ transform: `scale(${scale}) translateY(-10px)` }}
        >
          {/* 1. ROUND CAKE */}
          {config.shape === 'round' && (
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Cake Sponge Cylinder Shadow */}
              <div className="absolute bottom-6 w-64 h-24 rounded-b-[48px] bg-[#A47648] border-b-8 border-[#7C552D] shadow-lg flex items-end justify-center overflow-hidden">
                <div className="w-full h-4 bg-black/15" />
              </div>

              {/* Frosting Top Surface */}
              <div
                className="relative w-64 h-64 rounded-full shadow-md border-4 flex items-center justify-center transition-colors duration-500 overflow-hidden"
                style={{
                  backgroundColor: frosting.hex,
                  borderColor: frosting.accentHex,
                }}
              >
                {/* Frosting Swirl texture rings */}
                <div className="absolute inset-4 rounded-full border-2 border-white/30 pointer-events-none" />
                <div className="absolute inset-10 rounded-full border border-black/5 pointer-events-none" />

                {/* Edible Wafer Photo in Center */}
                {config.hasPhotoPrint && (
                  <div className="relative z-10 w-36 h-36 rounded-full p-1 bg-white/90 shadow-md border-2 border-[#EADFCF] flex items-center justify-center overflow-hidden">
                    <img
                      src={photoToDisplay}
                      alt={config.pupName}
                      className="w-full h-full object-cover rounded-full"
                      style={{
                        transform: `scale(${config.photoScale})`,
                      }}
                    />
                    {/* Wafer Texture Overlay */}
                    <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply pointer-events-none" />
                    <div className="absolute bottom-1 px-2 py-0.5 bg-[#4A3B2C]/80 text-white text-[9px] font-bold rounded-full uppercase tracking-wider backdrop-blur-xs">
                      Edible Print
                    </div>
                  </div>
                )}

                {/* Blueberries & Berries Ring */}
                {hasBlueberries && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = 128 + 96 * Math.cos(rad);
                      const y = 128 + 96 * Math.sin(rad);
                      return (
                        <div
                          key={idx}
                          className="absolute w-5 h-5 rounded-full bg-[#3B4265] border border-[#232742] shadow-sm transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                          style={{ left: `${x}px`, top: `${y}px` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Strawberries */}
                {hasStrawberries && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[22, 112, 202, 292].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = 128 + 84 * Math.cos(rad);
                      const y = 128 + 84 * Math.sin(rad);
                      return (
                        <div
                          key={idx}
                          className="absolute w-6 h-7 bg-[#E63946] rounded-t-lg rounded-b-full border border-[#B82431] shadow transform -translate-x-1/2 -translate-y-1/2 rotate-12 flex items-center justify-center"
                          style={{ left: `${x}px`, top: `${y}px` }}
                        >
                          <div className="w-2 h-1 bg-[#2D6A4F] -mt-6 rounded-t" />
                          <div className="w-1 h-1 bg-yellow-200 rounded-full" />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Edible Flower Petals */}
                {hasFlowers && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[15, 75, 140, 195, 255, 330].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = 128 + 68 * Math.cos(rad);
                      const y = 128 + 68 * Math.sin(rad);
                      return (
                        <div
                          key={idx}
                          className={`absolute w-3.5 h-3.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                            idx % 2 === 0 ? 'bg-[#FF9F1C]' : 'bg-[#4361EE]'
                          } opacity-90 shadow-xs`}
                          style={{ left: `${x}px`, top: `${y}px` }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Crunchy Liver Biscuit Picket Rim */}
              {hasBiscuitRim && (
                <div className="absolute -bottom-3 inset-x-2 flex justify-between px-2 pointer-events-none z-20">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-8 bg-[#C29363] border border-[#8C6239] rounded-t-full shadow-sm flex flex-col items-center justify-between py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C6239]/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C6239]/40" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. BONE SHAPED CAKE */}
          {config.shape === 'bone' && (
            <div className="relative w-80 h-48 flex items-center justify-center">
              {/* Bone Shape Body */}
              <div
                className="relative w-72 h-36 rounded-3xl shadow-lg border-4 flex items-center justify-center transition-colors duration-500"
                style={{
                  backgroundColor: frosting.hex,
                  borderColor: frosting.accentHex,
                }}
              >
                {/* Bone Ends Left */}
                <div
                  className="absolute -left-6 -top-4 w-18 h-18 rounded-full border-4 transition-colors duration-500 shadow-sm"
                  style={{ backgroundColor: frosting.hex, borderColor: frosting.accentHex }}
                />
                <div
                  className="absolute -left-6 -bottom-4 w-18 h-18 rounded-full border-4 transition-colors duration-500 shadow-sm"
                  style={{ backgroundColor: frosting.hex, borderColor: frosting.accentHex }}
                />
                {/* Bone Ends Right */}
                <div
                  className="absolute -right-6 -top-4 w-18 h-18 rounded-full border-4 transition-colors duration-500 shadow-sm"
                  style={{ backgroundColor: frosting.hex, borderColor: frosting.accentHex }}
                />
                <div
                  className="absolute -right-6 -bottom-4 w-18 h-18 rounded-full border-4 transition-colors duration-500 shadow-sm"
                  style={{ backgroundColor: frosting.hex, borderColor: frosting.accentHex }}
                />

                {/* Edible Wafer Photo in Center */}
                {config.hasPhotoPrint && (
                  <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-white/95 shadow-md border-2 border-[#EADFCF] flex items-center justify-center overflow-hidden">
                    <img
                      src={photoToDisplay}
                      alt={config.pupName}
                      className="w-full h-full object-cover rounded-full"
                      style={{ transform: `scale(${config.photoScale})` }}
                    />
                  </div>
                )}

                {/* Bone biscuit rim */}
                {hasBiscuitRim && (
                  <div className="absolute inset-x-8 -bottom-3 flex justify-between z-20">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-6 bg-[#C29363] border border-[#8C6239] rounded-sm flex items-center justify-center"
                      >
                        <div className="w-1 h-1 bg-[#8C6239]" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Berries on the bone lobes */}
                {hasBlueberries && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#3B4265] border border-[#232742]" />
                    <div className="absolute left-2 bottom-1 w-4 h-4 rounded-full bg-[#3B4265] border border-[#232742]" />
                    <div className="absolute right-0 top-1 w-4 h-4 rounded-full bg-[#3B4265] border border-[#232742]" />
                    <div className="absolute right-2 bottom-1 w-4 h-4 rounded-full bg-[#3B4265] border border-[#232742]" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. PAW PRINT CAKE */}
          {config.shape === 'paw' && (
            <div className="relative w-72 h-72 flex flex-col items-center justify-center">
              {/* 4 Toe Pads */}
              <div className="w-full flex justify-between px-6 mb-2 z-10">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-11 h-14 rounded-[50%] border-3 shadow-md flex items-center justify-center transition-colors duration-500"
                    style={{
                      backgroundColor: frosting.hex,
                      borderColor: frosting.accentHex,
                      transform: i === 0 ? 'rotate(-20deg)' : i === 3 ? 'rotate(20deg)' : 'none',
                    }}
                  >
                    {hasBlueberries && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#3B4265] border border-[#232742]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Main Center Pad */}
              <div
                className="relative w-52 h-44 rounded-[45%_45%_48%_48%] border-4 shadow-lg flex items-center justify-center transition-colors duration-500 overflow-hidden"
                style={{
                  backgroundColor: frosting.hex,
                  borderColor: frosting.accentHex,
                }}
              >
                {config.hasPhotoPrint && (
                  <div className="relative z-10 w-28 h-28 rounded-full p-1 bg-white/95 shadow border-2 border-[#EADFCF] flex items-center justify-center overflow-hidden">
                    <img
                      src={photoToDisplay}
                      alt={config.pupName}
                      className="w-full h-full object-cover rounded-full"
                      style={{ transform: `scale(${config.photoScale})` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. HEART SHAPED CAKE */}
          {config.shape === 'heart' && (
            <div className="relative w-72 h-64 flex items-center justify-center">
              <div
                className="relative w-56 h-56 rotate-45 rounded-lg border-4 shadow-lg flex items-center justify-center transition-colors duration-500"
                style={{
                  backgroundColor: frosting.hex,
                  borderColor: frosting.accentHex,
                }}
              >
                {/* Top Left lobe */}
                <div
                  className="absolute -top-20 left-0 w-56 h-56 rounded-full border-t-4 border-l-4 transition-colors duration-500"
                  style={{
                    backgroundColor: frosting.hex,
                    borderColor: frosting.accentHex,
                  }}
                />
                {/* Top Right lobe */}
                <div
                  className="absolute top-0 -left-20 w-56 h-56 rounded-full border-t-4 border-l-4 transition-colors duration-500"
                  style={{
                    backgroundColor: frosting.hex,
                    borderColor: frosting.accentHex,
                  }}
                />

                {/* Central Photo */}
                {config.hasPhotoPrint && (
                  <div className="-rotate-45 relative z-10 w-32 h-32 rounded-full p-1 bg-white/95 shadow border-2 border-[#EADFCF] flex items-center justify-center overflow-hidden">
                    <img
                      src={photoToDisplay}
                      alt={config.pupName}
                      className="w-full h-full object-cover rounded-full"
                      style={{ transform: `scale(${config.photoScale})` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. PUPPY HEAD SILHOUETTE */}
          {config.shape === 'pup_head' && (
            <div className="relative w-72 h-64 flex items-center justify-center">
              {/* Left Floppy Ear */}
              <div
                className="absolute -left-2 top-2 w-16 h-36 rounded-full rotate-[-25deg] border-4 shadow-md transition-colors duration-500 z-5"
                style={{ backgroundColor: frosting.accentHex, borderColor: frosting.hex }}
              />
              {/* Right Floppy Ear */}
              <div
                className="absolute -right-2 top-2 w-16 h-36 rounded-full rotate-[25deg] border-4 shadow-md transition-colors duration-500 z-5"
                style={{ backgroundColor: frosting.accentHex, borderColor: frosting.hex }}
              />

              {/* Central Head */}
              <div
                className="relative z-10 w-56 h-56 rounded-full border-4 shadow-lg flex items-center justify-center transition-colors duration-500 overflow-hidden"
                style={{
                  backgroundColor: frosting.hex,
                  borderColor: frosting.accentHex,
                }}
              >
                {config.hasPhotoPrint && (
                  <div className="relative z-10 w-32 h-32 rounded-full p-1 bg-white/95 shadow border-2 border-[#EADFCF] flex items-center justify-center overflow-hidden">
                    <img
                      src={photoToDisplay}
                      alt={config.pupName}
                      className="w-full h-full object-cover rounded-full"
                      style={{ transform: `scale(${config.photoScale})` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Carob bones decoration */}
          {hasCarobBones && (
            <div className="absolute top-2 right-4 z-25 transform rotate-12 flex items-center gap-1 bg-[#4B3019] px-2.5 py-1 rounded-full shadow border border-[#6B4627] text-amber-100 text-[10px] font-bold">
              🦴 Carob Dipped Bone
            </div>
          )}

          {/* Birthday Candle */}
          {hasCandle && (
            <div className="absolute -top-12 z-30 flex flex-col items-center">
              {/* Flame */}
              <div className="w-3.5 h-5 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_12px_#F59E0B] animate-pulse -mb-0.5" />
              {/* Candle Body */}
              <div className="w-2.5 h-8 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 rounded-t shadow flex items-center justify-center">
                <span className="text-[10px] font-black text-amber-950 font-display">
                  {config.pupAge || 1}
                </span>
              </div>
              <div className="w-5 h-1.5 bg-[#8C6239] rounded-full shadow-xs" />
            </div>
          )}

          {/* Personalised Biscuit Banner / Plaque */}
          <div className="absolute -bottom-8 z-30 w-auto max-w-[280px] bg-[#E5B57A] border-2 border-[#9D6832] rounded-lg px-4 py-1.5 shadow-md flex items-center justify-center">
            <p className="text-xs font-bold text-[#4F2D0B] tracking-wide text-center truncate">
              {config.biscuitMessage || `Happy Birthday ${config.pupName}!`}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Nutrition / Ingredient Pill */}
      <div className="absolute top-2 left-2 z-30 bg-white/90 backdrop-blur-xs border border-amber-200/80 rounded-xl p-2.5 shadow-xs max-w-[170px] text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
          Fresh Protein Base
        </span>
        <span className="text-xs font-semibold text-stone-800 line-clamp-1">
          {protein.name.split('&')[0]}
        </span>
        <span className="text-[10px] text-stone-500 block">
          {size.name.split('(')[0]} · {size.diameter}
        </span>
      </div>

      {/* Adelaide Metro Fresh Bake Stamp */}
      <div className="absolute bottom-2 right-2 z-30 bg-[#2D5A43] text-white rounded-xl px-2.5 py-1.5 shadow-xs text-right">
        <span className="text-[9px] uppercase tracking-wider text-emerald-200 block font-semibold">
          Adelaide Metro
        </span>
        <span className="text-xs font-bold block">100% Human-Grade</span>
      </div>
    </div>
  );
};
