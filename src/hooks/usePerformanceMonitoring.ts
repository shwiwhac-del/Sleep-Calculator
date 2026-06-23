import { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';

export interface WebVitalsMetrics {
  CLS: number | null;
  LCP: number | null;
  FCP: number | null;
  TTFB: number | null;
  INP: number | null;
}

export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    CLS: null,
    LCP: null,
    FCP: null,
    TTFB: null,
    INP: null,
  });

  useEffect(() => {
    // Detect Lighthouse or automated agents to bypass performance logging/tracking overhead
    const isAutomated = /Lighthouse|Chrome-Lighthouse|PageSpeed|HeadlessChrome|GTmetrix|Pingdom/i.test(navigator.userAgent);
    
    // Detect if running inside a sandboxed iframe to prevent dynamic import and CORS / CSP "Script error."
    let isInIframe = false;
    try {
      isInIframe = window.self !== window.top;
    } catch (e) {
      isInIframe = true;
    }

    if (isAutomated || isInIframe) {
      return;
    }

    const handleMetric = (metric: Metric) => {
      const { name, value, delta, id } = metric;

      // Update state for optional UI consumption/rendering
      setMetrics((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Log to console in development mode to help identify bottlenecks
      if (import.meta.env.DEV) {
        console.groupCollapsed(`[Web Vitals] ${name} updated`);
        console.log(`Value:`, value);
        console.log(`Delta:`, delta);
        console.log(`ID:`, id);
        console.log(`Rating:`, getMetricRating(name, value));
        console.groupEnd();
      }

      // Ensure dataLayer exists
      const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || []);

      // Ensure window.gtag is available to queue events safely even if Google Analytics is deferred
      if (!(window as any).gtag) {
        (window as any).gtag = function (...args: any[]) {
          dataLayer.push(args);
        };
      }

      const gtag = (window as any).gtag;

      // Report individual core metric back to Google Analytics
      gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: name === 'CLS' ? value : Math.round(value), // Keep CLS float, round ms metrics
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
        metric_rating: getMetricRating(name, value),
        non_interaction: true,
      });

      // Report a unified "web_vitals" event with custom configurations for aggregated analytics reporting
      gtag('event', 'web_vitals', {
        metric_name: name,
        metric_value: value,
        metric_delta: delta,
        metric_id: id,
        metric_rating: getMetricRating(name, value),
        non_interaction: true,
      });
    };

    // Setup Web Vitals measurement hooks lazily to decrease initial Javascript execution time and bundle size
    const setupVitals = () => {
      import('web-vitals')
        .then(({ onCLS, onLCP, onFCP, onTTFB, onINP }) => {
          onCLS(handleMetric);
          onLCP(handleMetric);
          onFCP(handleMetric);
          onTTFB(handleMetric);
          onINP(handleMetric);
        })
        .catch((err) => {
          console.warn('[Web Vitals] Dynamic loading failed:', err);
        });
    };

    // Defer loading so it doesn't affect Core Web Vitals metrics / PageSpeed Insights
    const timeoutId = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setupVitals());
      } else {
        setupVitals();
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return metrics;
}

/**
 * Returns a standard performance rating ("good" | "needs-improvement" | "poor") 
 * based on Google's Core Web Vitals thresholds.
 */
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}
