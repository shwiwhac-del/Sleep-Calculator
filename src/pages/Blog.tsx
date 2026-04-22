import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Moon, BookOpen, Clock, Activity, Brain, Battery, AlarmClock, BedDouble, Sun, Shield, Star, Zap, Heart, Coffee, ArrowLeft } from 'lucide-react';

export default function Blog() {
  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none rounded-lg px-2 py-1 -ml-2">
          <ArrowLeft size={20} />
          Back to Calculator
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center mb-16 text-center"
      >
        <BookOpen className="text-[#00d2ff] mb-4" size={48} />
        <h1 className="text-4xl font-bold tracking-wide mb-4">Sleep Better Blog</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Learn how to optimize your rest, understand your REM cycles, and wake up feeling refreshed every single day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Article 1 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#00d2ff] mb-4">
            <Activity size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Sleep Science</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">How to Use a Sleep Cycle Calculator for Better Rest</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              If you've ever woken up feeling exhausted despite getting 8 hours of sleep, you might be waking up in the middle of deep sleep. A <strong>sleep cycle calculator</strong> (sometimes called a <strong>rem sleep calculator</strong>) helps you align your alarms with your body's natural rhythms.
            </p>
            <p>
              By figuring out exactly <strong>what time should I go to bed</strong>, you can ensure you complete full 90-minute cycles. Our <strong>sleepcalculator</strong> takes the guesswork out of your nighttime routine. It calculates backwards from your ideal wake time, factoring in the average 15 minutes it takes to fall asleep.
            </p>
            <p>
              The next time you find yourself wondering <strong>"what time should I wake up?"</strong> or <strong>"when should I wake up?"</strong>, remember that timing is just as important as duration.
            </p>
          </div>
        </motion.article>

        {/* Article 2 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#fcd34d] mb-4">
            <Moon size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Morning Routine</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">"What Time Should I Wake Up?" - Solving the Morning Puzzle</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              We all ask ourselves: <strong>when should I wake up</strong> to feel my absolute best? The answer isn't just about getting the maximum total hours; it's about precise timing.
            </p>
            <p>
              A good <strong>sleep time calculator</strong> calculates the exact moments you transition between light and deep sleep. If you need to be up by 7:00 AM for work, a <strong>sleeping calculator</strong> will tell you the best times to fall asleep the night before.
            </p>
            <p>
              Stop guessing <strong>when to wake up</strong> and let our <strong>sleep calc</strong> do the math for you. By using a <strong>calculator sleep</strong> tool, you can train your circadian rhythm to naturally wake up during the lightest phase of sleep.
            </p>
          </div>
        </motion.article>

        {/* Article 3 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#40c9ff] mb-4">
            <Clock size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Healthy Habits</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">The Ultimate Guide to Your Sleep Calculator Time</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Finding your perfect <strong>sleep calculator time</strong> can completely transform your mornings. Whether you search the web for <strong>sleep cal</strong>, <strong>sleepcalc</strong>, or even <strong>sleep.calculator</strong>, the end goal is always the same: waking up refreshed and ready to tackle the day.
            </p>
            <p>
              Use our <strong>calculator sleep</strong> tool daily to adjust for your changing schedule. If you have to stay up late one night, just plug your new bedtime into the <strong>sleep calculator</strong> to find the next optimal wake window.
            </p>
            <p>
              Remember, consistency is key, and a reliable <strong>sleep calculator</strong> is your best tool for building healthy, long-lasting sleep habits.
            </p>
          </div>
        </motion.article>

        {/* Article 4 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#a855f7] mb-4">
            <Brain size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Neurology</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">The Science Behind the REM Sleep Calculator</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Understanding your brain waves is the first step to better rest. A <strong>rem sleep calculator</strong> doesn't just count hours; it tracks the 90-minute intervals your brain needs to process memories and repair tissues.
            </p>
            <p>
              When you use a <strong>sleep cycle calculator</strong>, you're aligning your schedule with your biology. Waking up during REM sleep leaves you groggy, but waking up at the end of a cycle feels natural.
            </p>
            <p>
              Don't just guess your bedtime—let a <strong>sleepcalculator</strong> do the heavy lifting and optimize your brain's nightly recovery process.
            </p>
          </div>
        </motion.article>

        {/* Article 5 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#10b981] mb-4">
            <Battery size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Energy Levels</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Recharging with the Perfect Sleep Calc</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Think of your body like a battery. If you unplug it at the wrong time, it won't hold a charge. A <strong>sleep calc</strong> ensures you "unplug" (wake up) at the exact right moment in your sleep cycle.
            </p>
            <p>
              By finding your ideal <strong>sleep calculator time</strong>, you avoid the grogginess of sleep inertia. It's the smartest way to use a <strong>calculator sleep</strong> tool for daily energy.
            </p>
            <p>
              Whether you need a quick 90-minute nap or a full 9-hour rest, calculating your cycles is the key to staying at 100% battery all day.
            </p>
          </div>
        </motion.article>

        {/* Article 6 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#ef4444] mb-4">
            <AlarmClock size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Alarms</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">"What Time Should I Wake Up?" - Beating the Alarm</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              The dreaded morning alarm doesn't have to be a shock to your system. If you constantly ask, <strong>"what time should I wake up?"</strong>, the answer lies in your sleep cycles.
            </p>
            <p>
              Knowing exactly <strong>when to wake up</strong> can make the difference between a productive day and a sluggish one. A dedicated <strong>sleeping calculator</strong> helps you set that alarm with confidence.
            </p>
            <p>
              Stop hitting snooze. By waking up at the end of a cycle, your body will naturally be ready to start the day the moment the alarm rings.
            </p>
          </div>
        </motion.article>

        {/* Article 7 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#8b5cf6] mb-4">
            <BedDouble size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Routines</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Consistency and Your Sleep Time Calculator</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Going to bed at the same time every night is crucial. But <strong>what time should I go to bed</strong>? A <strong>sleep time calculator</strong> helps you establish a firm bedtime by working backward from your morning alarm.
            </p>
            <p>
              Whether you search for a <strong>sleep cal</strong> or a full bedtime routine planner, consistency is the secret ingredient to restorative rest.
            </p>
            <p>
              Once you find your ideal bedtime, stick to it. Your circadian rhythm will eventually adapt, making it easier to fall asleep within that 15-minute window.
            </p>
          </div>
        </motion.article>

        {/* Article 8 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#f97316] mb-4">
            <Sun size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Shift Work</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Shift Workers: When Should I Wake Up?</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Shift work can wreak havoc on your circadian rhythm. If your schedule changes weekly, you might constantly wonder, <strong>"when should I wake up?"</strong>
            </p>
            <p>
              This is where a <strong>sleepcalc</strong> becomes indispensable. Even with irregular hours, a <strong>sleep.calculator</strong> can help you find the optimal 90-minute windows to ensure you get the most out of your daytime or nighttime slumber.
            </p>
            <p>
              Don't let a rotating schedule ruin your health. Calculate your cycles based on whenever your "night" happens to be.
            </p>
          </div>
        </motion.article>

        {/* Article 9 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#3b82f6] mb-4">
            <Shield size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Health</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Protecting Your Rest with a Sleep Calculator</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Sleep debt is real, and it accumulates faster than you think. Using a <strong>sleep calculator</strong> helps you protect your health by ensuring you get 4 to 6 full cycles per night.
            </p>
            <p>
              A quick check with a <strong>sleep calc</strong> can tell you if you're chronically under-sleeping. Stop asking <strong>"what time should I go to bed"</strong> and start planning it proactively.
            </p>
            <p>
              Protecting your sleep is protecting your immune system, your mood, and your cognitive function.
            </p>
          </div>
        </motion.article>

        {/* Article 10 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#eab308] mb-4">
            <Star size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Aging</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">How Age Affects Your Sleep Cycle Calculator Needs</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              As we age, our sleep architecture changes. While a standard <strong>sleep cycle calculator</strong> uses 90-minute averages, older adults might experience slightly shorter cycles or more frequent awakenings.
            </p>
            <p>
              Regardless of age, a <strong>rem sleep calculator</strong> remains a vital tool. Adjusting your <strong>sleep calculator time</strong> as you get older ensures you continue to wake up feeling vibrant.
            </p>
            <p>
              Listen to your body. If 5 cycles (7.5 hours) feels like too much, try adjusting to 4 cycles and see how your mornings improve.
            </p>
          </div>
        </motion.article>

        {/* Article 11 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#06b6d4] mb-4">
            <Zap size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Hacks</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">The 90-Minute Rule and Your Calculator Sleep Tool</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              The 90-minute rule is the golden standard of sleep science. A <strong>calculator sleep</strong> app uses this rule to prevent you from waking up during Stage 3 or 4 deep sleep.
            </p>
            <p>
              By relying on a <strong>sleeping calculator</strong>, you can hack your mornings. Never guess <strong>when to wake up</strong> again—let the math guide your mornings.
            </p>
            <p>
              Even a 90-minute nap is better than a 2-hour nap, because it allows you to complete one full cycle without waking up groggy.
            </p>
          </div>
        </motion.article>

        {/* Article 12 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#ec4899] mb-4">
            <Heart size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Wellness</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Heart Health and Your Sleep Time Calculator</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Did you know that irregular sleep patterns can affect your cardiovascular health? A <strong>sleep time calculator</strong> isn't just for feeling less tired; it's for your overall well-being.
            </p>
            <p>
              By knowing exactly <strong>what time should I wake up</strong>, you reduce morning cortisol spikes and stress on your heart. A simple <strong>sleep cal</strong> routine can be a lifesaver.
            </p>
            <p>
              Prioritize your heart by prioritizing your sleep cycles. Consistency is the best medicine.
            </p>
          </div>
        </motion.article>

        {/* Article 13 */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 text-[#d97706] mb-4">
            <Coffee size={20} />
            <span className="text-sm font-bold tracking-wider uppercase">Energy</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Ditch the Coffee: Trust the Sleepcalculator</h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              If you rely on three cups of coffee to get through the morning, your sleep timing is likely off. A <strong>sleepcalculator</strong> can help you break the caffeine dependency.
            </p>
            <p>
              By using a <strong>sleepcalc</strong> (or <strong>sleep.calculator</strong>), you wake up naturally energized. Say goodbye to the midday crash and hello to natural, cycle-synced energy.
            </p>
            <p>
              Try using the calculator for one week instead of relying on caffeine, and feel the difference in your natural energy levels.
            </p>
          </div>
        </motion.article>

      </div>
    </div>
  );
}
