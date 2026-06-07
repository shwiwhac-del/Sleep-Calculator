const fs = require('fs');

const domain = 'https://sleepcalculater.online';

const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/sleep-cycles-explained',
  '/what-is-rem-sleep',
  '/how-much-sleep-do-you-need',
  '/best-time-to-sleep-and-wake-up',
  '/sleep-cycle-calculator-guide',
  '/why-90-minute-sleep-cycles-matter',
  '/how-to-wake-up-refreshed',
  '/ideal-bedtime-for-adults',
  '/sleep-schedule-for-productivity',
  '/how-many-hours-of-sleep-is-healthy',
  '/power-nap-vs-full-sleep-cycle',
  '/circadian-rhythm-explained',
  '/tired-after-8-hours-of-sleep',
  '/best-bedtime-for-students',
  '/sleep-and-memory',
  '/sleep-debt-explained',
  '/best-wake-up-time',
  '/improve-sleep-quality',
  '/sleep-hygiene-tips',
  '/common-sleep-mistakes',
  '/fix-irregular-sleep-schedule',
  '/consistent-sleep-schedule-benefits',
  '/best-temperature-for-sleep',
  '/what-is-deep-sleep',
  '/how-long-does-it-take-to-fall-asleep',
  '/why-do-we-dream',
  '/why-do-people-snore',
  '/why-am-i-tired-after-sleeping'
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
