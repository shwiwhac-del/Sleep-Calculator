import { useState, useEffect, MouseEvent } from 'react';
import { Download, X, Share, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);

  useEffect(() => {
    // Detect if already installed/running as PWA
    const checkStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(checkStandalone);

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser's default bar
      e.preventDefault();
      // Cache the event
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show custom install floating UI
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If it's an iOS device and not running standalone, we can prompt them to install manually
    if (isIosDevice && !checkStandalone) {
      // Check if they dismissed the iOS prompt in this session
      const iosDismissed = sessionStorage.getItem('ios-pwa-dismissed');
      if (!iosDismissed) {
        // Show install button for iOS as well 
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show browser's installation prompt
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('App successfully installed!');
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      // Show tooltip explaining how to install on iOS
      setShowIosTip(true);
    }
  };

  const handleDismiss = (e: MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    if (isIos) {
      sessionStorage.setItem('ios-pwa-dismissed', 'true');
    }
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 max-w-sm"
          id="pwa-install-container"
        >
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-2xl pl-5 pr-3 py-3 shadow-xl shadow-blue-500/10 border border-white/10 backdrop-blur-md">
            {/* Install Button Trigger */}
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer font-sans"
              id="pwa-install-trigger"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping scale-150 opacity-40" />
                <div className="relative bg-white/15 p-1.5 rounded-lg">
                  {isIos ? <Smartphone className="w-4 h-4 text-white" /> : <Download className="w-4 h-4 text-white" />}
                </div>
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-blue-200 uppercase tracking-widest font-black leading-none">PWA App</span>
                <span className="block font-extrabold text-sm tracking-normal capitalize mt-0.5 whitespace-nowrap">Install App</span>
              </div>
            </button>

            {/* Split line / Dismiss button */}
            <div className="h-6 w-[1px] bg-white/20 mx-1" />
            
            <button
              onClick={handleDismiss}
              className="p-1 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss Install Alert"
              id="pwa-dismiss-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* iOS manual instructions popup modal */}
      <AnimatePresence>
        {showIosTip && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 p-6 rounded-3xl max-w-xs sm:max-w-md w-full relative space-y-5 shadow-2xl"
              id="ios-tip-modal"
            >
              <button
                onClick={() => setShowIosTip(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mt-2">
                <div className="inline-flex p-3 bg-blue-950/40 border border-blue-900/40 rounded-2xl text-blue-400">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Add to Home Screen</h3>
                <p className="text-sm text-slate-350">
                  Install <span className="font-bold text-white">Sleep Calculator</span> on your device for fast access, fullscreen layout and offline capabilities.
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 text-xs font-bold shrink-0 mt-0.5">1</div>
                  <p>
                    Tap the <strong className="text-white inline-flex items-center gap-1">Share <Share className="w-3.5 h-3.5 inline inline-block text-blue-400" /></strong> button in your web browser's bottom core panel.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 text-xs font-bold shrink-0 mt-0.5">2</div>
                  <p>
                    Scroll down and select <strong className="text-white">"Add to Home Screen"</strong> option.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIosTip(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer font-sans text-sm tracking-wide shadow-lg shadow-blue-500/10 active:scale-[0.98]"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
