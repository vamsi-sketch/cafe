export type CategoryType = 
  | 'Coffee'
  | 'Cold Beverages'
  | 'Tea'
  | 'Breakfast'
  | 'Snacks'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  category: CategoryType;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  preparationTime?: string;
  calories?: number;
  rating?: number;
  badge?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  orderType: 'Dine-in' | 'Takeaway';
  tableNumber?: string;
  specialInstructions?: string;
  customer: OrderCustomer;
  status: OrderStatus;
  createdAt: string;
}

export type BookingStatus = 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  bookingCode: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  seatingArea?: 'Indoor Garden' | 'Window Lounge' | 'Patio Terrace' | 'Any';
  status: BookingStatus;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Café Interior' | 'Coffee' | 'Food' | 'Events';
  image: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  favoriteItem: string;
}

export type PageView = 
  | 'home'
  | 'menu'
  | 'about'
  | 'gallery'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'booking'
  | 'order-success'
  | 'booking-success'
  | 'admin';
