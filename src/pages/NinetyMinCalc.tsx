import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Hourglass, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";
import HomeSkeleton from "../components/HomeSkeleton";
import { AdPlaceholder } from "../components/AdPlaceholder";

export default function NinetyMinCalc() {
  const canonicalUrl = getCanonicalUrl("/sleep-cycle-calculator-90-minutes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const AGE_GROUPS = [
    { id: "0-3m", label: "0-3 Months", minCycles: 9, maxCycles: 11 },
    { id: "4-11m", label: "4-11 Months", minCycles: 8, maxCycles: 10 },
    { id: "1-2y", label: "1-2 Years", minCycles: 7, maxCycles: 9 },
    { id: "3-5y", label: "3-5 Years", minCycles: 6, maxCycles: 8 },
    { id: "6-12y", label: "6-12 Years", minCycles: 6, maxCycles: 7 },
    { id: "13-17", label: "13-17 Years", minCycles: 5, maxCycles: 7 },
    { id: "18-25", label: "18-25 Years", minCycles: 5, maxCycles: 6 },
    { id: "26-40", label: "26-40 Years", minCycles: 5, maxCycles: 6 },
    { id: "41-64", label: "41-64 Years", minCycles: 5, maxCycles: 6 },
    { id: "65+", label: "65+ Years", minCycles: 4, maxCycles: 6 },
  ];

  const [wakeTime, setWakeTime] = useState("07:00");
  const [ageGroup, setAgeGroup] = useState("18-25");
  const [latency, setLatency] = useState(15); // Standard bedtime fall asleep latency
  const [results, setResults] = useState<{ count: number; time: Date; label: string; healthy: boolean }[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Calculate standard 90 minute sleep cycles
  const calculateBedtimes = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const targetWake = new Date();
    targetWake.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (targetWake.getTime() <= now.getTime()) {
      targetWake.setDate(targetWake.getDate() + 1);
    }

    const cycleLength = 90; // Standard scientific average cycle length

    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup) || AGE_GROUPS[6];
    const cyclesToGenerate = [];
    const maxC = ageConfig.maxCycles;
    for (let i = maxC; i >= Math.max(3, ageConfig.minCycles - 2); i--) {
      cyclesToGenerate.push(i);
    }

    // List of multiple cycle options dynamically generated
    const options = cyclesToGenerate.map((c) => {
      const minutesToSubtract = c * cycleLength + latency;
      const bTime = new Date(targetWake.getTime() - minutesToSubtract * 60000);
      
      let label = "Underrested Bedtime";
      let healthy = false;
      if (c >= ageConfig.minCycles && c <= ageConfig.maxCycles) {
        label = "Perfect Rest (Recommended)";
        healthy = true;
      } else if (c === ageConfig.minCycles - 1) {
        label = "Healthy Minimum Sleep";
        healthy = true;
      }

      return {
        count: c,
        time: bTime,
        label,
        healthy,
      };
    });

    setResults(options);
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = String(minutes).padStart(2, "0");
    return `${hours}:${minutesStr} ${ampm}`;
  };

  useEffect(() => {
    calculateBedtimes();
  }, [wakeTime, latency, ageGroup]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="ninety-calculator-root">
        <Helmet>
          <title>Sleep Cycle Calculator 90 Minutes | Waking Up Fresh</title>
          <meta
            name="description"
            content="Calculate sleep cycles based on the 90-minute formula. Schedule exact bedtime slots using our interactive sleep cycle calculator for maximum mental focus."
          />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="ninety-calculator-root">
      <Helmet>
        <title>Sleep Cycle Calculator 90 Minutes | Waking Up Fresh</title>
        <meta
          name="description"
          content="Calculate sleep cycles based on the 90-minute formula. Schedule exact bedtime slots using our interactive sleep cycle calculator for maximum mental focus."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Breadcrumbs - Clean and Simple */}
      <div className="mb-8 flex items-center text-xs sm:text-sm text-[#6B7280]" id="ninety-breadcrumb">
        <div className="flex items-center gap-1.5 font-sans">
          <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="font-semibold text-gray-700">90-Minute Sleep Calculator</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-8" id="ninety-header">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-3">
          90-Minute Sleep Cycle Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Align your bedtimes mathematically with natural sleep staging boundaries to end grogginess.
        </p>
      </div>

      {/* Banner Ad Spot below main heading */}
      <AdPlaceholder id="ninety-header-ad" slotName="90-Min Page Banner" />

      {/* Styled card container for the tool itself */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md shadow-neutral-100 mb-12" id="ninety-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Controls Side */}
          <div className="space-y-6 flex flex-col justify-center" id="ninety-controls">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                1. When do you need to wake up?
              </label>
              <TimePicker value={wakeTime} onChange={setWakeTime} mode="wake" />
            </div>

            {/* Age group dropdown selection */}
            <div className="flex flex-col items-start w-full z-20">
              <label htmlFor="age-select" className="text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-1.5 block">
                Select Your Age
              </label>
              <div className="w-full relative group">
                <select
                  id="age-select"
                  value={ageGroup}
                  onChange={(e) => {
                    setAgeGroup(e.target.value);
                  }}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl py-2.5 pl-4 pr-10 transition-all duration-300 shadow-sm text-sm sm:text-base font-bold text-[#374151] cursor-pointer hover:border-gray-300 outline-none appearance-none"
                >
                  {AGE_GROUPS.map((g) => (
                    <option key={g.id} value={g.id} className="bg-white text-left text-gray-900 font-medium">
                       {g.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                2. Select Fall Asleep Delay (Latency)
              </label>
              <div className="grid grid-cols-3 gap-2" id="ninety-latency-toggle">
                {[10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    id={`btn-latency-${mins}`}
                    onClick={() => setLatency(mins)}
                    className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-semibold text-center transition-all cursor-pointer ${
                      latency === mins
                        ? "border-[#7C3AED] bg-[#7C3AED]/10 text-neutral-900 font-bold"
                        : "border-neutral-200 bg-transparent text-neutral-603 hover:border-neutral-400"
                    }`}
                  >
                    {mins} Minutes
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-2 italic text-center">
                Determines how long you lie in bed before starting your first cycle.
              </p>
            </div>
          </div>

          {/* Results Side */}
          <div className="flex flex-col justify-between space-y-6" id="ninety-results">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-neutral-200 pb-2">
                Calculated Bedtime Windows
              </h3>

              <div className="space-y-5" id="ninety-options-list">
                {results.map((res, i) => (
                  <div
                    key={res.time.toISOString() + res.count}
                    className="border-b border-neutral-200/65 pb-4"
                    id={`ninety-item-${i}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-neutral-100">
                      <div>
                        <div className="text-[11px] text-[#6B7280] font-mono uppercase tracking-wider font-bold">
                          Go to bed at:
                        </div>
                        <div className="text-3xl font-black text-[#7C3AED] mt-0.5">
                          {formatTime(res.time)}
                        </div>
                      </div>

                      <div className="font-sans text-sm text-gray-800">
                        <span className="font-bold font-mono text-[#111827]">{res.count} Cycles</span> ({Number((res.count * 1.5).toFixed(1))}h sleep)
                        {res.healthy && (
                          <span className="ml-2 inline-block bg-emerald-500/10 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#7C3AED]/5 p-4 border-l-2 border-[#7C3AED] text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-3 flex-row">
              <Hourglass className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">Rhythm Optimization:</span> Sacrificing sleep is less destructive than waking mid-cycle. Waking up during an active transition stage preserves alertness metrics.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RICH DEEP WORD KNOWLEDGE BASE */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="ninety-seo-article">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The 90-Minute Sleep Cycle Formula: Mathematical Staging of Human Rest
            </h2>
          </header>
          <p>
            When we discuss biological human recovery, we must dissect the concept of sleep duration. For decades, popular fitness literature hammered the idea that humans require a flat "eight hours of sleep" per night. While sleep length is certainly important, sleep scientists recognize a far more critical variable: <strong>the natural division of sleep stages into structured 90-minute periods</strong>.
          </p>
          <p>
            A sleep cycle represents a complete progression across four distinct biological stages: Light sleep onset (N1), intermediate spindle sleep (N2), deep slow-wave delta sleep (N3), and the rapid eye movement (REM) dreaming cycle. The average healthy adult progresses through these states in approximately 90 minutes. This is standard research supported by the <Link to="/ideal-bedtime-based-on-wake-up-time" className="text-[#7C3AED] font-semibold hover:underline bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">Ideal Bedtime Calculator parameters</Link>.
          </p>
          <p>
            Waking up in the middle of N3 deep sleep results in <strong>sleep inertia</strong>—characterized by mental lethargy, impaired fine motor skills, and morning brain fog. Our interactive 90-minute sleep calculator utilizes this mathematical formula to align alarm targets with cycle boundaries, helping users wake up feeling alert and refreshed.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Ultradian Loop: Decoding the Physiology of Waking & Dreaming
            </h2>
          </header>
          <p>
            To understand the 90-minute formula, let us explore the biological milestones that define each sleep stage within this structured loop:
          </p>
          <div className="space-y-4 my-4">
            <p>
              <strong className="text-[#111827]">Stage 1 (NREM 1 - ~10 mins):</strong> Alpha brain waves transition to slow theta waves. Muscles relax, and sensory awareness fades. It is a light transition state.
            </p>
            <p>
              <strong className="text-[#111827]">Stage 2 (NREM 2 - ~25 mins):</strong> Marked by the appearance of sleep spindles and K-complexes. This stage represents a biological gateway to deep rest, helping with motor skill consolidation.
            </p>
            <p>
              <strong className="text-[#111827]">Stage 3 (NREM 3 - ~35 mins):</strong> Deep slow-wave sleep. Heart rate and blood pressure drop to their daily lows. The brain produces slow, high-amplitude delta waves, focusing resources on cellular repair and immune strengthening, as outlined in studies published on the <a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">CDC health directory</a>.
            </p>
            <p>
              <strong className="text-[#111827]">REM Dreaming Sleep (Stage 4 - ~20 mins):</strong> Rapid eye movements, high brainwave activity, and muscular paralysis. Active visual dream loops occur. Waking up directly out of REM sleep can trigger spatial confusion.
            </p>
          </div>
          <p>
            The proportions of these stages shift across the night. Your first two sleep cycles of the night are dominated by Stage 3 Deep sleep, satisfying your physical recovery needs. Your later cycles are dominated by REM and Stage 2 sleep, supporting creative cognition, logic synthesis, and mood regulation. If you cut your sleep short, you disproportionately sacrifice critical REM sleep hours. For student schedule optimization, please see our dedicated <Link to="/student-sleep-calculator" className="text-[#7C3AED] font-semibold hover:underline">Student Sleep Calculator</Link>.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Compounding Effect of Sleep Debt & Circadian Disruption
            </h2>
          </header>
          <p>
            Every time we wake up mid-cycle or miss sleep hours, we accumulate a biological <strong>sleep debt</strong>. This is not a harmless metric. Consistent sleep deprivation impairs the prefrontal cortex—the brain region responsible for planning, working memory, emotional control, and executive decision-making. Waking up during an active transition phase rather than N3 deep sleep keeps you alert, allowing quick access to studied material.
          </p>
          <p>
            Sleep debt also leads to cortisol spikes (the primary stress hormone), which can cause insulin resistance, system-level inflammation, and cardiovascular strain. Aligning your rest with the 90-minute sleep cycle helps optimize sleep efficiency, allowing your body to progress through healthy sleep cycles even on shorter schedules instead of suffering from split phases like some workers do on <Link to="/shift-work-sleep-calculator" className="text-[#7C3AED] hover:underline">Night Shifts</Link>.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Sleep Latency & Wind Down: Engineering the Transition State
            </h2>
          </header>
          <p>
            A common mistake when using a sleep cycle calculator is ignoring <strong>sleep latency</strong>—the duration of time it takes to transition from active wakefulness to light sleep. Most adults require 15 to 20 minutes to drift off. Failing to account for this delay shifts your sleep cycles, causing your alarm to go off mid-cycle instead of during a natural transition window, which can trigger the grogginess symptoms we discuss on our interactive <Link to="/wake-up-between-sleep-cycles" className="text-[#7C3AED] font-semibold hover:underline">Wake Up Between Cycles Guide</Link>.
          </p>
          <p>
            <strong>Tips to Optimize Your Sleep Onset:</strong> Avoid looking at digital displays for at least 60 minutes before bedtime, choose relaxing activities like reading a book or listening to ambient music, and keep your bedroom dark and chilled to signal your brain that it is time to access deep sleep. Learn more on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">National Sleep Foundation</a> website.
          </p>
        </section>

        {/* SECTION 5 - FAQs */}
        <section className="space-y-6 mb-12">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Circadian Rhythm & Sleep Staging FAQ
            </h2>
          </header>
          
          <div className="space-y-4">
            {[
              {
                q: "What exactly is sleep inertia, and how long does it typically last?",
                a: "Sleep inertia is the groggy feeling of confusion and slowed coordination experienced upon waking up directly from N3 deep sleep. It can last from 30 minutes to over two hours, during which your cognitive performance is temporarily degraded. Waking up at the end of a 90-minute cycle avoids this state entirely."
              },
              {
                q: "What should I do if my sleep latency is consistently over 30 minutes?",
                a: "A sleep latency of over 30 minutes often indicates high evening cortisol or excessive screen exposure. Establish a dedicated evening wind-down routine, limit caffeine in the afternoon, and try relaxing breathing techniques to help transition to sleep. Read more sleep tips on our home dashboard."
              },
              {
                q: "Does everyone have an exact 90-minute sleep cycle?",
                a: "No, 90 minutes is the scientific average for adults. Sleep cycles typically slice from 80 to 110 minutes depending on genetics, age, and sleep debt. However, using the standard 90-minute formula provides a highly effective baseline for most users to optimize their sleep schedules."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl overflow-hidden shadow-xs transition-all duration-300 hover:border-[#7C3AED]"
                  id={`faq-item-${index}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-[#111827] hover:bg-[#FCFAF7] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="text-base font-bold text-[#111827] pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#7C3AED] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden border-t border-[#E1D8CC]"
                      >
                        <p className="p-4 sm:p-5 text-xs sm:text-sm text-[#374151] leading-relaxed bg-[#FAF6F0] select-text">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </article>

    </div>
  );
}
