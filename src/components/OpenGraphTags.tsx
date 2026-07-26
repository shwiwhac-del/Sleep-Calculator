import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS_META, getFocusKeywordsForPost } from '../blogMetadata';

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

interface FAQItem {
  q: string;
  a: string;
}

const SITE_SEO: Record<string, { title: string; description: string; keywords?: string }> = {
  "/": {
    title: "Sleep Calculator | Sleep Cycle, Bedtime & Wake-Up Calculator",
    description: "Calculate your ideal bedtime and wake-up times using natural 90-minute sleep cycles. Banish morning grogginess and wake up completely refreshed.",
    keywords: "sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, 90 minute sleep cycles, REM sleep calculator, bedtime planner, how to wake up refreshed"
  },
  "/blog": {
    title: "Sleep Education | Sleep Calculator",
    description: "Explore research-backed sleep science guides, sleep hygiene tips, and expert articles on 90-minute sleep cycles, REM sleep, and circadian health.",
    keywords: "sleep science blog, sleep calculator guides, sleep hygiene articles, 90-minute sleep cycle optimization, REM sleep science, circadian rhythm guides, sleep quality research, bedtime calculation tips"
  },
  "/about": {
    title: "About Us | Sleep Calculator",
    description: "Learn about the Sleep Calculator team, our core mission, and the biological research backing our 90-minute sleep cycle and bedtime algorithms.",
    keywords: "about sleep calculator, sleep cycle research, bedtime algorithm, circadian biology experts, sleep science team"
  },
  "/contact": {
    title: "Contact Us | Sleep Calculator",
    description: "Get in touch with the Sleep Calculator team for questions, suggestions, partnership opportunities, or support with our interactive sleep cycle tools.",
    keywords: "contact sleep calculator, sleep tool support, sleep calculator feedback, developer partnerships"
  },
  "/privacy": {
    title: "Privacy Policy | Sleep Calculator",
    description: "Read the Privacy Policy for Sleep Calculator. Learn how we safeguard user privacy, data, and analytics transparently.",
    keywords: "privacy policy, sleep calculator privacy, user data protection, privacy terms"
  },
  "/terms": {
    title: "Terms of Service | Sleep Calculator",
    description: "Read the Terms of Service for Sleep Calculator. Understand our usage terms, legal disclaimers, and health information guidelines.",
    keywords: "terms and conditions, terms of service, health disclaimer, medical advice disclaimer"
  },
  "/student-sleep-calculator": {
    title: "Student Sleep Calculator | Exam & Academic Bedtime Planner",
    description: "Optimize memory retention, focus, and exam performance. Calculate ideal student bedtimes based on 90-minute sleep cycles and study schedules.",
    keywords: "student sleep calculator, sleep calculator for students, exam sleep planner, bedtime calculator for teens, student sleep schedule, study sleep cycle"
  },
  "/shift-work-sleep-calculator": {
    title: "Shift Work Sleep Calculator | Daytime Sleep Routine Planner",
    description: "Designed for healthcare workers and night shift staff. Calculate custom daytime sleep blocks, anchor sleep routines, and circadian alignment.",
    keywords: "shift work sleep calculator, night shift sleep schedule, daytime sleep cycle, split sleep strategy, shift worker bedtime planner, anchor sleep"
  },
  "/sleep-cycle-calculator-90-minutes": {
    title: "90 Minute Sleep Calculator | Exact Sleep Cycle Bedtime Planner",
    description: "Calculate optimal bedtimes and wake-up times based on 90-minute sleep cycles. Customize time to fall asleep for completely personalized sleep windows.",
    keywords: "90 minute sleep calculator, 90 min sleep cycle, sleep cycle length calculator, bedtime latency calculator, calculate sleep cycles"
  },
  "/wake-up-between-sleep-cycles": {
    title: "Wake Up Between Sleep Cycles Calculator | Banish Grogginess",
    description: "Find your exact wake-up time to eliminate morning grogginess. Align your alarm with natural 90-minute sleep cycle transitions to wake up refreshed.",
    keywords: "wake up between sleep cycles, what time should i wake up, wake up calculator, stop waking up tired, sleep cycle alarm calculator, sleep inertia"
  },
  "/ideal-bedtime-based-on-wake-up-time": {
    title: "Ideal Bedtime Calculator by Wake Up Time & Age Group",
    description: "Determine what time you should go to sleep based on your wake-up time. Get age-tailored sleep cycle schedules for infants, teens, adults, and seniors.",
    keywords: "ideal bedtime based on wake up time, sleep calculator by age, what time should i go to sleep, bedtime calculator, sleep cycle age brackets"
  },
  "/sleep-calculator-by-age": {
    title: "Sleep Calculator by Age | Sleep Calculator",
    description: "Calculate ideal sleep cycle schedules tailored by age group. Determine optimal bedtime and wake-up times for infants, kids, teens, adults, and seniors.",
    keywords: "sleep calculator by age, bedtime calculator by age, sleep cycle by age, how much sleep do you need by age"
  },
  "/sleep-calculator-cycle": {
    title: "Sleep Calculator Cycle | Sleep Calculator",
    description: "Calculate your sleep cycles scientifically using 90-minute REM and NREM intervals. Banish morning fatigue by waking up between complete sleep cycles.",
    keywords: "sleep calculator cycle, sleep cycle calculator, 90 minute sleep cycle, bedtime sleep cycle calculator"
  },
  "/sleep-calculator-how-much-sleep-did-i-get": {
    title: "Sleep Calculator How Much Sleep Did I Get | Sleep Calculator",
    description: "Calculate exactly how much sleep you got last night based on your bedtime and wake-up time. Track your completed 90-minute sleep cycles.",
    keywords: "sleep calculator how much sleep did i get, how many hours of sleep did i get, sleep duration calculator, calculate hours slept"
  },
  "/sleep-calculator-women": {
    title: "Sleep Calculator Women | Sleep Calculator",
    description: "Sleep cycle calculator for women. Optimize sleep quality, bedtime routines, and wake times accounting for female circadian rhythm and sleep needs.",
    keywords: "sleep calculator women, sleep cycle calculator for women, womens sleep calculator, female sleep cycle bedtime"
  },
  "/sleep-calculator-for-kids": {
    title: "Sleep Calculator for Kids | Sleep Calculator",
    description: "Calculate the ideal bedtime and wake-up schedule for children and toddlers based on natural sleep cycles and age-appropriate sleep recommendations.",
    keywords: "sleep calculator for kids, childrens sleep calculator, kids bedtime calculator, toddler sleep cycle calculator"
  },
  "/sleep-calculator-app": {
    title: "Sleep Calculator App | Sleep Calculator",
    description: "Free web-based sleep calculator app. Calculate complete 90-minute sleep cycles, set alarms, and plan bedtimes instantly on any device.",
    keywords: "sleep calculator app, sleep cycle app, bedtime calculator app, best sleep calculator online app"
  }
};

const HOME_FAQS: FAQItem[] = [
  {
    q: "What time should I go to bed if I wake up at 6 AM?",
    a: "Go to bed by 10:15 PM for 5 complete cycles (7.5 hours). Other options: 8:45 PM for 6 cycles or 11:45 PM for 4 cycles. All times include 15 minutes to fall asleep."
  },
  {
    q: "Is 7.5 hours of sleep better than 8 hours?",
    a: "For most adults, yes. 7.5 hours equals exactly 5 complete 90-minute cycles, so you wake during light sleep. 8 hours equals 5.33 cycles — causing your alarm to fire mid-deep-sleep."
  },
  {
    q: "What time should a 13-year-old go to bed?",
    a: "Waking at 7:00 AM, bedtime should be between 9:00 PM (10 hours) and 10:00 PM (9 hours) on school nights."
  },
  {
    q: "How many hours of sleep is 11 PM to 7 AM?",
    a: "8 hours in bed. Minus 15 minutes to fall asleep equals 7 hours 45 minutes of actual sleep — covering 5 complete sleep cycles."
  },
  {
    q: "What is sleep inertia?",
    a: "The grogginess and slowed thinking immediately after waking — caused by being woken during deep (N3) sleep. A sleep calculator eliminates it by timing your wake-up at the end of a complete cycle."
  },
  {
    q: "Why do I wake up tired after sleeping 8 hours?",
    a: "8 hours equals 5.33 cycles — your alarm fires mid-cycle. Try 7.5 hours. If the problem continues, causes include sleep apnea, warm bedroom, alcohol before bed, or sleep debt."
  }
];

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
  
  // Strip trailing slashes safely
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const basePath = normalizedPath === '' ? '/' : normalizedPath;

  // Helper to format canonical links
  const getLangUrl = (path: string) => {
    const cleanPath = path === '/' ? '' : path;
    return `https://sleepcalculater.online${cleanPath}`;
  };

  // 1. Determine safe fallback values based on path
  let routeTitle = '';
  let routeDescription = '';
  let routeKeywords = '';
  let routeUrl = getLangUrl(basePath);
  let routeType: 'website' | 'article' = 'website';
  const routeImage = 'https://sleepcalculater.online/og_banner.png';

  let isBlogRoute = false;
  let blogSlug = '';
  if (basePath.startsWith('/blog/')) {
    isBlogRoute = true;
    blogSlug = basePath.substring(6).toLowerCase();
  }

  const localizedSeo = SITE_SEO[basePath];

  if (localizedSeo) {
    routeTitle = localizedSeo.title;
    routeDescription = localizedSeo.description;
    routeKeywords = localizedSeo.keywords || '';
  } else if (isBlogRoute) {
    const englishPost = BLOG_POSTS_META[blogSlug];

    if (englishPost) {
      routeTitle = englishPost.title;
      routeDescription = englishPost.description;
      routeKeywords = englishPost.keywords || getFocusKeywordsForPost(blogSlug, englishPost.title, englishPost.category);
      routeType = 'article';
    } else {
      const meta = SITE_SEO['/'];
      routeTitle = meta?.title || "Sleep Calculator";
      routeDescription = meta?.description || "Scientific bedtime calculation tools.";
    }
  } else {
    // Ultimate fallbacks
    const meta = SITE_SEO['/'];
    routeTitle = meta?.title || "Sleep Calculator | Bedtime Planner";
    routeDescription = meta?.description || "Calculate sleep cycles scientifically.";
  }

  // 2. Prioritize explicitly passed props, fall back to detected route metadata
  const finalTitle = title || routeTitle;
  const finalDescription = description || routeDescription;
  const finalKeywords = keywords || routeKeywords;
  const finalUrl = url || routeUrl;
  const finalType = type || routeType;
  const finalImage = image || routeImage;

  // 3. Dynamic JSON-LD Structured Data for AEO Engines
  const schemas: any[] = [];

  // A. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sleepcalculater.online/#organization",
    "name": "Sleep Calculator",
    "url": "https://sleepcalculater.online/",
    "description": "Evidence-based sleep cycle calculation tools and circadian rhythm timing guides.",
    "foundingDate": "2024",
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
    "url": getLangUrl('/'),
    "name": "Sleep Calculator",
    "description": finalDescription,
    "inLanguage": "en",
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

  // C. SoftwareApplication / WebApplication Schema (Only on tool/calculator pages)
  const isToolRoute = !isBlogRoute && ['/', '/student-sleep-calculator', '/shift-work-sleep-calculator', '/sleep-cycle-calculator-90-minutes', '/wake-up-between-sleep-cycles', '/ideal-bedtime-based-on-wake-up-time', '/sleep-calculator-by-age', '/sleep-calculator-cycle', '/sleep-calculator-how-much-sleep-did-i-get', '/sleep-calculator-women', '/sleep-calculator-for-kids', '/sleep-calculator-app'].includes(basePath);

  if (isToolRoute) {
    const getToolAppName = (path: string) => {
      switch (path) {
        case '/student-sleep-calculator':
          return 'Student Sleep Calculator & Exam Bedtime Planner';
        case '/shift-work-sleep-calculator':
          return 'Shift Work Sleep Calculator & Day-Sleep Planner';
        case '/sleep-cycle-calculator-90-minutes':
          return '90-Minute Sleep Cycle Customizer';
        case '/wake-up-between-sleep-cycles':
          return 'Wake Up Between Sleep Cycles Alarm Planner';
        case '/ideal-bedtime-based-on-wake-up-time':
          return 'Ideal Bedtime Calculator by Wake-Up Hour';
        default:
          return 'Sleep Calculator & Bedtime Planner';
      }
    };

    const softwareApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${getLangUrl(basePath)}#softwareapplication`,
      "name": getToolAppName(basePath),
      "url": getLangUrl(basePath),
      "description": finalDescription,
      "applicationCategory": "HealthAndFitnessApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "90-Minute Sleep Cycle Calculation",
        "Sleep Latency Adjustment (15 minutes default)",
        "Age-Specific Sleep Duration Customization",
        "Instant Alarm Schedule Copying",
        "PDF Schedule Export"
      ]
    };
    schemas.push(softwareApplicationSchema);
  }

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${getLangUrl(basePath)}#webpage`,
    "url": getLangUrl(basePath),
    "name": finalTitle,
    "description": finalDescription,
    "inLanguage": "en",
    "isPartOf": {
      "@id": "https://sleepcalculater.online/#website"
    },
    "breadcrumb": {
      "@id": `${getLangUrl(basePath)}#breadcrumb`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://sleepcalculater.online/og_banner.png"
    }
  };
  schemas.push(webPageSchema);

  // HowTo Schema for Sleep Cycle Calculation
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Your Optimal Bedtime and Wake-Up Time",
    "description": "Follow these simple steps to align your sleep schedule with natural 90-minute REM and NREM sleep cycles.",
    "totalTime": "PT1M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Target Time",
        "text": "Select your planned wake-up time or the time you intend to go to bed on the Sleep Calculator.",
        "url": `${getLangUrl(basePath)}#calculator`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Age Group",
        "text": "Select your age bracket to tailor the total recommended sleep cycles (5 to 6 cycles for adults).",
        "url": `${getLangUrl(basePath)}#calculator`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Account for Sleep Latency",
        "text": "The calculator automatically adds 15 minutes of average time required to fall asleep.",
        "url": `${getLangUrl(basePath)}#calculator`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Select Optimal Sleep Window",
        "text": "Pick a suggested time that aligns your alarm with the end of a 90-minute cycle during light sleep to prevent grogginess.",
        "url": `${getLangUrl(basePath)}#calculator`
      }
    ]
  };
  schemas.push(howToSchema);

  // D. Dynamic Semantic BreadcrumbList Schema
  const getBreadcrumbSegmentName = (path: string, isLeaf: boolean, rawTitle?: string) => {
    if (path === '/') return 'Home';
    if (path === '/blog') return 'Sleep Education';
    if (path === '/about') return 'About Us';
    if (path === '/contact') return 'Contact Us';
    if (path === '/terms') return 'Terms & Conditions';
    if (path === '/privacy') return 'Privacy Policy';
    if (path === '/student-sleep-calculator') return 'Student Sleep Calculator';
    if (path === '/shift-work-sleep-calculator') return 'Shift Work Sleep Calculator';
    if (path === '/sleep-cycle-calculator-90-minutes') return '90-Minute Sleep Calculator';
    if (path === '/wake-up-between-sleep-cycles') return 'Wake Up Between Cycles Calculator';
    if (path === '/ideal-bedtime-based-on-wake-up-time') return 'Ideal Bedtime Calculator';

    if (isLeaf && rawTitle) {
      const cleanTitle = rawTitle.split('|')[0].split(' - Sleep Calculator')[0].trim();
      if (cleanTitle) return cleanTitle;
    }

    const lastSegment = path.split('/').filter(Boolean).pop() || '';
    return lastSegment.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const buildBreadcrumbList = (currentPath: string, currentTitle: string) => {
    const list: Array<{ "@type": string; position: number; name: string; item: string }> = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getLangUrl('/')
      }
    ];

    if (currentPath === '/') return list;

    const segments = currentPath.split('/').filter(Boolean);
    let accumulated = '';

    segments.forEach((seg, index) => {
      accumulated += `/${seg}`;
      const isLeaf = index === segments.length - 1;
      const segmentName = getBreadcrumbSegmentName(accumulated, isLeaf, currentTitle);

      list.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": getLangUrl(accumulated)
      });
    });

    return list;
  };

  const breadcrumbItems = buildBreadcrumbList(basePath, finalTitle);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${getLangUrl(basePath)}#breadcrumb`,
    "itemListElement": breadcrumbItems
  };
  schemas.push(breadcrumbSchema);

  // E. Article / BlogPosting Schema (Dynamic for Blog Posts)
  if (isBlogRoute) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${getLangUrl(basePath)}#article`,
      "mainEntityOfPage": getLangUrl(basePath),
      "headline": finalTitle,
      "description": finalDescription,
      "image": [
        "https://sleepcalculater.online/og_banner.png"
      ],
      "datePublished": "2026-06-02T08:00:00+00:00",
      "dateModified": "2026-07-22T10:00:00+00:00",
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
        "knowsAbout": ["Sleep Physiology", "Circadian Rhythm", "Sleep Medicine"]
      },
      "publisher": {
        "@id": "https://sleepcalculater.online/#organization"
      },
      "articleSection": "Sleep Science & Health",
      "wordCount": 1850,
      "inLanguage": "en"
    };
    schemas.push(articleSchema);
  }

  // F. FAQPage Schema (For Home Page or Blog Posts if FAQs are present or passed)
  if (basePath === '/') {
    const homeFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HOME_FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
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
        const schemaType = schema["@type"];
        const hasExistingType = schemas.some(s => s["@type"] === schemaType);
        if (!hasExistingType || (schemaType !== "WebApplication" && schemaType !== "SoftwareApplication" && schemaType !== "Organization" && schemaType !== "WebSite")) {
          schemas.push(schema);
        }
      }
    });
  }

  return (
    <Helmet>
      {/* Search Engine Robots Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Primary HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={finalUrl} />

      {/* Multilingual Hreflang Tags for International SEO */}
      <link rel="alternate" hrefLang="x-default" href={getLangUrl(basePath)} />
      <link rel="alternate" hrefLang="en" href={getLangUrl(basePath)} />

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

