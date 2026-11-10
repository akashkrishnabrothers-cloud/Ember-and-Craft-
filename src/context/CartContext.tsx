import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductAddon, CartItem, OrderDetails, AppliedCoupon, CategoryId } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, addons?: ProductAddon[], instructions?: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  tax: number;
  total: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (p: Product | null) => void;
  
  // Navigation & Search Filters
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dietaryFilter: 'all' | 'veg' | 'non-veg' | 'spicy';
  setDietaryFilter: (f: 'all' | 'veg' | 'non-veg' | 'spicy') => void;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (s: 'popularity' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Order Completion
  lastOrder: {
    orderId: string;
    details: OrderDetails;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    date: string;
  } | null;
  placeOrder: (details: OrderDetails) => { orderId: string; whatsappUrl?: string };
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  feedbackToast: string | null;
  setFeedbackToast: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ember_and_craft_cart_v1';
const COUPON_STORAGE_KEY = 'ember_and_craft_coupon_v1';

const VALID_COUPONS: Record<string, { discountPercentage: number; description: string }> = {
  WEEKEND20: { discountPercentage: 20, description: '20% OFF Weekend Special' },
  EMBER10: { discountPercentage: 10, description: '10% OFF Flame Welcome Gift' },
  FIRSTBITE: { discountPercentage: 15, description: '15% OFF First Order' }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'spicy'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  const [lastOrder, setLastOrder] = useState<CartContextType['lastOrder']>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync coupon to localStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  // Auto hide feedback toast
  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => setFeedbackToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedAddons: ProductAddon[] = [],
    specialInstructions?: string
  ) => {
    // Unique identifier based on product id + sorted addon ids
    const addonKey = selectedAddons.map(a => a.id).sort().join('_');
    const cartItemId = `${product.id}_${addonKey}`;

    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = product.price + addonsTotal;
    const itemTotal = unitPrice * quantity;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotal: (product.price + addonsTotal) * newQty,
          specialInstructions: specialInstructions || existing.specialInstructions
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            quantity,
            selectedAddons,
            specialInstructions,
            itemTotal
          }
        ];
      }
    });

    setFeedbackToast(`Added "${product.name}" to your order!`);
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
          const unitPrice = item.product.price + addonsTotal;
          return {
            ...item,
            quantity: newQty,
            itemTotal: unitPrice * newQty
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = VALID_COUPONS[clean];
    if (found) {
      const coupon: AppliedCoupon = {
        code: clean,
        discountPercentage: found.discountPercentage,
        description: found.description
      };
      setAppliedCoupon(coupon);
      setFeedbackToast(`Coupon "${clean}" applied! (${found.discountPercentage}% OFF)`);
      return { success: true, message: `Coupon applied: ${found.description}` };
    }
    return { success: false, message: 'Invalid coupon code. Try WEEKEND20 or EMBER10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFeedbackToast('Promo coupon removed');
  };

  // Calculations
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  
  const discountAmount = appliedCoupon
    ? Number(((subtotal * appliedCoupon.discountPercentage) / 100).toFixed(2))
    : 0;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  
  const deliveryFee = subtotal === 0
    ? 0
    : subtotal >= RESTAURANT_INFO.freeDeliveryThreshold
    ? 0
    : RESTAURANT_INFO.deliveryFee;

  const tax = Number((discountedSubtotal * RESTAURANT_INFO.taxRate).toFixed(2));
  const total = Number((discountedSubtotal + deliveryFee + tax).toFixed(2));

  const placeOrder = (details: OrderDetails) => {
    const orderId = `EC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      details,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLastOrder(newOrder);

    // If WhatsApp method selected or customer requested WhatsApp link
    let whatsappUrl: string | undefined;
    const itemListText = cart
      .map(
        i =>
          `• ${i.quantity}x ${i.product.name} ($${i.itemTotal.toFixed(2)})${
            i.selectedAddons.length > 0
              ? ` [Addons: ${i.selectedAddons.map(a => a.name).join(', ')}]`
              : ''
          }`
      )
      .join('\n');

    const message = `🔥 *NEW ORDER #${orderId} - EMBER & CRAFT*\n\n` +
      `*Customer:* ${details.customerName}\n` +
      `*Phone:* ${details.phone}\n` +
      `*Address:* ${details.address}, ${details.city}\n` +
      `*Type:* ${details.orderType.toUpperCase()} | *Payment:* ${details.paymentMethod.replace(/_/g, ' ').toUpperCase()}\n` +
      (details.instructions ? `*Special Notes:* ${details.instructions}\n` : '') +
      `\n*ITEMS:*\n${itemListText}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      (discountAmount > 0 ? `Discount (${appliedCoupon?.code}): -$${discountAmount.toFixed(2)}\n` : '') +
      `Delivery: ${deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}\n` +
      `Tax: $${tax.toFixed(2)}\n` +
      `*TOTAL: $${total.toFixed(2)}*\n\n` +
      `Thank you for choosing Ember & Craft!`;

    whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Clear cart and show success modal
    clearCart();
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);

    return { orderId, whatsappUrl };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        deliveryFee,
        discountAmount,
        tax,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFilterModalOpen,
        setIsFilterModalOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        dietaryFilter,
        setDietaryFilter,
        sortBy,
        setSortBy,
        lastOrder,
        placeOrder,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        feedbackToast,
        setFeedbackToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
