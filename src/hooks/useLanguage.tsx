import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageCode, isValidLanguage } from '../locales';

interface LanguageContextProps {
  currentLang: LanguageCode;
  t: (keyPath: string) => string;
  getLocalizedPath: (path: string) => string;
  changeLanguage: (lang: LanguageCode) => void;
  languages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

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
    
    // Only detect language on the default root path and if not already detected/saved
    if (!hasDetected && location.pathname === '/') {
      const browserLang = (navigator.language || (navigator as any).userLanguage || '').split('-')[0];
      
      localStorage.setItem('sleep_calc_lang_detected', 'true');
      
      if (isValidLanguage(browserLang) && browserLang !== 'en') {
        localStorage.setItem('sleep_calc_lang', browserLang);
        navigate(`/${browserLang}`);
      } else {
        localStorage.setItem('sleep_calc_lang', 'en');
      }
    } else if (isValidLanguage(firstSegment)) {
      // If user directly landed on a localized page, save it as their preference
      localStorage.setItem('sleep_calc_lang_detected', 'true');
      localStorage.setItem('sleep_calc_lang', firstSegment);
    }
  }, [location.pathname, firstSegment, navigate]);

  return (
    <LanguageContext.Provider value={{ currentLang, t, getLocalizedPath, changeLanguage, languages: SUPPORTED_LANGUAGES }}>
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
