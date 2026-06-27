import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "../lib/seo";
import { OpenGraphTags } from "../components/OpenGraphTags";
import TimePicker from "../components/TimePicker";
import SleepCycleChart from "../components/SleepCycleChart";
import { QuickSleepTips } from "../components/QuickSleepTips";
import { SleepJournal } from "../components/SleepJournal";
import SleepGuideAndFAQ from "../components/SleepGuideAndFAQ";
import { FeedbackModal } from "../components/FeedbackModal";

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
    <div className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-2 mt-0">
        <OpenGraphTags
          title="Sleep Calculator – Calculate Bedtime & Wake Up Time by Sleep Cycles"
          description="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator."
          url={canonicalUrl}
        />
        <Helmet>
          <title>Sleep Calculator – Calculate Bedtime & Wake Up Times</title>
          <meta
            name="description"
            content="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator. No signup required."
          />
          <meta
            name="keywords"
            content="sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, best time to sleep, sleep cycle timing, REM sleep cycles, sleep schedule calculator"
          />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://sleepcalculater.online/#website",
                  "name": "Sleep Calculator",
                  "alternateName": [
                    "Sleep Calculator",
                    "Sleep Cycle Calculator",
                    "Bedtime Calculator",
                    "REM Sleep Calculator"
                  ],
                  "url": "https://sleepcalculater.online/",
                  "publisher": {
                    "@id": "https://sleepcalculater.online/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://sleepcalculater.online/#organization",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/",
                  "logo": "https://sleepcalculater.online/favicon.png",
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
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://sleepcalculater.online/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Sleep Calculator",
                      "item": "https://sleepcalculater.online/"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What time should I go to bed?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best bedtime depends on when you need to wake-up. Our sleep calculator uses 90-minute sleep cycles to suggest optimal bedtimes that help you wake up feeling refreshed and energized."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What time should I wake up?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most adults benefit from 7 to 9 hours of sleep. The ideal wake-up time should align with your daily schedule while allowing enough time for 5 to 6 completed sleep cycles."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does a sleep cycle calculator work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A sleep cycle calculator estimates bedtime and wake-up times based on average 90-minute sleep cycles, ensuring you do not wake up during deep sleep."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why am I tired after sleeping?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You may feel tired after sleeping if you wake up during the middle of deep sleep, have inconsistent sleep times, or experience poor overall sleep efficiency."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many sleep cycles do I need?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most healthy adults complete 5 to 6 sleep cycles per night, which translates to approximately 7.5 to 9 hours of total sleep."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How to wake up without feeling tired and avoid morning grogginess?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "To wake up refreshed and avoid grogginess, you should align your alarm with the end of a 90-minute sleep cycle, practice a calming bedtime routine, and keep your sleep schedule consistent."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is the 90 minute sleep cycle accurate for adults, students, and night shift workers?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, scientific studies show that 90 minutes is the average duration of a human sleep cycle. This makes it an accurate guide for adults, students planning schedules around exams, or night shift workers looking to optimize their rest periods."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many sleep cycles in 8 hours, and why do I wake up tired after 8 hours?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Eight hours of sleep contains approximately 5.3 sleep cycles. Waking up exactly at the 8-hour mark often interrupts a deep sleep cycle, which is why you can wake up feeling tired and groggy instead of refreshed."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does it take to fall asleep?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "On average, a healthy adult takes 15 to 20 minutes to fall asleep. The sleep calculator automatically incorporates a standard 15-minute sleep latency to provide the most precise sleep schedules."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long should a power nap be?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A power nap should ideally be 20 minutes to boost alertness without entering groggy deep sleep. Alternatively, you can take a full 90-minute nap to complete one full sleep cycle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I catch up on sleep during the weekend?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "While extra weekend sleep feels refreshing, it does not fully reverse chronic sleep debt and can disrupt your biological clock (circadian rhythm) for the week ahead."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is sleep quality or sleep quantity more important?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Both are crucial, but high-quality sleep is often more restorative than a longer duration of interrupted, low-quality sleep. Aligning your sleep timing with natural 90-minute cycle endpoints optimizes sleep quality by ensuring you wake up at a transition state, not in deep sleep."
                      }
                    }
                  ]
                }
              ]
            })}
          </script>
        </Helmet>
        <div className={`flex flex-col items-center justify-center gap-2 text-center max-w-3xl mx-auto px-2 mt-3 sm:mt-4 md:mt-5 transition-all duration-300 ${showResults ? "mb-4" : "mb-6 sm:mb-8"}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-extrabold tracking-tight text-[#111827] leading-tight sm:leading-snug text-center">
            Calculate Your Perfect Bedtime & Wake-Up Time
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4B5563] max-w-[36rem] mx-auto font-medium leading-relaxed tracking-normal opacity-95">
            Optimize your rest using scientific 90-minute sleep cycles to wake up refreshed, energized, and ready for your day.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!showResults ? (
          <motion.div
            key="calculator-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[28.75rem] mx-auto mb-4 relative px-2 sm:px-0"
          >
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="flex flex-col items-center w-full p-4 sm:p-5"
            >
              {/* Toggle Mode */}
              <div
                role="radiogroup"
                aria-label="Calculation mode"
                className="flex flex-row flex-nowrap bg-gray-50 dark:bg-[#1e293b] rounded-xl p-1.5 w-full mb-4 relative overflow-x-auto scrollbar-none gap-1"
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
              className="w-full max-w-[28.75rem] mx-auto flex flex-col items-center mb-6 px-2"
            >
              <div className="w-full p-4 sm:p-5 flex flex-col relative overflow-hidden">
                <div className="relative z-10">
                  {mode === "cycles" && cyclesReport ? (
                    <div className="w-full flex flex-col gap-5 text-[#374151] dark:text-gray-150 select-text">
                      <div className="text-center">
                        <span className="text-[#6B7280] uppercase tracking-wider text-xs font-bold font-mono">
                          Sleep Cycle Health Card
                        </span>
                        <h2 className="text-2xl font-black mt-1 text-[#111827]">
                          Your Personal Sleep Report
                        </h2>
                      </div>

                      {/* Diagnostic Score Circle / Badge */}
                      <div className="flex flex-col items-center justify-center py-5 bg-[#FAF6F0] border border-[#E1D8CC] rounded-3xl shadow-xs">
                        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-[#7C3AED]/20">
                          <div className="absolute inset-2 rounded-full bg-[#F3ECE3]/45 shadow-sm flex flex-col items-center justify-center">
                            <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] leading-none font-mono">
                              {cyclesReport.score}%
                            </span>
                            <span className="text-[10px] sm:text-xs text-[#6B7280] font-extrabold mt-0.5 tracking-wider uppercase font-mono">
                              Score
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide ${
                            cyclesReport.rating === "Excellent" 
                              ? "bg-green-50 text-green-700 border border-green-150" 
                              : cyclesReport.rating === "Good" 
                                ? "bg-amber-100/60 text-amber-800 border border-amber-200" 
                                : "bg-rose-50 text-rose-750 border border-rose-200"
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              cyclesReport.rating === "Excellent" 
                                ? "bg-green-500" 
                                : cyclesReport.rating === "Good" 
                                  ? "bg-amber-500" 
                                  : "bg-rose-500"
                            }`} />
                            {cyclesReport.rating === "Excellent" && "Perfect Sleep Alignment"}
                            {cyclesReport.rating === "Good" && "Sub-Optimal Alignment"}
                            {cyclesReport.rating === "Caution" && "Deep Sleep Interruption Risk"}
                          </span>
                          <p className="text-xs text-[#374151] max-w-sm mt-3 px-4 font-semibold leading-relaxed">
                            {cyclesReport.rating === "Excellent" && "Outstanding! You wake up right at the endpoint of a 90-minute sleep cycle. Waking up during this light sleep transition minimizes grogginess (sleep inertia) and ensures maximum morning alertness."}
                            {cyclesReport.rating === "Good" && "Fairly solid, but you are waking up in a transition boundary. You might feel a slight groggy sensation upon waking up. Tweaking your bedtime by 15-20 minutes could make it perfect."}
                            {cyclesReport.rating === "Caution" && "Caution! Waking up at this scheduled time will likely interrupt your REM or deep sleep stages. This is a common trigger for sleep inertia, leaving you feeling tired even after substantial hours."}
                          </p>
                        </div>
                      </div>

                      {/* Stat Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm duration-200">
                          <span className="text-[#6B7280] text-[10px] font-bold leading-none uppercase tracking-wider font-mono">Bedtime</span>
                          <span className="text-lg font-extrabold text-[#111827] mt-1.5">{formatTime(timeToDate(cyclesReport.bedTime, "bed"))}</span>
                        </div>
                        <div className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm duration-200">
                          <span className="text-[#6B7280] text-[10px] font-bold leading-none uppercase tracking-wider font-mono">Wake-Up Time</span>
                          <span className="text-lg font-extrabold text-[#111827] mt-1.5">{formatTime(timeToDate(cyclesReport.wakeTime, "wake"))}</span>
                        </div>
                        <div className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm duration-200">
                          <span className="text-[#6B7280] text-[10px] font-bold leading-none uppercase tracking-wider font-mono">Slept Duration</span>
                          <span className="text-lg font-extrabold text-[#111827] mt-1.5">
                            {Math.floor(cyclesReport.sleepDurationMinutes / 60)}h {cyclesReport.sleepDurationMinutes % 60}m
                          </span>
                        </div>
                        <div className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm duration-200">
                          <span className="text-[#6B7280] text-[10px] font-bold leading-none uppercase tracking-wider font-mono">Sleep Cycles</span>
                          <span className="text-lg font-extrabold text-[#7C3AED] mt-1.5 font-mono">{cyclesReport.cycles} Cycles</span>
                        </div>
                      </div>

                      {/* Interactive Sleep Stage Breakdown */}
                      <div className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl p-4 sm:p-5 mt-1 shadow-xs">
                        <span className="text-xs font-black uppercase text-[#111827] block mb-3.5 tracking-wider font-sans">
                          Estimated Sleep Phase Breakdown
                        </span>
                        
                        <div className="space-y-3">
                          {/* Segmented Progress Bar */}
                          <div className="h-4 sm:h-5 w-full flex rounded-full overflow-hidden shadow-inner border border-gray-200">
                            <div className="bg-[#7C3AED]/85 h-full flex items-center justify-center text-[9px] font-black text-white hover:opacity-90 transition-opacity" style={{ width: "50%" }}>Light</div>
                            <div className="bg-[#7C3AED] h-full flex items-center justify-center text-[9px] font-black text-white hover:opacity-90 transition-opacity" style={{ width: "25%" }}>Deep</div>
                            <div className="bg-[#D4AF37] h-full flex items-center justify-center text-[9px] font-black text-slate-900 hover:opacity-90 transition-opacity" style={{ width: "20%" }}>REM</div>
                            <div className="bg-gray-300 h-full flex items-center justify-center text-[9px] font-black text-slate-800 hover:opacity-90 transition-opacity" style={{ width: "5%" }}>Awake</div>
                          </div>

                          <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-bold text-[#6B7280] mt-1 select-none leading-none pt-1">
                            <div>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]/85 mx-auto mb-1" />
                              <span className="text-[#374151] block uppercase text-[8px] font-extrabold">Light (50%)</span>
                              <span className="font-mono text-gray-400 block mt-0.5">{Math.round(cyclesReport.sleepDurationMinutes * 0.5)}m</span>
                            </div>
                            <div>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] mx-auto mb-1" />
                              <span className="text-[#374151] block uppercase text-[8px] font-extrabold">Deep (25%)</span>
                              <span className="font-mono text-gray-400 block mt-0.5">{Math.round(cyclesReport.sleepDurationMinutes * 0.25)}m</span>
                            </div>
                            <div>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] mx-auto mb-1" />
                              <span className="text-[#374151] block uppercase text-[8px] font-extrabold">REM (20%)</span>
                              <span className="font-mono text-gray-400 block mt-0.5">{Math.round(cyclesReport.sleepDurationMinutes * 0.2)}m</span>
                            </div>
                            <div>
                              <div className="w-2.5 h-2.5 rounded-full bg-gray-300 mx-auto mb-1" />
                              <span className="text-[#374151] block uppercase text-[8px] font-extrabold">Awake (5%)</span>
                              <span className="font-mono text-gray-400 block mt-0.5">15m</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recalibration Recommendations (if not already perfect) */}
                      {cyclesReport.rating !== "Excellent" && (
                        <div className="border border-[#7C3AED]/25 bg-[#7C3AED]/5 rounded-2xl p-4.5 mt-1 flex flex-col gap-3">
                          <span className="text-[#7C3AED] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
                            </span>
                            Sleep Doctor Calibration Advice
                          </span>

                          <p className="text-xs text-slate-750 leading-relaxed font-semibold">
                            You are completing {cyclesReport.cycles} cycles. To reach a perfect <strong className="text-[#111827] font-extrabold">{cyclesReport.perfectCycles}.0</strong> cycles and wake up at a clean transition point, we highly suggest one of the following simple bio-clock calibrations:
                          </p>

                          <div className="space-y-2 mt-1">
                            <div className="bg-[#FCFAF7] p-3 rounded-xl border border-[#E1D8CC] flex flex-col justify-center text-left">
                              <span className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wide font-mono">Option A: Recalibrate Bedtime</span>
                              <p className="text-xs font-bold text-gray-800 mt-0.5">
                                Shift bedtime to <strong className="text-[#7C3AED] font-extrabold">{cyclesReport.recalibrateBedtime}</strong> while keeping your wake-up time at {formatTime(timeToDate(cyclesReport.wakeTime, "wake"))}.
                              </p>
                            </div>
                            <div className="bg-[#FCFAF7] p-3 rounded-xl border border-[#E1D8CC] flex flex-col justify-center text-left">
                              <span className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wide font-mono">Option B: Recalibrate Wakeup Time</span>
                              <p className="text-xs font-bold text-gray-800 mt-0.5">
                                Keep bedtime at {formatTime(timeToDate(cyclesReport.bedTime, "bed"))}, but wake up at <strong className="text-[#7C3AED] font-extrabold">{cyclesReport.recalibrateWakeup}</strong> instead.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {cyclesReport.rating === "Excellent" && (
                        <div className="border border-green-250 bg-green-50/45 rounded-2xl p-4 mt-1 flex flex-col gap-1.5">
                          <span className="text-green-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            ✓ PERFECT SCHEDULE DETECTED
                          </span>
                          <p className="text-xs text-green-850 font-semibold leading-relaxed">
                            Formidable planning! This sleep duration aligns perfectly with exactly {cyclesReport.perfectCycles} full sleep cycles. This schedule minimizes waking fatigue and supports your circadian rhythm wonderfully.
                          </p>
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
                                    ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10"
                                    : "border-[#E1D8CC] bg-[#FAF6F0] hover:bg-[#FCFAF7]"
                                }`}
                              >
                                <div className="flex flex-col relative z-10">
                                  <span className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight leading-none mb-1.5 flex items-center gap-1.5">
                                    {formatTime(res.date)}
                                  </span>
                                  <span className="text-[#374151] text-xs sm:text-sm font-bold">
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

      {/* Clean below-the-fold content rendered with smooth animations */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 space-y-12 sm:space-y-16 mt-6 sm:mt-10">
        <QuickSleepTips />
        <SleepJournal />
        <SleepGuideAndFAQ />
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-3 px-4 sm:px-5 flex items-center justify-center gap-2 font-semibold group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C3AED]/20 ${showFeedbackButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label="Send Feedback"
      >
        <MessageSquare
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {isFeedbackModalOpen && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      )}
    </div>
  );
}
