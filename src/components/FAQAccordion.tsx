import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "What is a sleep cycle?",
    answer: "A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM (Rapid Eye Movement) sleep that the brain goes through multiple times per night."
  },
  {
    question: "How many sleep cycles do adults need?",
    answer: "Most adults need 4 to 6 sleep cycles per night, which equates to 6 to 9 hours of total sleep, to maintain healthy body and brain function."
  },
  {
    question: "Why do I wake up tired after sleeping 8 hours?",
    answer: "Waking up tired after 8 hours occurs because you were forced to wake up in the middle of a deep sleep cycle. Aligning your internal clock with complete 90-minute sleep cycles prevents this grogginess."
  },
  {
    question: "What is the best bedtime?",
    answer: <>The best bedtime depends exclusively on your wake-up time and your natural sleep cycles. Use our <Link to="/">bedtime calculator</Link> at the top of the page to count back from your morning alarm.</>
  },
  {
    question: "How long does it take to fall asleep?",
    answer: "On average, it takes a healthy adult 15 to 20 minutes to fall asleep (sleep latency). Our calculator automatically factors in 15 minutes to give you the most accurate bedtime schedule."
  },
  {
    question: "How long should a power nap be?",
    answer: "A perfect power nap should be around 20 minutes. This gives you a quick boost of alertness without entering deep sleep, which can leave you feeling groggy. Alternatively, a full 90-minute nap allows for a complete sleep cycle."
  },
  {
    question: "Can I catch up on sleep during the weekend?",
    answer: "While sleeping in on weekends can help recover some lost sleep, it doesn't completely reverse the chronic effects of sleep deprivation and can throw off your internal circadian rhythm for the upcoming week. Consistency is key."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 w-full mt-6">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`bg-white dark:bg-[#111827] border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-[#2563EB]/50 shadow-sm ring-1 ring-[#2563EB]/20 bg-blue-50/10 dark:bg-[#2563EB]/5' : 'border-gray-200 dark:border-[#1e293b] hover:border-gray-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 group transition-colors"
              aria-expanded={isOpen}
            >
              <h3 className={`text-base sm:text-lg font-bold pr-4 transition-colors duration-300 m-0 ${isOpen ? 'text-[#2563EB]' : 'text-gray-900 dark:text-gray-100 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB]'}`}>
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
                <div onContextMenu={(e) => e.stopPropagation()} className="px-4 sm:px-5 pb-3 sm:pb-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base select-text">
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
