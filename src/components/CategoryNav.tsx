import React from 'react';
import { useCart } from '../context/CartContext';
import { CategoryId } from '../types';

interface CategoryItem {
  id: CategoryId;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'burgers',
    label: 'Burgers',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Bun */}
        <path d="M4 11C4 7 7.5 4 12 4C16.5 4 20 7 20 11H4Z" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        {/* Sesame Seeds */}
        <line x1="8" y1="7" x2="8.01" y2="7" strokeWidth="2.5" />
        <line x1="12" y1="6" x2="12.01" y2="6" strokeWidth="2.5" />
        <line x1="16" y1="7" x2="16.01" y2="7" strokeWidth="2.5" />
        {/* Patty & Lettuce */}
        <path d="M3 14C3.6 13.5 4.5 13.5 5.2 14C5.9 14.5 6.8 14.5 7.5 14C8.2 13.5 9.1 13.5 9.8 14C10.5 14.5 11.4 14.5 12.1 14C12.8 13.5 13.7 13.5 14.4 14C15.1 14.5 16 14.5 16.7 14C17.4 13.5 18.3 13.5 19 14C19.7 14.5 20.5 14.5 21 14" />
        <path d="M4 16H20" strokeWidth="2" />
        {/* Bottom Bun */}
        <path d="M5 19H19C19 20.6569 17.6569 21.5 16 21.5H8C6.34315 21.5 5 20.6569 5 19Z" />
      </svg>
    )
  },
  {
    id: 'wraps',
    label: 'Wraps',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Burrito / Wrap cylinder */}
        <rect x="7" y="3" width="10" height="18" rx="5" transform="rotate(25 12 12)" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        <line x1="8" y1="9" x2="14" y2="15" />
        <line x1="10" y1="7" x2="16" y2="13" />
        <line x1="7" y1="13" x2="11" y2="17" />
      </svg>
    )
  },
  {
    id: 'chicken',
    label: 'Grilled Chicken',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Drumstick */}
        <path d="M15.4 3.6C17.7 5.9 17.5 9.7 14.9 12.3C12.3 14.9 8.5 15.1 6.2 12.8C3.9 10.5 4.1 6.7 6.7 4.1C9.3 1.5 13.1 1.3 15.4 3.6Z" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        {/* Bone */}
        <path d="M7 14L4 17" />
        <circle cx="3" cy="18" r="1.5" />
        <circle cx="5" cy="20" r="1.5" />
      </svg>
    )
  },
  {
    id: 'sides',
    label: 'Sides',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Fries box */}
        <path d="M6 10L7 21H17L18 10H6Z" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        {/* French fries sticks */}
        <line x1="8" y1="3" x2="8" y2="10" />
        <line x1="11" y1="2" x2="11" y2="10" />
        <line x1="14" y1="4" x2="14" y2="10" />
        <line x1="16" y1="3" x2="16" y2="10" />
      </svg>
    )
  },
  {
    id: 'drinks',
    label: 'Drinks',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Cup */}
        <path d="M6 8L7.5 21H16.5L18 8H6Z" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        {/* Lid */}
        <path d="M5 8H19" strokeWidth="2" />
        {/* Straw */}
        <path d="M14 2L12 8" />
      </svg>
    )
  },
  {
    id: 'desserts',
    label: 'Desserts',
    renderIcon: (active) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Cupcake base */}
        <path d="M6 12L7.5 21H16.5L18 12" fill={active ? '#F5B800' : 'none'} fillOpacity={active ? '0.2' : '0'} />
        {/* Swirl top */}
        <path d="M6 12C5 12 4 10.5 5 9C6 7.5 8 8 9 7C10 6 11 5 12 5C13 5 14 6 15 7C16 8 18 7.5 19 9C20 10.5 19 12 18 12" />
        {/* Cherry */}
        <circle cx="12" cy="4" r="1.5" fill={active ? '#FFC928' : 'none'} />
      </svg>
    )
  }
];

export const CategoryNav: React.FC = () => {
  const { activeCategory, setActiveCategory } = useCart();

  const handleSelect = (id: CategoryId) => {
    setActiveCategory(activeCategory === id ? 'all' : id);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Category Horizontal Container (Matches Reference: Circular Icons) */}
      <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 lg:gap-14 overflow-x-auto no-scrollbar py-2 px-1">
        {CATEGORY_ITEMS.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular Icon Container (Exact match to reference) */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#080808] text-[#F5B800] shadow-[0_6px_18px_rgba(0,0,0,0.25)] ring-2 ring-[#F5B800]'
                    : 'bg-white text-[#151515] border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:border-[#080808] group-hover:shadow-md'
                }`}
              >
                {cat.renderIcon(isActive)}
              </div>

              {/* Label underneath */}
              <span
                className={`mt-2 text-xs sm:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#080808] font-bold' : 'text-[#555] group-hover:text-[#080808]'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
