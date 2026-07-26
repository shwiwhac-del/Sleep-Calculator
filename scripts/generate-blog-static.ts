import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import fs from 'fs';
import path from 'path';

import { BLOG_POSTS_META } from '../src/blogMetadata';
import Blog from '../src/pages/Blog';

// Crucial: Set global flag so the Blog component renders its full JSX content during pre-rendering
(global as any).IS_STATIC_GEN = true;

console.log("Starting build-time HTML pre-rendering of blog posts...");

const preRendered: Record<string, string> = {};

// We pre-render all blog slugs to ensure static SEO coverage is 100% complete so no blank fallbacks happen
const activeSlugs = Object.keys(BLOG_POSTS_META);

// Ensure public/blog-html folder exists
const publicBlogDir = path.resolve('./public/blog-html');
if (!fs.existsSync(publicBlogDir)) {
  fs.mkdirSync(publicBlogDir, { recursive: true });
}

for (const slug of activeSlugs) {
  try {
    const helmetContext = {};
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          MemoryRouter,
          { initialEntries: [`/${slug}`] },
          React.createElement(
            Routes,
            null,
            React.createElement(Route, { path: "/:slug", element: React.createElement(Blog) })
          )
        )
      )
    );
    
    preRendered[slug] = html;
    
    // Extract only the inner <article> tag contents so the client loads only the pure article body
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    let articleHtml = "";
    if (articleMatch) {
      articleHtml = articleMatch[0];
    } else {
      articleHtml = html; // Fallback to full HTML if article tag is missing
    }

    // Write individual static files to public dir for high performance browser routing
    fs.writeFileSync(
      path.join(publicBlogDir, `${slug}.json`),
      JSON.stringify({ html: articleHtml })
    );

    console.log(`[SSR Pre-render] Successfully generated content for: ${slug} (${articleHtml.length} characters)`);
  } catch (error) {
    console.error(`[SSR Pre-render] Failed to generate content for: ${slug}:`, error);
  }
}

const outDir = path.resolve('./src');
fs.writeFileSync(path.join(outDir, 'blog-pre-rendered.json'), JSON.stringify(preRendered, null, 2));
console.log("Successfully generated src/blog-pre-rendered.json and public/blog-html static JSONs.");
