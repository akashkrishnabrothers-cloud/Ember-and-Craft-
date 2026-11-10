import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MENU_PRODUCTS } from '../data/menuData';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

export const PopularPicks: React.FC = () => {
  const { setSelectedProductForModal, setActiveCategory } = useCart();

  // Featured items including the top picks from reference image
  const popularProducts = MENU_PRODUCTS.slice(0, 6);

  const handleViewAll = () => {
    setActiveCategory('all');
    const menuEl = document.getElementById('menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header (Exact match to reference: "Popular Picks" & "View All ->") */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="font-bebas text-2xl sm:text-3xl text-[#080808] tracking-wide uppercase">
            Popular Picks
          </h2>
          <p className="text-xs sm:text-sm text-[#777] hidden sm:block">
            Our most requested flame-grilled signatures, ordered fresh daily.
          </p>
        </div>

        <button
          onClick={handleViewAll}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F5B800] hover:text-[#FFC928] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of Product Cards: 2-col on mobile, 3-col on tablet/desktop, 4-col on XL */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
        {popularProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onOpenDetails={(p) => setSelectedProductForModal(p)}
          />
        ))}
      </div>
    </section>
  );
};
