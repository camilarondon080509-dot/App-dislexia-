import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Brain, 
  Trophy, 
  Target, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Star,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECT_INFO } from '../../data/activities';
import { SubjectId } from '../../types';
import { evaluateAdaptiveProgress } from '../../utils/adaptiveEngine';
import { MascotGuide } from '../common/MascotGuide';
import { AudioButton } from '../common/AudioButton';
import { AVATAR_OPTIONS } from '../../data/avatars';

export const HomeScreen: React.FC = () => {
  const { 
    profile, 
    setCurrentScreen, 
    setSelectedSubject, 
    startActivity,
    setShowProfileModal,
    setShowShopModal
  } = useApp();

  const evaluation = evaluateAdaptiveProgress(profile);
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  const handleSelectSubject = (sId: SubjectId) => {
    setSelectedSubject(sId);
    setCurrentScreen('subject');
  };

  const subjectKeys: SubjectId[] = [
    'lengua',
    'matematicas',
    'ciencias_naturales',
    'ciencias_sociales',
    'ingles'
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 space-y-8">
      {/* Welcome Hero Greeting */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-amber-950 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr ${currentAvatar.bgColor} flex items-center justify-center text-4xl sm:text-5xl shadow-md border-3 border-white shrink-0`}>
              {currentAvatar.emoji}
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-900/80">
                ¡Bienvenido a tu aventura de hoy!
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                ¡Hola, {profile.name}! 🌟
              </h1>
              <p className="text-sm sm:text-base font-semibold text-amber-950/80 mt-1">
                ¿Qué misterio quieres aprender y explorar hoy?
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <AudioButton
              text={`¡Hola ${profile.name}! ¿Qué te gustaría aprender hoy? Elige una de las materias o entrena tu cerebro.`}
              label="Escuchar saludo"
              size="md"
              className="bg-white/95 text-slate-900 hover:bg-white border-none shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Mascot Companion Message */}
      <div>
        <MascotGuide
          message={evaluation.encouragingMessage}
          compact
        />
      </div>

      {/* Adaptive Recommendation Card */}
      {evaluation.recommendedActivity && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-3 border-indigo-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              💡
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                Recomendado para ti hoy (Motor Adaptativo)
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {evaluation.recommendedActivity.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 line-clamp-1">
                {evaluation.recommendedActivity.instruction}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => startActivity(evaluation.recommendedActivity)}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Jugar Recomendación</span>
          </button>
        </div>
      )}

      {/* 5 Big Subject Buttons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Nuestras 5 Grandes Materias
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Toca la materia que más te guste para jugar sus misiones
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectKeys.map((sKey) => {
            const sInfo = SUBJECT_INFO[sKey];
            const currentLevel = profile.subjectLevels[sKey] || 1;

            return (
              <button
                key={sKey}
                type="button"
                onClick={() => handleSelectSubject(sKey)}
                className={`p-6 rounded-3xl bg-gradient-to-br ${sInfo.bgGradient} text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1.5 active:scale-95 text-left flex flex-col justify-between min-h-[170px] cursor-pointer group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                      {sInfo.icon}
                    </div>
                    <span className="text-xs font-black bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      Nivel {currentLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight">{sInfo.name}</h3>
                  <p className="text-xs text-white/90 font-medium mt-1 line-clamp-2">
                    {sInfo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
                  <span>Explorar juegos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}

          {/* 6. Special Card: Entrena tu Cerebro (Neuro-entrenamiento) */}
          <button
            type="button"
            onClick={() => setCurrentScreen('brain')}
            className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-600 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1.5 active:scale-95 text-left flex flex-col justify-between min-h-[170px] cursor-pointer group ring-4 ring-purple-200"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <span className="text-xs font-black bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full shadow-xs">
                  ¡Especial!
                </span>
              </div>

              <h3 className="text-xl font-black tracking-tight">Entrena tu Cerebro</h3>
              <p className="text-xs text-white/90 font-medium mt-1 line-clamp-2">
                Memoria auditiva, letras espejo b/d, búsqueda visual y atención.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
              <span>Gimnasio Cognitivo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Metas del Día / Daily Goals */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Tus Metas del Día
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            +5 Estrellas por cada meta
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {profile.goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.currentCount / goal.targetCount) * 100));

            return (
              <div 
                key={goal.id} 
                className={`p-4 rounded-2xl border-2 transition-all ${
                  goal.completed 
                    ? 'border-emerald-300 bg-emerald-50/60' 
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-extrabold text-sm text-slate-900 line-clamp-1">
                    {goal.title}
                  </span>
                  {goal.completed && (
                    <span className="text-emerald-600 font-bold text-xs shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      ¡Listo!
                    </span>
                  )}
                </div>

                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden my-2">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>{goal.currentCount} de {goal.targetCount} completados</span>
                  <span className="font-bold text-amber-700">⭐ {goal.rewardStars}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Shortcuts: Mi Progreso, Mis Logros, Mi Perfil, Tienda */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          type="button"
          onClick={() => setCurrentScreen('progress')}
          className="p-4 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
            📈
          </div>
          <span className="font-extrabold text-sm text-slate-900">Mi Progreso</span>
          <span className="text-[11px] text-slate-500">Mira tus avances</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('progress')}
          className="p-4 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-800 flex items-center justify-center text-2xl">
            🏅
          </div>
          <span className="font-extrabold text-sm text-slate-900">Mis Trofeos</span>
          <span className="text-[11px] text-slate-500">Insignias ganadas</span>
        </button>

        <button
          type="button"
          onClick={() => setShowShopModal(true)}
          className="p-4 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl">
            🛍️
          </div>
          <span className="font-extrabold text-sm text-slate-900">Mi Mascota</span>
          <span className="text-[11px] text-slate-500">Tienda y accesorios</span>
        </button>

        <button
          type="button"
          onClick={() => setShowProfileModal(true)}
          className="p-4 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl">
            🧒
          </div>
          <span className="font-extrabold text-sm text-slate-900">Mi Perfil</span>
          <span className="text-[11px] text-slate-500">Cambiar de avatar</span>
        </button>
      </div>
    </div>
  );
};
