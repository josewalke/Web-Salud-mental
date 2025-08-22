export interface PersonalityCompatibilityResult {
  totalCompatibility: number;
  percentage: number;
  categoryResults: {
    sociables: { score: number; max: number; percentage: number; compatible: boolean };
    curiosos: { score: number; max: number; percentage: number; compatible: boolean };
    empaticos: { score: number; max: number; percentage: number; compatible: boolean };
    pocoEmpaticos: { score: number; max: number; percentage: number; compatible: boolean };
    improvisacion: { score: number; max: number; percentage: number; compatible: boolean };
    autocontrol: { score: number; max: number; percentage: number; compatible: boolean };
    inseguros: { score: number; max: number; percentage: number; compatible: boolean };
    sensibles: { score: number; max: number; percentage: number; compatible: boolean };
    organizados: { score: number; max: number; percentage: number; compatible: boolean };
    creativos: { score: number; max: number; percentage: number; compatible: boolean };
    bajaTolerancia: { score: number; max: number; percentage: number; compatible: boolean };
    impulsivos: { score: number; max: number; percentage: number; compatible: boolean };
    logicos: { score: number; max: number; percentage: number; compatible: boolean };
    lideres: { score: number; max: number; percentage: number; compatible: boolean };
    seguridad: { score: number; max: number; percentage: number; compatible: boolean };
  };
  overallCompatible: boolean;
  recommendations: string[];
  detailedAnswers: {
    person1Answers: Record<string, string>;
    person2Answers: Record<string, string>;
    questionTexts: Record<string, string>;
  };
}

export class PersonalityCompatibilityAnalysis {
  // Textos de preguntas del cuestionario de personalidad
  private static questionTexts: Record<string, string> = {
    '1': '¿Conectas fácilmente con gente nueva?',
    '2': '¿Te resulta fácil establecer conversación con un desconocido?',
    '3': '¿Te sientes más cómodo estando solo que en grupo?',
    '4': '¿Socializar puede agotar tu energía rápidamente?',
    '5': '¿Prefieres las llamadas telefónicas a los mensajes de texto cuando te comunicas con otras personas?',
    '6': '¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?',
    '7': '¿Prefieres las actividades en solitario a las interacciones en grupo?',
    '8': '¿Debatir y analizar obras creativas te apasiona?',
    '9': '¿Te gustan las películas con conclusiones abiertas que permitan la interpretación?',
    '10': '¿Siempre te han intrigado los misterios de la vida después de la muerte?',
    '11': '¿Te encanta debatir conceptos teóricos y puedes pasarte horas conversando sobre ellos?',
    '12': '¿A menudo reflexionas sobre el significado de las cosas en lugar de aceptarlas sin más?',
    '13': '¿Te atraen las nuevas experiencias y te gusta explorar lugares desconocidos?',
    '14': '¿Te gusta mantener conversaciones profundas que inviten a la reflexión?',
    '15': '¿Reflexionar sobre experiencias pasadas te ayuda a comprender tus creencias y valores actuales?',
    '16': '¿Disfrutas aprendiendo nuevas ideas y conceptos, buscando constantemente el conocimiento?',
    '17': '¿Te gustan los debates animados en los que puedes compartir e intercambiar ideas con los demás?',
    '18': '¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?',
    '19': '¿Puedes pasarte horas profundizando en los temas que despiertan tu curiosidad?',
    '20': '¿Eres paciente con las personas que no son tan rápidas o eficientes como tú?',
    '21': '¿Cuándo alguien a tu alrededor está disgustado tiendes a sentir también sus emociones?',
    '22': '¿Te cuesta empatizar con personas de orígenes muy diferentes?',
    '23': '¿Cuándo alguien piensa de forma diferente a ti, intentas comprender de verdad a la otra parte?',
    '24': '¿Valoras la honestidad por encima del tacto, aunque sea duro?',
    '25': '¿Empatizas con los sentimientos de los demás, aunque no hayas compartido sus experiencias?',
    '26': '¿Alcanzar metas personales te produce más satisfacción que ayudar a los demás?',
    '27': '¿A veces te cuesta entender las emociones de los demás?',
    '28': '¿Sueles hacer planes de emergencia?',
    '29': '¿Mantienes la compostura incluso bajo presión?',
    '30': '¿Los entornos dinámicos y de ritmo rápido te dan energía y te desenvuelves bien bajo presión?',
    '31': '¿Te gustan los retos, especialmente en entornos de alta presión?',
    '32': '¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?',
    '33': '¿Un pequeño error a veces puede hacer dudar de tus conocimientos generales sobre un tema?',
    '34': '¿Conocer gente nueva te hace preocuparte por la impresión que has causado?',
    '35': '¿Con frecuencia te preocupas por el peor escenario posible en cualquier situación?',
    '36': '¿A menudo consideras las decisiones que has tomado?',
    '37': '¿La inseguridad es algo con lo que lidias a menudo?',
    '38': '¿Los errores de tu pasado suelen perdurar en la memoria?',
    '39': '¿A menudo te preocupas por incertidumbres futuras, incluso en situaciones tranquilas?',
    '40': '¿Eres una persona que aprecia los recuerdos y los objetos sentimentales?',
    '41': '¿Crees que el mundo mejoraría si la gente tomara decisiones más basadas en las emociones?',
    '42': '¿Te molesta que los demás discutan delante de ti?',
    '43': '¿Te gusta organizar tu día con listas y horarios?',
    '44': '¿Prefieres seguir una rutina a ser espontáneo?',
    '45': '¿Te sientes más a gusto cuando tu entorno está ordenado y organizado?',
    '46': '¿A menudo sigues tus sentimientos más que tu lógica?',
    '47': '¿Cuándo tienes que elegir sigues a tu corazón y eliges lo que te parece correcto?',
    '48': '¿Te identificas mucho con ser una persona artística?',
    '49': '¿Te gusta pasar tiempo en museos de arte?',
    '50': '¿Te gusta mantener conversaciones profundas que inviten a la reflexión?',
    '51': '¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?',
    '52': '¿Te gusta ser el centro de atención?',
    '53': '¿Prefieres una rutina diaria bien estructurada y te sientes más cómodo cuando las cosas son predecibles?',
    '54': '¿Prefieres relajarte antes de ocuparte de las tareas domésticas?',
    '55': '¿Prefieres tomar decisiones rápidamente en lugar de pensar en ellas?',
    '56': '¿Confías más en tu instinto que en horarios o planes escritos?',
    '57': '¿Te adaptas fácilmente a los cambios inesperados de planes?',
    '58': '¿A la hora de tomar decisiones, priorizas la lógica y la objetividad sobre las emociones?',
    '59': '¿Tomas las riendas de forma natural en situaciones de grupo guiando a los demás hacia objetivos comunes?',
    '60': '¿Te gusta asumir funciones de liderazgo?',
    '61': '¿Tiendes a ser autocrítico, a reflexionar constantemente sobre tus acciones y a esforzarte por mejorar?',
    '62': '¿Para ti es importante tener objetivos claros y trabajar diligentemente para alcanzarlos?',
    '63': '¿Pasar tiempo a solas es algo que aprecias y encuentras paz en las actividades solitarias?',
    '64': '¿Eres tu mejor amigo?',
    '65': '¿Cómo te gusta pasar tu tiempo libre? (Hobbies)',
    '66': '¿Tienes alguna alergia, fobia o algo que deberíamos tener en cuenta para la cita?'
  };

  static analyzeCompatibility(
    person1Answers: Record<string, string>,
    person2Answers: Record<string, string>
  ): PersonalityCompatibilityResult {
    console.log('🧠 ANALIZANDO COMPATIBILIDAD DE PERSONALIDAD');
    console.log('📋 DATOS COMPLETOS:');
    console.log('Persona 1:', person1Answers);
    console.log('Persona 2:', person2Answers);
    
    // Crear un simple contador de coincidencias totales ANTES del análisis
    let totalMatches = 0;
    const allQuestions = new Set([...Object.keys(person1Answers), ...Object.keys(person2Answers)]);
    
    console.log('🔍 VERIFICACIÓN PREGUNTA POR PREGUNTA:');
    console.log('🔧 ANÁLISIS DETALLADO DEL FORMATO:');
    
    // Verificar si las respuestas tienen el formato correcto
    const sampleKey1 = Object.keys(person1Answers)[0];
    const sampleKey2 = Object.keys(person2Answers)[0];
    
    if (sampleKey1) {
      console.log('🔍 MUESTRA PERSONA 1:');
      console.log('  Primera key:', sampleKey1);
      console.log('  Tipo de key:', typeof sampleKey1);
      console.log('  Valor:', person1Answers[sampleKey1]);
      console.log('  Tipo de valor:', typeof person1Answers[sampleKey1]);
      
      // Si el valor es un objeto, mostrar su estructura
      if (typeof person1Answers[sampleKey1] === 'object') {
        console.log('  Estructura del objeto:', person1Answers[sampleKey1]);
      }
    }
    
    if (sampleKey2) {
      console.log('🔍 MUESTRA PERSONA 2:');
      console.log('  Primera key:', sampleKey2);
      console.log('  Tipo de key:', typeof sampleKey2);
      console.log('  Valor:', person2Answers[sampleKey2]);
      console.log('  Tipo de valor:', typeof person2Answers[sampleKey2]);
      
      // Si el valor es un objeto, mostrar su estructura
      if (typeof person2Answers[sampleKey2] === 'object') {
        console.log('  Estructura del objeto:', person2Answers[sampleKey2]);
      }
    }
    
    // Intentar extraer respuestas reales si están en formato de objeto
    let extractedAnswers1: Record<string, string> = {};
    let extractedAnswers2: Record<string, string> = {};
    
    // Verificar si las respuestas están en formato {question, answer, questionId, questionType}
    if (sampleKey1 && typeof person1Answers[sampleKey1] === 'object') {
      console.log('🔄 EXTRACIENDO RESPUESTAS DEL FORMATO OBJETO...');
      
      Object.entries(person1Answers).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'questionId' in value) {
          const obj = value as any;
          extractedAnswers1[obj.questionId] = obj.answer;
        } else if (typeof value === 'string') {
          extractedAnswers1[key] = value;
        }
      });
      
      Object.entries(person2Answers).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'questionId' in value) {
          const obj = value as any;
          extractedAnswers2[obj.questionId] = obj.answer;
        } else if (typeof value === 'string') {
          extractedAnswers2[key] = value;
        }
      });
      
      console.log('✅ RESPUESTAS EXTRAÍDAS:');
      console.log('  Persona 1 extraída:', extractedAnswers1);
      console.log('  Persona 2 extraída:', extractedAnswers2);
      
      // Usar las respuestas extraídas si están disponibles
      if (Object.keys(extractedAnswers1).length > 0) {
        person1Answers = extractedAnswers1;
        person2Answers = extractedAnswers2;
        console.log('🔄 USANDO RESPUESTAS EXTRAÍDAS');
      }
    }
    
    for (const q of Array.from(allQuestions).slice(0, 10)) { // Solo las primeras 10 para no saturar
      const answer1 = person1Answers[q];
      const answer2 = person2Answers[q];
      const match = answer1 && answer2 && answer1 === answer2;
      console.log(`Pregunta ${q}: "${answer1}" vs "${answer2}" = ${match ? '✅' : '❌'}`);
      if (match) totalMatches++;
    }
    
    console.log(`📊 RESULTADO SIMPLE: ${totalMatches} matches de las primeras 10 preguntas`);
    
    // Si no hay matches en las primeras 10, hay un problema fundamental
    if (totalMatches === 0) {
      console.error('🚨 ERROR CRÍTICO: No hay matches en ninguna pregunta. Problema de formato de datos.');
      console.log('🔧 DATOS DE DEPURACIÓN:');
      console.log('Tipo de person1Answers:', typeof person1Answers);
      console.log('Tipo de person2Answers:', typeof person2Answers);
      console.log('Keys de person1:', Object.keys(person1Answers));
      console.log('Keys de person2:', Object.keys(person2Answers));
    }
    
    // Verificar que tengan al menos 32 preguntas iguales
    const totalQuestions = Object.keys(person1Answers).length;
    if (totalQuestions < 32) {
      console.log('❌ No hay suficientes preguntas:', totalQuestions);
      return {
        totalCompatibility: 0,
        percentage: 0,
        categoryResults: this.getEmptyCategoryResults(),
        overallCompatible: false,
        recommendations: ['❌ No hay suficientes preguntas para analizar. Se requieren al menos 32 preguntas.'],
        detailedAnswers: {
          person1Answers,
          person2Answers,
          questionTexts: this.questionTexts
        }
      };
    }

    // Análisis por categorías
    const sociables = this.analyzeSociables(person1Answers, person2Answers);
    const curiosos = this.analyzeCuriosos(person1Answers, person2Answers);
    const empaticos = this.analyzeEmpaticos(person1Answers, person2Answers);
    const pocoEmpaticos = this.analyzePocoEmpaticos(person1Answers, person2Answers);
    const improvisacion = this.analyzeImprovisacion(person1Answers, person2Answers);
    const autocontrol = this.analyzeAutocontrol(person1Answers, person2Answers);
    const inseguros = this.analyzeInseguros(person1Answers, person2Answers);
    const sensibles = this.analyzeSensibles(person1Answers, person2Answers);
    const organizados = this.analyzeOrganizados(person1Answers, person2Answers);
    const creativos = this.analyzeCreativos(person1Answers, person2Answers);
    const bajaTolerancia = this.analyzeBajaTolerancia(person1Answers, person2Answers);
    const impulsivos = this.analyzeImpulsivos(person1Answers, person2Answers);
    const logicos = this.analyzeLogicos(person1Answers, person2Answers);
    const lideres = this.analyzeLideres(person1Answers, person2Answers);
    const seguridad = this.analyzeSeguridad(person1Answers, person2Answers);

    const categoryResults = {
      sociables,
      curiosos,
      empaticos,
      pocoEmpaticos,
      improvisacion,
      autocontrol,
      inseguros,
      sensibles,
      organizados,
      creativos,
      bajaTolerancia,
      impulsivos,
      logicos,
      lideres,
      seguridad
    };

    // Calcular compatibilidad total
    const totalScore = Object.values(categoryResults).reduce((sum, cat) => sum + cat.score, 0);
    const maxPossible = Object.values(categoryResults).reduce((sum, cat) => sum + cat.max, 0);
    const percentage = Math.round((totalScore / maxPossible) * 100);

    // Determinar si son compatibles
    const overallCompatible = totalScore >= 35; // Compatibilidad media

    // Generar recomendaciones
    const recommendations = this.generateRecommendations(categoryResults, totalScore, percentage);

    return {
      totalCompatibility: totalScore,
      percentage,
      categoryResults,
      overallCompatible,
      recommendations,
      detailedAnswers: {
        person1Answers,
        person2Answers,
        questionTexts: this.questionTexts
      }
    };
  }

  private static analyzeSociables(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['1', '2', '3', '4', '5', '6', '7'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 7;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 4
    };
  }

  private static analyzeCuriosos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '50', '51', '61', '62'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 18;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 8
    };
  }

  private static analyzeEmpaticos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['23', '24', '25'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 3;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzePocoEmpaticos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['22', '26', '27'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 3;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 2
    };
  }

  private static analyzeImprovisacion(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['28', '56', '57'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 3;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 2
    };
  }

  private static analyzeAutocontrol(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['29', '30', '31'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 3;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 2
    };
  }

  private static analyzeInseguros(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['32', '33', '34', '35', '36', '37', '38', '39', '52', '53'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 10;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 5
    };
  }

  private static analyzeSensibles(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['40', '41', '42', '46', '47'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 5;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 4
    };
  }

  private static analyzeOrganizados(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['43', '44', '45'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 3;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeCreativos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['48', '49'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 2;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeBajaTolerancia(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['54'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 1;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeImpulsivos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['55'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 1;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeLogicos(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['58'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 1;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeLideres(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['59', '60'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 2;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static analyzeSeguridad(person1: Record<string, string>, person2: Record<string, string>): any {
    const questions = ['63', '64'];
    const matches = this.countMatches(person1, person2, questions);
    const max = 2;
    const percentage = Math.round((matches / max) * 100);
    return {
      score: matches,
      max,
      percentage,
      compatible: matches >= 1
    };
  }

  private static countMatches(person1: Record<string, string>, person2: Record<string, string>, questions: string[]): number {
    let matches = 0;
    let details: string[] = [];
    
    for (const question of questions) {
      const person1Answer = person1[question];
      const person2Answer = person2[question];
      
      if (person1Answer && person2Answer && person1Answer === person2Answer) {
        matches++;
        details.push(`${question}:✅`);
      } else {
        details.push(`${question}:❌`);
      }
    }
    
    console.log(`🔍 Preguntas [${questions.join(',')}] -> ${matches}/${questions.length} matches [${details.join(' ')}]`);
    return matches;
  }

  private static getEmptyCategoryResults() {
    return {
      sociables: { score: 0, max: 7, percentage: 0, compatible: false },
      curiosos: { score: 0, max: 18, percentage: 0, compatible: false },
      empaticos: { score: 0, max: 3, percentage: 0, compatible: false },
      pocoEmpaticos: { score: 0, max: 3, percentage: 0, compatible: false },
      improvisacion: { score: 0, max: 3, percentage: 0, compatible: false },
      autocontrol: { score: 0, max: 3, percentage: 0, compatible: false },
      inseguros: { score: 0, max: 10, percentage: 0, compatible: false },
      sensibles: { score: 0, max: 5, percentage: 0, compatible: false },
      organizados: { score: 0, max: 3, percentage: 0, compatible: false },
      creativos: { score: 0, max: 2, percentage: 0, compatible: false },
      bajaTolerancia: { score: 0, max: 1, percentage: 0, compatible: false },
      impulsivos: { score: 0, max: 1, percentage: 0, compatible: false },
      logicos: { score: 0, max: 1, percentage: 0, compatible: false },
      lideres: { score: 0, max: 2, percentage: 0, compatible: false },
      seguridad: { score: 0, max: 2, percentage: 0, compatible: false }
    };
  }

  private static generateRecommendations(categoryResults: any, totalScore: number, percentage: number): string[] {
    const recommendations: string[] = [];

    if (percentage >= 80) {
      recommendations.push('🎉 ¡Excelente compatibilidad! Ustedes tienen una personalidad muy similar.');
    } else if (percentage >= 60) {
      recommendations.push('👍 Buena compatibilidad. Sus personalidades se complementan bien.');
    } else if (percentage >= 40) {
      recommendations.push('🤝 Compatibilidad media. Hay áreas de mejora pero pueden funcionar.');
    } else {
      recommendations.push('⚠️ Baja compatibilidad. Podrían tener dificultades para entenderse.');
    }

    // Recomendaciones específicas por categoría
    if (!categoryResults.sociables.compatible) {
      recommendations.push('💬 Diferentes niveles de sociabilidad. Consideren cómo esto afecta sus interacciones.');
    }

    if (!categoryResults.empaticos.compatible) {
      recommendations.push('❤️ Diferentes niveles de empatía. Trabajen en la comunicación emocional.');
    }

    if (!categoryResults.organizados.compatible) {
      recommendations.push('📅 Diferentes estilos de organización. Establezcan rutinas que funcionen para ambos.');
    }

    if (categoryResults.inseguros.score >= 5) {
      recommendations.push('💪 Ambos muestran inseguridad. Consideren trabajar en la autoestima juntos.');
    }

    return recommendations;
  }
}
