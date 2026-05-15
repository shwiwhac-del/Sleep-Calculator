import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function SleepCycleGuide() {
  return (
    <ArticleLayout
      title="Sleep Cycle Stages Explained – REM, Deep & Light Sleep"
      keywords="sleep cycle guide, REM sleep, deep sleep, sleep stages"
      description="Understand the stages of the sleep cycle including REM sleep, deep sleep, and light sleep for healthier rest."
      readingTime="5"
      date="May 14, 2024"
      author="Sleep Expert Team"
      relatedPosts={[
        { title: "The Best Time to Sleep: Finding Your Perfect Bedtime", url: "/blog/best-sleep-time", description: "Discover the absolute best time to sleep." },
        { title: "Why You Feel Tired Even After 8 Hours", url: "/blog/tired", description: "Constantly exhausted despite getting enough sleep? Discover why." },
        { title: "Sleep By Age", url: "/blog/sleep-age", description: "Find out how much sleep you need." }
      ]}
    >
      <p>
        We spend one-third of our lives unconscious. But sleep is not a flatline; it is a highly active, structured process. 
      </p>
      <p>
        To truly optimize your night, you must understand the four biological stages of the 90-minute sleep cycle.
      </p>

      <h2>Stage 1: Light Transitions (N1)</h2>
      <p>
        This is the short transition between wakefulness and sleep. It only lasts 5 to 10 minutes.
      </p>
      <p>
        Your heartbeat slows down, and your muscles relax. If someone wakes you up during this stage, you will likely claim you were not actually sleeping.
      </p>

      <h2>Stage 2: True Sleep (N2)</h2>
      <p>
        You spend about 50% of your night in this stage. Your body temperature drops and eye movements stop.
      </p>
      <p>
        Your brain creates rapid bursts of activity called "sleep spindles," which lock in short-term memories. If you take a nap, this is the perfect stage to wake up in (see our <Link to="/blog/power-nap-guide">power nap guide</Link>).
      </p>

      <h2>Stage 3: Deep Sleep (N3)</h2>
      <p>
        This is the most restorative stage of the night. Your breathing and heart rate drop to their absolute lowest levels.
      </p>
      <p>
        During deep sleep, your body repairs muscle, builds bone, and boosts immunity. Waking up during this stage causes severe grogginess.
      </p>

      <h2>Stage 4: REM Sleep</h2>
      <p>
        REM (Rapid Eye Movement) happens roughly 90 minutes after falling asleep. Your brain activity spikes to waking levels.
      </p>
      <p>
        Your brain temporarily paralyzes your body so you do not act out your dreams. REM is critical for creativity and emotional processing.
      </p>

      <h2>The 90-Minute Rule</h2>
      <p>
        Every night, your body cycles through these four phases over and over. Each complete rotation takes 90 minutes.
      </p>
      <ul>
        <li><strong>Beginning of cycle:</strong> Light sleep (easy to wake up).</li>
        <li><strong>Middle of cycle:</strong> Deep sleep (hard to wake up, groggy).</li>
        <li><strong>End of cycle:</strong> REM transitioning to light sleep (perfect time to wake up).</li>
      </ul>
      <p>
        If your alarm rings at the exact end of a block, you wake up effortlessly.
      </p>

      <h2>Frequently Asked Questions</h2>
      
      <h3>How many cycles do I need per night?</h3>
      <p>
        Most healthy adults require 4 to 5 complete cycles per night. This translates to 6 or 7.5 hours of sleep. Check our <Link to="/blog/sleep-by-age">age guide</Link> for specifics.
      </p>

      <h3>Can I train my body to sleep less?</h3>
      <p>
        No. Biology dictates your need for deep sleep and REM. Cutting cycles consistently leads to sleep deprivation and health issues.
      </p>

      <h2>Summary</h2>
      <p>
        Your biology demands you sleep in 90-minute increments. Never interrupt a cycle if you can avoid it. Use a <strong><Link to="/">sleep calculator</Link></strong> every night to match your alarms to your natural rhythm.
      </p>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-[#1e293b]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 mt-0 font-serif">Scientific Sources & References</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3 m-0 pl-4">
          <li className="m-0 text-sm md:text-sm">
            <strong>National Institute of Neurological Disorders and Stroke:</strong> 
            <a href="https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#2563EB] hover:underline">Brain Basics: Understanding Sleep</a>
          </li>
          <li className="m-0 text-sm md:text-sm">
            <strong>Harvard Medical School:</strong> 
            <a href="https://health.harvard.edu/promotions/harvard-health-publications/improving-sleep" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#2563EB] hover:underline">Improving Sleep: A guide to a good night's rest</a>
          </li>
          <li className="m-0 text-sm md:text-sm">
            <strong>Sleep Foundation:</strong> 
            <a href="https://www.sleepfoundation.org/stages-of-sleep" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#2563EB] hover:underline">Stages of Sleep: What Happens in a Sleep Cycle</a>
          </li>
        </ul>
      </div>
    </ArticleLayout>
  );
}
