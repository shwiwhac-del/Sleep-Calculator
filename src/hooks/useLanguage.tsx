import React, { createContext, useContext, ReactNode } from 'react';

export type LanguageCode = 'en';

export const SUPPORTED_LANGUAGES = [
  { code: 'en' as LanguageCode, name: 'English', flag: '🇬🇧' },
];

const EN_DICTIONARY: Record<string, any> = {
  common: {
    calculate: "Calculate",
    reset: "Reset",
    back: "Back",
    hours: "Hours",
    minutes: "Minutes",
    am: "AM",
    pm: "PM",
    themeLight: "Light",
    themeDark: "Dark",
    shareBtn: "Share",
    copied: "Copied!",
    ratingExc: "Excellent",
    ratingGood: "Good",
    ratingCaution: "Caution",
    recalibrateBtn: "Recalibrate",
    excellentRange: "7.5 - 9.0 hrs",
    goodRange: "6.0 - 7.5 hrs",
    cautionRange: "< 6.0 hrs",
    recalibrateTitle: "Recalibrate Schedule",
    recalibrateText: "Recalibrate your sleep target",
    backToCalc: "Back to Sleep Calculator",
    readArticle: "Read Guide",
    tryTool: "Try Tool",
    feedbackBtn: "Feedback",
    closeBtn: "Close",
    allRightsReserved: "All rights reserved."
  },
  nav: {
    home: "Home",
    calculators: "Calculators",
    blog: "Sleep Education",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    selectorTitle: "Select Language"
  },
  home: {
    heroTitle: "Sleep Calculator",
    heroSubtitle: "Waking up at the end of a complete sleep cycle instead of mid-cycle can help you feel more refreshed and improve your overall sleep quality. Simply choose your bedtime or wake-up time, enter the required details, and click Calculate. The calculator will instantly determine the best bedtime or wake-up time based on the optimal number of complete sleep cycles."
  },
  calculators: {
    student: {
      title: "Student Sleep Calculator",
      subtitle: "Optimize memory retention and exam performance with tailored study-sleep schedules."
    },
    shiftwork: {
      title: "Shift Work Sleep Calculator",
      subtitle: "Designed for night shift workers and rotating schedules."
    },
    ninetyMin: {
      title: "90-Minute Sleep Calculator",
      subtitle: "Calculate bedtimes based on exact 90-minute sleep cycles."
    },
    wakeUp: {
      title: "Wake Up Between Cycles",
      subtitle: "Stop waking up tired by targeting light sleep transitions."
    },
    idealBedtime: {
      title: "Ideal Bedtime Calculator",
      subtitle: "Find your ideal bedtime based on your wake-up time and age group."
    }
  },
  blog: {
    blogIndexTitle: "Sleep Education",
    blogIndexSub: "Sleep science articles & educational guides"
  }
};

export interface DetectionToastState {
  show: boolean;
  detectedLang: LanguageCode | null;
  confirmLanguage: () => void;
  revertToEnglish: () => void;
  dismissToast: () => void;
}

interface LanguageContextProps {
  currentLang: LanguageCode;
  t: (keyPath: string) => string;
  getLocalizedPath: (path: string) => string;
  changeLanguage: (lang: LanguageCode) => void;
  languages: typeof SUPPORTED_LANGUAGES;
  detectionToast: DetectionToastState;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const currentLang: LanguageCode = 'en';

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let val: any = EN_DICTIONARY;
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        return keyPath;
      }
    }
    return typeof val === 'string' ? val : keyPath;
  };

  const getLocalizedPath = (path: string): string => {
    return path.startsWith('/') ? path : `/${path}`;
  };

  const changeLanguage = (_newLang: LanguageCode) => {};

  const detectionToast: DetectionToastState = {
    show: false,
    detectedLang: null,
    confirmLanguage: () => {},
    revertToEnglish: () => {},
    dismissToast: () => {},
  };

  return (
    <LanguageContext.Provider value={{ currentLang, t, getLocalizedPath, changeLanguage, languages: SUPPORTED_LANGUAGES, detectionToast }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useBrowserLanguageDetector() {
  const { detectionToast, currentLang, changeLanguage, languages } = useLanguage();
  return {
    ...detectionToast,
    currentLang,
    changeLanguage,
    languages,
  };
}


