import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TimePicker from "../components/TimePicker";
import SleepGuideAndFAQ from "../components/SleepGuideAndFAQ";

const FeedbackModal = lazy(() =>
  import("../components/FeedbackModal").then((module) => ({
    default: module.FeedbackModal,
  }))
);

export default function Home() {
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

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isNearBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 150;

      if (scrollY > 150 && !isNearBottom) {
        setShowFeedbackButton(true);
      } else {
        setShowFeedbackButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [rememberPreferences, setRememberPreferences] = useState<boolean>(
    () => {
      return localStorage.getItem("aurasleep_remember") === "true";
    },
  );

  const [mode, setMode] = useState<"wake" | "bed" | "nap">(() => {
    const saved = localStorage.getItem("aurasleep_mode") as "wake" | "bed" | "nap";
    return saved === "nap" ? "bed" : (saved || "bed");
  });
  const [time, setTime] = useState<string>(() => {
    const savedTime = localStorage.getItem("aurasleep_time");
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) return savedTime;

    const now = new Date();
    const ms = 1000 * 60 * 15;
    const roundedDate = new Date(Math.round(now.getTime() / ms) * ms);
    const hours = String(roundedDate.getHours()).padStart(2, "0");
    const mins = String(roundedDate.getMinutes()).padStart(2, "0");
    return `${hours}:${mins}`;
  });
  const [ageGroup, setAgeGroup] = useState<string>(() => {
    const saved = localStorage.getItem("aurasleep_age");
    return saved && AGE_GROUPS.some((g) => g.id === saved) ? saved : "18-25";
  });
  const [results, setResults] = useState<
    { date: Date; cycles: number | string; duration?: string }[]
  >([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const timeRef = useRef(time);
  const modeRef = useRef(mode);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const savedTime = localStorage.getItem("aurasleep_time");
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) {
      calculateForTime(time, mode);
    }
  }, []);

  useEffect(() => {
    if (rememberPreferences) {
      localStorage.setItem("aurasleep_mode", mode);
      localStorage.setItem("aurasleep_time", time);
      localStorage.setItem("aurasleep_age", ageGroup);
      localStorage.setItem("aurasleep_remember", "true");
    } else {
      localStorage.removeItem("aurasleep_mode");
      localStorage.removeItem("aurasleep_time");
      localStorage.removeItem("aurasleep_age");
      localStorage.setItem("aurasleep_remember", "false");
    }
  }, [mode, time, ageGroup, rememberPreferences]);

  const timeToDate = (
    timeStr: string,
    currentMode: "wake" | "bed" | "nap" = mode,
  ) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    if (currentMode === "wake" && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === "bed" || currentMode === "nap") {
      if (now.getTime() - d.getTime() > 12 * 60 * 60 * 1000) {
        d.setDate(d.getDate() + 1);
      } else if (
        d.getTime() < now.getTime() &&
        hours < 12 &&
        now.getHours() >= 12
      ) {
        d.setDate(d.getDate() + 1);
      }
    }
    return d;
  };

  const calculateForTime = (
    timeStr: string,
    currentMode: "wake" | "bed" | "nap",
  ) => {
    if (!timeStr) return;

    const baseDate = timeToDate(timeStr, currentMode);

    if (currentMode === "nap") {
      setResults([
        {
          date: new Date(baseDate.getTime() + (20 + 15) * 60000), // 20m nap + 15m fall asleep
          cycles: "Power Nap",
          duration: "20 min",
        },
        {
          date: new Date(baseDate.getTime() + (90 + 15) * 60000), // 90m cycle + 15m fall asleep
          cycles: "Full Cycle",
          duration: "90 min",
        },
      ]);
      return;
    }

    let cyclesToGenerate = [6, 5, 4, 3];
    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup);
    if (ageConfig) {
      const maxC = ageConfig.maxCycles;
      cyclesToGenerate = [];
      for (let i = maxC; i >= Math.max(3, ageConfig.minCycles - 2); i--) {
        cyclesToGenerate.push(i);
      }
    }

    const calculatedResults = cyclesToGenerate.map((cycle) => {
      if (currentMode === "wake") {
        const totalMinutesToSubtract = cycle * 90;
        return {
          date: new Date(baseDate.getTime() - totalMinutesToSubtract * 60000),
          cycles: cycle,
        };
      } else {
        const totalMinutesToAdd = cycle * 90;
        return {
          date: new Date(baseDate.getTime() + totalMinutesToAdd * 60000),
          cycles: cycle,
        };
      }
    });

    setResults(calculatedResults);
  };

  const handleCopy = () => {
    const textLines = results
      .map((r) =>
        r.duration
          ? `• ${formatTime(r.date)} (${r.duration} - ${r.cycles})`
          : `• ${formatTime(r.date)} - ${Number(r.cycles) * 1.5} hours of sleep (${r.cycles} cycles)`
      )
      .join("\n");
    
    let title = "My optimal sleep schedule:";
    if (mode === "wake") title = `To wake up refreshed, my ideal bedtimes are:`;
    if (mode === "bed") title = `If I sleep now, my ideal wake-up times are:`;
    if (mode === "nap") title = `My optimal power nap schedule:`;

    const fullText = `${title}\n\n${textLines}\n\n🛌 Calculate yours at: https://sleepcalculater.online/`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGoogleCalendarUrl = (res: any) => {
    let start: Date;
    let end: Date;

    if (mode === "wake") {
      start = res.date; // bed time
      end = timeToDate(time, "wake"); // wake time
    } else if (mode === "bed") {
      start = timeToDate(time, "bed"); // bed time
      end = res.date; // wake time
    } else { // nap
      start = timeToDate(time, "nap");
      end = res.date;
    }

    const formatGCal = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const isNap = mode === "nap";
    const titleVal = isNap
      ? `Power Nap (${res.cycles})`
      : `Optimal Sleep (${res.cycles} Cycles)`;
    const details = `Sleep schedule optimized via Sleep Calculator (https://sleepcalculater.online/). Waking up precisely at the end of a sleep cycle ensures dynamic energy and cognitive focus.`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titleVal)}&dates=${formatGCal(start)}/${formatGCal(end)}&details=${encodeURIComponent(details)}&sf=true&output=xml`;
  };

  const handleDownloadIcs = (res: any) => {
    let start: Date;
    let end: Date;

    if (mode === "wake") {
      start = res.date;
      end = timeToDate(time, "wake");
    } else if (mode === "bed") {
      start = timeToDate(time, "bed");
      end = res.date;
    } else {
      start = timeToDate(time, "nap");
      end = res.date;
    }

    const formatIcs = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const isNap = mode === "nap";
    const titleVal = isNap
      ? `Power Nap - ${res.cycles}`
      : `Optimal Sleep - ${res.cycles} Cycles`;
    const details = `Sleep Schedule optimized via Sleep Calculator (https://sleepcalculater.online/)`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${titleVal}`,
      `DESCRIPTION:${details}`,
      `DTSTART:${formatIcs(start)}`,
      `DTEND:${formatIcs(end)}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sleep-schedule-${isNap ? "nap" : res.cycles + "-cycles"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const calculate = () => {
    setResults([]);
    setTimeout(() => {
      calculateForTime(timeRef.current, modeRef.current);
      setShowResults(true);
      setTimeout(() => {
        if (resultsRef.current) {
          const rect = resultsRef.current.getBoundingClientRect();
          const isVisible =
            rect.top >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight);
          if (!isVisible) {
            resultsRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }, 100);
    }, 50);
  };

  const formatTime = (date: Date, showDayIndicator: boolean = false) => {
    const timeString = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    if (showDayIndicator) {
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      ).getTime();
      const targetDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();

      const diffDays = Math.round((targetDay - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return `${timeString} (tomorrow)`;
      if (diffDays === -1) return `${timeString} (yesterday)`;
      if (diffDays > 1) return `${timeString} (+${diffDays} days)`;
    }

    return timeString;
  };

  const isRecommended = (cycle: number | string) => {
    if (typeof cycle === "string") return true;
    const config = AGE_GROUPS.find((g) => g.id === ageGroup);
    if (!config) return cycle === 6 || cycle === 5;
    return cycle >= config.minCycles && cycle <= config.maxCycles;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-2 mt-0">
        <Helmet>
          <title>Sleep Calculator – Calculate Bedtime & Wake Up Time by Sleep Cycles</title>
          <meta
            name="description"
            content="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator. No signup required."
          />
          <meta
            name="keywords"
            content="sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, best time to sleep, sleep cycle timing, REM sleep cycles, sleep schedule calculator"
          />
          <link rel="canonical" href="https://sleepcalculater.online/" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Sleep Calculator – Calculate Bedtime & Wake Up Time by Sleep Cycles" />
          <meta property="og:description" content="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator." />
          <meta property="og:url" content="https://sleepcalculater.online/" />
          <meta property="og:image" content="https://sleepcalculater.online/og_banner.png" />
          <meta property="og:image:secure_url" content="https://sleepcalculater.online/og_banner.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Sleep Calculator - Calculate Best Bedtime & Wake-Up Time" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Sleep Calculator – Calculate Bedtime & Wake Up Time by Sleep Cycles" />
          <meta name="twitter:description" content="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator." />
          <meta name="twitter:image" content="https://sleepcalculater.online/og_banner.png" />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/"
                },
                {
                  "@type": "Organization",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/",
                  "logo": "https://sleepcalculater.online/icon.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@sleepcalculater.online",
                    "contactType": "customer support"
                  }
                },
                {
                  "@type": "WebApplication",
                  "name": "Sleep Cycle Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "All",
                  "url": "https://sleepcalculater.online/",
                  "description": "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Article",
                  "headline": "How Does a Sleep Calculator Work? Best Bedtime Timing Explained",
                  "description": "Learn the science behind 90-minute sleep cycles and how calculating your bedtime can help you wake up refreshed.",
                  "author": {
                    "@type": "Organization",
                    "name": "Sleep Calculator Experts",
                    "url": "https://sleepcalculater.online/about"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://sleepcalculater.online/"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is a sleep cycle?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM sleep that humans experience multiple times per night."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many sleep cycles do adults need?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most adults need 4 to 6 sleep cycles per night, totaling 6 to 9 hours of sleep, for optimal rest and health."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why do I wake up tired after sleeping 8 hours?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Waking up tired after 8 hours of sleep happens because you woke up in the middle of a deep sleep cycle, causing sleep inertia and grogginess."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best bedtime?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best bedtime is determined by counting backward from your wake-up time in 90-minute increments, ensuring you wake up at the end of a sleep cycle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does it take to fall asleep?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "On average, it takes a healthy adult 15 to 20 minutes to fall asleep (sleep latency). Our calculator automatically factors in 15 minutes to give you the most accurate bedtime schedule."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long should a power nap be?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A perfect power nap should be around 20 minutes. This gives you a quick boost of alertness without entering deep sleep, which can leave you feeling groggy. Alternatively, a full 90-minute nap allows for a complete sleep cycle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I catch up on sleep during the weekend?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "While sleeping in on weekends can help recover some lost sleep, it doesn't completely reverse the chronic effects of sleep deprivation and can throw off your internal circadian rhythm for the upcoming week. Consistency is key."
                      }
                    }
                  ]
                }
              ]
            })}
          </script>
        </Helmet>
        <div className={`flex flex-col items-center justify-center gap-2 text-center max-w-3xl mx-auto px-4 mt-2 sm:mt-3 transition-all duration-300 ${showResults ? "mb-5 sm:mb-6" : "mb-12 sm:mb-16"}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#111827] leading-tight sm:leading-snug text-center">
            Calculate Your Perfect Bedtime & Wake-Up Time
          </h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] mx-auto mb-4 relative px-4 sm:px-0"
          >
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="flex flex-col items-center w-full p-4 sm:p-5"
            >
              {/* Toggle Mode */}
              <div
                role="radiogroup"
                aria-label="Calculation mode"
                className="flex bg-gray-50 dark:bg-[#1e293b] rounded-xl p-1.5 w-full mb-6 relative overflow-x-auto"
              >
                <button
                  role="radio"
                  aria-checked={mode === "wake"}
                  onClick={() => {
                    setMode("wake");
                    modeRef.current = "wake";
                    setResults([]);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "wake"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-650 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  Wake up at
                </button>
                <button
                  role="radio"
                  aria-checked={mode === "bed"}
                  onClick={() => {
                    setMode("bed");
                    modeRef.current = "bed";
                    setResults([]);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "bed"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  Sleep at
                </button>
              </div>

              {/* Time Input */}
              <div className="flex flex-col items-center justify-center w-full mb-5">
                <TimePicker
                  value={time}
                  onChange={(val) => {
                    setTime(val);
                    timeRef.current = val;
                  }}
                  onEnter={calculate}
                  mode={mode}
                />
              </div>

              {/* Age group dropdown selection */}
              {mode !== "nap" && (
                <div className="flex flex-col items-center w-full mb-6 z-20">
                  <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-2">
                    Select Your Age
                  </span>
                  <div className="w-full max-w-[11rem] relative group mx-auto">
                    <select
                      id="age-select"
                      value={ageGroup}
                      onChange={(e) => {
                        setAgeGroup(e.target.value);
                        setResults([]);
                      }}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-xl py-2.5 pl-4 pr-8 transition-all duration-300 shadow-sm text-sm sm:text-base font-bold text-[#374151] cursor-pointer hover:border-gray-300 outline-none appearance-none text-center"
                    >
                      {AGE_GROUPS.map((g) => (
                        <option key={g.id} value={g.id} className="bg-white dark:bg-[#0f172a] text-left text-gray-900 dark:text-gray-100 font-medium">
                          {g.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={calculate}
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:bg-[#6D28D9] rounded-full py-3.5 px-7 sm:py-4 sm:px-8 font-extrabold text-[#FFFFFF] text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(139,92,246,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(139,92,246,0.3)] cursor-pointer text-center"
                >
                  {mode === "wake" ? "Calculate Wake Up Time" : "Calculate Bed Time"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          results.length > 0 && (
            <motion.div
              key="calculator-results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              ref={resultsRef}
              className="w-full max-w-[28.75rem] mx-auto flex flex-col items-center mb-6 px-4"
            >
              <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-100 text-center tracking-tight">
                      Your Ideal Sleep Times
                    </h2>
                  </div>

                  <div
                    className="w-full flex flex-col gap-2 select-text"
                    onContextMenu={(e) => e.stopPropagation()}
                  >
                    <AnimatePresence>
                      {results.map((res, index) => {
                        const isSuggested = index === 0 || index === 1;
                        return (
                          <div
                            key={index}
                            className={`group flex items-center justify-between py-3.5 px-5 rounded-2xl border transition-all duration-300 hover:shadow-premium ${
                              isSuggested
                                ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/5"
                                : "border-[#E5E7EB] bg-white"
                            }`}
                          >
                            <div className="flex flex-col relative z-10">
                              <span className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-none mb-1.5 flex items-center gap-1.5">
                                {formatTime(res.date)}
                              </span>
                              <span className="text-[#374151] text-sm sm:text-base font-bold">
                                {res.duration
                                  ? res.duration
                                  : `${Number(res.cycles) * 1.5} hours of sleep (${res.cycles} cycles)`}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 ml-2 relative z-10 flex-shrink-0">
                              {isSuggested && (
                                <span className="inline-flex items-center text-xs sm:text-sm font-extrabold text-[#8B5CF6] bg-[#8B5CF6]/15 px-3 py-1.5 rounded-lg tracking-wider">
                                  Suggested
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-3 mt-6 w-full items-center">
                    <button
                      onClick={handleCopy}
                      className="w-full max-w-[18.25rem] sm:max-w-[20rem] py-3.5 px-7 sm:py-4 sm:px-8 rounded-full bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:bg-[#6D28D9] font-bold text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(139,92,246,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(139,92,246,0.3)] cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                      )}
                      {copied ? "Copied!" : "Copy Schedule"}
                    </button>

                    <button
                      onClick={() => {
                        setShowResults(false);
                      }}
                      className="w-full max-w-[18.25rem] sm:max-w-[20rem] py-3.5 px-7 sm:py-4 sm:px-8 rounded-full bg-slate-900 hover:bg-slate-850 text-white text-base sm:text-lg font-bold shadow-sm transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 text-current opacity-80 group-hover:translate-x-[-2px] transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Sleep Guide & FAQ Section below the Sleep Calculator */}
      <SleepGuideAndFAQ />

      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-3 px-4 sm:px-5 flex items-center justify-center gap-2 font-semibold group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8B5CF6]/20 ${showFeedbackButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label="Send Feedback"
      >
        <MessageSquare
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {isFeedbackModalOpen && (
        <Suspense fallback={null}>
          <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={() => setIsFeedbackModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
