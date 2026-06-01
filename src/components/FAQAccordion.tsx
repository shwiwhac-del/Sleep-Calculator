import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: ReactNode;
  schemaAnswer: string;
}

const faqs: FAQ[] = [
  {
    question: "What time should I wake up?",
    answer: (
      <>
        To feel fully refreshed, you should decide your wake-up time based on 90-minute sleep cycle intervals. Common targets like a <strong>6:00 AM API transition</strong> or a <strong>5:00 AM rise</strong> require aligning your bedtimes using our <Link to="/" className="text-[#2563EB] hover:underline font-semibold">sleep cycle calculator</Link>. Waking up right at the end of a cycle eliminates physical grogginess.
      </>
    ),
    schemaAnswer: "To feel fully refreshed, you should decide your wake-up time based on 90-minute sleep cycle intervals. Common targets like waking up at 6:00 AM or 5:00 AM require aligning your bedtimes using our sleep cycle calculator to wake up at the end of a sleep cycle."
  },
  {
    question: "What time should I go to bed?",
    answer: (
      <>
        The absolute <Link to="/best-time-to-sleep-and-wake-up" className="text-[#2563EB] hover:underline font-semibold">best bedtime</Link> depends specifically on your desired alarm time. For example, if you must wake up at 7:00 AM, sleeping at 10:00 PM or 11:30 PM (factoring in 15 minutes to fall asleep) guarantees you wake up at a clean transition point. Use our <Link to="/" className="text-[#2563EB] hover:underline font-semibold">bedtime sleep calculator</Link> to check exact times.
      </>
    ),
    schemaAnswer: "The absolute best bedtime depends specifically on your desired alarm time. For example, if you must wake up at 7:00 AM, sleeping at 10:00 PM or 11:30 PM (factoring in 15 minutes to fall asleep) guarantees you wake up at a clean transition point. Use our bedtime sleep calculator to check exact times."
  },
  {
    question: "How many sleep cycles do I need?",
    answer: (
      <>
        An average healthy adult needs <strong>5 to 6 completed sleep cycles</strong> per night, representing 7.5 to 9.0 hours of sleep. Students, athletes, and teenagers should target a minimum of 6 full cycles (9 hours) to support memory conversion and performance. Use our <Link to="/" className="text-[#2563EB] hover:underline font-semibold">sleep calculator</Link> to make sure your schedule matches your needs.
      </>
    ),
    schemaAnswer: "An average healthy adult needs 5 to 6 completed sleep cycles per night, representing 7.5 to 9.0 hours of sleep. Students, athletes, and teenagers should target a minimum of 6 full cycles (9 hours) to support memory conversion and performance."
  },
  {
    question: "Why am I tired after sleeping?",
    answer: (
      <>
        Feeling fatigued after a long sleep happens when your alarm forces you to wake up in the middle of Stage 3 deep restorative sleep. This sudden interruption triggers <em>sleep inertia</em>. Counting back in 90-minute blocks using our <Link to="/" className="text-[#2563EB] hover:underline font-semibold">sleep cycle calculator</Link> ensures you wake up during a light sleep transition instead.
      </>
    ),
    schemaAnswer: "Feeling fatigued after a long sleep happens when your alarm forces you to wake up in the middle of Stage 3 deep restorative sleep. Counting back in 90-minute blocks ensures you wake up during a light sleep transition instead."
  },
  {
    question: "How long is a sleep cycle?",
    answer: (
      <>
        A biological sleep cycle lasts approximately <strong>90 to 110 minutes</strong>. Each cycle is segmented into four deep electrical stages. Check out our comprehensive <Link to="/sleep-cycles-explained" className="text-[#2563EB] hover:underline font-semibold">sleep cycle timing guide</Link> to explore the neural waves of Stage 1, Stage 2, deep Slow-Wave Sleep, and active REM.
      </>
    ),
    schemaAnswer: "A biological sleep cycle lasts approximately 90 to 110 minutes on average and is segmented into four distinct stages of lighter and deeper sleep."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.schemaAnswer
      }
    }))
  };

  return (
    <div className="space-y-2.5 w-full max-w-[620px] mx-auto mt-4 sm:mt-5">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`bg-white dark:bg-[#111827] border rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-[#2563EB]/40 shadow-sm ring-1 ring-[#2563EB]/15 bg-blue-50/5 dark:bg-[#2563EB]/2' : 'border-gray-200 dark:border-[#1e293b] hover:border-gray-350 dark:hover:border-slate-700/80 shadow-xs'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-3.5 py-2.5 sm:px-4.5 sm:py-3.5 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 group transition-colors cursor-pointer"
               aria-expanded={isOpen}
            >
              <h3 className={`text-xs sm:text-sm font-bold pr-4 transition-colors duration-300 m-0 leading-snug ${isOpen ? 'text-[#2563EB]' : 'text-gray-900 dark:text-gray-100 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB]'}`}>
                {faq.question}
              </h3>
              <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#2563EB]/10' : 'bg-gray-50 dark:bg-[#1e293b] group-hover:bg-[#2563EB]/10'}`}>
                <ChevronDown 
                  className={`transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#2563EB]' : 'text-gray-400 group-hover:text-[#2563EB]'}`} 
                  size={15} 
                />
              </div>
            </button>
            <div 
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div onContextMenu={(e) => e.stopPropagation()} className="px-3.5 sm:px-4.5 pb-3 sm:pb-3.5 text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-[13px] select-text border-t border-gray-50/50 dark:border-slate-800/10 pt-2 sm:pt-2.5">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
