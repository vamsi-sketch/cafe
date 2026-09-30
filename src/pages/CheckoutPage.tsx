import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Utensils, 
  Package, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  CreditCard,
  QrCode,
  Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTax, 
    cartTotal, 
    placeOrder, 
    navigateTo 
  } = useApp();

  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway'>('Dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMode, setPaymentMode] = useState<'counter' | 'upi'>('counter');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Nothing to Checkout</h2>
        <p className="text-xs text-[#7C6656]">Your cart is currently empty. Please add items to proceed.</p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-6 py-2.5 rounded-full bg-[#3D2314] text-white text-xs font-semibold"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your contact phone number';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    if (orderType === 'Dine-in' && !tableNumber.trim()) {
      errs.tableNumber = 'Please specify your table number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger festive celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3D2314', '#4A6B53', '#E6C9A8', '#D8B48F']
        });
      } catch (e) {
        // Safe fallback if canvas is not ready
      }

      placeOrder(
        { name: fullName.trim(), phone: phone.trim(), email: email.trim() },
        orderType,
        orderType === 'Dine-in' ? tableNumber : undefined,
        specialInstructions
      );
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-semibold text-[#7C6656] hover:text-[#2C1810] flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </button>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#7C6656]">
          Experience contactless ordering. Freshly prepared and delivered right to your table or counter.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer & Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Toggle */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#7C6656] block">
              1. Choose Order Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="order-type-dine-in-btn"
                onClick={() => setOrderType('Dine-in')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  orderType === 'Dine-in'
                    ? 'border-[#3D2314] bg-[#FAF4ED] text-[#2C1810] shadow-xs font-bold'
                    : 'border-[#EDE4DC] text-[#6B5749] hover:bg-[#FAF7F2]'
                }`}
              >
                <Utensils className="w-5 h-5 text-[#3D2314]" />
                <span className="text-sm">Dine-In</span>
                <span className="text-[10px] text-[#7C6656] font-normal">Served fresh to your café table</span>
              </button>

              <button
                type="button"
                id="order-type-takeaway-btn"
                onClick={() => setOrderType('Takeaway')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  orderType === 'Takeaway'
                    ? 'border-[#3D2314] bg-[#FAF4ED] text-[#2C1810] shadow-xs font-bold'
                    : 'border-[#EDE4DC] text-[#6B5749] hover:bg-[#FAF7F2]'
                }`}
              >
                <Package className="w-5 h-5 text-[#4A6B53]" />
                <span className="text-sm">Takeaway</span>
                <span className="text-[10px] text-[#7C6656] font-normal">Eco-packaged for quick pickup</span>
              </button>
            </div>

            {/* Table Number if Dine-in */}
            {orderType === 'Dine-in' && (
              <div className="pt-2 animate-fadeIn">
                <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                  Table Number <span className="text-red-500">*</span>
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                >
                  <option value="Table 1">Table 1 · Window Corner</option>
                  <option value="Table 2">Table 2 · Conservatory Garden</option>
                  <option value="Table 3">Table 3 · Reading Lounge</option>
                  <option value="Table 4">Table 4 · Outdoor Terrace</option>
                  <option value="Table 5">Table 5 · Main Bar Front</option>
                  <option value="Table 6">Table 6 · Quiet Pod</option>
                  <option value="Table 7">Table 7 · Booth Seating</option>
                  <option value="Table 8">Table 8 · Mezzanine Loft</option>
                </select>
                {errors.tableNumber && (
                  <p className="text-xs text-red-500 mt-1">{errors.tableNumber}</p>
                )}
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[#7C6656] block">
              2. Guest Contact Information
            </label>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#2C1810] block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Krishnan"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#2C1810] focus:outline-none ${
                    errors.fullName ? 'border-red-400' : 'border-[#D9CFC7] focus:border-[#3D2314]'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#2C1810] block mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#2C1810] focus:outline-none ${
                      errors.phone ? 'border-red-400' : 'border-[#D9CFC7] focus:border-[#3D2314]'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2C1810] block mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#2C1810] focus:outline-none ${
                      errors.email ? 'border-red-400' : 'border-[#D9CFC7] focus:border-[#3D2314]'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C1810] block mb-1">
                  Special Instructions / Dietary Notes (Optional)
                </label>
                <textarea
                  id="checkout-instructions-input"
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Oat milk preferred, less sweet, or extra warm please..."
                  className="w-full px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                />
              </div>
            </div>
          </div>

          {/* Demo Payment Choice */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7C6656]">
                3. Demo Payment Settlement
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE2D8] text-[#543F33]">
                Demo Mode Only
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMode('counter')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  paymentMode === 'counter'
                    ? 'border-[#3D2314] bg-[#FAF4ED] text-[#2C1810]'
                    : 'border-[#EDE4DC] text-[#6B5749] hover:bg-[#FAF7F2]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#3D2314]" />
                <div>
                  <p className="text-xs font-bold">Pay at Counter / Table</p>
                  <p className="text-[10px] text-[#7C6656]">Cash, UPI, or Credit Card upon service</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  paymentMode === 'upi'
                    ? 'border-[#3D2314] bg-[#FAF4ED] text-[#2C1810]'
                    : 'border-[#EDE4DC] text-[#6B5749] hover:bg-[#FAF7F2]'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#4A6B53]" />
                <div>
                  <p className="text-xs font-bold">UPI / QR Demo</p>
                  <p className="text-[10px] text-[#7C6656]">Simulate direct instant payment</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EDE4DC] shadow-md space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
            <h3 className="font-serif text-xl font-bold text-[#2C1810]">
              Order Summary
            </h3>
            <span className="text-xs text-[#7C6656]">{orderType}</span>
          </div>

          {/* List of items in summary */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(({ menuItem, quantity }) => (
              <div key={menuItem.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#3D2314]">{quantity}x</span>
                  <span className="text-[#2C1810] font-medium">{menuItem.name}</span>
                </div>
                <span className="font-semibold text-[#2C1810]">
                  ₹{(menuItem.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EDE4DC] space-y-2 text-xs">
            <div className="flex justify-between text-[#6B5749]">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#6B5749]">
              <span>5% GST</span>
              <span>₹{cartTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base text-[#2C1810] pt-2 border-t border-[#F2ECE6]">
              <span>Grand Total</span>
              <span className="text-[#3D2314]">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            id="place-order-submit-btn"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] disabled:bg-stone-400 text-[#FAF7F2] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing Order...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E6C9A8]" />
                Place Order (₹{cartTotal.toLocaleString('en-IN')})
              </span>
            )}
          </button>

          <div className="p-3 rounded-xl bg-[#FAF4ED] text-[11px] text-[#7C6656] text-center border border-[#E8DFD8]">
            <p>Your order directly syncs with our in-house Barista kitchen display.</p>
          </div>
        </div>
      </form>
    </div>
  );
};
