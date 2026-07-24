import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, EyeOff, ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import { AdPlaceholder } from "../components/AdPlaceholder";
import RecommendedSleepGuides from "../components/RecommendedSleepGuides";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { OpenGraphTags } from "../components/OpenGraphTags";
import { useLanguage } from "../hooks/useLanguage";
import { PageQuestionBreakdown } from "../components/PageQuestionBreakdown";

export default function ShiftWorkCalc() {
  const { t } = useLanguage();
  const canonicalUrl = getCanonicalUrl("/shift-work-sleep-calculator");

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

  // Simplified and clear shifts list
  const SHIFTS = [
    { id: "night", label: "Night Shift (10 PM - 6 AM)", sleepStrategy: "Anchor Sleep Split Strategy" },
    { id: "evening", label: "Late Evening (4 PM - Midnight)", sleepStrategy: "Delayed Morning Sleep Block" },
    { id: "morning", label: "Early Morning (5 AM - 1 PM)", sleepStrategy: "Preshift Sleep Phase" },
  ];

  const [activeShift, setActiveShift] = useState("night");
  const [ageGroup, setAgeGroup] = useState("18-25");
  const [returnHomeTime, setReturnHomeTime] = useState("07:00");
  const [results, setResults] = useState<{ label: string; start: string; end: string; duration: string; rationale: string; cycles: number; isCore: boolean }[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to format Time
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = String(minutes).padStart(2, "0");
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Straightforward day sleep calculations
  const handleCalculate = () => {
    const [hours, minutes] = returnHomeTime.split(":").map(Number);
    const suggestions: typeof results = [];
    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup) || AGE_GROUPS[6];

    // Core cycles are determined by the specified age config
    const targetCycles = ageConfig.minCycles; 
    const abbreviatedCycles = Math.max(3, targetCycles - 1);

    if (activeShift === "night") {
      // Direct, simple recommendation for Consolidated Day rest block
      const blockStart = new Date();
      blockStart.setHours(hours + 1, minutes, 0, 0); // 1 hour buffer to get home and wind-down
      const blockEnd = new Date(blockStart.getTime() + targetCycles * 1.5 * 60 * 60 * 1000); 

      suggestions.push({
        label: "Consolidated Daytime Block",
        start: formatTime(blockStart),
        end: formatTime(blockEnd),
        duration: `${Math.floor(targetCycles * 1.5)}h ${Math.round((targetCycles * 90) % 60)}m`,
        rationale: `Provides exactly ${targetCycles} continuous sleep cycles customized for your age. This is the gold standard daytime replacement routine.`,
        cycles: targetCycles,
        isCore: true,
      });

      // Quick fallback option for busy days
      const quickEnd = new Date(blockStart.getTime() + abbreviatedCycles * 1.5 * 60 * 60 * 1000); 
      suggestions.push({
        label: "Abbreviated Recovery Block",
        start: formatTime(blockStart),
        end: formatTime(quickEnd),
        duration: `${Math.floor(abbreviatedCycles * 1.5)}h ${Math.round((abbreviatedCycles * 90) % 60)}m`,
        rationale: `Provides exactly ${abbreviatedCycles} full sleep cycles. Best for busy days when personal commitments reduce schedules.`,
        cycles: abbreviatedCycles,
        isCore: false,
      });

    } else if (activeShift === "evening") {
      // Bedtime for late evening shifts, sleep starts around 1 AM
      const sleepStart = new Date();
      sleepStart.setHours(1, 15, 0, 0);
      const sleepEnd = new Date(sleepStart.getTime() + targetCycles * 1.5 * 60 * 60 * 1000);

      suggestions.push({
        label: "Primary Sleep Block",
        start: formatTime(sleepStart),
        end: formatTime(sleepEnd),
        duration: `${Math.floor(targetCycles * 1.5)}h ${Math.round((targetCycles * 90) % 60)}m`,
        rationale: `Allows natural, age-aligned rest of ${targetCycles} sleep cycles. This satisfies your circadian drive perfectly.`,
        cycles: targetCycles,
        isCore: true,
      });

    } else {
      // Early morning shift, sleep early PM
      const sleepStart = new Date();
      sleepStart.setHours(20, 30, 0, 0);
      const sleepEnd = new Date(sleepStart.getTime() + abbreviatedCycles * 1.5 * 60 * 60 * 1000);

      suggestions.push({
        label: "Preshift Sleep Window",
        start: formatTime(sleepStart),
        end: formatTime(sleepEnd),
        duration: `${Math.floor(abbreviatedCycles * 1.5)}h ${Math.round((abbreviatedCycles * 90) % 60)}m`,
        rationale: `Aligns ${abbreviatedCycles} clean sleep cycles to secure alertness before your early morning work duties commence.`,
        cycles: abbreviatedCycles,
        isCore: true,
      });
    }

    setResults(suggestions);
    setShowResults(true);
  };

  const handleCopy = () => {
    if (results.length === 0) return;
    const text = results
      .map(
        (res) =>
          `• ${res.label}: ${res.start} - ${res.end} (${res.duration} • ${res.cycles} Cycles)\n  Rationale: ${res.rationale}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(`My Recommended Day-Sleep Schedule (Return Home: ${returnHomeTime}):\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-1 pb-8 sm:pb-12" id="shift-calculator-root">
      <OpenGraphTags
        faqs={[
          {
            q: "What are the physiological dangers of long-term rotating shifts?",
            a: "Regularly swapping shift schedules forces your internal master clock to constantly reset, causing chronic circadian disruption. This is linked to metabolic challenges, cardiorespiratory stress, and weakened immune function. For extensive information on managing shift fatigue, review official resource articles on the CDC website."
          },
          {
            q: "Is melatonin supplementation safe for shift workers sleeping in the day?",
            a: "Yes, under structured timing. Taking a micro-dose (0.3mg to 1mg of melatonin) approximately 30 minutes before your day block can help initiate sleep onset. Avoid high doses, as they can cause morning grogginess and push your internal circadian timing into a state of chronic confusion."
          },
          {
            q: "How should I handle my transition back to normal weekends off?",
            a: "On your last morning shift of the week, take a short 90-minute sleep cycle instead of a full day block, waking up around noon. This allows you to accumulate sleep drive during the afternoon, making it easier to sleep at a normal nocturnal hour on your day off. You can also calculate your ideal bedtime structure utilizing our main home calculator, or look into the sleep parameters for kids via our Student Sleep Calculator."
          }
        ]}
      />

      {/* Header Title */}
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-center w-full max-w-full px-2 mt-0 mb-3 transition-all duration-300" id="shift-header">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] dark:text-white leading-tight font-serif text-center w-full max-w-5xl mx-auto">
          {t('calculators.shiftwork.title')}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#4B5563] dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed tracking-normal opacity-90 text-center px-4">
          {t('calculators.shiftwork.subtitle')}
        </p>
      </div>

      {/* Banner Ad Spot below main heading */}
      <AdPlaceholder id="shift-header-ad" slotName="Shift Work Page Banner" />

      <AnimatePresence mode="wait" initial={false}>
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] md:max-w-[42rem] mx-auto mb-4 relative px-2 sm:px-0"
            id="shift-widget"
          >
            <div className="flex flex-col items-center w-full p-4 sm:p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl shadow-xs">
              {/* Shift Selection */}
              <div className="w-full mb-5">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  1. Select Shift Sequence
                </label>
                <div className="flex flex-col gap-1.5 w-full" id="shift-selector-container">
                  {SHIFTS.map((shift) => (
                    <button
                      key={shift.id}
                      id={`btn-shift-${shift.id}`}
                      onClick={() => setActiveShift(shift.id)}
                      className={`w-full py-3 px-4 rounded-xl text-left border transition-all duration-150 cursor-pointer flex flex-col ${
                        activeShift === shift.id
                          ? "border-[#7C3AED] bg-[#7C3AED]/5 text-[#111827]"
                          : "border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-transparent"
                      }`}
                    >
                      <span className="font-extrabold text-sm text-gray-900">{shift.label}</span>
                      <span className="text-xs font-semibold text-neutral-500 mt-0.5">{shift.sleepStrategy}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age group dropdown selection */}
              <div className="flex flex-col items-center w-full mb-5 z-20">
                <label htmlFor="age-select" className="text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-1.5 block text-center">
                  2. Select Your Age
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

              {/* Transit/Home Time Selection */}
              <div className="w-full flex flex-col items-center mb-5">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  {activeShift === "night" ? "3. What time do you return home?" : "3. When does shift transition occur?"}
                </label>
                <div className="flex items-center gap-2 bg-[#FCFAF7] border-b border-gray-300 px-3 py-2.5 hover:border-[#7C3AED]/50 transition w-full max-w-[12rem] justify-center">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <input
                    type="time"
                    className="bg-transparent border-none text-gray-800 font-mono focus:outline-none cursor-pointer font-bold"
                    value={returnHomeTime}
                    onChange={(e) => setReturnHomeTime(e.target.value)}
                    id="shift-time-picker"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <div className="w-full flex justify-center mt-3">
                <button
                  onClick={handleCalculate}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] rounded-full py-3.5 px-7 sm:py-4 sm:px-8 font-extrabold text-[#FFFFFF] text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center"
                >
                  Calculate Day-Sleep
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
            id="shift-results-panel"
          >
            <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 dark:text-gray-100 text-center tracking-tight">
                  Your Day-Sleep Schedule
                </h2>
              </div>

              <div className="w-full flex flex-col gap-4 select-text" id="shift-results-list">
                {results.map((res, index) => (
                  <div
                    key={index}
                    className={`group flex flex-col py-4 px-5 rounded-2xl border transition-all duration-300 hover:shadow-sm ${
                      res.isCore
                        ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 dark:border-[#7C3AED]/50 dark:bg-[#7C3AED]/10 dark:hover:bg-[#7C3AED]/15"
                        : "border-[#E1D8CC] dark:border-[#1E293B] bg-[#FAF6F0] dark:bg-[#151C2C] hover:bg-[#FCFAF7] dark:hover:bg-[#1E293B]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        res.isCore 
                          ? "bg-[#7C3AED]/15 dark:bg-[#7C3AED]/25 text-[#7C3AED] dark:text-violet-300" 
                          : "bg-neutral-200/70 dark:bg-slate-800 text-neutral-650 dark:text-slate-300"
                      }`}>
                        {res.label}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#6B7280] dark:text-slate-400">
                        {res.duration} • {res.cycles} Cycles
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl sm:text-2xl font-black text-[#7C3AED] tracking-tight">
                        {res.start}
                      </span>
                      <span className="text-xs font-bold text-neutral-400 font-mono">UNTIL</span>
                      <span className="text-xl sm:text-2xl font-black text-[#7C3AED] tracking-tight">
                        {res.end}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      {res.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* Biohack */}
              <div className="bg-[#7C3AED]/5 dark:bg-[#151C2C] p-4 border border-[#7C3AED]/20 dark:border-violet-500/20 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed flex items-start gap-3 rounded-2xl mt-6">
                <EyeOff className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Commute Biohack:</span> Wear polarized sunglasses on your morning trip home! Daylight suppresses melatonin instantly. Guarding your biological system values ensures easy day sleep.
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

      {/* DEEP SEO CONTENT */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="shift-seo-content">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              The Night Shift Paradox: Mastering the Science of Circadian Rhythm Inversion Safely and Reliably
            </h2>
          </header>
          <p>
            Occupational demands obligating humans to work night, evening, or rotating timetables create a core biological mismatch. Our bodies are genetically programmed by evolutionary solar cues. For millions of years, solar rays entering the biological retina functioned as the primary external timer (such as the <em>Zeitgeber</em>) that synchronized our molecular biological rhythms.
          </p>
          <p>
            When we force our bodies to stay awake during hours of natural atmospheric darkness and request deep rest during high noon, we run face-first into the <strong>SCN (Suprachiasmatic Nucleus)</strong> system. The SCN is an internal master genetic clock situated in the hypothalamus. It controls metabolic heat, digestive acid schedules, arterial pressure, and hormonal spikes. Overriding this master clock without structural science-backed routines results in chronic occupational fatigue, mental exhaustion, cognitive sluggishness, and severe sleep debt.
          </p>
          <p>
            Our specialized sleep calculator for night shift workers represents a tool of mathematical circadian adaptation. By programming biological rest structures around precise 90-minute intervals—easily estimated via our <Link to="/sleep-cycle-calculator-90-minutes" className="text-[#7C3AED] font-semibold hover:underline bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">90-Minute Sleep Cycle Calculator</Link>—and scheduling active transit times, shift workers can safely inversion-proof their bodies and protect critical cognitive functions.
          </p>

          <PageQuestionBreakdown
            mainQuestion="How can night shift workers calculate optimal daytime sleep schedules to avoid chronic exhaustion?"
            quickAnswer="Night shift workers should structure daytime sleep into dedicated 90-minute cycle blocks (e.g., a core 6-hour or 7.5-hour block immediately after shift, or a split strategy with a 4.5-hour core block + a 90-minute pre-shift nap). Wear blue-blocking glasses during the commute home to protect melatonin."
            keyTerms={[
              { term: "Anchor Sleep Strategy", definition: "Maintaining a fixed 4-hour core sleep window at the exact same time every day, regardless of shift changes." },
              { term: "Circadian Inversion", definition: "Shift-work adaptation where sleep and wake schedules are flipped 12 hours relative to solar light." },
              { term: "Zeitgeber", definition: "External environmental cues (like sunlight and meals) that synchronize your internal 24-hour master clock." },
              { term: "Split Sleep Strategy", definition: "Dividing total daily sleep into two distinct blocks (e.g., 4.5 hours after shift + 1.5 hours before next shift)." }
            ]}
            practicalExample={{
              scenario: "Night shift nurse finishing a 12-hour shift at 7:00 AM, arriving home at 7:30 AM.",
              steps: [
                "Wear dark sunglasses during the morning drive home to prevent morning sunlight from suppressing melatonin.",
                "Get into a dark bedroom by 8:00 AM.",
                "Target a 4-cycle core sleep block (6 hours) → wake up at 2:00 PM, OR a 5-cycle core block (7.5 hours) → wake up at 3:30 PM."
              ],
              result: "Waking at 2:00 PM or 3:30 PM ensures waking up at the end of a complete 90-minute cycle during light stage-N1/N2 sleep."
            }}
            comparison={{
              title: "Consolidated Daytime Sleep vs Split Sleep Strategy",
              optionA: {
                name: "Consolidated Daytime Sleep (6 - 7.5 Hours Straight)",
                details: "Sleep in a single continuous block from 8:00 AM to 3:30 PM in a dark blackout room.",
                outcome: "Maximum continuous deep N3 physical recovery; requires strict daytime noise/light blocking."
              },
              optionB: {
                name: "Split Sleep (4.5 Hours Morning + 1.5 Hours Pre-Shift)",
                details: "Sleep 4.5 hours upon returning home (8:00 AM - 12:30 PM) + take a 90-minute nap before shift (5:30 PM - 7:00 PM).",
                outcome: "Flexibility for family commitments; reduces pre-shift drowsiness before long night shifts."
              }
            }}
            useCases={[
              { title: "Rotating 12-Hour Hospital Nursing", description: "Use blue-blocking glasses on the drive home and split-sleep before back-to-back night shifts." },
              { title: "Long-Haul Logistics & Night Truckers", description: "Schedule 90-minute pre-drive naps in cab sleepers with thermal eye masks." },
              { title: "24/7 Manufacturing & Plant Operations", description: "Anchor sleep times between 9:00 AM and 1:00 PM on working days." },
              { title: "First Responders & On-Call Emergency Teams", description: "Use 20-minute power naps or 90-minute emergency recovery cycles between dispatches." }
            ]}
            pitfalls={[
              {
                mistake: "Exposing eyes to bright sunlight during the morning commute home.",
                impact: "Morning sunlight triggers cortisol release and suppresses melatonin, making it difficult to fall asleep at 8:00 AM.",
                fix: "Wear dark amber or polarized UV/blue-blocking sunglasses as soon as you exit the facility."
              },
              {
                mistake: "Using alcohol as a daytime sleep aid.",
                impact: "Alcohol destroys REM sleep architecture and causes middle-of-the-day awakenings as blood alcohol levels drop.",
                fix: "Use cold dark room conditions, magnesium glycinate, or pink noise generators instead."
              }
            ]}
          />
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Daytime Sleep Cave Architecture: The Advanced Physics of Day-Sleep Melatonin Preservation
            </h2>
          </header>
          <p>
            In order to sleep soundly during the day, you must construct a bulletproof, sterile light-and-sound sanctuary that completely mimics the natural dark environment of midnight. Waking up during daytime blocks is almost always caused by passing daylight or minor street noises triggering micro-arousals. These micro-arousals disrupt the natural cycle structures described in our <Link to="/wake-up-between-sleep-cycles" className="text-[#7C3AED] font-semibold hover:underline">Wake Up Between Cycles Guide</Link>. Learn the precise physics of day-sleep cave construction:
          </p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>The Absolute Darkness Standard (Blackout):</strong> Use heavyweight rubberized blackout curtains or thermal cellular shades. Any visible sunlight filtration triggers the production of cortisol and suppresses natural melatonin reserves.
            </li>
            <li>
              <strong>Acoustics Management (Pink & Red Noise):</strong> External neighborhood noise spikes during morning and afternoon hours. Use stable mechanical fans, deep pink noise generators, or silicon earplugs to mask these sudden decibel spikes.
            </li>
            <li>
              <strong>Thermal Optimization (Body Cooling):</strong> Core body temperature must dip by 2 degrees Fahrenheit to initiate natural sleep onset. Daytime ambient temperatures naturally rise. Chilling your bedroom to a cold 64-67°F (17-19°C) signals your hypothalamus that it is time to access deep N3 sleep stages, as explored in the official clinical guides on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">National Sleep Foundation</a> website.
            </li>
          </ol>
          <p>
            By controlling these three pillars, you ensure that your body can transition comfortably through 4 or 5 full sleep cycles during the day without prematurely exiting to active light waking phases.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Anchor Sleep vs. Split Sleep Schedules: The Advanced Strategist's Guide to Day Recovery
            </h2>
          </header>
          <p>
            Depending on your shift sequence, family environment, and physiological demands, shift workers should select between two primary sleep schedules:
          </p>
          <div className="space-y-6 my-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-[#111827] dark:text-slate-100 text-lg">
                  Consolidated Rest Block
                </h3>
                <span className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-0.5 rounded-full font-semibold">5 Cycles (Continuous)</span>
              </div>
              <p>
                Sleeping for a continuous 7.5 to 8 hours straight. This is ideal if you have a quiet household, blackout curtains, and can block off a solid daytime window without interruptions. This coordinates perfectly with our customized <Link to="/ideal-bedtime-based-on-wake-up-time" className="text-[#7C3AED] font-semibold hover:underline">Ideal Bedtime Calculator</Link>.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-[#111827] dark:text-slate-100 text-lg">
                  Split Schedule (Anchor Sleep Style)
                </h3>
                <span className="text-xs bg-amber-500/10 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">3.5h Anchor + 90 Min Nap</span>
              </div>
              <p>
                Splitting sleep into a 5-hour daytime core block plus a 90-minute pre-shift evening cycle. Highly effective if daytime chores or children prevent a solid 8-hour stretch.
              </p>
            </div>
          </div>
          <p>
            The Split layout works beautifully because your 3 to 5 hour core block captures the majority of your daily <strong>N3 deep slow-wave sleep</strong> requirement, which occurs heavily during your initial rest phases. The subsequent 90-minute evening nap provides the necessary <strong>REM sleep</strong> and cognitive freshening safely, immediately priming your focus levels before night shift duties commence.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Nutritional Chronobiology: Optimizing Digestion, Insulin and Diet Timetables on Night Shifts
            </h2>
          </header>
          <p>
            One of the most ignored elements of shift-work fatigue is digestion timing. Due to the genetic programming of your digestive organs, insulin sensitivity plunges during late-night hours. Eating heavy carbohydrates, sugars, or processed meals at 3 AM triggers severe insulin spikes, leading to sleepiness, digestive discomfort, and metabolic distress.
          </p>
          <p>
            <strong>Night Shift Meal Guidelines:</strong> Limit food intake to light, protein-and-fat-dense snacks (nuts, seeds, hard-boiled eggs, or avocado slices) between Midnight and 5 AM. Eat a warm carb-rich breakfast at 6:30 AM before you go to sleep. Complex carbs (such as oats or bananas) help manufacture serotonin and tryptophan in the brain, supporting quick transition to deep day sleep blocks.
          </p>
        </section>

        {/* SECTION 5 - FAQs */}
        <section className="space-y-6 mb-12">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              Occupational Sleep Optimization: Pro Circadian Answers to Shift Work Questions
            </h2>
          </header>
          
          <div className="space-y-4">
            {[
              {
                q: "What are the physiological dangers of long-term rotating shifts?",
                a: "Regularly swapping shift schedules forces your internal master clock to constantly reset, causing chronic circadian disruption. This is linked to metabolic challenges, cardiorespiratory stress, and weakened immune function. For extensive information on managing shift fatigue, review official resource articles on the CDC website."
              },
              {
                q: "Is melatonin supplementation safe for shift workers sleeping in the day?",
                a: "Yes, under structured timing. Taking a micro-dose (0.3mg to 1mg of melatonin) approximately 30 minutes before your day block can help initiate sleep onset. Avoid high doses, as they can cause morning grogginess and push your internal circadian timing into a state of chronic confusion."
              },
              {
                q: "How should I handle my transition back to normal weekends off?",
                a: "On your last morning shift of the week, take a short 90-minute sleep cycle instead of a full day block, waking up around noon. This allows you to accumulate sleep drive during the afternoon, making it easier to sleep at a normal nocturnal hour on your day off. You can also calculate your ideal bedtime structure utilizing our main home calculator, or look into the sleep parameters for kids via our Student Sleep Calculator."
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
      <RecommendedSleepGuides 
        preferredSlugs={['shift-work-sleep-calculator-guide', 'sleep-calculator-for-night-shift-workers', 'fix-irregular-sleep-schedule']} 
        title="Night Shift & Sleep Health Guides" 
        description="Discover practical strategies for aligning daytime sleep with circadian rhythms, managing night shifts, and preventing daytime fatigue."
      />

    </main>
  );
}

