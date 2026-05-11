import fs from 'fs';
const mapfiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js.map') && f.includes('index-'));
const map = JSON.parse(fs.readFileSync(`dist/assets/${mapfiles[0]}`, 'utf8'));
const sizes = {};
if (map.sources && map.sourcesContent) {
  map.sources.forEach((source, index) => {
    const content = map.sourcesContent[index] || '';
    sizes[source] = content.length;
  });
}
console.log(Object.entries(sizes).sort((a, b) => b[1] - a[1]).slice(0, 10));
