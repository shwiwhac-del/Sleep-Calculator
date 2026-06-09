import React, { useRef } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
  value: string; // Expected format "HH:mm" (24-hour)
  onChange: (value: string) => void;
  onEnter?: () => void;
  mode: "wake" | "bed" | "nap";
}

export default function TimePicker({
  value,
  onChange,
  onEnter,
  mode,
}: TimePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Parse 24h format "HH:mm" to user-friendly AM/PM display
  const [hoursStr, minutesStr] = (value || "07:30").split(":");
  let hoursNum = parseInt(hoursStr, 10);
  const minutesNum = parseInt(minutesStr, 10);

  const displayHours = hoursNum % 12 === 0 ? 12 : hoursNum % 12;
  const displayMinutes = String(minutesNum).padStart(2, "0");
  const period = hoursNum >= 12 ? "PM" : "AM";

  const handleContainerClick = () => {
    // Attempt to invoke modern showPicker() natively for best experience
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === "function") {
        try {
          inputRef.current.showPicker();
        } catch {
          inputRef.current.focus();
          inputRef.current.click();
        }
      } else {
        inputRef.current.focus();
        inputRef.current.click();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-1">
      {/* Clickable display container precisely matching the reference mockup */}
      <button
        type="button"
        onClick={handleContainerClick}
        className="relative flex items-center justify-center gap-3 bg-[#F9FAFB]/90 dark:bg-[#1e293b]/70 hover:bg-[#F3F4F6] dark:hover:bg-[#334155] text-center focus-visible:outline-none group active:scale-[0.98] transition-all duration-200 py-3 px-7 sm:py-3.5 sm:px-8 cursor-pointer rounded-2xl w-full max-w-[18rem] sm:max-w-[19.5rem] border border-[#E5E7EB] dark:border-[#334155]/60 shadow-sm hover:border-[#7C3AED]/35 dark:hover:border-violet-500/35"
      >
        {/* Hidden native time input layered on top */}
        <input
          ref={inputRef}
          id={`${mode}-time`}
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={`Time for ${mode === "wake" ? "wake up" : mode === "nap" ? "nap" : "bed"}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          style={{
            colorScheme: "light dark",
          }}
        />

        {/* Clock icon on the left */}
        <Clock className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] text-gray-400 dark:text-slate-400 pointer-events-none select-none relative z-10 transition-colors group-hover:text-[#7C3AED] dark:group-hover:text-blue-400" />

        {/* Clean, exact display of time matching the reference style layout */}
        <div className="flex items-center justify-center font-bold text-gray-900 dark:text-white pointer-events-none select-none select-all relative z-10 font-sans transition-all duration-300 group-hover:text-[#7C3AED]">
          <span className="text-[1.95rem] sm:text-[2.35rem] tracking-tight tabular-nums font-black leading-none">
            {displayHours}:{displayMinutes}
          </span>
          <span className="text-[1.95rem] sm:text-[2.35rem] tracking-tight ml-2 uppercase font-black leading-none">
            {period}
          </span>
        </div>
      </button>
    </div>
  );
}
