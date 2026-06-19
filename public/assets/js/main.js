/**
 * Sleep Calculator - Core App JS Bootstrapper
 */

console.log("Welcome to Sleep Calculator! Initializing client-side optimization frameworks...");

// Progressive Web App Service Worker Registry
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('ServiceWorker registered successfully:', reg.scope))
      .catch(err => console.error('ServiceWorker registration failed:', err));
  });
}
