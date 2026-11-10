import React, { useState, useEffect } from 'react';
import { X, Star, Flame, Clock, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, ProductAddon } from '../types';
import { SafeImage } from './SafeImage';

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [instructions, setInstructions] = useState('');

  // Reset local state when product changes
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1);
      setSelectedAddons([]);
      setInstructions('');
    }
  }, [selectedProductForModal]);

  if (!selectedProductForModal) return null;

  const product: Product = selectedProductForModal;

  const toggleAddon = (addon: ProductAddon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAddons, instructions.trim() || undefined);
    setSelectedProductForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setSelectedProductForModal(null)}
      />

      {/* Modal Dialog Box */}
      <div className="relative bg-white rounded-[28px] max-w-lg w-full shadow-2xl overflow-hidden z-10 my-8 border border-[#EAEAEA] flex flex-col max-h-[90vh]">
        {/* Floating Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Top Food Image Container */}
          <div className="relative w-full aspect-[16/10] bg-[#0A0A0A] overflow-hidden">
            <SafeImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges on top of image */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-[#F5B800] text-[#080808] font-bebas tracking-wider text-xs uppercase font-bold shadow-md">
                  {product.badge}
                </span>
              )}
              {product.isSpicy && (
                <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow flex items-center gap-1">
                  🌶️ Spicy
                </span>
              )}
              {product.isVegetarian && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold shadow flex items-center gap-1">
                  🌱 Vegetarian
                </span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Title & Price Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#080808] leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#777]">
                  <div className="flex items-center text-[#F5B800]">
                    <Star className="w-4 h-4 fill-[#F5B800] stroke-[#F5B800]" />
                    <span className="ml-1 font-bold text-[#080808]">{product.rating.toFixed(1)}</span>
                  </div>
                  <span>·</span>
                  <span>{product.reviewCount} reviews</span>
                  {product.calories && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {product.calories} kcal
                      </span>
                    </>
                  )}
                  {product.prepTime && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {product.prepTime}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#080808] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#555] leading-relaxed">
              {product.description}
            </p>

            {/* Key Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Key Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#F2F2F0] text-[#444] px-2.5 py-1 rounded-lg font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customizable Add-ons */}
            {product.addons && product.addons.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                    Flame Add-Ons &amp; Extras
                  </h4>
                  <span className="text-[11px] text-[#888]">Optional</span>
                </div>
                <div className="space-y-2">
                  {product.addons.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-amber-50/70 border-[#F5B800] text-[#080808]'
                            : 'bg-white border-[#EAEAEA] text-[#555] hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#F5B800] text-[#080808]' : 'border border-stone-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-bold text-[#080808] tabular-nums">
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#080808] mb-1.5">
                Special Instructions
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Extra napkins, sauce on the side, well done..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 placeholder-[#999] focus:border-[#F5B800] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions Bar */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#EAEAEA] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-[#EAEAEA] rounded-full p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#080808] hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#080808] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#080808] hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-6 rounded-full bg-[#080808] hover:bg-[#222] text-[#F5B800] font-bold text-sm tracking-wide flex items-center justify-between shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-mono text-white tabular-nums">${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
