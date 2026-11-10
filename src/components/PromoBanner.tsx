import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { PROMO_COMBO_IMG } from '../data/menuData';
import { useCart } from '../context/CartContext';

export const PromoBanner: React.FC = () => {
  const { applyCoupon, appliedCoupon, setIsCartOpen } = useCart();

  const isApplied = appliedCoupon?.code === 'WEEKEND20';

  const handleClaimOffer = () => {
    applyCoupon('WEEKEND20');
    const menuEl = document.getElementById('menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Banner Container matching reference: Rounded dark surface with gold borders */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0A0A0A] border border-[#F5B800]/30 shadow-[0_12px_36px_rgba(0,0,0,0.35)] text-white">
        {/* Subtle Ember Glow Effect */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#F5B800]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#FF6B00]/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[260px] sm:min-h-[300px]">
          {/* Left Text Side (Matches Reference) */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 z-10 flex flex-col justify-center">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <span className="font-bebas tracking-widest text-[#F5B800] text-sm sm:text-base uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-[#F5B800]" />
                WEEKEND SPECIAL
              </span>
            </div>

            {/* Huge 20% OFF */}
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-white leading-none">
                20% OFF
              </h2>
              {/* Circular Gold Discount Badge (Exact match to reference) */}
              <div className="hidden sm:flex w-14 h-14 rounded-full bg-[#F5B800] text-[#080808] flex-col items-center justify-center font-bebas leading-none shadow-lg transform -rotate-12 border-2 border-[#0A0A0A]">
                <span className="text-base font-bold">20%</span>
                <span className="text-[10px] tracking-tight">OFF</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="font-heading font-bold text-base sm:text-xl text-[#F2F2F0] uppercase tracking-wide mb-3">
              ON ALL ONLINE ORDERS
            </p>

            <p className="text-xs sm:text-sm text-stone-300 max-w-md mb-6 leading-relaxed">
              Use code <span className="text-[#FFC928] font-bold font-mono">WEEKEND20</span> at checkout or click below to auto-apply the instant savings to your order.
            </p>

            {/* Golden Order Button (Matches Reference: ORDER NOW with arrow) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClaimOffer}
                className={`group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
                  isApplied
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] shadow-[0_4px_16px_rgba(245,184,0,0.4)]'
                }`}
              >
                <span>{isApplied ? '20% OFFER ACTIVATED' : 'CLAIM OFFER NOW'}</span>
                <span className="w-6 h-6 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center transition-transform group-hover:translate-x-1">
                  {isApplied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />}
                </span>
              </button>

              {isApplied && (
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs text-stone-300 underline hover:text-white"
                >
                  View in Cart
                </button>
              )}
            </div>
          </div>

          {/* Right Food Photo Side: Burger + Loaded Fries + Cold Drink */}
          <div className="md:col-span-5 relative h-56 sm:h-72 md:h-full p-4 sm:p-6 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <SafeImage
                src={PROMO_COMBO_IMG}
                alt="Weekend Special Feast - Double Cheeseburger, Fries and Drink"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating mobile discount badge */}
              <div className="sm:hidden absolute bottom-3 right-3 w-12 h-12 rounded-full bg-[#F5B800] text-[#080808] flex flex-col items-center justify-center font-bebas leading-none shadow-lg border-2 border-[#0A0A0A]">
                <span className="text-sm font-bold">20%</span>
                <span className="text-[8px] tracking-tight">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
