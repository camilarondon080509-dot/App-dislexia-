import React from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Flame, 
  Star, 
  Clock, 
  Target, 
  Award, 
  Sparkles,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateAdaptiveProgress } from '../../utils/adaptiveEngine';
import { SUBJECT_INFO } from '../../data/activities';
import { SubjectId } from '../../types';
import { INITIAL_ACHIEVEMENTS } from '../../data/achievements';
import { MascotGuide } from '../common/MascotGuide';

export const ProgressScreen: React.FC = () => {
  const { profile, setCurrentScreen } = useApp();
  const evaluation = evaluateAdaptiveProgress(profile);

  const completedActivitiesCount = profile.resultsHistory?.length || 0;
  const completedGoalsCount = profile.goals?.filter(g => g.completed).length || 0;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 pb-24">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={() => setCurrentScreen('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('parent_portal')}
          className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3.5 py-1.5 rounded-full cursor-pointer transition-all"
        >
          Ver informe detallado para adultos ➔
        </button>
      </div>

      {/* Hero Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-amber-950 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-white/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
              🏆
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-900/80">
                Tu Gran Aventura
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                ¡El Progreso de {profile.name}!
              </h1>
              <p className="text-sm font-semibold text-amber-950/80 mt-1">
                Mira todo lo que has descubierto y conquistado con tu esfuerzo.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-white/80 rounded-2xl px-4 py-2.5 text-center shadow-xs">
              <div className="text-xl font-black text-amber-900">{profile.stars}</div>
              <div className="text-[10px] uppercase font-bold text-slate-600">Estrellas</div>
            </div>
            <div className="bg-white/80 rounded-2xl px-4 py-2.5 text-center shadow-xs">
              <div className="text-xl font-black text-orange-800">{profile.streakDays}</div>
              <div className="text-[10px] uppercase font-bold text-slate-600">Días Racha</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot cheer */}
      <div className="mb-6">
        <MascotGuide
          message={evaluation.encouragingMessage}
          compact
        />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {completedActivitiesCount}
            </div>
            <div className="text-xs font-bold text-slate-500">Juegos logrados</div>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-emerald-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {evaluation.overallAccuracy}%
            </div>
            <div className="text-xs font-bold text-slate-500">Aciertos felices</div>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-sky-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {profile.totalMinutesPracticed} min
            </div>
            <div className="text-xs font-bold text-slate-500">Tiempo de juego</div>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-fuchsia-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 flex items-center justify-center text-fuchsia-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {profile.unlockedAchievements?.length || 0}
            </div>
            <div className="text-xs font-bold text-slate-500">Insignias ganadas</div>
          </div>
        </div>
      </div>

      {/* Progreso por Materia */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span>Tu Avance en Cada Materia</span>
        </h2>

        <div className="space-y-4">
          {(Object.keys(evaluation.subjectMastery) as SubjectId[]).map((subId) => {
            const stats = evaluation.subjectMastery[subId];
            const sInfo = SUBJECT_INFO[subId] || SUBJECT_INFO.lengua;
            const currentLevel = profile.subjectLevels[subId] || 1;

            return (
              <div key={subId} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sInfo.icon}</span>
                    <span className="font-extrabold text-sm sm:text-base text-slate-800">
                      {sInfo.name}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    Nivel {currentLevel} • {stats.total} {stats.total === 1 ? 'actividad' : 'actividades'}
                  </div>
                </div>

                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${sInfo.bgGradient} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max(12, stats.percent)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habilidades Fortalecidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Superpoderes Desarrollados</span>
          </h3>
          <div className="space-y-2">
            {evaluation.masteredSkills.map((sk, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{sk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-amber-600" />
            <span>Próximas Misiones a Fortalecer</span>
          </h3>
          <div className="space-y-2">
            {evaluation.skillsNeedingPractice.map((sk, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-950 text-xs sm:text-sm font-bold">
                <Target className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{sk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logros Desbloqueados */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Tus Trofeos e Insignias</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {INITIAL_ACHIEVEMENTS.map(ach => {
            const isUnlocked = (profile.unlockedAchievements || []).includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                  isUnlocked
                    ? 'border-amber-300 bg-amber-50/70 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl my-1">{ach.icon}</div>
                <div className="font-bold text-xs text-slate-800 line-clamp-1">{ach.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{ach.description}</div>
                {isUnlocked && (
                  <span className="mt-2 text-[9px] font-black text-amber-800 uppercase bg-amber-200/80 px-2 py-0.5 rounded-full">
                    ¡Conseguido!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
