import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function WhyYouFeelTired() {
  return (
    <ArticleLayout
      title="Why You Feel Tired Even After 8 Hours of Sleep"
      description="Constantly exhausted despite getting enough sleep? Discover the hidden causes of daily fatigue, from sleep inertia to poor sleep hygiene."
      readingTime="6"
      date="May 22, 2024"
      author="Sleep Expert Team"
      relatedPosts={[
        {
          title: "Deep Sleep Tips That Actually Work",
          url: "/blog/deep-sleep-tips-that-actually-work",
          description: "Maximize your deep sleep restorative cycles with science-backed techniques."
        },
        {
          title: "The Ultimate Power Nap Guide",
          url: "/blog/power-nap-guide",
          description: "Use strategic napping to beat afternoon fatigue without ruining your night."
        }
      ]}
    >
      {/* Intro */}
      <p>
        You did everything right. You went to bed early and slept for 8 continuous hours. Yet, your alarm rings and you feel like you were hit by a truck. 
      </p>
      <p>
        Feeling chronically tired is rarely about the *amount* of time you spend in bed. It points directly to a problem with exactly *when* you wake up.
      </p>

      {/* Section 1 */}
      <h2>1. The Mid-Cycle Alarm (Sleep Inertia)</h2>
      <p>
        This is the most common reason for morning exhaustion. If your alarm rings while you are trapped in "Stage 3 Deep Sleep," you will experience severe sleep inertia.
      </p>
      <p>
        Sleeping for exactly 8 hours usually drops you right in the middle of a deep sleep stage. Use a <strong><Link to="/">sleep calculator</Link></strong> to adjust your alarm by 30 minutes, ensuring you wake up during light sleep.
      </p>

      {/* Section 2 */}
      <h2>2. Poor Sleep Quality</h2>
      <p>
        You can lie unconscious for 9 hours, but if you don't get enough deep sleep, your brain won't physically recover. 
      </p>
      <ul>
        <li><strong>Alcohol:</strong> Alcohol blocks REM sleep, leaving you feeling mentally foggy the next day.</li>
        <li><strong>Caffeine:</strong> That 3:00 PM coffee stays in your bloodstream until midnight, preventing your brain from dropping into deep sleep.</li>
      </ul>

      {/* Section 3 */}
      <h2>3. The Blue Light Melatonin Block</h2>
      <p>
        When the sun goes down, your brain produces melatonin to make you sleepy. 
      </p>
      <p>
        Staring at your phone tricks your brain into thinking it is high noon. If you scroll until you sleep, your brain creates no melatonin, resulting in shallow, restless sleep. 
      </p>

      {/* Section 4 */}
      <h2>4. Morning Dehydration</h2>
      <p>
        Sometimes, fatigue is literally just severe dehydration. You lose massive amounts of water simply breathing throughout the night.
      </p>
      <p>
        Waking up and immediately drinking coffee makes this worse. Drink a massive glass of water the second you wake up, before doing anything else.
      </p>

      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        Start by fixing what you can control. Cut out afternoon caffeine, drink water in the morning, and block blue light at night.
      </p>
      <p>
        Most importantly, stop guessing your wake-up time. Use a sleep calculator to find your <Link to="/blog/best-time-to-sleep">best time to sleep</Link>.
      </p>
    </ArticleLayout>
  );
}
