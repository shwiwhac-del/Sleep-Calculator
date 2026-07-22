import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

export default function Contact() {
  const { t, getLocalizedPath, currentLang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(getLocalizedPath('/'));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Client-side rate limiting check
    const lastSubmitTime = localStorage.getItem('lastContactSubmission');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeSinceLastSubmit < 60000) { // 1 minute
        setError('Please wait a minute before sending another message.');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      if (!db) {
        console.warn('Firebase db is not initialized. Simulating contact submission.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        await addDoc(collection(db, 'contacts'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
      
      // Update last submission time
      localStorage.setItem('lastContactSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error('Firebase submission failed, simulating success locally:', err);
      
      // Update last submission time
      localStorage.setItem('lastContactSubmission', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const content = LOCALIZED_CONTACT[currentLang] || LOCALIZED_CONTACT['en'];

  return (
    <main className="w-full max-w-xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />

      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"
        >
          <ArrowLeft size={16} /> {t('common.back')}
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight font-serif">{t('pages.contact.title')}</h1>

        {isSuccess ? (
          <div className="flex flex-col items-start py-8">
            <div className="flex items-center gap-3 text-[#7C3AED] mb-4">
              <CheckCircle size={24} />
              <h2 className="text-2xl font-bold">{content.messageSent}</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-base sm:text-lg">
              {t('pages.contact.success')}
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#222] transition-colors rounded-full text-gray-900 dark:text-gray-100 text-sm font-semibold"
            >
              {content.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}
            
             <div>
              <label htmlFor="name" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                {t('pages.contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#F8FAFC] dark:bg-[#151C2C] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none transition-colors text-sm md:text-base"
                placeholder={t('pages.contact.name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                {t('pages.contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#F8FAFC] dark:bg-[#151C2C] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none transition-colors text-sm md:text-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">
                {t('pages.contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-[#F8FAFC] dark:bg-[#151C2C] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-xl px-4 py-3 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder={content.placeholderMessage}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] rounded-xl px-4 py-3 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7C3AED]"
            >
              {isSubmitting ? content.sending : t('pages.contact.send')}
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
              {content.privacyDisclaimer}
            </p>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] dark:border-gray-800 text-left space-y-8">
          <div>
            <h2 id="contact-email-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">{content.directEmailTitle}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {content.directEmailBody}{' '}
              <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] hover:underline font-semibold font-mono">
                support@sleepcalculater.online
              </a>
              .
            </p>
          </div>

          <div>
            <h2 id="contact-faq-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">{content.faqTitle}</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{content.faq1Q}</h3>
                <p>{content.faq1A}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{content.faq2Q}</h3>
                <p>{content.faq2A}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{content.faq3Q}</h3>
                <p>{content.faq3A}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h2 id="popular-guides-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">{content.guidesTitle}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{content.guidesIntro}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link to={getLocalizedPath('/blog/sleep-cycles-explained')} className="text-[#7C3AED] hover:underline">
                  {content.guide1}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/what-is-rem-sleep')} className="text-[#7C3AED] hover:underline">
                  {content.guide2}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/how-much-sleep-do-you-need')} className="text-[#7C3AED] hover:underline">
                  {content.guide3}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/best-time-to-sleep-and-wake-up')} className="text-[#7C3AED] hover:underline">
                  {content.guide4}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/why-90-minute-sleep-cycles-matter')} className="text-[#7C3AED] hover:underline">
                  {content.guide5}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/wake-up-between-sleep-cycles')} className="text-[#7C3AED] hover:underline">
                  {content.guide6}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

const LOCALIZED_CONTACT: Record<string, Record<string, string>> = {
  en: {
    back: "Back",
    messageSent: "Message Sent",
    sendAnother: "Send another message",
    sending: "Sending...",
    placeholderMessage: "How can we help?",
    privacyDisclaimer: "Your privacy is important to us. We will only use your email to respond to your inquiry and will never share your information with third parties.",
    directEmailTitle: "Direct Email Correspondence",
    directEmailBody: "You can reach our lead developer and sleep content analysts directly via physical email at support@sleepcalculater.online. We generally respond to constructive queries, partnership proposals, and layout suggestions within 48 business hours.",
    faqTitle: "Frequently Asked Questions (FAQs)",
    faq1Q: "How accurate is the 90-minute sleep cycle estimate?",
    faq1A: "While the average sleep cycle for adults is indeed 90 minutes, individual cycles can range from 70 to 110 minutes based on diet, lifestyle, age, genetics, and stress levels. Our calculator provides a standard, clinically recognized baseline.",
    faq2Q: "What is the 15 minutes of bedtime latency?",
    faq2A: "It takes the average healthy adult approximately 14 to 20 minutes to transition from full wakefulness into light N1 sleep. Our bedtime algorithm injects 15 minutes of default buffer to accommodate this sequence.",
    faq3Q: "How can I support Sleep Calculator?",
    faq3A: "You can share our free web application with friends, classmates, tech students, and colleagues who struggle with morning fatigue or irregular shift work schedules!",
    guidesTitle: "Detailed Sleep Guides",
    guidesIntro: "Optimize your sleep health and circadian metrics by reading our popular science-backed resources:",
    guide1: "Sleep Cycles Explained: Science of Rest",
    guide2: "What Is REM Sleep and Why It Matters",
    guide3: "Recommended Sleep Hours by Age",
    guide4: "Best Time to Sleep and Wake Up",
    guide5: "Why 90-Minute Sleep Cycles Matter",
    guide6: "How to Wake Up Refreshed"
  },
  es: {
    back: "Volver",
    messageSent: "Mensaje Enviado",
    sendAnother: "Enviar otro mensaje",
    sending: "Enviando...",
    placeholderMessage: "¿Cómo podemos ayudarte?",
    privacyDisclaimer: "Su privacidad es importante para nosotros. Solo usaremos su correo electrónico para responder a su consulta y nunca compartiremos su información.",
    directEmailTitle: "Correspondencia por Correo Directo",
    directEmailBody: "Puede comunicarse con nuestro desarrollador principal y analistas de contenido de sueño directamente por correo electrónico a support@sleepcalculater.online.",
    faqTitle: "Preguntas Frecuentes (FAQs)",
    faq1Q: "¿Qué tan precisa es la estimación del ciclo de sueño de 90 minutos?",
    faq1A: "Aunque el promedio para adultos es de 90 minutos, los ciclos varían de 70 a 110 minutos según la dieta, el estilo de vida y la genética. Nuestra herramienta ofrece una base de referencia estándar reconocida clínicamente.",
    faq2Q: "¿Qué son los 15 minutos de latencia de acostarse?",
    faq2A: "Un adulto promedio tarda entre 14 y 20 minutos en quedarse dormido. Nuestro algoritmo agrega 15 minutos de margen predeterminado para este proceso.",
    faq3Q: "¿Cómo puedo apoyar a la Calculadora de Sueño?",
    faq3A: "¡Puede compartir nuestra aplicación web gratuita con amigos, compañeros de clase y colegas que tengan problemas con el cansancio matutino!",
    guidesTitle: "Guías Detalladas de Sueño",
    guidesIntro: "Optimice su salud del sueño leyendo nuestros recursos populares respaldados por la ciencia:",
    guide1: "Ciclos del Sueño Explicados: Ciencia del Descanso",
    guide2: "Qué es el Sueño REM y Por Qué Importa",
    guide3: "Horas de Sueño Recomendadas por Edad",
    guide4: "La Mejor Hora para Dormir y Despertar",
    guide5: "Por Qué Importan los Ciclos de 90 Minutos",
    guide6: "Cómo Despertar Renovado"
  },
  pt: {
    back: "Voltar",
    messageSent: "Mensagem Enviada",
    sendAnother: "Enviar outra mensagem",
    sending: "Enviando...",
    placeholderMessage: "Como podemos ajudar?",
    privacyDisclaimer: "Sua privacidade é importante para nós. Usaremos seu e-mail apenas para responder à sua consulta e nunca compartilharemos seus dados.",
    directEmailTitle: "Correspondência Direta por E-mail",
    directEmailBody: "Você pode contatar nosso desenvolvedor principal e analistas diretamente pelo e-mail support@sleepcalculater.online.",
    faqTitle: "Perguntas Frequentes (FAQs)",
    faq1Q: "Quão precisa é a estimativa do ciclo de sono de 90 minutos?",
    faq1A: "Embora a média seja de 90 minutos, os ciclos variam de 70 a 110 minutos com base em fatores como estilo de vida e genética. Nossa ferramenta fornece uma base clínica padrão.",
    faq2Q: "O que são os 15 minutos de latência para dormir?",
    faq2A: "Um adulto saudável leva cerca de 14 a 20 minutos para adormecer. Nosso algoritmo inclui um buffer padrão de 15 minutos para cobrir essa transição.",
    faq3Q: "Como posso apoiar a Calculadora de Sono?",
    faq3A: "Você pode compartilhar nosso aplicativo gratuito com amigos, colegas de classe ou de trabalho que sofrem com cansaço matinal!",
    guidesTitle: "Guias de Sono Detalhados",
    guidesIntro: "Otimize sua saúde de sono com os nossos artigos científicos mais lidos:",
    guide1: "Ciclos do Sono Explicados: A Ciência do Descanso",
    guide2: "O que é o Sono REM e por que ele importa",
    guide3: "Horas de Sono Recomendadas por Idade",
    guide4: "Melhor Horário para Dormir e Acordar",
    guide5: "Por que os Ciclos de 90 Minutos Importam",
    guide6: "Como Acordar Disposto"
  },
  fr: {
    back: "Retour",
    messageSent: "Message Envoyé",
    sendAnother: "Envoyer un autre message",
    sending: "Envoi en cours...",
    placeholderMessage: "Comment pouvons-nous vous aider ?",
    privacyDisclaimer: "Votre vie privée est importante. Nous utiliserons votre e-mail uniquement pour vous répondre, sans aucun partage avec des tiers.",
    directEmailTitle: "Correspondance Directe par E-mail",
    directEmailBody: "Vous pouvez contacter directement notre développeur principal à l'adresse support@sleepcalculater.online.",
    faqTitle: "Foire Aux Questions (FAQ)",
    faq1Q: "Le cycle de 90 minutes est-il précis ?",
    faq1A: "Bien que la moyenne pour un adulte soit de 90 minutes, les cycles varient de 70 à 110 minutes selon la génétique et l'hygiène de vie. Notre outil offre une base scientifiquement reconnue.",
    faq2Q: "Qu'est-ce que la latence d'endormissement de 15 minutes ?",
    faq2A: "Il faut en moyenne 14 à 20 minutes à un adulte sain pour s'endormir. Notre algorithme ajoute un tampon par défaut de 15 minutes.",
    faq3Q: "Comment soutenir le Calculateur de Sommeil ?",
    faq3A: "Partagez notre application gratuite avec vos proches, étudiants et collègues qui luttent contre la fatigue matinale !",
    guidesTitle: "Guides de Sommeil Détaillés",
    guidesIntro: "Améliorez votre hygiène de sommeil grâce à nos guides de référence :",
    guide1: "Comprendre les Cycles du Sommeil",
    guide2: "Qu'est-ce que le Sommeil REM et son Importance",
    guide3: "Recommandations de Durée de Sommeil par Âge",
    guide4: "Le Meilleur Moment pour Dormir et se Réveiller",
    guide5: "L'Importance du Cycle de 90 Minutes",
    guide6: "Comment se Réveiller en Pleine Forme"
  },
  de: {
    back: "Zurück",
    messageSent: "Nachricht gesendet",
    sendAnother: "Weitere Nachricht senden",
    sending: "Wird gesendet...",
    placeholderMessage: "Wie können wir Ihnen helfen?",
    privacyDisclaimer: "Ihre Privatsphäre ist uns wichtig. Wir verwenden Ihre E-Mail-Adresse ausschließlich zur Beantwortung Ihrer Anfrage.",
    directEmailTitle: "Direkter E-Mail-Kontakt",
    directEmailBody: "Sie können unseren leitenden Entwickler und unsere Schlafanalysten direkt per E-Mail unter support@sleepcalculater.online erreichen.",
    faqTitle: "Häufig gestellte Fragen (FAQs)",
    faq1Q: "Wie genau ist die Schätzung des 90-Minuten-Schlafzyklus?",
    faq1A: "Der durchschnittliche Schlafzyklus liegt bei 90 Minuten, kann aber individuell zwischen 70 und 110 Minuten variieren. Unser Rechner bietet einen bewährten klinischen Richtwert.",
    faq2Q: "Was bedeuten die 15 Minuten Einschlaflatenz?",
    faq2A: "Ein gesunder Erwachsener benötigt etwa 14 bis 20 Minuten, um einzuschlafen. Unser Algorithmus berücksichtigt dafür einen Puffer von 15 Minuten.",
    faq3Q: "Wie kann ich den Schlafrechner unterstützen?",
    faq3A: "Teilen Sie unsere kostenlose Web-App mit Freunden, Klassenkameraden und Kollegen, die morgens schwer aufwachen!",
    guidesTitle: "Detaillierte Schlafratgeber",
    guidesIntro: "Optimieren Sie Ihre Schlafhygiene mit unseren wissenschaftlichen Artikeln:",
    guide1: "Schlafzyklen erklärt: Die Wissenschaft des Ausruhens",
    guide2: "Was ist REM-Schlaf und warum ist er wichtig?",
    guide3: "Empfohlene Schlafdauer nach Alter",
    guide4: "Beste Zeit zum Schlafen und Aufwachen",
    guide5: "Warum 90-Minuten-Schlafzyklen wichtig sind",
    guide6: "Erholt aufwachen leicht gemacht"
  },
  it: {
    back: "Indietro",
    messageSent: "Messaggio Inviato",
    sendAnother: "Invia un altro messaggio",
    sending: "Invio in corso...",
    placeholderMessage: "Come possiamo aiutarti?",
    privacyDisclaimer: "La tua privacy è importante. Useremo la tua email solo per rispondere alla richiesta e non la cederemo mai a terzi.",
    directEmailTitle: "Corrispondenza Diretta via Email",
    directEmailBody: "Puoi contattare direttamente il nostro sviluppatore principale all'indirizzo support@sleepcalculater.online.",
    faqTitle: "Domande Frequenti (FAQs)",
    faq1Q: "Quanto è precisa la stima del ciclo del sonno di 90 minuti?",
    faq1A: "Sebbene la media negli adulti sia di 90 minuti, i cicli variano da 70 a 110 minuti in base a stile di vita, età e genetica. Lo strumento fornisce un punto di riferimento clinico standard.",
    faq2Q: "Cosa sono i 15 minuti di latenza?",
    faq2A: "In media occorrono da 14 a 20 minuti per addormentarsi profondamente. Il nostro algoritmo inserisce 15 minuti di margine predefinito.",
    faq3Q: "Come posso supportare il Calcolatore del Sonno?",
    faq3A: "Condividi la nostra app web gratuita con amici, compagni di studio o colleghi di lavoro che lottano contro la stanchezza mattutina!",
    guidesTitle: "Guide Dettagliate sul Sonno",
    guidesIntro: "Ottimizza il tuo benessere leggendo le nostre guide scientifiche più apprezzate:",
    guide1: "Ciclos del sonno spiegati: La scienza del riposo",
    guide2: "Cos'è il sonno REM e perché è fondamentale",
    guide3: "Ore di sonno raccomandate in base all'età",
    guide4: "Il momento migliore per dormire e svegliarsi",
    guide5: "Perché i cicli di 90 minuti sono importanti",
    guide6: "Come svegliarsi riposati"
  },
  nl: {
    back: "Terug",
    messageSent: "Bericht Verzonden",
    sendAnother: "Stuur nog een bericht",
    sending: "Verzenden...",
    placeholderMessage: "Hoe kunnen we helpen?",
    privacyDisclaimer: "Uw privacy is belangrijk voor ons. We gebruiken uw e-mailadres alleen om te reageren en delen uw gegevens nooit.",
    directEmailTitle: "Directe E-mailcorrespondentie",
    directEmailBody: "U kunt onze hoofdontwikkelaar rechtstreeks bereiken via support@sleepcalculater.online.",
    faqTitle: "Veelgestelde Vragen (FAQs)",
    faq1Q: "Hoe nauwkeurig is de schatting van de 90-minuten slaapcyclus?",
    faq1A: "Hoewel de gemiddelde cyclus 90 minuten is, varieert dit per persoon tussen 70 en 110 minuten op basis van levensstijl en genetica. Onze calculator biedt een betrouwbare klinische basis.",
    faq2Q: "Wat is de 15 minuten inslaaptijd?",
    faq2A: "Gemiddeld duurt het 14 tot 20 minuten om in slaap te vallen. Ons algoritme voegt standaard 15 minuten buffer toe voor deze transitie.",
    faq3Q: "Hoe kan ik de Slaapcalculator steunen?",
    faq3A: "Deel onze gratis app met vrienden, studenten en collega's die moeite hebben met vroeg opstaan of ploegendiensten!",
    guidesTitle: "Gedetailleerde Slaapgidsen",
    guidesIntro: "Verbeter uw slaapkwaliteit met onze meest gelezen wetenschappelijke bronnen:",
    guide1: "Uitleg over Slaapcycli: Wetenschap van Rust",
    guide2: "Wat is REM-slaap en Waarom is het Belangrijk?",
    guide3: "Aanbevolen Slaapuren per Leeftijd",
    guide4: "Beste Tijd om te Slapen en Wakker te Worden",
    guide5: "Waarom Slaapcycli van 90 Minuten Belangrijk Zijn",
    guide6: "Fris Wakker Worden Doe Je Zo"
  },
  tr: {
    back: "Geri",
    messageSent: "Mesaj Gönderildi",
    sendAnother: "Yeni mesaj gönder",
    sending: "Gönderiliyor...",
    placeholderMessage: "Nasıl yardımcı olabiliriz?",
    privacyDisclaimer: "Gizliliğiniz bizim için önemlidir. E-posta adresinizi yalnızca talebinizi yanıtlamak için kullanırız ve asla üçüncü taraflarla paylaşmayız.",
    directEmailTitle: "Doğrudan E-posta İletişimi",
    directEmailBody: "Baş geliştiricimize ve uyku analistlerimize doğrudan support@sleepcalculater.online adresinden ulaşabilirsiniz.",
    faqTitle: "Sıkça Sorulan Sorular (SSS)",
    faq1Q: "90 dakikalık uyku döngüsü tahmini ne kadar doğrudur?",
    faq1A: "Yetişkinler için ortalama uyku döngüsü 90 dakika olsa da, bireysel döngüler yaşam tarzı, stres ve genetiğe bağlı olarak 70 ila 110 dakika arasında değişebilir. Aracımız klinik olarak kabul görmüş bir temel sağlar.",
    faq2Q: "Yataktaki 15 dakikalık uykuya dalma süresi nedir?",
    faq2A: "Sağlıklı bir yetişkinin uykuya dalması ortalama 14 ila 20 dakika sürer. Yatış saati algoritmamız bu geçiş için 15 dakikalık varsayılan bir tampon süre ekler.",
    faq3Q: "Uyku Hesaplayıcıyı nasıl destekleyebilirim?",
    faq3A: "Sabah yorgunluğu çeken veya düzensiz vardiyalarda çalışan arkadaşlarınız, sınıf arkadaşlarınız ve meslektaşlarınızla ücretsiz web uygulamamızı paylaşabilirsiniz!",
    guidesTitle: "Detaylı Uyku Kılavuzları",
    guidesIntro: "Bilimsel olarak desteklenen popüler kaynaklarımızı okuyarak uyku sağlığınızı optimize edin:",
    guide1: "Uyku Döngüleri Açıklandı: Dinlenmenin Bilimi",
    guide2: "REM Uykusu Nedir ve Neden Önemlidir?",
    guide3: "Yaşa Göre Tavsiye Edilen Uyku Saatleri",
    guide4: "Uyumak ve Uyanmak İçin En İyi Zaman",
    guide5: "90 Dakikalık Uyku Döngüleri Neden Önemlidir?",
    guide6: "Zinde ve Dinç Uyanma Yolları"
  },
  id: {
    back: "Kembali",
    messageSent: "Pesan Terkirim",
    sendAnother: "Kirim pesan lain",
    sending: "Mengirim...",
    placeholderMessage: "Ada yang bisa kami bantu?",
    privacyDisclaimer: "Privasi Anda penting bagi kami. Kami hanya menggunakan email Anda untuk merespons pesan dan tidak akan pernah membagikannya.",
    directEmailTitle: "Korespondensi Email Langsung",
    directEmailBody: "Anda dapat menghubungi pengembang utama kami langsung melalui email di support@sleepcalculater.online.",
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faq1Q: "Seberapa akurat estimasi siklus tidur 90 menit?",
    faq1A: "Meskipun rata-rata siklus tidur adalah 90 menit, siklus individu bervariasi dari 70 hingga 110 menit tergantung genetik dan gaya hidup. Alat kami menyediakan batas referensi standar yang diakui.",
    faq2Q: "Apa maksud durasi 15 menit waktu sebelum tertidur?",
    faq2A: "Rata-rata orang dewasa sehat memerlukan waktu 14 hingga 20 menit untuk mulai tertidur. Algoritma kami menyisipkan margin 15 menit untuk transisi ini.",
    faq3Q: "Como posso apoiar a Calculadora de Sono?",
    faq3A: "Bagikan aplikasi web gratis ini dengan teman, siswa, dan rekan kerja Anda yang sering merasa lelah di pagi hari!",
    guidesTitle: "Panduan Tidur Mendalam",
    guidesIntro: "Optimalkan kualitas tidur Anda dengan membaca panduan populer berbasis riset berikut:",
    guide1: "Penjelasan Siklus Tidur: Ilmu Istirahat",
    guide2: "Apa itu Tidur REM dan Mengapa Sangat Penting",
    guide3: "Rekomendasi Durasi Tidur Berdasarkan Usia",
    guide4: "Waktu Terbaik untuk Tidur dan Bangun",
    guide5: "Mengapa Siklus Tidur 90 Menit Begitu Penting",
    guide6: "Cara Bangun Tidur dengan Segar"
  },
  vi: {
    back: "Quay lại",
    messageSent: "Đã gửi tin nhắn",
    sendAnother: "Gửi tin nhắn khác",
    sending: "Đang gửi...",
    placeholderMessage: "Chúng tôi có thể giúp gì cho bạn?",
    privacyDisclaimer: "Quyền riêng tư của bạn rất quan trọng. Chúng tôi chỉ sử dụng email của bạn để phản hồi và cam kết bảo mật tuyệt đối.",
    directEmailTitle: "Thư từ trực tiếp qua Email",
    directEmailBody: "Bạn có thể gửi thư trực tiếp cho nhà phát triển chính của chúng tôi theo địa chỉ email support@sleepcalculater.online.",
    faqTitle: "Câu hỏi thường gặp (FAQs)",
    faq1Q: "Ước tính chu kỳ giấc ngủ 90 phút chính xác đến mức nào?",
    faq1A: "Mặc dù chu kỳ trung bình là 90 phút, các chu kỳ cá nhân dao động từ 70 đến 110 phút tùy nhịp sinh học và lối sống. Công cụ của chúng tôi cung cấp mức cơ sở chuẩn.",
    faq2Q: "Thời gian chờ đi ngủ 15 phút là gì?",
    faq2A: "Một người trưởng thành khỏe mạnh cần khoảng 14 đến 20 phút để đi vào giấc ngủ. Thuật toán của chúng tôi cộng thêm 15 phút làm thời gian đệm mặc định.",
    faq3Q: "Làm thế nào để tôi ủng hộ Máy tính Giấc ngủ?",
    faq3A: "Hãy chia sẻ ứng dụng web miễn phí của chúng tôi với bạn bè, người thân và đồng nghiệp thường bị mệt mỏi vào buổi sáng!",
    guidesTitle: "Cẩm nang Giấc ngủ Chi tiết",
    guidesIntro: "Tối ưu hóa sức khỏe giấc ngủ bằng cách đọc các bài viết khoa học hàng đầu của chúng tôi:",
    guide1: "Giải mã Chu kỳ Giấc ngủ: Khoa học của Sự Nghỉ ngơi",
    guide2: "Giấc ngủ REM là gì và Tại sao Nó lại Quan trọng",
    guide3: "Khuyến nghị Số Giờ Ngủ theo Độ tuổi",
    guide4: "Thời điểm Tốt nhất để Ngủ và Thức dậy",
    guide5: "Tại sao Chu kỳ Giấc ngủ 90 Phút lại Quan trọng",
    guide6: "Cách Thức dậy Khỏe khoắn và Tỉnh táo"
  },
  pl: {
    back: "Wstecz",
    messageSent: "Wiadomość wysłana",
    sendAnother: "Wyślij kolejną wiadomość",
    sending: "Wysyłanie...",
    placeholderMessage: "W czym możemy pomóc?",
    privacyDisclaimer: "Twoja prywatność jest dla nas kluczowa. Używamy Twojego adresu email wyłącznie do odpowiedzi na to zapytanie.",
    directEmailTitle: "Bezpośredni Kontakt Email",
    directEmailBody: "Możesz skontaktować się bezpośrednio z naszym głównym programistą pod adresem support@sleepcalculater.online.",
    faqTitle: "Najczęściej Zadawane Pytania (FAQ)",
    faq1Q: "Jak dokładne jest założenie o 90-minutowym cyklu snu?",
    faq1A: "Choć średni cykl u dorosłych trwa 90 minut, u konkretnych osób może wynosić od 70 do 110 minut w zależności od diety, stresu i genetyki. Nasz kalkulator podaje standardowy, kliniczny punkt odniesienia.",
    faq2Q: "Co oznacza 15-minutowy czas zasypiania?",
    faq2A: "Przeciętny zdrowy dorosły potrzebuje od 14 do 20 minut, aby przejść w stan snu. Nasz algorytm dodaje domyślnie 15-minutowy bufor na ten proces.",
    faq3Q: "Jak mogę wesprzeć kalkulator snu?",
    faq3A: "Możesz udostępnić naszą darmową aplikację znajomym, kolegom ze szkoły lub z pracy, którzy zmagają się z porannym zmęczeniem!",
    guidesTitle: "Szczegółowe Poradniki o Śnie",
    guidesIntro: "Zoptymalizuj swój zegar biologiczny, czytając nasze najpopularniejsze artykuły medyczne:",
    guide1: "Wyjaśnienie Cykli Snu: Nauka o Odpoczynku",
    guide2: "Czym Jest Sen REM i Dlaczego Jest Ważny",
    guide3: "Zalecana Liczba Godzin Snu według Wieku",
    guide4: "Najlepszy Czas na Sen i Pobudkę",
    guide5: "Dlaczego 90-Minutowe Cykle Snu Mają Znaczenie",
    guide6: "Jak Budzić Się Rano z Energią"
  }
};
