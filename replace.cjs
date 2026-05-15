const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Backgrounds
  content = content.replace(/dark:bg-\[#0B0B0B\]/g, 'dark:bg-[#0f172a]');
  content = content.replace(/dark:bg-\[#0a0a0a\]/g, 'dark:bg-[#0f172a]');
  content = content.replace(/dark:bg-\[#111\]/g, 'dark:bg-[#111827]');
  content = content.replace(/dark:bg-\[#1A1A1A\]/g, 'dark:bg-[#1e293b]');
  // Borders
  content = content.replace(/dark:border-\[#222\]/g, 'dark:border-[#1e293b]');
  content = content.replace(/dark:border-\[#333\]/g, 'dark:border-slate-700');
  content = content.replace(/dark:border-\[#333\]\/60/g, 'dark:border-slate-700/60');
  
  // Shadows & Glows
  // "The UI feels muddy, blurry, and over-neon"
  content = content.replace(/shadow-\[0_0_30px_rgba\(37,99,235,0\.4\)\]/g, 'shadow-lg shadow-blue-500/10');
  content = content.replace(/shadow-\[0_0_20px_rgba\(37,99,235,0\.1\)\]/g, 'shadow-sm shadow-blue-500/5');
  content = content.replace(/shadow-\[0_0_15px_rgba\(37,99,235,0\.3\)\]/g, 'shadow-md shadow-blue-500/10');
  content = content.replace(/shadow-\[0_4px_30px_rgb\(0,0,0,0\.04\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\]/g, 'shadow-md');
  
  // Update button hover/focus styles to make them premium
  content = content.replace(/focus:ring-\[#2563EB\]\/30/g, 'focus:ring-[#2563EB]/20');
  content = content.replace(/drop-shadow-\[0_0_10px_rgba\([^\)]+\)\]/g, 'drop-shadow-sm');
  
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
console.log("Replaced colors.");
