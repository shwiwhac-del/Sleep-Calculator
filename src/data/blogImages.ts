// Curated, high-resolution imagery mapping for sleep science blog topics
// Used to create a human-curated magazine visual aesthetic in blog listings.

const BLOG_IMAGE_MAP: Record<string, { url: string; alt: string }> = {
  'sleep-cycles-explained': {
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    alt: 'Peaceful bedroom with soft linen and dim warm lighting'
  },
  'what-is-rem-sleep': {
    url: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene night sky with starlight representing deep dream state'
  },
  'how-much-sleep-do-you-need': {
    url: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=800&q=80',
    alt: 'Minimalist bedside clock showing time for rest'
  },
  'best-time-to-sleep-and-wake-up': {
    url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    alt: 'Golden morning sunlight filtering into a cozy bedroom'
  },
  'sleep-cycle-calculator-guide': {
    url: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
    alt: 'Nightstand with journal and peaceful sleep environment'
  },
  'why-90-minute-sleep-cycles-matter': {
    url: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=800&q=80',
    alt: 'Restful bedding with white pillows and comfortable sheets'
  },
  'how-to-wake-up-refreshed': {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    alt: 'Morning light stretching symbolizing energy and vitality'
  },
  'ideal-bedtime-for-adults': {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    alt: 'Cozy night bedroom with warm bedside lamp glow'
  },
  'sleep-schedule-for-productivity': {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    alt: 'Clean morning study desk with coffee cup and open notebook'
  },
  'how-many-hours-of-sleep-is-healthy': {
    url: 'https://images.unsplash.com/photo-1512290900673-04e38933b91d?auto=format&fit=crop&w=800&q=80',
    alt: 'Person sleeping undisturbed under a cozy blanket'
  },
  'power-nap-vs-full-sleep-cycle': {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    alt: 'Short relaxing nap in a comfortable armchair'
  },
  'circadian-rhythm-explained': {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    alt: 'Golden hour horizon illustrating natural circadian light cycle'
  },
  'tired-after-8-hours-of-sleep': {
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    alt: 'Morning alarm clock on bedside table next to pillow'
  },
  'best-bedtime-for-students': {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    alt: 'Focused student workspace with textbook and natural daylight'
  },
  'sleep-and-memory': {
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    alt: 'Quiet library study table representing memory consolidation'
  },
  'sleep-debt-explained': {
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    alt: 'Late night ambient room setting showing rest deficit'
  },
  'best-wake-up-time': {
    url: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=800&q=80',
    alt: 'Early morning nature landscape with fresh crisp air'
  },
  'improve-sleep-quality': {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene spa-like bedroom environment with greenery and calm colors'
  },
  'sleep-hygiene-tips': {
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    alt: 'Orderly, clean bedroom sanctuary promoting healthy sleep habits'
  },
  'common-sleep-mistakes': {
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    alt: 'Smartphone screen glowing in a dark room before sleep'
  },
  'fix-irregular-sleep-schedule': {
    url: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?auto=format&fit=crop&w=800&q=80',
    alt: 'Desk calendar and clock planning out a structured sleep schedule'
  },
  'consistent-sleep-schedule-benefits': {
    url: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80',
    alt: 'Morning mug of tea in sunny room representing consistent routine'
  },
  'best-temperature-for-sleep': {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    alt: 'Cool, minimalist bedroom interior with fresh air breezes'
  },
  'what-is-deep-sleep': {
    url: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80',
    alt: 'Deep blue calm evening sky reflecting restorative sleep'
  },
  'why-am-i-tired-after-sleeping': {
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    alt: 'Morning alarm clock resting on nightstand'
  }
};

const CATEGORY_IMAGE_MAP: Record<string, { url: string; alt: string }> = {
  'Sleep Science': {
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    alt: 'Scientific sleep research and rest analysis'
  },
  'Sleep Quality': {
    url: 'https://images.unsplash.com/photo-1512290900673-04e38933b91d?auto=format&fit=crop&w=800&q=80',
    alt: 'Restful, high quality sleep in comfortable bed'
  },
  'Sleep Health': {
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    alt: 'Healthy lifestyle and bedroom environment'
  },
  'Circadian Rhythm': {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    alt: 'Natural sunlight and biological clock alignment'
  },
  'Productivity': {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh morning focus and productivity desk'
  },
  'Study & Focus': {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    alt: 'Student study workspace with natural lighting'
  }
};

export function getBlogPostImage(slug: string, category?: string): { url: string; alt: string } {
  if (BLOG_IMAGE_MAP[slug]) {
    return BLOG_IMAGE_MAP[slug];
  }

  if (category && CATEGORY_IMAGE_MAP[category]) {
    return CATEGORY_IMAGE_MAP[category];
  }

  // General fallback
  return {
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    alt: 'Sleep science and cycle optimization guide'
  };
}
