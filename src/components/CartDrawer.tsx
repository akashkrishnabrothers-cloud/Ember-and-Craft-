import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    discountAmount,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;

    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const remainingForFreeDelivery = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bebas text-xl sm:text-2xl text-[#080808] tracking-wide leading-none">
                Your Flame Bag
              </h3>
              <p className="text-xs text-[#777] mt-0.5">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} ready to sizzle
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {cart.length > 0 && (
          <div className="px-5 py-3 bg-[#080808] text-white text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span>
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-[#FFC928] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    You unlocked FREE delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#FFC928]">${remainingForFreeDelivery.toFixed(2)}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-stone-400 font-mono text-[11px]">{Math.round(deliveryProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F5B800] transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-[#FAFAF8] border border-[#EAEAEA] flex items-center justify-center text-[#F5B800] mb-4">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="font-bebas text-2xl text-[#080808] tracking-wide">Your Bag is Empty</h4>
              <p className="text-xs sm:text-sm text-[#777] mt-1 mb-6 max-w-xs">
                Looks like you haven&apos;t added any flame-grilled burgers or crispy sides yet.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3 sm:p-3.5 rounded-2xl border border-[#EAEAEA] bg-[#FAFAF8] flex gap-3 relative group"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-black overflow-hidden shrink-0">
                  <SafeImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#080808] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1 -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Addons summary */}
                    {item.selectedAddons.length > 0 && (
                      <p className="text-[11px] text-[#777] line-clamp-1 mt-0.5">
                        +{item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[10px] text-amber-800 bg-amber-50 rounded px-1.5 py-0.5 mt-1 inline-block truncate max-w-full">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EAEAEA]">
                    <div className="flex items-center bg-white border border-[#EAEAEA] rounded-full p-0.5 shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#080808] hover:bg-stone-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#080808] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#080808] hover:bg-stone-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-heading font-bold text-sm text-[#080808] tabular-nums">
                      ${item.itemTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher & Bill Summary (Bottom) */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#EAEAEA] space-y-3.5">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-[#F5B800] rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-700" />
                    <div>
                      <span className="font-mono font-bold text-[#080808]">{appliedCoupon.code}</span>
                      <span className="text-[#666] ml-1.5">({appliedCoupon.discountPercentage}% OFF applied)</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase font-mono tracking-wider focus:border-[#F5B800] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 bg-[#080808] hover:bg-[#222] text-[#F5B800] text-xs font-bold rounded-xl uppercase transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600 pl-1">{couponError}</p>
                  )}
                  {/* Quick coupon buttons */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] text-stone-500">Quick Offers:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('WEEKEND20')}
                      className="text-[10px] bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-mono font-bold px-2 py-0.5 rounded border border-amber-300"
                    >
                      WEEKEND20 (20% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('EMBER10')}
                      className="text-[10px] bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-mono font-bold px-2 py-0.5 rounded border border-stone-300"
                    >
                      EMBER10 (10% OFF)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#555] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#080808] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-mono text-[#080808] tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono text-[#080808] tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-[#080808] pt-2 border-t border-[#EAEAEA]">
                <span>Total Amount</span>
                <span className="font-mono text-base sm:text-lg tabular-nums text-[#080808]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-sm tracking-wider uppercase flex items-center justify-between shadow-[0_6px_20px_rgba(245,184,0,0.35)] hover:shadow-[0_8px_24px_rgba(245,184,0,0.45)] transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span className="w-6 h-6 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
