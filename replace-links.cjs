const fs = require('fs');

const files = ['./src/pages/About.tsx', './src/pages/Privacy.tsx', './src/pages/Terms.tsx', './src/pages/Blog.tsx'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /<Link to="\/".*?>\s*<ArrowLeft size=\{16\} \/> Back Home\s*<\/Link>/g,
    `<button onClick={() => { if (window.history.state && window.history.state.idx > 0) { window.history.back(); } else { window.location.href = '/'; } }} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>`
  );
  fs.writeFileSync(file, content, 'utf8');
});

console.log('done replacing links');
