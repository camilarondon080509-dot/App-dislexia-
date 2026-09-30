import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../../utils/audio';
import { useApp } from '../../context/AppContext';

interface AudioButtonProps {
  text: string;
  lang?: 'es' | 'en';
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  lang = 'es',
  label = 'Escuchar',
  className = '',
  size = 'md'
}) => {
  const { profile } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakText(text, lang, profile.accessibility.speechRate, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-bold rounded-2xl shadow-sm transition-all transform active:scale-95 cursor-pointer ${
        isPlaying 
          ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-300 animate-pulse' 
          : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300'
      } ${sizeClasses[size]} ${className}`}
      title="Toca para escuchar en voz alta"
      aria-label={`Escuchar: ${text}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
          <span>{label || 'Detener'}</span>
        </>
      ) : (
        <>
          <Volume2 className={size === 'sm' ? 'w-4 h-4 text-amber-700' : 'w-5 h-5 text-amber-700'} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
