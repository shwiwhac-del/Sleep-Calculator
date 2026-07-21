import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

export default function Terms() {
  const navigate = useNavigate();
  const { t, currentLang, getLocalizedPath } = useLanguage();

  const handleBack = () => {
    navigate(getLocalizedPath('/'));
  };

  const content = LOCALIZED_TERMS[currentLang] || LOCALIZED_TERMS['en'];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> {t('common.back')}</button>
      </div>
      
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">{t('pages.terms.title')}</h1>
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-6 md:mb-8">{content.lastUpdated}</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <p>
              {content.p1}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h1}</h2>
            <p className="mb-4">{content.p2}</p>
            <p className="mb-4">{content.p3}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{content.l1_1}</li>
              <li>{content.l1_2}</li>
              <li>{content.l1_3}</li>
              <li>{content.l1_4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h2}</h2>
            <p>
              {content.p4}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h3}</h2>
            <p className="mb-4">{content.p5}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{content.l2_1}</li>
              <li>{content.l2_2}</li>
              <li>{content.l2_3}</li>
            </ul>
            <p>{content.p6}</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h4}</h2>
            <p>
              {content.p7}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h5}</h2>
            <p>
              {content.p8}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h6}</h2>
            <p className="mb-4">{content.p9}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{content.l3_1}</li>
              <li>{content.l3_2}</li>
              <li>{content.l3_3}</li>
              <li>{content.l3_4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h7}</h2>
            <p>
              {content.p10}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h8}</h2>
            <p>
              {content.p11}
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h9}</h2>
            <p className="mb-4">
              {content.p12}
            </p>
            <p>
              {content.p13}<Link to={getLocalizedPath('/contact')} className="text-[#7C3AED] font-bold hover:underline">{content.linkText}</Link>{content.p14}<a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E5E7EB] dark:border-gray-800">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">{content.h10}</h2>
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

const LOCALIZED_TERMS: Record<string, Record<string, any>> = {
  en: {
    lastUpdated: "Last Updated: May 2026",
    p1: "By accessing and using sleepcalculater.online, you agree to the following Terms and Conditions.",
    h1: "Website Usage",
    p2: "This website is provided for informational and educational purposes only.",
    p3: "Users agree not to:",
    l1_1: "Abuse or attack the website",
    l1_2: "Attempt unauthorized access",
    l1_3: "Copy or redistribute website content without permission",
    l1_4: "Use automated systems to overload the website",
    h2: "No Professional Advice",
    p4: "The sleep calculations and recommendations provided on this website are general informational estimates and should not be considered professional medical advice.",
    h3: "Accuracy of Information",
    p5: "We try to provide accurate information and calculations, but we do not guarantee:",
    l2_1: "Complete accuracy",
    l2_2: "Continuous availability",
    l2_3: "Error-free operation",
    p6: "Users use the website at their own risk.",
    h4: "Intellectual Property",
    p7: "All website content, branding, logos, design elements, and tools are protected by copyright and applicable laws.",
    h5: "Third-Party Links",
    p8: "We may include links to third-party websites. We are not responsible for their content, services, or policies.",
    h6: "Limitation of Liability",
    p9: "sleepcalculater.online shall not be liable for:",
    l3_1: "Any direct or indirect damages",
    l3_2: "Health-related decisions",
    l3_3: "Sleep issues or medical consequences",
    l3_4: "Loss of data or service interruptions",
    h7: "Modifications",
    p10: "We reserve the right to modify or discontinue any part of the website at any time without notice.",
    h8: "Termination",
    p11: "We may restrict or block access to users who violate these terms.",
    h9: "Governing Terms & Questions",
    p12: "By continuing to browse, calculate, or read guides on this website, you explicitly agree to these Terms and Conditions.",
    p13: "If you have any questions or require clarifications about our acceptable service guidelines, please head to our ",
    linkText: "Contact form page",
    p14: " or send direct email coordinates to ",
    h10: "Circadian Rhythm & Bedtime Resources",
    p15: "We highly recommend digesting our peer-reviewed sleep optimization guides to develop wholesome resting calendars:",
    g1: "Sleep Cycles Explained: Science of Rest",
    g2: "What Is REM Sleep and Why It Matters",
    g3: "Recommended Sleep Hours by Age",
    g4: "Best Time to Sleep and Wake Up"
  },
  es: {
    lastUpdated: "Última actualización: Mayo de 2026",
    p1: "Al acceder y utilizar sleepcalculater.online, usted acepta los siguientes Términos y Condiciones.",
    h1: "Uso del sitio web",
    p2: "Este sitio web se proporciona únicamente con fines informativos y educativos.",
    p3: "Los usuarios aceptan no:",
    l1_1: "Abusar o atacar el sitio web",
    l1_2: "Intentar acceso no autorizado",
    l1_3: "Copiar o redistribuir el contenido sin permiso",
    l1_4: "Utilizar sistemas automatizados para sobrecargar el sitio web",
    h2: "Sin asesoramiento profesional",
    p4: "Los cálculos de sueño y recomendaciones proporcionados son estimaciones informativas y no constituyen consejos médicos profesionales.",
    h3: "Exactitud de la información",
    p5: "Intentamos proporcionar información y cálculos precisos, pero no garantizamos:",
    l2_1: "Exactitud completa",
    l2_2: "Disponibilidad continua",
    l2_3: "Funcionamiento libre de errores",
    p6: "Los usuarios utilizan el sitio web bajo su propio riesgo.",
    h4: "Propiedad intelectual",
    p7: "Todo el contenido del sitio web, marcas, logotipos, diseño y herramientas están protegidos por derechos de autor y las leyes aplicables.",
    h5: "Enlaces de terceros",
    p8: "Podemos incluir enlaces a sitios de terceros. No somos responsables de su contenido, servicios o políticas.",
    h6: "Limitación de responsabilidad",
    p9: "sleepcalculater.online no será responsable por:",
    l3_1: "Cualquier daño directo o indirecto",
    l3_2: "Decisiones relacionadas con la salud",
    l3_3: "Problemas de sueño o consecuencias médicas",
    l3_4: "Pérdida de datos o interrupción del servicio",
    h7: "Modificaciones",
    p10: "Nos reservamos el derecho de modificar o suspender cualquier parte del sitio web en cualquier momento sin previo aviso.",
    h8: "Terminación",
    p11: "Podemos restringir o bloquear el acceso a usuarios que violen estos términos.",
    h9: "Términos aplicables y preguntas",
    p12: "Al continuar navegando, calculando o leyendo guías en este sitio web, acepta explícitamente estos Términos y Condiciones.",
    p13: "Si tiene alguna pregunta, diríjase a nuestra ",
    linkText: "página de contacto",
    p14: " o envíenos un correo directo a ",
    h10: "Recursos de ritmo circadiano y hora de acostarse",
    p15: "Recomendamos leer nuestras guías de optimización del sueño para desarrollar hábitos saludables de descanso:",
    g1: "Ciclos del Sueño Explicados: Ciencia del Descanso",
    g2: "Qué es el Sueño REM y Por Qué Importa",
    g3: "Horas de Sueño Recomendadas por Edad",
    g4: "La Mejor Hora para Dormir y Despertar"
  },
  pt: {
    lastUpdated: "Última atualização: Maio de 2026",
    p1: "Ao acessar e usar o sleepcalculater.online, você concorda com os seguintes Termos e Condições.",
    h1: "Uso do site",
    p2: "Este site é fornecido apenas para fins informativos e educacionais.",
    p3: "Os usuários concordam em não:",
    l1_1: "Abusar ou atacar o site",
    l1_2: "Tentar obter acesso não autorizado",
    l1_3: "Copiar ou redistribuir o conteúdo do site sem permissão",
    l1_4: "Utilizar sistemas automatizados para sobrecarregar o site",
    h2: "Sem aconselhamento profissional",
    p4: "Os cálculos de sono e as recomendações fornecidas neste site são estimativas gerais e não devem ser considerados conselhos médicos profissionais.",
    h3: "Precisão das informações",
    p5: "Buscamos fornecer informações e cálculos precisos, mas não garantimos:",
    l2_1: "Precisão completa",
    l2_2: "Disponibilidade contínua",
    l2_3: "Operação livre de erros",
    p6: "Os usuários usam o site por sua própria conta e risco.",
    h4: "Propriedade intelectual",
    p7: "Todo o conteúdo do site, marcas, logotipos, elementos de design e ferramentas são protegidos por direitos autorais e leis aplicáveis.",
    h5: "Links de terceiros",
    p8: "Podemos incluir links para sites de terceiros. Não somos responsáveis pelo conteúdo, serviços ou políticas deles.",
    h6: "Limitação de responsabilidade",
    p9: "O sleepcalculater.online não será responsável por:",
    l3_1: "Quaisquer danos diretos ou indiretos",
    l3_2: "Decisões relacionadas à saúde",
    l3_3: "Problemas de sono ou consequências médicas",
    l3_4: "Perda de dados ou interrupções de serviço",
    h7: "Modificações",
    p10: "Reservamo-nos o direito de modificar ou descontinuar qualquer parte do site a qualquer momento, sem aviso prévio.",
    h8: "Rescisão",
    p11: "Podemos restringir ou bloquear o acesso de usuários que violem estes termos.",
    h9: "Termos aplicáveis e dúvidas",
    p12: "Ao continuar a navegar, calcular ou ler guias neste site, você concorda explicitamente com estes Termos e Condições.",
    p13: "Se você tiver alguma dúvida, acesse nossa ",
    linkText: "página de formulário de contato",
    p14: " ou envie um e-mail diretamente para ",
    h10: "Recursos de ritmo circadiano e hora de dormir",
    p15: "Recomendamos fortemente a leitura de nossos guias de otimização de sono para desenvolver rotinas saudáveis:",
    g1: "Ciclos do Sono Explicados: A Ciência do Descanso",
    g2: "O que é o Sono REM e por que ele importa",
    g3: "Horas de Sono Recomendadas por Idade",
    g4: "Melhor Horário para Dormir e Acordar"
  },
  fr: {
    lastUpdated: "Dernière mise à jour : Mai 2026",
    p1: "En accédant à sleepcalculater.online, vous acceptez de vous soumettre aux présentes Conditions Générales d'Utilisation.",
    h1: "Utilisation du site",
    p2: "Ce site web est mis à disposition uniquement à des fins informatives et éducatives.",
    p3: "Les utilisateurs s'engagent à ne pas :",
    l1_1: "Abuser ou attaquer le site",
    l1_2: "Tenter d'accéder à des zones non autorisées",
    l1_3: "Copier ou redistribuer le contenu du site sans autorisation",
    l1_4: "Utiliser des robots ou systèmes automatisés pour surcharger le serveur",
    h2: "Absence d'avis médical professionnel",
    p4: "Les calculs de sommeil et les conseils fournis sur ce site sont des estimations informatives et ne sauraient se substituer à un avis médical professionnel.",
    h3: "Exactitude des données",
    p5: "Nous nous efforçons d'assurer l'exactitude de nos calculateurs, mais nous ne garantissons pas :",
    l2_1: "Une exactitude absolue",
    l2_2: "Une disponibilité ininterrompue",
    l2_3: "Une absence totale d'erreurs",
    p6: "L'utilisation du site se fait aux risques et périls de l'utilisateur.",
    h4: "Propriété intellectuelle",
    p7: "L'ensemble du contenu, de la charte graphique, des outils et des logos est protégé par le droit d'auteur.",
    h5: "Liens externes",
    p8: "Nous pouvons insérer des liens vers des sites tiers. Nous déclinons toute responsabilité quant à leur contenu.",
    h6: "Limitation de responsabilité",
    p9: "sleepcalculater.online ne pourra être tenu responsable de :",
    l3_1: "Tout dommage direct ou indirect",
    l3_2: "Toute décision relative à la santé",
    l3_3: "Tout trouble ou problème médical du sommeil",
    l3_4: "Toute perte de données ou coupure de service",
    h7: "Modifications",
    p10: "Nous nous réservons le droit de modifier ou de cesser le service à tout moment et sans préavis.",
    h8: "Suspension d'accès",
    p11: "Nous pouvons restreindre ou bloquer l'accès aux utilisateurs qui enfreignent ces conditions.",
    h9: "Loi applicable et questions",
    p12: "En poursuivant votre navigation ou en utilisant nos outils, vous acceptez sans réserve ces Conditions Générales d'Utilisation.",
    p13: "Si vous avez des questions, rendez-vous sur notre ",
    linkText: "page de contact",
    p14: " ou contactez-nous directement par e-mail à ",
    h10: "Ressources sur le sommeil et le rythme circadien",
    p15: "Consultez nos articles pour perfectionner votre routine nocturne :",
    g1: "Comprendre les Cycles du Sommeil",
    g2: "Qu'est-ce que le Sommeil REM et son Importance",
    g3: "Recommandations de Durée de Sommeil par Âge",
    g4: "Le Meilleur Moment pour Dormir et se Réveiller"
  },
  de: {
    lastUpdated: "Zuletzt aktualisiert: Mai 2026",
    p1: "Durch den Zugriff auf und die Nutzung von sleepcalculater.online erklären Sie sich mit den folgenden Nutzungsbedingungen einverstanden.",
    h1: "Nutzung der Website",
    p2: "Diese Website wird ausschließlich zu Informations- und Bildungszwecken bereitgestellt.",
    p3: "Nutzer verpflichten sich, Folgendes zu unterlassen:",
    l1_1: "Missbrauch oder Angriffe auf die Website",
    l1_2: "Versuche unbefugten Zugriffs",
    l1_3: "Inhalte ohne Erlaubnis zu kopieren oder zu verbreiten",
    l1_4: "Automatisierte Systeme zur Überlastung der Website einzusetzen",
    h2: "Keine medizinische Beratung",
    p4: "Die auf dieser Website bereitgestellten Berechnungen und Empfehlungen sind allgemeine Richtwerte und ersetzen keine professionelle medizinische Beratung.",
    h3: "Genauigkeit der Informationen",
    p5: "Wir bemühen uns um präzise Berechnungen, garantieren jedoch nicht:",
    l2_1: "Vollständige Fehlerfreiheit",
    l2_2: "Ständige Verfügbarkeit",
    l2_3: "Unterbrechungsfreien Betrieb",
    p6: "Die Nutzung der Website erfolgt auf eigene Gefahr.",
    h4: "Geistiges Eigentum",
    p7: "Sämtliche Inhalte, Marken, Logos und Tools dieser Website sind urheberrechtlich geschützt.",
    h5: "Externe Links",
    p8: "Wir verlinken unter Umständen auf externe Websites, sind für deren Inhalte jedoch nicht verantwortlich.",
    h6: "Haftungsbeschränkung",
    p9: "sleepcalculater.online haftet nicht für:",
    l3_1: "Direkte oder indirekte Schäden jeglicher Art",
    l3_2: "Gesundheitsbezogene Entscheidungen der Nutzer",
    l3_3: "Schlafstörungen oder medizinische Folgen",
    l3_4: "Datenverlust oder Systemunterbrechungen",
    h7: "Änderungen",
    p10: "Wir behalten uns das Update oder die Einstellung von Website-Teilen jederzeit ohne Vorankündigung vor.",
    h8: "Ausschluss von Nutzern",
    p11: "Bei Verstößen gegen diese Bedingungen kann der Zugang gesperrt werden.",
    h9: "Geltende Bedingungen & Fragen",
    p12: "Mit der weiteren Nutzung dieser Website erklären Sie sich mit diesen Bedingungen einverstanden.",
    p13: "Sollten Sie Fragen haben, besuchen Sie bitte unsere ",
    linkText: "Kontaktseite",
    p14: " oder schreiben Sie uns per E-Mail an ",
    h10: "Ressourcen zur Schlafoptimierung",
    p15: "Wir empfehlen Ihnen unsere Schlafratgeber zur Entwicklung gesunder Schlafroutinen:",
    g1: "Schlafzyklen erklärt: Die Wissenschaft des Ausruhens",
    g2: "Was ist REM-Schlaf und warum ist er wichtig?",
    g3: "Empfohlene Schlafdauer nach Alter",
    g4: "Beste Zeit zum Schlafen und Aufwachen"
  },
  it: {
    lastUpdated: "Ultimo aggiornamento: Maggio 2026",
    p1: "Accedendo e utilizzando sleepcalculater.online, l'utente accetta i seguenti Termini e Condizioni.",
    h1: "Uso del sito web",
    p2: "Questo sito web viene fornito esclusivamente a scopo informativo ed educativo.",
    p3: "Gli utenti si impegnano a non:",
    l1_1: "Abusare o attaccare il sito web",
    l1_2: "Tentare accessi non autorizzati",
    l1_3: "Copiare o ridistribuire i contenuti senza autorizzazione scritta",
    l1_4: "Utilizzare sistemi automatizzati per sovraccaricare il sito",
    h2: "Nessun parere professionale",
    p4: "I calcoli del sonno e i suggerimenti forniti sono stime informative di carattere generale e non sostituiscono un parere medico professionale.",
    h3: "Accuratezza delle informazioni",
    p5: "Pur cercando di fornire calcoli precisi, non garantiamo:",
    l2_1: "Accuratezza assoluta",
    l2_2: "Disponibilità continua del servizio",
    l2_3: "Funzionamento esente da errori",
    p6: "L'uso del sito avviene a rischio esclusivo dell'utente.",
    h4: "Proprietà intellettuale",
    p7: "Tutti i contenuti, i marchi, i loghi, la grafica e i calcolatori sono protetti dalle leggi sul copyright.",
    h5: "Link esterni",
    p8: "Potremmo includere link a siti terzi di cui non monitoriamo né controlliamo privacy e contenuti.",
    h6: "Limitazione di responsabilità",
    p9: "sleepcalculater.online non sarà responsabile per:",
    l3_1: "Danni diretti o indiretti di qualsiasi natura",
    l3_2: "Decisioni mediche o relative allo stile di vita",
    l3_3: "Problemi del sonno o patologie mediche conseguenti",
    l3_4: "Perdita di dati o interruzioni di servizio",
    h7: "Modifiche",
    p10: "Ci riserviamo il diritto di modificare o sospendere qualsiasi sezione del sito senza preavviso.",
    h8: "Sospensione",
    p11: "Possiamo bloccare o limitare l'accesso agli utenti che violano questi termini.",
    h9: "Condizioni generali e contatti",
    p12: "Continuando la navigazione, l'uso dei calcolatori e la lettura delle guide, accetti espressamente questi Termini.",
    p13: "Se hai domande, visita la nostra ",
    linkText: "pagina di contatto",
    p14: " o inviaci un'email a ",
    h10: "Risorse sul sonno e sul ritmo circadiano",
    p15: "Consigliamo la lettura delle nostre guide per strutturare un sonno riposante:",
    g1: "Cicli del sonno spiegati: La scienza del riposo",
    g2: "Cos'è il sonno REM e perché è fondamentale",
    g3: "Ore di sonno raccomandate in base all'età",
    g4: "Il momento migliore per dormire e svegliarsi"
  },
  nl: {
    lastUpdated: "Laatst bijgewerkt: Mei 2026",
    p1: "Door sleepcalculater.online te bezoeken en te gebruiken, gaat u akkoord met de volgende Algemene Voorwaarden.",
    h1: "Websitegebruik",
    p2: "Deze website is uitsluitend bedoeld voor informatieve en educatieve doeleinden.",
    p3: "Gebruikers gaan ermee akkoord om niet:",
    l1_1: "De website te misbruiken of aan te vallen",
    l1_2: "Ongeautoriseerde toegang te proberen te verkrijgen",
    l1_3: "Inhoud te kopiëren of te herdistribueren zonder toestemming",
    l1_4: "Geautomatiseerde systemen te gebruiken om de server te overbelasten",
    h2: "Geen medisch advies",
    p4: "De slaapberekeningen en aanbevelingen op deze website zijn algemene schattingen en mogen niet als medisch advies worden beschouwd.",
    h3: "Nauwkeurigheid van informatie",
    p5: "We proberen nauwkeurige gegevens te leveren, maar garanderen geen:",
    l2_1: "Volledige nauwkeurigheid",
    l2_2: "Continue beschikbaarheid",
    l2_3: "Foutvrije werking",
    p6: "Gebruikers gebruiken de website op eigen risico.",
    h4: "Intellectueel eigendom",
    p7: "Alle inhoud van de website, branding, logo's en tools zijn beschermd door auteursrecht en toepasselijke wetgeving.",
    h5: "Externe links",
    p8: "We kunnen links naar derden plaatsen. Wij zijn niet verantwoordelijk voor hun inhoud of beleid.",
    h6: "Beperking van aansprakelijkheid",
    p9: "sleepcalculater.online is niet aansprakelijk voor:",
    l3_1: "Directe of indirecte schade",
    l3_2: "Gezondheidsgerelateerde beslissingen",
    l3_3: "Slaapproblemen of medische gevolgen",
    l3_4: "Gegevensverlies of dienstonderbrekingen",
    h7: "Wijzigingen",
    p10: "We behouden ons het recht voor om de website op elk moment zonder voorafgaande kennisgeving aan te passen of stop te zetten.",
    h8: "Beëindiging",
    p11: "We kunnen de toegang blokkeren voor gebruikers die deze voorwaarden schenden.",
    h9: "Toepasselijke voorwaarden & vragen",
    p12: "Door deze website te blijven gebruiken, stemt u uitdrukkelijk in met deze Algemene Voorwaarden.",
    p13: "Als u vragen heeft, kunt u terecht op onze ",
    linkText: "contactpagina",
    p14: " of een e-mail sturen naar ",
    h10: "Slaapgidsen & circadiane bronnen",
    p15: "We raden aan onze wetenschappelijke slaapgidsen te lezen voor gezonde slaap routines:",
    g1: "Uitleg over Slaapcycli: Wetenschap van Rust",
    g2: "Wat is REM-slaap en Waarom is het Belangrijk?",
    g3: "Aanbevolen Slaapuren per Leeftijd",
    g4: "Beste Tijd om te Slapen en Wakker te Worden"
  },
  tr: {
    lastUpdated: "Son Güncelleme: Mayıs 2026",
    p1: "sleepcalculater.online adresine erişerek ve kullanarak aşağıdaki Şart ve Koşulları kabul etmiş olursunuz.",
    h1: "Web Sitesi Kullanımı",
    p2: "Bu web sitesi yalnızca bilgilendirme ve eğitim amaçlı sunulmaktadır.",
    p3: "Kullanıcılar şunları yapmamayı kabul eder:",
    l1_1: "Web sitesini kötüye kullanmak veya saldırmak",
    l1_2: "Yetkisiz erişim girişiminde bulunmak",
    l1_3: "İzin almadan web sitesi içeriğini kopyalamak veya yeniden dağıtmak",
    l1_4: "Sistemi aşırı yüklemek için otomatik sistemler kullanmak",
    h2: "Profesyonel Tavsiye Değildir",
    p4: "Bu web sitesinde sağlanan uyku hesaplamaları ve önerileri genel bilgi amaçlı tahminlerdir ve profesyonel tıbbi tavsiye olarak değerlendirilmemelidir.",
    h3: "Bilgilerin Doğruluğu",
    p5: "Doğru bilgi ve hesaplamalar sunmaya çalışıyoruz ancak şunları garanti etmiyoruz:",
    l2_1: "Tam doğruluk",
    l2_2: "Sürekli kullanılabilirlik",
    l2_3: "Hatasız çalışma",
    p6: "Kullanıcılar web sitesini kendi sorumluluklarında kullanırlar.",
    h4: "Fikri Mülkiyet",
    p7: "Tüm web sitesi içeriği, marka, logolar, tasarım öğeleri ve araçlar telif hakkı ve yürürlükteki yasalarla korunmaktadır.",
    h5: "Üçüncü Taraf Bağlantıları",
    p8: "Üçüncü taraf web sitelerine bağlantılar ekleyebiliriz. Bunların içeriğinden veya politikalarından sorumlu değiliz.",
    h6: "Sorumluluğun Sınırlandırılması",
    p9: "sleepcalculater.online aşağıdakilerden sorumlu tutulamaz:",
    l3_1: "Herhangi bir doğrudan veya dolaylı zarar",
    l3_2: "Sağlıkla ilgili alınan kararlar",
    l3_3: "Uyku sorunları veya tıbbi sonuçlar",
    l3_4: "Veri kaybı veya hizmet kesintileri",
    h7: "Değişiklikler",
    p10: "Web sitesinin herhangi bir bölümünü dilediğimiz zaman bildirimde bulunmaksızın değiştirme veya durdurma hakkımızı saklı tutarız.",
    h8: "Erişim Kısıtlama",
    p11: "Bu şartları ihlal eden kullanıcıların erişimini kısıtlayabilir veya engelleyebiliriz.",
    h9: "Geçerli Koşullar ve Sorular",
    p12: "Bu web sitesinde gezinmeye, hesaplama yapmaya veya kılavuzları okumaya devam ederek bu Şart ve Koşulları açıkça kabul etmiş olursunuz.",
    p13: "Herhangi bir sorunuz varsa lütfen ",
    linkText: "iletişim formumuza",
    p14: " gidin veya şu adrese e-posta gönderin: ",
    h10: "Sirkadiyen Ritim ve Uyku Kaynakları",
    p15: "Sağlıklı uyku alışkanlıkları geliştirmek için uyku optimizasyon kılavuzlarımızı okumanızı tavsiye ederiz:",
    g1: "Uyku Döngüleri Açıklandı: Dinlenmenin Bilimi",
    g2: "REM Uykusu Nedir ve Neden Önemlidir?",
    g3: "Yaşa Göre Tavsiye Edilen Uyku Saatleri",
    g4: "Uyumak ve Uyanmak İçin En İyi Zaman"
  },
  id: {
    lastUpdated: "Pembaruan Terakhir: Mei 2026",
    p1: "Dengan mengakses dan menggunakan sleepcalculater.online, Anda menyetujui Syarat dan Ketentuan berikut.",
    h1: "Penggunaan Situs Web",
    p2: "Situs web ini disediakan hanya untuk tujuan informasi dan edukasi.",
    p3: "Pengguna setuju untuk tidak:",
    l1_1: "Menyalahgunakan atau menyerang situs web",
    l1_2: "Mencoba akses tanpa izin",
    l1_3: "Menyalin atau mendistribusikan ulang konten situs web tanpa izin",
    l1_4: "Menggunakan sistem otomatis untuk membebani situs web",
    h2: "Bukan Saran Medis Profesional",
    p4: "Kalkulasi tidur dan rekomendasi di situs web ini adalah perkiraan informasi umum dan tidak boleh dianggap sebagai saran medis profesional.",
    h3: "Keakuratan Informasi",
    p5: "Kami berusaha menyediakan perhitungan yang akurat, namun kami tidak menjamin:",
    l2_1: "Keakuratan penuh",
    l2_2: "Ketersediaan terus-menerus",
    l2_3: "Operasi bebas dari kesalahan",
    p6: "Pengguna menggunakan situs web ini atas risiko mereka sendiri.",
    h4: "Hak Kekayaan Intelektual",
    p7: "Semua konten situs web, merek, logo, elemen desain, dan alat dilindungi oleh hak cipta dan hukum yang berlaku.",
    h5: "Tautan Pihak Ketiga",
    p8: "Kami dapat menyertakan tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas konten atau kebijakan mereka.",
    h6: "Batasan Tanggung Jawab",
    p9: "sleepcalculater.online tidak bertanggung jawab atas:",
    l3_1: "Kerugian langsung maupun tidak langsung",
    l3_2: "Keputusan terkait kesehatan",
    l3_3: "Masalah tidur atau konsekuensi medis",
    l3_4: "Kehilangan data atau gangguan layanan",
    h7: "Modifikasi",
    p10: "Kami berhak mengubah atau menghentikan bagian mana pun dari situs web kapan saja tanpa pemberitahuan.",
    h8: "Penghentian Akses",
    p11: "Kami dapat membatasi atau memblokir akses bagi pengguna yang melanggar ketentuan ini.",
    h9: "Ketentuan Penggunaan & Pertanyaan",
    p12: "Dengan terus menjelajahi, menghitung, atau membaca panduan di situs web ini, Anda secara eksplisit menyetujui Syarat dan Ketentuan ini.",
    p13: "Jika Anda memiliki pertanyaan, silakan kunjungi ",
    linkText: "halaman formulir kontak kami",
    p14: " atau kirim email langsung ke ",
    h10: "Sumber Daya Jadwal Tidur & Ritme Sirkadian",
    p15: "Kami sangat menyarankan untuk membaca panduan tidur kami untuk mengembangkan rutinitas istirahat yang sehat:",
    g1: "Penjelasan Siklus Tidur: Ilmu Istirahat",
    g2: "Apa itu Tidur REM dan Mengapa Sangat Penting",
    g3: "Rekomendasi Durasi Tidur Berdasarkan Usia",
    g4: "Waktu Terbaik untuk Tidur dan Bangun"
  },
  vi: {
    lastUpdated: "Cập nhật lần cuối: Tháng 5 năm 2026",
    p1: "Bằng việc truy cập và sử dụng sleepcalculater.online, bạn đồng ý với các Điều khoản và Điều kiện sau đây.",
    h1: "Sử dụng Trang web",
    p2: "Trang web này được cung cấp chỉ nhằm mục đích thông tin và giáo dục.",
    p3: "Người dùng đồng ý không:",
    l1_1: "Lạm dụng hoặc tấn công trang web",
    l1_2: "Cố ý truy cập trái phép",
    l1_3: "Sao chép hoặc phân phối lại nội dung trang web khi chưa được phép",
    l1_4: "Sử dụng hệ thống tự động làm quá tải trang web",
    h2: "Không thay thế lời khuyên chuyên môn",
    p4: "Các tính toán giấc ngủ và đề xuất trên trang web này là ước tính thông tin chung và không nên coi là lời khuyên y tế chuyên nghiệp.",
    h3: "Độ chính xác của thông tin",
    p5: "Chúng tôi cố gắng cung cấp thông tin và tính toán chính xác, nhưng chúng tôi không đảm bảo:",
    l2_1: "Chính xác hoàn toàn",
    l2_2: "Tính khả dụng liên tục",
    l2_3: "Vận hành không lỗi",
    p6: "Người dùng chịu rủi ro khi sử dụng trang web.",
    h4: "Sở hữu trí tuệ",
    p7: "Tất cả nội dung trang web, thương hiệu, logo, thiết kế và công cụ đều được bảo hộ bởi bản quyền và luật pháp hiện hành.",
    h5: "Liên kết bên thứ ba",
    p8: "Chúng tôi có thể chèn liên kết đến trang web bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung của họ.",
    h6: "Giới hạn trách nhiệm",
    p9: "sleepcalculater.online không chịu trách nhiệm về:",
    l3_1: "Bất kỳ thiệt hại trực tiếp hoặc gián tiếp nào",
    l3_2: "Quyết định liên quan đến sức khỏe của người dùng",
    l3_3: "Vấn đề giấc ngủ hoặc hậu quả y tế sinh học",
    l3_4: "Mất dữ liệu hoặc gián đoạn dịch vụ máy chủ",
    h7: "Sửa đổi điều khoản",
    p10: "Chúng tôi có quyền sửa đổi hoặc ngừng cung cấp bất kỳ phần nào của trang web mà không cần thông báo.",
    h8: "Chấm dứt quyền truy cập",
    p11: "Chúng tôi có thể hạn chế hoặc chặn quyền truy cập của người dùng vi phạm các điều khoản này.",
    h9: "Điều khoản áp dụng & câu hỏi",
    p12: "Bằng cách tiếp tục duyệt, tính toán hoặc đọc hướng dẫn trên trang web, bạn đồng ý rõ ràng với các Điều khoản này.",
    p13: "Nếu bạn có câu hỏi, vui lòng truy cập ",
    linkText: "trang liên hệ của chúng tôi",
    p14: " hoặc gửi email trực tiếp đến ",
    h10: "Tài nguyên giấc ngủ & nhịp sinh học",
    p15: "Chúng tôi khuyên bạn nên tham khảo các cẩm nang tối ưu giấc ngủ để xây dựng lịch sinh hoạt lành mạnh:",
    g1: "Giải mã Chu kỳ Giấc ngủ: Khoa học của Sự Nghỉ ngơi",
    g2: "Giấc ngủ REM là gì và Tại sao Nó lại Quan trọng",
    g3: "Khuyến nghị Số Giờ Ngủ theo Độ tuổi",
    g4: "Thời điểm Tốt nhất để Ngủ và Thức dậy"
  },
  pl: {
    lastUpdated: "Ostatnia aktualizacja: Maj 2026",
    p1: "Uzyskując dostęp do witryny sleepcalculater.online i korzystając z niej, akceptujesz poniższe Warunki i Postanowienia.",
    h1: "Korzystanie z Witryny",
    p2: "Niniejsza witryna jest przeznaczona wyłącznie do celów informacyjnych i edukacyjnych.",
    p3: "Użytkownicy zobowiązują się do niepodejmowania następujących działań:",
    l1_1: "Nadużywanie lub atakowanie witryny",
    l1_2: "Próby nieautoryzowanego dostępu do serwerów",
    l1_3: "Kopiowanie lub redystrybucja zawartości bez pisemnej zgody",
    l1_4: "Używanie systemów automatycznych w celu przeciążenia witryny",
    h2: "Brak porady medycznej",
    p4: "Obliczenia i rekomendacje dostarczane przez witrynę mają charakter wyłącznie szacunkowy i nie zastępują porady lekarskiej.",
    h3: "Dokładność informacji",
    p5: "Dokładamy starań, aby zapewnić poprawne obliczenia, lecz nie gwarantujemy:",
    l2_1: "Całkowitej dokładności",
    l2_2: "Ciągłej dostępności witryny",
    l2_3: "Działania całkowicie wolnego od błędów",
    p6: "Użytkownicy korzystają z witryny na własne ryzyko.",
    h4: "Własność intelektualna",
    p7: "Wszystkie treści, znaki towarowe, logotypy, elementy projektu oraz narzędzia są chronione prawem autorskim.",
    h5: "Odnośniki do stron trzecich",
    p8: "Możemy umieszczać linki do stron zewnętrznych. Nie ponosimy odpowiedzialności za ich zawartość ani politykę prywatności.",
    h6: "Ograniczenie odpowiedzialności",
    p9: "sleepcalculater.online nie ponosi odpowiedzialności za:",
    l3_1: "Jakiekolwiek szkody bezpośrednie lub pośrednie",
    l3_2: "Decyzje zdrowotne podejmowane przez użytkowników",
    l3_3: "Problemy ze snem lub zdrowotne konsekwencje",
    l3_4: "Utratę danych lub przerwy w świadczeniu usług",
    h7: "Modyfikacje",
    p10: "Zastrzegamy sobie prawo do modyfikacji lub zaprzestania działania dowolnej części witryny w dowolnym momencie bez uprzedzenia.",
    h8: "Zablokowanie dostępu",
    p11: "Możemy ograniczyć lub zablokować dostęp użytkownikom naruszającym niniejsze warunki.",
    h9: "Warunki ogólne i zapytania",
    p12: "Kontynuując korzystanie z kalkulatorów lub poradników na tej stronie, wyrażasz jednoznaczną zgodę na te Warunki.",
    p13: "W przypadku pytań, prosimy o odwiedzenie naszej ",
    linkText: "strony kontaktowej",
    p14: " lub bezpośredni kontakt mailowy pod adresem ",
    h10: "Materiały i Publikacje o Higienie Snu",
    p15: "Zalecamy lekturę naszych autorskich artykułów o optymalizacji odpoczynku w celu budowania zdrowych nawyków:",
    g1: "Wyjaśnienie Cykli Snu: Nauka o Odpoczynku",
    g2: "Czym Jest Sen REM i Dlaczego Jest Ważny",
    g3: "Zalecana Liczba Godzin Snu według Wieku",
    g4: "Najlepszy Czas na Sen i Pobudkę"
  }
};
