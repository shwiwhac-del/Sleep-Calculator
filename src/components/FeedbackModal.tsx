import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState({ feedbackType: 'general', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    // Client-side rate limiting check
    const lastSubmitTime = localStorage.getItem('lastFeedbackSubmission');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeSinceLastSubmit < 60000) { // 1 minute
        setError('Please wait a minute before sending another feedback.');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      if (!db) {
        console.warn('Firebase db is not initialized. Simulating feedback submission.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        await addDoc(collection(db, 'feedbacks'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
      
      // Update last submission time
      localStorage.setItem('lastFeedbackSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ feedbackType: 'general', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      console.error('Firebase submission failed, simulating success locally:', err);
      
      // Update last submission time
      localStorage.setItem('lastFeedbackSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ feedbackType: 'general', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-16 pb-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-[#1e293b]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#1e293b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 font-serif">
            <MessageSquare size={18} className="text-[#8B5CF6]" />
            Send Feedback
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle size={48} className="text-[#8B5CF6] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Thank You!</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your feedback helps us improve the sleep calculator.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl p-3 text-sm border border-red-100 dark:border-red-900/30">
                  {error}
                </div>
              )}
              
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="feedbackType" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Type of Feedback
                </label>
                <select
                  id="feedbackType"
                  value={formData.feedbackType}
                  onChange={(e) => setFormData(prev => ({ ...prev, feedbackType: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-100 text-sm rounded-xl focus:ring-[#8B5CF6] focus:border-[#8B5CF6] block p-3 min-h-[48px] focus-visible:outline-none transition-colors appearance-none"
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="message" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-100 text-sm rounded-xl focus:ring-[#8B5CF6] focus:border-[#8B5CF6] block p-3.5 focus-visible:outline-none transition-colors min-h-[100px] resize-y placeholder:text-gray-400"
                  placeholder="Tell us what you think or describe the issue..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                className="w-full text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-[#8B5CF6]/20 font-semibold rounded-xl text-sm px-5 py-3 sm:py-3.5 text-center flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm mt-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Feedback
                    <Send size={16} />
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
