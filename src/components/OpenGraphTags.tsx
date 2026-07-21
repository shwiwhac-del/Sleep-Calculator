import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MAIN_PAGES_META, BLOG_POSTS_META, getFocusKeywordsForPost } from '../blogMetadata';
import { getCanonicalUrl } from '../lib/seo';
import { useLanguage } from '../hooks/useLanguage';
import { TRANSLATIONS } from '../locales';
import { BLOG_TRANSLATIONS } from '../locales/blogTranslations';

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

const LOCALIZED_HOME_FAQS: Record<string, FAQItem[]> = {
  en: [
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
  ],
  es: [
    {
      q: "¿A qué hora debo acostarme si me despierto a las 6 AM?",
      a: "Acuéstese a las 10:15 PM para 5 ciclos completos (7.5 horas). Otras opciones: 8:45 PM para 6 ciclos o 11:45 PM para 4 ciclos. Todos los tiempos incluyen 15 minutos para quedarse dormido."
    },
    {
      q: "¿Es mejor dormir 7.5 horas que 8 horas?",
      a: "Para la mayoría de los adultos, sí. 7.5 horas equivalen exactamente a 5 ciclos completos de 90 minutos, por lo que se despierta durante el sueño ligero. 8 horas equivalen a 5.33 ciclos, lo que hace que su alarma suene en medio del sueño profundo."
    },
    {
      q: "¿A qué hora debe acostarse un joven de 13 años?",
      a: "Si se despierta a las 7:00 AM, la hora de acostarse debe ser entre las 9:00 PM (10 horas) y las 10:00 PM (9 horas) en noches escolares."
    },
    {
      q: "¿Cuántas horas de sueño es de 11 PM a 7 AM?",
      a: "8 horas en cama. Menos 15 minutos para quedarse dormido es igual a 7 horas y 45 minutos de sueño real, cubriendo 5 ciclos completos de sueño."
    },
    {
      q: "¿Qué es la inercia del sueño?",
      a: "El aturdimiento y el pensamiento lento inmediatamente después de despertarse, causado por despertarse durante el sueño profundo (N3). Un calculador de sueño lo elimina al programar su despertar al final de un ciclo completo."
    },
    {
      q: "¿Por qué me despierto cansado después de dormir 8 horas?",
      a: "8 horas equivalen a 5.33 ciclos: su alarma suena a mitad del ciclo. Pruebe con 7.5 horas. Si el problema persiste, las causas incluyen apnea del sueño, habitación cálida, alcohol antes de acostarse o deuda de sueño."
    }
  ],
  pt: [
    {
      q: "A que horas devo ir para a cama se acordar às 6h?",
      a: "Vá para a cama às 22h15 para obter 5 ciclos completos (7,5 horas). Outras opções: 20h45 para 6 ciclos ou 23h45 para 4 ciclos. Todos os horários incluem 15 minutos para adormecer."
    },
    {
      q: "Dormir 7,5 horas é melhor do que 8 horas?",
      a: "Para a maioria dos adultos, sim. 7,5 horas correspondem a exatamente 5 ciclos completos de 90 minutos, acordando no sono leve. 8 horas equivalem a 5,33 ciclos, fazendo com que o alarme toque no meio do sono supremo."
    },
    {
      q: "A que horas deve ir para a cama um jovem de 13 anos?",
      a: "Se acordar às 7h, o horário de dormir deve ser entre 21h (10 horas) e 22h (9 horas) em dias de aula."
    },
    {
      q: "Quantas horas de sono são das 23h às 7h?",
      a: "8 horas na cama. Menos 15 minutos para adormecer é igual a 7 horas e 45 minutos de sono real, abrangendo 5 ciclos de sono completos."
    },
    {
      q: "O que é inércia do sono?",
      a: "A sensação de tontura e lentidão mental logo após acordar, provocada por despertar durante o sono profundo (N3). Uma calculadora de sono elimina esse efeito ao ajustar o alarme para o final de um ciclo completo."
    },
    {
      q: "Por que acordo cansado mesmo dormindo 8 horas?",
      a: "8 horas equivalem a 5,33 ciclos: seu alarme toca no meio de um ciclo. Experimente dormir 7,5 horas. Se persistir, causas incluem apneia do sono, quarto quente, álcool ou débito de sono acumulado."
    }
  ],
  fr: [
    {
      q: "À quelle heure dois-je me coucher si je me réveille à 6 heures du matin ?",
      a: "Couchez-vous à 22h15 pour 5 cycles complets (7,5 heures). Autres options : 20h45 pour 6 cycles ou 23h45 pour 4 cycles. Tous les horaires incluent 15 minutes pour s'endormir."
    },
    {
      q: "Dormir 7,5 heures est-il meilleur que 8 heures ?",
      a: "Pour la plupart des adultes, oui. 7,5 heures correspondent exactement à 5 cycles complets de 90 minutes, vous vous réveillez donc en sommeil léger. 8 heures équivalent à 5,33 cycles, ce qui déclenche l'alarme en plein sommeil profond."
    },
    {
      q: "À quelle heure un adolescent de 13 ans doit-il se coucher ?",
      a: "Pour un réveil à 7h00, l'heure du coucher doit se situer entre 21h00 (10 heures de sommeil) et 22h00 (9 heures) les soirs d'école."
    },
    {
      q: "Combien d'heures de sommeil représentent la période de 23h à 7h ?",
      a: "8 heures au lit. Moins 15 minutes pour s'endormir égalent 7 heures et 45 minutes de sommeil réel, couvrant 5 cycles complets."
    },
    {
      q: "Qu'est-ce que l'inertie du sommeil ?",
      a: "La somnolence et le ralentissement de la pensée immédiatement après le réveil, provoqués par un réveil pendant le sommeil profond (N3). Un calculateur de sommeil l'élimine en planifiant le réveil à la fin d'un cycle complet."
    },
    {
      q: "Pourquoi suis-je fatigué après avoir dormi 8 heures ?",
      a: "8 heures correspondent à 5,33 cycles, votre alarme sonne au milieu d'un cycle. Essayez 7,5 heures. Si le problème persiste, recherchez l'apnée du sommeil, une chambre trop chaude, l'alcool ou une dette de sommeil."
    }
  ],
  de: [
    {
      q: "Wann sollte ich ins Bett gehen, wenn ich um 6 Uhr morgens aufwache?",
      a: "Gehen Sie um 22:15 Uhr ins Bett, um 5 vollständige Zyklen zu schlafen (7,5 Stunden). Weitere Optionen: 20:45 Uhr für 6 Zyklen oder 23:45 Uhr für 4 Zyklen. Alle Zeiten beinhalten 15 Minuten Einschlafzeit."
    },
    {
      q: "Sind 7,5 Stunden Schlaf besser als 8 Stunden?",
      a: "Für die meisten Erwachsenen ja. 7,5 Stunden entsprechen genau 5 vollständigen 90-minütigen Schlafzyklen, sodass Sie im Leichtschlaf aufwachen. 8 Stunden entsprechen 5,33 Zyklen – Ihr Wecker klingelt also mitten im Tiefschlaf."
    },
    {
      q: "Wann sollte ein 13-Jähriger ins Bett gehen?",
      a: "Bei einem Aufwachen um 7:00 Uhr sollte die Schlafenszeit an Schultagen zwischen 21:00 Uhr (10 Stunden) und 22:00 Uhr (9 Stunden) liegen."
    },
    {
      q: "Wie viele Stunden Schlaf sind es von 23:00 bis 07:00 Uhr?",
      a: "8 Stunden im Bett. Abzüglich 15 Minuten zum Einschlafen entspricht dies 7 Stunden und 45 Minuten echtem Schlaf – was 5 vollständige Schlafzyklen abdeckt."
    },
    {
      q: "Was ist Schlafträgheit?",
      a: "Die Benommenheit und das verlangsamte Denken direkt nach dem Aufwachen – verursacht durch das Aufwachen aus dem Tiefschlaf (N3). Ein Schlafrechner eliminiert dies, indem er das Aufwachen auf das Ende eines vollständigen Zyklus abstimmt."
    },
    {
      q: "Warum wache ich nach 8 Stunden Schlaf müde auf?",
      a: "8 Stunden entsprechen 5,33 Zyklen – Ihr Wecker klingelt mitten im Zyklus. Versuchen Sie es mit 7,5 Stunden. Wenn das Problem weiterhin besteht, können die Ursachen Schlafapnoe, ein warmes Schlafzimmer, Alkohol vor dem Schlafgehen oder Schlafmangel sein."
    }
  ],
  it: [
    {
      q: "A che ora devo andare a letto se mi sveglio alle 6:00?",
      a: "Vai a letto alle 22:15 per fare 5 cicli completi (7,5 ore). Altre opzioni: 20:45 per 6 cicli o 23:45 per 4 cicli. Tutti i tempi includono 15 minuti per addormentarsi."
    },
    {
      q: "Dormire 7,5 ore è meglio di 8 ore?",
      a: "Per la maggior parte degli adulti, sì. 7,5 ore equivalgono a esattamente 5 cicli completi di 90 minuti, svegliandosi nel sonno leggero. 8 ore equivalgono a 5,33 cicli, attivando la sveglia a metà del sonno profondo."
    },
    {
      q: "A che ora dovrebbe andare a letto un ragazzo di 13 anni?",
      a: "Se si sveglia alle 7:00, l'ora di andare a dormire dovrebbe essere tra le 21:00 (10 ore) e le 22:00 (9 ore) nei giorni di scuola."
    },
    {
      q: "Quante ore di sonno sono dalle 23:00 alle 7:00?",
      a: "8 ore a letto. Meno 15 minuti per addormentarsi equivalgono a 7 ore e 45 minuti di sonno effettivo – coprendo 5 cicli completi."
    },
    {
      q: "Cos'è l'inerzia del sonno?",
      a: "Il rintontimento e il rallentamento cognitivo subito dopo il risveglio – causati dal risveglio durante il sonno profondo (N3). Un calcolatore del sonno lo elimina sintonizzando la sveglia alla fine di un ciclo completo."
    },
    {
      q: "Perché mi sveglio stanco dopo aver dormito 8 ore?",
      a: "8 ore equivalgono a 5,33 cicli – la sveglia suona a metà ciclo. Prova con 7,5 ore. Se persiste, le cause includono apnea notturna, camera calda, alcol prima di dormire o debito di sonno accumulato."
    }
  ]
};

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
  const { currentLang, t } = useLanguage();
  const pathname = location.pathname;
  
  // Strip trailing slashes safely
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  // Helper to remove language prefixes from path to match keys in MAIN_PAGES_META or translations
  const getBasePath = (path: string) => {
    const parts = path.split('/');
    if (parts.length > 1 && ['es', 'pt', 'fr', 'de', 'it', 'nl', 'tr', 'id', 'vi', 'pl'].includes(parts[1])) {
      const remaining = '/' + parts.slice(2).join('/');
      return remaining === '//' ? '/' : remaining;
    }
    return path;
  };

  const basePath = getBasePath(normalizedPath) === '' ? '/' : getBasePath(normalizedPath);

  // Helper to format language-specific canonical or hreflang links
  const getLangUrl = (langCode: string, path: string) => {
    const cleanPath = path === '/' ? '' : path;
    if (langCode === 'en') {
      return `https://sleepcalculater.online${cleanPath}`;
    }
    return `https://sleepcalculater.online/${langCode}${cleanPath}`;
  };

  // 1. Determine safe fallback values based on path & language
  let routeTitle = '';
  let routeDescription = '';
  let routeKeywords = '';
  let routeUrl = getLangUrl(currentLang, basePath);
  let routeType: 'website' | 'article' = 'website';
  const routeImage = 'https://sleepcalculater.online/og_banner.png';

  let isBlogRoute = false;
  let blogSlug = '';
  if (basePath.startsWith('/blog/')) {
    isBlogRoute = true;
    blogSlug = basePath.substring(6).toLowerCase();
  }

  // Access translation catalogs directly to preserve indexing correctness
  const currentTranslations = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const localizedSeo = currentTranslations?.seo?.[basePath];

  if (localizedSeo) {
    routeTitle = localizedSeo.title;
    routeDescription = localizedSeo.description;
    routeKeywords = localizedSeo.keywords || '';
  } else if (isBlogRoute) {
    const localizedPost = BLOG_TRANSLATIONS[currentLang]?.[blogSlug];
    const englishPost = BLOG_POSTS_META[blogSlug];

    if (localizedPost) {
      routeTitle = localizedPost.title;
      routeDescription = localizedPost.description;
      routeKeywords = englishPost?.keywords || getFocusKeywordsForPost(blogSlug, localizedPost.title, localizedPost.category);
      routeType = 'article';
    } else if (englishPost) {
      routeTitle = englishPost.title;
      routeDescription = englishPost.description;
      routeKeywords = englishPost.keywords || getFocusKeywordsForPost(blogSlug, englishPost.title, englishPost.category);
      routeType = 'article';
    } else {
      const meta = currentTranslations?.seo?.['/'] || TRANSLATIONS['en']?.seo?.['/'];
      routeTitle = meta?.title || "Sleep Calculator";
      routeDescription = meta?.description || "Scientific bedtime calculation tools.";
    }
  } else {
    // Ultimate fallbacks
    const meta = currentTranslations?.seo?.['/'] || TRANSLATIONS['en']?.seo?.['/'];
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
    "@id": `https://sleepcalculater.online/${currentLang !== 'en' ? currentLang : ''}#website`,
    "url": getLangUrl(currentLang, '/'),
    "name": "Sleep Calculator",
    "description": finalDescription,
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
    "@id": `https://sleepcalculater.online/${currentLang !== 'en' ? currentLang : ''}#softwareapplication`,
    "name": "Sleep Calculator",
    "url": getLangUrl(currentLang, '/'),
    "description": "Calculate optimal sleep windows based on 90-minute biological circadian blocks.",
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
      "name": t('nav.home') || "Home",
      "item": getLangUrl(currentLang, '/')
    }
  ];

  if (basePath !== '/') {
    if (basePath.startsWith('/blog/')) {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": t('nav.blog') || "Blog",
        "item": getLangUrl(currentLang, '/blog')
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": finalTitle,
        "item": getLangUrl(currentLang, basePath)
      });
    } else {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": finalTitle.split('|')[0].trim(),
        "item": getLangUrl(currentLang, basePath)
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
  if (isBlogRoute) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${getLangUrl(currentLang, basePath)}#article`,
      "mainEntityOfPage": getLangUrl(currentLang, basePath),
      "headline": finalTitle,
      "description": finalDescription,
      "image": "https://sleepcalculater.online/og_banner.png",
      "datePublished": "2026-06-02",
      "dateModified": "2026-06-02",
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
      "inLanguage": currentLang
    };
    schemas.push(articleSchema);
  }

  // F. FAQPage Schema (For Home Page or Blog Posts if FAQs are present or passed)
  if (basePath === '/') {
    const faqList = LOCALIZED_HOME_FAQS[currentLang] || LOCALIZED_HOME_FAQS['en'];
    const homeFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map(faq => ({
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
        schemas.push(schema);
      }
    });
  }

  const supportedLanguagesList = ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'tr', 'id', 'vi', 'pl'];

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={finalUrl} />

      {/* Multilingual Hreflang Tags for International SEO */}
      <link rel="alternate" hrefLang="x-default" href={getLangUrl('en', basePath)} />
      {supportedLanguagesList.map(lang => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={getLangUrl(lang, basePath)} 
        />
      ))}

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
