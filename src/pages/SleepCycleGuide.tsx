import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function SleepCycleGuide() {
  return (
    <ArticleLayout
      title="The Ultimate Sleep Cycle Guide: What Happens When You Sleep?"
      description="Learn about the 4 stages of sleep, REM, deep sleep, and how the 90-minute sleep cycle works. Stop waking up tired by mastering your biology."
      readingTime="7"
      date="May 14, 2024"
      author="Dr. Alan Morrison"
      relatedPosts={[
        {
          title: "How to Fix Your Sleep Schedule Fast",
          url: "/blog/fix-your-sleep-schedule",
          description: "Reset your internal clock and master your circadian rhythm in just a few days."
        },
        {
          title: "10 Actionable Sleep Tips for Better Health",
          url: "/blog/sleep-tips-for-better-health",
          description: "Improve your rest with these easy-to-implement habits."
        }
      ]}
    >
      {/* Intro */}
      <p>
        We spend one-third of our lives unconscious. But sleep is not a flatline; it is a highly active, structured process. 
      </p>
      <p>
        To truly optimize your night, you must understand the four biological stages of the 90-minute sleep cycle.
      </p>

      {/* Section 1 */}
      <h2>Stage 1: Light Transitions</h2>
      <p>
        This is the short transition between wakefulness and sleep. It only lasts 5 to 10 minutes.
      </p>
      <p>
        Your heartbeat slows down, and your muscles relax. If someone wakes you up during this stage, you will likely claim you weren't actually sleeping.
      </p>

      {/* Section 2 */}
      <h2>Stage 2: True Sleep</h2>
      <p>
        You spend about 50% of your night in this stage. Your body temperature drops and eye movements stop.
      </p>
      <p>
        Your brain creates rapid bursts of activity called "sleep spindles," which lock in short-term memories. If you take a nap, this is the perfect stage to wake up in (see our <Link to="/blog/power-nap-guide">power nap guide</Link>).
      </p>

      {/* Section 3 */}
      <h2>Stage 3: Deep Sleep</h2>
      <p>
        This is the most restorative stage of the night. Your breathing and heart rate drop to their absolute lowest levels.
      </p>
      <p>
        This is when your body repairs muscle and builds immunity. Waking up during this stage causes severe grogginess, which is <Link to="/blog/why-you-feel-tired">why you feel tired</Link> even after 8 hours of sleep.
      </p>

      {/* Section 4 */}
      <h2>Stage 4: REM Sleep</h2>
      <p>
        REM (Rapid Eye Movement) happens roughly 90 minutes after falling asleep. Your brain activity spikes to waking levels, and you begin to dream intensely.
      </p>
      <p>
        Your brain temporarily paralyzes your body so you don't act out your dreams. REM is critical for creativity and emotional processing.
      </p>

      {/* Section 5 */}
      <h2>The 90-Minute Rule</h2>
      <p>
        Light sleep and REM happen at the very end of 90-minute cycles. This is when your brain is closest to being awake.
      </p>
      <p>
        If your alarm rings at the end of a block, you wake up effortlessly. If it rings in the middle, you face terrible sleep inertia.
      </p>

      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        Your biology naturally wants to sleep in 90-minute increments. Never interrupt a cycle.
      </p>
      <p>
        Use a <strong><Link to="/">sleep calculator</Link></strong> every night to time your alarms perfectly.
      </p>
    </ArticleLayout>
  );
}
