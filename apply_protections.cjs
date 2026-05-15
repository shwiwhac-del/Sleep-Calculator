const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, regex, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. App.tsx (Header/Footer select-none) Wait, we already added select-none to body in index.css

// 2. ArticleLayout.tsx
replaceInFile('./src/components/ArticleLayout.tsx',
  /<div className="prose /g,
  '<div onContextMenu={(e) => e.stopPropagation()} className="prose select-text '
);

replaceInFile('./src/components/ArticleLayout.tsx',
  /<h1 className="text-3xl /g,
  '<h1 className="select-text text-3xl '
);

replaceInFile('./src/components/ArticleLayout.tsx',
  /<p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium m-0 border-l-2 border-\[#2563EB\] pl-4">\{description\}<\/p>/g,
  '<p className="select-text text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium m-0 border-l-2 border-[#2563EB] pl-4">{description}</p>'
);

// 3. Home.tsx
// Add select-text to results area
replaceInFile('./src/pages/Home.tsx',
  /<div className="w-full flex flex-col gap-3 sm:gap-4">/g,
  '<div className="w-full flex flex-col gap-3 sm:gap-4 select-text" onContextMenu={(e) => e.stopPropagation()}>'
);
// Disable right click on Calculator UI
replaceInFile('./src/pages/Home.tsx',
  /<div className="flex flex-col items-center bg-white dark:bg-\[#111827\]\/80 /g,
  '<div onContextMenu={(e) => e.preventDefault()} className="flex flex-col items-center bg-white dark:bg-[#111827]/80 '
);

// 4. FAQAccordion.tsx
replaceInFile('./src/components/FAQAccordion.tsx',
  /<div className="mt-3 text-sm/g,
  '<div onContextMenu={(e) => e.stopPropagation()} className="mt-3 select-text text-sm'
);

// 5. Contact.tsx
replaceInFile('./src/pages/Contact.tsx',
  /<a href="mailto:sleepcalculaters@gmail.com" /g,
  '<a onContextMenu={(e) => e.stopPropagation()} href="mailto:sleepcalculaters@gmail.com" className="select-text" '
);

// 6. Privacy, Terms, Disclaimer
['Privacy.tsx', 'Terms.tsx', 'Disclaimer.tsx'].forEach(file => {
  replaceInFile(`./src/pages/${file}`,
    /<div className="space-y-/g,
    '<div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-'
  );
});

// App.tsx header logo prevent right click
replaceInFile('./src/App.tsx',
  /<Link to="\/" className="flex items-center gap-2.5 text-gray-900/g,
  '<Link to="/" onContextMenu={(e) => e.preventDefault()} className="flex items-center gap-2.5 text-gray-900'
);

console.log("Applied copy/paste protections");
