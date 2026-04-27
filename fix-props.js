import fs from 'fs';
import path from 'path';
const dir = './src/pages';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('backLink=') || content.includes('backLabel=')) {
    content = content.replace(/\s*backLink="[^"]*"/g, '');
    content = content.replace(/\s*backLabel="[^"]*"/g, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
