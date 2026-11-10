import React, { useMemo } from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';
import { MENU_PRODUCTS } from '../data/menuData';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { CategoryId } from '../types';

const CATEGORY_TABS: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'burgers', label: 'Flame Burgers' },
  { id: 'wraps', label: 'Toasted Wraps' },
  { id: 'chicken', label: 'Grilled Chicken' },
  { id: 'sides', label: 'Loaded Sides' },
  { id: 'drinks', label: 'Craft Drinks' },
  { id: 'desserts', label: 'Desserts' },
];

export const MenuSection: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
    sortBy,
    setSortBy,
    setSelectedProductForModal
  } = useCart();

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return MENU_PRODUCTS.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !prod.isVegetarian) return false;
      if (dietaryFilter === 'non-veg' && prod.isVegetarian) return false;
      if (dietaryFilter === 'spicy' && !prod.isSpicy) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        const matchCategory = prod.category.toLowerCase().includes(query);
        const matchIngredient = prod.ingredients?.some(i => i.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchCategory && !matchIngredient) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // default popularity
    });
  }, [activeCategory, dietaryFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setDietaryFilter('all');
    setSearchQuery('');
    setSortBy('popularity');
  };

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAEAEA] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bebas tracking-widest text-[#F5B800] text-sm uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#F5B800]" />
              CHEF-CRAFTED ROSTER
            </span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#080808] tracking-wide uppercase">
            Complete Restaurant Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#777] mt-1 max-w-xl">
            Every dish is made to order with cast iron sear, flame-roasted spices, and premium ingredients.
          </p>
        </div>

        {/* Dietary & Sorting Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dietary toggle buttons */}
          <div className="flex items-center bg-[#F2F2F0] p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-white text-[#080808] shadow-sm'
                  : 'text-[#666] hover:text-[#080808]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#666] hover:text-emerald-700'
              }`}
            >
              🌱 Veg
            </button>
            <button
              onClick={() => setDietaryFilter('spicy')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                dietaryFilter === 'spicy'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-[#666] hover:text-amber-700'
              }`}
            >
              🌶️ Spicy
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F2F2F0] text-xs font-semibold text-[#080808] px-3.5 py-2 rounded-full border border-transparent focus:border-[#F5B800] focus:bg-white focus:outline-none transition-all cursor-pointer"
          >
            <option value="popularity">Sort: Most Popular</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Horizontal Category Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#080808] text-[#F5B800] shadow-md ring-2 ring-[#080808]'
                  : 'bg-white text-[#666] hover:text-[#080808] border border-[#EAEAEA] hover:border-[#888]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search active notice */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs sm:text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-700" />
            <span>
              Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredProducts.length} items found)
            </span>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold underline hover:text-amber-950"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetails={(p) => setSelectedProductForModal(p)}
            />
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#EAEAEA] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#EAEAEA] flex items-center justify-center mx-auto mb-4 text-[#F5B800]">
            <Search className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-bebas text-2xl text-[#080808] tracking-wide">No Matches Found</h3>
          <p className="text-xs sm:text-sm text-[#777] mt-1 mb-6 max-w-xs mx-auto">
            We couldn&apos;t find any delicious items matching your current filters. Try searching for something else!
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#080808] text-white hover:text-[#F5B800] text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
