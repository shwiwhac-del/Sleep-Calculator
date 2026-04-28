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
      {/* Intro */}
      <p>
        Human sleep is not just one long block of unconsciousness. It is a highly active process.
      </p>
      <p>
        Every night, your brain cycles through multiple stages: light sleep, deep sleep, and REM sleep. Let's break down how it works.
      </p>

      {/* Section 1 */}
      <h2>What is a Sleep Cycle?</h2>
      <p>
        A sleep cycle is the journey your brain takes from light sleep, down into deep sleep, and back up to REM sleep.
      </p>
      <p>
        On average, one complete cycle lasts exactly <strong>90 minutes</strong>. A healthy adult goes through 5 or 6 of these complete cycles every single night.
      </p>

      {/* Section 2 */}
      <h2>The Danger of Waking Up Mid-Cycle</h2>
      <p>
        If your alarm clock rings while you are trapped at the very bottom of a deep sleep stage, you will experience "sleep inertia."
      </p>
      <p>
        Sleep inertia is the heavy, groggy feeling that makes it nearly impossible to get out of bed. It happens when your brain is shocked awake unnaturally.
      </p>
      
      {/* Section 3 */}
      <h2>How to Wake Up Easier</h2>
      <p>
        To wake up feeling refreshed, you must align your alarm clock with the end of a full 90-minute cycle.
      </p>
      <p>
        When you wake up at the end of a cycle, your brain is already in a light stage of sleep. You can use a <strong><Link to="/">sleep calculator</Link></strong> to do this math instantly.
      </p>

      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        Never guess your wake-up time. Use the 90-minute rule to wake up during light sleep, completely bypassing morning grogginess.
      </p>
      <p>
        For a deeper dive into the specific sleep stages, read our <Link to="/blog/sleep-cycle-guide">comprehensive sleep cycle guide</Link>.
      </p>
    </ArticleLayout>
  );
}
