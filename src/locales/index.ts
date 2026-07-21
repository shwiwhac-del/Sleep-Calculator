import en from './en.json';
import es from './es.json';
import pt from './pt.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';
import nl from './nl.json';
import tr from './tr.json';
import id from './id.json';
import vi from './vi.json';
import pl from './pl.json';
import { TranslationSchema } from './types';

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  en: en as unknown as TranslationSchema,
  es: es as unknown as TranslationSchema,
  pt: pt as unknown as TranslationSchema,
  fr: fr as unknown as TranslationSchema,
  de: de as unknown as TranslationSchema,
  it: it as unknown as TranslationSchema,
  nl: nl as unknown as TranslationSchema,
  tr: tr as unknown as TranslationSchema,
  id: id as unknown as TranslationSchema,
  vi: vi as unknown as TranslationSchema,
  pl: pl as unknown as TranslationSchema,
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];

export type LanguageCode = keyof typeof TRANSLATIONS;

export function isValidLanguage(lang: string): lang is LanguageCode {
  return lang in TRANSLATIONS;
}
