export type CategoryId = 'all' | 'burgers' | 'wraps' | 'chicken' | 'sides' | 'drinks' | 'desserts';

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'BESTSELLER' | "CHEF'S PICK" | 'POPULAR' | 'BEST VALUE' | 'NEW' | 'SIGNATURE';
  isSpicy?: boolean;
  isVegetarian?: boolean;
  calories?: number;
  prepTime?: string;
  ingredients?: string[];
  addons?: ProductAddon[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedAddons: ProductAddon[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  instructions?: string;
  paymentMethod: 'cash_on_delivery' | 'card' | 'whatsapp';
  orderType: 'delivery' | 'pickup';
}

export interface AppliedCoupon {
  code: string;
  discountPercentage: number;
  description: string;
}
