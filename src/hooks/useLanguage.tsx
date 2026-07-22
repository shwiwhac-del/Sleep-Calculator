import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageCode, isValidLanguage } from '../locales';

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
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [detectedLang, setDetectedLang] = useState<LanguageCode | null>(null);
  const [showDetectionToast, setShowDetectionToast] = useState<boolean>(false);

  // Detect current language from pathname segment
  const pathParts = location.pathname.split('/');
  const firstSegment = pathParts[1];
  
  const currentLang: LanguageCode = isValidLanguage(firstSegment) ? firstSegment : 'en';

  // Safe typed nested key accessor with English fallback
  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    
    // Attempt localized translation
    let val: any = TRANSLATIONS[currentLang];
    let found = true;
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        found = false;
        break;
      }
    }

    if (found && typeof val === 'string') {
      return val;
    }

    // Fallback to English (fallback language)
    let fallbackVal: any = TRANSLATIONS['en'];
    for (const k of keys) {
      if (fallbackVal && typeof fallbackVal === 'object' && k in fallbackVal) {
        fallbackVal = fallbackVal[k];
      } else {
        return keyPath;
      }
    }

    return typeof fallbackVal === 'string' ? fallbackVal : keyPath;
  };

  // Helper to append language prefix to client routing paths
  const getLocalizedPath = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (currentLang === 'en') {
      return cleanPath;
    }
    // Don't duplicate prefix if it already has it
    if (cleanPath.startsWith(`/${currentLang}/`) || cleanPath === `/${currentLang}`) {
      return cleanPath;
    }
    return `/${currentLang}${cleanPath === '/' ? '' : cleanPath}`;
  };

  // Safe language transition handler preserving current sub-route
  const changeLanguage = (newLang: LanguageCode) => {
    localStorage.setItem('sleep_calc_lang', newLang);
    localStorage.setItem('sleep_calc_lang_detected', 'true');

    // Extract the page path without the current language prefix
    let cleanPath = location.pathname;
    if (cleanPath.startsWith(`/${currentLang}/`)) {
      cleanPath = cleanPath.substring(currentLang.length + 1);
    } else if (cleanPath === `/${currentLang}`) {
      cleanPath = '/';
    }

    const nextPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    if (newLang === 'en') {
      navigate(nextPath);
    } else {
      navigate(`/${newLang}${nextPath === '/' ? '' : nextPath}`);
    }
  };

  // Automatic browser language detection on first visit
  useEffect(() => {
    const hasDetected = localStorage.getItem('sleep_calc_lang_detected');
    
    if (!hasDetected) {
      // Collect candidate browser languages
      const rawBrowserLangs = navigator.languages
        ? Array.from(navigator.languages)
        : [navigator.language || (navigator as any).userLanguage || ''];

      let matchedLang: LanguageCode | null = null;
      for (const langStr of rawBrowserLangs) {
        if (!langStr) continue;
        const code = langStr.split('-')[0].toLowerCase();
        if (isValidLanguage(code) && code !== 'en') {
          matchedLang = code as LanguageCode;
          break;
        }
      }

      localStorage.setItem('sleep_calc_lang_detected', 'true');

      if (matchedLang) {
        localStorage.setItem('sleep_calc_lang', matchedLang);
        setDetectedLang(matchedLang);
        setShowDetectionToast(true);

        // Automatically switch language state & path if not already on it
        if (currentLang !== matchedLang) {
          let cleanPath = location.pathname;
          if (cleanPath.startsWith(`/${currentLang}/`)) {
            cleanPath = cleanPath.substring(currentLang.length + 1);
          } else if (cleanPath === `/${currentLang}`) {
            cleanPath = '/';
          }
          const nextPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
          navigate(`/${matchedLang}${nextPath === '/' ? '' : nextPath}`, { replace: true });
        }
      } else {
        localStorage.setItem('sleep_calc_lang', 'en');
      }
    } else if (isValidLanguage(firstSegment)) {
      // If user directly landed on a localized page, save it as their preference
      localStorage.setItem('sleep_calc_lang_detected', 'true');
      localStorage.setItem('sleep_calc_lang', firstSegment);
    }
  }, [location.pathname, firstSegment, navigate, currentLang]);

  const confirmLanguage = () => {
    if (detectedLang) {
      localStorage.setItem('sleep_calc_lang', detectedLang);
    }
    localStorage.setItem('sleep_calc_lang_detected', 'true');
    setShowDetectionToast(false);
  };

  const revertToEnglish = () => {
    changeLanguage('en');
    setShowDetectionToast(false);
  };

  const dismissToast = () => {
    setShowDetectionToast(false);
  };

  const detectionToast: DetectionToastState = {
    show: showDetectionToast,
    detectedLang,
    confirmLanguage,
    revertToEnglish,
    dismissToast,
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

