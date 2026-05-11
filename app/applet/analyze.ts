import fs from 'fs';
const mapfiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js.map') && f.includes('index-'));
const map = JSON.parse(fs.readFileSync(`dist/assets/${mapfiles[0]}`, 'utf8'));

const sizes: Record<string, number> = {};
if (map.sources && map.sourcesContent) {
  map.sources.forEach((source: string, index: number) => {
    const content = map.sourcesContent[index] || '';
    sizes[source] = content.length;
  });
}

console.log(Object.entries(sizes).sort((a, b) => b[1] - a[1]).slice(0, 30));
