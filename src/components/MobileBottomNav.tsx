import React, { useState, useEffect } from 'react';
import { Home, UtensilsCrossed, ShoppingBag, Tag, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'order' | 'offers' | 'contact'>('home');

  const scrollTo = (id: string, tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'order') {
      setIsCartOpen(true);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEAEA] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pb-safe"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto relative">
        {/* 1. Home */}
        <button
          onClick={() => scrollTo('home', 'home')}
          className={`flex flex-col items-center justify-center w-14 transition-colors ${
            activeTab === 'home' ? 'text-[#F5B800]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* 2. Menu */}
        <button
          onClick={() => scrollTo('menu', 'menu')}
          className={`flex flex-col items-center justify-center w-14 transition-colors ${
            activeTab === 'menu' ? 'text-[#F5B800]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Menu</span>
        </button>

        {/* 3. Center Order Button (Elevated Golden Circle matching Reference!) */}
        <div className="relative -top-3 flex flex-col items-center">
          <button
            onClick={() => scrollTo('order', 'order')}
            className="w-13 h-13 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] flex items-center justify-center shadow-[0_6px_16px_rgba(245,184,0,0.45)] border-4 border-white active:scale-95 transition-transform relative cursor-pointer"
            aria-label={`View cart with ${itemCount} items`}
          >
            <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#080808] text-[#F5B800] text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>
          <span className="text-[10px] font-bold text-[#080808] mt-0.5">Order</span>
        </div>

        {/* 4. Offers */}
        <button
          onClick={() => scrollTo('offers', 'offers')}
          className={`flex flex-col items-center justify-center w-14 transition-colors ${
            activeTab === 'offers' ? 'text-[#F5B800]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Offers</span>
        </button>

        {/* 5. Contact */}
        <button
          onClick={() => scrollTo('contact', 'contact')}
          className={`flex flex-col items-center justify-center w-14 transition-colors ${
            activeTab === 'contact' ? 'text-[#F5B800]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Contact</span>
        </button>
      </div>
    </nav>
  );
};
