import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function SleepByAge() {
  return (
    <ArticleLayout
      title="How Much Sleep Do You Need? A Sleep by Age Guide"
      description="Find out exactly how many hours of sleep you need based on your age. From newborns to seniors, learn how sleep requirements change over time."
      readingTime="5"
      date="May 18, 2024"
    >
      <p>
        If you have ever tried to drag a teenager out of bed at 6:00 AM, or wondered why your grandparents seem to naturally wake up at sunrise, you are witnessing biology in action. The amount of sleep a human requires—and the times they naturally feel tired—are largely dictated by their age.
      </p>
      <p>
        While you can always use our <strong><Link to="/">sleep calculator</Link></strong> to find the <Link to="/best-time-to-sleep">best time to sleep</Link> based on 90-minute cycles, the total number of cycles you should be aiming for changes as you grow. Here is a definitive breakdown of sleep requirements by age according to the National Sleep Foundation.
      </p>

      <h2>Infants and Toddlers (0-3 Years)</h2>
      <p>
        <strong>Newborns (0-3 months)</strong> require an unpredictable <strong>14 to 17 hours</strong> of sleep a day. Their circadian rhythms have not yet developed, meaning they sleep in fragmented, multi-hour bursts around the clock. By the time they reach toddlerhood <strong>(1-2 years)</strong>, this condenses to <strong>11 to 14 hours</strong> a day, usually involving one long nighttime stretch and a daytime nap.
      </p>

      <h2>Children (3-12 Years)</h2>
      <p>
        <strong>Preschoolers (3-5 years)</strong> need <strong>10 to 13 hours</strong>, and this is typically the age when they begin to drop their daytime naps. 
      </p>
      <p>
        <strong>School-age children (6-12 years)</strong> require <strong>9 to 12 hours</strong> of sleep. At this stage, chronic sleep deprivation can begin to masquerade as behavioral issues or ADHD-like symptoms in the classroom, making a strict bedtime routine critical for cognitive development.
      </p>

      <h2>Teenagers (13-18 Years)</h2>
      <p>
        During puberty, adolescents face a biological perfect storm. They require a hefty <strong>8 to 10 hours</strong> of sleep per night to fuel rapid physical and neural growth. However, their internal clock (circadian rhythm) undergoes a "sleep phase delay."
      </p>
      <p>
        In teenagers, the brain delays the secretion of melatonin (the hormone that makes you sleepy) until much later in the evening. This makes it biologically difficult for a teen to fall asleep before 11 PM. Combined with early school start times, a massive percentage of teenagers are chronically sleep-deprived.
      </p>

      <h2>Adults (18-64 Years)</h2>
      <p>
        For the vast majority of your life, you will need <strong>7 to 9 hours</strong> of sleep per night. In terms of sleep cycles, this means you should aim for either 5 cycles (7.5 hours) or 6 cycles (9 hours). 
      </p>
      <p>
        If you find yourself requiring more than 9 hours of sleep just to function, or if you feel consistently exhausted despite hitting these targets, it might be a sign of poor sleep quality, sleep apnea, or other health issues. Setting your alarm with a <strong><Link to="/">sleep calculator</Link></strong> can immediately improve how you feel in the morning by preventing deep-sleep awakenings.
      </p>

      <h2>Older Adults (65+ Years)</h2>
      <p>
        As we enter our senior years, our sleep needs slightly decrease to <strong>7 to 8 hours</strong> per night. However, the architecture of the sleep itself changes drastically. 
      </p>
      <p>
        Older adults spend significantly less time in deep, restorative sleep. Their sleep is often more fragmented, waking up multiple times throughout the night due to medical issues, medications, or nocturia (frequent urination). Furthermore, older adults experience an "advanced sleep phase," meaning they get tired much earlier in the evening and wake up naturally very early in the morning.
      </p>
    </ArticleLayout>
  );
}
