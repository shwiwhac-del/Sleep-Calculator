import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Calendar, 
  Clock, 
  Star, 
  Check, 
  Smile, 
  BookOpen, 
  Info,
  ChevronRight,
  TrendingUp,
  Award,
  Activity,
  Download
} from "lucide-react";

export interface SleepLog {
  id: string;
  date: string; // ISO string or simple YYYY-MM-DD
  hours: number;
  quality: number; // 1 to 5 stars
  factors: string[]; // Sleep habits practiced
  notes: string;
}

const PRESET_FACTORS = [
  { id: "no-coffee", label: "No tea/caffeine late" },
  { id: "cool-room", label: "Cool sleep space" },
  { id: "no-screens", label: "No late screens" },
  { id: "fixed-schedule", label: "Consistent bedtime" },
  { id: "exercise", label: "Physical exercise" },
  { id: "meditation", label: "Wound down / PMR" }
];

// 5 initial mock logs to prevent empty charts on first load, referencing the last few days
const getMockLogs = (): SleepLog[] => {
  const logs: SleepLog[] = [];
  const today = new Date();
  
  const notes = [
    "Woke up very refreshed, minimal waking during the night.",
    "Had some light caffeine late, struggled slightly to drift off.",
    "Perfect cool bedroom setting. Woke up before my alarm.",
    "Woke up feeling a bit groggy but sleep hours were solid.",
    "Practiced breathing exercise. Slept like a baby!"
  ];

  const factors = [
    ["no-coffee", "cool-room", "no-screens", "fixed-schedule"],
    ["cool-room", "exercise"],
    ["no-coffee", "cool-room", "no-screens", "fixed-schedule", "meditation"],
    ["no-screens", "exercise"],
    ["no-coffee", "cool-room", "no-screens", "meditation"]
  ];

  const hours = [8, 6.5, 8.5, 7, 7.5];
  const qualities = [5, 3, 5, 4, 4];

  for (let i = 4; i >= 0; i--) {
    const logDate = new Date();
    logDate.setDate(today.getDate() - (i + 1));
    logs.push({
      id: `mock-log-${4 - i}`,
      date: logDate.toISOString().split("T")[0],
      hours: hours[4 - i],
      quality: qualities[4 - i],
      factors: factors[4 - i],
      notes: notes[4 - i]
    });
  }

  return logs;
};

export function SleepJournal() {
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [date, setDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState<number>(7.5);
  const [quality, setQuality] = useState<number>(4);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load logs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aurasleep_journal_logs");
      if (stored) {
        setLogs(JSON.parse(stored));
      } else {
        setLogs([]);
      }
    } catch (e) {
      console.error("Error reading journal from localStorage", e);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveToStorage = (updatedLogs: SleepLog[]) => {
    setLogs(updatedLogs);
    localStorage.setItem("aurasleep_journal_logs", JSON.stringify(updatedLogs));
  };

  const handleAddLog = (e: FormEvent) => {
    e.preventDefault();

    // Check if duplicate entry for the date is registered
    const exists = logs.find((l) => l.date === date);
    let updatedLogs: SleepLog[];

    const newLog: SleepLog = {
      id: exists ? exists.id : `log-${Date.now()}`,
      date,
      hours,
      quality,
      factors: selectedFactors,
      notes: notes.trim()
    };

    if (exists) {
      // Overwrite the existing entry for that date
      updatedLogs = logs.map((l) => (l.date === date ? newLog : l));
      triggerToast(`Sleeping log updated for ${getFormattedDate(date)}!`);
    } else {
      updatedLogs = [newLog, ...logs].sort((a, b) => b.date.localeCompare(a.date));
      triggerToast("New sleep log entry added successfully!");
    }

    saveToStorage(updatedLogs);
    
    // Reset form states
    setSelectedFactors([]);
    setNotes("");
    setIsFormOpen(false);
  };

  const handleDeleteLog = (id: string, logDate: string) => {
    const updated = logs.filter((l) => l.id !== id);
    saveToStorage(updated);
    triggerToast(`Log entry deleted for ${getFormattedDate(logDate)}.`);
  };

  const handleDownloadReport = () => {
    if (logs.length === 0) {
      triggerToast("No recorded logs to download!");
      return;
    }

    // Header row
    const headers = ["Date", "Hours Slept", "Sleep Quality Rating", "Habits Practiced", "Notes"];
    
    // Format data rows
    const rows = logs.map(log => {
      // Find matching labels for each factor id 
      const parsedFactors = log.factors
        ? log.factors.map(id => {
            const match = PRESET_FACTORS.find(f => f.id === id);
            return match ? match.label : id;
          }).join("; ")
        : "";
      
      // Escape commas & quotes in notes
      const cleanNotes = log.notes
        ? `"${log.notes.replace(/"/g, '""')}"`
        : "";

      return [
        log.date,
        log.hours,
        `${log.quality} Stars`,
        `"${parsedFactors.replace(/"/g, '""')}"`,
        cleanNotes
      ];
    });

    // Combine headers & rows
    const csvContent = [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

    try {
      // Create a blob & trigger local CSV download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `aurasleep_journal_report_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast("CSV Sleep Report downloaded successfully!");
    } catch (err) {
      console.error("Failed to generate CSV report", err);
      triggerToast("Failed to download CSV report.");
    }
  };

  const getFormattedDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleFactorToggle = (factorId: string) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  // Stepper helper for hours
  const adjustHours = (amount: number) => {
    setHours((prev) => Math.max(2, Math.min(18, Math.round((prev + amount) * 10) / 10)));
  };

  // Compute Metrics & Insights
  const validLogs = logs.slice(0, 7).reverse(); // Chart the last 7 logged entries chronologically
  const averageHours = logs.length > 0 
    ? Math.round((logs.reduce((sum, l) => sum + l.hours, 0) / logs.length) * 10) / 10 
    : 0;
  
  const averageQuality = logs.length > 0
    ? Math.round((logs.reduce((sum, l) => sum + l.quality, 0) / logs.length) * 10) / 10
    : 0;

  // Let's create visual data points for SVG Chart
  // Standard dimension sizes: width=500, height=180
  const chartWidth = 500;
  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 25;

  const getChartCoordinates = () => {
    if (validLogs.length === 0) return { hourPoints: "", qualityPoints: [], labels: [] };
    
    const count = validLogs.length;
    let maxHours = Math.max(...validLogs.map(l => l.hours), 10);
    let minHours = Math.min(...validLogs.map(l => l.hours), 4);
    if (maxHours === minHours) {
      maxHours += 2;
      minHours = Math.max(0, minHours - 2);
    }
    const hoursRange = maxHours - minHours;

    const points = validLogs.map((log, index) => {
      // Calculate x position spacing uniformly
      const x = paddingX + ((chartWidth - paddingX * 2) / Math.max(1, count - 1)) * index;
      
      // Calculate y position for hours (ranges from minHours to maxHours)
      const hNorm = (log.hours - minHours) / hoursRange;
      const yHours = chartHeight - paddingY - (hNorm * (chartHeight - paddingY * 2));
      
      // Calculate y position for quality (ranges from 1 to 5 stars)
      const qNorm = (log.quality - 1) / 4;
      const yQuality = chartHeight - paddingY - (qNorm * (chartHeight - paddingY * 2));

      return {
        x,
        yHours,
        yQuality,
        date: log.date,
        hours: log.hours,
        quality: log.quality
      };
    });

    const hourPointsStr = points.map(p => `${p.x},${p.yHours}`).join(" ");
    const qualityPointsStr = points.map(p => `${p.x},${p.yQuality}`).join(" ");

    return {
      points,
      hourPointsStr,
      qualityPointsStr,
      minHours,
      maxHours
    };
  };

  const { points: chartPoints, hourPointsStr, qualityPointsStr, minHours, maxHours } = getChartCoordinates();

  const getStarLabel = (rating: number) => {
    switch (rating) {
      case 1: return "Terrible Rest 😭";
      case 2: return "Restless Night 🥱";
      case 3: return "Okay / Interrupted 😐";
      case 4: return "Good & Restful 😊";
      case 5: return "Glorious & Deep! 👑";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-[42rem] mx-auto mt-6 mb-8 px-4 text-left select-none font-sans" id="sleep-journal-section">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-3 px-6 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-slate-850"
          >
            <Check className="w-4 h-4 text-[#7C3AED]" strokeWidth={3} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Personal Sleep Journal
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-lg">
            Track your nightly rest cycles, record details, and understand your patterns over time.
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-extrabold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer shrink-0"
          >
            <Plus className={`w-4 h-4 transition-transform duration-300 ${isFormOpen ? "rotate-45" : ""}`} strokeWidth={3} />
            <span>{isFormOpen ? "Close Journal" : "Log Night's Sleep"}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-1.5 py-2.5 px-6 bg-white border border-[#E5E7EB] hover:border-gray-300 text-slate-700 hover:text-[#111827] text-sm font-extrabold rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#7C3AED]" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Interactive Daily Log Expandable Form */}
      <AnimatePresence initial={false}>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden mb-6"
          >
            <form 
              onSubmit={handleAddLog}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 shadow-premium space-y-5"
            >
              <h3 className="text-base sm:text-lg font-black text-[#111827] flex items-center gap-2">
                ✍️ Log Sleep Details
              </h3>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-[#374151] uppercase tracking-wider block">
                    Sleep Night Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full text-sm font-bold bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-[#111827] transition-all"
                    />
                  </div>
                </div>

                {/* Highly Tactile Stepper for Hours Slept */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-[#374151] uppercase tracking-wider block">
                    Sleep Duration (Hours)
                  </label>
                  <div className="flex items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl py-1 px-2.5 justify-between">
                    <button
                      type="button"
                      onClick={() => adjustHours(-0.5)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#E5E7EB] text-[#111827] font-black text-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all select-none cursor-pointer"
                    >
                      -
                    </button>
                    <div className="text-center font-extrabold text-[#111827] select-text flex flex-col justify-center items-center">
                      <span className="text-base font-black leading-none">{hours} hrs</span>
                      <span className="text-[10px] text-gray-400 font-bold mt-0.5">
                        {hours >= 7 && hours <= 9 ? "🟢 Optimal zone" : hours < 6 ? "🔴 Sleep debt risk" : "🟡 Long sleep"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustHours(0.5)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#E5E7EB] text-[#111827] font-black text-lg hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] hover:border-[#7C3AED]/30 transition-all select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Sleeping Quality Star Rating */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#374151] uppercase tracking-wider">
                    Sleep Quality Rating
                  </label>
                  <span className="text-xs font-extrabold text-[#7C3AED] bg-[#7C3AED]/10 py-0.5 px-2.5 rounded-full border border-[#7C3AED]/10 transition-all duration-300">
                    {getStarLabel(quality)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isLit = (hoveredStar !== null ? hoveredStar : quality) >= starValue;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setQuality(starValue)}
                        onMouseEnter={() => setHoveredStar(starValue)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="p-1 focus:outline-none focus:scale-110 active:scale-95 transition-all text-left cursor-pointer"
                      >
                        <Star
                          className={`w-8 h-8 transition-transform duration-200 ${
                            isLit 
                              ? "fill-[#7C3AED] text-[#7C3AED] scale-110 drop-shadow-[0_2px_8px_rgba(124,58,237,0.3)]" 
                              : "text-[#D1D5DB] hover:text-[#C084FC]"
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checklist for sleep habits practiced */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-[#374151] uppercase tracking-wider block">
                  Sleep Habits Practiced
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_FACTORS.map((factor) => {
                    const isSelected = selectedFactors.includes(factor.id);
                    return (
                      <button
                        key={factor.id}
                        type="button"
                        onClick={() => handleFactorToggle(factor.id)}
                        className={`py-2.5 px-3.5 border rounded-2xl text-xs font-extrabold text-left transition-all duration-300 flex items-center justify-between select-none cursor-pointer ${
                          isSelected 
                            ? "bg-purple-50/55 border-[#7C3AED] text-[#7C3AED]"
                            : "bg-white border-[#E5E7EB] hover:bg-slate-50 text-gray-700"
                        }`}
                      >
                        <span className="truncate">{factor.label}</span>
                        {isSelected && (
                          <span className="w-5 h-5 bg-[#7C3AED] rounded-full inline-flex items-center justify-center border-none shrink-0 border-[#7C3AED] scale-95 shadow-[0_2px_5px_rgba(124,58,237,0.3)] text-white">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief Sleep Notes */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-black text-[#374151] uppercase tracking-wider block">
                  Sleep Notes / Dreams / Physical Feel
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Woke up feeling energized. Dreamt about flying. Bedroom was peaceful and dark."
                  rows={2}
                  maxLength={180}
                  className="w-full text-sm font-semibold bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-[#111827] placeholder:text-[#9CA3AF] transition-all"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="py-2.5 px-5 bg-[#F3F4F6] text-[#4B5563] text-xs font-black rounded-xl hover:bg-[#E5E7EB] transition-colors cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-colors cursor-pointer select-none"
                >
                  Save Entry 💾
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6" id="sleep-stats-cards">
        <div className="bg-[#FAF9FF] border border-[#E5E7EB] rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/15 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="text-left leading-tight min-w-0">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Average Sleep</p>
            <p className="text-lg font-black text-[#111827]">{averageHours > 0 ? `${averageHours} hrs` : "--"}</p>
          </div>
        </div>

        <div className="bg-[#FAF9FF] border border-[#E5E7EB] rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500/50" />
          </div>
          <div className="text-left leading-tight min-w-0">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Avg Quality</p>
            <p className="text-lg font-black text-[#111827]">{averageQuality > 0 ? `${averageQuality} / 5` : "--"}</p>
          </div>
        </div>
      </div>

      {/* Beautiful Customized SVG Trends Chart Card */}
      {logs.length > 1 && (
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 mb-6 shadow-premium relative overflow-hidden text-left" id="sleep-trends-dashboard">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#7C3AED]" />
                Interactive Rest Trends (Last 7 Days)
              </h3>
              <p className="text-xs text-[#6B7280]">
                Comparing your hours slept (Line) with custom sleep quality (Glow indicators).
              </p>
            </div>
            
            {/* Legend guide */}
            <div className="flex items-center gap-3 self-start sm:self-center bg-[#F9FAFB] border border-[#E5E7EB]/80 px-2.5 py-1 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] inline-block" />
                <span className="text-[10px] text-[#4B5563] font-bold">Hours</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-[10px] text-[#4B5563] font-bold">Stars</span>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[450px] w-full h-[160px] relative">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-full overflow-visible select-none"
              >
                {/* Horizontal reference bands */}
                <rect 
                  x={paddingX} 
                  y={chartHeight - paddingY - (((8 - minHours) / Math.max(1, maxHours - minHours)) * (chartHeight - paddingY * 2))}
                  width={chartWidth - paddingX * 2} 
                  height={(((8 - 7) / Math.max(1, maxHours - minHours)) * (chartHeight - paddingY * 2))}
                  fill="#7C3AED"
                  fillOpacity="0.04"
                />

                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                  const y = paddingY + (ratio * (chartHeight - paddingY * 2));
                  return (
                    <line
                      key={index}
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeDasharray="4,4"
                      strokeWidth={1}
                    />
                  );
                })}

                {/* Draw main line connecting sleep duration hours */}
                {hourPointsStr && (
                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={hourPointsStr}
                    className="drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)]"
                  />
                )}

                {/* Data Points */}
                {chartPoints && chartPoints.map((pt, index) => {
                  return (
                    <g key={index} className="group/node">
                      {/* X Axis Label */}
                      <text
                        x={pt.x}
                        y={chartHeight - 6}
                        textAnchor="middle"
                        fill="#6B7280"
                        className="text-[9px] font-bold font-mono"
                      >
                        {pt.date.split("-")[2]}
                      </text>

                      {/* Line vertex indicator (Hours) */}
                      <circle
                        cx={pt.x}
                        cy={pt.yHours}
                        r={5}
                        fill="#FFFFFF"
                        stroke="#7C3AED"
                        strokeWidth={2.5}
                      />
                      
                      {/* Floating dynamic text for Hours */}
                      <text
                        x={pt.x}
                        y={pt.yHours - 10}
                        textAnchor="middle"
                        fill="#7C3AED"
                        className="text-[10px] font-black font-mono"
                      >
                        {pt.hours}h
                      </text>

                      {/* Custom Glow Indicator (Sleep Quality Stars) */}
                      <circle
                        cx={pt.x}
                        cy={pt.yQuality}
                        r={4}
                        fill="#F59E0B"
                        className="opacity-70"
                      />
                      <polygon
                        points={`${pt.x},${pt.yQuality - 3} ${pt.x - 2},${pt.yQuality + 2} ${pt.x + 3},${pt.yQuality - 1} ${pt.x - 3},${pt.yQuality - 1} ${pt.x + 2},${pt.yQuality + 2}`}
                        fill="#D97706"
                      />

                      {/* Tooltip background on hover */}
                      <rect
                        x={pt.x - 30}
                        y={chartHeight - paddingY - 10}
                        width={60}
                        height={12}
                        rx={3}
                        fill="#1F2937"
                        className="opacity-0 group-hover/node:opacity-90 transition-opacity pointer-events-none"
                      />
                      {/* Tooltip quality text */}
                      <text
                        x={pt.x}
                        y={chartHeight - paddingY - 1}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        className="text-[8px] font-bold pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity"
                      >
                        Quality: {pt.quality}★
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* History Log Directory */}
      <div className="space-y-3 text-left">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest pl-1">
          Recent Sleep History
        </h3>

        {logs.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 text-center text-slate-500">
            <BookOpen className="w-8 h-8 text-[#7C3AED] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No logs added yet.</p>
            <p className="text-xs text-gray-400 mt-1">Tap &quot;Log Night's Sleep&quot; above to create your first journal entry.</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {logs.map((log) => {
                return (
                  <motion.div
                    key={log.id}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm hover:shadow-premium transition-all duration-300 relative group"
                    id={`sleep-history-card-${log.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-grow min-w-0">
                        {/* Title Row */}
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="text-sm font-black text-[#111827]">
                            {getFormattedDate(log.date)}
                          </span>
                          <span className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold px-2.5 py-0.5 rounded-lg border border-[#7C3AED]/5">
                            {log.hours} hours
                          </span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((starVal) => (
                              <Star
                                key={starVal}
                                className={`w-3.5 h-3.5 ${
                                  starVal <= log.quality 
                                    ? "fill-amber-500 text-amber-500" 
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Note description */}
                        {log.notes && (
                          <p className="text-xs text-[#4B5563] leading-relaxed italic bg-[#F9FAFB]/60 p-2 border border-[#E5E7EB]/40 rounded-xl select-text">
                            &ldquo;{log.notes}&rdquo;
                          </p>
                        )}

                        {/* Practiced habits badge row */}
                        {log.factors && log.factors.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {log.factors.map((factorId) => {
                              const f = PRESET_FACTORS.find((pf) => pf.id === factorId);
                              if (!f) return null;
                              return (
                                <span 
                                  key={factorId}
                                  className="text-[10px] sm:text-xs font-semibold text-slate-700 bg-gray-100 border border-gray-150 px-2 py-0.5 rounded-md inline-flex items-center gap-1 shrink-0"
                                >
                                  <span>{f.label}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Delete button option */}
                      <button
                        onClick={() => handleDeleteLog(log.id, log.date)}
                        className="p-2.5 bg-[#F9FAFB]/80 hover:bg-red-50 text-[#9CA3AF] hover:text-red-600 border border-[#E5E7EB] hover:border-red-200 rounded-xl transition-all duration-300 cursor-pointer select-none shrink-0 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                        title="Delete sleep log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
