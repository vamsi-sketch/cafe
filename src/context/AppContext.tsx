import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  OrderStatus, 
  Booking, 
  BookingStatus, 
  PageView, 
  CategoryType 
} from '../types';
import { initialMenuItems } from '../data/menuData';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPage: PageView;
  navigateTo: (page: PageView) => void;
  
  // Menu
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenuToDefault: () => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (customer: { name: string; phone: string; email: string }, orderType: 'Dine-in' | 'Takeaway', tableNumber?: string, specialInstructions?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Bookings
  bookings: Booking[];
  lastBooking: Booking | null;
  createBooking: (booking: { name: string; phone: string; date: string; time: string; guests: number; specialRequest?: string; seatingArea?: 'Indoor Garden' | 'Window Lounge' | 'Patio Terrace' | 'Any' }) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;

  // Toasts
  toasts: ToastData[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Seed Orders for lively Admin overview
const initialSeedOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BB-9821',
    items: [
      { menuItem: initialMenuItems[0], quantity: 2 }, // Cappuccino
      { menuItem: initialMenuItems[7], quantity: 2 }  // Croissant
    ],
    subtotal: 740,
    tax: 37,
    totalAmount: 777,
    orderType: 'Dine-in',
    tableNumber: 'Table 4',
    specialInstructions: 'Extra chocolate dusting on one cappuccino please.',
    customer: { name: 'Aarav Singhania', phone: '+91 98765 43210', email: 'aarav.s@example.com' },
    status: 'Ready',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: 'ord-1002',
    orderNumber: 'BB-9822',
    items: [
      { menuItem: initialMenuItems[5], quantity: 1 }, // Cold Coffee
      { menuItem: initialMenuItems[9], quantity: 1 }  // Club Sandwich
    ],
    subtotal: 520,
    tax: 26,
    totalAmount: 546,
    orderType: 'Takeaway',
    specialInstructions: 'Pack cold coffee with paper straw.',
    customer: { name: 'Sneha Patel', phone: '+91 91234 56789', email: 'sneha.p@example.com' },
    status: 'Preparing',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: 'ord-1003',
    orderNumber: 'BB-9820',
    items: [
      { menuItem: initialMenuItems[11], quantity: 2 }, // Brownie
      { menuItem: initialMenuItems[3], quantity: 2 }   // Mocha
    ],
    subtotal: 1020,
    tax: 51,
    totalAmount: 1071,
    orderType: 'Dine-in',
    tableNumber: 'Table 8',
    customer: { name: 'Vikram Joshi', phone: '+91 99887 76655', email: 'vikram.j@example.com' },
    status: 'Completed',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString()
  }
];

// Initial Seed Bookings
const initialSeedBookings: Booking[] = [
  {
    id: 'bk-201',
    bookingCode: 'RES-4412',
    name: 'Meera Deshmukh',
    phone: '+91 98220 11223',
    date: new Date().toISOString().split('T')[0],
    time: '04:30 PM',
    guests: 3,
    specialRequest: 'Corner table near indoor plant garden with power outlet.',
    seatingArea: 'Indoor Garden',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  },
  {
    id: 'bk-202',
    bookingCode: 'RES-4413',
    name: 'Rajat Verma',
    phone: '+91 97110 33445',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '07:00 PM',
    guests: 2,
    specialRequest: 'Anniversary celebration. Quiet window view please!',
    seatingArea: 'Window Lounge',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const stored = localStorage.getItem('brew_bloom_menu');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading menu from localStorage', e);
    }
    return initialMenuItems;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('brew_bloom_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('brew_bloom_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from localStorage', e);
    }
    return initialSeedOrders;
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('brew_bloom_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
    return initialSeedBookings;
  });

  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Persist menu items
  useEffect(() => {
    try {
      localStorage.setItem('brew_bloom_menu', JSON.stringify(menuItems));
    } catch (e) {
      console.error('Failed to save menu to localStorage', e);
    }
  }, [menuItems]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('brew_bloom_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('brew_bloom_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Persist bookings
  useEffect(() => {
    try {
      localStorage.setItem('brew_bloom_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Navigation helper
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast helpers
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [...prev, { menuItem: item, quantity: qty }];
      }
    });
    showToast(`Added "${item.name}" to cart!`, 'success');
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === id ? { ...ci, quantity: qty } : ci))
    );
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((ci) => ci.menuItem.id === id);
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== id));
    if (item) {
      showToast(`Removed "${item.menuItem.name}" from cart.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartTotal = cartSubtotal + cartTax;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Orders actions
  const placeOrder = (
    customer: { name: string; phone: string; email: string },
    orderType: 'Dine-in' | 'Takeaway',
    tableNumber?: string,
    specialInstructions?: string
  ): Order => {
    const newOrderNumber = 'BB-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: newOrderNumber,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      totalAmount: cartTotal,
      orderType,
      tableNumber: orderType === 'Dine-in' ? (tableNumber || 'Table 1') : undefined,
      specialInstructions: specialInstructions?.trim() || undefined,
      customer,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    showToast(`Order #${newOrder.orderNumber} placed successfully!`, 'success');
    navigateTo('order-success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to "${status}".`, 'info');
  };

  // Booking actions
  const createBooking = (bookingData: {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    specialRequest?: string;
    seatingArea?: 'Indoor Garden' | 'Window Lounge' | 'Patio Terrace' | 'Any';
  }): Booking => {
    const bookingCode = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: 'bk-' + Date.now(),
      bookingCode,
      ...bookingData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLastBooking(newBooking);
    showToast(`Table reserved! Code: ${newBooking.bookingCode}`, 'success');
    navigateTo('booking-success');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    showToast(`Reservation status updated to "${status}".`, 'info');
  };

  // Menu management
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: 'item-' + Date.now()
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to menu!`, 'success');
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((m) => (m.id === item.id ? item : m)));
    showToast(`Updated "${item.name}".`, 'info');
  };

  const deleteMenuItem = (id: string) => {
    const found = menuItems.find((m) => m.id === id);
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    if (found) {
      showToast(`Deleted "${found.name}" from menu.`, 'info');
    }
  };

  const resetMenuToDefault = () => {
    setMenuItems(initialMenuItems);
    localStorage.removeItem('brew_bloom_menu');
    showToast('Menu reset to initial café defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        resetMenuToDefault,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartCount,
        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        bookings,
        lastBooking,
        createBooking,
        updateBookingStatus,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
