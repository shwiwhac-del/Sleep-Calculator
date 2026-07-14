export interface PageSEO {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
}

export const MAIN_PAGES_META: Record<string, PageSEO> = {
  "/": {
    title: "Sleep Calculator | Sleep Cycle, Bedtime & Wake-Up Calculator",
    description: "Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Avoid morning grogginess and wake up completely refreshed.",
    canonicalUrl: "https://sleepcalculater.online/",
    keywords: "sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, 90 minute sleep cycles, REM sleep calculator, bedtime planner, how to wake up refreshed"
  },
  "/blog": {
    title: "Sleep Science Blog & Guides | Sleep Cycles & Bedtime Tips",
    description: "Explore research-backed sleep science guides, sleep hygiene tips, and expert articles on 90-minute sleep cycles, REM sleep, and circadian rhythm health.",
    canonicalUrl: "https://sleepcalculater.online/blog",
    keywords: "sleep science blog, sleep calculator guides, sleep hygiene articles, 90-minute sleep cycle optimization, REM sleep science, circadian rhythm guides, sleep quality research, bedtime calculation tips"
  },
  "/about": {
    title: "About Sleep Calculator | Our Science & Mission",
    description: "Learn about the Sleep Calculator team, our core mission, and the biological research backing our 90-minute sleep cycle and bedtime algorithms.",
    canonicalUrl: "https://sleepcalculater.online/about",
    keywords: "about sleep calculator, sleep cycle research, bedtime algorithm, circadian biology experts, sleep science team"
  },
  "/contact": {
    title: "Contact Sleep Calculator | Support & Feedback",
    description: "Get in touch with the Sleep Calculator team for questions, suggestions, partnership opportunities, or support with our interactive sleep cycle tools.",
    canonicalUrl: "https://sleepcalculater.online/contact",
    keywords: "contact sleep calculator, sleep tool support, sleep calculator feedback, developer partnerships"
  },
  "/privacy": {
    title: "Privacy Policy | Sleep Calculator",
    description: "Read our comprehensive Privacy Policy. Learn how Sleep Calculator handles analytical data, cookie consent, and protects user privacy.",
    canonicalUrl: "https://sleepcalculater.online/privacy",
    keywords: "privacy policy, data collection, cookie policy, sleep calculator analytical data"
  },
  "/terms": {
    title: "Terms and Conditions | Sleep Calculator",
    description: "Review our Terms of Service, health disclaimers, acceptable use guidelines, and liability limits before using Sleep Calculator.",
    canonicalUrl: "https://sleepcalculater.online/terms",
    keywords: "terms and conditions, terms of service, health disclaimer, medical advice disclaimer"
  },
  "/404": {
    title: "Page Not Found | Sleep Calculator",
    description: "The requested page or sleep article cannot be found. Visit our homepage to calculate your sleep cycles, bedtimes, or wake-up alarms.",
    canonicalUrl: "https://sleepcalculater.online/404"
  },
  "/not-found": {
    title: "Page Not Found | Sleep Calculator",
    description: "The requested page or sleep article cannot be found. Visit our homepage to calculate your sleep cycles, bedtimes, or wake-up alarms.",
    canonicalUrl: "https://sleepcalculater.online/not-found"
  },
  "/student-sleep-calculator": {
    title: "Sleep Calculator for Students & Exams | Academic Bedtime Planner",
    description: "Optimize your memory retention, focus, and grades. Use the science-backed sleep cycle calculator for students, teenagers, and school schedules.",
    canonicalUrl: "https://sleepcalculater.online/student-sleep-calculator",
    keywords: "student sleep calculator, sleep calculator for students, exam sleep planner, bedtime calculator for teens, student sleep schedule, study sleep cycle"
  },
  "/shift-work-sleep-calculator": {
    title: "Shift Work Sleep Calculator | Daytime Sleep Routine for Night Shifts",
    description: "Designed specifically for doctors, nurses, and shift workers. Calculate custom daytime sleep blocks, split routines, and circadian alignment schedules.",
    canonicalUrl: "https://sleepcalculater.online/shift-work-sleep-calculator",
    keywords: "shift work sleep calculator, night shift sleep schedule, daytime sleep cycle, split sleep strategy, shift worker bedtime planner, anchor sleep"
  },
  "/sleep-cycle-calculator-90-minutes": {
    title: "90 Minute Sleep Cycle Calculator | Custom Bedtime & Latency",
    description: "Calculate optimal bedtime or wake times based on the scientific 90-minute sleep cycle length. Customize sleep onset latency to get perfect sleep windows.",
    canonicalUrl: "https://sleepcalculater.online/sleep-cycle-calculator-90-minutes",
    keywords: "90 minute sleep calculator, 90 min sleep cycle, sleep cycle length calculator, bedtime latency calculator, calculate sleep cycles"
  },
  "/wake-up-between-sleep-cycles": {
    title: "Wake Up Between Sleep Cycles Calculator | Stop Waking Up Tired",
    description: "Find the exact time to wake up to eliminate morning grogginess. Align your alarm with the end of natural sleep cycles to bypass sleep inertia completely.",
    canonicalUrl: "https://sleepcalculater.online/wake-up-between-sleep-cycles",
    keywords: "wake up between sleep cycles, what time should i wake up, wake up calculator, stop waking up tired, sleep cycle alarm calculator, sleep inertia"
  },
  "/ideal-bedtime-based-on-wake-up-time": {
    title: "Ideal Bedtime Based on Wake Up Time | Age-Specific Calculator",
    description: "Determine what time you should go to sleep if you wake up at a specific hour. Select customized sleep schedules from infancy to old age.",
    canonicalUrl: "https://sleepcalculater.online/ideal-bedtime-based-on-wake-up-time",
    keywords: "ideal bedtime based on wake up time, sleep calculator by age, what time should i go to sleep, bedtime calculator, sleep cycle age brackets"
  }
};

export function getFocusKeywordsForPost(slug: string, title: string, category: string): string {
  const baseKeywords = ["sleep calculator", "sleep cycles", "optimal bedtime", "wake up refreshed"];
  
  // Clean title to extract meaningful keyword phrases
  const cleanedTitleWords = title
    .replace(/[:|&–\-\?]/g, "")
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 4);
    
  // Dynamic list based on category and slug
  const categoryKeywords: Record<string, string[]> = {
    "Sleep Science": ["sleep stages", "REM sleep", "deep sleep science", "ultradian cycles", "sleep physiology"],
    "Sleep Quality": ["improve sleep depth", "restorative sleep", "REM sleep duration", "waking up tired", "sleep quality tips"],
    "Sleep Health": ["healthy sleep duration", "sleep recommendations", "sleep deprivation effects", "how much sleep do I need", "sleep health guidelines"],
    "Circadian Rhythm": ["body clock alignment", "circadian rhythm", "melatonin timing", "natural sleep wake cycle", "biological clock"],
    "Sleep Guide": ["sleep calculation guide", "how to calculate sleep cycles", "bedtime planning", "optimal sleep windows"],
    "Sleep Cycles": ["90 minute sleep formula", "sleep cycles duration", "wake up between cycles", "sleep architecture"],
    "Sleep Hygiene": ["healthy sleep environment", "bedtime routine tips", "sleep hygiene checklist", "falling asleep fast"],
    "Bedtime Routine": ["nighttime relaxation", "ideal bedtime calculator", "bedtime habits", "sleep initiation"],
    "Productivity": ["sleep and focus", "productivity sleep schedule", "cognitive performance sleep", "sleep habits for success"],
    "Health & Wellness": ["sleep and wellbeing", "mental health sleep", "physical recovery sleep", "optimal health sleep duration"],
    "Study & Focus": ["student sleep tips", "exam prep sleep", "brain performance sleep", "cognitive retention sleep"],
    "Memory & Brain": ["sleep and memory consolidation", "neuroscience of sleep", "learning retention sleep", "brain health sleep"]
  };

  const specificKeywords = categoryKeywords[category] || [];
  const slugPhrase = slug.replace(/-/g, " ");

  const allKeywords = new Set([
    ...baseKeywords,
    slugPhrase,
    category.toLowerCase(),
    ...specificKeywords,
    ...cleanedTitleWords.slice(0, 4)
  ]);

  return Array.from(allKeywords).slice(0, 10).join(", ");
}

export const BLOG_POSTS_META: Record<string, { title: string; description: string; date: string; category: string; keywords?: string }> = {
  "sleep-cycles-explained": {
    title: "Sleep Cycles Explained: The Science Behind Better Sleep and Better Mornings",
    description: "Learn how sleep cycles work, how many sleep cycles you need, and how a sleep cycle calculator can help improve sleep quality and morning energy.",
    date: "2026-06-01",
    category: "Sleep Science"
  },
  "what-is-rem-sleep": {
    title: "What Is REM Sleep and Why Is It Important?",
    description: "Learn what REM sleep is, why it matters, how much REM sleep you need, and its role in memory, learning, and overall sleep quality.",
    date: "2026-06-05",
    category: "Sleep Quality"
  },
  "how-much-sleep-do-you-need": {
    title: "How Much Sleep Do You Need? Sleep Recommendations by Age",
    description: "Learn how much sleep you need based on your age, lifestyle, and health. Discover recommended sleep hours and tips for better sleep quality.",
    date: "2026-05-25",
    category: "Sleep Health"
  },
  "best-time-to-sleep-and-wake-up": {
    title: "Best Time to Sleep and Wake Up: A Complete Guide for Better Health",
    description: "Discover the best time to sleep and wake up based on sleep cycles, circadian rhythm, and healthy sleep habits. Improve sleep quality naturally.",
    date: "2026-05-20",
    category: "Circadian Rhythm"
  },
  "sleep-cycle-calculator-guide": {
    title: "Sleep Cycle Calculator Guide: How to Calculate the Best Time to Sleep",
    description: "Learn how a sleep cycle calculator works, how to calculate your ideal bedtime and wake-up time, and why sleep cycles matter for better rest.",
    date: "2026-05-15",
    category: "Sleep Guide"
  },
  "why-90-minute-sleep-cycles-matter": {
    title: "Why 90 Minute Sleep Cycles Matter for Better Sleep and Energy",
    description: "Learn why 90-minute sleep cycles are important, how they affect sleep quality, and how to use them to wake up feeling refreshed.",
    date: "2026-05-10",
    category: "Sleep Cycles"
  },
  "how-to-wake-up-refreshed": {
    title: "How to Wake Up Refreshed: Science-Backed Sleep Tips",
    description: "Learn how to wake up refreshed using sleep cycles, bedtime habits, and a sleep calculator. Improve your morning energy and sleep quality naturally.",
    date: "2026-06-03",
    category: "Sleep Hygiene"
  },
  "ideal-bedtime-for-adults": {
    title: "Ideal Bedtime for Adults: What Time Should You Go to Sleep?",
    description: "Discover the ideal bedtime for adults based on sleep cycles, sleep duration, and circadian rhythm to improve sleep quality and morning energy.",
    date: "2026-04-30",
    category: "Bedtime Routine"
  },
  "sleep-schedule-for-productivity": {
    title: "Sleep Schedule for Productivity: The Best Sleep Routine for Focus and Performance",
    description: "Discover the best sleep schedule for productivity, focus, energy, and mental performance. Learn how sleep habits affect work, study, and daily success.",
    date: "2026-04-25",
    category: "Productivity"
  },
  "how-many-hours-of-sleep-is-healthy": {
    title: "How Many Hours of Sleep Is Healthy? A Complete Guide",
    description: "Learn how many hours of sleep are healthy for adults, teenagers, and children. Discover why sleep duration matters for health and well-being.",
    date: "2026-04-20",
    category: "Health & Wellness"
  },
  "power-nap-vs-full-sleep-cycle": {
    title: "Power Nap vs Full Sleep Cycle: Which Is Better for Energy?",
    description: "Compare power naps and full sleep cycles to discover which option is better for energy, focus, productivity, and overall sleep health.",
    date: "2026-04-15",
    category: "Sleep Science"
  },
  "circadian-rhythm-explained": {
    title: "Circadian Rhythm Explained: How Your Body's Internal Clock Controls Sleep",
    description: "Learn what the circadian rhythm is, how it affects sleep and energy levels, and how to improve your body's natural sleep-wake cycle.",
    date: "2026-04-10",
    category: "Circadian Rhythm"
  },
  "tired-after-8-hours-of-sleep": {
    title: "Why Am I Still Tired After 8 Hours of Sleep? Common Causes and Solutions",
    description: "Wondering why you're still tired after 8 hours of sleep? Learn the common causes of morning fatigue and practical ways to improve sleep quality.",
    date: "2026-04-05",
    category: "Sleep Quality"
  },
  "best-bedtime-for-students": {
    title: "Best Bedtime for Students and Exam Preparation",
    description: "Discover the best bedtime for students, how sleep affects exam performance, memory, concentration, and study effectiveness.",
    date: "2026-04-01",
    category: "Study & Focus"
  },
  "sleep-and-memory": {
    title: "How Sleep Affects Memory and Learning: The Science Behind Better Brain Performance",
    description: "Learn how sleep affects memory, learning, focus, and academic performance. Discover why quality sleep is essential for brain function and knowledge retention.",
    date: "2026-05-05",
    category: "Memory & Brain"
  },
  "sleep-debt-explained": {
    title: "Sleep Debt Explained: What It Is and How to Recover",
    description: "Learn what sleep debt is, how it affects health, productivity, and energy levels, and discover practical ways to recover from lost sleep.",
    date: "2026-05-01",
    category: "Sleep Health"
  },
  "best-wake-up-time": {
    title: "Best Wake Up Time for Maximum Energy and Productivity",
    description: "Discover the best wake up time for maximum energy, productivity, and better sleep health. Learn how sleep cycles and consistency affect your mornings.",
    date: "2026-05-10",
    category: "Sleep Schedule"
  },
  "improve-sleep-quality": {
    title: "How to Improve Sleep Quality Naturally: 12 Proven Tips for Better Sleep",
    description: "Learn how to improve sleep quality naturally with practical sleep tips that help you fall asleep faster and wake up feeling refreshed.",
    date: "2026-05-15",
    category: "Sleep Quality"
  },
  "sleep-hygiene-tips": {
    title: "Sleep Hygiene Tips for Better Sleep: Simple Habits for Restful Nights",
    description: "Discover the best sleep hygiene tips to improve sleep quality, fall asleep faster, and wake up refreshed with healthy sleep habits.",
    date: "2026-05-20",
    category: "Sleep Hygiene"
  },
  "common-sleep-mistakes": {
    title: "Common Sleep Mistakes That Make You Tired Every Day",
    description: "Learn the most common sleep mistakes that cause fatigue and discover how to improve sleep quality, energy levels, and overall health.",
    date: "2026-05-25",
    category: "Sleep Health"
  },
  "fix-irregular-sleep-schedule": {
    title: "How to Fix an Irregular Sleep Schedule and Improve Sleep Quality",
    description: "Learn how to fix an irregular sleep schedule with proven strategies that help improve sleep quality, energy levels, and overall health.",
    date: "2026-05-28",
    category: "Sleep Schedule"
  },
  "consistent-sleep-schedule-benefits": {
    title: "Benefits of Consistent Sleep and Wake Times for Better Health",
    description: "Discover the benefits of consistent sleep and wake times, including improved sleep quality, energy levels, productivity, and overall health.",
    date: "2026-05-30",
    category: "Sleep Schedule"
  },
  "best-temperature-for-sleep": {
    title: "Best Temperature for Sleep: How Room Temp Affects Sleep Quality",
    description: "Learn the optimal room temperature for high-quality sleep, how body temperature affects sleep cycles, and simple tips to cool down your bedroom.",
    date: "2026-06-08",
    category: "Sleep Quality"
  },
  "what-is-deep-sleep": {
    title: "What Is Deep Sleep and Why Does Your Body Need It?",
    description: "Discover what deep sleep is, why it is important, how much deep sleep you need, and ways to improve deep sleep naturally.",
    date: "2026-06-10",
    category: "Sleep Quality"
  },
  "how-long-does-it-take-to-fall-asleep": {
    title: "How Long Does It Take to Fall Asleep? What's Normal?",
    description: "Learn how long it typically takes to fall asleep, factors that affect sleep onset, and tips to fall asleep faster naturally.",
    date: "2026-06-20",
    category: "Sleep Science"
  },
  "why-do-we-dream": {
    title: "Why Do We Dream? Understanding the Science of Dreams",
    description: "Discover why people dream, the role of REM sleep, and what scientists know about dreams and sleep cycles.",
    date: "2026-06-25",
    category: "Sleep Science"
  },
  "why-do-people-snore": {
    title: "Why Do People Snore While Sleeping?",
    description: "Learn what causes snoring, common risk factors, and practical tips that may help reduce snoring during sleep.",
    date: "2026-06-30",
    category: "Sleep Quality"
  },
  "why-am-i-tired-after-sleeping": {
    title: "Why Am I Tired After Sleeping? Common Causes and Practical Solutions",
    description: "Learn why you feel tired after sleeping, what causes morning fatigue, and how sleep cycles, sleep quality, and healthy habits can help you wake up refreshed.",
    date: "2026-06-04",
    category: "Sleep Quality"
  },
  "how-much-sleep-do-you-need-by-age": {
    title: "How Much Sleep Do You Need by Age? Complete Sleep Requirements Chart",
    description: "Discover how much sleep you need by age. Learn recommended sleep durations for babies, children, teens, adults, and seniors.",
    date: "2026-06-12",
    category: "Sleep Science"
  },
  "wake-up-tired-after-8-hours": {
    title: "Why Do I Wake Up Tired After 8 Hours of Sleep?",
    description: "Waking up tired after 8 hours of sleep? Learn the most common causes of morning fatigue and how to improve sleep quality naturally.",
    date: "2026-06-15",
    category: "Sleep Quality"
  },
  "best-bedtime-for-adults": {
    title: "Best Bedtime for Adults Based on Sleep Cycles",
    description: "Discover the best bedtime for adults based on sleep cycles. Learn how sleep timing affects energy, sleep quality, and morning alertness.",
    date: "2026-06-18",
    category: "Sleep Schedule"
  },
  "what-is-sleep-debt": {
    title: "What Is Sleep Debt and Can You Repay It?",
    description: "Learn what sleep debt is, how it affects your health, and whether you can recover lost sleep with better sleep habits.",
    date: "2026-06-22",
    category: "Sleep Quality"
  },
  "sleep-and-memory-learning": {
    title: "How Sleep Affects Memory and Learning",
    description: "Discover how sleep supports memory, learning, and brain performance. Learn why quality sleep is essential for students and professionals.",
    date: "2026-06-28",
    category: "Sleep Science"
  },
  "sleep-calculator-by-age": {
    title: "Sleep Calculator by Age: How Much Sleep Do You Really Need?",
    description: "Use a sleep calculator by age to find your ideal sleep duration. Learn how much sleep children, teens, adults, and seniors need for better health.",
    date: "2026-07-02",
    category: "Sleep Statistics"
  },
  "90-minute-sleep-calculator": {
    title: "90 Minute Sleep Calculator: Find the Best Time to Sleep and Wake Up",
    description: "Use a 90 minute sleep calculator to plan your bedtime and wake-up time around natural sleep cycles for better sleep quality and energy.",
    date: "2026-07-05",
    category: "Sleep Science"
  },
  "best-sleep-schedule-for-productivity": {
    title: "Best Sleep Schedule for Maximum Productivity and Better Focus",
    description: "Discover the best sleep schedule for productivity, focus, and energy. Learn how sleep cycles, bedtime routines, and sleep calculators can improve performance.",
    date: "2026-06-04",
    category: "Productivity"
  },
  "sleep-calculator-for-students": {
    title: "Sleep Calculator for Students: Peak Exam Focus & Bedtimes",
    description: "Discover how a student sleep calculator improves exam performance, focus, and memory through 90-minute sleep cycles and planned bedtimes.",
    date: "2026-06-04",
    category: "Productivity"
  },
  "rem-sleep-calculator-bedtime-cycles": {
    title: "REM Sleep Calculator: How to Calculate Bedtime Using Sleep Cycles",
    description: "Learn how to use a REM sleep calculator to calculate your optimum bedtime. Maximize restorative REM sleep, align sleep cycles, and wake up refreshed.",
    date: "2026-06-11",
    category: "Sleep Science"
  },
  "sleep-deprivation-calculator-recovery-guide": {
    title: "Sleep Deprivation Calculator: How to Calculate Sleep Debt & Recovery Hours",
    description: "Calculate your cumulative sleep debt with our sleep deprivation calculator. Learn how much recovery sleep you need and how to safely repay lost sleep hours.",
    date: "2026-06-11",
    category: "Sleep Health"
  },
  "bedtime-calculator-by-age": {
    title: "Bedtime Calculator by Age: Sleep Schedules for Every Stage of Life",
    description: "Use our science-backed bedtime calculator by age to determine the ideal sleep window and age-specific sleep cycle targets from childhood to older adulthood.",
    date: "2026-06-11",
    category: "Sleep Science"
  },
  "shift-work-sleep-calculator-guide": {
    title: "Shift Work Sleep Calculator: How to Design a Healthy Night Shift Sleep Schedule",
    description: "Learn how a shift work sleep calculator helps night shift workers align daytime sleep with circadian rhythms. Fix daytime fatigue and sleeping patterns.",
    date: "2026-06-11",
    category: "Sleep Health"
  },
  "adhd-sleep-schedule-calculator-tips": {
    title: "ADHD Sleep Schedule Calculator: Calm Your Mind and Build a Consistent Routine",
    description: "Struggling with sleep onset and ADHD? Learn how an ADHD sleep schedule calculator can help you design consistency, reduce evening anxiety, and feel refreshed.",
    date: "2026-06-11",
    category: "Productivity"
  },
  "sleep-calculator-for-exams": {
    title: "Sleep Calculator for Exams: Peak Test Day Bedtimes",
    description: "Calculate your perfect bedtime before a major exam. See why sleep cycle planning outperforms late-night cramming for better grade recall and focus.",
    date: "2026-06-16",
    category: "Study & Focus"
  },
  "sleep-calculator-for-night-shift-workers": {
    title: "Sleep Calculator for Night Shift Workers: Day Rest Schedules",
    description: "Optimize night shift sleep schedules using a sleep cycle calculator. Master anchor sleep blocks, split routines, and circadian alignment.",
    date: "2026-06-16",
    category: "Sleep Health"
  },
  "what-time-should-i-sleep-if-i-wake-up-at-6-am": {
    title: "What Time to Sleep If You Wake Up at 6 AM: Optimal Bedtimes",
    description: "Discover the best times to sleep if you wake up at 6 AM. Use the 90-minute sleep cycle calculator to wake up refreshed and fully alert.",
    date: "2026-06-18",
    category: "Sleep Schedule"
  },
  "best-bedtime-calculator-for-students": {
    title: "Best Bedtime Calculator for Students: Peak Brain Performance Guide",
    description: "Align your exam prep with your biological clock. Find the perfect bedtime calculator for students, teenagers, and school schedules using 90-minute cycle rules.",
    date: "2026-06-18",
    category: "Study & Focus"
  },
  "nap-calculator-20-30-60-90-minutes": {
    title: "Nap Calculator: 20, 30, 60, 90 Minute Rest Cycles",
    description: "Calculate the exact duration for power naps and full sleep cycle naps. Optimize brain focus and cognitive alert states without fatigue.",
    date: "2026-06-18",
    category: "Sleep Science"
  }
};

// Clean 301 SEO redirects mapping (redirect legacy dynamic params, trailing slashes, duplicates)
export const BLOG_REDIRECTS: Record<string, string> = {
  "how-much-sleep-do-you-need-by-age": "how-much-sleep-do-you-need",
  "wake-up-tired-after-8-hours": "tired-after-8-hours-of-sleep",
  "best-bedtime-for-adults": "ideal-bedtime-for-adults",
  "what-is-sleep-debt": "sleep-debt-explained",
  "sleep-and-memory-learning": "sleep-and-memory",
  "sleep-calculator-by-age": "how-much-sleep-do-you-need",
  "best-sleep-schedule-for-productivity": "sleep-schedule-for-productivity"
};
