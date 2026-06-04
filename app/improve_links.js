const fs = require('fs');
const path = require('path');

const directoryPath = path.join(process.cwd(), 'src', 'pages');

const keywordsMap = [
  { keyword: 'sleep calculator', url: '/blog/sleep-calculator' },
  { keyword: 'sleep schedule', url: '/blog/fix-sleep-schedule' },
  { keyword: 'circadian rhythm', url: '/blog/fix-sleep-schedule' },
  { keyword: 'sleep cycle', url: '/blog/sleep-cycle' },
  { keyword: 'sleep cycles', url: '/blog/sleep-cycle-stages' },
  { keyword: 'power nap', url: '/article/power-nap' },
  { keyword: 'bedtime routine', url: '/blog/best-bedtime-routine-for-better-sleep' },
  { keyword: 'sleep debt', url: '/blog/sleep-debt-recovery-guide' },
  { keyword: 'blue light', url: '/blog/blue-light-sleep' }
];

const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.tsx') && f !== 'Home.tsx' && f !== 'Blog.tsx' && f !== 'About.tsx' && f !== 'Contact.tsx' && f !== 'Privacy.tsx' && f !== 'Terms.tsx' && f !== 'Disclaimer.tsx' && f !== 'NotFound.tsx' && f !== 'Feature.tsx');

files.forEach(file => {
  const filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Add import { Link } from 'react-router-dom'; if not present
  if (!content.includes("import { Link }")) {
      content = "import { Link } from 'react-router-dom';\n" + content;
  }

  keywordsMap.forEach(({ keyword, url }) => {
    // Avoid double linking or linking on the same topic's page
    if (file.toLowerCase().includes(keyword.replace(' ', ''))) return;

    let parts = content.split(/(<[^>]+>)/g);
    let replacedOnce = false;

    // Also avoid replacing inside already existing Links by tracking depth
    let linkDepth = 0;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith('<')) {
        if (parts[i].startsWith('<Link')) linkDepth++;
        if (parts[i].startsWith('</Link')) linkDepth--;
        continue; // skip tags
      }
      
      if (linkDepth > 0) continue; // inside a Link tag text
      
      if (!replacedOnce && new RegExp(`\\b${keyword}\\b`, 'i').test(parts[i])) {
         parts[i] = parts[i].replace(new RegExp(`(\\b${keyword}\\b)`, 'i'), `<Link to="${url}" className="text-[#8B5CF6] hover:underline">$1</Link>`);
         replacedOnce = true;
      }
    }
    content = parts.join('');
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log("Internal linking improved!");
