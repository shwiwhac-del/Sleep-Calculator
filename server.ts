import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
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
    const slug = reqPath.split('/').pop() || "";
    if (slug && BLOG_REDIRECTS[slug]) {
      res.redirect(301, "/" + BLOG_REDIRECTS[slug]);
      return;
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
    schemas.push(defaultAppSchema);
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
    canonicalUrl = `https://sleepcalculater.online/${slug}`;

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
    <meta name="description" content="${description}" />
    <meta name="keywords" content="sleep calculator, sleep cycles, REM sleep, calculate bedtime, circadian rhythm, quality sleep, wake up refreshed" />
    <meta property="og:type" content="${reqPath === '/' ? 'website' : 'article'}" />
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

  // Replace fallback content for subpages so users don't see the Homepage content before React loads
  if (reqPath !== "/" && reqPath !== "") {
    const cleanFallback = `
          <h1>${title}</h1>
          <p>${description}</p>
          <p style="text-align: center; font-size: 0.9rem; opacity: 0.6; font-style: italic; margin-top: 1.5rem;">Loading content...</p>
    `;
    html = html.replace(/<div class="fallback-content">.*?<\/div>/gis, () => `<div class="fallback-content">${cleanFallback}</div>`);
  }

  return html;
}

startServer();
