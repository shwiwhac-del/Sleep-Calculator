const fs = require('fs');

const domain = 'https://sleepcalculater.online';

const routes = [
  '/',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms'
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

// Ensure directories and files are written both to public and dist/ to be completely bulletproof
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
fs.writeFileSync('public/sitemap.xml', xml);

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
fs.writeFileSync('dist/sitemap.xml', xml);

console.log('Sitemap generated successfully.');
