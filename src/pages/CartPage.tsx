import React from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Coffee, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartTax, 
    cartTotal, 
    cartCount,
    navigateTo 
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#EDE5DD] text-[#7C6656] mx-auto flex items-center justify-center shadow-inner">
          <ShoppingBag className="w-12 h-12 text-[#3D2314]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-[#7C6656] max-w-sm mx-auto">
            You haven't added any aromatic coffee or savory bites yet. Explore our handcrafted café menu!
          </p>
        </div>
        <button
          id="cart-empty-explore-btn"
          onClick={() => navigateTo('menu')}
          className="px-8 py-3.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-sm font-semibold shadow-md transition-all inline-flex items-center gap-2"
        >
          <Coffee className="w-4 h-4 text-[#E6C9A8]" />
          <span>Explore Café Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-4">
        <div>
          <button
            onClick={() => navigateTo('menu')}
            className="text-xs font-semibold text-[#7C6656] hover:text-[#2C1810] flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Ordering</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            Your Café Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ menuItem, quantity }) => (
            <div
              key={menuItem.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE4DC] shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-[#EDE4DC]"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#7C6656] uppercase tracking-wider">
                    {menuItem.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C1810]">
                    {menuItem.name}
                  </h3>
                  <p className="text-xs text-[#7C6656] font-medium">
                    ₹{menuItem.price} each
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F2ECE6]">
                {/* Stepper */}
                <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 rounded-xl border border-[#DECFC3]">
                  <button
                    onClick={() => updateCartQuantity(menuItem.id, quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-white text-[#3D2314] hover:bg-[#EFE9E2] border border-[#DECFC3] flex items-center justify-center transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#2C1810]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(menuItem.id, quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-[#3D2314] text-white hover:bg-[#25150B] flex items-center justify-center transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[70px]">
                  <span className="text-xs text-[#8C7667] block sm:hidden">Total</span>
                  <span className="text-base font-extrabold text-[#2C1810]">
                    ₹{(menuItem.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(menuItem.id)}
                  className="p-2 text-[#998476] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove item"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Eco promise note */}
          <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E8DFD8] flex items-center gap-3 text-xs text-[#6B5749]">
            <Sparkles className="w-4 h-4 text-[#4A6B53] shrink-0" />
            <span>All takeaway and dine-in orders use 100% biodegradable bagasse bowls and recyclable paper cups.</span>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#EDE4DC] shadow-md space-y-6 sticky top-28">
          <h3 className="font-serif text-xl font-bold text-[#2C1810] border-b border-[#F2ECE6] pb-3">
            Order Breakdown
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-[#6B5749]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#2C1810]">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#6B5749]">
              <span className="flex items-center gap-1">
                GST (5% Café Tax)
              </span>
              <span className="font-semibold text-[#2C1810]">
                ₹{cartTax.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#4A6B53]">
              <span>Eco-Packaging & Service</span>
              <span className="font-semibold uppercase text-xs">FREE</span>
            </div>

            <div className="pt-3 border-t border-[#EDE4DC] flex items-center justify-between text-base sm:text-lg font-extrabold text-[#2C1810]">
              <span>Grand Total</span>
              <span className="text-[#3D2314]">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            id="proceed-to-checkout-btn"
            onClick={() => navigateTo('checkout')}
            className="w-full py-3.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <p className="text-[11px] text-[#8C7667] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Demo Checkout · No real bank charge applied</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
