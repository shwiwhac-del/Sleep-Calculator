import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Clock, HelpCircle, Activity, Heart, ArrowLeft, Baby, Flame, CheckCircle, Sparkles } from "lucide-react";
import { getCanonicalUrl } from "../lib/seo";

export default function IdealBedtimeCalc() {
  const canonicalUrl = getCanonicalUrl("/ideal-bedtime-based-on-wake-up-time");

  const DEMOGRAPHICS = [
    { id: "baby", label: "Infants (4-11 months)", hours: 13.5, icon: Baby, range: "12-15 hours", cycles: 9 },
    { id: "toddler", label: "Toddlers (1-2 years)", hours: 12.5, icon: Baby, range: "11-14 hours", cycles: 8 },
    { id: "teen", label: "Teenagers (13-17 years)", hours: 9, icon: Activity, range: "8-10 hours", cycles: 6 },
    { id: "adult", label: "Adults (18-64 years)", hours: 7.5, icon: Heart, range: "7-9 hours", cycles: 5 },
    { id: "elder", label: "Seniors (65+ years)", hours: 6.5, icon: Heart, range: "5-7 hours", cycles: 4 },
  ];

  const [wakeTime, setWakeTime] = useState("07:00");
  const [selectedDemo, setSelectedDemo] = useState("adult");
  const [latency, setLatency] = useState(15);
  const [bedtimeOptions, setBedtimeOptions] = useState<{ label: string; sleepTime: Date; cycles: number; duration: number }[]>([]);

  const calculateBedtime = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const targetWake = new Date();
    targetWake.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (targetWake.getTime() <= now.getTime()) {
      targetWake.setDate(targetWake.getDate() + 1);
    }

    const demo = DEMOGRAPHICS.find((d) => d.id === selectedDemo) || DEMOGRAPHICS[3];
    const targetCycles = demo.cycles;

    // Generate options around the target cycles (e.g., target-1, target, target+1)
    const options = [targetCycles + 1, targetCycles, targetCycles - 1].map((c) => {
      // Calculate total minutes to subtract: cycles * 90 min + fall asleep latency
      const totalSleepMinutes = c * 90;
      const totalMinutesToSubtract = totalSleepMinutes + latency;
      
      const bTime = new Date(targetWake.getTime() - totalMinutesToSubtract * 60000);
      
      let label = "Underrested Bedtime";
      if (c === targetCycles) {
        label = "Ideal Primary Bedtime";
      } else if (c > targetCycles) {
        label = "Premium Deep Recovery Bedtime";
      } else {
        label = "Minimal Allowable Bedtime";
      }

      return {
        label,
        sleepTime: bTime,
        cycles: c,
        duration: Number((totalSleepMinutes / 60).toFixed(1)),
      };
    });

    setBedtimeOptions(options);
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
    calculateBedtime();
  }, [wakeTime, selectedDemo, latency]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="ideal-calculator-root">
      <Helmet>
        <title>Ideal Bedtime Based on Wake Up Time – Custom Age Calculator</title>
        <meta
          name="description"
          content="Calculate your ideal bedtime based on your wake up time. Select customized settings for adults, babies, toddlers, and teenagers using sleep cycle calculators."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* breadcrumb */}
      <div className="mb-6 flex items-center justify-start text-xs sm:text-sm text-[#6B7280]" id="ideal-breadcrumb">
        <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold text-gray-700">Ideal Bedtime Calculator</span>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-10" id="ideal-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-xs font-semibold mb-3">
          <Clock className="w-4.5 h-4.5" />
          <span>Biological Bedtime Target Calculators</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-4">
          Ideal Bedtime Based on Wake Up Time
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          Unlock your perfect circadian rhythm key. Enter your wakeup schedule, choose your demographic profile, and see your customized ideal bedtime schedules.
        </p>
      </div>

      {/* Calculator widget frame */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl mb-12" id="ideal-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inputs Section */}
          <div className="space-y-6" id="ideal-inputs">
            <div>
              <label className="block text-sm font-bold text-gray-950 mb-2 font-sans">
                1. Target Morning Wake-Up Time
              </label>
              <input
                type="time"
                className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-2 font-mono text-gray-800 text-lg focus:outline-[#7C3AED] w-full max-w-[12rem]"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                id="ideal-wakeup-input"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-950 mb-2.5 font-sans">
                2. Select Your Age Group Profile
              </label>
              <div className="space-y-2" id="ideal-demo-list">
                {DEMOGRAPHICS.map((demo) => {
                  const IconComp = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      id={`btn-demo-${demo.id}`}
                      onClick={() => setSelectedDemo(demo.id)}
                      className={`w-full p-3.5 text-left rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedDemo === demo.id
                          ? "border-[#7C3AED] bg-[#7C3AED]/5 text-gray-900 shadow-xs"
                          : "border-neutral-200 bg-white text-gray-600 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className="w-5 h-5 text-[#7C3AED]" />
                        <span className="font-bold text-sm">{demo.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-500">{demo.range}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-950 font-sans">
                  3. Wind-Down Sleep onset (Min)
                </label>
                <span className="text-xs font-mono font-bold bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">
                  {latency}m latency
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                className="w-full accent-[#7C3AED] h-1 bg-neutral-200 rounded-lg cursor-pointer"
                value={latency}
                onChange={(e) => setLatency(Number(e.target.value))}
                id="latency-slider"
              />
            </div>
          </div>          {/* Outputs list */}
          <div className="flex flex-col justify-between lg:pl-4" id="ideal-results">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  Ideal Sleep Architecture
                </h3>
                <span className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-1 rounded-full font-bold">
                  Calculated
                </span>
              </div>

              {bedtimeOptions.length > 0 ? (
                <div className="space-y-4" id="ideal-results-container">
                  {/* Hero Suggestion Card (Option 1 is the primary recommended one) */}
                  {(() => {
                    const heroOption = bedtimeOptions[1] || bedtimeOptions[0];
                    return (
                      <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#7C3AED] shadow-md relative overflow-hidden" id="ideal-hero-card">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-[#7C3AED]/4 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-3.5 relative z-10">
                          <span className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full tracking-wide flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            PRIMARY CIRCADIAN GOAL
                          </span>
                          <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md">
                            {heroOption.cycles} Cycles
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 relative z-10">
                          <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Lights-Out Bedtime</span>
                          <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] tracking-tight">
                            {formatTime(heroOption.sleepTime)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-neutral-100 relative z-10 text-xs text-neutral-600">
                          <div>
                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Sleep Duration</div>
                            <div className="font-bold text-gray-900 mt-0.5">
                              {heroOption.duration} Hours Sleep
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider font-mono">Alignment</div>
                            <div className="font-bold text-emerald-600 mt-0.5">
                              {heroOption.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Other bedtime options list */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mt-2">
                      Adjustable cycle variations
                    </span>
                    <AnimatePresence mode="popLayout">
                      {bedtimeOptions.filter((_, i) => i !== 1).map((option, idx) => (
                        <motion.div
                          key={option.cycles}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#7C3AED]/70 hover:shadow-xs transition-all flex items-center justify-between"
                          id={`ideal-card-alt-${idx}`}
                        >
                          <div>
                            <div className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider mb-0.5">
                              {option.cycles} Cycles • {option.duration} Hours Sleep
                            </div>
                            <div className="text-2xl font-black text-gray-900 tracking-tight">
                              {formatTime(option.sleepTime)}
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-end">
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Timing</span>
                            <span className="text-base font-extrabold text-[#7C3AED] font-mono leading-tight">
                              {option.label.split(" ")[0]}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500 text-sm">
                  Please alter your coordinates.
                </div>
              )}
            </div>

            <div className="mt-6 bg-[#7C3AED]/5 p-4 rounded-3xl border border-[#7C3AED]/15 text-xs sm:text-sm text-neutral-700 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">Consistency rule:</span> Sleeping at the exact same hour every single evening aligns peripheral cellular metabolic clocks with the central brain hypothalamus, yielding deeper, uninterrupted sleep quality.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SEO deep explanations */}
      <div className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base bg-white/40 p-6 sm:p-10 rounded-3xl border border-neutral-200" id="ideal-seo-content">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            How to Determine Your Ideal Bedtime
          </h2>
          <p>
            The easiest mathematical system to determine when to sleep is working backwards from your mandatory wakeup schedule. By evaluating our <strong>ideal bedtime based on wake up time</strong>, you avoid randomly guessing when to drift off. Instead, your rest is structurally aligned with the biology of complete NREM/REM sleep cycles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            Pediatric Sleep Windows: Sleep Calculators for Babies & Toddlers
          </h2>
          <p>
            Infant brains develop at astronomical rates. This cognitive acceleration requires massive physical recovery periods:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Sleep Calculator for Babies:</strong> Early infants need a cumulative 12 to 15 hours of rest. Bedtimes should be targeted much earlier inside evening hours (e.g., 7:00 PM) to allow natural morning arousal without sudden alarms.
            </li>
            <li>
              <strong>Sleep Calculator for Toddlers:</strong> Young children demands 11 to 14 sensory recovery hours. Building solid pre-bed ritual routines (bath, reading, darkness) guarantees smooth transitions into their cycles, avoiding cortisol spikes that cause midnight crying spells.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            The Bedtime Matrix: Optimal Hours Across Life Transitions
          </h2>
          <p>
            As the biological clock ages, overall sleep sequence durations trend shorter:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Adolescents (8-10 Hours):</strong> Slower melatonin releases mean teens rarely feel tired before 11 PM. Encourage relaxation periods rather than bright video game screens during this phase.</li>
            <li><strong>Adults (7-9 Hours):</strong> The global metabolic baseline. Straining below 7 hours triggers systemic cellular inflation.</li>
            <li><strong>Seniors (7-8 Hours):</strong> Aging systems often experience circadian phase advancement, triggering very early evening fatigue followed by early morning arousal.</li>
          </ul>
        </section>

      </div>

      <div className="mt-8 text-center" id="ideal-footer-actions">
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
