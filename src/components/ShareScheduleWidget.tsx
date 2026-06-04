import { useState, useEffect } from 'react';
import { Share2, Copy, Check, Clock } from 'lucide-react';

export default function ShareScheduleWidget() {
  const [mode, setMode] = useState<'wake' | 'bed'>('bed');
  const [time, setTime] = useState<string>('23:00');
  const [copied, setCopied] = useState<boolean>(false);
  const [cycles, setCycles] = useState<{ id: number; timeStr: string; hours: number }[]>([]);

  // Load last calculated states from localStorage if available
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('aurasleep_mode');
      const savedTime = localStorage.getItem('aurasleep_time');
      if (savedMode === 'wake' || savedMode === 'bed') {
        setMode(savedMode);
      }
      if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) {
        setTime(savedTime);
      }
    } catch (_) {
      // Ignored
    }
  }, []);

  const formatAMPM = (hours: number, minutes: number) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const calculateCycles = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const base = new Date();
    base.setHours(hours, minutes, 0, 0);

    const generatedCycles = [6, 5, 4]; // Recommended sleep levels
    const results = generatedCycles.map((numCycles) => {
      const totalMinutes = numCycles * 90;
      let targetDate: Date;

      if (mode === 'wake') {
        // Subtract sleep latency (15min) and cycles to find bedtimes
        targetDate = new Date(base.getTime() - totalMinutes * 60000 - 15 * 60000);
      } else {
        // Add sleep latency (15min) and cycles to find wake up times
        targetDate = new Date(base.getTime() + totalMinutes * 60000 + 15 * 60000);
      }

      return {
        id: numCycles,
        timeStr: formatAMPM(targetDate.getHours(), targetDate.getMinutes()),
        hours: numCycles * 1.5,
      };
    });

    setCycles(results);
  };

  useEffect(() => {
    calculateCycles();
  }, [mode, time]);

  const generateShareText = () => {
    const header = mode === 'bed'
      ? `🛌 Sleeping at ${formatAMPM(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))}?`
      : `🌅 Need to wake up at ${formatAMPM(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))}?`;

    const body = mode === 'bed'
      ? `My optimal wake-up times (90-min cycles + 15m to fall asleep):\n` +
        cycles.map(c => `• ${c.timeStr} (${c.hours} hrs - ${c.id} Cycles)`).join('\n')
      : `My optimal bedtimes (including 15m fall-asleep latency):\n` +
        cycles.map(c => `• ${c.timeStr} (${c.hours} hrs - ${c.id} Cycles)`).join('\n');

    return `${header}\n\n${body}\n\n💤 Perfect your sleep with the ultimate Sleep Cycle Tool:\n🔗 https://sleepcalculater.online`;
  };

  const handleCopy = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTextEncoded = encodeURIComponent(generateShareText());
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareTextEncoded}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareTextEncoded}`;

  return (
    <div id="sleep-share-calculator-widget" className="relative bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 mt-12 mb-6 shadow-premium transition-all duration-300 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#D4AF37]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight leading-snug font-serif">
            Share Your Perfect Sleep Schedule
          </h3>
          <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
            Choose a target bedtime or wake-up hour to view your scientifically optimal 90-minute sleep cycle windows and share them with friends!
          </p>
        </div>

        {/* Quick controls toggle */}
        <div className="flex bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E5E7EB] shrink-0 self-start md:self-center">
          <button
            onClick={() => setMode('bed')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
              mode === 'bed'
                ? 'bg-[#8B5CF6] text-white shadow-md'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Sleep At
          </button>
          <button
            onClick={() => setMode('wake')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
              mode === 'wake'
                ? 'bg-[#8B5CF6] text-white shadow-md'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Wake Up At
          </button>
        </div>
      </div>

      {/* Input Selector and Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
        {/* Left Side: Dynamic Selectors */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-3 bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5E7EB]">
          <label className="text-xs font-bold text-[#6B7280] tracking-wider uppercase flex items-center gap-1.5">
            <Clock size={14} className="text-[#8B5CF6]" /> Key Target Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white border border-[#E5E7EB] hover:border-[#8B5CF6]/30 text-[#111827] font-extrabold rounded-2xl px-4 py-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all text-center [color-scheme:light]"
          />
          <p className="text-[11px] text-[#6B7280] text-center leading-relaxed">
            {mode === 'bed' 
              ? 'Results factor in a 15-minute natural sleep onset delay (latency).' 
              : 'Subtracts cycles & 15-minute delay to identify your exact bedtime.'}
          </p>
        </div>

        {/* Right Side: Calculation outputs */}
        <div className="md:col-span-8 flex flex-col justify-between whitespace-nowrap">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {cycles.map((item, index) => (
              <div 
                key={item.id}
                className={`flex flex-col items-center justify-center p-3.5 bg-[#F8FAFC]/50 border rounded-2xl text-center space-y-1 transition-all ${
                  index === 1 
                    ? 'border-[#8B5CF6]/30 bg-[#8B5CF6]/5 shadow-[0_4px_16px_rgba(139,92,246,0.05)]' 
                    : 'border-[#E5E7EB]'
                }`}
              >
                <div className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">
                  {item.id} Cycles
                </div>
                <div className="text-base sm:text-lg md:text-xl font-black text-[#111827] tracking-tight">
                  {item.timeStr}
                </div>
                <div className="text-[11px] text-[#6B7280] font-medium font-mono">
                  {item.hours} Hours
                </div>
              </div>
            ))}
          </div>

          {/* Share Buttons Strip */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-6 sm:mt-4">
            {/* Copy snippet button */}
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider select-none transition-all active:scale-[0.98] cursor-pointer ${
                copied
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/10'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-[#E5E7EB] hover:border-slate-650'
              }`}
            >
              {copied ? (
                <>
                  <Check size={15} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={15} /> Copy Text
                </>
              )}
            </button>

            {/* Share to Twitter/X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-black text-white hover:bg-slate-900 border border-[#E5E7EB] hover:border-white/10 active:scale-[0.98] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {/* Custom micro-minimal SVG for Twitter/X inline */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Tweet
            </a>

            {/* Share to WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 active:scale-[0.98] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.014-.424-.209-.49-.23c-.066-.021-.114-.031-.162.039c-.048.07-.188.23-.23.277c-.042.047-.083.052-.15.018c-.067-.034-.282-.104-.538-.33c-.198-.175-.332-.391-.371-.454c-.039-.067-.004-.103.029-.136c.03-.029.066-.073.099-.11c.033-.037.044-.063.066-.105c.022-.042.011-.079-.005-.112c-.017-.033-.162-.389-.222-.53c-.058-.139-.117-.12-.162-.122c-.042-.002-.09-.002-.138-.002c-.048 0-.127.018-.193.088c-.066.07-.25.244-.25.595c0 .352.258.691.294.739c.036.048.507.728 1.21 1.019c.168.069.3.11.401.141c.169.051.322.044.444.026c.137-.02.424-.162.484-.319c.059-.158.059-.294.041-.318c-.018-.024-.066-.039-.114-.062zm-.502-9.311C15.05 3.125 12.666 2.03 10.15 2.03c-5.114 0-9.284 4.14-9.287 9.223c0 1.625.428 3.211 1.243 4.617L1 22.03l6.34-1.654c1.36.74 2.89 1.13 4.464 1.13c5.114 0 9.283-4.14 9.288-9.224c0-2.464-.969-4.78-2.724-6.512zm-3.82 12.723c-1.284.78-2.88 1.2-4.52 1.2c-1.42 0-2.81-.36-4.04-1.05c-.14-.08-.3-.09-.45-.04l-3.32.87l.89-3.23c.05-.16.03-.33-.06-.48A8.441 8.441 0 0 1 2.03 11.25c0-4.63 3.79-8.4 8.46-8.4c2.26 0 4.39.88 5.98 2.47c1.6 1.59 2.48 3.7 2.48 5.93c0 4.63-3.79 8.4-8.47 8.4z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
