import React, { useState } from 'react';
import { Mic, MicOff, Check, AlertCircle } from 'lucide-react';
import { startVoiceRecognition, checkSpeechRecognitionSupport, playSoundEffect } from '../../utils/audio';

interface VoiceInputButtonProps {
  targetWord: string;
  lang?: 'es' | 'en';
  onCorrect: () => void;
  onAttempt: (transcript: string, isCorrect: boolean) => void;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  targetWord,
  lang = 'es',
  onCorrect,
  onAttempt
}) => {
  const [isListening, setIsListening] = useState(false);
  const [lastSpoken, setLastSpoken] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Toca el micrófono y pronuncia la palabra');
  const isSupported = checkSpeechRecognitionSupport();

  const handleStartListening = () => {
    if (isListening) return;

    setIsListening(true);
    setStatusMessage('¡Te escucho! Di la palabra con voz clara...');
    playSoundEffect('pop');

    startVoiceRecognition(
      lang,
      (transcript) => {
        setIsListening(false);
        setLastSpoken(transcript);
        
        // Clean and compare
        const cleanTranscript = transcript.toLowerCase().trim().replace(/[.,!¡?¿]/g, '');
        const cleanTarget = targetWord.toLowerCase().trim().replace(/[.,!¡?¿]/g, '');

        const isMatch = cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript);

        if (isMatch) {
          setStatusMessage(`¡Maravilloso! Dijiste: "${transcript}" 🎉`);
          playSoundEffect('success');
          onCorrect();
          onAttempt(transcript, true);
        } else {
          setStatusMessage(`Escuché: "${transcript}". ¡Estás muy cerca, vuelve a intentarlo!`);
          playSoundEffect('encouragement');
          onAttempt(transcript, false);
        }
      },
      (error) => {
        setIsListening(false);
        setStatusMessage('No pude escuchar bien. ¡Intenta de nuevo o presiona "Ya la pronuncié"!');
      },
      () => {
        setIsListening(false);
      }
    );
  };

  // Fallback simulator for devices without Web Speech Recognition or if mic access is denied
  const handleSimulatePronunciation = () => {
    setStatusMessage(`¡Excelente práctica en voz alta! 🌟`);
    playSoundEffect('success');
    onCorrect();
    onAttempt(targetWord, true);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-amber-50/80 border-2 border-amber-200 w-full max-w-md mx-auto">
      <div className="text-center">
        <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800">
          Práctica de Pronunciación
        </span>
        <div className="text-2xl font-black text-slate-800 mt-1 uppercase tracking-wider">
          "{targetWord}"
        </div>
      </div>

      {/* Big Mic Button */}
      <button
        type="button"
        onClick={handleStartListening}
        disabled={isListening}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all transform active:scale-95 cursor-pointer ${
          isListening 
            ? 'bg-rose-500 animate-ping' 
            : 'bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 ring-4 ring-amber-200'
        }`}
        title="Toca para hablar"
        aria-label="Toca el micrófono y pronuncia la palabra"
      >
        <Mic className="w-10 h-10" />
      </button>

      {/* Status feedback */}
      <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center px-2 min-h-[36px] flex items-center justify-center">
        {statusMessage}
      </p>

      {/* Manual button if microphone is quiet or unsupported */}
      <div className="pt-2 border-t border-amber-200/60 w-full flex justify-center">
        <button
          type="button"
          onClick={handleSimulatePronunciation}
          className="text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-300/80 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
        >
          <Check className="w-4 h-4 text-emerald-700" />
          <span>¡Ya la dije en voz alta!</span>
        </button>
      </div>
    </div>
  );
};
