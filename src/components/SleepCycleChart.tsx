import { Moon } from "lucide-react";

interface SleepCycleChartProps {
  results: { date: Date; cycles: number | string; duration?: string }[];
  mode: "wake" | "bed" | "nap";
  time: string;
  ageGroup: string;
  isRecommended: (cycles: number | string) => boolean;
}

export default function SleepCycleChart({
  results,
  mode,
  isRecommended,
}: SleepCycleChartProps) {
  // Helper to format time to HH:MM AM/PM
  const formatTimeStr = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  if (!results || results.length === 0) return null;

  return (
    <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mt-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <Moon className="w-4.5 h-4.5 text-[#8B5CF6]" />
        <h3 className="text-sm font-bold text-[#111827] tracking-tight">
          Visual Sleep Cycle Breakdown
        </h3>
      </div>

      <div className="space-y-4">
        {results.map((res, barIndex) => {
          const isSuggested = isRecommended(res.cycles);
          const totalCycles = typeof res.cycles === "number" ? res.cycles : 1;
          const isNap = mode === "nap";

          // Calculate start & end times
          let startTime = new Date();
          let endTime = new Date();

          if (mode === "wake") {
            // results are Bedtimes, we want to sleep at bedTime and wake up at end of cycles
            endTime = new Date(res.date.getTime() + (typeof res.cycles === "number" ? res.cycles * 90 : 90) * 60000);
            startTime = res.date;
          } else if (mode === "bed") {
            // results are WakeUp times, we sleep at input bedtime, wake up at return time
            startTime = new Date(res.date.getTime() - (typeof res.cycles === "number" ? res.cycles * 90 : 90) * 60000);
            endTime = res.date;
          } else {
            // Nap - we start at base now and end at result time
            startTime = new Date(res.date.getTime() - (res.duration === "20 min" ? 35 : 105) * 60000); 
            endTime = res.date;
          }

          // Build array of cycles
          const segments = [];
          if (!isNap && typeof res.cycles === "number") {
            for (let i = 0; i < totalCycles; i++) {
              segments.push(`C${i + 1}`);
            }
          } else {
            segments.push(res.duration === "20 min" ? "Nap" : "C1");
          }

          return (
            <div key={barIndex} className="flex flex-col gap-1.5">
              {/* Simple row header */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSuggested ? "bg-[#8B5CF6]" : "bg-gray-300"}`} />
                  <span className={`${isSuggested ? "text-[#8B5CF6] font-black" : "text-gray-750 font-bold"}`}>
                    {isNap ? res.cycles : `${res.cycles} Cycles`}
                  </span>
                  {isSuggested && (
                    <span className="text-[9px] font-black tracking-wider uppercase text-[#8B5CF6]/85 bg-[#8B5CF6]/10 px-1 py-0.2 rounded">
                      Suggested
                    </span>
                  )}
                </span>
                <span className="font-bold text-gray-400">
                  {res.duration ? res.duration : `${Number(res.cycles) * 1.5} hrs`}
                </span>
              </div>

              {/* Progress blocks */}
              <div className="relative">
                <div className="flex items-center w-full gap-1 h-5 sm:h-6">
                  {segments.map((seg, sIdx) => {
                    const isEven = sIdx % 2 === 0;
                    let bgClass = isSuggested
                      ? isEven
                        ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/20 text-[#8B5CF6]"
                        : "bg-[#8B5CF6]/10 border border-[#8B5CF6]/10 text-[#8B5CF6]/85"
                      : isEven
                      ? "bg-slate-200 border border-slate-200/50 text-slate-500"
                      : "bg-slate-100 border border-slate-100/50 text-slate-400";

                    return (
                      <div
                        key={sIdx}
                        className={`flex-1 h-full rounded flex items-center justify-center text-[10px] sm:text-xs font-bold leading-none ${bgClass}`}
                      >
                        {seg}
                      </div>
                    );
                  })}
                </div>

                {/* Left/Right time tags */}
                <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-semibold select-none">
                  <span>{formatTimeStr(startTime)}</span>
                  <span>{formatTimeStr(endTime)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
