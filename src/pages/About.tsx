import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 text-left">
      <OpenGraphTags />
      
      <div className="mb-6">
        <Breadcrumbs />
        <button 
          onClick={handleBack} 
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus-visible:outline-none cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <article className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
        {/* Main Title & Intro */}
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight font-serif">
            About SleepCalculater
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            At SleepCalculater.online, our mission is simple: make healthy sleep easier to understand and easier to achieve. We combine evidence-based sleep science with simple, fast, and user-friendly tools that help you calculate your ideal bedtime, wake-up time, sleep cycles, and daily sleep schedule in seconds.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Every calculator, guide, and article is created with accuracy, clarity, and real-world usability in mind. Our goal is to turn complex sleep research into practical advice that anyone can use without confusion.
          </p>
        </section>

        {/* Editorial Team */}
        <section className="space-y-3 pt-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
            Our Editorial Team
          </h2>
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#7C3AED] dark:text-violet-400">
              Shafiq – Founder &amp; Lead Sleep Researcher
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Shafiq is a software developer and independent sleep researcher dedicated to building practical sleep tools. He studies peer-reviewed sleep research and transforms scientific findings into easy-to-use calculators and educational content designed for everyday users.
            </p>
          </div>
        </section>

        {/* Medical Review Process */}
        <section className="space-y-3 pt-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
            Medical Review Process
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Our educational content and sleep recommendations are reviewed against established clinical sleep guidelines and reputable scientific literature to help ensure accuracy and reliability. We regularly update our content as new research becomes available.
          </p>
        </section>

        {/* Scientific Sources */}
        <section className="space-y-3 pt-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
            Our Scientific Sources
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Our content is based on trusted research and established medical references, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 dark:text-gray-300">
            <li>American Academy of Sleep Medicine (AASM)</li>
            <li>National Sleep Foundation (NSF)</li>
            <li>PubMed &amp; MEDLINE</li>
            <li>Centers for Disease Control and Prevention (CDC)</li>
            <li>Matthew Walker, PhD – <em>Why We Sleep</em></li>
          </ul>
        </section>

        {/* Footer Link Callout */}
        <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
            Learn more or explore our free sleep tools at{' '}
            <Link 
              to="/" 
              className="text-[#7C3AED] dark:text-violet-400 hover:underline font-bold transition-colors"
            >
              https://sleepcalculater.online/
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
}
