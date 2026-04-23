import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  color: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the 90-minute sleep rule?",
    answer: "The 90-minute sleep rule is based on the scientific fact that a complete sleep cycle takes about 90 minutes. If you wake up at the end of a 90-minute multiple (e.g., 6 hours, 7.5 hours, 9 hours), you will feel more refreshed than if you wake up in the middle of a cycle.",
    color: "#00d2ff"
  },
  {
    question: "Are 6 hours of sleep enough?",
    answer: "Six hours equals exactly four 90-minute cycles. For many adults, waking up after exactly 6 hours feels much better than waking up after 7 hours, because the 7-hour mark interrupts a deep sleep cycle. However, 7.5 hours (5 cycles) is generally considered the optimal target.",
    color: "#fcd34d"
  },
  {
    question: "How long does it take to fall asleep?",
    answer: "On average, it takes a healthy adult between 10 to 20 minutes to fall asleep (known as sleep latency). Our sleep calculator automatically adds 15 minutes to all bedtime equations to account for this transition period.",
    color: "#10b981"
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:bg-white/10"
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
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-5 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
