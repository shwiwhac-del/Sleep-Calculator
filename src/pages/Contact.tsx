import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      
      // Reset success message after 5 seconds
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
    <div className="w-full max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-20">
      <Helmet>
        <title>Contact Us | Sleep Calculator</title>
        <meta name="description" content="Get in touch with the Sleep Calculator team. We are here to help you sleep better." />
      </Helmet>

      <div
        className="animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <Link to="/" className="inline-flex items-center text-white/50 hover:text-[#00d2ff] mb-8 font-medium transition-colors focus-visible:outline-none focus-visible:text-[#00d2ff]">
          <ChevronLeft size={16} className="mr-1" /> Back
        </Link>
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">Contact Us</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Have a question, feedback, or suggestion? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </header>

        <div className="bg-[#1a153a]/40 border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-xl">
          {isSuccess ? (
            <div 
              className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-[#00d2ff]" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
              <p className="text-white/70 text-lg">
                Thank you for reaching out. We've received your message and will get back to you shortly.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl p-4 text-center">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80 uppercase tracking-wider block ml-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-white/40" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#130f2e]/80 border border-white/10 hover:border-white/30 focus:border-[#00d2ff] rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00d2ff] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80 uppercase tracking-wider block ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-white/40" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#130f2e]/80 border border-white/10 hover:border-white/30 focus:border-[#00d2ff] rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00d2ff] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80 uppercase tracking-wider block ml-1">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <MessageSquare size={18} className="text-white/40" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-[#130f2e]/80 border border-white/10 hover:border-white/30 focus:border-[#00d2ff] rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00d2ff] transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] rounded-full px-8 py-4 text-white font-bold text-lg shadow-[0_4px_20px_rgba(0,210,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,210,255,0.5)] border border-[#00d2ff]/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
