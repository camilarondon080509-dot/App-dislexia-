import React from 'react';
import { ArrowLeft, Play, CheckCircle2, Star, Sparkles, Volume2 } from 'lucide-react';
import { SubjectId, Activity } from '../../types';
import { useApp } from '../../context/AppContext';
import { ACTIVITIES_DATA, SUBJECT_INFO } from '../../data/activities';
import { AudioButton } from '../common/AudioButton';
import { MascotGuide } from '../common/MascotGuide';

interface SubjectBrowserProps {
  subjectId: SubjectId;
  onBack: () => void;
}

export const SubjectBrowser: React.FC<SubjectBrowserProps> = ({ subjectId, onBack }) => {
  const { startActivity, profile } = useApp();
  const info = SUBJECT_INFO[subjectId] || SUBJECT_INFO.lengua;

  // Filter activities for this subject
  const activities = ACTIVITIES_DATA.filter(a => a.subjectId === subjectId);
  const completedIds = new Set((profile.resultsHistory || []).map(r => r.activityId));

  const currentLevel = profile.subjectLevels[subjectId] || 1;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 pb-24">
      {/* Top back button */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black bg-white px-3.5 py-1.5 rounded-full border-2 border-amber-300 text-amber-900 shadow-xs flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            Nivel Actual: {currentLevel}
          </span>
        </div>
      </div>

      {/* Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${info.bgGradient} text-white shadow-lg mb-6 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0">
            {info.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black">{info.name}</h1>
            <p className="text-sm sm:text-base text-white/90 mt-1 max-w-xl font-medium">
              {info.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              <AudioButton
                text={`Bienvenido a ${info.name}. Aquí tienes juegos divertidos para aprender jugando a tu propio ritmo.`}
                label="Escuchar bienvenida"
                size="sm"
                className="bg-white/90 hover:bg-white text-slate-900 border-none shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mascot cheer */}
      <div className="mb-6">
        <MascotGuide
          message={`¡Vamos a divertirnos en ${info.name}! Elige cualquiera de las misiones que te llame la atención.`}
          compact
        />
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activities.map((act) => {
          const isDone = completedIds.has(act.id);

          return (
            <div
              key={act.id}
              onClick={() => startActivity(act)}
              className={`p-5 rounded-3xl border-3 flex flex-col justify-between transition-all transform hover:-translate-y-1 cursor-pointer ${
                isDone
                  ? 'border-emerald-300 bg-emerald-50/50 shadow-xs'
                  : 'border-amber-200 bg-white hover:border-amber-400 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {act.skillCategory}
                  </span>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ¡Completado!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      ⭐ 3 Estrellas
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 my-2">
                  {act.visualCue && (
                    <span className="text-3xl shrink-0 select-none">
                      {act.visualCue.split(' ')[0]}
                    </span>
                  )}
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

              {/* Bottom Play action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">
                  Dificultad: {act.difficulty === 1 ? 'Suave' : act.difficulty === 2 ? 'Medio' : 'Reto'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startActivity(act);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-950" />
                  <span>{isDone ? 'Jugar de nuevo' : 'Jugar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
