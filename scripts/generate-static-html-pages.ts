import fs from 'fs';
import path from 'path';
import { MAIN_PAGES_META, BLOG_POSTS_META } from '../src/blogMetadata';

console.log("Starting build-time static HTML file generation for all routes...");

const distPath = path.resolve('./dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`[Static Gen] Error: Base built template index.html not found at ${templatePath}. Build frontend first.`);
  process.exit(1);
}

const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

// Load the pre-rendered blog react-to-html mappings from build payload
let preRenderedBlogContent: Record<string, string> = {};
const preRenderedPath = path.resolve('./src/blog-pre-rendered.json');
if (fs.existsSync(preRenderedPath)) {
  try {
    preRenderedBlogContent = JSON.parse(fs.readFileSync(preRenderedPath, 'utf8'));
    console.log(`[Static Gen] Successfully loaded ${Object.keys(preRenderedBlogContent).length} pre-rendered blog articles.`);
  } catch (e) {
    console.error(`[Static Gen] Error loading pre-rendered blog json:`, e);
  }
} else {
  console.warn(`[Static Gen] Warning: ${preRenderedPath} not found! Static blog files might not contain full React content area fallback.`);
}

// 1. Get List of Popular articles for Fallback cross-linking
const blogKeys = Object.keys(BLOG_POSTS_META);
const internalLinksList = blogKeys
  .slice(0, 10)
  .map(key => `<li>👉 <a href="/${key}" style="color: #7C3AED; text-decoration: underline; font-weight: 500;">${BLOG_POSTS_META[key].title}</a></li>`)
  .join('\n            ');

const navMenu = `
          <nav style="margin-bottom: 2.5rem; border-bottom: 1px solid #E5E7EB; padding-bottom: 1.25rem; display: flex; flex-wrap: wrap; gap: 15px;">
            <a href="/" style="text-decoration: none; font-weight: bold; color: #7C3AED; font-family: system-ui, sans-serif;">Home/Calculator</a>
            <a href="/about" style="text-decoration: none; font-weight: bold; color: #374151; font-family: system-ui, sans-serif; transition: color 0.2s;">About us</a>
            <a href="/contact" style="text-decoration: none; font-weight: bold; color: #374151; font-family: system-ui, sans-serif; transition: color 0.2s;">Contact & Support</a>
            <a href="/privacy" style="text-decoration: none; font-weight: bold; color: #374151; font-family: system-ui, sans-serif; transition: color 0.2s;">Privacy Policy</a>
            <a href="/terms" style="text-decoration: none; font-weight: bold; color: #374151; font-family: system-ui, sans-serif; transition: color 0.2s;">Terms of Service</a>
          </nav>
`;

const footerBanner = `
          <p style="text-align: center; font-size: 0.9rem; opacity: 0.6; font-style: italic; margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid #E5E7EB; font-family: system-ui, sans-serif;">
            Loading interactive diagnostics & visual sleep aids...
          </p>
`;

function getStaticFallbackContent(reqPath: string, slug: string): string {
  // Try to use full React component server-side pre-rendered output
  if (slug && preRenderedBlogContent[slug]) {
    return preRenderedBlogContent[slug];
  }

  let bodyContent = "";

  if (reqPath === "/about") {
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; font-family: 'Playfair Display', Georgia, serif;">About Sleep Calculator – Sleep Cycle & Bedtime Tool</h1>
          <p style="font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem; font-weight: 500; color: #111827;">We designed and engineered the Sleep Calculator because we believe waking up refreshed should be a natural daily standard, not a difficult struggle. Our platform computes sleep intervals scientifically around natural human biological clocks.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">The Mission Behind Our Sleep Optimization Portal</h2>
          <p style="margin-bottom: 1.25rem;">Millions of people suffer from disrupted internal biological clocks, irregular shift work parameters, heavy morning fatigue, or constant sleep inertia. Many people manage to get a full 8 hours of sleep but wake up feeling completely exhausted. This occurs because they were woken up in the middle of a Deep Sleep phase, also known as slow-wave or N3 stage sleep. Our goal is to provide a completely free, fast, highly accessible, and privacy-first web application that operates locally to help you plan bedtimes or morning alarms effectively.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">How the Sleep Cycle Algorithm Operates</h2>
          <p style="margin-bottom: 1.25rem;">A standard human sleep cycle lasts approximately 90 minutes. During this period, the brain transitions from shallow N1 light sleep, through N2, down into N3 deep slow-wave sleep, and back up to REM (Rapid Eye Movement) active sleep where vivid dreaming takes place. Waking up during N3 deep sleep causes intense morning brain fog, whereas waking up at the tail end of REM sleep simulates natural biological arousal and boosts focus. Our calculator provides three key computational modes:</p>
          <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 1.5rem; line-height: 1.8;">
            <li><strong>Wake Up Mode:</strong> If you must wake up at a designated hour, we calculate backwards in 90-minute intervals (incorporating a standard 15-minute bedtime latency buffer) to map the healthiest bedtimes.</li>
            <li><strong>Bedtime Mode:</strong> If you are planning to go to bed right now, we calculate forward in 90-minute blocks so you can set optimal morning alarms.</li>
            <li><strong>Nap Mode:</strong> We model short 20-minute power naps or complete 90-minute sleep cycles to keep your motor cognitive skills sharp during afternoons.</li>
          </ul>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">Explore Our Science-Backed Sleep Library</h2>
          <p style="margin-bottom: 1.25rem;">Navigate our popular health guides and articles to further build your rest routines:</p>
          <ul style="line-height: 1.9; padding-left: 0; list-style-type: none; margin-bottom: 2rem; font-weight: 500;">
            ${internalLinksList}
          </ul>
    `;
  } else if (reqPath === "/contact") {
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; font-family: 'Playfair Display', Georgia, serif;">Contact Sleep Calculator – Support & Inquiries</h1>
          <p style="font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem; font-weight: 500; color: #111827;">Have questions, feature suggestions, layout feedback, or fascinating sleep stories to share? We are glad to hear from you. Get in touch with our team directly.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">Frequently Asked Questions (FAQs) On Sleep Timing</h2>
          <p style="margin-bottom: 1rem;"><strong>How accurate is the 90-minute sleep cycle estimate?</strong> While the average sleep cycle for adults is indeed 90 minutes, individual cycles can range from 70 to 110 minutes based on diet, lifestyle, age, genetics, and stress levels. Our calculator provides a standard, clinically recognized baseline.</p>
          <p style="margin-bottom: 1rem;"><strong>What is the 15 minutes of bedtime latency?</strong> It takes the average healthy adult approximately 14 to 20 minutes to transition from full wakefulness into light N1 sleep. Our bedtime algorithm injects 15 minutes of default buffer to accommodate this sequence.</p>
          <p style="margin-bottom: 1.25rem;"><strong>How can I support Sleep Calculator?</strong> You can share our free web application with friends, classmates, tech students, and colleagues who struggle with morning fatigue or irregular shift work schedules!</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">Alternative Ways to Contact the Team</h2>
          <p style="margin-bottom: 1.25rem;">You can reach our lead developer and sleep content analysts directly via physical email at: <a href="mailto:support@sleepcalculater.online" style="color: #7C3AED; font-weight: bold; text-decoration: underline;">support@sleepcalculater.online</a>. We generally respond to constructive queries, partnership proposals, and layout suggestions within 48 business hours.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">Read Popular Sleep Science Resources</h2>
          <ul style="line-height: 1.9; padding-left: 0; list-style-type: none; margin-bottom: 2rem; font-weight: 500;">
            ${internalLinksList}
          </ul>
    `;
  } else if (reqPath === "/privacy") {
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; font-family: 'Playfair Display', Georgia, serif;">Privacy Policy – Sleep Calculator</h1>
          <p style="font-size: 0.9rem; color: #6B7280; font-style: italic; margin-bottom: 1.5rem;">Last Updated: May 2026</p>
          <p style="margin-bottom: 1.25rem; font-size: 1.15rem; line-height: 1.8; color: #111827; font-weight: 500;">Welcome to sleepcalculater.online. We respect your digital privacy. This Privacy Policy outlines our strict data handling architectures, cookie paradigms, analytics systems, and database safety guidelines.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">1. Complete Absence of Personal Health Record Databases</h2>
          <p style="margin-bottom: 1.25rem;">Unlike other wellness applications, our tool does NOT require any registration, email capture, or profile setup to evaluate sleep cycle patterns. Our clinical checkup operates entirely client-side. We do not design or maintain sensitive database tables compiling user health habits, bed times, waking routines, or medical diagnostics.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">2. Cookies, AdSense, and Analytical Log Profiles</h2>
          <p style="margin-bottom: 1.25rem;">We utilize small cookie keys to remember simple screen selections (such as light vs. dark mode interfaces). Additionally, our site utilizes Google AdSense and Google Analytics to serve contextual, non-personalized advertising content and compile general website visitor counts. These services utilize standardized tracking hashes. You can block cookie downloads at any time using your standard browser settings.</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">3. Interactive Contact Form Data Security</h2>
          <p style="margin-bottom: 1.25rem;">If you choose to communicate with us using our Contact form or direct support email, we store the submitted Name, Email, and message context in secure cloud databases managed via Google Cloud and Firebase. We implement strict firewall rules and will never sell, lease, or distribute your email coordinates to commercial third-party marketing lists.</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">4. Continuous Compliance and Support</h2>
          <p style="margin-bottom: 1.25rem;">If you wish to request deletion of any contact messages you previously submitted to our system, please feel free to email <a href="mailto:support@sleepcalculater.online" style="color: #7C3AED; font-weight: bold; text-decoration: underline;">support@sleepcalculater.online</a> explicitly stating the sender coordinates. For more info on our platform, review our <a href="/about" style="color: #7C3AED; text-decoration: underline;">About Our Sleep Science Mission</a> page.</p>
    `;
  } else if (reqPath === "/terms") {
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; font-family: 'Playfair Display', Georgia, serif;">Terms and Conditions – Sleep Calculator</h1>
          <p style="font-size: 0.9rem; color: #6B7280; font-style: italic; margin-bottom: 1.5rem;">Last Updated: May 2026</p>
          <p style="margin-bottom: 1.25rem; font-size: 1.15rem; line-height: 1.8; color: #111827; font-weight: 500;">By accessing, navigating, or utilizing the interactive calculators and guides at sleepcalculater.online, you explicitly agree to align with these detailed Terms and Conditions of service.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">1. Strict Scientific and Health Disclaimers</h2>
          <p style="margin-bottom: 1.25rem;">All computational calculations, recommendations, napping intervals, and articles supplied on this website represent educational estimations based on general physiological sleep cycle models. Waking up during specific phases is not a substitute for clinical diagnostics. These calculations do NOT represent medical advice. If you suffer from chronic insomnia, severe sleep apnea, clinical exhaustion, or long-term sleep-wake rhythm disorders, you must seek support from certified neurological or clinical healthcare practitioners.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">2. Fair Usage License of Interactive Calculators</h2>
          <p style="margin-bottom: 1.25rem;">This tool is provided for free personal usage only. Scraping our calculation endpoints, attempting to flood our server systems with automated rate queries, embedding the tool in third-party commercial portals without express coordinate approvals, or re-distributing our content under other domain names is strictly prohibited.</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">3. Limited Warranties and Security Caps</h2>
          <p style="margin-bottom: 1.25rem;">The owners and developers of sleepcalculater.online specify that our interactive calculators are provided "as-is" without hidden guarantees of continuous uptime, bug-free equations, or perfect circadian adaptation. We shall not be held liable for any damages, missing wake times, or physical health impacts related to the calculated bedtime suggestions.</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">4. Direct Connections & Inquiries</h2>
          <p style="margin-bottom: 1.25rem;">If you have any questions regarding these rules, please navigate to our <a href="/contact" style="color: #7C3AED; font-weight: bold; text-decoration: underline;">Contact Page</a> or review our <a href="/privacy" style="color: #7C3AED; font-weight: bold; text-decoration: underline;">Privacy parameters</a>.</p>
    `;
  } else if (BLOG_POSTS_META[slug]) {
    const post = BLOG_POSTS_META[slug];
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; line-height: 1.2; font-family: 'Playfair Display', Georgia, serif;">${post.title}</h1>
          <p style="font-size: 1rem; color: #6B7280; font-style: italic; margin-bottom: 1.5rem;">Published in category: <strong>${post.category}</strong> on <strong>${post.date}</strong> by the Sleep Calculator Research Team</p>
          
          <p style="font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem; font-weight: 500; color: #111827;">${post.description}</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1.25rem; font-family: 'Playfair Display', Georgia, serif;">The Biological Logic Behind ${post.title}</h2>
          <p style="margin-bottom: 1.25rem;">Waking up feeling amazing isn't just about the cumulative hours of rest—it centers heavily on coordinating sleep stages carefully with your internal circadian biological clock. Our brains transition through several sleep cycles every single night. Each cycle spans four major physiological phases, which progress sequentially under typical resting coordinates:</p>
          <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 1.5rem; line-height: 1.8;">
            <li><strong>N1 Stage (Light Sleep):</strong> The initial drift transition from awake state to shallow rest. Heart rate, breathing, and eye movements slow down, and muscle tone decreases.</li>
            <li><strong>N2 Stage (Intermediate Sleep):</strong> Core temperature drops, brainwaves slow down further with active bursts known as sleep spindles, and memory consolidation starts.</li>
            <li><strong>N3 Stage (Slow-Wave Deep Sleep):</strong> Restorative processes trigger, repairing muscle tissue, strengthening immune systems, and flushing metabolic debris from brain channels. Waking up during this cycle causes severe sleep inertia.</li>
            <li><strong>REM Stage (Rapid Eye Movement):</strong> The brain becomes highly active, processing emotions, encoding deep-term learnings, and producing vivid dreams while limbs remain relaxed.</li>
          </ul>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1.25rem; font-family: 'Playfair Display', Georgia, serif;">How Sleep Cycles Regulate Morning Energy and Prevent Fatigue</h2>
          <p style="margin-bottom: 1.25rem;">Each individual cycle requires roughly 90 minutes to complete. If a standard morning alarm forcefully shocks your body out of N3 deep slow-wave sleep, you trigger intense morning grogginess, which impairs motor and intellectual functions for hours. However, by scheduling bedtimes or alarm coordinates around exact 90-minute intervals (such as 7.5 hours or 9 hours of sleep), you rise gently at the tail end of a cycle, waking up with maximum energy and natural focus. Waking at the completion of a cycle guarantees you feel refreshed even if the absolute hours of sleep are slightly shorter.</p>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1.25rem; font-family: 'Playfair Display', Georgia, serif;">Actionable Sleep Hygiene Rules to Maximize Nightly Rest</h2>
          <p style="margin-bottom: 1.25rem;">Applying the formulas inside our interactive tool is only the first step. To ensure you fall asleep smoothly within our estimated 15-minute average latency period, try implementing these standard clinical optimizations:</p>
          <ul style="list-style-type: decimal; margin-left: 20px; margin-bottom: 1.5rem; line-height: 1.8;">
            <li><strong>Consistent circadian anchors:</strong> Train your nervous system by waking up at the exact same hour every morning, seven days a week.</li>
            <li><strong>Ambient light control:</strong> Turn off television screens, gaming consoles, and mobile phones at least sixty minutes before trying to sleep to avoid suppressing melatonin.</li>
            <li><strong>Restorative atmosphere:</strong> Ensure your room is quiet, well-ventilated, and cooled between 60°F and 67°F (15°C to 19°C) for easy temperature dips.</li>
            <li><strong>Careful intake limits:</strong> Avoid drinking heavy caffeinated beverages, working out intensely, or consuming sugary meals late in active evenings.</li>
          </ul>

          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1.25rem; font-family: 'Playfair Display', Georgia, serif;">Read Related Scientific Guides and Cognitive Resources</h2>
          <p style="margin-bottom: 1.25rem;">Optimizing your circadian health is a life-changing journey. Read more of our research-backed guides written in simple, clear language:</p>
          <ul style="line-height: 1.9; padding-left: 0; list-style-type: none; margin-bottom: 2rem; font-weight: 500;">
            ${internalLinksList}
          </ul>
    `;
  }

  return `
        <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #374151;">
          ${navMenu}
          ${bodyContent}
          ${footerBanner}
        </div>
  `;
}

// Full SEO metadata and Schema build-time injection helper
function injectSEOMetadataStatic(html: string, originalPath: string, customCanonical?: string, customTitle?: string): string {
  const reqPath = originalPath.split('?')[0].replace(/\/$/, "") || "/";
  const slug = reqPath.split('/').pop() || "";

  let title = customTitle || "Sleep Calculator – Calculate Bedtime & Wake Up Times";
  let description = "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles. Wake up refreshed and improve your sleep quality.";
  let canonicalUrl = customCanonical || `https://sleepcalculater.online${reqPath}`;
  const schemas: any[] = [];

  const defaultAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sleep Calculator",
    "url": "https://sleepcalculater.online/",
    "description": "Calculate the exact time you need to go to bed or wake up using 90-minute REM sleep intervals to prevent morning grogginess.",
    "applicationCategory": "HealthAndFitnessApplication",
    "operatingSystem": "All"
  };

  if (reqPath === "/") {
    title = MAIN_PAGES_META["/"].title;
    description = MAIN_PAGES_META["/"].description;
    canonicalUrl = MAIN_PAGES_META["/"].canonicalUrl;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://sleepcalculater.online/#website",
      "url": "https://sleepcalculater.online/",
      "name": "Sleep Calculator",
      "alternateName": [
        "Sleep Calculator",
        "Sleep Cycle Calculator",
        "Bedtime Calculator",
        "REM Sleep Calculator"
      ],
      "publisher": {
        "@id": "https://sleepcalculater.online/#organization"
      }
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://sleepcalculater.online/#organization",
      "name": "Sleep Calculator",
      "url": "https://sleepcalculater.online/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sleepcalculater.online/logo.png",
        "width": "512",
        "height": "512"
      },
      "sameAs": [
        "https://sleepcalculater.online/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@sleepcalculater.online",
        "contactType": "customer support"
      }
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": "https://sleepcalculater.online/#webapplication",
      "name": "Sleep Calculator",
      "url": "https://sleepcalculater.online/",
      "description": "Calculate the exact time you need to go to bed or wake up using 90-minute REM sleep intervals to prevent morning grogginess.",
      "applicationCategory": "HealthAndFitnessApplication",
      "operatingSystem": "All"
    });
  } else if (MAIN_PAGES_META[reqPath]) {
    title = customTitle || MAIN_PAGES_META[reqPath].title;
    description = MAIN_PAGES_META[reqPath].description;
    canonicalUrl = customCanonical || MAIN_PAGES_META[reqPath].canonicalUrl;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": title,
      "description": description
    });
  } else if (BLOG_POSTS_META[slug]) {
    const post = BLOG_POSTS_META[slug];
    title = customTitle || post.title;
    description = post.description;
    canonicalUrl = customCanonical || `https://sleepcalculater.online/${slug}`;

    // 1. BlogPosting Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "headline": title,
      "description": description,
      "image": "https://sleepcalculater.online/og_banner.png",
      "author": {
        "@type": "Organization",
        "name": "Sleep Calculator",
        "url": "https://sleepcalculater.online"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sleep Calculator",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sleepcalculater.online/logo.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date
    });

    // 2. BreadcrumbList Schema (Hierarchical navigation structure for Google deep crawling)
    const isBlogIndex = canonicalUrl.endsWith('/blog/') || canonicalUrl.endsWith('/blog');
    const breadcrumbListItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sleepcalculater.online/"
      }
    ];

    if (isBlogIndex) {
      breadcrumbListItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://sleepcalculater.online/blog/"
      });
    } else {
      breadcrumbListItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://sleepcalculater.online/blog/"
      });
      breadcrumbListItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      });
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbListItems
    });

    if (slug === 'sleep-debt-explained') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": "https://sleepcalculater.online/sleep-debt-explained#webpage",
        "url": "https://sleepcalculater.online/sleep-debt-explained",
        "name": "Sleep Debt Explained: What It Is and How to Recover",
        "description": "Learn what sleep debt is, how it affects your health and cognitive functions, and discover practical scientific ways to recover from accumulated sleep loss.",
        "about": {
          "@type": "MedicalCondition",
          "name": "Sleep Deprivation",
          "alternateName": "Sleep Debt",
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Sleep Hygiene Improvement"
            },
            {
              "@type": "MedicalTherapy",
              "name": "Gradual Sleep Extension"
            }
          ]
        },
        "aspectPresented": "Physiology, symptoms, dynamic accumulation, and safe restoration of sleep deficit",
        "audience": {
          "@type": "PeopleAudience",
          "suggestedAudience": "Adults experiencing chronic fatigue or irregular sleep patterns"
        }
      });
    } else if (slug === 'how-long-does-it-take-to-fall-asleep') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": "https://sleepcalculater.online/how-long-does-it-take-to-fall-asleep#webpage",
        "url": "https://sleepcalculater.online/how-long-does-it-take-to-fall-asleep",
        "name": "How Long Does It Take to Fall Asleep? What's Normal?",
        "description": "Learn how long it typically takes to fall asleep, factors that affect sleep onset, and tips to fall asleep faster naturally.",
        "about": {
          "@type": "MedicalCondition",
          "name": "Insomnia",
          "alternateName": "Sleep Onset Latency",
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Cognitive Behavioral Therapy for Insomnia (CBT-I)"
            },
            {
              "@type": "MedicalTherapy",
              "name": "Sleep Hygiene Improvement"
            }
          ]
        },
        "aspectPresented": "Physiology of sleep onset, average latency times, sleeping disorders, and natural solutions to fall asleep faster",
        "audience": {
          "@type": "PeopleAudience",
          "suggestedAudience": "Adults experiencing difficulty falling asleep or curious about normal sleep latency"
        }
      });
    }
  }

  // Clear standard SEO / Social tags
  html = html.replace(/<title>.*?<\/title>/gis, "");
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+content=".*?"\s+name="description"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+content=".*?"\s+name="keywords"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gis, "");
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gis, "");
  
  html = html.replace(/<!-- Structured Data -->.*?<\/script>/gis, "");
  html = html.replace(/<script\s+type="application\/ld\+json">.*?<\/script>/gis, "");

  let seoBlock = `
    <title>${title}</title>
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="sleep calculator, sleep cycles, REM sleep, calculate bedtime, circadian rhythm, quality sleep, wake up refreshed" />
    <meta property="og:type" content="${reqPath === '/' ? 'website' : 'article'}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Sleep Calculator" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://sleepcalculater.online/og_banner.png" />
    <meta property="og:image:secure_url" content="https://sleepcalculater.online/og_banner.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://sleepcalculater.online/og_banner.png" />
  `;

  schemas.forEach(schema => {
    seoBlock += `\n    <script type="application/ld+json">\n      ${JSON.stringify(schema, null, 2)}\n    </script>`;
  });

  html = html.replace(/<head>/i, () => `<head>\n${seoBlock}`);

  html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g, `<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="$1"></noscript>`);

  if (reqPath !== "/" && reqPath !== "") {
    const cleanFallback = getStaticFallbackContent(reqPath, slug);
    // Suppress hydrations since we will hydrate React cleanly on top of it.
    html = html.replace(/<!-- FALLBACK_CONTENT_START -->.*?<!-- FALLBACK_CONTENT_END -->/gis, () => `<!-- FALLBACK_CONTENT_START --><div class="fallback-content">${cleanFallback}</div><!-- FALLBACK_CONTENT_END -->`);
  }

  return html;
}

// Ensure the directory exists
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Generate static routes
const REDIRECT_SLUGS = [
  'how-much-sleep-do-you-need-by-age',
  'wake-up-tired-after-8-hours',
  'best-bedtime-for-adults',
  'what-is-sleep-debt',
  'sleep-and-memory-learning',
  'sleep-calculator-by-age',
  'best-sleep-schedule-for-productivity'
];

const staticRoutes = [
  ...Object.keys(MAIN_PAGES_META).map(p => p.replace(/\/$/, "")).filter(Boolean),
  ...Object.keys(BLOG_POSTS_META).map(slug => `/${slug}`).filter(p => !REDIRECT_SLUGS.some(s => p.endsWith(s)))
];

console.log(`[Static Gen] Found ${staticRoutes.length} routes to pre-render statically:`, staticRoutes);

for (const route of staticRoutes) {
  const reqPath = route;
  const slug = route.split('/').pop() || "";
  
  console.log(`[Static Gen] Generating pre-rendered page for: ${reqPath}`);
  const preRenderedHtml = injectSEOMetadataStatic(htmlTemplate, reqPath);
  
  // Save both slug.html and slug/index.html to be served correctly by any SPA/multi-router server
  const outputFilePath1 = path.join(distPath, `${slug}.html`);
  const outputFilePath2 = path.join(distPath, slug, 'index.html');
  
  ensureDirectoryExistence(outputFilePath2);
  fs.writeFileSync(outputFilePath2, preRenderedHtml, 'utf-8');
  fs.writeFileSync(outputFilePath1, preRenderedHtml, 'utf-8');
  
  console.log(`[Static Gen] Successfully pre-rendered static HTML files for ${reqPath}`);
}

// === Programmatic sitemap.xml Generation ===
console.log("[Static Gen] Generating fully-synchronized sitemap.xml dynamically...");

const sitemapUrls = [
  'https://sleepcalculater.online/',
  ...Object.keys(MAIN_PAGES_META)
    .filter(p => p !== '/' && p !== '/404' && p !== '/not-found')
    .map(p => `https://sleepcalculater.online${p.startsWith('/') ? p : '/' + p}`),
  ...Object.keys(BLOG_POSTS_META)
    .filter(slug => !REDIRECT_SLUGS.includes(slug))
    .map(slug => `https://sleepcalculater.online/${slug}`)
];

const uniqueUrls = Array.from(new Set(sitemapUrls));

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

for (const url of uniqueUrls) {
  let changefreq = 'weekly';
  let priority = '0.8';
  
  if (url === 'https://sleepcalculater.online/') {
    changefreq = 'daily';
    priority = '1.0';
  } else if (
    url.includes('/student-sleep-calculator') || 
    url.includes('/shift-work-sleep-calculator') || 
    url.includes('/sleep-cycle-calculator-90-minutes') || 
    url.includes('/wake-up-between-sleep-cycles') || 
    url.includes('/ideal-bedtime-based-on-wake-up-time')
  ) {
    priority = '0.9'; // High priority calculators & planners
  } else if (url.includes('/about') || url.includes('/contact')) {
    priority = '0.5';
  } else if (url.includes('/privacy') || url.includes('/terms')) {
    priority = '0.3';
  }
  
  sitemapXml += `
  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

sitemapXml += `
</urlset>`;

const publicSitemapPath = path.resolve('./public/sitemap.xml');
const distSitemapPath = path.resolve('./dist/sitemap.xml');

fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');

console.log(`[Static Gen] Successfully wrote ${uniqueUrls.length} entries dynamically to:`);
console.log(`  - ${publicSitemapPath}`);
console.log(`  - ${distSitemapPath}`);

// === Custom Sleep-Calculator Site Code Structure Compliance ===
console.log("[Static Gen] Generating special directory structures and structural aliasing requested...");

// 2. Generate Privacy-Policy and terms mappings
try {
  const privacyHtmlSourcePath = path.join(distPath, 'privacy.html');
  const privacyPolicyHtmlPath = path.join(distPath, 'privacy-policy.html');
  const termsHtmlSourcePath = path.join(distPath, 'terms.html');
  
  if (fs.existsSync(privacyHtmlSourcePath)) {
    fs.copyFileSync(privacyHtmlSourcePath, privacyPolicyHtmlPath);
    console.log(`[Static Gen] Synced privacy-policy.html to: ${privacyPolicyHtmlPath}`);
  }
} catch (e) {
  console.error("[Static Gen] Error generating privacy-policy.html:", e);
}

// 3. Generate structured landing directories under /tools
const toolsSleepPath = path.join(distPath, 'tools', 'sleep-calculator', 'index.html');
const toolsBedtimePath = path.join(distPath, 'tools', 'bedtime-calculator', 'index.html');
const toolsWakeUpPath = path.join(distPath, 'tools', 'wake-up-calculator', 'index.html');

try {
  // Sleep Calculator landing is equivalent to Home pre-rendered layout
  const homeHtml = injectSEOMetadataStatic(htmlTemplate, "/");
  ensureDirectoryExistence(toolsSleepPath);
  fs.writeFileSync(toolsSleepPath, homeHtml, 'utf-8');
  console.log(`[Static Gen] Wrote tool home to: ${toolsSleepPath}`);

  // Bedtime Calculator
  const bedtimeHtml = injectSEOMetadataStatic(htmlTemplate, "/ideal-bedtime-based-on-wake-up-time");
  ensureDirectoryExistence(toolsBedtimePath);
  fs.writeFileSync(toolsBedtimePath, bedtimeHtml, 'utf-8');
  console.log(`[Static Gen] Wrote tool bedtime to: ${toolsBedtimePath}`);

  // Wake Up Calculator
  const wakeUpHtml = injectSEOMetadataStatic(htmlTemplate, "/wake-up-between-sleep-cycles");
  ensureDirectoryExistence(toolsWakeUpPath);
  fs.writeFileSync(toolsWakeUpPath, wakeUpHtml, 'utf-8');
  console.log(`[Static Gen] Wrote tool wake-up to: ${toolsWakeUpPath}`);
} catch (e) {
  console.error("[Static Gen] Error generating tools subdirectory layouts:", e);
}

// 4. Generate structured blog index and articles subdirectory structure
const blogIndexPath = path.join(distPath, 'blog', 'index.html');
const blogArticlesDir = path.join(distPath, 'blog', 'articles');

try {
  // Blog index page
  const blogIndexHtml = injectSEOMetadataStatic(
    htmlTemplate, 
    "/sleep-cycles-explained", 
    "https://sleepcalculater.online/blog/", 
    "Blog – Sleep Tools, Circadian Science & Healthy Bedtimes Guide"
  );
  ensureDirectoryExistence(blogIndexPath);
  fs.writeFileSync(blogIndexPath, blogIndexHtml, 'utf-8');
  console.log(`[Static Gen] Wrote blog index to: ${blogIndexPath}`);

  // Create blog articles folder
  if (!fs.existsSync(blogArticlesDir)) {
    fs.mkdirSync(blogArticlesDir, { recursive: true });
  }

  // Pre-render specifically matching aliases with proper canonicals and breadcrumbs
  const guideHtml = injectSEOMetadataStatic(
    htmlTemplate, 
    "/sleep-cycles-explained", 
    "https://sleepcalculater.online/blog/articles/sleep-cycle-guide.html"
  );
  fs.writeFileSync(path.join(blogArticlesDir, 'sleep-cycle-guide.html'), guideHtml, 'utf-8');

  const needHtml = injectSEOMetadataStatic(
    htmlTemplate, 
    "/how-much-sleep-do-you-need", 
    "https://sleepcalculater.online/blog/articles/how-much-sleep-do-i-need.html"
  );
  fs.writeFileSync(path.join(blogArticlesDir, 'how-much-sleep-do-i-need.html'), needHtml, 'utf-8');

  const bestTimeHtml = injectSEOMetadataStatic(
    htmlTemplate, 
    "/best-time-to-sleep-and-wake-up", 
    "https://sleepcalculater.online/blog/articles/best-sleep-time.html"
  );
  fs.writeFileSync(path.join(blogArticlesDir, 'best-sleep-time.html'), bestTimeHtml, 'utf-8');

  // Generate /blog/articles/... files dynamically for all posts to ensure consistent canonical and breadcrumb schemas
  Object.keys(BLOG_POSTS_META).forEach(postSlug => {
    try {
      const articlePath = `/${postSlug}`;
      const articleCanonical = `https://sleepcalculater.online/blog/articles/${postSlug}.html`;
      const articleHtml = injectSEOMetadataStatic(htmlTemplate, articlePath, articleCanonical);
      fs.writeFileSync(path.join(blogArticlesDir, `${postSlug}.html`), articleHtml, 'utf-8');
    } catch (e) {
      console.error(`[Static Gen] Error generating structured article ${postSlug}:`, e);
    }
  });

  console.log(`[Static Gen] Successfully pre-rendered articles under: ${blogArticlesDir}`);
} catch (e) {
  console.error("[Static Gen] Error generating blog folder structure:", e);
}

console.log("[Static Gen] Complete! Generated build-time static HTML and sitemap payloads successfully.");
