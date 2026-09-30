import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { ReadingRuler } from './components/common/ReadingRuler';
import { HomeScreen } from './components/home/HomeScreen';
import { SubjectBrowser } from './components/activities/SubjectBrowser';
import { ActivityPlayer } from './components/activities/ActivityPlayer';
import { BrainGymScreen } from './components/brain/BrainGymScreen';
import { ProgressScreen } from './components/progress/ProgressScreen';
import { ParentPortal } from './components/parent/ParentPortal';
import { WelcomeAuthModal } from './components/auth/WelcomeAuthModal';
import { RewardShopModal } from './components/shop/RewardShopModal';

const AppContent: React.FC = () => {
  const { 
    currentScreen, 
    selectedSubject, 
    activeActivity, 
    closeActivity, 
    setSelectedSubject, 
    setCurrentScreen,
    profile 
  } = useApp();

  const acc = profile.accessibility;

  // Background tint class for dyslexia visual stress reduction
  const bgTintClasses = {
    cream: 'bg-[#FFFBEB]/70',
    mint: 'bg-[#F0FDF4]/70',
    sky: 'bg-[#F0F9FF]/70',
    peach: 'bg-[#FFF7ED]/70',
    white: 'bg-slate-50/60'
  };

  const fontClass = acc.fontFamily === 'fredoka' 
    ? 'font-fredoka' 
    : acc.fontFamily === 'comic' 
    ? 'font-comic' 
    : 'font-lexend';

  const fontSizeClass = acc.fontSize === 'extralarge' 
    ? 'text-lg sm:text-xl' 
    : acc.fontSize === 'large' 
    ? 'text-base sm:text-lg' 
    : 'text-sm sm:text-base';

  const letterSpacingClass = acc.letterSpacing ? 'reading-spaced' : '';

  return (
    <div className={`min-h-screen ${bgTintClasses[acc.backgroundTint] || bgTintClasses.cream} ${fontClass} ${fontSizeClass} ${letterSpacingClass} flex flex-col transition-colors duration-200`}>
      {/* Visual Reading Ruler for Dyslexia */}
      <ReadingRuler />

      {/* Main Global Header */}
      <Header />

      {/* Main App Viewport */}
      <main className="flex-1">
        {activeActivity ? (
          <ActivityPlayer activity={activeActivity} onClose={closeActivity} />
        ) : currentScreen === 'subject' && selectedSubject ? (
          <SubjectBrowser 
            subjectId={selectedSubject} 
            onBack={() => {
              setSelectedSubject(null);
              setCurrentScreen('home');
            }} 
          />
        ) : currentScreen === 'brain' ? (
          <BrainGymScreen />
        ) : currentScreen === 'progress' ? (
          <ProgressScreen />
        ) : currentScreen === 'parent_portal' ? (
          <ParentPortal />
        ) : (
          <HomeScreen />
        )}
      </main>

      {/* Modals */}
      <WelcomeAuthModal />
      <RewardShopModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
