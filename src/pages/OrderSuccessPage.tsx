import React from 'react';
import { 
  CheckCircle, 
  Coffee, 
  Clock, 
  MapPin, 
  Utensils, 
  Package, 
  ArrowRight, 
  ShieldAlert,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessPage: React.FC = () => {
  const { lastPlacedOrder, navigateTo } = useApp();

  if (!lastPlacedOrder) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">No Recent Order</h2>
        <p className="text-xs text-[#7C6656]">You haven't placed an order during this session yet.</p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-6 py-2.5 rounded-full bg-[#3D2314] text-white text-xs font-semibold"
        >
          View Café Menu
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE4DC] shadow-xl text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#EAF2EC] text-[#4A6B53] mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            Order Confirmed & In Preparation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C1810]">
            Thank You, {lastPlacedOrder.customer.name}!
          </h1>
          <p className="text-sm text-[#6B5749]">
            Our baristas have received your order and are crafting your fresh brews right now.
          </p>
        </div>

        {/* Order Token / ID */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#FAF4ED] border border-[#E8DFD8]">
          <span className="text-xs text-[#7C6656] uppercase tracking-wider font-semibold">Order Token:</span>
          <span className="font-mono text-lg font-black text-[#3D2314]">
            #{lastPlacedOrder.orderNumber}
          </span>
        </div>

        {/* Live Status Bar */}
        <div className="pt-4 border-t border-[#F2ECE6] max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-[#2C1810] mb-2">
            <span className="flex items-center gap-1.5 text-[#4A6B53]">
              <span className="w-2 h-2 rounded-full bg-[#4A6B53] animate-ping"></span>
              Kitchen Brewing
            </span>
            <span className="text-[#7C6656] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Est. 12-15 Mins
            </span>
          </div>
          <div className="w-full bg-[#EFE9E2] h-2 rounded-full overflow-hidden">
            <div className="bg-[#4A6B53] h-full w-1/2 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Order Details Receipt */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EDE4DC] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">
              Order Breakdown
            </h3>
            <p className="text-xs text-[#7C6656]">
              {lastPlacedOrder.orderType === 'Dine-in' 
                ? `Dine-In (${lastPlacedOrder.tableNumber})` 
                : 'Takeaway Pickup at Counter'}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="text-xs text-[#7C6656] hover:text-[#2C1810] flex items-center gap-1 border border-[#DECFC3] px-3 py-1.5 rounded-lg"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        <div className="space-y-3">
          {lastPlacedOrder.items.map(({ menuItem, quantity }) => (
            <div key={menuItem.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#3D2314] w-6">{quantity}x</span>
                <span className="text-[#2C1810] font-medium">{menuItem.name}</span>
              </div>
              <span className="font-bold text-[#2C1810]">
                ₹{(menuItem.price * quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#EDE4DC] space-y-2 text-xs">
          <div className="flex justify-between text-[#6B5749]">
            <span>Subtotal</span>
            <span>₹{lastPlacedOrder.subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-[#6B5749]">
            <span>5% GST</span>
            <span>₹{lastPlacedOrder.tax.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-extrabold text-base text-[#2C1810] pt-2 border-t border-[#F2ECE6]">
            <span>Total Paid (Demo)</span>
            <span className="text-[#3D2314]">₹{lastPlacedOrder.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {lastPlacedOrder.specialInstructions && (
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD8] text-xs space-y-1">
            <span className="font-bold text-[#3D2314] block">Chef Note:</span>
            <p className="text-[#6B5749] italic">{lastPlacedOrder.specialInstructions}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('menu')}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Coffee className="w-4 h-4 text-[#E6C9A8]" />
          <span>Order More Items</span>
        </button>

        <button
          onClick={() => navigateTo('admin')}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3D2314] border border-[#D9CFC7] text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-4 h-4 text-[#4A6B53]" />
          <span>View in Admin Dashboard</span>
        </button>
      </div>
    </div>
  );
};
