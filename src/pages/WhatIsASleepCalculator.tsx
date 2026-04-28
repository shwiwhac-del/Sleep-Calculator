import { Link } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';

export default function WhatIsASleepCalculator() {
  return (
    <ArticleLayout
      title="What is a Sleep Calculator?"
      description="A sleep calculator is a free digital tool designed to help you figure out the absolute best time to sleep and wake up using the science of sleep cycles."
      readingTime="3"
      date="June 1, 2024"
    >
      {/* Intro */}
      <p>
        A <strong>sleep calculator</strong> is a free digital tool designed to help you figure out the absolute best time to sleep and wake up. 
      </p>
      <p>
        Instead of guessing when to set your alarm, this tool uses the exact science of 90-minute sleep cycles to calculate perfect bedtimes.
      </p>
      
      {/* Section 1 */}
      <h2>Stop Waking Up Exhausted</h2>
      <p>
        If you have ever woken up feeling destroyed—even after getting 8 hours of rest—you likely woke up during deep sleep.
      </p>
      <p>
        Our advanced <strong>sleep cycle calculator</strong> counts backward in specific 90-minute intervals. It ensures your alarm only rings when you are already in a stage of light sleep.
      </p>

      {/* Section 2 */}
      <h2>How It Helps You Plan Your Night</h2>
      <p>
        Whether you are a night owl or an early bird, a sleep calculator adapts to your actual schedule.
      </p>
      <ul>
        <li><strong>Need to wake up early?</strong> Input your wake-up time, and we give you a list of optimal bedtimes.</li>
        <li><strong>Going to sleep now?</strong> We will tell you the exact best times to set your alarm.</li>
      </ul>

      {/* Conclusion */}
      <h2>Summary</h2>
      <p>
        A sleep calculator removes the guesswork from your morning routine, preventing morning grogginess entirely.
      </p>
      <p>
        Ready to optimize your rest? Try our <Link to="/">sleep calculator</Link> right now and start waking up feeling energized!
      </p>
    </ArticleLayout>
  );
}
