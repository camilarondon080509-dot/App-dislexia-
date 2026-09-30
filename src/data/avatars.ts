import { MascotItem } from '../types';

export interface AvatarOption {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bgColor: string;
  description: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'lumi',
    name: 'Lumi',
    title: 'El Dragón Sabio',
    emoji: '🐲',
    bgColor: 'from-emerald-400 to-teal-500',
    description: 'Le encantan las palabras, volar entre letras y descubrir secretos de la naturaleza.'
  },
  {
    id: 'sparky',
    name: 'Sparky',
    title: 'El Zorro Veloz',
    emoji: '🦊',
    bgColor: 'from-amber-400 to-orange-500',
    description: 'Curioso y lleno de energía, le fascina resolver acertijos matemáticos.'
  },
  {
    id: 'kira',
    name: 'Kira',
    title: 'La Lechuza Lectora',
    emoji: '🦉',
    bgColor: 'from-indigo-400 to-purple-500',
    description: 'Tiene una visión increíble para notar detalles y adora leer historias mágicas.'
  },
  {
    id: 'tito',
    name: 'Tito',
    title: 'El Oso Panda Alegre',
    emoji: '🐼',
    bgColor: 'from-cyan-400 to-blue-500',
    description: 'Tranquilo y bondadoso, te acompaña paso a pasito con mucha paciencia.'
  },
  {
    id: 'nina',
    name: 'Nina',
    title: 'La Conejita Exploradora',
    emoji: '🐰',
    bgColor: 'from-rose-400 to-pink-500',
    description: 'Ama los idiomas, hablar en inglés y cantar rimas alegres.'
  },
  {
    id: 'leo',
    name: 'Leo',
    title: 'El León Campeón',
    emoji: '🦁',
    bgColor: 'from-yellow-400 to-amber-500',
    description: 'Valiente y perseverante, sabe que equivocarse es parte de ser un gran héroe.'
  }
];

export const MASCOT_SHOP_ITEMS: MascotItem[] = [
  { id: 'hat_wizard', name: 'Sombrero Mágico', category: 'hat', icon: '🧙‍♂️', cost: 15, unlocked: false },
  { id: 'hat_cap', name: 'Gorra Aventurera', category: 'hat', icon: '🧢', cost: 10, unlocked: false },
  { id: 'hat_crown', name: 'Corona Dorada', category: 'hat', icon: '👑', cost: 30, unlocked: false },
  { id: 'hat_grad', name: 'Birrete de Sabio', category: 'hat', icon: '🎓', cost: 25, unlocked: false },
  
  { id: 'glasses_star', name: 'Gafas de Estrellas', category: 'glasses', icon: '🕶️', cost: 15, unlocked: false },
  { id: 'glasses_detective', name: 'Lente de Detective', category: 'glasses', icon: '🧐', cost: 20, unlocked: false },
  { id: 'glasses_cool', name: 'Gafas Futuristas', category: 'glasses', icon: '🥽', cost: 25, unlocked: false },

  { id: 'cape_hero', name: 'Capa de Superhéroe', category: 'cape', icon: '🦸', cost: 35, unlocked: false },
  { id: 'cape_star', name: 'Manto Estelar', category: 'cape', icon: '✨', cost: 40, unlocked: false },

  { id: 'badge_star', name: 'Medalla de Oro', category: 'badge', icon: '🥇', cost: 20, unlocked: false },
  { id: 'badge_heart', name: 'Corazón de Cristal', category: 'badge', icon: '💖', cost: 15, unlocked: false }
];
