import React, { useState } from 'react';
import { Star, Mail, Send, CheckCircle2, Phone, Clock, MapPin, MessageCircle, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/menuData';
import { Logo } from './Header';
import { useCart } from '../context/CartContext';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#EAEAEA] gap-2">
        <div>
          <span className="font-bebas tracking-widest text-[#F5B800] text-sm uppercase">COMMUNITY FLAVOR</span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-[#080808] tracking-wide uppercase">
            What Food Lovers Are Saying
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#777]">
          <div className="flex text-[#F5B800]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#F5B800] stroke-[#F5B800]" />
            ))}
          </div>
          <span className="font-bold text-[#080808]">4.9 / 5.0</span>
          <span>from 3,400+ satisfied diners</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-5 sm:p-6 rounded-[22px] bg-white border border-[#EAEAEA] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-[#F5B800]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5B800] stroke-[#F5B800]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#888]">{t.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#444] italic leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2F2F0] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#080808] text-[#F5B800] font-bold text-xs flex items-center justify-center font-bebas">
                {t.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#080808]">{t.name}</h4>
                <p className="text-[11px] text-[#888]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { applyCoupon } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setSubmitted(true);
    applyCoupon('FIRSTBITE');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#080808] text-white p-6 sm:p-10 lg:p-12 border border-stone-800 shadow-2xl">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[#F5B800]/10 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span className="font-bebas tracking-widest text-[#F5B800] text-sm uppercase block mb-1">
            SECRET MENU &amp; EXCLUSIVE PERKS
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-white">
            GET THE GOOD STUFF FIRST
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 mb-6 max-w-md mx-auto">
            Be the first to discover new secret flame items, limited seasonal cuts, and unlock an instant <strong className="text-[#FFC928]">15% discount</strong> voucher.
          </p>

          {submitted ? (
            <div className="bg-white/10 backdrop-blur-md border border-[#F5B800]/40 rounded-2xl p-4 text-center animate-in fade-in">
              <CheckCircle2 className="w-8 h-8 text-[#F5B800] mx-auto mb-1.5" />
              <h3 className="font-bebas text-xl text-white">You&apos;re On The VIP List!</h3>
              <p className="text-xs text-stone-300 mt-0.5">
                We auto-applied coupon <span className="font-mono text-[#F5B800] font-bold">FIRSTBITE</span> (15% OFF) to your bag!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <p className="text-[11px] text-stone-400">
                No spam. Unsubscribe anytime with a single click.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-bebas tracking-widest text-[#F5B800] text-sm uppercase">LOCATION &amp; HOURS</span>
            <h2 className="font-bebas text-3xl sm:text-4xl text-[#080808] tracking-wide uppercase">
              Visit The Smokehouse
            </h2>
            <p className="text-xs sm:text-sm text-[#777] mt-1">
              Dine in with us, order takeout at our rapid pickup counter, or order delivery online.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EAEAEA]">
              <div className="w-10 h-10 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#080808]">Store Address</h3>
                <p className="text-xs text-[#666] mt-0.5">{RESTAURANT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EAEAEA]">
              <div className="w-10 h-10 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#080808]">Kitchen Hours</h3>
                <p className="text-xs text-[#666] mt-0.5">{RESTAURANT_INFO.hours}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">● Open Now for Takeout &amp; Delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EAEAEA]">
              <div className="w-10 h-10 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#080808]">Phone &amp; WhatsApp</h3>
                <p className="text-xs text-[#666] mt-0.5">{RESTAURANT_INFO.phone}</p>
                <p className="text-xs text-[#666]">{RESTAURANT_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Ember%20%26%20Craft%2C%20I%20would%20like%20to%20inquire%20about%20a%20reservation%20or%20catering.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>

        {/* Right Interactive Location / Map Card */}
        <div className="lg:col-span-7 bg-white rounded-[28px] border border-[#EAEAEA] shadow-md overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base text-[#080808]">San Francisco Flagship Kitchen</h3>
              <p className="text-xs text-[#777]">SOMA Fire District · Live Real-Time Route</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F5B800] bg-[#080808] px-3 py-1 rounded-full">
              ETA: 28 MINS
            </span>
          </div>

          {/* Stylized Modern Map Graphic Placeholder with Real Landmark Pin */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-[#1A1A1A] overflow-hidden flex items-center justify-center border border-stone-800">
            {/* Grid Pattern Backdrop */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#F5B800 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Simulated Road Lines */}
            <svg className="absolute inset-0 w-full h-full stroke-stone-700/60 stroke-[3] fill-none">
              <path d="M0,100 Q150,120 300,70 T600,160" />
              <path d="M100,0 L140,400" />
              <path d="M350,0 Q320,180 400,400" />
              <path d="M0,250 C180,220 280,320 600,280" strokeDasharray="6,6" stroke="#F5B800" strokeWidth="2" />
            </svg>

            {/* Glowing Restaurant Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5B800] text-[#080808] flex items-center justify-center shadow-[0_0_24px_rgba(245,184,0,0.8)] animate-bounce">
                <MapPin className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="mt-2 px-3 py-1 bg-black/90 backdrop-blur-sm border border-[#F5B800] rounded-full text-white text-xs font-bold shadow-lg">
                Ember &amp; Craft Smokehouse
              </div>
            </div>

            {/* Google Maps External Button */}
            <div className="absolute bottom-3 right-3 z-10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white text-[#080808] hover:bg-[#F5B800] text-xs font-bold shadow-md transition-colors inline-block"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151515] text-[#FAFAF8] pt-12 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="md" />
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Crafting premium flame-grilled burgers, tender chicken meals, and signature sides using open fire, aged cast iron, and 100% prime ingredients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#F5B800] hover:text-[#080808] text-stone-300 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#F5B800] hover:text-[#080808] text-stone-300 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#F5B800] hover:text-[#080808] text-stone-300 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#home" className="hover:text-[#F5B800] transition-colors">Home Experience</a></li>
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Full Menu Catalog</a></li>
              <li><a href="#popular" className="hover:text-[#F5B800] transition-colors">Popular Picks</a></li>
              <li><a href="#offers" className="hover:text-[#F5B800] transition-colors">Weekend Specials (20% OFF)</a></li>
              <li><a href="#about" className="hover:text-[#F5B800] transition-colors">Our Smokehouse Story</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Menu Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Flame-Seared Burgers</a></li>
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Herb Grilled Chicken</a></li>
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Toasted Chili Wraps</a></li>
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Crispy Loaded Sides</a></li>
              <li><a href="#menu" className="hover:text-[#F5B800] transition-colors">Craft Lemonades &amp; Malts</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Smokehouse HQ
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>{RESTAURANT_INFO.address}</p>
              <p className="text-white font-medium">{RESTAURANT_INFO.phone}</p>
              <p>{RESTAURANT_INFO.hours}</p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[#F5B800]/10 text-[#F5B800] font-mono text-[11px] font-bold">
                  Hostinger Deploy Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Ember &amp; Craft Inc. All rights reserved. Original Fast-Casual Restaurant.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-300 hover:text-[#F5B800] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
