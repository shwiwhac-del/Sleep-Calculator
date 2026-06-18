export interface PageSEO {
  title: string;
  description: string;
  canonicalUrl: string;
}

export const MAIN_PAGES_META: Record<string, PageSEO> = {
  "/": {
    title: "Sleep Calculator – Calculate Bedtime & Wake Up Times",
    description: "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles. Wake up refreshed, avoid morning grogginess, and improve your sleep quality.",
    canonicalUrl: "https://sleepcalculater.online/"
  },
  "/about": {
    title: "About Sleep Calculator – Sleep Cycle & Bedtime Tool",
    description: "Learn about the Sleep Calculator team, our core mission, and the scientific research behind our 90-minute sleep cycle and bedtime calculation algorithms.",
    canonicalUrl: "https://sleepcalculater.online/about"
  },
  "/contact": {
    title: "Contact Sleep Calculator – Support & Questions",
    description: "Contact the Sleep Calculator support and media team for feedback, feature requests, partnership inquiries, or general questions about our sleep cycle tools.",
    canonicalUrl: "https://sleepcalculater.online/contact"
  },
  "/privacy": {
    title: "Privacy Policy – Sleep Calculator",
    description: "Read the Sleep Calculator Privacy Policy. Learn about our commitment to data privacy, how we manage cookie policies, and protect user analytical data safely.",
    canonicalUrl: "https://sleepcalculater.online/privacy"
  },
  "/terms": {
    title: "Terms and Conditions – Sleep Calculator",
    description: "Review the Terms and Conditions of Sleep Calculator. Read our terms of service, acceptable usage guidelines, liability limitations, and health disclaimers.",
    canonicalUrl: "https://sleepcalculater.online/terms"
  },
  "/404": {
    title: "404 Page Not Found – Sleep Calculator",
    description: "The requested sleep calculator guide, resource, or article could not be located. Calculate your optimal bedtime and wake-up times on our homepage.",
    canonicalUrl: "https://sleepcalculater.online/404"
  },
  "/not-found": {
    title: "404 Page Not Found – Sleep Calculator",
    description: "The requested sleep calculator guide, resource, or article could not be located. Calculate your optimal bedtime and wake-up times on our homepage.",
    canonicalUrl: "https://sleepcalculater.online/not-found"
  },
  "/student-sleep-calculator": {
    title: "Sleep Calculator for Students – Optimize Your Exam Bedtime",
    description: "Use our interactive sleep calculator for students, teenagers, and kids to schedule bedtimes for exams, high school schedules, and toddlers.",
    canonicalUrl: "https://sleepcalculater.online/student-sleep-calculator"
  },
  "/shift-work-sleep-calculator": {
    title: "Sleep Calculator for Night Shift Workers – Day Sleep Schedule",
    description: "Calculate sleep cycles for night shifts. Optimize diurnal sleep, split schedules, and anchors blocks with our interactive sleep calculator for shift workers.",
    canonicalUrl: "https://sleepcalculater.online/shift-work-sleep-calculator"
  },
  "/sleep-cycle-calculator-90-minutes": {
    title: "Sleep Cycle Calculator 90 Minutes – Calculate Cycles & Bedtime",
    description: "Calculate sleep cycles based on the 90-minute formula. Adjust custom cycle lengths and fall asleep latency with our interactive sleep cycle calculator.",
    canonicalUrl: "https://sleepcalculater.online/sleep-cycle-calculator-90-minutes"
  },
  "/wake-up-between-sleep-cycles": {
    title: "Wake Up Between Sleep Cycles Calculator – Morning Refreshment",
    description: "Learn how to wake up between sleep cycles to conquer morning grogginess. Calculate exact bedtime and alarm times with our interactive refresh calculator.",
    canonicalUrl: "https://sleepcalculater.online/wake-up-between-sleep-cycles"
  },
  "/ideal-bedtime-based-on-wake-up-time": {
    title: "Ideal Bedtime Based on Wake Up Time – Custom Age Calculator",
    description: "Calculate your ideal bedtime based on your wake up time. Select customized settings for adults, babies, toddlers, and teenagers using sleep cycle calculators.",
    canonicalUrl: "https://sleepcalculater.online/ideal-bedtime-based-on-wake-up-time"
  }
};

export const BLOG_POSTS_META: Record<string, { title: string; description: string; date: string; category: string }> = {
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
    title: "How to Wake Up Refreshed Every Morning: Science-Backed Sleep Tips That Actually Work",
    description: "Learn how to wake up refreshed every morning using sleep cycles, better bedtime habits, and a sleep calculator. Improve energy, focus, and sleep quality naturally.",
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
    title: "Best Temperature for Sleep: How Ambient Temperature Affects Sleep Quality",
    description: "Learn the optimal room temperature for high-quality sleep, how body temperature influences sleep cycles, and practical tips to cool down your bedroom naturally.",
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
    title: "Sleep Calculator for Students: Improve Focus, Memory, and Exam Performance",
    description: "Discover how a sleep calculator can help students improve focus, memory, productivity, and exam performance through better sleep habits and sleep cycle planning.",
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
    title: "Sleep Calculator for Exams: Optimize Bedtime for Peak Test Day Performance",
    description: "Calculate your perfect bedtime the night before a major exam. Discover why sleep cycle planning outperforms late-night cramming for GPA scores and cognitive recall.",
    date: "2026-06-16",
    category: "Study & Focus"
  },
  "sleep-calculator-for-night-shift-workers": {
    title: "Sleep Calculator for Night Shift Workers: Aligning Daytime Rest with Circadian Rhythms",
    description: "Master shift-work sleep schedules using a sleep cycle calculator for night shifts. Learn anchor sleep blocks, split routines, and dark bedroom setups to defeat fatigue.",
    date: "2026-06-16",
    category: "Sleep Health"
  },
  "what-time-should-i-sleep-if-i-wake-up-at-6-am": {
    title: "What Time Should I Sleep If I Wake Up at 6 AM? Optimal Sleep Schedules",
    description: "Discover the best times to sleep if you need to wake up at 6 AM. Use the natural 90-minute sleep cycle calculator to wake up full of energy, alert, and refreshed.",
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
    title: "Nap Calculator: 20, 30, 60, 90 Minutes Rest Cycles",
    description: "Calculate the exact duration for power naps, recovery naps, and full sleep cycle naps. Optimize brain focus and cognitive alert states without post-nap grogginess.",
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
