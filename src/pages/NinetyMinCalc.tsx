import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Layers, HelpCircle, Activity, Hourglass, ArrowLeft, Plus, Minus, Info, Sparkles } from "lucide-react";
import { getCanonicalUrl } from "../lib/seo";

export default function NinetyMinCalc() {
  const canonicalUrl = getCanonicalUrl("/sleep-cycle-calculator-90-minutes");

  const [wakeTime, setWakeTime] = useState("07:00");
  const [cycleLength, setCycleLength] = useState(90); // Average 90 min, adjustable 80-110 min
  const [numCycles, setNumCycles] = useState(5); // Default 5 cycles
  const [fallAsleepTime, setFallAsleepTime] = useState(15); // standard 15 min buffer
  const [calculatedBedtime, setCalculatedBedtime] = useState<Date | null>(null);
  const [cycleRanges, setCycleRanges] = useState<{ count: number; time: Date; label: string; healthy: boolean }[]>([]);

  // Calculate bedtimes
  const calculateBedtimes = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const targetWake = new Date();
    targetWake.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (targetWake.getTime() <= now.getTime()) {
      targetWake.setDate(targetWake.getDate() + 1);
    }

    // Specific bedtime matching active settings
    const totalMinutes = numCycles * cycleLength + fallAsleepTime;
    const targetBedtime = new Date(targetWake.getTime() - totalMinutes * 60000);
    setCalculatedBedtime(targetBedtime);

    // List of multiple cycle options
    const options = [3, 4, 5, 6, 7].map((c) => {
      const minutesToSubtract = c * cycleLength + fallAsleepTime;
      const bTime = new Date(targetWake.getTime() - minutesToSubtract * 60000);
      
      let label = "Underrested";
      let healthy = false;
      if (c === 5 || c === 6) {
        label = "Highly Recommended";
        healthy = true;
      } else if (c === 4) {
        label = "Moderate (Acceptable)";
        healthy = true;
      } else if (c > 6) {
        label = "Long Rest (Oversleep risk)";
        healthy = false;
      }

      return {
        count: c,
        time: bTime,
        label,
        healthy,
      };
    });

    setCycleRanges(options);
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
  }, [wakeTime, cycleLength, numCycles, fallAsleepTime]);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-8 sm:py-12" id="ninety-calculator-root">
      <Helmet>
        <title>Sleep Cycle Calculator 90 Minutes – Calculate Cycles & Bedtime</title>
        <meta
          name="description"
          content="Calculate sleep cycles based on the 90-minute formula. Adjust custom cycle lengths and fall asleep latency with our interactive sleep cycle calculator."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* breadcrumb */}
      <div className="mb-6 flex items-center justify-start text-xs sm:text-sm text-[#6B7280]" id="ninety-breadcrumb">
        <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold text-gray-700 font-sans">90-Minute Sleep Cycle Calculator</span>
      </div>

      {/* Header banner */}
      <div className="text-center mb-10" id="ninety-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-xs font-semibold mb-3">
          <Layers className="w-4.5 h-4.5" />
          <span>Biological Rhythm Mathematical Systems</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-4">
          Sleep Cycle Calculator – 90 Minutes
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          The ultimate bedtime planner using the standard 90-minute cycle paradigm. Tailor your average cycle duration and sleep onset latency for pixel-perfect circadian planning.
        </p>
      </div>

      {/* Visual Interaction Section */}
      <div className="bg-[#FAF6F0]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#E1D8CC] shadow-md mb-12" id="ninety-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls column */}
          <div className="space-y-6" id="ninety-controls">
            <div>
              <label className="block text-sm font-bold text-gray-950 mb-2 font-sans">
                1. Target Wake-up Time
              </label>
              <input
                type="time"
                className="bg-[#FCFAF7] border border-[#E1D8CC] rounded-xl px-4 py-2 font-mono text-gray-800 text-lg focus:outline-[#7C3AED]"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                id="ninety-time"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-950 font-sans">
                  2. Average Cycle Duration (Min)
                </label>
                <span className="text-xs font-mono font-bold bg-[#7C3AED]/10 text-[#7C3AED] px-2 py-0.5 rounded-full">
                  {cycleLength} minutes
                </span>
              </div>
              <div className="flex items-center gap-2" id="ninety-length-inputs">
                <button
                  id="btn-length-minus"
                  onClick={() => setCycleLength(Math.max(80, cycleLength - 5))}
                  className="p-2 border border-neutral-205 rounded-xl hover:bg-neutral-50 cursor-pointer text-gray-700 active:scale-95 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="80"
                  max="110"
                  step="5"
                  className="flex-1 accent-[#7C3AED] h-1 bg-neutral-200 rounded-lg cursor-pointer"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                />
                <button
                  id="btn-length-plus"
                  onClick={() => setCycleLength(Math.min(110, cycleLength + 5))}
                  className="p-2 border border-neutral-205 rounded-xl hover:bg-neutral-50 cursor-pointer text-gray-700 active:scale-95 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1 italic">
                While 90 minutes is the physiological average, typical human cycles fluctuate genetically between 80 to 110 minutes throughout the night.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-953 font-sans">
                  3. Latency to Fall Asleep (Min)
                </label>
                <span className="text-xs font-mono font-bold bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">
                  {fallAsleepTime}m latency
                </span>
              </div>
              <div className="flex items-center gap-2" id="ninety-latency-inputs">
                <button
                  id="btn-latency-minus"
                  onClick={() => setFallAsleepTime(Math.max(0, fallAsleepTime - 5))}
                  className="p-2 border border-neutral-205 rounded-xl hover:bg-neutral-50 cursor-pointer text-gray-700 active:scale-95 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="5"
                  className="flex-1 accent-[#7C3AED] h-1 bg-neutral-200 rounded-lg cursor-pointer"
                  value={fallAsleepTime}
                  onChange={(e) => setFallAsleepTime(Number(e.target.value))}
                />
                <button
                  id="btn-latency-plus"
                  onClick={() => setFallAsleepTime(Math.min(45, fallAsleepTime + 5))}
                  className="p-2 border border-neutral-205 rounded-xl hover:bg-neutral-50 cursor-pointer text-gray-700 active:scale-95 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results visualization */}
          <div className="flex flex-col justify-between lg:pl-4" id="ninety-results">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#7C3AED]" />
                  REM Cycle Analysis
                </h3>
                <span className="text-xs bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-bold font-mono">
                  Adaptive
                </span>
              </div>

              {/* Active Selection Hero Card */}
              {calculatedBedtime && (
                <div className="p-6 sm:p-7 rounded-3xl bg-[#FCFAF7] border-2 border-[#7C3AED] shadow-sm mb-5 relative overflow-hidden" id="ninety-hero-card">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#7C3AED]/4 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-3.5 relative z-10">
                    <span className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      ACTIVE BEDTIME TARGET
                    </span>
                    <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md">
                      {numCycles} Cycles
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-10">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Lights Out Bedtime</span>
                    <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] tracking-tight">
                      {formatTime(new Date(calculatedBedtime.getTime()))}
                    </div>
                  </div>

                  {/* Sleep Timeline Visualization */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 relative z-10">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono font-bold mb-2">Rest Chronology</div>
                    <div className="flex items-center gap-1 text-xs">
                      <div className="flex-1 bg-[#7C3AED]/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#7C3AED] h-full w-[30%]" />
                      </div>
                      <span className="text-neutral-400 font-mono text-[9px]">Latency</span>
                      <div className="flex-[4] bg-emerald-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-full" />
                      </div>
                      <span className="text-emerald-600 font-mono text-[10px] font-bold">{((numCycles * cycleLength) / 60).toFixed(1)}h sleep</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative cycles options */}
              <div className="space-y-2" id="ninety-list-items">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Explore other cycle options
                </span>
                {cycleRanges.map((option, idx) => {
                  const isActive = option.count === numCycles;
                  return (
                    <div
                      key={option.count}
                      onClick={() => setNumCycles(option.count)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "border-[#7C3AED] bg-[#7C3AED]/5"
                          : "border-[#E1D8CC] bg-[#FAF6F0] hover:border-[#7C3AED]"
                      }`}
                      id={`ninety-option-card-${idx}`}
                    >
                      <div>
                        <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 font-mono">
                          <span>{option.count} Cycles • {((option.count * cycleLength) / 60).toFixed(1)} hrs</span>
                          {option.healthy && <span className="text-[9px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded font-sans">OPTIMAL</span>}
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-sans">
                          {calculatedBedtime && formatTime(option.time)}
                        </div>
                      </div>
                      <button
                        id={`btn-select-cycle-${option.count}`}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                          isActive
                            ? "bg-[#7C3AED] text-white"
                            : "border border-[#E1D8CC] bg-[#FCFAF7] text-neutral-700 hover:bg-[#FAF6F0]"
                        }`}
                      >
                        {isActive ? "Active" : "Select"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-[#7C3AED]/5 p-4 rounded-3xl border border-[#7C3AED]/15 text-xs sm:text-sm text-neutral-700 flex items-start gap-3 select-none">
              <Hourglass className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">How many sleep cycles do I need?</span> For healthy adults, completing <strong>5 to 6 full cycles</strong> (7.5 to 9 hours) represents the absolute clinical standard. Sleeping below 4 cycles triggers immediate grogginess.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO-optimized informative texts */}
      <div className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base bg-[#FAF6F0]/40 p-6 sm:p-10 rounded-3xl border border-[#E1D8CC]" id="ninety-seo-content">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            What is the 90-Minute Sleep Cycle Formula?
          </h2>
          <p>
            When we sleep, our brains do not remain static. Instead, we progress recursively through an architectural pattern of neural signals and physical recovery states called <strong>sleep cycles</strong>. For healthy human bodies, each cycle occupies approximately <strong>90 minutes</strong>. Using our specialized <strong>sleep cycle calculator 90 minutes</strong> algorithm allows you to target awakening transitions precisely at the tail-end of cycles during Light Sleep—fully bypassing the crippling effects of sleep inertia.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            Inside the Chronology of a 90-Minute Cycle Sequence
          </h2>
          <p>
            A perfect cycle sequence contains four primary phases structured proportionally:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" id="stages-grid">
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC]">
              <span className="text-xs font-bold font-mono text-[#7C3AED]">STAGE 1 & 2 (NREM)</span>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5">Light Gateway phase</h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Occupies approximately 50-60% of cycle lengths. Heart rates relax, brain waves decline, enabling quick sensory arousal.
              </p>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC]">
              <span className="text-xs font-bold font-mono text-[#D4AF37]">STAGE 3 (NREM)</span>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5">Deep Slow-Wave Rest</h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                The most critical phase for cellular restoration, skeletal growth, tissue repair, and biological defense reinforcement.
              </p>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC]">
              <span className="text-xs font-bold font-mono text-cyan-600">STAGE 4 (REM)</span>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5">Active Dream State</h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Essential for creative synthesis, logical memory filing, and chemical detoxification of neural pathways.
              </p>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC]">
              <span className="text-xs font-bold font-mono text-emerald-600">TERMINAL POINT</span>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5">The Wake Window</h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                The terminal minutes of each cycle are highly close to normal consciousness templates, making this the perfect awake target.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            How Many Sleep Cycles Do I Need Each Night?
          </h2>
          <p>
            The general consensus is that healthy adults must strive for <strong>5 cycles</strong> (7.5 hours) or <strong>6 cycles</strong> (9 hours) to achieve continuous cognitive health:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>3 Cycles (4.5 hours):</strong> Highly restricted. Triggers metabolic fatigue. Perfect for short-term emergency schedules only.</li>
            <li><strong>4 Cycles (6.0 hours):</strong> Acceptable for some short-term periods, but leads to progressive cognitive debt over a long sequence.</li>
            <li><strong>5 Cycles (7.5 hours):</strong> The average adult standard. Meets minimum neurological demands cleanly.</li>
            <li><strong>6 Cycles (9.0 hours):</strong> Outstanding. Highly recommended for physical athletes, students entering heavy exams, or recovery periods.</li>
          </ul>
        </section>
      </div>

      <div className="mt-8 text-center" id="ninety-footer-actions">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] group transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          <span>Back to Our Main Sleep Calculator</span>
        </Link>
      </div>

    </div>
  );
}
