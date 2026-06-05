import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Check, 
  RotateCcw, 
  Wind, 
  Sun, 
  Clock, 
  Calendar, 
  Coffee, 
  FileText, 
  Heart, 
  Moon,
  ChevronRight,
  Info
} from "lucide-react";

export interface SleepTip {
  id: string;
  title: string;
  category: "Routine" | "Environment" | "Nutrition" | "Mindset";
  short: string;
  detail: string;
  scientificFact: string;
  iconName: string;
}

const SLEEP_TIPS_DATA: SleepTip[] = [
  {
    id: "tip-1",
    title: "The 10-3-2-1 Rule",
    category: "Routine",
    short: "Structure your bedtime countdown to optimize deep sleep cycles.",
    detail: "No caffeine 10 hours before bed, no heavy food/alcohol 3 hours before, no work/screens 2 hours before, and zero screens 1 hour before sleeping. Following this step-by-step winding down prevents late cortisol spikes.",
    scientificFact: "Blue screen light delays the release of circadian melatonin for up to 90 minutes by stimulating light-sensitive retinal ganglion cells.",
    iconName: "Clock"
  },
  {
    id: "tip-2",
    title: "Cool Room Secret (65°F / 18°C)",
    category: "Environment",
    short: "Keep your sleep space cool to match your body's natural cycle.",
    detail: "To initiate sleep, your brain must naturally lower its thermostat. A biological environment between 60°F and 67°F (15.5°C to 19°C) signals your system that it is time to rested, preventing hot-flash interruptions.",
    scientificFact: "Clinical research shows that cool room temperatures encourage deep, slow-wave sleep and reduce the probability of night-time micro-awakenings.",
    iconName: "Wind"
  },
  {
    id: "tip-3",
    title: "Absolute Blackout Darkness",
    category: "Environment",
    short: "Eliminate artificial lights to maximize melatonin production.",
    detail: "Even tiny LEDs from power strips or light leaking under doors can bypass eyelids and activate brain wakefulness. Mask your windows with blackouts or wear a form-fitting padded eye mask.",
    scientificFact: "Exposure to room light during sleep suppresses melatonin levels by over 50%, forcing the body to stay in superficial light sleep stages.",
    iconName: "Sun"
  },
  {
    id: "tip-4",
    title: "Fixed Bedtime & Wake Time Anchor",
    category: "Routine",
    short: "Keep a rigid daily sleep schedule, even on relaxing weekends.",
    detail: "Sleeping in on weekends shifts your biological clock similar to traveling across time zones ('social jetlag'). Setting a consistent anchor time stabilizes your physiological circadian cycle for easier sleep onset.",
    scientificFact: "An irregular sleep rhythm disrupts your immune system and metabolic functions, elevating feelings of midday fatigue.",
    iconName: "Calendar"
  },
  {
    id: "tip-5",
    title: "The 2:00 PM Caffeine Cut-off",
    category: "Nutrition",
    short: "Restrict afternoon stimulants to protect sleep onset.",
    detail: "Caffeine blocks physical adenosine receptors that build healthy sleep pressure. Switch to warm chamomile, lavender, or rooibos herbal teas after lunch to let your nervous system transition naturally into resting state.",
    scientificFact: "Caffeine has an active half-life of 5 to 7 hours, meaning a 3:00 PM coffee is still actively exciting your central nervous system at 10:00 PM.",
    iconName: "Coffee"
  },
  {
    id: "tip-6",
    title: "Magnesium Warm Drink",
    category: "Nutrition",
    short: "Replenish sleep-assisting minerals an hour before bedtime.",
    detail: "Magnesium is a vital nutrient that acts as a cofactor in cellular reactions. Taking a magnesium glycinate supplement or drinking warm herbal water supports healthy muscle tension release and calming neurochemicals.",
    scientificFact: "Magnesium binds to GABA receptors in the nervous system, helping quiet neural hyperactivity and reducing symptoms of restless limbs.",
    iconName: "Heart"
  },
  {
    id: "tip-7",
    title: "Nighttime Brain Dump",
    category: "Mindset",
    short: "Offload your racing checklist onto physical paper.",
    detail: "If worries keep you tossing and turning, spend 5 minutes writing down every worry, chore, or schedule obligation for the morning on a simple bedside pad. Physical offloading breaks active planning cycles.",
    scientificFact: "Studies confirm that writing a detailed to-do list before bed decreases sleep-onset latency by up to 37% by offloading mental anxiety.",
    iconName: "FileText"
  },
  {
    id: "tip-8",
    title: "The 20-Minute Out-of-Bed Rule",
    category: "Mindset",
    short: "Never lie awake frustrated. Break the association immediately.",
    detail: "If you cannot fall asleep within 20 minutes, get out of bed! Go to a dimly lit room, read a boring paper book, or practice light breathing. Return to bed only when your eyes feel exceptionally heavy.",
    scientificFact: "Conditioning your brain to associate your mattress with wakeful frustration, restlessness, and anxiety triggers chronic insomnia.",
    iconName: "Moon"
  },
  {
    id: "tip-9",
    title: "Progressive Muscle Relaxation (PMR)",
    category: "Routine",
    short: "Decompress physical stress from head to toe sequentially.",
    detail: "Lie flat and systematically tense a specific muscle group (like your calves or shoulders) for 5 seconds, then release with a slow exhale. Cycle this from toes up to facial muscles for a profound body release.",
    scientificFact: "PMR physically reduces heart rate, blood pressure, and cortisol, engaging the parasympathetic nervous system for spontaneous relaxation.",
    iconName: "Sparkles"
  }
];

export function QuickSleepTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [completedTipIds, setCompletedTipIds] = useState<string[]>([]);
  const [spotlightTip, setSpotlightTip] = useState<SleepTip>(SLEEP_TIPS_DATA[0]);
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  // Load completed tips from localStorage safely (on mount)
  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem("aurasleep_tips_date");
      
      // Reset daily progress if it is a new day
      if (storedDate !== today) {
        localStorage.setItem("aurasleep_tips_date", today);
        localStorage.setItem("aurasleep_completed_tips", JSON.stringify([]));
        setCompletedTipIds([]);
      } else {
        const stored = localStorage.getItem("aurasleep_completed_tips");
        if (stored) {
          setCompletedTipIds(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error("Error reading sleep habits status:", e);
    }
  }, []);

  // Determine a default spotlight tip of the day based on day of year
  useEffect(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % SLEEP_TIPS_DATA.length;
    setSpotlightTip(SLEEP_TIPS_DATA[index]);
  }, []);

  const handleToggleComplete = (id: string) => {
    let nextCompleted: string[];
    if (completedTipIds.includes(id)) {
      nextCompleted = completedTipIds.filter(tipId => tipId !== id);
    } else {
      nextCompleted = [...completedTipIds, id];
    }
    setCompletedTipIds(nextCompleted);
    localStorage.setItem("aurasleep_completed_tips", JSON.stringify(nextCompleted));
  };

  const handleReset = () => {
    setCompletedTipIds([]);
    localStorage.setItem("aurasleep_completed_tips", JSON.stringify([]));
  };

  const handleShuffleSpotlight = () => {
    const remaining = SLEEP_TIPS_DATA.filter(t => t.id !== spotlightTip.id);
    const randomTip = remaining[Math.floor(Math.random() * remaining.length)];
    setSpotlightTip(randomTip);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id);
  };

  const filteredTips = selectedCategory === "All"
    ? SLEEP_TIPS_DATA
    : SLEEP_TIPS_DATA.filter(t => t.category === selectedCategory);

  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock": return <Clock className="w-5 h-5 text-indigo-500" />;
      case "Wind": return <Wind className="w-5 h-5 text-teal-500" />;
      case "Sun": return <Sun className="w-5 h-5 text-amber-500" />;
      case "Calendar": return <Calendar className="w-5 h-5 text-purple-500" />;
      case "Coffee": return <Coffee className="w-5 h-5 text-orange-500" />;
      case "Heart": return <Heart className="w-5 h-5 text-red-500" />;
      case "FileText": return <FileText className="w-5 h-5 text-blue-500" />;
      case "Moon": return <Moon className="w-5 h-5 text-sky-500" />;
      default: return <Sparkles className="w-5 h-5 text-[#8B5CF6]" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Routine": return "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100/50";
      case "Environment": return "bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100/50";
      case "Nutrition": return "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100/50";
      case "Mindset": return "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100/50";
      default: return "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100";
    }
  };

  const categories = ["All", "Routine", "Environment", "Nutrition", "Mindset"];
  const totalTips = SLEEP_TIPS_DATA.length;
  const completedCount = completedTipIds.filter(id => SLEEP_TIPS_DATA.some(t => t.id === id)).length;
  const progressPercent = Math.round((completedCount / totalTips) * 100);

  return (
    <div className="w-full max-w-[42rem] lg:max-w-[60rem] mx-auto mt-10 mb-8 px-4 text-left select-none font-sans" id="quick-sleep-tips-section">
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Quick Sleep Hygiene Tips
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-lg">
          Small, actionable, science-backed habits to practice daily for deeply restorative sleep.
        </p>
      </div>

      {/* Spotlight Segment */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mb-6 shadow-premium relative overflow-hidden transition-all duration-300" id="tips-spotlight-card">
        
        <div className="flex justify-end mb-3">
          <button 
            onClick={handleShuffleSpotlight}
            className="text-[11px] font-extrabold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors flex items-center gap-1 cursor-pointer select-none bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] px-2.5 py-1 rounded-lg hover:shadow-sm"
          >
            Shuffle Advice
          </button>
        </div>

        <div className="flex gap-3">
          <div className="p-2 bg-white h-max border border-[#E5E7EB] rounded-xl shadow-sm shrink-0 hidden sm:block">
            {getTipIcon(spotlightTip.iconName)}
          </div>
          <div className="space-y-1.5 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="sm:hidden p-1.5 bg-white border border-[#E5E7EB] rounded-lg inline-flex">
                {getTipIcon(spotlightTip.iconName)}
              </span>
              <h3 className="text-base font-extrabold text-[#111827] leading-none mb-0.5">
                {spotlightTip.title}
              </h3>
              <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-md font-bold border ${getCategoryColor(spotlightTip.category)}`}>
                {spotlightTip.category}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#374151] leading-relaxed">
              {spotlightTip.short}
            </p>
            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              {spotlightTip.detail}
            </p>
            
            {/* Scientific Factlet */}
            <div className="pt-2 border-t border-dashed border-[#E5E7EB] flex gap-1.5 items-start mt-2 bg-[#F9FAFB]/50 p-2 rounded-lg border border-[#E5E7EB]/50">
              <Info className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <p className="text-[11px] italic text-[#4B5563] leading-relaxed select-text">
                <strong className="text-[#374151] not-italic font-bold">Science fact:</strong> {spotlightTip.scientificFact}
              </p>
            </div>
          </div>
        </div>

        {/* Practice CTA */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handleToggleComplete(spotlightTip.id)}
            className={`flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-extrabold transition-all duration-300 select-none cursor-pointer border ${
              completedTipIds.includes(spotlightTip.id)
                ? "bg-[#8B5CF6] text-white opacity-95 border-transparent shadow-sm"
                : "bg-white border-[#E5E7EB] text-[#374151] hover:bg-slate-50 hover:border-gray-300"
            }`}
          >
            {completedTipIds.includes(spotlightTip.id) ? (
              <>
                <Check className="w-3 h-3" strokeWidth={3} />
                <span>Marked as Done Today</span>
              </>
            ) : (
              <span>I practiced this today!</span>
            )}
          </button>
        </div>
      </div>

      {/* Gamified Habit Progress Deck */}
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 shadow-premium mb-6" id="tips-daily-progress-dashboard">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-[#111827] uppercase tracking-wider">
              Daily Sleep Hygiene Board
            </h3>
            <p className="text-xs text-[#6B7280]">
              Unlock higher sleep quality by stacking multiple healthy actions.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <span className="text-xs font-bold text-[#111827] bg-[#F3ECE3] px-3 py-1 rounded-lg border border-[#E5E7EB] inline-flex items-center gap-1">
              <strong className="text-[#8B5CF6]">{completedCount} / {totalTips}</strong> completed
            </span>
            {completedCount > 0 && (
              <button
                onClick={handleReset}
                title="Reset daily progress"
                className="p-1 px-2 rounded-lg text-xs font-bold text-[#6B7280] hover:text-red-500 hover:bg-red-50/50 bg-white border border-[#E5E7EB] transition-colors cursor-pointer select-none"
              >
                Reset Progress
              </button>
            )}
          </div>
        </div>

        {/* Beautiful Interactive Progress Bar */}
        <div className="w-full bg-[#E5E7EB]/55 rounded-full h-2.5 relative overflow-hidden mb-1">
          <motion.div 
            className="bg-gradient-to-r from-[#8B5CF6] to-[#D4AF37] h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#6B7280] font-bold">
          <span>0%</span>
          <span className="text-[#8B5CF6] font-extrabold">
            {progressPercent === 100 ? "🏆 Perfect Sleep Shield Achieved!" : `${progressPercent}% Complete`}
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Interactive Tabs Menu for Tips Directory */}
      <div className="flex bg-gray-50 border border-[#E5E7EB] rounded-2xl p-1 w-full gap-1 mb-5 relative overflow-x-auto whitespace-nowrap" id="tips-directory-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 min-w-max text-xs sm:text-sm font-bold py-2 px-3.5 rounded-xl transition-all duration-300 cursor-pointer select-none ${
              selectedCategory === cat
                ? "bg-white text-gray-900 shadow-sm border border-gray-200/80"
                : "text-[#6B7280] hover:text-gray-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid containing list of tips under filtered category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="sleep-tips-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredTips.map((tip) => {
            const isCompleted = completedTipIds.includes(tip.id);
            const isExpanded = expandedTipId === tip.id;
            return (
              <motion.div
                key={tip.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className={`bg-white border text-left p-4 rounded-2xl cursor-pointer hover:shadow-premium transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                  isCompleted 
                    ? "border-[#8B5CF6]/50 shadow-[0_4px_12px_rgba(139,92,246,0.06)] bg-gradient-to-b from-white to-[#8B5CF6]/2"
                    : "border-[#E5E7EB] shadow-sm bg-white"
                }`}
                onClick={() => handleToggleExpand(tip.id)}
                id={`sleep-tip-card-${tip.id}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2.5 mb-2.5">
                    <span className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl inline-flex group-hover:scale-105 transition-transform duration-300">
                      {getTipIcon(tip.iconName)}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleComplete(tip.id)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-350 cursor-pointer select-none flex items-center justify-center ${
                          isCompleted
                            ? "bg-[#8B5CF6] border-[#8B5CF6] text-white scale-110 shadow-[0_3px_10px_rgba(139,92,246,0.4)]"
                            : "bg-white border-[#C084FC]/60 hover:border-[#8B5CF6] text-transparent hover:text-[#8B5CF6]/50"
                        }`}
                        title={isCompleted ? "Mark Incomplete" : "Mark practiced today!"}
                      >
                        <Check className={`w-4 h-4 transition-all duration-300 ${isCompleted ? "scale-100 text-white" : "scale-75 text-purple-400 group-hover:scale-100"}`} strokeWidth={3.5} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-extrabold text-[#111827] leading-tight">
                        {tip.title}
                      </h4>
                      <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold border shrink-0 ${getCategoryColor(tip.category)}`}>
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {tip.short}
                    </p>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden mt-3 pt-3 border-t border-dashed border-[#E5E7EB] space-y-2.5"
                      >
                        <p className="text-xs text-[#374151] leading-relaxed">
                          {tip.detail}
                        </p>
                        <div className="flex gap-1.5 bg-gray-50 border border-gray-150 p-2 rounded-xl">
                          <Info className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <p className="text-[11px] italic text-[#6B7280] leading-normal select-text">
                            <strong className="text-[#374151] not-italic font-bold">Science:</strong> {tip.scientificFact}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#8B5CF6] pt-1">
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {isExpanded ? "Show Less" : "Read Full Advice"}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#8B5CF6]/60" : "group-hover:translate-x-1"}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
