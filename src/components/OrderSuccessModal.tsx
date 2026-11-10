import React from 'react';
import { CheckCircle2, Clock, MapPin, MessageCircle, ArrowRight, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const OrderSuccessModal: React.FC = () => {
  const { isSuccessModalOpen, setIsSuccessModalOpen, lastOrder } = useCart();

  if (!isSuccessModalOpen || !lastOrder) return null;

  const handleWhatsAppContact = () => {
    const msg = `Hi Ember & Craft! I am checking on my Order #${lastOrder.orderId} placed at ${lastOrder.date}.`;
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      {/* Modal Surface */}
      <div className="relative bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden my-6 border border-[#EAEAEA] flex flex-col">
        {/* Top Celebration Banner */}
        <div className="bg-[#080808] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5B800]/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-[#F5B800] text-[#080808] flex items-center justify-center mx-auto mb-3 shadow-[0_0_24px_rgba(245,184,0,0.5)]">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <p className="font-accent italic text-[#F5B800] text-sm">Order Confirmed &amp; Sizzling</p>
          <h2 className="font-bebas text-3xl sm:text-4xl uppercase tracking-wider text-white mt-0.5">
            Thank You, {lastOrder.details.customerName}!
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Order Reference: <strong className="text-white font-mono">{lastOrder.orderId}</strong>
          </p>
        </div>

        {/* Live Status Tracker */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAEA]">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-[#080808] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#F5B800]" />
                Kitchen Preparation Status
              </span>
              <span className="text-[#F5B800] font-bold bg-[#080808] px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                Flame Grilling
              </span>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-semibold text-[#555]">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1 text-[11px]">✓</div>
                <span>Received</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#F5B800] text-[#080808] flex items-center justify-center mb-1 text-[11px] font-bold animate-pulse">🔥</div>
                <span className="text-[#080808] font-bold">Grilling</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-1 text-[11px]">3</div>
                <span>Packaging</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-1 text-[11px]">4</div>
                <span>Delivery</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex items-center justify-between text-xs text-[#666]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F5B800]" />
                Estimated Arrival: <strong>25 – 35 Mins</strong>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-stone-400" />
                {lastOrder.details.city}
              </span>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-2.5">
              Receipt Summary
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-[#444]">
                  <div>
                    <span className="font-bold text-[#080808]">{item.quantity}x</span> {item.product.name}
                    {item.selectedAddons.length > 0 && (
                      <span className="text-[10px] text-[#777] block">
                        ({item.selectedAddons.map(a => a.name).join(', ')})
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[#080808] tabular-nums font-medium">
                    ${item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#EAEAEA] flex items-center justify-between font-bold text-sm text-[#080808]">
              <span>Paid via {lastOrder.details.paymentMethod.replace(/_/g, ' ').toUpperCase()}</span>
              <span className="font-mono text-base tabular-nums">${lastOrder.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleWhatsAppContact}
              className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat With Kitchen on WhatsApp
            </button>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 px-4 rounded-full bg-[#080808] hover:bg-[#222] text-[#F5B800] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Back to Home
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
