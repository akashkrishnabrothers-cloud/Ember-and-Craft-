import React from 'react';
import { Flame, Sparkles, Award, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { HERO_BURGER_IMG, CHICKEN_MEAL_IMG } from '../data/menuData';

export const AboutSection: React.FC = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-[#080808] text-white rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-10 lg:p-14 relative border border-stone-800 shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#F5B800]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5B800] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-[#F5B800]" />
              <span>THE EMBER &amp; CRAFT PHILOSOPHY</span>
            </div>

            <p className="font-accent italic text-[#F5B800] text-lg sm:text-xl">
              Flame-Crafted. Bold Flavor. True Craft.
            </p>

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider leading-[0.95] text-white">
              REAL FOOD. <span className="text-[#FFC928]">REAL FIRE.</span> REAL FLAVOR.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              We started Ember &amp; Craft with a fierce belief that fast-casual food should never cut corners. Every burger patty is 100% prime Angus beef smashed onto screaming 700°F cast iron, kissed by open flame, and paired with house-made sauces and artisanal brioche baked fresh every morning.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5B800] block">700°F</span>
                <span className="text-xs text-stone-300 font-medium">Cast Iron Sear</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5B800] block">100%</span>
                <span className="text-xs text-stone-300 font-medium">Prime Angus Cuts</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="font-bebas text-2xl sm:text-3xl text-[#F5B800] block">0 Min</span>
                <span className="text-xs text-stone-300 font-medium">Pre-Cooked Warmers</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToMenu}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(245,184,0,0.35)] cursor-pointer"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Composite Images */}
          <div className="lg:col-span-5 relative grid grid-cols-2 gap-3.5">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-white/10">
              <SafeImage
                src={HERO_BURGER_IMG}
                alt="Artisan Burger on Grill"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] mt-6 shadow-xl border border-white/10">
              <SafeImage
                src={CHICKEN_MEAL_IMG}
                alt="Flame-Grilled Tender Chicken"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: '🔥',
      title: 'Flame-Grilled Mastery',
      desc: 'Authentic high-heat open-flame searing locks in natural juices while imparting unmatched smoky char.'
    },
    {
      icon: '🌱',
      title: 'Farm-Fresh Ingredients',
      desc: 'Crisp hand-leafed greens, ripe vine tomatoes, and artisan buns delivered fresh from local bakeries daily.'
    },
    {
      icon: '⚡',
      title: '30-Minute Sizzle Delivery',
      desc: 'Specially engineered thermal moisture-venting boxes ensure your fries stay crispy and buns stay toasted.'
    },
    {
      icon: '👨‍🍳',
      title: 'Handcrafted With Passion',
      desc: 'Small-batch spice rubs and homemade slow-simmered sauces prepared from scratch every morning.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-bebas text-3xl sm:text-4xl text-[#080808] tracking-wide uppercase">
          Why You&apos;ll Crave Ember &amp; Craft
        </h2>
        <p className="text-xs sm:text-sm text-[#777] mt-1">
          Setting a new standard for modern fast-casual flame dining.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-[22px] bg-white border border-[#EAEAEA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#EAEAEA] flex items-center justify-center text-2xl mb-4 shadow-xs">
              {f.icon}
            </div>
            <h3 className="font-heading font-bold text-base text-[#080808] mb-1.5">
              {f.title}
            </h3>
            <p className="text-xs text-[#666] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
