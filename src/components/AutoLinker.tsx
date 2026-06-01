import React from 'react';
import { Link } from 'react-router-dom';

// Keyword mapping list, sorted by length descending to match longer phrases first
const CROSS_LINKS = [
  { keyword: 'sleep calculator app online', path: '/' },
  { keyword: 'sleep calculator online', path: '/' },
  { keyword: 'sleep calculator tool', path: '/' },
  { keyword: 'sleep duration calculator', path: '/' },
  { keyword: 'sleep cycle calculator', path: '/' },
  { keyword: 'sleep time calculator', path: '/' },
  { keyword: 'sleep planning tool', path: '/' },
  { keyword: 'sleep schedule', path: '/sleep-schedule-for-productivity' },
  { keyword: 'sleep tracker', path: '/' },
  { keyword: 'sleep planner', path: '/' },
  { keyword: 'optimal sleep', path: '/best-time-to-sleep-and-wake-up' },
  { keyword: 'healthy sleep', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep patterns', path: '/circadian-rhythm-explained' },
  { keyword: 'circadian rhythm', path: '/circadian-rhythm-explained' },
  { keyword: 'biological clock', path: '/circadian-rhythm-explained' },
  { keyword: 'morning routine', path: '/how-to-wake-up-refreshed' },
  { keyword: 'sleep efficiency', path: '/improve-sleep-quality' },
  { keyword: 'sleep estimator', path: '/' },
  { keyword: 'nap calculator', path: '/' },
  { keyword: 'sleep assistant', path: '/' },
  { keyword: 'sleep recovery', path: '/sleep-debt-explained' },
  { keyword: 'sleep routine', path: '/sleep-hygiene-tips' },
  { keyword: 'sleep science', path: '/sleep-cycles-explained' },
  { keyword: 'sleep timing', path: '/best-time-to-sleep-and-wake-up' },
  { keyword: 'sleep stages', path: '/sleep-cycles-explained' },
  { keyword: 'sleep health', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep habits', path: '/sleep-hygiene-tips' },
  { keyword: 'sleep advice', path: '/sleep-hygiene-tips' },
  { keyword: 'light sleep', path: '/sleep-cycles-explained' },
  { keyword: 'deep sleep', path: '/what-is-deep-sleep' },
  { keyword: 'power nap', path: '/power-nap-vs-full-sleep-cycle' },
  { keyword: 'wake time', path: '/best-wake-up-time' },
  { keyword: 'night sleep', path: '/how-much-sleep-do-you-need' },
  { keyword: 'optimal room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'bedroom temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep cycles', path: '/sleep-cycles-explained' },
  { keyword: 'sleep cycle', path: '/sleep-cycles-explained' },
  { keyword: 'sleep hours', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep duration', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep quality', path: '/improve-sleep-quality' },
  { keyword: 'sleep guide', path: '/sleep-cycle-calculator-guide' },
  { keyword: 'sleep helper', path: '/' },
  { keyword: 'rem sleep', path: '/what-is-rem-sleep' },
  { keyword: 'sleep tips', path: '/sleep-hygiene-tips' },
  { keyword: 'best sleep', path: '/improve-sleep-quality' },
  { keyword: 'bedtime', path: '/ideal-bedtime-for-adults' },
];

function autoLinkText(text: string, currentPath: string): React.ReactNode[] {
  if (!text) return [];

  // Filter out cross-links where the path matches the current path to prevent circular/self links
  const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const activeLinks = CROSS_LINKS.filter(
    (link) => link.path !== normalizedCurrentPath && link.path !== currentPath
  );

  let earliestMatch: { keyword: string; index: number; path: string } | null = null;

  for (const link of activeLinks) {
    const idx = text.toLowerCase().indexOf(link.keyword.toLowerCase());
    if (idx !== -1) {
      if (!earliestMatch || idx < earliestMatch.index || (idx === earliestMatch.index && link.keyword.length > earliestMatch.keyword.length)) {
        earliestMatch = { keyword: link.keyword, index: idx, path: link.path };
      }
    }
  }

  if (earliestMatch) {
    const { keyword, index, path } = earliestMatch;
    const prefix = text.substring(0, index);
    const matchedWord = text.substring(index, index + keyword.length);
    const suffix = text.substring(index + keyword.length);

    const parts: React.ReactNode[] = [];
    if (prefix) {
      parts.push(prefix);
    }
    parts.push(
      <Link
        key={`${path}-${index}`}
        to={path}
        className="text-blue-400 hover:text-blue-350 underline transition-colors"
      >
        {matchedWord}
      </Link>
    );
    if (suffix) {
      parts.push(...autoLinkText(suffix, currentPath));
    }
    return parts;
  }

  return [text];
}

export function AutoLinker({ children, currentPath }: { children: React.ReactNode; currentPath: string }): React.ReactNode {
  if (children === null || children === undefined) {
    return null;
  }

  if (typeof children === 'string') {
    return <>{autoLinkText(children, currentPath)}</>;
  }

  if (typeof children === 'number' || typeof children === 'boolean') {
    return <>{children}</>;
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, idx) => (
          <React.Fragment key={idx}>
            <AutoLinker currentPath={currentPath}>
              {child}
            </AutoLinker>
          </React.Fragment>
        ))}
      </>
    );
  }

  if (React.isValidElement(children)) {
    // Avoid scanning inside anchor links and react-router links to prevent nested Links
    const typeName = typeof children.type === 'string' ? children.type : (children.type as any)?.name || '';
    if (typeName === 'a' || typeName === 'Link' || typeName === 'Link2' || (children.props as any)?.to) {
      return children;
    }

    if (children.props && children.props.children) {
      const clonedChildren = (
        <AutoLinker currentPath={currentPath}>
          {children.props.children}
        </AutoLinker>
      );
      return React.cloneElement(children as React.ReactElement<any>, {}, clonedChildren);
    }
    return children;
  }

  return children as React.ReactNode;
}
