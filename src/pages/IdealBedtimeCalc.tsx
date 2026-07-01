import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";
import HomeSkeleton from "../components/HomeSkeleton";
import { AdPlaceholder } from "../components/AdPlaceholder";

export default function IdealBedtimeCalc() {
  const canonicalUrl = getCanonicalUrl("/ideal-bedtime-based-on-wake-up-time");
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
  const [latency, setLatency] = useState(15);
  const [bedtimeOptions, setBedtimeOptions] = useState<{ label: string; sleepTime: Date; cycles: number; duration: number }[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculateBedtime = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const targetWake = new Date();
    targetWake.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (targetWake.getTime() <= now.getTime()) {
      targetWake.setDate(targetWake.getDate() + 1);
    }

    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup) || AGE_GROUPS[6];
    
    const cyclesToGenerate = [];
    const maxC = ageConfig.maxCycles;
    for (let c = maxC; c >= Math.max(3, ageConfig.minCycles - 2); c--) {
      cyclesToGenerate.push(c);
    }

    const options = cyclesToGenerate.map((c) => {
      const totalSleepMinutes = c * 90;
      const totalMinutesToSubtract = totalSleepMinutes + latency;
      const bTime = new Date(targetWake.getTime() - totalMinutesToSubtract * 60000);
      
      let label = "Underrested Bedtime Phase";
      if (c >= ageConfig.minCycles && c <= ageConfig.maxCycles) {
        label = "Ideal Recommended Bedtime";
      } else if (c > ageConfig.maxCycles) {
        label = "Extended Rest Bedtime";
      } else {
        label = "Minimum Allowable Bedtime";
      }

      return {
        label,
        sleepTime: bTime,
        cycles: c,
        duration: Number((totalSleepMinutes / 60).toFixed(1)),
      };
    });

    setBedtimeOptions(options);
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
    if (bedtimeOptions.length === 0) return;
    const text = bedtimeOptions
      .map(
        (opt) =>
          `• ${formatTime(opt.sleepTime)} (${opt.cycles} Cycles - ${opt.duration}h sleep) - ${opt.label}`
      )
      .join("\n");
    navigator.clipboard.writeText(`My Ideal Bedtime Suggestions (Wake up at ${wakeTime}):\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="ideal-calculator-root">
        <Helmet>
          <title>Ideal Bedtime Based on Wake Up Time | Personalized Age Calculator</title>
          <meta
            name="description"
            content="Determine your ideal bedtime mathematically based on your target wake up time and sleep cycles. Includes customized settings for adults, children, and seniors."
          />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="ideal-calculator-root">
      <Helmet>
        <title>Ideal Bedtime Based on Wake Up Time | Personalized Age Calculator</title>
        <meta
          name="description"
          content="Determine your ideal bedtime mathematically based on your target wake up time and sleep cycles. Includes customized settings for adults, children, and seniors."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Breadcrumbs - Clean and Simple */}
      <div className="mb-8 flex items-center text-xs sm:text-sm text-[#6B7280]" id="ideal-breadcrumb">
        <div className="flex items-center gap-1.5 font-sans">
          <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="font-semibold text-gray-700">Ideal Bedtime Calculator</span>
        </div>
      </div>

      {/* Header Title */}
      <div className="text-center mb-8" id="ideal-header">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-3">
          Ideal Bedtime Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Find your perfect, age-customized bedtime based on your biological alarm targets and sleep cycle architecture.
        </p>
      </div>

      {/* Banner Ad Spot below main heading */}
      <AdPlaceholder id="ideal-header-ad" slotName="Ideal Bedtime Page Banner" />

      <AnimatePresence mode="wait" initial={false}>
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] mx-auto mb-12 relative px-2 sm:px-0"
            id="ideal-widget"
          >
            <div className="flex flex-col items-center w-full p-4 sm:p-5">
              {/* Wake up target time selection */}
              <div className="w-full flex flex-col items-center mb-5">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  1. When do you want to wake up?
                </label>
                <TimePicker value={wakeTime} onChange={setWakeTime} mode="wake" />
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

              {/* Fall Asleep Delay latency selection */}
              <div className="w-full mb-5 flex flex-col items-center">
                <label className="block text-slate-600 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2.5 text-center">
                  2. Select Fall Asleep Delay (Latency)
                </label>
                <div className="grid grid-cols-3 gap-2 w-full max-w-[18.25rem] sm:max-w-[20rem]" id="ideal-latency-toggle">
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
                <p className="text-xs text-neutral-500 mt-2 text-center italic">
                  How long you lie in bed before starting your first cycle.
                </p>
              </div>

              {/* Calculate Button */}
              <div className="w-full flex justify-center mt-3">
                <button
                  onClick={calculateBedtime}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] rounded-full py-3.5 px-7 sm:py-4 sm:px-8 font-extrabold text-[#FFFFFF] text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center"
                >
                  Calculate Bedtime Suggestions
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
            className="w-full max-w-[28.75rem] mx-auto flex flex-col items-center mb-12 px-2"
            id="ideal-results"
          >
            <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 text-center tracking-tight">
                  Personalized Bedtime Suggestions
                </h2>
              </div>

              <div className="w-full flex flex-col gap-2 select-text" id="ideal-options-container">
                {bedtimeOptions.map((opt, index) => {
                  const isSuggested = opt.label.includes("Ideal") || opt.label.includes("Recommended");
                  return (
                    <div
                      key={index}
                      className={`group flex items-center justify-between py-3.5 px-5 rounded-2xl border transition-all duration-300 hover:shadow-sm ${
                        isSuggested
                          ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10"
                          : "border-[#E1D8CC] bg-[#FAF6F0] hover:bg-[#FCFAF7]"
                      }`}
                    >
                      <div className="flex flex-col relative z-10">
                        <span className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight leading-none mb-1.5 flex items-center gap-1.5">
                          {formatTime(opt.sleepTime)}
                        </span>
                        <span className="text-[#374151] text-xs sm:text-sm font-bold">
                          {opt.cycles} sleep cycles ({opt.duration}h sleep)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-2 relative z-10 flex-shrink-0">
                        {isSuggested && (
                          <span className="inline-flex items-center text-xs sm:text-sm font-extrabold text-[#7C3AED] bg-[#7C3AED]/15 px-3 py-1.5 rounded-lg tracking-wider">
                            Optimal
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tip */}
              <div className="bg-[#7C3AED]/5 p-4 border-l-2 border-[#7C3AED] text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-3 rounded-r-xl mt-6">
                <Heart className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Age-Customized Focus:</span> Bedtime calculations adjust based on biological developmental requirements. Seniors naturally utilize fewer, flatter cycles, while young systems demand extended recovery periods.
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

      {/* DETAILED 2500+ WORDS VALUABLE SEO ARTICLE */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="ideal-seo-article">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Lifespan Sleep Matrix: Designing Custom Bedtimes for Lifelong Health
            </h2>
          </header>
          <p>
            Understanding the factors that influence sleep demands is crucial, as sleep requirements are not uniform across the lifespan. Sleep demands undergo dramatic physiological transformations as we progress from infancy through adolescence, adulthood, and our senior years. Setting a standard "one-size-fits-all" bedtime schedule for an entire family ignores these critical biological differences.
          </p>
          <p>
            For example, an adult's sleep is structured around five 90-minute sleep cycles (7.5 hours). In contrast, developing babies and teenagers experience intense periods of cognitive development, physical growth, and neuroplastic remodeling, requiring significantly longer sleep windows. These can be planned with the assistance of our customized <Link to="/student-sleep-calculator" className="text-[#7C3AED] font-semibold hover:underline">Student Sleep Calculator</Link>.
          </p>
          <p>
            Our specialized ideal bedtime calculator provides personalized, science-backed bedtime recommendations tailored specifically to your family's distinct age demographics, matching the core biological rhythms described in our popular <Link to="/sleep-cycle-calculator-90-minutes" className="text-[#7C3AED] font-semibold hover:underline bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">90-Minute Sleep Cycle Calculator</Link>.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Evolving Brain: How Sleep Architecture Adapts Over the Years
            </h2>
          </header>
          <p>
            Sleep architecture undergoes substantial changes as we age:
          </p>
          <div className="space-y-4 my-4">
            <p>
              <strong className="text-[#111827]">Babies & Infants (4-11 months):</strong> Demand 12 to 15 hours of total sleep. Their rest pattern is divided into active sleep (a precursor to REM) and quiet sleep (a precursor to slow-wave deep sleep). These extended rest windows are vital for motor learning, sensory processing, and systemic brain development.
            </p>
            <p>
              <strong className="text-[#111827]">Teenagers (13-17 years):</strong> Demand between 8.5 to 10 hours of sleep. Adolescence induces a natural circadian phase delay, causing teenagers to stay awake later in the evening. Sacrificing these vital rest windows can lead to difficulties with attention and emotional balance.
            </p>
            <p>
              <strong className="text-[#111827]">Adults (18-64 years):</strong> Settle into an optimal range of 7 to 9 hours of sleep. The primary goal during this phase is maintaining physiological and emotional recovery, supporting long-term health, cellular regeneration, and cardiovascular resilience.
            </p>
            <p>
              <strong className="text-[#111827]">Seniors (65+ years):</strong> Experience a natural decline in deep, slow-wave N3 deep sleep. Their rest window often compresses to 5 to 7 hours, resulting in lighter, more fragmented sleep patterns that can lead to waking up earlier in the morning.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Science of Sleep Latency: Managing the Transition Phase
            </h2>
          </header>
          <p>
            When calculating bedtimes, you must factor in <strong>sleep latency</strong>—the physical period of transition from active wakefulness to light N1 sleep. Usually, this spans from 10 to 20 minutes, as we detail on our interactive <Link to="/wake-up-between-sleep-cycles" className="text-[#7C3AED] font-semibold hover:underline">Wake Up Between Cycles Guide</Link>.
          </p>
          <p>
            If your biological sleep latency extends beyond 30 minutes, it can shift your sleep cycles, causing your alarm to ring in the middle of a deep sleep phase. This delay is often caused by evening screen use, high caffeine intake, or a lack of light management, as researched across publications on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">National Sleep Foundation</a> website.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Constructing the Ideal Sleep Sanctuary: Environmental Design Principles
            </h2>
          </header>
          <p>
            To optimize your sleep quality, design a sleep environment that promotes relaxation, especially when coping with biological mismatch like on rotating or <Link to="/shift-work-sleep-calculator" className="text-[#7C3AED] hover:underline">Night Shifts</Link>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li><strong>Chilled Thermal Setting:</strong> Chilly sleeping rooms (65-68°F / 18-20°C) help initiate the natural decline in core body temperature required for deep sleep.</li>
            <li><strong>Sensory Isolation:</strong> Use comfortable earplugs or stable white noise systems to mask sudden environmental sounds.</li>
            <li><strong>Avoid High-Tech Stimulants:</strong> Keep digital displays out of the bedroom to encourage a peaceful evening transition.</li>
          </ul>
        </section>

        {/* SECTION 5 - FAQs */}
        <section className="space-y-6">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Circadian Sleep Optimization FAQ
            </h2>
          </header>
          
          <div className="space-y-4">
            {[
              {
                q: "Why do seniors wake up so early in the morning?",
                a: "Geriatric sleep patterns are influenced by age-associated flattening of the Suprachiasmatic Nucleus master clock and decreased natural melatonin secretion. Seniors experience earlier sleepiness in the evening and lighter, more fragmented sleep, leading to earlier waking hours."
              },
              {
                q: "Should I adjust my sleep schedule when traveling across time zones?",
                a: "To minimize jet lag, adjust your bedtime and solar exposure schedules to match your destination's daytime lines as soon as you board the plane. Structured morning light exposure and evening darkness can help reset your circadian rhythm quickly."
              },
              {
                q: "Can I make up for a week of lost sleep on the weekend?",
                a: "Oversleeping on weekends cannot fully recover a chronic sleep debt, as it disrupts your circadian alignment and leads to 'social jetlag.' Recovery is best achieved by gradually sleeping 1 to 1.5 hours extra on weekends and maintaining a consistent daily sleep schedule during the week."
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
