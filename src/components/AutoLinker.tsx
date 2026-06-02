import React from 'react';
import { Link } from 'react-router-dom';

// Keyword mapping list, sorted by length descending to match longer phrases first
const CROSS_LINKS = [
  // 35+ Characters
  { keyword: 'how long did i sleep for calculator', path: '/' },
  { keyword: 'sleep calculator how much sleep did i get', path: '/' },
  { keyword: 'sleep calculator how much sleep do i need', path: '/' },
  { keyword: 'am i getting enough sleep calculator', path: '/' },
  { keyword: 'best bedtime for adults calculator', path: '/best-bedtime-for-adults' },
  { keyword: 'sleep calculator with age and gender', path: '/sleep-calculator-by-age' },
  { keyword: 'sleep calculator based on wake up time', path: '/' },
  { keyword: 'average hours of sleep calculator', path: '/' },
  { keyword: 'how long does it take to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: '90 minute interval sleep calculator', path: '/90-minute-sleep-calculator' },
  { keyword: 'sleep calculator by age and gender', path: '/sleep-calculator-by-age' },
  { keyword: 'how much sleep do you need by age', path: '/how-much-sleep-do-you-need-by-age' },
  { keyword: 'sleep cycle calculator 90 minutes', path: '/90-minute-sleep-calculator' },
  { keyword: '90 minute cycle sleep calculator', path: '/90-minute-sleep-calculator' },
  { keyword: 'sleep calculator by age and weight', path: '/sleep-calculator-by-age' },
  { keyword: 'best time to go to sleep calculator', path: '/' },
  { keyword: 'epworth sleep score calculator', path: '/' },
  { keyword: 'free sleep calculator by age', path: '/sleep-calculator-by-age' },
  { keyword: 'how much sleep should i get calculator', path: '/' },
  { keyword: 'how much sleep will i get calculator', path: '/' },
  { keyword: 'sleep calculator how long did i sleep', path: '/' },
  { keyword: 'sleep calculator hours 90 minutes', path: '/90-minute-sleep-calculator' },
  { keyword: 'circadian rhythm sleep calculator', path: '/' },
  { keyword: 'waking up tired after 8 hours', path: '/wake-up-tired-after-8-hours' },
  { keyword: 'sleep hours calculator by age', path: '/sleep-calculator-by-age' },
  { keyword: 'sleep requirement calculator', path: '/sleep-calculator-by-age' },
  { keyword: 'total hours of sleep calculator', path: '/' },
  { keyword: 'get 8 hours of sleep calculator', path: '/' },
  { keyword: 'sleep calculator when to wake up', path: '/' },
  { keyword: 'sleep calculator when to go to sleep', path: '/' },

  // 25-34 Characters
  { keyword: 'sleepopolis sleep calculator', path: '/' },
  { keyword: 'rem cycle sleep calculator', path: '/90-minute-sleep-calculator' },
  { keyword: 'sleep calculator app online', path: '/' },
  { keyword: 'wake up tired after 8 hours', path: '/wake-up-tired-after-8-hours' },
  { keyword: 'sleep calculator 90 minutes', path: '/90-minute-sleep-calculator' },
  { keyword: '90 minute sleep calculator', path: '/90-minute-sleep-calculator' },
  { keyword: 'sleep requirements by age', path: '/how-much-sleep-do-you-need-by-age' },
  { keyword: 'sleep duration calculator', path: '/' },
  { keyword: 'optimal room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep calculator by age', path: '/sleep-calculator-by-age' },
  { keyword: 'best bedtime for adults', path: '/best-bedtime-for-adults' },
  { keyword: 'sleep calculator online', path: '/' },
  { keyword: 'accumulated sleep debt', path: '/what-is-sleep-debt' },
  { keyword: 'sleep cycle calculator', path: '/' },
  { keyword: '90-minute sleep cycle', path: '/90-minute-sleep-calculator' },
  { keyword: '90 minute sleep cycle', path: '/90-minute-sleep-calculator' },
  { keyword: 'bedroom temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep calculator tool', path: '/' },
  { keyword: 'sleep time calculator', path: '/' },
  { keyword: 'sleep calculator age', path: '/sleep-calculator-by-age' },
  { keyword: 'age sleep calculator', path: '/sleep-calculator-by-age' },
  { keyword: 'takes to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'sleep planning tool', path: '/' },
  { keyword: 'tired after 8 hours', path: '/wake-up-tired-after-8-hours' },
  { keyword: 'memory and learning', path: '/sleep-and-memory-learning' },
  { keyword: 'time to fall asleep', path: '/how-long-does-it-take-to-fall-asleep' },
  { keyword: 'bedtime calculator', path: '/' },
  { keyword: 'wake-up calculator', path: '/' },
  { keyword: 'sleep needs by age', path: '/sleep-calculator-by-age' },
  { keyword: 'sleep chart by age', path: '/how-much-sleep-do-you-need-by-age' },
  { keyword: 'recover lost sleep', path: '/what-is-sleep-debt' },
  { keyword: 'causes of snoring', path: '/why-do-people-snore' },
  { keyword: 'science of dreams', path: '/why-do-we-dream' },
  { keyword: 'sleep and memory', path: '/sleep-and-memory-learning' },
  { keyword: 'circadian rhythm', path: '/circadian-rhythm-explained' },
  { keyword: 'biological clock', path: '/circadian-rhythm-explained' },
  { keyword: 'sleep efficiency', path: '/improve-sleep-quality' },
  { keyword: 'room temperature', path: '/best-temperature-for-sleep' },
  { keyword: 'sleep for memory', path: '/sleep-and-memory-learning' },
  { keyword: 'brain and memory', path: '/sleep-and-memory-learning' },
  { keyword: 'sleep calculator app free', path: '/' },
  { keyword: 'sleep calculator accurate', path: '/' },
  { keyword: 'sleep calculator app iphone', path: '/' },
  { keyword: 'accurate sleep calculator', path: '/' },
  { keyword: 'sleep calculator bedtime', path: '/' },
  { keyword: 'best sleep calculator app', path: '/' },
  { keyword: 'best sleep calculator', path: '/' },
  { keyword: 'best time to sleep calculator', path: '/' },
  { keyword: 'sleep calculator cycle', path: '/' },
  { keyword: 'cycle sleep calculator', path: '/' },
  { keyword: 'deep sleep calculator', path: '/what-is-deep-sleep' },
  { keyword: 'daily sleep calculator', path: '/' },
  { keyword: 'rem sleep calculator', path: '/90-minute-sleep-calculator' },
  { keyword: '8 hours of sleep calculator', path: '/' },
  { keyword: '7 hours of sleep calculator', path: '/' },
  { keyword: '9 hours of sleep calculator', path: '/' },
  { keyword: 'sleep calculator cycles', path: '/' },
  { keyword: 'sleep calculator wake up time', path: '/' },
  { keyword: 'sleep calculator time to wake up', path: '/' },

  // Remaining useful key phrases (14-24 Characters)
  { keyword: 'nectar sleep calculator', path: '/' },
  { keyword: 'hillarys sleep calculator', path: '/' },
  { keyword: 'jet lag sleep calculator', path: '/' },
  { keyword: 'hour sleep calculator', path: '/' },
  { keyword: 'sleep calculator app', path: '/' },
  { keyword: 'sleep calculator alarm', path: '/' },
  { keyword: 'amount of sleep calculator', path: '/' },
  { keyword: 'average sleep calculator', path: '/' },
  { keyword: 'sleep calculator', path: '/' },
  { keyword: 'sleep estimator', path: '/' },
  { keyword: 'why do we dream', path: '/why-do-we-dream' },
  { keyword: 'morning routine', path: '/how-to-wake-up-refreshed' },
  { keyword: 'sleep assistant', path: '/' },
  { keyword: 'nap calculator', path: '/' },
  { keyword: 'sleep duration', path: '/how-many-hours-of-sleep-is-healthy' },
  { keyword: 'sleep recovery', path: '/sleep-debt-explained' },
  { keyword: 'sleep patterns', path: '/circadian-rhythm-explained' },
  { keyword: 'reduce snoring', path: '/why-do-people-snore' },
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
  { keyword: 'stop snoring', path: '/why-do-people-snore' },
  { keyword: 'light sleep', path: '/sleep-cycles-explained' },
  { keyword: 'sleep cycle', path: '/sleep-cycles-explained' },
  { keyword: 'sleep hours', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep guide', path: '/sleep-cycle-calculator-guide' },
  { keyword: 'night sleep', path: '/how-much-sleep-do-you-need' },
  { keyword: 'sleep debt', path: '/what-is-sleep-debt' },
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

function autoLink(children: React.ReactNode, currentPath: string): React.ReactNode {
  if (children === null || children === undefined) {
    return null;
  }

  if (typeof children === 'string') {
    const parsed = autoLinkText(children, currentPath);
    return parsed.length === 1 && typeof parsed[0] === 'string' ? parsed[0] : parsed;
  }

  if (typeof children === 'number' || typeof children === 'boolean') {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child) => autoLink(child, currentPath));
  }

  if (React.isValidElement(children)) {
    const type = children.type;
    const typeName = typeof type === 'string' ? type : (type as any)?.name || (type as any)?.displayName || '';

    // Ignore tags that shouldn't be parsed (links, buttons, SVGs, Helmet, etc.)
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
      const clonedChildren = autoLink(children.props.children, currentPath);
      return React.cloneElement(children as React.ReactElement<any>, {}, clonedChildren);
    }
    return children;
  }

  return children;
}

export function AutoLinker({ children, currentPath }: { children: React.ReactNode; currentPath: string }): React.ReactNode {
  return <>{autoLink(children, currentPath)}</>;
}
