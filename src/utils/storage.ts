import { ChildProfile, ActivityResult, Goal } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';

const PROFILES_KEY = 'lumi_profiles_v1';
const ACTIVE_PROFILE_ID_KEY = 'lumi_active_profile_id_v1';

export const DEFAULT_GOALS: Goal[] = [
  {
    id: 'goal_read_3',
    title: 'Completar 2 juegos de lectura',
    description: 'Practica sonidos y palabras divertidas.',
    targetCount: 2,
    currentCount: 0,
    subjectId: 'lengua',
    completed: false,
    rewardStars: 5
  },
  {
    id: 'goal_math_2',
    title: 'Resolver 2 desafíos matemáticos',
    description: 'Cuenta objetos o equilibra la balanza.',
    targetCount: 2,
    currentCount: 0,
    subjectId: 'matematicas',
    completed: false,
    rewardStars: 5
  },
  {
    id: 'goal_brain_1',
    title: '1 entrenamiento cerebral',
    description: 'Entrena tu memoria auditiva o visual.',
    targetCount: 1,
    currentCount: 0,
    subjectId: 'cerebro',
    completed: false,
    rewardStars: 5
  }
];

export const createDefaultProfile = (name = 'Mateo', age = 8, grade = '2° Primaria', avatarId = 'lumi'): ChildProfile => {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    id: 'profile_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name,
    age,
    grade,
    avatarId,
    favoriteSubjects: ['lengua', 'matematicas', 'ciencias_naturales', 'ciencias_sociales', 'ingles', 'cerebro'],
    createdAt: Date.now(),
    stars: 28,
    lumis: 45,
    streakDays: 3,
    lastPracticeDate: today,
    totalMinutesPracticed: 35,
    subjectLevels: {
      lengua: 1,
      matematicas: 2,
      ciencias_naturales: 1,
      ciencias_sociales: 1,
      ingles: 1,
      cerebro: 1
    },
    resultsHistory: [
      {
        activityId: 'lengua_sonido_b_d',
        subjectId: 'lengua',
        skillCategory: 'Discriminación b/d',
        timestamp: Date.now() - 3600000 * 24,
        correct: true,
        attempts: 1,
        timeSpentSeconds: 28,
        difficulty: 1,
        usedHint: false
      },
      {
        activityId: 'mat_conteo_manzanas',
        subjectId: 'matematicas',
        skillCategory: 'Conteo visual manipulable',
        timestamp: Date.now() - 3600000 * 20,
        correct: true,
        attempts: 1,
        timeSpentSeconds: 22,
        difficulty: 1,
        usedHint: false
      },
      {
        activityId: 'ciencias_habitat_acuatico',
        subjectId: 'ciencias_naturales',
        skillCategory: 'Animales y hábitats',
        timestamp: Date.now() - 3600000 * 5,
        correct: true,
        attempts: 1,
        timeSpentSeconds: 25,
        difficulty: 1,
        usedHint: false
      }
    ],
    unlockedAchievements: ['first_play', 'streak_3'],
    goals: [
      { ...DEFAULT_GOALS[0], currentCount: 1 },
      { ...DEFAULT_GOALS[1], currentCount: 1 },
      { ...DEFAULT_GOALS[2], currentCount: 0 }
    ],
    equippedMascotItems: {
      hat: 'hat_cap'
    },
    ownedMascotItems: ['hat_cap'],
    accessibility: {
      fontFamily: 'lexend',
      fontSize: 'normal',
      letterSpacing: true,
      readingGuide: false,
      guideY: 200,
      backgroundTint: 'cream',
      speechRate: 0.9,
      autoPlayAudio: true,
      highContrast: false
    }
  };
};

export const loadAllProfiles = (): ChildProfile[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      const defaultProf = createDefaultProfile();
      saveProfiles([defaultProf]);
      setActiveProfileId(defaultProf.id);
      return [defaultProf];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const defaultProf = createDefaultProfile();
      saveProfiles([defaultProf]);
      setActiveProfileId(defaultProf.id);
      return [defaultProf];
    }
    return parsed;
  } catch (err) {
    console.error('Error loading profiles:', err);
    return [];
  }
};

export const saveProfiles = (profiles: ChildProfile[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Error saving profiles:', err);
  }
};

export const getActiveProfileId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_PROFILE_ID_KEY);
};

export const setActiveProfileId = (id: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, id);
};

export const getCurrentProfile = (): ChildProfile => {
  const profiles = loadAllProfiles();
  const activeId = getActiveProfileId();
  const current = profiles.find(p => p.id === activeId);
  if (current) return current;
  if (profiles.length > 0) {
    setActiveProfileId(profiles[0].id);
    return profiles[0];
  }
  const fresh = createDefaultProfile();
  saveProfiles([fresh]);
  setActiveProfileId(fresh.id);
  return fresh;
};

export const updateCurrentProfile = (updater: (prev: ChildProfile) => ChildProfile): ChildProfile => {
  const profiles = loadAllProfiles();
  const current = getCurrentProfile();
  const updated = updater(current);
  const newProfiles = profiles.map(p => p.id === updated.id ? updated : p);
  saveProfiles(newProfiles);
  return updated;
};
