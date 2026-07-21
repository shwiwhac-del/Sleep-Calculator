import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

export default function Privacy() {
  const navigate = useNavigate();
  const { t, currentLang, getLocalizedPath } = useLanguage();

  const handleBack = () => {
    navigate(getLocalizedPath('/'));
  };

  const content = LOCALIZED_PRIVACY[currentLang] || LOCALIZED_PRIVACY['en'];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> {t('common.back')}</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">{t('pages.privacy.title')}</h1>
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-6 md:mb-8">{content.lastUpdated}</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <p>
              {content.p1}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.infoTitle}</h2>
            <p className="mb-4">{content.p2}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{content.l1_1}</li>
              <li>{content.l1_2}</li>
              <li>{content.l1_3}</li>
              <li>{content.l1_4}</li>
            </ul>
            <p>
              {content.p3}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.useTitle}</h2>
            <p className="mb-4">{content.p4}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{content.l2_1}</li>
              <li>{content.l2_2}</li>
              <li>{content.l2_3}</li>
              <li>{content.l2_4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.cookiesTitle}</h2>
            <p className="mb-4">{content.p5}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{content.l3_1}</li>
              <li>{content.l3_2}</li>
              <li>{content.l3_3}</li>
            </ul>
            <p>
              {content.p6}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.thirdTitle}</h2>
            <p className="mb-4">{content.p7}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{content.l4_1}</li>
              <li>{content.l4_2}</li>
              <li>{content.l4_3}</li>
            </ul>
            <p>
              {content.p8}
            </p>
          </section>
          
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.securityTitle}</h2>
            <p>
              {content.p9}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.linksTitle}</h2>
            <p>
              {content.p10}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.childTitle}</h2>
            <p>
              {content.p11}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.consentTitle}</h2>
            <p>
              {content.p12}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.changesTitle}</h2>
            <p>
              {content.p13}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.contactTitle}</h2>
            <p>
              {content.p14_1}<Link to={getLocalizedPath('/contact')} className="text-[#7C3AED] font-bold hover:underline">{content.linkText}</Link>{content.p14_2}<a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E5E7EB] dark:border-gray-800">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h11}</h2>
            <p className="mb-4 text-sm sm:text-base">{content.p15}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link to={getLocalizedPath('/blog/sleep-cycles-explained')} className="text-[#7C3AED] hover:underline">
                  {content.g1}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/what-is-rem-sleep')} className="text-[#7C3AED] hover:underline">
                  {content.g2}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/how-much-sleep-do-you-need')} className="text-[#7C3AED] hover:underline">
                  {content.g3}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/blog/best-time-to-sleep-and-wake-up')} className="text-[#7C3AED] hover:underline">
                  {content.g4}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

const LOCALIZED_PRIVACY: Record<string, Record<string, any>> = {
  en: {
    lastUpdated: "Last Updated: May 2026",
    p1: "Welcome to sleepcalculater.online. Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and how we protect it.",
    infoTitle: "Information We Collect",
    p2: "We may collect:",
    l1_1: "Basic device and browser information",
    l1_2: "Usage data and analytics",
    l1_3: "Cookies and similar technologies",
    l1_4: "Voluntarily submitted contact information",
    p3: "We do NOT collect sensitive personal health records or medical history.",
    useTitle: "How We Use Information",
    p4: "We use collected information to:",
    l2_1: "Improve website performance",
    l2_2: "Analyze traffic and usage behavior",
    l2_3: "Fix bugs and optimize user experience",
    l2_4: "Protect against spam and abuse",
    cookiesTitle: "Cookies",
    p5: "Our website may use cookies to:",
    l3_1: "Remember user preferences",
    l3_2: "Improve performance",
    l3_3: "Analyze visitor behavior",
    p6: "You can disable cookies through your browser settings.",
    thirdTitle: "Third-Party Services",
    p7: "We may use third-party services such as:",
    l4_1: "Analytics providers",
    l4_2: "Advertising networks",
    l4_3: "Hosting providers",
    p8: "These services may collect limited technical data according to their own privacy policies.",
    securityTitle: "Data Security",
    p9: "We take reasonable measures to protect user data, but no internet transmission is completely secure.",
    linksTitle: "External Links",
    p10: "Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites.",
    childTitle: "Children's Privacy",
    p11: "This website is not intended for children under 13 years of age.",
    consentTitle: "Consent",
    p12: "By using this website, you consent to this Privacy Policy.",
    changesTitle: "Changes to This Policy",
    p13: "We may update this Privacy Policy at any time without prior notice.",
    contactTitle: "Contact Information",
    p14_1: "If you have questions regarding this Privacy Policy, cookie settings, analytics, or wish to request contact data deletion, please utilize our ",
    linkText: "Contact details page",
    p14_2: " or email us at ",
    h11: "Sleep Health Guides",
    p15: "To learn more about optimizing your sleep environment and bedtime schedules, read our popular science guides:",
    g1: "Sleep Cycles Explained: Science of Rest",
    g2: "What Is REM Sleep and Why It Matters",
    g3: "Recommended Sleep Hours by Age",
    g4: "Best Time to Sleep and Wake Up"
  },
  es: {
    lastUpdated: "Última actualización: Mayo de 2026",
    p1: "Bienvenido a sleepcalculater.online. Su privacidad es importante para nosotros. Esta política explica qué información recopilamos y cómo la protegemos.",
    infoTitle: "Información que recopilamos",
    p2: "Podemos recopilar:",
    l1_1: "Información básica del dispositivo y navegador",
    l1_2: "Datos de uso y análisis",
    l1_3: "Cookies y tecnologías similares",
    l1_4: "Información de contacto enviada voluntariamente",
    p3: "NO recopilamos historiales médicos personales ni datos de salud sensibles.",
    useTitle: "Cómo usamos la información",
    p4: "Usamos la información recopilada para:",
    l2_1: "Mejorar el rendimiento del sitio web",
    l2_2: "Analizar el tráfico y el comportamiento de uso",
    l2_3: "Corregir errores y optimizar la experiencia",
    l2_4: "Proteger contra el spam y el abuso",
    cookiesTitle: "Cookies",
    p5: "Nuestro sitio web puede utilizar cookies para:",
    l3_1: "Recordar las preferencias del usuario",
    l3_2: "Mejorar el rendimiento",
    l3_3: "Analizar el comportamiento de los visitantes",
    p6: "Puede desactivar las cookies en la configuración de su navegador.",
    thirdTitle: "Servicios de terceros",
    p7: "Podemos utilizar servicios de terceros como:",
    l4_1: "Proveedores de análisis",
    l4_2: "Redes publicitarias",
    l4_3: "Proveedores de alojamiento",
    p8: "Estos servicios pueden recopilar datos técnicos limitados bajo sus propias políticas.",
    securityTitle: "Seguridad de los datos",
    p9: "Tomamos medidas razonables para proteger los datos de los usuarios, pero ninguna transmisión por Internet es totalmente segura.",
    linksTitle: "Enlaces externos",
    p10: "Nuestro sitio web puede contener enlaces a sitios externos. No somos responsables de sus prácticas de privacidad o contenido.",
    childTitle: "Privacidad infantil",
    p11: "Este sitio web no está destinado a niños menores de 13 años.",
    consentTitle: "Consentimiento",
    p12: "Al utilizar este sitio web, acepta esta Política de Privacidad.",
    changesTitle: "Cambios en esta Política",
    p13: "Podemos actualizar esta política en cualquier momento sin previo aviso.",
    contactTitle: "Información de contacto",
    p14_1: "Si tiene preguntas sobre esta política o desea solicitar la eliminación de datos, utilice nuestra ",
    linkText: "página de contacto",
    p14_2: " o envíenos un correo a ",
    h11: "Guías de salud del sueño",
    p15: "Para obtener más información sobre cómo optimizar su entorno de descanso, lea nuestras guías científicas:",
    g1: "Ciclos del Sueño Explicados: Ciencia del Descanso",
    g2: "Qué es el Sueño REM y Por Qué Importa",
    g3: "Horas de Sueño Recomendadas por Edad",
    g4: "La Mejor Hora para Dormir y Despertar"
  },
  pt: {
    lastUpdated: "Última atualização: Maio de 2026",
    p1: "Bem-vindo ao sleepcalculater.online. Sua privacidade é importante para nós. Esta política de privacidade explica quais dados coletamos e como os protegemos.",
    infoTitle: "Informações que coletamos",
    p2: "Podemos coletar:",
    l1_1: "Informações básicas sobre o dispositivo e navegador",
    l1_2: "Dados de uso e análises de tráfego",
    l1_3: "Cookies e tecnologias semelhantes",
    l1_4: "Informações de contato fornecidas voluntariamente",
    p3: "NÃO coletamos prontuários médicos pessoais ou históricos de saúde sensíveis.",
    useTitle: "Como usamos as informações",
    p4: "Usamos os dados coletados para:",
    l2_1: "Melhorar o desempenho do site",
    l2_2: "Analisar o tráfego e comportamento do usuário",
    l2_3: "Corregir bugs e otimizar a experiência",
    l2_4: "Proteger contra spam e atividades abusivas",
    cookiesTitle: "Cookies",
    p5: "Nosso site pode utilizar cookies para:",
    l3_1: "Lembrar as preferências do usuário",
    l3_2: "Melhorar a performance",
    l3_3: "Analisar o comportamento de visitantes",
    p6: "Você pode desativar os cookies nas configurações do seu navegador.",
    thirdTitle: "Serviços de terceiros",
    p7: "Podemos usar serviços de terceiros como:",
    l4_1: "Provedores de análise",
    l4_2: "Redes de publicidade",
    l4_3: "Provedores de hospedagem",
    p8: "Esses serviços podem coletar dados técnicos limitados de acordo com suas próprias políticas.",
    securityTitle: "Segurança de dados",
    p9: "Tomamos medidas razoáveis para proteger os dados do usuário, mas nenhuma transmissão pela internet é 100% segura.",
    linksTitle: "Links externos",
    p10: "Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade de terceiros.",
    childTitle: "Privacidade de crianças",
    p11: "Este site não é direcionado a crianças menores de 13 anos.",
    consentTitle: "Consentimento",
    p12: "Ao usar nosso site, você concorda com esta Política de Privacidade.",
    changesTitle: "Alterações nesta Política",
    p13: "Podemos atualizar esta política a qualquer momento sem aviso prévio.",
    contactTitle: "Informações de contato",
    p14_1: "Se tiver dúvidas sobre esta política de privacidade ou desejar solicitar a exclusão de seus dados, use nossa ",
    linkText: "página de contato",
    p14_2: " ou envie um e-mail para ",
    h11: "Guias de saúde do sono",
    p15: "Para aprender mais sobre a otimização de seu sono e rituais noturnos, leia nossos guias populares:",
    g1: "Ciclos do Sono Explicados: A Ciência do Descanso",
    g2: "O que é o Sono REM e por que ele importa",
    g3: "Horas de Sono Recomendadas por Idade",
    g4: "Melhor Horário para Dormir e Acordar"
  },
  fr: {
    lastUpdated: "Dernière mise à jour : Mai 2026",
    p1: "Bienvenue sur sleepcalculater.online. Votre vie privée est notre priorité. Cette politique de confidentialité explique les données que nous collectons, comment nous les utilisons et comment nous les protégeons.",
    infoTitle: "Informations que nous collectons",
    p2: "Nous pouvons collecter :",
    l1_1: "Des données techniques sur votre appareil et navigateur",
    l1_2: "Des données d'utilisation et d'analyse de trafic",
    l1_3: "Des cookies et technologies similaires",
    l1_4: "Des informations de contact soumises volontairement",
    p3: "We do NOT collect sensitive personal health records or medical history.",
    useTitle: "Comment nous utilisons vos données",
    p4: "Nous utilisons ces informations pour :",
    l2_1: "Améliorer les performances de notre site",
    l2_2: "Analyser le trafic et les comportements d'utilisation",
    l2_3: "Résoudre les bugs et optimiser l'expérience utilisateur",
    l2_4: "Protéger le site contre le spam et les abus",
    cookiesTitle: "Cookies",
    p5: "Notre site peut utiliser des cookies pour :",
    l3_1: "Mémoriser vos préférences utilisateur",
    l3_2: "Optimiser les performances du site",
    l3_3: "Analyser l'audience et le comportement des visiteurs",
    p6: "Vous pouvez désactiver les cookies via les paramètres de votre navigateur.",
    thirdTitle: "Services tiers",
    p7: "Nous pouvons faire appel à des services tiers comme :",
    l4_1: "Des outils d'analyse d'audience",
    l4_2: "Des régies publicitaires",
    l4_3: "Des hébergeurs web",
    p8: "Ces services collectent des données selon leurs propres politiques de confidentialité.",
    securityTitle: "Sécurité des données",
    p9: "Nous mettons en œuvre des mesures adaptées pour sécuriser les données, même si aucun transfert sur internet n'est infaillible.",
    linksTitle: "Liens externes",
    p10: "Notre site peut inclure des liens vers des sites externes dont nous ne contrôlons pas les politiques de confidentialité.",
    childTitle: "Vie privée des enfants",
    p11: "Ce site ne s'adresse pas aux enfants de moins de 13 ans.",
    consentTitle: "Consentement",
    p12: "En utilisant ce site, vous acceptez les termes de cette politique de confidentialité.",
    changesTitle: "Modification de la politique",
    p13: "Nous nous réservons le droit de modifier cette politique à tout moment sans préavis.",
    contactTitle: "Nous contacter",
    p14_1: "Pour toute question relative à vos données personnelles ou pour demander leur suppression, veuillez utiliser notre ",
    linkText: "formulaire de contact",
    p14_2: " ou nous envoyer un e-mail à ",
    h11: "Guides santé du sommeil",
    p15: "Pour en savoir plus sur l'optimisation de vos nuits, consultez nos guides scientifiques :",
    g1: "Comprendre les Cycles du Sommeil",
    g2: "Qu'est-ce que le Sommeil REM et son Importance",
    g3: "Recommandations de Durée de Sommeil par Âge",
    g4: "Le Meilleur Moment pour Dormir et se Réveiller"
  },
  de: {
    lastUpdated: "Zuletzt aktualisiert: Mai 2026",
    p1: "Willkommen bei sleepcalculater.online. Ihre Privatsphäre ist uns wichtig. Diese Datenschutzerklärung erklärt, welche Daten wir erheben, wie wir sie nutzen und schützen.",
    infoTitle: "Erhobene Daten",
    p2: "Wir erheben unter Umständen:",
    l1_1: "Grundlegende Geräte- und Browserinformationen",
    l1_2: "Nutzungsdaten und Analysen",
    l1_3: "Cookies und ähnliche Technologien",
    l1_4: "Freiwillig übermittelte Kontaktdaten",
    p3: "Wir sammeln KEINE sensiblen persönlichen Gesundheitsdaten oder Krankengeschichten.",
    useTitle: "Nutzung der Daten",
    p4: "Wir nutzen die erhobenen Daten, um:",
    l2_1: "Die Leistung unserer Website zu verbessern",
    l2_2: "Nutzungsverhalten und Website-Verkehr zu analysieren",
    l2_3: "Fehler zu beheben und die Benutzererfahrung zu optimieren",
    l2_4: "Schutz vor Spam und Missbrauch zu gewährleisten",
    cookiesTitle: "Cookies",
    p5: "Unsere Website nutzt Cookies, um:",
    l3_1: "Benutzereinstellungen zu speichern",
    l3_2: "Die Leistung zu steigern",
    l3_3: "Das Besucherverhalten zu analysieren",
    p6: "Sie können Cookies in Ihren Browsereinstellungen deaktivieren.",
    thirdTitle: "Dienste von Drittanbietern",
    p7: "Wir nutzen unter Umständen Dienste von:",
    l4_1: "Analyseanbietern",
    l4_2: "Werbenetzwerken",
    l4_3: "Hosting-Providern",
    p8: "Diese Dienste erheben begrenzte technische Daten gemäß ihren eigenen Richtlinien.",
    securityTitle: "Datensicherheit",
    p9: "Wir ergreifen angemessene Maßnahmen zum Schutz Ihrer Daten, weisen jedoch darauf hin, dass keine Internetübertragung absolut sicher ist.",
    linksTitle: "Externe Links",
    p10: "Unsere Website kann Links zu externen Websites enthalten. Wir sind für deren Datenschutzpraktiken nicht verantwortlich.",
    childTitle: "Schutz von Minderjährigen",
    p11: "Diese Website richtet sich nicht an Kinder unter 13 Jahren.",
    consentTitle: "Einwilligung",
    p12: "Mit der Nutzung dieser Website stimmen Sie dieser Datenschutzerklärung zu.",
    changesTitle: "Änderungen dieser Richtlinie",
    p13: "Wir behalten uns das Recht vor, diese Erklärung jederzeit ohne Vorankündigung zu aktualisieren.",
    contactTitle: "Kontakt",
    p14_1: "Bei Fragen zum Datenschutz oder zum Löschen Ihrer Kontaktdaten nutzen Sie bitte unsere ",
    linkText: "Kontaktseite",
    p14_2: " oder senden Sie eine E-Mail an ",
    h11: "Schlafratgeber",
    p15: "Optimieren Sie Ihre Schlafqualität mit unseren wissenschaftlich fundierten Artikeln:",
    g1: "Schlafzyklen erklärt: Die Wissenschaft des Ausruhens",
    g2: "Was ist REM-Schlaf und warum ist er wichtig?",
    g3: "Empfohlene Schlafdauer nach Alter",
    g4: "Beste Zeit zum Schlafen und Aufwachen"
  },
  it: {
    lastUpdated: "Ultimo aggiornamento: Maggio 2026",
    p1: "Benvenuto su sleepcalculater.online. La tua privacy è fondamentale per noi. Questa politica spiega quali dati raccogliamo, come li usiamo e come li proteggiamo.",
    infoTitle: "Informazioni che raccogliamo",
    p2: "Potremmo raccogliere:",
    l1_1: "Informazioni di base su dispositivo e browser",
    l1_2: "Dati di utilizzo e statistiche di traffico",
    l1_3: "Cookie e tecnologie affini",
    l1_4: "Informazioni di contatto fornite volontariamente",
    p3: "NON raccogliamo cartelle cliniche personali o dati sanitari sensibili.",
    useTitle: "Come usiamo le informazioni",
    p4: "Utilizziamo le informazioni raccolte per:",
    l2_1: "Migliorare le prestazioni del sito web",
    l2_2: "Analizzare il traffico e il comportamento degli utenti",
    l2_3: "Risolvere bug e ottimizzare l'esperienza d'uso",
    l2_4: "Proteggere da spam e abusi",
    cookiesTitle: "Cookie",
    p5: "Il nostro sito potrebbe utilizzare cookie per:",
    l3_1: "Memorizzare le preferenze dell'utente",
    l3_2: "Migliorare le prestazioni complessive",
    l3_3: "Analizzare il comportamento dei visitatori",
    p6: "È possibile disabilitare i cookie tramite le impostazioni del browser.",
    thirdTitle: "Servizi di terze parti",
    p7: "Potremmo avvalerci di servizi terzi come:",
    l4_1: "Fornitori di analisi statistiche",
    l4_2: "Network pubblicitari",
    l4_3: "Provider di hosting",
    p8: "Tali servizi raccolgono dati tecnici limitati in conformità con le loro politiche.",
    securityTitle: "Sicurezza dei dati",
    p9: "Adottiamo misure idonee a proteggere i dati, ma nessuna trasmissione online è sicura al 100%.",
    linksTitle: "Collegamenti esterni",
    p10: "Il nostro sito può contenere link a siti terzi di cui non siamo responsabili in merito a contenuti e privacy.",
    childTitle: "Tutela dei minori",
    p11: "Questo sito non è destinato a minori di 13 anni.",
    consentTitle: "Consenso",
    p12: "Utilizzando questo sito, acconsenti a questa politica di privacy.",
    changesTitle: "Modifiche alla politica",
    p13: "Ci riserviamo il diritto di aggiornare questa informativa in qualsiasi momento.",
    contactTitle: "Contatti",
    p14_1: "Per domande sulla privacy o per richiedere la cancellazione dei dati, usa la nostra ",
    linkText: "pagina dei contatti",
    p14_2: " o scrivici a ",
    h11: "Guide sul benessere del sonno",
    p15: "Migliora la qualità del tuo riposo consultando i nostri approfondimenti scientifici:",
    g1: "Cicli del sonno spiegati: La scienza del riposo",
    g2: "Cos'è il sonno REM e perché è fondamentale",
    g3: "Ore di sonno raccomandate in base all'età",
    g4: "Il momento migliore per dormire e svegliarsi"
  },
  nl: {
    lastUpdated: "Laatst bijgewerkt: Mei 2026",
    p1: "Welkom bij sleepcalculater.online. Uw privacy is erg belangrijk voor ons. Dit privacybeleid legt uit welke gegevens we verzamelen en hoe we deze beschermen.",
    infoTitle: "Informatie die we verzamelen",
    p2: "We kunnen het volgende verzamelen:",
    l1_1: "Basisgegevens over uw apparaat en browser",
    l1_2: "Gebruikersstatistieken en analysemateriaal",
    l1_3: "Cookies en vergelijkbare technologieën",
    l1_4: "Vrijwillig verstrekte contactgegevens",
    p3: "We verzamelen GEEN gevoelige persoonlijke medische gegevens.",
    useTitle: "Hoe we informatie gebruiken",
    p4: "We gebruiken de verzamelde gegevens om:",
    l2_1: "De prestaties van onze website te verbeteren",
    l2_2: "Verkeers- en gebruiksgedrag te analyseren",
    l2_3: "Fouten op te lossen en de gebruikerservaring te optimaliseren",
    l2_4: "Te beschermen tegen spam en misbruik",
    cookiesTitle: "Cookies",
    p5: "Onze website kan cookies gebruiken om:",
    l3_1: "Gebruikersvoorkeuren te onthouden",
    l3_2: "De prestaties te verbeteren",
    l3_3: "Bezoekersgedrag te analyseren",
    p6: "U kunt cookies uitschakelen via de instellingen van uw browser.",
    thirdTitle: "Diensten van derden",
    p7: "We kunnen gebruikmaken van externe diensten zoals:",
    l4_1: "Analyticsproviders",
    l4_2: "Advertentienetwerken",
    l4_3: "Hostingproviders",
    p8: "Deze diensten kunnen beperkte technische gegevens verzamelen volgens hun eigen beleid.",
    securityTitle: "Gegevensbeveiliging",
    p9: "We nemen redelijke maatregelen om gegevens te beveiligen, maar geen enkele online overdracht is volledig veilig.",
    linksTitle: "Externe links",
    p10: "Onze website kan links naar externe sites bevatten. We zijn niet verantwoordelijk voor hun privacybeleid.",
    childTitle: "Privacy van kinderen",
    p11: "Deze website is niet bedoeld voor kinderen jonger dan 13 jaar.",
    consentTitle: "Toestemming",
    p12: "Door gebruik te maken van deze website stemt u in met dit privacybeleid.",
    changesTitle: "Wijzigingen in dit beleid",
    p13: "We kunnen dit beleid op elk moment zonder voorafgaande kennisgeving wijzigen.",
    contactTitle: "Contactgegevens",
    p14_1: "Als u vragen heeft over dit privacybeleid of gegevens wilt laten verwijderen, gebruik dan onze ",
    linkText: "contactpagina",
    p14_2: " of stuur een e-mail naar ",
    h11: "Slaapgidsen",
    p15: "Ontdek meer over gezonde slaap routines in onze wetenschappelijke gidsen:",
    g1: "Uitleg over Slaapcycli: Wetenschap van Rust",
    g2: "Wat is REM-slaap en Waarom is het Belangrijk?",
    g3: "Aanbevolen Slaapuren per Leeftijd",
    g4: "Beste Tijd om te Slapen en Wakker te Worden"
  },
  tr: {
    lastUpdated: "Son Güncelleme: Mayıs 2026",
    p1: "sleepcalculater.online adresine hoş geldiniz. Gizliliğiniz bizim için önemlidir. Bu politika, hangi bilgileri topladığımızı ve bunları nasıl koruduğumuzu açıklar.",
    infoTitle: "Topladığımız Bilgiler",
    p2: "Şunları toplayabiliriz:",
    l1_1: "Temel cihaz ve tarayıcı bilgileri",
    l1_2: "Kullanım verileri ve analitikler",
    l1_3: "Çerezler ve benzer teknolojiler",
    l1_4: "Gönüllü olarak iletilen iletişim bilgileri",
    p3: "Kişisel hassas sağlık geçmişinizi veya tıbbi kayıtlarınızı ASLA toplamıyoruz.",
    useTitle: "Bilgileri Nasıl Kullanıyoruz",
    p4: "Toplanan bilgileri şu amaçlarla kullanırız:",
    l2_1: "Web sitesi performansını artırmak",
    l2_2: "Trafik ve kullanım alışkanlıklarını analiz etmek",
    l2_3: "Hataları düzeltmek ve kullanıcı deneyimini optimize etmek",
    l2_4: "Spam ve kötüye kullanıma karşı koruma sağlamak",
    cookiesTitle: "Çerezler",
    p5: "Web sitemiz çerezleri şu amaçlarla kullanabilir:",
    l3_1: "Kullanıcı tercihlerini hatırlamak",
    l3_2: "Performansı artırmak",
    l3_3: "Ziyaretçi davranışlarını analiz etmek",
    p6: "Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.",
    thirdTitle: "Üçüncü Taraf Hizmetleri",
    p7: "Şu üçüncü taraf hizmetlerini kullanabiliriz:",
    l4_1: "Analitik sağlayıcıları",
    l4_2: "Reklam ağları",
    l4_3: "Barındırma (hosting) sağlayıcıları",
    p8: "Bu hizmetler, kendi gizlilik politikalarına göre sınırlı teknik veri toplayabilir.",
    securityTitle: "Veri Güvenliği",
    p9: "Verilerinizi korumak için makul önlemler alıyoruz, ancak internet üzerinden hiçbir iletim tamamen güvenli değildir.",
    linksTitle: "Dış Bağlantılar",
    p10: "Web sitemiz harici sitelere bağlantılar içerebilir. Üçüncü taraf sitelerin gizlilik uygulamalarından sorumlu değiliz.",
    childTitle: "Çocukların Gizliliği",
    p11: "Bu web sitesi 13 yaşın altındaki çocuklara yönelik değildir.",
    consentTitle: "Rıza",
    p12: "Bu web sitesini kullanarak bu Gizlilik Politikasını kabul etmiş olursunuz.",
    changesTitle: "Politika Değişiklikleri",
    p13: "Bu Gizlilik Politikasını dilediğimiz zaman önceden haber vermeksizin güncelleyebiliriz.",
    contactTitle: "İletişim Bilgileri",
    p14_1: "Bu gizlilik politikası hakkında sorularınız varsa veya verilerinizin silinmesini talep ediyorsanız lütfen ",
    linkText: "iletişim sayfamızı",
    p14_2: " kullanın veya şu adrese e-posta gönderin: ",
    h11: "Uyku Sağlığı Kılavuzları",
    p15: "Uykunuzu optimize etmek hakkında daha fazla bilgi edinmek için bilim destekli kılavuzlarımızı okuyun:",
    g1: "Uyku Döngüleri Açıklandı: Dinlenmenin Bilimi",
    g2: "REM Uykusu Nedir ve Neden Önemlidir?",
    g3: "Yaşa Göre Tavsiye Edilen Uyku Saatleri",
    g4: "Uyumak ve Uyanmak İçin En İyi Zaman"
  },
  id: {
    lastUpdated: "Pembaruan Terakhir: Mei 2026",
    p1: "Selamat datang di sleepcalculater.online. Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan informasi yang kami kumpulkan dan cara melindunginya.",
    infoTitle: "Informasi yang Kami Kumpulkan",
    p2: "Kami dapat mengumpulkan:",
    l1_1: "Informasi dasar perangkat dan peramban",
    l1_2: "Data penggunaan dan analitik situs",
    l1_3: "Cookie dan teknologi serupa",
    l1_4: "Informasi kontak yang dikirim secara sukarela",
    p3: "Kami TIDAK mengumpulkan riwayat medis pribadi atau catatan kesehatan sensitif.",
    useTitle: "Bagaimana Kami Menggunakan Informasi",
    p4: "Kami menggunakan informasi untuk:",
    l2_1: "Meningkatkan kinerja situs web",
    l2_2: "Menganalisis lalu lintas dan perilaku penggunaan",
    l2_3: "Memperbaiki bug dan mengoptimalkan pengalaman pengguna",
    l2_4: "Melindungi dari spam dan penyalahgunaan",
    cookiesTitle: "Cookie",
    p5: "Situs kami dapat menggunakan cookie untuk:",
    l3_1: "Mengingat preferensi pengguna",
    l3_2: "Meningkatkan kinerja",
    l3_3: "Menganalisis perilaku pengunjung",
    p6: "Anda dapat menonaktifkan cookie melalui pengaturan peramban Anda.",
    thirdTitle: "Layanan Pihak Ketiga",
    p7: "Kami dapat menggunakan layanan pihak ketiga seperti:",
    l4_1: "Penyedia analitik",
    l4_2: "Jaringan periklanan",
    l4_3: "Penyedia hosting",
    p8: "Layanan ini dapat mengumpulkan data teknis terbatas sesuai dengan kebijakan privasi mereka.",
    securityTitle: "Keamanan Data",
    p9: "Kami mengambil langkah-langkah wajar untuk melindungi data, tetapi tidak ada transmisi internet yang benar-benar aman.",
    linksTitle: "Tautan Eksternal",
    p10: "Situs kami dapat berisi tautan ke situs luar. Kami tidak bertanggung jawab atas konten atau kebijakan privasi pihak ketiga.",
    childTitle: "Privasi Anak-anak",
    p11: "Situs web ini tidak ditujukan untuk anak-anak di bawah usia 13 tahun.",
    consentTitle: "Persetujuan",
    p12: "Dengan menggunakan situs kami, Anda menyetujui Kebijakan Privasi ini.",
    changesTitle: "Perubahan Kebijakan",
    p13: "Kami dapat memperbarui kebijakan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.",
    contactTitle: "Informasi Kontak",
    p14_1: "Jika Anda memiliki pertanyaan tentang kebijakan ini atau ingin meminta penghapusan data, silakan gunakan ",
    linkText: "halaman kontak kami",
    p14_2: " atau kirim email ke ",
    h11: "Panduan Kesehatan Tidur",
    p15: "Untuk mempelajari lebih lanjut tentang mengoptimalkan jadwal istirahat, baca panduan riset kami:",
    g1: "Penjelasan Siklus Tidur: Ilmu Istirahat",
    g2: "Apa itu Tidur REM dan Mengapa Sangat Penting",
    g3: "Rekomendasi Durasi Tidur Berdasarkan Usia",
    g4: "Waktu Terbaik untuk Tidur dan Bangun"
  },
  vi: {
    lastUpdated: "Cập nhật lần cuối: Tháng 5 năm 2026",
    p1: "Chào mừng bạn đến với sleepcalculater.online. Quyền riêng tư của bạn rất quan trọng với chúng tôi. Chính sách này giải thích thông tin chúng tôi thu thập và cách bảo vệ.",
    infoTitle: "Thông tin chúng tôi thu thập",
    p2: "Chúng tôi có thể thu thập:",
    l1_1: "Thông tin cơ bản về thiết bị và trình duyệt của bạn",
    l1_2: "Dữ liệu sử dụng và phân tích lưu lượng truy cập",
    l1_3: "Cookies và các công nghệ tương tự",
    l1_4: "Thông tin liên hệ do bạn tự nguyện cung cấp",
    p3: "Chúng tôi KHÔNG thu thập hồ sơ bệnh án hoặc lịch sử sức khỏe cá nhân nhạy cảm.",
    useTitle: "Cách chúng tôi sử dụng thông tin",
    p4: "Chúng tôi sử dụng thông tin để:",
    l2_1: "Cải thiện hiệu suất trang web của chúng tôi",
    l2_2: "Phân tích lưu lượng và hành vi sử dụng của người dùng",
    l2_3: "Sửa lỗi và tối ưu hóa trải nghiệm người dùng",
    l2_4: "Bảo vệ trang web khỏi thư rác và hành vi lạm dụng",
    cookiesTitle: "Cookies",
    p5: "Trang web của chúng tôi có thể sử dụng cookies để:",
    l3_1: "Ghi nhớ các tùy chọn cá nhân của người dùng",
    l3_2: "Nâng cao hiệu suất hoạt động",
    l3_3: "Phân tích hành vi của khách truy cập",
    p6: "Bạn có thể tắt cookies thông qua phần cài đặt trình duyệt của mình.",
    thirdTitle: "Dịch vụ của bên thứ ba",
    p7: "Chúng tôi có thể sử dụng dịch vụ của bên thứ ba như:",
    l4_1: "Nhà cung cấp dịch vụ phân tích dữ liệu",
    l4_2: "Mạng lưới quảng cáo liên kết",
    l4_3: "Nhà cung cấp dịch vụ lưu trữ máy chủ",
    p8: "Các dịch vụ này thu thập dữ liệu kỹ thuật có giới hạn theo chính sách riêng của họ.",
    securityTitle: "Bảo mật dữ liệu",
    p9: "Chúng tôi áp dụng các biện pháp phù hợp để bảo vệ dữ liệu, dù không có giao dịch internet nào an toàn 100%.",
    linksTitle: "Liên kết ngoài",
    p10: "Trang web có thể chứa liên kết đến các trang bên ngoài. Chúng tôi không chịu trách nhiệm về nội dung của họ.",
    childTitle: "Quyền riêng tư của trẻ em",
    p11: "Trang web này không dành cho trẻ em dưới 13 tuổi.",
    consentTitle: "Sự đồng ý",
    p12: "Bằng việc sử dụng trang web của chúng tôi, bạn đồng ý với Chính sách bảo mật này.",
    changesTitle: "Thay đổi chính sách",
    p13: "Chúng tôi có thể cập nhật chính sách này bất kỳ lúc nào mà không cần báo trước.",
    contactTitle: "Thông tin liên hệ",
    p14_1: "Nếu bạn có câu hỏi về chính sách này hoặc muốn yêu cầu xóa dữ liệu, vui lòng truy cập ",
    linkText: "trang liên hệ của chúng tôi",
    p14_2: " hoặc gửi email trực tiếp đến ",
    h11: "Cẩm nang Sức khỏe Giấc ngủ",
    p15: "Để hiểu thêm về việc tối ưu hóa chu kỳ sinh học, hãy đọc các cẩm nang của chúng tôi:",
    g1: "Giải mã Chu kỳ Giấc ngủ: Khoa học của Sự Nghỉ ngơi",
    g2: "Giấc ngủ REM là gì và Tại sao Nó lại Quan trọng",
    g3: "Khuyến nghị Số Giờ Ngủ theo Độ tuổi",
    g4: "Thời điểm Tốt nhất để Ngủ và Thức dậy"
  },
  pl: {
    lastUpdated: "Ostatnia aktualizacja: Maj 2026",
    p1: "Witaj na sleepcalculater.online. Twoja prywatność jest dla nas priorytetem. Niniejsza Polityka Prywatności określa, jakie informacje zbieramy i jak je chronimy.",
    infoTitle: "Informacje, które zbieramy",
    p2: "Możemy zbierać:",
    l1_1: "Podstawowe informacje o urządzeniu i przeglądarce",
    l1_2: "Statystyki użytkowania oraz analizy ruchu",
    l1_3: "Pliki cookie (ciasteczka) i podobne technologie",
    l1_4: "Dobrowolnie przekazane dane kontaktowe",
    p3: "NIE zbieramy wrażliwych danych medycznych ani historii zdrowotnej.",
    useTitle: "Jak wykorzystujemy informacje",
    p4: "Zebrane dane wykorzystujemy do:",
    l2_1: "Udoskonalania wydajności naszej witryny",
    l2_2: "Analizy ruchu oraz zachowań użytkowników",
    l2_3: "Usuwania błędów i optymalizacji interfejsu",
    l2_4: "Zabezpieczenia przed spamem i nadużyciami",
    cookiesTitle: "Pliki Cookie",
    p5: "Nasza strona może używać ciasteczek do:",
    l3_1: "Zapamiętywania preferencji użytkowników",
    l3_2: "Zwiększania wydajności strony",
    l3_3: "Analizy zachowań odwiedzających",
    p6: "Możesz wyłączyć pliki cookie w ustawieniach swojej przeglądarki.",
    thirdTitle: "Usługi podmiotów trzecich",
    p7: "Możemy korzystać z usług zewnętrznych, takich jak:",
    l4_1: "Dostawcy usług analitycznych",
    l4_2: "Sieci reklamowe",
    l4_3: "Dostawcy hostingu",
    p8: "Podmioty te zbierają ograniczone dane techniczne zgodnie z własną polityką prywatności.",
    securityTitle: "Bezpieczeństwo danych",
    p9: "Stosujemy odpowiednie środki ochrony danych, ale żadna transmisja w internecie nie jest w 100% bezpieczna.",
    linksTitle: "Linki zewnętrzne",
    p10: "Nasza strona może zawierać odnośniki do innych witryn. Nie odpowiadamy za ich politykę prywatności.",
    childTitle: "Prywatność dzieci",
    p11: "Strona nie jest przeznaczona dla dzieci poniżej 13 roku życia.",
    consentTitle: "Zgoda",
    p12: "Korzystając z tej witryny, wyrażasz zgodę na niniejszą Politykę Prywatności.",
    changesTitle: "Zmiany w polityce",
    p13: "Zastrzegamy sobie prawo do aktualizacji tej polityki w dowolnym momencie bez uprzedzenia.",
    contactTitle: "Dane kontaktowe",
    p14_1: "W przypadku pytań dotyczących prywatności lub chęci usunięcia danych, prosimy o skorzystanie z naszej ",
    linkText: "strony kontaktowej",
    p14_2: " lub kontakt mailowy pod adresem ",
    h11: "Poradniki o Śnie",
    p15: "Dowiedz się więcej o higienie snu i rytmie dobowym z naszych publikacji naukowych:",
    g1: "Wyjaśnienie Cykli Snu: Nauka o Odpoczynku",
    g2: "Czym Jest Sen REM i Dlaczego Jest Ważny",
    g3: "Zalecana Liczba Godzin Snu według Wieku",
    g4: "Najlepszy Czas na Sen i Pobudkę"
  }
};
