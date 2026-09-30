import React from 'react';
import { Flame, Star, Coins, ShoppingBag, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AVATAR_OPTIONS } from '../../data/avatars';
import { DyslexiaToolbar } from './DyslexiaToolbar';

export const Header: React.FC = () => {
  const { 
    profile, 
    setCurrentScreen, 
    setShowProfileModal, 
    setShowShopModal,
    currentScreen 
  } = useApp();

  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-amber-200/80 px-3 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Home link */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            title="Ir a la pantalla principal"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
              🐲
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 bg-clip-text text-transparent">
                  LumiAprende
                </span>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Inclusivo & Adaptativo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Aprende jugando a tu propio ritmo</p>
            </div>
          </button>
        </div>

        {/* Stats & Gamification Counters */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Streak */}
          <div 
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-800 font-extrabold text-xs sm:text-sm shadow-xs"
            title={`¡Llevas ${profile.streakDays} días consecutivos practicando!`}
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-gentle" />
            <span>{profile.streakDays}</span>
            <span className="hidden md:inline text-[11px] font-medium text-orange-700">días</span>
          </div>

          {/* Stars */}
          <div 
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs sm:text-sm shadow-xs"
            title={`Tienes ${profile.stars} estrellas ganadas`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{profile.stars}</span>
          </div>

          {/* Coins / Lumis */}
          <div 
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-xs sm:text-sm shadow-xs"
            title={`Tienes ${profile.lumis} monedas Lumis`}
          >
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>{profile.lumis}</span>
          </div>

          {/* Shop button */}
          <button
            type="button"
            onClick={() => setShowShopModal(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            title="Tienda de accesorios y disfraces para tu mascota"
          >
            <ShoppingBag className="w-4 h-4 text-fuchsia-600" />
            <span className="hidden sm:inline">Tienda</span>
          </button>

          {/* Dyslexia Readability Toolbar */}
          <DyslexiaToolbar />

          {/* Parent / Teacher Portal */}
          <button
            type="button"
            onClick={() => setCurrentScreen('parent_portal')}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              currentScreen === 'parent_portal'
                ? 'bg-slate-800 text-white border-slate-900'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="Zona de Padres y Docentes (Protegida)"
          >
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Padres / Docentes</span>
          </button>

          {/* Profile Switcher / Button */}
          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300 transition-all cursor-pointer shadow-xs ml-1"
            title="Cambiar o editar perfil del niño"
          >
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentAvatar.bgColor} flex items-center justify-center text-lg shadow-xs`}>
              {currentAvatar.emoji}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[80px]">
                {profile.name}
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">
                {profile.grade}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
