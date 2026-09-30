import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_play',
    title: 'Primer Gran Paso',
    description: 'Completaste tu primera actividad interactiva.',
    icon: '🌟',
    category: 'general',
    requirement: '1 actividad completada'
  },
  {
    id: 'gran_lector',
    title: 'Gran Lector',
    description: 'Exploraste el mundo de las letras y completaste 3 lecturas.',
    icon: '📚',
    category: 'lengua',
    requirement: '3 actividades de lengua'
  },
  {
    id: 'experto_numeros',
    title: 'Experto en Números',
    description: 'Resolviste desafíos matemáticos con destreza.',
    icon: '🔢',
    category: 'matematicas',
    requirement: '3 actividades de matemáticas'
  },
  {
    id: 'explorador_ciencias',
    title: 'Explorador de Ciencias',
    description: 'Descubriste misterios de la naturaleza y el universo.',
    icon: '🌱',
    category: 'ciencias',
    requirement: '3 actividades de ciencias naturales'
  },
  {
    id: 'ciudadano_estrella',
    title: 'Ciudadano Estrella',
    description: 'Aprendiste sobre tu comunidad y las regiones de Colombia.',
    icon: '🌎',
    category: 'general',
    requirement: '3 actividades de ciencias sociales'
  },
  {
    id: 'english_star',
    title: 'English Star',
    description: 'Pronunciaste y practicaste vocabulario en inglés.',
    icon: '🇬🇧',
    category: 'ingles',
    requirement: '3 actividades de inglés'
  },
  {
    id: 'cerebro_fuerte',
    title: 'Mente Poderosa',
    description: 'Entrenaste tu memoria auditiva y atención visual.',
    icon: '🧠',
    category: 'cerebro',
    requirement: '3 entrenamientos cerebrales'
  },
  {
    id: 'streak_3',
    title: 'Super Racha de 3 Días',
    description: 'Practicaste durante 3 días seguidos.',
    icon: '🔥',
    category: 'racha',
    requirement: 'Racha de 3 días'
  },
  {
    id: 'phoneme_master',
    title: 'Maestro de Sonidos',
    description: 'Diferenciaste con éxito letras y fonemas como b, d, p y q.',
    icon: '🎯',
    category: 'lengua',
    requirement: 'Superar reto de discriminación visual'
  },
  {
    id: 'collector_stars',
    title: 'Cosechador de Estrellas',
    description: 'Acumulaste más de 50 estrellas brillantes.',
    icon: '✨',
    category: 'general',
    requirement: '50 estrellas obtenidas'
  }
];
