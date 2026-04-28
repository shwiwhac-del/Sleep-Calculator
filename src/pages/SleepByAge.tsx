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
      {/* Intro */}
      <p>
        If you have ever tried to wake a teenager up at 6:00 AM, you are fighting biology. Your required sleep changes drastically based on your age.
      </p>
      <p>
        Here is a breakdown of exactly how much rest you need at every stage of life.
      </p>

      {/* Section 1 */}
      <h2>Infants and Toddlers (0-3 Years)</h2>
      <p>
        <strong>Newborns (0-3 months)</strong> need <strong>14 to 17 hours</strong> of sleep. They do not have an internal clock yet, so they sleep in random bursts.
      </p>
      <p>
        By toddlerhood <strong>(1-2 years)</strong>, this drops to <strong>11 to 14 hours</strong>, usually split into one main night sleep and an afternoon nap.
      </p>

      {/* Section 2 */}
      <h2>Children (3-12 Years)</h2>
      <p>
        <strong>Preschoolers (3-5 years)</strong> need <strong>10 to 13 hours</strong>. Most children drop their daytime naps during this phase. 
      </p>
      <p>
        <strong>School-age children (6-12 years)</strong> need <strong>9 to 12 hours</strong>. Without enough rest, children often show signs of ADHD and behavioral issues in the classroom.
      </p>

      {/* Section 3 */}
      <h2>Teenagers (13-18 Years)</h2>
      <p>
        Teenagers need <strong>8 to 10 hours</strong> of sleep, but they face a major biological problem called "sleep phase delay."
      </p>
      <p>
        A teenager's brain delays melatonin production, making it basically impossible to fall asleep before 11 PM. Combined with early school start times, teenagers are wildly sleep-deprived.
      </p>

      {/* Section 4 */}
      <h2>Adults (18-64 Years)</h2>
      <p>
        For most of your life, you need <strong>7 to 9 hours</strong> of sleep.
      </p>
      <p>
        This equals exactly 5 cycles (7.5 hours) or 6 cycles (9 hours). Use a <strong><Link to="/">sleep calculator</Link></strong> to ensure your alarm aligns with the end of these blocks.
      </p>

      {/* Section 5 */}
      <h2>Older Adults (65+ Years)</h2>
      <p>
        Seniors need slightly less rest, about <strong>7 to 8 hours</strong> per night. 
      </p>
      <p>
        However, their sleep is much lighter. Seniors spend less time in deep sleep and wake up more frequently. They also get tired much earlier in the evening.
      </p>

      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        Do not fight your biology. Adjust your sleep schedule to match your age requirements.
      </p>
      <p>
        For adults, tracking cycles is always the smartest strategy. Find your <Link to="/blog/best-time-to-sleep">best time to sleep</Link> today.
      </p>
    </ArticleLayout>
  );
}
