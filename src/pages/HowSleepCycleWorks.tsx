import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function HowSleepCycleWorks() {
  return (
    <ArticleLayout
      title="How Does Your Sleep Cycle Work?"
      description="Human sleep isn't a single block of unconsciousness. Learn about the 90-minute sleep cycles and how they dictate your energy levels."
      readingTime="4"
      date="June 5, 2024"
    >
      <p>
        Human sleep isn't just a single block of unconsciousness. As you rest, your brain cycles through multiple stages of sleep: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep.
      </p>

      <h2>The Science of the 90-Minute Cycle</h2>
      <p>
        On average, one complete sleep cycle lasts for about <strong>90 minutes</strong>. During a normal night, a healthy adult will go through five to six of these cycles. Your brain descends from light rest down into deep, restorative NREM sleep, and then climbs back up into REM sleep before starting the cycle over again.
      </p>

      <h2>The Danger of Waking Up Mid-Cycle (Sleep Inertia)</h2>
      <p>
        If your alarm clock goes off while you are in the deepest stage of a sleep cycle, you will experience what scientists call "sleep inertia"—that heavy, groggy feeling that makes it nearly impossible to get out of bed. Your brain is essentially being shocked out of its deepest state of rest.
      </p>
      
      <h2>Syncing with Your Biology</h2>
      <p>
        By utilizing a <strong><Link to="/">sleep time calculator</Link></strong>, you can align your wake-up time with the natural end of a 90-minute cycle. When you wake up at the end of a cycle, your brain is already transitioning towards wakefulness, making it infinitely easier to get out of bed and start your day. For a deeper dive into the exact stages, read our <Link to="/blog/sleep-cycle-guide">comprehensive sleep cycle guide</Link>.
      </p>
    </ArticleLayout>
  );
}
