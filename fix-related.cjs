const fs = require('fs');

const files = [
  'src/pages/BenefitsOfSleepCalculator.tsx',
  'src/pages/BestTimeToSleep.tsx',
  'src/pages/WhatIsASleepCalculator.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<ArticleLayout\s+relatedPosts=\{\[\s+.*?\]\}\s+/s, '<ArticleLayout\n      ');
  fs.writeFileSync(file, content);
});

console.log('Fixed relatedPosts');
