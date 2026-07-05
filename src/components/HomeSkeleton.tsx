import React from "react";
import { useLocation } from "react-router-dom";
import { Skeleton } from "./Skeleton";
import { AdPlaceholder } from "./AdPlaceholder";

export const HomeSkeleton: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const getHeaderInfo = (path: string) => {
    switch (path) {
      case "/ideal-bedtime-based-on-wake-up-time":
        return {
          title: "Calculate Your Ideal Bedtime",
          description: "Find your perfect science-backed bedtime based on your desired wake-up time.",
          adId: "ideal-header-ad",
          isHome: false,
        };
      case "/sleep-cycle-calculator-90-minutes":
        return {
          title: "90-Minute Sleep Calculator",
          description: "Align your rest with natural 90-minute cycle boundaries to wake up energized.",
          adId: "ninety-header-ad",
          isHome: false,
        };
      case "/shift-work-sleep-calculator":
        return {
          title: "Shift Work Sleep Calculator",
          description: "Calculate custom daytime sleep cycles to beat night shift fatigue.",
          adId: "shift-header-ad",
          isHome: false,
        };
      case "/student-sleep-calculator":
        return {
          title: "Student Sleep Calculator",
          description: "Optimize your sleep schedule to boost focus and exam performance.",
          adId: "student-header-ad",
          isHome: false,
        };
      case "/wake-up-between-sleep-cycles":
        return {
          title: "Wake Up Between Sleep Cycles",
          description: "Calculate perfect alarm times to wake up refreshed and prevent fatigue.",
          adId: "wake-cycles-header-ad",
          isHome: false,
        };
      default:
        return {
          title: "Calculate Your Perfect Bedtime & Wake-Up Time",
          description: "Optimize your rest using scientific 90-minute sleep cycles to wake up refreshed, energized, and ready for your day.",
          adId: "home-header-ad",
          isHome: true,
        };
    }
  };

  const headerInfo = getHeaderInfo(path);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section - Static Text matched exactly to each subpage to prevent flash and shift */}
      {headerInfo.isHome ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center max-w-3xl mx-auto px-2 mt-3 sm:mt-4 md:mt-5 mb-6 sm:mb-8 transition-all duration-300 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight sm:leading-snug text-center font-serif">
            {headerInfo.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#4B5563] dark:text-slate-300 max-w-[42rem] mx-auto font-medium leading-relaxed tracking-normal opacity-95">
            {headerInfo.description}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-center w-full max-w-full px-2 mt-0 mb-3 transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] dark:text-white leading-tight font-serif text-center w-full max-w-5xl mx-auto">
            {headerInfo.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4B5563] dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed tracking-normal opacity-90 text-center px-4">
            {headerInfo.description}
          </p>
        </div>
      )}

      {/* Banner Ad Spot during skeleton state with matched dynamic ID */}
      <AdPlaceholder id={headerInfo.adId} slotName="Skeleton Header Banner" />

      {/* Calculator Inputs Card Skeleton */}
      <div className="w-full max-w-[28.75rem] md:max-w-[42rem] mx-auto mb-4 relative px-2 sm:px-0">
        <div className="flex flex-col items-center w-full p-4 sm:p-5 bg-[#FAF6F0] dark:bg-[#151C2C] rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B] shadow-xs">
          {/* Tabs skeleton: 4 or 5 rounded pills */}
          <div className="flex flex-row flex-nowrap bg-gray-50 dark:bg-[#111827] rounded-xl p-1.5 w-full mb-4 gap-1 overflow-x-auto scrollbar-none">
            <Skeleton variant="pill" className="h-8.5 flex-1 shrink-0 min-w-[5rem]" />
            <Skeleton variant="pill" className="h-8.5 flex-1 shrink-0 min-w-[5rem]" />
            <Skeleton variant="pill" className="h-8.5 flex-1 shrink-0 min-w-[5rem]" />
            <Skeleton variant="pill" className="h-8.5 flex-1 shrink-0 min-w-[5rem]" />
          </div>

          {/* Time Picker block skeleton */}
          <div className="flex flex-col items-center justify-center w-full mb-5">
            {/* Round/Oval Clock Input Skeleton */}
            <Skeleton variant="rectangular" className="h-16 w-full max-w-[13.75rem] rounded-xl" />
          </div>

          {/* Age selection block skeleton */}
          <div className="flex flex-col items-center w-full mb-5">
            <Skeleton variant="text" className="h-3 w-28 mb-2.5 uppercase tracking-widest" />
            <Skeleton variant="rectangular" className="h-11 w-full max-w-[11rem] rounded-xl" />
          </div>

          {/* CTA Calculate Button skeleton */}
          <div className="w-full flex justify-center mt-2 mb-1">
            <Skeleton variant="pill" className="h-13 sm:h-14 w-full max-w-[18.25rem] sm:max-w-[20rem]" />
          </div>
        </div>
      </div>

      {/* Below-the-fold content skeleton */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 space-y-12 sm:space-y-16 mt-6 sm:mt-10">
        {/* QuickSleepTips Section Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton variant="rectangular" className="h-8 w-60 rounded-lg" />
            <Skeleton variant="text" className="h-4 w-96 max-w-full" />
          </div>
          {/* Advice cards grid skeleton (3 columns on desktop, 1 on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-850 rounded-2xl shadow-sm space-y-3">
              <Skeleton variant="circular" className="h-11 w-11" />
              <Skeleton variant="rectangular" className="h-6 w-3/4 rounded-md" />
              <Skeleton variant="text" className="h-3.5 w-full" />
              <Skeleton variant="text" className="h-3.5 w-5/6" />
            </div>
            <div className="p-4 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-850 rounded-2xl shadow-sm space-y-3">
              <Skeleton variant="circular" className="h-11 w-11" />
              <Skeleton variant="rectangular" className="h-6 w-2/3 rounded-md" />
              <Skeleton variant="text" className="h-3.5 w-full" />
              <Skeleton variant="text" className="h-3.5 w-4/5" />
            </div>
            <div className="p-4 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-850 rounded-2xl shadow-sm space-y-3">
              <Skeleton variant="circular" className="h-11 w-11" />
              <Skeleton variant="rectangular" className="h-6 w-5/6 rounded-md" />
              <Skeleton variant="text" className="h-3.5 w-full" />
              <Skeleton variant="text" className="h-3.5 w-11/12" />
            </div>
          </div>
        </div>

        {/* SleepJournal Section Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton variant="rectangular" className="h-8 w-56 rounded-lg" />
            <Skeleton variant="text" className="h-4 w-80 max-w-full" />
          </div>
          <div className="p-5 sm:p-6 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-850 rounded-2xl shadow-sm space-y-4">
            <Skeleton variant="rectangular" className="h-28 w-full rounded-xl" />
            <div className="flex justify-end">
              <Skeleton variant="pill" className="h-10 w-28" />
            </div>
          </div>
        </div>

        {/* FAQs and Info Section Skeleton */}
        <div className="space-y-5">
          <div className="space-y-2.5">
            <Skeleton variant="rectangular" className="h-8 w-80 max-w-full rounded-lg" />
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-5/6" />
          </div>

          {/* Links grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-850 flex items-center justify-between">
                <div className="space-y-2 w-3/4">
                  <Skeleton variant="rectangular" className="h-5 w-44 rounded-md" />
                  <Skeleton variant="text" className="h-3 w-32" />
                </div>
                <Skeleton variant="circular" className="h-8 w-8" />
              </div>
            ))}
          </div>

          {/* FAQ list Accordions skeleton */}
          <div className="pt-6 space-y-3">
            <Skeleton variant="rectangular" className="h-8 w-64 mx-auto rounded-lg mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-850 flex justify-between items-center h-14">
                <Skeleton variant="rectangular" className="h-5 w-2/3 rounded-md" />
                <Skeleton variant="circular" className="h-6 w-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
