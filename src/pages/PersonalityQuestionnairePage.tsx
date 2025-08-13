import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronLeft, ChevronRight, Info, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: 'radio' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
  info?: string;
}

const PersonalityQuestionnairePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<number, string>>({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentInfo, setCurrentInfo] = useState('');

  const questions: Question[] = [
    {
      id: 1,
      text: "¿Conectas fácilmente con gente nueva?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de extroversión y facilidad para socializar con personas que no conoces."
    },
    {
      id: 2,
      text: "¿Te resulta fácil establecer conversación con un desconocido?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de comunicación y apertura social."
    },
    {
      id: 3,
      text: "¿Te sientes más cómodo estando solo que en grupo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la soledad versus la socialización."
    },
    {
      id: 4,
      text: "¿Socializar puede agotar tu energía rápidamente?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa si eres introvertido (se agota socializando) o extrovertido (se energiza socializando)."
    },
    {
      id: 5,
      text: "¿Prefieres las llamadas telefónicas a los mensajes de texto cuando te comunicas con otras personas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la comunicación directa versus la escrita."
    },
    {
      id: 6,
      text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de comodidad con lo familiar versus lo nuevo."
    },
    {
      id: 7,
      text: "¿Prefieres las actividades en solitario a las interacciones en grupo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por actividades individuales versus grupales."
    },
    {
      id: 8,
      text: "¿Debatir y analizar obras creativas te apasiona?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu inclinación hacia el análisis intelectual y la reflexión."
    },
    {
      id: 9,
      text: "¿Te gustan las películas con conclusiones abiertas que permitan la interpretación?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la ambigüedad y la interpretación personal."
    },
    {
      id: 10,
      text: "¿Siempre te han intrigado los misterios de la vida después de la muerte?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu inclinación hacia temas filosóficos y existenciales."
    },
    {
      id: 11,
      text: "¿Te encanta debatir conceptos teóricos y puedes pasarte horas conversando sobre ellos?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por discusiones intelectuales profundas."
    },
    {
      id: 12,
      text: "¿A menudo reflexionas sobre el significado de las cosas en lugar de aceptarlas sin más?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la reflexión filosófica."
    },
    {
      id: 13,
      text: "¿Te atraen las nuevas experiencias y te gusta explorar lugares desconocidos?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu apertura a nuevas experiencias y aventuras."
    },
    {
      id: 14,
      text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por conversaciones significativas versus superficiales."
    },
    {
      id: 15,
      text: "¿Reflexionar sobre experiencias pasadas te ayuda a comprender tus creencias y valores actuales?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la introspección y el autoconocimiento."
    },
    {
      id: 16,
      text: "¿Disfrutas aprendiendo nuevas ideas y conceptos, buscando constantemente el conocimiento?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu sed de conocimiento y aprendizaje continuo."
    },
    {
      id: 17,
      text: "¿Te gustan los debates animados en los que puedes compartir e intercambiar ideas con los demás?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu disfrute por el intercambio intelectual y los debates."
    },
    {
      id: 18,
      text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de curiosidad intelectual."
    },
    {
      id: 19,
      text: "¿Puedes pasarte horas profundizando en los temas que despiertan tu curiosidad?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de concentración y profundización en temas de interés."
    },
    {
      id: 20,
      text: "¿Eres paciente con las personas que no son tan rápidas o eficientes como tú?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de paciencia y tolerancia hacia los demás."
    },
    {
      id: 21,
      text: "¿Cuándo alguien a tu alrededor está disgustado tiendes a sentir también sus emociones?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de empatía emocional."
    },
    {
      id: 22,
      text: "¿Te cuesta empatizar con personas de orígenes muy diferentes?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de empatía hacia personas de diferentes culturas o orígenes."
    },
    {
      id: 23,
      text: "¿Cuándo alguien piensa de forma diferente a ti, intentas comprender de verdad a la otra parte?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu apertura hacia diferentes perspectivas y opiniones."
    },
    {
      id: 24,
      text: "¿Valoras la honestidad por encima del tacto, aunque sea duro?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la verdad directa versus la diplomacia."
    },
    {
      id: 25,
      text: "¿Empatizas con los sentimientos de los demás, aunque no hayas compartido sus experiencias?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de empatía cognitiva."
    },
    {
      id: 26,
      text: "¿Alcanzar metas personales te produce más satisfacción que ayudar a los demás?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu orientación hacia metas personales versus altruismo."
    },
    {
      id: 27,
      text: "¿A veces te cuesta entender las emociones de los demás?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de comprensión emocional."
    },
    {
      id: 28,
      text: "¿Sueles hacer planes de emergencia?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la planificación y la preparación."
    },
    {
      id: 29,
      text: "¿Mantienes la compostura incluso bajo presión?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu capacidad de manejo del estrés y la presión."
    },
    {
      id: 30,
      text: "¿Los entornos dinámicos y de ritmo rápido te dan energía y te desenvuelves bien bajo presión?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por entornos estimulantes y desafiantes."
    },
    {
      id: 31,
      text: "¿Te gustan los retos, especialmente en entornos de alta presión?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu atracción hacia situaciones desafiantes."
    },
    {
      id: 32,
      text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la familiaridad social."
    },
    {
      id: 33,
      text: "¿Un pequeño error a veces puede hacer dudar de tus conocimientos generales sobre un tema?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de confianza en tus conocimientos."
    },
    {
      id: 34,
      text: "¿Conocer gente nueva te hace preocuparte por la impresión que has causado?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de ansiedad social y preocupación por la imagen."
    },
    {
      id: 35,
      text: "¿Con frecuencia te preocupa el peor escenario posible en cualquier situación?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia el pesimismo y la preocupación excesiva."
    },
    {
      id: 36,
      text: "¿A menudo consideras las decisiones que has tomado?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la reflexión y el análisis de decisiones."
    },
    {
      id: 37,
      text: "¿La inseguridad es algo con lo que lidias a menudo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de confianza en ti mismo."
    },
    {
      id: 38,
      text: "¿Los errores de tu pasado suelen perdurar en la memoria?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia el arrepentimiento y la rumiación."
    },
    {
      id: 39,
      text: "¿A menudo te preocupa por incertidumbres futuras, incluso en situaciones tranquilas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de ansiedad por el futuro."
    },
    {
      id: 40,
      text: "¿Eres una persona que aprecia los recuerdos y los objetos sentimentales?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu conexión emocional con el pasado y los recuerdos."
    },
    {
      id: 41,
      text: "¿Crees que el mundo mejoraría si la gente tomara decisiones más basadas en las emociones?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la toma de decisiones emocional versus racional."
    },
    {
      id: 42,
      text: "¿Te molesta que los demás discutan delante de ti?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu sensibilidad hacia los conflictos y discusiones."
    },
    {
      id: 43,
      text: "¿Te gusta organizar tu día con listas y horarios?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la organización y la estructura."
    },
    {
      id: 44,
      text: "¿Prefieres seguir una rutina a ser espontáneo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la estabilidad versus la espontaneidad."
    },
    {
      id: 45,
      text: "¿Te sientes más a gusto cuando tu entorno está ordenado y organizado?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por el orden y la organización del entorno."
    },
    {
      id: 46,
      text: "¿A menudo sigues tus sentimientos más que tu lógica?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la intuición versus el razonamiento lógico."
    },
    {
      id: 47,
      text: "¿Cuándo tienes que elegir sigues a tu corazón y eliges lo que te parece correcto?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la toma de decisiones basada en valores y sentimientos."
    },
    {
      id: 48,
      text: "¿Te identificas mucho con ser una persona artística?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu identificación con la creatividad y la expresión artística."
    },
    {
      id: 49,
      text: "¿Te gusta pasar tiempo en museos de arte?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu apreciación por el arte y la cultura."
    },
    {
      id: 50,
      text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por conversaciones significativas y reflexivas."
    },
    {
      id: 51,
      text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de curiosidad intelectual y exploración."
    },
    {
      id: 52,
      text: "¿Te gusta ser el centro de atención?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu comodidad con ser el foco de atención en grupos."
    },
    {
      id: 53,
      text: "¿Prefieres una rutina diaria bien estructurada y te sientes más cómodo cuando las cosas son predecibles?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la estructura y la predictibilidad."
    },
    {
      id: 54,
      text: "¿Prefieres relajarte antes de ocuparte de las tareas domésticas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por el descanso versus la productividad."
    },
    {
      id: 55,
      text: "¿Prefieres tomar decisiones rápidamente en lugar de pensar en ellas?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu estilo de toma de decisiones: impulsivo versus reflexivo."
    },
    {
      id: 56,
      text: "¿Confías más en tu instinto que en horarios o planes escritos?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por la intuición versus la planificación estructurada."
    },
    {
      id: 57,
      text: "¿Te adaptas fácilmente a los cambios inesperados de planes?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu flexibilidad y capacidad de adaptación."
    },
    {
      id: 58,
      text: "¿A la hora de tomar decisiones, priorizas la lógica y la objetividad sobre las emociones?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu preferencia por el razonamiento lógico versus la intuición emocional."
    },
    {
      id: 59,
      text: "¿Tomas las riendas de forma natural en situaciones de grupo guiando a los demás hacia objetivos comunes?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia natural hacia el liderazgo."
    },
    {
      id: 60,
      text: "¿Te gusta asumir funciones de liderazgo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu disfrute por roles de liderazgo y dirección."
    },
    {
      id: 61,
      text: "¿Tiendes a ser autocrítico, a reflexionar constantemente sobre tus acciones y a esforzarte por mejorar?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu tendencia hacia la autocrítica constructiva y la mejora personal."
    },
    {
      id: 62,
      text: "¿Para ti es importante tener objetivos claros y trabajar diligentemente para alcanzarlos?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu orientación hacia metas y tu nivel de determinación."
    },
    {
      id: 63,
      text: "¿Pasar tiempo a solas es algo que aprecias y encuentras paz en las actividades solitarias?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu apreciación por la soledad y la introspección."
    },
    {
      id: 64,
      text: "¿Eres tu mejor amigo?",
      type: 'radio',
      options: ['1 = SI', '2 = NO', '3 = A VECES'],
      required: true,
      info: "Esta pregunta evalúa tu nivel de autoconocimiento y autoaceptación."
    },
    {
      id: 65,
      text: "¿Cómo te gusta pasar tu tiempo libre? (Hobbies)",
      type: 'textarea',
      required: false,
      info: "Esta pregunta te permite describir tus intereses y actividades de ocio. En caso de estar en el pack parejas no hace falta completar esta pregunta."
    },
    {
      id: 66,
      text: "¿Tienes alguna alergia, fobia o algo que deberíamos tener en cuenta para la cita?",
      type: 'textarea',
      required: false,
      info: "Esta pregunta es importante para considerar cualquier necesidad especial o consideración de salud en tu perfil."
    }
  ];

  // Calcular el total de preguntas
  const totalQuestions = questions.length;
  
  // Función para manejar el cambio en las respuestas
  const handleAnswer = (answer: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Respuestas del cuestionario:', formData);
    // Aquí iría la lógica para enviar las respuestas
    alert('¡Cuestionario completado!');
  };

  const showInfo = (info: string) => {
    // Información real sobre el cuestionario de personalidad
    const questionnaireInfo = `
      <h3 style="font-weight: 600; margin-bottom: 1rem; color: #1e293b;">🧠 Cuestionario de Personalidad Basado en Carl Jung</h3>
      
      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">📚 Sobre Carl Jung</h4>
        <p style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-bottom: 0.5rem;">
          Carl Gustav Jung (1875-1961) fue un psiquiatra y psicoanalista suizo, fundador de la psicología analítica. 
          Su trabajo revolucionó la comprensión de la personalidad humana, introduciendo conceptos como:
        </p>
        <ul style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 1rem;">
          <li><strong>Arquetipos:</strong> Patrones universales de comportamiento</li>
          <li><strong>Inconsciente colectivo:</strong> Memoria compartida de la humanidad</li>
          <li><strong>Tipos psicológicos:</strong> Clasificación de personalidades</li>
        </ul>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">🔬 Teoría de Tipos de Personalidad</h4>
        <p style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-bottom: 0.5rem;">
          Jung identificó 4 funciones principales de la personalidad:
        </p>
        <ul style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 1rem;">
          <li><strong>Pensamiento (T):</strong> Lógica, análisis, objetividad</li>
          <li><strong>Sentimiento (F):</strong> Valores, armonía, empatía</li>
          <li><strong>Sensación (S):</strong> Detalles, realidad, experiencia</li>
          <li><strong>Intuición (N):</strong> Posibilidades, patrones, futuro</li>
        </ul>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">📊 ¿Cómo Funciona Este Test?</h4>
        <p style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-bottom: 0.5rem;">
          Este cuestionario evalúa 64 aspectos clave de tu personalidad:
        </p>
        <ul style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 1rem;">
          <li><strong>Extroversión vs Introversión:</strong> Cómo obtienes energía</li>
          <li><strong>Pensamiento vs Sentimiento:</strong> Cómo tomas decisiones</li>
          <li><strong>Sensación vs Intuición:</strong> Cómo percibes información</li>
          <li><strong>Juzgar vs Percibir:</strong> Cómo te relacionas con el mundo</li>
        </ul>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">💡 Consejos para Responder</h4>
        <ul style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 1rem;">
          <li><strong>Sé honesto:</strong> Responde como eres, no como te gustaría ser</li>
          <li><strong>Evita "A veces":</strong> Intenta ser decisivo para resultados más precisos</li>
          <li><strong>Primera impresión:</strong> Tu respuesta inicial suele ser la más acertada</li>
          <li><strong>Contexto general:</strong> Piensa en tu comportamiento típico, no en situaciones específicas</li>
        </ul>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">🎯 ¿Qué Obtendrás?</h4>
        <p style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-bottom: 0.5rem;">
          Al completar este test recibirás:
        </p>
        <ul style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 1rem;">
          <li><strong>Tu tipo de personalidad:</strong> Clasificación según la teoría de Jung</li>
          <li><strong>Análisis detallado:</strong> Fortalezas y áreas de desarrollo</li>
          <li><strong>Recomendaciones:</strong> Consejos personalizados para tu crecimiento</li>
          <li><strong>Compatibilidad:</strong> Perfiles que mejor se complementan contigo</li>
        </ul>
      </div>

      <div style="background: #f8fafc; padding: 0.75rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: #1e293b;">🔒 Privacidad y Confidencialidad</h4>
        <p style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin: 0;">
          <strong>Tus respuestas son completamente confidenciales.</strong> Utilizamos encriptación de datos 
          y no compartimos información personal con terceros. Este test es para tu autoconocimiento personal.
        </p>
      </div>
    `;
    
    setCurrentInfo(questionnaireInfo);
    setShowInfoModal(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswer = formData[currentQuestionIndex];
  const canProceed = hasAnswer || !currentQuestion.required;

  return (
    <div className="cuestionario-rediseñado">
      <div className="container">
        {/* Header del Cuestionario */}
        <motion.div className="cuestionario-header-rediseñado">
          <div className="icono-principal"><Brain /></div>
          <h1>Cuestionario de Personalidad</h1>
          <p>Descubre tu tipo de personalidad con nuestro test basado en la teoría de Carl Jung. Este cuestionario de 66 preguntas te ayudará a entender mejor tu personalidad, preferencias y dinámicas sociales.</p>
          
          {/* Botón de Información del Cuestionario */}
          <button
            className="info-button-rediseñado info-button-header-rediseñado"
            onClick={() => showInfo('')}
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
              alignSelf: 'center',
              zIndex: 1000
            }}
          >
            <Info size={18} />
            Información sobre el cuestionario
          </button>

          {/* Barra de Progreso */}
          <div className="progress-container-rediseñado">
            <div className="progress-bar-rediseñado">
              <div 
                className="progress-fill-rediseñado" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text-rediseñado">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </div>
          </div>
        </motion.div>

        {/* Card Principal del Cuestionario */}
        <motion.div
          className="cuestionario-card-rediseñado"
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header de la Card */}
          <div className="cuestionario-card-header-rediseñado">
            <h2 className="cuestionario-card-title-rediseñado">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.required && (
              <div className="cuestionario-card-subtitle-rediseñado">
                Esta pregunta es obligatoria
              </div>
            )}
          </div>

          {/* Contenido de la Card */}
          <div className="cuestionario-card-content-rediseñado">
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="radio-options-container-rediseñado">
                {currentQuestion.options.map((option, index) => {
                  const isLastOdd = index === (currentQuestion.options?.length || 0) - 1 && (currentQuestion.options?.length || 0) % 2 === 1;
                  return (
                    <div
                      key={index}
                      className={`radio-option-card-rediseñado ${isLastOdd ? 'option-odd-last' : ''} ${
                        formData[currentQuestionIndex] === option ? 'selected' : ''
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={formData[currentQuestionIndex] === option}
                        onChange={() => handleAnswer(option)}
                      />
                      <label htmlFor={`option-${index}`}>
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <div className="input-group-rediseñado">
                <label className="input-label-rediseñado">
                  Tu respuesta:
                </label>
                <input
                  type="text"
                  className="input-field-rediseñado"
                  placeholder="Escribe tu respuesta aquí..."
                  value={formData[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}

            {currentQuestion.type === 'textarea' && (
              <div className="input-group-rediseñado">
                <label className="input-label-rediseñado">
                  Tu respuesta:
                </label>
                <textarea
                  className="input-field-rediseñado textarea-field-rediseñado"
                  placeholder="Escribe tu respuesta detallada aquí..."
                  value={formData[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}

            {/* Botones de Navegación */}
            <div className="botones-container-rediseñado">
              <button
                className="btn-rediseñado btn-anterior-rediseñado"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  className="btn-rediseñado btn-enviar-rediseñado"
                  onClick={handleSubmit}
                  disabled={!canProceed}
                >
                  Enviar
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  className="btn-rediseñado btn-siguiente-rediseñado"
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Botón de Información */}
        {/* <button
          className="info-button-rediseñado"
          onClick={() => showInfo(currentQuestion.info || 'Información no disponible')}
        >
          <Info size={16} />
          Información sobre el cuestionario
        </button> */}
      </div>

      {/* Modal de Información */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            className="modal-overlay-rediseñado"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              className="modal-content-rediseñado"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-rediseñado">
                <h3 className="modal-title-rediseñado">
                  Información de la Pregunta
                </h3>
                <button
                  className="modal-close-rediseñado"
                  onClick={() => setShowInfoModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body-rediseñado">
                <div dangerouslySetInnerHTML={{ __html: currentInfo }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalityQuestionnairePage;
