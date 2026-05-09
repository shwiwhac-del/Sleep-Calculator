import React, { useState, useEffect } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  mode: 'wake' | 'bed';
}

export default function TimePicker({ value, onChange, onEnter, mode }: TimePickerProps) {
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [focusedField, setFocusedField] = useState<'hour' | 'minute' | null>(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      if (h && m) {
        let hourNum = parseInt(h, 10);
        const isPm = hourNum >= 12;
        setAmpm(isPm ? 'PM' : 'AM');
        if (hourNum === 0) hourNum = 12;
        else if (hourNum > 12) hourNum -= 12;
        setHour(hourNum.toString().padStart(2, '0'));
        setMinute(m.substring(0, 2));
      }
    }
  }, [value]);

  const updateParent = (h: string, m: string, ap: 'AM' | 'PM') => {
    let hourNum = parseInt(h, 10);
    if (isNaN(hourNum)) hourNum = 12;
    if (ap === 'PM' && hourNum !== 12) hourNum += 12;
    if (ap === 'AM' && hourNum === 12) hourNum = 0;
    
    onChange(`${hourNum.toString().padStart(2, '0')}:${m.padStart(2, '0')}`);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(-2);
    setHour(val);
  };
  
  const handleHourBlur = () => {
    let num = parseInt(hour, 10);
    if (isNaN(num) || num === 0) num = 12;
    if (num > 12) num = 12;
    const finalHour = num.toString().padStart(2, '0');
    setHour(finalHour);
    updateParent(finalHour, minute, ampm);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(-2);
    setMinute(val);
  };

  const handleMinuteBlur = () => {
    let num = parseInt(minute, 10);
    if (isNaN(num)) num = 0;
    if (num > 59) num = 59;
    const finalMinute = num.toString().padStart(2, '0');
    setMinute(finalMinute);
    updateParent(hour, finalMinute, ampm);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: 'hour' | 'minute') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHourBlur();
      handleMinuteBlur();
      onEnter?.();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (field === 'hour') {
        let h = parseInt(hour, 10);
        if (isNaN(h)) h = 12;
        if (e.key === 'ArrowUp') {
          h = h === 12 ? 1 : h + 1;
        } else {
          h = h === 1 ? 12 : h - 1;
        }
        const newHour = h.toString().padStart(2, '0');
        setHour(newHour);
        updateParent(newHour, minute, ampm);
      } else {
        let m = parseInt(minute, 10);
        if (isNaN(m)) m = 0;
        if (e.key === 'ArrowUp') {
          m = m === 59 ? 0 : m + 1;
        } else {
          m = m === 0 ? 59 : m - 1;
        }
        const newMinute = m.toString().padStart(2, '0');
        setMinute(newMinute);
        updateParent(hour, newMinute, ampm);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none w-full max-w-[400px] mx-auto">
      <div className={`flex items-center justify-center gap-2 sm:gap-4 w-full p-2 sm:p-4 rounded-[2.5rem] transition-all duration-300 ${focusedField ? 'ring-4 ring-[#2563EB]/20 bg-[#2563EB]/5 block-outline' : ''}`}>
        {/* Time Inputs */}
        <div className={`flex items-center gap-1 sm:gap-2 bg-gray-50 dark:bg-[#1A1A1A] border ${focusedField ? 'border-[#2563EB]/30' : 'border-gray-200 dark:border-[#333]'} rounded-3xl p-4 sm:p-5 shadow-inner relative overflow-hidden transition-colors duration-300`}>
          <input
            type="text"
            inputMode="numeric"
            value={hour}
            onChange={handleHourChange}
            onFocus={() => setFocusedField('hour')}
            onBlur={() => { setFocusedField(null); handleHourBlur(); }}
            onKeyDown={(e) => handleKeyDown(e, 'hour')}
            aria-label={`Hour for ${mode === 'wake' ? 'wake up' : 'bed'} time`}
            className={`w-[70px] sm:w-[90px] bg-transparent text-center text-5xl sm:text-[64px] tracking-tight font-bold text-gray-900 dark:text-white focus:outline-none transition-colors placeholder:text-gray-300 select-all relative z-10 rounded-xl ${focusedField === 'hour' ? 'text-[#2563EB]' : ''}`}
            placeholder="12"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <span className={`text-4xl sm:text-5xl font-bold pb-2 sm:pb-3 animate-pulse relative z-10 transition-colors ${focusedField ? 'text-[#2563EB]/50' : 'text-gray-300'}`}>:</span>
          <input
            type="text"
            inputMode="numeric"
            value={minute}
            onChange={handleMinuteChange}
            onFocus={() => setFocusedField('minute')}
            onBlur={() => { setFocusedField(null); handleMinuteBlur(); }}
            onKeyDown={(e) => handleKeyDown(e, 'minute')}
            aria-label={`Minute for ${mode === 'wake' ? 'wake up' : 'bed'} time`}
            className={`w-[70px] sm:w-[90px] bg-transparent text-center text-5xl sm:text-[64px] tracking-tight font-bold text-gray-900 dark:text-white focus:outline-none transition-colors placeholder:text-gray-300 select-all relative z-10 rounded-xl ${focusedField === 'minute' ? 'text-[#2563EB]' : ''}`}
            placeholder="00"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        </div>
        
        {/* AM/PM Toggle */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setAmpm('AM');
              updateParent(hour, minute, 'AM');
            }}
            aria-pressed={ampm === 'AM'}
            className={`w-[50px] sm:w-[64px] h-[44px] sm:h-[50px] rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center ${
              ampm === 'AM'
                ? 'bg-[#2563EB] text-white shadow-md border border-transparent'
                : 'bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#333] text-gray-400 dark:text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-300'
            }`}
          >
            AM
          </button>
          <button
            onClick={() => {
              setAmpm('PM');
              updateParent(hour, minute, 'PM');
            }}
            aria-pressed={ampm === 'PM'}
            className={`w-[50px] sm:w-[64px] h-[44px] sm:h-[50px] rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center ${
              ampm === 'PM'
                ? 'bg-[#2563EB] text-white shadow-md border border-transparent'
                : 'bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#333] text-gray-400 dark:text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-300'
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
}
