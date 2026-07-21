import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

export default function About() {
  const navigate = useNavigate();
  const { t, getLocalizedPath } = useLanguage();

  const handleBack = () => {
    navigate(getLocalizedPath('/'));
  };

  const content = LOCALIZED_CONTENT[currentLang] || LOCALIZED_CONTENT['en'];

  return (
    <main className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> {t('common.back')}</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight font-serif">{t('pages.about.title')}</h1>
        
        <div className="space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            {t('pages.about.p1')}
          </p>

          <section className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif border-b border-gray-100 dark:border-[#1E293B] pb-2">{t('pages.about.cardTitle')}</h2>
            
            <p className="text-sm mt-1 text-gray-750 dark:text-gray-300">
              {t('pages.about.p2')}
            </p>
          </section>

          <section className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif border-b border-gray-100 dark:border-[#1E293B] pb-2">{content.editorialTitle}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#7C3AED] dark:text-violet-400">{content.shafiqTitle}</h3>
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  {content.shafiqBio}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{content.sarahTitle}</h3>
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  {content.sarahBio}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif">{content.sourcesTitle}</h2>
            <p className="text-sm sm:text-base">
              {content.sourcesIntro}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li>{content.sourceAASM}</li>
              <li>{content.sourceNSF}</li>
              <li>{content.sourcePubmed}</li>
              <li>{content.sourceWalker}</li>
              <li>{content.sourceJenkins}</li>
            </ul>
          </section>

          <section className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/40 rounded-2xl p-5 text-sm text-red-900 dark:text-red-300">
            <h3 className="font-bold text-red-950 dark:text-red-200 mb-1 font-serif">{content.medicalDisclaimer}</h3>
            <p>
              {t('pages.terms.text')}
            </p>
          </section>

          <section className="pt-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">{t('common.tryTool')}</h2>
            <p className="mb-4">
              <Link to={getLocalizedPath('/')} className="text-[#7C3AED] dark:text-violet-400 hover:text-[#6D28D9] dark:hover:text-violet-300 font-bold underline transition-colors">{t('common.backToCalc')}</Link>
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[13px] mt-8 pt-6 border-t border-gray-100 dark:border-[#1E293B]">
              {content.footerMotto}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

const LOCALIZED_CONTENT: Record<string, Record<string, string>> = {
  en: {
    editorialTitle: "Our Expert Editorial Team",
    shafiqTitle: "Shafiq — Lead Sleep Researcher & Founder",
    shafiqBio: "Shafiq is a sleep researcher and dedicated software developer. He translates peer-reviewed sleep physiology journals and sleep phase guidelines into easy-to-use digital interfaces that help you sleep smarter without unnecessary visual clutter.",
    sarahTitle: "Dr. Sarah Johnson, MBBS — Medical Reviewer",
    sarahBio: "Dr. Sarah Johnson is a clinical sleep specialist and medical doctor. She medically reviews our calculators and guides to guarantee clinical accuracy and alignment with contemporary standards in sleep medicine.",
    sourcesTitle: "Our Trusted Scientific Sources",
    sourcesIntro: "All tools, articles, and findings shared on this site are derived from leading research repositories, sleep guidelines, and clinical frameworks, including:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Clinical sleep hygiene standards and circadian guides.",
    sourceNSF: "National Sleep Foundation (NSF): Age-based duration recommendations.",
    sourcePubmed: "PubMed & MEDLINE: Peer-reviewed ultradian rhythm and sleep architecture research.",
    sourceWalker: "Matthew Walker, PhD: Breakthrough research from his clinical book Why We Sleep.",
    sourceJenkins: "Dr. Sarah Jenkins: Lead Sleep Science Advisor.",
    medicalDisclaimer: "Medical Disclaimer",
    footerMotto: "Built to keep sleep science simple, accessible, and highly accurate."
  },
  es: {
    editorialTitle: "Nuestro Equipo Editorial de Expertos",
    shafiqTitle: "Shafiq — Investigador de Sueño Principal y Fundador",
    shafiqBio: "Shafiq es investigador de sueño y desarrollador de software. Traduce revistas de fisiología del sueño revisadas por pares y pautas de fases de sueño en interfaces digitales sencillas.",
    sarahTitle: "Dra. Sarah Johnson, MBBS — Revisora Médica",
    sarahBio: "La Dra. Sarah Johnson es especialista clínica en sueño y médica. Revisa nuestros calculadores y guías para garantizar la precisión clínica y la alineación con los estándares actuales.",
    sourcesTitle: "Nuestras Fuentes Científicas de Confianza",
    sourcesIntro: "Todas las herramientas, artículos y hallazgos compartidos en este sitio provienen de repositorios líderes, pautas de sueño y marcos clínicos:",
    sourceAASM: "Academia Americana de Medicina del Sueño (AASM): Estándares de higiene del sueño y guías circadianas.",
    sourceNSF: "Fundación Nacional del Sueño (NSF): Recomendaciones de duración basadas en la edad.",
    sourcePubmed: "PubMed y MEDLINE: Investigaciones revisadas por pares sobre ritmo ultradiano.",
    sourceWalker: "Matthew Walker, PhD: Investigación revolucionaria de su libro clínico Why We Sleep (Por qué dormimos).",
    sourceJenkins: "Dra. Sarah Jenkins: Asesora Científica Principal de Sueño.",
    medicalDisclaimer: "Descargo de Responsabilidad Médica",
    footerMotto: "Creado para mantener la ciencia del sueño simple, accesible y muy precisa."
  },
  pt: {
    editorialTitle: "Nossa Equipe Editorial de Especialistas",
    shafiqTitle: "Shafiq — Pesquisador Principal de Sono & Fundador",
    shafiqBio: "Shafiq é pesquisador de sono e desenvolvedor de software. Traduz periódicos científicos e diretrizes de sono em ferramentas digitais simples.",
    sarahTitle: "Dra. Sarah Johnson, MBBS — Revisora Médica",
    sarahBio: "A Dra. Sarah Johnson é especialista clínica e médica do sono. Revisa clinicamente nossas calculadoras para garantir precisão científica.",
    sourcesTitle: "Nossas Fontes Científicas Confiáveis",
    sourcesIntro: "Todas as ferramentas e artigos do site são baseados em diretrizes e pesquisas conceituadas:",
    sourceAASM: "Academia Americana de Medicina do Sono (AASM): Padrões clínicos de higiene do sono.",
    sourceNSF: "National Sleep Foundation (NSF): Recomendações de duração de sono por idade.",
    sourcePubmed: "PubMed & MEDLINE: Estudos sobre ritmos ultradianos e arquitetura do sono.",
    sourceWalker: "Matthew Walker, PhD: Descobertas científicas de seu livro Why We Sleep.",
    sourceJenkins: "Dra. Sarah Jenkins: Assessora Científica de Sono.",
    medicalDisclaimer: "Aviso Médico",
    footerMotto: "Criado para tornar a ciência do sono simples, acessível e precisa."
  },
  fr: {
    editorialTitle: "Notre Équipe Éditoriale d'Experts",
    shafiqTitle: "Shafiq — Chercheur Principal en Sommeil & Fondateur",
    shafiqBio: "Shafiq est chercheur en sommeil et développeur de logiciels. Il simplifie la recherche clinique en interfaces interactives.",
    sarahTitle: "Dr Sarah Johnson, MBBS — Réviseuse Médicale",
    sarahBio: "Le Dr Sarah Johnson est une spécialiste clinique du sommeil qui examine nos outils pour valider leur exactitude scientifique.",
    sourcesTitle: "Nos Sources Scientifiques de Confiance",
    sourcesIntro: "Nos outils reposent sur des cadres cliniques de premier plan :",
    sourceAASM: "American Academy of Sleep Medicine (AASM) : Normes cliniques d'hygiène de sommeil.",
    sourceNSF: "National Sleep Foundation (NSF) : Recommandations de durée par âge.",
    sourcePubmed: "PubMed & MEDLINE : Recherches sur le rythme ultradien.",
    sourceWalker: "Matthew Walker, PhD : Recherches de son livre Why We Sleep.",
    sourceJenkins: "Dr Sarah Jenkins : Conseillère en science du sommeil.",
    medicalDisclaimer: "Avertissement Médical",
    footerMotto: "Conçu pour rendre la science du sommeil simple, accessible et ultra-précise."
  },
  de: {
    editorialTitle: "Unser wissenschaftliches Redaktionsteam",
    shafiqTitle: "Shafiq – Leitender Schlafforscher & Gründer",
    shafiqBio: "Shafiq ist Schlafforscher und Softwareentwickler. Er übersetzt medizinische Erkenntnisse in einfach nutzbare Rechner.",
    sarahTitle: "Dr. Sarah Johnson, MBBS – Medizinische Gutachterin",
    sarahBio: "Dr. Sarah Johnson ist klinische Schlafspezialistin. Sie prüft unsere Rechner auf klinische Genauigkeit.",
    sourcesTitle: "Unsere vertrauenswürdigsten wissenschaftlichen Quellen",
    sourcesIntro: "Alle Rechner basieren auf anerkannten wissenschaftlichen Richtlinien:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Richtlinien zur Schlafhygiene.",
    sourceNSF: "National Sleep Foundation (NSF): Altersspezifische Schlafdauer.",
    sourcePubmed: "PubMed & MEDLINE: Studien zu ultradianen Rhythmen.",
    sourceWalker: "Matthew Walker, PhD: Schlafforschung aus seinem Buch Why We Sleep.",
    sourceJenkins: "Dr. Sarah Jenkins: Wissenschaftliche Beraterin.",
    medicalDisclaimer: "Medizinischer Haftungsausschluss",
    footerMotto: "Entwickelt, um Schlafwissenschaft einfach, verständlich und hochpräzise zu machen."
  },
  it: {
    editorialTitle: "Il Nostro Team Editoriale di Esperti",
    shafiqTitle: "Shafiq — Fondatore e Ricercatore Principale del Sonno",
    shafiqBio: "Shafiq è ricercatore del sonno e sviluppatore software. Converte dati clinici in interfacce digitali intuitive.",
    sarahTitle: "Dr.ssa Sarah Johnson, MBBS — Revisore Medico",
    sarahBio: "La Dr.ssa Sarah Johnson è medico specialista clinico del sonno. Garantisce l'accuratezza scientifica dei nostri strumenti.",
    sourcesTitle: "Le Nostre Fonti Scientifiche di Fiducia",
    sourcesIntro: "I nostri calcolatori e articoli si basano su importanti studi clinici:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Standard clinici di igiene del sonno.",
    sourceNSF: "National Sleep Foundation (NSF): Raccomandazioni sulla durata del sonno per età.",
    sourcePubmed: "PubMed & MEDLINE: Studi peer-reviewed sui ritmi del sonno.",
    sourceWalker: "Matthew Walker, PhD: Ricerche pubblicate nel suo libro Why We Sleep.",
    sourceJenkins: "Dr.ssa Sarah Jenkins: Consulente scientifica principale.",
    medicalDisclaimer: "Dichiarazione di Non Responsabilità Medica",
    footerMotto: "Creato per rendere la scienza del sonno semplice, accessibile ed estremamente accurata."
  },
  nl: {
    editorialTitle: "Ons Deskundige Redactieteam",
    shafiqTitle: "Shafiq — Hoofdonderzoeker Slaap & Oprichter",
    shafiqBio: "Shafiq is slaaponderzoeker en softwareontwikkelaar. Hij vertaalt medische literatuur naar eenvoudige slaaptools.",
    sarahTitle: "Dr. Sarah Johnson, MBBS — Medisch Beoordelaar",
    sarahBio: "Dr. Sarah Johnson is klinisch slaapspecialist en arts. Zij controleert onze slaapcalculators op medische nauwkeurigheid.",
    sourcesTitle: "Onze Betrouwbare Wetenschappelijke Bronnen",
    sourcesIntro: "Al onze hulpmiddelen zijn gebaseerd op toonaangevende klinische kaders:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Normen voor gezonde slaaphygiëne.",
    sourceNSF: "National Sleep Foundation (NSF): Slaapduuradviezen per leeftijdscategorie.",
    sourcePubmed: "PubMed & MEDLINE: Wetenschappelijk onderzoek naar het 90-minuten-ritme.",
    sourceWalker: "Matthew Walker, PhD: Schokkende onderzoeken uit zijn boek Why We Sleep.",
    sourceJenkins: "Dr. Sarah Jenkins: Hoofdadviseur slaapwetenschappen.",
    medicalDisclaimer: "Medische Disclaimer",
    footerMotto: "Gebouwd om slaapwetenschap eenvoudig, toegankelijk en uiterst nauwkeurig te maken."
  },
  tr: {
    editorialTitle: "Uzman Editör Kadromuz",
    shafiqTitle: "Shafiq — Baş Uyku Araştırmacısı ve Kurucu",
    shafiqBio: "Shafiq, bir uyku araştırmacısı ve yazılım geliştiricisidir. Klinik uyku verilerini pratik dijital araçlara dönüştürür.",
    sarahTitle: "Dr. Sarah Johnson, MBBS — Tıbbi Editör",
    sarahBio: "Dr. Sarah Johnson bir klinik uyku uzmanı ve tıp doktorudur. Hesaplayıcılarımızın tıbbi doğruluğunu inceler.",
    sourcesTitle: "Güvenilir Bilimsel Kaynaklarımız",
    sourcesIntro: "Bu sitedeki tüm araçlar ve makaleler önde gelen bilimsel kılavuzlara dayanmaktadır:",
    sourceAASM: "Amerikan Uyku Tıbbı Akademisi (AASM): Klinik uyku hijyeni standartları.",
    sourceNSF: "Ulusal Uyku Vakfı (NSF): Yaşa göre uyku süresi tavsiyeleri.",
    sourcePubmed: "PubMed ve MEDLINE: Hakemli uyku mimarisi araştırmaları.",
    sourceWalker: "Matthew Walker, PhD: Why We Sleep (Niçin Uyuruz) kitabındaki bilimsel bulgular.",
    sourceJenkins: "Dr. Sarah Jenkins: Baş Uyku Bilimi Danışmanı.",
    medicalDisclaimer: "Tıbbi Uyarı",
    footerMotto: "Uyku bilimini basit, erişilebilir ve son derece doğru kılmak için tasarlandı."
  },
  id: {
    editorialTitle: "Tim Redaksi Ahli Kami",
    shafiqTitle: "Shafiq — Peneliti Utama Giroskop & Pendiri",
    shafiqBio: "Shafiq adalah peneliti tidur dan pengembang perangkat lunak yang mendedikasikan diri menyederhanakan data fisiologi tidur klinis.",
    sarahTitle: "Dr. Sarah Johnson, MBBS — Peninjau Medis",
    sarahBio: "Dr. Sarah Johnson adalah dokter spesialis tidur klinis yang meninjau akurasi alat medis kalkulator kami.",
    sourcesTitle: "Sumber Ilmiah Terpercaya Kami",
    sourcesIntro: "Seluruh alat dan artikel di situs ini mengacu pada kerangka medis terkemuka:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Standar klinis higienitas tidur sirkadian.",
    sourceNSF: "National Sleep Foundation (NSF): Rekomendasi durasi tidur berdasarkan usia.",
    sourcePubmed: "PubMed & MEDLINE: Riset terverifikasi tentang arsitektur tidur dan ultradian.",
    sourceWalker: "Matthew Walker, PhD: Temuan klinis penting dari bukunya Why We Sleep.",
    sourceJenkins: "Dr. Sarah Jenkins: Penasihat Ilmiah Fisiologi Tidur.",
    medicalDisclaimer: "Penafian Medis",
    footerMotto: "Dibuat agar ilmu tidur tetap sederhana, mudah diakses, dan sangat akurat."
  },
  vi: {
    editorialTitle: "Đội ngũ Biên tập Chuyên gia của Chúng tôi",
    shafiqTitle: "Shafiq — Nhà nghiên cứu Giấc ngủ & Sáng lập viên",
    shafiqBio: "Shafiq là một nhà nghiên cứu giấc ngủ kiêm lập trình viên. Anh ấy chuyển tải các nghiên cứu lâm sàng thành công cụ số dễ dùng.",
    sarahTitle: "TS. Sarah Johnson, MBBS — Cố vấn Y khoa",
    sarahBio: "TS. Sarah Johnson là bác sĩ chuyên khoa giấc ngủ lâm sàng, người bảo trợ và đánh giá độ chính xác y khoa của các công cụ.",
    sourcesTitle: "Nguồn Khoa học Đáng tin cậy",
    sourcesIntro: "Mọi công cụ và bài viết được xây dựng dựa trên các tiêu chuẩn y học uy tín:",
    sourceAASM: "Học viện Y học Giấc ngủ Hoa Kỳ (AASM): Tiêu chuẩn lâm sàng về vệ sinh giấc ngủ.",
    sourceNSF: "Hiệp hội Giấc ngủ Quốc gia (NSF): Khuyến nghị thời lượng ngủ theo tuổi.",
    sourcePubmed: "PubMed & MEDLINE: Nghiên cứu được bình duyệt về nhịp sinh học giấc ngủ.",
    sourceWalker: "Matthew Walker, PhD: Khám phá đột phá từ cuốn sách Why We Sleep.",
    sourceJenkins: "TS. Sarah Jenkins: Cố vấn Khoa học Giấc ngủ Lâm sàng.",
    medicalDisclaimer: "Tuyên bố Miễn trừ Y tế",
    footerMotto: "Được xây dựng để làm cho khoa học giấc ngủ trở nên đơn giản, dễ tiếp cận và có độ chính xác cao."
  },
  pl: {
    editorialTitle: "Nasz Doświadczony Zespół Redakcyjny",
    shafiqTitle: "Shafiq — Główny Badacz Snu & Założyciel",
    shafiqBio: "Shafiq jest badaczem snu i programistą. Przekłada recenzowane artykuły kliniczne na proste narzędzia internetowe.",
    sarahTitle: "Dr Sarah Johnson, MBBS — Recenzent Medyczny",
    sarahBio: "Dr Sarah Johnson jest lekarzem i klinicznym specjalistą ds. snu. Recenzuje nasze kalkulatory pod kątem dokładności medycznej.",
    sourcesTitle: "Nasze Zaufane Źródła Naukowe",
    sourcesIntro: "Wszystkie nasze algorytmy i publikacje oparte są o sprawdzone bazy medyczne:",
    sourceAASM: "American Academy of Sleep Medicine (AASM): Standardy higieny snu i zegara biologicznego.",
    sourceNSF: "National Sleep Foundation (NSF): Zalecana długość snu według wieku.",
    sourcePubmed: "PubMed & MEDLINE: Recenzowane badania nad architekturą snu i rytmami ultradialnymi.",
    sourceWalker: "Matthew Walker, PhD: Przełomowe wnioski z bestsellerowej książki Dlaczego Śpimy.",
    sourceJenkins: "Dr Sarah Jenkins: Główny doradca ds. medycyny snu.",
    medicalDisclaimer: "Zastrzeżenie Medyczne",
    footerMotto: "Stworzone, aby nauka o śnie była prosta, przystępna i wysoce dokładna."
  }
};
