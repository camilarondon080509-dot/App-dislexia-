import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const ReadingRuler: React.FC = () => {
  const { profile, updateAccessibility } = useApp();
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!profile.accessibility.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [profile.accessibility.readingGuide]);

  if (!profile.accessibility.readingGuide) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-x-0 z-40 transition-all duration-75 ease-out"
      style={{ top: `${mouseY - 32}px`, height: '64px' }}
    >
      {/* Upper shadow mask */}
      <div 
        className="fixed inset-x-0 top-0 bg-slate-900/15 pointer-events-none"
        style={{ height: `${Math.max(0, mouseY - 32)}px` }}
      />
      
      {/* Highlighting focal window */}
      <div className="w-full h-full border-y-2 border-amber-500/70 bg-amber-200/20 backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-between px-6">
        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded shadow-xs">
          Regla de Lectura
        </span>
        <button
          type="button"
          onClick={() => updateAccessibility(prev => ({ ...prev, readingGuide: false }))}
          className="pointer-events-auto text-xs font-semibold bg-white/90 text-slate-700 hover:text-red-600 px-2 py-0.5 rounded shadow-xs cursor-pointer"
        >
          ✕ Cerrar regla
        </button>
      </div>

      {/* Lower shadow mask */}
      <div 
        className="fixed inset-x-0 bottom-0 bg-slate-900/15 pointer-events-none"
        style={{ top: `${mouseY + 32}px` }}
      />
    </div>
  );
};
