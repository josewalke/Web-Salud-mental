import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useMobileAnimations } from "./ui/use-mobile-animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Check,
  User,
} from "lucide-react";
import TypewriterText from "./TypewriterText";

interface QuestionairePageProps {
  type: "pareja" | "personalidad";
  onBack: () => void;
}

interface PersonalInfo {
  nombre: string;
  apellidos: string;
  edad: string;
  genero: string;
  correo: string;
  orientacionSexual: string;
}

export default function QuestionairePage({
  type,
  onBack,
}: QuestionairePageProps) {
  const enableAnimations = useMobileAnimations();
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>({
      nombre: "",
      apellidos: "",
      edad: "",
      genero: "",
      correo: "",
      orientacionSexual: "",
    });
  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const questionnaireData = {
    pareja: {
      title: "Cuestionario para Encontrar Pareja",
      subtitle: "REALIZADO POR PSICÓLOGOS",
      description:
        "Ayúdanos a conocerte mejor para encontrar a tu pareja ideal",
      color: "text-pink-600",
      bgColor: "bg-pink-500",
      iconBg: "bg-pink-100",
      accentColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      personalInfoFields: [
        {
          key: "nombre",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          key: "apellidos",
          label: "Apellidos",
          type: "text",
          required: true,
        },
        {
          key: "edad",
          label: "Edad",
          type: "number",
          required: true,
        },
        {
          key: "genero",
          label: "Género",
          type: "text",
          required: true,
        },
        {
          key: "correo",
          label: "Correo electrónico",
          type: "email",
          required: true,
        },
        {
          key: "orientacionSexual",
          label: "Orientación sexual",
          type: "text",
          required: true,
        },
      ],
      questions: [
        {
          question:
            "¿Cuáles son los tres valores fundamentales que rigen tu vida?",
          type: "textarea",
          placeholder:
            "Describe los tres valores más importantes para ti...",
        },
        {
          question:
            "¿Qué importancia le das a la religión o espiritualidad en tu día a día?",
          type: "radio",
          options: [
            "Muy importante",
            "Importante",
            "Algo importante",
            "Poco importante",
            "Nada importante",
          ],
        },
        {
          question:
            "¿Cómo visualizas tu vida dentro de 10 años? (profesión, lugar, estilo de vida)",
          type: "textarea",
          placeholder: "Describe cómo te ves en 10 años...",
        },
        {
          question:
            "¿Qué opinas sobre el matrimonio? ¿Es algo esencial para ti?",
          type: "radio",
          options: [
            "Es esencial para mí",
            "Me gustaría casarme",
            "No es importante",
            "Prefiero no casarme",
            "No estoy seguro/a",
          ],
        },
        {
          question:
            "¿Qué tan importante es para ti tener hijos?",
          type: "radio",
          options: [
            "Muy importante",
            "Importante",
            "Algo importante",
            "Poco importante",
            "No quiero hijos",
          ],
        },
        {
          question:
            "¿Cómo sueles reaccionar cuando estás muy molesto o herido por alguien cercano?",
          type: "textarea",
          placeholder:
            "Describe cómo reaccionas cuando te sientes herido/a...",
        },
        {
          question:
            "¿Te resulta fácil hablar sobre tus emociones en una relación?",
          type: "radio",
          options: [
            "Muy fácil",
            "Fácil",
            "A veces",
            "Difícil",
            "Muy difícil",
          ],
        },
        {
          question:
            "¿Sientes ansiedad o inseguridad cuando tu pareja no está disponible emocionalmente?",
          type: "radio",
          options: [
            "Siempre",
            "Frecuentemente",
            "A veces",
            "Raramente",
            "Nunca",
          ],
        },
        {
          question:
            "¿Cómo actúas cuando hay un conflicto en la relación?",
          type: "textarea",
          placeholder:
            "Describe cómo manejas los conflictos en una relación...",
        },
        {
          question:
            "¿Prefieres resolver los problemas en el momento o tomar espacio antes de hablar?",
          type: "radio",
          options: [
            "Resolver inmediatamente",
            "Tomar un poco de espacio",
            "Necesito mucho tiempo",
            "Depende del problema",
          ],
        },
        {
          question:
            "¿Qué tan cómodo te sientes expresando tus necesidades y deseos en una relación?",
          type: "radio",
          options: [
            "Muy cómodo/a",
            "Cómodo/a",
            "A veces me cuesta",
            "Incómodo/a",
            "Muy incómodo/a",
          ],
        },
        {
          question:
            "¿Cómo manejas las críticas en una relación de pareja?",
          type: "textarea",
          placeholder:
            "Describe cómo reaccionas ante las críticas de tu pareja...",
        },
        {
          question:
            "¿Puedes dar un ejemplo de un conflicto que resolviste exitosamente con una expareja?",
          type: "textarea",
          placeholder:
            "Comparte un ejemplo de resolución exitosa de conflicto...",
        },
        {
          question:
            "¿Qué tan importante es para ti la sinceridad, incluso si duele?",
          type: "radio",
          options: [
            "Muy importante",
            "Importante",
            "Algo importante",
            "Poco importante",
            "Prefiero evitar dolor",
          ],
        },
        {
          question:
            "¿Tiendes a perdonar fácilmente o a guardar resentimiento?",
          type: "radio",
          options: [
            "Perdono muy fácil",
            "Perdono con tiempo",
            "Me cuesta perdonar",
            "Guardo resentimiento",
            "Depende de la situación",
          ],
        },
        {
          question: "¿Cómo sería tu pareja ideal?",
          type: "textarea",
          placeholder:
            "Describe las características de tu pareja ideal...",
        },
        {
          question: "¿Tienes alguna preferencia con el físico?",
          type: "textarea",
          placeholder:
            "Describe tus preferencias físicas (opcional)...",
        },
      ],
    },
    personalidad: {
      title: "Cuestionario de Personalidad",
      subtitle:
        "DINÁMICA SOCIAL DE PERSONALIDAD INSPIRADO EN CARL JUNG",
      description:
        'Para obtener más probabilidades de aciertos, evitemos responder muchos "A veces" y responder de manera sincera, no como nos gustaría que fuese, sino como realmente somos.',
      color: "text-blue-600",
      bgColor: "bg-blue-500",
      iconBg: "bg-blue-100",
      accentColor:
        "bg-gradient-to-br from-blue-50 to-indigo-50",
      personalInfoFields: [
        {
          key: "nombre",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          key: "apellidos",
          label: "Apellidos",
          type: "text",
          required: true,
        },
        {
          key: "edad",
          label: "Edad",
          type: "number",
          required: true,
        },
        {
          key: "genero",
          label: "Género",
          type: "text",
          required: true,
        },
        {
          key: "correo",
          label: "Correo electrónico",
          type: "email",
          required: true,
        },
        {
          key: "orientacionSexual",
          label: "Orientación sexual",
          type: "text",
          required: true,
        },
      ],
      questions: [
        {
          question: "¿Conectas fácilmente con gente nueva?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te resulta fácil establecer conversación con un desconocido?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te sientes más cómodo estando solo que en grupo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Socializar puede agotar tu energía rápidamente?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefieres las llamadas telefónicas a los mensajes de texto cuando se comunica con otras personas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefieres las actividades en solitario a las interacciones en grupo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Debatir y analizar obras creativas le apasiona?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Le gustan las películas con conclusiones abiertas que permitan la interpretación?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Siempre te han intrigado los misterios de la vida después de la muerte?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te encanta debatir conceptos teóricos y puedes pasarte horas conversando sobre ellos?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A menudo reflexionas sobre el significado de las cosas en lugar de aceptarlas sin más?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Le atraen las nuevas experiencias y le gusta explorar lugares desconocidos?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Reflexionar sobre experiencias pasadas te ayuda a comprender tus creencias y valores actuales?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Disfrutas aprendiendo nuevas ideas y conceptos, buscando constantemente el conocimiento?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te gustan los debates animados en los que puedes compartir e intercambiar ideas con los demás?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Puedes pasarte horas profundizando en los temas que despiertan tu curiosidad?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Eres paciente con las personas que no son tan rápidas o eficientes como tú?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Cuándo alguien a tu alrededor está disgustado tiendes a sentir también sus emociones?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Le cuesta empatizar con personas de orígenes muy diferentes?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Cuándo alguien piensa de forma diferente a ti, intentas comprender de verdad a la otra parte?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Valoras la honestidad por encima del tacto, aunque sea duro?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Empatizas con los sentimientos de los demás, aunque no hayas compartido sus experiencias?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Alcanzar metas personales le produce más satisfacción que ayudar a los demás?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A veces le cuesta entender las emociones de los demás?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question: "¿Sueles hacer planes de emergencia?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Mantienes la compostura incluso bajo presión?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Los entornos dinámicos y de ritmo rápido te dan energía y se desenvuelve bien bajo presión?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Le gustan los retos, especialmente en entornos de alta presión?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Un pequeño error a veces puede hacer dudar de tus conocimientos generales sobre un tema?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Conocer gente nueva te hace preocuparte por la impresión que has causado?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Con frecuencia se preocupa por el peor escenario posible en cualquier situación?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A menudo consideras las decisiones que has tomado?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿La inseguridad es algo con lo que lidia a menudo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Los errores de tu pasado suelen perdurar en la memoria?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A menudo se preocupa por incertidumbres futuras, incluso en situaciones tranquilas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Eres una persona que aprecia los recuerdos y los objetos sentimentales?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Cree que el mundo mejoraría si la gente tomara decisiones más basadas en las emociones?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te molesta que los demás discutan delante de ti?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te gusta organizar tu día con listas y horarios?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefiere seguir una rutina a ser espontáneo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Se siente más a gusto cuando su entorno está ordenado y organizado?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A menudo sigues tus sentimientos más que tu lógica?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Cuándo tienes que elegir sigues a tu corazón y eliges lo que te parece correcto?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te identificas mucho con ser una persona artística?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question: "¿Le gusta pasar tiempo en museos de arte?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question: "¿Te gusta ser el centro de atención?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefiere una rutina diaria bien estructurada y se siente más cómodo cuando las cosas son predecibles?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefiere relajarse antes de ocuparse de las tareas domésticas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Prefiere tomar decisiones rápidamente en lugar de pensar en ellas?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Confías más en tu instinto que en horarios o planes escritos?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Te adaptas fácilmente a los cambios inesperados de planes?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿A la hora de tomar decisiones, priorizas la lógica y la objetividad sobre las emociones?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Toma las riendas de forma natural en situaciones de grupo guiando a los demás hacia objetivos comunes?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question: "¿Le gusta asumir funciones de liderazgo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Tiendes a ser autocrítico, a reflexionar constantemente sobre tus acciones y a esforzarte por mejorar?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Para usted es importante tener objetivos claros y trabajar diligentemente para alcanzarlos?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Pasar tiempo a solas es algo que aprecia y encuentra paz en las actividades solitarias?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question: "¿Eres tu mejor amigo?",
          type: "radio",
          options: ["Sí", "No", "A veces"],
        },
        {
          question:
            "¿Cómo te gusta pasar tu tiempo libre? Hobbies (En caso de estar en el pack parejas no hace falta completar esta pregunta)",
          type: "textarea",
          placeholder:
            "Describe tus hobbies y cómo prefieres pasar tu tiempo libre...",
          isExtraQuestion: true,
        },
        {
          question:
            "¿Tienes alguna alergia, fobia o algo que deberíamos tener en cuenta para la cita?",
          type: "textarea",
          placeholder:
            "Describe cualquier alergia, fobia o consideración especial...",
          isExtraQuestion: true,
        },
      ],
    },
  };

  const currentData = questionnaireData[type];
  const isPersonalInfoStep = currentStep === 0;
  const totalSteps = currentData.questions.length + 1;
  const progress = (currentStep / (totalSteps - 1)) * 100;

  // Reset animations when step changes
  useEffect(() => {
    setShowOptions(false);
    setAnimationKey((prev) => prev + 1);
  }, [currentStep]);

  const handlePersonalInfoChange = (
    key: keyof PersonalInfo,
    value: string,
  ) => {
    setPersonalInfo({ ...personalInfo, [key]: value });
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep - 1]: value });

    // Auto-avanzar para preguntas de radio después de un pequeño delay
    if (
      !isPersonalInfoStep &&
      currentData.questions[currentStep - 1].type === "radio"
    ) {
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsCompleted(true);
        }
      }, 500); // Delay de 500ms para que el usuario vea la selección
    }
  };

  const canGoNext = () => {
    if (isPersonalInfoStep) {
      const requiredFields =
        currentData.personalInfoFields.filter(
          (field) => field.required,
        );
      return requiredFields.every(
        (field) =>
          personalInfo[field.key as keyof PersonalInfo],
      );
    }
    return answers[currentStep - 1] !== undefined;
  };

  const goToNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setPersonalInfo({
      nombre: "",
      apellidos: "",
      edad: "",
      genero: "",
      correo: "",
      orientacionSexual: "",
    });
    setAnswers({});
    setIsCompleted(false);
    setShowOptions(false);
    setAnimationKey(0);
  };

  const handleTypewriterComplete = () => {
    setTimeout(() => {
      setShowOptions(true);
    }, 300);
  };

  if (isCompleted) {
    return (
      <motion.div
        className={`min-h-screen flex items-center justify-center ${currentData.accentColor}`}
        initial={enableAnimations ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
      >
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            initial={enableAnimations ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={enableAnimations ? { delay: 0.2, duration: 0.5 } : { duration: 0 }}
          >
            <Card className="text-center shadow-2xl border-0">
              <CardContent className="p-8">
                <motion.div
                  className={`${currentData.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  initial={enableAnimations ? { scale: 0, rotate: -180 } : { scale: 1, rotate: 0 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={enableAnimations ? {
                    delay: 0.3,
                    duration: 0.6,
                    type: "spring",
                  } : { duration: 0 }}
                >
                  <Check
                    className={`h-8 w-8 ${currentData.color}`}
                  />
                </motion.div>

                <motion.h2
                  className="text-2xl text-gray-900 mb-3"
                  initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={enableAnimations ? { delay: 0.5, duration: 0.5 } : { duration: 0 }}
                >
                  ¡Cuestionario Completado!
                </motion.h2>

                <motion.p
                  className="text-gray-600 mb-8"
                  initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={enableAnimations ? { delay: 0.7, duration: 0.5 } : { duration: 0 }}
                >
                  {type === "personalidad"
                    ? "Nuestro equipo de psicólogos analizará tu perfil de personalidad y te contactaremos pronto con tu análisis personalizado."
                    : "Nuestro equipo de psicólogos revisará tus respuestas y te contactaremos pronto con recomendaciones personalizadas."}
                </motion.p>

                <motion.div
                  className="space-y-3"
                  initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={enableAnimations ? { delay: 0.9, duration: 0.5 } : { duration: 0 }}
                >
                  <Button
                    className={`${currentData.bgColor} hover:opacity-90 text-white w-full py-3 transition-all duration-300 hover:scale-105`}
                    onClick={resetQuestionnaire}
                  >
                    Hacer otro cuestionario
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full py-3 transition-all duration-300 hover:scale-105"
                    onClick={onBack}
                  >
                    Volver al inicio
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`min-h-screen flex flex-col ${currentData.accentColor}`}
      initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
    >
      {/* Header compacto */}
      <motion.div
        className="flex-shrink-0 px-6 py-4"
        initial={enableAnimations ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-300 hover:scale-105"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>

            <motion.div
              className="text-center"
              initial={enableAnimations ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enableAnimations ? { delay: 0.2, duration: 0.5 } : { duration: 0 }}
            >
              <h1 className="text-xl text-gray-900 mb-1">
                {currentData.title}
              </h1>
              <p
                className={`text-xs uppercase tracking-wider ${currentData.color}`}
              >
                {currentData.subtitle}
              </p>
            </motion.div>

            <div className="w-20"></div>
          </div>

          {/* Progress compacto */}
          <motion.div
            className="mb-4"
            initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={enableAnimations ? { delay: 0.3, duration: 0.5 } : { duration: 0 }}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="text-xs">
                {isPersonalInfoStep
                  ? "Información Personal"
                  : `Pregunta ${currentStep} de ${currentData.questions.length}`}
              </span>
              <span className="text-xs">
                {Math.round(progress)}% completado
              </span>
            </div>
            <motion.div
              initial={enableAnimations ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={enableAnimations ? { duration: 0.5, delay: 0.4 } : { duration: 0 }}
              style={{ transformOrigin: "left" }}
            >
              <Progress value={progress} className="h-1.5" />
            </motion.div>
          </motion.div>

          {/* Instrucciones especiales para personalidad */}
          {type === "personalidad" && isPersonalInfoStep && (
            <motion.div
              className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
              initial={enableAnimations ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enableAnimations ? { delay: 0.5, duration: 0.5 } : { duration: 0 }}
            >
              <p className="text-sm text-blue-800">
                <span className="uppercase tracking-wide text-xs">
                  Importante:
                </span>{" "}
                {currentData.description}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 px-6 pb-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            {/* Información Personal */}
            {isPersonalInfoStep && (
              <motion.div
                key="personal-info"
                initial={enableAnimations ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={enableAnimations ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
                className="flex-1 flex flex-col"
              >
                <Card className="flex-1 flex flex-col shadow-lg border-0">
                  <CardHeader className="flex-shrink-0 pb-4">
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <motion.div
                        initial={enableAnimations ? { rotate: -180, opacity: 0 } : { rotate: 0, opacity: 1 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
                      >
                        <User className="h-5 w-5 mr-2" />
                      </motion.div>
                      Información Personal
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
                        initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={enableAnimations ? {
                          delay: 0.3,
                          duration: 0.5,
                        } : { duration: 0 }}
                      >
                        {currentData.personalInfoFields.map(
                          (field, index) => (
                            <motion.div
                              key={field.key}
                              className={`space-y-2 ${field.key === "correo" || field.key === "orientacionSexual" ? "md:col-span-2" : ""}`}
                              initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={enableAnimations ? {
                                delay: 0.4 + index * 0.1,
                                duration: 0.5,
                              } : { duration: 0 }}
                            >
                              <Label
                                htmlFor={field.key}
                                className="text-gray-700 text-sm"
                              >
                                {field.label}{" "}
                                {field.required && (
                                  <span className="text-red-500">
                                    *
                                  </span>
                                )}
                              </Label>
                              <Input
                                id={field.key}
                                type={field.type}
                                value={
                                  personalInfo[
                                    field.key as keyof PersonalInfo
                                  ]
                                }
                                onChange={(e) =>
                                  handlePersonalInfoChange(
                                    field.key as keyof PersonalInfo,
                                    e.target.value,
                                  )
                                }
                                className="h-11 transition-all duration-300 focus:scale-105"
                                placeholder={
                                  field.key === "genero"
                                    ? "Ej: Femenino, Masculino, No binario, etc."
                                    : field.key === "correo"
                                      ? "ejemplo@correo.com"
                                      : field.key ===
                                          "orientacionSexual"
                                        ? "Ej: Heterosexual, Homosexual, Bisexual, etc."
                                        : `Escribe tu ${field.label.toLowerCase()}`
                                }
                              />
                            </motion.div>
                          ),
                        )}
                      </motion.div>
                    </div>

                    {/* Navegación dentro de la card */}
                    <motion.div
                      className="flex justify-between pt-6 border-t border-gray-100"
                      initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={enableAnimations ? { delay: 0.8, duration: 0.5 } : { duration: 0 }}
                    >
                      <Button
                        variant="outline"
                        onClick={goToPrevious}
                        disabled={currentStep === 0}
                        className="px-6 py-2 transition-all duration-300 hover:scale-105"
                        size="sm"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                      </Button>

                      <Button
                        className={`${currentData.bgColor} hover:opacity-90 text-white px-6 py-2 transition-all duration-300 hover:scale-105`}
                        onClick={goToNext}
                        disabled={!canGoNext()}
                        size="sm"
                      >
                        {currentStep === totalSteps - 1
                          ? "Finalizar"
                          : "Siguiente"}
                        {currentStep !== totalSteps - 1 && (
                          <ArrowRight className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Preguntas */}
            {!isPersonalInfoStep && (
              <motion.div
                key={`question-${currentStep}-${animationKey}`}
                initial={enableAnimations ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={enableAnimations ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
                className="flex-1 flex flex-col"
              >
                <Card className="flex-1 flex flex-col shadow-lg border-0">
                  <CardHeader className="flex-shrink-0 pb-4">
                    <TypewriterText
                      text={
                        currentData.questions[currentStep - 1]
                          .question
                      }
                      speed={30}
                      delay={200}
                      className="text-lg text-gray-800 leading-tight"
                      onComplete={handleTypewriterComplete}
                    />
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col justify-center">
                      <AnimatePresence>
                        {showOptions && (
                          <>
                            {currentData.questions[
                              currentStep - 1
                            ].type === "radio" ? (
                              <motion.div
                                initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
                              >
                                <RadioGroup
                                  value={
                                    answers[currentStep - 1] ||
                                    ""
                                  }
                                  onValueChange={handleAnswer}
                                  className="space-y-3"
                                >
                                  {currentData.questions[
                                    currentStep - 1
                                  ].options?.map(
                                    (option, index) => (
                                      <motion.div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-white/50 transition-all duration-300 cursor-pointer hover:scale-102"
                                        initial={enableAnimations ? {
                                          opacity: 0,
                                          x: -20,
                                        } : {
                                          opacity: 1,
                                          x: 0,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                        }}
                                        transition={enableAnimations ? {
                                          delay: index * 0.1,
                                          duration: 0.3,
                                        } : { duration: 0 }}
                                        whileHover={enableAnimations ? {
                                          scale: 1.02,
                                        } : {}}
                                        whileTap={enableAnimations ? {
                                          scale: 0.98,
                                        } : {}}
                                      >
                                        <RadioGroupItem
                                          value={option}
                                          id={`option-${index}`}
                                        />
                                        <Label
                                          htmlFor={`option-${index}`}
                                          className="flex-1 cursor-pointer text-gray-700 text-sm"
                                        >
                                          {option}
                                        </Label>
                                      </motion.div>
                                    ),
                                  )}
                                </RadioGroup>
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={enableAnimations ? { duration: 0.5 } : { duration: 0 }}
                              >
                                <Textarea
                                  value={
                                    answers[currentStep - 1] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleAnswer(e.target.value)
                                  }
                                  placeholder={
                                    currentData.questions[
                                      currentStep - 1
                                    ].placeholder
                                  }
                                  className="min-h-32 resize-none transition-all duration-300 focus:scale-102"
                                />
                              </motion.div>
                            )}
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Navegación dentro de la card */}
                    <motion.div
                      className="flex justify-between pt-6 border-t border-gray-100"
                      initial={enableAnimations ? { opacity: 0 } : { opacity: 1 }}
                      animate={{
                        opacity: showOptions ? 1 : 0.3,
                      }}
                      transition={enableAnimations ? { duration: 0.3 } : { duration: 0 }}
                    >
                      <Button
                        variant="outline"
                        onClick={goToPrevious}
                        disabled={currentStep === 0}
                        className="px-6 py-2 transition-all duration-300 hover:scale-105"
                        size="sm"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                      </Button>

                      <Button
                        className={`${currentData.bgColor} hover:opacity-90 text-white px-6 py-2 transition-all duration-300 hover:scale-105`}
                        onClick={goToNext}
                        disabled={!canGoNext()}
                        size="sm"
                      >
                        {currentStep === totalSteps - 1
                          ? "Finalizar"
                          : "Siguiente"}
                        {currentStep !== totalSteps - 1 && (
                          <ArrowRight className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}