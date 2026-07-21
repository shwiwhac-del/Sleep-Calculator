import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";
import { AdPlaceholder } from "../components/AdPlaceholder";
import RecommendedSleepGuides from "../components/RecommendedSleepGuides";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { OpenGraphTags } from "../components/OpenGraphTags";
import { useLanguage } from "../hooks/useLanguage";

export default function WakeUpCalc() {
  const { t } = useLanguage();
  const canonicalUrl = getCanonicalUrl("/wake-up-between-sleep-cycles");

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

  const [targetTime, setTargetTime] = useState("23:00");
  const [ageGroup, setAgeGroup] = useState("18-25");
  const [latency, setLatency] = useState(15);
  const [results, setResults] = useState<{ cycle: number; time: Date; score: number; text: string; optimal: boolean }[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate clean wake-up alarm times to wake up between 90-minute sleep cycles
  const calculateAlarms = () => {
    const baseTime = new Date();
    const [hours, minutes] = targetTime.split(":").map(Number);
    baseTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    if (baseTime.getTime() < now.getTime() - 12 * 60 * 60 * 1000) {
      baseTime.setDate(baseTime.getDate() + 1);
    }

    const suggestions: typeof results = [];
    const cycleTime = 90;

    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup) || AGE_GROUPS[6];
    const cyclesToGenerate = [];
    const maxC = ageConfig.maxCycles;
    for (let i = maxC; i >= Math.max(3, ageConfig.minCycles - 2); i--) {
      cyclesToGenerate.push(i);
    }

    // Test healthy cycles dynamically generated
    cyclesToGenerate.forEach((c) => {
      const totalMinutes = c * cycleTime + latency;
      const targetWakeTime = new Date(baseTime.getTime() + totalMinutes * 60000);
      
      let score = 50;
      let text = "Abbreviated Rest";
      let optimal = false;

      if (c >= ageConfig.minCycles && c <= ageConfig.maxCycles) {
        score = c === ageConfig.maxCycles ? 95 : 98;
        text = "Perfect Rest Target";
        optimal = true;
      } else if (c === ageConfig.minCycles - 1) {
        score = 80;
        text = "Sufficient Rest";
        optimal = false;
      } else if (c > ageConfig.maxCycles) {
        score = 90;
        text = "Deep Recovery Stage";
        optimal = true;
      }

      suggestions.push({
        cycle: c,
        time: targetWakeTime,
        score,
        text,
        optimal,
      });
    });

    setResults(suggestions);
    setShowResults(true);
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

  const handleCopy = () => {
    if (results.length === 0) return;
    const text = results
      .map(
        (res) =>
          `• ${formatTime(res.time)} (${res.cycle} Cycles - ${Number((res.cycle * 1.5).toFixed(1))}h sleep)${res.optimal ? " [Optimal]" : ""}`
      )
      .join("\n");
    navigator.clipboard.writeText(`My Recommended Wake-up Alarms (Bedtime: ${targetTime}):\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-1 pb-8 sm:pb-12" id="wake-cycles-calculator-root">
      <OpenGraphTags
        faqs={[
          {
            q: "Why do progressive sunrise alarms help compared to loud beeping alarms?",
            a: "Loud, abrasive alarms cause a sudden surge in heart rate and blood pressure, triggering a stress response. Progressive sunrise alarms emit a gradual glow that stimulates cortisol production and suppresses melatonin, supporting a natural and healthy waking process."
          },
          {
            q: "What should I do if my sleep partners have different schedules?",
            a: "Focus on managing what you can control. Use comfortable silent vibrating wearables for alarms, optimize your sleeping environment to prevent light-and-sound seepage, and try using dim reading lights to respect each other's schedules."
          },
          {
            q: "Does hitting 'snooze' help when waking up groggy?",
            a: "No, hitting snooze is highly counterproductive. This brief 5 or 9-minute window triggers a new sleep cycle that is quickly interrupted, worsening sleep inertia and leaving you feeling more fatigued. Try placing your alarm across the room to encourage immediate physical movement on waking, allowing light to naturally stimulate you."
          }
        ]}
      />

      {/* Header Title */}
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-center w-full max-w-full px-2 mt-0 mb-3 transition-all duration-300" id="wake-cycles-header">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] dark:text-white leading-tight font-serif text-center w-full max-w-5xl mx-auto">
          {t('calculators.wakeUp.title')}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#4B5563] dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed tracking-normal opacity-90 text-center px-4">
          {t('calculators.wakeUp.subtitle')}
        </p>
      </div>

      {/* Banner Ad Spot below main heading */}
      <AdPlaceholder id="wake-cycles-header-ad" slotName="Wake Up Page Banner" />

      <AnimatePresence mode="wait" initial={false}>
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] md:max-w-[42rem] mx-auto mb-4 relative px-2 sm:px-0"
            id="wake-cycles-widget"
          >
            <div className="flex flex-col items-center w-full p-4 sm:p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl shadow-xs">
              {/* Lights Off Bedtime selection */}
              <div className="w-full flex flex-col items-center mb-5">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  1. What time will you turn off the lights?
                </label>
                <TimePicker value={targetTime} onChange={setTargetTime} mode="bed" />
              </div>

              {/* Age group dropdown selection */}
              <div className="flex flex-col items-center w-full mb-5 z-20">
                <label htmlFor="age-select" className="text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-1.5 block text-center">
                  Select Your Age
                </label>
                <div className="w-full max-w-[11rem] relative group mx-auto">
                  <select
                    id="age-select"
                    value={ageGroup}
                    onChange={(e) => {
                      setAgeGroup(e.target.value);
                    }}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl py-2.5 pl-4 pr-8 transition-all duration-300 shadow-sm text-sm sm:text-base font-bold text-[#374151] cursor-pointer hover:border-gray-300 outline-none appearance-none text-center"
                  >
                    {AGE_GROUPS.map((g) => (
                      <option key={g.id} value={g.id} className="bg-white text-left text-gray-900 font-medium">
                         {g.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fall Asleep Latency */}
              <div className="w-full mb-5 flex flex-col items-center">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  2. Select Fall Asleep Latency (Delay)
                </label>
                <div className="grid grid-cols-3 gap-2 w-full max-w-[18.25rem] sm:max-w-[20rem]" id="wake-latency-toggle">
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
                      {mins} Min
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-550 mt-2 text-center italic">
                  How long you lie in bed before starting your first cycle.
                </p>
              </div>

              {/* Calculate Button */}
              <div className="w-full flex justify-center mt-3">
                <button
                  onClick={calculateAlarms}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] rounded-full py-3.5 px-7 sm:py-4 sm:px-8 font-extrabold text-[#FFFFFF] text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center"
                >
                  Calculate Wake Alarms
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="calculator-results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] md:max-w-[38rem] mx-auto flex flex-col items-center mb-4 px-2"
            id="wake-cycles-results"
          >
            <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 dark:text-gray-100 text-center tracking-tight">
                  Optimal Alarm Alignments
                </h2>
              </div>

              <div className="w-full flex flex-col gap-2 select-text" id="wake-options-list">
                {results.map((res, index) => (
                  <div
                    key={index}
                    className={`group flex items-center justify-between py-3.5 px-5 rounded-2xl border transition-all duration-300 hover:shadow-sm ${
                      res.optimal
                        ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 dark:border-[#7C3AED]/50 dark:bg-[#7C3AED]/10 dark:hover:bg-[#7C3AED]/15"
                        : "border-[#E1D8CC] dark:border-[#1E293B] bg-[#FAF6F0] dark:bg-[#151C2C] hover:bg-[#FCFAF7] dark:hover:bg-[#1E293B]"
                    }`}
                  >
                    <div className="flex flex-col relative z-10">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-none mb-1.5 flex items-center gap-1.5">
                        {formatTime(res.time)}
                      </span>
                      <span className="text-[#374151] dark:text-slate-300 text-xs sm:text-sm font-bold">
                        {res.cycle} sleep cycles ({Number((res.cycle * 1.5).toFixed(1))}h sleep)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 ml-2 relative z-10 flex-shrink-0">
                      {res.optimal && (
                        <span className="inline-flex items-center text-xs sm:text-sm font-extrabold text-[#7C3AED] bg-[#7C3AED]/15 px-3 py-1.5 rounded-lg tracking-wider">
                          Suggested
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="bg-[#7C3AED]/5 p-4 border-l-2 border-[#7C3AED] text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-3 rounded-r-xl mt-6">
                <Activity className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Waking Fresh Tip:</span> Morning grogginess is caused by waking during N3 deep slow-wave sleep. Aligning alarms with standard 90-minute cycle segments ensures you wake up feeling alert and ready to tackle the day.
                </div>
              </div>

              {/* Copy & Reset Buttons */}
              <div className="flex flex-col gap-3 mt-6 w-full items-center">
                <button
                  onClick={handleCopy}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] py-3.5 px-7 sm:py-4 sm:px-8 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] font-bold text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                  {copied ? "Copied!" : "Copy Schedule"}
                </button>

                <button
                  onClick={() => setShowResults(false)}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] py-3.5 px-7 sm:py-4 sm:px-8 rounded-full bg-slate-900 hover:bg-slate-850 text-white text-base sm:text-lg font-bold shadow-sm transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <svg className="w-5 h-5 text-current opacity-80 group-hover:translate-x-[-2px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EPIC-DEPTH 2500+ WORDS SEO DICTIONARY & GUIDE */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="wake-seo-article">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Conquering Morning Sleep Inertia: The Underestimated Neuroscience Behind Persistent Grogginess
            </h2>
          </header>
          <p>
            Have you ever slept for nine or ten hours, only to wake up feeling exhausted, disoriented, and desperately craving coffee? This frustrating state is known as <strong>sleep inertia</strong>—coined by sleep physiologists to describe the temporary degradation of cognitive, sensory, and motor functions experienced immediately upon waking.
          </p>
          <p>
            The root cause of sleep inertia lies in <strong>arousal thresholds</strong>. If your alarm rings while your brain is deep within N3 slow-wave sleep (characterized by slow, high-amplitude delta waves), your neural networks cannot transition instantly to alert waking states. Instead, traces of deep-sleep patterns persist in the prefrontal cortex, leading to a feeling of mental fog. Waking up during an active transition stage preserves alertness metrics.
          </p>
          <p>
            Our specialized wake up between sleep cycles calculator is designed to solve this physiological challenge. By projecting your alarm times to match the natural 90-minute transitions of your sleep cycle—which you can easily assess using our dedicated <Link to="/sleep-cycle-calculator-90-minutes" className="text-[#7C3AED] font-semibold hover:underline bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">90-Minute Sleep Cycle Calculator</Link>—you can bypass the N3 deep sleep phase and wake up feeling alert and refreshed.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Dynamic Hormonal Orchestration: Balancing Cortisol Spikes, Melatonin Suppression, and the Circadian Wave
            </h2>
          </header>
          <p>
            The transition from deep sleep to alert waking states is governed by a delicate hormonal balance:
          </p>
          <div className="space-y-6 my-6">
            <div>
              <h3 className="font-bold text-[#111827] dark:text-slate-100 text-lg mb-1">
                The Cortisol Awakening Response (CAR)
              </h3>
              <p>
                In the hour preceding your natural waking time, your body releases a healthy spike of cortisol—historically known as the "stress hormone"—which acts as a biological alarm, raising blood pressure, body temperature, and blood glucose to prime you for physical activity. It coordinates perfectly with the sleep-planning formulas found in the <Link to="/ideal-bedtime-based-on-wake-up-time" className="text-[#7C3AED] font-semibold hover:underline">Ideal Bedtime Calculator</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] dark:text-slate-100 text-lg mb-1">
                The Melatonin Clamping Curve
              </h3>
              <p>
                As cortisol levels rise, your biological master clock suppresses melatonin secretion. If you wake up prematurely, high levels of melatonin remain in your bloodstream, contributing to a feeling of sluggishness that can last for hours.
              </p>
            </div>
          </div>
          <p>
            By coordinating your bedtime and alarm times, you support this natural hormonal transition, allowing your cortisol levels to peak and melatonin levels to decline before you wake up, preventing the fatigue shifts suffered in <Link to="/shift-work-sleep-calculator" className="text-[#7C3AED] font-semibold hover:underline">rotating or night shifts</Link>.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Chronobiology & Sleep Profiles: Customizing Your Schedule Around Lions, Bears, and Night Wolves
            </h2>
          </header>
          <p>
            Every human body has a unique genetic predisposition to sleep and wake at certain times, known as a <strong>chronotype</strong>. Understanding your chronotype helps you optimize your sleep schedule. Leading research published on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">National Sleep Foundation</a> website maps these into:
          </p>
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Lions (Early Morning Chronotype):</strong> Natural early risers who feel most energetic and focused during the morning hours, but experience an early evening energy decline. See also early schedule structures inside our <Link to="/student-sleep-calculator" className="text-[#7C3AED] font-semibold hover:underline">Student Sleep Calculator</Link>.
            </li>
            <li>
              <strong>Bears (Solar-Driven Chronotype):</strong> The most common chronotype. Their sleep-wake cycle naturally aligns with the sun, peaking in productivity from mid-morning to early afternoon.
            </li>
            <li>
              <strong>Wolves (Night-Owl Chronotype):</strong> Struggle with typical early morning schedules, reaching peak focus and creativity during late afternoon and evening hours.
            </li>
          </ul>
          <p>
            While work and school demands can make it challenging for Wolves to follow their natural rhythm, using a sleep cycle calculator helps optimize sleep efficiency on early schedules, minimizing the impact of "social jetlag."
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Practical Science-Backed Strategies to Accelerate Morning Vigilance and Peak Performance
            </h2>
          </header>
          <p>
            To establish a healthy sleep routine, try integrating these science-backed habits:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Morning Daylight Exposure:</strong> Step into natural sunlight for 10 to 15 minutes immediately on waking to signal your brain to stop melatonin production and start your circadian clock.</li>
            <li><strong>Maintain Consistent Schedules:</strong> Try to sleep and wake at the same times every day, even on weekends, to support your biological rhythm and stabilize core cellular performance values.</li>
            <li><strong>Build a Wind-Down Routine:</strong> Establish a relaxing pre-bed routine to help transition your nervous system from active wakefulness to light sleep.</li>
          </ul>
        </section>

        {/* SECTION 5 - FAQs */}
        <section className="space-y-6 mb-12">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Conquering Persistent Morning Fatigue: Expert Answers to Frequently Asked Questions
            </h2>
          </header>
          
          <div className="space-y-4">
            {[
              {
                q: "Why do progressive sunrise alarms help compared to loud beeping alarms?",
                a: "Loud, abrasive alarms cause a sudden surge in heart rate and blood pressure, triggering a stress response. Progressive sunrise alarms emit a gradual glow that stimulates cortisol production and suppresses melatonin, supporting a natural and healthy waking process."
              },
              {
                q: "What should I do if my sleep partners have different schedules?",
                a: "Focus on managing what you can control. Use comfortable silent vibrating wearables for alarms, optimize your sleeping environment to prevent light-and-sound seepage, and try using dim reading lights to respect each other's schedules."
              },
              {
                q: "Does hitting 'snooze' help when waking up groggy?",
                a: "No, hitting snooze is highly counterproductive. This brief 5 or 9-minute window triggers a new sleep cycle that is quickly interrupted, worsening sleep inertia and leaving you feeling more fatigued. Try placing your alarm across the room to encourage immediate physical movement on waking, allowing light to naturally stimulate you."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl overflow-hidden shadow-xs transition-all duration-300 hover:border-[#7C3AED]"
                  id={`faq-item-${index}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-[#111827] dark:text-slate-100 hover:bg-[#FCFAF7] dark:hover:bg-[#1E293B] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="text-base font-bold text-[#111827] dark:text-slate-100 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#7C3AED] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden border-t border-[#E1D8CC] dark:border-[#1E293B]"
                      >
                        <p className="p-4 sm:p-5 text-xs sm:text-sm text-[#374151] dark:text-slate-300 leading-relaxed bg-[#FAF6F0] dark:bg-[#151C2C] select-text">
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

      {/* Recommended Sleep Guides & Science */}
      <RecommendedSleepGuides />

    </main>
  );
}
