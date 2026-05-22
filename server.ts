import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
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

  // Explicit route to serve sitemap.xml directly with correct Content-Type, fallback protected
  app.get("/sitemap.xml", (req, res) => {
    const distPath = path.join(process.cwd(), "dist", "sitemap.xml");
    const publicPath = path.join(process.cwd(), "public", "sitemap.xml");

    res.set("Content-Type", "application/xml");
    res.sendFile(distPath, (err) => {
      if (err) {
        res.sendFile(publicPath, (errPublic) => {
          if (errPublic) {
            res.status(404).set("Content-Type", "text/plain").send("sitemap.xml not found");
          }
        });
      }
    });
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
