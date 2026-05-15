import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Moon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center">
      <Helmet>
        <title>404 - Page Not Found | Sleep Calculator</title>
        <meta name="description" content="The page you are looking for does not exist." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="mb-6">
        <Moon className="w-20 h-20 text-[#2563EB] mx-auto opacity-50" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        Oops! It looks like you've wandered into deep sleep. The page you are looking for cannot be found.
      </p>
      
      <Link 
        to="/" 
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        Wake Up & Go Home
      </Link>
    </div>
  );
}
