import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingCartButton: React.FC = () => {
  const { cartCount, cartTotal, navigateTo, currentPage } = useApp();

  if (cartCount === 0 || currentPage === 'cart' || currentPage === 'checkout' || currentPage === 'order-success') {
    return null;
  }

  return (
    <aside
      id="floating-cart-badge"
      aria-label="Floating cart preview"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md animate-bounce-subtle"
    >
      <button
        onClick={() => navigateTo('cart')}
        className="w-full py-3.5 px-5 rounded-2xl bg-[#3D2314] hover:bg-[#2B180D] text-[#FAF7F2] shadow-2xl border border-[#5E3821] flex items-center justify-between transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-[#52301B]">
            <ShoppingBag className="w-5 h-5 text-[#E6C9A8]" />
            <span className="absolute -top-1 -right-1 bg-[#4A6B53] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-[#C5B3A5]">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
            </p>
            <p className="text-sm font-bold text-white tracking-wide">
              ₹{cartTotal.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E6C9A8] bg-[#2E1A0F] px-3.5 py-1.5 rounded-xl border border-[#52301B]">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </aside>
  );
};
