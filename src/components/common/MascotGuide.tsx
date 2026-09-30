import React from 'react';
import { Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AVATAR_OPTIONS, MASCOT_SHOP_ITEMS } from '../../data/avatars';
import { speakText } from '../../utils/audio';

interface MascotGuideProps {
  message: string;
  audioPrompt?: string;
  hint?: string;
  onHintClick?: () => void;
  status?: 'neutral' | 'celebrating' | 'thinking' | 'encouraging';
  compact?: boolean;
}

export const MascotGuide: React.FC<MascotGuideProps> = ({
  message,
  audioPrompt,
  hint,
  onHintClick,
  status = 'neutral',
  compact = false
}) => {
  const { profile } = useApp();
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  // Check equipped items
  const equippedHat = MASCOT_SHOP_ITEMS.find(i => i.id === profile.equippedMascotItems?.hat);
  const equippedGlasses = MASCOT_SHOP_ITEMS.find(i => i.id === profile.equippedMascotItems?.glasses);
  const equippedCape = MASCOT_SHOP_ITEMS.find(i => i.id === profile.equippedMascotItems?.cape);
  const equippedBadge = MASCOT_SHOP_ITEMS.find(i => i.id === profile.equippedMascotItems?.badge);

  const handleSpeak = () => {
    const textToSpeak = audioPrompt || message;
    speakText(textToSpeak, 'es', profile.accessibility.speechRate);
  };

  return (
    <div className={`flex items-start gap-3 sm:gap-4 p-4 rounded-3xl bg-white border-2 border-amber-200/90 shadow-sm transition-all ${
      status === 'celebrating' ? 'ring-4 ring-emerald-300 bg-emerald-50/50' : ''
    } ${compact ? 'py-3' : 'py-4'}`}>
      {/* Mascot Avatar Figure */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Equipped Hat */}
        {equippedHat && (
          <div className="absolute -top-3 z-10 text-xl transform -rotate-12 animate-bounce">
            {equippedHat.icon}
          </div>
        )}

        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr ${currentAvatar.bgColor} flex items-center justify-center text-3xl sm:text-4xl shadow-md border-2 border-white relative overflow-visible ${
          status === 'celebrating' ? 'animate-bounce' : 'animate-gentle'
        }`}>
          {currentAvatar.emoji}

          {/* Equipped Glasses */}
          {equippedGlasses && (
            <div className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none">
              {equippedGlasses.icon}
            </div>
          )}

          {/* Equipped Badge */}
          {equippedBadge && (
            <div className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full p-0.5 shadow-xs">
              {equippedBadge.icon}
            </div>
          )}
        </div>

        {/* Mascot Name Pill */}
        <span className="mt-1 text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full shadow-2xs">
          {currentAvatar.name}
        </span>
      </div>

      {/* Mascot Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Tu Guía de Aprendizaje
          </span>

          <div className="flex items-center gap-1.5">
            {hint && (
              <button
                type="button"
                onClick={onHintClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Ver pista o ayuda"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>Pista</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSpeak}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Escuchar lo que dice Lumi"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Escuchar</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          {message}
        </p>

        {equippedCape && (
          <div className="mt-1 text-[11px] text-indigo-600 font-bold flex items-center gap-1">
            <span>{equippedCape.icon} ¡Capa equipada para super-aprendices!</span>
          </div>
        )}
      </div>
    </div>
  );
};
