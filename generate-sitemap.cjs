const fs = require('fs');
const path = require('path');

const domain = 'https://sleepcalculater.online';

function runSitemapGenerationAndChecks() {
  console.log('🔄 Starting dynamic sitemap extraction and validation...');

  const appTsxPath = path.join(__dirname, 'src/App.tsx');
  if (!fs.existsSync(appTsxPath)) {
    throw new Error('❌ Error: src/App.tsx file could not be located.');
  }

  const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');

  // Extract all paths declared within <Route> tags
  const appLines = appTsxContent.split('\n');
  const extractedRoutes = [];

  for (let line of appLines) {
    if (line.includes('<Route') && line.includes('path=')) {
      const pathMatch = line.match(/path=["']([^"']+)["']/);
      if (pathMatch) {
        const routePath = pathMatch[1];
        
        // Exclude wildcards, param boundaries, and Navigate redirects
        if (routePath !== '*' && !routePath.includes(':') && !line.includes('Navigate')) {
          extractedRoutes.push(routePath);
        }
      }
    }
  }

  // Ensure unique routes list
  const uniqueRoutes = [...new Set(extractedRoutes)];
  console.log(`📡 Dynamically extracted ${uniqueRoutes.length} canonical routes from App.tsx.`);

  // Load the metadata source of truth for build-time active check verification
  const blogMetadataPath = path.join(__dirname, 'src/blogMetadata.ts');
  if (!fs.existsSync(blogMetadataPath)) {
    throw new Error('❌ Error: src/blogMetadata.ts file could not be located.');
  }

  const blogMetadataContent = fs.readFileSync(blogMetadataPath, 'utf8');
  const metadataLines = blogMetadataContent.split('\n');

  // Parse keys inside MAIN_PAGES_META block using state-machine parser
  const mainPageKeys = [];
  let inMainPagesMeta = false;
  for (const line of metadataLines) {
    if (line.includes('export const MAIN_PAGES_META')) {
      inMainPagesMeta = true;
      continue;
    }
    if (inMainPagesMeta && line.startsWith('export const')) {
      inMainPagesMeta = false;
    }
    if (inMainPagesMeta) {
      const match = line.match(/^\s*"([^"]+)"\s*:\s*{/);
      if (match) {
        mainPageKeys.push(match[1]);
      }
    }
  }

  // Parse keys inside BLOG_POSTS_META block using state-machine parser
  const blogPostKeys = [];
  let inBlogPostMeta = false;
  for (const line of metadataLines) {
    if (line.includes('export const BLOG_POSTS_META')) {
      inBlogPostMeta = true;
      continue;
    }
    if (inBlogPostMeta && line.startsWith('export const')) {
      inBlogPostMeta = false;
    }
    if (inBlogPostMeta) {
      const match = line.match(/^\s*"([^"]+)"\s*:\s*{/);
      if (match) {
        blogPostKeys.push(match[1]);
      }
    }
  }

  console.log(`📋 Found ${mainPageKeys.length} main pages and ${blogPostKeys.length} blog posts in blogMetadata.ts.`);

  // Verify that every single generated link has active, ready-to-render content
  const inactiveLinks = [];
  for (const route of uniqueRoutes) {
    if (route === '/') {
      continue;
    }
    const isMainPage = mainPageKeys.includes(route);
    const slug = route.replace(/^\//, ''); // strip leading slash
    const isBlogPost = blogPostKeys.includes(slug);

    if (!isMainPage && !isBlogPost) {
      inactiveLinks.push(route);
    }
  }

  if (inactiveLinks.length > 0) {
    console.error('❌ Build-time validation failed! The following routes are declared active in App.tsx but are missing metadata or support in src/blogMetadata.ts:');
    console.error(inactiveLinks.join('\n'));
    process.exit(1);
  }

  console.log('✅ Build-time link verification successful! All routes have active content & SEO metadata.');

  // XML mapping with priority & changefreq elements
  const xmlUrls = uniqueRoutes.map(route => {
    let priority = '0.8';
    let changefreq = 'weekly';

    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (['/about', '/contact', '/privacy', '/terms'].includes(route)) {
      priority = '0.5';
      changefreq = 'monthly';
    }

    return `  <url>
    <loc>${domain}${route}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  // Write sitemap to /public for static assets and /dist for distribution
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }
  fs.writeFileSync('public/sitemap.xml', xml);

  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  fs.writeFileSync('dist/sitemap.xml', xml);

  console.log('🎉 Dynamic sitemap.xml with priority & changefreq was successfully written to public/ & dist/.');
}

runSitemapGenerationAndChecks();
