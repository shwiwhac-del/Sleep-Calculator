import React from "react";
import { Skeleton } from "./Skeleton";
import { AdPlaceholder } from "./AdPlaceholder";

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-2 mt-3 sm:mt-4 md:mt-5 mb-6 sm:mb-8 transition-all duration-300 w-full">
        {/* Title placeholder (2 lines responsive) */}
        <div className="space-y-2.5 w-full flex flex-col items-center">
          <Skeleton variant="rectangular" className="h-9 sm:h-11 md:h-12 w-11/12 max-w-2xl" />
          <Skeleton variant="rectangular" className="h-9 sm:h-11 md:h-12 w-8/12 max-w-md hidden sm:block" />
        </div>
        {/* Description placeholder (2 lines) */}
        <div className="space-y-2 mt-4 sm:mt-5 w-full flex flex-col items-center">
          <Skeleton variant="text" className="h-4.5 sm:h-5 w-10/12 max-w-xl" />
          <Skeleton variant="text" className="h-4.5 sm:h-5 w-8/12 max-w-md" />
        </div>
      </div>

      {/* Banner Ad Spot during skeleton state */}
      <AdPlaceholder id="skeleton-home-header-ad" slotName="Skeleton Home Main Banner" />

      {/* Calculator Inputs Card Skeleton */}
      <div className="w-full max-w-[28.75rem] mx-auto mb-4 relative px-2 sm:px-0">
        <div className="flex flex-col items-center w-full p-4 sm:p-5 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md">
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
