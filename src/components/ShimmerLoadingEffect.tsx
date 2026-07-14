import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";

// A reusable elegant shimmering skeleton block
interface SkeletonItemProps {
  className?: string;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({ className = "" }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700/80 dark:to-slate-800 animate-shimmer rounded ${className}`}
    style={{ backgroundSize: "200% 100%" }}
  />
);

export function ShimmerLoadingEffect() {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine active route type
  const isBlogIndex = pathname === "/blog" || pathname === "/blog/";
  const isBlogPost = pathname.startsWith("/blog/") && !isBlogIndex;
  
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isTerms = pathname === "/terms";
  const isPrivacy = pathname === "/privacy";

  // Calculator pages
  const isStudent = pathname === "/student-sleep-calculator";
  const isShiftWork = pathname === "/shift-work-sleep-calculator";
  const isNinetyMin = pathname === "/sleep-cycle-calculator-90-minutes";
  const isWakeUp = pathname === "/wake-up-between-sleep-cycles";
  const isIdealBedtime = pathname === "/ideal-bedtime-based-on-wake-up-time";
  const isHome = pathname === "/" || (!isBlogIndex && !isBlogPost && !isAbout && !isContact && !isTerms && !isPrivacy && !isStudent && !isShiftWork && !isNinetyMin && !isWakeUp && !isIdealBedtime);

  const isCalculator = isHome || isStudent || isShiftWork || isNinetyMin || isWakeUp || isIdealBedtime;

  // Exact page metadata mapping to avoid any text-popping or layout shifting
  let pageTitle = "Calculate Your Perfect Bedtime & Wake-Up Time";
  let pageSubtitle = "Optimize your rest using scientific 90-minute sleep cycles to wake up refreshed, energized, and ready for your day.";

  if (isStudent) {
    pageTitle = "Student Sleep Calculator";
    pageSubtitle = "Optimize your sleep schedule to boost focus and exam performance.";
  } else if (isShiftWork) {
    pageTitle = "Shift Work Sleep Calculator";
    pageSubtitle = "Plan optimal sleep blocks and power naps for irregular or night shift schedules.";
  } else if (isNinetyMin) {
    pageTitle = "90-Minute Sleep Calculator";
    pageSubtitle = "Fine-tune your sleep blocks using custom 90-minute intervals and fall-asleep latency.";
  } else if (isWakeUp) {
    pageTitle = "Wake Up Between Sleep Cycles";
    pageSubtitle = "Align your alarm precisely with the end of a sleep cycle to avoid morning grogginess.";
  } else if (isIdealBedtime) {
    pageTitle = "Ideal Bedtime Calculator Based on Wake-Up Time";
    pageSubtitle = "Calculate exactly what time you should shut your eyes to complete a healthy sleep.";
  } else if (isBlogIndex) {
    pageTitle = "Sleep Science Blog & Guides";
    pageSubtitle = "Expert knowledge, physiological research, and actionable tips to help you calculate your optimal sleep windows, reset your internal clock, and wake up energized.";
  } else if (isAbout) {
    pageTitle = "About Sleep Calculator";
    pageSubtitle = "Learn more about our mission, our advisory team, and our commitment to circadian science.";
  } else if (isContact) {
    pageTitle = "Contact Us";
    pageSubtitle = "Have questions or feedback? Reach out to our sleep science support team.";
  } else if (isTerms) {
    pageTitle = "Terms of Service";
    pageSubtitle = "Please read our terms of use before calculating your schedules.";
  } else if (isPrivacy) {
    pageTitle = "Privacy Policy";
    pageSubtitle = "How we protect and secure your sleep preferences and local usage data.";
  }

  // Render Page Skeleton depending on current path
  return (
    <div className="w-full animate-fade-in relative z-20 select-none pb-12">
      {/* 1. CALCULATOR PAGES LAYOUT */}
      {isCalculator && (
        <div className="w-full flex flex-col items-center">
          {/* Header Title Section */}
          <div className="flex flex-col items-center justify-center gap-2 text-center max-w-3xl mx-auto px-4 mt-3 sm:mt-4 md:mt-5 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight sm:leading-snug text-center">
              {pageTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#4B5563] dark:text-slate-300 max-w-[42rem] mx-auto font-medium leading-relaxed tracking-normal opacity-95 text-center">
              {pageSubtitle}
            </p>
          </div>

          {/* Header Ad Slot Shimmer */}
          <div className="w-full max-w-4xl px-4 mb-4">
            <div className="w-full h-[90px] border border-[#E1D8CC]/40 dark:border-[#1E293B]/40 bg-white/20 dark:bg-[#111827]/20 rounded-2xl flex items-center justify-center">
              <SkeletonItem className="h-4 w-36 rounded" />
            </div>
          </div>

          {/* Main Calculator Card Shimmer */}
          <div className="w-full max-w-[28.75rem] md:max-w-[42rem] mx-auto mb-8 px-4 sm:px-0">
            <div className="flex flex-col items-center w-full p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl shadow-xs space-y-6">
              
              {/* Home Mode Tabs Shimmer */}
              {isHome && (
                <div className="flex flex-row flex-nowrap bg-white/50 dark:bg-[#111827]/40 rounded-xl p-1.5 w-full gap-1 overflow-x-auto">
                  <div className="flex-1 py-4 bg-white dark:bg-[#111827] rounded-lg shadow-2xs border border-gray-100 dark:border-slate-800" />
                  <div className="flex-1 py-4 rounded-lg" />
                  <div className="flex-1 py-4 rounded-lg" />
                  <div className="flex-1 py-4 rounded-lg" />
                  <div className="flex-1 py-4 rounded-lg" />
                </div>
              )}

              {/* Input field 1 Shimmer */}
              <div className="w-full flex flex-col items-center space-y-2">
                <SkeletonItem className="h-3.5 w-40 rounded" />
                <SkeletonItem className="h-12 w-full max-w-md rounded-xl" />
              </div>

              {/* Input field 2 Shimmer */}
              <div className="w-full flex flex-col items-center space-y-2 pt-1">
                <SkeletonItem className="h-3.5 w-48 rounded" />
                <SkeletonItem className="h-12 w-full max-w-md rounded-xl" />
              </div>

              {/* Action Button Shimmer */}
              <div className="w-full max-w-md pt-2">
                <SkeletonItem className="h-12 w-full rounded-2xl bg-violet-200 dark:bg-violet-900/30" />
              </div>
            </div>
          </div>

          {/* Science Guide / Recommended reading Shimmer */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-8 space-y-6">
            <div className="text-center">
              <SkeletonItem className="h-7 w-56 mx-auto mb-3" />
              <SkeletonItem className="h-4 w-96 mx-auto mb-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/60 dark:border-[#1E293B] rounded-2xl p-6 space-y-4">
                <SkeletonItem className="h-5 w-1/2" />
                <div className="space-y-2">
                  <SkeletonItem className="h-3 w-full" />
                  <SkeletonItem className="h-3 w-11/12" />
                  <SkeletonItem className="h-3 w-4/5" />
                </div>
              </div>
              <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/60 dark:border-[#1E293B] rounded-2xl p-6 space-y-4">
                <SkeletonItem className="h-5 w-2/3" />
                <div className="space-y-2">
                  <SkeletonItem className="h-3 w-full" />
                  <SkeletonItem className="h-3 w-11/12" />
                  <SkeletonItem className="h-3 w-3/4" />
                </div>
              </div>
              <div className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC]/60 dark:border-[#1E293B] rounded-2xl p-6 space-y-4">
                <SkeletonItem className="h-5 w-1/3" />
                <div className="space-y-2">
                  <SkeletonItem className="h-3 w-full" />
                  <SkeletonItem className="h-3 w-5/6" />
                  <SkeletonItem className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BLOG INDEX PAGE LAYOUT */}
      {isBlogIndex && (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          {/* Back to Calculator button */}
          <div className="flex justify-start mb-6">
            <button className="inline-flex items-center gap-2 text-base text-[#6B7280] font-semibold tracking-wide">
              <ArrowLeft size={18} /> Back to Calculator
            </button>
          </div>

          {/* Header Title Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-tight font-serif">
              Sleep Science <span className="text-[#7C3AED]">Blog &amp; Guides</span>
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed font-medium">
              {pageSubtitle}
            </p>
          </div>

          {/* Ad banner Shimmer */}
          <div className="w-full h-[90px] border border-[#E1D8CC]/40 dark:border-[#1E293B]/40 bg-white/20 dark:bg-[#111827]/20 rounded-2xl flex items-center justify-center mb-8">
            <SkeletonItem className="h-4 w-36 rounded" />
          </div>

          {/* Grid of Blog Posts (6 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex flex-col bg-white dark:bg-[#151C2C] border border-[#E5E7EB] dark:border-[#1E293B] rounded-2xl p-6 h-[260px] relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4">
                  <SkeletonItem className="h-4 w-16" />
                  <SkeletonItem className="h-4 w-20" />
                </div>
                <SkeletonItem className="h-6 w-full mb-2" />
                <SkeletonItem className="h-6 w-4/5 mb-4" />
                <div className="space-y-2">
                  <SkeletonItem className="h-3 w-full" />
                  <SkeletonItem className="h-3 w-11/12" />
                  <SkeletonItem className="h-3 w-5/6" />
                </div>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <SkeletonItem className="h-4 w-24 rounded" />
                  <SkeletonItem className="h-4 w-4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BLOG POST DETAIL LAYOUT */}
      {isBlogPost && (
        <div className="w-full max-w-3xl mx-auto px-4 py-6 text-left">
          {/* Breadcrumb line & Back to Calculator button */}
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <SkeletonItem className="h-3.5 w-16" />
              <span className="text-gray-300 dark:text-slate-700">/</span>
              <SkeletonItem className="h-3.5 w-16" />
              <span className="text-gray-300 dark:text-slate-700">/</span>
              <SkeletonItem className="h-3.5 w-32" />
            </div>
            <button className="inline-flex items-center gap-2 text-base text-[#6B7280] font-semibold tracking-wide">
              <ArrowLeft size={18} /> Back to Calculator
            </button>
          </div>

          {/* Ad Space */}
          <div className="w-full h-[90px] border border-[#E1D8CC]/40 dark:border-[#1E293B]/40 bg-white/20 dark:bg-[#111827]/20 rounded-2xl flex items-center justify-center mb-8">
            <SkeletonItem className="h-4 w-36 rounded" />
          </div>

          {/* Article Header */}
          <div className="space-y-4">
            <SkeletonItem className="h-5 w-24 rounded-full bg-violet-100 dark:bg-violet-950/40" />
            <SkeletonItem className="h-10 w-full" />
            <SkeletonItem className="h-10 w-5/6" />
            
            {/* Author details block */}
            <div className="flex items-center gap-3 pt-4 pb-6 border-b border-gray-150 dark:border-slate-800">
              <SkeletonItem className="w-12 h-12 rounded-full shrink-0" />
              <div className="space-y-2">
                <SkeletonItem className="h-4 w-36" />
                <SkeletonItem className="h-3 w-56" />
              </div>
            </div>
          </div>

          {/* Article Body Content Skeletons */}
          <div className="mt-8 space-y-6">
            <SkeletonItem className="h-6 w-48 font-serif" />
            <div className="space-y-3">
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-11/12" />
              <SkeletonItem className="h-4 w-5/6" />
            </div>

            <SkeletonItem className="h-[280px] w-full rounded-2xl bg-gray-100/50 dark:bg-slate-800/30" />

            <SkeletonItem className="h-6 w-60 font-serif" />
            <div className="space-y-3">
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-11/12" />
              <SkeletonItem className="h-4 w-2/3" />
            </div>

            <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border-2 border-dashed border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#D4AF37]" />
                <SkeletonItem className="h-4 w-40" />
              </div>
              <SkeletonItem className="h-4 w-5/6" />
              <SkeletonItem className="h-10 w-48 rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {/* 4. UTILITY & STATIC PAGES LAYOUT (About, Contact, Terms, Privacy) */}
      {(isAbout || isContact || isTerms || isPrivacy) && (
        <div className="w-full max-w-3xl mx-auto px-4 py-8 text-left">
          {/* Header Title Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-tight font-serif">
              {pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed font-medium">
              {pageSubtitle}
            </p>
          </div>

          {/* Standard Content Blocks */}
          <div className="space-y-8 mt-10">
            <div className="space-y-3">
              <SkeletonItem className="h-6 w-48 font-serif mb-2" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-11/12" />
              <SkeletonItem className="h-4 w-5/6" />
            </div>

            <div className="space-y-3">
              <SkeletonItem className="h-6 w-36 font-serif mb-2" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-3/4" />
            </div>

            <div className="space-y-3">
              <SkeletonItem className="h-6 w-56 font-serif mb-2" />
              <SkeletonItem className="h-4 w-full" />
              <SkeletonItem className="h-4 w-11/12" />
              <SkeletonItem className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShimmerLoadingEffect;
