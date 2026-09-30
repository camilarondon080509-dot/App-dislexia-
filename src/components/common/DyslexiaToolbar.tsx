import React, { useState } from 'react';
import { Sliders, Type, Eye, Volume2, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DyslexiaToolbar: React.FC = () => {
  const { profile, updateAccessibility } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const acc = profile.accessibility;

  return (
    <>
      {/* Floating or header accessibility button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
        title="Opciones de lectura fácil y accesibilidad"
        aria-label="Abrir panel de lectura fácil"
      >
        <Sliders className="w-4 h-4 text-indigo-700" />
        <span className="hidden sm:inline">Lectura Fácil</span>
      </button>

      {/* Accessibility Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                  👓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Personaliza tu Lectura</h3>
                  <p className="text-xs text-slate-500">Adapta el texto y los colores a tus ojos</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              {/* Tipografía amigable */}
              <div>
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4 text-indigo-600" />
                  Tipografía adaptada
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'lexend', label: 'Lexend', sub: 'Más legible' },
                    { id: 'comic', label: 'Comic Neue', sub: 'Manuscrita' },
                    { id: 'fredoka', label: 'Fredoka', sub: 'Redondeada' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateAccessibility(prev => ({ ...prev, fontFamily: item.id as any }))}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        acc.fontFamily === item.id 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-base">{item.label}</div>
                      <div className="text-[11px] text-slate-500">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamaño del texto */}
              <div>
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4 text-emerald-600" />
                  Tamaño de letra
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Normal', sample: 'Aa' },
                    { id: 'large', label: 'Grande', sample: 'Aa+' },
                    { id: 'extralarge', label: 'Muy Grande', sample: 'AA++' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => updateAccessibility(prev => ({ ...prev, fontSize: sz.id as any }))}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        acc.fontSize === sz.id 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-base font-bold">{sz.sample}</div>
                      <div className="text-xs text-slate-600">{sz.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tinte de fondo para menor fatiga visual */}
              <div>
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Filtro de color (menor cansancio ocular)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: 'cream', name: 'Crema', bg: 'bg-[#FFFBEB] border-amber-300' },
                    { id: 'mint', name: 'Menta', bg: 'bg-[#F0FDF4] border-emerald-300' },
                    { id: 'sky', name: 'Cielo', bg: 'bg-[#F0F9FF] border-sky-300' },
                    { id: 'peach', name: 'Melocotón', bg: 'bg-[#FFF7ED] border-orange-300' },
                    { id: 'white', name: 'Blanco', bg: 'bg-white border-slate-300' }
                  ].map(color => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => updateAccessibility(prev => ({ ...prev, backgroundTint: color.id as any }))}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${color.bg} ${
                        acc.backgroundTint === color.id ? 'ring-2 ring-indigo-500 scale-105 font-bold shadow-xs' : 'opacity-80'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full border border-slate-300 shadow-xs" />
                      <span className="text-[11px] text-slate-700">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Regla de lectura & Separación de letras */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Regla de lectura visual</div>
                      <div className="text-xs text-slate-500">Muestra una guía horizontal para no perder el renglón</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={acc.readingGuide}
                    onChange={(e) => updateAccessibility(prev => ({ ...prev, readingGuide: e.target.checked }))}
                    className="w-6 h-6 rounded-lg text-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Mayor espaciado entre letras</div>
                      <div className="text-xs text-slate-500">Separa ligeramente cada letra para evitar confusiones</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={acc.letterSpacing}
                    onChange={(e) => updateAccessibility(prev => ({ ...prev, letterSpacing: e.target.checked }))}
                    className="w-6 h-6 rounded-lg text-amber-600 accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Velocidad de la voz */}
              <div>
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-purple-600" />
                  Velocidad del audio guiado
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { rate: 0.8, label: '🐢 Despacio' },
                    { rate: 0.95, label: '🙂 Normal' },
                    { rate: 1.1, label: '🐇 Ágil' }
                  ].map(v => (
                    <button
                      key={v.rate}
                      type="button"
                      onClick={() => updateAccessibility(prev => ({ ...prev, speechRate: v.rate }))}
                      className={`p-2.5 rounded-2xl border-2 text-center text-xs font-bold transition-all cursor-pointer ${
                        Math.abs(acc.speechRate - v.rate) < 0.05
                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Done button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-md cursor-pointer transition-all active:scale-95 text-center"
              >
                ¡Listo, me gusta así! ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
