import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChildProfile, 
  SubjectId, 
  Activity, 
  ActivityResult, 
  MascotItem 
} from '../types';
import { 
  getCurrentProfile, 
  loadAllProfiles, 
  saveProfiles, 
  setActiveProfileId, 
  updateCurrentProfile,
  DEFAULT_GOALS
} from '../utils/storage';
import { playSoundEffect, speakText } from '../utils/audio';
import { checkAndUpdateAchievements } from '../utils/adaptiveEngine';

export type AppScreen = 'home' | 'subject' | 'activity' | 'progress' | 'brain' | 'shop' | 'parent_portal';

interface AppContextType {
  profile: ChildProfile;
  allProfiles: ChildProfile[];
  currentScreen: AppScreen;
  selectedSubject: SubjectId | null;
  activeActivity: Activity | null;
  showProfileModal: boolean;
  showShopModal: boolean;
  setCurrentScreen: (screen: AppScreen) => void;
  setSelectedSubject: (subject: SubjectId | null) => void;
  startActivity: (activity: Activity) => void;
  closeActivity: () => void;
  completeActivity: (result: Omit<ActivityResult, 'timestamp'>) => void;
  updateAccessibility: (updater: (prev: ChildProfile['accessibility']) => ChildProfile['accessibility']) => void;
  switchProfile: (profileId: string) => void;
  createProfile: (data: { name: string; age: number; grade: string; avatarId: string; favoriteSubjects: SubjectId[] }) => void;
  deleteProfile: (profileId: string) => void;
  setShowProfileModal: (show: boolean) => void;
  setShowShopModal: (show: boolean) => void;
  buyShopItem: (item: MascotItem) => boolean;
  equipShopItem: (item: MascotItem) => void;
  triggerConfetti: () => void;
  playTextAudio: (text: string, lang?: 'es' | 'en') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => loadAllProfiles());
  const [profile, setProfile] = useState<ChildProfile>(() => getCurrentProfile());
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showShopModal, setShowShopModal] = useState<boolean>(false);

  useEffect(() => {
    // Keep local storage in sync whenever profile changes
    saveProfiles(profiles);
  }, [profiles]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const playTextAudio = (text: string, lang: 'es' | 'en' = 'es') => {
    speakText(text, lang, profile.accessibility.speechRate);
  };

  const switchProfile = (profileId: string) => {
    const found = profiles.find(p => p.id === profileId);
    if (found) {
      setActiveProfileId(found.id);
      setProfile(found);
      setCurrentScreen('home');
      setSelectedSubject(null);
      setActiveActivity(null);
      playSoundEffect('pop');
    }
  };

  const createProfile = (data: {
    name: string;
    age: number;
    grade: string;
    avatarId: string;
    favoriteSubjects: SubjectId[];
  }) => {
    const today = new Date().toISOString().split('T')[0];
    const newProf: ChildProfile = {
      id: 'profile_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: data.name,
      age: data.age,
      grade: data.grade,
      avatarId: data.avatarId,
      favoriteSubjects: data.favoriteSubjects,
      createdAt: Date.now(),
      stars: 10, // initial welcome stars
      lumis: 20, // initial coins
      streakDays: 1,
      lastPracticeDate: today,
      totalMinutesPracticed: 0,
      subjectLevels: {
        lengua: 1,
        matematicas: 1,
        ciencias_naturales: 1,
        ciencias_sociales: 1,
        ingles: 1,
        cerebro: 1
      },
      resultsHistory: [],
      unlockedAchievements: ['first_play'],
      goals: DEFAULT_GOALS.map(g => ({ ...g })),
      equippedMascotItems: {},
      ownedMascotItems: [],
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

    const updatedList = [...profiles, newProf];
    setProfiles(updatedList);
    setActiveProfileId(newProf.id);
    setProfile(newProf);
    setShowProfileModal(false);
    setCurrentScreen('home');
    playSoundEffect('success');
    triggerConfetti();
  };

  const deleteProfile = (profileId: string) => {
    if (profiles.length <= 1) return; // Keep at least one profile
    const remaining = profiles.filter(p => p.id !== profileId);
    setProfiles(remaining);
    if (profile.id === profileId) {
      setActiveProfileId(remaining[0].id);
      setProfile(remaining[0]);
    }
  };

  const updateAccessibility = (updater: (prev: ChildProfile['accessibility']) => ChildProfile['accessibility']) => {
    const updated = updateCurrentProfile(prev => ({
      ...prev,
      accessibility: updater(prev.accessibility)
    }));
    setProfile(updated);
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const startActivity = (activity: Activity) => {
    setActiveActivity(activity);
    setCurrentScreen('activity');
    playSoundEffect('pop');
    if (profile.accessibility.autoPlayAudio && activity.instructionAudio) {
      speakText(activity.instructionAudio, activity.subjectId === 'ingles' ? 'en' : 'es', profile.accessibility.speechRate);
    }
  };

  const closeActivity = () => {
    setActiveActivity(null);
    if (selectedSubject) {
      setCurrentScreen('subject');
    } else {
      setCurrentScreen('home');
    }
    playSoundEffect('pop');
  };

  const completeActivity = (resultData: Omit<ActivityResult, 'timestamp'>) => {
    const fullResult: ActivityResult = {
      ...resultData,
      timestamp: Date.now()
    };

    // Calculate rewards
    const earnedStars = resultData.correct ? (resultData.difficulty === 1 ? 3 : resultData.difficulty === 2 ? 4 : 5) : 1;
    const earnedLumis = resultData.correct ? 5 : 2;

    const updated = updateCurrentProfile(prev => {
      // Update goals
      const updatedGoals = prev.goals.map(goal => {
        if (!goal.completed && (goal.subjectId === undefined || goal.subjectId === resultData.subjectId)) {
          const newCount = goal.currentCount + 1;
          const isDone = newCount >= goal.targetCount;
          return {
            ...goal,
            currentCount: newCount,
            completed: isDone
          };
        }
        return goal;
      });

      // Update subject level dynamically if 3 consecutive correct in this subject
      const subjectHistory = [...prev.resultsHistory, fullResult].filter(r => r.subjectId === resultData.subjectId);
      const recentThree = subjectHistory.slice(-3);
      let newLevel = prev.subjectLevels[resultData.subjectId] || 1;
      if (recentThree.length === 3 && recentThree.every(r => r.correct) && newLevel < 5) {
        newLevel += 1;
      }

      const newHistory = [...prev.resultsHistory, fullResult];
      const newMinutes = prev.totalMinutesPracticed + Math.ceil(resultData.timeSpentSeconds / 60);

      const modifiedProfile: ChildProfile = {
        ...prev,
        stars: prev.stars + earnedStars,
        lumis: prev.lumis + earnedLumis,
        totalMinutesPracticed: newMinutes,
        subjectLevels: {
          ...prev.subjectLevels,
          [resultData.subjectId]: newLevel
        },
        resultsHistory: newHistory,
        goals: updatedGoals
      };

      // Check achievements
      const newlyUnlocked = checkAndUpdateAchievements(modifiedProfile);
      if (newlyUnlocked.length > 0) {
        modifiedProfile.unlockedAchievements = [
          ...modifiedProfile.unlockedAchievements,
          ...newlyUnlocked
        ];
      }

      return modifiedProfile;
    });

    setProfile(updated);
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
    triggerConfetti();
  };

  const buyShopItem = (item: MascotItem): boolean => {
    if (profile.lumis < item.cost) {
      playSoundEffect('encouragement');
      return false;
    }

    const updated = updateCurrentProfile(prev => ({
      ...prev,
      lumis: prev.lumis - item.cost,
      ownedMascotItems: [...prev.ownedMascotItems, item.id],
      equippedMascotItems: {
        ...prev.equippedMascotItems,
        [item.category]: item.id
      }
    }));

    setProfile(updated);
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
    playSoundEffect('star');
    triggerConfetti();
    return true;
  };

  const equipShopItem = (item: MascotItem) => {
    const updated = updateCurrentProfile(prev => {
      const isAlreadyEquipped = prev.equippedMascotItems[item.category] === item.id;
      return {
        ...prev,
        equippedMascotItems: {
          ...prev.equippedMascotItems,
          [item.category]: isAlreadyEquipped ? undefined : item.id
        }
      };
    });
    setProfile(updated);
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
    playSoundEffect('pop');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        allProfiles: profiles,
        currentScreen,
        selectedSubject,
        activeActivity,
        showProfileModal,
        showShopModal,
        setCurrentScreen,
        setSelectedSubject,
        startActivity,
        closeActivity,
        completeActivity,
        updateAccessibility,
        switchProfile,
        createProfile,
        deleteProfile,
        setShowProfileModal,
        setShowShopModal,
        buyShopItem,
        equipShopItem,
        triggerConfetti,
        playTextAudio
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
