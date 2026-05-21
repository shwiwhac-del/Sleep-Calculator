const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const startMarker = '{/* Sleep Guides & Tools Section */}';
const endMarker = '{/* Floating Feedback Button */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found');
  process.exit(1);
}

const replacement = `      {/* Article Section */}
      <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 prose dark:prose-invert prose-blue">
        <h2>How Does a Sleep Calculator Work?</h2>
        <p>Human sleep consists of <strong>90-minute sleep cycles</strong>. If you wake up in the middle of a sleep cycle, especially during deep sleep, you will feel tired and groggy. Our sleep calculator works by counting backward or forward in 90-minute increments to find the exact moment when you transition between cycles—which is when you'll naturally wake up feeling the most refreshed.</p>
        <p>Because it takes the average person about 15 minutes to fall asleep, this bedtime calculator factors in that time to give you a highly accurate sleep schedule.</p>

        <h2>Best Time to Sleep and Wake Up</h2>
        <p>Maintaining a consistent sleep schedule is the most important factor in sleep quality. The ideal sleep hours vary by age:</p>
        <ul>
          <li><strong>Adults (18-64):</strong> 7 to 9 hours (5-6 cycles)</li>
          <li><strong>Teenagers (13-17):</strong> 8 to 10 hours (5-7 cycles)</li>
          <li><strong>Children (6-12):</strong> 9 to 12 hours (6-8 cycles)</li>
        </ul>
        <p>Getting the right amount of sleep improves cognitive performance, stress resilience, and overall metabolic health. Consistency is key over quantity.</p>

        <h2>Tips for Better Sleep Quality</h2>
        <h3>Avoid Screens Before Bed</h3>
        <p>Blue light suppresses melatonin, making it harder to fall asleep. Stop using screens at least 30 minutes before your calculated bedtime.</p>
        
        <h3>Caffeine Timing</h3>
        <p>Caffeine has a half-life of roughly 5 hours. Avoid coffee or energy drinks in the late afternoon to protect your deep sleep.</p>

        <h3>Keep a Dark Room</h3>
        <p>Sleeping in completely dark and cool environments helps your core body temperature drop and encourages unbroken rest.</p>

        <h3>Manage Stress</h3>
        <p>Establish a relaxing bedtime routine to calm your nervous system. Reading or light stretching works better than scrolling social media.</p>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <h2>Frequently Asked Questions</h2>
        <h3 className="text-lg font-bold">What is a sleep cycle?</h3>
        <p>A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM sleep.</p>

        <h3 className="text-lg font-bold">How many sleep cycles do adults need?</h3>
        <p>Most adults need 4–6 sleep cycles per night for healthy rest.</p>

        <h3 className="text-lg font-bold">Why do I wake up tired after sleeping 8 hours?</h3>
        <p>Waking up during deep sleep can cause grogginess even after enough sleep. Aligning your internal clock with 90-minute sleep cycles prevents this.</p>

        <h3 className="text-lg font-bold">What is the best bedtime?</h3>
        <p>The best bedtime depends on your wake-up time and natural sleep cycles. Use our bedtime calculator to count back from your alarm time.</p>
      </div>

      `;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('src/pages/Home.tsx', newContent);
console.log('Replaced successfully');
