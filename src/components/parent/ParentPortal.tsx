import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  FileText, 
  Printer, 
  Download, 
  Heart, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateAdaptiveProgress } from '../../utils/adaptiveEngine';
import { SUBJECT_INFO } from '../../data/activities';
import { SubjectId } from '../../types';

export const ParentPortal: React.FC = () => {
  const { profile, setCurrentScreen, allProfiles } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Simple parental gate: 7 + 8 = 15
  const num1 = 7;
  const num2 = 8;
  const correctAnswer = num1 + num2;

  const evaluation = evaluateAdaptiveProgress(profile);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(challengeAnswer.trim()) === correctAnswer) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Respuesta incorrecta. Por favor, intenta de nuevo.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `informe_aprendizaje_${profile.name}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-slate-300 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 mx-auto flex items-center justify-center text-slate-700 shadow-xs">
            <Lock className="w-8 h-8 text-slate-700" />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">
              Zona Protegida para Adultos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Panel reservado para padres, madres, tutores y docentes. Resuelve la operación para ingresar:
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-lg font-black text-amber-950">
              ¿Cuánto es {num1} + {num2}?
            </div>

            <input
              type="number"
              required
              value={challengeAnswer}
              onChange={(e) => setChallengeAnswer(e.target.value)}
              placeholder="Escribe el resultado aquí"
              className="w-full text-center px-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:outline-hidden text-lg font-bold"
              autoFocus
            />

            {errorMessage && (
              <p className="text-xs font-bold text-rose-600">
                {errorMessage}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCurrentScreen('home')}
                className="w-1/2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
              >
                Volver
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md cursor-pointer transition-transform active:scale-95"
              >
                Acceder ➔
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 pb-24 print:p-0">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-3 mb-6 print:hidden">
        <button
          type="button"
          onClick={() => setCurrentScreen('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la App</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs shadow-xs cursor-pointer"
            title="Descargar copia de seguridad en JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar Datos</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            title="Imprimir informe para el colegio o terapeuta"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Informe</span>
          </button>
        </div>
      </div>

      {/* Main Report Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-8 print:border-none print:shadow-none">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-black text-2xl">
              📊
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                Informe Pedagógico y de Seguimiento
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Estudiante: {profile.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {profile.grade} • {profile.age} años • Registro generado automáticamente
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <div>Fecha de corte: {new Date().toLocaleDateString('es-CO')}</div>
            <div className="font-semibold text-slate-700">Racha activa: {profile.streakDays} días consecutivos</div>
          </div>
        </div>

        {/* Vision Neuroeducativa Positiva */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
            <span className="font-bold">Enfoque de Neurodiversidad:</span> La dislexia es un estilo de procesamiento del aprendizaje con extraordinarias fortalezas en pensamiento creativo y espacial. Esta aplicación promueve la estimulación multisensorial, la eliminación de la frustración por errores y la autonomía sin comparaciones ni juicios.
          </div>
        </div>

        {/* Métricas Generales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">Tiempo de práctica</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {profile.totalMinutesPracticed} min
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">En sesiones breves</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">Acierto global</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {evaluation.overallAccuracy}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Sin penalizaciones</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">Actividades realizadas</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {evaluation.totalActivitiesCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Misiones superadas</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">Estrellas acumuladas</div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {profile.stars} ⭐
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Refuerzo positivo</div>
          </div>
        </div>

        {/* Desglose por Materia */}
        <div>
          <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Desempeño y Nivel por Materias</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(evaluation.subjectMastery) as SubjectId[]).map((sKey) => {
              const stats = evaluation.subjectMastery[sKey];
              const sInfo = SUBJECT_INFO[sKey] || SUBJECT_INFO.lengua;
              const level = profile.subjectLevels[sKey] || 1;

              return (
                <div key={sKey} className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{sInfo.icon}</span>
                      <span className="font-bold text-sm text-slate-800">{sInfo.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Nivel {level} / 5
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                    <span>{stats.total} actividades registradas</span>
                    <span>{stats.percent}% efectividad</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${sInfo.bgGradient} rounded-full`} 
                      style={{ width: `${Math.max(8, stats.percent)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnóstico Adaptativo: Habilidades dominadas vs Habilidades en proceso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Habilidades Dominadas con Éxito</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-emerald-900">
              {evaluation.masteredSkills.map((sk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{sk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-amber-700" />
              <span>Habilidades en Refuerzo Progresivo</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-amber-900">
              {evaluation.skillsNeedingPractice.map((sk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{sk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recomendaciones Pedagógicas Específicas */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Recomendaciones del Motor Adaptativo para el Acompañante</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {evaluation.pedagogicalAdviceForParents}
          </p>

          <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">1. Tiempo recomendado</span>
              15 a 20 minutos diarios, preferiblemente a la misma hora del día.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">2. Refuerzo auditivo</span>
              Permitir al niño activar el botón de audio todas las veces que lo requiera.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">3. Valorar el intento</span>
              Celebrar el proceso y la perseverancia más que la velocidad de respuesta.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
