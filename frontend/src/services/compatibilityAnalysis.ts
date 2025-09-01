export interface CompatibilityQuestion {
  id: number;
  question: string;
  category: string;
  analysisType: string;
}

export interface CompatibilityAnswer {
  questionId: number;
  answer: any; // Cambiado de string a any para manejar tanto strings como objetos
  score: number;
  category: string;
}

export interface CompatibilityResult {
  totalScore: number;
  maxScore: number;
  compatibilityPercentage: number;
  compatibilityLevel: string;
  canShowPhotos: boolean;
  shouldStopAnalysis: boolean;
  recommendTherapy: boolean;
  detailedAnalysis: {
    category: string;
    score: number;
    maxScore: number;
    analysis: string;
    compatible: boolean;
  }[];
  recommendations: string[];
}

export class CompatibilityAnalysisService {
  private static readonly compatibilityQuestions: CompatibilityQuestion[] = [
    {
      id: 1,
      question: "¿Cuáles son tres valores fundamentales que rigen tu vida?",
      category: "VALORES",
      analysisType: "similarity"
    },
    {
      id: 2,
      question: "¿Qué importancia le das a la religión o espiritualidad en tu día a día?",
      category: "RELIGIÓN",
      analysisType: "importance"
    },
    {
      id: 3,
      question: "¿Cómo visualizas tu vida dentro de 10 años? (profesión, lugar, estilo de vida)",
      category: "FUTURO",
      analysisType: "similarity"
    },
    {
      id: 4,
      question: "¿Qué opinas sobre el matrimonio? ¿Es algo esencial para ti?",
      category: "IMPORTANCIA DEL MATRIMONIO",
      analysisType: "importance"
    },
    {
      id: 5,
      question: "¿Qué tan importante es para ti tener hijos?",
      category: "IMPORTANCIA DE LOS HIJOS",
      analysisType: "importance"
    },
    {
      id: 6,
      question: "¿Cómo sueles reaccionar cuando estás muy molesto o herido por alguien cercano?",
      category: "MANEJO DE CONFLICTOS",
      analysisType: "conflict_reaction"
    },
    {
      id: 7,
      question: "¿Te resulta fácil hablar sobre tus emociones en una relación?",
      category: "COMUNICACIÓN EMOCIONAL",
      analysisType: "communication"
    },
    {
      id: 8,
      question: "¿Sientes ansiedad o inseguridad cuando tu pareja no está disponible emocionalmente?",
      category: "SEGURIDAD EMOCIONAL",
      analysisType: "security"
    },
    {
      id: 9,
      question: "¿Cómo actúas cuando hay un conflicto en la relación?",
      category: "RESOLUCIÓN DE CONFLICTOS",
      analysisType: "conflict_resolution"
    },
    {
      id: 10,
      question: "¿Prefieres resolver los problemas en el momento o tomar espacio antes de hablar?",
      category: "AUTOCONTROL",
      analysisType: "impulse_control"
    },
    {
      id: 11,
      question: "¿Qué tan cómodo te sientes expresando tus necesidades y deseos en una relación?",
      category: "COMUNICACIÓN DE NECESIDADES",
      analysisType: "communication"
    },
    {
      id: 12,
      question: "¿Cómo manejas las críticas en una relación de pareja?",
      category: "TOLERANCIA",
      analysisType: "tolerance"
    },
    {
      id: 13,
      question: "¿Puedes dar un ejemplo de un conflicto que resolviste exitosamente con una expareja?",
      category: "RESOLUCIÓN EXITOSA",
      analysisType: "success_rate"
    },
    {
      id: 14,
      question: "¿Qué tan importante es para ti la sinceridad, incluso si duele?",
      category: "HONESTIDAD",
      analysisType: "honesty"
    },
    {
      id: 15,
      question: "¿Tiendes a perdonar fácilmente o a guardar resentimiento?",
      category: "CAPACIDAD DE PERDÓN",
      analysisType: "forgiveness"
    },
    {
      id: 16,
      question: "¿Cómo sería tu pareja ideal en cuanto a la personalidad?",
      category: "PROTOTIPO DE PERSONALIDAD",
      analysisType: "prototype"
    },
    {
      id: 17,
      question: "¿Tienes alguna preferencia con el físico?",
      category: "PROTOTIPO FÍSICO",
      analysisType: "physical_preference"
    },
    {
      id: 18,
      question: "¿Cuáles son tus hobbies?",
      category: "INTERESES COMUNES",
      analysisType: "hobbies"
    }
  ];

  static getQuestions(): CompatibilityQuestion[] {
    return this.compatibilityQuestions;
  }

  static analyzeCompatibility(
    person1Answers: CompatibilityAnswer[],
    person2Answers: CompatibilityAnswer[]
  ): CompatibilityResult {
    let totalScore = 0;
    const maxScore = 90; // 18 preguntas × 5 puntos máximo
    const detailedAnalysis: CompatibilityResult['detailedAnalysis'] = [];
    const recommendations: string[] = [];
    let shouldStopAnalysis = false;
    let recommendTherapy = false;

    // Analizar cada categoría
    for (let i = 0; i < this.compatibilityQuestions.length; i++) {
      const question = this.compatibilityQuestions[i];
      const answer1 = person1Answers.find(a => a.questionId === question.id);
      const answer2 = person2Answers.find(a => a.questionId === question.id);

      if (!answer1 || !answer2) continue;

      const categoryAnalysis = this.analyzeCategoryCompatibility(
        question,
        answer1,
        answer2
      );

      totalScore += categoryAnalysis.score;
      detailedAnalysis.push(categoryAnalysis);

      // Verificar reglas especiales
      if (this.checkForViolence(answer1.answer) || this.checkForViolence(answer2.answer)) {
        shouldStopAnalysis = true;
        recommendTherapy = true;
        recommendations.push("⚠️ Se han detectado indicios de violencia. Se recomienda encarecidamente buscar ayuda profesional.");
        break;
      }

      if (categoryAnalysis.score === 2) {
        recommendations.push(`❌ Incompatibilidad total en: ${question.category}`);
      }
    }

    // Calcular porcentaje de compatibilidad
    const compatibilityPercentage = Math.round((totalScore / maxScore) * 100);
    
    // Determinar nivel de compatibilidad
    const compatibilityLevel = this.getCompatibilityLevel(totalScore);
    
    // Determinar si se pueden mostrar fotos
    const canShowPhotos = totalScore >= 54;

    // Agregar recomendaciones adicionales
    if (totalScore < 54) {
      recommendations.push("📸 La puntuación es insuficiente para mostrar fotografías de potenciales parejas.");
    }

    if (totalScore >= 54 && totalScore < 64) {
      recommendations.push("💡 Compatibilidad media. Se sugiere trabajar en las áreas de menor puntuación.");
    }

    if (totalScore >= 84) {
      recommendations.push("🎉 ¡Excelente compatibilidad! Tienen una base sólida para una relación exitosa.");
    }

    return {
      totalScore,
      maxScore,
      compatibilityPercentage,
      compatibilityLevel,
      canShowPhotos,
      shouldStopAnalysis,
      recommendTherapy,
      detailedAnalysis,
      recommendations
    };
  }

  private static analyzeCategoryCompatibility(
    question: CompatibilityQuestion,
    answer1: CompatibilityAnswer,
    answer2: CompatibilityAnswer
  ): CompatibilityResult['detailedAnalysis'][0] {
    let score = 0;
    let compatible = false;
    let analysis = "";

    switch (question.analysisType) {
      case "similarity":
        score = this.calculateSimilarityScore(answer1.answer, answer2.answer);
        compatible = score >= 3;
        analysis = this.getSimilarityAnalysis(score);
        break;

      case "importance":
        score = this.calculateImportanceScore(answer1.answer, answer2.answer);
        compatible = score >= 3;
        analysis = this.getImportanceAnalysis(score);
        break;

      case "communication":
        score = this.calculateCommunicationScore(answer1.answer, answer2.answer);
        compatible = this.isCommunicationCompatible(answer1.answer, answer2.answer);
        analysis = this.getCommunicationAnalysis(answer1.answer, answer2.answer);
        break;

      case "conflict_reaction":
      case "conflict_resolution":
        score = this.calculateConflictScore(answer1.answer, answer2.answer);
        compatible = this.isConflictCompatible(answer1.answer, answer2.answer);
        analysis = this.getConflictAnalysis(answer1.answer, answer2.answer);
        break;

      case "security":
        score = this.calculateSecurityScore(answer1.answer, answer2.answer);
        compatible = this.isSecurityCompatible(answer1.answer, answer2.answer);
        analysis = this.getSecurityAnalysis(answer1.answer, answer2.answer);
        break;

      case "impulse_control":
        score = this.calculateImpulseControlScore(answer1.answer, answer2.answer);
        compatible = this.isImpulseControlCompatible(answer1.answer, answer2.answer);
        analysis = this.getImpulseControlAnalysis(answer1.answer, answer2.answer);
        break;

      case "tolerance":
        score = this.calculateToleranceScore(answer1.answer, answer2.answer);
        compatible = this.isToleranceCompatible(answer1.answer, answer2.answer);
        analysis = this.getToleranceAnalysis(answer1.answer, answer2.answer);
        break;

      case "success_rate":
        score = this.calculateSuccessScore(answer1.answer, answer2.answer);
        compatible = score >= 3;
        analysis = this.getSuccessAnalysis(score);
        break;

      case "honesty":
        score = this.calculateHonestyScore(answer1.answer, answer2.answer);
        compatible = this.isHonestyCompatible(answer1.answer, answer2.answer);
        analysis = this.getHonestyAnalysis(answer1.answer, answer2.answer);
        break;

      case "forgiveness":
        score = this.calculateForgivenessScore(answer1.answer, answer2.answer);
        compatible = this.isForgivenessCompatible(answer1.answer, answer2.answer);
        analysis = this.getForgivenessAnalysis(answer1.answer, answer2.answer);
        break;

      default:
        score = 3;
        compatible = true;
        analysis = "Análisis general";
    }

    return {
      category: question.category,
      score,
      maxScore: 5,
      analysis,
      compatible
    };
  }

  private static checkForViolence(answer: any): boolean {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const violenceKeywords = [
      "golpeo", "pego", "violento", "violencia", "agredir", "agresión", 
      "lastimar", "lastimo", "gritar", "grito", "insultar", "insulto"
    ];
    
    return violenceKeywords.some(keyword => 
      strAnswer.toLowerCase().includes(keyword)
    );
  }

  private static calculateSimilarityScore(answer1: any, answer2: any): number {
    // Lógica simplificada - en un sistema real se usaría NLP
    const similarity = this.calculateTextSimilarity(answer1, answer2);
    if (similarity >= 0.8) return 5;
    if (similarity >= 0.6) return 3;
    return 1;
  }

  private static calculateTextSimilarity(text1: any, text2: any): number {
    // Asegurar que text1 y text2 sean strings
    const str1 = typeof text1 === 'string' ? text1 : (text1?.answer || String(text1) || '');
    const str2 = typeof text2 === 'string' ? text2 : (text2?.answer || String(text2) || '');
    
    // Implementación básica de similitud de texto
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  private static calculateImportanceScore(answer1: any, answer2: any): number {
    const importance1 = this.getImportanceLevel(answer1);
    const importance2 = this.getImportanceLevel(answer2);
    
    const diff = Math.abs(importance1 - importance2);
    if (diff === 0) return 5;
    if (diff === 1) return 3;
    return 1;
  }

  private static getImportanceLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("muy importante") || lowerAnswer.includes("esencial")) return 3;
    if (lowerAnswer.includes("algo importante") || lowerAnswer.includes("importante")) return 2;
    return 1;
  }

  private static calculateCommunicationScore(answer1: any, answer2: any): number {
    const comm1 = this.getCommunicationLevel(answer1);
    const comm2 = this.getCommunicationLevel(answer2);
    
    return Math.min(comm1, comm2);
  }

  private static getCommunicationLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("mucha comunicación") || lowerAnswer.includes("fácil")) return 5;
    if (lowerAnswer.includes("algo de comunicación") || lowerAnswer.includes("normal")) return 3;
    return 1;
  }

  private static isCommunicationCompatible(answer1: any, answer2: any): boolean {
    const comm1 = this.getCommunicationLevel(answer1);
    const comm2 = this.getCommunicationLevel(answer2);
    
    // Compatible si ambos tienen buena comunicación o uno compensa al otro
    return (comm1 >= 3 && comm2 >= 3) || (comm1 === 5 || comm2 === 5);
  }

  private static calculateConflictScore(answer1: any, answer2: any): number {
    if (this.checkForViolence(answer1) || this.checkForViolence(answer2)) return 0;
    
    const conflict1 = this.getConflictStyle(answer1);
    const conflict2 = this.getConflictStyle(answer2);
    
    return this.getConflictCompatibilityScore(conflict1, conflict2);
  }

  private static getConflictStyle(answer: any): string {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("comunicación") || lowerAnswer.includes("hablo")) return "communication";
    if (lowerAnswer.includes("distancia") || lowerAnswer.includes("espacio")) return "distance";
    if (this.checkForViolence(answer)) return "violence";
    return "neutral";
  }

  private static getConflictCompatibilityScore(style1: string, style2: string): number {
    if (style1 === "violence" || style2 === "violence") return 0;
    if (style1 === "communication" && style2 === "communication") return 5;
    if ((style1 === "communication" && style2 === "distance") || 
        (style1 === "distance" && style2 === "communication")) return 3;
    if (style1 === "distance" && style2 === "distance") return 1;
    return 3;
  }

  private static isConflictCompatible(answer1: any, answer2: any): boolean {
    return this.calculateConflictScore(answer1, answer2) >= 3;
  }

  private static calculateSecurityScore(answer1: any, answer2: any): number {
    const security1 = this.getSecurityLevel(answer1);
    const security2 = this.getSecurityLevel(answer2);
    
    return Math.min(security1, security2);
  }

  private static getSecurityLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("mucha seguridad") || lowerAnswer.includes("seguro")) return 5;
    if (lowerAnswer.includes("algo de seguridad") || lowerAnswer.includes("normal")) return 3;
    return 1;
  }

  private static isSecurityCompatible(answer1: any, answer2: any): boolean {
    const security1 = this.getSecurityLevel(answer1);
    const security2 = this.getSecurityLevel(answer2);
    
    // Compatible si ambos tienen seguridad o uno compensa al otro
    return (security1 >= 3 && security2 >= 3) || (security1 === 5 || security2 === 5);
  }

  private static calculateImpulseControlScore(answer1: any, answer2: any): number {
    const control1 = this.getImpulseControlLevel(answer1);
    const control2 = this.getImpulseControlLevel(answer2);
    
    return Math.min(control1, control2);
  }

  private static getImpulseControlLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("espacio") || lowerAnswer.includes("pensar")) return 5;
    if (lowerAnswer.includes("depende") || lowerAnswer.includes("a veces")) return 3;
    return 1;
  }

  private static isImpulseControlCompatible(answer1: any, answer2: any): boolean {
    const control1 = this.getImpulseControlLevel(answer1);
    const control2 = this.getImpulseControlLevel(answer2);
    
    // Incompatible solo si ambos tienen poco autocontrol
    return !(control1 === 1 && control2 === 1);
  }

  private static calculateToleranceScore(answer1: any, answer2: any): number {
    const tolerance1 = this.getToleranceLevel(answer1);
    const tolerance2 = this.getToleranceLevel(answer2);
    
    return Math.min(tolerance1, tolerance2);
  }

  private static getToleranceLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("muy tolerante") || lowerAnswer.includes("acepto")) return 5;
    if (lowerAnswer.includes("algo tolerante") || lowerAnswer.includes("depende")) return 3;
    return 1;
  }

  private static isToleranceCompatible(answer1: any, answer2: any): boolean {
    const tolerance1 = this.getToleranceLevel(answer1);
    const tolerance2 = this.getToleranceLevel(answer2);
    
    // Incompatible solo si ambos tienen poca tolerancia
    return !(tolerance1 === 1 && tolerance2 === 1);
  }

  private static calculateSuccessScore(answer1: any, answer2: any): number {
    const success1 = this.getSuccessLevel(answer1);
    const success2 = this.getSuccessLevel(answer2);
    
    return Math.min(success1, success2);
  }

  private static getSuccessLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("muy exitoso") || lowerAnswer.includes("bien")) return 5;
    if (lowerAnswer.includes("algo exitoso") || lowerAnswer.includes("normal")) return 3;
    return 1;
  }

  private static calculateHonestyScore(answer1: any, answer2: any): number {
    const honesty1 = this.getHonestyLevel(answer1);
    const honesty2 = this.getHonestyLevel(answer2);
    
    return Math.min(honesty1, honesty2);
  }

  private static getHonestyLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("muy honesto") || lowerAnswer.includes("sinceridad")) return 5;
    if (lowerAnswer.includes("algo honesto") || lowerAnswer.includes("depende")) return 3;
    return 1;
  }

  private static isHonestyCompatible(answer1: any, answer2: any): boolean {
    const honesty1 = this.getHonestyLevel(answer1);
    const honesty2 = this.getHonestyLevel(answer2);
    
    // Incompatible si uno es muy honesto y otro poco honesto
    return !((honesty1 === 5 && honesty2 === 1) || (honesty1 === 1 && honesty2 === 5));
  }

  private static calculateForgivenessScore(answer1: any, answer2: any): number {
    const forgiveness1 = this.getForgivenessLevel(answer1);
    const forgiveness2 = this.getForgivenessLevel(answer2);
    
    return Math.min(forgiveness1, forgiveness2);
  }

  private static getForgivenessLevel(answer: any): number {
    const strAnswer = typeof answer === 'string' ? answer : (answer?.answer || String(answer) || '');
    const lowerAnswer = strAnswer.toLowerCase();
    if (lowerAnswer.includes("perdono") || lowerAnswer.includes("poco rencoroso")) return 5;
    if (lowerAnswer.includes("depende") || lowerAnswer.includes("algo rencoroso")) return 3;
    return 1;
  }

  private static isForgivenessCompatible(answer1: any, answer2: any): boolean {
    const forgiveness1 = this.getForgivenessLevel(answer1);
    const forgiveness2 = this.getForgivenessLevel(answer2);
    
    // Incompatible si ambos son muy rencorosos
    return !(forgiveness1 === 1 && forgiveness2 === 1);
  }

  private static getCompatibilityLevel(score: number): string {
    if (score >= 90) return "100% - Totalmente Compatibles";
    if (score >= 84) return "90% - Muy Alta Compatibilidad";
    if (score >= 74) return "80% - Alta Compatibilidad";
    if (score >= 64) return "70% - Buena Compatibilidad";
    if (score >= 54) return "60% - Compatibilidad Media";
    if (score >= 36) return "40% - Baja Compatibilidad";
    if (score >= 18) return "20% - Muy Baja Compatibilidad";
    return "0% - Incompatibles";
  }

  // Métodos auxiliares para generar análisis textuales
  private static getSimilarityAnalysis(score: number): string {
    if (score === 5) return "Valores y perspectivas muy similares";
    if (score === 3) return "Algunas similitudes en valores";
    return "Valores y perspectivas diferentes";
  }

  private static getImportanceAnalysis(score: number): string {
    if (score === 5) return "Mismo nivel de importancia";
    if (score === 3) return "Niveles similares de importancia";
    return "Diferentes niveles de importancia";
  }

  private static getCommunicationAnalysis(answer1: any, answer2: any): string {
    const comm1 = this.getCommunicationLevel(answer1);
    const comm2 = this.getCommunicationLevel(answer2);
    
    if (comm1 >= 3 && comm2 >= 3) return "Buena comunicación mutua";
    if (comm1 === 5 || comm2 === 5) return "Uno compensa la comunicación del otro";
    return "Dificultades de comunicación";
  }

  private static getConflictAnalysis(answer1: any, answer2: any): string {
    const style1 = this.getConflictStyle(answer1);
    const style2 = this.getConflictStyle(answer2);
    
    if (style1 === "communication" && style2 === "communication") {
      return "Ambos resuelven conflictos mediante comunicación";
    }
    if ((style1 === "communication" && style2 === "distance") || 
        (style1 === "distance" && style2 === "communication")) {
      return "Estilos complementarios de resolución";
    }
    if (style1 === "distance" && style2 === "distance") {
      return "Ambos tienden a distanciarse en conflictos";
    }
    return "Estilos de resolución variables";
  }

  private static getSecurityAnalysis(answer1: any, answer2: any): string {
    const security1 = this.getSecurityLevel(answer1);
    const security2 = this.getSecurityLevel(answer2);
    
    if (security1 >= 3 && security2 >= 3) return "Ambos tienen seguridad emocional";
    if (security1 === 5 || security2 === 5) return "Uno puede brindar seguridad al otro";
    return "Inseguridades emocionales mutuas";
  }

  private static getImpulseControlAnalysis(answer1: any, answer2: any): string {
    const control1 = this.getImpulseControlLevel(answer1);
    const control2 = this.getImpulseControlLevel(answer2);
    
    if (control1 === 1 && control2 === 1) return "Ambos tienden a ser impulsivos";
    if (control1 >= 3 && control2 >= 3) return "Buen autocontrol mutuo";
    return "Niveles variables de autocontrol";
  }

  private static getToleranceAnalysis(answer1: any, answer2: any): string {
    const tolerance1 = this.getToleranceLevel(answer1);
    const tolerance2 = this.getToleranceLevel(answer2);
    
    if (tolerance1 === 1 && tolerance2 === 1) return "Ambos son poco tolerantes a las críticas";
    if (tolerance1 >= 3 && tolerance2 >= 3) return "Buena tolerancia mutua";
    return "Niveles variables de tolerancia";
  }

  private static getSuccessAnalysis(score: number): string {
    if (score === 5) return "Historial exitoso en resolución de conflictos";
    if (score === 3) return "Experiencia moderada en resolución";
    return "Dificultades previas en resolución de conflictos";
  }

  private static getHonestyAnalysis(answer1: any, answer2: any): string {
    const honesty1 = this.getHonestyLevel(answer1);
    const honesty2 = this.getHonestyLevel(answer2);
    
    if ((honesty1 === 5 && honesty2 === 1) || (honesty1 === 1 && honesty2 === 5)) {
      return "Diferencias significativas en valores de honestidad";
    }
    if (honesty1 >= 3 && honesty2 >= 3) return "Valores similares de honestidad";
    return "Niveles variables de honestidad";
  }

  private static getForgivenessAnalysis(answer1: any, answer2: any): string {
    const forgiveness1 = this.getForgivenessLevel(answer1);
    const forgiveness2 = this.getForgivenessLevel(answer2);
    
    if (forgiveness1 === 1 && forgiveness2 === 1) return "Ambos tienden a guardar rencor";
    if (forgiveness1 >= 3 && forgiveness2 >= 3) return "Buena capacidad de perdón";
    return "Capacidades variables de perdón";
  }
}
