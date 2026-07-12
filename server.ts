import express from "express";
import compression from "compression";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import { MAIN_PAGES_META, BLOG_POSTS_META, BLOG_REDIRECTS } from "./src/blogMetadata";

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  
  // Enable gzip/deflate compression for static content and APIs
  app.use(compression());

  const PORT = 3000;

  // Basic security headers, but configure Content-Security-Policy to allow inline scripts/styles for React/Vite development
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  // Setup rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Apply the rate limiting middleware to API calls only
  app.use('/api', limiter);

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 301 SEO redirects for legacy blog URLs / double routes
  app.use((req, res, next) => {
    const reqPath = req.path.split('?')[0].replace(/\/$/, "");
    const parts = reqPath.split('/').filter(Boolean);
    
    if (parts.length === 1) {
      const slug = parts[0].toLowerCase();
      // 1. Check if it is a redirect mapped slug
      if (BLOG_REDIRECTS[slug]) {
        res.redirect(301, "/blog/" + BLOG_REDIRECTS[slug]);
        return;
      }
      
      // 2. Check if it is a direct blog slug (accessed at root instead of /blog/)
      const isBlogSlug = Object.keys(BLOG_POSTS_META).some(k => k.toLowerCase() === slug);
      if (isBlogSlug) {
        const exactSlug = Object.keys(BLOG_POSTS_META).find(k => k.toLowerCase() === slug) || parts[0];
        res.redirect(301, "/blog/" + exactSlug);
        return;
      }
    }
    next();
  });

  // Explicit route to serve sitemap.xml directly with correct Content-Type, fallback protected
  app.get("/sitemap.xml", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "sitemap.xml");
    const publicPath = path.join(process.cwd(), "public", "sitemap.xml");

    res.set("Content-Type", "application/xml");
    
    // In development mode, prioritize public/sitemap.xml to avoid stale dist/sitemap.xml serving
    if (process.env.NODE_ENV !== "production") {
      res.sendFile(publicPath, (err) => {
        if (err) {
          res.sendFile(distPath, (errDist) => {
            if (errDist) {
              res.status(404).set("Content-Type", "text/plain").send("sitemap.xml not found");
            }
          });
        }
      });
    } else {
      res.sendFile(distPath, (err) => {
        if (err) {
          res.sendFile(publicPath, (errPublic) => {
            if (errPublic) {
              res.status(404).set("Content-Type", "text/plain").send("sitemap.xml not found");
            }
          });
        }
      });
    }
  });

  // Clean 301 Permanent Redirects for legacy blog structures to avoid duplicate content penalties
  app.get('/blog/articles/sleep-cycle-guide.html', (req, res) => {
    res.redirect(301, '/blog/sleep-cycles-explained');
  });
  app.get('/blog/articles/how-much-sleep-do-i-need.html', (req, res) => {
    res.redirect(301, '/blog/how-much-sleep-do-you-need');
  });
  app.get('/blog/articles/best-sleep-time.html', (req, res) => {
    res.redirect(301, '/blog/best-time-to-sleep-and-wake-up');
  });
  app.get('/blog/articles/:slug.html', (req, res) => {
    const slug = req.params.slug;
    res.redirect(301, `/blog/${slug}`);
  });
  app.get('/blog/', (req, res) => {
    res.redirect(301, '/blog');
  });

  // Explicit route to serve robots.txt directly with correct Content-Type, fallback protected
  app.get("/robots.txt", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "robots.txt");
    const publicPath = path.join(process.cwd(), "public", "robots.txt");

    res.set("Content-Type", "text/plain");
    res.sendFile(distPath, (err) => {
      if (err) {
        res.sendFile(publicPath, (errPublic) => {
          if (errPublic) {
            res.status(404).set("Content-Type", "text/plain").send("robots.txt not found");
          }
        });
      }
    });
  });

  // Explicit route to serve favicon.ico directly with correct Content-Type, fallback protected
  app.get("/favicon.ico", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "favicon.ico");
    const publicPath = path.join(process.cwd(), "public", "favicon.ico");

    res.set("Content-Type", "image/x-icon");
    res.sendFile(distPath, (err) => {
      if (err) {
        res.sendFile(publicPath, (errPublic) => {
          if (errPublic) {
            res.status(404).set("Content-Type", "text/plain").send("favicon.ico not found");
          }
        });
      }
    });
  });

  // Explicit route to serve favicon.png directly with correct Content-Type, fallback protected
  app.get("/favicon.png", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "favicon.png");
    const publicPath = path.join(process.cwd(), "public", "favicon.png");

    res.set("Content-Type", "image/png");
    res.sendFile(distPath, (err) => {
      if (err) {
        res.sendFile(publicPath, (errPublic) => {
          if (errPublic) {
            res.status(404).set("Content-Type", "text/plain").send("favicon.png not found");
          }
        });
      }
    });
  });

  // Explicit route to serve favicon.svg directly with correct Content-Type, fallback protected
  app.get("/favicon.svg", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "favicon.svg");
    const publicPath = path.join(process.cwd(), "public", "favicon.svg");

    res.set("Content-Type", "image/svg+xml");
    res.sendFile(distPath, (err) => {
      if (err) {
        res.sendFile(publicPath, (errPublic) => {
          if (errPublic) {
            res.status(404).set("Content-Type", "text/plain").send("favicon.svg not found");
          }
        });
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // We only import Vite lazily in dev to prevent ES module dynamic require issues in prod bundle
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      index: false, // Ensure our app.get('*') can intercept and inject metadata into "/" requests
      redirect: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (filePath.includes('/assets/') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.woff') || filePath.endsWith('.woff2')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      }
    }));

    app.get('*', async (req, res) => {
      try {
        const reqPath = req.path.split('?')[0].replace(/\/$/, "") || "/";
        if (reqPath !== "/" && reqPath !== "") {
          const staticHtmlPath = path.join(distPath, reqPath, 'index.html');
          if (fs.existsSync(staticHtmlPath)) {
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            return res.sendFile(staticHtmlPath);
          }
        }

        const filePath = path.join(distPath, 'index.html');
        if (!fs.existsSync(filePath)) {
          return res.status(500).send("Build index.html not found. Run npm run build first.");
        }
        let html = await fs.promises.readFile(filePath, 'utf-8');
        html = injectSEOMetadata(html, req.path);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(req.path === "/not-found" || req.path === "/404" ? 404 : 200).send(html);
      } catch (err) {
        console.error("Error in server-side SEO engine:", err);
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Helper function to build rich, SEO and AEO optimized pre-rendered HTML fallback content
function getRichFallbackContent(reqPath: string, slug: string, title: string, description: string): string {
  // Check if we have pre-rendered static React-to-HTML content for this blog post slug
  if (slug && BLOG_POSTS_META[slug]) {
    try {
      const preRenderedPath = path.resolve('./src/blog-pre-rendered.json');
      if (fs.existsSync(preRenderedPath)) {
        const preRenderedData = JSON.parse(fs.readFileSync(preRenderedPath, 'utf8'));
        if (preRenderedData[slug]) {
          return preRenderedData[slug];
        }
      }
    } catch (e) {
      console.error("[Server] Error loading pre-rendered blog content for " + slug, e);
    }
  }

  // Pre-Rendered Navigation Menu
  const navMenu = `
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--sk-card-border); width: 100%;">
            <!-- Logo link with the beautiful gradient -->
            <a href="/" style="text-decoration: none; font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; background: linear-gradient(to right, #7C3AED, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.2; display: inline-block;">
              Sleep Calculator
            </a>
            
            <!-- Navigation links -->
            <nav style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
              <a href="/" style="text-decoration: none; font-size: 0.85rem; font-weight: 700; color: var(--sk-accent); font-family: 'Inter', system-ui, sans-serif; background: rgba(124, 58, 237, 0.05); padding: 6px 12px; border-radius: 8px;">Home</a>
              <a href="/about" style="text-decoration: none; font-size: 0.85rem; font-weight: 700; color: var(--sk-body); font-family: 'Inter', system-ui, sans-serif; padding: 6px 12px; border-radius: 8px; transition: all 0.2s;">About us</a>
              <a href="/contact" style="text-decoration: none; font-size: 0.85rem; font-weight: 700; color: var(--sk-body); font-family: 'Inter', system-ui, sans-serif; padding: 6px 12px; border-radius: 8px; transition: all 0.2s;">Contact</a>
              <a href="/privacy" style="text-decoration: none; font-size: 0.85rem; font-weight: 700; color: var(--sk-body); font-family: 'Inter', system-ui, sans-serif; padding: 6px 12px; border-radius: 8px; transition: all 0.2s;">Privacy</a>
              <a href="/terms" style="text-decoration: none; font-size: 0.85rem; font-weight: 700; color: var(--sk-body); font-family: 'Inter', system-ui, sans-serif; padding: 6px 12px; border-radius: 8px; transition: all 0.2s;">Terms</a>
            </nav>
          </div>
  `;

  const footerBanner = `
          <p style="text-align: center; font-size: 0.75rem; opacity: 0.55; font-weight: 500; font-family: 'JetBrains Mono', monospace; margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid var(--sk-card-border); color: var(--sk-body); letter-spacing: 0.05em; text-transform: uppercase;">
            ✦ Loading interactive diagnostics & sleep cycle formulas ✦
          </p>
  `;

  // Get a list of popular articles for cross-linking
  const blogKeys = Object.keys(BLOG_POSTS_META);
  const internalLinksList = blogKeys
    .slice(0, 10)
    .map(key => `<li>👉 <a href="/${key}" style="color: #7C3AED; text-decoration: underline; font-weight: 500;">${BLOG_POSTS_META[key].title}</a></li>`)
    .join('\n            ');

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
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">2. Cookies and Analytical Log Profiles</h2>
          <p style="margin-bottom: 1.25rem;">We utilize small cookie keys to remember simple screen selections (such as light vs. dark mode interfaces). Additionally, our site utilizes Google Analytics to compile general website visitor counts. These services utilize standardized tracking hashes. You can block cookie downloads at any time using your standard browser settings.</p>

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
  } else if ([
    '/student-sleep-calculator',
    '/shift-work-sleep-calculator',
    '/sleep-cycle-calculator-90-minutes',
    '/wake-up-between-sleep-cycles',
    '/ideal-bedtime-based-on-wake-up-time'
  ].includes(reqPath)) {
    bodyContent = "";
  } else {
    bodyContent = `
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; font-family: 'Playfair Display', Georgia, serif;">404 Page Not Found</h1>
          <p style="font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem;">The requested sleep resource, article, or tool could not be located in our system.</p>
          <p style="margin-bottom: 1.5rem;">Return to the <a href="/" style="color: #7C3AED; font-weight: bold; text-decoration: underline;">Sleep Calculator Homepage</a> to calculate your optimal bedtime and wake-up times utilizing the natural 90-minute REM sleep cycle algorithm.</p>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', Georgia, serif;">Read Healthy Sleep Guides & Articles</h2>
          <ul style="line-height: 1.9; padding-left: 0; list-style-type: none; margin-bottom: 2rem; font-weight: 500;">
            ${internalLinksList}
          </ul>
    `;
  }

  let processedBody = bodyContent;
  if (!processedBody || processedBody.trim() === "") {
    processedBody = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 380px; text-align: center; padding: 2.5rem 1.5rem; background: var(--sk-card-bg); border: 1px solid var(--sk-card-border); border-radius: 24px; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.03); margin: 2rem auto; max-width: 480px; box-sizing: border-box; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
            <!-- Pulsing Sleep Moon & Star SVG Illustration -->
            <div style="margin-bottom: 1.5rem; position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              <svg class="pulse-animation" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="var(--sk-accent)" stroke="var(--sk-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="twinkle-1" style="position: absolute; top: 12px; right: 12px; transform-origin: center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--sk-accent-gold)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              </div>
              <div class="twinkle-2" style="position: absolute; bottom: 18px; left: 8px; transform-origin: center;">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--sk-accent-gold)" style="opacity: 0.85;"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              </div>
            </div>

            <!-- Loading Typography -->
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 700; color: var(--sk-heading); margin: 0 0 0.5rem 0; letter-spacing: -0.01em;">Sleep Calculator</h2>
            <p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--sk-body); margin: 0 0 1.5rem 0; opacity: 0.9;">Optimizing circadian parameters...</p>

            <!-- Modern Loading Bar Indicator -->
            <div style="width: 100%; max-width: 220px; height: 6px; background: rgba(124, 58, 237, 0.08); border-radius: 99px; overflow: hidden; position: relative; margin-bottom: 1rem;">
              <div class="loading-bar-progress-anim" style="height: 100%; width: 50%; background: linear-gradient(90deg, var(--sk-accent), var(--sk-accent-gold)); border-radius: 99px; position: absolute; left: -50%;"></div>
            </div>

            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sk-accent); font-weight: 650; opacity: 0.85;">Preparing Interactive Tool</span>
          </div>
    `;
  }

  return `
        <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #374151;">
          ${navMenu}
          ${processedBody}
          ${footerBanner}
        </div>
  `;
}

// Full-Stack Server-Side SEO & AEO Metadata and Rich Schema Injection engine
function injectSEOMetadata(html: string, originalPath: string): string {
  const reqPath = originalPath.split('?')[0].replace(/\/$/, "") || "/";
  const slug = reqPath.split('/').pop() || "";

  let title = "Sleep Calculator – Calculate Bedtime & Wake Up Times";
  let description = "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles. Wake up refreshed and improve your sleep quality.";
  let canonicalUrl = `https://sleepcalculater.online${reqPath}`;
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
    
    // Add standalone WebSite schema for Google Site Name detection
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Sleep Calculator",
      "alternateName": [
        "Sleep Calculator",
        "Sleep Cycle Calculator",
        "Bedtime Calculator",
        "REM Sleep Calculator"
      ],
      "url": "https://sleepcalculater.online/"
    });

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
        "url": "https://sleepcalculater.online/favicon.png",
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
    title = MAIN_PAGES_META[reqPath].title;
    description = MAIN_PAGES_META[reqPath].description;
    canonicalUrl = MAIN_PAGES_META[reqPath].canonicalUrl;
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
    title = post.title;
    description = post.description;
    canonicalUrl = `https://sleepcalculater.online/blog/${slug}`;

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
          "url": "https://sleepcalculater.online/favicon.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date
    });

    // 2. BreadcrumbList Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sleepcalculater.online/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": canonicalUrl
        }
      ]
    });

    // 3. MedicalWebPage structured data schema for "/sleep-debt-explained" page
    if (slug === 'sleep-debt-explained') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": "https://sleepcalculater.online/blog/sleep-debt-explained#webpage",
        "url": "https://sleepcalculater.online/blog/sleep-debt-explained",
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
        "@id": "https://sleepcalculater.online/blog/how-long-does-it-take-to-fall-asleep#webpage",
        "url": "https://sleepcalculater.online/blog/how-long-does-it-take-to-fall-asleep",
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
  } else {
    // 404 or unknown subpage fallback
    schemas.push(defaultAppSchema);
  }

  // Strip standard SEO / Social card boilerplate to prevent crawlers seeing duplicate title/meta tags
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
  
  // Clean default Structured Data Block
  html = html.replace(/<!-- Structured Data -->.*?<\/script>/gis, "");
  html = html.replace(/<script\s+type="application\/ld\+json">.*?<\/script>/gis, "");

  // Assemble absolute-optimal SEO + AEO Tags Block
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

  // Inject Schemas
  schemas.forEach(schema => {
    seoBlock += `\n    <script type="application/ld+json">\n      ${JSON.stringify(schema, null, 2)}\n    </script>`;
  });

  // Inject right after opening <head> tag using arrow helper to bypass $ regex replacement issues in JavaScript
  html = html.replace(/<head>/i, () => `<head>\n${seoBlock}`);

  // Preserve standard CSS stylesheet loading tag without injecting inline script handlers that violate CSP/iframe sandbox constraints


  // Replace fallback content for subpages so users don't see the Homepage content before React loads
  if (reqPath !== "/" && reqPath !== "") {
    const cleanFallback = getRichFallbackContent(reqPath, slug, title, description);
    html = html.replace(/<!-- FALLBACK_CONTENT_START -->.*?<!-- FALLBACK_CONTENT_END -->/gis, () => `<!-- FALLBACK_CONTENT_START --><div class="fallback-content">${cleanFallback}</div><!-- FALLBACK_CONTENT_END -->`);
  }

  return html;
}

startServer();
