import React from 'react';
import { ArrowLeft, Brain, Sparkles, Play, Star, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACTIVITIES_DATA } from '../../data/activities';
import { MascotGuide } from '../common/MascotGuide';
import { AudioButton } from '../common/AudioButton';

export const BrainGymScreen: React.FC = () => {
  const { setCurrentScreen, startActivity, profile } = useApp();

  const brainActivities = ACTIVITIES_DATA.filter(a => a.subjectId === 'cerebro');
  const completedIds = new Set((profile.resultsHistory || []).map(r => r.activityId));

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 pb-24">
      {/* Top action */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={() => setCurrentScreen('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <span className="text-xs sm:text-sm font-extrabold bg-purple-100 text-purple-900 border border-purple-300 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
          <Brain className="w-4 h-4 text-purple-700" />
          Gimnasio Cognitivo
        </span>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0">
            🧠
          </div>
          <div>
            <div className="inline-block bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Neuro-Entrenamiento Adaptativo
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Entrena tu Cerebro</h1>
            <p className="text-sm sm:text-base text-white/90 mt-1 max-w-xl font-medium">
              Ejercicios multisensoriales para fortalecer la memoria auditiva, la visión espacial, la discriminación de letras espejo (b y d) y el orden temporal.
            </p>

            <div className="mt-4">
              <AudioButton
                text="Bienvenidos al gimnasio cerebral. Aquí jugamos con sonidos, memoria visual y letras espejo para hacer más fuerte a tu mente."
                label="Escuchar presentación"
                size="sm"
                className="bg-white/90 hover:bg-white text-slate-900 border-none shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Cheer */}
      <div className="mb-6">
        <MascotGuide
          message="¡Tu cerebro es un músculo increíble que se vuelve más fuerte y ágil cada vez que jugamos aquí!"
          compact
        />
      </div>

      {/* Neuro Activities Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {brainActivities.map((act) => {
          const isDone = completedIds.has(act.id);

          return (
            <div
              key={act.id}
              onClick={() => startActivity(act)}
              className={`p-5 rounded-3xl border-3 flex flex-col justify-between transition-all transform hover:-translate-y-1 cursor-pointer ${
                isDone
                  ? 'border-purple-300 bg-purple-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-purple-400 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {act.skillCategory}
                  </span>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ¡Superado!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      ⭐ 3 Estrellas
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 my-2">
                  <span className="text-4xl shrink-0 select-none">
                    {act.visualCue?.split(' ')[0] || '🧠'}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {act.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 line-clamp-2">
                      {act.instruction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-purple-700 font-bold">
                  {act.type === 'auditory_memory' ? '🎵 Memoria Auditiva' :
                   act.type === 'mirror_letters' ? '🔍 Discriminación Visual' :
                   act.type === 'visual_memory' ? '🃏 Memoria Visual' : '⏳ Secuencia'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startActivity(act);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isDone ? 'Repetir reto' : 'Comenzar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
