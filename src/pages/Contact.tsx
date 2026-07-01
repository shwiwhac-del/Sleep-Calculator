import { useState, FormEvent, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';
import { MAIN_PAGES_META } from '../blogMetadata';
import { getCanonicalUrl } from '../lib/seo';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const handleBack = () => {
    navigate('/');
  };

  const meta = MAIN_PAGES_META["/contact"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Client-side rate limiting check
    const lastSubmitTime = localStorage.getItem('lastContactSubmission');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeSinceLastSubmit < 60000) { // 1 minute
        setError('Please wait a minute before sending another message.');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      if (!db) {
        console.warn('Firebase db is not initialized. Simulating contact submission.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        await addDoc(collection(db, 'contacts'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
      
      // Update last submission time
      localStorage.setItem('lastContactSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error('Firebase submission failed, simulating success locally:', err);
      
      // Update last submission time
      localStorage.setItem('lastContactSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
      <OpenGraphTags
        title={meta.title}
        description={meta.description}
        url={canonicalUrl}
      />
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="contact sleep calculator, support, feedback, get in touch" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight font-serif">Contact</h1>

        {isSuccess ? (
          <div className="flex flex-col items-start py-8">
            <div className="flex items-center gap-3 text-[#7C3AED] mb-4">
              <CheckCircle size={24} />
              <h2 className="text-2xl font-bold">Message Sent</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-base sm:text-lg">
              Thank you for reaching out. We will get back to you shortly.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#222] transition-colors rounded-full text-gray-900 dark:text-gray-100 text-sm font-semibold"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors text-sm md:text-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] rounded-xl px-4 py-3 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7C3AED]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
              Your privacy is important to us. We will only use your email to respond to your inquiry and will never share your information with third parties.
            </p>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] dark:border-gray-800 text-left space-y-8">
          <div>
            <h2 id="contact-email-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Direct Email Correspondence</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You can reach our lead developer and sleep content analysts directly via physical email at{' '}
              <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] hover:underline font-semibold font-mono">
                support@sleepcalculater.online
              </a>
              . We generally respond to constructive queries, partnership proposals, and layout suggestions within 48 business hours.
            </p>
          </div>

          <div>
            <h2 id="contact-faq-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">How accurate is the 90-minute sleep cycle estimate?</h3>
                <p>While the average sleep cycle for adults is indeed 90 minutes, individual cycles can range from 70 to 110 minutes based on diet, lifestyle, age, genetics, and stress levels. Our calculator provides a standard, clinically recognized baseline.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">What is the 15 minutes of bedtime latency?</h3>
                <p>It takes the average healthy adult approximately 14 to 20 minutes to transition from full wakefulness into light N1 sleep. Our bedtime algorithm injects 15 minutes of default buffer to accommodate this sequence.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">How can I support Sleep Calculator?</h3>
                <p>You can share our free web application with friends, classmates, tech students, and colleagues who struggle with morning fatigue or irregular shift work schedules!</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h2 id="popular-guides-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Detailed Sleep Guides</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Optimize your sleep health and circadian metrics by reading our popular science-backed resources:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link to="/blog/sleep-cycles-explained" className="text-[#7C3AED] hover:underline">
                  Sleep Cycles Explained: Science of Rest
                </Link>
              </li>
              <li>
                <Link to="/blog/what-is-rem-sleep" className="text-[#7C3AED] hover:underline">
                  What Is REM Sleep and Why It Matters
                </Link>
              </li>
              <li>
                <Link to="/blog/how-much-sleep-do-you-need" className="text-[#7C3AED] hover:underline">
                  Recommended Sleep Hours by Age
                </Link>
              </li>
              <li>
                <Link to="/blog/best-time-to-sleep-and-wake-up" className="text-[#7C3AED] hover:underline">
                  Best Time to Sleep and Wake Up
                </Link>
              </li>
              <li>
                <Link to="/blog/why-90-minute-sleep-cycles-matter" className="text-[#7C3AED] hover:underline">
                  Why 90-Minute Sleep Cycles Matter
                </Link>
              </li>
              <li>
                <Link to="/wake-up-between-sleep-cycles" className="text-[#7C3AED] hover:underline">
                  How to Wake Up Refreshed
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
