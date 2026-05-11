import fs from 'fs';

const map = JSON.parse(fs.readFileSync('dist/assets/index-4wWSkEcn.js.map', 'utf8'));
const sources = map.sources;
const nodeModules = sources.filter((s: string) => s.includes('node_modules'));
const counts: Record<string, number> = {};
nodeModules.forEach((s: string) => {
  const match = s.match(/node_modules\/([^/]+)/);
  if (match) counts[match[1]] = (counts[match[1]] || 0) + 1;
});
console.log(Object.entries(counts).sort((a, b) => b[1] - a[1]));
