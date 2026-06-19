/**
 * Sleep Calculator - Core Analytics & Google Tag Tracker Hook
 */

(function() {
  const GA_TRACKING_ID = "G-P8BDPG7GZZ"; // Real analytics ID used for this domain 

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
})();
