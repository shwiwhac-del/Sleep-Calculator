import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function BestSleepTimes() {
  return (
    <ArticleLayout
      title="Best Sleep Times Based on 90-Minute Cycles"
      description="Calculate the best sleep times using the 90-minute cycle method. Find out if you need 4, 5, or 6 cycles for optimal morning energy."
      readingTime="4"
      date="June 12, 2024"
      backLink="/"
      backLabel="Back to Calculator"
    >
      <p>
        To wake up perfectly refreshed, you need to rely on math rather than arbitrary bedtimes. Since human sleep cycles last approximately 90 minutes, the "best times" to sleep are simple multiples of this duration.
      </p>

      <h2>The Ideal Number of Cycles</h2>
      <p>
        Most healthy adults should aim for either <strong>5 or 6 full cycles</strong> per night. 
      </p>
      <ul>
        <li><strong>5 Cycles:</strong> This equals exactly 7.5 hours of sleep. For many, this is the absolute sweet spot for feeling energized.</li>
        <li><strong>6 Cycles:</strong> This equals exactly 9 hours of sleep. This is ideal for periods of high physical stress, illness, or recovery.</li>
        <li><strong>4 Cycles (The Minimum):</strong> This equals exactly 6 hours of sleep. While not recommended for the long term, 6 hours is far superior to 7 or 8 hours because it perfectly aligning with the end of a cycle.</li>
      </ul>

      <h2>Factoring in Sleep Latency</h2>
      <p>
        A cycle begins when you actually fall asleep, not when your head hits the pillow. Our <strong><Link to="/">sleep calculator</Link></strong> automatically factors in an average of 15 minutes of "sleep latency"—the time it takes a normal human to drift off. So, if you want 5 cycles (7.5 hours) and need to wake up at 7:00 AM, you should get into bed at 11:15 PM.
      </p>

      <h2>Exceptions to the Rule</h2>
      <p>
        It is important to remember that ideal sleep duration changes throughout your life. Teenagers and babies have entirely different biological requirements. Check our <Link to="/blog/sleep-by-age">sleep by age</Link> chart for more detailed requirements tailored to different life stages.
      </p>
      
      <p>
        If you only have a short amount of time during the day and need a quick fix, you don't need a full night's rest. You can read our <Link to="/blog/power-nap-guide">power nap guide</Link> to learn how a 20-minute nap can save your day without triggering sleep inertia.
      </p>
    </ArticleLayout>
  );
}
