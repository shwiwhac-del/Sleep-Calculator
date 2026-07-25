import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "../lib/seo";
import { OpenGraphTags } from "../components/OpenGraphTags";
import TimePicker from "../components/TimePicker";
import { useLanguage } from "../hooks/useLanguage";
import SleepCycleChart from "../components/SleepCycleChart";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { SleepScienceGuide } from "../components/SleepScienceGuide";

const FeedbackModal = lazy(() =>
  import("../components/FeedbackModal").then((module) => ({
    default: module.FeedbackModal,
  }))
);

export interface CyclesReport {
  bedTime: string;
  wakeTime: string;
  sleepDurationMinutes: number;
  totalBedTimeMinutes: number;
  cycles: number;
  score: number;
  rating: "Excellent" | "Good" | "Caution";
  lightMinutes: number;
  deepMinutes: number;
  remMinutes: number;
  recalibrateBedtime: string;
  recalibrateWakeup: string;
  perfectCycles: number;
}

export default function Home() {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);
  const { t, currentLang } = useLanguage();

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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isNearBottom =
            window.innerHeight + scrollY >=
            document.documentElement.scrollHeight - 150;

          if (scrollY > 150 && !isNearBottom) {
            setShowFeedbackButton(true);
          } else {
            setShowFeedbackButton(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [rememberPreferences, setRememberPreferences] = useState<boolean>(
    () => {
      return localStorage.getItem("aurasleep_remember") === "true";
    },
  );

  const [mode, setMode] = useState<"wake" | "bed" | "cycles" | "nap" | "rem">(() => {
    const saved = localStorage.getItem("aurasleep_mode") as "wake" | "bed" | "cycles" | "nap" | "rem";
    return saved && ["wake", "bed", "cycles", "nap", "rem"].includes(saved) ? saved : "bed";
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
  const [wakeTime, setWakeTime] = useState<string>(() => {
    const saved = localStorage.getItem("aurasleep_waketime");
    if (saved && /^\d{2}:\d{2}$/.test(saved)) return saved;
    return "07:00";
  });
  const [cyclesReport, setCyclesReport] = useState<CyclesReport | null>(null);

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
      localStorage.setItem("aurasleep_waketime", wakeTime);
      localStorage.setItem("aurasleep_age", ageGroup);
      localStorage.setItem("aurasleep_remember", "true");
    } else {
      localStorage.removeItem("aurasleep_mode");
      localStorage.removeItem("aurasleep_time");
      localStorage.removeItem("aurasleep_waketime");
      localStorage.removeItem("aurasleep_age");
      localStorage.setItem("aurasleep_remember", "false");
    }
  }, [mode, time, wakeTime, ageGroup, rememberPreferences]);

  const timeToDate = (
    timeStr: string,
    currentMode: "wake" | "bed" | "cycles" | "nap" | "rem" = mode,
  ) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    if (currentMode === "wake" && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === "bed" || currentMode === "nap" || currentMode === "cycles" || currentMode === "rem") {
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
    currentMode: "wake" | "bed" | "cycles" | "nap" | "rem",
  ) => {
    if (!timeStr) return;

    if (currentMode === "cycles") {
      // Calculate sleep cycles report
      const bDate = timeToDate(timeStr, "bed");
      let wDate = timeToDate(wakeTime, "wake");

      if (wDate.getTime() <= bDate.getTime()) {
        wDate = new Date(wDate.getTime() + 24 * 60 * 60 * 1000);
      }

      const totalBedTimeMinutes = Math.round((wDate.getTime() - bDate.getTime()) / 60000);
      const sleepDurationMinutes = Math.max(0, totalBedTimeMinutes - 15);

      const cyclesCount = Number((sleepDurationMinutes / 90).toFixed(1));
      const rem = sleepDurationMinutes % 90;

      let rating: "Excellent" | "Good" | "Caution" = "Caution";
      let score = 50;

      if (rem <= 15 || rem >= 75) {
        rating = "Excellent";
        score = Math.round(92 + (rem <= 15 ? (15 - rem) / 1.875 : (rem - 75) / 1.875));
      } else if (rem <= 30 || rem >= 60) {
        rating = "Good";
        score = Math.round(75 + (rem <= 30 ? (30 - rem) / 1.5 : (rem - 60) / 1.5));
      } else {
        rating = "Caution";
        score = Math.round(45 + Math.abs(rem - 45) / 1.5);
      }

      score = Math.min(100, Math.max(25, score));

      const lightMinutes = Math.round(sleepDurationMinutes * 0.50);
      const deepMinutes = Math.round(sleepDurationMinutes * 0.25);
      const remMinutes = Math.round(sleepDurationMinutes * 0.25);

      // Closest complete sleep cycles
      const nearestCycles = Math.max(3, Math.round(sleepDurationMinutes / 90));
      const perfectDurationMinutes = nearestCycles * 90;

      const recalibrateBedDate = new Date(wDate.getTime() - (perfectDurationMinutes + 15) * 60000);
      const recalibrateWakeDate = new Date(bDate.getTime() + (perfectDurationMinutes + 15) * 60000);

      setCyclesReport({
        bedTime: timeStr,
        wakeTime: wakeTime,
        sleepDurationMinutes,
        totalBedTimeMinutes,
        cycles: cyclesCount,
        score,
        rating,
        lightMinutes,
        deepMinutes,
        remMinutes,
        recalibrateBedtime: formatTime(recalibrateBedDate),
        recalibrateWakeup: formatTime(recalibrateWakeDate),
        perfectCycles: nearestCycles,
      });

      // To satisfy results length requirement to show the screen
      setResults([
        {
          date: wDate,
          cycles: cyclesCount,
          duration: `${Math.floor(sleepDurationMinutes / 60)}h ${sleepDurationMinutes % 60}m`,
        }
      ]);
      return;
    }

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

    if (currentMode === "rem") {
      const remCycles = [6, 5, 4, 3];
      const calculatedResults = remCycles.map((cycle) => {
        const totalMinutesToAdd = cycle * 90 + 15; // include 15 minutes to fall asleep
        let remDuration = 0;
        let remTitle = "";
        
        if (cycle === 6) {
          remDuration = 135;
          remTitle = "Dream Stage";
        } else if (cycle === 5) {
          remDuration = 100;
          remTitle = "Memory Cons.";
        } else if (cycle === 4) {
          remDuration = 70;
          remTitle = "Moderate Rec.";
        } else {
          remDuration = 45;
          remTitle = "Basic Processing";
        }

        return {
          date: new Date(baseDate.getTime() + totalMinutesToAdd * 60000),
          cycles: cycle,
          duration: `${cycle * 1.5} hrs (${cycle} Cycles) • ~${remDuration}m REM (${remTitle})`,
        };
      });
      setResults(calculatedResults);
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
    if (mode === "rem") title = `To maximize REM sleep stages, my ideal wake-up times are:`;

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
    } else if (mode === "bed" || mode === "rem") {
      start = timeToDate(time, mode); // bed time
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
      : mode === "rem"
        ? `REM Optimized Sleep (${res.cycles} Cycles)`
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
    } else if (mode === "bed" || mode === "rem") {
      start = timeToDate(time, mode);
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
      : mode === "rem"
        ? `REM Optimized Sleep - ${res.cycles} Cycles`
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
    calculateForTime(timeRef.current, modeRef.current);
    setShowResults(true);
    
    // Use double requestAnimationFrame to wait for the browser's layout pass to complete
    // before triggering smooth scrolling, completely avoiding layout-thrashing and forced reflows
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      });
    });
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
    <main className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-2 mt-0">
        <OpenGraphTags />
        <div className={`flex flex-col items-center justify-center gap-2 text-center max-w-3xl mx-auto px-2 mt-3 sm:mt-4 md:mt-5 transition-all duration-300 ${showResults ? "mb-4" : "mb-6 sm:mb-8"}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight sm:leading-snug text-center">
            {t('home.heroTitle') === "Sleep Calculator" ? "Calculate Your Perfect Bedtime & Wake-Up Time" : t('home.heroTitle')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#4B5563] dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed tracking-normal opacity-95">
            {t('home.heroSubtitle')}
          </p>
        </div>
        
        {/* Banner Ad Spot below main heading */}
        <AdPlaceholder id="home-header-ad" slotName="Home Main Banner" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[28.75rem] md:max-w-[42rem] mx-auto mb-4 relative px-2 sm:px-0"
          >
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="flex flex-col items-center w-full p-4 sm:p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl shadow-xs"
            >
              {/* Toggle Mode */}
              <div
                role="radiogroup"
                aria-label="Calculation mode"
                className="flex flex-row flex-nowrap bg-white/50 dark:bg-[#111827]/40 rounded-xl p-1.5 w-full mb-4 relative overflow-x-auto md:overflow-x-visible scrollbar-none gap-1"
              >
                <button
                  role="radio"
                  aria-checked={mode === "wake"}
                  onClick={() => {
                    setMode("wake");
                    modeRef.current = "wake";
                    setResults([]);
                  }}
                  className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
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
                  className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "bed"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  Sleep at
                </button>
                <button
                  role="radio"
                  aria-checked={mode === "cycles"}
                  onClick={() => {
                    setMode("cycles");
                    modeRef.current = "cycles";
                    setResults([]);
                  }}
                  className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "cycles"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  Sleep Cycles
                </button>
                <button
                  role="radio"
                  aria-checked={mode === "nap"}
                  onClick={() => {
                    setMode("nap");
                    modeRef.current = "nap";
                    setResults([]);
                  }}
                  className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "nap"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  Nap Calc
                </button>
                <button
                  role="radio"
                  aria-checked={mode === "rem"}
                  onClick={() => {
                    setMode("rem");
                    modeRef.current = "rem";
                    setResults([]);
                  }}
                  className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 min-w-max whitespace-nowrap ${
                    mode === "rem"
                      ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
                  }`}
                >
                  REM Calc
                </button>
              </div>

              {/* Time Input */}
              {mode === "cycles" ? (
                <div className="w-full flex flex-col gap-3 mb-4">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-[#374151] dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">
                      1. Planned Bedtime
                    </span>
                    <TimePicker
                      value={time}
                      onChange={(val) => {
                        setTime(val);
                        timeRef.current = val;
                      }}
                      onEnter={calculate}
                      mode="bed"
                    />
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <span className="text-[#374151] dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">
                      2. Planned Wake-up Time
                    </span>
                    <TimePicker
                      value={wakeTime}
                      onChange={(val) => {
                        setWakeTime(val);
                      }}
                      onEnter={calculate}
                      mode="wake"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full mb-4">
                  <TimePicker
                    value={time}
                    onChange={(val) => {
                      setTime(val);
                      timeRef.current = val;
                    }}
                    onEnter={calculate}
                    mode={mode === "rem" ? "bed" : mode}
                  />
                </div>
              )}

              {/* Age group dropdown selection */}
              {mode !== "nap" && mode !== "cycles" && mode !== "rem" && (
                <div className="flex flex-col items-center w-full mb-4 z-20">
                  <label htmlFor="age-select" className="text-slate-600 dark:text-slate-400 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-1.5 block">
                    Select Your Age
                  </label>
                  <div className="w-full max-w-[11rem] relative group mx-auto">
                    <select
                      id="age-select"
                      value={ageGroup}
                      onChange={(e) => {
                        setAgeGroup(e.target.value);
                        setResults([]);
                      }}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl py-2.5 pl-4 pr-8 transition-all duration-300 shadow-sm text-sm sm:text-base font-bold text-[#374151] cursor-pointer hover:border-gray-300 outline-none appearance-none text-center"
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
                  className="w-full max-w-[18.25rem] sm:max-w-[20rem] bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] rounded-full py-3.5 px-7 sm:py-4 sm:px-8 font-extrabold text-[#FFFFFF] text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center"
                >
                  {mode === "wake" 
                    ? "Calculate Wake Up Time" 
                    : mode === "cycles" 
                      ? "Calculate Sleep Cycles" 
                      : mode === "nap"
                        ? "Calculate Nap Time"
                        : mode === "rem"
                          ? "Calculate REM Sleep"
                          : "Calculate Bed Time"}
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
              className="w-full max-w-[28.75rem] md:max-w-[38rem] mx-auto flex flex-col items-center mb-6 px-2"
            >
              <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
                <div className="relative z-10">
                  {mode === "cycles" && cyclesReport ? (
                    <div className="w-full flex flex-col gap-4 text-[#374151] dark:text-gray-150 select-text">
                      <div className="text-center mb-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
                          Your Sleep Schedule Summary
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Calculated using 90-minute sleep cycles &amp; 15-minute fall asleep delay
                        </p>
                      </div>

                      {/* Clean Summary Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 text-center">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">Bedtime</span>
                          <span className="text-base sm:text-lg font-bold text-[#111827] dark:text-slate-100 mt-1 block">{formatTime(timeToDate(cyclesReport.bedTime, "bed"))}</span>
                        </div>
                        <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 text-center">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">Wake-Up Time</span>
                          <span className="text-base sm:text-lg font-bold text-[#111827] dark:text-slate-100 mt-1 block">{formatTime(timeToDate(cyclesReport.wakeTime, "wake"))}</span>
                        </div>
                        <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 text-center">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">Total Sleep</span>
                          <span className="text-base sm:text-lg font-bold text-[#111827] dark:text-slate-100 mt-1 block">
                            {Math.floor(cyclesReport.sleepDurationMinutes / 60)}h {cyclesReport.sleepDurationMinutes % 60}m
                          </span>
                        </div>
                        <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 text-center">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">Sleep Cycles</span>
                          <span className="text-base sm:text-lg font-bold text-[#7C3AED] dark:text-violet-400 mt-1 block">{cyclesReport.cycles} Cycles</span>
                        </div>
                      </div>

                      {/* Clean Advice Card */}
                      <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                            cyclesReport.rating === "Excellent" ? "bg-emerald-500" : cyclesReport.rating === "Good" ? "bg-amber-500" : "bg-rose-500"
                          }`} />
                          <span className="text-sm font-bold text-[#111827] dark:text-slate-100">
                            {cyclesReport.rating === "Excellent" ? "Optimal Sleep Cycle Alignment" : cyclesReport.rating === "Good" ? "Moderate Sleep Cycle Alignment" : "Potential Sleep Inertia Risk"}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {cyclesReport.rating === "Excellent" && "Great planning! Waking up at the completion of a full 90-minute sleep cycle helps you avoid waking up during deep sleep and minimizes morning grogginess."}
                          {cyclesReport.rating === "Good" && "You are waking up near a cycle transition. If you feel slightly groggy, adjusting your bedtime or wake-up time by 15-20 minutes will align it with full cycles."}
                          {cyclesReport.rating === "Caution" && "Waking up at this scheduled time may interrupt a deep sleep cycle, which can cause morning fatigue. Consider shifting bedtime slightly."}
                        </p>
                      </div>

                      {cyclesReport.rating !== "Excellent" && (
                        <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#7C3AED]/30 rounded-xl p-4 space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                          <span className="font-bold text-[#7C3AED] dark:text-violet-400 block uppercase tracking-wider text-[11px]">
                            Suggested Adjustments for Full {cyclesReport.perfectCycles} Cycles:
                          </span>
                          <p>• Shift Bedtime to <strong>{cyclesReport.recalibrateBedtime}</strong> (keeps wake time at {formatTime(timeToDate(cyclesReport.wakeTime, "wake"))})</p>
                          <p>• Or Shift Wake-Up to <strong>{cyclesReport.recalibrateWakeup}</strong> (keeps bedtime at {formatTime(timeToDate(cyclesReport.bedTime, "bed"))})</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center mb-6">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 dark:text-gray-100 text-center tracking-tight">
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
                                className={`group flex items-center justify-between py-3.5 px-5 rounded-2xl border transition-all duration-300 hover:shadow-sm ${
                                  isSuggested
                                    ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 dark:border-[#7C3AED]/50 dark:bg-[#7C3AED]/10 dark:hover:bg-[#7C3AED]/15"
                                    : "border-[#E1D8CC] dark:border-[#1E293B] bg-[#FAF6F0] dark:bg-[#151C2C] hover:bg-[#FCFAF7] dark:hover:bg-[#1E293B]"
                                }`}
                              >
                                <div className="flex flex-col relative z-10">
                                  <span className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-none mb-1.5 flex items-center gap-1.5">
                                    {formatTime(res.date)}
                                  </span>
                                  <span className="text-[#374151] dark:text-slate-300 text-xs sm:text-sm font-bold">
                                    {res.duration
                                      ? res.duration
                                      : `${Number(res.cycles) * 1.5} hours of sleep (${res.cycles} cycles)`}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 ml-2 relative z-10 flex-shrink-0">
                                  {isSuggested && (
                                    <span className="inline-flex items-center text-xs sm:text-sm font-extrabold text-[#7C3AED] bg-[#7C3AED]/15 px-3 py-1.5 rounded-lg tracking-wider">
                                      Suggested
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </AnimatePresence>
                      </div>

                      {mode !== "wake" && mode !== "bed" && mode !== "rem" && (
                        <SleepCycleChart
                          results={results}
                          mode={mode as "wake" | "bed" | "nap" | "rem"}
                          time={time}
                          ageGroup={ageGroup}
                          isRecommended={isRecommended}
                        />
                      )}
                    </>
                  )}

                  <div className="flex flex-col gap-3 mt-6 w-full items-center">
                    <button
                      onClick={handleCopy}
                      className="w-full max-w-[18.25rem] sm:max-w-[20rem] py-3.5 px-7 sm:py-4 sm:px-8 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] font-bold text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(124,58,237,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(124,58,237,0.3)] cursor-pointer text-center flex items-center justify-center gap-2"
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

      <SleepScienceGuide />
    </main>
  );
}
