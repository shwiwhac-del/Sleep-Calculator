const fs = require('fs');

const domain = 'https://sleepcalculater.online';

const routes = [
  '/',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/article/best-sleep-time',
  '/article/power-nap',
  '/blog/best-sleep-calculator',
  '/blog/sleep-calculator',
  '/blog/sleep-cycle-stages',
  '/blog/tired',
  '/blog/sleep-age',
  '/blog/sleep-cycle',
  '/blog/sleep-calculator-benefits',
  '/blog/fix-sleep-schedule',
  '/blog/blue-light-sleep'
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap generated successfully.');
