import React from 'react';
import { X, SlidersHorizontal, Check, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/menuData';
import { CategoryId } from '../types';

export const SearchFilterModal: React.FC = () => {
  const {
    isFilterModalOpen,
    setIsFilterModalOpen,
    activeCategory,
    setActiveCategory,
    dietaryFilter,
    setDietaryFilter,
    sortBy,
    setSortBy
  } = useCart();

  if (!isFilterModalOpen) return null;

  const handleApply = () => {
    setIsFilterModalOpen(false);
    const menuEl = document.getElementById('menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setActiveCategory('all');
    setDietaryFilter('all');
    setSortBy('popularity');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsFilterModalOpen(false)}
      />

      <div className="relative bg-white rounded-[28px] max-w-sm w-full p-5 sm:p-6 shadow-2xl z-10 border border-[#EAEAEA]">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h3 className="font-bebas text-xl text-[#080808] tracking-wide">
              Filter &amp; Sort Menu
            </h3>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Categories */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#080808] mb-2 text-[11px]">
              Categories
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#080808] text-[#F5B800]'
                    : 'bg-[#F2F2F0] text-[#555] hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setActiveCategory(c.id as CategoryId)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                    activeCategory === c.id
                      ? 'bg-[#080808] text-[#F5B800]'
                      : 'bg-[#F2F2F0] text-[#555] hover:bg-stone-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Preference */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#080808] mb-2 text-[11px]">
              Dietary Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                  dietaryFilter === 'all'
                    ? 'border-[#080808] bg-stone-100 font-bold text-[#080808]'
                    : 'border-stone-200 text-[#666]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('veg')}
                className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                  dietaryFilter === 'veg'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-stone-200 text-[#666]'
                }`}
              >
                🌱 Veg Only
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('spicy')}
                className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                  dietaryFilter === 'spicy'
                    ? 'border-amber-600 bg-amber-50 text-amber-800 font-bold'
                    : 'border-stone-200 text-[#666]'
                }`}
              >
                🌶️ Spicy Only
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#080808] mb-2 text-[11px]">
              Sort Order
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'popularity', label: 'Most Popular / Signature' },
                { id: 'rating', label: 'Highest Rated (★ 4.8+)' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' }
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    sortBy === s.id
                      ? 'border-[#080808] bg-stone-50 text-[#080808] font-bold'
                      : 'border-stone-200 text-[#666]'
                  }`}
                >
                  <span>{s.label}</span>
                  {sortBy === s.id && <Check className="w-4 h-4 text-[#F5B800] stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-2 pt-5 mt-4 border-t border-[#EAEAEA]">
          <button
            type="button"
            onClick={handleReset}
            className="p-3 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-full bg-[#080808] hover:bg-[#222] text-[#F5B800] font-bold text-xs uppercase tracking-wider transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
