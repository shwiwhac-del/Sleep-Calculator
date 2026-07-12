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
  faqs?: { q: string; a: string }[];
  extraSchemas?: any[];
}

export function OpenGraphTags({
  title,
  description,
  keywords,
  url,
  image,
  type,
  faqs,
  extraSchemas
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

  // 3. Dynamic JSON-LD Structured Data for SEO, AEO, and GEO engine crawling
  const schemas: any[] = [];

  // A. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sleepcalculater.online/#organization",
    "name": "Sleep Calculator",
    "url": "https://sleepcalculater.online/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sleepcalculater.online/og_banner.png",
      "width": "1200",
      "height": "630"
    },
    "sameAs": [
      "https://www.facebook.com/sleepcalculator",
      "https://twitter.com/sleepcalc"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@sleepcalculater.online",
      "contactType": "customer support"
    }
  };
  schemas.push(organizationSchema);

  // B. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sleepcalculater.online/#website",
    "url": "https://sleepcalculater.online/",
    "name": "Sleep Calculator",
    "description": "Scientific sleep calculator, bedtime planner, and 90-minute circadian cycle calculator.",
    "alternateName": [
      "Sleep Calculator",
      "Sleep Cycle Calculator",
      "Bedtime Calculator",
      "REM Sleep Calculator"
    ],
    "publisher": {
      "@id": "https://sleepcalculater.online/#organization"
    }
  };
  schemas.push(websiteSchema);

  // C. SoftwareApplication Schema
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://sleepcalculater.online/#softwareapplication",
    "name": "Sleep Calculator",
    "url": "https://sleepcalculater.online/",
    "description": "Calculate the exact time you need to go to bed or wake up using 90-minute REM sleep intervals to prevent morning grogginess.",
    "applicationCategory": "HealthAndFitnessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  schemas.push(softwareApplicationSchema);

  // D. BreadcrumbList Schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://sleepcalculater.online/"
    }
  ];

  if (normalizedPath !== '/' && normalizedPath !== '') {
    if (normalizedPath.startsWith('/blog/')) {
      const slug = normalizedPath.substring(6).toLowerCase();
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://sleepcalculater.online/blog"
      });
      if (BLOG_POSTS_META[slug]) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": BLOG_POSTS_META[slug].title,
          "item": `https://sleepcalculater.online/blog/${slug}`
        });
      }
    } else {
      let pageName = "Page";
      if (MAIN_PAGES_META[normalizedPath]) {
        pageName = MAIN_PAGES_META[normalizedPath].title.split('|')[0].trim();
      } else {
        const segment = normalizedPath.replace(/^\//, '').replace(/-/g, ' ');
        pageName = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": `https://sleepcalculater.online${normalizedPath}`
      });
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
  schemas.push(breadcrumbSchema);

  // E. Article Schema (Dynamic for Blog Posts)
  const isPostRoute = normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog';
  if (isPostRoute) {
    const slug = normalizedPath.substring(6).toLowerCase();
    if (BLOG_POSTS_META[slug]) {
      const post = BLOG_POSTS_META[slug];
      
      // Parse the published date elegantly
      const months: Record<string, string> = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
      };
      const parts = (post.date || 'June 02, 2026').replace(',', '').split(' ');
      let formattedDate = '2026-06-02';
      if (parts.length === 3) {
        const month = months[parts[0]] || '06';
        const day = parts[1].padStart(2, '0');
        const year = parts[2];
        formattedDate = `${year}-${month}-${day}`;
      }

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://sleepcalculater.online/blog/${slug}#article`,
        "mainEntityOfPage": `https://sleepcalculater.online/blog/${slug}`,
        "headline": post.title,
        "description": post.description,
        "image": "https://sleepcalculater.online/og_banner.png",
        "datePublished": formattedDate,
        "dateModified": formattedDate,
        "author": {
          "@type": "Person",
          "name": "Shafiq",
          "jobTitle": "Sleep Health Researcher",
          "url": "https://sleepcalculater.online/about/"
        },
        "reviewedBy": {
          "@type": "Person",
          "name": "Dr. Sarah Johnson",
          "jobTitle": "Clinical Sleep Specialist",
          "knowsAbout": ["Sleep Physiology", "Circadian Rhythm", "Sleep Medicine"],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "MBBS"
          }
        },
        "publisher": {
          "@id": "https://sleepcalculater.online/#organization"
        },
        "inLanguage": "en-US"
      };
      schemas.push(articleSchema);
    }
  }

  // F. FAQPage Schema (For Home Page or Blog Posts if FAQs are present or passed)
  if (normalizedPath === '/' || normalizedPath === '') {
    const homeFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What time should I go to bed if I wake up at 6 AM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Go to bed by 10:15 PM for 5 complete cycles (7.5 hours). Other options: 8:45 PM for 6 cycles or 11:45 PM for 4 cycles. All times include 15 minutes to fall asleep."
          }
        },
        {
          "@type": "Question",
          "name": "Is 7.5 hours of sleep better than 8 hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most adults, yes. 7.5 hours equals exactly 5 complete 90-minute cycles, so you wake during light sleep. 8 hours equals 5.33 cycles — causing your alarm to fire mid-deep-sleep."
          }
        },
        {
          "@type": "Question",
          "name": "What time should a 13-year-old go to bed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waking at 7:00 AM, bedtime should be between 9:00 PM (10 hours) and 10:00 PM (9 hours) on school nights."
          }
        },
        {
          "@type": "Question",
          "name": "How many hours of sleep is 11 PM to 7 AM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "8 hours in bed. Minus 15 minutes to fall asleep equals 7 hours 45 minutes of actual sleep — covering 5 complete sleep cycles."
          }
        },
        {
          "@type": "Question",
          "name": "What is sleep inertia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The grogginess and slowed thinking immediately after waking — caused by being woken during deep (N3) sleep. A sleep calculator eliminates it by timing your wake-up at the end of a complete cycle."
          }
        },
        {
          "@type": "Question",
          "name": "Why do I wake up tired after sleeping 8 hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "8 hours equals 5.33 cycles — your alarm fires mid-cycle. Try 7.5 hours. If the problem continues, causes include sleep apnea, warm bedroom, alcohol before bed, or sleep debt."
          }
        }
      ]
    };
    schemas.push(homeFaqSchema);
  } else if (faqs && faqs.length > 0) {
    const postFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
    schemas.push(postFaqSchema);
  }

  if (extraSchemas && extraSchemas.length > 0) {
    extraSchemas.forEach(schema => {
      if (schema) {
        schemas.push(schema);
      }
    });
  }

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

      {/* Inject Structured Data (JSON-LD) dynamically */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
