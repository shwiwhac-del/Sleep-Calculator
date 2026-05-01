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
    <div className="space-y-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10"
          style={{ borderLeftWidth: '4px', borderLeftColor: faq.color }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left px-6 py-5 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
            <ChevronDown 
              className={`text-white transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </button>
          <div 
            className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 text-white/70 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
