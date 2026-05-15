import React from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: string; // Expected format "HH:mm" (24-hour)
  onChange: (value: string) => void;
  onEnter?: () => void;
  mode: 'wake' | 'bed';
}

export default function TimePicker({ value, onChange, onEnter, mode }: TimePickerProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[320px] mx-auto">
      <div className="w-full bg-gray-50 dark:bg-[#1e293b] border-2 border-gray-200 dark:border-slate-700 focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/20 rounded-[2rem] p-4 sm:p-6 transition-all duration-300 shadow-sm relative group cursor-pointer hover:border-gray-300 dark:hover:border-[#444]">
        <label htmlFor={`${mode}-time`} className="sr-only">
          {mode === 'wake' ? 'Wake up time' : 'Bedtime'}
        </label>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500 group-focus-within:text-[#2563EB] transition-colors" />
          <div className="relative">
             <input
              id={`${mode}-time`}
              type="time"
              required
              value={value}
              onChange={(e) => {
                if (e.target.value) {
                  onChange(e.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              aria-label={`Time for ${mode === 'wake' ? 'wake up' : 'bed'}`}
              className="bg-transparent text-center text-4xl sm:text-5xl tracking-normal font-bold text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
              style={{
                 colorScheme: 'light dark'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

