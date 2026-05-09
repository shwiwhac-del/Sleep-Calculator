import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      if (err?.message?.includes('Missing or insufficient permissions') || err?.code === 'permission-denied') {
        handleFirestoreError(err, OperationType.CREATE, 'contacts');
      } else {
        setError('An error occurred while sending your message. Please try again later.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Contact Us | Sleep Calculator</title>
        <meta name="description" content="Get in touch with the Sleep Calculator team. We are here to help you sleep better." />
        <meta name="keywords" content="contact sleep calculator, support, feedback, get in touch" />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/contact" />}
      </Helmet>

      <div className="mb-8 text-left">
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-serif">Contact Us</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-base sm:text-lg">
          Have a question or suggestion? Fill out the form below.
        </p>

        {isSuccess ? (
          <div className="flex flex-col items-start py-8">
            <div className="flex items-center gap-3 text-[#2563EB] mb-4">
              <CheckCircle size={24} />
              <h2 className="text-2xl font-bold">Message Sent</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-base sm:text-lg">
              Thank you for reaching out. We will get back to you shortly.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1A1A1A] dark:hover:bg-[#222] transition-colors rounded-full text-gray-900 dark:text-white text-sm font-semibold"
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
                className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] shadow-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:text-gray-500 focus:outline-none transition-colors text-[16px] md:text-[18px]"
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
                className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] shadow-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:text-gray-500 focus:outline-none transition-colors text-[16px] md:text-[18px]"
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
                className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] shadow-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:text-gray-500 focus:outline-none transition-colors resize-none text-base sm:text-lg"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-xl px-4 py-3 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
