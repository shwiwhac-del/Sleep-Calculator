import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, GraduationCap, Clock, AlertTriangle, CheckCircle, Sparkles, ArrowLeft, ArrowRight, Sun, Brain } from "lucide-react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";

export default function StudentCalc() {
  const canonicalUrl = getCanonicalUrl("/sleep-calculator-for-students");

  // Age limits / cycles configurations
  const AGES = [
    { id: "baby", label: "Babies (4-11 months)", desc: "12-15 hours sleep", minHours: 12, maxHours: 15, key: "sleep calculator for babies" },
    { id: "toddler", label: "Toddlers (1-2 years)", desc: "11-14 hours sleep", minHours: 11, maxHours: 14, key: "sleep calculator for toddlers" },
    { id: "teenager", label: "Teenagers (13-17 years)", desc: "8-10 hours sleep", minHours: 8, maxHours: 10, key: "sleep calculator for teenagers" },
    { id: "student", label: "College/Adult Stud. (18+)", desc: "7-9 hours sleep", minHours: 7, maxHours: 9, key: "sleep calculator for students" },
  ];

  const [selectedAge, setSelectedAge] = useState("student");
  const [scheduleMode, setScheduleMode] = useState<"regular" | "exam">("regular");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [results, setResults] = useState<{ bedTime: Date; durationHrs: number; cycles: number; qualityScore: number }[]>([]);

  // Function to format Date to 12-hour AM/PM string
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = String(minutes).padStart(2, "0");
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Perform calculation of recommended bedtimes based on target wake up time
  const handleCalculate = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const now = new Date();
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    // If wakeup is earlier or equal to now, target tomorrow morning
    if (targetDate.getTime() <= now.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const ageConfig = AGES.find((a) => a.id === selectedAge) || AGES[3];
    // Exam mode adds 15 minutes to wind down
    const windDownBufferMinutes = scheduleMode === "exam" ? 30 : 15;

    // Standard sleep cycle is 90 mins
    const cycleTimeMinutes = 90;

    const suggestions: typeof results = [];

    // Calculate bedtime candidates by subtracting cycles
    // We normally test between 3 to 10 cycles
    for (let cycles = 3; cycles <= 10; cycles++) {
      const sleepMinutes = cycles * cycleTimeMinutes;
      const totalMinutesToSubtract = sleepMinutes + windDownBufferMinutes;
      const bedtimeCandidate = new Date(targetDate.getTime() - totalMinutesToSubtract * 60000);
      const durationHrs = Number((sleepMinutes / 60).toFixed(1));

      // Filter based on age recommendations
      if (durationHrs >= ageConfig.minHours - 1.5 && durationHrs <= ageConfig.maxHours + 1.5) {
        // Calculate a score out of 100
        let score = 95;
        if (durationHrs < ageConfig.minHours) score -= 15 * (ageConfig.minHours - durationHrs);
        if (durationHrs > ageConfig.maxHours) score -= 10 * (durationHrs - ageConfig.maxHours);

        // Adjust score if exam mode is active and they sleep less
        if (scheduleMode === "exam") {
          if (durationHrs < 7.5) score -= 10; // exams require robust REM stages for memory consolidations
        }

        suggestions.push({
          bedTime: bedtimeCandidate,
          durationHrs,
          cycles,
          qualityScore: Math.min(100, Math.max(30, Math.round(score))),
        });
      }
    }

    // Sort suggests so the highest scores are first, or longest appropriate sleep
    suggestions.sort((a, b) => b.qualityScore - a.qualityScore);
    setResults(suggestions);
  };

  useEffect(() => {
    handleCalculate();
  }, [selectedAge, scheduleMode, wakeTime]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="student-calculator-root">
      <Helmet>
        <title>Sleep Calculator for Students – Optimize Your Exam Bedtime</title>
        <meta
          name="description"
          content="Use our interactive sleep calculator for students, teenagers, and kids to schedule bedtimes for exams, high school schedules, and toddlers."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* breadcrumb */}
      <div className="mb-6 flex items-center justify-start text-xs sm:text-sm text-[#6B7280]" id="student-breadcrumb">
        <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold text-gray-700">Student Sleep Calculator</span>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-10" id="student-header-banner">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-xs font-semibold mb-3">
          <GraduationCap className="w-4.5 h-4.5" />
          <span>Academic Sleep Optimization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-4">
          Sleep Calculator for Students
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Specifically programmed to maximize cognitive performance, study recall, and next-day energy. Whether preparing for critical exams or managing teenage school routines.
        </p>
      </div>

      {/* Core Interactive Widget */}
      <div className="bg-[#FAF6F0]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#E1D8CC] shadow-md mb-12" id="student-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls Side */}
          <div className="flex flex-col gap-6" id="student-inputs">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                1. Select Academic / Age Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="student-age-grid">
                {AGES.map((age) => (
                  <button
                    key={age.id}
                    id={`btn-age-${age.id}`}
                    onClick={() => setSelectedAge(age.id)}
                    className={`p-3 text-left rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-center ${
                      selectedAge === age.id
                        ? "border-[#7C3AED] bg-[#7C3AED]/5 text-gray-900 shadow-sm"
                        : "border-[#E1D8CC] bg-[#FCFAF7] text-gray-600 hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <span className="font-bold text-sm">{age.label}</span>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5">{age.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                2. Academic Intensity Mode
              </label>
              <div className="flex gap-2" id="student-schedule-toggle">
                <button
                  id="btn-mode-regular"
                  onClick={() => setScheduleMode("regular")}
                  className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition-all duration-200 cursor-pointer ${
                    scheduleMode === "regular"
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 text-neutral-900"
                      : "border-[#E1D8CC] bg-[#FCFAF7] text-neutral-600 hover:bg-[#FAF6F0]"
                  }`}
                >
                  Regular Classes
                </button>
                <button
                  id="btn-mode-exam"
                  onClick={() => setScheduleMode("exam")}
                  className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-center text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    scheduleMode === "exam"
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 text-neutral-900"
                      : "border-[#E1D8CC] bg-[#FCFAF7] text-neutral-600 hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Brain className="w-4 h-4 text-[#D4AF37]" />
                  Exam Prep (Extra Buffer)
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-2 italic">
                {scheduleMode === "exam" 
                  ? "Exam Mode allocates an extra 30-min buffer for stress reduction and physical relaxation before your 90-minute cycle sequence initiates." 
                  : "Regular mode utilizes a standard 15-minute wind-down buffer prior to normal sleep onset."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                3. What time do you need to Wake Up?
              </label>
              <TimePicker value={wakeTime} onChange={setWakeTime} mode="wake" />
            </div>
          </div>

          {/* Results Side */}
          <div className="flex flex-col justify-between lg:pl-4" id="student-results">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  Sleep Analysis Results
                </h3>
                <span className="text-xs bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-bold font-mono">
                  Sync Active
                </span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4" id="student-results-list">
                  {/* Hero Suggestion Card (Most Refreshing Spot) */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-[#FCFAF7] border-2 border-[#7C3AED] shadow-sm relative overflow-hidden" id="student-hero-result">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#7C3AED]/4 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-3.5 relative z-10">
                      <span className="bg-[#7C3AED]/10 text-[#7C3AED] px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        RECOMMENDED BEDTIME
                      </span>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md">
                        {results[0].qualityScore}% Score
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 relative z-10">
                      <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Lights Out Bedtime</span>
                      <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] leading-none tracking-tight">
                        {formatTime(results[0].bedTime)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-neutral-100 relative z-10 text-xs text-neutral-600">
                      <div>
                        <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Sleep Architecture</div>
                        <div className="font-bold text-gray-900 mt-0.5">
                          {results[0].cycles} Cycles • {results[0].durationHrs}h Sleep
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider font-mono">Cognitive Retention</div>
                        <div className="font-bold text-emerald-600 mt-0.5">
                          Peak Recall Spot
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative suggestions section */}
                  {results.slice(1, 3).length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mt-2">
                        Alternative schedules (Still healthy)
                      </span>
                      <AnimatePresence mode="popLayout">
                        {results.slice(1, 3).map((res, idx) => (
                          <motion.div
                            key={res.bedTime.toISOString() + res.cycles}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-xs transition-all flex items-center justify-between font-sans"
                            id={`result-card-alt-${idx}`}
                          >
                            <div>
                              <div className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider mb-0.5">
                                {res.cycles} Cycles • {res.durationHrs} Hours Sleep
                              </div>
                              <div className="text-2xl font-black text-gray-900 tracking-tight">
                                {formatTime(res.bedTime)}
                              </div>
                            </div>

                            <div className="text-right flex flex-col items-end">
                              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Score</span>
                              <span className="text-lg font-extrabold text-[#7C3AED] font-mono leading-tight">
                                {res.qualityScore}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500 text-sm">
                  Please alter your coordinates to calculate suggestions.
                </div>
              )}
            </div>

            <div className="mt-6 bg-[#7C3AED]/5 p-4 rounded-3xl border border-[#7C3AED]/15 text-xs sm:text-sm text-[#374151] leading-relaxed flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827]">Pro Study Tip:</span> To maximize retention of dense topics analyzed during late-night study sessions, schedule a bedtime that yields at least <span className="font-bold text-[#7C3AED]">5 full sleep cycles</span>. This guarantees optimal sequence cycles crucial for memory consolidation.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SEO rich-text support and deep content mapping user keywords */}
      <div className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base bg-[#FAF6F0]/40 p-6 sm:p-10 rounded-3xl border border-[#E1D8CC]" id="student-seo-content">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            Why Students Struggle With Inconsistent Habits
          </h2>
          <p>
            Academic environments present unique challenges. High schools and colleges mandate strict early start structures, while assignment loads drag deadlines into midnight blocks. Our <strong>sleep calculator for students</strong> and specialized <strong>sleep calculator for exams</strong> adjust calculations based on natural circadian limits. Waking up exactly when a 90-minute stage concludes reduces sleep inertia and brain fog—the primary culprits behind poor exam performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            Understanding Sleep Demands Across Development Levels
          </h2>
          <p>
            Sleep duration rules change dynamically as children scale through physiological evolution:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Sleep Calculator for Babies:</strong> Infant systems (4 to 11 months) typically demand between 12 to 15 hours of cumulative sleep, divided into solid horizontal sleep stretches and structured afternoon recovery.
            </li>
            <li>
              <strong>Sleep Calculator for Toddlers:</strong> Toddler phases (1 to 2 years) require 11 to 14 total rest hours. Missing these limits triggers severe systemic fatigue.
            </li>
            <li>
              <strong>Sleep Calculator for Teenagers:</strong> Adolescents (13 to 17 years) require 8 to 10 hours. Teenagers experience a natural circadian phase delay, making traditional early high school schedules particularly stressful.
            </li>
            <li>
              <strong>College & Adult Scholars:</strong> College students require approximately 7 to 9 hours of sleep. Balancing social interactions, exams, and classes often leaves them with a chronic sleep debt.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
            How Sleep Consolidates Academic Memory Blocks
          </h2>
          <p>
            During N3 Deep Slow-Wave sleep, the brain transfers newly analyzed facts from the fragile hippocampus (short-term storage) to the robust neocortex (long-term database). Meanwhile, N2 and REM cycles are highly active during creative processing, helping form associations between distinct complex concepts. Cutting your sleep short by even a single 90-minute cycle severely hampers cognitive recall during challenging assessments. Use our interactive planner to determine your optimal bedtime to support memory consolidation!
          </p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-200 flex gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-neutral-700">
              <strong>Beware of Cramming:</strong> Sacrificing rest to prioritize an extra hour of cramming often degrades GPA score metrics. The lack of cognitive focus and recovery impairs analytical thinking, negating any benefits of last-minute reviews.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center" id="student-footer-actions">
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
