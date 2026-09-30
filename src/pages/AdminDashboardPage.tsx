import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  Coffee, 
  Check, 
  X, 
  Search,
  Filter,
  DollarSign,
  User,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, MenuItem, OrderStatus, BookingStatus } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    bookings, 
    updateBookingStatus, 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    resetMenuToDefault,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'bookings' | 'menu'>('overview');

  // Menu Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: 220,
    category: 'Coffee' as CategoryType,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isPopular: false,
    badge: '',
    preparationTime: '5 mins'
  });

  // Calculate Overview Metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalBookings = bookings.length;
  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setMenuForm({
      name: '',
      description: '',
      price: 220,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      isVegetarian: true,
      isPopular: false,
      badge: '',
      preparationTime: '5 mins'
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isVegetarian: item.isVegetarian ?? true,
      isPopular: item.isPopular ?? false,
      badge: item.badge ?? '',
      preparationTime: item.preparationTime ?? '5 mins'
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuForm.name.trim() || !menuForm.price) return;

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        ...menuForm,
        badge: menuForm.badge.trim() || undefined
      });
    } else {
      addMenuItem({
        ...menuForm,
        badge: menuForm.badge.trim() || undefined,
        rating: 4.9
      });
    }
    setIsMenuModalOpen(false);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE4DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B53] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A6B53]">
              Manager & Kitchen Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            Brew & Bloom Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('menu')}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white border border-[#D9CFC7] text-[#3D2314] hover:bg-[#FAF7F2]"
          >
            Go to Live Website
          </button>
          <button
            onClick={resetMenuToDefault}
            title="Reset to default seed menu items"
            className="text-xs font-medium px-3.5 py-2 rounded-xl bg-[#FAF4ED] text-[#7C6656] hover:text-[#3D2314] hover:bg-[#EFE9E2] border border-[#EDE4DC] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#EDE4DC] pb-1 no-scrollbar">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'orders', label: `Orders (${pendingOrdersCount} Active)`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'bookings', label: `Table Reservations (${activeBookingsCount})`, icon: <Calendar className="w-4 h-4" /> },
          { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: <UtensilsCrossed className="w-4 h-4" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-[#3D2314] text-white shadow-xs'
                  : 'text-[#6B5749] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#7C6656]">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                <div className="w-8 h-8 rounded-lg bg-[#EAF2EC] text-[#4A6B53] flex items-center justify-center font-bold">
                  ₹
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2C1810]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#4A6B53] font-medium flex items-center gap-1">
                <span>From {totalOrders} demo orders placed</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#7C6656]">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2C1810]">
                {totalOrders}
              </p>
              <p className="text-[11px] text-[#8C7667]">
                {pendingOrdersCount} in preparation / pending
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#7C6656]">
                <span className="text-xs font-semibold uppercase tracking-wider">Table Bookings</span>
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2C1810]">
                {totalBookings}
              </p>
              <p className="text-[11px] text-[#4A6B53] font-medium">
                {activeBookingsCount} upcoming confirmed
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDE4DC] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#7C6656]">
                <span className="text-xs font-semibold uppercase tracking-wider">Live Menu Items</span>
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2C1810]">
                {menuItems.length}
              </p>
              <p className="text-[11px] text-[#8C7667]">
                Across 6 beverage & food categories
              </p>
            </div>
          </div>

          {/* Quick Overview Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Snippet */}
            <div className="bg-white rounded-2xl p-6 border border-[#EDE4DC] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#2C1810]">
                  Live Orders Feed
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#4A6B53] hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EDE4DC] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#3D2314]">#{order.orderNumber}</span>
                        <span className="font-medium text-[#2C1810]">{order.customer.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border text-[#7C6656]">
                          {order.orderType}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7C6656] mt-0.5">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items · ₹{order.totalAmount}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Ready'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Preparing'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Reservations Snippet */}
            <div className="bg-white rounded-2xl p-6 border border-[#EDE4DC] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#2C1810]">
                  Upcoming Reservations
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-[#4A6B53] hover:underline"
                >
                  Manage Bookings →
                </button>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EDE4DC] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#2C1810]">{booking.name}</span>
                        <span className="text-[#7C6656]">({booking.guests} Guests)</span>
                      </div>
                      <p className="text-[11px] text-[#7C6656] mt-0.5">
                        {booking.date} at {booking.time} · {booking.seatingArea || 'Indoor Garden'}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EAF2EC] text-[#4A6B53]">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-[#EDE4DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
              <h2 className="font-serif text-xl font-bold text-[#2C1810]">
                Kitchen Orders Queue ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-[#7C6656] py-8 text-center">No orders have been received yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EDE4DC] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE4DC] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-[#3D2314]">
                            #{order.orderNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#3D2314] border">
                            {order.orderType} {order.tableNumber ? `(${order.tableNumber})` : ''}
                          </span>
                          <span className="text-[11px] text-[#8C7667]">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#6B5749] mt-1">
                          <span className="font-medium text-[#2C1810]">{order.customer.name}</span>
                          <span>•</span>
                          <span>{order.customer.phone}</span>
                          <span>•</span>
                          <span>{order.customer.email}</span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#7C6656]">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                            order.status === 'Completed'
                              ? 'bg-green-50 text-green-800 border-green-300'
                              : order.status === 'Ready'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'Preparing'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-white text-[#2C1810] border-[#D9CFC7]'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready for Serve</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Ordered Items List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {order.items.map((item, i) => (
                        <div key={i} className="p-2 rounded-lg bg-white border border-[#E8DFD8] flex items-center justify-between">
                          <span className="font-semibold text-[#2C1810]">
                            {item.quantity}x {item.menuItem.name}
                          </span>
                          <span className="text-[#7C6656]">₹{item.menuItem.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {order.specialInstructions && (
                      <p className="text-xs text-[#7C6656] bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                        <strong className="text-amber-900">Kitchen Note:</strong> {order.specialInstructions}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#7C6656]">
                        Subtotal: ₹{order.subtotal} + 5% GST (₹{order.tax})
                      </span>
                      <span className="text-sm font-black text-[#2C1810]">
                        Total: ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-[#EDE4DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
              <h2 className="font-serif text-xl font-bold text-[#2C1810]">
                Table Reservations Log ({bookings.length})
              </h2>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs text-[#7C6656] py-8 text-center">No table reservations on record.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EDE4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#3D2314] px-2 py-0.5 rounded-md bg-white border">
                          {booking.bookingCode}
                        </span>
                        <h4 className="font-bold text-sm text-[#2C1810]">{booking.name}</h4>
                        <span className="text-xs text-[#7C6656]">({booking.guests} Guests)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B5749]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#4A6B53]" />
                          {booking.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#4A6B53]" />
                          {booking.time}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {booking.phone}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-[#3D2314]">
                          Area: {booking.seatingArea || 'Indoor Garden'}
                        </span>
                      </div>
                      {booking.specialRequest && (
                        <p className="text-xs text-[#7C6656] italic">
                          "{booking.specialRequest}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-50 text-green-800 border-green-300'
                            : booking.status === 'Seated'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : booking.status === 'Completed'
                            ? 'bg-stone-100 text-stone-700 border-stone-300'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Seated">Seated</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: MENU ITEMS MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-[#EDE4DC] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE6] pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#2C1810]">
                  Menu Item Catalog ({menuItems.length})
                </h2>
                <p className="text-xs text-[#7C6656]">
                  Add, edit, modify pricing, or remove menu items in real-time.
                </p>
              </div>

              <button
                id="admin-add-menu-item-btn"
                onClick={handleOpenAddModal}
                className="px-5 py-2.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#E6C9A8]" />
                <span>Add New Item</span>
              </button>
            </div>

            {/* Grid of Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE4DC] flex gap-4 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#DECFC3]"
                  />

                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-semibold text-[#7C6656] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#2C1810] truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-black text-[#3D2314] block">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-lg text-[#7C6656] hover:text-[#2C1810] hover:bg-white transition-colors"
                      title="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.name}" from menu?`)) {
                          deleteMenuItem(item.id);
                        }
                      }}
                      className="p-2 rounded-lg text-[#9E8B7E] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MENU MODAL */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-[#EDE4DC] animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#F2ECE6] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMenuItem} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#2C1810] block mb-1">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  placeholder="e.g. Cardamom Rose Latte"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2C1810] block mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810] focus:outline-none"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Cold Beverages">Cold Beverages</option>
                    <option value="Tea">Tea</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2C1810] block mb-1">
                    Price in INR (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={20}
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2C1810] block mb-1">
                  Image URL (Unsplash or image link)
                </label>
                <input
                  type="url"
                  required
                  value={menuForm.image}
                  onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C1810] block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  placeholder="Ingredients, extraction notes, flavors..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2C1810] block mb-1">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={menuForm.preparationTime}
                    onChange={(e) => setMenuForm({ ...menuForm, preparationTime: e.target.value })}
                    placeholder="e.g. 5 mins"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C1810] block mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={menuForm.badge}
                    onChange={(e) => setMenuForm({ ...menuForm, badge: e.target.value })}
                    placeholder="e.g. Bestseller, New"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-xs text-[#2C1810]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={menuForm.isVegetarian}
                    onChange={(e) => setMenuForm({ ...menuForm, isVegetarian: e.target.checked })}
                    className="rounded text-[#4A6B53] focus:ring-0"
                  />
                  <span>100% Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={menuForm.isPopular}
                    onChange={(e) => setMenuForm({ ...menuForm, isPopular: e.target.checked })}
                    className="rounded text-[#3D2314] focus:ring-0"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F2ECE6] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#D9CFC7] text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3D2314] text-white font-semibold hover:bg-[#25150B]"
                >
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
