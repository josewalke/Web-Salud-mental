/**
 * questionnaireQuestions.ts
 * 
 * Configuración de preguntas para los cuestionarios del sistema.
 * Define las preguntas para cuestionarios de pareja y personalidad.
 * 
 * Características:
 * - 17 preguntas para cuestionario de pareja
 * - 66 preguntas para cuestionario de personalidad
 * - Diferentes tipos de preguntas (radio, text, textarea)
 * - Información adicional para cada pregunta
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

/**
 * Interfaz que define la estructura de una pregunta
 */
export interface Question {
  /** ID único de la pregunta */
  id: number;
  /** Texto de la pregunta */
  text: string;
  /** Tipo de input para la pregunta */
  type: 'radio' | 'text' | 'textarea';
  /** Opciones disponibles para preguntas de tipo radio */
  options?: string[];
  /** Si la pregunta es obligatoria */
  required: boolean;
  /** Información adicional sobre la pregunta */
  info?: string;
}

/**
 * Array con las 17 preguntas del cuestionario de pareja
 * Cada pregunta evalúa diferentes aspectos de las relaciones de pareja
 */
export const COUPLE_QUESTIONS: Question[] = [
  {
    id: 0,
    text: "¿Qué buscas principalmente en una relación?",
    type: 'radio',
    options: ['COMPAÑÍA', 'AMOR', 'AMISTAD'],
    required: true,
    info: "Esta pregunta evalúa tus expectativas principales en una relación romántica."
  },
  {
    id: 1,
    text: "¿Cómo prefieres pasar tiempo con tu pareja?",
    type: 'radio',
    options: ['ACTIVIDADES', 'CONVERSACIONES', 'AMBAS'],
    required: true,
    info: "Esta pregunta evalúa tu estilo preferido de interacción en pareja."
  },
  {
    id: 2,
    text: "¿Qué valoras más en una persona?",
    type: 'radio',
    options: ['INTELIGENCIA', 'SENTIMENTAL', 'EQUILIBRIO'],
    required: true,
    info: "Esta pregunta evalúa los atributos que más te atraen en una persona."
  },
  {
    id: 3,
    text: "¿Cómo manejas los conflictos en una relación?",
    type: 'radio',
    options: ['DIÁLOGO', 'ESPACIO', 'DEPENDE'],
    required: true,
    info: "Esta pregunta evalúa tu estilo de resolución de conflictos."
  },
  {
    id: 4,
    text: "¿Qué te gustaría mejorar en ti mismo para una relación?",
    type: 'textarea',
    required: false,
    info: "Esta pregunta te permite reflexionar sobre tu crecimiento personal."
  },
  {
    id: 5,
    text: "¿Qué tan importante es la comunicación en una relación para ti?",
    type: 'radio',
    options: ['MUY IMPORTANTE', 'IMPORTANTE', 'POCO IMPORTANTE'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la comunicación en las relaciones."
  },
  {
    id: 6,
    text: "¿Cómo te sientes cuando tu pareja necesita espacio personal?",
    type: 'radio',
    options: ['RESPETO', 'INSEGURIDAD', 'INDIFERENCIA'],
    required: true,
    info: "Esta pregunta evalúa tu nivel de independencia emocional."
  },
  {
    id: 7,
    text: "¿Qué tan importante es la confianza en una relación?",
    type: 'radio',
    options: ['FUNDAMENTAL', 'IMPORTANTE', 'NO ES PRIORITARIO'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la confianza."
  },
  {
    id: 8,
    text: "¿Cómo reaccionas cuando tu pareja tiene éxito?",
    type: 'radio',
    options: ['CELEBRO', 'ME COMPARO', 'ME ALEGRO'],
    required: true,
    info: "Esta pregunta evalúa tu capacidad de celebrar el éxito de otros."
  },
  {
    id: 9,
    text: "¿Qué tan importante es la compatibilidad sexual?",
    type: 'radio',
    options: ['MUY IMPORTANTE', 'IMPORTANTE', 'POCO IMPORTANTE'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la intimidad física."
  },
  {
    id: 10,
    text: "¿Cómo manejas los celos en una relación?",
    type: 'radio',
    options: ['COMUNICACIÓN', 'CONTROL', 'EVITO'],
    required: true,
    info: "Esta pregunta evalúa tu manejo de la inseguridad emocional."
  },
  {
    id: 11,
    text: "¿Qué tan importante es compartir valores en una relación?",
    type: 'radio',
    options: ['FUNDAMENTAL', 'IMPORTANTE', 'NO ES PRIORITARIO'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la compatibilidad de valores."
  },
  {
    id: 12,
    text: "¿Cómo te sientes cuando tu pareja tiene amigos del sexo opuesto?",
    type: 'radio',
    options: ['NORMAL', 'INSEGURO', 'CELOSO'],
    required: true,
    info: "Esta pregunta evalúa tu nivel de confianza y seguridad."
  },
  {
    id: 13,
    text: "¿Qué tan importante es la independencia financiera en una relación?",
    type: 'radio',
    options: ['MUY IMPORTANTE', 'IMPORTANTE', 'POCO IMPORTANTE'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la independencia económica."
  },
  {
    id: 14,
    text: "¿Cómo manejas las diferencias de opinión con tu pareja?",
    type: 'radio',
    options: ['DIÁLOGO', 'EVITO', 'IMPONGO'],
    required: true,
    info: "Esta pregunta evalúa tu estilo de resolución de conflictos."
  },
  {
    id: 15,
    text: "¿Qué tan importante es la compatibilidad de horarios y estilo de vida?",
    type: 'radio',
    options: ['MUY IMPORTANTE', 'IMPORTANTE', 'POCO IMPORTANTE'],
    required: true,
    info: "Esta pregunta evalúa tu valoración de la compatibilidad práctica."
  },
  {
    id: 16,
    text: "¿Cómo te gustaría que sea tu relación ideal?",
    type: 'textarea',
    required: false,
    info: "Esta pregunta te permite describir tu visión de una relación perfecta."
  }
];

/**
 * Array con las 66 preguntas del cuestionario de personalidad
 * Cada pregunta evalúa diferentes aspectos de la personalidad del usuario
 */
export const PERSONALITY_QUESTIONS: Question[] = [
  {
    id: 0,
    text: "¿Conectas fácilmente con gente nueva?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de socialización y apertura a nuevas personas."
  },
  {
    id: 1,
    text: "¿Te resulta fácil establecer conversación con un desconocido?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu habilidad para iniciar conversaciones."
  },
  {
    id: 2,
    text: "¿Te sientes más cómodo estando solo que en grupo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la soledad vs. la socialización."
  },
  {
    id: 3,
    text: "¿Socializar puede agotar tu energía rápidamente?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa si eres introvertido o extrovertido energéticamente."
  },
  {
    id: 4,
    text: "¿Prefieres las llamadas telefónicas a los mensajes de texto cuando te comunicas con otras personas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia de comunicación interpersonal."
  },
  {
    id: 5,
    text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a mantener relaciones existentes vs. explorar nuevas."
  },
  {
    id: 6,
    text: "¿Prefieres las actividades en solitario a las interacciones en grupo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por actividades individuales vs. grupales."
  },
  {
    id: 7,
    text: "¿Debatir y analizar obras creativas te apasiona?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu interés por el análisis creativo y artístico."
  },
  {
    id: 8,
    text: "¿Te gustan las películas con conclusiones abiertas que permitan la interpretación?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por contenido que invite a la reflexión."
  },
  {
    id: 9,
    text: "¿Siempre te han intrigado los misterios de la vida después de la muerte?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu curiosidad por temas filosóficos y existenciales."
  },
  {
    id: 10,
    text: "¿Te encanta debatir conceptos teóricos y puedes pasarte horas conversando sobre ellos?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por conversaciones intelectuales profundas."
  },
  {
    id: 11,
    text: "¿A menudo reflexionas sobre el significado de las cosas en lugar de aceptarlas sin más?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a cuestionar y analizar en profundidad."
  },
  {
    id: 12,
    text: "¿Te atraen las nuevas experiencias y te gusta explorar lugares desconocidos?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu apertura a nuevas experiencias y aventuras."
  },
  {
    id: 13,
    text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por diálogos significativos vs. conversaciones superficiales."
  },
  {
    id: 14,
    text: "¿Reflexionar sobre experiencias pasadas te ayuda a comprender tus creencias y valores actuales?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a la introspección y autoconocimiento."
  },
  {
    id: 15,
    text: "¿Disfrutas aprendiendo nuevas ideas y conceptos, buscando constantemente el conocimiento?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu sed de conocimiento y aprendizaje continuo."
  },
  {
    id: 16,
    text: "¿Te gustan los debates animados en los que puedes compartir e intercambiar ideas con los demás?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu disfrute por el intercambio intelectual activo."
  },
  {
    id: 17,
    text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu impulso natural por explorar y descubrir."
  },
  {
    id: 18,
    text: "¿Puedes pasarte horas profundizando en los temas que despiertan tu curiosidad?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de concentración y profundización."
  },
  {
    id: 19,
    text: "¿Eres paciente con las personas que no son tan rápidas o eficientes como tú?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu nivel de paciencia y tolerancia hacia otros."
  },
  {
    id: 20,
    text: "¿Cuándo alguien a tu alrededor está disgustado tiendes a sentir también sus emociones?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de empatía emocional."
  },
  {
    id: 21,
    text: "¿Te cuesta empatizar con personas de orígenes muy diferentes?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de empatía intercultural."
  },
  {
    id: 22,
    text: "¿Cuándo alguien piensa de forma diferente a ti, intentas comprender de verdad a la otra parte?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu apertura mental y capacidad de comprensión."
  },
  {
    id: 23,
    text: "¿Valoras la honestidad por encima del tacto, aunque sea duro?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la verdad directa vs. la diplomacia."
  },
  {
    id: 24,
    text: "¿Empatizas con los sentimientos de los demás, aunque no hayas compartido sus experiencias?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de empatía cognitiva."
  },
  {
    id: 25,
    text: "¿Alcanzar metas personales te produce más satisfacción que ayudar a los demás?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu orientación hacia metas personales vs. altruismo."
  },
  {
    id: 26,
    text: "¿A veces te cuesta entender las emociones de los demás?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de comprensión emocional."
  },
  {
    id: 27,
    text: "¿Sueles hacer planes de emergencia?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a la planificación y preparación."
  },
  {
    id: 28,
    text: "¿Mantienes la compostura incluso bajo presión?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu capacidad de mantener la calma en situaciones estresantes."
  },
  {
    id: 29,
    text: "¿Los entornos dinámicos y de ritmo rápido te dan energía y te desenvuelves bien bajo presión?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu adaptabilidad a entornos de alta intensidad."
  },
  {
    id: 30,
    text: "¿Te gustan los retos, especialmente en entornos de alta presión?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por situaciones desafiantes."
  },
  {
    id: 31,
    text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la familiaridad vs. la novedad social."
  },
  {
    id: 32,
    text: "¿Un pequeño error a veces puede hacer dudar de tus conocimientos generales sobre un tema?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu nivel de confianza en tus conocimientos."
  },
  {
    id: 33,
    text: "¿Conocer gente nueva te hace preocuparte por la impresión que has causado?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu nivel de autoconciencia social."
  },
  {
    id: 34,
    text: "¿Con frecuencia te preocupa el peor escenario posible en cualquier situación?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia al pensamiento catastrófico."
  },
  {
    id: 35,
    text: "¿A menudo consideras las decisiones que has tomado?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a la reflexión y autoevaluación."
  },
  {
    id: 36,
    text: "¿La inseguridad es algo con lo que lidias a menudo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu nivel de confianza en ti mismo."
  },
  {
    id: 37,
    text: "¿Los errores de tu pasado suelen perdurar en la memoria?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a rumiar sobre errores pasados."
  },
  {
    id: 38,
    text: "¿A menudo te preocupan incertidumbres futuras, incluso en situaciones tranquilas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a la preocupación anticipatoria."
  },
  {
    id: 39,
    text: "¿Eres una persona que aprecia los recuerdos y los objetos sentimentales?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu conexión emocional con el pasado."
  },
  {
    id: 40,
    text: "¿Crees que el mundo mejoraría si la gente tomara decisiones más basadas en las emociones?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu valoración de la inteligencia emocional en la toma de decisiones."
  },
  {
    id: 41,
    text: "¿Te molesta que los demás discutan delante de ti?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu sensibilidad a los conflictos ajenos."
  },
  {
    id: 42,
    text: "¿Te gusta organizar tu día con listas y horarios?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la organización y estructura."
  },
  {
    id: 43,
    text: "¿Prefieres seguir una rutina a ser espontáneo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la estabilidad vs. la flexibilidad."
  },
  {
    id: 44,
    text: "¿Te sientes más a gusto cuando tu entorno está ordenado y organizado?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu necesidad de orden y organización ambiental."
  },
  {
    id: 45,
    text: "¿A menudo sigues tus sentimientos más que tu lógica?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la intuición vs. el razonamiento."
  },
  {
    id: 46,
    text: "¿Cuándo tienes que elegir sigues a tu corazón y eliges lo que te parece correcto?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a tomar decisiones basadas en valores personales."
  },
  {
    id: 47,
    text: "¿Te identificas mucho con ser una persona artística?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu identificación con la creatividad artística."
  },
  {
    id: 48,
    text: "¿Te gusta pasar tiempo en museos de arte?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu apreciación por el arte y la cultura."
  },
  {
    id: 49,
    text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por diálogos significativos."
  },
  {
    id: 50,
    text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu impulso natural por explorar y descubrir."
  },
  {
    id: 51,
    text: "¿Te gusta ser el centro de atención?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu comodidad con la atención social."
  },
  {
    id: 52,
    text: "¿Prefieres una rutina diaria bien estructurada y te sientes más cómodo cuando las cosas son predecibles?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la estructura y predictibilidad."
  },
  {
    id: 53,
    text: "¿Prefieres relajarte antes de ocuparte de las tareas domésticas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por el descanso vs. la productividad."
  },
  {
    id: 54,
    text: "¿Prefieres tomar decisiones rápidamente en lugar de pensar en ellas?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la acción rápida vs. la reflexión."
  },
  {
    id: 55,
    text: "¿Confías más en tu instinto que en horarios o planes escritos?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por la intuición vs. la planificación."
  },
  {
    id: 56,
    text: "¿Te adaptas fácilmente a los cambios inesperados de planes?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu flexibilidad y adaptabilidad."
  },
  {
    id: 57,
    text: "¿A la hora de tomar decisiones, priorizas la lógica y la objetividad sobre las emociones?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu preferencia por el razonamiento lógico vs. la intuición emocional."
  },
  {
    id: 58,
    text: "¿Tomas las riendas de forma natural en situaciones de grupo guiando a los demás hacia objetivos comunes?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia natural al liderazgo."
  },
  {
    id: 59,
    text: "¿Te gusta asumir funciones de liderazgo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu comodidad y disfrute con roles de liderazgo."
  },
  {
    id: 60,
    text: "¿Tiendes a ser autocrítico, a reflexionar constantemente sobre tus acciones y a esforzarte por mejorar?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu tendencia a la autoevaluación y mejora continua."
  },
  {
    id: 61,
    text: "¿Para ti es importante tener objetivos claros y trabajar diligentemente para alcanzarlos?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu orientación hacia metas y perseverancia."
  },
  {
    id: 62,
    text: "¿Pasar tiempo a solas es algo que aprecias y encuentras paz en las actividades solitarias?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu apreciación por la soledad y la introspección."
  },
  {
    id: 63,
    text: "¿Eres tu mejor amigo?",
    type: 'radio',
    options: ['SI', 'NO', 'A VECES'],
    required: true,
    info: "Evalúa tu relación contigo mismo y autocompasión."
  },
  {
    id: 64,
    text: "¿Cómo te gusta pasar tu tiempo libre? (Hobbies)",
    type: 'textarea',
    required: false,
    info: "Esta pregunta te permite describir tus intereses y pasatiempos personales."
  },
  {
    id: 65,
    text: "¿Tienes alguna alergia, fobia o algo que deberíamos tener en cuenta para la cita?",
    type: 'textarea',
    required: false,
    info: "Esta pregunta nos ayuda a adaptar mejor la experiencia a tus necesidades específicas."
  }
];

/**
 * Función helper para obtener las preguntas según el tipo de cuestionario
 * @param type - Tipo de cuestionario ('pareja' o 'personalidad')
 * @returns Array de preguntas correspondiente al tipo
 */
export const getQuestions = (type: 'pareja' | 'personalidad'): Question[] => {
  return type === 'pareja' ? COUPLE_QUESTIONS : PERSONALITY_QUESTIONS;
};
