import { Product } from '../types';

export const HERO_BURGER_IMG = '/src/assets/images/hero_flame_burger_1794274001520.jpg';
export const CHICKEN_MEAL_IMG = '/src/assets/images/meal_grilled_chicken_1794274002169.jpg';
export const SPICY_WRAP_IMG = '/src/assets/images/wrap_spicy_chicken_1794274002706.jpg';
export const LOADED_FRIES_IMG = '/src/assets/images/side_loaded_fries_1794274003525.jpg';
export const PROMO_COMBO_IMG = '/src/assets/images/promo_burger_combo_1794274004422.jpg';

export const DEFAULT_ADDONS = [
  { id: 'cheese', name: 'Aged Cheddar Melt', price: 1.50 },
  { id: 'onions', name: 'Caramelized Sweet Onions', price: 0.90 },
  { id: 'bacon', name: 'Crisp Smoked Beef Bacon', price: 2.20 },
  { id: 'patty', name: 'Extra Flame-Grilled Patty', price: 3.80 },
  { id: 'jalapenos', name: 'Pickled Fire Jalapeños', price: 0.75 },
  { id: 'sauce', name: 'Ember Fire Relish & Aioli', price: 0.85 }
];

export const CATEGORIES = [
  { id: 'burgers', label: 'Burgers', icon: 'burger', count: 6 },
  { id: 'wraps', label: 'Wraps', icon: 'wrap', count: 4 },
  { id: 'chicken', label: 'Grilled Chicken', icon: 'chicken', count: 4 },
  { id: 'sides', label: 'Sides', icon: 'sides', count: 5 },
  { id: 'drinks', label: 'Drinks', icon: 'drinks', count: 4 },
  { id: 'desserts', label: 'Desserts', icon: 'desserts', count: 3 },
] as const;

export const MENU_PRODUCTS: Product[] = [
  // 1. Popular Picks (Featured on Home)
  {
    id: 'prod-cheesy-beef',
    name: 'Cheesy Beef Burger',
    category: 'burgers',
    description: 'Juicy grilled beef patty, double cheddar cheese, lettuce, tomato, sliced red onion & our signature secret sauce.',
    price: 10.99,
    originalPrice: 12.99,
    rating: 4.8,
    reviewCount: 1240,
    image: HERO_BURGER_IMG,
    badge: 'BESTSELLER',
    calories: 780,
    prepTime: '12-15 mins',
    ingredients: ['Prime Angus Beef', 'Toasted Sesame Brioche', 'Wisconsin Cheddar', 'Crisp Batavia Lettuce', 'Ripe Roma Tomatoes', 'House Ember Sauce'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-grilled-chicken-meal',
    name: 'Flame Grilled Chicken Meal',
    category: 'chicken',
    description: 'Flame-grilled marinated chicken breast served with aromatic turmeric herb rice, crisp side salad & whipped garlic cream sauce.',
    price: 9.99,
    originalPrice: 11.50,
    rating: 4.9,
    reviewCount: 856,
    image: CHICKEN_MEAL_IMG,
    badge: "CHEF'S PICK",
    calories: 640,
    prepTime: '15-18 mins',
    ingredients: ['Herb Marinated Chicken Breast', 'Steamed Turmeric Rice', 'Whipped Garlic Cream', 'Charred Lemon', 'Fresh Parsley & Thyme'],
    addons: [
      { id: 'extra-rice', name: 'Extra Turmeric Rice', price: 2.00 },
      { id: 'garlic-dip', name: 'Double Garlic Cream Cup', price: 1.00 },
      { id: 'pita', name: 'Warm Charcoal Flatbread', price: 1.50 }
    ]
  },
  {
    id: 'prod-spicy-chicken-wrap',
    name: 'Spicy Chicken Wrap',
    category: 'wraps',
    description: 'Spicy grilled chicken strips, crisp lettuce, melted cheddar, red onions & smoky chipotle peri-peri mayo in a toasted flatbread.',
    price: 8.49,
    originalPrice: 9.99,
    rating: 4.7,
    reviewCount: 743,
    image: SPICY_WRAP_IMG,
    badge: 'POPULAR',
    isSpicy: true,
    calories: 590,
    prepTime: '10-12 mins',
    ingredients: ['Chili Herb Chicken Breast', 'Warm Flour Tortilla', 'Aged Cheddar Melt', 'Crunchy Shredded Lettuce', 'Smoky Chipotle Mayo'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-loaded-golden-fries',
    name: 'Loaded Golden Fries',
    category: 'sides',
    description: 'Crispy skin-on french fries smothered in warm aged cheddar sauce, smoky beef bacon crumbles, diced jalapeños & BBQ drizzle.',
    price: 6.99,
    originalPrice: 7.99,
    rating: 4.9,
    reviewCount: 1420,
    image: LOADED_FRIES_IMG,
    badge: 'BEST VALUE',
    isSpicy: true,
    calories: 540,
    prepTime: '8-10 mins',
    ingredients: ['Russet Potato Fries', 'Warm Cheese Sauce', 'Smoked Beef Bacon', 'Pickled Jalapeños', 'Hickory BBQ Drizzle'],
    addons: [
      { id: 'extra-cheese', name: 'Extra Cheese Sauce Well', price: 1.25 },
      { id: 'ranch', name: 'Garlic Buttermilk Ranch', price: 0.90 }
    ]
  },

  // More Burgers
  {
    id: 'prod-classic-double',
    name: 'Smoky BBQ Double Stack',
    category: 'burgers',
    description: 'Two quarter-pound flame-charred beef patties, smoked provolone, crispy onion strings, and hickory smoke barbecue reduction.',
    price: 12.49,
    originalPrice: 14.99,
    rating: 4.9,
    reviewCount: 920,
    image: PROMO_COMBO_IMG,
    badge: 'SIGNATURE',
    calories: 940,
    prepTime: '14-16 mins',
    ingredients: ['Double Angus Beef Patties', 'Smoked Provolone', 'Crisp Onion Tanglers', 'Hickory BBQ Glaze', 'Brioche Bun'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-crispy-chicken-burger',
    name: 'Crispy Nashville Fire Chicken',
    category: 'burgers',
    description: 'Buttermilk soaked fried chicken thigh dipped in chili oil, dill pickle chips, creamy slaw, and habanero honey.',
    price: 10.49,
    rating: 4.8,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR',
    isSpicy: true,
    calories: 720,
    prepTime: '12-14 mins',
    ingredients: ['Crispy Chicken Thigh', 'Nashville Chili Dip', 'Dill Pickles', 'Cabbage Slaw', 'Toasted Brioche'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-truffle-mushroom-burger',
    name: 'Truffle Mushroom Smash',
    category: 'burgers',
    description: 'Charred beef patty, sautéed balsamic cremini mushrooms, Swiss cheese, roasted garlic truffle aioli, and wild baby arugula.',
    price: 11.99,
    rating: 4.8,
    reviewCount: 640,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    badge: "CHEF'S PICK",
    calories: 760,
    prepTime: '12-15 mins',
    ingredients: ['Angus Beef', 'Cremini Mushrooms', 'Swiss Cheese', 'Black Truffle Aioli', 'Arugula'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-green-avocado-veg',
    name: 'Smoked Halloumi & Avocado',
    category: 'burgers',
    description: 'Thick grilled Cypriot halloumi slab, smashed avocado, fire-roasted bell peppers, sun-dried tomato pesto, and fresh rocket.',
    price: 10.29,
    rating: 4.7,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    isVegetarian: true,
    calories: 610,
    prepTime: '10-12 mins',
    ingredients: ['Grilled Halloumi', 'Fresh Avocado', 'Roasted Red Pepper', 'Sun-Dried Tomato Pesto', 'Brioche Bun'],
    addons: DEFAULT_ADDONS
  },

  // Wraps
  {
    id: 'prod-fajita-steak-wrap',
    name: 'Flame Steak & Chimichurri Wrap',
    category: 'wraps',
    description: 'Seared flank steak strips, charred bell peppers, caramelized sweet onions, mozzarella, and herb chimichurri drizzle.',
    price: 9.49,
    rating: 4.8,
    reviewCount: 489,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    calories: 650,
    prepTime: '10-12 mins',
    ingredients: ['Seared Flank Steak', 'Sweet Bell Peppers', 'Oaxaca Mozzarella', 'Fresh Chimichurri', 'Soft Wheat Tortilla'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-falafel-wrap',
    name: 'Golden Herb Falafel Wrap',
    category: 'wraps',
    description: 'Crisp spiced chickpea falafel patties, cucumber tomato salad, pickled turnip ribbons, fresh mint, and creamy tahini drizzle.',
    price: 7.99,
    rating: 4.6,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 520,
    prepTime: '8-10 mins',
    ingredients: ['Handmade Falafel', 'Mint Tahini Sauce', 'Persian Cucumber', 'Pickled Turnips', 'Warm Flatbread'],
    addons: DEFAULT_ADDONS
  },

  // Chicken
  {
    id: 'prod-half-charred-chicken',
    name: 'Peri-Peri Half Flame Chicken',
    category: 'chicken',
    description: 'Half bone-in chicken slow roasted over open flames, basted with fiery lemon-herb peri-peri sauce, served with charred corn cob.',
    price: 13.99,
    rating: 4.9,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    badge: 'BESTSELLER',
    isSpicy: true,
    calories: 820,
    prepTime: '18-20 mins',
    ingredients: ['Charred Half Chicken', 'Peri-Peri Glaze', 'Grilled Sweet Corn', 'Garlic Butter Sauce'],
    addons: DEFAULT_ADDONS
  },
  {
    id: 'prod-chicken-tenders-box',
    name: 'Smoked Honey Glazed Tenders',
    category: 'chicken',
    description: 'Five hand-breaded crispy tenderloins tossed in spicy hot honey glaze, served with house pickles and smoky dip.',
    price: 8.99,
    rating: 4.8,
    reviewCount: 670,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    calories: 680,
    prepTime: '10-12 mins',
    ingredients: ['100% White Meat Chicken', 'Hot Honey Glaze', 'House Dill Pickles', 'Buttermilk Dip'],
    addons: DEFAULT_ADDONS
  },

  // Sides
  {
    id: 'prod-classic-fries',
    name: 'Sea Salt & Rosemary Crispy Fries',
    category: 'sides',
    description: 'Hand-cut russet potatoes fried to golden crunch, tossed with fresh rosemary needles and flaked sea salt.',
    price: 4.49,
    rating: 4.8,
    reviewCount: 830,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 380,
    prepTime: '6-8 mins',
    ingredients: ['Russet Potatoes', 'Crushed Maldon Sea Salt', 'Fresh Rosemary', 'Spiced Ember Ketchup']
  },
  {
    id: 'prod-onion-rings',
    name: 'Craft Beer-Battered Onion Rings',
    category: 'sides',
    description: 'Colossal sweet Spanish onions dipped in dark ale batter and fried extra crisp, served with chipotle dipping sauce.',
    price: 5.49,
    rating: 4.7,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1639024471287-03521375970b?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 420,
    prepTime: '8-10 mins',
    ingredients: ['Spanish Sweet Onions', 'Craft Ale Batter', 'Smoked Paprika', 'Chipotle Remoulade']
  },
  {
    id: 'prod-mac-cheese-bites',
    name: 'Truffle Mac & Cheese Bites',
    category: 'sides',
    description: 'Six crispy panko-crusted spheres filled with creamy four-cheese macaroni and white truffle oil, served with marinara.',
    price: 6.49,
    rating: 4.9,
    reviewCount: 640,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR',
    isVegetarian: true,
    calories: 490,
    prepTime: '8-10 mins',
    ingredients: ['Elbow Pasta', 'Four Cheese Fondue', 'Truffle Essence', 'Japanese Panko Crust']
  },

  // Drinks
  {
    id: 'prod-craft-citrus-lemonade',
    name: 'Smoked Blood Orange Lemonade',
    category: 'drinks',
    description: 'Fresh squeezed Sicilian lemons, charred blood orange purée, raw cane sugar, and fresh crushed mint leaves over pebble ice.',
    price: 4.25,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 140,
    prepTime: '3-5 mins',
    ingredients: ['Fresh Lemon Juice', 'Charred Blood Orange', 'Raw Cane Sugar', 'Fresh Mint', 'Filtered Pebble Ice']
  },
  {
    id: 'prod-vanilla-malt-shake',
    name: 'Salted Caramel Bourbon Shake',
    category: 'drinks',
    description: 'Rich Madagascar vanilla bean custard blended with warm dark salted caramel, malted milk, and crowned with whipped cream.',
    price: 5.95,
    rating: 4.9,
    reviewCount: 780,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    badge: 'BESTSELLER',
    isVegetarian: true,
    calories: 580,
    prepTime: '4-6 mins',
    ingredients: ['Madagascar Vanilla Custard', 'House Salted Caramel', 'Malted Barley', 'Whipped Cream']
  },
  {
    id: 'prod-fountain-cola',
    name: 'Signature Craft Cane Cola',
    category: 'drinks',
    description: 'Artisanal fountain cola crafted with pure Louisiana cane sugar, kola nut extract, citrus peel, and spicy cinnamon undertones.',
    price: 3.25,
    rating: 4.7,
    reviewCount: 610,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 160,
    prepTime: '2 mins',
    ingredients: ['Purified Carbonated Water', 'Pure Cane Sugar', 'Natural Kola Extract', 'Fresh Lime Wedge']
  },

  // Desserts
  {
    id: 'prod-lava-cake',
    name: 'Molten Belgian Chocolate Skillet',
    category: 'desserts',
    description: 'Warm dark chocolate cake with an erupting ganache core, dusted with gold cocoa dust and paired with vanilla bean gelato.',
    price: 6.95,
    rating: 4.9,
    reviewCount: 910,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    badge: "CHEF'S PICK",
    isVegetarian: true,
    calories: 520,
    prepTime: '10-12 mins',
    ingredients: ['72% Belgian Dark Chocolate', 'Sweet Cream Butter', 'Madagascar Vanilla Gelato', 'Edible Gold Dust']
  },
  {
    id: 'prod-churros-basket',
    name: 'Golden Cinnamon Ember Churros',
    category: 'desserts',
    description: 'Four warm, ridged Spanish churros dusted in Saigon cinnamon sugar, served with warm dulce de leche and chocolate dip cups.',
    price: 5.95,
    rating: 4.8,
    reviewCount: 620,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    calories: 460,
    prepTime: '6-8 mins',
    ingredients: ['Crisp Choux Pastry', 'Saigon Cinnamon Sugar', 'Warm Dulce De Leche', 'Dark Chocolate Ganache']
  }
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Food & Dining Critic',
    rating: 5,
    text: 'The char on the Cheesy Beef Burger is extraordinary. You can taste the real open flame without drying out the patty. The brioche bun is pillowy and holds up to the last bite.',
    date: 'Yesterday'
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'Verified Customer',
    rating: 5,
    text: 'Ordered the Weekend Special for four. Delivered in exactly 26 minutes, piping hot in thermal packaging. The loaded fries with bacon and jalapenos are addictive!',
    date: '3 days ago'
  },
  {
    id: 'rev-3',
    name: 'David Sterling',
    role: 'Executive Chef & Regular',
    rating: 5,
    text: 'Ember & Craft sets the standard for modern fast-casual. Clean, premium packaging, honest quality ingredients, and the WhatsApp checkout is super convenient.',
    date: '1 week ago'
  }
];

export const RESTAURANT_INFO = {
  name: 'Ember & Craft',
  tagline: 'Flame-Crafted Perfection',
  address: '450 Foundry Blvd, Fire District, CA 94107',
  phone: '+1 (555) 782-3473',
  whatsappNumber: '15557823473',
  email: 'orders@emberandcraft.com',
  hours: 'Mon – Sun: 11:00 AM – 11:30 PM',
  deliveryTime: '25 – 35 Mins',
  freeDeliveryThreshold: 30.00,
  deliveryFee: 2.99,
  taxRate: 0.08
};
