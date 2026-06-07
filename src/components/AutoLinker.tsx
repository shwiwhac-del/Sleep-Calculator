import React from 'react';
import { Link } from 'react-router-dom';

// Keyword mapping list, sorted by length descending to match longer phrases first
// Points exclusively to unique canonical posts (merged duplicates)
const CROSS_LINKS = [
  // 40+ Characters
  { keyword: 'sleep calculator how much sleep did i get', path: '/' },
  { keyword: 'sleep calculator how much sleep do i need', path: '/' },

  // 35-39 Characters
  { keyword: 'how much sleep should i get calculator', path: '/' },
  { keyword: 'sleep calculator based on wake up time', path: '/' },
  { keyword: 'sleep calculator how long did i sleep', path: '/' },
  { keyword: 'sleep calculator when to go to sleep', path: '/' },
  { keyword: 'how much sleep will i get calculator', path: '/' },
  { keyword: 'how long does it take to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'sleep calculator with age and gender', path: '/how-much-sleep-do-you-need' },
  { keyword: 'am i getting enough sleep calculator', path: '/' },
  { keyword: 'best sleep routine for productivity', path: '/sleep-schedule-for-productivity' },
  { keyword: 'best time to go to sleep calculator', path: '/' },
  { keyword: '90 minute interval sleep calculator', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'how long did i sleep for calculator', path: '/' },

  // 30-34 Characters
  { keyword: 'why 90 minute sleep cycles matter', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator by age and weight', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep calculator by age and gender', path: '/how-much-sleep-do-you-need' },
  { keyword: 'best bedtime for adults calculator', path: '/ideal-bedtime-for-adults' },
  { keyword: 'sleep cycle calculator 90 minutes', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'how much sleep do you need by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep calculator hours 90 minutes', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'circadian rhythm sleep calculator', path: '/' },
  { keyword: 'average hours of sleep calculator', path: '/' },
  { keyword: 'sleep calculator time to wake up', path: '/' },
  { keyword: '90 minute cycle sleep calculator', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator when to wake up', path: '/' },
  { keyword: 'total hours of sleep calculator', path: '/' },
  { keyword: 'get 8 hours of sleep calculator', path: '/' },
  { keyword: 'fix an irregular sleep schedule', path: '/fix-irregular-sleep-schedule' },
  { keyword: 'sleep schedule for productivity', path: '/sleep-schedule-for-productivity' },
  { keyword: 'consistent sleep and wake times', path: '/consistent-sleep-schedule-benefits' },
  { keyword: 'best time to sleep and wake up', path: '/best-time-to-sleep-and-wake-up' },
  { keyword: 'sleep routine for productivity', path: '/sleep-schedule-for-productivity' },
  { keyword: 'epworth sleep score calculator', path: '/' },

  // 25-29 Characters
  { keyword: 'best time to sleep calculator', path: '/' },
  { keyword: 'sleep calculator wake up time', path: '/' },
  { keyword: 'sleep habits for productivity', path: '/sleep-schedule-for-productivity' },
  { keyword: 'waking up tired after 8 hours', path: '/tired-after-8-hours-of-sleep' },
  { keyword: 'sleep hours calculator by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'free sleep calculator by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep requirement calculator', path: '/how-much-sleep-do-you-need' },
  { keyword: '90-minute sleep cycle matter', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep cycle calculator guide', path: '/sleep-cycle-calculator-guide' },
  { keyword: 'sleepopolis sleep calculator', path: '/' },
  { keyword: 'rem cycle sleep calculator', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator app online', path: '/' },
  { keyword: 'how much sleep should i get', path: '/how-much-sleep-do-you-need' },
  { keyword: 'how much sleep do you need', path: '/how-much-sleep-do-you-need' },
  { keyword: 'wake up tired after 8 hours', path: '/tired-after-8-hours-of-sleep' },
  { keyword: 'sleep calculator 90 minutes', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator app iphone', path: '/' },
  { keyword: '8 hours of sleep calculator', path: '/' },
  { keyword: '7 hours of sleep calculator', path: '/' },
  { keyword: '9 hours of sleep calculator', path: '/' },
  { keyword: 'amount of sleep calculator', path: '/' },
  { keyword: 'best bedtime for students', path: '/best-bedtime-for-students' },
  { keyword: 'consistent sleep schedule', path: '/consistent-sleep-schedule-benefits' },
  { keyword: '90 minute sleep calculator', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep requirements by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep duration calculator', path: '/' },
  { keyword: 'sleep calculator app free', path: '/' },
  { keyword: 'sleep calculator accurate', path: '/' },
  { keyword: 'accurate sleep calculator', path: '/' },
  { keyword: 'best sleep calculator app', path: '/' },
  { keyword: 'hillarys sleep calculator', path: '/' },

  // 20-24 Characters
  { keyword: 'optimal room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep calculator by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'best bedtime for adults', path: '/ideal-bedtime-for-adults' },
  { keyword: 'irregular sleep patterns', path: '/fix-irregular-sleep-schedule' },
  { keyword: 'irregular sleep schedule', path: '/fix-irregular-sleep-schedule' },
  { keyword: 'jet lag sleep calculator', path: '/' },
  { keyword: 'average sleep calculator', path: '/' },
  { keyword: 'sleep calculator online', path: '/' },
  { keyword: 'accumulated sleep debt', path: '/sleep-debt-explained' },
  { keyword: 'consistent wake up time', path: '/consistent-sleep-schedule-benefits' },
  { keyword: 'sleep calculator bedtime', path: '/' },
  { keyword: 'sleep calculator cycles', path: '/' },
  { keyword: 'nectar sleep calculator', path: '/' },
  { keyword: '90-minute sleep cycles', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: '90 minute sleep cycles', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'student sleep schedule', path: '/best-bedtime-for-students' },
  { keyword: 'sleep and productivity', path: '/sleep-schedule-for-productivity' },
  { keyword: 'sleep cycle calculator', path: '/' },
  { keyword: 'sleep calculator cycle', path: '/' },
  { keyword: 'cycle sleep calculator', path: '/' },
  { keyword: 'daily sleep calculator', path: '/' },
  { keyword: 'sleep calculator alarm', path: '/' },
  { keyword: '90-minute sleep cycle', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator tool', path: '/' },
  { keyword: 'sleep time calculator', path: '/' },
  { keyword: 'best sleep calculator', path: '/' },
  { keyword: 'common sleep mistakes', path: '/common-sleep-mistakes' },
  { keyword: 'hour sleep calculator', path: '/' },
  { keyword: '90 minute sleep cycle', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'takes to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'rem sleep calculator', path: '/why-90-minute-sleep-cycles-matter' },
  { keyword: 'sleep calculator app', path: '/' },

  // 15-19 Characters
  { keyword: 'bedroom temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'age sleep calculator', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep planning tool', path: '/' },
  { keyword: 'tired after 8 hours', path: '/tired-after-8-hours-of-sleep' },
  { keyword: 'memory and learning', path: '/sleep-and-memory' },
  { keyword: 'time to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'bedtime calculator', path: '/' },
  { keyword: 'wake-up calculator', path: '/' },
  { keyword: 'fix sleep schedule', path: '/fix-irregular-sleep-schedule' },
  { keyword: 'sleep for students', path: '/best-bedtime-for-students' },
  { keyword: 'sleep needs by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep chart by age', path: '/how-much-sleep-do-you-need' },
  { keyword: 'recover lost sleep', path: '/sleep-debt-explained' },
  { keyword: 'causes of snoring', path: '/why-do-people-snore' },
  { keyword: 'science of dreams', path: '/why-do-we-dream' },
  { keyword: 'best wake up time', path: '/best-wake-up-time' },
  { keyword: 'best wake-up time', path: '/best-wake-up-time' },
  { keyword: 'sleep and memory', path: '/sleep-and-memory' },
  { keyword: 'circadian rhythm', path: '/circadian-rhythm-explained' },
  { keyword: 'biological clock', path: '/circadian-rhythm-explained' },
  { keyword: 'sleep efficiency', path: '/improve-sleep-quality' },
  { keyword: 'room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep for memory', path: '/sleep-and-memory' },
  { keyword: 'brain and memory', path: '/sleep-and-memory' },
  { keyword: 'sleep calculator', path: '/' },
  { keyword: 'sleep estimator', path: '/' },
  { keyword: 'why do we dream', path: '/why-do-we-dream' },
  { keyword: 'morning routine', path: '/how-to-wake-up-refreshed' },
  { keyword: 'sleep assistant', path: '/' },

  // Remaining key phrases (Under 15 Characters)
  { keyword: 'nap calculator', path: '/' },
  { keyword: 'sleep duration', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep recovery', path: '/sleep-debt-explained' },
  { keyword: 'sleep patterns', path: '/circadian-rhythm-explained' },
  { keyword: 'reduce snoring', path: '/why-do-people-snore' },
  { keyword: 'sleep mistakes', path: '/common-sleep-mistakes' },
  { keyword: 'sleep latency', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'sleep tracker', path: '/' },
  { keyword: 'sleep planner', path: '/' },
  { keyword: 'optimal sleep', path: '/best-time-to-sleep-and-wake-up' },
  { keyword: 'healthy sleep', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep routine', path: '/sleep-hygiene-tips' },
  { keyword: 'sleep science', path: '/sleep-cycles-explained' },
  { keyword: 'sleep quality', path: '/improve-sleep-quality' },
  { keyword: 'sleep helper', path: '/' },
  { keyword: 'sleep timing', path: '/best-time-to-sleep-and-wake-up' },
  { keyword: 'sleep cycles', path: '/sleep-cycles-explained' },
  { keyword: 'sleep health', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep habits', path: '/sleep-hygiene-tips' },
  { keyword: 'sleep advice', path: '/sleep-hygiene-tips' },
  { keyword: 'wake up time', path: '/best-wake-up-time' },
  { keyword: 'stop snoring', path: '/why-do-people-snore' },
  { keyword: 'light sleep', path: '/sleep-cycles-explained' },
  { keyword: 'sleep cycle', path: '/sleep-cycles-explained' },
  { keyword: 'sleep hours', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep guide', path: '/sleep-cycle-calculator-guide' },
  { keyword: 'night sleep', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep debt', path: '/sleep-debt-explained' },
  { keyword: 'calculator', path: '/' },
  { keyword: 'deep sleep', path: '/what-is-deep-sleep' },
  { keyword: 'sleep tips', path: '/sleep-hygiene-tips' },
  { keyword: 'best sleep', path: '/improve-sleep-quality' },
  { keyword: 'power nap', path: '/power-nap-vs-full-sleep-cycle' },
  { keyword: 'wake time', path: '/best-wake-up-time' },
  { keyword: 'rem sleep', path: '/what-is-rem-sleep' },
  { keyword: 'dreaming', path: '/why-do-we-dream' },
  { keyword: 'snoring', path: '/why-do-people-snore' },
  { keyword: 'bedtime', path: '/ideal-bedtime-for-adults' },
  { keyword: 'dreams', path: '/why-do-we-dream' }
];

function autoLinkText(text: string, currentPath: string, linkedPaths: Set<string>): React.ReactNode[] {
  if (!text) return [];

  // Filter out cross-links where the path matches the current path to prevent circular/self links,
  // and also filter out paths that have already been matched in this block for beautiful, clutter-free linking.
  const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const activeLinks = CROSS_LINKS.filter(
    (link) => link.path !== normalizedCurrentPath && link.path !== currentPath && !linkedPaths.has(link.path)
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
    
    // Mark this path as linked so we don't link it again in the current context
    linkedPaths.add(path);

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
        className="text-[#7C3AED] hover:text-[#6D28D9] dark:text-[#a78bfa] dark:hover:text-[#c084fc] underline transition-colors"
      >
        {matchedWord}
      </Link>
    );
    if (suffix) {
      parts.push(...autoLinkText(suffix, currentPath, linkedPaths));
    }
    return parts;
  }

  return [text];
}

function autoLink(children: React.ReactNode, currentPath: string, linkedPaths: Set<string>): React.ReactNode {
  if (children === null || children === undefined) {
    return null;
  }

  if (typeof children === 'string') {
    const parsed = autoLinkText(children, currentPath, linkedPaths);
    if (parsed.length === 1 && typeof parsed[0] === 'string') {
      return parsed[0];
    }
    return React.Children.toArray(parsed);
  }

  if (typeof children === 'number' || typeof children === 'boolean') {
    return children;
  }

  if (Array.isArray(children)) {
    const processed = children.map((child) => autoLink(child, currentPath, linkedPaths));
    return React.Children.toArray(processed);
  }

  if (React.isValidElement(children)) {
    const type = children.type;
    const typeName = typeof type === 'string' ? type : (type as any)?.name || (type as any)?.displayName || '';

    // Ignore tags that shouldn't be parsed
    if (
      typeName === 'svg' ||
      typeName === 'path' ||
      typeName === 'Helmet' ||
      typeName === 'Link' ||
      typeName === 'Link2' ||
      typeName === 'a' ||
      typeName === 'button' ||
      (children.props as any)?.to
    ) {
      return children;
    }

    if (children.props && children.props.children) {
      const clonedChildren = autoLink(children.props.children, currentPath, linkedPaths);
      const safeChildren = Array.isArray(clonedChildren)
        ? React.Children.toArray(clonedChildren)
        : clonedChildren;
      return React.cloneElement(children as React.ReactElement<any>, { key: children.key }, safeChildren);
    }
    return children;
  }

  return children;
}

export function AutoLinker({ children, currentPath }: { children: React.ReactNode; currentPath: string }): React.ReactNode {
  // Fresh Set created per page to track and avoid linking the same page route multiple times
  const linkedPaths = new Set<string>();
  return <>{autoLink(children, currentPath, linkedPaths)}</>;
}
