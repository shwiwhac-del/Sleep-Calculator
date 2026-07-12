import React from "react";

export function ShimmerLoadingEffect() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center animate-fade-in relative z-20 select-none">
      {/* Container simulating the white sheet / panel in the image */}
      <div className="w-full bg-white dark:bg-[#111827] border border-[#E1D8CC] dark:border-[#1E293B] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
        
        {/* Grid layout containing the 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Top Left */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-row items-center gap-4 shadow-xs h-[130px] select-none">
            {/* Circle avatar */}
            <div 
              className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer shrink-0" 
              style={{ backgroundSize: "200% 100%" }} 
            />
            {/* Two lines */}
            <div className="flex-grow space-y-3">
              <div 
                className="h-4 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-3 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
            </div>
          </div>

          {/* Card 2: Top Middle */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-row items-center gap-4 shadow-xs h-[130px] select-none">
            {/* Square image placeholder */}
            <div 
              className="w-14 h-14 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer shrink-0" 
              style={{ backgroundSize: "200% 100%" }} 
            />
            {/* Three lines */}
            <div className="flex-grow space-y-2.5">
              <div 
                className="h-3.5 w-36 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-2.5 w-28 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-2.5 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
            </div>
          </div>

          {/* Card 3: Top Right */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs h-[150px] md:h-[130px] select-none">
            {/* Circle avatar centered */}
            <div 
              className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer mb-2.5 shrink-0" 
              style={{ backgroundSize: "200% 100%" }} 
            />
            {/* Centered lines stacked */}
            <div className="w-full flex flex-col items-center gap-2">
              <div 
                className="h-3 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-2 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
            </div>
          </div>

          {/* Card 4: Bottom Left */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-col gap-4 shadow-xs min-h-[220px] select-none justify-between">
            {/* Top row: small circle + text */}
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer shrink-0" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-3 w-28 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
            </div>
            {/* Middle: large block */}
            <div 
              className="h-28 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
              style={{ backgroundSize: "200% 100%" }} 
            />
            {/* Bottom: thin lines */}
            <div className="space-y-1.5 pt-1">
              <div 
                className="h-1 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div 
                className="h-1 w-5/6 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                style={{ backgroundSize: "200% 100%" }} 
              />
            </div>
          </div>

          {/* Card 5: Bottom Middle */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-col gap-4 shadow-xs min-h-[220px] select-none justify-center">
            {/* Large block */}
            <div 
              className="h-36 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
              style={{ backgroundSize: "200% 100%" }} 
            />
          </div>

          {/* Card 6: Bottom Right */}
          <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/70 dark:border-[#1E293B] rounded-2xl p-6 flex flex-col gap-4 shadow-xs min-h-[220px] select-none justify-between">
            {/* Large block at top */}
            <div 
              className="h-24 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
              style={{ backgroundSize: "200% 100%" }} 
            />
            {/* Bottom row: small circle on left, two bars on right */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
              <div 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer shrink-0" 
                style={{ backgroundSize: "200% 100%" }} 
              />
              <div className="flex-grow space-y-2">
                <div 
                  className="h-2.5 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                  style={{ backgroundSize: "200% 100%" }} 
                />
                <div 
                  className="h-2.5 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" 
                  style={{ backgroundSize: "200% 100%" }} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Styled text description matching the image typography */}
      <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F3ECE3] mt-8 tracking-tight select-none">
        Shimmer Loading Effect
      </h2>
    </div>
  );
}

export default ShimmerLoadingEffect;
