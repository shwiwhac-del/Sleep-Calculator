const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/text-gray-900(?!\s*dark:)/g, 'text-gray-900 dark:text-white');
      content = content.replace(/text-gray-600(?!\s*dark:)/g, 'text-gray-600 dark:text-gray-300');
      content = content.replace(/text-gray-500(?!\s*dark:)/g, 'text-gray-500 dark:text-gray-400');
      content = content.replace(/text-gray-400(?!\s*dark:)/g, 'text-gray-400 dark:text-gray-500');
      content = content.replace(/bg-white(?!\s*dark:|\/)/g, 'bg-white dark:bg-[#111]');
      content = content.replace(/bg-gray-50(?!\s*dark:)/g, 'bg-gray-50 dark:bg-[#1A1A1A]');
      content = content.replace(/border-gray-100(?!\s*dark:)/g, 'border-gray-100 dark:border-[#222]');
      content = content.replace(/border-gray-200(?!\s*dark:)/g, 'border-gray-200 dark:border-[#333]');
      content = content.replace(/bg-\[#F8FAFC\](?!\s*dark:)/g, 'bg-[#F8FAFC] dark:bg-[#1A1A1A]');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

replaceInDir('./src/pages');
replaceInDir('./src/components');
console.log('done');
