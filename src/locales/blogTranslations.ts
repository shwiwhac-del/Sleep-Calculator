export interface LocalizedBlogMeta {
  title: string;
  description: string;
  category: string;
}

export const BLOG_TRANSLATIONS: Record<string, Record<string, LocalizedBlogMeta>> = {
  es: {
    "sleep-cycles-explained": {
      title: "Explicación de los ciclos de sueño: la ciencia para dormir mejor",
      description: "Aprenda cómo funcionan los ciclos de sueño, cuántos necesita y cómo un calculador de ciclos de sueño puede mejorar su energía.",
      category: "Ciencia del Sueño"
    },
    "what-is-rem-sleep": {
      title: "¿Qué es el sueño REM y por qué es tan importante?",
      description: "Descubra qué es el sueño REM, por qué es vital para la memoria y el aprendizaje, y cómo optimizarlo naturalmente.",
      category: "Calidad del Sueño"
    },
    "how-much-sleep-do-you-need": {
      title: "¿Cuánto sueño necesita? Recomendaciones por edad",
      description: "Aprenda cuántas horas de sueño necesita según su edad y estilo de vida para una recuperación física completa.",
      category: "Salud del Sueño"
    },
    "best-time-to-sleep-and-wake-up": {
      title: "La mejor hora para dormir y despertarse: Guía de salud",
      description: "Descubra las mejores horas de sueño alineadas con su ritmo circadiano natural y su temperatura corporal.",
      category: "Ritmo Circadiano"
    },
    "sleep-cycle-calculator-guide": {
      title: "Guía del calculador de ciclos de sueño: Optimice su descanso",
      description: "Aprenda a planificar sus horas de acostarse y despertarse en bloques matemáticos de 90 minutos para evitar la fatiga.",
      category: "Guía de Sueño"
    },
    "why-90-minute-sleep-cycles-matter": {
      title: "Por qué los ciclos de sueño de 90 minutos cambian su energía",
      description: "Descubra el ritmo ultradiano de la arquitectura del sueño humano y evite despertarse durante el sueño profundo.",
      category: "Ciclos de Sueño"
    },
    "how-to-wake-up-refreshed": {
      title: "Cómo despertarse renovado cada mañana: Consejos científicos",
      description: "Elimine la inercia del sueño alineando sus alarmas con el final de sus ciclos naturales de descanso.",
      category: "Higiene del Sueño"
    },
    "ideal-bedtime-for-adults": {
      title: "Hora ideal para acostarse en adultos: ¿A qué hora dormir?",
      description: "Determine la hora óptima para acostarse según su hora de alarma matutina y latencia promedio.",
      category: "Rutina de Cama"
    },
    "sleep-schedule-for-productivity": {
      title: "Horario de sueño para la productividad: Enfoque y rendimiento",
      description: "Optimice el rendimiento de su corteza prefrontal durmiendo bloques consistentes de 5 ciclos de descanso.",
      category: "Productividad"
    },
    "how-many-hours-of-sleep-is-healthy": {
      title: "¿Cuántas horas de sueño son saludables? Guía completa",
      description: "Analice por qué dormir menos de 6 horas o más de 10 horas puede afectar negativamente su salud metabólica.",
      category: "Salud y Bienestar"
    },
    "power-nap-vs-full-sleep-cycle": {
      title: "Siesta corta vs. Ciclo de sueño completo: ¿Cuál elegir?",
      description: "Compare los beneficios de una siesta de 20 minutos con una recuperación de ciclo de 90 minutos.",
      category: "Ciencia del Sueño"
    }
  },
  pt: {
    "sleep-cycles-explained": {
      title: "Ciclos do Sono Explicados: A Ciência por Trás de Manhãs Melhores",
      description: "Entenda como funcionam os ciclos do sono, quantos você precisa e como planejar suas noites matematicamente.",
      category: "Ciência do Sono"
    },
    "what-is-rem-sleep": {
      title: "O que é o Sono REM e por que ele é Crucial para Você?",
      description: "Descubra o papel do sono REM na consolidação da memória, saúde emocional e conexões neurais.",
      category: "Qualidade do Sono"
    },
    "how-much-sleep-do-you-need": {
      title: "Quanto Tempo Você Precisa Dormir? Recomendações por Idade",
      description: "Aprenda a duração recomendada de sono para cada fase da vida, desde bebês até a terceira idade.",
      category: "Saúde do Sono"
    },
    "best-time-to-sleep-and-wake-up": {
      title: "Melhor Horário para Dormir e Acordar: Guia do Ritmo Circadiano",
      description: "Descubra as horas ideais para alinhar seu repouso com os picos de melatonina e cortisol.",
      category: "Ritmo Circadiano"
    },
    "sleep-cycle-calculator-guide": {
      title: "Guia da Calculadora de Sono: Planeje seu Repouso",
      description: "Saiba como nossa ferramenta calcula os melhores momentos para adormecer usando múltiplos de 90 minutos.",
      category: "Guia do Sono"
    },
    "why-90-minute-sleep-cycles-matter": {
      title: "Por que os Ciclos de 90 Minutos são a Chave para a sua Energia",
      description: "Entenda a fisiologia do ritmo ultradiano e evite acordar durante a fase N3 de sono profundo.",
      category: "Ciclos do Sono"
    },
    "how-to-wake-up-refreshed": {
      title: "Como Acordar Disposto Todas as Manhãs: Dicas Científicas",
      description: "Esqueça a fadiga ao despertar sincronizando seus alarmes com o término dos ciclos de repouso.",
      category: "Higiene do Sono"
    },
    "ideal-bedtime-for-adults": {
      title: "Horário Ideal para Dormir para Adultos: Quando Ir para a Cama?",
      description: "Calcule a hora perfeita para deitar com base em seu cronotipo e horário de despertar obrigatório.",
      category: "Rotina de Dormir"
    },
    "sleep-schedule-for-productivity": {
      title: "Cronograma de Sono para Produtividade: Foco e Alta Performance",
      description: "Potencialize suas funções cognitivas executivas mantendo um horário de sono estável todos os dias.",
      category: "Produtividade"
    },
    "how-many-hours-of-sleep-is-healthy": {
      title: "Quantas Horas de Sono é Saudável? Um Guia Completo",
      description: "Saiba por que a qualidade e a duração do sono são cruciais para a imunidade e metabolismo.",
      category: "Saúde e Bem-estar"
    },
    "power-nap-vs-full-sleep-cycle": {
      title: "Soneca de 20 Minutos vs. Ciclo de 90 Minutos: Qual o Melhor?",
      description: "Compare os benefícios cognitivos de um repouso rápido com um ciclo de recuperação completo.",
      category: "Ciência do Sono"
    }
  },
  fr: {
    "sleep-cycles-explained": {
      title: "Les cycles du sommeil expliqués : La science du réveil en forme",
      description: "Découvrez le fonctionnement des cycles, vos besoins réels et comment planifier votre nuit.",
      category: "Science du Sommeil"
    },
    "what-is-rem-sleep": {
      title: "Qu'est-ce que le sommeil REM et pourquoi est-il si vital ?",
      description: "Comprenez le rôle du sommeil REM dans la régulation des émotions et la mémoire à long terme.",
      category: "Qualité du Sommeil"
    },
    "how-much-sleep-do-you-need": {
      title: "De combien d'heures de sommeil avez-vous besoin par âge ?",
      description: "Les recommandations cliniques de sommeil de la petite enfance jusqu'au troisième âge.",
      category: "Santé du Sommeil"
    },
    "best-time-to-sleep-and-wake-up": {
      title: "Meilleur moment pour dormir et se réveiller : Rythme circadien",
      description: "Synchronisez votre sommeil avec l'horloge biologique interne pour un repos maximal.",
      category: "Rythme Circadien"
    },
    "sleep-cycle-calculator-guide": {
      title: "Guide du calculateur de sommeil : Maîtrisez vos nuits",
      description: "Calculez vos fenêtres optimales en blocs de 90 minutes pour éviter la somnolence du matin.",
      category: "Guide Sommeil"
    },
    "why-90-minute-sleep-cycles-matter": {
      title: "Pourquoi les cycles de 90 minutes transforment votre journée",
      description: "Évitez de couper le sommeil profond et réveillez-vous pendant une phase de sommeil léger.",
      category: "Cycles Sommeil"
    },
    "how-to-wake-up-refreshed": {
      title: "Comment se réveiller frais chaque matin : Astuces scientifiques",
      description: "Éliminez l'inertie du sommeil en coordonnant votre réveil avec la fin d'un cycle complet.",
      category: "Hygiène Sommeil"
    }
  },
  de: {
    "sleep-cycles-explained": {
      title: "Schlafzyklen erklärt: Die Wissenschaft für besseres Aufwachen",
      description: "Erfahren Sie, wie Schlafzyklen funktionieren und wie Sie Ihre Schlafqualität steigern können.",
      category: "Schlafwissenschaft"
    },
    "what-is-rem-sleep": {
      title: "Was ist REM-Schlaf und warum ist er so wichtig?",
      description: "Erkunden Sie die neurologische Bedeutung des REM-Schlafs für Lernen und Gedächtnis.",
      category: "Schlafqualität"
    },
    "how-much-sleep-do-you-need": {
      title: "Wie viel Schlaf brauchen Sie wirklich? Empfehlungen nach Alter",
      description: "Erhalten Sie klinische Schlafempfehlungen basierend auf Alter, Lebensstil und Genetik.",
      category: "Schlafgesundheit"
    },
    "best-time-to-sleep-and-wake-up": {
      title: "Beste Schlaf- und Aufwachzeit: Ein circadianer Leitfaden",
      description: "Richten Sie Ihre Bettruhe an der inneren biologischen Uhr aus, um erholt aufzuwachen.",
      category: "Circadianer Rhythmus"
    },
    "sleep-cycle-calculator-guide": {
      title: "Schlafrechner-Leitfaden: So berechnen Sie Ihre Schlafenszeit",
      description: "Nutzen Sie die 90-Minuten-Formel, um erfrischt und ohne Müdigkeit in den Tag zu starten.",
      category: "Schlafratgeber"
    }
  },
  it: {
    "sleep-cycles-explained": {
      title: "Cicli del Sonno Spiegati: La Scienza per Svegliarsi Riposati",
      description: "Scopri come funzionano i cicli del sonno e come la matematica ti aiuta a riposare meglio.",
      category: "Scienza del Sonno"
    },
    "what-is-rem-sleep": {
      title: "Cos'è il Sonno REM e Perché è Così Importante?",
      description: "Impara il ruolo neurologico del sonno REM nel consolidamento della memoria e nella creatività.",
      category: "Qualità del Sonno"
    },
    "how-much-sleep-do-you-need": {
      title: "Di Quanto Sonno Hai Bisogno? Raccomandazioni per Età",
      description: "La guida clinica per calcolare le ore di sonno necessarie in base alla tua età.",
      category: "Salute del Sonno"
    }
  },
  nl: {
    "sleep-cycles-explained": {
      title: "Slaapcycli Uitgelegd: De Wetenschap Achter Beter Ontwaken",
      description: "Ontdek hoe uw slaapcycli werken en hoe u uw ochtendenergie drastisch kunt verhogen.",
      category: "Slaapwetenschap"
    },
    "what-is-rem-sleep": {
      title: "Wat is REM-slaap en Waarom is het Zo Belangrijk?",
      description: "Leer alles over de neurologische REM-fase en de impact ervan op uw mentale prestaties.",
      category: "Slaapkwaliteit"
    }
  },
  tr: {
    "sleep-cycles-explained": {
      title: "Uyku Döngüleri Açıklandı: Daha İyi Sabahların Bilimsel Sırrı",
      description: "Uyku döngülerinin nasıl çalıştığını öğrenin ve sabah yorgunluğunu tarihe gömün.",
      category: "Uyku Bilimi"
    },
    "what-is-rem-sleep": {
      title: "REM Uykusu Nedir ve Neden Hayati Önem Taşır?",
      description: "Hafıza konsolidasyonu ve bilişsel sağlık için REM uykusunun önemini keşfedin.",
      category: "Uyku Kalitesi"
    }
  },
  id: {
    "sleep-cycles-explained": {
      title: "Penjelasan Siklus Tidur: Sains di Balik Pagi yang Lebih Segar",
      description: "Pelajari cara kerja siklus tidur dan cara bangun tanpa rasa kantuk.",
      category: "Sains Tidur"
    }
  },
  vi: {
    "sleep-cycles-explained": {
      title: "Giải Thích Chu Kỳ Giấc Ngủ: Khoa Học Để Thức Dậy Sảng Khoái",
      description: "Tìm hiểu cách chu kỳ giấc ngủ vận hành để tối ưu hóa năng lượng buổi sáng.",
      category: "Khoa Học Giấc Ngủ"
    }
  },
  pl: {
    "sleep-cycles-explained": {
      title: "Wyjaśnienie Cykli Snu: Nauka Stojąca za Lepszym Porankiem",
      description: "Dowiedz się, jak działają cykle snu i jak kalkulator snu poprawia jakość poranków.",
      category: "Nauka o Śnie"
    }
  }
};

export function getLocalizedPost(post: any, lang: string): any {
  if (lang === 'en' || !BLOG_TRANSLATIONS[lang] || !BLOG_TRANSLATIONS[lang][post.slug]) {
    return post;
  }
  const trans = BLOG_TRANSLATIONS[lang][post.slug];
  return {
    ...post,
    title: trans.title,
    description: trans.description,
    category: trans.category,
  };
}
