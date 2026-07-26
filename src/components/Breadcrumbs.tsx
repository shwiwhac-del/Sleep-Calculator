import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { MAIN_PAGES_META, BLOG_POSTS_META } from '../blogMetadata';

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Do not render breadcrumbs on Home Page
  if (pathname === '/') {
    return null;
  }

  // Normalize path
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  // Structural definition for categories and pages
  let items: Array<{ name: string; url?: string }> = [
    { name: 'Home', url: '/' }
  ];

  let pageTitle = '';

  if (MAIN_PAGES_META[normalizedPath]) {
    const meta = MAIN_PAGES_META[normalizedPath];
    // Dynamic human-readable names for core pages
    if (normalizedPath === '/about') pageTitle = 'About';
    else if (normalizedPath === '/contact') pageTitle = 'Contact';
    else if (normalizedPath === '/privacy') pageTitle = 'Privacy Policy';
    else if (normalizedPath === '/terms') pageTitle = 'Terms & Conditions';
    else if (normalizedPath === '/blog') pageTitle = 'Sleep Education';
    else if (normalizedPath === '/student-sleep-calculator') pageTitle = 'Student Sleep Calculator';
    else if (normalizedPath === '/shift-work-sleep-calculator') pageTitle = 'Night Shift Sleep Calculator';
    else if (normalizedPath === '/sleep-cycle-calculator-90-minutes') pageTitle = '90-Minute Sleep Calculator';
    else if (normalizedPath === '/wake-up-between-sleep-cycles') pageTitle = 'Wake Up Between Cycles Calculator';
    else if (normalizedPath === '/ideal-bedtime-based-on-wake-up-time') pageTitle = 'Ideal Bedtime Calculator';
    else pageTitle = meta.title.split('–')[0].trim();

    items.push({ name: pageTitle });
  } else {
    // Check if it's a dynamic blog post path
    let slug = '';
    if (normalizedPath.startsWith('/blog/')) {
      slug = normalizedPath.substring(6).toLowerCase();
    } else {
      slug = normalizedPath.substring(1).toLowerCase();
    }
    const blogMeta = BLOG_POSTS_META[slug];

    if (blogMeta) {
      // Create a nice categorized trail mapping to Sleep Education
      items.push({ name: 'Sleep Education', url: '/blog' });
      
      // Limit title to make breadcrumbs readable on smaller devices
      const titleLabel = blogMeta.title.length > 40 
        ? blogMeta.title.substring(0, 40) + '...' 
        : blogMeta.title;
      
      items.push({ name: titleLabel });
      pageTitle = blogMeta.title;
    } else {
      // Fallback for 404 or other dynamic conditions
      items.push({ name: 'Page Not Found' });
      pageTitle = 'Page Not Found';
    }
  }

  return (
    <nav 
      id="side-breadcrumbs" 
      aria-label="Breadcrumb" 
      className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-[#6B7280] dark:text-gray-400 py-3 px-1 mb-4 select-none"
    >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={14} className="text-gray-400 shrink-0" />
              )}
              
              {isLast ? (
                <span className="text-[#374151] dark:text-gray-200 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url || '/'}
                  className="inline-flex items-center gap-1 hover:text-[#7C3AED] dark:hover:text-violet-400 transition-colors focus-visible:outline-none"
                >
                  {index === 0 && <HomeIcon size={13} className="-mt-0.5" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
  );
}
