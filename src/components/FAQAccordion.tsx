import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  color: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the 90-minute sleep rule?",
    answer: "The 90-minute sleep rule states that human sleep occurs in 90-minute cycles. Waking up at the end of a cycle (e.g., after 6 or 7.5 hours) helps you feel refreshed and prevents morning grogginess.",
    color: "#00d2ff"
  },
  {
    question: "Are 6 hours of sleep enough?",
    answer: "Six hours consists of exactly four 90-minute cycles. For many adults, waking up after 6 hours is better than 7 hours because it prevents waking mid-cycle, though 7.5 hours is typically optimal.",
    color: "#fcd34d"
  },
  {
    question: "How long does it take to fall asleep?",
    answer: "On average, it takes a healthy adult between 10 to 20 minutes to fall asleep. Our sleep calculator automatically adds 15 minutes to all bedtime equations to account for this transition.",
    color: "#10b981"
  },
  {
    question: "What time should I go to bed if I want to wake up at 7 AM?",
    answer: "To wake up refreshed at 7:00 AM, you should aim to fall asleep at 10:00 PM (for 9 hours), 11:30 PM (for 7.5 hours), or 1:00 AM (for 6 hours) to complete full 90-minute sleep cycles. Remember to add about 15 minutes to fall asleep, so get into bed at 9:45 PM, 11:15 PM, or 12:45 AM.",
    color: "#f43f5e"
  },
  {
    question: "Does age affect my sleeping cycle?",
    answer: "Yes! While the 90-minute sleep cycle remains fairly constant throughout adulthood, overall sleep needs change. Newborns need up to 17 hours, teens need 8-10 hours, and most adults need 7-9 hours. Older adults often experience lighter sleep and earlier wake times.",
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
            className={`bg-white dark:bg-[#111] border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-[#2563EB]/50 shadow-md ring-1 ring-[#2563EB]/20 bg-blue-50/10 dark:bg-[#2563EB]/5' : 'border-gray-100 dark:border-[#222] shadow-sm hover:border-[#2563EB]/30 hover:shadow-md'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 group transition-colors"
              aria-expanded={isOpen}
            >
              <h3 className={`text-lg sm:text-xl font-semibold pr-4 font-serif transition-colors duration-300 ${isOpen ? 'text-[#2563EB]' : 'text-gray-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB]'}`}>
                {faq.question}
              </h3>
              <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#2563EB]/10' : 'bg-gray-50 dark:bg-[#1A1A1A] group-hover:bg-[#2563EB]/10'}`}>
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
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
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
