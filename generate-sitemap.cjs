const fs = require('fs');

const domain = 'https://sleepcalculater.online';

const routes = [
  '/',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/blog/best-sleep-calculator',
  '/blog/sleep-calculator',
  '/blog/sleep-cycle-stages',
  '/blog/sleep-age',
  '/blog/sleep-cycle',
  '/blog/sleep-calculator-benefits',
  '/blog/fix-sleep-schedule',
  '/blog/blue-light-sleep',
  '/blog/sleep-cycle-calculator',
  '/blog/smart-sleep-habits-better-energy',
  '/blog/why-you-wake-up-in-the-middle-of-the-night',
  '/blog/sleep-debt-recovery-guide',
  '/blog/best-sleep-schedule-for-students',
  '/blog/how-sleep-affects-your-brain-performance',
  '/blog/best-bedtime-routine-for-better-sleep',
  '/blog/why-sleep-cycles-matter-more-than-sleeping-longer',
  '/blog/best-bedtime-habits-for-better-sleep-quality',
  '/blog/wake-up-at-6am',
  '/blog/wake-up-at-5am',
  '/blog/nap-calculator-timing',
  '/blog/sleep-cycle-timing',
  '/blog/rem-sleep-calculator'
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
