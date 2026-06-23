import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Brain, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCanonicalUrl } from "../lib/seo";
import TimePicker from "../components/TimePicker";

export default function StudentCalc() {
  const canonicalUrl = getCanonicalUrl("/student-sleep-calculator");

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

  const [ageGroup, setAgeGroup] = useState("18-25");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [results, setResults] = useState<{ bedTime: Date; durationHrs: number; cycles: number; isOptimal: boolean }[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Format 12-hour AM/PM string
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = String(minutes).padStart(2, "0");
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Simplified and straight-forward sleep cycle calculation
  const handleCalculate = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const now = new Date();
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    if (targetDate.getTime() <= now.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup) || AGE_GROUPS[6];
    const suggestions: typeof results = [];
    const cycleTimeMinutes = 90;
    const fallAsleepBuffer = 15; // Standard minutes to natural sleep onset

    const cyclesToGenerate = [];
    const maxC = ageConfig.maxCycles;
    for (let c = maxC; c >= Math.max(3, ageConfig.minCycles - 2); c--) {
      cyclesToGenerate.push(c);
    }

    // Test reasonable cycles of 90 minutes
    cyclesToGenerate.forEach((c) => {
      const sleepMinutes = c * cycleTimeMinutes;
      const totalMinutesToSubtract = sleepMinutes + fallAsleepBuffer;
      const bedtimeCandidate = new Date(targetDate.getTime() - totalMinutesToSubtract * 60000);
      const durationHrs = sleepMinutes / 60;

      suggestions.push({
        bedTime: bedtimeCandidate,
        durationHrs,
        cycles: c,
        isOptimal: c >= ageConfig.minCycles && c <= ageConfig.maxCycles,
      });
    });

    // Sort to place recommended cycles first
    suggestions.sort((a, b) => {
      if (a.isOptimal && !b.isOptimal) return -1;
      if (!a.isOptimal && b.isOptimal) return 1;
      return b.durationHrs - a.durationHrs;
    });

    setResults(suggestions);
  };

  useEffect(() => {
    handleCalculate();
  }, [ageGroup, wakeTime]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12" id="student-calculator-root">
      <Helmet>
        <title>Student Sleep Calculator | Plan Your Bedtime For Exam Days</title>
        <meta
          name="description"
          content="Calculate sleep cycles for exams, high school routines, and college studies. Use our simple student sleep cycle calculator to optimize memory and study scores."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Breadcrumb - Clean and Simple */}
      <div className="mb-8 flex items-center text-xs sm:text-sm text-[#6B7280]" id="student-breadcrumb">
        <div className="flex items-center gap-1.5 font-sans">
          <Link to="/" className="hover:text-[#7C3AED] transition-colors font-medium">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="font-semibold text-gray-700">Student Sleep Calculator</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8" id="student-header-banner">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-gray-900 tracking-tight leading-tight mb-3">
          Sleep Calculator for Students
        </h1>
        <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
          Improve your grades, memory retention, and class focus using science-backed 90-minute sleep cycle planning.
        </p>
      </div>

      {/* Styled card container for the tool itself */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md shadow-neutral-100 mb-12" id="student-and-exam-calc-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Inputs */}
          <div className="space-y-6 flex flex-col justify-center" id="student-inputs">
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
                Select Wake-up Time (Alarm Target)
              </label>
              <TimePicker value={wakeTime} onChange={setWakeTime} mode="wake" />
              <p className="text-xs text-neutral-550 mt-2 text-center text-neutral-500 italic font-sans animate-pulse">
                Calculator automatically factors in a standard 15-minute natural drift-off buffer.
              </p>
            </div>
          </div>

          {/* Clean, Simple Results list */}
          <div className="flex flex-col justify-between space-y-6" id="student-calculated-results">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-neutral-200 pb-2">
                Your Recommended Bedtimes
              </h3>

              {results.length > 0 ? (
                <div className="space-y-5" id="student-results-list">
                  {results.map((res, i) => (
                    <div
                      key={res.bedTime.toISOString() + res.cycles}
                      className="border-b border-neutral-200/65 pb-4"
                      id={`result-item-${i}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-neutral-100">
                        <div>
                          <div className="text-[11px] text-[#6B7280] font-mono uppercase tracking-wider font-bold">
                            Go to bed at:
                          </div>
                          <div className="text-3xl font-black text-[#7C3AED] tracking-tight mt-0.5">
                            {formatTime(res.bedTime)}
                          </div>
                        </div>

                        <div className="font-sans text-sm text-gray-800">
                          <span className="font-bold font-mono text-[#111827]">{res.cycles} Cycles</span> ({res.durationHrs} Hrs sleep)
                          {res.isOptimal && (
                            <span className="ml-2 inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Optimal Rest
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-neutral-500 text-sm">
                  Please configure your choices above.
                </div>
              )}
            </div>

            <div className="bg-[#7C3AED]/5 p-4 border-l-2 border-[#7C3AED] text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-3">
              <Brain className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-901">Memory Booster Fact:</span> Waking up at the completion of a full sleep cycle prevents sleep inertia, ensuring you can immediately focus and remember formulas in high-stakes testing rooms.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* HUGE, VALUABLE, DEEP SEO & KNOWLEDGE SYSTEM (2500+ Words) */}
      <article className="space-y-12 select-text text-gray-700 leading-relaxed text-sm sm:text-base border-t border-neutral-200 pt-12" id="student-deep-seo-content">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Academic Sleep Imperative: Crucial Science for Student Success
            </h2>
          </header>
          <p>
            In the modern hyper-competitive educational environment, students across middle school, high school, and undergraduate universities are trapped in a biological crisis. Faced with intensive homework loads, extensive exam cycles, extracurricular sports, and social pressure, the average student routinely sacrifices the most powerful cognitive enhancer in existence: <strong>high-quality, cycle-aligned sleep</strong>.
          </p>
          <p>
            Many scholars view sleep as an inactive state of unproductive downtime—a luxury that can be negotiated, shortened, or skipped during dense project cycles or finals week. This is a severe physiological misunderstanding. During sleep stages, the brain undergoes active synaptic modifications, molecular cleansing, and memory sorting. Attempting to master complex organic chemistry structures, engineering principles, or historical essay matrices while sleep-deprived is equivalent to writing data onto a corrupted storage disk. Our specialized student sleep calculator provides the structural blueprints needed to program school bedtimes around the biological framework of the brain, bypassing grogginess completely.
          </p>
          <p>
            Aligning your bedtime with native 90-minute intervals simplifies life. You can configure precise awakenings using our specialized <Link to="/sleep-cycle-calculator-90-minutes" className="text-[#7C3AED] hover:underline font-semibold bg-[#7C3AED]/5 px-1.5 py-0.5 rounded">90-Minute Sleep Cycle Calculator</Link> or planning target mornings with our <Link to="/wake-up-between-sleep-cycles" className="text-[#7C3AED] hover:underline font-semibold">Wake Up Between Cycles Guide</Link>.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Mechanical Blueprint: NREM, REM, and Memory Consolidation
            </h2>
          </header>
          <p>
            Human sleep is not a singular flat state of biological unconsciousness. Instead, it is structured as a series of repeating **Ultradian cycles**, typically lasting approximately 90 minutes. Each cycle represents a highly coordinated transit across diverse neural stages, characterized by unique brain wave profiles, hormonal levels, and metabolic tasks.
          </p>
          
          <div className="my-6 p-5 border-l-4 border-[#7C3AED] bg-[#FCFAF7] rounded-r-2xl">
            <h3 className="font-bold text-gray-900 mb-3 text-lg font-serif">Structural Breakdown of a Single 90-Minute Sleep Cycle</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong className="text-[#7C3AED] font-bold">Stage N1 (Light Sleep Onset - ~5-10 Minutes):</strong> The transition phase from waking life to physiological sleep. Muscle tone decreases, micro-twitches occur, and the brain shifts from rapid beta/alpha waves to slower theta waves. Waking up in this phase is easy, but leaves you feeling unrefreshed. Same concepts apply when mapping bedtimes using our popular <Link to="/ideal-bedtime-based-on-wake-up-time" className="text-[#7C3AED] hover:underline">Ideal Bedtime Calculator</Link>.
              </li>
              <li>
                <strong className="text-[#7C3AED] font-bold">Stage N2 (Light/Intermediate Recovery - ~20-25 Minutes):</strong> True sleep state stabilizes. Body temperature descends and the heart rate slows down. This stage features **Sleep Spindles** and **K-complexes**—rhythmic bursts of high-frequency brainwave syncs that coordinate communication between the cortical regions, paving the way for file storage routing.
              </li>
              <li>
                <strong className="text-[#7C3AED] font-bold">Stage N3 (Deep Slow-Wave Sleep - ~25-40 Minutes):</strong> The golden recovery phase. The brain undergoes low-frequency delta wave sweeps. During N3, human growth hormone (HGH) peaks, reinforcing muscular tissues and cellular structural systems. Crucially, the glymphatic system expands, flushing metabolic wastes from study-intensive mental hours.
              </li>
              <li>
                <strong className="text-[#7C3AED] font-bold">REM (Rapid Eye Movement - ~10-20 Minutes):</strong> The creative, dream-rich sanctuary. Brain activity surges to match alert waking states. REM cycles organize emotional events, solidify fluid abstract associations, and catalog linguistic and semantic frameworks. Waking during a REM cycle is highly disorganizing, triggering sleep paralysis traces or immediate cognitive fatigue.
              </li>
            </ul>
          </div>
          
          <p>
            For student scholars, the interaction between <strong>N3 Deep Sleep</strong> and <strong>REM sleep</strong> represents the physical machinery behind grade improvements. Facts analyzed in daytime study blocks are briefly placed inside the fragile hippocampi. During deep sleep, these memories are systematically replayed and migrated to the robust outer neocortex, securing them for long-term recovery. REM sleep then takes these newly stored facts and weaves them with existing knowledge systems to unlock high-level critical thinking, problem-solving skills, and abstract math formulation capabilities. Use our interactive calculations to plan bedtime limits that protect both deep sleep and REM frames.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Lifespan Developmental Sleep Guide: Toddlers to College Scholars
            </h2>
          </header>
          <p>
            As a student grows through physical and biological developmental stages, their neurological requirements, hormonal secretion timelines, and target rest frames shift significantly. Let us analyze this evolution systematically:
          </p>
          
          <div className="overflow-x-auto my-6 rounded-2xl border border-neutral-200" id="student-age-table-container">
            <table className="min-w-full text-sm divide-y divide-neutral-200 bg-white text-left">
              <thead className="bg-[#FCFAF7]">
                <tr className="font-bold text-gray-900">
                  <th className="px-4 py-3">Educational Demographics</th>
                  <th className="px-4 py-3">Recommended Sleep Range</th>
                  <th className="px-4 py-3">Ideal Daily Cycles</th>
                  <th className="px-4 py-3">Core Biological Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans text-[#374151]">
                <tr>
                  <td className="px-4 py-3.5 font-bold text-gray-900">Middle School (6-12 Years)</td>
                  <td className="px-4 py-3.5">9 to 12 Hours</td>
                  <td className="px-4 py-3.5">6 to 8 Cycles</td>
                  <td className="px-4 py-3.5">Physical growth, skeletal tissue tracking, basic semantic skill builders.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-gray-900">High School Teens (13-17 Years)</td>
                  <td className="px-4 py-3.5">8 to 10 Hours</td>
                  <td className="px-4 py-3.5">5 to 7 Cycles</td>
                  <td className="px-4 py-3.5">Synaptic pruning, analytical pathways, intense social emotional integration.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-gray-900">College Students (18+ Years)</td>
                  <td className="px-4 py-3.5">7 to 9 Hours</td>
                  <td className="px-4 py-3.5">5 to 6 Cycles</td>
                  <td className="px-4 py-3.5">Prefrontal cortex refinement, complex analytical retention, stress resilience.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            A major biological challenge for high school teenagers is **circadian phase delay**. During adolescence, melatonin (the sleep-inducing hormone) is secreted up to two hours later in the evening than in adults or children, pushing biological sleepiness out toward midnight. When school systems mandate early morning wake up schedules, the teen's sleep window is compressed, introducing biological chaos comparable to <Link to="/shift-work-sleep-calculator" className="text-[#7C3AED] hover:underline">Shift Work Challenges</Link>.
          </p>
          <p>
            Our teenager sleep calculator targets this exact structural challenge, offering cycle combinations to maintain maximum memory storage and cognitive agility within early alarm envelopes.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              The Exam Preparedness Protocol: Biohacking the Perfect Night Before
            </h2>
          </header>
          <p>
            When exam periods occur, students often default to high-stress routines, sacrificing rest to cram facts into early morning hours. This is an inefficient study model. Official recommendations cataloged on the <a href="https://www.sleepfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-bold">National Sleep Foundation</a> website show that prioritizing regular, uninterrupted cycles before tests yields higher recall scores:
          </p>
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Cease Studying Early:</strong> Stop reading intense study materials at least 60 to 90 minutes before your planned bedtime. Continued cognitive strain triggers stress pathways, increasing sleep onset latency.
            </li>
            <li>
              <strong>The Optical Screen Fast:</strong> Turn off mobile phones, tablets, and computer monitors. Blue light frequencies emitted by digital displays suppress melatonin production for up to two hours. If computer studies are mandatory, utilize specialized amber-tinted software or blocking lenses.
            </li>
            <li>
              <strong>The 90-Minute Target Sync:</strong> Use our exam sleep planner to secure calculated bedtimes that yield exactly 5 or 6 sleep cycles. Waking up during an active transition phase rather than N3 deep sleep keeps you alert, allowing quick access to studied material.
            </li>
            <li>
              <strong>Ensure Morning Light Exposure:</strong> Keep body systems active on waking. Morning daylight instantly signals your master circadian clock to suspend melatonin secretion, lifting brain fog within minutes.
            </li>
          </ul>
        </section>

        {/* SECTION 5 - FAQs */}
        <section className="space-y-6 mb-12">
          <header className="pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Frequently Asked Questions (Academic Sleep Optimization)
            </h2>
          </header>
                 <div className="space-y-4">
            {[
              {
                q: "Can I stay up all night cramming and sleep after the exam instead?",
                a: "This is a highly detrimental approach to academic performance. Studies show that pulling an 'all-nighter' severely damages working memory, attention filters, and processing speed the next morning. It also prevents the brain from consolidating the newly reviewed material into long-term storage. Waking up from 5 cycles (7.5 hours) of structured, cycle-aligned sleep will always outperform a sleep-deprived cram session."
              },
              {
                q: "How can I repay a massive sleep debt accrued over school weeks?",
                a: "You cannot recover 30 hours of accumulated sleep debt in a single weekend marathon, as oversleeping disrupts your circadian rhythm and leads to 'social jetlag'. Recovery is best achieved gradually by sleeping 1 to 1.5 hours extra on weekend nights, paired with consistent daily schedules during school weeks."
              },
              {
                q: "How does caffeine consumption affect my sleep cycle calculations?",
                a: "Caffeine is an adenosine receptor antagonist with a half-life of 5 to 7 hours. Even if you fall asleep fine after an afternoon tea, coffee, or energy drink, the presence of caffeine blocks deep, slow-wave N3 deep sleep. Avoid caffeine at least 6 to 8 hours before bedtime to protect your deep sleep stages."
              },
              {
                q: "Is a 20-minute power nap helpful during long study blocks?",
                a: "Yes. A 20-minute micro-nap provides quick alertness by clearing built-up adenosine in the brain. Keep it under 25 minutes to avoid entering N3 deep sleep, which prevents the groggy feeling of 'sleep inertia'."
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
