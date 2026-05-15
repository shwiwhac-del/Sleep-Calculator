const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Improve Text Readability
  content = content.replace(/dark:text-white/g, 'dark:text-gray-100');
  content = content.replace(/dark:text-gray-400/g, 'dark:text-gray-400');
  // Avoid over-bright neon effects in buttons
  // "Improve Active States - Active AM/PM and age buttons should look clear and premium - Avoid over-bright neon effects"
  // Let's replace 'bg-[#2563EB] text-white shadow-md' with something refined where appropriate 
  // Wait, the user already says "Reduce cyan glow intensity". If there's cyan, we should replace it.
  content = content.replace(/ring-\[#2563EB\]\/50/g, 'ring-[#2563EB]/20');
  content = content.replace(/ring-[#2563EB]\/40/g, 'ring-[#2563EB]/20');
  content = content.replace(/shadow-\[0_0_15px_rgba\(37,99,235,0\.5\)\]/g, 'shadow-md shadow-blue-500/10');
  // Remove blur
  content = content.replace(/backdrop-blur-xl/g, 'backdrop-blur-md');
  content = content.replace(/backdrop-blur-2xl/g, 'backdrop-blur-lg');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
       replaceInFile(file);
    }
  });
  return results;
}

walkDir('./src');
console.log("Refined colors further.");
