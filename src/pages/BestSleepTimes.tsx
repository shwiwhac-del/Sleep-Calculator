import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function BestSleepTimes() {
  return (
    <ArticleLayout
      title="Best Sleep Times Based on 90-Minute Cycles"
      description="Calculate the best sleep times using the 90-minute cycle method. Find out if you need 4, 5, or 6 cycles for optimal morning energy."
      readingTime="4"
      date="June 12, 2024"
    >
      {/* Intro */}
      <p>
        Waking up refreshed isn't about sleeping longer; it's about sleeping smarter. The secret to morning energy is pure math.
      </p>
      <p>
        Human sleep happens in 90-minute phases. Your "best time" to sleep is always a multiple of 90 minutes. 
      </p>

      {/* Section 1 */}
      <h2>How Many Cycles Do You Need?</h2>
      <p>
        Most healthy adults need either <strong>5 or 6 full cycles</strong> each night. 
      </p>
      <ul>
        <li><strong>5 Cycles (7.5 hours):</strong> This is the absolute sweet spot for most people to feel perfectly energized.</li>
        <li><strong>6 Cycles (9 hours):</strong> Ideal if you are sick, recovering from intense exercise, or feeling run down.</li>
        <li><strong>4 Cycles (6 hours):</strong> While not perfect long-term, sleeping exactly 6 hours is much better than sleeping 7 or 8 hours because you wake up between cycles.</li>
      </ul>

      {/* Section 2 */}
      <h2>Remember "Sleep Latency"</h2>
      <p>
        A sleep cycle starts when you fall asleep, not the moment you get into bed. You must account for the time it takes to drift off.
      </p>
      <p>
        Our <strong><Link to="/">sleep calculator</Link></strong> automatically adds 15 minutes of "sleep latency" to the math. For example, to wake up at 7:00 AM under a 7.5-hour cycle, you should be in bed by 11:15 PM.
      </p>

      {/* Section 3 */}
      <h2>Age Changes the Rules</h2>
      <p>
        Your biological need for sleep changes as you get older. Teenagers naturally need more time in bed than adults.
      </p>
      <p>
        Check our <Link to="/blog/sleep-by-age">sleep by age</Link> chart to see the exact recommendations for different stages of life.
      </p>
      
      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        Plan your sleep in 90-minute blocks of time. Always aim for 7.5 hours (5 cycles) for normal days.
      </p>
      <p>
        If you only have time for a quick break during the day, check out our <Link to="/blog/power-nap-guide">power nap guide</Link> instead of attempting a full cycle.
      </p>
    </ArticleLayout>
  );
}
