import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Volume2, 
  Music,
  Eye,
  Check
} from 'lucide-react';
import { Activity, ActivityOption } from '../../types';
import { useApp } from '../../context/AppContext';
import { playSoundEffect, speakText, stopSpeech } from '../../utils/audio';
import { MascotGuide } from '../common/MascotGuide';
import { AudioButton } from '../common/AudioButton';
import { VoiceInputButton } from '../common/VoiceInputButton';

interface ActivityPlayerProps {
  activity: Activity;
  onClose: () => void;
}

export const ActivityPlayer: React.FC<ActivityPlayerProps> = ({ activity, onClose }) => {
  const { completeActivity, profile, triggerConfetti, startActivity } = useApp();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [mascotMessage, setMascotMessage] = useState(activity.instruction);

  // Word builder state
  const [assembledLetters, setAssembledLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string; letter: string }[]>(() => {
    if (activity.scrambledLetters) {
      return activity.scrambledLetters.map((l, i) => ({ id: `${l}_${i}`, letter: l }));
    }
    if (activity.syllables) {
      // Shuffle syllables for challenge
      const shuffled = [...activity.syllables].sort(() => Math.random() - 0.5);
      return shuffled.map((s, i) => ({ id: `${s}_${i}`, letter: s }));
    }
    return [];
  });

  // Auditory memory state
  const [auditorySequence] = useState<number[]>(() => activity.metadata?.sequence || [0, 2, 1]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  // Visual memory state
  const [revealedMemory, setRevealedMemory] = useState<boolean>(true);

  // Mirror letters state (e.g. find all 'b's)
  const [foundLetterIndices, setFoundLetterIndices] = useState<number[]>([]);
  const targetMirrorLetter = activity.metadata?.target || 'b';
  const mirrorGrid: string[] = activity.metadata?.grid || ['b', 'd', 'b', 'p', 'd', 'b', 'q', 'b'];
  const totalTargetLetters = mirrorGrid.filter(l => l === targetMirrorLetter).length;

  // Temporal ordering state
  const [orderedStepIds, setOrderedStepIds] = useState<string[]>([]);

  // Guided reading karaoke word index
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    setMascotMessage(activity.instruction);
    // Initial auditory cue
    if (activity.type === 'auditory_memory') {
      setTimeout(() => playMelodySequence(), 800);
    }
    if (activity.type === 'visual_memory') {
      const timer = setTimeout(() => {
        setRevealedMemory(false);
        setMascotMessage('¡Ahora encuentra dónde estaba la estrella!');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [activity]);

  // Clean speech when unmounting
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const playMelodySequence = () => {
    setIsPlayingMelody(true);
    auditorySequence.forEach((noteIdx, i) => {
      setTimeout(() => {
        playSoundEffect('tone', noteIdx);
        if (i === auditorySequence.length - 1) {
          setIsPlayingMelody(false);
        }
      }, i * 600);
    });
  };

  const handleAuditoryBellClick = (noteIdx: number) => {
    if (isPlayingMelody || feedbackState === 'correct') return;
    playSoundEffect('tone', noteIdx);
    const newSeq = [...playerSequence, noteIdx];
    setPlayerSequence(newSeq);

    const stepIndex = newSeq.length - 1;
    if (newSeq[stepIndex] !== auditorySequence[stepIndex]) {
      // Gentle mismatch
      playSoundEffect('encouragement');
      setMascotMessage('¡Casi! Escucha de nuevo la melodía mágica.');
      setPlayerSequence([]);
      setTimeout(() => playMelodySequence(), 900);
      return;
    }

    if (newSeq.length === auditorySequence.length) {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setFeedbackState('correct');
    playSoundEffect('success');
    triggerConfetti();
    setMascotMessage(activity.correctFeedback);

    completeActivity({
      activityId: activity.id,
      subjectId: activity.subjectId,
      skillCategory: activity.skillCategory,
      correct: true,
      attempts: attempts + 1,
      timeSpentSeconds: elapsed,
      difficulty: activity.difficulty,
      usedHint: showHint
    });
  };

  const handleOptionSelect = (opt: ActivityOption) => {
    if (feedbackState === 'correct') return;
    setSelectedOptionId(opt.id);
    setAttempts(prev => prev + 1);

    if (opt.isCorrect) {
      handleSuccess();
    } else {
      playSoundEffect('encouragement');
      setFeedbackState('incorrect');
      setMascotMessage(activity.encouragingFeedback);
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  // Word builder: tap letter to add
  const handleLetterClick = (item: { id: string; letter: string }) => {
    if (feedbackState === 'correct') return;
    playSoundEffect('pop');
    setAssembledLetters(prev => [...prev, item.letter]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));

    const nextAssembled = [...assembledLetters, item.letter];
    const targetWord = (activity.targetWord || '').toUpperCase();
    const joined = nextAssembled.join('').toUpperCase();

    if (joined === targetWord) {
      handleSuccess();
    } else if (nextAssembled.length >= targetWord.length) {
      // Full length but incorrect
      playSoundEffect('encouragement');
      setFeedbackState('incorrect');
      setMascotMessage('¡Casi! Toca "Reiniciar letras" para volver a intentarlo despacito.');
    }
  };

  const handleResetLetters = () => {
    playSoundEffect('pop');
    setAssembledLetters([]);
    setFeedbackState('idle');
    if (activity.scrambledLetters) {
      setAvailableLetters(activity.scrambledLetters.map((l, i) => ({ id: `${l}_${i}`, letter: l })));
    } else if (activity.syllables) {
      const shuffled = [...activity.syllables].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled.map((s, i) => ({ id: `${s}_${i}`, letter: s })));
    }
  };

  // Mirror letter hunt
  const handleMirrorLetterClick = (index: number, letter: string) => {
    if (feedbackState === 'correct') return;
    if (foundLetterIndices.includes(index)) return;

    if (letter === targetMirrorLetter) {
      playSoundEffect('pop');
      const updated = [...foundLetterIndices, index];
      setFoundLetterIndices(updated);

      if (updated.length >= totalTargetLetters) {
        handleSuccess();
      } else {
        setMascotMessage(`¡Excelente! Encontraste una letra "${targetMirrorLetter}". Te faltan ${totalTargetLetters - updated.length}.`);
      }
    } else {
      playSoundEffect('encouragement');
      setMascotMessage(`Esa letra es una "${letter}". Fíjate bien hacia dónde mira la pancita de la "${targetMirrorLetter}".`);
    }
  };

  // Temporal ordering
  const handleAddTemporalStep = (stepId: string) => {
    if (orderedStepIds.includes(stepId) || feedbackState === 'correct') return;
    playSoundEffect('pop');
    const updated = [...orderedStepIds, stepId];
    setOrderedStepIds(updated);

    const steps = activity.metadata?.steps || [];
    if (updated.length === steps.length) {
      // Check order
      const isCorrectOrder = updated.every((id, idx) => id === steps[idx].id);
      if (isCorrectOrder) {
        handleSuccess();
      } else {
        playSoundEffect('encouragement');
        setMascotMessage('¡Revisa el orden! ¿Qué ocurre primero antes de que la planta florezca?');
        setOrderedStepIds([]);
      }
    }
  };

  // Guided reading karaoke
  const handleStartGuidedReading = () => {
    if (!activity.storyContext) return;
    setIsReadingAloud(true);
    const words = activity.storyContext.split(' ');
    
    // We will highlight words progressively
    let wordIdx = 0;
    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        setHighlightedWordIndex(wordIdx);
        wordIdx++;
      } else {
        clearInterval(interval);
        setIsReadingAloud(false);
        handleSuccess();
      }
    }, 650);

    speakText(activity.storyContext, 'es', profile.accessibility.speechRate, () => {
      clearInterval(interval);
      setIsReadingAloud(false);
      handleSuccess();
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-24">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            Nivel {activity.difficulty} • {activity.skillCategory}
          </span>
        </div>
      </div>

      {/* Mascot Guide Bubble */}
      <div className="mb-6">
        <MascotGuide
          message={mascotMessage}
          audioPrompt={activity.instructionAudio || activity.instruction}
          hint={activity.hint}
          onHintClick={() => setShowHint(prev => !prev)}
          status={feedbackState === 'correct' ? 'celebrating' : feedbackState === 'incorrect' ? 'encouraging' : 'neutral'}
        />
      </div>

      {/* Hint Alert if shown */}
      {showHint && (
        <div className="mb-6 p-4 rounded-3xl bg-sky-50 border-2 border-sky-200 text-sky-900 text-sm font-medium flex items-start gap-3 animate-in fade-in">
          <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Pista especial de Lumi:</span> {activity.hint}
          </div>
        </div>
      )}

      {/* Activity Card Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-amber-200/90 shadow-xl relative overflow-hidden">
        {/* Title & Visual Cue */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {activity.title}
          </h2>

          {activity.visualCue && (
            <div className="text-5xl sm:text-6xl my-4 animate-gentle select-none">
              {activity.visualCue}
            </div>
          )}

          <div className="flex justify-center mt-2">
            <AudioButton
              text={activity.instructionAudio || activity.instruction}
              lang={activity.subjectId === 'ingles' ? 'en' : 'es'}
              label="Escuchar pregunta"
              size="md"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* SPECIFIC ACTIVITY RENDERERS */}
        {/* ============================================================== */}

        {/* 1. Multiple choice options (phonics, math, science, social, english) */}
        {activity.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto mt-6">
            {activity.options.map(opt => {
              const isSelected = selectedOptionId === opt.id;
              const isWin = feedbackState === 'correct' && isSelected;
              const isWrong = feedbackState === 'incorrect' && isSelected;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionSelect(opt)}
                  className={`p-4 sm:p-5 rounded-3xl border-3 text-left font-black text-base sm:text-lg transition-all transform active:scale-95 flex items-center justify-between cursor-pointer ${
                    isWin
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-md ring-4 ring-emerald-300'
                      : isWrong
                      ? 'border-amber-400 bg-amber-50 text-amber-950 ring-2 ring-amber-200'
                      : 'border-slate-200 hover:border-amber-300 bg-slate-50/70 hover:bg-amber-50/40 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.text.split(' ')[0]}</span>
                    <span>{opt.text.substring(opt.text.indexOf(' ') + 1) || opt.text}</span>
                  </div>

                  <AudioButton
                    text={opt.text}
                    lang={activity.subjectId === 'ingles' ? 'en' : 'es'}
                    label=""
                    size="sm"
                    className="shrink-0"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Word Builder (SOL, LUNA, etc.) */}
        {(activity.type === 'word_builder') && (
          <div className="max-w-md mx-auto my-6 space-y-6">
            {/* Target Word slots */}
            <div className="flex justify-center gap-3">
              {(activity.targetWord || 'SOL').split('').map((_, idx) => {
                const filledLetter = assembledLetters[idx];
                return (
                  <div
                    key={idx}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-3 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-inner transition-all ${
                      filledLetter 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 scale-105 shadow-md' 
                        : 'border-dashed border-slate-300 bg-slate-50 text-slate-300'
                    }`}
                  >
                    {filledLetter || '?'}
                  </div>
                );
              })}
            </div>

            {/* Available scrambled letters */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {availableLetters.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLetterClick(item)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-2xl shadow-md border-2 border-amber-500 flex items-center justify-center transform active:scale-90 transition-transform cursor-pointer"
                >
                  {item.letter}
                </button>
              ))}
            </div>

            {/* Reset button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleResetLetters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar letras</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Voice Pronunciation */}
        {activity.type === 'voice_pronunciation' && activity.targetWord && (
          <div className="my-6">
            <VoiceInputButton
              targetWord={activity.targetWord}
              lang={activity.subjectId === 'ingles' ? 'en' : 'es'}
              onCorrect={handleSuccess}
              onAttempt={(transcript, isCorrect) => {
                setAttempts(prev => prev + 1);
              }}
            />
          </div>
        )}

        {/* 4. Auditory Memory (Musical bells sequence) */}
        {activity.type === 'auditory_memory' && (
          <div className="my-6 text-center space-y-6">
            <div className="flex justify-center gap-4">
              {[
                { idx: 0, color: 'bg-rose-500 ring-rose-300', label: 'Do 🔔' },
                { idx: 1, color: 'bg-amber-500 ring-amber-300', label: 'Mi 🔔' },
                { idx: 2, color: 'bg-sky-500 ring-sky-300', label: 'Sol 🔔' }
              ].map(bell => (
                <button
                  key={bell.idx}
                  type="button"
                  onClick={() => handleAuditoryBellClick(bell.idx)}
                  disabled={isPlayingMelody}
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-3xl ${bell.color} text-white font-black text-lg shadow-lg flex flex-col items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer ring-4 ring-offset-2`}
                >
                  <Music className="w-7 h-7" />
                  <span>{bell.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={playMelodySequence}
              disabled={isPlayingMelody}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs sm:text-sm cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-indigo-700" />
              <span>Volver a escuchar la melodía</span>
            </button>
          </div>
        )}

        {/* 5. Mirror Letters Hunt (find all 'b's among d and p) */}
        {activity.type === 'mirror_letters' && (
          <div className="my-6 max-w-md mx-auto space-y-4">
            <div className="text-center font-bold text-sm text-slate-600">
              Encontradas: {foundLetterIndices.length} de {totalTargetLetters}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {mirrorGrid.map((letter, idx) => {
                const isFound = foundLetterIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleMirrorLetterClick(idx, letter)}
                    className={`h-16 rounded-2xl font-black text-3xl flex items-center justify-center border-3 transition-all cursor-pointer ${
                      isFound
                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-95'
                        : 'bg-amber-50 border-amber-300 text-slate-800 hover:bg-amber-100 active:scale-95 shadow-xs'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Visual Memory */}
        {activity.type === 'visual_memory' && (
          <div className="my-6 max-w-sm mx-auto">
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 0, hasStar: false, emoji: '🌸' },
                { id: 1, hasStar: true, emoji: '⭐' },
                { id: 2, hasStar: false, emoji: '🎈' }
              ].map(card => {
                const showContent = revealedMemory || feedbackState === 'correct';
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      if (card.hasStar) {
                        handleSuccess();
                      } else {
                        playSoundEffect('encouragement');
                        setMascotMessage('¡Casi! La estrella estaba en el centro.');
                      }
                    }}
                    className={`h-28 rounded-3xl border-3 flex items-center justify-center text-4xl shadow-md transition-all cursor-pointer ${
                      showContent
                        ? 'bg-amber-50 border-amber-400 scale-100'
                        : 'bg-indigo-600 border-indigo-700 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {showContent ? card.emoji : '❓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. Temporal Ordering */}
        {activity.type === 'temporal_ordering' && activity.metadata?.steps && (
          <div className="my-6 max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              {(activity.metadata.steps as { id: string; label: string }[]).map(step => {
                const isSelected = orderedStepIds.includes(step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleAddTemporalStep(step.id)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 opacity-80'
                        : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800 shadow-xs'
                    }`}
                  >
                    <span>{step.label}</span>
                    {isSelected && <Check className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. Guided Reading (Karaoke read aloud) */}
        {activity.type === 'guided_reading' && activity.storyContext && (
          <div className="my-6 max-w-xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-200 text-lg sm:text-xl font-medium leading-loose text-slate-800">
              {activity.storyContext.split(' ').map((word, wIdx) => {
                const isCurrent = highlightedWordIndex === wIdx;
                return (
                  <span
                    key={wIdx}
                    className={`inline-block mx-1 px-1.5 py-0.5 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-amber-950 font-black scale-110 shadow-xs ring-2 ring-amber-300'
                        : ''
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleStartGuidedReading}
                disabled={isReadingAloud}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-base shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Volume2 className="w-5 h-5" />
                <span>{isReadingAloud ? 'Leyendo en voz alta...' : 'Iniciar Lectura Guiada con Audio'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Success Modal / Action Footer */}
        {feedbackState === 'correct' && (
          <div className="mt-8 pt-6 border-t-2 border-emerald-200 bg-emerald-50/80 rounded-2xl p-6 text-center space-y-4 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-black text-xl">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <span>¡Desafío Completado con Éxito!</span>
            </div>

            <div className="flex justify-center items-center gap-6">
              <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-lg">
                <Star className="w-6 h-6 text-amber-500 fill-amber-400 animate-gentle" />
                <span>+3 Estrellas</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-lg">
                <span className="text-xl">🪙</span>
                <span>+5 Lumis</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-black text-sm shadow-xs cursor-pointer"
              >
                Volver a las Materias
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>¡Siguiente Desafío!</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
