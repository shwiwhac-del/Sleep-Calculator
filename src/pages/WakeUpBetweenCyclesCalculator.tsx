import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldAlert, Check, RefreshCw, Sun, Clock, Eye, Sparkles, ArrowLeft } from "lucide-react";
import { getCanonicalUrl } from "../lib/seo";

export default function WakeUpBetweenCyclesCalculator() {
  const canonicalUrl = getCanonicalUrl("/wake-up-between-sleep-cycles");

  const [bedtimeMode, setBedtimeMode] = useState<"now" | "specific">("specific");
  const [targetTime, setTargetTime] = useState("23:00");
  const [latency, setLatency] = useState(15);
  const [results, setResults] = useState<{ cycle: number; time: Date; score: number; text: string; optimal: boolean }[]>([]);

  // Calculate perfect alarm wake times to wake up between cycles
  const calculateAlarms = () => {
    let baseTime = new Date();

    if (bedtimeMode === "specific") {
      const [hours, minutes] = targetTime.split(":").map(Number);
      baseTime.setHours(hours, minutes, 0, 0);
      
      const now = new Date();
      if (baseTime.getTime() < now.getTime() - 12 * 60 * 60 * 1000) {
        baseTime.setDate(baseTime.getDate() + 1);
      }
    }

    const suggestions: typeof results = [];
    const cycleTime = 90;

    // Standard N1 transition cycle peaks
    // Test 3, 4, 5, 6, 7 cycles
    [3, 4, 5, 6, 7].forEach((c) => {
      const totalMinutes = c * cycleTime + latency;
      const targetWakeTime = new Date(baseTime.getTime() + totalMinutes * 60000);
      
      let score = 55;
      let text = "Abbreviated Rest";
      let optimal = false;

      if (c === 5) {
        score = 98;
        text = "Excellent Rest Window";
        optimal = true;
      } else if (c === 6) {
        score = 95;
        text = "Complete Cycle Alignment";
        optimal = true;
      } else if (c === 4) {
        score = 80;
        text = "Healthy Minimum Rest";
        optimal = false;
      } else if (c === 3) {
        score = 50;
        text = "Emergency Sleep - Low Energy";
        optimal = false;
      } else {
        score = 75;
        text = "Extended Rest - Micro inertia risk";
        optimal = false;
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
  }, [bedtimeMode, targetTime, latency]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="wake-cycles-calculator-root">
      <Helmet>
        <title>Wake Up Between Sleep Cycles Calculator – Morning Refreshment</title>
        <meta
          name="description"
          content="Learn how to wake up between sleep cycles to conquer morning grogginess. Calculate exact bedtime and alarm times with our interactive refresh calculator."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* breadcrumb */}
      <div className="mb-6 flex items-center justify-start text-xs sm:text-sm text-[#6B7280]" id="wake-cycles-breadcrumb">
        <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold text-gray-700 font-sans">Wake Up Between Cycles Calculator</span>
      </div>

      {/* Header banner */}
      <div className="text-center mb-10" id="wake-cycles-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-xs font-semibold mb-3">
          <Sun className="w-4.5 h-4.5 text-[#D4AF37]" />
          <span>Vigilance & Restorative Alarm Planning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-4">
          Wake Up Between Sleep Cycles
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          Grogginess isn't caused by sleeping too little—it's caused by waking up mid-way through Deep Sleep. Calculate perfect transitions to awake fresh.
        </p>
      </div>

      {/* Interactive module block */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl mb-12" id="wake-cycles-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls column */}
          <div className="space-y-6" id="wake-cycles-controls">
            <div>
              <label className="block text-sm font-bold text-gray-950 mb-2.5 font-sans">
                1. Select Bedtime Strategy
              </label>
              <div className="flex gap-2" id="strategy-toggles">
                <button
                  id="btn-strategy-now"
                  onClick={() => setBedtimeMode("now")}
                  className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition cursor-pointer ${
                    bedtimeMode === "now"
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 text-black"
                      : "border-neutral-200 bg-white text-[#6B7280] hover:bg-neutral-50"
                  }`}
                >
                  If I Sleep Now
                </button>
                <button
                  id="btn-strategy-specific"
                  onClick={() => setBedtimeMode("specific")}
                  className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition cursor-pointer ${
                    bedtimeMode === "specific"
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 text-black"
                      : "border-neutral-200 bg-white text-[#6B7280] hover:bg-neutral-50"
                  }`}
                >
                  Plan Custom Bedtime
                </button>
              </div>
            </div>

            {bedtimeMode === "specific" && (
              <div>
                <label className="block text-sm font-bold text-gray-950 mb-2 font-sans">
                  2. What time do you plan to get into bed?
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <input
                    type="time"
                    className="bg-white border border-neutral-300 rounded-xl px-4 py-2 font-mono text-gray-800 text-lg focus:outline-[#7C3AED]"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    id="specific-bedtime-picker"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-950 font-sans">
                  {bedtimeMode === "specific" ? "3. Fall asleep wind-down (Min)" : "2. Fall asleep wind-down (Min)"}
                </label>
                <span className="text-xs font-mono font-bold bg-[#7C3AED]/10 text-[#7C3AED] px-2 py-0.5 rounded-full">
                  {latency} min buffer
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
              <p className="text-[11px] text-neutral-500 mt-1 italic">
                Humans typically spend between 10 to 20 minutes drifting into active non-REM Light Sleep stages.
              </p>
            </div>
          </div>

          {/* Results section */}
          <div className="flex flex-col justify-between lg:pl-4" id="wake-cycles-results">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  Awakening Time Options
                </h3>
                <span className="text-xs bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                  Perfect Sync
                </span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4" id="wake-results-list">
                  {/* Hero Suggestion Card (Most Refreshing Spot - usually cycle 5 or 6) */}
                  {(() => {
                    const heroRes = results.find(r => r.cycle === 5) || results[2] || results[0];
                    return (
                      <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#7C3AED] shadow-md relative overflow-hidden" id="wake-hero-card">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-[#7C3AED]/4 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-3.5 relative z-10">
                          <span className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full tracking-wide flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                            PEAK REFRESH ALARM
                          </span>
                          <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md">
                            {heroRes.cycle} Cycles
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 relative z-10">
                          <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Set Alarm Clock To</span>
                          <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] tracking-tight">
                            {formatTime(heroRes.time)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-neutral-100 relative z-10 text-xs text-neutral-600">
                          <div>
                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Alignment State</div>
                            <div className="font-bold text-gray-900 mt-0.5">
                              {heroRes.text}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider font-mono">Alertness Index</div>
                            <div className="font-bold text-emerald-600 mt-0.5">
                              {heroRes.score}/100 Safe Spot
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Alternative candidate list */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mt-2">
                      Other clean wake-up windows
                    </span>
                    <AnimatePresence mode="popLayout">
                      {results.filter(r => r.cycle !== 5).slice(0, 3).map((res, idx) => (
                        <motion.div
                          key={res.cycle}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#7C3AED]/70 hover:shadow-xs transition-all flex items-center justify-between"
                          id={`alarm-card-alt-${idx}`}
                        >
                          <div>
                            <div className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider mb-0.5">
                              {res.cycle} Cycles • {res.text}
                            </div>
                            <div className="text-2xl font-black text-gray-900 tracking-tight">
                              {formatTime(res.time)}
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-end">
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Index</span>
                            <span className="text-lg font-extrabold text-[#7C3AED] font-mono leading-tight">
                              {res.score}/100
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500 text-sm">
                  Please alter your coordinates to calculate suggestions.
                </div>
              )}
            </div>

            <div className="mt-6 bg-[#7C3AED]/5 p-4 rounded-3xl border border-[#7C3AED]/15 text-xs sm:text-sm text-neutral-700 flex items-start gap-3 select-none">
              <RefreshCw className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">How to wake up feeling refreshed:</span> Avoid snoozing. Hitting snooze overrides your circadian biological timer, sending your systems sliding back down into fresh, deep sleep cycles that severely compound grogginess.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO copy content targeting key terms */}
      <div className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base bg-white/40 p-6 sm:p-10 rounded-3xl border border-neutral-200" id="wake-cycles-seo-content">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            The Scientific Secret: Why Alarm Timing Matters More Than Length
          </h2>
          <p>
            Many believe that chronic tiredness stems strictly from sleeping fewer than 8 hours. However, waking up feeling groggy is highly linked to <strong>sleep cycles</strong>. Waking up during Stage 3 (Deep Sleep/Slow-Wave Sleep) interrupts physiological tissue recovery and cerebral recharge. Waking up here leaves you with extreme <strong>sleep inertia</strong>—a clinical state of confusion and morning brain fog. Our customized planner helps you find the exact window to <strong>wake up between sleep cycles</strong> easily!
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            How to Wake Up Feeling Refreshed: 3 Chronobiological Pillars
          </h2>
          <p>
            Reasserting authority over your groggy morning states requires three physical interventions:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Pillar 1: Align Alarms with 90-Minute Cycles.</strong> By scheduling wake-up targets exactly at the completion of a cycle (N1 transition), you exit sleep gracefully with heart rate and cortisol levels prepared for continuous arousal.
            </li>
            <li>
              <strong>Pillar 2: Leverage Instant Photonic Inputs.</strong> As soon as your alarm triggers, flood your eyes with daylight. Morning sunlight signals the pituitary gland to cease melatonin production, suppressing subsequent grogginess instantly.
            </li>
            <li>
              <strong>Pillar 3: Hydrate to Re-establish Blood Volume.</strong> Cellular dehydration reduces oxygen distribution to the brain, compounding mental fatigue. Consume a large glass of water immediately upon rising to support system startup!
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            Critical FAQ Regarding Sleep Cycle Transitions
          </h2>
          <div className="space-y-4" id="faq-blocks">
            <div className="p-4 bg-white rounded-2xl border border-neutral-250">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">What is sleep inertia?</h4>
              <p className="text-xs sm:text-sm text-neutral-600">
                Sleep inertia is the dull, heavy groggy transition period immediately following awakening. It is caused by cellular debris and remaining adenosine reserves inside cerebral synapses when awakened abruptly while in Deep Slow-Wave phases.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-250">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Can power naps cause grogginess?</h4>
              <p className="text-xs sm:text-sm text-neutral-600">
                Yes, if they exceed 25 minutes yet fail to reach a complete 90-minute cycle. Standard naps should be capped under 20 minutes to remain in Stage 1 & 2 (Light Sleep), avoiding progress into slow-wave depth.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-8 text-center" id="wake-cycles-footer-actions">
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
