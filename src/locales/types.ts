export interface TranslationSchema {
  common: {
    calculate: string;
    reset: string;
    back: string;
    hours: string;
    minutes: string;
    am: string;
    pm: string;
    themeLight: string;
    themeDark: string;
    shareBtn: string;
    copied: string;
    ratingExc: string;
    ratingGood: string;
    ratingCaution: string;
    recalibrateBtn: string;
    excellentRange: string;
    goodRange: string;
    cautionRange: string;
    recalibrateTitle: string;
    recalibrateText: string;
    backToCalc: string;
    readArticle: string;
    tryTool: string;
    feedbackBtn: string;
    closeBtn: string;
    allRightsReserved: string;
  };
  nav: {
    home: string;
    calculators: string;
    blog: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    selectorTitle: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    modeWake: string;
    modeBed: string;
    modeCycles: string;
    modeNap: string;
    modeRem: string;
    ageGroupLabel: string;
    latencyLabel: string;
    latencyDesc: string;
    rememberPref: string;
    resultsTitle: string;
    resultsDesc: string;
    bedtimeLabel: string;
    wakeTimeLabel: string;
    bedTimeOptionHeader: string;
    wakeTimeOptionHeader: string;
    optimumBedtimeMsg: string;
    optimumWakeMsg: string;
    sleepCyclesDesc: string;
    deepSleepDesc: string;
    remSleepDesc: string;
    lightSleepDesc: string;
    latencyShorthand: string;
    scoreLabel: string;
    ratingLabel: string;
    durationLabel: string;
  };
  calculators: {
    student: {
      title: string;
      subtitle: string;
      examTitle: string;
      studyDays: string;
      calcDays: string;
      memoryTip: string;
    };
    shiftwork: {
      title: string;
      subtitle: string;
      shiftTiming: string;
      sleepBlockTitle: string;
      anchorSleep: string;
      dayTransition: string;
    };
    ninetyMin: {
      title: string;
      subtitle: string;
      cycleCount: string;
      totalSleep: string;
    };
    wakeUp: {
      title: string;
      subtitle: string;
      inertiaTip: string;
    };
    idealBedtime: {
      title: string;
      subtitle: string;
      ageCalc: string;
    };
  };
  blog: {
    toc: string;
    takeaways: string;
    takeawaysTitle1: string;
    takeawaysText1: string;
    takeawaysTitle2: string;
    takeawaysText2: string;
    takeawaysTitle3: string;
    takeawaysText3: string;
    takeawaysTitle4: string;
    takeawaysText4: string;
    prosConsTitle: string;
    prosConsDesc: string;
    colMetric: string;
    colCalc: string;
    colWearable: string;
    rowCost: string;
    rowCostCalc: string;
    rowCostWearable: string;
    rowComfort: string;
    rowComfortCalc: string;
    rowComfortWearable: string;
    rowPlan: string;
    rowPlanCalc: string;
    rowPlanWearable: string;
    rowHeart: string;
    rowHeartCalc: string;
    rowHeartWearable: string;
    prosTitle: string;
    prosList: string[];
    consTitle: string;
    consList: string[];
    faqTitle: string;
    faqText: string;
    conclusionTitle: string;
    conclusionText: string;
    postAuthors: string;
    blogIndexTitle: string;
    blogIndexSub: string;
  };
  pages: {
    about: {
      title: string;
      subtitle: string;
      cardTitle: string;
      cardBody: string;
      p1: string;
      p2: string;
    };
    contact: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      message: string;
      send: string;
      success: string;
    };
    terms: {
      title: string;
      subtitle: string;
      text: string;
    };
    privacy: {
      title: string;
      subtitle: string;
      text: string;
    };
  };
  seo: Record<string, {
    title: string;
    description: string;
    keywords?: string;
  }>;
}
