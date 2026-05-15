import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  color: string;
}

const faqs: FAQ[] = [
  {
    question: "What is a sleep calculator and how does it work?",
    answer: "A sleep calculator determines your exact bedtime or wake-up time based on 90-minute sleep cycles. By waking up at the end of a sleep cycle, you avoid grogginess and sleep inertia, allowing you to wake up feeling completely refreshed.",
    color: "#00d2ff"
  },
  {
    question: "What is the best time to sleep and wake up?",
    answer: "The best time to sleep depends on when you need to wake up. By using our sleep time calculator, you count backward in 90-minute blocks (sleep cycles). For example, to wake up energized at 7:00 AM, the ideal bedtimes are 10:00 PM (for 6 cycles), 11:30 PM (for 5 cycles), or 1:00 AM (for 4 cycles).",
    color: "#f43f5e"
  },
  {
    question: "How many sleep cycles do I need for healthy sleep?",
    answer: "A healthy sleep calculator rule of thumb is that most adults need between 4 to 6 complete sleep cycles per night, totaling 6 to 9 hours. Completing these REM and deep sleep cycles is vital for physical recovery and mental sharpness.",
    color: "#10b981"
  },
  {
    question: "How long does it take to fall asleep?",
    answer: "On average, a healthy adult takes 15 to 20 minutes to transition from wakefulness to sleep (sleep latency). Our sleep cycle calculator automatically factors in 15 extra minutes to ensure your sleep schedule is highly accurate.",
    color: "#fcd34d"
  },
  {
    question: "How long should a power nap be using a nap calculator?",
    answer: "For a quick energy boost without sleep inertia, a nap calculator recommends short power naps of 10-20 minutes to prevent entering deep sleep. If you need deeper recovery, aim for a full 90-minute nap to complete one exact sleep cycle.",
    color: "#8b5cf6"
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
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="space-y-4 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`bg-white dark:bg-[#111827] border rounded-[16px] xl:rounded-[20px] overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-[#2563EB]/50 shadow-md ring-1 ring-[#2563EB]/20 bg-blue-50/10 dark:bg-[#2563EB]/5' : 'border-gray-200 dark:border-[#1e293b] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:border-gray-300 dark:hover:border-[#333] hover:shadow-md'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 group transition-colors"
              aria-expanded={isOpen}
            >
              <h3 className={`text-lg sm:text-xl font-semibold pr-4 font-serif transition-colors duration-300 ${isOpen ? 'text-[#2563EB]' : 'text-gray-900 dark:text-gray-100 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB]'}`}>
                {faq.question}
              </h3>
              <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#2563EB]/10' : 'bg-gray-50 dark:bg-[#1e293b] group-hover:bg-[#2563EB]/10'}`}>
                <ChevronDown 
                  className={`transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#2563EB]' : 'text-gray-400 group-hover:text-[#2563EB]'}`} 
                  size={20} 
                />
              </div>
            </button>
            <div 
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div onContextMenu={(e) => e.stopPropagation()} className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base select-text">
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
