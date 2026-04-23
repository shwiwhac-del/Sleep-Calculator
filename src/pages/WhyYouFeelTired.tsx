import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function WhyYouFeelTired() {
  return (
    <ArticleLayout
      title="Why You Feel Tired Even After 8 Hours of Sleep"
      description="Constantly exhausted despite getting enough sleep? Discover the hidden causes of daily fatigue, from sleep inertia to poor sleep hygiene."
      readingTime="6"
      date="May 22, 2024"
    >
      <p>
        You did everything right. You went to bed early, you stayed off your phone, and you slept for a perfectly continuous eight hours. Yet, when your alarm rings, you feel like you've been hit by a truck. If you are constantly wondering why you feel so exhausted despite "getting enough sleep," you are not alone.
      </p>
      <p>
        Feeling chronically tired is rarely a symptom of simply not spending enough time in bed. Usually, it points to a problem with <em>how</em> you are sleeping, or exactly <em>when</em> you are waking up.
      </p>

      <h2>1. The Mid-Cycle Awakening (Sleep Inertia)</h2>
      <p>
        This is the most common, yet easily solvable, reason for morning exhaustion. As explained in our <Link to="/sleep-cycle-guide">sleep cycle guide</Link>, your brain moves through 90-minute phases of light and deep sleep.
      </p>
      <p>
        If your alarm goes off while you are in "Stage 3 Deep Sleep," your brain is essentially being violently ripped back to consciousness from its lowest state of electrical activity. This results in "sleep inertia"—a severe grogginess that can last for hours. In fact, sleeping for 8 hours often causes this, because 8 hours drops you right in the middle of a sleep cycle. By using a <strong><Link to="/">sleep calculator</Link></strong>, you can adjust your alarm by just 30 minutes to wake up at the end of a cycle, avoiding this fatigue entirely.
      </p>

      <h2>2. Poor Sleep Quality vs. Sleep Quantity</h2>
      <p>
        You can lay unconscious in a bed for 9 hours, but if you aren't getting enough <em>deep sleep</em> or <em>REM sleep</em>, your brain and body won't recover. Factors that destroy sleep quality include:
      </p>
      <ul>
        <li><strong>Alcohol:</strong> While it helps you pass out faster, alcohol famously blocks REM sleep, leaving you feeling mentally foggy the next day.</li>
        <li><strong>Caffeine:</strong> Caffeine has a quarter-life of up to 12 hours. That 3 PM coffee is still in your bloodstream at midnight, preventing your brain from dropping into deep sleep.</li>
        <li><strong>Sleep Apnea:</strong> This undiagnosed condition causes you to stop breathing briefly throughout the night. Your brain micro-awakens hundreds of times to gasp for air, preventing you from ever reaching restorative deep sleep.</li>
      </ul>

      <h2>3. The Screen-Time Melatonin Suppression</h2>
      <p>
        Your body's circadian rhythm is controlled by light. When the sun goes down, your brain produces melatonin, signaling that it's time to sleep. However, staring at the blue light emitting from your phone or television tricks your brain into thinking it is high noon.
      </p>
      <p>
        If you scroll on your phone right until you close your eyes, your brain has no melatonin in its system. Even if you fall asleep, the first few hours of your rest will be incredibly shallow. You should aim to turn off all screens at least one hour before the <Link to="/best-time-to-sleep">best time to sleep</Link>.
      </p>

      <h2>4. Chronic Dehydration and Diet</h2>
      <p>
        Sometimes, what feels like sleep deprivation is actually severe dehydration. You lose a significant amount of water simply by breathing throughout the night. Waking up and immediately pouring coffee (a diuretic) only makes this worse. Try drinking a massive glass of water the absolute second you wake up, before doing anything else.
      </p>

      <h2>The Quick Fix</h2>
      <p>
        If you are tired of being tired, start by fixing the variables you can control. Cut out caffeine in the afternoon, put your phone across the room at night, and use our <strong><Link to="/">sleep calculator</Link></strong> to ensure your alarm isn't interrupting your deep sleep. If you still feel exhausted after a few weeks of perfect sleep hygiene, it is time to consult a doctor to rule out deficiencies or sleep disorders.
      </p>
    </ArticleLayout>
  );
}
