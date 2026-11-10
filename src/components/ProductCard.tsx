import React, { useState } from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, setSelectedProductForModal } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(product);
    } else {
      setSelectedProductForModal(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-[22px] sm:rounded-[24px] border border-[#EAEAEA] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#121212] overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Small Golden Badge (Exact match to reference: BESTSELLER, CHEF'S PICK, POPULAR) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5B800] text-[#080808] font-bebas tracking-wider text-[11px] sm:text-xs uppercase shadow-md font-semibold">
              {product.badge}
            </span>
          </div>
        )}

        {/* Dietary / Spice indicator */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10">
          {product.isSpicy && (
            <span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm text-amber-400 text-xs flex items-center justify-center shadow" title="Spicy">
              🌶️
            </span>
          )}
          {product.isVegetarian && (
            <span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm text-emerald-400 text-xs flex items-center justify-center shadow" title="Vegetarian">
              🌱
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-heading font-bold text-sm sm:text-base text-[#080808] leading-snug line-clamp-1 group-hover:text-[#F5B800] transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-1 text-xs text-[#666] leading-relaxed line-clamp-2 min-h-[32px]">
            {product.description}
          </p>

          {/* Star Rating with Review Count */}
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-[#F5B800]">
              <Star className="w-3.5 h-3.5 fill-[#F5B800] stroke-[#F5B800]" />
              <span className="ml-1 font-bold text-[#080808]">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[#888] text-[11px]">({product.reviewCount}+)</span>
          </div>
        </div>

        {/* Bottom Row: Price and Black Circular Add Button */}
        <div className="mt-3 pt-2 border-t border-[#F2F2F0] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-bold text-base sm:text-lg text-[#080808] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#999] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Circular Black Button with White Plus Icon (Exact match to reference) */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
              justAdded
                ? 'bg-[#F5B800] text-[#080808] scale-110'
                : 'bg-[#080808] hover:bg-[#222] text-white active:scale-90 hover:scale-105'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
