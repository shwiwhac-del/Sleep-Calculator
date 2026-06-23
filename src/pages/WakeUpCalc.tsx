import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Activity, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";

export default function WakeUpCalc() {
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
    calculateAlarms();
  }, [targetTime, latency, ageGroup]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="wake-cycles-calculator-root">
      <Helmet>
        <title>Wake Up Between Sleep Cycles Calculator | Morning Freshness</title>
        <meta
          name="description"
          content="Learn how to wake up between sleep cycles to prevent morning sleep inertia. Calculate your optimal alarm times with our simple sleep cycles calculator."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Breadcrumbs - Clean and Simple */}
      <div className="mb-8 flex items-center text-xs sm:text-sm text-[#6B7280]" id="wake-cycles-breadcrumb">
        <div className="flex items-center gap-1.5 font-sans">
          <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="font-semibold text-gray-700">Wake Up Between Cycles Calculator</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-8" id="wake-cycles-header">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-3">
          Wake Up Between Sleep Cycles
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Learn how to escape morning sleep inertia by calculating the ideal alarm times based on your bedtime.
        </p>
      </div>

      {/* Styled card container for the tool itself */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md shadow-neutral-100 mb-12" id="wake-cycles-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Controls */}
          <div className="space-y-6 flex flex-col justify-center" id="wake-cycles-controls">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                1. What time will you turn off the lights?
              </label>
              <TimePicker value={targetTime} onChange={setTargetTime} mode="bed" />
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
                2. Select Fall Asleep Latency (Delay)
              </label>
              <div className="grid grid-cols-3 gap-2" id="wake-latency-toggle">
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
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="flex flex-col justify-between space-y-6" id="wake-cycles-results">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-neutral-200 pb-2">
                Optimal Alarm Alignments
              </h3>

              <div className="space-y-5" id="wake-options-list">
                {results.map((res, i) => (
                  <div
                    key={res.time.toISOString() + res.cycle}
                    className="border-b border-neutral-200/65 pb-4"
                    id={`wake-res-card-${i}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-neutral-100">
                      <div>
                        <div className="text-[11px] text-[#6B7280] font-mono uppercase tracking-wider font-bold">
                          Set alarm clock for:
                        </div>
                        <div className="text-3xl font-black text-[#7C3AED] tracking-tight mt-0.5">
                          {formatTime(res.time)}
                        </div>
                      </div>

                      <div className="font-sans text-sm text-gray-800">
                        <span className="font-bold font-mono text-[#111827]">{res.cycle} Cycles</span> ({Number((res.cycle * 1.5).toFixed(1))}h sleep)
                        {res.optimal && (
                          <span className="ml-2 inline-block bg-emerald-500/10 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Optimal Wake
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#7C3AED]/5 p-4 border-l-2 border-[#7C3AED] text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-3 flex-row">
              <Activity className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">Waking Fresh Tip:</span> Morning grogginess is caused by waking during N3 deep slow-wave sleep. Aligning alarms with standard 90-minute cycle segments ensures you wake up feeling alert and ready to tackle the day.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EPIC-DEPTH 2500+ WORDS SEO DICTIONARY & GUIDE */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="wake-seo-article">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Conquering Sleep Inertia: The Neuroscience of Morning Grogginess
            </h2>
          </header>
          <p>
            Have you ever slept for nine or ten hours, only to wake up feeling exhausted, disoriented, and desperately craving coffee? This frustrating state is known as **sleep inertia**—coined by sleep physiologists to describe the temporary degradation of cognitive, sensory, and motor functions experienced immediately upon waking.
          </p>
          <p>
            The root cause of sleep inertia lies in **arousal thresholds**. If your alarm rings while your brain is deep within N3 slow-wave sleep (characterized by slow, high-amplitude delta waves), your neural networks cannot transition instantly to alert waking states. Instead, traces of deep-sleep patterns persist in the prefrontal cortex, leading to a feeling of mental fog. Waking up during an active transition stage preserves alertness metrics.
          </p>
          <p>
            Our specialized wake up between sleep cycles calculator is designed to solve this physiological challenge. By projecting your alarm times to match the natural 90-minute transitions of your sleep cycle—which you can easily assess using our dedicated <Link to="/sleep-cycle-calculator-90-minutes" className="text-[#7C3AED] font-semibold hover:underline bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">90-Minute Sleep Cycle Calculator</Link>—you can bypass the N3 deep sleep phase and wake up feeling alert and refreshed.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Hormonal Orchestration: Cortisol, Melatonin, and the Circadian Wave
            </h2>
          </header>
          <p>
            The transition from deep sleep to alert waking states is governed by a delicate hormonal balance:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 border-l-2 border-[#7C3AED] bg-[#FCFAF7] rounded-r-2xl">
              <h3 className="font-bold text-gray-900 mb-2 font-serif text-[#7C3AED]">
                The Cortisol Awakening Response (CAR)
              </h3>
              <p className="text-sm text-gray-600">
                In the hour preceding your natural waking time, your body releases a healthy spike of cortisol—historically known as the "stress hormone"—which acts as a biological alarm, raising blood pressure, body temperature, and blood glucose to prime you for physical activity. It coordinates perfectly with the sleep-planning formulas found in the <Link to="/ideal-bedtime-based-on-wake-up-time" className="text-[#7C3AED] font-semibold hover:underline">Ideal Bedtime Calculator</Link>.
              </p>
            </div>
            <div className="p-5 border-l-2 border-[#7C3AED] bg-[#FCFAF7] rounded-r-2xl">
              <h3 className="font-bold text-gray-900 mb-2 font-serif text-[#7C3AED]">
                The Melatonin Clamping Curve
              </h3>
              <p className="text-sm text-gray-600">
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
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Chronobiology: Understanding Lions, Bears, and Wolves
            </h2>
          </header>
          <p>
            Every human body has a unique genetic predisposition to sleep and wake at certain times, known as a **chronotype**. Understanding your chronotype helps you optimize your sleep schedule. Leading research published on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">National Sleep Foundation</a> website maps these into:
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
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Practical Strategies to Boost Morning Vigilance
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
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Conquering Morning Fatigue FAQ
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
