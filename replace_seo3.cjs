const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace schema
const schemaStart = '<script type="application/ld+json">';
const schemaEnd = '</script>';

const schemaStartIndex = content.indexOf(schemaStart);
const schemaEndIndex = content.indexOf(schemaEnd, schemaStartIndex) + schemaEnd.length;

const newSchema = `<script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/"
                },
                {
                  "@type": "Organization",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/",
                  "logo": "https://sleepcalculater.online/icon.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@sleepcalculater.online",
                    "contactType": "customer support"
                  }
                },
                {
                  "@type": "WebApplication",
                  "name": "Sleep Cycle Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "All",
                  "url": "https://sleepcalculater.online/",
                  "description": "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Article",
                  "headline": "How Does a Sleep Calculator Work? Best Bedtime Timing Explained",
                  "description": "Learn the science behind 90-minute sleep cycles and how calculating your bedtime can help you wake up refreshed.",
                  "author": {
                    "@type": "Organization",
                    "name": "Sleep Calculator Experts",
                    "url": "https://sleepcalculater.online/about"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://sleepcalculater.online/"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is a sleep cycle?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM sleep that humans experience multiple times per night."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many sleep cycles do adults need?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most adults need 4 to 6 sleep cycles per night, totaling 6 to 9 hours of sleep, for optimal rest and health."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why do I wake up tired after sleeping 8 hours?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Waking up tired after 8 hours of sleep happens because you woke up in the middle of a deep sleep cycle, causing sleep inertia and grogginess."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best bedtime?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best bedtime is determined by counting backward from your wake-up time in 90-minute increments, ensuring you wake up at the end of a sleep cycle."
                      }
                    }
                  ]
                }
              ]
            })}
          </script>`;

content = content.substring(0, schemaStartIndex) + newSchema + content.substring(schemaEndIndex);

// Replace article Section
const articleStart = '{/* Article Section */}';
const articleEnd = '{/* Floating Feedback Button */}';

const articleStartIndex = content.indexOf(articleStart);
const articleEndIndex = content.indexOf(articleEnd, articleStartIndex);

const newArticle = `{/* Article Section */}
      <article className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 prose dark:prose-invert prose-blue prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl">
        <h2>How Does a Sleep Calculator Work?</h2>
        <p><strong>Answer:</strong> A sleep calculator works by counting backward or forward in 90-minute increments to find the exact moment your body transitions between sleep cycles. Waking up between cycles prevents grogginess and ensures you wake up feeling refreshed.</p>
        <p>Human sleep consists of <strong>90-minute REM sleep cycles</strong>. If you wake up in the middle of a deep sleep cycle, you will experience "sleep inertia" (feeling tired and sluggish). Because it takes the average person about 15 minutes to fall asleep, a high-quality bedtime calculator factors in this latency time to give you a highly accurate sleep schedule.</p>

        <h2>What is the Best Time to Sleep and Wake Up?</h2>
        <p><strong>Answer:</strong> The best time to sleep depends on your desired wake-up time, adjusting for 4 to 6 full 90-minute sleep cycles. Consistency in your sleep schedule is the most important factor in sleep quality.</p>
        <p>The ideal sleep hours vary by age:</p>
        <ul className="list-disc pl-5 my-4">
          <li><strong>Adults (18-64):</strong> 7 to 9 hours (5-6 cycles)</li>
          <li><strong>Teenagers (13-17):</strong> 8 to 10 hours (5-7 cycles)</li>
          <li><strong>Children (6-12):</strong> 9 to 12 hours (6-8 cycles)</li>
        </ul>
        <p>Getting the right amount of sleep improves cognitive performance, stress resilience, and overall metabolic health. For more detailed insights, visit our <Link to="/blog">Sleep Blog</Link>.</p>

        <h2>Tips for Better Sleep Quality</h2>
        <h3>1. Avoid Screens Before Bed</h3>
        <p>Blue light suppresses the production of melatonin, making it harder to fall asleep naturally. Stop using screens at least 30 minutes before your calculated bedtime.</p>
        
        <h3>2. Caffeine Timing</h3>
        <p>Caffeine has a half-life of roughly 5 hours. Avoid coffee or energy drinks in the late afternoon to protect the quality of your deep sleep stages.</p>

        <h3>3. Keep a Dark and Cool Room</h3>
        <p>Sleeping in completely dark and cool environments helps your core body temperature drop properly, which encourages unbroken, restful sleep.</p>

        <h3>4. Manage Stress</h3>
        <p>Establish a relaxing bedtime routine to calm your nervous system. Reading or light stretching works far better than scrolling social media.</p>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-bold mb-2">What is a sleep cycle?</h3>
            <p className="m-0">A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM (Rapid Eye Movement) sleep that the brain goes through multiple times per night.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">How many sleep cycles do adults need?</h3>
            <p className="m-0">Most adults need 4 to 6 sleep cycles per night, which equates to 6 to 9 hours of total sleep, to maintain healthy body and brain function.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Why do I wake up tired after sleeping 8 hours?</h3>
            <p className="m-0">Waking up tired after 8 hours occurs because you were forced to wake up in the middle of a deep sleep cycle. Aligning your internal clock with complete 90-minute sleep cycles prevents this grogginess.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">What is the best bedtime?</h3>
            <p className="m-0">The best bedtime depends exclusively on your wake-up time and your natural sleep cycles. Use our <Link to="/">bedtime calculator</Link> at the top of the page to count back from your morning alarm.</p>
          </div>
        </div>

        {/* Trust Signals / Author Section */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700">
          <h3 className="text-base font-bold mt-0 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Trust & Methodology
          </h3>
          <p className="text-sm m-0 text-gray-600 dark:text-gray-400">
            Our calculator is based on peer-reviewed chronological research and the widely accepted 90-minute standard REM sleep cycle model. References include guidelines from the National Sleep Foundation and the CDC. For questions or support, visit our <Link to="/contact" className="underline hover:text-blue-600">Contact</Link> page. This tool provides estimates and does not substitute medical advice.
          </p>
        </div>
      </article>

      `;

content = content.substring(0, articleStartIndex) + newArticle + content.substring(articleEndIndex);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Replaced successfully');
