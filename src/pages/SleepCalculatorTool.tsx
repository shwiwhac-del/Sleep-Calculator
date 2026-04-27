import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, Clock, Brain, Battery, Moon, ArrowRight, Activity, Zap, ArrowLeft } from 'lucide-react';

export default function SleepCalculatorTool() {
  return (
    <div className="w-full pb-16 px-4 md:px-0 max-w-5xl mx-auto flex flex-col items-center">
      <Helmet>
        <title>Sleep Calculator Tool | Optimize Your Wake Up Time</title>
        <meta name="description" content="Use our free sleep calculator tool to find the optimal time to go to bed or wake up based on 90-minute sleep cycles." />
      </Helmet>

      {/* Hero Section */}
      <div className="w-full flex justify-start mb-4 mt-8 px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] transition-colors font-medium focus-visible:outline-none focus-visible:text-[#00d2ff]">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <section 
        className="text-center md:mt-8 mb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-6 font-medium text-sm tracking-wide">
          <Calculator size={16} />
          <span>Free Tool</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
          The Ultimate <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]">
            Sleep Calculator Tool
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop waking up tired. Calculate the exact time you need to fall asleep or wake up to feel completely refreshed and energized for the day ahead.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 rounded-full px-10 py-5 text-white font-bold text-lg shadow-lg border border-blue-400/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          Use the Tool Now <ArrowRight size={20} />
        </Link>
      </section>

      {/* Tool Explanation Section */}
      <section 
        className="w-full bg-[#130f2e] border border-white/5 rounded-[2.5rem] p-8 md:p-14 shadow-lg mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">How Our Sleep Calculator Works</h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Human sleep doesn't work like a simple battery charging status. Instead, your brain cycles through different stages of sleep consisting of light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. 
              </p>
              <p>
                Each complete sleep cycle lasts roughly <strong>90 minutes</strong>. Waking up in the middle of a deep sleep cycle leaves you feeling groggy, disoriented, and exhausted—a phenomenon known as sleep inertia.
              </p>
              <p>
                Our tool works by counting backwards or forwards in exactly 90-minute intervals from your target time, allowing you to wake up right at the end of a cycle when your brain is naturally closest to wakefulness.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">90 Min Cycles</h3>
              <p className="text-sm text-white/60">Based on scientifically proven biological rhythms</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Prevent Grogginess</h3>
              <p className="text-sm text-white/60">Avoid sleep inertia by waking at the right time</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Battery size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Maximize Energy</h3>
              <p className="text-sm text-white/60">Get more out of your day with optimal rest</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Moon size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Fall Asleep Mode</h3>
              <p className="text-sm text-white/60">Includes an average 15 minutes to fall asleep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Benefits of Using Our Tool</h2>
        <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">Discover why calculating your sleep cycles can transform your mornings and improve your overall health.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1a153a] border border-white/5 rounded-2xl p-8 hover:bg-[#1f1a42] transition-colors group">
            <Zap size={32} className="text-[#00d2ff] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Wake Up Energized</h3>
            <p className="text-white/60 leading-relaxed">
              By waking up at the precise end of a sleep cycle, you bypass the sluggishness of sleep inertia and wake up feeling naturally energetic.
            </p>
          </div>
          <div className="bg-[#1a153a] border border-white/5 rounded-2xl p-8 hover:bg-[#1f1a42] transition-colors group">
            <Activity size={32} className="text-[#00d2ff] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Healthier Routine</h3>
            <p className="text-white/60 leading-relaxed">
              Build a consistent circadian rhythm which has been linked to better digestion, immune system function, and heart health.
            </p>
          </div>
          <div className="bg-[#1a153a] border border-white/5 rounded-2xl p-8 hover:bg-[#1f1a42] transition-colors group">
            <Brain size={32} className="text-[#00d2ff] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Sharper Focus</h3>
            <p className="text-white/60 leading-relaxed">
              Complete REM cycles are crucial for memory consolidation. Using the calculator ensures you don't cut this brain-enhancing process short.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="w-full bg-gradient-to-br from-[#1a2b5e] to-[#131d45] border border-blue-500/20 rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for a better night's sleep?</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Stop guessing when to go to bed. Start calculating your optimal sleep times for free right now.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#131d45] rounded-full px-10 py-5 font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          >
            Go to the Calculator <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
