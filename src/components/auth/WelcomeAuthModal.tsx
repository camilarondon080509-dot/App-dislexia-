import React, { useState } from 'react';
import { X, UserPlus, Check, Sparkles, Heart, BookOpen, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AVATAR_OPTIONS } from '../../data/avatars';
import { SUBJECT_INFO } from '../../data/activities';
import { SubjectId } from '../../types';
import { playSoundEffect } from '../../utils/audio';

export const WelcomeAuthModal: React.FC = () => {
  const { 
    showProfileModal, 
    setShowProfileModal, 
    allProfiles, 
    profile, 
    switchProfile, 
    createProfile,
    deleteProfile 
  } = useApp();

  const [mode, setMode] = useState<'select' | 'create'>('select');

  // Form state for creating a new profile
  const [name, setName] = useState('');
  const [age, setAge] = useState(8);
  const [grade, setGrade] = useState('2° Primaria');
  const [avatarId, setAvatarId] = useState('lumi');
  const [favoriteSubjects, setFavoriteSubjects] = useState<SubjectId[]>([
    'lengua', 'matematicas', 'ciencias_naturales', 'ciencias_sociales', 'ingles', 'cerebro'
  ]);
  const [introStep, setIntroStep] = useState(false);

  if (!showProfileModal) return null;

  const handleToggleSubject = (sId: SubjectId) => {
    if (favoriteSubjects.includes(sId)) {
      if (favoriteSubjects.length > 1) {
        setFavoriteSubjects(favoriteSubjects.filter(id => id !== sId));
      }
    } else {
      setFavoriteSubjects([...favoriteSubjects, sId]);
    }
  };

  const handleSelectAllSubjects = () => {
    setFavoriteSubjects(['lengua', 'matematicas', 'ciencias_naturales', 'ciencias_sociales', 'ingles', 'cerebro']);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createProfile({
      name: name.trim(),
      age: Number(age),
      grade,
      avatarId,
      favoriteSubjects
    });

    setIntroStep(true);
  };

  const gradesList = [
    'Preescolar (4-5 años)',
    '1° Primaria (6-7 años)',
    '2° Primaria (7-8 años)',
    '3° Primaria (8-9 años)',
    '4° Primaria (9-10 años)',
    '5° Primaria (10-11 años)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-300 my-auto max-h-[92vh] overflow-y-auto">
        {/* Intro celebration step after creation */}
        {introStep ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-5xl shadow-lg animate-bounce">
              🐲
            </div>

            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ¡Bienvenido a LumiAprende!
            </div>

            <h3 className="text-2xl font-black text-slate-800">
              ¡Hola, {name}! 🎉
            </h3>

            <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              En este mundo mágico no hay respuestas malas ni prisas. Aprenderemos juntos con juegos, sonidos, pistas de audio y muchas estrellas por descubrir. ¡Tu cerebro tiene un poder único y maravilloso!
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold flex items-center gap-3 text-left">
              <span className="text-2xl">⭐</span>
              <span>¡Te regalamos tus primeras 10 estrellas y 20 lumis para comenzar tu gran aventura!</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIntroStep(false);
                setShowProfileModal(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-lg shadow-md cursor-pointer transition-transform active:scale-95"
            >
              ¡Comenzar a Jugar! 🚀
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                  {mode === 'select' ? '👋' : '✨'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {mode === 'select' ? 'Perfiles de Aprendizaje' : 'Crear Perfil del Niño'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {mode === 'select' ? 'Elige con quién jugar hoy' : 'Personaliza la experiencia para tu ritmo'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode: Select Profile */}
            {mode === 'select' && (
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allProfiles.map((p) => {
                    const avatar = AVATAR_OPTIONS.find(a => a.id === p.avatarId) || AVATAR_OPTIONS[0];
                    const isCurrent = p.id === profile.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          switchProfile(p.id);
                          setShowProfileModal(false);
                        }}
                        className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                          isCurrent
                            ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-300'
                            : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${avatar.bgColor} flex items-center justify-center text-2xl shadow-xs shrink-0`}>
                          {avatar.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 truncate">{p.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.5 rounded">
                                Activo
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{p.grade} • {p.age} años</div>
                          <div className="text-xs text-amber-700 font-semibold mt-1">
                            ⭐ {p.stars} estrellas
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('create');
                      playSoundEffect('pop');
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-base shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Crear un nuevo perfil de niño</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode: Create Profile */}
            {mode === 'create' && (
              <form onSubmit={handleCreateSubmit} className="mt-5 space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">
                    ¿Cómo te llamas?
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofía, Lucas, Valentina..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden text-base font-semibold"
                  />
                </div>

                {/* Edad y Grado */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                      Edad
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden text-sm font-semibold bg-white"
                    >
                      {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <option key={num} value={num}>{num} años</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                      Grado escolar
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden text-sm font-semibold bg-white"
                    >
                      {gradesList.map(g => (
                        <option key={g} value={g.split(' ')[0] + ' ' + g.split(' ')[1]}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Elegir Avatar */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Elige a tu compañero de aventuras:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {AVATAR_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAvatarId(opt.id)}
                        className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          avatarId === opt.id
                            ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${opt.bgColor} flex items-center justify-center text-2xl shadow-xs`}>
                          {opt.emoji}
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materias a practicar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-slate-800">
                      ¿Qué te gustaría practicar?
                    </label>
                    <button
                      type="button"
                      onClick={handleSelectAllSubjects}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Seleccionar todas
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(Object.keys(SUBJECT_INFO) as SubjectId[]).map(sKey => {
                      const sInfo = SUBJECT_INFO[sKey];
                      const isSelected = favoriteSubjects.includes(sKey);
                      return (
                        <button
                          key={sKey}
                          type="button"
                          onClick={() => handleToggleSubject(sKey)}
                          className={`p-2.5 rounded-2xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold'
                              : 'border-slate-200 text-slate-600 opacity-60'
                          }`}
                        >
                          <span className="text-lg">{sInfo.icon}</span>
                          <span className="text-xs truncate">{sInfo.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('select')}
                    className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Volver
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-amber-950 font-black text-base shadow-md cursor-pointer transition-transform active:scale-95"
                  >
                    ¡Listo, Crear Perfil! ✨
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
