import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryNav } from './components/CategoryNav';
import { PopularPicks } from './components/PopularPicks';
import { PromoBanner } from './components/PromoBanner';
import { MenuSection } from './components/MenuSection';
import { AboutSection, WhyChooseUs } from './components/AboutSection';
import {
  TestimonialsSection,
  NewsletterSection,
  ContactSection,
  Footer
} from './components/ReviewsAndContact';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SearchFilterModal } from './components/SearchFilterModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { feedbackToast } = useCart();
  if (!feedbackToast) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-top-4 duration-300 pointer-events-none">
      <div className="bg-[#080808] text-white px-4 py-2.5 rounded-full shadow-2xl border border-[#F5B800]/50 flex items-center gap-2.5 text-xs sm:text-sm font-medium">
        <div className="w-5 h-5 rounded-full bg-[#F5B800] text-[#080808] flex items-center justify-center font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
        </div>
        <span>{feedbackToast}</span>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#151515] flex flex-col antialiased pb-16 md:pb-0">
      {/* Toast Notification */}
      <ToastNotification />

      {/* Sticky Header & Navigation */}
      <Header />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Food Photography Carousel */}
        <HeroCarousel />

        {/* 2. Circular Food Category Navigation (Exact Match to Reference) */}
        <CategoryNav />

        {/* 3. Popular Picks Section (Exact Match to Reference Cards) */}
        <PopularPicks />

        {/* 4. Weekend Special 20% OFF Banner (Exact Match to Reference) */}
        <PromoBanner />

        {/* 5. Complete Food Menu with Category Tabs & Search Filters */}
        <MenuSection />

        {/* 6. Why Choose Us (4 Pillar Blocks) */}
        <WhyChooseUs />

        {/* 7. About Ember & Craft (Brand Story & 700°F Flame Seared Craft) */}
        <AboutSection />

        {/* 8. Customer Testimonials */}
        <TestimonialsSection />

        {/* 9. Newsletter Subscription */}
        <NewsletterSection />

        {/* 10. Smokehouse Location, Hours, & Interactive Route Map */}
        <ContactSection />
      </main>

      {/* Dark Charcoal Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <SearchFilterModal />

      {/* Fixed Mobile Bottom Navigation (Hidden on Desktop) */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
