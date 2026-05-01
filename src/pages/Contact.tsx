import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error(err);
      setError('An error occurred while sending your message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Helmet>
        <title>Contact Us | Sleep Calculator</title>
        <meta name="description" content="Get in touch with the Sleep Calculator team. We are here to help you sleep better." />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/contact" />}
      </Helmet>

      <div className="mb-8 text-left">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-white transition-colors focus-visible:outline-none">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-white/60 mb-8">
          Have a question or suggestion? Fill out the form below.
        </p>

        {isSuccess ? (
          <div className="flex flex-col items-start py-8">
            <div className="flex items-center gap-3 text-[#00d2ff] mb-4">
              <CheckCircle size={24} />
              <h2 className="text-xl font-bold">Message Sent</h2>
            </div>
            <p className="text-white/70 mb-6">
              Thank you for reaching out. We will get back to you shortly.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white text-sm font-medium"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-1.5 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#00d2ff] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-1.5 ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#00d2ff] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-1.5 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#00d2ff] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-xl px-4 py-3 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
