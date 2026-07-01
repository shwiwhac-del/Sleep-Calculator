import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MAIN_PAGES_META, BLOG_POSTS_META, getFocusKeywordsForPost } from '../blogMetadata';
import { getCanonicalUrl } from '../lib/seo';

interface OpenGraphTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function OpenGraphTags({
  title,
  description,
  keywords,
  url,
  image,
  type
}: OpenGraphTagsProps) {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Normalize pathname to prevent casing inconsistencies and trailing slash bugs
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  // 1. Determine safe fallback values based on the active route/pathname
  let routeTitle = '';
  let routeDescription = '';
  let routeKeywords = '';
  let routeUrl = getCanonicalUrl(pathname);
  let routeType: 'website' | 'article' = 'website';
  let routeImage = 'https://sleepcalculater.online/og_banner.png';

  if (MAIN_PAGES_META[normalizedPath]) {
    const meta = MAIN_PAGES_META[normalizedPath];
    routeTitle = meta.title;
    routeDescription = meta.description;
    routeKeywords = meta.keywords || '';
    routeUrl = meta.canonicalUrl || routeUrl;
  } else {
    // Check if it's a dynamic blog post path (e.g. "/blog/sleep-cycles-explained")
    let slug = '';
    if (normalizedPath.startsWith('/blog/')) {
      slug = normalizedPath.substring(6).toLowerCase();
    } else {
      slug = normalizedPath.substring(1).toLowerCase();
    }
    if (BLOG_POSTS_META[slug]) {
      const meta = BLOG_POSTS_META[slug];
      routeTitle = meta.title;
      routeDescription = meta.description;
      routeKeywords = meta.keywords || getFocusKeywordsForPost(slug, meta.title, meta.category);
      routeType = 'article';
    } else {
      // General fallbacks for 404 or other dynamic conditions
      const meta = MAIN_PAGES_META['/not-found'] || MAIN_PAGES_META['/404'] || MAIN_PAGES_META['/'];
      routeTitle = meta?.title || "Page Not Found – Sleep Calculator";
      routeDescription = meta?.description || "The requested resource could not be found. Calculate your optimal bedtime and wake-up times using natural sleep cycles.";
    }
  }

  // 2. Prioritize explicitly passed props, fall back to detected route metadata
  const finalTitle = title || routeTitle;
  const finalDescription = description || routeDescription;
  const finalKeywords = keywords || routeKeywords;
  const finalUrl = url || routeUrl;
  const finalType = type || routeType;
  const finalImage = image || routeImage;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={finalUrl} />

      {/* Dynamic Open Graph / Facebook Meta Tags */}
      <meta property="og:site_name" content="Sleep Calculator" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={finalType} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      {/* Dynamic Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}
