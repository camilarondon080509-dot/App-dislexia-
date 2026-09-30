import { ChildProfile, ActivityResult, Activity, SubjectId } from '../types';
import { ACTIVITIES_DATA } from '../data/activities';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';

export interface AdaptiveEvaluation {
  overallAccuracy: number;
  totalActivitiesCount: number;
  totalTimeMinutes: number;
  masteredSkills: string[];
  skillsNeedingPractice: string[];
  recommendedSubject: SubjectId;
  recommendedActivity: Activity;
  encouragingMessage: string;
  pedagogicalAdviceForParents: string;
  subjectMastery: Record<SubjectId, { total: number; correct: number; percent: number }>;
}

export const evaluateAdaptiveProgress = (profile: ChildProfile): AdaptiveEvaluation => {
  const history = profile.resultsHistory || [];
  const total = history.length;
  
  if (total === 0) {
    const defaultActivity = ACTIVITIES_DATA[0];
    return {
      overallAccuracy: 100,
      totalActivitiesCount: 0,
      totalTimeMinutes: 0,
      masteredSkills: ['Curiosidad y entusiasmo'],
      skillsNeedingPractice: ['Primeros fonemas y sonidos'],
      recommendedSubject: 'lengua',
      recommendedActivity: defaultActivity,
      encouragingMessage: `¡Hola ${profile.name}! Hoy es un día maravilloso para descubrir letras y números jugando.`,
      pedagogicalAdviceForParents: 'El niño recién inicia. Fomente sesiones cortas de 10 a 15 minutos con refuerzo positivo y lectura compartida.',
      subjectMastery: {
        lengua: { total: 0, correct: 0, percent: 0 },
        matematicas: { total: 0, correct: 0, percent: 0 },
        ciencias_naturales: { total: 0, correct: 0, percent: 0 },
        ciencias_sociales: { total: 0, correct: 0, percent: 0 },
        ingles: { total: 0, correct: 0, percent: 0 },
        cerebro: { total: 0, correct: 0, percent: 0 }
      }
    };
  }

  // Calculate subject mastery
  const subjectMastery: Record<SubjectId, { total: number; correct: number; percent: number }> = {
    lengua: { total: 0, correct: 0, percent: 0 },
    matematicas: { total: 0, correct: 0, percent: 0 },
    ciencias_naturales: { total: 0, correct: 0, percent: 0 },
    ciencias_sociales: { total: 0, correct: 0, percent: 0 },
    ingles: { total: 0, correct: 0, percent: 0 },
    cerebro: { total: 0, correct: 0, percent: 0 }
  };

  const skillStats: Record<string, { total: number; correct: number; avgAttempts: number }> = {};
  let totalCorrect = 0;
  let totalTimeSeconds = 0;

  history.forEach(res => {
    if (res.correct) totalCorrect++;
    totalTimeSeconds += (res.timeSpentSeconds || 20);

    if (subjectMastery[res.subjectId]) {
      subjectMastery[res.subjectId].total++;
      if (res.correct) subjectMastery[res.subjectId].correct++;
    }

    if (!skillStats[res.skillCategory]) {
      skillStats[res.skillCategory] = { total: 0, correct: 0, avgAttempts: 0 };
    }
    skillStats[res.skillCategory].total++;
    if (res.correct) skillStats[res.skillCategory].correct++;
    skillStats[res.skillCategory].avgAttempts += res.attempts;
  });

  // Calculate percentages
  (Object.keys(subjectMastery) as SubjectId[]).forEach(s => {
    const item = subjectMastery[s];
    item.percent = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
  });

  const overallAccuracy = Math.round((totalCorrect / total) * 100);
  const totalTimeMinutes = Math.round(totalTimeSeconds / 60);

  // Group mastered and needing reinforcement
  const masteredSkills: string[] = [];
  const skillsNeedingPractice: string[] = [];

  Object.entries(skillStats).forEach(([skill, stats]) => {
    const accuracy = (stats.correct / stats.total) * 100;
    if (accuracy >= 80 && stats.total >= 1) {
      masteredSkills.push(skill);
    } else if (accuracy < 70 || stats.avgAttempts / stats.total > 1.5) {
      skillsNeedingPractice.push(skill);
    }
  });

  if (masteredSkills.length === 0) {
    masteredSkills.push('Exploración inicial de conceptos');
  }
  if (skillsNeedingPractice.length === 0) {
    skillsNeedingPractice.push('Ampliación de vocabulario y retos guiados');
  }

  // Find lowest mastered subject to recommend, or rotate
  const sortedSubjects = (Object.keys(subjectMastery) as SubjectId[]).sort((a, b) => {
    return subjectMastery[a].total - subjectMastery[b].total;
  });
  const recommendedSubject = sortedSubjects[0] || 'lengua';

  // Find recommended activity not completed yet or in skill needing practice
  const completedIds = new Set(history.map(h => h.activityId));
  let recommendedActivity = ACTIVITIES_DATA.find(
    a => a.subjectId === recommendedSubject && !completedIds.has(a.id)
  );

  if (!recommendedActivity) {
    // If all completed in subject, pick any uncompleted, or first one
    recommendedActivity = ACTIVITIES_DATA.find(a => !completedIds.has(a.id)) || ACTIVITIES_DATA[0];
  }

  // Positive messages
  let encouragingMessage = `¡Sigue así, ${profile.name}! Cada juego fortalece tus superpoderes.`;
  if (overallAccuracy >= 85) {
    encouragingMessage = `¡Impresionante ritmo, ${profile.name}! Estás dominando tus desafíos con gran confianza.`;
  } else if (overallAccuracy >= 60) {
    encouragingMessage = `¡Excelente esfuerzo, ${profile.name}! Cada intento te acerca a ser un gran maestro.`;
  }

  const pedagogicalAdviceForParents = `El niño muestra alta receptividad a estímulos multisensoriales. Se recomienda continuar celebrando el esfuerzo, realizar pausas cada 15 minutos y reforzar ${skillsNeedingPractice[0] || 'la lectura en voz alta'}.`;

  return {
    overallAccuracy,
    totalActivitiesCount: total,
    totalTimeMinutes,
    masteredSkills,
    skillsNeedingPractice,
    recommendedSubject,
    recommendedActivity,
    encouragingMessage,
    pedagogicalAdviceForParents,
    subjectMastery
  };
};

export const checkAndUpdateAchievements = (profile: ChildProfile): string[] => {
  const newlyUnlocked: string[] = [];
  const currentUnlocked = new Set(profile.unlockedAchievements || []);
  const history = profile.resultsHistory || [];

  // Check first play
  if (history.length >= 1 && !currentUnlocked.has('first_play')) {
    newlyUnlocked.push('first_play');
  }

  // Check gran lector (3 lengua)
  const lenguaCount = history.filter(h => h.subjectId === 'lengua').length;
  if (lenguaCount >= 3 && !currentUnlocked.has('gran_lector')) {
    newlyUnlocked.push('gran_lector');
  }

  // Check experto numeros (3 mates)
  const matCount = history.filter(h => h.subjectId === 'matematicas').length;
  if (matCount >= 3 && !currentUnlocked.has('experto_numeros')) {
    newlyUnlocked.push('experto_numeros');
  }

  // Check explorador ciencias (3 ciencias)
  const cienciasCount = history.filter(h => h.subjectId === 'ciencias_naturales').length;
  if (cienciasCount >= 3 && !currentUnlocked.has('explorador_ciencias')) {
    newlyUnlocked.push('explorador_ciencias');
  }

  // Check english star (3 ingles)
  const inglesCount = history.filter(h => h.subjectId === 'ingles').length;
  if (inglesCount >= 3 && !currentUnlocked.has('english_star')) {
    newlyUnlocked.push('english_star');
  }

  // Check cerebro fuerte (3 cerebro)
  const cerebroCount = history.filter(h => h.subjectId === 'cerebro').length;
  if (cerebroCount >= 3 && !currentUnlocked.has('cerebro_fuerte')) {
    newlyUnlocked.push('cerebro_fuerte');
  }

  // Check streak
  if (profile.streakDays >= 3 && !currentUnlocked.has('streak_3')) {
    newlyUnlocked.push('streak_3');
  }

  // Check stars
  if (profile.stars >= 50 && !currentUnlocked.has('collector_stars')) {
    newlyUnlocked.push('collector_stars');
  }

  return newlyUnlocked;
};
