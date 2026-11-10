import React, { useState } from 'react';
import { X, CreditCard, Banknote, MessageCircle, ShieldCheck, MapPin, Phone, User, Mail, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    tax,
    total,
    appliedCoupon,
    placeOrder
  } = useCart();

  const [formData, setFormData] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: 'San Francisco',
    instructions: '',
    paymentMethod: 'cash_on_delivery',
    orderType: 'delivery'
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid phone number required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email required';

    if (formData.orderType === 'delivery') {
      if (!formData.address.trim()) newErrors.address = 'Street address is required for delivery';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (formData.paymentMethod === 'card') {
      if (cardDetails.cardNumber.replace(/\s/g, '').length < 15) newErrors.cardNumber = 'Enter valid 16-digit card number';
      if (!cardDetails.expiry || !cardDetails.expiry.includes('/')) newErrors.expiry = 'MM/YY required';
      if (cardDetails.cvc.length < 3) newErrors.cvc = 'CVC required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const { whatsappUrl } = placeOrder(formData);
      setIsSubmitting(false);

      if (formData.paymentMethod === 'whatsapp' && whatsappUrl) {
        window.open(whatsappUrl, '_blank');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Surface */}
      <div className="relative bg-white rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden z-10 my-6 border border-[#EAEAEA] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAF8]">
          <div>
            <h3 className="font-bebas text-2xl text-[#080808] tracking-wide leading-none">
              Checkout &amp; Delivery Details
            </h3>
            <p className="text-xs text-[#777] mt-1">
              Flame-cooked fresh and delivered to your doorstep in 25–35 minutes.
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {/* Order Type Toggle (Delivery vs Store Pickup) */}
          <div className="grid grid-cols-2 gap-2 bg-[#F2F2F0] p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, orderType: 'delivery' })}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                formData.orderType === 'delivery'
                  ? 'bg-white text-[#080808] shadow-sm'
                  : 'text-[#666] hover:text-[#080808]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#F5B800]" />
              Home Delivery
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, orderType: 'pickup' })}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                formData.orderType === 'pickup'
                  ? 'bg-white text-[#080808] shadow-sm'
                  : 'text-[#666] hover:text-[#080808]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
              Store Counter Pickup
            </button>
          </div>

          {/* Customer Personal Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#F5B800]" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Smith"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                    errors.customerName ? 'border-red-500 bg-red-50/30' : 'border-stone-300 focus:border-[#F5B800]'
                  }`}
                />
                {errors.customerName && <p className="text-[10px] text-red-500 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-300 focus:border-[#F5B800]'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#555] mb-1">Email Address (for Receipt) *</label>
                <input
                  type="email"
                  placeholder="e.g. jordan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                    errors.email ? 'border-red-500 bg-red-50/30' : 'border-stone-300 focus:border-[#F5B800]'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address (if delivery) */}
          {formData.orderType === 'delivery' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5B800]" />
                Delivery Address
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#555] mb-1">Street Address, Apt / Suite *</label>
                  <input
                    type="text"
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                      errors.address ? 'border-red-500 bg-red-50/30' : 'border-stone-300 focus:border-[#F5B800]'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">City *</label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#F5B800] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">Gate / Entry Code</label>
                    <input
                      type="text"
                      placeholder="e.g. #4829"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#F5B800] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555] mb-1">Driver Delivery Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Please leave on the porch and ring bell"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#F5B800] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-3">
              Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-[#080808] bg-stone-50 ring-2 ring-[#080808]'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span className={`w-3.5 h-3.5 rounded-full border-2 ${formData.paymentMethod === 'cash_on_delivery' ? 'bg-[#080808] border-[#080808]' : 'border-stone-300'}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#080808]">Cash on Delivery</p>
                  <p className="text-[10px] text-[#777] mt-0.5">Pay in cash or debit upon arrival</p>
                </div>
              </button>

              {/* Online Card Payment */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#080808] bg-stone-50 ring-2 ring-[#080808]'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span className={`w-3.5 h-3.5 rounded-full border-2 ${formData.paymentMethod === 'card' ? 'bg-[#080808] border-[#080808]' : 'border-stone-300'}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#080808]">Credit / Debit Card</p>
                  <p className="text-[10px] text-[#777] mt-0.5">Secure 256-bit encrypted checkout</p>
                </div>
              </button>

              {/* Direct WhatsApp Ordering */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  formData.paymentMethod === 'whatsapp'
                    ? 'border-[#080808] bg-emerald-50/50 ring-2 ring-emerald-600'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span className={`w-3.5 h-3.5 rounded-full border-2 ${formData.paymentMethod === 'whatsapp' ? 'bg-emerald-600 border-emerald-600' : 'border-stone-300'}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#080808]">WhatsApp Order</p>
                  <p className="text-[10px] text-[#777] mt-0.5">Direct chat confirmation with kitchen</p>
                </div>
              </button>
            </div>

            {/* Credit Card Details Box (If card selected) */}
            {formData.paymentMethod === 'card' && (
              <div className="mt-3.5 p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAEA] space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold text-[#080808]">Payment Gateway (Demo / Hostinger Ready)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                    SSL 256-BIT
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 8821)"
                    maxLength={19}
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono bg-white focus:outline-none ${
                      errors.cardNumber ? 'border-red-500' : 'border-stone-300 focus:border-[#F5B800]'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono bg-white focus:outline-none ${
                      errors.expiry ? 'border-red-500' : 'border-stone-300 focus:border-[#F5B800]'
                    }`}
                  />
                  <input
                    type="password"
                    placeholder="CVC (3 digits)"
                    maxLength={4}
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono bg-white focus:outline-none ${
                      errors.cvc ? 'border-red-500' : 'border-stone-300 focus:border-[#F5B800]'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Order Items Review */}
          <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#EAEAEA] text-xs">
            <div className="flex items-center justify-between font-bold text-[#080808] mb-2">
              <span>Order Summary ({cart.length} items)</span>
              <span className="font-mono text-sm">${total.toFixed(2)}</span>
            </div>
            <div className="text-stone-500 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-stone-800">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-mono text-stone-800">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-mono text-stone-800">${tax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-full bg-[#F5B800] hover:bg-[#FFC928] text-[#080808] font-bold text-sm tracking-wider uppercase flex items-center justify-between shadow-[0_6px_20px_rgba(245,184,0,0.4)] transition-all transform active:scale-95 cursor-pointer disabled:opacity-60"
          >
            <span>
              {isSubmitting
                ? 'Processing Your Order...'
                : formData.paymentMethod === 'whatsapp'
                ? 'Send Order via WhatsApp'
                : 'Confirm & Place Order'}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-base">${total.toFixed(2)}</span>
              <span className="w-6 h-6 rounded-full bg-[#080808] text-[#F5B800] flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
