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
        className="relative flex items-center justify-center gap-3.5 bg-gray-50/80 dark:bg-slate-900/40 hover:bg-gray-100 dark:hover:bg-slate-850/50 text-center focus-visible:outline-none group active:scale-[0.98] transition-all duration-200 py-3.5 px-7 cursor-pointer rounded-2xl w-full max-w-[310px] sm:max-w-[330px] border border-gray-150 dark:border-slate-800/40"
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
        <Clock className="w-6 h-6 sm:w-7 h-7 text-gray-400 dark:text-slate-400/80 pointer-events-none select-none relative z-10 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />

        {/* Clean, exact display of time matching the reference style layout */}
        <div className="flex items-center justify-center font-bold text-gray-900 dark:text-white pointer-events-none select-none select-all relative z-10 font-sans transition-all duration-300">
          <span className="text-3xl sm:text-4xl tracking-tight tabular-nums">
            {displayHours}:{displayMinutes}
          </span>
          <span className="text-3xl sm:text-4xl tracking-tight ml-1.5 uppercase">
            {period}
          </span>
        </div>
      </button>
    </div>
  );
}
