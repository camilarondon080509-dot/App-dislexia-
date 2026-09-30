import React, { useState } from 'react';
import { X, Sparkles, Coins, Check, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MASCOT_SHOP_ITEMS } from '../../data/avatars';
import { MascotItem } from '../../types';

export const RewardShopModal: React.FC = () => {
  const { 
    showShopModal, 
    setShowShopModal, 
    profile, 
    buyShopItem, 
    equipShopItem 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hat' | 'glasses' | 'cape' | 'badge'>('all');

  if (!showShopModal) return null;

  const filteredItems = selectedCategory === 'all'
    ? MASCOT_SHOP_ITEMS
    : MASCOT_SHOP_ITEMS.filter(item => item.category === selectedCategory);

  const isItemOwned = (itemId: string) => (profile.ownedMascotItems || []).includes(itemId);
  const isItemEquipped = (item: MascotItem) => profile.equippedMascotItems?.[item.category] === item.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-4 border-fuchsia-300 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 flex items-center justify-center text-2xl shadow-xs">
              🛍️
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Boutique de Mascotas</h3>
              <p className="text-xs text-slate-500">Viste a tu compañero con tus monedas Lumis</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-sm border border-emerald-300 shadow-xs">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>{profile.lumis} Lumis</span>
            </div>

            <button
              type="button"
              onClick={() => setShowShopModal(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex gap-2 my-4 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'Todos', icon: '✨' },
            { id: 'hat', label: 'Sombreros', icon: '🧢' },
            { id: 'glasses', label: 'Gafas', icon: '🕶️' },
            { id: 'cape', label: 'Capas', icon: '🦸' },
            { id: 'badge', label: 'Medallas', icon: '🥇' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-fuchsia-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-2">
          {filteredItems.map(item => {
            const owned = isItemOwned(item.id);
            const equipped = isItemEquipped(item);
            const canAfford = profile.lumis >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-between text-center transition-all ${
                  equipped
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-300'
                    : owned
                    ? 'border-indigo-300 bg-indigo-50/40'
                    : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                }`}
              >
                <div className="text-4xl my-2 transform hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <div className="font-extrabold text-sm text-slate-800 line-clamp-1">
                  {item.name}
                </div>

                <div className="my-2">
                  {owned ? (
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                      En tu armario
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                      {item.cost} Lumis
                    </span>
                  )}
                </div>

                {/* Action button */}
                {owned ? (
                  <button
                    type="button"
                    onClick={() => equipShopItem(item)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      equipped
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    }`}
                  >
                    {equipped ? '✓ Equipado' : 'Equipar'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => buyShopItem(item)}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      canAfford
                        ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-xs active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Comprar ✨' : 'Faltan monedas'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
