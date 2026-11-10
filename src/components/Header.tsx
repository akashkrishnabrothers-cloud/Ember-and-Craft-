import React, { useState } from 'react';
import { Flame, ShoppingBag, User, Search, SlidersHorizontal, Menu as MenuIcon, X, Phone, Clock, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex flex-col items-center justify-center select-none text-center">
      <div className="flex items-center gap-1.5 mb-0.5">
        <div className="w-5 h-5 md:w-6 md:h-6 text-[#F5B800] flex items-center justify-center drop-shadow-[0_2px_8px_rgba(245,184,0,0.4)]">
          <Flame className="w-full h-full fill-[#F5B800] stroke-[#151515] stroke-[1.5]" />
        </div>
        <span
          className={`font-bebas tracking-wider text-[#080808] uppercase leading-none ${
            isSm ? 'text-xl' : isLg ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
          }`}
        >
          EMBER <span className="text-[#F5B800]">&amp;</span> CRAFT
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 md:w-4 h-[1px] bg-[#080808]/40" />
        <span
          className={`font-heading tracking-[0.2em] text-[#080808] font-bold uppercase leading-none ${
            isSm ? 'text-[8px]' : 'text-[9px] md:text-[10px]'
          }`}
        >
          FLAME CRAFTED PERFECTION
        </span>
        <span className="w-3 md:w-4 h-[1px] bg-[#080808]/40" />
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  const {
    itemCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setIsFilterModalOpen,
    dietaryFilter,
    setDietaryFilter
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#EAEAEA] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
        {/* Top desktop announcement banner */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[#080808] text-white text-xs">
          <div className="flex items-center gap-6 text-[#999]">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-[#F5B800]" />
              {RESTAURANT_INFO.hours}
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#F5B800]" />
              {RESTAURANT_INFO.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#FFC928] font-medium tracking-wide">
              ⚡ Free Delivery on orders over ${RESTAURANT_INFO.freeDeliveryThreshold.toFixed(2)}
            </span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#F5B800] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#F5B800]" />
              {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Mobile hamburger or Desktop logo */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#080808] hover:text-[#F5B800] transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>

              <a href="#" className="hidden lg:block cursor-pointer">
                <Logo />
              </a>
            </div>

            {/* Mobile Centered Logo */}
            <div className="lg:hidden">
              <a href="#" className="cursor-pointer">
                <Logo size="sm" />
              </a>
            </div>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-sm font-semibold tracking-wide text-[#080808] hover:text-[#F5B800] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-sm font-semibold tracking-wide text-[#555] hover:text-[#080808] transition-colors"
              >
                Full Menu
              </button>
              <button
                onClick={() => scrollToSection('popular')}
                className="text-sm font-semibold tracking-wide text-[#555] hover:text-[#080808] transition-colors"
              >
                Popular Picks
              </button>
              <button
                onClick={() => scrollToSection('offers')}
                className="text-sm font-semibold tracking-wide text-[#555] hover:text-[#080808] transition-colors"
              >
                Offers &amp; Combos
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-semibold tracking-wide text-[#555] hover:text-[#080808] transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-semibold tracking-wide text-[#555] hover:text-[#080808] transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop quick search bar */}
              <div className="hidden xl:flex items-center relative w-64">
                <input
                  type="text"
                  placeholder="Search burgers, wraps..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F2F2F0] text-sm text-[#080808] placeholder-[#888] pl-9 pr-8 py-2 rounded-full border border-transparent focus:border-[#F5B800] focus:bg-white focus:outline-none transition-all"
                />
                <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Account icon button */}
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#151515] hover:bg-[#F2F2F0] transition-colors"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Cart button with live yellow badge (as shown in reference) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#151515] hover:bg-[#F2F2F0] transition-colors"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#F5B800] text-[#080808] text-[11px] font-extrabold flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Desktop Golden Order Now Button */}
              <button
                onClick={() => scrollToSection('menu')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(245,184,0,0.35)] hover:shadow-[0_6px_20px_rgba(245,184,0,0.45)] transition-all transform active:scale-95"
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Underneath Header (Matches Reference Image Exactly) */}
        <div className="lg:hidden px-4 pb-3 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for burgers, wraps, sides..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#F2F2F0] text-sm text-[#080808] placeholder-[#777] pl-10 pr-9 py-2.5 rounded-full border border-transparent focus:border-[#F5B800] focus:bg-white focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400 hover:text-stone-700 w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            {/* Circular Black Filter Button Beside Search (Matches Reference) */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-11 h-11 shrink-0 rounded-full bg-[#080808] hover:bg-[#222] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
              aria-label="Filter menu items"
            >
              <SlidersHorizontal className="w-5 h-5 text-[#FFC928]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAF8]">
              <Logo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-stone-600 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#888] tracking-widest uppercase mb-2">Navigation</p>
                <button
                  onClick={() => scrollToSection('home')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  Full Menu
                </button>
                <button
                  onClick={() => scrollToSection('popular')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  Popular Picks
                </button>
                <button
                  onClick={() => scrollToSection('offers')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  Weekend Special (20% OFF)
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  About Ember &amp; Craft
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-left py-2.5 text-base font-semibold text-[#080808] hover:text-[#F5B800] flex items-center justify-between"
                >
                  Contact &amp; Store Hours
                </button>
              </div>

              <div className="pt-4 border-t border-[#EAEAEA] space-y-3 text-xs text-[#555]">
                <p className="font-bold text-[#080808] uppercase text-[11px]">Dietary Filters</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg');
                      setIsMobileMenuOpen(false);
                      scrollToSection('menu');
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                      dietaryFilter === 'veg'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    🌱 Vegetarian
                  </button>
                  <button
                    onClick={() => {
                      setDietaryFilter(dietaryFilter === 'spicy' ? 'all' : 'spicy');
                      setIsMobileMenuOpen(false);
                      scrollToSection('menu');
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                      dietaryFilter === 'spicy'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    🌶️ Spicy Flame
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEAEA] text-xs text-[#666] space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F5B800]" />
                  <span>{RESTAURANT_INFO.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F5B800]" />
                  <span>{RESTAURANT_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#080808] text-white">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 bg-[#F5B800] text-[#080808] font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                View Bag ({itemCount} items)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#FAFAF8] border border-[#EAEAEA] rounded-full mx-auto flex items-center justify-center text-[#F5B800] mb-3">
                <User className="w-7 h-7" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-[#080808]">Ember Rewards Club</h3>
              <p className="text-xs text-[#777] mt-1">
                Order directly to earn flame points on every juicy burger and combo meal.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1">Phone or Email</label>
                <input
                  type="text"
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#F5B800] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Welcome to Ember Rewards! You are now logged in as Guest VIP with 50 Flame Points.');
                  setIsAccountModalOpen(false);
                }}
                className="w-full py-3 bg-[#080808] hover:bg-[#222] text-[#F5B800] font-bold text-sm rounded-full transition-all"
              >
                Sign In / Guest Quick Access
              </button>
              <p className="text-[11px] text-center text-stone-400">
                No password required for ordering. Direct SMS receipt sent on checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
