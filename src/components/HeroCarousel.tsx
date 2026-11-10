import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { HERO_BURGER_IMG, CHICKEN_MEAL_IMG, SPICY_WRAP_IMG } from '../data/menuData';

interface Slide {
  id: number;
  tagline: string;
  headlineFirst: string;
  headlineHighlight: string;
  headlineLast?: string;
  description: string;
  ctaText: string;
  image: string;
  alt: string;
  badgeText: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tagline: 'Flame. Flavor. Satisfaction.',
    headlineFirst: 'GRILLED TO',
    headlineHighlight: 'PERFECTION',
    description: 'Real ingredients. Real fire. Real good.',
    ctaText: 'ORDER NOW',
    image: HERO_BURGER_IMG,
    alt: 'Flame-Grilled Cheesy Beef Burger',
    badgeText: '100% Angus Beef'
  },
  {
    id: 2,
    tagline: 'Savory. Tender. Smoked.',
    headlineFirst: 'HERB-CRUSTED',
    headlineHighlight: 'FLAME CHICKEN',
    description: 'Slow flame-charred chicken breast with golden turmeric rice & garlic whip.',
    ctaText: 'TASTE THE CRAFT',
    image: CHICKEN_MEAL_IMG,
    alt: 'Flame-Grilled Marinated Chicken Meal with Rice',
    badgeText: 'Chef’s Special'
  },
  {
    id: 3,
    tagline: 'Bold Spice. Fresh Crunch.',
    headlineFirst: 'HAND-ROLLED',
    headlineHighlight: 'CHILI WRAPS',
    description: 'Warm toasted tortillas packed with flame-grilled strips, crisp greens & smoked mayo.',
    ctaText: 'EXPLORE WRAPS',
    image: SPICY_WRAP_IMG,
    alt: 'Toasted Spicy Chicken Wrap',
    badgeText: 'Signature Recipe'
  }
];

export const HeroCarousel: React.FC<{ onOrderClick?: () => void }> = ({ onOrderClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const slide = SLIDES[currentSlide];

  const handleOrder = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      const menuSection = document.getElementById('menu');
      if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0A0A0A] text-white shadow-2xl border border-stone-800">
        {/* Subtle Warm Amber Fire Glow Backdrop */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full bg-gradient-to-tr from-[#FF6B00]/20 via-[#F5B800]/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-[#F5B800]/10 blur-2xl pointer-events-none" />

        {/* Inner Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[420px] md:min-h-[460px] lg:min-h-[500px]">
          {/* Left Text Column */}
          <div className="md:col-span-6 lg:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 z-10 flex flex-col justify-center">
            {/* Subtle Tagline in Playfair Display Italic (Matches reference image) */}
            <p className="font-accent italic text-[#F5B800] text-base sm:text-lg md:text-xl font-medium tracking-wide mb-2 sm:mb-3 drop-shadow-sm">
              {slide.tagline}
            </p>

            {/* Main Headline in Bold Bebas / Oswald */}
            <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider leading-[0.95] text-white mb-3 sm:mb-4">
              {slide.headlineFirst}{' '}
              <span className="text-[#FFC928] block sm:inline">{slide.headlineHighlight}</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-stone-300 text-sm sm:text-base font-normal max-w-sm mb-6 leading-relaxed">
              {slide.description}
            </p>

            {/* Golden CTA Button (Matches Reference: ORDER NOW with arrow) */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleOrder}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_6px_20px_rgba(245,184,0,0.35)] hover:shadow-[0_8px_25px_rgba(245,184,0,0.5)] active:scale-95 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <span className="w-6 h-6 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400">
                <Flame className="w-4 h-4 text-[#F5B800]" />
                <span>{slide.badgeText}</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (Food Photography) */}
          <div className="md:col-span-6 lg:col-span-7 relative h-64 sm:h-80 md:h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="relative w-full max-w-lg md:max-w-none h-full flex items-center justify-center">
              <div className="w-full h-56 sm:h-72 md:h-96 lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl relative group">
                <SafeImage
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle vignette border */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent md:hidden" />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots (Center bottom, matching reference dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-6 h-2 bg-[#F5B800]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Desktop Prev/Next subtle controls */}
        <div className="hidden md:flex absolute bottom-4 right-6 items-center gap-2 z-20">
          <button
            onClick={() => setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
