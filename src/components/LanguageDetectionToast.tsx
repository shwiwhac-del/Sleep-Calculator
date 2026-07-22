import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { useBrowserLanguageDetector } from '../hooks/useLanguage';
import { SUPPORTED_LANGUAGES } from '../locales';

const TOAST_TRANSLATIONS: Record<string, {
  title: (langName: string, flag: string) => string;
  message: (langName: string) => string;
  keep: (langName: string) => string;
  switchBack: string;
}> = {
  en: {
    title: (lang, flag) => `Language set to ${lang} ${flag}`,
    message: (lang) => `We detected your browser is in ${lang} and updated the app for you. Would you like to stay in ${lang}?`,
    keep: (lang) => `Keep ${lang}`,
    switchBack: 'Switch to English',
  },
  es: {
    title: (lang, flag) => `Idioma cambiado a ${lang} ${flag}`,
    message: (lang) => `Detectamos que tu navegador está en ${lang} y actualizamos la aplicación. ¿Quieres mantener este idioma?`,
    keep: (lang) => `Mantener ${lang}`,
    switchBack: 'Cambiar a Inglés',
  },
  pt: {
    title: (lang, flag) => `Idioma alterado para ${lang} ${flag}`,
    message: (lang) => `Detetámos que o seu navegador está em ${lang} e atualizámos a aplicação. Quer manter este idioma?`,
    keep: (lang) => `Manter ${lang}`,
    switchBack: 'Mudar para Inglês',
  },
  fr: {
    title: (lang, flag) => `Langue passée en ${lang} ${flag}`,
    message: (lang) => `Nous avons détecté que votre navigateur est en ${lang} et avons mis à jour l'application. Souhaitez-vous la conserver ?`,
    keep: (lang) => `Garder le ${lang}`,
    switchBack: 'Passer en Anglais',
  },
  de: {
    title: (lang, flag) => `Sprache auf ${lang} eingestellt ${flag}`,
    message: (lang) => `Wir haben erkannt, dass Ihr Browser auf ${lang} eingestellt ist, und die App für Sie angepasst. Möchten Sie diese Sprache beibehalten?`,
    keep: (lang) => `${lang} behalten`,
    switchBack: 'Zu Englisch wechseln',
  },
  it: {
    title: (lang, flag) => `Lingua impostata su ${lang} ${flag}`,
    message: (lang) => `Abbiamo rilevato che il tuo browser è in ${lang} e abbiamo aggiornato l'app. Vuoi mantenere questa lingua?`,
    keep: (lang) => `Mantieni ${lang}`,
    switchBack: "Passa all'Inglese",
  },
  nl: {
    title: (lang, flag) => `Taal ingesteld op ${lang} ${flag}`,
    message: (lang) => `We hebben gemerkt dat uw browser is ingesteld op ${lang} en de app voor u aangepast. Wilt u deze taal behouden?`,
    keep: (lang) => `${lang} behouden`,
    switchBack: 'Omschakelen naar Engels',
  },
  tr: {
    title: (lang, flag) => `Dil ${lang} olarak ayarlandı ${flag}`,
    message: (lang) => `Tarayıcınızın ${lang} dilinde olduğunu tespit ettik ve uygulamayı sizin için güncelledik. Bu dilde kalmak ister misiniz?`,
    keep: (lang) => `${lang} Kalsın`,
    switchBack: 'İngilizceye Geç',
  },
  id: {
    title: (lang, flag) => `Bahasa diubah ke ${lang} ${flag}`,
    message: (lang) => `Kami mendeteksi peramban Anda menggunakan ${lang} dan memperbarui aplikasi untuk Anda. Ingin tetap menggunakan bahasa ini?`,
    keep: (lang) => `Tetap ${lang}`,
    switchBack: 'Ke Bahasa Inggris',
  },
  vi: {
    title: (lang, flag) => `Đã chuyển sang ${lang} ${flag}`,
    message: (lang) => `Chúng tôi phát hiện trình duyệt của bạn dùng ${lang} và đã cập nhật ứng dụng. Bạn có muốn giữ ngôn ngữ này không?`,
    keep: (lang) => `Giữ ${lang}`,
    switchBack: 'Đổi sang Tiếng Anh',
  },
  pl: {
    title: (lang, flag) => `Język zmieniony na ${lang} ${flag}`,
    message: (lang) => `Wykryliśmy, że Twoja przeglądarka używa języka ${lang} i zaktualizowaliśmy aplikację. Czy chcesz zachować ten język?`,
    keep: (lang) => `Zostaw ${lang}`,
    switchBack: 'Przełącz na angielski',
  },
};

export function LanguageDetectionToast() {
  const {
    show,
    detectedLang,
    currentLang,
    confirmLanguage,
    revertToEnglish,
    dismissToast,
  } = useBrowserLanguageDetector();

  if (!show || !detectedLang) return null;

  const targetLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === detectedLang) || {
    name: detectedLang,
    flag: '🌐',
  };

  const activeLangKey = currentLang in TOAST_TRANSLATIONS ? currentLang : 'en';
  const copy = TOAST_TRANSLATIONS[activeLangKey] || TOAST_TRANSLATIONS['en'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 max-w-md w-[calc(100%-2rem)] sm:w-[420px]"
        role="alert"
        aria-live="polite"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#151C2C]/95 backdrop-blur-md border-2 border-[#7C3AED]/30 dark:border-violet-500/30 p-5 shadow-2xl shadow-[#7C3AED]/15 text-[#111827] dark:text-slate-100">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-violet-400 to-[#D4AF37]" />

          {/* Close button */}
          <button
            onClick={dismissToast}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-xl text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none cursor-pointer"
            aria-label="Close notification"
            title="Close"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            <div className="flex-shrink-0 p-2.5 rounded-xl bg-[#7C3AED]/10 dark:bg-violet-500/20 text-[#7C3AED] dark:text-violet-400">
              <Globe size={22} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] dark:text-violet-400 inline-flex items-center gap-1 font-mono">
                  <Sparkles size={12} /> Auto-Detected
                </span>
              </div>
              <h4 className="text-base font-extrabold font-serif leading-snug">
                {copy.title(targetLangMeta.name, targetLangMeta.flag)}
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 font-medium leading-relaxed pt-0.5">
                {copy.message(targetLangMeta.name)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB]/80 dark:border-[#1E293B] flex items-center justify-end gap-2.5">
            <button
              onClick={revertToEnglish}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#4B5563] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              {copy.switchBack}
            </button>

            <button
              onClick={confirmLanguage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-md shadow-[#7C3AED]/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Check size={14} />
              {copy.keep(targetLangMeta.name)}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
