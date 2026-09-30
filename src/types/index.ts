export type SubjectId = 'lengua' | 'matematicas' | 'ciencias_naturales' | 'ciencias_sociales' | 'ingles' | 'cerebro';

export type ActivityType = 
  | 'phonics_sound'           // Escuchar sonido y elegir letra/fonema
  | 'word_builder'            // Ordenar letras o sílabas para formar palabra
  | 'word_match'              // Asociar palabra con imagen
  | 'guided_reading'          // Lectura corta con audio y karaoke
  | 'reading_comprehension'   // Pregunta después de lectura corta
  | 'voice_pronunciation'     // Hablar por micrófono y pronunciar
  | 'visual_count'            // Contar objetos manipulables
  | 'math_operation'          // Sumas o restas visuales con objetos
  | 'math_comparison'         // Balanza mayor/menor/igual
  | 'pattern_sequence'        // Series numéricas o visuales
  | 'fractions_visual'        // Fracciones en pizzas/pasteles
  | 'science_classification'  // Clasificar seres vivos/objetos
  | 'science_diagram'         // Señalar partes (planta, cuerpo, sentidos)
  | 'social_community'        // Profesiones, familia, convivencia
  | 'social_colombia'         // Regiones de Colombia, símbolos patrios, mapas
  | 'english_vocab'           // Vocabulario en inglés con audio nativo
  | 'auditory_memory'         // Repetir secuencia auditiva (tipo simon sonoro)
  | 'visual_memory'           // Recordar cartas ocultas
  | 'mirror_letters'          // Diferenciar b/d/p/q y letras espejo
  | 'visual_search'           // Encontrar letras u objetos escondidos
  | 'temporal_ordering';      // Secuencia temporal antes/durante/después

export interface ActivityOption {
  id: string;
  text: string;
  image?: string;
  audioPrompt?: string;
  isCorrect: boolean;
  phonemeHelp?: string;
}

export interface Activity {
  id: string;
  subjectId: SubjectId;
  type: ActivityType;
  title: string;
  instruction: string;
  instructionAudio?: string;
  difficulty: 1 | 2 | 3; // 1: Fácil / Guiado, 2: Medio, 3: Reto
  skillCategory: string; // ej: "Discriminación b/d", "Conciencia fonológica", "Conteo visual", etc.
  storyContext?: string; // Para comprensión lectora
  storyImage?: string;
  syllables?: string[]; // Para construcción silábica
  scrambledLetters?: string[]; // Para ordenar letras
  targetWord?: string; // Para lectura y pronunciación
  options?: ActivityOption[];
  hint: string;
  visualCue?: string; // Ilustración o emoji ilustrativo
  correctFeedback: string;
  encouragingFeedback: string;
  stepByStepSteps?: string[]; // Para desglosar problemas complejos
  metadata?: Record<string, any>;
}

export interface ActivityResult {
  activityId: string;
  subjectId: SubjectId;
  skillCategory: string;
  timestamp: number;
  correct: boolean;
  attempts: number;
  timeSpentSeconds: number;
  difficulty: number;
  usedHint: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  subjectId?: SubjectId;
  completed: boolean;
  rewardStars: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  category: 'general' | 'lengua' | 'matematicas' | 'ciencias' | 'ingles' | 'cerebro' | 'racha';
  requirement: string;
}

export interface MascotItem {
  id: string;
  name: string;
  category: 'hat' | 'glasses' | 'badge' | 'cape';
  icon: string;
  cost: number;
  unlocked: boolean;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: string; // "Preescolar", "1° Primaria", "2° Primaria", "3° Primaria", "4° Primaria", "5° Primaria"
  avatarId: string;
  favoriteSubjects: SubjectId[];
  createdAt: number;
  
  // Gamificación
  stars: number;
  lumis: number; // monedas
  streakDays: number;
  lastPracticeDate: string; // YYYY-MM-DD
  totalMinutesPracticed: number;
  
  // Nivel adaptativo por materia (1 a 5)
  subjectLevels: Record<SubjectId, number>;
  
  // Historial y métricas
  resultsHistory: ActivityResult[];
  unlockedAchievements: string[];
  goals: Goal[];
  equippedMascotItems: {
    hat?: string;
    glasses?: string;
    cape?: string;
    badge?: string;
  };
  ownedMascotItems: string[];
  
  // Preferencias de accesibilidad para dislexia
  accessibility: {
    fontFamily: 'lexend' | 'fredoka' | 'comic';
    fontSize: 'normal' | 'large' | 'extralarge';
    letterSpacing: boolean; // mayor separación entre letras
    readingGuide: boolean; // regla de lectura visual
    guideY: number; // posición de la regla
    backgroundTint: 'cream' | 'mint' | 'sky' | 'peach' | 'white';
    speechRate: number; // 0.8 a 1.2
    autoPlayAudio: boolean;
    highContrast: boolean;
  };
}
