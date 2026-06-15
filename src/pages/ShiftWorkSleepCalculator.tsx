import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Clock, Coffee, ShieldAlert, Sparkles, Footprints, Flame, EyeOff, ArrowLeft } from "lucide-react";
import { getCanonicalUrl } from "../lib/seo";

export default function ShiftWorkSleepCalculator() {
  const canonicalUrl = getCanonicalUrl("/sleep-calculator-for-night-shift-workers");

  const SHIFTS = [
    { id: "night", label: "Night Shift (10 PM - 6 AM)", sleepStrategy: "Anchor Sleep Split", tip: "Avoid bright light during morning transit. Sleep immediately." },
    { id: "evening", label: "Late Evening (4 PM - Midnight)", sleepStrategy: "Delayed Morning Block", tip: "Relax pre-bed. Wake up naturally without alarm." },
    { id: "rotating", label: "Rotating / Double Shifts", sleepStrategy: "Prophylactic Napping", tip: "Optimize core sleep when transitioning between shifts." },
    { id: "morning", label: "Early Morning (5 AM - 1 PM)", sleepStrategy: "Preshift Sleep Phase", tip: "Shift bedtime early. Wind down by 8 PM." },
  ];

  const [activeShift, setActiveShift] = useState("night");
  const [returnHomeTime, setReturnHomeTime] = useState("07:00");
  const [useSplitSleep, setUseSplitSleep] = useState(false);
  const [results, setResults] = useState<{ label: string; start: string; end: string; duration: string; rationale: string; cycles: number }[]>([]);

  // Calculate day sleep targets
  const handleCalculate = () => {
    const [hours, minutes] = returnHomeTime.split(":").map(Number);
    const suggestions: typeof results = [];

    if (activeShift === "night") {
      if (useSplitSleep) {
        // Split Sleep Routine: Anchor Sleep block (approx 5 hours) + Prophylactic 90min nap
        const firstStart = new Date();
        firstStart.setHours(hours + 1, minutes, 0, 0); // 1hr post-transit wind down
        const firstEnd = new Date(firstStart.getTime() + 5 * 60 * 60 * 1000); // 5 hours anchor block

        const secondStart = new Date(firstEnd.getTime() + 6 * 60 * 60 * 1000); // 6 hours wakeful gap
        const secondEnd = new Date(secondStart.getTime() + 1.5 * 60 * 60 * 1000); // 90 min cycle nap

        suggestions.push({
          label: "Core Anchor Block",
          start: formatTime(firstStart),
          end: formatTime(firstEnd),
          duration: "5h 0m",
          rationale: "Aligns your core physiological rest systems while protecting against noon temperature/light peaks.",
          cycles: 3,
        });

        suggestions.push({
          label: "Prophylactic Nap Cycle",
          start: formatTime(secondStart),
          end: formatTime(secondEnd),
          duration: "1h 30m",
          rationale: "A complete 90-minute cycle before your next shift to maximize alert levels during the night.",
          cycles: 1,
        });
      } else {
        // Solid Daytime Block (approx 7.5 hours / 5 cycles)
        const blockStart = new Date();
        blockStart.setHours(hours + 1, minutes, 0, 0); // 1hr wind down
        const blockEnd = new Date(blockStart.getTime() + 7.5 * 60 * 60 * 1000); // 5 cycles

        suggestions.push({
          label: "Consolidated Rest Day-Block",
          start: formatTime(blockStart),
          end: formatTime(blockEnd),
          duration: "7h 30m",
          rationale: "Completes exactly 5 sleep cycles. Ensure complete darkness and sound isolation using blackout curtains.",
          cycles: 5,
        });

        // Safe alternate: 6 hours (4 cycles)
        const altEnd = new Date(blockStart.getTime() + 6 * 60 * 60 * 1000);
        suggestions.push({
          label: "Abbreviated Rest Block (Recommended if busy)",
          start: formatTime(blockStart),
          end: formatTime(altEnd),
          duration: "6h 0m",
          rationale: "Provides exactly 4 sleep cycles. Better for days requiring quick turnarounds.",
          cycles: 4,
        });
      }
    } else if (activeShift === "evening") {
      // Bedtime approx 1 AM
      const sleepStart = new Date();
      sleepStart.setHours(1, 15, 0, 0);
      const sleepEnd = new Date(sleepStart.getTime() + 7.5 * 60 * 60 * 1000); // 5 cycles

      suggestions.push({
        label: "Primary Sleep Block",
        start: formatTime(sleepStart),
        end: formatTime(sleepEnd),
        duration: "7h 30m",
        rationale: "Enables natural wakefulness around 8:45 AM, allowing you to maximize morning sunlight exposure.",
        cycles: 5,
      });
    } else if (activeShift === "rotating") {
      // Pivot sleeps based on rotating transitions
      const sleepStart = new Date();
      sleepStart.setHours(23, 0, 0, 0); // normal-ish night bedtime
      const sleepEnd = new Date(sleepStart.getTime() + 7.5 * 60 * 60 * 1000);

      suggestions.push({
        label: "Transition Night Sleep",
        start: formatTime(sleepStart),
        end: formatTime(sleepEnd),
        duration: "7h 30m",
        rationale: "Keeps your core clock anchored when swapping shift phases to minimize brain fatigue.",
        cycles: 5,
      });

      // Quick 20min nap before shifts
      suggestions.push({
        label: "Pre-Shift Micro Nap",
        start: "14:20 PM",
        end: "14:40 PM",
        duration: "20 min",
        rationale: "A quick power nap to boost vigilance and reduce microsleep risks during shift crossovers.",
        cycles: 0.2,
      });
    } else {
      // Early morning shift
      const sleepStart = new Date();
      sleepStart.setHours(20, 30, 0, 0); // sleep early at PM
      const sleepEnd = new Date(sleepStart.getTime() + 6 * 60 * 60 * 1000); // 4 cycles

      suggestions.push({
        label: "Early Consolidated Sleep",
        start: formatTime(sleepStart),
        end: formatTime(sleepEnd),
        duration: "6h 0m",
        rationale: "Gives 4 clean sleep cycles to secure early wakeup before morning traffic pressure peaks.",
        cycles: 4,
      });
    }

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
    handleCalculate();
  }, [activeShift, returnHomeTime, useSplitSleep]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="shift-calculator-root">
      <Helmet>
        <title>Sleep Calculator for Night Shift Workers – Day Sleep Schedule</title>
        <meta
          name="description"
          content="Calculate sleep cycles for night shifts. Optimize diurnal sleep, split schedules, and anchors blocks with our interactive sleep calculator for shift workers."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* breadcrumb */}
      <div className="mb-6 flex items-center justify-start text-xs sm:text-sm text-[#6B7280]" id="shift-breadcrumb">
        <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold text-gray-700">Night Shift Sleep Calculator</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" id="shift-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-xs font-semibold mb-3">
          <Moon className="w-4.5 h-4.5" />
          <span>Occupational Circadian Realignment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-4">
          Sleep Calculator for Night Shift Workers
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Tailor-made algorithms to manage daylight sleep schedules, rotation periods, and split-sleep styles recursively while keeping cognitive focus sharp.
        </p>
      </div>

      {/* Active Calculator Box */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl mb-12" id="shift-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls */}
          <div className="space-y-6" id="shift-controls">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                1. Select Shift Sequence Configuration
              </label>
              <div className="space-y-2" id="shift-selector-container">
                {SHIFTS.map((shift) => (
                  <button
                    key={shift.id}
                    id={`btn-shift-${shift.id}`}
                    onClick={() => {
                      setActiveShift(shift.id);
                      if (shift.id !== "night") setUseSplitSleep(false);
                    }}
                    className={`w-full p-3.5 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-center ${
                      activeShift === shift.id
                        ? "border-[#7C3AED] bg-[#7C3AED]/5 text-gray-900"
                        : "border-neutral-200 bg-white text-gray-600 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm sm:text-base">{shift.label}</span>
                      <span className="text-xs font-semibold bg-neutral-200 px-2 py-0.5 rounded-full text-neutral-700">{shift.sleepStrategy}</span>
                    </div>
                    <span className="text-xs text-neutral-500 mt-1">{shift.tip}</span>
                  </button>
                ))}
              </div>
            </div>

            {activeShift === "night" && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2.5">
                  2. Select Sleep Pattern Architecture
                </label>
                <div className="flex gap-2" id="shift-pattern-toggle">
                  <button
                    id="btn-pattern-solid"
                    onClick={() => setUseSplitSleep(false)}
                    className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition-all duration-200 cursor-pointer ${
                      !useSplitSleep
                        ? "border-[#7C3AED] bg-[#7C3AED]/5 text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    Consolidated 7.5 hrs
                  </button>
                  <button
                    id="btn-pattern-split"
                    onClick={() => setUseSplitSleep(true)}
                    className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition-all duration-200 cursor-pointer ${
                      useSplitSleep
                        ? "border-[#7C3AED] bg-[#7C3AED]/5 text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    Split Routine (Anchor + Nap)
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                {activeShift === "night" ? "3. When do you get home in the morning?" : "2. When do you transition from shift?"}
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-neutral-400" />
                <input
                  type="time"
                  className="bg-white border border-neutral-300 rounded-xl px-4 py-2 font-mono text-gray-800 focus:outline-[#7C3AED]"
                  value={returnHomeTime}
                  onChange={(e) => setReturnHomeTime(e.target.value)}
                  id="shift-time-picker"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="flex flex-col justify-between lg:pl-4" id="shift-results-panel">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  Shift Alignment Timeline
                </h3>
                <span className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-1 rounded-full font-bold">
                  Anti-Fatigue Active
                </span>
              </div>

              <div className="space-y-4" id="shift-results-list">
                <AnimatePresence mode="popLayout">
                  {results.map((res, i) => {
                    const isCore = res.label.toLowerCase().includes("core") || res.label.toLowerCase().includes("solid") || res.label.toLowerCase().includes("primary") || res.label.toLowerCase().includes("consolidated");
                    return (
                      <motion.div
                        key={res.label + res.start}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className={`p-5 rounded-3xl border transition-all ${
                          isCore
                            ? "bg-white border-2 border-[#7C3AED] shadow-md"
                            : "bg-white border border-neutral-200 hover:border-[#7C3AED]/40 hover:shadow-xs"
                        }`}
                        id={`shift-res-card-${i}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                            isCore ? "bg-[#7C3AED]/10 text-[#7C3AED]" : "bg-neutral-100 text-neutral-800"
                          }`}>
                            {isCore ? (
                              <Moon className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                            ) : (
                              <Coffee className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            {res.label.toUpperCase()}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                            {res.duration} • {res.cycles} Cyc
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Sleep Phase</span>
                          <div className="flex items-baseline gap-2 font-sans">
                            <span className="text-3xl sm:text-4xl font-black text-[#7C3AED] tracking-tight">
                              {res.start}
                            </span>
                            <span className="text-xs font-bold text-neutral-400 tracking-widest font-mono">
                              UNTIL
                            </span>
                            <span className="text-3xl sm:text-4xl font-black text-[#7C3AED] tracking-tight">
                              {res.end}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-600 mt-3 pt-3 border-t border-neutral-100 leading-relaxed font-normal">
                          {res.rationale}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 bg-[#7C3AED]/5 p-4 rounded-3xl border border-[#7C3AED]/15 text-xs sm:text-sm text-neutral-700 flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">Daytime light protection:</span> Melatonin release is deeply responsive to sunlight waves. Always wear polarized dark glasses on your commute home in the bright morning to secure your melatonin reserves.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SEO Deep content pages */}
      <div className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base bg-white/40 p-6 sm:p-10 rounded-3xl border border-neutral-200" id="shift-seo-content">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            How Shift Work Affects Circadian Rhythms
          </h2>
          <p>
            The human body has an internal 24-hour genetic clock located inside the suprachiasmatic nucleus (SCN). This clock programs your digestive tracts, temperature, and brain wave levels to follow standard day/night solar lines. Utilizing our robust <strong>sleep calculator for night shift workers</strong> allows workers to program artificial circadian shifts logically without accumulating systemic metabolic damage or cognitive fatigue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            What is Split Sleep? Core & Anchor Sleep Strategy
          </h2>
          <p>
            When daytime conditions prevent you from enjoying a solid 7.5-hour horizontal sleep block due to ambient family disruptions, daylight heating, or noise profiles, sleep scientists recommend the <strong>Anchor Sleep</strong> strategy:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Anchor Sleep Block:</strong> Securing a solid 4 to 5 hour nocturnal frame. This block contains the highest concentration of slow-wave deep sleep cycles, preserving basic cognitive status.
            </li>
            <li>
              <strong>Prophylactic Nap:</strong> Triggering a complete 90-minute cycle sequence later during the day directly preceding your night shift. Waking from this nap refreshed provides high vigilance metrics during peak duty periods.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-905">
            Step-by-Step Biohacking Guide for Day Sleeping
          </h2>
          <p>
            To successfully execute nocturnal shift programs, you must configure a bulletproof daytime sleep cave:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li><strong>Total Optical Darkness:</strong> Utilize full-rubberized blackout curtains. Any daylight filtration will hit the retina, suppressing melatonin and inducing micro-wake phases.</li>
            <li><strong>Sensory White Noise:</strong> Run high-frequency fans or pink noise generators to mask passing vehicles or active daylight household movements.</li>
            <li><strong>Thermal Mitigation:</strong> Core body temperature must plunge to initiate sleep. Keep the daytime bedroom chilled around 65°F (18°C).</li>
            <li><strong>Caffeine Fast:</strong> Cease any coffee or energy drinks at least 6 hours before you intend to sleep. Caffeine blocks adenosine receptors, meaning your brain cannot recognize deep fatigue.</li>
          </ol>
        </section>
      </div>

      <div className="mt-8 text-center" id="shift-footer-actions">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] group transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          <span>Back to Main Sleep Calculator</span>
        </Link>
      </div>

    </div>
  );
}
