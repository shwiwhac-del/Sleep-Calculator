import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Moon, Clock, Brain, Battery, ArrowRight, Zap, Target, ArrowLeft } from 'lucide-react';

export default function SleepGuides() {
  return (
    <div className="w-full pb-16 px-4 md:px-0 max-w-4xl mx-auto flex flex-col items-center">
      <Helmet>
        <title>Ultimate Sleep Guides & Resources | Better Sleep Habits</title>
        <meta name="description" content="Explore our comprehensive sleep guides. Learn about 90-minute sleep cycles, circadian rhythms, sleep hygiene, and how to wake up refreshed." />
      </Helmet>

      {/* Hero Section */}
      <div className="w-full flex justify-start mb-4 mt-8 px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] transition-colors font-medium focus-visible:outline-none focus-visible:text-[#00d2ff]">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <section 
        className="text-center md:mt-8 mb-16 px-4 animate-in fade-in slide-in-from-top-4 duration-700"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-6 font-medium text-sm tracking-wide">
          <BookOpen size={16} />
          <span>Knowledge Hub</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
          The Ultimate <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00d2ff]">
            Sleep Guides & Resources
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Master your sleep schedule. Understand the science behind 90-minute sleep cycles and discover actionable advice to wake up with limitless energy.
        </p>
      </section>

      {/* Master Content Section - Structurally SEO Optimized */}
      <article className="w-full text-left space-y-12 sm:space-y-16">

        {/* Featured Snippet Target: What is Sleep Hygiene? */}
        <section className="bg-[#130f2e] p-6 md:p-10 rounded-3xl border border-white/5 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">What is Sleep Hygiene?</h2>
          <div className="text-white/80 leading-relaxed text-lg space-y-4">
            <p>
              <strong>Sleep hygiene</strong> refers to the set of healthy habits, behaviors, and environmental factors that can be adjusted to help you get a good night's sleep. Good sleep hygiene includes keeping a consistent sleep schedule, creating a comfortable and dark bedroom environment, avoiding screen time before bed, and managing caffeine or alcohol intake.
            </p>
            <p>
              Strong sleep hygiene practices are critical for synchronizing your body's natural <strong>circadian rhythm</strong>, meaning you will fall asleep faster and experience deeper, more restorative rest.
            </p>
          </div>
        </section>

        {/* Category: The Science of Timing */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="text-[#00d2ff]" size={28} />
            <h2 className="text-3xl font-bold text-white">The Science of Sleep Timing</h2>
          </div>
          <p className="text-white/70 text-lg mb-8">
            Stop guessing when to go to bed. Understanding the biological clock and utilizing sleep calculators can transform your mornings.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link to="/blog/how-does-your-sleep-cycle-work" className="group bg-[#1a153a] border border-white/10 hover:border-[#00d2ff]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors">How Your Sleep Cycle Works</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Learn about the stages of sleep: light sleep, deep sleep, and REM. Find out why waking up mid-cycle leaves you groggy.
              </p>
              <span className="text-[#00d2ff] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read guide <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/sleep-calculator-tool" className="group bg-[#1a153a] border border-white/10 hover:border-[#00d2ff]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors">How to Use a Sleep Calculator</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Discover the math behind aligning your wake-up time with the natural conclusion of a 90-minute sleep cycle limit.
              </p>
              <span className="text-[#00d2ff] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Access tool <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* Category: Quality and Restoration */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Battery className="text-[#10b981]" size={28} />
            <h2 className="text-3xl font-bold text-white">Improving Sleep Quality</h2>
          </div>
          <p className="text-white/70 text-lg mb-8">
            Time spent in bed doesn't always equal restorative rest. Learn how to optimize the quality of the hours you sleep.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link to="/blog/how-to-fall-asleep-fast" className="group bg-[#1a153a] border border-white/10 hover:border-[#10b981]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10b981] transition-colors">How to Fall Asleep Faster</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Actionable tips for reducing sleep latency, including the military method, body scanning, and managing screen time.
              </p>
              <span className="text-[#10b981] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read guide <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/blog/why-you-feel-tired" className="group bg-[#1a153a] border border-white/10 hover:border-[#10b981]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10b981] transition-colors">Why You Always Feel Tired</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Are you getting 8 hours but still feeling fatigued? Uncover the hidden reasons behind poor sleep quality and inertia.
              </p>
              <span className="text-[#10b981] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read guide <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* Category: Advanced Optimization */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="text-[#ec4899]" size={28} />
            <h2 className="text-3xl font-bold text-white">Advanced Sleep Optimization</h2>
          </div>
          <p className="text-white/70 text-lg mb-8">
            Tailor your sleep routine to your specific biology, age, and daily demands.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link to="/blog/sleep-by-age" className="group bg-[#1a153a] border border-white/10 hover:border-[#ec4899]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ec4899] transition-colors">Sleep Requirements by Age</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                A comprehensive breakdown of how many hours of rest you need at different stages of life, from infants to seniors.
              </p>
              <span className="text-[#ec4899] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read guide <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/blog/power-nap-guide" className="group bg-[#1a153a] border border-white/10 hover:border-[#ec4899]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ec4899] transition-colors">The Ultimate Power Nap Guide</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Discover the sweet spot between 20-minute energy boosts and 90-minute full cycle naps to avoid daytime grogginess.
              </p>
              <span className="text-[#ec4899] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read guide <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

      </article>

      {/* Try the tool banner */}
      <section 
        className="w-full bg-gradient-to-r from-[#00d2ff]/20 to-[#3a7bd5]/20 border border-[#00d2ff]/30 rounded-3xl p-8 md:p-12 text-center mt-20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
      >
        <Zap className="text-[#00d2ff] mx-auto mb-4" size={40} />
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Put this knowledge to work.</h2>
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
          The best way to fix your sleep schedule is to start timing your sleep properly tonight. Use our free tool to find your optimal wake-up time.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-[#00d2ff] text-[#130f2e] rounded-full px-8 py-4 font-bold text-lg hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:-translate-y-1 transition-all duration-300"
        >
          Calculate Sleep Cycles
        </Link>
      </section>

    </div>
  );
}
